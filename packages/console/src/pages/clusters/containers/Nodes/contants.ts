/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isUndefined } from 'lodash';
import { nodeStore } from '@ks-console/shared';
const { withTypeSelectParams } = nodeStore;

export const authKey = 'nodes';

export const MetricTypes: Record<string, string> = {
  cpu_used: 'node_cpu_usage',
  cpu_total: 'node_cpu_total',
  cpu_utilisation: 'node_cpu_utilisation',
  memory_used: 'node_memory_usage_wo_cache',
  memory_total: 'node_memory_total',
  memory_utilisation: 'node_memory_utilisation',
  gpu_utilization: 'node_gpu_utilization',
  gpu_used: 'node_gpu_usage',
  gpu_total: 'node_gpu_total',
  gpu_memory_utilization: 'node_gpu_memory_utilization',
  gpu_memory_used: 'node_gpu_memory_usage',
  gpu_memory_total: 'node_gpu_memory_total',
  pod_used: 'node_pod_running_count',
  pod_total: 'node_pod_quota',
  allocatable_cpu_total: 'node_pod_requests_cpu_total',
  allocatable_cpu_utilisation: 'node_pod_requests_cpu_allocatable_utilisation',
  limit_cpu_total: 'node_pod_limits_cpu_total',
  limit_cpu_utilisation: 'node_pod_limits_cpu_allocatable_utilisation',
  allocatable_memory_total: 'node_pod_requests_memory_total',
  allocatable_memory_utilisation: 'node_pod_requests_memory_allocatable_utilisation',
  limits_memory_total: 'node_pod_limits_memory_total',
  limits_memory_utilisation: 'node_pod_limits_memory_allocatable_utilisation',
  node_disk_size_utilisation: 'node_disk_size_utilisation',
};

export const transformRequestParams = (params: Record<string, any>) => {
  const { type = 'node', pageIndex, pageSize, parameters, ...rest } = params;
  const requestParams = withTypeSelectParams({ ...parameters, ...rest }, type);
  requestParams.limit = pageSize;
  requestParams.page = pageIndex + 1;
  return requestParams;
};
export const tips = [
  {
    key: 'node_type',
    title: 'NODE_TYPES_Q',
    description: 'NODE_TYPES_A',
  },
  {
    key: 'what_is_node_taints',
    title: 'WHAT_IS_NODE_TAINTS_Q',
    description: 'WHAT_IS_NODE_TAINTS_A',
  },
];

export const toPercentage = (num: number) => {
  const number = isUndefined(num) || isNaN(num) ? 0 : Number(num);
  return `${Math.ceil(number * 100)}%`;
};
export const getUnschedulable = (record: any) => {
  const taints = record.taints;

  return taints.some((taint: any) => taint.key === 'node.kubernetes.io/unschedulable');
};
export const getReady = (record: any) => {
  const conditions = record.conditions;
  return conditions.some(
    (condition: any) => condition.type === 'Ready' && condition.status === 'True',
  );
};

export const MASTER_ROLE = ['master', 'control-plane'];
