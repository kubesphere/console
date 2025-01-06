/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { OriginalExtensionVersionExternalDependency } from '../../../../../types/extension';
import type { FormattedExtension } from '../../../../../stores/extension';
import { satisfiesVersion } from '../../utils/version';

interface GetIsReadyOptions {
  externalDependency: Pick<OriginalExtensionVersionExternalDependency, 'version'>;
  dependencyFormattedExtension: Pick<FormattedExtension, 'isInstalled' | 'installedVersion'>;
}

function getIsReady({ externalDependency, dependencyFormattedExtension }: GetIsReadyOptions) {
  const { version = '' } = externalDependency;
  const { isInstalled, installedVersion = '' } = dependencyFormattedExtension;
  return isInstalled && satisfiesVersion(installedVersion, version);
}

export { getIsReady };
