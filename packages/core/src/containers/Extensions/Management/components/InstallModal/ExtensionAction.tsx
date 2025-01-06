/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { PropsWithChildren, useState } from 'react';
import { Loading, Button, Collapse } from '@kubed/components';
import { Cluster } from '@kubed/icons';

import type {
  CreateInstallPlanMutationVariables,
  UpdateInstallPlanMutationVariables,
} from '../../../../../types/extension';
import { PodStatusPhase } from '../../../../../constants/pod';
import type {
  FormattedExtension,
  FormattedExtensionVersion,
  FormattedInstallPlan,
} from '../../../../../stores/extension';
import {
  useExtensionVersionFilesQuery,
  useExtensionLogQuery,
  useCreateInstallPlanMutation,
  useUpdateInstallPlanMutation,
} from '../../../../../stores/extension';
import { LoadingButton } from '../../../components/LoadingButton';
import { InstallModalActionType } from '../../constants';
import { formatInstallModalActionType } from '../../utils/installation';
import { formatLocalExtensionsStatus } from '../../utils/status';
import type { LocalExtensionStatus } from '../../hooks/useLocalExtensionStatusItems';
import { ExtensionConfig } from '../ExtensionConfig';
import { ResetDefaultConfigTip } from '../ResetDefaultConfigTip';
import { LogViewer } from '../LogViewer';
import { getExtensionActionConfig } from './ExtensionAction.helpers';
import {
  StepContentInnerWrapper,
  ActionInfoBox,
  ActionIcons,
  ExtensionIcon,
  ActionIcon,
  ActionTitle,
  ActionDescription,
  ActionSettled,
  ActionSucceedIcon,
  ActionFailedIcon,
  LogViewerWrapper,
  ExtensionConfigBox,
  CollapsePanelHeaderTitle,
  CollapsePanelHeaderDescription,
  EditorWrapper,
} from './ExtensionAction.styles';

const { Panel } = Collapse;

const ICON_SIZE = 16;
const loading = <Loading size={ICON_SIZE} />;

const InProgressButton = ({ children }: PropsWithChildren<Record<never, never>>) => (
  <Button color="secondary" shadow leftIcon={loading} disabled>
    {children}
  </Button>
);

const SucceedButton = ({ children }: PropsWithChildren<Record<never, never>>) => (
  <ActionSettled>
    <ActionSucceedIcon variant="light" size={ICON_SIZE} /> {children}
  </ActionSettled>
);

const FailedButton = ({ children }: PropsWithChildren<Record<never, never>>) => (
  <ActionSettled>
    <ActionFailedIcon variant="light" size={ICON_SIZE} /> {children}
  </ActionSettled>
);

interface ExtensionActionProps {
  actionType: InstallModalActionType;
  isUpdateEnabled: boolean;
  formattedExtension: FormattedExtension;
  formattedInstallPlan: FormattedInstallPlan | undefined;
  localExtensionsStatus: LocalExtensionStatus;
  selectedFormattedExtensionVersion: FormattedExtensionVersion | undefined;
  onCreateInstallPlanSuccess: () => void;
  onUpdateInstallPlanVersionSuccess: () => void;
}

