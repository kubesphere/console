/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Icon } from '@kubed/icons';
import type { OriginData } from '../utils';

interface OriginalRole {
  apiVersion?: string;
  kind?: string;
  metadata: {
    name: string;
    uid: string;
    resourceVersion: string;
    generation: number;
    creationTimestamp: string;
    namespace: string;
    annotations: {
      'iam.kubesphere.io/aggregation-roles': string;
      'kubesphere.io/alias-name'?: string;
      'iam.kubesphere.io/rego-override'?: string;
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
      fieldsV1: {
        'f:metadata': {
          'f:annotations': {
            '.': {};
            'f:iam.kubesphere.io/aggregation-roles': {};
            'f:kubesphere.io/creator': {};
          };
        };
      };
    }[];
  };
  rules: { verbs: string[]; apiGroups: string[]; resources: string[] }[];
}

interface FormattedRole {
  uid: string;
  name: string;
  creator: string;
  description: string;
  aliasName: string;
  createTime: string;
  namespace: string;
  resourceVersion: string;
  isFedManaged: boolean;
  labels: {
    'iam.kubesphere.io/role-template': string;
  };
  annotations: {
    'iam.kubesphere.io/dependencies': string;
    'iam.kubesphere.io/module': string;
    'iam.kubesphere.io/role-template-rules': string;
    'kubesphere.io/alias-name': string;
  };
  dependencies: string[];
  roleTemplates: string[];
  rules: { verbs: string[]; apiGroups: string[]; resources: string[] }[];
  _originData: OriginData<OriginalRole>;
}

type RoleKind =
  | 'workspaceroles'
  | 'globalroles'
  | 'clusterroles'
  | 'roles'
  | 'devopsroles'
  | string;

interface RoleBaseInformationFormValues {
  metadata: {
    name: string;
    annotations: {
      'iam.kubesphere.io/aggregation-roles': string;
      'kubesphere.io/creator': string;
      'kubesphere.io/alias-name'?: string;
      'kubesphere.io/description'?: string;
    };
  };
}
interface GlobalRoleActionValues extends RoleBaseInformationFormValues {
  apiVersion: 'iam.kubesphere.io/v1alpha2';
  kind: 'GlobalRole';
}

type RoleModule = {
  name: string;
  icon: Icon;
  hide?: boolean;
  state?: 'ENABLED' | 'NOT_ENABLED';
  displayName?: Record<string, any>;
};

export type {
  RoleModule,
  OriginalRole,
  FormattedRole,
  RoleKind,
  RoleBaseInformationFormValues,
  GlobalRoleActionValues,
};
