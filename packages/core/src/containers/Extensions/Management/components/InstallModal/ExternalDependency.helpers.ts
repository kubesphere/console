/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { OriginalExtensionVersionExternalDependency } from '../../../../../types/extension';
import type { FormattedExtension } from '../../../../../stores/extension';
import { satisfiesVersion } from '../../utils/version';

interface GetUnreadyTipOptions {
  formattedExtension: Pick<FormattedExtension, 'localeDisplayName'>;
  externalDependency: Pick<OriginalExtensionVersionExternalDependency, 'version'>;
  dependencyFormattedExtension: Pick<
    FormattedExtension,
    'localeDisplayName' | 'isUninstalled' | 'isInstalled' | 'installedVersion'
  >;
}

function getUnreadyTip({
  formattedExtension,
  externalDependency,
  dependencyFormattedExtension,
}: GetUnreadyTipOptions) {
  const { localeDisplayName: extensionLocaleDisplayName } = formattedExtension;
  const { version = '' } = externalDependency;
  const {
    localeDisplayName: dependencyLocaleDisplayName,
    isUninstalled,
    isInstalled,
    installedVersion = '',
  } = dependencyFormattedExtension;

  if (isUninstalled || (isInstalled && !satisfiesVersion(installedVersion, version))) {
    return t('REQUIRED_DEPENDENCY_VERSION_NOT_SATISFIED_TIP', {
      extensionLocaleDisplayName,
      dependencyLocaleDisplayName,
    });
  }

  return t('REQUIRED_DEPENDENCY_EXCEPTION_TIP', {
    extensionLocaleDisplayName,
    dependencyLocaleDisplayName,
  });
}

export { getUnreadyTip };
