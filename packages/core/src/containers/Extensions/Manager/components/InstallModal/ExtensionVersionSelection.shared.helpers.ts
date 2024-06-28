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
