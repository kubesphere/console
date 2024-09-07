/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { KubernetesObjectBase, ObjectMeta } from './kubernetes';
import type { BaseInfo, OriginData } from '../utils';

type Port = {
  name: string;
  protocol: string;
  port: number;
  targetPort: number;
  nodePort: number;
};

export interface OriginalService extends Pick<KubernetesObjectBase, 'spec'> {
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'name'
      | 'namespace'
      | 'uid'
      | 'resourceVersion'
      | 'creationTimestamp'
      | 'labels'
      | 'annotations'
      | 'managedFields'
    >
  >;
  spec: {
    ports: Partial<Port>[];
    selector: {
      app: string;
      tier: string;
      clusterIP: string;
      clusterIPs: string[];
      type: string;
      sessionAffinity: string;
      externalTrafficPolicy: string;
      ipFamilies: string[];
      ipFamilyPolicy: string;
      internalTrafficPolicy: string;
    };
  };
  status: {
    loadBalancer: Record<string, unknown>;
  };
}

export interface IServiceDetail extends BaseInfo {
  type?: string;
  clusterIP?: string;
  selector?: Record<string, any>;
  specType?: string;
  namespace?: string;
  labels?: Record<string, any>;
  annotations?: Record<string, any>;
  status?: Record<string, any>;
  ports?: any[];
  workloadType?: string;
  sessionAffinity?: string;
  externalIPs?: string[];
  externalName?: string;
  loadBalancerIngress?: string[];
  app?: string;
  updateTime?: string;
  _originData: OriginData<OriginalService>;
}
