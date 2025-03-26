/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  formatFetchListParams,
  getPath,
  PathParams,
  storageClassStore as Store,
} from '@ks-console/shared';
import { request, requestHelper } from '@ks-console/shared';

const { getPaginationInfo } = requestHelper;

import { getStoreWithQueryHooks } from './useStore';

const { module, mapper } = Store;

const getResourceUrl = ({ cluster, namespace, ksApi }: PathParams) => {
  const apiVersion = ksApi ? '/kapis/storage.kubesphere.io/v1alpha1' : '/kapis/storage.k8s.io/v1';
  return `${apiVersion}${getPath({
    cluster,
    namespace,
  })}/${module}`;
};

const getFilterParams = (params: any) => {
  delete params.ksApi;
  return params;
};

let formatFn = mapper || ((data: Record<string, any>) => data);

const fetchStorageClasses = async (
  { cluster, workspace, namespace, devops, ...params } = {} as any,
): Promise<any> => {
  const formattedParams = formatFetchListParams(module, params);
  const url = getResourceUrl({ cluster, workspace, namespace, devops, ...params });
  const { headers, ...params1 } = getFilterParams(formattedParams);
  const result: any =
    (await request.get(url, {
      params: params1,
      headers,
    })) ?? {};

  const data = (result.items || []).map((item: Record<string, unknown>) => ({
    cluster,
    namespace,
    ...item,
    ...formatFn(item),
  }));

  const limit = Number(params.limit) || 10;
  const page = Number(params.page) || 1;
  const { totalItemCount } = getPaginationInfo({
    ...result,
    remainingItemCount: result.metadata?.remainingItemCount,
    limit,
    page,
    currentPageData: data,
  });

  return {
    data: data,
    total: totalItemCount,
    ...params,
    limit,
    page,
  };
};

const storageClassStore = getStoreWithQueryHooks({ ...Store, fetchStorageClasses });

export default storageClassStore;
