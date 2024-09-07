/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { KubernetesObjectBase, ObjectMeta } from './kubernetes';
import { OriginData, BaseInfo } from '../utils';

interface IResource {
  name: string;
  target: {
    averageUtilization: number;
    type: string;
  };
}

interface IMetrics {
  type: string;
  resource: IResource[];
}

export interface IOriginalHpa extends KubernetesObjectBase {
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
  spec: {
    maxReplicas: number;
    metrics: IMetrics[];
    scaleTargetRef: {
      apiVersion: string;
      kind: string;
      name: string;
    };
  };
  status: {
    conditions: any | null;
    currentMetrics: any | null;
    currentReplicas: number;
    desiredReplicas: number;
  };
}

export interface IHpaDetail extends BaseInfo {
  namespace: string;
  annotations: Record<string, any>;
  status: Record<string, any>;
  minReplicas: number | null;
  maxReplicas: number | null;
  currentReplicas: number;
  desiredReplicas: number;
  cpuCurrentUtilization: string;
  cpuTargetUtilization: string;
  memoryCurrentValue: string;
  memoryTargetValue: string;
  _originData: OriginData<IOriginalHpa>;
}
