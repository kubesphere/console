/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const DEBOUNCE_WAIT = 1000;

export const DEFAULT_PAGE_SIZE = 10;

export enum InstallModalActionType {
  ExtensionInstall = 'extension.install',
  ExtensionUpdate = 'extension.update',
  ClusterInstall = 'cluster.install',
  ClusterConfig = 'cluster.config',
}

export enum InstallModalStepKey {
  ExtensionVersionSelection = 'extension.version-selection',
  ExtensionAction = 'extension.action',
  ClusterSelections = 'cluster.selections',
  ClusterConfigs = 'cluster.configs',
}

export const EXTENSIONS_EVALUATION_PAGE_LINK = 'https://jinshuju.net/f/bKsHRY';
