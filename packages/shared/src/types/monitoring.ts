/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export interface OriginalStatisticsMetricResult {
  value: [number, string];
  values: [number, string][];
  min_value: string;
  max_value: string;
  avg_value: string;
  sum_value: string;
  fee: string;
  resource_unit: string;
  currency_unit: string;
  metric?: Record<string, any>;
}

export interface OriginalStatisticsMetric {
  metric_name: string;
  data: {
    resultType: 'matrix' | 'vector' | 'scalar' | 'string';
    result: OriginalStatisticsMetricResult[];
  };
}

export interface OriginalStatistics {
  results: OriginalStatisticsMetric[];
}

export type FormattedStatistics = Record<string, OriginalStatisticsMetric>;
