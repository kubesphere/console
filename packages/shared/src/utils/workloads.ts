/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, set, merge, isEmpty } from 'lodash';
import { OriginalWorkload, OriginalJob } from '../types';
import { getApiVersion } from './getApiVersion';

export const getWorkloadUpdateTime = (record: OriginalWorkload) => {
  const annotations = get(record, 'metadata.annotations', {});
  const status = get(record, 'status', {}) as {
    conditions?: any;
    [key: string]: any;
  };

  if (annotations.updateTime) return annotations.updateTime;

  const conditions = status!.conditions || [];

  if (isEmpty(conditions)) return get(record, 'metadata.creationTimestamp');

  let lastTime = new Date(get(conditions, '[0].lastUpdateTime', 0)).valueOf();
  conditions.forEach(({ lastUpdateTime }: { lastUpdateTime: string }) => {
    const value = new Date(lastUpdateTime).valueOf();
    if (value > lastTime) {
      lastTime = value;
    }
  });

  return lastTime;
};

export const getJobUpdateTime = (item: OriginalJob) => {
  const status = get(item, 'status', {});

  const conditions = get(status, 'conditions', []);

  if (isEmpty(conditions)) return get(item, 'metadata.creationTimestamp');

  let lastTime = new Date(get(conditions, '[0].lastTransitionTime', 0)).valueOf();
  conditions.forEach(({ lastTransitionTime }: { lastTransitionTime: string }) => {
    const value = new Date(lastTransitionTime).valueOf();
    if (value > lastTime) {
      lastTime = value;
    }
  });

  return lastTime;
};

export const getCurrentRevision = ({
  workloadDetail,
  revisions,
  module = 'deployments',
}: {
  workloadDetail: Record<string, any>;
  revisions: Record<string, any>[0];
  module: string;
}) => {
  let revision = '0';

  switch (module) {
    default:
    case 'deployments':
      revision = get(workloadDetail, 'annotations["deployment.kubernetes.io/revision"]');
      break;
    case 'statefulsets':
    case 'daemonsets': {
      let maxRevision = get(revisions[0], 'revision', 0);
      for (let i = 1; i < revisions.length; i++) {
        if (revisions[i].revision > maxRevision) {
          maxRevision = revisions[i].revision;
        }
      }

      const cur = revisions.find(
        (item: Record<string, any>) => item.name === get(workloadDetail, 'status.currentRevision'),
      );
      revision = cur ? cur.revision : maxRevision;
      break;
    }
  }

  return parseInt(revision, 10);
};

export const getHpaFormattedData = (formData = {}, k8sVersion?: string) => {
  const cpuCurrentUtilization = get(formData, 'metadata.annotations.cpuCurrentUtilization', 0);
  const cpuTargetUtilization = get(formData, 'metadata.annotations.cpuTargetUtilization', 0);
  const memoryCurrentValue = get(formData, 'metadata.annotations.memoryCurrentValue', 0);
  const memoryTargetValue = get(formData, 'metadata.annotations.memoryTargetValue', '');
  const cpuMetric = cpuTargetUtilization
    ? [
        {
          type: 'Resource',
          resource: {
            name: 'cpu',
            target: {
              type: 'Utilization',
              averageUtilization: Number(cpuTargetUtilization),
            },
          },
        },
      ]
    : [];
  const memoryNumber = memoryTargetValue?.match(/(\d+)/)?.[0];
  const memoryMetric =
    memoryNumber && Number(memoryNumber) > 0
      ? [
          {
            type: 'Resource',
            resource: {
              name: 'memory',
              target: {
                type: 'AverageValue',
                averageValue: `${memoryNumber}Mi`,
              },
            },
          },
        ]
      : [];

  const data = merge(formData, {
    apiVersion: getApiVersion('horizontalpodautoscalers', k8sVersion),
    kind: 'HorizontalPodAutoscaler',
    metadata: {
      annotations: {
        cpuCurrentUtilization: String(cpuCurrentUtilization),
        cpuTargetUtilization: String(cpuTargetUtilization),
        memoryCurrentValue: String(memoryCurrentValue),
        memoryTargetValue: String(memoryTargetValue),
      },
    },
  });

  set(data, 'spec.metrics', [...memoryMetric, ...cpuMetric]);

  return data;
};
