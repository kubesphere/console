/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { BaseInfo, OriginData } from '../utils';

interface OriginalServiceAccount {
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
  secrets: { name: string; [propName: string]: any }[];
}

interface FormattedServiceAccount extends BaseInfo {
  namespace: string;
  labels: {
    'iam.kubesphere.io/role-template': string;
  };
  annotations: {
    'iam.kubesphere.io/dependencies': string;
    'iam.kubesphere.io/module': string;
    'iam.kubesphere.io/role-template-rules': string;
    'kubesphere.io/alias-name': string;
  };
  role: string;
  secrets: { name: string; [propName: string]: any }[];
  cluster?: string;
  _originData: OriginData<OriginalServiceAccount>;
}

export type { OriginalServiceAccount, FormattedServiceAccount };
