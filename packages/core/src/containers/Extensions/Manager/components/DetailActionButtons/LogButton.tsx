/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useDisclosure } from '@kubed/hooks';

import type { FormattedExtension, FormattedInstallPlan } from '../../../../../stores/extension';
import { useExtensionVersionQuery } from '../../../../../stores/extension';
import { ExtensionLogButton } from '../ExtensionLogButton';
import { ExtensionMultiClusterLogsButton } from '../ExtensionMultiClusterLogsButton';
import { ExtensionLogModal } from '../ExtensionLogModal';
import { ClusterLogsModal } from '../ClusterLogsModal';

interface LogButtonProps {
  formattedExtension: FormattedExtension;
  formattedInstallPlan: FormattedInstallPlan | undefined;
}

function LogButton({ formattedExtension, formattedInstallPlan }: LogButtonProps) {
  const {
    name: extensionName,
    installedVersion,
    isUninstalling,
    isUninstallFailed,
  } = formattedExtension;
  const extensionLogModalTitle =
    isUninstalling || isUninstallFailed
      ? t('EXTENSION_UNINSTALLATION_LOG')
      : t('EXTENSION_INSTALLATION_LOG');
  const extensionLogModal = useDisclosure();
  const clusterLogsModal = useDisclosure();

  const enabled = !!installedVersion;
  const { isLoading, formattedExtensionVersion } = useExtensionVersionQuery({
    enabled,
    extensionName,
    version: installedVersion ?? '',
  });
  const isMultiClusterInstallation = formattedExtensionVersion?.isMultiClusterInstallation;

  if (isLoading) {
    return null;
  }

  const renderExtensionLogModal = () => {
    if (!extensionLogModal.isOpen) {
      return null;
    }

    return (
      <ExtensionLogModal
        visible={extensionLogModal.isOpen}
        initialTitle={extensionLogModalTitle}
        formattedExtension={formattedExtension}
        onCancel={extensionLogModal.close}
      />
    );
  };

  const renderClusterLogsModal = () => {
    if (!clusterLogsModal.isOpen) {
      return null;
    }

    return (
      <ClusterLogsModal
        visible={clusterLogsModal.isOpen}
        formattedExtension={formattedExtension}
        formattedInstallPlan={formattedInstallPlan}
        onCancel={clusterLogsModal.close}
      />
    );
  };

  if (isMultiClusterInstallation) {
    return (
      <>
        <ExtensionMultiClusterLogsButton
          formattedExtension={formattedExtension}
          formattedInstallPlan={formattedInstallPlan}
          onClickExtension={extensionLogModal.open}
          onClickCluster={clusterLogsModal.open}
        />
        {renderExtensionLogModal()}
        {renderClusterLogsModal()}
      </>
    );
  }

  return (
    <>
      <ExtensionLogButton
        formattedExtension={formattedExtension}
        onClick={extensionLogModal.open}
      />
      {renderExtensionLogModal()}
    </>
  );
}

export { LogButton };
