/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useState, useEffect, useMemo } from 'react';
import type { UseQueryOptions } from 'react-query';
import { useMutation, useQuery } from 'react-query';
import { get, isEmpty, merge } from 'lodash';
import { stringify } from 'qs';

import {
  getApiVersion,
  getBaseInfo,
  getOriginData,
  getPodStatusAndRestartCount,
  request,
} from '../utils';
import { useWebSocket, useList, useUrl } from '../hooks';
import { getDetailUrl, getResourceUrl } from '../utils/urlHelper';
import { safeParseJSON } from '../utils/parser';
import { getWorkloadVolumes } from './workload';
import { getContainers } from './container';
import type { UseWebSocketOptions, UseListOptions } from '../hooks';
import type {
  Container,
  OriginalPod,
  OriginalPodList,
  PathParams,
  FormattedPod,
  FormattedPodDetail,
  VolumeMount,
} from '../types';

const module = 'pods';
const apiVersion = getApiVersion(module);

export const formatPod = (item: OriginalPod): FormattedPod => ({
  ...getBaseInfo(item),
  deletionTime: get(item, 'metadata.deletionTimestamp', ''),
  labels: get(item, 'metadata.labels') as unknown as string,
  namespace: get(item, 'metadata.namespace'),
  annotations: get(item, 'metadata.annotations', {}),
  podNums: get(item, 'spec.replicas'),
  status: get(item, 'status', {}),
  statusPhase: get(item, 'status.phase'),
  podStatus: getPodStatusAndRestartCount(item),
  spec: get(item, 'spec', {}),
  metrics: get(item, 'metrics', []),
  node: get(item, 'spec.nodeName', ''),
  nodeIp: get(item, 'status.hostIP', 'none'),
  podIp: get(item, 'status.podIP'),
  networksStatus: safeParseJSON(
    get(item, 'metadata.annotations["k8s.v1.cni.cncf.io/networks-status"]', ''),
    [],
  ) as any[],
  app: get(item, 'metadata.labels["app.kubernetes.io/name"]', ''),
  containers: getContainers(
    get(item, 'spec.containers', []),
    get(item, 'status.containerStatuses', []),
    get(item, 'metadata.namespace'),
  ),
  initContainers: getContainers(
    get(item, 'spec.initContainers', []),
    get(item, 'status.initContainerStatuses', []),
    get(item, 'metadata.namespace'),
  ),
  startTime: get(item, 'status.startTime', ''),
  updateTime: get(item, 'status.startTime', ''),
  volumes: get(item, 'spec.volumes'),
  ownerKind: get(item, 'metadata.ownerReferences[0].kind', ''),
  ownerName: get(item, 'metadata.ownerReferences[0].name', ''),
  _originData: getOriginData<OriginalPod>(item),
});

interface UsePodsQueryOptions {
  namespace: string;
  params?: {
    labelSelector?: string;
  };
  enabled?: boolean;
}

export function usePodsQuery({ namespace, params, enabled = true }: UsePodsQueryOptions) {
  const url = `api/v1/namespaces/${namespace}/pods`;
  const labelSelector = params?.labelSelector;
  const requestParams: { labelSelector?: string } = {};
  if (labelSelector) {
    requestParams.labelSelector = labelSelector;
  }

  const queryKey = [module, url, requestParams];

  const result = useQuery(
    queryKey,
    () => request.get<never, OriginalPodList>(url, { params: requestParams }),
    { enabled },
  );
  const originalPods = result.data?.items ?? [];
  const formattedPods = originalPods.map(formatPod);

  return { ...result, originalPods, formattedPods };
}

export async function fetchDetail({ cluster, namespace, name }: PathParams) {
  const url = getDetailUrl({
    apiVersion,
    cluster,
    namespace,
    name,
    module,
  });
  const result = await request.get<never, OriginalPod>(url);
  const formattedPod = formatPod(result);
  const detail: FormattedPodDetail = { ...formattedPod, cluster };

  detail.volumes = await getWorkloadVolumes(detail);

  if (!isEmpty(detail.volumes)) {
    detail.containers.forEach((container: Container) => {
      if (!isEmpty(container.volumeMounts)) {
        container.volumeMounts.forEach((volumeMount: VolumeMount) => {
          const volume = detail.volumes.find((_volume: any) => _volume.name === volumeMount.name);
          if (!isEmpty(volume) && volume) {
            volume.containers = volume.containers || [];
            volume.containers.push(container);
          }
        });
      }
    });
  }

  return detail;
}

type UsePodQueryOptions = PathParams &
  Pick<UseQueryOptions<FormattedPodDetail>, 'enabled' | 'onSuccess'>;

export function usePodQuery(options?: UsePodQueryOptions) {
  const defaultOptions = { enabled: true };
  const { enabled, onSuccess, ...restOptions } = merge({}, defaultOptions, options);
  const queryKey = [getDetailUrl(restOptions)];
  const result = useQuery<FormattedPod & { cluster?: string }>(
    queryKey,
    () => fetchDetail(restOptions),
    { enabled, onSuccess },
  );
  const formattedPodDetail = result.data;

  return { ...result, formattedPodDetail };
}

