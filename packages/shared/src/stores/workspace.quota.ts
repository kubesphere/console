/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useQuery } from 'react-query';

import { request } from '../utils';
import { OriginalWorkspaceResourceQuota } from '../types/workspace.quota';

const module = 'resourcequotas';
const apiVersion = 'kapis/tenant.kubesphere.io/v1beta1';

interface GetPathOptions {
  cluster?: string;
  workspace?: string;
}

function getPath(options?: GetPathOptions) {
  const cluster = options?.cluster;
  const workspace = options?.workspace;

  let path = '';

  if (cluster) {
    path += `/klusters/${cluster}`;
  }

  if (workspace) {
    path += `/workspaces/${workspace}`;
  }

  return path;
}

interface GetListUrlOptions extends GetPathOptions {
  dryRun?: boolean;
}

function getListUrl(options?: GetListUrlOptions) {
  const cluster = options?.cluster;
  const workspace = options?.workspace;
  const dryRun = options?.dryRun;
  return `${apiVersion}${getPath({
    cluster,
    workspace,
  })}/${module}${dryRun ? '?dryRun=All' : ''}`;
}

interface GetDetailUrlOptions extends GetListUrlOptions {
  name: string;
}

function getDetailUrl({ cluster, workspace, dryRun, name }: GetDetailUrlOptions) {
  return `${getListUrl({ cluster, workspace, dryRun })}/${name}`;
}

interface UseFetchWorkspaceResourceQuotaQueryOptions extends GetDetailUrlOptions {
  enabled?: boolean;
}

export function useFetchWorkspaceResourceQuotaQuery(
  { enabled = true, ...params }: UseFetchWorkspaceResourceQuotaQueryOptions,
  config: Record<string, any> = {},
) {
  const url = getDetailUrl(params);
  const queryKey = [url];
  const result = useQuery({
    queryKey,
    queryFn: () => request.get<never, OriginalWorkspaceResourceQuota>(url, config),
    enabled,
  });
  const originalWorkspaceResourceQuota = result.data;
  const workspaceResourceQuotaDetail = originalWorkspaceResourceQuota
    ? { ...params, ...originalWorkspaceResourceQuota }
    : undefined;

  return {
    ...result,
    queryKey,
    originalWorkspaceResourceQuota,
    workspaceResourceQuotaDetail,
  };
}
