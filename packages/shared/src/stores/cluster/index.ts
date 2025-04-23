/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import dayjs from 'dayjs';
import { keyBy, get, has, cloneDeep, set, noop, omit } from 'lodash';
import { useInfiniteQuery, useQuery, QueryFunctionContext } from 'react-query';

import type {
  PathParams,
  OriginalCluster,
  FormattedCluster,
  KubeConfig,
  OriginalClusterList,
} from '../../types';
import { Constants } from '../../constants';
import { DEFAULT_CLUSTER } from '../../constants/common';
import type { UseListOptions, ListData } from '../../hooks';
import { useList } from '../../hooks';
import { request, getBaseInfo, getOriginData, isMultiCluster } from '../../utils';
import baseStore from '../store';
import { getResult } from '../monitoring';

const mapper = (item: OriginalCluster): FormattedCluster => {
  const conditions = keyBy(get(item, 'status.conditions', []), 'type');
  const configz = get(item, 'status.configz', {});
  configz.ksVersion = get(item, 'status.kubeSphereVersion', '');
  // configz.ksVersion = 'v4.0.0';
  const expiredDate = get(conditions, 'KubeConfigCertExpiresInSevenDays.message');
  const expiredDay = expiredDate ? dayjs(expiredDate).diff(dayjs(), 'day') : undefined;

  return {
    ...getBaseInfo(item),
    conditions,
    configz,
    provider: get(item, 'spec.provider'),
    isHost: has(get(item, 'metadata.labels', {}), 'cluster-role.kubesphere.io/host'),
    expiredDay,
    kkName: get(item, 'metadata.labels["kubekey.kubesphere.io/name"]', ''),
    nodeCount: get(item, 'status.nodeCount'),
    kubernetesVersion: get(item, 'status.kubernetesVersion'),
    labels: get(item, 'metadata.labels'),
    group: get(item, 'metadata.labels["cluster.kubesphere.io/group"]', ''),
    isReady: isMultiCluster() ? get(conditions, 'Ready.status') === 'True' : true,
    visibility: get(item, 'metadata.labels["cluster.kubesphere.io/visibility"]'),
    connectionType: get(item, 'spec.connection.type'),
    _originData: getOriginData(item),
  };
};

const module = 'clusters';

const BaseStore = baseStore({ module, mapper });

const { getResourceUrl, getPath, getDetailUrl, getWatchListUrl } = BaseStore;

const getTenantUrl = (params = {}) =>
  `kapis/tenant.kubesphere.io/v1beta1${getPath(params)}/${module}`;

const getAgentUrl = ({ cluster }: PathParams) =>
  `kapis/tower.kubesphere.io/v1alpha1/deployment?cluster=${cluster}`;

const singleClusterListInstance = {
  total: 1,
  page: 1,
  pageSize: 1,
  data: [Constants.DEFAULT_CLUSTER].map(mapper),
  isLoading: false,
  isFirst: true,
  isLast: true,
  prevPage: noop,
  nextPage: noop,
  gotoPage: noop,
  refresh: noop,
  reFetch: noop,
  clear: noop,
};

async function fetchAgent(params: PathParams) {
  const result = await request.get<never, string>(getAgentUrl(params));
  return result;
}

async function fetchDetail(params: PathParams): Promise<FormattedCluster> {
  let detail;
  const clusterName = params.name || Constants.DEFAULT_CLUSTER;

  if (!isMultiCluster()) {
    detail = mapper(cloneDeep(Constants.DEFAULT_CLUSTER));
  } else {
    const url = `${getResourceUrl(params)}/${params.name}`;
    const result = await request.get<never, OriginalCluster>(url);

    detail = { ...params, ...mapper(result) };
  }

  set(globals, `clusterConfig.${clusterName}`, detail.configz);

  return detail;
}

const useFetchStatisticsQuery = (cluster?: string) => {
  const url = isMultiCluster() ? `clusters/${cluster}/overview` : 'overview';
  return useQuery(['clusterOverviewStatistics', url, cluster], async () => {
    const res = await request.get<never>(url);
    return getResult(res);
  });
};

