/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { FormattedNamespace, OriginalNamespace, PathParams } from '../types';
import { getApiVersion, getBaseInfo, getOriginData } from '../utils';
import * as Constants from '../constants/common';
import { useUrl } from '../hooks';
import { get, omit } from 'lodash';
import getBaseStore from './store';
import { getStoreWithQueryHooks } from './useStore';

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

export function getListUrlFn(params1?: PathParams): string {
  const params = omit(params1, ['namespace']);
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

const baseStore = getBaseStore({
  module,
  mapper,
  getListUrlFn,
  getResourceUrlFn: getResourceUrl as any,
  getWatchListUrlFn,
});

const store = {
  ...baseStore,
  module,
  mapper,
  apiVersion,
};

export default getStoreWithQueryHooks(store);
