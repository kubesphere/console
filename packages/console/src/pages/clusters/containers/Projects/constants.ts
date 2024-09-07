/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const PROJECTS_USER_KEY = 'user';
export const PROJECTS_SYSTEM_KEY = 'system';

export const MetricTypes = {
  cpu: 'namespace_cpu_usage',
  memory: 'namespace_memory_usage_wo_cache',
  gpu: 'namespace_gpu_usage',
  gpu_memory: 'namespace_gpu_memory_usage',
  pod: 'namespace_pod_count',
};

export const isSystemWorkspace = (record: { workspace?: string }) => {
  return record?.workspace === globals?.config?.systemWorkspace;
};
