/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { hasClusterModule, hasExtensionModuleAnnotation } from '@ks-console/shared';
import { get } from 'lodash';
import * as React from 'react';
import { useQueryProjectMonitor } from '../../../../stores/monitor/projectMonitor';
import PhysicalResourceItem from './PhysicalResourceItem';
import { timeOptions } from './constants';
import { AppWrapper, ChartItem } from './styles';

const PHYSICAL_RESOURCE_METRIC_TYPES = [
  'namespace_cpu_usage',
  'namespace_memory_usage_wo_cache',
  'namespace_gpu_usage',
  'namespace_gpu_memory_usage',
];

interface Props {
  time: number;
  params: Record<string, any>;
}
export default function PhysicalResource(props: Props) {
  const { time, params } = props;

  const hasMonitoring = hasClusterModule(params.cluster, 'whizard-monitoring');
  const { data, isLoading } = useQueryProjectMonitor(
    {
      ...params,
      resources: [],
      metrics: PHYSICAL_RESOURCE_METRIC_TYPES,
      step: `${Math.floor(time / 40)}s`,
      times: 40,
      fillZero: time,
      autoRefresh: false,
    },
    {
      refetchInterval: 10 * 1000,
      enabled: hasMonitoring,
    },
  );

  const range: { value: number; label: string } =
    timeOptions().find(item => item.value === time) ?? ({} as any);

  const hasGpuMonitoring = hasExtensionModuleAnnotation(
    'whizard-monitoring',
    'monitoring.kubesphere.io/enable-gpu-monitoring',
  );

  return (
    <AppWrapper>
      <ChartItem>
        <PhysicalResourceItem
          key={time}
          type="cpu"
          title={t('CPU_USAGE_TIME', { time: range.label })}
          metrics={get(data, `namespace_cpu_usage.data.result`)}
          isLoading={isLoading}
          showDay={range.value >= 172800}
        />
      </ChartItem>
      <ChartItem>
        <PhysicalResourceItem
          key={time}
          type="memory"
          title={t('MEMORY_USAGE_TIME', { time: range.label })}
          metrics={get(data, `namespace_memory_usage_wo_cache.data.result`)}
          isLoading={isLoading}
          showDay={range.value >= 172800}
        />
      </ChartItem>
      {hasGpuMonitoring && (
        <>
          <ChartItem>
            <PhysicalResourceItem
              key={time}
              type="cpu"
              title={t('GPU_USAGE_TIME', { time: range.label })}
              metrics={get(data, `namespace_gpu_usage.data.result`)}
              isLoading={isLoading}
              showDay={range.value >= 172800}
            />
          </ChartItem>
          <ChartItem>
            <PhysicalResourceItem
              key={time}
              type="memory"
              title={t('GPU_MEMORY_USAGE_TIME', { time: range.label })}
              metrics={get(data, `namespace_gpu_memory_usage.data.result`)}
              isLoading={isLoading}
              showDay={range.value >= 172800}
            />
          </ChartItem>
        </>
      )}
    </AppWrapper>
  );
}
