/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { noop } from 'lodash';

import { Modal, Steps, TabStep, Button } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import { Filebox, PlugCircle, Cluster, BlueGreenDeployment } from '@kubed/icons';

import type { FormattedCluster } from '@ks-console/shared';
import { DeleteConfirmModal } from '@ks-console/shared';

// eslint-disable-next-line max-len
import type { FormattedInstallPlanClusterSchedulingOverrides } from '../../../../../types/extension';
import type { FormattedExtension, FormattedInstallPlan } from '../../../../../stores/extension';
import type { FormattedExtensionVersion } from '../../../../../stores/extension';
import { useUpdateInstallPlanMutation } from '../../../../../stores/extension';
import { InstallModalActionType, InstallModalStepKey } from '../../constants';
import { updateInstallPlanClusterScheduling } from '../../actions';
import type { LocalExtensionStatus } from '../../hooks/useLocalExtensionStatusItems';
import { formatLocalExtensionsStatus } from '../../utils/status';

import { ExtensionVersionSelection } from './ExtensionVersionSelection';
import { ExtensionAction } from './ExtensionAction';
import { ClusterSelections } from './ClusterSelections';
import { ClusterConfigs } from './ClusterConfigs';
import { getInstallModalConfig, getIsUpdateEnabled } from './InstallModal.helpers';
import { StepsWrapper } from './InstallModal.styles';

interface InstallModalProps {
  visible: boolean;
  actionType: InstallModalActionType;
  formattedExtension: FormattedExtension;
  formattedInstallPlan?: FormattedInstallPlan | undefined;
  initialSelectedFormattedClusters?: FormattedCluster[];
  localExtensionsStatus?: LocalExtensionStatus;
  onClose: () => void;
  onCreateInstallPlanSuccess?: () => void;
  onUpdateInstallPlanVersionSuccess?: () => void;
  onUpdateInstallPlanClusterSchedulingSuccess?: () => void;
}

