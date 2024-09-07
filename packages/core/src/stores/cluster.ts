/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';

import type { OriginalClusterList } from '@ks-console/shared';
import { request, clusterStore, useUrl } from '@ks-console/shared';

const { module, mapper: clusterMapper } = clusterStore;

const { getResourceUrl } = useUrl({ module });

const formatCluster = clusterMapper;

type FormattedCluster = ReturnType<typeof formatCluster>;

interface UseClustersQueryOptions {
  params?: {
    name?: string;
  };
  enabled?: boolean;
}

function isEmptyValues(data: object | null | undefined) {
  if (!data) {
    return true;
  }

  return Object.values(data).every(isEmpty);
}

function useClustersQuery(options?: UseClustersQueryOptions) {
  const url = getResourceUrl();
  const enabled = options?.enabled ?? true;
  const p = options?.params;
  const params = isEmptyValues(p) ? null : p;
  const queryKey = [module, url, params];

  const result = useQuery(
    queryKey,
    () => request.get<never, OriginalClusterList>(url, { params }),
    { enabled },
  );
  const originalClusters = result.data?.items ?? [];
  const formattedClusters = originalClusters.map(formatCluster);

  return { ...result, originalClusters, formattedClusters };
}

export type { FormattedCluster };
export { formatCluster, useClustersQuery };
