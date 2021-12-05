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
  'Authorize the cluster to workspace': '集群授權企業空間',
  'Choose a provider': '選擇服務商',
  'Click to Copy': '點擊複製',
  'Cluster initialization failed': '集群初始化失敗',
  'Cluster List': '集群列表',
  'Cluster Management': '集群管理',
  'Cluster Member': '集群成員',
  'Cluster Members': '集群成員',
  'Cluster Roles': '集群角色',
  'Connection Method': '連接方式',
  'Copy successfully': '複製成功',
  'Custom Resources': '自定義資源 CRD',
  'Enter the project': '進入項目',
  'Go back': '返回上一步',
  'Host Cluster': '主集群',
  'Host Clusters': '主集群',
  Import: '導入',
  'Import Kubernetes Cluster': '導入Kubernetes集群',
  'Invite members to the cluster': '邀請成員到該集群',
  'Kubernetes Settings': 'Kubernetes 設置',
  'Member Cluster': '成員集群',
  'Member Clusters': '成員集群',
  'Network Management': '網路管理',
  'Network Policies': '網路策略',
  'Network Topology': '網路拓撲',
  'Node Types': '節點類型',
  'Nodes Management': '節點管理',
  'Not Ready': '未就緒',
  'Please input cluster name': 'Please enter a cluster name.',
  'Please input the kubesphere api server address of the cluster': '請輸入待加入集群的 Kubesphere API Server 地址',
  'Please select or input a provider': '請選擇或輸入服務商',
  'Please select or input a tag': '請選擇或輸入標籤',
  SELECT_CLUSTERS: '集群選擇',
  'The current cluster is public': '目前集群處於公開狀態',
  Tools: '工具',
  Unauthorized: '待授權',
  Validating: '校驗中',
  'Validation failed': '校驗失敗',
  'How to Add': '添加方式',
  'New Cluster': '新建集群',
  'Import Cluster': '導入集群',
  'Cluster Basic Info': '集群基本信息',
  'Node Settings': '節點設置',
  'Please add at least one cluster node': '請至少添加一個集群節點',
  'Add node to the cluster': '添加節點到集群中',
  'Kubernetes Cluster Settings': 'Kubernetes 集群配置',
  'Network Plugin': '網路外掛',
  'Max Pods': '節點最大容器组數量',
  'Pods CIDR': '容器組 CIDR',
  'Service CIDR': '服務 CIDR',
  'Default Storage Plugin': '預設儲存外掛',
  'Private Registry Configuration': '私有倉庫配置',
  'etcd Backup': 'etcd 備份',
  'etcd Backup Dir': 'etcd 備份地址',
  'etcd Backup Period': 'etcd 備份地址',
  'Keep Backup Number': '保留的備份數量',
  'KubeSphere Settings': 'KubeSphere 設置',
  NO_CLUSTER_TIP_DESC: '集群是一組運行著 Kubernetes 的節點（物理或者虛擬機）, Kubesphere 的功能也依靠於集群中的節點來運行',
  ADD_NEW_CLUSTER_DESC: '添加新的 Kubernetes 集群',
  CHOOSE_PROVIDER_DESC: 'KubeSphere 提供了在主流服務商中快速部署 Kubernetes 集群的方案',
  MULTI_CLUSTER: '多集群',
  CLUSTER_INFO_TCAP: 'Cluster Information',
  INVITE_CLUSTER_MEMBER_DESC: '您可以邀請新的成員來此集群',
  CLUSTER_API_SERVER_TITLE: '待加入集群的 Kubesphere API Server',
  CLUSTER_API_SERVER_DESC: '需要添加待加入集群的 KubeSphere API Server 地址',
  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC: '集群授權可以將集群通過授權的形式指定给企業空間使用該集群',
  PUBLIC_CLUSTER_DESC: '公開狀態的集群意味著平台内的用戶都可以使用該集群，並在集群中創建和調度資源',
  CLUSTER_AUTHORIZATION_DESC: '集群授權可以將集群通過授權的形式指定給企業空間使用該集群',
  REMOVE_WORKSPACE_CONFIRM_DESC: 'Enter the name of the workspace(s) <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  K8S_NETWORK_PLUGIN_CALICO: 'Calico 是一個純三層的網路方案，無縫集成 IaaS 雲架構，能夠提供的 VM、容器、實體機之間的 IP 通信',
  K8S_NETWORK_PLUGIN_FLANNEL: 'Flannel 可以讓集群中的不同節點主機創建的 Docker 容器都具有全集群唯一的虛擬 IP 地址',
  K8S_NETWORK_PLUGIN_CILIUM: '基於 eBPF 的網路，具有安全性和可觀察性',
  INIT_NODES: '初始化節點',
  PULL_IMAGES: '拉取鏡像',
  INIT_ETCD_CLUSTER: '初始化 etcd 集群',
  INIT_CONTROL_PLANE: '初始化控制平面',
  JOIN_NODES: '添加節點',
  INSTALL_ADDONS: '安裝插件',
  // Unbind Cluster
  // Cluster Visibility
  AUDITING: 'Auditing'
};