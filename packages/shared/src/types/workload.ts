/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { KubernetesObjectBase, ObjectMeta } from './kubernetes';
import { OriginalPod } from './pod';
import { OriginData, BaseInfo } from '../utils';

interface MatchLabels {
  [key: string]: string;
}

interface Strategy {
  type: string;
  rollingUpdate?: {
    maxUnavailable?: string;
    maxSurge?: string;
  };
}

interface WorkloadBase extends KubernetesObjectBase {
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'annotations'
      | 'creationTimestamp'
      | 'generation'
      | 'labels'
      | 'managedFields'
      | 'name'
      | 'namespace'
      | 'ownerReferences'
      | 'resourceVersion'
      | 'uid'
    >
  >;
}

// workload -> deployment| statefuleset | deamonSet
export interface OriginalWorkload extends WorkloadBase {
  spec: {
    replicas?: number;
    selector: {
      matchLabels: MatchLabels;
    };
    strategy?: Strategy;
    progressDeadlineSeconds?: number;
    minReadySeconds?: number;
    revisionHistoryLimit?: number;
    paused?: boolean;
    template: OriginalPod;
  };
  status: {
    [key: string]: any;
  };
}
export interface FormattedWorkload extends BaseInfo {
  kind: string;
  updateTime: string;
  labels: {
    [key: string]: string;
  };
  namespace: string;
  annotations: {
    [key: string]: string;
  };
  status: {
    [key: string]: string;
  };
  availablePodNums: number;
  readyPodNums: number;
  spec: {
    [key: string]: any;
  };
  podNums: number;
  selector: {
    [key: string]: any;
  };
  containers: { [key: string]: any }[];
  initContainers: { [key: string]: any }[];
  volumes: { [key: string]: any }[];
  strategy: Strategy;
  updateStrategy: string;
  availableCondition: { [key: string]: any }[] | { [key: string]: any };
  app: string;
  ownerReference: { [key: string]: any };
  hasS2i: boolean;
  builderNames: unknown[];
  _originData: OriginData<OriginalWorkload>;
}

// workload -> Job
export interface OriginalJob extends WorkloadBase {
  spec: {
    containers: Record<string, any>[];
    dnsPolicy: string;
    restartPolicy: string;
    schedulerName: string;
    securityContext: Record<string, any>;
    serviceAccount: string;
    serviceAccountName: string;
    terminationGracePeriodSeconds: number;
  };
  status: {
    active: number;
    startTime: string;
  };
}
export interface FormateJob extends BaseInfo {
  labels: Record<string, string>;
  namespace: string;
  annotations: Record<string, string>;
  status: Record<string, any>;
  updateTime: string;
  startTime: string;
  spec: Record<string, any>;
  selector: Record<string, any>;
  containers: { [key: string]: any }[];
  volumes: { [key: string]: any }[];
  _originData: OriginData<OriginalJob>;
}

// workload -> CronJob
export interface OriginalCronJob extends WorkloadBase {
  spec: {
    concurrencyPolicy: string;
    failedJobsHistoryLimit: number;
    jobTemplate: Record<string, any>;
    schedule: string;
    successfulJobsHistoryLimit: number;
    suspend: boolean;
  };
  status: Record<string, any>;
}

export interface FormateCronJob extends BaseInfo {
  labels: Record<string, string>;
  namespace: string;
  annotations: Record<string, string>;
  status: Record<string, any>;
  spec: Record<string, any>;
  selector: string;
  suspend: boolean;
  _originData: OriginData<OriginalCronJob>;
}
