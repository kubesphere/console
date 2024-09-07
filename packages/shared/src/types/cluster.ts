/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Dictionary } from 'lodash';

import { KubernetesObjectBase, ObjectMeta } from './kubernetes';

import { BaseInfo, OriginData, BaseList } from '../utils';

interface OriginalCluster extends KubernetesObjectBase {
  metadata: Pick<
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
  >;
  spec?: {
    connection: {
      kubernetesAPIEndpoint: string;
      type: string;
    };
    enable: boolean;
    joinFederation: boolean;
    provider: string;
  };
  status?: {
    conditions: {
      lastTransitionTime: string;
      lastUpdateTime: string;
      message: string;
      reason: string;
      status: string;
      type: string;
    }[];
    configz: Record<string, boolean>;
    kubeSphereVersion: string;
    kubernetesVersion: string;
    nodeCount: number;
    uid: string;
  };
}

interface OriginalClusterList {
  items: OriginalCluster[];
  totalItems: number;
}

interface FormattedCluster extends BaseInfo {
  group: string;
  kkName: string;
  isReady: boolean;
  conditions: Dictionary<any>;
  _originData: OriginData<OriginalCluster>;
  configz: Record<string, unknown>;
  labels?: any;
  isHost?: boolean;
  provider?: string;
  nodeCount?: number;
  expiredDay?: number;
  visibility?: 'private' | 'public';
  connectionType?: string;
  kubernetesVersion?: string;
}

export interface ClusterProjects extends BaseList {}

type ClusterDetail = FormattedCluster;

type KubeConfig = {
  kubeconfig: string;
};

export type { OriginalCluster, OriginalClusterList, FormattedCluster, ClusterDetail, KubeConfig };
