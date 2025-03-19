/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useMutation, useQuery } from 'react-query';
import { get, isEmpty, merge, set } from 'lodash';

import { useUrl } from '../hooks';
import type { PathParams } from '../types';
import { FetchListParams, formatFetchListParams, request } from '../utils';
import { getPaginationInfo } from '../utils/request.helper';

type MutationFnParams = {
  params?: PathParams;
  data: Record<string, any>;
};

type MutationOptions = {
  onSuccess?: (data?: Record<string, any>, params?: Record<string, any>) => void;
  noGetDetail?: boolean;
};

export default function BaseStore<T extends PathParams>({
  module,
  apiVersion,
  getListUrlFn,
  getResourceUrlFn,
  getWatchListUrlFn,
  mapper,
}: {
  module: string;
  apiVersion?: string;
  mapper?: any;
  getListUrlFn?: (params?: PathParams) => string;
  getResourceUrlFn?: (params?: PathParams) => string;
  getWatchListUrlFn?: (params?: PathParams) => string;
}) {
  const {
    getPath,
    getDocsUrl,
    getListUrl,
    getWatchUrl,
    getDetailUrl,
    getResourceUrl,
    getWatchListUrl,
  } = useUrl({
    module,
    apiVersion,
    getListUrlFn,
    getResourceUrlFn,
    getWatchListUrlFn,
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
    { cluster, workspace, namespace, devops, ...params } = {} as FetchListParams,
  ): Promise<any> => {
    const formattedParams = formatFetchListParams(module, params);
    const { headers, ...params1 } = getFilterParams(formattedParams);
    const result: any =
      (await request.get(getResourceUrl({ cluster, workspace, namespace, devops }), {
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

  const fetchDetail = async (params: PathParams, url?: string) => {
    const k8sVersion = globals.clusterConfig?.[params.cluster!]?.k8sVersion;
    const result = await request.get(url ? url : getDetailUrl(params, k8sVersion));
    return { ...params, ...formatFn(result) };
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

  const post = async (params: PathParams, data: Record<string, any>) => {
    return request.post(getListUrl(params), data);
  };

  const usePostMutation = (requestParams?: PathParams, options?: MutationOptions) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      async ({ data, params }: MutationFnParams) => {
        const p = merge({}, requestParams, params);
        return post(p, data);
      },
      { onSuccess },
    );
  };

  const put = async (
    params: PathParams,
    data: Record<string, any>,
    noGetDetail = false,
    k8sVersion?: string,
  ) => {
    if (!noGetDetail) {
      const result = await request.get(getDetailUrl(params, k8sVersion));
      const resourceVersion = get(result, 'metadata.resourceVersion');
      if (resourceVersion) {
        set(data, 'metadata.resourceVersion', resourceVersion);
      }
    }

    return request.put(getDetailUrl(params, k8sVersion), data);
  };

  const usePutMutation = (requestParams?: PathParams, options?: MutationOptions) => {
    const onSuccess = options?.onSuccess;
    const noGetDetail = options?.noGetDetail ?? false;
    return useMutation(
      async ({ data, params }: MutationFnParams) => {
        const p = merge({}, requestParams, params);
        return put(p, data, noGetDetail);
      },
      {
        onSuccess,
      },
    );
  };

  const useUpdateMutation = usePutMutation;

  const patch = async (
    params: PathParams,
    data: Record<string, any>,
    config?: Record<string, any>,
    k8sVersion?: string,
  ) => {
    return request.patch(getDetailUrl(params, k8sVersion), data, config);
  };

  const usePatchMutation = (requestParams?: PathParams, options?: MutationOptions) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      async ({ data, params }: MutationFnParams) => {
        const p = merge({}, requestParams, params);
        return patch(p, data);
      },
      {
        onSuccess,
      },
    );
  };

  const del = (detail: Partial<T> & PathParams) => {
    const url = getDetailUrl(detail);
    return request.delete(url);
  };

  const batchDelete = (items: (Partial<T> & PathParams)[]) => {
    const promises = items.map(del);
    return Promise.allSettled(promises);
  };

  const useDeleteMutation = (options?: MutationOptions) => {
    const onSuccess = options?.onSuccess;
    return useMutation(del, { onSuccess });
  };

  const useBatchDeleteMutation = (options?: MutationOptions) => {
    const onSuccess = options?.onSuccess;
    return useMutation(
      (items: (Partial<T> & PathParams)[]) => {
        const promises = items.map(del);
        return Promise.allSettled(promises);
      },
      { onSuccess },
    );
  };

  const checkName = async (params: PathParams, query: Record<string, any>, url?: string) => {
    const k8sVersion = globals.clusterConfig?.[params.cluster!]?.k8sVersion;
    return request.get<never, { exist: boolean }>(url ? url : getDetailUrl(params, k8sVersion), {
      ...query,
      headers: { 'x-check-exist': 'true' },
    });
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

  const useGetMutation = (params: PathParams, options: Record<string, any> = {}) => {
    return useQuery(
      [module, params],
      async () => {
        const data = await request.get<never, T>(getDetailUrl(params));
        return { ...params, ...formatFn(data) } as T & PathParams;
      },
      options,
    );
  };

  return {
    getPath,
    getResourceUrl,
    getDocsUrl,
    getListUrl,
    getDetailUrl,
    getWatchUrl,
    getWatchListUrl,
    fetchList,
    fetchListByK8s,
    fetchDetail,
    fetchDetailWithoutWarning,
    post,
    patch,
    put,
    delete: del,
    batchDelete,
    usePostMutation,
    useUpdateMutation,
    usePutMutation,
    usePatchMutation,
    useDeleteMutation,
    useBatchDeleteMutation,
    checkName,
    checkLabels,
    getKsVersion,
    useGetMutation,
  };
}
