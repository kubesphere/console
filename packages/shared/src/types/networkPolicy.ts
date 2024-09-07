/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { BaseInfo, OriginData } from '../utils';

interface OriginalNetworkPolicy {
  apiVersion?: string;
  kind?: string;
  metadata: {
    name: string;
    uid: string;
    resourceVersion: string;
    generation?: number;
    creationTimestamp: string;
    namespace: string;
    labels?: { [propName: string]: any };
    annotations: {
      'iam.kubesphere.io/aggregation-roles': string;
      'kubesphere.io/alias-name'?: string;
      'kubectl.kubernetes.io/last-applied-configuration'?: string;
      'kubesphere.io/creator': string;
      'kubesphere.io/description'?: string;
    };
    managedFields: {
      manager: string;
      operation: string;
      apiVersion: string;
      time: string;
      fieldsType: string;
      fieldsV1: Record<string, unknown>;
    }[];
  };
  spec: {
    egress?: { ports?: {}[]; to?: {}[] }[];
    ingress?: { ports?: {}[]; from?: {}[]; [propName: string]: any }[];
    podSelector: { matchLabels?: {} };
    policyTypes: [];
  };
}

interface FormattedNetworkPolicy extends BaseInfo {
  namespace: string;
  key: string;
  cluster?: string;
  _originData: OriginData<OriginalNetworkPolicy>;
}

export type { OriginalNetworkPolicy, FormattedNetworkPolicy };
