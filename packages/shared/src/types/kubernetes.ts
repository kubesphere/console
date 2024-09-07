/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

// https://unpkg.com/browse/kubernetes-types/meta/v1.d.ts
// https://unpkg.com/browse/@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta.d.ts

type Time = string;

interface ManagedFieldsEntry {
  apiVersion?: string;
  fieldsType?: string;
  fieldsV1?: {
    [key: string]: any;
  };
  manager?: string;
  operation?: string;
  subresource?: string;
  time?: Time;
}

interface OwnerReference {
  apiVersion: string;
  blockOwnerDeletion?: boolean;
  controller?: boolean;
  kind: string;
  name: string;
  uid: string;
}

interface ObjectMeta {
  annotations?: {
    [key: string]: string;
  };
  readonly creationTimestamp?: Time;
  readonly deletionGracePeriodSeconds?: number;
  readonly deletionTimestamp?: Time;
  finalizers?: string[];
  generateName?: string;
  readonly generation?: number;
  labels?: {
    [key: string]: string;
  };
  managedFields?: ManagedFieldsEntry[];
  name?: string;
  namespace?: string;
  ownerReferences?: OwnerReference[];
  readonly resourceVersion?: string;
  selfLink?: string;
  readonly uid?: string;
}

interface KubernetesObjectBase extends Record<string, any> {
  apiVersion?: string;
  kind?: string;
  metadata: ObjectMeta;
  spec?: {
    [key: string]: any;
  };
  status?: {
    [key: string]: any;
  };
}

interface ListMeta {
  continue?: string;
  remainingItemCount?: number;
  readonly resourceVersion?: string;
  selfLink?: string;
}

interface KubernetesListBase<T> {
  apiVersion?: string;
  items: T[];
  kind?: string;
  metadata?: ListMeta;
}

export type { ObjectMeta, KubernetesObjectBase, ListMeta, KubernetesListBase };
