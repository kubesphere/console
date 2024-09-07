/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode } from 'react';
import { Loading } from '@kubed/components';
import { Success, Failure, Information, Warning } from '@kubed/icons';

import type { StatusIndicatorProps } from '@ks-console/shared';
import type { ExtensionStatusState, ExtensionStatusCondition } from '../../../../types/extension';
import type {
  FormattedExtension,
  FormattedInstallPlan,
  FormattedStatusState,
} from '../../../../stores/extension';
import { formatExtensionInstallStatus } from '../../../../stores/extension';
import type { LocalExtensionStatus } from '../hooks/useLocalExtensionStatusItems';

function formatLocalExtensionsStatus(localExtensionsStatus: LocalExtensionStatus) {
  const isLocalInstalling = localExtensionsStatus === 'localInstalling';
  const isLocalUpgrading = localExtensionsStatus === 'localUpgrading';
  const isLocalUninstalling = localExtensionsStatus === 'localUninstalling';
  const isLocalForceUninstalling = localExtensionsStatus === 'localForceUninstalling';
  const isLocalAnyUninstalling = isLocalUninstalling || isLocalForceUninstalling;

  return {
    localExtensionsStatus,
    isLocalInstalling,
    isLocalUpgrading,
    isLocalUninstalling,
    isLocalForceUninstalling,
    isLocalAnyUninstalling,
  };
}

interface GetIsResetLocalExtensionsStatusOptions {
  statusState: ExtensionStatusState | undefined;
  statusConditions: ExtensionStatusCondition[] | undefined;
  localExtensionsStatus: LocalExtensionStatus;
}

function getIsResetLocalExtensionsStatus({
  statusState,
  statusConditions,
  localExtensionsStatus,
}: GetIsResetLocalExtensionsStatusOptions) {
  const {
    isResetLocalExtensionStatusByInstall,
    isResetLocalExtensionStatusByUpgrade,
    isResetLocalExtensionStatusByUninstall,
    isResetLocalExtensionStatusByForceUninstall,
  } = formatExtensionInstallStatus({ statusState, statusConditions });
  const { isLocalInstalling, isLocalUpgrading, isLocalUninstalling, isLocalForceUninstalling } =
    formatLocalExtensionsStatus(localExtensionsStatus);

  return (
    (isResetLocalExtensionStatusByInstall && isLocalInstalling) ||
    (isResetLocalExtensionStatusByUpgrade && isLocalUpgrading) ||
    (isResetLocalExtensionStatusByUninstall && isLocalUninstalling) ||
    (isResetLocalExtensionStatusByForceUninstall && isLocalForceUninstalling)
  );
}

interface StatusStateInfo {
  text: string;
  icon: ReactNode;
  hasViewLogButton?: boolean;
}

interface ExtensionStatusStateInfo extends StatusStateInfo {
  statusText: string;
  indicatorType: StatusIndicatorProps['type'];
  indicatorMotion: StatusIndicatorProps['motion'];
}

function getIcons() {
  const size = 16;
  return {
    notInstalled: <Information size={size} fill="#f5a623" color="#fff" />,
    loading: <Loading size={size} variant="circle2" color="yellow" />,
    success: <Success size={size} fill="#55bc8a" color="#fff" />,
    failure: <Failure size={size} fill="#ca2621" color="#fff" />,
    exception: <Warning size={size} fill="#f5a623" color="#fff" />,
  };
}

