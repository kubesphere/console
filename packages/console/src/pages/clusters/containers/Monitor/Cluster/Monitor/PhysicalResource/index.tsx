/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { get, isEmpty } from 'lodash';
import {
  CustomTooltip,
  getAreaChartOps,
  getChartData,
  getZeroValues,
  hideGPUByLicense,
  MonitorController,
  monitorStore,
  SimpleArea,
} from '@ks-console/shared';
import { Box, Content, Wrapper } from '../styles';

const MetricTypes = {
  cpu_utilisation: 'cluster_cpu_utilisation',
  memory_utilisation: 'cluster_memory_utilisation',
  cpu_load1: 'cluster_load1',
  cpu_load5: 'cluster_load5',
  cpu_load15: 'cluster_load15',
  gpu_usage: 'cluster_gpu_usage',
  gpu_total: 'cluster_gpu_total',
  gpu_utilization: 'cluster_gpu_utilization',
  gpu_memory_utilization: 'cluster_gpu_memory_utilization',
  gpu_memory_usage: 'cluster_gpu_memory_usage',
  gpu_memory_total: 'cluster_gpu_memory_total',
  disk_size_usage: 'cluster_disk_size_usage',
  disk_inode_utilisation: 'cluster_disk_inode_utilisation',
  disk_inode_usage: 'cluster_disk_inode_usage',
  disk_inode_total: 'cluster_disk_inode_total',
  disk_read_iops: 'cluster_disk_read_iops',
  disk_write_iops: 'cluster_disk_write_iops',
  disk_read_throughput: 'cluster_disk_read_throughput',
  disk_write_throughput: 'cluster_disk_write_throughput',
  net_transmitted: 'cluster_net_bytes_transmitted',
  net_received: 'cluster_net_bytes_received',
  pod_running_count: 'cluster_pod_running_count',
  pod_pending: 'cluster_pod_pending_count',
  pod_completed_count: 'cluster_pod_succeeded_count',
  pod_abnormal_count: 'cluster_pod_failed_count',
  pod_unknown: 'cluster_pod_unknown_count',
};

const { useMonitorStore } = monitorStore;

const { fetchMetrics } = useMonitorStore();

