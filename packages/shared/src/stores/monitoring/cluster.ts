/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { request } from '../../utils';
import { getParams, apiVersion, getResult, getRefreshResult } from '../monitoring';
import {
  FormattedStatistics,
  OriginalStatistics,
  OriginalStatisticsMetricResult,
} from '../../types/monitoring';

export const fetchApplicationResourceMetrics = async ({
  workspace,
  namespace,
  cluster,
  autoRefresh = false,
  originData = {},
  ...filters
}: {
  workspace?: string;
  namespace?: string;
  cluster?: string;
  autoRefresh?: boolean;
  start: number;
  end: number;
  originData?: FormattedStatistics;
  [key: string]: any;
}): Promise<{ originData: FormattedStatistics; data: OriginalStatisticsMetricResult[] }> => {
  const params = getParams({ ...filters, workspace, cluster });

  const paramsReg = /^[a-zA-Z]+_/g;
  const metricType = get(filters.metrics, '[0]', '').replace(paramsReg, 'cluster_');

  if (namespace && namespace !== 'all') {
    params.namespace = namespace;
  }

  if (workspace) {
    params.metrics_filter = `${metricType.replace(paramsReg, 'workspace_')}$`;
  }
  if (namespace && namespace !== 'all') {
    params.metrics_filter = `${metricType.replace(paramsReg, 'namespace_')}$`;
  }

  const result = await request.get<never, OriginalStatistics>(
    `${apiVersion({ cluster, workspace, namespace })}`,
    {
      params,
    },
  );

  let data: FormattedStatistics = getResult(result);
  if (autoRefresh) {
    data = getRefreshResult(data, originData);
  }

  return {
    originData: data,
    data: get(Object.values(data), '[0].data.result') || [],
  };
};
