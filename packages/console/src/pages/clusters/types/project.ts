/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { KubernetesObjectBase, OriginData } from '@ks-console/shared';

export type ProjectSelectTypes = 'system' | 'user' | undefined;

export interface OriginalProject extends KubernetesObjectBase {
  metadata: {
    name: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    labels: {
      'kubernetes.io/metadata.name'?: string;
      'kubesphere.io/namespace'?: string;
      'kubesphere.io/workspace'?: string;
    };
    annotations: {
      'kubesphere.io/creator'?: string;
    };
    ownerReferences: {
      apiVersion: string;
      kind: string;
      name: string;
      uid: string;
      controller: boolean;
      blockOwnerDeletion: boolean;
    }[];
    finalizers: [string];
    managedFields: {
      manager: string;
      operation: string;
      apiVersion: string;
      time: string;
      fieldsType: string;
      fieldsV1: Record<string, any>;
    }[];
  };
  spec: {
    finalizers: string[];
  };
  status: {
    phase: string;
  };
}
export interface FormattedProject {
  cluster: string;
  uid: string;
  name: string;
  creator: string;
  description: string;
  aliasName: string;
  createTime: string;
  resourceVersion: string;
  isFedManaged: boolean;
  labels: Record<string, unknown>;
  annotations: Record<string, unknown>;
  workspace: string;
  status: string;
  isFedHostNamespace: boolean;
  _originData: OriginData<OriginalProject>;
}

export type ProjectOp = 'CREATE' | 'UPDATE' | 'DELETE' | 'UPDATE_ANNOTATIONS' | 'ASSIGN_WORKSPACE';

export interface IProjectQuota {
  namespace: string;
  data: {
    hard?: Record<string, string>;
    used?: Record<string, string>;
    left?: Record<string, string>;
  };
}

export interface IProjectAbnormalworkloads {
  namespace: string;
  data: Record<string, number>;
}
