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
  'Add New Cluster': '添加新集群',
  'Authorize the cluster to workspace': '集群授权企业空间',
  'Choose a provider': '选择服务商',
  'Click to Copy': '点击复制',
  'Cluster initialization failed': '集群初始化失败',
  'Cluster List': '集群列表',
  'Cluster Management': '集群管理',
  'Cluster Member': '集群成员',
  'Cluster Members': '集群成员',
  'Cluster Roles': '集群角色',
  'Connection Method': '连接方式',
  'Copy successfully': '复制成功',
  'Custom Resources': '自定义资源 CRD',
  'Enter the project': '进入项目',
  'Go back': '返回上一步',
  'Host Cluster': '主集群',
  'Host Clusters': '主集群',
  Import: '导入',
  'Import Kubernetes Cluster': '导入 Kubernetes 集群',
  'Invite members to the cluster': '邀请成员到该集群',
  'Kubernetes Settings': 'Kubernetes 设置',
  'Member Cluster': '成员集群',
  'Member Clusters': '成员集群',
  'Network Management': '网络管理',
  'Network Policies': '网络策略',
  'Network Topology': '网络拓扑',
  'Node Types': '节点类型',
  'Nodes Management': '节点管理',
  'Not Ready': '未就绪',
  'Please input cluster name': '请输入集群名称',
  'Please input the kubesphere api server address of the cluster': '请输入待加入集群的 Kubesphere API Server 地址',
  'Please select or input a provider': '请选择或输入服务商',
  'Please select or input a tag': '请选择或输入标识',
  SELECT_CLUSTERS: '选择集群',
  'The current cluster is public': '当前集群处于公开状态',
  Tools: '工具',
  Unauthorized: '待授权',
  Validating: '校验中',
  'Validation failed': '校验失败',
  'How to Add': '添加方式',
  'New Cluster': '新建集群',
  'Import Cluster': '导入集群',
  'Cluster Basic Info': '集群基本信息',
  'Node Settings': '节点设置',
  'Please add at least one cluster node': '请至少添加一个集群节点',
  'Add node to the cluster': '添加节点到集群中',
  'Kubernetes Cluster Settings': 'Kubernetes 集群配置',
  'Network Plugin': '网络插件',
  'Max Pods': '节点最大容器组数量',
  'Pods CIDR': '容器组 CIDR',
  'Service CIDR': '服务 CIDR',
  'Default Storage Plugin': '默认存储插件',
  'Private Registry Configuration': '私有仓库配置',
  'etcd Backup': 'etcd 备份',
  'etcd Backup Dir': 'etcd 备份地址',
  'etcd Backup Period': 'etcd 备份地址',
  'Keep Backup Number': '保留的备份数',
  'KubeSphere Settings': 'KubeSphere 设置',
  NO_CLUSTER_TIP_DESC: '集群是一组运行着 Kubernetes 的节点 (物理或者虚拟机)，Kubesphere 的功能也依托于集群中的节点来运行',
  ADD_NEW_CLUSTER_DESC: '添加新的 Kubernetes 集群',
  CHOOSE_PROVIDER_DESC: 'KubeSphere 提供了在主流服务商中快速部署 Kubernetes 集群的方案',
  MULTI_CLUSTER: '多集群',
  CLUSTER_INFO_TCAP: '集群信息',
  INVITE_CLUSTER_MEMBER_DESC: '您可以邀请新的成员来此集群',
  CLUSTER_API_SERVER_TITLE: '待加入集群的 Kubesphere API Server',
  CLUSTER_API_SERVER_DESC: '需要添加待加入集群的 KubeSphere API Server 地址',
  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC: '集群授权可以将集群通过授权的形式指定给企业空间使用该集群',
  PUBLIC_CLUSTER_DESC: '公开状态的集群意味着平台内的用户都可以使用该集群，并在集群中创建和调度资源',
  CLUSTER_AUTHORIZATION_DESC: '集群授权可以将集群通过授权的形式指定给企业空间使用该集群',
  REMOVE_WORKSPACE_CONFIRM_DESC: '请输入企业空间名称 <strong>{resource}</strong> 确保您已了解操作所带来的风险。',
  K8S_NETWORK_PLUGIN_CALICO: 'Calico 是一个纯3层的网络方案，无缝集成 IaaS 云架构，能够提供的 VM、容器、裸机之间的IP通信',
  K8S_NETWORK_PLUGIN_FLANNEL: 'Flannel 可以让集群中的不同节点主机创建的 Docker 容器都具有全集群唯一的虚拟IP地址',
  K8S_NETWORK_PLUGIN_CILIUM: '基于 eBPF 的网络，具有安全性和可观察性',
  INIT_NODES: '初始化节点',
  PULL_IMAGES: '拉取镜像',
  INIT_ETCD_CLUSTER: '初始化 etcd 集群',
  INIT_CONTROL_PLANE: '初始化控制平面',
  JOIN_NODES: '添加节点',
  INSTALL_ADDONS: '安装插件',
  // Unbind Cluster
  // Cluster Visibility
  AUDITING: '审计'
};