type UseWatchPodsOptions = Omit<
  UseWebSocketOptions<OriginalPod, FormattedPod>,
  'url' | 'module' | 'format'
> &
  UsePodsQueryOptions;

export function useWatchPods({ namespace, params, ...rest }: UseWatchPodsOptions) {
  const url = `api/v1/namespaces/${namespace}/pods`;
  const labelSelector = params?.labelSelector;
  const requestParams: { labelSelector?: string; watch: true } = {
    watch: true,
  };
  if (labelSelector) {
    requestParams.labelSelector = labelSelector;
  }

  return useWebSocket<OriginalPod, FormattedPod>({
    url,
    params: requestParams,
    module,
    format: formatPod,
    ...rest,
  });
}

interface UsePodLogQueryOptions {
  namespace: string;
  podName: string;
  params?: {
    timestamps?: boolean;
  };
  enabled?: boolean;
}

export function usePodLogQuery({
  namespace,
  podName,
  params,
  enabled = true,
}: UsePodLogQueryOptions) {
  const url = `api/v1/namespaces/${namespace}/pods/${podName}/log`;
  const queryKey = [module, url];

  return useQuery(
    queryKey,
    () => {
      return request.get<never, string>(url, { params });
    },
    { enabled },
  );
}

export function usePodLogFollow({
  namespace,
  podName,
  params,
  enabled = true,
}: UsePodLogQueryOptions) {
  const query = stringify(
    merge(
      {
        follow: true,
      },
      params,
    ),
  );
  const url = `/api/v1/namespaces/${namespace}/pods/${podName}/log?${query}`;

  const [data, setData] = useState<string>('');

  useEffect(() => {
    const xhr = new XMLHttpRequest();

    if (enabled) {
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.LOADING && xhr.status === 200) {
          setData(xhr.responseText);
        }
      });

      xhr.open('GET', url);
      xhr.send();
    }

    return () => xhr.abort();
  }, [enabled, url]);

  return { data };
}

export function getFilterParams(params: Record<string, unknown>): Record<string, unknown> {
  const result = { ...params };
  if (result.app) {
    result.labelSelector = result.labelSelector || '';
    result.labelSelector += `app.kubernetes.io/name=${result.app}`;
    delete result.app;
  }

  return result;
}

export function usePodsListQuery(
  { cluster, workspace, namespace, devops, ...params }: Record<string, any>,
  options?: Omit<UseListOptions<OriginalPod>, 'url'>,
) {
  const url = getResourceUrl({
    cluster,
    workspace,
    namespace,
    devops,
    module,
    apiVersion,
  });
  const opts = {
    url,
    ...options,
    params: { ...getFilterParams(params || {}), ...options?.params },
  };
  const result = useList(opts);
  const pods = result?.data ?? [];
  const formattedPods = pods.map(pod => ({
    cluster,
    ...formatPod(pod),
  }));

  return {
    ...result,
    pods,
    formattedPods,
  };
}

type UseWatchPodsList = Omit<UseWebSocketOptions<any, FormattedPod>, 'module' | 'format'>;

export function useWatchPodsList({ url, ...useWebSocketOptions }: UseWatchPodsList) {
  return useWebSocket<any, FormattedPod>({
    url,
    module,
    format: formatPod,
    ...useWebSocketOptions,
  });
}

type UsePodsList = {
  params: Record<string, any>;
  queryOptions?: Omit<UseListOptions<OriginalPod>, 'url'>;
  webSocketOptions: UseWatchPodsList;
};

export function usePodsList({ params, queryOptions, webSocketOptions }: UsePodsList) {
  const { formattedPods, reFetch, page, pageSize, total, prevPage, nextPage, isLoading, refresh } =
    usePodsListQuery(params, queryOptions);

  useWatchPodsList({
    url: webSocketOptions.url,
    onMessage: message => {
      if (message?.kind === 'Pod') {
        refresh();
      }
    },
  });

  return {
    data: formattedPods,
    page,
    pageSize,
    total,
    isLoading,
    reFetch,
    refresh,
    prevPage,
    nextPage,
  };
}

export async function checkName(params: PathParams, query?: Record<string, any>) {
  return request.get<never, { exist: boolean }>(getDetailUrl({ ...params, module, apiVersion }), {
    ...query,
    headers: { 'x-check-exist': 'true' },
  });
}

export const {
  getResourceUrl: getListUrl,
  getWatchListUrl,
  getDetailUrl: getPodDetailUrl,
} = useUrl({ module });

const deletePod = (detail: FormattedPod) => {
  return request.delete(getPodDetailUrl(detail));
};
export const usePodDeleteMutation = (options?: { onSuccess?: () => void }) => {
  const onSuccess = options?.onSuccess;
  return useMutation((detail: FormattedPod) => deletePod(detail), {
    onSuccess,
  });
};

export const usePodBatchDeleteMutation = (options?: { onSuccess?: () => void }) => {
  const onSuccess = options?.onSuccess;
  return useMutation(
    (detail: FormattedPod[]) => {
      const promise = detail.map(deletePod);
      return Promise.allSettled(promise);
    },
    {
      onSuccess,
    },
  );
};
