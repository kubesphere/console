/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { OriginData } from '../utils';
import { KubernetesObjectBase, ObjectMeta } from './kubernetes';

type LoadBalancerIngress = { ip?: string; hostname?: string };
interface OriginalGateway extends Pick<KubernetesObjectBase, 'spec'> {
  apiVersion?: string;
  kind?: string;
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'name'
      | 'namespace'
      | 'uid'
      | 'resourceVersion'
      | 'creationTimestamp'
      | 'finalizers'
      | 'managedFields'
      | 'generation'
      | 'annotations'
    >
  >;
}

interface FormattedGateway {
  aliasName: string;
  annotations: Record<string, string>;
  config: Record<string, string>;
  createTime: string;
  updateTime?: string;
  creator: string;
  defaultIngress?: string;
  description: string;
  externalIPs: string[];
  isFedManaged: boolean;
  isHostName: boolean;
  lb: string;
  loadBalancerIngress: LoadBalancerIngress[];
  name: string;
  namespace: string;
  ports: {
    port?: string;
    name?: string;
    nodePort?: string;
  }[];
  replicas: number;
  resourceVersion: string;
  serviceMeshEnable: boolean;
  type: string;
  uid: string;
  cluster?: string;
  _originData: OriginData<OriginalGateway>;
}

interface GatewayFormValues {
  apiVersion: 'gateway.kubesphere.io/v1alpha1';
  kind: 'Gateway';
  metadata: {
    annotations: {
      'kubesphere.io/annotations': '';
      [key: string]: string;
    };
  };
  spec: {
    controller: {
      replicas: number;
      annotations?: Record<string, string>;
      config?: Record<string, string>;
      scope: { enabled: boolean; namespace: string };
    };
    deployment: {
      annotations?: Record<string, string>;
      replicas: number;
    };
    service: {
      annotations: Record<string, string>;
      type: string;
    };
  };
}

type GatewayLog = {
  container: string;
  log: string;
  namespace: string;
  pod: string;
  time: string;
};

export type {
  OriginalGateway,
  FormattedGateway,
  GatewayFormValues,
  GatewayLog,
  LoadBalancerIngress,
};
