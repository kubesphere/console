/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */
module.exports = {
  ACCESS_MODE_RWO: 'Single node read-write',
  ACCESS_MODE_ROX: 'Multi-node read-only',
  ACCESS_MODE_RWX: 'Multi-node read-write',
  'Create Storage Class': 'Create Storage Class',
  'Create Volume': 'Create Volume',
  CREATE_VOLUME_WITH_SNAPSHOT: 'Create volume based on snapshots',
  'Custom Provisioner': 'Custom Provisioner',
  'Default Storage Class': 'Default Storage Class',
  'Default Volume': 'Default Volume',
  'Delete Volume': 'Delete Volume',
  'Disable Volume Snapshot': 'Disable Volume Snapshot',
  'Apply immediately': 'Apply immediately',
  Expand: 'Expand',
  'Mount Options': 'Mount Options',
  // Volumes List Page
  Parameters: 'Parameters',
  'Parameters (key-value pairs)': 'Parameters (key-value pairs)',
  PersistentVolumeClaim: 'Volume',
  PersistentVolumes: 'PersistentVolumes',
  Scalable: 'Scalable',
  'Snapshot Message': 'Snapshot Message',
  'Snapshots Message': 'Snapshot Message',
  'Set as default storage class': 'Set as default storage class',
  'Storage Class': 'Storage Class',
  'Storage Class Name': 'Storage Class Name',
  'storage classes': 'storage classes',
  STORAGE_CLASS_CREATE_DESC: 'The Storage Class is configured by the cluster administrator to configure storage server parameters and provide storage for cluster users by class.',
  StorageClasses: 'StorageClasses',
  storageclasses: 'storageclasses',
  PV: 'Volume Backend',
  'Bound Volume': 'Storage volume bound',
  'Used Capacity': 'Used Capacity',
  BACKEND_IDENTIFIER: 'Backend Identifier',
  VOLUMES: 'Volume',
  'The volume name exists': 'The volume name exists',
  'The volume size must be greater than zero': 'The volume size must be greater than zero',
  'Volume Usage': 'Volume Usage',
  volumes: 'volumes',
  VolumeSnapshots: 'Volume Snapshots',
  'Storage Classs': 'Storage Classes',
  VOLUMES_BASEINFO_DESC: 'The volume can persist data, and its lifecycle is independent of the workload. Make sure the storage class is created before you create a volume.',
  VOLUME_SETTINGS_DESC: 'Fill in the capacity of the volume as needed, and the volume size and access mode must be compatible with the storage class and storage server capabilities. The access mode is usually selected as RWO.',
  PROVISIONER_DESC: 'Provide backend storage',
  // Volume Pages
  DELETE_STORAGE_TIP: 'If the storage volume is being mounted, delete it when the workload is deleted.',
  SRORAGE_SETTING_DESC: 'ReadWriteOnce: Single node read and write.<br/>ReadOnlyMany: Multi-node read-only.<br/>ReadWriteMany: Multi-node read and write.<br/>Only one mode can be used when mounting.',
  'STORAGE-CLASSES_BASEINFO_DESC': 'The storage type records the configuration information of a certain type of storage provided by the administrator. Before creating a specific type of storage volume, the corresponding storage type must be configured.',
  STORAGE_CLASS_SETTING_DESC: 'The storage type records the configuration information of a certain type of storage provided by the administrator. Before creating a specific type of storage volume, the corresponding storage type must be configured.',
  STORAGECLASSES_BASEINFO_DESC: 'A StorageClass provides a way for administrators to configure the "classes" of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators. You need to create a StorageClass before users can create volume (i.e., PVC) based on the StorageClass.',
  STORAGECLASS_PARAMETER_TIP: 'Please refer to <a href="{link}" target="_blank">Kubernetes docs</a> for details.',
  VOLUME_BASEINFO_TIP: 'The volume is provisioned through dynamic volume provisioning which allows storage volumes to be created on-demand. The volume is used for persisting data, and has explict lifecycle independent of any individual pod that uses it. At lease one StorageClass must be configured by adminstrators before creating a volume.',
  VOLUME_EXPAND_TIPS: 'The current PVC has been mounted to the work load, so the expansion will lead to the workload restart, and a new version. Business may be a brief interruption. ',
  DEPENDENT_STORAGE_CLASS_DELETE_TIPS: 'Make sure if there are resources dependent on the storage class. If there are, you need to disable the resources before the resource functions are affected.',
  WHAT_IS_VOLUME_SNAPSHOTS: 'What are volume snapshots?'
};