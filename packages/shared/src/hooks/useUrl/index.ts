/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';

import { Constants } from '../../constants';
import type { PathParams } from '../../types';
import { isMultiCluster } from '../../utils/checker';
import { cookie, getApiVersion, getBrowserLang, getWebsiteUrl } from '../../utils';

export const getPath = ({
  cluster,
  workspace,
  namespace,
  devops,
}: { cluster?: string; workspace?: string; namespace?: string; devops?: string } = {}) => {
  let path = '';

  if (cluster) {
    path += `/klusters/${cluster}`;
  }

  if (namespace) {
    return `${path}/namespaces/${namespace}`;
  }

  if (devops) {
    return `${path}/devops/${devops}`;
  }

  if (workspace) {
    return `${path}/workspaces/${workspace}`;
  }

  return path;
};

export const getClusterUrl = (url: string): string => {
  let requestURL = url;

  const reg = new RegExp(/\/(api|apis|kapis)\/(.*)\/?(klusters\/[^/]*)\/(.*)/);
  const match = requestURL.match(reg);

  if (match && match.length === 5) {
    requestURL = isMultiCluster()
      ? `/${match[1]}/${match[3].replace('klusters', 'clusters')}/${match[2]}/${match[4]}`
      : `/${match[1]}/${match[2]}/${match[4]}`;
  }

  requestURL.replace(/\/\/+/, '/');

  const clusterReg = new RegExp(/\/(api|apis|kapis)\/(clusters\/[^/]*)\/(.*)/);
  const clusterMatch = requestURL.match(clusterReg);

  if (clusterMatch && clusterMatch.length === 4) {
    if (clusterMatch[1].indexOf('monitoring.kubesphere.io/v1beta1') < 0) {
      requestURL = `/${clusterMatch[2]}/${clusterMatch[1]}/${clusterMatch[3]}`;
    }
  }

  return requestURL.replace(/\/\/+/, '/');
};

export interface UseUrlOptions {
  getPathFn?: (params?: PathParams, module?: string) => string;
  getListUrlFn?: (params?: PathParams, k8sVersion?: string) => string;
  getWatchListUrlFn?: (params?: PathParams) => string;
  getResourceUrlFn?: (params?: PathParams) => string;
  module: string;
  apiVersion?: string;
}

export const useUrl = ({
  getPathFn = getPath,
  getListUrlFn,
  getResourceUrlFn,
  getWatchListUrlFn,
  module,
  apiVersion: customApiVersion,
}: UseUrlOptions) => {
  const apiVersion = customApiVersion ?? Constants.API_VERSIONS[module] ?? '';

  const getResourceUrl = (params: PathParams = {}) => {
    return `kapis/resources.kubesphere.io/v1alpha3${getPathFn(params)}/${module}`;
  };

  const getWatchListUrl = (params?: PathParams) => {
    return `${apiVersion}/watch${getPathFn(params)}/${module}`;
  };

  const getWatchUrl = (params: PathParams) => {
    return `${(getWatchListUrlFn || getWatchListUrl)(params)}/${params.name}`;
  };

  const getListUrl = (params: PathParams, k8sVersion?: string) => {
    // FIXME: use params apiVersion if it's provided
    const version = getApiVersion(module, k8sVersion) ?? '';
    const { cluster, namespace, dryRun } = params;
    return `${version}${getPathFn({ cluster, namespace })}/${module}${dryRun ? '?dryRun=All' : ''}`;
  };

  const getDetailUrl = (params: PathParams, k8sVersion?: string) => {
    const fn = getListUrlFn || getListUrl;
    const prefix = fn(params, k8sVersion);

    return `${prefix}/${params.name}`;
  };

  const getDocsUrl = () => {
    const { url: prefix } = getWebsiteUrl();
    const docUrl = get(globals.config, `resourceDocs[${module}]`, '');

    if (!docUrl || !globals.config.showOutSiteLink) {
      return '';
    }

    return `${prefix}${docUrl}`;
  };

  const getConfigSupportLink = (key: string) => {
    const lang = globals.user?.lang || getBrowserLang();
    return globals.config.supportLinks[key]?.[lang] ?? globals.config.supportLinks[key];
  };

  return {
    getConfigSupportLink,
    getDocsUrl,
    getWatchUrl,
    getDetailUrl,
    getClusterUrl,
    getPath: getPathFn,
    getListUrl: getListUrlFn || getListUrl,
    getResourceUrl: getResourceUrlFn || getResourceUrl,
    getWatchListUrl: getWatchListUrlFn || getWatchListUrl,
  };
};
