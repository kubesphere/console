/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { KubernetesObjectBase, ObjectMeta } from './kubernetes';
import { OriginData, BaseInfo } from '../utils';

export interface OriginalIngress extends KubernetesObjectBase {
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
    rules: Record<string, any>[];
  };
  status: {
    loadBalancer: {
      [key: string]: any;
      ingress: any[];
    };
  };
}

export interface IngressDetail extends BaseInfo {
  namespace: string;
  labels: Record<string, any>;
  annotations: Record<string, any>;
  rules: Record<string, any>[];
  tls: Record<string, any>[];
  loadBalancerIngress: string[];
  app: string;
  _originData: OriginData<any>;
}
