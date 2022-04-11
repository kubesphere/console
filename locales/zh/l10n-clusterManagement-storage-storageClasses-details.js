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
  STORAGE_CLASS_SET_DEFAULT_DESC:
    '设置为默认存储类型后，如果没有特殊指定，系统将默认创建该类型的存储卷。一个 KubeSphere 集群中仅允许设置一个默认存储类型。',
  // More > StorageClass Accessor
  STORAGECLASS_ACCESSOR: '存储类型访问器',
  STORAGECLASS_ACCESSOR_SETTING: '存储类型访问器设置',
  STORAGECLASS_ACCESSOR_DES:
    '用户可以创建访问器来实现对提供PVC的存储类的命名空间级管理。',
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
  PVC_AUTORESIZER_PL: 'PVC 调节器',
  PVC_AUTORESIZER_DESC:
    'Pvc-autoresizer 在自由存储量低于阈值时调整 PersistentVolumeClaims(PVC) 的大小。',
  PVC_AUTORESIZER_SETTINGS: 'PVC 调节器设置',
  THRESHOLD_DESC: '当存储卷的自由空间量低于阈值时，存储量会增加。',
  INCREASE: 'Increase',
  INCREASE_DESC:
    '增加值的计算方法是当前存储值乘以百分比值，如果以百分比形式给出的话。',
  AUTOMATIC_RESTART_WORKLOAD: '自动重启工作负载',
  AUTOMATIC_RESTART_WORKLOAD_DESC:
    'Restarter 通过检查 PVC 的状态来判断需要自动重启的工作负载。',
  AUTOMATIC_RESTART_WORKLOAD_TIP:
    '如果PVC自动重启时间超过最大时间，对应的工作负载将会加上"restart.kubesphere.io/skip"注解，如需再次为PVC开启自动重启功能，删除上述注解即可。',
  MAX_TIME: 'Max Time',
  STORAGE_LIMIT: 'Storage Limit',

  // More > Delete
  // Volumes
  VOLUME_COUNT: '存储卷数量',
}
