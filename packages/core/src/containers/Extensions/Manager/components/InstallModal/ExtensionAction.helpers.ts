/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { FormattedExtension } from '../../../../../stores/extension';
import { InstallModalActionType } from '../../constants';
import { LocalExtensionStatus } from '../../hooks/useLocalExtensionStatusItems';
import { formatLocalExtensionsStatus } from '../../utils/status';
import { formatInstallModalActionType } from '../../utils/installation';

interface GetExtensionActionConfigOptions {
  actionType: InstallModalActionType;
  isUpdateEnabled: boolean;
  formattedExtension: FormattedExtension;
  localExtensionsStatus: LocalExtensionStatus;
}

function getExtensionActionConfig({
  actionType,
  isUpdateEnabled,
  formattedExtension,
  localExtensionsStatus,
}: GetExtensionActionConfigOptions) {
  const { isExtensionInstall, isExtensionUpdate } = formatInstallModalActionType(actionType);
  const {
    isInstalling,
    isUpgrading,
    isInstalled,
    isUninstalled,
    isInstallFailed,
    isUpgradeFailed,
    isInstalledByUpgrade,
  } = formattedExtension;
  const { isLocalInstalling, isLocalUpgrading } =
    formatLocalExtensionsStatus(localExtensionsStatus);

  if (isExtensionInstall) {
    return {
      actionTitlePrefix: t('INSTALL'),
      isShowLogByStatusState: isInstalling || isInstalled || isInstallFailed,
      isExtensionConfigReadOnlyByStatusState: !isUninstalled || isLocalInstalling,
    };
  }

  if (isExtensionUpdate) {
    const isExtensionConfigReadOnlyByStatusState = (() => {
      if (isLocalUpgrading) {
        return true;
      }

      if (isUpdateEnabled) {
        return false;
      }

      return true;
    })();
    return {
      actionTitlePrefix: t('UPDATE'),
      isShowLogByStatusState:
        !isUpdateEnabled && (isUpgrading || isInstalledByUpgrade || isUpgradeFailed),
      isExtensionConfigReadOnlyByStatusState,
    };
  }

  return null;
}

export { getExtensionActionConfig };
