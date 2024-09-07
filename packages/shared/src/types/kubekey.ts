/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Dictionary } from 'lodash';
import { BaseInfo, OriginData } from '../utils';

interface OriginalKubeKey {
  kind?: string;
  apiVersion?: string;
  metadata: {
    name?: string;
    uid?: string;
    resourceVersion?: string;
    generation?: number;
    creationTimestamp?: string;
    annotations?: Record<string, string>;
    labels?: Record<string, string>;
    managedFields?: Array<{
      manager?: string;
      operation: string;
      apiVersion: string;
      time: string;
      fieldsType: string;
      fieldsV1: Record<string, unknown>;
    }>;
  };
  spec?: {
    addons?: Record<string, string>[];
    controlPlaneEndpoint?: Record<string, unknown>;
    etcd?: Record<string, unknown>;
    hosts: Record<string, number | string>[];
    kubernetes?: Record<string, unknown>;
    kubesphere?: Record<string, unknown>;
    network?: Record<string, unknown>;
    registry?: Record<string, string>;
    roleGroups?: Record<string, unknown>;
  };
  status?: {
    etcdCount?: number | string;
    masterCount?: number | string;
    nodes: Record<string, number | string>[];
    nodesCount: number | string;
    version: string;
    workerCount?: number | string;
  };
}
interface KubeKeyFormValues {
  metadata: {
    name: string;
  };
  spec: {
    hosts: Record<string, number | string>[];
  };
}
interface KubeKeyActionValues extends KubeKeyFormValues {
  apiVersion: 'kubekey.kubesphere.io/v1alpha2';
  kind: 'Cluster';
}
interface FormattedKubeKey extends BaseInfo {
  _originData: OriginData<OriginalKubeKey>;
  labels?: any;
  annotations?: any;
  status?: Dictionary<any>;
  spec?: Dictionary<any>;
}
type KubeKeyDetail = FormattedKubeKey;
export type {
  OriginalKubeKey,
  KubeKeyFormValues,
  KubeKeyActionValues,
  FormattedKubeKey,
  KubeKeyDetail,
};
