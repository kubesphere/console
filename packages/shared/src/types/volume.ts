/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { BaseInfo, OriginData } from '../index';

export interface VolumeSnapshotClassDetail extends BaseInfo {
  apiVersion: string;
  driver: any;
  deletionPolicy: string;
  kind: string;
  count: number;
  creationTimestamp?: string;
  deletionTimestamp?: string;
  _originData: OriginData<any>;
}

export interface VolumeSnapshotDetail extends BaseInfo {
  snapshotClassName: string;
  restoreSize: string | number;
  error: Record<string, any>;
  errorMessage: string;
  generating: boolean;
  readyToUse: Record<string, any>;
  backupStatus: 'deleting' | 'success' | 'updating';
  snapshotSourceName: string;
  namespace: string;
  _originData: OriginData<any>;
}

export interface VolumeSnapshotContentDetail extends BaseInfo {
  creationTimestamp?: string;
  deletionTimestamp?: string;
  namespace: string;
  snapshotClassName: string;
  volumeSnapshot?: string;
  annotations: Record<string, any>;
  labels: Record<string, any>;
  deletionPolicy: string;
  driver: string;
  source: Record<string, any>;
  error: any;
  errorMessage: any;
  generating: boolean;
  readyToUse: boolean;
  status: 'ready' | 'unready';
  snapshotHandle: any;
  restoreSize: number;
  _originData: OriginData<any>;
}

export interface StorageClassDetail extends BaseInfo {
  annotations: Record<string, any>;
  default: boolean;
  parameters: Record<string, any>;
  provisioner: string;
  reclaimPolicy: string;
  volumeBindingMode: string;
  allowVolumeExpansion?: Record<string, any>;
  supportSnapshot: boolean;
  associationPVCCount: number;
  _originData: OriginData<any>;
}

export interface VolumeDetail extends BaseInfo {
  deletionTime?: string;
  phase: 'Bound' | 'Lost' | 'Pending' | 'Terminating' | 'Updating' | undefined;
  storageProvisioner?: string;
  status: Record<string, any>;
  conditions: any[];
  namespace?: string;
  labels: Record<string, any>;
  annotations: Record<string, any>;
  accessMode?: string;
  accessModes?: string[];
  storageClassName: string;
  resources: Record<string, any>;
  capacity?: string;
  inUse: boolean;
  type: string;
  _originData: OriginData<any>;
}

export interface PVDetail extends BaseInfo {
  creationTime?: string;
  phase: 'Bound' | 'Lost' | 'Pending' | 'Terminating' | 'Updating' | undefined;
  storageProvisioner?: string;
  status: Record<string, any>;
  annotations: Record<string, any>;
  labels: Record<string, any>;
  accessMode?: string;
  accessModes?: string[];
  storageClassName: string;
  capacity?: string;
  // TODO: not sure this type
  volumeHandle: any;
  inUse: boolean;
  type: string;
  persistentVolumeReclaimPolicy?: string;
  volumeMode: string;
  _originData: OriginData<any>;
}

export interface EditYamlConfig<T> {
  editResource: T | null;
  visible: boolean;
  yaml: string;
  readOnly: boolean;
}
