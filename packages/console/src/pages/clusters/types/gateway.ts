/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { BaseInfo, KubernetesObjectBase, OriginData } from '@ks-console/shared';

export interface OriginalGateway extends KubernetesObjectBase {
  metadata: {
    name: string;
    namespace: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    generation: number;
    annotations: Record<string, any>;
    labels?: Record<string, any>;
    finalizers?: string[];
    managedFields: Record<string, any>[];
  };
  spec: {
    controller: {
      replicas: number;
      scope: {
        enabled: boolean;
        namespace: string;
      };
      service: {
        type: string;
      };
      deployment: {
        replicas: number;
        annotations: Record<string, any>;
        resources: Record<string, any>;
      };
    };
  };
}

export interface FormattedGateway extends BaseInfo {
  namespace: string;
  annotations: Record<string, any>;
  externalIPs: string[];
  ports: {
    appProtocol: string;
    name: string;
    nodePort: number;
    port: number;
    protocol: string;
    targetPort: string;
  }[];
  loadBalancerIngress: string[];
  defaultIngress: string;
  isHostName: boolean;
  serviceMeshEnable: boolean;
  replicas: number;
  type: string;
  config: Record<string, any>;
  lb: string;
  _originData: OriginData<OriginalGateway>;
}