function InstallModal({
  visible,
  actionType,
  formattedExtension,
  formattedInstallPlan,
  initialSelectedFormattedClusters = [],
  localExtensionsStatus,
  onClose,
  onCreateInstallPlanSuccess = noop,
  onUpdateInstallPlanVersionSuccess = noop,
  onUpdateInstallPlanClusterSchedulingSuccess = noop,
}: InstallModalProps) {
  const {
    isPreparing,
    isInstalling,
    isInstalled,
    isInstallFailed,
    isUpgradeFailed,
    installedVersion,
  } = formattedExtension;

  const [enableInstallExtension, setEnableInstallExtension] = useState(false);
  const [selectedFormattedExtensionVersion, setSelectedFormattedExtensionVersion] =
    useState<FormattedExtensionVersion>();
  const isMultiClusterInstallation = Boolean(
    selectedFormattedExtensionVersion?.isMultiClusterInstallation,
  );
  const { isUpdateEnabled } = getIsUpdateEnabled({
    actionType,
    isInstalled,
    installedVersion,
    targetVersion: selectedFormattedExtensionVersion?.version,
  });

  const { title, includeStepKeys, extensionActionLabel } = getInstallModalConfig({
    actionType,
    formattedExtension,
    isMultiClusterInstallation,
  });

  const [selectedFormattedClusters, setSelectedFormattedClusters] = useState<FormattedCluster[]>(
    initialSelectedFormattedClusters,
  );
  const [clusterSchedulingOverrides, setClusterSchedulingOverrides] = useState<
    FormattedInstallPlanClusterSchedulingOverrides[]
  >([]);
  const finalOverrides = useMemo(
    () =>
      clusterSchedulingOverrides.filter(({ clusterName }) =>
        Boolean(
          selectedFormattedClusters.find(formattedCluster => formattedCluster.name === clusterName),
        ),
      ),
    [clusterSchedulingOverrides, selectedFormattedClusters],
  );

  const updateInstallPlanClusterSchedulingMutation = useUpdateInstallPlanMutation();

  const removedInitialFormattedClusters = initialSelectedFormattedClusters.filter(({ name }) => {
    const index = selectedFormattedClusters.findIndex(item => item.name === name);
    return index === -1;
  });
  const removedClusterNames = removedInitialFormattedClusters.map(({ name }) => name);
  const shouldAlertDeleteClusters = removedInitialFormattedClusters.length > 0;

  const deleteClustersConfirmModal = useDisclosure();

  const steps: {
    key: string;
    isIncluded?: boolean;
    label: ReactNode;
    icon: ReactNode;
    children: ReactNode;
  }[] = [
    {
      key: InstallModalStepKey.ExtensionVersionSelection,
      label: t('VERSION_SELECTION'),
      icon: <Filebox />,
      children: (
        <ExtensionVersionSelection
          actionType={actionType}
          formattedExtension={formattedExtension}
          selectedFormattedExtensionVersion={selectedFormattedExtensionVersion}
          setSelectedFormattedExtensionVersion={setSelectedFormattedExtensionVersion}
          setEnableInstallExtension={setEnableInstallExtension}
        />
      ),
    },
    {
      key: InstallModalStepKey.ExtensionAction,
      label: extensionActionLabel,
      icon: <PlugCircle />,
      children: (
        <ExtensionAction
          actionType={actionType}
          isUpdateEnabled={isUpdateEnabled}
          formattedExtension={formattedExtension}
          formattedInstallPlan={formattedInstallPlan}
          localExtensionsStatus={localExtensionsStatus}
          selectedFormattedExtensionVersion={selectedFormattedExtensionVersion}
          onCreateInstallPlanSuccess={onCreateInstallPlanSuccess}
          onUpdateInstallPlanVersionSuccess={onUpdateInstallPlanVersionSuccess}
        />
      ),
    },
    {
      key: InstallModalStepKey.ClusterSelections,
      label: t('CLUSTER_SELECTION'),
      icon: <Cluster />,
      children: (
        <ClusterSelections
          selectedFormattedClusters={selectedFormattedClusters}
          setSelectedFormattedClusters={setSelectedFormattedClusters}
          removedClusterNames={removedClusterNames}
        />
      ),
    },
    {
      key: InstallModalStepKey.ClusterConfigs,
      label: t('DIFF_CONFIG'),
      icon: <BlueGreenDeployment />,
      children: (
        <ClusterConfigs
          formattedExtension={formattedExtension}
          formattedClusters={selectedFormattedClusters}
          localOverrides={finalOverrides}
          setLocalOverrides={setClusterSchedulingOverrides}
        />
      ),
    },
  ].filter(({ key }) => includeStepKeys.includes(key));

  const [activeStep, setActiveStep] = useState(0);
  const setPreviousAction = (index: number) => {
    const minIndex = 0;
    if (index === minIndex) {
      return 0;
    }
    return index - 1;
  };
  const setNextAction = (index: number) => {
    const maxIndex = steps.length;
    if (index === maxIndex) {
      return maxIndex;
    }
    return index + 1;
  };

  const handleSubmit = () => {
    const clusterScheduling = {
      placement: {
        clusters: selectedFormattedClusters.map(({ name }) => name),
      },
      overrides: finalOverrides,
    };
    updateInstallPlanClusterScheduling({
      formattedExtension,
      clusterScheduling,
      mutate: updateInstallPlanClusterSchedulingMutation.mutate,
      onSuccess: () => {
        onUpdateInstallPlanClusterSchedulingSuccess();
        deleteClustersConfirmModal.close();
        onClose();
      },
    });
  };

  const renderFooterButtons = () => {
    const key = steps[activeStep]?.key;
    const isFirstStep = activeStep === 0;
    const isLastStep = steps.length > 0 ? activeStep === steps.length - 1 : false;

    const cancelButton = (
      <Button key="cancel-button" onClick={() => onClose()}>
        {t('CANCEL')}
      </Button>
    );
    const previousButton = !isFirstStep && (
      <Button
        key="previous-button"
        shadow
        onClick={() => {
          setActiveStep(setPreviousAction);
        }}
      >
        {t('PREVIOUS')}
      </Button>
    );
    const nextButton = !isLastStep && (
      <Button
        key="next-button"
        color="secondary"
        shadow
        onClick={() => {
          setActiveStep(setNextAction);
        }}
      >
        {t('NEXT')}
      </Button>
    );
    const okButtonSubmit = (
      <Button
        key="ok-button"
        color="secondary"
        shadow
        loading={
          shouldAlertDeleteClusters ? false : updateInstallPlanClusterSchedulingMutation.isLoading
        }
        onClick={() => {
          if (shouldAlertDeleteClusters) {
            deleteClustersConfirmModal.open();
          } else {
            handleSubmit();
          }
        }}
      >
        {t('OK')}
      </Button>
    );

    if (key === InstallModalStepKey.ExtensionVersionSelection) {
      if (enableInstallExtension) {
        return [cancelButton, nextButton];
      }

      return [cancelButton];
    }

    if (key === InstallModalStepKey.ExtensionAction) {
      const { isLocalInstalling, isLocalUpgrading } =
        formatLocalExtensionsStatus(localExtensionsStatus);

      if (
        isLocalInstalling ||
        isLocalUpgrading ||
        isPreparing ||
        isInstalling ||
        isInstallFailed ||
        isUpgradeFailed
      ) {
        return [];
      }

      if (isUpdateEnabled) {
        return [cancelButton, previousButton];
      }

      if (isInstalled) {
        return isLastStep ? [] : [cancelButton, nextButton];
      }

      return [cancelButton, previousButton];
    }

    if (key === InstallModalStepKey.ClusterSelections) {
      if (selectedFormattedClusters.length > 0) {
        return [cancelButton, nextButton];
      }

      return [cancelButton, okButtonSubmit];
    }

    if (key === InstallModalStepKey.ClusterConfigs) {
      return [cancelButton, previousButton, okButtonSubmit];
    }

    return [];
  };

  const renderFooter = () => {
    if (steps.length < 2) {
      return null;
    }

    const buttons = renderFooterButtons();
    const footer = buttons.filter(Boolean);

    if (footer.length === 0) {
      return null;
    }

    return footer;
  };

  return (
    <>
      <Modal visible={visible} title={title} width={960} footer={renderFooter()} onCancel={onClose}>
        <StepsWrapper>
          <Steps id="extension-install-steps" active={activeStep} variant="tab">
            {steps.map(({ key, label, icon, children }) => (
              <TabStep
                key={key}
                label={label}
                description={t('NOT_SET')}
                progressDescription={t('CURRENT')}
                completedDescription={t('EXTENSION_FINISHED')}
                icon={icon}
              >
                {children}
              </TabStep>
            ))}
          </Steps>
        </StepsWrapper>
      </Modal>
      {deleteClustersConfirmModal.isOpen && (
        <DeleteConfirmModal
          visible={deleteClustersConfirmModal.isOpen}
          resource={removedClusterNames}
          type="EXTENSION_CLUSTER_AGENT"
          title={
            removedClusterNames.length > 1
              ? t('REMOVE_CLUSTERS_CONFIRM_TITLE_PL')
              : t('REMOVE_CLUSTERS_CONFIRM_TITLE_SI')
          }
          confirmLoading={updateInstallPlanClusterSchedulingMutation.isLoading}
          onOk={handleSubmit}
          onCancel={deleteClustersConfirmModal.close}
        />
      )}
    </>
  );
}

export { InstallModal };
