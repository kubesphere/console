/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { BaseInfo, OriginData } from '../utils';
import type { Container, ContainerStatus } from './container';
import { KubernetesObjectBase, ObjectMeta, KubernetesListBase } from './kubernetes';

type PodStatusPhase = 'Pending' | 'Running' | 'Succeeded' | 'Failed' | 'Unknown';

interface PodStatus {
  phase: PodStatusPhase;
  conditions: {
    type: string;
    status: 'True' | 'False';
    lastProbeTime: string | null;
    lastTransitionTime: string | null;
  }[];
  hostIp: string;
  podIP?: string;
  qosClass?: string;
  podIps: { ip: string }[];
  containerStatuses: ContainerStatus[];
}

interface OriginalPod extends Pick<KubernetesObjectBase, 'spec'> {
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'name'
      | 'generateName'
      | 'namespace'
      | 'uid'
      | 'resourceVersion'
      | 'creationTimestamp'
      | 'labels'
      | 'ownerReferences'
      | 'finalizers'
      | 'managedFields'
    >
  >;
  status: PodStatus;
}

interface OriginalPodList extends KubernetesListBase<OriginalPod> {
  kind: 'PodList';
}

interface FormattedPod extends BaseInfo {
  deletionTime: string;
  labels: string;
  namespace: string;
  annotations: Record<string, string>;
  podNums: string;
  status: PodStatus | {};
  statusPhase: PodStatusPhase;
  podStatus: {
    status: string;
    type: string;
    restarts: number;
  };
  spec: Record<string, any>;
  metrics: any[];
  node: string;
  nodeIp: string;
  podIp?: string;
  networksStatus: any[];
  app: string;
  containers: Container[];
  initContainers: Container[];
  startTime: string;
  updateTime: string;
  volumes: Record<string, any>[];
  ownerKind: string;
  ownerName: string;
  _originData: OriginData<OriginalPod>;
}

interface FormattedPodDetail extends FormattedPod {
  cluster?: string;
}

export type {
  PodStatusPhase,
  PodStatus,
  OriginalPod,
  OriginalPodList,
  FormattedPod,
  FormattedPodDetail,
};