function PhysicalResource() {
  const { cluster } = useParams();
  const [metrics, setMetrics] = useState<Record<string, any>>({});

  const { mutate, isLoading } = useMutation(
    (fetchParams: any) => {
      return fetchMetrics({
        cluster,
        metrics: Object.values(MetricTypes),
        ...fetchParams,
      });
    },
    {
      onSuccess: data => {
        setMetrics(data);
      },
    },
  );

  const configs = useMemo(() => {
    if (isEmpty(metrics)) {
      return [];
    }

    return hideGPUByLicense(
      [
        {
          type: 'utilisation',
          title: 'CPU_USAGE',
          unit: '%',
          legend: ['USAGE'],
          data: get(metrics, `${MetricTypes.cpu_utilisation}.data.result`),
        },
        {
          type: 'utilisation',
          title: 'MEMORY_USAGE',
          unit: '%',
          legend: ['USAGE'],
          data: get(metrics, `${MetricTypes.memory_utilisation}.data.result`),
        },
        {
          type: 'load',
          title: 'AVERAGE_CPU_LOAD',
          legend: [
            t('TIME_M', { count: 1 }),
            t('TIME_M', { count: 5 }),
            t('TIME_M', { count: 15 }),
          ],
          data: [
            get(metrics, `${MetricTypes.cpu_load1}.data.result[0]`, {}),
            get(metrics, `${MetricTypes.cpu_load5}.data.result[0]`, {}),
            get(metrics, `${MetricTypes.cpu_load15}.data.result[0]`, {}),
          ],
        },
        {
          type: 'utilisation',
          title: 'GPU_USAGE',
          unit: '%',
          legend: ['USAGE'],
          data: get(metrics, `${MetricTypes.gpu_utilization}.data.result`),
        },
        {
          type: 'usage',
          title: 'GPU_MEMORY_USAGE',
          unitType: 'memory',
          legend: ['USAGE'],
          data: get(metrics, `${MetricTypes.gpu_memory_usage}.data.result`),
        },
        {
          type: 'usage',
          title: 'DISK_USAGE',
          unitType: 'disk',
          legend: ['USAGE'],
          data: get(metrics, `${MetricTypes.disk_size_usage}.data.result`),
        },
        {
          type: 'utilisation',
          title: 'INODE_USAGE',
          unit: '%',
          legend: ['USAGE'],
          data: get(metrics, `${MetricTypes.disk_inode_utilisation}.data.result`),
          renderTooltip: (payload: any[]) => {
            const usageData = getChartData({
              unit: '',
              legend: ['USAGE'],
              valuesData: [
                get(metrics, `${MetricTypes.disk_inode_usage}.data.result[0].values`, []),
              ],
            });
            const totalData = getChartData({
              unit: '',
              legend: ['USAGE'],
              valuesData: [
                get(metrics, `${MetricTypes.disk_inode_total}.data.result[0].values`, []),
              ],
            });

            return (
              <CustomTooltip
                usageData={usageData}
                totalData={totalData}
                payload={payload}
                unit={'%'}
              />
            );
          },
        },
        {
          type: 'throughput',
          title: 'DISK_THROUGHPUT',
          unitType: 'throughput',
          legend: ['READ', 'WRITE'],
          data: [
            get(metrics, `${MetricTypes.disk_read_throughput}.data.result[0]`, {}),
            get(metrics, `${MetricTypes.disk_write_throughput}.data.result[0]`, {}),
          ],
        },
        {
          type: 'iops',
          title: 'IOPS',
          legend: ['READ', 'WRITE'],
          data: [
            get(metrics, `${MetricTypes.disk_read_iops}.data.result[0]`, {}),
            get(metrics, `${MetricTypes.disk_write_iops}.data.result[0]`, {}),
          ],
        },
        {
          type: 'bandwidth',
          title: 'NETWORK_TRAFFIC',
          unitType: 'bandwidth',
          legend: ['OUT', 'IN'],
          data: [
            get(metrics, `${MetricTypes.net_transmitted}.data.result[0]`, {}),
            get(metrics, `${MetricTypes.net_received}.data.result[0]`, {}),
          ],
        },
        {
          type: 'count',
          title: 'POD_STATUS',
          unit: '',
          legend: ['RUNNING', 'PENDING', 'COMPLETED', 'FAILED', 'UNKNOWN'],
          data: [
            get(metrics, `${MetricTypes.pod_running_count}.data.result[0]`, {}),
            get(metrics, `${MetricTypes.pod_pending}.data.result[0]`, {}),
            get(metrics, `${MetricTypes.pod_completed_count}.data.result[0]`, {}),
            get(metrics, `${MetricTypes.pod_abnormal_count}.data.result[0]`, {}),
            get(metrics, `${MetricTypes.pod_unknown}.data.result[0]`, {}),
          ],
        },
      ],
      cluster!,
    );
  }, [metrics]);

  return (
    <Wrapper>
      <MonitorController
        title={t('PHYSICAL_RESOURCES_MONITORING')}
        step="2m"
        times={50}
        onFetch={mutate}
        loading={isLoading}
        isEmpty={isEmpty(metrics)}
      >
        <Content>
          {configs.map((item: any) => {
            item.data = isEmpty(item.data) ? [{ values: getZeroValues() }] : item.data;
            const config = getAreaChartOps(item);

            return (
              <Box key={item.title}>
                <SimpleArea {...config} height={190} categories={item.legend} theme="light" />
              </Box>
            );
          })}
        </Content>
      </MonitorController>
    </Wrapper>
  );
}

export default PhysicalResource;
