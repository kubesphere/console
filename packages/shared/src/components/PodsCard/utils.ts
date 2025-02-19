/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, has, isEmpty } from 'lodash';
import { FormattedPod } from '../../types/pod';
import { joinSelector } from '../../utils';

export interface ParamsType {
  cluster?: string;
  namespace?: string;
  pvcName?: string;
  nodeName?: string;
  labelSelector?: string;
  ownerKind?: string;
  ownerReference?: string;
}

// TODO: type
export const getParams = (
  cluster: string,
  detail: any,
  details: any,
  isFederated?: boolean,
): ParamsType => {
  const curDetail = isFederated ? details[cluster] : detail;
  const { name, namespace, kind: curKind, selector, uid } = curDetail || {};
  const kind = curKind || get(curDetail._originData, 'kind', '');
  let result: ParamsType = {};

  if (cluster) {
    result.cluster = cluster;
  }

  if (namespace) {
    result.namespace = namespace;
  }

  switch (kind) {
    case 'PVC':
      result.pvcName = name;
      break;
    case 'Node':
      result.nodeName = name;
      break;
    case 'Namespace':
      result.namespace = name;
      break;
    case 'Service':
    case 'IPPool':
      result.labelSelector = joinSelector(selector);
      break;
    default:
      result.ownerReference = uid;
      result.labelSelector = joinSelector(selector);
  }

  if (has(result, 'labelSelector') && isEmpty(selector)) {
    result = {};
  }

  return result;
};

export const MetricTypes = {
  cpu: 'pod_cpu_usage',
  memory: 'pod_memory_usage_wo_cache',
  gpu: 'pod_gpu_usage',
  gpu_memory: 'pod_gpu_memory_usage',
};

//TODO: type
export const getPodMetrics = (pod: FormattedPod, data: any) => {
  const metrics: Record<string, any> = {};

  Object.entries(MetricTypes).forEach(([key, value]) => {
    const records = get(data, `${value}.data.result`) || [];
    metrics[key] = records.find((item: any) => get(item, 'metric.pod') === pod.name);
  });
  return metrics;
};
