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
  // Banner
  // List
  STATEFULSET_EMPTY_DESC: '请创建一个有状态副本集。',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  // List > Create > Pod Settings
  POD_SETTINGS: '容器组设置',
  POD_REPLICAS: '容器组副本数量',
  ONDELETE: '删除容器组时更新',
  ONDELETE_DESC: '需要手动删除容器组副本才能对其进行更新。',
  PARTITION_ORDINAL: '容器组副本分组序号',
  PARTITION_ORDINAL_DESC: '设置一个分组序号以将容器组副本分成两组。更新有状态副本集时，只有序号大于或等于分组序号的容器组副本会被更新。',
  // List > Create > Storage Settings
  PVC_NAME_PREFIX: 'PVC 名称前缀',
  PVC_NAME_PREFIX_DESC: '持久卷声明名称的前缀。前缀只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。',
  PVC_NAME_PREFIX_EMPTY: '请输入持久卷声明名称的前缀。',
  INVALID_PVC_NAME_PREFIX: '前缀无效。前缀只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。',
  PVC_NAME_PREFIX_EXISTS: 'The prefix already exists. Please enter another prefix.',
  ADD_PERSISTENT_VOLUME_CLAIM_TEMPLATE: 'Add Persistent Volume Claim Template',
  ADD_PERSISTENT_VOLUME_CLAIM_TEMPLATE_DESC: 'Add a persistent volume claim template to mount a persistent volume to each pod of the statefulset.',
  VOLUME_CAPACITY_TCAP: '存储卷容量',
  MOUNT_PATH_TCAP: 'Mount Path',
  VOLUME_TEMPLATES: '存储卷模板',
  // List > Create > Advanced Settings
  // List > Create > Cluster Differences
  SERVICE_PORT: '服务端口',
  SERVICE_PORT_VALUE: '服务端口：{value}',
  // List > Create > Cluster Differences (Displayed after you add a volume template)
  VOLUME_TEMPLATE_SETTINGS: '存储卷模板设置',
  CLUSTER_VOLUME_DIFF_DESC: '在不同的集群中使用不同的存储设置。'
};