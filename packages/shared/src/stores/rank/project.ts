/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
export const sort_metric_options = [
  'namespace_cpu_usage',
  'namespace_memory_usage_wo_cache',
  'namespace_gpu_usage',
  'namespace_gpu_memory_usage',
  'namespace_pod_count',
  'namespace_net_bytes_received',
  'namespace_net_bytes_transmitted',
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const metrics_filter = [
  'namespace_memory_usage_wo_cache',
  'namespace_memory_limit_hard',

  'namespace_cpu_usage',
  'namespace_cpu_limit_hard',

  'namespace_gpu_limit_hard',
  'namespace_gpu_usage',
  'namespace_gpu_memory_usage',

  'namespace_pod_count',
  'namespace_pods_hard',

  'namespace_net_bytes_received',
  'namespace_net_bytes_transmitted',
];

export const getApi = () => {
  return `kapis/monitoring.kubesphere.io/v1beta1/namespace_metrics`;
};
