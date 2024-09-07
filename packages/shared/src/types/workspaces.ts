/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { OriginData } from '../utils';

interface WorkspaceClusterOverride {
  path: string;
  value?: any;
}

interface WorkspaceOverride {
  clusterName: string;
  clusterOverrides: WorkspaceClusterOverride[];
}

type OriginalWorkspace = {
  kind?: string;
  apiVersion?: string;
  metadata?: {
    name?: string;
    uid?: string;
    resourceVersion?: string;
    generation?: number;
    creationTimestamp?: string;
    annotations?: Record<string, string>;
    finalizers?: string[];
    labels?: Record<string, string>;
    managedFields: Array<{
      manage: string;
      manager: string;
      operation: string;
      apiVersion: string;
      time: string;
      fieldsType: string;
      fieldsV1: Record<string, unknown>;
    }>;
  };
  spec?: {
    template: {
      metadata: {
        creationTimestamp: string | null;
      };
      spec: {
        manager: string;
      };
    };
    placement: {
      clusters?: { name: string }[];
    };
    overrides?: WorkspaceOverride[];
  };
};

interface OriginalWorkspaceList {
  items: OriginalWorkspace[];
  totalItems: number;
}

type FormattedWorkspace = {
  uid: string;
  name: string;
  creator: string;
  description: string;
  aliasName: string;
  createTime: string;
  resourceVersion: string;
  isFedManaged: boolean;
  annotations: Record<string, string>;
  manager: string;
  clusters: { name: string }[];
  networkIsolation: boolean;
  overrides: WorkspaceOverride[];
  clusterTemplates: {
    [prop: string]: {
      metadata: Record<string, any>;
      spec: {
        manager: string;
        networkIsolation: boolean;
      };
    };
  };
  _originData: OriginData<OriginalWorkspace>;
};

interface WorkspaceDetail extends FormattedWorkspace {
  cluster?: string;
}

interface WorkspaceFormValues {
  metadata: {
    name: string;
    annotations: {
      'kubesphere.io/alias-name'?: string;
      'kubesphere.io/description'?: string;
      'kubesphere.io/creator'?: string;
    };
  };
  spec: {
    template: {
      spec: {
        manager: string;
      };
    };
    placement?: {
      cluster: string;
    };
  };
}

interface WorkspacesActionValues extends WorkspaceFormValues {
  apiVersion: 'iam.kubesphere.io/v1beta1';
  kind: 'Workspaces';
}

type WorkspacesCreateParams = WorkspacesActionValues;

type WorkspacesEditParams = WorkspacesActionValues;

interface UpdateSingleClusterNetworkIsolationMutationVariables {
  workspaceDetail: WorkspaceDetail;
  networkIsolation: boolean;
}

interface UpdateMultiClusterNetworkIsolationMutationVariables {
  clusterName: string;
  workspace: string;
  isNetworkIsolationEnabled: boolean;
}

export type {
  WorkspaceOverride,
  OriginalWorkspace,
  OriginalWorkspaceList,
  FormattedWorkspace,
  WorkspaceFormValues,
  WorkspacesActionValues,
  WorkspacesCreateParams,
  WorkspacesEditParams,
  UpdateSingleClusterNetworkIsolationMutationVariables,
  UpdateMultiClusterNetworkIsolationMutationVariables,
};
