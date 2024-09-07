/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isUndefined, isEmpty, sortBy } from 'lodash';

import { FormattedWorkload, FormateJob, FormateCronJob } from '../types';

export const getDeployStatus = ({
  hasS2i,
  spec = {},
  status = {},
  annotations = {},
}: {
  hasS2i: boolean;
  spec: {
    [key: string]: string | number | undefined;
    replicas?: number;
    readyReplicas?: number;
  };
  status: {
    [key: string]: string | number | undefined;
    readyReplicas?: number;
  };
  annotations: Record<string, string>;
}): string => {
  if (hasS2i) {
    const s2iStatus = get(annotations, "['devops.kubesphere.io/inithasbeencomplted']", 'Running');
    if (s2iStatus !== 'Successful') {
      return `S2I_${s2iStatus}`;
    }
  }

  if (spec.replicas === 0 && !isUndefined(status.readyReplicas) && status.readyReplicas !== 0) {
    return 'Updating';
  }

  if (spec.replicas) {
    if (status.readyReplicas === spec.replicas) {
      return 'Running';
    }
    return 'Updating';
  }

  return 'Stopped';
};

export const getStatefulSetStatus = ({
  spec = {},
  status = {},
}: {
  spec: {
    [key: string]: string | number | undefined;
    replicas?: number;
    readyReplicas?: number;
  };
  status: {
    [key: string]: string | number | undefined;
    readyReplicas?: number;
  };
}) => {
  if (spec.replicas === 0 && !isUndefined(status.readyReplicas) && status.readyReplicas !== 0) {
    return 'Updating';
  }

  if (spec.replicas) {
    if (status.readyReplicas === spec.replicas) {
      return 'Running';
    }
    return 'Updating';
  }

  return 'Stopped';
};

export const getDaemonSetStatus = ({
  status,
}: {
  status: {
    [key: string]: string | number | undefined;
    numberAvailable?: number;
    desiredNumberScheduled?: number;
  };
}) => {
  if (status.desiredNumberScheduled === 0) {
    return 'Stopped';
  }
  if (status.numberAvailable === status.desiredNumberScheduled) {
    return 'Running';
  }
  return 'Updating';
};

export const getJobStatus = ({
  spec,
  status,
}: {
  spec: {
    [key: string]: string | number | undefined;
    replicas?: number;
    readyReplicas?: number;
    Completions: number;
  };
  status: {
    conditions: { type?: string; status?: string }[];
    Succeed: number;
  };
}) => {
  if (isEmpty(status)) return 'Failed';

  let defaultStatus = 'RUNNING';

  if (!isEmpty(status.conditions)) {
    status.conditions.some(item => {
      if (item.type === 'Failed' && item.status === 'True') {
        defaultStatus = 'FAILED';
        return true;
      }

      if (item.type === 'Complete' && item.status === 'True') {
        defaultStatus = 'COMPLETED';
        return true;
      }

      return false;
    });
  }

  if (spec && status) {
    if (spec.Completions <= status.Succeed) {
      defaultStatus = 'Failed';
    }
  }

  return defaultStatus;
};

export const getCronJobStatus = ({ spec }: { spec: { suspend: string } }) => {
  if (spec.suspend) {
    return 'Paused';
  }
  return 'Running';
};

export const getWorkloadStatus = (
  record: FormattedWorkload | FormateJob | FormateCronJob,
  module: string,
) => {
  const funcMap: {
    [key: string]: any;
  } = {
    deployments: getDeployStatus,
    statefulsets: getStatefulSetStatus,
    daemonsets: getDaemonSetStatus,
    jobs: getJobStatus,
    cronjobs: getCronJobStatus,
  };

  let status = '';
  let reason = '';

  if (funcMap[module]) {
    status = funcMap[module](record);
  }

  if (status === 'Updating') {
    const conditions = get(record, 'status.conditions', [])
      .filter((cd: { type: string; status: string }) =>
        cd.type === 'ReplicaFailure' ? cd.status === 'True' : cd.status === 'False',
      )
      .reverse();
    reason = get(conditions, '[0].reason');
  }

  return { status, reason };
};

export function getContainerStatus({ state = {}, ready }: any = {}) {
  let status = 'waiting';
  const keys = Object.keys(state);

  if (keys.length === 0) {
    status = 'waiting';
  } else if (keys.length === 1) {
    status = keys[0];
  } else {
    status = keys[0];
    keys.forEach(key => {
      if (state[status].startedAt < state[key].startedAt) {
        status = key;
      }
    });
  }

  let reason = get(state, `${status}.reason`, '');

  if (!ready && status === 'running') {
    status = 'waiting';
    reason = 'ContainerNotReady';
  }

  return { reason, status };
}

