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
  SET_DEFAULT_STORAGE_CLASS_TITLE: '设为默认存储类型',
  SET_AS_DEFAULT_STORAGE_CLASS: '设为默认存储类型',
  STORAGE_CLASS_SET_DEFAULT_DESC: '设置为默认存储类型后，如果没有特殊指定，系统将默认创建该类型的存储卷。一个 KubeSphere 集群中仅允许设置一个默认存储类型。',
  // More > StorageClass Accessor
  STORAGECLASS_ACCESSOR: 'Storageclass Accessor',
  STORAGECLASS_ACCESSOR_SETTING: 'Storageclass Accessor Settings',
  STORAGECLASS_ACCESSOR_DES: 'Users can create accessors to achieve namespace-level management on the storage class which provisions PVC.',
  // More > Volume Management
  VOLUME_MANAGEMENT: '存储卷管理',
  VOLUME_CLONE: '存储卷克隆',
  ALLOW_VOLUME_CLONE_DESC: '允许用户克隆存储卷。',
  ALLOW_VOLUME_SNAPSHOT_DESC: '允许用户创建存储卷快照。',
  'Volume Expansion': '存储卷扩容',
  ALLOW_VOLUME_EXPANSION_DESC:
    '允许用户对存储卷扩容。存储卷容量只能增加，不能减少。',
  VOLUME_FUNCTION_MANAGEMENT_TIP:
    '存储卷管理只控制是否在 KubeSphere Web 控制台启用以下功能。开启前，请联系系统管理员确认存储系统是否支持这些功能。',
  VOLUME_SNAPSHOT: '存储卷快照',
  // More > PVC Autoresizer
  PVC_AUTORESIZER_PL: 'PVC Autoresizer',
  PVC_AUTORESIZER_DESC: 'Pvc-autoresizer resizes PersistentVolumeClaims (PVCs) when the free amount of storage is below the threshold.',
  PVC_AUTORESIZER_SETTINGS: 'Autoresizer Settings',
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
  VOLUME_COUNT: '存储卷数量',
}
