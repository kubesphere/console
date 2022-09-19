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
  MEMBER_CLUSTER: '成员集群',
  CLUSTER_CONDITIONS: '集群状态',
  // Baisc Information
  PROVIDER: '提供商',
  KUBERNETES_VERSION: 'Kubernetes 版本',
  KUBESPHERE_VERSION: 'KubeSphere 版本',
  VISIBILITY_PARTIAL: '对部分企业空间可见',
  VISIBILITY_PUBLIC: '对所有企业空间可见',
  CLUSTER_BASE_INFO_DESC: '基本信息是当前集群的信息概览，您可以查看和编辑集群的基本信息。',
  // System Components
  // Resource Usage
  MEMORY: '内存',
  TOTAL: '总计',
  USED: '已使用',
  // Tools
  TOOLS: '工具',
  KUBECTL_DESC: '命令行工具，用于控制当前集群。',
  KUBECONFIG_DESC: '配置文件，用于配置当前集群的访问信息。',
  // Kubernetes Status
  KUBERNETES_STATUS: 'Kubernetes 状态',
  API_REQUESTS_PER_SECOND: '每秒 API 请求数',
  API_REQUEST_LATENCY: 'API 请求延迟',
  SCHEDULING_OPERATIONS: '调度次数',
  SCHEDULING_OPERATION: '调度次数',
  SCHEDULING_FAILURES: '调度失败次数',
  SCHEDULING_FAILURE: '调度失败次数',
  // Nodes
  VIEW_MORE: '查看更多',
  NODE_CPU_UTILISATION: 'CPU 用量',
  NODE_LOAD1: 'CPU 平均负载',
  NODE_MEMORY_UTILISATION: '内存用量',
  NODE_DISK_SIZE_UTILISATION: '磁盘用量',
  NODE_DISK_INODE_UTILISATION: 'Inode 用量',
  NODE_POD_UTILISATION: '容器组利用率',
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