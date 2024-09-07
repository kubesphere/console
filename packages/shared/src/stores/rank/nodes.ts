/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const resource = 'nodes';

// eslint-disable-next-line
export const sort_metric_options = [
  'node_cpu_utilisation',
  'node_load1',
  'node_memory_utilisation',
  'node_gpu_utilization',
  'node_gpu_memory_utilization',
  'node_disk_size_utilisation',
  'node_disk_inode_utilisation',
  'node_pod_utilisation',
];

// eslint-disable-next-line
export const metrics_filter = [
  'node_cpu_utilisation',
  'node_cpu_usage',
  'node_cpu_total',

  'node_memory_utilisation',
  'node_memory_usage_wo_cache',
  'node_memory_total',

  'node_gpu_utilization',
  'node_gpu_usage',
  'node_gpu_total',

  'node_gpu_memory_utilization',
  'node_gpu_memory_usage',
  'node_gpu_memory_total',

  'node_disk_size_utilisation',
  'node_disk_size_usage',
  'node_disk_size_capacity',

  'node_pod_utilisation',
  'node_pod_running_count',
  'node_pod_quota',

  'node_disk_inode_utilisation',
  'node_disk_inode_total',
  'node_disk_inode_usage',

  'node_load1',
];
