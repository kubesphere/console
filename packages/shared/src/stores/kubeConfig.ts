/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useQuery } from 'react-query';

import { request } from '../utils';
import { getUsername, getClusterPath } from './terminal';

function getFetchKubeConfigUrl(params?: { cluster?: string }) {
  const username = getUsername();
  return `kapis/resources.kubesphere.io/v1alpha2${getClusterPath(
    params,
  )}/users/${username}/kubeconfig`;
}

interface FetchKubeConfigOptions {
  params?: {
    cluster?: string;
  };
}

function fetchKubeConfig(options?: FetchKubeConfigOptions) {
  const params = options?.params;
  const url = getFetchKubeConfigUrl(params);

  return request.get<never, string>(url);
}

interface UseKubeConfigQueryOptions {
  params?: {
    cluster?: string;
  };
}

export function useKubeConfigQuery(
  options?: UseKubeConfigQueryOptions,
  config: Record<string, any> = {},
) {
  const params = options?.params;
  const queryKey = [getFetchKubeConfigUrl(params)];
  const result = useQuery(queryKey, () => fetchKubeConfig({ params }), config);
  const kubeConfig = result.data ?? '';
  return { ...result, kubeConfig };
}
