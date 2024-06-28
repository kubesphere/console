import type { ObjectMeta } from '../index';

export interface OriginalWorkspaceResourceQuota {
  metadata: Pick<
    ObjectMeta,
    | 'name'
    | 'uid'
    | 'resourceVersion'
    | 'generation'
    | 'creationTimestamp'
    | 'labels'
    | 'ownerReferences'
    | 'managedFields'
  >;
  spec?: {
    selector?: Record<string, string>;
    quota?: {
      hard?: Record<string, string>;
    };
  };
  status?: {
    total?: Record<string, any>;
    namespaces?: { namespace: string }[] | null;
  };
}
