/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

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
