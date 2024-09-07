/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { BaseInfo, OriginData } from '../utils';

interface OriginalNetworkIPPool {
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
  spec: {
    cidr: string;
    dns: {};
    blockSize?: number;
    type: string;
    vlanConfig?: {};
  };
  status: { [propName: string]: any; workspaces?: {} };
}

interface FormattedNetworkIPPool extends BaseInfo {
  namespace?: string;
  cluster?: string;
  cidr: string;
  status: object;
  workspace: string;
  isDefault: boolean;
  selector: {
    'ippool.network.kubesphere.io/name': string;
  };
  _originData: OriginData<OriginalNetworkIPPool>;
}

interface FormDataCreateNetworkIPPool {
  cidrs: any;
  mask: number;
  count: number;
  ip: string;
}

interface CridObject {
  cidr: string;
  desc?: string;
  name?: string;
}

export type {
  OriginalNetworkIPPool,
  FormattedNetworkIPPool,
  FormDataCreateNetworkIPPool,
  CridObject,
};
