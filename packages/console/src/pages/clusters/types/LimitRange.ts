/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { BaseInfo, KubernetesObjectBase, OriginData } from '@ks-console/shared';

export interface OriginalLimitRange extends KubernetesObjectBase {
  metadata: {
    name: string;
    namespace: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    annotations: Record<string, any>;
    managedFields: {
      manager: string;
      operation: string;
      apiVersion: string;
      time: string;
      fieldsType: string;
      fieldsV1?: Record<string, any>;
    }[];
  };
  spec: {
    limits: {
      type: string;
      default: {
        cpu: string;
        memory: string;
      };
      defaultRequest: {
        cpu: string;
        memory: string;
      };
    }[];
  };
}
export interface OriginalLimitRangeList extends KubernetesObjectBase {
  items: OriginalLimitRange[];
}
export interface FormattedLimitRange extends BaseInfo {
  namespace: string;
  limit: {
    type?: string;
    default?: {
      cpu: string;
      memory: string;
    };
    defaultRequest?: {
      cpu: string;
      memory: string;
    };
  };
  _originData: OriginData<OriginalLimitRange>;
}