const fetchList = (
  params: Record<string, any>,
  isGranted?: boolean,
  options?: Omit<UseListOptions<FormattedCluster>, 'url' | 'params' | 'format'>,
) => {
  if (!params.sortBy && params.ascending === undefined) {
    params.sortBy = Constants.LIST_DEFAULT_ORDER[module] || 'createTime';
  }

  if (params.limit === Infinity || params.limit === -1) {
    params.limit = -1;
    params.page = 1;
  }

  params.limit = params.limit ?? 10;

  if (!isMultiCluster()) {
    return singleClusterListInstance;
  }

  const url = !isGranted ? getResourceUrl() : getTenantUrl(params); // FIXME: getResourceUrl isn't need params ???

  return useList<FormattedCluster>({
    url,
    params,
    format: mapper,
    ...options,
  });
};

const baseFetchList = async (
  params: Record<string, any>,
  isGranted?: boolean,
  options?: Omit<Record<string, any>, 'url' | 'params' | 'format'>,
) => {
  if (!params.sortBy && params.ascending === undefined) {
    params.sortBy = Constants.LIST_DEFAULT_ORDER[module] || 'createTime';
  }

  if (params.limit === Infinity || params.limit === -1) {
    params.limit = -1;
    params.page = 1;
  }

  params.limit = params.limit ?? 10;

  const url = !isGranted ? getResourceUrl() : getTenantUrl(params); // FIXME: getResourceUrl isn't need params ???

  const result: any = await request.get(url, {
    ...options,
    params: params,
  });

  const data = (result.items || []).map((item: Record<string, unknown>) => ({
    ...item,
    ...mapper(item as any),
  }));

  return {
    data: data,
    total: result.totalItems || result.totalCount || result.total_count || data.length || 0,
    ...params,
    limit: Number(params.limit) || 10,
    page: Number(params.page) || 1,
  };
};

const fetchGrantedList = (params: Record<string, any>, options = {}) => {
  if (!params.sortBy && params.ascending === undefined) {
    params.sortBy = Constants.LIST_DEFAULT_ORDER[module] || 'createTime';
  }

  if (params.limit === Infinity || params.limit === -1) {
    params.limit = -1;
    params.page = 1;
  }

  params.limit = params.limit || 10;

  let result: { items: OriginalCluster[]; totalItems?: number };
  const tenantParams = {
    ...params,
    labelSelector: `${
      params.labelSelector ? `${params.labelSelector},` : ''
    }cluster.kubesphere.io/visibility!=public`,
  };

  const resourceParams = {
    ...omit(params, ['roleBindingExists']),
    labelSelector: `${
      params.labelSelector ? `${params.labelSelector},` : ''
    }cluster.kubesphere.io/visibility=public`,
  };

  return useQuery(
    ['GrantedClusterResource'],
    async () => {
      if (!isMultiCluster()) {
        return [DEFAULT_CLUSTER].map(mapper);
      }
      const [tenantList, resList] = await Promise.all([
        request.get<never, ListData<OriginalCluster>>(getTenantUrl({}), {
          params: tenantParams,
        }),
        request.get<never, ListData<OriginalCluster>>(getResourceUrl({}), {
          params: resourceParams,
        }),
      ]);

      result = {
        items: [...(resList?.items ?? []), ...(tenantList?.items ?? [])],
        totalItems: (tenantList.totalItems || 0) + (resList.totalItems || 0),
      };
      const lists: FormattedCluster[] = result?.items?.map(mapper);
      return lists || [];
    },
    options,
  );
};

function useClusterList(options?: Partial<UseListOptions<FormattedCluster>>) {
  const params = options?.params ?? {};
  const mode = options?.mode;
  const result = fetchList(params, true, { mode });
  const formattedClusters = result.data ?? [];
  return { ...result, formattedClusters };
}

async function getKsVersion(params: PathParams): Promise<number> {
  let ksVersion;
  const configVersion = get(globals.clusterConfig, `${params.cluster}.ksVersion`, '');
  if (configVersion !== '') {
    ksVersion = configVersion.replace(/[^\d.]/g, '');
  } else {
    let result;
    if (globals.ksConfig.multicluster) {
      result = await request.get(`/clusters/${params.cluster}/version`);
    } else {
      result = await request.get(`/version`);
    }
    ksVersion = get(result, 'gitVersion', '').replace(/[^\d.]/g, '');
  }
  return Number(ksVersion.split('.').slice(0, 2).join('.'));
}

