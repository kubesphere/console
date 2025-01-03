/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { useMutation, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { UseListOptions } from '../../hooks';
import type { PathParams, AppDetail } from '../../types';
import {
  getBrowserLang,
  isMultiCluster,
  request,
  addCreateAppUrl,
  getCreateAppParams,
  getCreateAppParamsFormData,
} from '../../utils';

import { BaseUrlParams, defaultUrl, getBaseUrl, useBaseList } from './base';

const resourceName: string = 'apps';

export const DEFAULT_QUERY_STATUS = 'draft|active|suspended|passed';

export const STORE_QUERY_APP_STATUS = 'active|suspended';

function getDeployPath({ workspace, cluster, namespace }: PathParams, resName?: string): string {
  let path = '';

  if (workspace) {
    path += `/workspaces/${workspace}`;
  }

  if (isMultiCluster() && cluster) {
    path += `/clusters/${cluster}`;
  }

  if (namespace) {
    path += `/namespaces/${namespace}`;
  }
  if (resName) {
    path += `/${resName}`;
  }
  return `${path}`;
}

export function useAppList(
  { workspace }: PathParams,
  options?: Partial<UseListOptions<AppDetail>>,
) {
  const url = getBaseUrl({ workspace }, resourceName);

  return useBaseList<AppDetail>(url, { format: data => data, ...options }, workspace, resourceName);
}

export function fetchAppDetail(
  { workspace, appName }: BaseUrlParams,
  config?: any,
): Promise<AppDetail> {
  const url = getBaseUrl({ workspace, appName }, resourceName);

  return request.get(url, config);
}

export function useAppDetail(
  { workspace, appName }: BaseUrlParams,
  options?: UseQueryOptions<any, Error>,
): UseQueryResult<AppDetail> {
  return useQuery(
    ['apps', 'detail', appName],
    () => {
      return fetchAppDetail({ workspace, appName }).then((result: Record<string, any>) => {
        // multi-languages
        const userLang = get(globals.user, 'lang') || getBrowserLang();

        return {
          ...result,
          workspace,
          abstraction: result[`abstraction_${userLang}`] || result.abstraction,
          screenshots: result[`screenshots_${userLang}`] || result.screenshots,
        };
      });
    },
    {
      enabled: options?.enabled || !!appName,
      onSuccess: options?.onSuccess,
    },
  );
}

export function createApp({ workspace }: BaseUrlParams, data: any): Promise<any> {
  const url = getBaseUrl({ workspace }, resourceName);

  return request.post(addCreateAppUrl(url), getCreateAppParams(data));
}

export function createAppFormData({ workspace }: BaseUrlParams, data: any, formData: FormData) {
  const url = getBaseUrl({ workspace }, resourceName);
  const requestData = getCreateAppParamsFormData(data);
  const jsonData = JSON.stringify(requestData);
  formData.append('jsonData', jsonData);

  return request.post(addCreateAppUrl(url), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function EditApp({ workspace, appName }: BaseUrlParams, params: any): Promise<any> {
  const url = getBaseUrl({ workspace, appName }, resourceName);

  return request.patch(url, params);
}

export function deleteApp({ workspace, appName }: BaseUrlParams): Promise<void> {
  const url = getBaseUrl({ workspace, appName }, resourceName);

  return request.delete(url);
}

export function updateApp(
  { workspace, appName }: BaseUrlParams,
  data: Partial<AppDetail>,
): Promise<void> {
  const url = getBaseUrl({ workspace, appName }, resourceName);

  return request.patch(url, data);
}

export async function deployApp(
  params: Record<string, any>,
  { namespace }: Record<string, any>,
): Promise<void> {
  // TODO 必须要命名空间吗
  // if (namespace) {
  return request.post(
    `${defaultUrl}${getDeployPath(
      {
        // workspace,
        namespace,
        // cluster,
      },
      'applications',
    )}`,
    params,
  );
  // }
}

type UploadData = { type: string; attachment_content: string; sequence: number };

export function upload({ appName, workspace }: BaseUrlParams, data: UploadData): Promise<any> {
  const url = getBaseUrl({ appName, workspace }, resourceName);

  return request.patch(url, data);
}

type ScreenshotsMutateProps = {
  screenshots: string[];
  type: 'add' | 'delete';
  startIndex?: number;
};

export function useScreenShotsMutation(
  { metadata, workspace }: AppDetail,
  options?: Pick<UseQueryOptions<any>, 'onSuccess' | 'onError'>,
) {
  const { name } = metadata;
  return useMutation(
    ({ screenshots, type, startIndex = 0 }: ScreenshotsMutateProps) =>
      Promise.allSettled(
        screenshots.map(async (screenshotStr: string, index) => {
          const isDelete = type === 'delete';

          if (isDelete && index < startIndex) {
            return;
          }

          const uploadData: UploadData = {
            type: 'screenshot',
            attachment_content: isDelete ? '' : screenshotStr,
            sequence: isDelete ? index : startIndex + index,
          };

          return upload({ workspace, name }, uploadData);
        }),
      ),
    options,
  );
}

export function handleApp({ appName, workspace }: BaseUrlParams, data: any): Promise<any> {
  const url = getBaseUrl({ appName, workspace, name: 'action' }, resourceName);

  return request.post(url, data);
}
