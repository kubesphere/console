/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export interface BaseMetadata {
  creationTimestamp: string;
  generation: number;
  labels: Record<string, string>;
  name: string;
  resourceVersion: string;
  uid: string;
  annotations?: Record<string, string>;
}
export interface BaseSpec {
  appHome: string;
  description: Record<'zh' | 'en' | 'tc', string>;
  displayName: Record<'zh' | 'en' | 'tc', string>;
  icon: string;
  appType: string;
  abstraction?: string;
  attachments?: string[];
}

export interface AppVersionMetadata extends BaseMetadata {
  owner?: string;
  ownerReferences: {
    apiVersion: string;
    blockOwnerDeletion: boolean;
    controller: boolean;
    kind: string;
    name: string;
    uid: string;
  }[];
}

export interface AppVersionSpec extends BaseSpec {
  created: string;
  digest: string;
  versionName: string;
  sources: string[];
}
export type AppVersion = {
  apiVersion: string;
  kind: string;
  metadata: AppVersionMetadata;
  spec: AppVersionSpec;
  status: {
    state: string;
    message?: string;
    updated: string;
  };
};

export type CategoryDetail = {
  apiVersion: string;
  kind: string;
  metadata: BaseMetadata;
  spec: {
    displayName: Record<'zh' | 'en' | 'tc', string>;
    description: Record<'zh' | 'en' | 'tc', string>;
    icon: string;
  };
  status: {
    total: number;
    state?: string;
  };
};
export enum AppType {
  'helm' = 'Helm Application',
  'yaml' = 'Yaml Application',
  'edge' = 'Edge Application',
}

export type AppDetail = {
  apiVersion: string;
  kind: string;
  metadata: BaseMetadata;
  spec: BaseSpec;
  status: {
    state: string;
    updateTime: string;
  };
  // TODO; ???接口没有的字段
  workspace?: string;
};

export type AppDetailStore = AppDetail & { refetchAppDetails?: () => void };

export type AppDeployFormData = {
  name?: string;
  versionID?: string;
  namespace?: string;
  appName?: string;
  workspace?: string;
  displayName?: string;
  versionName?: string;
  package?: string;
  cluster?: string;
  conf?: any;
  annotations?: Record<string, string>;
  description?: string;
  appType?: string;
  originalName?: string;
};

export type FilesDetail = Record<string, string> | undefined;

export type ConfigValuesJson = {
  affinity?: Record<string, any>;
  config?: string;
  fullnameOverride?: string;
  image?: { repository: string; pullPolicy: string };
  imagePullSecrets?: any[];
  nameOverride?: string;
  nodeSelector?: Record<string, any>;
  password?: string;
  persistence?: { size: string };
  resources?: Record<string, any>;
  service?: { type: string; port: number };
  tests?: { enabled: boolean };
  tolerations?: any[];
};

export type AppConfigDetail = {
  valuesYaml?: string;
  valuesJSON?: ConfigValuesJson;
  valuesSchema?: Record<string, any>;
};

export type ValidNamespace = {
  label: string;
  value: string;
  disabled: boolean;
  isFedManaged: boolean;
};

export interface ApplicationsInstanceDetail {
  apiVersion: string;
  kind: string;
  metadata: BaseMetadata & {
    annotations?: Record<string, string>;
  };
  spec: BaseSpec & {
    appID: string;
    appVersionID: string;
  };
  status: {
    state: string;
    updateTime: string;
    message?: string;
  };
  workspace?: string;
  'all.yaml'?: string;
}

type ClusterDetail = {
  name: string;
  additionalInfo: string;
  appID: string;
  clusterID: string;
  createTime: string;
  env: string;
  runtimeID: string;
  status: string;
  statusTime: string;
  versionID: string;
  zone: string;
};

export type OPAppDetail = {
  name: string;
  version: AppVersion;
  app: AppDetail;
  selector: {
    'application.kubesphere.io/instance': string;
  };
  status: string;
  cluster?: string;
  workspace?: string;
} & ClusterDetail;

export type OPAppItem = {
  name: string;
  version: AppVersion;
  app: AppDetail;
  cluster: ClusterDetail;
};

export type OPAppsResponse = { items: OPAppItem[]; totalCount: number };

export interface RepoData {
  apiVersion: string;
  kind: string;
  metadata: {
    annotations: {
      'kubesphere.io/alias-name': string;
    };
    labels: {
      'kubesphere.io/workspace'?: string;
    };
    creationTimestamp?: string;
    generation?: number;
    name: string;
    resourceVersion?: string;
    uid?: string;
  };
  spec: {
    name: string;
    description?: Record<'zh' | 'en', string>;
    credential?: Record<string, unknown>;
    syncPeriod?: number | string;
    url?: string;
  };
  status?: {
    state: string;
    specHash: string;
    lastUpdateTime: string;
  };
}
