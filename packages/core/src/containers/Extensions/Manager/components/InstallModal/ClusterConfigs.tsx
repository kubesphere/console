/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { find, isNil, unionBy } from 'lodash';

import { Information, Pen } from '@kubed/icons';
import { LoadingOverlay } from '@kubed/components';
import type { FormattedCluster } from '@ks-console/shared';
import { ClusterTitle } from '@ks-console/shared';

// eslint-disable-next-line max-len
import type { FormattedInstallPlanClusterSchedulingOverrides } from '../../../../../types/extension';
import type { FormattedExtension } from '../../../../../stores/extension';
import {
  useInstallPlanQuery,
  useExtensionVersionFilesQuery,
} from '../../../../../stores/extension';
import { ClusterConfigEditor } from './ClusterConfigEditor';
import {
  StepContentTitle,
  StepContentInnerWrapper,
  StyledEntity,
  ConfigChangedWrapper,
  ConfigChangedText,
  ActionButtons,
  ActionButton,
} from './ClusterConfigs.styles';

interface ClusterConfigsProps {
  formattedExtension?: FormattedExtension;
  formattedClusters: FormattedCluster[];
  isLoading?: boolean;
  localOverrides: FormattedInstallPlanClusterSchedulingOverrides[];
  setLocalOverrides: Dispatch<SetStateAction<FormattedInstallPlanClusterSchedulingOverrides[]>>;
}

function ClusterConfigs({
  formattedExtension,
  formattedClusters,
  isLoading: isLoadingProps,
  localOverrides,
  setLocalOverrides,
}: ClusterConfigsProps) {
  const [clusterConfigVisible, setClusterConfigVisible] = useState<boolean>(false);
  const onCloseClusterConfig = () => setClusterConfigVisible(false);

  const extensionName = formattedExtension?.name ?? '';
  const installedVersion = formattedExtension?.installedVersion ?? '';

  // for InstallModal
  const { isFetching: isInstallPlanQueryFetching } = useInstallPlanQuery({
    enabled: !!extensionName,
    extensionName,
    extraQueryKey: ['ClusterConfigs'],
    onSuccess: data => {
      const serverOverrides = data?.clusterScheduling?.overrides;
      const finalOverrides = unionBy(localOverrides, serverOverrides, 'clusterName');
      setLocalOverrides(finalOverrides);
    },
  });

  // unnecessary code can be deleted later
  const { isLoading: isExtensionVersionFilesQueryLoading, extensionVersionConfig } =
    useExtensionVersionFilesQuery({
      enabled: false && Boolean(extensionName && installedVersion),
      extensionName,
      version: installedVersion ?? '',
    });

  const [selectedClusterName, setSelectedClusterName] = useState<string>('');
  const selectedConfigOverride = find(localOverrides, {
    clusterName: selectedClusterName,
  })?.configOverride;

  const setConfigOverride = (value: string) =>
    setLocalOverrides(prevState =>
      unionBy(
        [
          {
            clusterName: selectedClusterName,
            configOverride: value,
          },
        ],
        prevState,
        'clusterName',
      ),
    );

  if (isLoadingProps || isInstallPlanQueryFetching || isExtensionVersionFilesQueryLoading) {
    return <LoadingOverlay visible overlayOpacity={0} />;
  }

  if (clusterConfigVisible) {
    return (
      <ClusterConfigEditor
        defaultConfig={extensionVersionConfig}
        value={selectedConfigOverride ?? ''}
        onConfirm={value => {
          setConfigOverride(value);
          onCloseClusterConfig();
        }}
        onClose={onCloseClusterConfig}
      />
    );
  }

  return (
    <>
      <StepContentTitle>{t('DIFF_CONFIG')}</StepContentTitle>
      <StepContentInnerWrapper>
        {formattedClusters.map(formattedCluster => {
          const { name: clusterName } = formattedCluster;
          const configOverride = find(localOverrides, { clusterName })?.configOverride;
          const hasConfigOverride = !isNil(configOverride);

          return (
            <StyledEntity key={clusterName} hoverable>
              <ClusterTitle cluster={formattedCluster} statusReasonProps={{ hasTip: false }} />
              {hasConfigOverride && (
                <ConfigChangedWrapper>
                  <Information size={20} />
                  <ConfigChangedText>{t('CONFIGURATION_CHANGED')}</ConfigChangedText>
                </ConfigChangedWrapper>
              )}
              <ActionButtons>
                <ActionButton
                  onClick={() => {
                    setSelectedClusterName(clusterName);
                    setClusterConfigVisible(true);
                  }}
                >
                  <Pen />
                </ActionButton>
              </ActionButtons>
            </StyledEntity>
          );
        })}
      </StepContentInnerWrapper>
    </>
  );
}

export { ClusterConfigs };
