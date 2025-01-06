/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ReactNode } from 'react';

import { Dropdown, MenuItem } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import { Update, PlugCircle, Hammer, Cogwheel, Start, Stop, Trash } from '@kubed/icons';

import type {
  FormattedExtension,
  FormattedInstallPlan,
  FormattedExtensionVersion,
} from '../../../../../stores/extension';
import {
  useExtensionVersionQuery,
  useExtensionInstalledClustersQuery,
  useUpdateInstallPlanMutation,
} from '../../../../../stores/extension';

import { InstallModalActionType } from '../../constants';
import { updateInstallPlanEnabled } from '../../actions';
import type { LocalExtensionStatus } from '../../hooks/useLocalExtensionStatusItems';
import { ExtensionConfigModal } from '../ExtensionConfigModal';
import { InstallModal } from '../InstallModal';
import { ExtensionUninstallConfirmModal } from '../ExtensionUninstallConfirmModal';
import { ExtensionForceUninstallConfirmModal } from '../ExtensionForceUninstallConfirmModal';
import { MoreButton, StyledMenu } from './ActionMenus.styles';

interface MenuItemPros {
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
}

interface ActionMenusProps {
  formattedExtension: FormattedExtension;
  formattedInstallPlan: FormattedInstallPlan | undefined;
  localExtensionsStatus: LocalExtensionStatus;
  updatableFormattedExtensionVersions: FormattedExtensionVersion[];
  onUpdateInstallPlanVersionSuccess: () => void;
  onUpdateInstallPlanEnabledSuccess: () => void;
  onDeleteInstallPlanSuccess: () => void;
  onForceDeleteInstallPlanSuccess: () => void;
}

