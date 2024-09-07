/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';

import baseStore from './store';
import { useList, UseListInstance, UseListOptions, useUrl } from '../hooks';
import type { FormattedNamespace, OriginalNamespace, PathParams } from '../types';
import {
  getBaseInfo,
  getOriginData,
  FetchListParams,
  formatFetchListParams,
  getApiVersion,
} from '../utils';

const module = 'namespace';
const apiVersion = getApiVersion(module);
const { getPath } = useUrl({ module });

function getResourceUrl({ workspace, ...params }: PathParams): string {
  if (workspace) {
    return `kapis/tenant.kubesphere.io/v1beta1/workspaces/${workspace}${getPath(
      params,
    )}/namespaces`;
  }

  return `kapis/resources.kubesphere.io/v1alpha3${getPath(params)}/namespaces`;
}

export function getListUrlFn(params?: PathParams): string {
  const { workspace, ...restParams } = params || {};

  if (workspace) {
    return `kapis/tenant.kubesphere.io/v1beta1/workspaces/${workspace}${getPath(
      restParams,
    )}/namespaces`;
  }

  return `${apiVersion}${getPath(params)}/namespaces`;
}

function getWatchListUrlFn(pathParams?: PathParams): string {
  const { workspace, ...params } = pathParams || {};

  if (workspace) {
    return `${apiVersion}/watch${getPath(
      params,
    )}/namespaces?labelSelector=kubesphere.io/workspace=${workspace}`;
  }

  return `${apiVersion}/watch${getPath(params)}/namespaces`;
}

function mapper(item: OriginalNamespace): FormattedNamespace {
  return {
    ...getBaseInfo(item),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations', {}),
    workspace: get(item, 'metadata.labels["kubesphere.io/workspace"]', ''),
    status: get(item, 'status.phase'),
    isFedHostNamespace:
      get(item, 'metadata.labels["kubesphere.io/kubefed-host-namespace"]') === 'true',
    _originData: getOriginData(item),
  };
}

const BaseStore = baseStore({ module, mapper, getListUrlFn, getWatchListUrlFn });

type UseNamespaceListOptions = PathParams & {
  username?: string;
  type?: string;
  ascending?: boolean;
  limit?: number;
  labelSelector?: string;
};

export function useNamespaceList(
  { cluster, workspace, namespace, type, username, ...params }: UseNamespaceListOptions,
  options?: Partial<UseListOptions<FormattedNamespace>>,
): UseListInstance<FormattedNamespace> {
  let url: string = '';
  if (username) {
    url = `kapis/tenant.kubesphere.io/v1beta1/workspaces/${workspace}${getPath({
      cluster,
      namespace,
    })}/workspacemembers/${username}/namespaces`;
  } else {
    url = getResourceUrl({ cluster, workspace, namespace });
  }
  const formattedParams = formatFetchListParams(module, params as FetchListParams);

  if (type === 'system') {
    formattedParams.labelSelector = 'kubesphere.io/workspace=system-workspace';
  } else if (type === 'user') {
    formattedParams.labelSelector =
      'kubesphere.io/workspace!=system-workspace,kubesphere.io/managed=true';
  } else {
    formattedParams.labelSelector = formattedParams.labelSelector || `kubesphere.io/managed=true`;
  }

  return useList<FormattedNamespace>({
    url,
    format: mapper,
    params: formattedParams,
    autoFetch: !!workspace || !!cluster,
    ...options,
  });
}

const store = {
  ...BaseStore,
  module,
  mapper,
  useNamespaceList,
};

export default store;
