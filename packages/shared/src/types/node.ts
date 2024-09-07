/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Dictionary } from 'lodash';
import { BaseInfo, OriginData } from '../utils';

interface OriginalNode {
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
    finalizers?: string[];
    managedFields?: Array<{
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
    unschedulable?: string;
    taints?: any[];
    podCIDR: string;
    podCIDRs: string[];
  };
  status?: {
    addresses: {
      address: string;
      type: string;
    }[];
    allocatable: Record<string, string>;
    capacity: Record<string, string>;
    conditions: Record<string, string>[];
    daemonEndpoints: Dictionary<any>;
    images: {
      name: string[];
      sizeBytes: number;
    }[];
    nodeInfo: Record<string, string>;
  };
}

interface OriginalNodeList {
  items: OriginalNode[];
  totalItems: number;
}

type TaintType = { key: string; value: string; effect: string };
interface FormattedNode extends BaseInfo {
  _originData: OriginData<OriginalNode>;
  labels?: any;
  annotations?: any;
  role?: string[];
  status?: Dictionary<any>;
  conditions?: Dictionary<any>;
  nodeInfo?: Record<string, string>;
  spec?: Dictionary<any>;
  unschedulable?: string;
  importStatus?: string;
  taints?: TaintType[];
  ip?: string;
}
type NodeDetail = FormattedNode;

export type { OriginalNode, OriginalNodeList, FormattedNode, NodeDetail, TaintType };
