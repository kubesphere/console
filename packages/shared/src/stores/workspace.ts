/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useMemo } from 'react';
import type { MutateOptions, QueryFunctionContext } from 'react-query';
import { useMutation, useQuery, useInfiniteQuery } from 'react-query';
import { keyBy, get, set, cloneDeep, merge, isEmpty } from 'lodash';

import type { FormattedCluster } from '../types/cluster';
import { Constants } from '../constants';
import { useList, useUrl } from '../hooks';
import type { List, UseListInstance } from '../hooks/useList/types';
import type {
  WorkspaceOverride,
  OriginalWorkspace,
  OriginalWorkspaceList,
  FormattedWorkspace,
  OriginalClusterList,
  UpdateSingleClusterNetworkIsolationMutationVariables,
  UpdateMultiClusterNetworkIsolationMutationVariables,
  PathParams,
} from '../types';
import { request, getBaseInfo, getOriginData, getResourceCreator, isMultiCluster } from '../utils';

import baseStore from './store';
import clusterStore from './cluster';

const { mapper: clusterMapper } = clusterStore;

const name = 'WORKSPACE';
const module = 'workspaces';

const workspaceMapper = (item: OriginalWorkspace): FormattedWorkspace => {
  const overrides = get(item, 'spec.overrides', []);
  const template = get(item, 'spec.template', {});
  const clusters: any[] = get(item, 'spec.placement.clusters', []);

  const overrideClusterMap: Record<string, any> = keyBy(overrides, 'clusterName');
  const clusterTemplates: Record<string, any> = {};

  clusters.forEach(({ name: clusterName }) => {
    clusterTemplates[clusterName] = cloneDeep(template);
    if (overrideClusterMap[clusterName] && overrideClusterMap[clusterName].clusterOverrides) {
      overrideClusterMap[clusterName].clusterOverrides.forEach((cod: any) => {
        const path = cod.path.startsWith('/') ? cod.path.slice(1) : cod.path;
        set(clusterTemplates[clusterName], path.replace(/\//g, '.'), cod.value);
      });
    }
  });

  return {
    ...item,
    ...getBaseInfo(item),
    annotations: get(item, 'metadata.annotations', {}),
    manager:
      get(item, 'spec.template.spec.manager') ||
      get(item, 'spec.manager') ||
      getResourceCreator(item),
    clusters,
    networkIsolation: get(item, 'metadata.annotations["kubesphere.io/network-isolate"]', false),
    overrides,
    clusterTemplates,
    _originData: getOriginData(item),
  };
};

const { getResourceUrl, getPath } = useUrl({ module });

const getTenantUrl = (params = {}) =>
  globals.clusterRole === 'host'
    ? `kapis/tenant.kubesphere.io/v1beta1${getPath(params)}/workspacetemplates`
    : `kapis/tenant.kubesphere.io/v1beta1${getPath(params)}/${module}`;

const getResourceWorkspacetemplateUrl = (params = {}) => {
  return `kapis/resources.kubesphere.io/v1alpha3${getPath(params)}/workspacetemplates`;
};

const getListUrlFn = (params: Record<string, any> = {}) =>
  params.cluster ? getResourceUrl(params) : getTenantUrl(params);

const BaseStore = baseStore({ module, mapper: workspaceMapper, getListUrlFn });
const { getListUrl, getDetailUrl, checkName, fetchDetail } = BaseStore;

const fetchWorkspaceDetail = async ({
  name: workspaceName,
  cluster,
}: Pick<PathParams, 'name' | 'cluster'>) => {
  if (isEmpty(workspaceName)) {
    return;
  }

  return fetchDetail({ name: workspaceName, cluster });
};

const patch = async (params: PathParams, data: Record<string, any>) => {
  const annotations = data?.metadata?.annotations;
  const spec = data?.spec;
  const requestData = [
    {
      op: 'add',
      path: '/metadata/annotations',
      value: annotations,
    },
    {
      op: 'add',
      path: '/spec',
      value: spec,
    },
  ];
  return request.patch<never, OriginalWorkspace>(getDetailUrl(params), requestData);
};

interface DeleteWorkspaceOptions extends PathParams {
  shouldDeleteResource?: boolean;
}

const deleteWorkspace = ({ shouldDeleteResource, ...params }: DeleteWorkspaceOptions) => {
  const data = {
    kind: 'DeleteOptions',
    apiVersion: 'v1',
    propagationPolicy: shouldDeleteResource ? 'Background' : 'Orphan',
  };
  return request.delete<never, OriginalWorkspace, Record<string, any>>(getDetailUrl(params), {
    data,
  });
};

const batchDelete = (items: DeleteWorkspaceOptions[]) => {
  const promises = items.map(deleteWorkspace);
  return Promise.allSettled(promises);
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

const useDeleteMutation = (
  options?: Pick<MutateOptions<OriginalWorkspace, unknown, DeleteWorkspaceOptions>, 'onSuccess'>,
) => {
  const onSuccess = options?.onSuccess;
  return useMutation<OriginalWorkspace, unknown, DeleteWorkspaceOptions>({
    mutationFn: deleteWorkspace,
    onSuccess,
  });
};

const useBatchDeleteMutation = (
  options?: Pick<
    MutateOptions<PromiseSettledResult<OriginalWorkspace>[], unknown, DeleteWorkspaceOptions[]>,
    'onSuccess'
  >,
) => {
  const onSuccess = options?.onSuccess;
  return useMutation<PromiseSettledResult<OriginalWorkspace>[], unknown, DeleteWorkspaceOptions[]>(
    variables => Promise.allSettled(variables.map(deleteWorkspace)),
    { onSuccess },
  );
};

const nameValidator = async function (pathParams?: PathParams, params?: Record<string, any>) {
  const resp = await checkName(pathParams ?? {}, { params });
  if (resp.exist) {
    return Promise.reject(t('WORKSPACE_NAME_EXISTS_DESC'));
  }
  return Promise.resolve();
};

/* export const useGetWorkspaceRoleBinding = (
  group: string,
  { cluster, workspace, namespace, ...rest }: Record<string, any>,
) => {
  const apiVersion = 'kapis/iam.kubesphere.io/v1beta1';
  const params = rest;
  if (group) {
    params.labelSelector = `iam.kubesphere.io/group-ref=${group}`;
  }
  return useQuery([cluster, workspace, namespace], async () => {
    if (!workspace) {
      return {};
    }
    const res = await request.get(
      `${apiVersion}${getPath({
        cluster,
        workspace,
        namespace,
      })}/workspacerolebindings`,
      { params },
    );
    return res as any;
  });
}; */

type FilteredParams = PathParams & { [key: string]: any };

const getWorkspaceFilterParams = (
  params: PathParams & { app?: string; labelSelector?: string },
): FilteredParams => {
  const filteredParams: FilteredParams = { ...params };

  if (!filteredParams.sortBy && filteredParams.ascending === undefined) {
    filteredParams.sortBy = Constants.LIST_DEFAULT_ORDER || 'createTime';
  }

  if (filteredParams.limit === Infinity || filteredParams.limit === -1) {
    filteredParams.limit = -1;
    filteredParams.page = 1;
  }

  filteredParams.limit = filteredParams.limit || 10;

  if (filteredParams.app) {
    filteredParams.labelSelector = filteredParams.labelSelector || '';
    filteredParams.labelSelector += `app.kubernetes.io/name=${filteredParams.app}`;
    delete filteredParams.app;
  }

  return filteredParams;
};

const useWorkspaces = (
  params: PathParams & { [key: string]: unknown },
  onSuccess?: (data: List<FormattedWorkspace>) => void,
): UseListInstance<any> => {
  const { cluster, workspace, namespace, devops, ...rest } = params;
  const queryParams = getWorkspaceFilterParams(rest);
  const url = getListUrl({ cluster, workspace, namespace, devops });
  const result = useList<FormattedWorkspace>({
    url,
    params: queryParams,
    format: workspaceMapper,
    onSuccess,
  });
  const data = useMemo(
    () =>
      result.data?.map(item => ({
        ...item,
        workspace: params.workspace,
      })),
    [result.data],
  );

  return {
    ...result,
    data,
  };
};

const useFetchAllWorkspaces = (
  params: PathParams & { [key: string]: unknown },
  onSuccess?: (data: List<FormattedWorkspace>) => void,
): UseListInstance<any> => {
  const { cluster, workspace, namespace, devops, ...rest } = params;
  const queryParams = getWorkspaceFilterParams(rest);
  const url = getResourceWorkspacetemplateUrl();
  const result = useList<FormattedWorkspace>({
    url,
    params: queryParams,
    format: workspaceMapper,
    onSuccess,
  });
  const data = useMemo(
    () =>
      result.data?.map(item => ({
        ...item,
        workspace: params.workspace,
      })),
    [result.data],
  );

  return {
    ...result,
    data,
  };
};

interface FetchWorkspacesParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  name?: string;
}

interface UseFetchWorkspacesInfiniteQueryOptions extends PathParams {
  params?: FetchWorkspacesParams;
}

const useFetchWorkspacesInfiniteQuery = (options?: UseFetchWorkspacesInfiniteQueryOptions) => {
  const defaultParams = { limit: 10, page: 1, sortBy: 'createTime' };
  const { cluster, workspace, namespace, devops, params } = { ...options };
  const url = getListUrl({ cluster, workspace, namespace, devops });
  const finaleParams = { ...defaultParams, ...params };
  const queryKey = [url, finaleParams];

  const result = useInfiniteQuery({
    queryKey,
    queryFn: async ({
      queryKey: key,
      pageParam = defaultParams,
    }: QueryFunctionContext<
      typeof queryKey,
      Omit<Required<FetchWorkspacesParams>, 'name'> & Pick<FetchWorkspacesParams, 'name'>
    >) => {
      // @ts-ignore
      const p = { ...pageParam, name: key[1].name };
      const workspaceList = await request.get<never, OriginalWorkspaceList>(url, {
        params: p,
      });
      return { ...workspaceList, ...pageParam };
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

  const originalWorkspaces = result.data?.pages.flatMap(({ items }) => items) ?? [];
  const formattedWorkspaces = originalWorkspaces.map(workspaceMapper);
  return { ...result, queryKey, originalWorkspaces, formattedWorkspaces };
};

interface UseFetchWorkspaceQueryOptions {
  workspace: string;
  cluster?: string;
  enabled?: boolean;
}

const useFetchWorkspaceQuery = ({
  workspace,
  cluster,
  enabled = true,
}: UseFetchWorkspaceQueryOptions) => {
  const url = getDetailUrl({ name: workspace, cluster });
  const queryKey = [url];
  // const navigate = useNavigate();

  const result = useQuery({
    queryKey,
    queryFn: () =>
      request.get<never, OriginalWorkspace>(url).catch(error => {
        // TODO: https://github.com/donniean/kubesphere-console/blob/a4412e297142d400f4c566fb039d01110202f732/src/stores/workspace.js#L71
        return Promise.reject(error);
      }),
    enabled,
  });
  const originalWorkspace = result.data;

  const formattedWorkspace = originalWorkspace ? workspaceMapper(originalWorkspace) : undefined;
  const workspaceDetail = formattedWorkspace
    ? {
        ...formattedWorkspace,
        cluster,
      }
    : undefined;

  return {
    ...result,
    queryKey,
    originalWorkspace,
    formattedWorkspace,
    workspaceDetail,
  };
};

const useFetchWorkspaceClustersQuery = ({
  workspace,
  hasDefaultCluster = true,
  enabled = isMultiCluster() && !!workspace,
  onSuccess,
}: {
  workspace: string | undefined;
  hasDefaultCluster?: boolean;
  enabled?: boolean;
  onSuccess?: (data: FormattedCluster[]) => void;
}) => {
  const result = useQuery(
    ['workspace', 'clusters', workspace],
    () =>
      request.get<never, OriginalClusterList>(
        `kapis/tenant.kubesphere.io/v1beta1/workspaces/${workspace}/clusters`,
        {},
      ),
    {
      enabled,
      onSuccess: data => onSuccess?.(data.items?.map(clusterMapper) ?? []),
    },
  );
  const originalClusters =
    result.data?.items ?? (hasDefaultCluster ? [Constants.DEFAULT_CLUSTER] : []);

  const formattedClusters = useMemo(() => originalClusters.map(clusterMapper), [originalClusters]);

  return { ...result, originalClusters, formattedClusters };
};

interface UseUpdateSingleClusterNetworkIsolationMutationOptions {
  onSuccess?: MutateOptions<
    OriginalWorkspace,
    unknown,
    UpdateSingleClusterNetworkIsolationMutationVariables
  >['onSuccess'];
}

const useUpdateSingleClusterNetworkIsolationMutation = (
  options?: UseUpdateSingleClusterNetworkIsolationMutationOptions,
) => {
  return useMutation<
    OriginalWorkspace,
    unknown,
    UpdateSingleClusterNetworkIsolationMutationVariables
  >({
    mutationFn: variables => {
      const { workspaceDetail, networkIsolation } = variables;
      const url = getDetailUrl(workspaceDetail);
      const templateSpec = workspaceDetail._originData?.spec?.template?.spec ?? {};
      const value = merge({}, templateSpec, { networkIsolation });
      const data = [
        {
          op: 'add',
          path: '/spec/template/spec',
          value,
        },
      ];
      return request.patch(url, data);
    },
    onSuccess: options?.onSuccess,
  });
};

interface UseUpdateMultiClusterNetworkIsolationMutationOptions {
  onSuccess?: MutateOptions<
    OriginalWorkspace,
    unknown,
    UpdateMultiClusterNetworkIsolationMutationVariables
  >['onSuccess'];
}

const useUpdateMultiClusterNetworkIsolationMutation = (
  options?: UseUpdateMultiClusterNetworkIsolationMutationOptions,
) => {
  return useMutation<
    OriginalWorkspace,
    unknown,
    UpdateMultiClusterNetworkIsolationMutationVariables
  >({
    mutationFn: variables => {
      const { workspace, clusterName, isNetworkIsolationEnabled } = variables;
      const url = `/clusters/${clusterName}/apis/tenant.kubesphere.io/v1beta1/workspaces/${workspace}`;
      const data = {
        metadata: {
          annotations: {
            'kubesphere.io/network-isolate': isNetworkIsolationEnabled ? 'enabled' : 'disabled',
          },
        },
      };
      return request.patch(url, data);
    },
    onSuccess: options?.onSuccess,
  });
};

const store = {
  ...BaseStore,
  name,
  module,
  mapper: workspaceMapper,
  fetchDetail: fetchWorkspaceDetail,
  patch,
  delete: deleteWorkspace,
  batchDelete,
  usePatchMutation,
  useDeleteMutation,
  useBatchDeleteMutation,
  // custom
  nameValidator,
  useWorkspaces,
  useFetchAllWorkspaces,
  useFetchWorkspacesInfiniteQuery,
  useFetchWorkspaceQuery,
  useFetchWorkspaceClustersQuery,
  useUpdateSingleClusterNetworkIsolationMutation,
  useUpdateMultiClusterNetworkIsolationMutation,
};

export default store;
