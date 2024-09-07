/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { useMutation } from 'react-query';

import { request } from '../../utils';
import type { PathParams } from '../../types';
import {
  useList,
  UseListOptions,
  useListQueryParams,
  UseQueryParamsOption,
  useUrl,
} from '../../hooks';

import { defaultUrl, getBaseOpenPitrixPath } from './base';
import ingresStore from '../ingress';
import serviceStore from '../service';
import { VolumeMapper } from '../volume';
import workloadStore from '../workload';
import { formatPod } from '../pod';

export type ApplicationPathParams = PathParams & {
  cluster_id?: string;
  zone?: string;
  appName?: string;
  params?: Record<string, unknown>;
  workspace?: string;
  cluster?: string;
  name?: string;
};

export const CLUSTER_QUERY_STATUS = 'creating|active|failed|deleting|upgrading|created|upgraded';

const STATUSES: Record<string, string> = {
  creating: 'Creating',
  created: 'Creating',
  active: 'Running',
  failed: 'Failed',
  deleting: 'deleting',
  upgrading: 'Upgrading',
  upgraded: 'Upgrading',
  deployFailed: 'Failed',
};

export function dataItemFormatter(item: any): any {
  const status = get(item, 'status.state');

  return {
    ...item,
    ...item.metadata,
    selector: {
      'application.kubesphere.io/instance': item?.cluster?.name,
    },
    status: STATUSES[status],
    _status: item.status,
    _originData: item,
  };
}

export function getApplicationUrl({
  workspace,
  namespace,
  cluster,
  cluster_id,
  appName,
}: ApplicationPathParams = {}): string {
  const url = `${defaultUrl}${getBaseOpenPitrixPath({
    workspace,
    namespace,
    cluster,
  })}/applications`;

  if (cluster_id || appName) {
    return `${url}/${cluster_id || appName}`;
  }

  return url;
}

export async function deleteOPApp({
  workspace,
  cluster,
  name,
  appName,
  cluster_id,
  namespace,
}: ApplicationPathParams): Promise<any> {
  const url = getApplicationUrl({
    namespace,
    appName: appName || name,
    cluster,
    workspace,
    cluster_id,
  });

  return request.delete(url);
}

export async function deleteDeployApp({
  name,
  workspace,
  namespace,
  cluster,
}: ApplicationPathParams): Promise<any> {
  const url = getApplicationUrl({ workspace, namespace, cluster, appName: name });

  return request.delete(url);
}

export async function patchOPApp({
  workspace,
  cluster,
  namespace,
  zone,
  name,
  appName,
  params,
}: ApplicationPathParams & {
  name?: string;
  description?: string;
}): Promise<any> {
  const url = getApplicationUrl({ namespace, appName: appName || name, workspace, cluster, zone });

  return request.post(url, params);
}

export async function upgradeOPApp(data: ApplicationPathParams, params: any) {
  return request.post(getApplicationUrl(data), params);
}

export function useAppDeleteMutation(options?: { onSuccess?: () => void }) {
  const onSuccess = options?.onSuccess;
  return useMutation((data: Array<any>) => Promise.allSettled(data.map(deleteDeployApp)), {
    onSuccess,
  });
}

export function useAppEditMutation(options?: { onSuccess?: () => void }) {
  const onSuccess = options?.onSuccess;
  return useMutation((data: any) => patchOPApp(data), {
    onSuccess,
  });
}

export function fetchApplicationDetail({
  workspace,
  namespace,
  cluster,
  appName,
}: ApplicationPathParams): any {
  const url = getApplicationUrl({ workspace, namespace, cluster, appName });

  return request.get(url).then(dataItemFormatter);
}

export function useApplicationsList(
  { cluster, namespace, workspace, appName, versionID }: PathParams,
  params: Record<string, any>,
) {
  const url = getApplicationUrl({ workspace, namespace, cluster });
  const formattedParams: Record<string, any> = {
    ...params,
    status: params.status || CLUSTER_QUERY_STATUS,
    order: params.order || 'creationTimestamp',
  };

  return useList({
    url,
    params: formattedParams,
    paramsFormatFn: ({ app_id, keyword, ...rest }) => {
      const requestParams = useListQueryParams(rest as UseQueryParamsOption);
      let conditions = requestParams.conditions;
      const query: Record<string, string> = {};

      if (params.keyword) {
        query.name = params.keyword;
      }

      if (appName) {
        query.label = `application.kubesphere.io/app-id=${appName}`;
      }
      if (versionID) {
        query.annotations = `application.kubesphere.io/app-versionName=${versionID}`;
      }

      return {
        ...requestParams,
        ...query,
        conditions,
      };
    },
    format: item => ({ ...dataItemFormatter(item), workspace, cluster }),
  });
}

interface UseBaseK8sListOptions extends Partial<UseListOptions<any>> {
  module: string;
  params: K8sListParams;
}

export type K8sListParams = {
  cluster?: string;
  namespace?: string;
  [key: string]: string | undefined;
};

const mapperObjectMap: Record<string, (item: any) => any> = {
  ingresses: ingresStore.mapper,
  services: serviceStore.mapper,
  persistentvolumeclaims: VolumeMapper,
  daemonsets: workloadStore('daemonsets').mapper,
  deployments: workloadStore('deployments').mapper,
  statefulsets: workloadStore('statefulsets').mapper,
  pods: formatPod,
};

export function useBaseK8sList({ module, params, ...options }: UseBaseK8sListOptions) {
  const { cluster, namespace, ...restParams } = params;
  const { getListUrl } = useUrl({ module });
  const url = getListUrl({ cluster, namespace });

  return useList({
    url,
    params: restParams,
    format: (item: any) => ({
      cluster,
      module,
      ...mapperObjectMap[module](item),
    }),
    paramsFormatFn: requestParams => useListQueryParams(requestParams as UseQueryParamsOption),
    ...options,
  });
}

export type UserPodsListForJobOptions = {
  cluster: string;
  namespace: string;
  jobName: string;
  [key: string]: string | undefined;
};

export function usePodForJobList({ cluster, namespace, jobName }: UserPodsListForJobOptions) {
  const module = 'pods';
  const { getListUrl } = useUrl({ module });
  const url = getListUrl({ cluster, namespace });

  return useList({
    url,
    params: jobName ? { labelSelector: `job-name=${jobName}` } : undefined,
    format: (item: any) => ({
      cluster,
      module,
      ...mapperObjectMap[module](item),
    }),
  });
}
