/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useMutation, useQuery } from 'react-query';
import { get, isEmpty, set } from 'lodash';
import { request } from '../utils';
import { getPaginationInfo } from '../utils/request.helper';
import { useUrl } from '../hooks';

import { LIST_DEFAULT_ORDER } from '../constants/common';

type FilterParams = {
  sortBy?: string;
  ascending?: string;
  limit?: number;
  page?: number;
};

import type { PathParams } from '../types';

export default function BaseStore<T extends PathParams>({
  module,
  apiVersion,
  getListUrlFn,
  mapper,
  storeFn,
}: {
  module: string;
  apiVersion?: string;
  mapper?: <M extends Record<string, any>>(item: M) => T;
  getListUrlFn?: (params?: PathParams) => string;
  storeFn: (res: any) => Record<string, any>;
}) {
  const { getResourceUrl, getListUrl, getDetailUrl, getWatchListUrl, getPath, getWatchUrl } =
    useUrl({
      module,
      getListUrlFn,
      apiVersion,
    });

  let formatFn = mapper || ((data: Record<string, any>) => data);

  const getFilterParams = (params: Record<string, any>) => {
    const result = { ...params };
    if (result.app) {
      result.labelSelector = result.labelSelector || '';
      result.labelSelector += `app.kubernetes.io/name=${result.app}`;
      delete result.app;
    }
    return result;
  };

  const fetchList = async (
    { cluster, workspace, namespace, devops, ...params } = {} as PathParams & FilterParams,
  ): Promise<any> => {
    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[module] || 'createTime';
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1;
      params.page = 1;
    }

    params.limit = params.limit || 10;

    const result: any = await request.get(
      getResourceUrl({ cluster, workspace, namespace, devops }),
      getFilterParams(params),
    );
    const data = (get(result, 'items', []) as any[]).map((item: Record<string, unknown>) => ({
      cluster,
      namespace,
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

  const fetchListByK8s = async (
    { cluster, namespace, ...rest } = {} as PathParams,
  ): Promise<any> => {
    const params = rest;

    const result: any = await request.get(getListUrl({ cluster, namespace, module }), {
      params,
    });

    const data = Array.isArray(result.items)
      ? result.items.map((item: Record<string, any>) => ({
          cluster,
          module: module,
          ...formatFn(item),
        }))
      : [];

    return data;
  };

  const fetchDetail = async (params: PathParams) => {
    const result = await request.get(getDetailUrl(params));
    const detail = { ...params, ...formatFn(result) };
    return detail;
  };

  const fetchDetailWithoutWarning = async (params: PathParams) => {
    let urlNotSupport = false;

    const result = await request.get(getDetailUrl(params)).catch(({ response, error }) => {
      if (error) {
        if (error.status === 404) {
          urlNotSupport = true;
        }
        return {};
      }
      return response;
    });

    if (urlNotSupport) {
      return { urlNotSupport };
    }

    const detail = !isEmpty(result) ? { ...params, ...formatFn(result) } : {};
    return detail;
  };

  const create = async (data: Record<string, any>, params = {}) => {
    return request.post(getListUrl(params), data);
  };

  const useUpdateMutation = (params: PathParams, options?: { onSuccess?: () => void }) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      async (data: Record<string, any>) => {
        const result = await request.get(getDetailUrl(params));
        const resourceVersion = get(result, 'metadata.resourceVersion');
        if (resourceVersion) {
          set(data, 'metadata.resourceVersion', resourceVersion);
        }
        return request.put(getDetailUrl(params), data);
      },
      {
        onSuccess,
      },
    );
  };

  const usePatchMutation = (params: PathParams, options?: { onSuccess?: () => void }) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      async (data: Record<string, any>) => {
        return request.patch(getDetailUrl(params), data);
      },
      {
        onSuccess,
      },
    );
  };

  const deleteMutationFn = (detail: T) => {
    const url = getDetailUrl(detail);
    return request.delete(url);
  };

  const useDeleteMutation = (options?: { onSuccess?: () => void }) => {
    const onSuccess = options?.onSuccess;
    return useMutation(deleteMutationFn, { onSuccess });
  };

  const useBatchDeleteMutation = (options?: { onSuccess?: () => void }) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      (items: T[]) => {
        const promises = items.map(deleteMutationFn);
        return Promise.allSettled(promises);
      },
      { onSuccess },
    );
  };

  const checkName = async (params: PathParams, query: Record<string, any>) => {
    return request.get(getDetailUrl(params), { ...query, headers: { 'x-check-exist': 'true' } });
  };

  const checkLabels = async ({ labels, ...params }: Record<string, any>) => {
    return request.get(getListUrl(params), {
      params: {
        labelSelector: Object.keys(labels)
          .map(key => `${key}=${labels[key]}`)
          .join(','),
      },
      headers: { 'x-check-exist': 'true' },
    });
  };

  const getKsVersion = async (params: PathParams) => {
    let result;
    let ksVersion;
    const configVersion = get(globals.clusterConfig, `${params.cluster}.ksVersion`, '');
    if (configVersion !== '') {
      ksVersion = configVersion.replace(/[^\d.]/g, '');
    } else {
      if (globals.ksConfig.multicluster) {
        result = await request.get(`/clusters/${params.cluster}/version`);
      } else {
        result = await request.get(`/version`);
      }
      ksVersion = get(result, 'gitVersion', '').replace(/[^\d.]/g, '');
    }
    const version = Number(ksVersion.split('.').slice(0, 2).join('.'));
    return version;
  };

  const useGetDetail = (params: PathParams) => {
    return useQuery([module, params], async () => {
      const data = await request.get(getDetailUrl(params));
      return { ...params, ...formatFn(data) };
    });
  };

  return storeFn({
    getPath,
    getResourceUrl,
    getListUrl,
    getDetailUrl,
    getWatchUrl,
    getWatchListUrl,
    fetchList,
    fetchListByK8s,
    fetchDetail,
    fetchDetailWithoutWarning,
    create,
    useUpdateMutation,
    usePatchMutation,
    useDeleteMutation,
    useBatchDeleteMutation,
    checkName,
    checkLabels,
    getKsVersion,
    useGetDetail,
  });
}
