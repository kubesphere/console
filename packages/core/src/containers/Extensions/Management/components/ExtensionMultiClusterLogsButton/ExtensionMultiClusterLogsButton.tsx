/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import type { PopoverInstance } from '@kubed/components';

import type { FormattedExtension, FormattedInstallPlan } from '../../../../../stores/extension';
import { PopoverContent } from './PopoverContent';
import { StyledPopover, StyledButton, Icon } from './ExtensionMultiClusterLogsButton.styles';

interface ExtensionMultiClusterLogsButtonProps {
  formattedExtension: FormattedExtension;
  formattedInstallPlan: FormattedInstallPlan | undefined;
  onClickExtension: () => void;
  onClickCluster: () => void;
}

function ExtensionMultiClusterLogsButton({
  formattedExtension,
  formattedInstallPlan,
  onClickExtension,
  onClickCluster,
}: ExtensionMultiClusterLogsButtonProps) {
  const {
    isInstalling,
    isUpgrading,
    isUninstalling,
    isInstalled,
    isInstallFailed,
    isUpgradeFailed,
    isUninstallFailed,
  } = formattedExtension;
  const popoverRef = useRef<PopoverInstance>(null);

  const clusterCount = formattedInstallPlan?.clusterScheduling?.placement?.clusters?.length ?? 0;
  const clusterSchedulingStatuses = formattedInstallPlan?.clusterSchedulingStatuses ?? [];
  const clusterInstalledCount = clusterSchedulingStatuses.filter(item => item.isInstalled).length;
  const hasUninstallCluster =
    clusterSchedulingStatuses.length > 0 &&
    clusterSchedulingStatuses.some(
      clusterSchedulingStatus =>
        clusterSchedulingStatus.isUninstalling ||
        clusterSchedulingStatus.isUninstalled ||
        clusterSchedulingStatus.isUninstallFailed,
    );

  if (
    !(
      isInstalling ||
      isUpgrading ||
      isUninstalling ||
      isInstalled ||
      isInstallFailed ||
      isUpgradeFailed ||
      isUninstallFailed
    ) ||
    (isInstalled &&
      clusterCount > 0 &&
      clusterCount === clusterInstalledCount &&
      !hasUninstallCluster)
  ) {
    return null;
  }

  return (
    <StyledPopover
      maxWidth="unset"
      content={
        <PopoverContent
          formattedExtension={formattedExtension}
          formattedInstallPlan={formattedInstallPlan}
          onExtensionViewLogButtonClick={() => {
            popoverRef.current?.hide();
            onClickExtension();
          }}
          onClusterSchedulingViewLogButtonClick={() => {
            popoverRef.current?.hide();
            onClickCluster();
          }}
        />
      }
      onMount={instance => {
        // @ts-ignore
        popoverRef.current = instance;
      }}
    >
      <StyledButton>
        <Icon />
      </StyledButton>
    </StyledPopover>
  );
}

export { ExtensionMultiClusterLogsButton };
