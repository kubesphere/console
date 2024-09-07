/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, noop, isEmpty } from 'lodash';
import getBaseStore from './store';
import { useMutation } from 'react-query';
import { getBaseInfo, getOriginData, getNodeRoles, FetchListParams, request } from '../utils';
import type { PathParams, OriginalNode, FormattedNode } from '../types';

const module = 'nodes';

const mapper = (item: OriginalNode): FormattedNode => ({
  ...getBaseInfo(item),
  labels: get(item, 'metadata.labels'),
  role: getNodeRoles(get(item, 'metadata.labels')),
  annotations: get(item, 'metadata.annotations'),
  status: get(item, 'status'),
  conditions: get(item, 'status.conditions', []),
  nodeInfo: get(item, 'status.nodeInfo'),
  spec: get(item, 'spec'),
  unschedulable: get(item, 'spec.unschedulable'),
  importStatus: get(item, 'metadata.labels["kubekey.kubesphere.io/import-status"]', 'success'),
  taints: get(item, 'spec.taints', []),
  ip:
    (get(item, 'status.addresses', []).find((a: any): any => a.type === 'InternalIP') || {})
      .address || '-',
  _originData: getOriginData(item),
});

const withTypeSelectParams = (params: any, type?: string): any => {
  const result = { ...params };

  if (type === 'node') {
    result.labelSelector = result.labelSelector
      ? result.labelSelector + ',!node-role.kubernetes.io/edge'
      : '!node-role.kubernetes.io/edge';
  } else if (type === 'edgenode') {
    result.labelSelector = result.labelSelector
      ? result.labelSelector + ',node-role.kubernetes.io/edge='
      : 'node-role.kubernetes.io/edge=';
  }

  if (result.role) {
    result.labelSelector += `,node-role.kubernetes.io/${params.role}=`;
    delete result.role;
  }

  if (params.filters?.length > 0) {
    params.filters.forEach((filter: any) => {
      result[filter.id] = filter.value;
    });
  }

  if (params.sortBy?.length > 0) {
    params.sortBy.forEach((sort: any) => {
      result.sortBy = sort.id;
      if (!sort.desc) {
        result.ascending = true;
      }
    });
  }
  return result;
};

const baseStore = getBaseStore<FormattedNode>({
  module,
  mapper,
});

const fetchList = async (
  { cluster, workspace, devops, type = 'node', ...params } = {} as FetchListParams & {
    type: string;
  },
): Promise<any> => {
  const queryParams = withTypeSelectParams(params, type);
  const result: any = await request.get(baseStore.getResourceUrl({ cluster, workspace, devops }), {
    params: queryParams,
  });
  const data = (get(result, 'items', []) as any[]).map((item: OriginalNode) => ({
    cluster,
    ...mapper(item),
  }));

  return {
    data: data,
    total: result.totalItems || result.totalCount || result.total_count || data.length || 0,
    ...params,
    limit: Number(params.limit) || 10,
    page: Number(params.page) || 1,
  };
};

const fetchCount = async (params: PathParams): Promise<any> => {
  const query: Object = {
    labelSelector: 'node-role.kubernetes.io/master|node-role.kubernetes.io/control-plane',
  };

  const { items = [], totalItems } = await request.get<never, any>(
    baseStore.getResourceUrl(params),
    {
      params: query,
    },
  );

  const masterWorker = items.filter((item: OriginalNode) => {
    const labels = getNodeRoles(item.metadata.labels);
    return labels.includes('worker');
  }).length;

  const masterNum = items.filter((item: OriginalNode) => {
    const labels = getNodeRoles(item.metadata.labels);
    return labels.includes('master') || labels.includes('control-plane');
  }).length;

  return { masterCount: totalItems, masterWorkerCount: masterWorker, masterNum };
};

const nodeCordon = async ({ cluster, name }: PathParams): Promise<any> => {
  const data = {
    spec: { unschedulable: true },
  };
  const result = await request.patch(baseStore.getDetailUrl({ cluster, name }), data);
  return result;
};

const nodeUncordon = async ({ cluster, name }: PathParams): Promise<any> => {
  const data = {
    spec: { unschedulable: null },
  };
  const result = await request.patch(baseStore.getDetailUrl({ cluster, name }), data);
  return result;
};

const useLabelMutation = ({
  detail,
  onSuccess = noop,
}: {
  detail: FormattedNode;
  onSuccess?: (data: any) => void;
}) => {
  const url = baseStore.getDetailUrl(detail);

  return useMutation<unknown, unknown, any>(
    async newLabels => {
      const originLabels = detail.labels;
      for (let key in originLabels) {
        if (isEmpty(newLabels[key])) {
          originLabels[key] = null;
        }
      }

      const labels = {
        ...originLabels,
        ...newLabels,
      };

      return request.patch(url, { metadata: { labels } });
    },
    {
      onSuccess,
    },
  );
};

const patchTaints = async (node: any) => {
  const url = baseStore.getDetailUrl(node);
  const newTaints = node.taints;
  return request.patch(url, { spec: { taints: newTaints } });
};

const useBatchPatchTaints = (options?: { onSuccess?: () => void }) => {
  const onSuccess = options?.onSuccess;
  return useMutation(
    (nodes: any[]) => {
      const promises = nodes.map(patchTaints);
      return Promise.allSettled(promises);
    },
    { onSuccess },
  );
};

const store = {
  ...baseStore,
  module,
  mapper,
  fetchList,
  fetchCount,
  nodeCordon,
  nodeUncordon,
  useLabelMutation,
  patchTaints,
  useBatchPatchTaints,
  withTypeSelectParams,
};

export default store;