export function getPodStatusAndRestartCount(pod: any) {
  const {
    phase = '',
    reason = '',
    containerStatuses,
    initContainerStatuses = [],
    conditions = [],
  } = pod.status || {};
  let status: string = phase;
  let restarts: number = 0;
  let initializing: boolean = false;
  let readyCondition: Record<string, any> = {};

  if (!isEmpty(reason)) {
    status = reason;
  }

  if (!isEmpty(initContainerStatuses)) {
    initContainerStatuses.forEach((container: any, index: number) => {
      restarts += Number(container.restartCount);
      const waiting = get(container, 'state.waiting');
      const terminated = get(container, 'state.terminated');
      if (terminated && terminated.exitCode === 0) {
        return;
      }

      if (terminated) {
        if (isEmpty(terminated.reason)) {
          status = `Init:${terminated.reason}`;
        } else if (terminated.signal !== 0) {
          status = `Init:Signal:${terminated.signal}`;
        } else {
          status = `Init:ExitCode:${terminated.exitCode}`;
        }
        initializing = true;
      } else if (
        waiting &&
        terminated &&
        !isEmpty(terminated.reason) &&
        waiting.reason !== 'PodInitializing'
      ) {
        status = `Init:${terminated.reason}`;
        initializing = true;
      } else {
        const len = get(pod, 'spec.initContainers.length');
        status = `Init:${index}/${len}`;
        initializing = true;
      }
    });
  }

  if (!initializing && !isEmpty(containerStatuses)) {
    let hasRunning = false;
    restarts = 0;
    containerStatuses.forEach((container: any) => {
      restarts += Number(container.restartCount);

      const waiting = get(container, 'state.waiting');
      const terminated = get(container, 'state.terminated');

      if (waiting && waiting.reason) {
        status = waiting.reason;
      } else if (terminated && terminated.reason) {
        status = terminated.reason;
      } else if (terminated && !terminated.reason) {
        status =
          terminated.singal !== 0
            ? `Signal:${terminated.singal}`
            : `ExitCode:${terminated.exitCode}`;
      } else if (container.ready && container.state && container.state.running) {
        hasRunning = true;
      }
    });

    if (status === 'Completed' && hasRunning) {
      status = 'Running';
    }

    conditions.forEach((item: any) => {
      if (status === 'Running') {
        if (item.type === 'Unschedulable' ? item.status === 'True' : item.status === 'False') {
          status = 'Pending';
        }
      }

      if (item.type === 'Ready') {
        readyCondition = item;
      }
    });
  }

  if (get(pod, 'metadata.deletionTimestamp')) {
    status = reason === 'NodeLost' ? 'UnKnown' : 'Terminating';
  }

  let type = 'waiting';
  switch (status) {
    case 'Running':
      type = 'running';
      break;
    case 'Failed':
    case 'Error':
      type = 'error';
      break;
    case 'Completed':
      type = 'completed';
      break;
    case 'Succeeded':
      if (readyCondition?.reason === 'PodCompleted') {
        type = 'completed';
      } else {
        status = readyCondition?.reason;
      }
      break;
    case 'Pending':
      {
        const cds = sortBy(
          conditions.filter((item: any) =>
            item.type === 'Unschedulable' ? item.status === 'True' : item.status === 'False',
          ),
          'lastTransitionTime',
        );
        status = get(cds, '[0].reason', status);
      }
      break;
    default:
      if (status.startsWith('OutOf')) {
        type = 'error';
      }
      // Init:*, Terminating, Signal:*, ExitCode:*, ContainerCreating, Others
      break;
  }

  return { status, type, restarts };
}

export function getPipelineStatus(statusDetail: Record<string, any>) {
  const { state = '', result = '' } = statusDetail || {};

  if (state === 'QUEUED') {
    return { type: 'queued', label: t('QUEUED') };
  }
  if (state === 'RUNNING') {
    return { type: 'running', label: t('RUNNING') };
  }
  if (result === 'UNSTABLE') {
    return { type: 'unstable', label: t('UNSTABLE') };
  }
  if (state === 'FINISHED' && result === 'SUCCESS') {
    return { type: 'success', label: t('SUCCESSFUL') };
  }
  if (state === 'FINISHED' && result === 'FAILURE') {
    return { type: 'failure', label: t('FAILED') };
  }
  if (state === 'FINISHED' && result === 'ABORTED') {
    return { type: 'aborted', label: t('ABORTED') };
  }
  if (state === 'PAUSED') {
    return { type: 'paused', label: t('PAUSED') };
  }
  return { type: 'nostatus', label: t('NOT_RUNNING') };
}

export function getComponentStatus({ totalBackends, healthyBackends }: any) {
  if (healthyBackends !== totalBackends) {
    return 'Warning';
  }

  if (totalBackends === 0) {
    return 'Stopped';
  }

  return 'Healthy';
}

export function getConditionsStatus(record: Record<string, any>) {
  if (record.status === 'Unknown') {
    return 'Warning';
  }

  switch (record.type) {
    case 'OutOfDisk':
      if (record.status === 'True') return 'Warning';
      break;
    case 'MemoryPressure':
      if (record.status === 'True') return 'Warning';
      break;
    case 'DiskPressure':
      if (record.status === 'True') return 'Warning';
      break;
    case 'PIDPressure':
      if (record.status === 'True') return 'Warning';
      break;
    case 'NetworkUnavailable':
      if (record.status === 'True') return 'Warning';
      break;
    case 'ConfigOK':
      if (record.status === 'False') return 'Warning';
      break;
    case 'KubeletReady':
      if (record.status === 'False') return 'Warning';
      break;
    case 'Ready':
      if (record.status !== 'True') return 'Warning';
      break;
    default:
      break;
  }

  return 'Running';
}

export function getNodeStatus({ status = {}, spec = {}, importStatus }: any) {
  if (importStatus && importStatus !== 'success') {
    return importStatus;
  }

  const conditions = status.conditions || [];
  let health = true;

  if (spec.unschedulable) {
    return 'Unschedulable';
  }

  conditions.forEach((item: any) => {
    health = getConditionsStatus(item) === 'Running';
  });

  return health ? 'Running' : 'Warning';
}
