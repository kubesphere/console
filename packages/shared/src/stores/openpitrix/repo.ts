/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useMutation, useQuery } from 'react-query';

import { request, addCreateAppUrl } from '../../utils';
import { UseListOptions } from '../../hooks';
import type { PathParams } from '../../types';

import { defaultUrl, useBaseList } from './base';

type RepoPathParams = PathParams & { repo_name?: string; app_name?: string; versionID?: string };

export function getRepoUrl({ workspace, repo_name, name }: RepoPathParams): string {
  let prefix = defaultUrl;

  if (workspace) {
    prefix += `/workspaces/${workspace}`;
  }

  if (repo_name) {
    return `${prefix}/repos/${repo_name}/${name || ''}`;
  }

  return `${prefix}/repos`;
}

export function useRepoList(
  { workspace, app_name, versionID }: RepoPathParams,
  options?: Partial<UseListOptions<any>>,
) {
  const url = getRepoUrl({ workspace, app_name, versionID });

  return useBaseList(url, { format: data => data, ...options }, workspace, 'repos');
}

export function validateRepoUrl(workspace: string, params: Record<string, string>): Promise<void> {
  return request.post(`${getRepoUrl({ workspace })}?validate=true`, params);
}

type RepoMutateProps = {
  params: Record<string, any>;
  repo_name?: string;
};

export function useRepoMutation(workspace: string, options?: { onSuccess?: () => void }) {
  const onSuccess = options?.onSuccess;
  return useMutation(
    ({ params, repo_name }: RepoMutateProps) => {
      const baseUrl = getRepoUrl({ workspace, repo_name });
      const mutator = repo_name ? request.patch : request.post;
      const url = repo_name ? baseUrl : addCreateAppUrl(baseUrl);
      return mutator(url, params);
    },
    {
      onSuccess,
    },
  );
}

export function useReposDeleteMutation(workspace: string, options?: { onSuccess?: () => void }) {
  const onSuccess = options?.onSuccess;
  return useMutation(
    (reposId: string[]) =>
      Promise.allSettled(
        reposId.map((repo_name: string) => request.delete(getRepoUrl({ workspace, repo_name }))),
      ),
    {
      onSuccess,
    },
  );
}

export function fetchRepoDetail(workspace: string, app_name: string): Record<string, any> {
  const url = getRepoUrl({ workspace, app_name });

  return request.get(url);
}

export function useRepoDetail(workspace: string, repo_id: string) {
  return useQuery(['repo', 'detail', repo_id], () => fetchRepoDetail(workspace, repo_id), {
    enabled: !!workspace && !!repo_id,
  });
}
