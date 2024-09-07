/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useCacheStore as useStore } from '@ks-console/shared';
import { get, isEmpty } from 'lodash';
import { Field } from '@kubed/components';
import {
  Panel,
  MonitorTab,
  cpuFormat,
  memoryFormat,
  hideGPUByLicense,
  monitorStore,
  nodeMonitiorStore,
  hasClusterModule,
} from '@ks-console/shared';
import { PanelWapper, Conditions, MonitorPanel } from './styles';
import ConditionCard from './ConditionCard';
import TaintCard from './TaintCard';
import { toPercentage } from '../../contants';

const METRIC_TYPES = [
  'node_cpu_utilisation',
  'node_memory_utilisation',
  'node_gpu_utilization',
  'node_gpu_memory_utilization',
  'node_disk_size_utilisation',
  'node_pod_utilisation',
  'node_pod_requests_cpu_total',
  'node_pod_requests_cpu_allocatable_utilisation',
  'node_pod_limits_cpu_total',
  'node_pod_limits_cpu_allocatable_utilisation',
  'node_pod_requests_memory_total',
  'node_pod_requests_memory_allocatable_utilisation',
  'node_pod_limits_memory_total',
  'node_pod_limits_memory_allocatable_utilisation',
];

const { getApi } = nodeMonitiorStore;
const { useMonitorStore } = monitorStore;
const { fetchMetrics } = useMonitorStore({ getApiFn: getApi });

function RunningStatus() {
  const params: Record<string, any> = useParams();
  const { cluster } = params;
  const [detail] = useStore('detailProps');
  const { data: metrics, isLoading: isMonitorLoading } = useQuery(
    ['metrics', detail, params],
    async () => {
      const { name, role = [] } = detail;
      const result = await fetchMetrics({
        step: '180s',
        fillZero: !role.includes('edge'),
        resources: [name],
        metrics: Object.values(METRIC_TYPES),
        cluster,
      });
      return result;
    },
    {
      enabled: hasClusterModule(cluster, 'whizard-monitoring') && !!detail,
      refetchInterval: 5000,
    },
  );

  const getLastValue = (key: string) => {
    const values = get(metrics, `${key}.data.result[0].values`, []);

    return !isEmpty(values) ? values[values.length - 1][1] : 0;
  };

  const renderAllocatedResources = useMemo(() => {
    return (
      <PanelWapper title={t('ALLOCATED_RESOURCES')} loading={isMonitorLoading}>
        <>
          <Field
            value={
              cpuFormat(getLastValue('node_pod_requests_cpu_total')) === 1
                ? t('CPU_CORE_PERCENT_SI', {
                    core: cpuFormat(getLastValue('node_pod_requests_cpu_total')),
                    percent: toPercentage(
                      getLastValue('node_pod_requests_cpu_allocatable_utilisation'),
                    ),
                  })
                : t('CPU_CORE_PERCENT_PL', {
                    core: cpuFormat(getLastValue('node_pod_requests_cpu_total')),
                    percent: toPercentage(
                      getLastValue('node_pod_requests_cpu_allocatable_utilisation'),
                    ),
                  })
            }
            label={t('CPU_REQUEST_SCAP')}
          />
          <Field
            value={
              cpuFormat(getLastValue('node_pod_limits_cpu_total')) === 1
                ? t('CPU_CORE_PERCENT_SI', {
                    core: cpuFormat(getLastValue('node_pod_limits_cpu_total')),
                    percent: toPercentage(
                      getLastValue('node_pod_limits_cpu_allocatable_utilisation'),
                    ),
                  })
                : t('CPU_CORE_PERCENT_PL', {
                    core: cpuFormat(getLastValue('node_pod_limits_cpu_total')),
                    percent: toPercentage(
                      getLastValue('node_pod_limits_cpu_allocatable_utilisation'),
                    ),
                  })
            }
            label={t('CPU_LIMIT_SCAP')}
          />
          <Field
            value={t('MEMORY_GIB_PERCENT', {
              gib: memoryFormat(getLastValue('node_pod_requests_memory_total'), 'Gi'),
              percent: toPercentage(
                getLastValue('node_pod_requests_memory_allocatable_utilisation'),
              ),
            })}
            label={t('MEMORY_REQUEST_SCAP')}
          />
          <Field
            value={t('MEMORY_GIB_PERCENT', {
              gib: memoryFormat(getLastValue('node_pod_limits_memory_total'), 'Gi'),
              percent: toPercentage(getLastValue('node_pod_limits_memory_allocatable_utilisation')),
            })}
            label={t('MEMORY_LIMIT_SCAP')}
          />
        </>
      </PanelWapper>
    );
  }, [metrics]);

  const renderConditions = useMemo(() => {
    const { conditions = [] } = detail;
    return (
      <Panel title={t('HEALTH_STATUS')}>
        <Conditions>
          {conditions.map((condition: any, i: number) => (
            <ConditionCard key={condition.type || i} data={condition} />
          ))}
        </Conditions>
      </Panel>
    );
  }, [detail]);

  const renderTanits = useMemo(() => {
    const { taints = [] } = detail;
    if (isEmpty(taints)) return null;
    return (
      <Panel title={t('TAINTS')}>
        {taints && (
          <div>
            {taints.map((taint: any, i: number) => (
              <TaintCard key={taint.type || i} data={taint} />
            ))}
          </div>
        )}
      </Panel>
    );
  }, [detail]);

  const renderResourceStatus = useMemo(() => {
    const tabs = [
      {
        key: 'cpu',
        icon: 'cpu',
        unit: '%',
        legend: ['CPU_USAGE'],
        title: 'CPU_USAGE',
        data: get(metrics, 'node_cpu_utilisation.data.result'),
      },
      {
        key: 'memory',
        icon: 'memory',
        unit: '%',
        legend: ['MEMORY_USAGE'],
        title: 'MEMORY_USAGE',
        data: get(metrics, 'node_memory_utilisation.data.result'),
      },
      {
        key: 'gpu',
        icon: 'gpu',
        unit: '%',
        legend: ['GPU_USAGE'],
        title: 'GPU_USAGE',
        data: get(metrics, 'node_gpu_utilization.data.result'),
      },
      {
        key: 'gpu_memory',
        icon: 'computing',
        unit: '%',
        legend: ['GPU_MEMORY_USAGE'],
        title: 'GPU_MEMORY_USAGE',
        data: get(metrics, 'node_gpu_memory_utilization.data.result'),
      },
      {
        key: 'pod',
        icon: 'pod',
        unit: '%',
        legend: ['MAXIMUM_PODS'],
        title: 'MAXIMUM_PODS',
        data: get(metrics, 'node_pod_utilisation.data.result'),
      },
      {
        key: 'storage',
        icon: 'database',
        unit: '%',
        legend: ['DISK_USAGE'],
        title: 'DISK_USAGE',
        data: get(metrics, 'node_disk_size_utilisation.data.result'),
      },
    ];
    return (
      <MonitorPanel title={t('RESOURCE_USAGE')} loading={isMonitorLoading}>
        <MonitorTab tabs={hideGPUByLicense(tabs, cluster)} />
      </MonitorPanel>
    );
  }, [metrics]);

  return (
    <div>
      {hasClusterModule(cluster, 'whizard-monitoring') && renderResourceStatus}
      {hasClusterModule(cluster, 'whizard-monitoring') && renderAllocatedResources}
      {renderConditions}
      {renderTanits}
    </div>
  );
}
export default RunningStatus;
