/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import {
  FormattedStatistics,
  getAreaChartOps,
  getLastMonitoringData,
  hideGPUByLicense,
  monitorStore,
  SimpleArea,
  StatusTabs,
} from '@ks-console/shared';
import TabItem from './tab';

const { fetchMetrics } = monitorStore.useMonitorStore();

const MetricTypes = {
  cpu_usage: 'cluster_cpu_usage',
  cpu_total: 'cluster_cpu_total',
  cpu_utilisation: 'cluster_cpu_utilisation',
  gpu_usage: 'cluster_gpu_usage',
  gpu_total: 'cluster_gpu_total',
  gpu_utilization: 'cluster_gpu_utilization',
  gpu_memory_utilization: 'cluster_gpu_memory_utilization',
  gpu_memory_usage: 'cluster_gpu_memory_usage',
  gpu_memory_total: 'cluster_gpu_memory_total',
  memory_usage: 'cluster_memory_usage_wo_cache',
  memory_total: 'cluster_memory_total',
  memory_utilisation: 'cluster_memory_utilisation',
  disk_size_usage: 'cluster_disk_size_usage',
  disk_size_capacity: 'cluster_disk_size_capacity',
  disk_utilisation: 'cluster_disk_size_utilisation',
  pod_count: 'cluster_pod_running_count',
  pod_capacity: 'cluster_pod_quota',
};

function ClusterResourceStatusTab({ cluster }: { cluster: string }) {
  const { data: metrics, isLoading } = useQuery<FormattedStatistics>(
    ['clusterMetrics'],
    async () => {
      const result = await fetchMetrics({
        cluster,
        metrics: Object.values(hideGPUByLicense(MetricTypes, cluster)),
        step: '5m',
        times: 100,
      });
      return result;
    },
    {
      refetchInterval: 10000,
    },
  );

  const getValue = (data: { value: [number, string] }) => get(data, 'value[1]', 0);

  const renderChart = (option: any) => {
    const commonProps = {
      theme: 'light',
      key: option.title,
      height: '100%',
    };

    switch (option.type) {
      default:
      case 'area': {
        const config = getAreaChartOps(option);
        return <SimpleArea {...commonProps} {...config} categories={option.legend} />;
      }
    }
  };

  const getTabOptions = () => {
    const lastData = getLastMonitoringData(metrics);
    const result = [
      {
        name: 'CPU',
        unitType: 'cpu',
        used: getValue(lastData[MetricTypes.cpu_usage]),
        total: getValue(lastData[MetricTypes.cpu_total]),
      },
      {
        name: 'MEMORY',
        unitType: 'memory',
        used: getValue(lastData[MetricTypes.memory_usage]),
        total: getValue(lastData[MetricTypes.memory_total]),
      },

      {
        name: 'GPU',
        used: getValue(lastData[MetricTypes.gpu_usage]),
        total: getValue(lastData[MetricTypes.gpu_total]),
      },
      {
        name: 'GPU_MEMORY',
        unitType: 'memory',
        used: getValue(lastData[MetricTypes.gpu_memory_usage]),
        total: getValue(lastData[MetricTypes.gpu_memory_total]),
      },
      {
        name: 'DISK',
        unitType: 'disk',
        used: getValue(lastData[MetricTypes.disk_size_usage]),
        total: getValue(lastData[MetricTypes.disk_size_capacity]),
      },
      {
        name: 'PODS',
        unit: '',
        used: getValue(lastData[MetricTypes.pod_count]),
        total: getValue(lastData[MetricTypes.pod_capacity]),
      },
    ];

    return hideGPUByLicense(result, cluster).map((item: any) => ({
      props: item,
      component: TabItem,
    }));
  };

  const getContentOptions = () => {
    const result = [
      {
        type: 'utilisation',
        title: 'CPU_USAGE',
        unit: '%',
        legend: ['USAGE'],
        data: get(metrics, [MetricTypes.cpu_utilisation, 'data', 'result'], []),
      },
      {
        type: 'utilisation',
        title: 'MEMORY_USAGE',
        unit: '%',
        legend: ['USAGE'],
        data: get(metrics, [MetricTypes.memory_utilisation, 'data', 'result'], []),
      },
      {
        type: 'utilisation',
        title: 'GPU_USAGE',
        unit: '%',
        legend: ['USAGE'],
        data: get(metrics, [MetricTypes.gpu_utilization, 'data', 'result'], []),
      },
      {
        title: 'GPU_MEMORY_USAGE',
        type: 'utilisation',
        unit: '%',
        legend: ['USAGE'],
        data: get(metrics, [MetricTypes.gpu_memory_utilization, 'data', 'result'], []),
      },
      {
        type: 'utilisation',
        title: 'DISK_USAGE',
        unit: '%',
        legend: ['USAGE'],
        data: get(metrics, [MetricTypes.disk_utilisation, 'data', 'result'], []),
      },
      {
        title: 'POD_COUNT',
        unit: '',
        legend: ['COUNT'],
        data: get(metrics, [MetricTypes.pod_count, 'data', 'result'], []),
      },
    ];

    return hideGPUByLicense(result, cluster).map((item: any) => ({
      props: item,
      render: renderChart,
    }));
  };

  return (
    <StatusTabs
      title={t('CLUSTER_RESOURCE_USAGE')}
      tabOptions={getTabOptions()}
      contentOptions={getContentOptions()}
      loading={isLoading}
    />
  );
}

export default ClusterResourceStatusTab;
