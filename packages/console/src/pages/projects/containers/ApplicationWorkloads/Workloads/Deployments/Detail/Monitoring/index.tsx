/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { get, isEmpty, uniq } from 'lodash';
import { useParams } from 'react-router-dom';
import { useCacheStore as useStore } from '@ks-console/shared';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import {
  MonitorController,
  SimpleArea,
  hideGPUByLicense,
  monitorStore,
  getAreaChartOps,
  podMonitiorStore,
  getZeroValues,
} from '@ks-console/shared';
const MetricTypes = {
  cpu_usage: 'pod_cpu_usage',
  memory_usage: 'pod_memory_usage_wo_cache',
  gpu_usage: 'pod_gpu_usage',
  gpu_memory_usage: 'pod_gpu_memory_usage',
  net_transmitted: 'pod_net_bytes_transmitted',
  net_received: 'pod_net_bytes_received',
};
const { getApi, fetchSortedMetrics } = podMonitiorStore;
const { useMonitorStore } = monitorStore;
const { fetchMetrics } = useMonitorStore({ getApiFn: getApi });
const Chart = styled(SimpleArea).attrs({
  theme: 'light',
  legendAlign: 'left',
})``;
export interface WorkloadMonitoringsProps {
  store?: string;
}

function Monitorings(props: WorkloadMonitoringsProps) {
  const params: Record<string, any> = useParams();
  const { cluster } = params;
  const [detail] = useStore(props.store!);
  // const {detail} = props
  const { name, role = [], createTime, namespace, kind } = detail?.detail ?? detail;
  const [metrics, setMetrics] = useState<Record<string, any>>({});
  const [pods, setPods] = useState([]);

  const { mutate, isLoading } = useMutation(
    (fecthParams: any) => {
      const newParams = {
        cluster,
        namespace,
        workload_kind: kind.toLowerCase(),
        workload_name: name,
      };
      if (isEmpty(pods)) {
        return fetchSortedMetrics({
          ...newParams,
          sort_metrics: MetricTypes.cpu_usage,
          limit: 5,
          page: 1,
        }).then((data: any) => {
          const result = get(data[MetricTypes.cpu_usage], 'data.result') || [];

          const podsParams = result.map((item: any) => get(item, 'metric.pod'));

          setPods(podsParams);
          return fetchMetrics({
            ...newParams,
            resources: podsParams,
            metrics: Object.values(hideGPUByLicense(MetricTypes, cluster)),
            fillZero: !role.includes('edge'),
            ...fecthParams,
          });
        });
      } else {
        return fetchMetrics({
          ...newParams,
          resources: pods,
          metrics: Object.values(hideGPUByLicense(MetricTypes, cluster)),
          fillZero: !role.includes('edge'),
          ...fecthParams,
        });
      }
    },
    {
      onSuccess: data => {
        setMetrics(data);
      },
    },
  );

  {
    /* TODO: missing INODE_USAGE */
  }
  const monitoringCfgs = [
    {
      type: 'cpu',
      title: 'CPU_USAGE',
      unitType: 'cpu',
      data: get(metrics, `${MetricTypes.cpu_usage}.data.result`, []),
    },
    {
      type: 'usage',
      title: 'MEMORY_USAGE',
      unitType: 'memory',
      data: get(metrics, `${MetricTypes.memory_usage}.data.result`, []),
    },
    {
      type: 'gpu',
      title: 'GPU_USAGE',
      unitType: 'gpu',
      data: get(metrics, `${MetricTypes.gpu_usage}.data.result`, []),
    },
    {
      type: 'gpu_memory',
      title: 'GPU_MEMORY_USAGE',
      unitType: 'memory',
      data: get(metrics, `${MetricTypes.gpu_memory_usage}.data.result`, []),
    },
    {
      type: 'bandwidth',
      title: 'OUTBOUND_TRAFFIC',
      unitType: 'bandwidth',
      data: get(metrics, `${MetricTypes.net_transmitted}.data.result`, []),
    },
    {
      type: 'bandwidth',
      title: 'INBOUND_TRAFFIC',
      unitType: 'bandwidth',
      data: get(metrics, `${MetricTypes.net_received}.data.result`, []),
    },
  ];

  const configs = hideGPUByLicense(monitoringCfgs, cluster);

  return (
    <MonitorController
      createTime={createTime}
      onFetch={mutate}
      loading={isLoading}
      isEmpty={isEmpty(metrics)}
    >
      {configs.map((item: any) => {
        item.data = isEmpty(item.data) ? [{ values: getZeroValues() }] : item.data;
        item.legend = item.data.map((record: any, index: number) =>
          get(record, 'metric.pod', `pod${index}`),
        );
        item.workload_kind = kind;
        const config = getAreaChartOps(item);

        const height = 228 + Math.max(Math.floor(item.legend.length / 5 - 1) * 20, 0);

        return (
          <Chart
            {...config}
            key={`${item.title}_${item.type}`}
            categories={kind === 'StatefulSet' ? uniq(item.legend) : item.legend}
            height={height}
            // showLegend={false}
          />
        );
      })}
    </MonitorController>
  );
}
export default Monitorings;
