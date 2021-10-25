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
  ADD_CLUSTER: '添加集群',
  'Add New Cluster': '添加新集群',
  'Import Kubernetes Cluster': '導入Kubernetes集群',
  Import: '導入',

  Validating: '校驗中',
  'Validation failed': '校驗失敗',

  CLUSTER_NAME: '集群名稱',
  'Cluster Management': '集群管理',
  'Nodes Management': '節點管理',
  'Node Types': '節點類型',
  'Network Management': '網路管理',
  'Custom Resources': '自定義資源 CRD',
  STORAGE: '儲存管理',
  CLUSTER_SETTINGS: '集群設置',
  'Network Policies': '網路策略',
  'Network Topology': '網路拓撲',
  CLUSTER_VISIBILITY_SCAP: '集群能見度',
  CLUSTER_VISIBILITY_TCAP: '集群能見度',
  'Cluster Members': '集群成員',
  'Cluster Roles': '集群角色',
  'Kubernetes Settings': 'Kubernetes 設置',
  'Connection Method': '連接方式',

  KUBERNETES_VERSION: 'Kubernetes 版本',
  KUBESPHERE_VERSION: 'KubeSphere 版本',

  'Cluster List': '集群列表',
  CLUSTER_INFORMATION: '集群資訊',
  KUBERNETES_STATUS: 'Kubernetes 組件狀態',
  Tools: '工具',

  EDIT_VISIBILITY: '編輯可見範圍',

  'Go back': '返回上一步',

  'Choose a provider': '選擇服務商',

  USER_PROJECTS: '用戶項目',
  SYSTEM_PROJECTS: '系統項目',

  WAIT_FOR_CLUSTER: '等待集群加入...',

  'Click to Copy': '點擊複製',

  'Cluster initialization failed': '集群初始化失敗',

  'Not Ready': '未就緒',

  'Copy successfully': '複製成功',

  UNBIND: '解綁',

  UNBIND_CLUSTER: '解綁集群',

  'Cluster Member': '集群成員',

  AUTHORIZED: '已授權',
  Unauthorized: '待授權',

  'Authorize the cluster to workspace': '集群授權企業空間',
  SET_PUBLIC_CLUSTER: '設置為公開集群',

  'The current cluster is public': '目前集群處於公開狀態',

  AVAILABLE_CLUSTERS: '可用集群',
  SELECT_CLUSTERS: '集群選擇',
  EDIT_CLUSTER_INFO_DESC: '編輯集群基礎資訊',

  SCHEDULING_OPERATIONS: '排程器調度次數',
  SCHEDULING_OPERATION: '排程器調度次數',
  SCHEDULING_FAILURES: '調度失敗的容器組',
  SCHEDULING_FAILURE: '調度失敗的容器組',

  'Please select or input a tag': '請選擇或輸入標籤',
  'Please select or input a provider': '請選擇或輸入服務商',
  'Please input the kubesphere api server address of the cluster':
    '請輸入待加入集群的 Kubesphere API Server 地址',

  ALL_PROJECTS: '全部項目',

  'Enter the project': '進入項目',

  'How to Add': '添加方式',

  'New Cluster': '新建集群',

  'Import Cluster': '導入集群',

  'Cluster Basic Info': '集群基本信息',

  'Node Settings': '節點設置',

  'Please add at least one cluster node': '請至少添加一個集群節點',
  NODE_ROLE_EMPTY_DESC: '請指定節點的角色',

  'Add node to the cluster': '添加節點到集群中',

  INTERNAL_IP_ADDRESS: '節點內網 IP 地址',
  PORT: '端口',
  PORT_VALUE: '端口：{value}',
  EXTERNAL_IP: '外網 IP 地址',
  USERNAME_AND_PASSWORD: '用戶名和密碼',
  SSH_KEY_TCAP: 'SSH 密鑰',
  SSH_KEY_SCAP: 'SSH 密鑰',
  SSH_AUTH_MODE: 'SSH 認證方式',
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

  INVALID_IP_DESC: 'IP 地址格式錯誤。',

  CLUSTER_CREATION_PROGRESS: '集群創建進度',

  CURRENT_STEP: '當前進度：{step}',

  'Log Info': '紀錄資訊',
  CLUSTER_BASIC_INFO: 'Basic information',

  NO_CLUSTER_TIP: '請添加至少 1 個集群',
  NO_CLUSTER_TIP_DESC:
    '集群是一組運行著 Kubernetes 的節點（物理或者虛擬機）, Kubesphere 的功能也依靠於集群中的節點來運行',
  ADD_NEW_CLUSTER_DESC: '添加新的 Kubernetes 集群',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere 提供了在主流服務商中快速部署 Kubernetes 集群的方案',

  VISIBILITY_PARTIAL: '部分可見',
  VISIBILITY_PUBLIC: '公開',

  MULTI_CLUSTER: '多集群',

  CLUSTER_SETTINGS_DESC: '定義集群配置資訊',
  TAG: '標籤',
  CLUSTER_TAG_DESC: 'Select a tag to identify the purpose of the cluster.',
  CLUSTER_PROVIDER_DESC: 'Select the provider of the cluster infrastructure.',
  CLUSTER_CONNECT_METHOD_DESC: '可以直接連接集群或者使用代理',

  CONNTECT_DIRECT: '直接連接Kubernetes集群',
  CONNTECT_PROXY: '集群連接代理',

  WAIT_FOR_CLUSTER_DESC:
    '暫時沒有可用的節點，集群為不可以用狀態，您可以添加以下配置文件以啟用該集群',

  CLUSTER_AGENT_TIP_1:
    '1. 請在通過 SSH 在目標集群中創建一個名稱為 agent.yaml 的文件',
  CLUSTER_AGENT_TIP_2: '2. 複製以下配置文件至 agent.yaml 中',
  CLUSTER_AGENT_TIP_3:
    '3. 通過命令行執行 <span class="code">kubectl create -f agent.yaml</span>',
  CLUSTER_AGENT_TIP_3_DESC: '執行命令之後等待集群狀態的更新',

  CLUSTER_CONDITIONS: '集群狀態',
  CLUSTER_BASE_INFO_DESC:
    'Basic information provides an overview of the cluster. You can view and edit cluster information.',
  CLUSTER_INFO_TCAP: 'Cluster Information',

  UNBIND_CLUSTER_DESC:
    '解綁集群後，KubeSphere 將無法再對該集群進行管理。 解綁後，該集群内的 Kubernetes 資源不會被刪除。',
  SURE_TO_UNBIND_CLUSTER: 'I understand the risks of this operation.',

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
    'You can assign a cluster to specific workspaces by clicking Edit Visibility.',
  CLUSTER_VISIBILITY_Q2: '什麼是公開集群?',
  CLUSTER_VISIBILITY_A2:
    '公開狀態的集群意味著平台内的用戶都可以使用該集群，並在集群中創建和調度資源',

  SELECT_CLUSTERS_DESC: '選擇企業空間下可用的集群',

  CLUSTER_API_SERVER_TITLE: '待加入集群的 Kubesphere API Server',
  CLUSTER_API_SERVER_DESC: '需要添加待加入集群的 KubeSphere API Server 地址',

  INPUT_KUBECONFIG: '請填寫目標集群的 kubeConfig',

  CLUSTER_DIRECT_IMPORT_TIP:
    'KubeSphere 多集群控制平面通過提供的 kubeconfig 來直接連接導入集群，此種方式要求目前集群能夠通過 kubeconfig 中的 server 地址直接訪問待導入集群. </br>通常適用於:</br>1. 目前集群和待導入集群在同一内網網路中</br>2. 目前集群和待導入集群已通過vpn或穿隧協定等其它技術連通所在網路</br>3. kubeconfig 的 server 地址可以通過公網訪問',
  CLUSTER_AGENT_IMPORT_TIP:
    'KubeSphere 控制平面通過代理方式連接待導入集群，控制平面啟動一個公開的代理服務，待導入集群創建相應的客戶端組件連接代理服務，與控制平面之間建立一個反向代理。此種方式不需要待導入集群和控制平面在同一網路，也不要求待導入集群暴露集群的 ApiServer 地址，但會有一定的網路性能損耗</br></br>通常適用於:</br>1. 目前集群和待導入集群不在同一網路中<br/>2. 目前集群和待導入集群無法通過vpn或穿隧協定等其它技術連通所在網路<br/>3. 對集群間網路性能損耗能容忍',

  HOW_TO_GET_KUBECONFIG: '如何獲取 kubeconfig ？',

  CLUSTER_AGENT_TITLE: '請根據集群中提供的代理連接設置加入集群',
  CLUSTER_AGENT_DESC: '需要在集群中設置下相應的代理 Agent',

  SELECT_HOST_CLUSTER_WARNING:
    'The visibility of the multi-cluster environment will decrease if the host cluster is overloaded. It is not recommended to create resources on the host cluster.',
  HOST_CLUSTER_VISIBILITY_WARNING:
    '請謹慎將主集群授權给企業空間，主集群負載過高會導致多集群穩定性下降。',
  CLUSTER_VISIBILITY_REMOVE_WARNING:
    'After the authorization for a workspace to use the cluster is removed, all resources of the workspace on the cluster will be deleted.',
  REMOVE_WORKSPACE_CONFIRM_TITLE: 'Remove Authorization',
  REMOVE_WORKSPACE_CONFIRM_DESC:
    'Enter the name of the workspace(s) <strong>{resource}</strong> to confirm that you understand the risks of this operation.',

  'Host Cluster': '主集群',
  HOST_CLUSTER: '主集群',
  'Host Clusters': '主集群',
  'Member Cluster': '成員集群',
  'Member Clusters': '成員集群',

  SELECT_ADD_CLUSTER_METHOD: '選擇添加集群的方式',
  SELECT_ADD_CLUSTER_METHOD_DESC: '支持添加新集群和導入已存在集群',

  NEW_CLUSTER_DESC: '添加新的 Kubernetes 集群',
  IMPORT_CLUSTER_DESC: '導入已有的 Kubernetes 集群',
  CLUSTER_NODE_SETTINGS_DESC: '添加集群需要的節點',
  NODE_INTERNAL_IP_DESC: '集群内各節點間可以互相訪問的內網 IP 地址',
  EDGENODE_INTERNAL_IP_DESC: '集群内各節點間可以互相訪問的內網 IP 地址',
  NODE_INTERNAL_IP_EMPTY_DESC: '请输入节点在私网内的 IP 地址。',
  EDGENODE_INTERNAL_IP_EMPTY_DESC: '请输入节点在私网内的 IP 地址。',
  NODE_ROLE_DESC:
    '集群角色中，master 節點數量需要為 1 或 3，woker 節點數量至少為 1',
  NODE_EXTERNAL_IP_DESC: '請填入當前主集群可以訪問到的 IP 地址',
  NODE_EXTERNAL_IP_EMPTY_DESC: '請填入當前主集群可以訪問到的 IP 地址',
  SSH_AUTH_MODE_DESC: '支持用戶名密碼以及 SSH 密鑰',
  NODE_USERNAME_DESC: '預設以 root 用戶登入',
  NODE_PASSWORD_DESC: '登入節點時需要的密碼',

  K8S_CLUSTER_SETTINGS_DESC: '對即將新建的 Kubernetes 集群進行初始化配置 ',

  CLUSTER_MAX_PODS_DESC: '可以在此 kubelet 上運行的 pod 的數量. 預設為 110.',

  K8S_NETWORK_PLUGIN_CALICO:
    'Calico 是一個純三層的網路方案，無縫集成 IaaS 雲架構，能夠提供的 VM、容器、實體機之間的 IP 通信',
  K8S_NETWORK_PLUGIN_FLANNEL:
    'Flannel 可以讓集群中的不同節點主機創建的 Docker 容器都具有全集群唯一的虛擬 IP 地址',
  K8S_NETWORK_PLUGIN_CILIUM: '基於 eBPF 的網路，具有安全性和可觀察性',

  KUBE_PODS_CIDR_DESC:
    '在節點上運行的 Pod 從節點的 Pod CIDR 範圍分配 IP 地址。',
  KUBE_SERVICE_CIDR_DESC: '分配給服務的 IP 池',

  CLUSTER_COMPONENTS_DESC: '對集群的服務組件進行訂製',

  CLUSTER_ADVANCED_SETTINGS_DESC: '可以根據需要配置您所需要的服務',
  CLUSTER_PRIVATE_REGISTRY_DESC:
    '給集群配置私有鏡像倉庫，當開始建構集群時會通過此鏡像倉庫拉取所需的全部鏡像。',

  CLUSTER_CONTROLPLANE_ENDPOINT: '授權集群訪問地址',
  CLUSTER_CONTROLPLANE_ENDPOINT_DESC:
    '通過授權的集群訪問地址與集群直接通信，為集群生成 kubeconfig 來訪問集群。',
  CLUSTER_ETCD_BACKUP_DESC: '對 etcd 進行定期備份設置',
  CLUSTER_ETCD_BACKUP_DIR_DESC: '在 etcd 主機上儲存 etcd 備份文件的位置。',
  CLUSTER_ETCD_BACKUP_PERIOD_DESC: '運行 etcd 備份任務的時間，單位為分鐘。',
  CLUSTER_ETCD_BACKUP_NUMBER_DESC: '要保留多少個備份副本。',
  CLUSTER_KUBESPHERE_SETTINGS_DESC: '針對 KubeSphere 的一些客制化設置',

  CREATING_CLUSTER: '集群正在創建中',
  CREATING_CLUSTER_DESC:
    '當前集群正在創建，暫時沒有可用的節點，所以集群為不可以用狀態',
  COPY_SUCCESSFUL: '复制成功。',
  CLUSTER_INIT_FAILED: 'Cluster initialization failed.',
  INIT_NODES: '初始化節點',
  PULL_IMAGES: '拉取鏡像',
  INIT_ETCD_CLUSTER: '初始化 etcd 集群',
  INIT_CONTROL_PLANE: '初始化控制平面',
  JOIN_NODES: '添加節點',
  INSTALL_ADDONS: '安裝插件',
  FETCHING_LOGS: `正在獲取紀錄...`,

  MASTER_NODE_COUNT_TIP: 'Master 節點數量需要為 1 或 3',
  WORKER_NODE_COUNT_TIP: 'Worker 節點數量至少為 1',

  CLUSTER_CREATION_PROGRESS_TIP:
    '根據所創建的的集群規模和網路連接的不同，創建完整整個集群大概需要 30 ~ 60 分鐘。',

  CLUSTER_UPGRADE_REQUIRED:
    'The cluster version does not support this function. Please upgrade the cluster to {version} or later.',
  MEMBER_CLUSTER_UPGRADE_TIP:
    'Member clusters with versions earlier than {version} do not support this function. Please upgrade the member clusters to {version} or later.',

  // Unbind Cluster
  UNBIND_CLUSTER_Q: 'Unbind Cluster',

  // Cluster Visibility
  NODE: 'Node',
  ADMINISTRATOR: 'Administrator',
  CLUSTER_VISIBILITY: '集群能見度',
  CLUSTER_VISIBILITY_DESC:
    'Cluster visibility controls the cluster authorization to workspaces. After a cluster is authorized to workspaces, you can view and manage the cluster resources in the workspaces.',
  EDIT_VISIBILITY_DESC: 'Edit the cluster visibility in workspaces.',
  UNAUTHORIZED: 'Unauthorized',
  AUDITING: 'Auditing',
  REMOVE_WORKSPACE_CONFIRM_SI:
    'Enter the workspace name <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  REMOVE_WORKSPACE_CONFIRM_PL:
    'Enter the workspace names <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
}
