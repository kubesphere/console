/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PathParams, request, useUrl } from '@ks-console/shared';
import { useQueries, useQuery } from 'react-query';

import { pick } from 'lodash';

const QuotaModule = 'resourcequotas';

const getPath = ({ cluster, workspace }: PathParams = {}) => {
  let path = '';
  if (cluster) {
    path += `/klusters/${cluster}`;
  }
  if (workspace) {
    path += `/workspaces/${workspace}`;
  }
  return path;
};

class WorkspaceQuota {
  module = QuotaModule;

  getPath = getPath;

  apiVersion = 'kapis/tenant.kubesphere.io/v1beta1';

  getListUrl = (params: PathParams = {}) =>
    `${this.apiVersion}${this.getPath(params)}/${this.module}${params.dryRun ? '?dryRun=All' : ''}`;

  getDetailUrl = (params: PathParams = {}) => {
    return `${this.getListUrl(params)}/${params.name}`;
  };
}

const fetchQuota = (params: PathParams): Record<string, any> => {
  const quotaUrl = useUrl({ module: QuotaModule });
  return request(`kapis/resources.kubesphere.io/v1alpha2${quotaUrl.getPath(params)}/quotas`);
};

const fetchWorkspaceQuota = (params: PathParams): Record<string, any> => {
  const quotaUrl = new WorkspaceQuota();
  return request(quotaUrl.getDetailUrl(params));
};

export const useQueryListQuota = (path: PathParams, options?: Record<string, any>) => {
  return useQuery(['quota', path], () => fetchQuota(path), {
    select: d => d,
    ...options,
  });
};

export const useQueryDetailWorkspaceQuota = (path: PathParams, options?: Record<string, any>) => {
  return useQuery(['workspaceQuota', path], () => fetchWorkspaceQuota(path), {
    select: d => d,
    ...options,
  });
};

export const useQueryQuotaAll = (params: PathParams[], options: Record<string, any> = {}) => {
  return useQueries(
    params
      .map(p => [
        {
          queryKey: ['quota', pick(p, ['cluster', 'namespace'])],
          queryFn: () => fetchQuota(pick(p, ['cluster', 'namespace'])),
          ...options,
        },
        {
          queryKey: [
            'workspaceQuota',
            { cluster: p.cluster, workspace: p.workspace, name: p.workspace },
          ],
          queryFn: () =>
            fetchWorkspaceQuota({ cluster: p.cluster, workspace: p.workspace, name: p.workspace }),
          ...options,
          enabled: (options.enabled ?? true) && !!p.workspace,
        },
      ])
      .flat(),
  );
};
