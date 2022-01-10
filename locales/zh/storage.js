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
  ACCESS_MODE_RWO: '单个节点读写',
  ACCESS_MODE_ROX: '多节点只读',
  ACCESS_MODE_RWX: '多节点读写',
  'Create Storage Class': '创建存储类型',
  'Create Volume': '创建存储卷',
  CREATE_VOLUME_WITH_SNAPSHOT: '基于快照创建存储卷',
  'Custom Provisioner': '自定义供应者',
  'Default Storage Class': '默认存储类型',
  'Default Volume': '默认存储卷',
  'Delete Volume': '删除存储卷',
  'Disable Volume Snapshot': 'Disable Volume Snapshot',
  'Apply immediately': '立即生效',
  Expand: '扩容',
  'Mount Options': '挂载选项',
  // Volumes List Page
  Parameters: '参数',
  'Parameters (key-value pairs)': '参数 (键值对)',
  PersistentVolumeClaim: '存储卷',
  PersistentVolumes: '持久化存储卷',
  Scalable: '可扩容性',
  'Snapshot Message': 'Snapshot Message',
  'Snapshots Message': 'Snapshot Message',
  'Set as default storage class': 'Set as default storage class',
  'Storage Class': '存储类型',
  'Storage Class Name': '存储类型名称',
  'storage classes': '存储类型',
  STORAGE_CLASS_CREATE_DESC: '存储类型（Storage Class）是由集群管理员配置的多种存储类型，不同的存储类型为集群用户提供不同类型的存储卷。',
  StorageClasses: '存储类型',
  storageclasses: '存储类型',
  PV: '存储卷后端',
  'Bound Volume': '已绑定存储卷',
  'Used Capacity': '已分配存储',
  BACKEND_IDENTIFIER: '后端标识符',
  VOLUMES: '存储卷',
  'The volume name exists': 'The volume name exists',
  'The volume size must be greater than zero': 'The volume size must be greater than zero',
  'Volume Usage': '存储卷用量',
  volumes: '存储卷',
  VolumeSnapshots: '存储卷快照',
  'Storage Classs': '存储类型',
  VOLUMES_BASEINFO_DESC: '存储卷可将数据持久化，生命周期独立于应用负载，创建存储卷前请确保已创建存储类型。',
  VOLUME_SETTINGS_DESC: '按需填写存储卷的容量大小，存储卷大小和访问模式必须与存储类型和存储服务端能力相适应，访问模式通常选择为 RWO。',
  PROVISIONER_DESC: '提供后端存储',
  // Volume Pages
  DELETE_STORAGE_TIP: '如果存储卷正在被挂载时，待工作负载被删除时一同删除。',
  SRORAGE_SETTING_DESC: 'ReadWriteOnce：单个节点读写。<br/>ReadOnlyMany：多节点只读。<br/>ReadWriteMany：多节点读写。<br/>挂载时只能使用一种模式。',
  'STORAGE-CLASSES_BASEINFO_DESC': '存储类型记录管理员所提供的某类存储的配置信息，创建特定类型的存储卷之前必须已配置相应的存储类型。',
  STORAGE_CLASS_SETTING_DESC: '存储类型记录管理员所提供的某类存储的配置信息，创建特定类型的存储卷之前必须已配置相应的存储类型。',
  STORAGECLASSES_BASEINFO_DESC: '存储类型记录管理员所提供的某类存储的配置信息，创建特定类型的存储卷之前必须已配置相应的存储类型。',
  STORAGECLASS_PARAMETER_TIP: 'Please refer to <a href="{link}" target="_blank">Kubernetes docs</a> for details.',
  VOLUME_BASEINFO_TIP: 'The volume is provisioned through dynamic volume provisioning which allows storage volumes to be created on-demand. The volume is used for persisting data, and has explict lifecycle independent of any individual pod that uses it. At lease one StorageClass must be configured by adminstrators before creating a volume.',
  VOLUME_EXPAND_TIPS: '当前存储卷已挂载至工作负载，因此扩容会导致工作负载重启，并产生新的版本。可能业务会短暂的中断。',
  DEPENDENT_STORAGE_CLASS_DELETE_TIPS: '请确认是否有资源依赖该存储类型。若有，请先将依赖的资源关闭，以免影响资源的功能。',
  WHAT_IS_VOLUME_SNAPSHOTS: '什么是存储卷快照'
};