async function fetchAllCluster(): Promise<OriginalCluster[]> {
  const result = await request.get(getTenantUrl());

  return get(result, 'items', []);
}

async function fetchVersion({ cluster }: PathParams): Promise<string> {
  const result = await request.get(`/clusters/${cluster}/version`.replace('/clusters/default', ''));

  return get(result, 'kubernetes.gitVersion', '');
}

async function updateKubeConfig(cluster: string, data: KubeConfig): Promise<void> {
  return request.put(`kapis/cluster.kubesphere.io/v1alpha1/clusters/${cluster}/kubeconfig`, data);
}

function patchCluster(params: PathParams, newObject: any): Promise<unknown> {
  return request.patch(getDetailUrl(params), newObject);
}

function unbindCluster(params: PathParams): Promise<unknown> {
  return request.delete(getDetailUrl(params));
}

async function fetchClusterConfigz({ cluster }: PathParams): Promise<void> {
  const detail = await fetchDetail({ name: cluster });
  set(globals, `clusterConfig.${cluster}`, detail.configz);
}

async function fetchWorkspaceClusters(workspace: string, params?: Record<string, any>) {
  return request.get<any, { items: OriginalCluster[] }>(
    `kapis/tenant.kubesphere.io/v1beta1/workspaces/${workspace}/clusters`,
    params,
  );
}

const useQueryWorkspaceClusters = (workspace?: string, options: Record<string, any> = {}) => {
  return useQuery(
    ['workspaceClusters', workspace],
    async () => {
      const params = {};

      let result: { items: OriginalCluster[] };
      if (workspace) {
        result = await fetchWorkspaceClusters(workspace);
      } else {
        result = { items: [DEFAULT_CLUSTER] };
      }
      return result?.items?.map(mapper);
    },
    options,
  );
};

interface FetchClustersParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  name?: string;
  labelSelector?: string;
}

interface UseFetchClustersInfiniteQueryOptions extends PathParams {
  params?: FetchClustersParams;
}

const useFetchClustersInfiniteQuery = (options: UseFetchClustersInfiniteQueryOptions) => {
  const defaultParams = { limit: 10, page: 1, sortBy: 'createTime' };
  const { params = {} } = options;
  const url = getTenantUrl();
  const finaleParams = { ...defaultParams, ...params };

  const queryKey = [url, finaleParams];
  const result = useInfiniteQuery({
    queryKey,
    queryFn: async ({
      queryKey: key,
      pageParam = defaultParams,
    }: QueryFunctionContext<
      typeof queryKey,
      Omit<Required<FetchClustersParams>, 'name' | 'labelSelector'> &
        Pick<FetchClustersParams, 'name' | 'labelSelector'>
    >) => {
      // @ts-ignore
      const p = { ...key[1], ...pageParam };
      const clustersList = await request.get<never, OriginalClusterList>(url, {
        params: p,
      });
      return { ...clustersList, ...pageParam };
    },
    getNextPageParam: lastPage => {
      const { items, totalItems, limit, page, ...rest } = lastPage;
      const hasNextPage = limit * (page - 1) + items.length < totalItems;
      if (!hasNextPage) {
        return;
      }
      return { limit, page: page + 1, ...rest };
    },
  });
  const originalClusters = result.data?.pages.flatMap(({ items }) => items) ?? [];
  const formattedClusters = originalClusters.map(mapper);
  return { ...result, queryKey, originalClusters, formattedClusters };
};

const validate = (data: any) => {
  return request.post('kapis/cluster.kubesphere.io/v1alpha1/clusters/validation', data, {
    headers: { 'x-ignore-error-notify': 'true' },
  });
};

const store = {
  ...BaseStore,
  module,
  mapper,
  useFetchStatisticsQuery,
  getWatchListUrl,
  fetchDetail,
  fetchAgent,
  fetchList,
  baseFetchList,
  useClusterList,
  getKsVersion,
  fetchVersion,
  updateKubeConfig,
  patchCluster,
  unbindCluster,
  fetchClusterConfigz,
  useQueryWorkspaceClusters,
  validate,
  fetchGrantedList,
  fetchAllCluster,
  useFetchClustersInfiniteQuery,
};

export default store;
