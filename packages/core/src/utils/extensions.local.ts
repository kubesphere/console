/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { ENV } from '@ks-console/shared';

import type { ExtensionConfig } from '../types/extension-config';
import { resolveExtensionConfigs } from './extensions.config';

function getLocalExtensionConfigs() {
  if (!ENV.isDevelopment) {
    return [];
  }

  const requireContext = require.context(
    process.env.EXTENSIONS_PATH as string,
    true,
    /src\/index.[jt]s(x?)$/,
  );

  const allPaths = requireContext.keys();
  const paths = allPaths.filter(key => key.startsWith('.'));

  const modules = paths.map(path => {
    const module = requireContext(path);
    return module.default;
  });

  return modules.filter(Boolean);
}

export async function registerLocalExtensions() {
  if (ENV.isDevelopment) {
    const localExtensionConfigs: ExtensionConfig[] = getLocalExtensionConfigs();
    const extensionConfigs = await resolveExtensionConfigs(localExtensionConfigs);
    globals.context.registerExtensions(extensionConfigs, { isSkipLicenseCheck: true });
  }
}
