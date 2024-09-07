/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { OriginalExtension } from '../types/extension';

const EMPTY_ORIGINAL_EXTENSION: OriginalExtension = {
  apiVersion: 'kubesphere.io/v1alpha1',
  kind: 'Extension',
  metadata: {
    creationTimestamp: '',
    finalizers: [],
    generation: 0,
    name: '',
    resourceVersion: '',
    uid: '',
  },
};

const DEFAULT_LANGUAGE = 'en';

function getDetail({
  basePath,
  extensionName,
  version,
}: {
  basePath: string;
  extensionName: string;
  version?: string;
}) {
  if (!extensionName) {
    return basePath;
  }

  let path = `${basePath}/${extensionName}`;

  if (version) {
    path += `/${version}`;
  }

  return path;
}

const EXTENSIONS_MARKETPLACE_PATH = `/extensions/marketplace`;
const EXTENSIONS_MANAGER_PATH = `/extensions/manager`;
const EXTENSIONS_PAGE_PATHS = {
  marketplace: {
    index: EXTENSIONS_MARKETPLACE_PATH,
    getDetail: (extensionName: string, options?: { version?: string }) =>
      getDetail({
        basePath: EXTENSIONS_MARKETPLACE_PATH,
        extensionName,
        version: options?.version,
      }),
  },
  manager: {
    index: EXTENSIONS_MANAGER_PATH,
    getDetail: (extensionName: string, options?: { version?: string }) =>
      getDetail({
        basePath: EXTENSIONS_MANAGER_PATH,
        extensionName,
        version: options?.version,
      }),
  },
};

enum ExtensionStatusState {
  Preparing = 'Preparing',
  Installing = 'Installing',
  Upgrading = 'Upgrading',
  Uninstalling = 'Uninstalling',
  Installed = 'Installed',
  Uninstalled = 'Uninstalled',
  InstallFailed = 'InstallFailed',
  UpgradeFailed = 'UpgradeFailed',
  UninstallFailed = 'UninstallFailed',
}

export { EMPTY_ORIGINAL_EXTENSION, DEFAULT_LANGUAGE, EXTENSIONS_PAGE_PATHS, ExtensionStatusState };
