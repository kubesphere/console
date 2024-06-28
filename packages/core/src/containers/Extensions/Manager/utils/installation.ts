import { InstallModalActionType } from '../constants';

function formatInstallModalActionType(actionType: InstallModalActionType) {
  const isExtensionInstall = actionType === InstallModalActionType.ExtensionInstall;
  const isExtensionUpdate = actionType === InstallModalActionType.ExtensionUpdate;
  const isClusterInstall = actionType === InstallModalActionType.ClusterInstall;
  const isClusterConfig = actionType === InstallModalActionType.ClusterConfig;
  return {
    isExtensionInstall,
    isExtensionUpdate,
    isClusterInstall,
    isClusterConfig,
  };
}

export { formatInstallModalActionType };
