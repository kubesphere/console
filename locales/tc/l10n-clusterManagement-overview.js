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
  HOST_CLUSTER: '主集群',
  MEMBER_CLUSTER: 'Member cluster',
  // Baisc Information
  PROVIDER: '服務商',
  KUBERNETES_VERSION: 'Kubernetes 版本',
  KUBESPHERE_VERSION: 'KubeSphere 版本',
  VISIBILITY_PARTIAL: '部分可見',
  VISIBILITY_PUBLIC: '公開',
  CLUSTER_BASE_INFO_DESC: '基本資訊是目前集群的資訊概覽，您可以查看和編輯集群的基本資訊。',
  // System Components
  // Resource Usage
  MEMORY: '記憶體',
  TOTAL: '總計',
  USED: '已使用',
  // Tools
  TOOLS: 'Tools',
  KUBECTL_DESC: '目前集群客戶端命令行工具',
  KUBECONFIG_DESC: '配置文件，用於配置目前集群的訪問資訊。',
  // Kubernetes Status
  KUBERNETES_STATUS: 'Kubernetes 組件狀態',
  API_REQUESTS_PER_SECOND: '每秒 API 請求數',
  VALUE_REQUESTS_SECOND: '{value, plural, =1 {1 request} other {# requests}}/s',
  API_REQUEST_LATENCY: 'API 請求延遲',
  SCHEDULING_OPERATIONS: '排程器調度次數',
  SCHEDULING_OPERATION: '排程器調度次數',
  SCHEDULING_FAILURES: '調度失敗的容器組',
  SCHEDULING_FAILURE: '調度失敗的容器組',
  // Nodes
  VIEW_MORE: '查看更多',
  NODE_CPU_UTILISATION: 'CPU 用量',
  NODE_LOAD1: 'Average CPU load (1 min)',
  NODE_MEMORY_UTILISATION: '記憶體用量',
  NODE_DISK_SIZE_UTILISATION: 'Disk usage',
  NODE_DISK_INODE_UTILISATION: 'Inode usage',
  NODE_POD_UTILISATION: '容器組利用率',
  // Cluster Initializing
  WAIT_FOR_CLUSTER: 'Waiting for the cluster to join...',
  WAIT_FOR_CLUSTER_DESC: 'The cluster is unavailable. Perform the following steps to add the cluster.',
  CLUSTER_AGENT_TIP_1: '1. Log in to the cluster over SSH and run the <span class="code">vi agent.yaml</span> command to create a configuration file.',
  CLUSTER_AGENT_TIP_2: '2. Copy the following information to the <span class="code">agent.yaml</span> file.',
  CLUSTER_AGENT_TIP_3: '3. Run the <span class="code">kubectl create -f agent.yaml</span> command to add the cluster.',
  CLUSTER_AGENT_TIP_3_DESC: 'This operation may take a while. Please wait until the cluster status is updated.',
  CREATING_CLUSTER: 'Creating the cluster...',
  CREATING_CLUSTER_DESC: 'The cluster is being created and is currently unavailable.',
  CLUSTER_INIT_FAILED: 'Cluster initialization failed.',
  CLUSTER_CREATION_PROGRESS: 'Cluster Creation Progress',
  FETCHING_LOGS: 'Fetching logs...',
  CURRENT_STEP: 'Current step: {step}',
  CLUSTER_CREATION_PROGRESS_TIP: 'Depending on the cluster size and infrastructure environment, cluster creation may take 30 to 60 minutes.'
};