function ExtensionAction({
  actionType,
  isUpdateEnabled,
  formattedExtension,
  formattedInstallPlan,
  localExtensionsStatus,
  selectedFormattedExtensionVersion,
  onCreateInstallPlanSuccess,
  onUpdateInstallPlanVersionSuccess,
}: ExtensionActionProps) {
  const { isExtensionUpdate } = formatInstallModalActionType(actionType);
  const extensionActionConfig = getExtensionActionConfig({
    actionType,
    isUpdateEnabled,
    formattedExtension,
    localExtensionsStatus,
  });

  const {
    name: extensionName,
    isPreparing,
    isInstalling,
    isUpgrading,
    isInstalled,
    isUninstalled,
    isInstallFailed,
    isUpgradeFailed,
  } = formattedExtension;
  const { isLocalInstalling, isLocalUpgrading } =
    formatLocalExtensionsStatus(localExtensionsStatus);

  const selectedVersion = selectedFormattedExtensionVersion?.version;

  const [extensionConfig, setExtensionConfig] = useState<string>('');
  const { isFetching: isExtensionVersionFilesQueryFetching, extensionVersionConfig } =
    useExtensionVersionFilesQuery({
      enabled: !!selectedVersion,
      extensionName,
      version: selectedVersion ?? '',
      onSuccess: data => {
        const extensionVersionConfig = data.extensionVersionConfig;
        let configYaml = '';
        if (isExtensionUpdate) {
          configYaml = formattedInstallPlan?.config ?? extensionVersionConfig ?? '';
        } else {
          configYaml = extensionVersionConfig ?? '';
        }
        setExtensionConfig(configYaml);
      },
    });

  const { data: logItem } = useExtensionLogQuery({
    extensionName,
    enabled: extensionActionConfig?.isShowLogByStatusState,
  });
  const { podStatusPhase, log } = logItem;
  const isShowLogByPodStatusPhase = [
    PodStatusPhase.Pending,
    PodStatusPhase.Running,
    PodStatusPhase.Succeeded,
    PodStatusPhase.Failed,
    PodStatusPhase.Unknown,
    // @ts-ignore
  ].includes(podStatusPhase);

  const createInstallPlanMutation = useCreateInstallPlanMutation({
    onSuccess: onCreateInstallPlanSuccess,
  });

  const updateInstallPlanVersionMutation = useUpdateInstallPlanMutation({
    onSuccess: onUpdateInstallPlanVersionSuccess,
  });

  const handleInstall = () => {
    if (selectedVersion) {
      const variables: CreateInstallPlanMutationVariables = {
        extensionName,
        version: selectedVersion,
      };
      if (extensionConfig) {
        variables.config = extensionConfig;
      }
      createInstallPlanMutation.mutate(variables);
    }
  };

  const handleUpdate = () => {
    if (selectedVersion) {
      const variables: UpdateInstallPlanMutationVariables = {
        extensionName,
        version: selectedVersion,
      };
      if (extensionConfig) {
        variables.config = extensionConfig;
      }
      updateInstallPlanVersionMutation.mutate(variables);
    }
  };

  const renderActionButton = () => {
    const loadingButton = (
      <LoadingButton
        buttonProps={{ shadow: true, color: 'secondary', disabled: true }}
        loadingProps={{ size: ICON_SIZE }}
      />
    );

    if (isLocalInstalling || isLocalUpgrading) {
      return <InProgressButton>{t('LOCAL_PENDING')}...</InProgressButton>;
    }

    if (isPreparing) {
      return <InProgressButton>{t('PREPARING')}...</InProgressButton>;
    }

    if (isInstalling) {
      return <InProgressButton>{t('INSTALLING')}...</InProgressButton>;
    }

    if (isUpgrading) {
      return <InProgressButton>{t('UPDATING')}...</InProgressButton>;
    }

    if (isInstalled) {
      if (isExtensionUpdate) {
        if (isExtensionVersionFilesQueryFetching) {
          return loadingButton;
        }

        if (isUpdateEnabled) {
          return (
            <Button
              shadow
              color="secondary"
              leftIcon={updateInstallPlanVersionMutation.isLoading ? loading : null}
              disabled={!selectedVersion || updateInstallPlanVersionMutation.isLoading}
              onClick={handleUpdate}
            >
              {t('START_UPDATE')}
            </Button>
          );
        }
      }

      return <SucceedButton>{t('SUCCEED')}</SucceedButton>;
    }

    if (isInstallFailed) {
      return <FailedButton>{t('INSTALL_FAILED')}</FailedButton>;
    }

    if (isUpgradeFailed) {
      return <FailedButton>{t('UPDATE_FAILED')}</FailedButton>;
    }

    if (isUninstalled) {
      if (isExtensionVersionFilesQueryFetching) {
        return loadingButton;
      }

      return (
        <Button
          shadow
          color="secondary"
          leftIcon={createInstallPlanMutation.isLoading ? loading : null}
          disabled={!selectedVersion || createInstallPlanMutation.isLoading}
          onClick={handleInstall}
        >
          {t('START_INSTALLATION')}
        </Button>
      );
    }

    return null;
  };

  return (
    <StepContentInnerWrapper>
      <ActionInfoBox>
        <ActionIcons>
          <ExtensionIcon src={selectedFormattedExtensionVersion?.displayIcon} alt="" />
          <ActionIcon size={24} />
          <Cluster size={40} />
        </ActionIcons>
        <ActionTitle>
          {extensionActionConfig?.actionTitlePrefix}{' '}
          {selectedFormattedExtensionVersion?.localeDisplayName}
        </ActionTitle>
        <ActionDescription>
          {selectedFormattedExtensionVersion?.localeDescription}
        </ActionDescription>
        {renderActionButton()}
        {extensionActionConfig?.isShowLogByStatusState && isShowLogByPodStatusPhase && (
          <LogViewerWrapper>
            <LogViewer log={log} bodyStyle={{ height: '200px' }} />
          </LogViewerWrapper>
        )}
      </ActionInfoBox>
      <ExtensionConfigBox>
        <Collapse>
          <Panel
            key="0"
            header={
              <>
                <CollapsePanelHeaderTitle>{t('EXTENSION_CONFIG')}</CollapsePanelHeaderTitle>
                <CollapsePanelHeaderDescription>
                  {t('SET_THE_CONFIGURATION_OF_THE_EXTENSION')}
                </CollapsePanelHeaderDescription>
              </>
            }
          >
            <EditorWrapper>
              <ResetDefaultConfigTip
                hasMarginBottom
                onConfirmResetDefaultConfig={() => setExtensionConfig(extensionVersionConfig)}
              />
              <ExtensionConfig
                value={extensionConfig}
                isLoading={isExtensionVersionFilesQueryFetching}
                readOnly={
                  createInstallPlanMutation.isLoading ||
                  extensionActionConfig?.isExtensionConfigReadOnlyByStatusState
                }
                onChange={setExtensionConfig}
              />
            </EditorWrapper>
          </Panel>
        </Collapse>
      </ExtensionConfigBox>
    </StepContentInnerWrapper>
  );
}

export { ExtensionAction };
