/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { BaseInfo, OriginData } from '../utils';

interface FormattedFederateProject extends BaseInfo {
  overrides?: string[];
  template?: Record<string, unknown>;
  clusters?: unknown[];
  clusterTemplates?: Record<string, any>;
  type?: string;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  app?: string;
  namespace?: string;
  status?: string;
  _originData?: OriginData<OriginalFederatedProject>;
}

type OriginalFederatedProject = {
  kind?: string;
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

export { FormattedFederateProject, OriginalFederatedProject };
