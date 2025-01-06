/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isString, includes } from 'lodash';

export const isSystemRole = (role: string) => /^system:/.test(role);

export const isPlatformAdmin = (): boolean => globals.user?.globalrole === 'platform-admin';

export const isMultiCluster = (): boolean => globals.ksConfig?.multicluster?.clusterRole !== 'none';

export const hasKSModule = (module: string) => {
  return get(globals, `ksConfig["${module}"]`, false);
};

export const hasClusterExtensionModule = (cluster: string, module: string) => {
  return get(
    globals,
    `ksConfig.enabledExtensionModulesStatus.${module}.clusterSchedulingStatuses.${cluster}`,
    false,
  );
};

export const hasExtensionModuleAnnotation = (module: string, annotation: string) => {
  return (
    get(
      globals,
      `ksConfig.enabledExtensionModulesStatus.${module}.annotations['${annotation}']`,
      'false',
    ) === 'true'
  );
};

export const hasExtensionModuleAnnotationCluster = (
  module: string,
  annotation: string,
  cluster: string,
) => {
  const supportClusters = get(
    globals,
    `ksConfig.enabledExtensionModulesStatus.${module}.annotations['${annotation}']`,
    '',
  ).split(',');

  return includes(supportClusters, cluster);
};

/**
 * Check if the page is apps page.
 * @param {String} path
 */
export const isAppsPage = (path = location.pathname) =>
  path === '/apps' || path.startsWith('/apps/app-');

export const isExtensionsMarketplacePage = (path = location.pathname, isIndex?: boolean) => {
  const indexPage = '/extensions/marketplace';
  if (isIndex) {
    return path === indexPage;
  }
  return path === indexPage || path.startsWith(`${indexPage}/`);
};

const isExtensionsManagementDetailPage = (path = location.pathname) => {
  const indexPage = '/extensions/management';

  return path.startsWith(`${indexPage}/`);
};

export const isDarkHeader = (path = location.pathname) => {
  return isAppsPage(path);
};

export const isTransparentHeader = (path = location.pathname) => {
  return isExtensionsMarketplacePage(path) || isExtensionsManagementDetailPage(path);
};

export const isMemberClusterPage = (path = location.pathname, message: string) => {
  const clusterName = get(/\/clusters\/?([-0-9a-z]*)\/?/.exec(path), '1', 'host');
  const rules = ['token used before issued', 'signature is invalid', 'token not found in cache'];
  const lowerMessage = message.toLowerCase();

  let isTokenOut = true;

  rules.forEach(item => {
    if (lowerMessage.indexOf(item) > -1) {
      isTokenOut = false;
    }
  });

  return clusterName !== 'host' && !isTokenOut;
};

export const compareVersion = (v1 = '', v2 = '') => {
  const getVersion = (str: string) =>
    str
      .split('-')[0]
      .replace('v', '')
      .split('.')
      .map(item => parseInt(item, 10));

  const v1s = getVersion(v1);
  const v2s = getVersion(v2);

  const len = Math.min(v1s.length, v2s.length);
  let i = 0;
  while (i < len) {
    if (v1s[i] < v2s[i]) {
      return -1;
    }
    if (v1s[i] > v2s[i]) {
      return 1;
    }
    i++;
  }

  if (v1s.length < v2s.length) {
    return -1;
  }

  if (v1s.length > v2s.length) {
    return 1;
  }

  return 0;
};

export function compareAppVersion(v1: any, v2: any): any {
  if (isString(v1) && isString(v2)) {
    return false;
  }

  const a = v1.split('.');
  const b = v2.split('.');
  const len = Math.max(a.length, b.length);

  for (let i = 0; i < len; i++) {
    if ((a[i] && !b[i] && parseInt(a[i], 10) > 0) || parseInt(a[i], 10) > parseInt(b[i], 10)) {
      return 1;
    }
    if ((b[i] && !a[i] && parseInt(b[i], 10) > 0) || parseInt(a[i], 10) < parseInt(b[i], 10)) {
      return -1;
    }
  }

  return 0;
}