function getExtensionStatusStateInfo(
  formattedExtension: FormattedExtension,
  localExtensionsStatus?: LocalExtensionStatus,
): ExtensionStatusStateInfo | null {
  const icons = getIcons();

  const {
    isPreparing,
    isInstalling,
    isUpgrading,
    isUninstalling,
    isInstalled,
    isUninstalled,
    isInstallFailed,
    isUpgradeFailed,
    isUninstallFailed,
  } = formattedExtension;
  const { isLocalInstalling, isLocalUpgrading, isLocalAnyUninstalling } =
    formatLocalExtensionsStatus(localExtensionsStatus);

  if (isLocalInstalling || isLocalUpgrading || isLocalAnyUninstalling) {
    return {
      statusText: t('LOCAL_PENDING'),
      text: t('LOCAL_PENDING'),
      icon: icons.loading,
      indicatorType: 'waiting',
      indicatorMotion: true,
      hasViewLogButton: false,
    };
  }

  if (isPreparing) {
    return {
      statusText: t('PREPARING'),
      text: t('PREPARING'),
      icon: icons.loading,
      indicatorType: 'waiting',
      indicatorMotion: true,
      hasViewLogButton: false,
    };
  }

  if (isInstalling) {
    return {
      statusText: t('INSTALLING'),
      text: t('INSTALLING'),
      icon: icons.loading,
      indicatorType: 'waiting',
      indicatorMotion: true,
      hasViewLogButton: true,
    };
  }

  if (isUpgrading) {
    return {
      statusText: t('UPDATING'),
      text: t('UPDATING'),
      icon: icons.loading,
      indicatorType: 'waiting',
      indicatorMotion: true,
      hasViewLogButton: true,
    };
  }

  if (isUninstalling) {
    return {
      statusText: t('UNINSTALLING'),
      text: t('UNINSTALLING'),
      icon: icons.loading,
      indicatorType: 'waiting',
      indicatorMotion: true,
      hasViewLogButton: true,
    };
  }

  if (isInstalled) {
    return {
      statusText: t('INSTALLED'),
      text: t('INSTALL_SUCCESS'),
      icon: icons.success,
      indicatorType: 'success',
      indicatorMotion: false,
      hasViewLogButton: true,
    };
  }

  if (isUninstalled) {
    return {
      statusText: t('NOT_INSTALLED'),
      text: t('UNINSTALL_SUCCESS'),
      icon: icons.success,
      indicatorType: 'default',
      indicatorMotion: false,
      hasViewLogButton: true,
    };
  }

  if (isInstallFailed) {
    return {
      statusText: t('INSTALL_FAILED'),
      text: t('INSTALL_FAILED'),
      icon: icons.failure,
      indicatorType: 'error',
      indicatorMotion: false,
      hasViewLogButton: true,
    };
  }

  if (isUpgradeFailed) {
    return {
      statusText: t('UPDATE_FAILED'),
      text: t('UPDATE_FAILED'),
      icon: icons.failure,
      indicatorType: 'error',
      indicatorMotion: false,
      hasViewLogButton: true,
    };
  }

  if (isUninstallFailed) {
    return {
      statusText: t('UNINSTALL_FAILED'),
      text: t('UNINSTALL_FAILED'),
      icon: icons.failure,
      indicatorType: 'error',
      indicatorMotion: false,
      hasViewLogButton: true,
    };
  }

  return null;
}

