/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { BaseInfo, OriginData } from '../utils';
import type { KubernetesObjectBase } from './kubernetes';
import { ObjectMeta } from './kubernetes';

interface OriginalUser extends KubernetesObjectBase {
  apiVersion: string;
  kind: 'User';
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'name'
      | 'uid'
      | 'resourceVersion'
      | 'generation'
      | 'creationTimestamp'
      | 'annotations'
      | 'finalizers'
      | 'managedFields'
    >
  >;
  /*metadata: {
      name: string;
      uid: string;
      resourceVersion: string;
      generation: number;
      creationTimestamp: string;
      annotations: {
        'iam.kubesphere.io/globalrole'?: string;
        'iam.kubesphere.io/last-password-change-time': string;
        'iam.kubesphere.io/uninitialized': string;
        'kubesphere.io/creator': 'string';
        'kubesphere.io/description'?: string;
      };
      finalizers: string[];
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
    };*/
  spec: {
    email: string;
  };
  status: {
    state: string;
    lastTransitionTime: string;
  };
}

interface FormattedUser extends BaseInfo {
  username: string;
  email: string;
  role: string;
  globalrole: string;
  clusterrole: string;
  workspacerole: string;
  roleBind: string;
  groups: any[];
  status: string;
  conditions: any[];
  lastLoginTime: string;
  displayLastLoginTime: string;
  _originData: OriginData<OriginalUser>;
}

interface OriginalUserLoginRecord extends KubernetesObjectBase {
  apiVersion: string;
  kind: 'LoginRecord';
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'creationTimestamp'
      | 'generateName'
      | 'generation'
      | 'labels'
      | 'managedFields'
      | 'name'
      | 'resourceVersion'
      | 'uid'
    >
  >;
  spec: {
    type: string;
    provider: string;
    sourceIP: string;
    userAgent: string;
    success: boolean;
    reason: string;
  };
}

interface OriginalUserLoginRecordList {
  items: OriginalUserLoginRecord[];
  totalItems: number;
}

type UserStatusMutationType = 'active' | 'disabled';

interface UserFormValues {
  metadata: {
    name: string;
    annotations: {
      'iam.kubesphere.io/globalrole'?: string;
      'kubesphere.io/description'?: string;
    };
  };
  spec: {
    email: string;
    password?: string;
  };
}

interface UserActionValues extends UserFormValues {
  apiVersion: 'iam.kubesphere.io/v1beta1';
  kind: 'User';
}

type CreateUserPayload = UserActionValues & {
  metadata: {
    annotations: {
      'iam.kubesphere.io/uninitialized': 'true';
    };
  };
};

type EditUserPayload = UserActionValues & {
  metadata: {
    resourceVersion: string;
  };
  spec: {
    email: string;
    password?: string;
    lang?: string;
  };
  password?: string;
  lang?: string;
  [key: string]: any;
};

interface PutUserPasswordRequestData {
  password: string;
  rePassword: string;
}

interface InviteMemberValue {
  user: FormattedUser;
  roleRef: string;
}

interface InviteMemberPayload {
  username: string;
  roleRef: string;
}

interface EditMemberRoleValue {
  roleRef: string;
}

export interface ResponseUser {
  items: OriginalUser[];
  totalItems: number;
}

export type {
  OriginalUser,
  OriginalUserLoginRecord,
  OriginalUserLoginRecordList,
  FormattedUser,
  UserFormValues,
  UserActionValues,
  UserStatusMutationType,
  EditUserPayload,
  CreateUserPayload,
  PutUserPasswordRequestData,
  InviteMemberValue,
  InviteMemberPayload,
  EditMemberRoleValue,
};
