/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { request } from '../../utils';
import type { AppVersion } from '../../types';
import { UseListInstance } from '../../hooks';

import { BaseUrlParams, getBaseUrl, useBaseList } from './base';

type VersionPathParams = { workspace?: string; appName?: string };

const resourceName = 'versions';

const sortKey = 'sequence';

export const HANDLE_TYPE_TO_SHOW: Record<string, string> = {
  recover: 'activate',
  submit: 'submitted',
  cancel: 'draft',
  draft: 'submitted',
  rejected: 'submitted',
};

export const DEFAULT_QUERY_VERSION_STATUS =
  'draft|submitted|rejected|in-review|passed|active|suspended';

export function useAppVersionList(
  { workspace, appName }: VersionPathParams,
  params?: Record<string, any>,
  options?: any,
): UseListInstance<AppVersion> {
  const url = getBaseUrl({ workspace, appName }, resourceName);
  const formattedParams = {
    ...params,
    status: params?.status || DEFAULT_QUERY_VERSION_STATUS,
    order: params?.order || sortKey,
  };

  return useBaseList(
    url,
    {
      params: formattedParams,
      autoFetch: !!appName,
      ...options,
    },
    resourceName,
  );
}

export function useVersionDetail(
  { appName, versionID, workspace }: BaseUrlParams,
  options?: UseQueryOptions<any, Error>,
): UseQueryResult<AppVersion> {
  const url = getBaseUrl({ appName, versionID, workspace }, resourceName);

  return useQuery(['apps', 'detail', appName, versionID], () => request.get(url), {
    enabled: !!versionID && !!appName,
    onSuccess: options?.onSuccess,
  });
}

export function createVersion({ appName }: BaseUrlParams, data: any): Promise<any> {
  const url = getBaseUrl({ appName }, resourceName);

  return request.post(url, data);
}

export function deleteVersion({
  workspace,
  appName,
  versionID,
}: Omit<BaseUrlParams, 'name'>): Promise<any> {
  const url = getBaseUrl({ workspace, appName, versionID }, resourceName);

  return request.delete(url);
}

export function actionVersion<T>(params: BaseUrlParams, data: T): Promise<any> {
  const url = getBaseUrl(params, 'action');
  return request.post(url, data);
}

export async function updateVersion<T>(
  { appName, versionID, workspace }: BaseUrlParams,
  data: T,
): Promise<any> {
  const url = getBaseUrl({ appName, versionID, workspace }, resourceName);

  return request.post(url, data);
}

export function handleVersion({ appName, versionID }: BaseUrlParams, data: any): Promise<any> {
  const url = getBaseUrl({ appName, versionID, name: 'action' }, resourceName);

  return request.post(url, data);
}
