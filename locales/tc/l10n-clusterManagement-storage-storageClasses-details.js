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
  // Details
  TRUE: '是',
  FALSE: '否',
  // More > Set as Default Storage Class
  SET_DEFAULT_STORAGE_CLASS_TITLE: '設為預設儲存類型',
  SET_AS_DEFAULT_STORAGE_CLASS: '設為預設儲存類型',
  STORAGE_CLASS_SET_DEFAULT_DESC: '設置為預設儲存類型後，如果沒有特殊指定，系統將預設創建該類型的儲存卷。一個 KubeSphere 集群中僅允許設置一個預設儲存類型',
  // More > StorageClass Accessor
  STORAGECLASS_ACCESSOR: '儲存類型訪問器',
  STORAGECLASS_ACCESSOR_SETTING: '儲存類型訪問器設置',
  STORAGECLASS_ACCESSOR_DES: 'Users can create accessors to achieve namespace-level management on the storage class which provisions PVC.',
  // More > Volume Management
  VOLUME_MANAGEMENT: '儲存卷管理',
  VOLUME_CLONE: '儲存卷克隆',
  ALLOW_VOLUME_CLONE_DESC: '允許用戶克隆儲存卷。',
  ALLOW_VOLUME_SNAPSHOT_DESC: '允許用戶創建儲存卷快照。',
  'Volume Expansion': '儲存卷擴容',
  ALLOW_VOLUME_EXPANSION_DESC: 'Allows users to extend volumes. Volumes can only be extended and cannot be shrunk.',
  VOLUME_FUNCTION_MANAGEMENT_TIP: 'Volume Management only controls whether the following features are enabled in the KubeSphere web console. Before the features are enabled, contact your system administrator to confirm that they are supported by the storage system.',
  VOLUME_SNAPSHOT: '儲存卷快照',
  // More > PVC Autoresizer
  PVC_AUTORESIZER_PL: 'PVC Autoresizer',
  PVC_AUTORESIZER_DESC: 'Pvc-autoresizer resizes PersistentVolumeClaims (PVCs) when the free amount of storage is below the threshold.',
  PVC_AUTORESIZER_SETTINGS: 'Autoresizer Settings',
  MAX_SIZE: 'Max size',
  THRESHOLD_DESC: 'Storage is increased when the amount of free space of the volume is below threshold.',
  INCREASE: 'Increase',
  INCREASE_DESC: 'The increase value is calculated as the current storage value multiplied by the percentage value, if given as a percentage.',
  AUTOMATIC_RESTART_WORKLOAD: 'Automatic restart workload',
  AUTOMATIC_RESTART_WORKLOAD_DESC: 'The restarter judges the workload that needs to be restarted automatically by checking the status of pvc.',
  AUTOMATIC_RESTART_WORKLOAD_TIP: 'If the automatic restart time of the PVC exceeds the maximum time, the corresponding workload will be annotated with "restart.kubesphere.io/skip". To enable the automatic restart function for the PVC again, delete the above annotation.',
  MAX_TIME: 'Max Time',
  STORAGE_LIMIT: 'Storage Limit',
  // More > Delete
  // Volumes
  VOLUME_COUNT: 'Volumes'
};