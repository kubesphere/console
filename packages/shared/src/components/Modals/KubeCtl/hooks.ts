/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { UseQueryOptions } from 'react-query';
import { useQuery } from 'react-query';
import { merge } from 'lodash';

import type { FormattedCluster } from '../../../types/cluster';

import clusterStore from '../../../stores/cluster';
import { fetchTerminalWebSocketUrl } from '../../../stores/terminal';

const { baseFetchList } = clusterStore;

interface FetchKubectlWebSocketUrlOptions {
  cluster?: string;
  nodename?: string;
}

async function fetchKubectlWebSocketUrl(options?: FetchKubectlWebSocketUrlOptions) {
  const cluster = options?.cluster;
  const nodename = options?.nodename;
  // const kubectl = await fetchKubectl({ cluster });
  const fetchTerminalWebSocketUrlOptions = merge({ nodename }, { cluster });
  const websocketUrl = await fetchTerminalWebSocketUrl(fetchTerminalWebSocketUrlOptions);
  return websocketUrl;
}

export interface UseKubectlWebSocketUrlQueryOptions extends FetchKubectlWebSocketUrlOptions {
  enabled?: boolean;
}

export function useKubectlWebSocketUrlQuery(options?: UseKubectlWebSocketUrlQueryOptions) {
  const defaultOptions = { enabled: true };
  const { enabled, ...rest } = merge({}, defaultOptions, options);
  const queryKey = ['KUBECTL_WEBSOCKET_URL_QUERY', rest];
  const result = useQuery(queryKey, () => fetchKubectlWebSocketUrl(rest), {
    enabled,
    onError: () => {
      setTimeout(() => {
        result.refetch();
      }, 1000);
    },
  });

  const websocketUrl = result.data ?? '';

  return { ...result, websocketUrl };
}

type UseClustersQueryOptions = Pick<UseQueryOptions<FormattedCluster[]>, 'enabled' | 'onSuccess'>;

export function useClustersQuery(options?: UseClustersQueryOptions) {
  const queryKey = 'KUBECTL_CLUSTERS_QUERY';
  const result = useQuery(
    queryKey,
    () =>
      baseFetchList({
        limit: -1,
      }),
    options,
  );
  const data: FormattedCluster[] = (result as any)?.data?.data ?? [];

  return { ...result, formattedClusters: result.data, data };
}