function getClustersOverallStatusStateInfo(
  formattedInstallPlan: FormattedInstallPlan | undefined,
): StatusStateInfo | null {
  const icons = getIcons();

  const isUninstall = formattedInstallPlan?.isUninstall;
  const clusterCount = formattedInstallPlan?.clusterScheduling?.placement?.clusters?.length ?? 0;
  const clusterSchedulingStatuses = formattedInstallPlan?.clusterSchedulingStatuses ?? [];
  const hasClusterSchedulingStatuses = clusterSchedulingStatuses.length > 0;
  const clusterInstalledCount = clusterSchedulingStatuses.filter(
    ({ isInstalled }) => isInstalled,
  ).length;

  if (clusterCount === 0) {
    return {
      text: t('NOT_INSTALLED'),
      icon: icons.notInstalled,
      hasViewLogButton: false,
    };
  }

  const isAllPreparing =
    hasClusterSchedulingStatuses &&
    clusterSchedulingStatuses.every(({ isPreparing }) => isPreparing);
  if (isAllPreparing) {
    return {
      text: t('PREPARING'),
      icon: icons.loading,
      hasViewLogButton: false,
    };
  }

  const hasInstalling =
    hasClusterSchedulingStatuses &&
    clusterSchedulingStatuses.some(({ isInstalling }) => isInstalling);
  if (hasInstalling) {
    return {
      text: t('INSTALLING'),
      icon: icons.loading,
      hasViewLogButton: true,
    };
  }

  const hasUpgrading =
    hasClusterSchedulingStatuses &&
    clusterSchedulingStatuses.some(({ isUpgrading }) => isUpgrading);
  if (hasUpgrading) {
    return {
      text: t('UPDATING'),
      icon: icons.loading,
      hasViewLogButton: true,
    };
  }

  const hasUninstalling =
    hasClusterSchedulingStatuses &&
    clusterSchedulingStatuses.some(({ isUninstalling }) => isUninstalling);
  if (hasUninstalling) {
    return {
      text: t('UNINSTALLING'),
      icon: icons.loading,
      hasViewLogButton: true,
    };
  }

  const isAllInstalled = clusterInstalledCount === clusterCount;
  if (isAllInstalled) {
    return {
      text: t('INSTALL_SUCCESS'),
      icon: icons.success,
      hasViewLogButton: true,
    };
  }

  const isAllUninstalled = clusterInstalledCount === 0;
  if (isUninstall && isAllUninstalled) {
    return {
      text: t('UNINSTALL_SUCCESS'),
      icon: icons.success,
      hasViewLogButton: true,
    };
  }

  const hasInstallFailed =
    hasClusterSchedulingStatuses &&
    clusterSchedulingStatuses.some(({ isInstallFailed }) => isInstallFailed);
  if (hasInstallFailed) {
    return {
      text: t('INSTALL_EXCEPTION'),
      icon: icons.exception,
      hasViewLogButton: true,
    };
  }

  const hasUpgradeFailed =
    hasClusterSchedulingStatuses &&
    clusterSchedulingStatuses.some(({ isUpgradeFailed }) => isUpgradeFailed);
  if (hasUpgradeFailed) {
    return {
      text: t('UPDATE_EXCEPTION'),
      icon: icons.exception,
      hasViewLogButton: true,
    };
  }

  const hasUninstallFailed =
    hasClusterSchedulingStatuses &&
    clusterSchedulingStatuses.some(({ isUninstallFailed }) => isUninstallFailed);
  if (hasUninstallFailed) {
    return {
      text: t('UNINSTALL_EXCEPTION'),
      icon: icons.exception,
      hasViewLogButton: true,
    };
  }

  const isNotAllInstalled = clusterCount > clusterInstalledCount && clusterInstalledCount > 0;
  if (isNotAllInstalled) {
    return {
      text: t('INSTALLING'),
      icon: icons.loading,
      hasViewLogButton: true,
    };
  }

  return null;
}

interface GetClusterStatusStateInfoOptions extends FormattedStatusState {
  isUninstall?: boolean;
}

function getClusterStatusStateInfo(
  options: GetClusterStatusStateInfoOptions,
): StatusStateInfo | null {
  const icons = getIcons();
  const {
    isUninstall,

    isPreparing,
    isInstalling,
    isUpgrading,
    isUninstalling,
    isInstalled,
    isUninstalled,
    isInstallFailed,
    isUpgradeFailed,
    isUninstallFailed,
  } = options;

  if (isUninstalled) {
    if (isUninstall) {
      return {
        text: t('UNINSTALL_SUCCESS'),
        icon: icons.success,
      };
    }
    return {
      text: t('NOT_INSTALLED'),
      icon: icons.notInstalled,
    };
  }

  if (isPreparing) {
    return {
      text: t('PREPARING'),
      icon: icons.loading,
    };
  }

  if (isInstalling) {
    return {
      text: t('INSTALLING'),
      icon: icons.loading,
    };
  }

  if (isUpgrading) {
    return {
      text: t('UPDATING'),
      icon: icons.loading,
    };
  }

  if (isUninstalling) {
    return {
      text: t('UNINSTALLING'),
      icon: icons.loading,
    };
  }

  if (isInstalled) {
    return {
      text: t('INSTALL_SUCCESS'),
      icon: icons.success,
    };
  }

  if (isInstallFailed) {
    return {
      text: t('INSTALL_EXCEPTION'),
      icon: icons.exception,
    };
  }

  if (isUpgradeFailed) {
    return {
      text: t('UPDATE_EXCEPTION'),
      icon: icons.exception,
    };
  }

  if (isUninstallFailed) {
    return {
      text: t('UNINSTALL_EXCEPTION'),
      icon: icons.exception,
    };
  }

  return null;
}

export type {
  GetIsResetLocalExtensionsStatusOptions,
  StatusStateInfo,
  GetClusterStatusStateInfoOptions,
};
export {
  formatLocalExtensionsStatus,
  getIsResetLocalExtensionsStatus,
  getExtensionStatusStateInfo,
  getClustersOverallStatusStateInfo,
  getClusterStatusStateInfo,
};
