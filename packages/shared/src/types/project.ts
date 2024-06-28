import { BaseInfo, OriginData } from '../utils';

interface FormattedNamespace extends BaseInfo {
  _originData: OriginData<OriginalNamespace>;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  namespace?: string;
  workspace?: string;
  status?: string;
  isFedHostNamespace?: boolean;
}

type OriginalNamespace = {
  metadata?: {
    name?: string;
    uid?: string;
    resourceVersion?: string;
    creationTimestamp?: string;
    labels?: Record<string, string>;
    annotations?: Record<string, string>;
    ownerReferences?: Array<{
      apiVersion: string;
      kind: string;
      name: string;
      uid: string;
      controller: boolean;
      blockOwnerDeletion: boolean;
    }>;
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
    finalizers: string[];
  };
  status?: {
    phase: string;
  };
};

interface OriginalNamespaceList {
  items: OriginalNamespace[];
  totalItems: number;
}

export type { FormattedNamespace, OriginalNamespace, OriginalNamespaceList };
