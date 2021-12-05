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
  // Cluster Initializing
  WAIT_FOR_CLUSTER: '等待集群加入...',
  WAIT_FOR_CLUSTER_DESC: '暫時沒有可用的節點，集群為不可以用狀態，您可以添加以下配置文件以啟用該集群',
  CLUSTER_AGENT_TIP_1: '1. 請在通過 SSH 在目標集群中創建一個名稱為 agent.yaml 的文件',
  CLUSTER_AGENT_TIP_2: '2. 複製以下配置文件至 agent.yaml 中',
  CLUSTER_AGENT_TIP_3: '3. 通過命令行執行 <span class="code">kubectl create -f agent.yaml</span>',
  CLUSTER_AGENT_TIP_3_DESC: '執行命令之後等待集群狀態的更新',
  CREATING_CLUSTER: '集群正在創建中',
  CREATING_CLUSTER_DESC: '當前集群正在創建，暫時沒有可用的節點，所以集群為不可以用狀態',
  CLUSTER_INIT_FAILED: 'Cluster initialization failed.',
  CLUSTER_CREATION_PROGRESS: '集群創建進度',
  FETCHING_LOGS: 'Fetching logs...',
  CURRENT_STEP: '當前進度：{step}',
  CLUSTER_CREATION_PROGRESS_TIP: '根據所創建的的集群規模和網路連接的不同，創建完整整個集群大概需要 30 ~ 60 分鐘。',
  // Create Cluster
  SELECT_ADD_CLUSTER_METHOD: '選擇添加集群的方式',
  SELECT_ADD_CLUSTER_METHOD_DESC: '支持添加新集群和導入已存在集群',
  NEW_CLUSTER_DESC: '添加新的 Kubernetes 集群',
  CLUSTER_NODE_SETTINGS_DESC: '添加集群需要的節點',
  K8S_CLUSTER_SETTINGS_DESC: '對即將新建的 Kubernetes 集群進行初始化配置 ',
  CLUSTER_MAX_PODS_DESC: '可以在此 kubelet 上運行的 pod 的數量. 預設為 110.',
  KUBE_PODS_CIDR_DESC: '在節點上運行的 Pod 從節點的 Pod CIDR 範圍分配 IP 地址。',
  KUBE_SERVICE_CIDR_DESC: '分配給服務的 IP 池',
  CLUSTER_COMPONENTS_DESC: '對集群的服務組件進行訂製',
  CLUSTER_ADVANCED_SETTINGS_DESC: '可以根據需要配置您所需要的服務',
  CLUSTER_PRIVATE_REGISTRY_DESC: '給集群配置私有鏡像倉庫，當開始建構集群時會通過此鏡像倉庫拉取所需的全部鏡像。',
  CLUSTER_CONTROLPLANE_ENDPOINT: '授權集群訪問地址',
  CLUSTER_CONTROLPLANE_ENDPOINT_DESC: '通過授權的集群訪問地址與集群直接通信，為集群生成 kubeconfig 來訪問集群。',
  CLUSTER_ETCD_BACKUP_DESC: '對 etcd 進行定期備份設置',
  CLUSTER_ETCD_BACKUP_DIR_DESC: '在 etcd 主機上儲存 etcd 備份文件的位置。',
  CLUSTER_ETCD_BACKUP_PERIOD_DESC: '運行 etcd 備份任務的時間，單位為分鐘。',
  CLUSTER_ETCD_BACKUP_NUMBER_DESC: '要保留多少個備份副本。',
  CLUSTER_KUBESPHERE_SETTINGS_DESC: '針對 KubeSphere 的一些客制化設置',
  MASTER_NODE_COUNT_TIP: 'Master 節點數量需要為 1 或 3',
  WORKER_NODE_COUNT_TIP: 'Worker 節點數量至少為 1',
  // Add Node
  NODE_ROLE_EMPTY_DESC: '請指定節點的角色',
  EXTERNAL_IP: '外網 IP 地址',
  SSH_KEY_TCAP: 'SSH 密鑰',
  SSH_KEY_SCAP: 'SSH 密鑰',
  SSH_AUTH_MODE: 'SSH 認證方式',
  NODE_INTERNAL_IP_DESC: '集群内各節點間可以互相訪問的內網 IP 地址',
  NODE_INTERNAL_IP_EMPTY_DESC: '请输入节点在私网内的 IP 地址。',
  NODE_ROLE_DESC: '集群角色中，master 節點數量需要為 1 或 3，woker 節點數量至少為 1',
  NODE_EXTERNAL_IP_DESC: '請填入當前主集群可以訪問到的 IP 地址',
  NODE_EXTERNAL_IP_EMPTY_DESC: '請填入當前主集群可以訪問到的 IP 地址',
  SSH_AUTH_MODE_DESC: '支持用戶名密碼以及 SSH 密鑰',
  NODE_USERNAME_DESC: '預設以 root 用戶登入',
  NODE_PASSWORD_DESC: '登入節點時需要的密碼'
};