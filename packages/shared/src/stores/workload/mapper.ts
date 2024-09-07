/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, keyBy } from 'lodash';
import { getBaseInfo, getOriginData, getWorkloadUpdateTime, getJobUpdateTime } from '../../utils';
import { OriginalWorkload, FormattedWorkload, OriginalCronJob, FormateCronJob } from '../../types';
import { OriginalJob, FormateJob } from '../../types';

const WorkLoadMapper = (workload: OriginalWorkload): FormattedWorkload => {
  return {
    ...getBaseInfo(workload),
    kind: get(workload, 'kind', 'Deployment'),
    updateTime: getWorkloadUpdateTime(workload),
    labels: get(workload, 'metadata.labels', {}),
    namespace: get(workload, 'metadata.namespace'),
    annotations: get(workload, 'metadata.annotations'),
    status: get(workload, 'status', {}),
    availablePodNums: get(workload, 'status.availableReplicas', 0),
    readyPodNums: get(workload, 'status.readyReplicas', 0),
    spec: get(workload, 'spec', {}),
    podNums: get(workload, 'spec.replicas', 0),
    selector: get(workload, 'spec.selector.matchLabels'),
    containers: get(workload, 'spec.template.spec.containers'),
    initContainers: get(workload, 'spec.template.spec.initContainers'),
    volumes: get(workload, 'spec.template.spec.volumes'),
    strategy: get(workload, 'spec.strategy', {}),
    updateStrategy: get(workload, 'spec.updateStrategy.type'),
    availableCondition:
      get(workload, 'status.conditions', []).find((cd: any) => cd.type === 'Available') || {},
    app: get(workload, 'metadata.labels["app.kubernetes.io/name"]'),
    ownerReference: get(workload, 'metadata.ownerReferences[0]', {}),
    hasS2i: Object.keys(get(workload, 'metadata.labels', {})).some(labelKey =>
      labelKey.startsWith('s2ibuilder'),
    ),
    builderNames: Object.entries(get(workload, 'metadata.labels', {}))
      .filter(labelArray => labelArray[0].startsWith('s2ibuilder'))
      .map(array => array[1]), // polyfill for multi s2i in one workload
    _originData: getOriginData(workload),
  };
};

const JobMapper = (job: OriginalJob): FormateJob => {
  return {
    ...getBaseInfo(job),
    labels: get(job, 'metadata.labels', {}),
    namespace: get(job, 'metadata.namespace'),
    annotations: get(job, 'metadata.annotations'),
    status: get(job, 'status') as { active: number; startTime: string },
    updateTime: getJobUpdateTime(job),
    startTime: get(job, 'status.startTime'),
    spec: get(job, 'spec', {}),
    selector: get(job, 'spec.selector.matchLabels'),
    containers: get(job, 'spec.template.spec.containers'),
    volumes: get(job, 'spec.template.spec.volumes'),
    _originData: getOriginData(job),
  };
};

const CronJobMapper = (cronJob: OriginalCronJob): FormateCronJob => ({
  ...getBaseInfo(cronJob),
  labels: get(cronJob, 'metadata.labels', {}),
  namespace: get(cronJob, 'metadata.namespace'),
  annotations: get(cronJob, 'metadata.annotations'),
  status: get(cronJob, 'status'),
  spec: get(cronJob, 'spec', {}),
  selector: get(cronJob, 'spec.jobTemplate.metadata.labels'),
  suspend: get(cronJob, 'spec.suspend'),
  _originData: getOriginData(cronJob),
});

const HpaMapper = <M extends Record<string, any>>(item: M) => {
  const currentMetrics = keyBy(get(item, 'status.currentMetrics') || [], (metric: any) =>
    get(metric, 'resource.name'),
  );

  return {
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'),
    annotations: get(item, 'metadata.annotations'),
    status: get(item, 'status'),
    minReplicas: get(item, 'spec.minReplicas', 0),
    maxReplicas: get(item, 'spec.maxReplicas', 0),
    currentReplicas: get(item, 'status.currentReplicas', 0),
    desiredReplicas: get(item, 'status.desiredReplicas', 0),
    cpuCurrentUtilization: get(currentMetrics, 'cpu.resource.current.averageUtilization', ''),
    cpuTargetUtilization: get(item, 'metadata.annotations.cpuTargetUtilization', ''),
    memoryCurrentValue: get(currentMetrics, 'memory.resource.current.averageValue', 0),
    memoryTargetValue: get(item, 'metadata.annotations.memoryTargetValue', ''),
    _originData: getOriginData(item),
  };
};
export { WorkLoadMapper, JobMapper, CronJobMapper, HpaMapper };
