/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { KubernetesObjectBase, ObjectMeta, KubernetesListBase } from '@ks-console/shared';

interface OriginalCategory extends KubernetesObjectBase {
  apiVersion: 'kubesphere.io/v1alpha1';
  kind: 'Category';
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'annotations'
      | 'creationTimestamp'
      | 'generation'
      | 'managedFields'
      | 'name'
      | 'resourceVersion'
      | 'uid'
    >
  >;
  spec?: {
    description?: Record<string, string>;
    displayName?: Record<string, string>;
    icon?: string;
  };
}

interface OriginalCategoryList extends KubernetesListBase<OriginalCategory> {
  kind: 'CategoryList';
}

interface FetchExtensionsRequestParams {
  fieldSelector?: string;
  labelSelector?: string;
}

interface FetchKExtensionsRequestParams {
  limit?: number;
  page?: number;
  labelSelector?: string;
  q?: string;
  available?: boolean;
  status?: 'installed' | 'uninstalling' | 'installing';
  enabled?: boolean;
  sortBy?: 'name' | 'versionUpdateTimestamp' | 'updateTimestamp' | 'installTimestamp';
  ascending?: boolean;
}

// https://github.com/kubesphere/kse/pull/381
type ExtensionStatusState =
  | 'Preparing'
  | 'Installing'
  | 'Upgrading'
  | 'Uninstalling'
  | 'Installed'
  | 'Uninstalled'
  | 'InstallFailed'
  | 'UpgradeFailed'
  | 'UninstallFailed';

type ClusterSchedulingStatusState = ExtensionStatusState;

interface ExtensionStatusCondition {
  type?: string;
  status?: string;
  lastTransitionTime?: string;
  reason?: string;
  message?: string;
}

interface Provider {
  email?: string;
  name?: string;
  url?: string;
}

interface OriginalExtension extends KubernetesObjectBase {
  apiVersion: 'kubesphere.io/v1alpha1';
  kind: 'Extension';
  metadata: Required<
    Pick<
      ObjectMeta,
      'creationTimestamp' | 'finalizers' | 'generation' | 'name' | 'resourceVersion' | 'uid'
    >
  > & {
    labels?: {
      'kubesphere.io/category'?: string;
      'kubesphere.io/repository-ref'?: string;
      'marketplace.kubesphere.io/extension-id'?: string;
      'marketplace.kubesphere.io/subscribed'?: 'true';
    };
  };
  spec?: {
    description?: Record<string, string>;
    displayName?: Record<string, string>;
    icon?: string;
    provider?: {
      [language: string]: Provider;
    };
  };
  status?: {
    conditions?: ExtensionStatusCondition[];
    enabled?: boolean;
    installedVersion?: string;
    plannedInstallVersion?: string;
    recommendedVersion?: string;
    state?: ExtensionStatusState;
    versions?: { creationTimestamp?: string; version?: string }[];
  };
}

interface OriginalExtensionList extends KubernetesListBase<OriginalExtension> {
  kind: 'ExtensionList';
}

interface OriginalInstallPlanClusterSchedulingPlacement {
  clusters?: string[];
}

interface InstallPlanStatusStateHistoryRecord {
  lastTransitionTime: string;
  state: ExtensionStatusState;
}

interface OriginalInstallPlanClusterScheduling {
  placement?: OriginalInstallPlanClusterSchedulingPlacement;
  overrides?: Record<string, string>;
}

interface InstallPlanStatus {
  clusterSchedulingStatuses?: {
    [clusterName: string]: InstallPlanClusterSchedulingStatus;
  };
  conditions?: ExtensionStatusCondition[];
  configHash?: string;
  enabled?: boolean;
  jobName?: string;
  releaseName: string;
  state: ExtensionStatusState;
  stateHistory?: InstallPlanStatusStateHistoryRecord[];
  targetNamespace: string;
  version?: string;
}

type InstallPlanClusterSchedulingStatus = Omit<
  InstallPlanStatus,
  'enabled' | 'clusterSchedulingStatuses'
>;

