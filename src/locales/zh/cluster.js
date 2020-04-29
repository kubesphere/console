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

export default {
  'Add Cluster': '添加集群',
  'Add New Cluster': '添加新集群',
  'Import Kubernetes Cluster': '导入Kubernetes集群',
  Import: '导入',

  'Cluster Name': '集群名称',
  'Cluster Management': '集群管理',
  'Nodes Management': '节点管理',
  'Node Types': '节点类型',
  'Network Management': '网络管理',
  'Custom Resources': '自定义资源 CRD',
  'Storage Management': '存储管理',
  'Cluster Settings': '集群设置',
  'Snapshots Management': '快照管理',
  'IP Ranges': 'IP 地址范围',
  'Network Policies': '网络策略',
  'Network Topology': '网络拓扑',
  'Cluster Visibility': '集群可见性',
  'Cluster Members': '集群成员',
  'Cluster Roles': '集群角色',
  'Kubernetes Settings': 'Kubernetes 设置',
  'Connect Method': '连接方式',

  'Cluster List': '集群列表',
  'Cluster Info': '集群信息',
  'Kubernetes Status': 'Kubernetes 组件状态',
  Tools: '工具',

  'Edit Visibility': '编辑可见范围',

  'Go back': '返回上一步',

  'Choose a provider': '选择服务商',

  'User Projects': '用户项目',
  'System Projects': '系统项目',

  NO_CLUSTER_TIP: '请添加至少 1 个集群',
  NO_CLUSTER_TIP_DESC:
    '集群是一组运行着 Kubernetes 的节点（物理或者虚拟机）, Kubesphere 的功能也依托于集群中的节点来运行',
  ADD_NEW_CLUSTER_DESC: '添加新的Kubernetes集群',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere提供了在主流服务商中快速部署Kubernetes集群的方案',

  VISIBILITY_PART: '部分可见',
  VISIBILITY_PUBLIC: '公开',

  MULTI_CLUSTER: '多集群',

  IMPORT_CLUSTER_DESC: '导入已有的Kubernetes集群',

  CLUSTER_SETTINGS_DESC: '定义集群配置信息',
  CLUSTER_NAME_DESC:
    '只能包含小写字母、数字及分隔符("-")，且必须以小写字母或数字开头及结尾',
  CLUSTER_TAG: '标识',
  CLUSTER_TAG_DESC: '标识此集群的用途，例如 生产环境、测试环境、演示环境 等',
  CLUSTER_PROVIDER_DESC: '提供集群基础设施的厂商',
  CLUSTER_CONNECT_METHOD_DESC: '可以直接连接集群或者使用代理',

  CONNTECT_DIRECT: '直接连接Kubernetes集群',
  CONNTECT_PROXY: '集群连接代理',
}
