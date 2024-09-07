/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { OriginData } from '../utils';

interface OriginalSecret {
  apiVersion?: string;
  kind?: string;
  metadata: {
    name: string;
    uid: string;
    resourceVersion: string;
    generation?: number;
    creationTimestamp: string;
    namespace: string;
    labels: { modifiedAt: string; name: string; owner: string; status: string; version: string };
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
  data: { release: string };
  type: string;
}

type SecrectType =
  | 'kubernetes.io/tls'
  | 'kubernetes.io/dockerconfigjson'
  | 'kubernetes.io/basic-auth'
  | string;

interface FormattedSecret {
  uid: string;
  name: string;
  creator: string;
  description: string;
  type: string;
  aliasName: string;
  createTime: string;
  namespace: string;
  resourceVersion: string;
  isFedManaged: boolean;
  data: { release?: string; [propName: string]: any };
  labels: {
    'iam.kubesphere.io/role-template': string;
  };
  cluster?: string;
  annotations: {
    'iam.kubesphere.io/dependencies': string;
    'iam.kubesphere.io/module': string;
    'iam.kubesphere.io/role-template-rules': string;
    'kubesphere.io/alias-name': string;
  };
  _originData: OriginData<OriginalSecret>;
}

interface SubRoute {
  onSave?: Function;
  onCancel?: Function;
}

export type { SubRoute, OriginalSecret, FormattedSecret, SecrectType };
