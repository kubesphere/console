/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useQuery } from 'react-query';

import type { OriginalStatistics, FormattedStatistics } from '../../types/monitoring';
import { apiVersion, getResult } from '../monitoring';
import { request } from '../../utils';

export function getApi({ cluster, workspace }: { cluster?: string; workspace: string }) {
  const version = apiVersion({ cluster, workspace });
  return `${version}`;
}

interface UseFetchStatisticsQueryOptions {
  workspace: string;
  cluster?: string;
  enabled?: boolean;
}

export function useFetchStatisticsQuery({
  workspace,
  cluster,
  enabled = true,
}: UseFetchStatisticsQueryOptions) {
  const url = getApi({ cluster, workspace });
  const params = {
    type: 'statistics',
  };
  const queryKey = [url, params];

  const result = useQuery({
    queryKey,
    queryFn: () =>
      request.get<never, OriginalStatistics>(url, { params }).catch(() => Promise.resolve([])),
    enabled: enabled,
  });
  const originalStatistics = result.data ?? [];
  const formattedStatistics = getResult(originalStatistics) as FormattedStatistics;

  return { ...result, originalStatistics, formattedStatistics };
}
