/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { BaseInfo, OriginData } from '../utils';

interface FormattedDevops extends BaseInfo {
  devops?: string;
  workspace?: string;
  namespace?: string;
  status?: string;
  sourceRepos?: unknown[];
  destinations?: unknown[];
  _originData?: OriginData<OriginalDevops>;
}

type OriginalDevops = {
  metadata?: {
    name?: string;
    generateName?: string;
    uid?: string;
    resourceVersion?: string;
    creationTimestamp?: string;
    labels?: Record<string, string>;
    annotations?: Record<string, string>;
    finalizers?: string[];
    managedFields: Array<{
      manager: string;
      operation: string;
      apiVersion: string;
      time: string;
      fieldsType: string;
      fieldsV1: Record<string, unknown>;
    }>;
  };
  spec?: {
    argo: {
      sourceRepos: unknown;
      destinations: unknown;
    };
    finalizers: string[];
  };
  status?: {
    adminNamespace: string;
    phase: string;
  };
};

export { FormattedDevops, OriginalDevops };