function ActionMenus({
  formattedExtension,
  formattedInstallPlan,
  localExtensionsStatus,
  updatableFormattedExtensionVersions,
  onUpdateInstallPlanVersionSuccess,
  onUpdateInstallPlanEnabledSuccess,
  onDeleteInstallPlanSuccess,
  onForceDeleteInstallPlanSuccess,
}: ActionMenusProps) {
  const {
    name: extensionName,
    installedVersion,
    isInstalled,
    isEnabled,
    isInstallFailed,
    isUpgradeFailed,
    isUninstallFailed,
  } = formattedExtension;
  const clusters = formattedInstallPlan?.clusterScheduling?.placement?.clusters;
  const hasClusters = Array.isArray(clusters) && clusters.length > 0;

  const extensionUpdateModal = useDisclosure();
  const extensionConfigModal = useDisclosure();
  const clusterInstallModal = useDisclosure();
  const clusterConfigModal = useDisclosure();
  const extensionUninstallConfirmModal = useDisclosure();
  const extensionForceUninstallConfirmModal = useDisclosure();

  const { formattedExtensionVersion } = useExtensionVersionQuery({
    enabled: Boolean(extensionName && installedVersion && isInstalled),
    extensionName,
    version: installedVersion ?? '',
  });
  const isMultiClusterInstallation = formattedExtensionVersion?.isMultiClusterInstallation;

  const { installedFormattedClusters, refetchInstallPlan } = useExtensionInstalledClustersQuery({
    enabled: hasClusters,
    extensionName,
  });

  const updateInstallPlanEnabledMutation = useUpdateInstallPlanMutation({
    onSuccess: onUpdateInstallPlanEnabledSuccess,
  });

  let menuItems: MenuItemPros[] = [];

  const extensionConfigMenuItem = formattedInstallPlan && {
    icon: <PlugCircle />,
    children: t('EXTENSION_CONFIG'),
    onClick: extensionConfigModal.open,
  };
  const clusterConfigsMenuItem = isMultiClusterInstallation &&
    hasClusters && {
      icon: <Cogwheel />,
      children: t('CLUSTER_AGENT_CONFIGS'),
      onClick: clusterConfigModal.open,
    };

  if (isInstalled) {
    const enabledMenuItem: MenuItemPros = {
      icon: <Stop />,
      children: t('DISABLE'),
      onClick: () =>
        updateInstallPlanEnabled({
          formattedExtension,
          enabled: false,
          mutate: updateInstallPlanEnabledMutation.mutate,
        }),
    };
    const disabledMenuItem: MenuItemPros = {
      icon: <Start />,
      children: t('ENABLE'),
      onClick: () =>
        formattedExtension &&
        updateInstallPlanEnabled({
          formattedExtension,
          enabled: true,
          mutate: updateInstallPlanEnabledMutation.mutate,
        }),
    };

    // @ts-ignore
    menuItems = [
      updatableFormattedExtensionVersions.length > 0 && {
        icon: <Update />,
        children: t('UPDATE'),
        onClick: extensionUpdateModal.open,
      },
      extensionConfigMenuItem,
      isMultiClusterInstallation &&
        !hasClusters && {
          icon: <Hammer />,
          children: t('INSTALL_CLUSTER_AGENT'),
          onClick: clusterInstallModal.open,
        },
      clusterConfigsMenuItem,
      isEnabled ? enabledMenuItem : disabledMenuItem,
      {
        icon: <Trash />,
        children: t('UNINSTALL'),
        onClick: extensionUninstallConfirmModal.open,
      },
    ].filter(Boolean);
  } else if (isInstallFailed || isUpgradeFailed || isUninstallFailed) {
    menuItems = [
      {
        icon: <Trash />,
        children: t('FORCE_UNINSTALL'),
        onClick: extensionForceUninstallConfirmModal.open,
      },
    ];

    if (isInstallFailed || isUpgradeFailed) {
      // @ts-ignore
      menuItems = [extensionConfigMenuItem, clusterConfigsMenuItem, ...menuItems].filter(Boolean);
    }
  }

  const renderActionMenus = () => {
    if (menuItems.length === 0) {
      return null;
    }

    const actionMenus = (
      <StyledMenu>
        {menuItems.map(({ children, ...menuItemProps }, index) => (
          <MenuItem key={index} {...menuItemProps}>
            {children}
          </MenuItem>
        ))}
      </StyledMenu>
    );

    return (
      <Dropdown
        maxWidth="unset"
        content={actionMenus}
        placement="bottom-start"
        appendTo={document.body}
      >
        <MoreButton />
      </Dropdown>
    );
  };

  const handleUpdateInstallPlanClusterSchedulingSuccess = () => refetchInstallPlan();

  return (
    <>
      {renderActionMenus()}
      {extensionUpdateModal.isOpen && (
        <InstallModal
          visible={extensionUpdateModal.isOpen}
          actionType={InstallModalActionType.ExtensionUpdate}
          formattedExtension={formattedExtension}
          formattedInstallPlan={formattedInstallPlan}
          localExtensionsStatus={localExtensionsStatus}
          initialSelectedFormattedClusters={installedFormattedClusters}
          onClose={extensionUpdateModal.close}
          onUpdateInstallPlanVersionSuccess={onUpdateInstallPlanVersionSuccess}
        />
      )}
      {extensionConfigModal.isOpen && (
        <ExtensionConfigModal
          visible={extensionConfigModal.isOpen}
          formattedExtension={formattedExtension}
          onClose={extensionConfigModal.close}
        />
      )}
      {clusterInstallModal.isOpen && (
        <InstallModal
          visible={clusterInstallModal.isOpen}
          actionType={InstallModalActionType.ClusterInstall}
          formattedExtension={formattedExtension}
          onUpdateInstallPlanClusterSchedulingSuccess={
            handleUpdateInstallPlanClusterSchedulingSuccess
          }
          onClose={clusterInstallModal.close}
        />
      )}
      {clusterConfigModal.isOpen && installedFormattedClusters.length > 0 && (
        <InstallModal
          visible={clusterConfigModal.isOpen}
          actionType={InstallModalActionType.ClusterConfig}
          formattedExtension={formattedExtension}
          initialSelectedFormattedClusters={installedFormattedClusters}
          onUpdateInstallPlanClusterSchedulingSuccess={
            handleUpdateInstallPlanClusterSchedulingSuccess
          }
          onClose={clusterConfigModal.close}
        />
      )}
      {extensionUninstallConfirmModal.isOpen && (
        <ExtensionUninstallConfirmModal
          visible={extensionUninstallConfirmModal.isOpen}
          formattedExtension={formattedExtension}
          onDeleteInstallPlanSuccess={onDeleteInstallPlanSuccess}
          onClose={extensionUninstallConfirmModal.close}
        />
      )}
      {extensionForceUninstallConfirmModal.isOpen && (
        <ExtensionForceUninstallConfirmModal
          visible={extensionForceUninstallConfirmModal.isOpen}
          formattedExtension={formattedExtension}
          onForceDeleteInstallPlanSuccess={onForceDeleteInstallPlanSuccess}
          onClose={extensionForceUninstallConfirmModal.close}
        />
      )}
    </>
  );
}

export { ActionMenus };
