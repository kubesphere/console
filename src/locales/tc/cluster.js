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
  'Import Kubernetes Cluster': '導入Kubernetes集群',
  Import: '導入',

  Validating: '校驗中',
  'Validation failed': '校驗失敗',

  'Cluster Name': '集群名稱',
  'Cluster Management': '集群管理',
  'Nodes Management': '節點管理',
  'Node Types': '節點類型',
  'Network Management': '網路管理',
  'Custom Resources': '自定義資源 CRD',
  'Storage Management': '儲存管理',
  'Cluster Settings': '集群設置',
  Snapshots: '儲存卷快照',
  'IP Ranges': 'IP 地址範圍',
  'Network Policies': '網路策略',
  'Network Topology': '網路拓撲',
  'Cluster Visibility': '集群能見度',
  'Cluster Members': '集群成員',
  'Cluster Roles': '集群角色',
  'Kubernetes Settings': 'Kubernetes 設置',
  'Connection Method': '連接方式',

  'Kubernetes Version': 'Kubernetes 版本',

  'Edit Cluster Info': '編輯集群資訊',

  'Cluster List': '集群列表',
  'Cluster Info': '集群資訊',
  'Kubernetes Status': 'Kubernetes 組件狀態',
  Tools: '工具',

  'Edit Visibility': '編輯可見範圍',

  'Go back': '返回上一步',

  'Choose a provider': '選擇服務商',

  'User Projects': '用戶項目',
  'System Projects': '系統項目',

  'Waiting for the cluster to join': '等待集群加入',

  'Click to Copy': '點擊複製',

  'Cluster initialization failed': '集群初始化失敗',

  'Not Ready': '未就緒',

  'Copy successfully': '複製成功',

  Unbind: '解除綁定',

  'Unbind Cluster': '解綁集群',

  'Cluster Member': '集群成員',

  Authorized: '已授權',
  Unauthorized: '待授權',

  'Authorize the cluster to workspace': '集群授權企業空間',
  'Set as public cluster': '設置為公開集群',

  'The current cluster is public': '目前集群處於公開狀態',

  'Available Clusters': '可用集群',
  'Select Clusters': '集群選擇',
  'Edit cluster basic information': '編輯集群基礎資訊',

  'Scheduler Scheduling Times': '排程器調度次數',
  'Scheduling Failed Pods': '調度失敗的容器組',

  'Please select or input a tag': '請選擇或輸入標籤',
  'Please select or input a provider': '請選擇或輸入服務商',
  'Please input the kubesphere api server address of the cluster':
    '請輸入待加入集群的 Kubesphere API Server 地址',

  'All Projects': '全部項目',

  'Enter the project': '進入項目',

  NO_CLUSTER_TIP: '請添加至少 1 個集群',
  NO_CLUSTER_TIP_DESC:
    '集群是一組運行著 Kubernetes 的節點（物理或者虛擬機）, Kubesphere 的功能也依靠於集群中的節點來運行',
  ADD_NEW_CLUSTER_DESC: '添加新的Kubernetes集群',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere提供了在主流服務商中快速部署Kubernetes集群的方案',

  VISIBILITY_PART: '部分可見',
  VISIBILITY_PUBLIC: '公開',

  MULTI_CLUSTER: '多集群',

  IMPORT_CLUSTER_DESC: '導入已有的Kubernetes集群',

  CLUSTER_SETTINGS_DESC: '定義集群配置資訊',
  CLUSTER_TAG: '標籤',
  CLUSTER_TAG_DESC: '標籤此集群的用途，例如 生產環境、測試環境、示範環境 等',
  CLUSTER_PROVIDER_DESC: '提供集群基礎設施的廠商',
  CLUSTER_CONNECT_METHOD_DESC: '可以直接連接集群或者使用代理',

  CONNTECT_DIRECT: '直接連接Kubernetes集群',
  CONNTECT_PROXY: '集群連接代理',

  CLUSTER_WAITING_JOIN_DESC:
    '暫時没有可用的節點，集群為不可以用狀態，您可以添加以下配置文件以啟用該集群',

  CLUSTER_AGENT_TIP_1:
    '請在通過SSH在目標集群中創建一個名稱為 agent.yaml 的文件',
  CLUSTER_AGENT_TIP_1_DESC: '例如 <span class="code">vi agent.yaml</span>',
  CLUSTER_AGENT_TIP_2: '複製以下配置文件至 agent.yaml 中',
  CLUSTER_AGENT_TIP_2_DESC: '該代理文件可以將目標集群與平台進行連接',
  CLUSTER_AGENT_TIP_3:
    '通過命令行執行 <span class="code">kubectl create -f agent.yaml</span>',
  CLUSTER_AGENT_TIP_3_DESC: '執行命令之後等待集群狀態的更新',

  CLUSTER_CONDITIONS: '集群狀態',
  CLUSTER_BASE_INFO_DESC: '目前集群基礎資訊總覽',

  UNBIND_CLUSTER_DESC:
    '解綁集群後，KubeSphere將無法再對該集群進行管理。 解綁後，該集群内的Kubernetes資源不會被刪除。',
  SURE_TO_UNBIND_CLUSTER: '我確定要執行解綁集群的操作',

  'Invite members to the cluster': '邀請成員到該集群',
  INVITE_CLUSTER_MEMBER_DESC: '您可以邀請新的成員來此集群',

  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC:
    '集群授權可以將集群通過授權的形式指定给企業空間使用該集群',

  PUBLIC_CLUSTER_DESC:
    '公開狀態的集群意味著平台内的用戶都可以使用該集群，並在集群中創建和調度資源',

  CLUSTER_AUTHORIZATION_DESC:
    '集群授權可以將集群通過授權的形式指定給企業空間使用該集群',

  CLUSTER_VISIBILITY_Q1: '如何將集群授權給指定的企業空間使用？',
  CLUSTER_VISIBILITY_A1:
    '集群可以通過“編輯可見範圍”將集群授權給不同的企業空間使用',
  CLUSTER_VISIBILITY_Q2: '什麼是公開集群?',
  CLUSTER_VISIBILITY_A2:
    '公開狀態的集群意味著平台内的用戶都可以使用該集群，並在集群中創建和調度資源',

  SELECT_CLUSTERS_DESC: '選擇企業空間下可用的集群',

  CLUSTER_API_SERVER_TITLE: '待加入集群的 Kubesphere API Server',
  CLUSTER_API_SERVER_DESC: '需要添加待加入集群的 KubeSphere API Server 地址',

  INPUT_KUBECONFIG: '請填寫目標集群的 KubeConfig',

  CLUSTER_DIRECT_IMPORT_TIP:
    'KubeSphere 多集群控制平面通過提供的 kubeconfig 來直接連接導入集群，此種方式要求目前集群能夠通過 kubeconfig 中的 server 地址直接訪問待導入集群. </br>通常適用於:</br>1. 目前集群和待導入集群在同一内網網路中</br>2. 目前集群和待導入集群已通過vpn或穿隧協定等其它技術連通所在網路</br>3. kubeconfig 的 server 地址可以通過公網訪問',
  CLUSTER_AGENT_IMPORT_TIP:
    'KubeSphere 控制平面通過代理方式連接待導入集群，控制平面啟動一個公開的代理服務，待導入集群創建相應的客戶端組件連接代理服務，與控制平面之間建立一个反向代理。此種方式不需要待導入集群和控制平面在同一網路，也不要求待導入集群暴露集群的 apiserver 地址，但會有一定的網路性能損耗</br></br>通常適用於:</br>1. 目前集群和待導入集群不在同一網路中<br/>2. 目前集群和待導入集群無法通過vpn或穿隧協定等其它技術連通所在網路<br/>3. 對集群間網路性能損耗能容忍',

  HOW_TO_GET_KUBECONFIG: '如何獲取KubeConfig?',

  CLUSTER_AGENT_TITLE: '請根據集群中提供的代理連接設置加入集群',
  CLUSTER_AGENT_DESC: '需要在集群中設置下相應的代理Agent',

  SELECT_HOST_CLUSTER_WARNING:
    '請盡量不要在 Host 集群上創建資源，以免 Host 集群負載過高，導致多集群穩定性下降。',
  HOST_CLUSTER_VISIBILITY_WARNING:
    '請謹慎將 Host 集群授權给企業空間，Host 集群負載過高會導致多集群穩定性下降。',
  CLUSTER_VISIBILITY_REMOVE_WARNING:
    '移除對企業空間的授權，將刪除該企業空間在當前擴展下的所有資源。',
  REMOVE_WORKSPACE_CONFIRM_TITLE: '確定移除授權？',
  REMOVE_WORKSPACE_CONFIRM_DESC:
    '確定移除對企業空間 {resource} 的授權？移除集群對企業空間的授權，將刪除該企業空間在目前集群下的所有資源！',
}
