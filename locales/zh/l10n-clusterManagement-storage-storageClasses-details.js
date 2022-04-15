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
  // More > Edit Authorization Rules
  SET_AUTHORIZATION_RULES: 'Set Authorization Rules',
  AUTHORIZATION_RULES: 'Authorization Rules',
  AUTHORIZATION_RULES_DESC: 'Set authorization rules so that the storage class can be accessed only in specific projects and workspaces.',
  OPERATOR_IN: 'In',
  OPERATOR_NOT_IN: 'Not in',
  // More > Set Volume Permissions
  SET_VOLUME_PERMISSIONS: 'Set Volume Permissions',
  VOLUME_CLONING: 'Volume Cloning',
  VOLUME_CLONING_DESC: 'Allow users to clone volumes.',
  VOLUME_SNAPSHOT_CREATION: 'Volume Snapshot Creation',
  VOLUME_SNAPSHOT_CREATION_DESC: 'Allow users to create volume snapshots.',
  VOLUME_EXPANSION_DESC: 'Allow users to expand volumes. Volumes can only be expanded and cannot be shrunk.',
  SET_VOLUME_PERMISSIONS_TIP: 'The following settings only control whether users are allowed to perform the operations on the web console. Whether volumes created based on the storage class actually support the operations depends on the backend storage system.',
  // More > Set Auto Expansion
  SET_AUTO_EXPANSION: 'Set Auto Expansion',
  AUTO_EXPANSION: 'Auto Expansion',
  AUTO_EXPANSION_DESC: 'Set the system to automatically expand volumes when the remaining volume space is lower than a threshold.',
  AUTO_EXPANSION_SETTINGS: 'Auto Expansion Settings',
  MAXIMUM_SIZE: 'Maximum Size',
  INCREMENT: 'Size Increment',
  INCREMENT_DESC: 'Please set the increment according to the expansion step size of StorageClass-csi, otherwise it may not work.',
  RESTART_WORKLOAD_AUTOMATICALLY: 'Restart workload automatically',
  RESTART_WORKLOAD_AUTOMATICALLY_DESC: 'The system automatically checks volume status to determine whether the workload needs to be restarted.',
  RESTART_WORKLOAD_AUTOMATICALLY_TIP: 'If the volume is not expanded successfully when the timeout period expires, the system will add the "restart.kubesphere.io/skip" annotation to the workload so that the workload is not restarted any more. To enable the automatic restart function for the workload again, you need to manually delete the annotation on the workload.',
  // More > Delete
  // Volumes
  VOLUME_COUNT: '存储卷数量',
}