interface OriginalInstallPlan extends KubernetesObjectBase {
  apiVersion: 'kubesphere.io/v1alpha1';
  kind: 'InstallPlan';
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'annotations'
      | 'creationTimestamp'
      | 'generation'
      | 'managedFields'
      | 'name'
      | 'resourceVersion'
      | 'uid'
    >
  > &
    Pick<ObjectMeta, 'deletionTimestamp'>;
  spec: {
    enabled: boolean;
    extension: {
      name: string;
      version: string;
    };
    config?: string;
    clusterScheduling?: OriginalInstallPlanClusterScheduling;
  };
  status?: InstallPlanStatus;
}

interface OriginalExtensionVersionExternalDependency {
  name: string;
  required?: boolean;
  version?: string;
}

interface OriginalExtensionVersion extends KubernetesObjectBase {
  apiVersion: 'kubesphere.io/v1alpha1';
  kind: 'ExtensionVersion';
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'annotations'
      | 'creationTimestamp'
      | 'finalizers'
      | 'generation'
      | 'labels'
      | 'managedFields'
      | 'name'
      | 'resourceVersion'
      | 'uid'
    >
  >;
  spec?: {
    chartURL?: string;
    description?: Record<string, string>;
    displayName?: Record<string, string>;
    home?: string;
    docs?: string;
    icon?: string;
    created?: string;
    installationMode?: string | 'Multicluster';
    keywords?: string[];
    ksVersion?: string;
    kubeVersion?: string;
    repository?: string;
    sources?: string[];
    provider?: {
      [language: string]: Provider;
    };
    version?: string;
    screenshots?: string[];
    externalDependencies?: OriginalExtensionVersionExternalDependency[];
  };
}

interface OriginalExtensionVersionList extends KubernetesListBase<OriginalExtensionVersion> {
  kind: 'ExtensionVersionList';
}

interface OriginalExtensionVersionFile {
  Name: string;
  Data: string;
}

interface PostInstallPlanRequestData extends Omit<OriginalInstallPlan, 'metadata' | 'status'> {
  metadata: Pick<OriginalInstallPlan['metadata'], 'name'>;
}

interface PatchInstallPlanRequestData {
  metadata?: {
    annotations?: {
      'kubesphere.io/force-delete'?: '';
    };
  };
  spec?: {
    extension?: { version: string };
    enabled?: boolean;
    config?: string;
    clusterScheduling?: OriginalInstallPlanClusterScheduling;
  };
}

interface FormattedInstallPlanClusterSchedulingOverrides {
  clusterName: string;
  configOverride: string;
}

interface CreateInstallPlanMutationVariables {
  extensionName: string;
  version: string;
  config?: string;
}

interface UpdateInstallPlanMutationVariables {
  extensionName: string;
  version?: string;
  enabled?: boolean;
  config?: string;
  forceDelete?: boolean;
  clusterScheduling?: {
    placement?: OriginalInstallPlanClusterSchedulingPlacement;
    overrides?: FormattedInstallPlanClusterSchedulingOverrides[];
  };
}

interface DeleteInstallPlanMutationVariables {
  extensionName: string;
}

export type {
  OriginalCategory,
  OriginalCategoryList,
  FetchExtensionsRequestParams,
  FetchKExtensionsRequestParams,
  ExtensionStatusState,
  ExtensionStatusCondition,
  ClusterSchedulingStatusState,
  OriginalExtension,
  OriginalExtensionList,
  OriginalExtensionVersionExternalDependency,
  OriginalExtensionVersion,
  OriginalExtensionVersionList,
  OriginalExtensionVersionFile,
  OriginalInstallPlanClusterSchedulingPlacement,
  OriginalInstallPlanClusterScheduling,
  OriginalInstallPlan,
  PostInstallPlanRequestData,
  PatchInstallPlanRequestData,
  FormattedInstallPlanClusterSchedulingOverrides,
  CreateInstallPlanMutationVariables,
  UpdateInstallPlanMutationVariables,
  DeleteInstallPlanMutationVariables,
};
