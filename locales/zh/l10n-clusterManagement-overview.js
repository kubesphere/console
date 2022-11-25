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
  VALUE_REQUESTS_SECOND: '{value, plural, =1 {1 次} other {# 次}}/s',
  API_REQUEST_LATENCY: 'API 请求延迟',
  SCHEDULING_OPERATIONS: '调度次数',
  SCHEDULING_OPERATION: '调度次数',
  SCHEDULING_FAILURES: '调度失败次数',
  SCHEDULING_FAILURE: '调度失败次数',
  // Nodes
  VIEW_MORE: '查看更多',
  NODE_CPU_UTILISATION: 'CPU 用量',
  NODE_LOAD1: 'CPU 平均负载（1 分钟）',
  NODE_MEMORY_UTILISATION: '内存用量',
  NODE_DISK_SIZE_UTILISATION: '磁盘用量',
  NODE_DISK_INODE_UTILISATION: 'Inode 用量',
  NODE_POD_UTILISATION: '容器组利用率',
  // Cluster Initializing
  WAIT_FOR_CLUSTER: '等待集群加入...',
  WAIT_FOR_CLUSTER_DESC: '集群当前不可用。请执行以下步骤添加集群。',
  CLUSTER_AGENT_TIP_1: '1. 通过 SSH 登录集群，并执行 <span class="code">vi agent.yaml</span> 命令创建配置文件。',
  CLUSTER_AGENT_TIP_2: '2. 将以下信息复制到 <span class="code">agent.yaml</span> 文件中。',
  CLUSTER_AGENT_TIP_3: '3. 执行 <span class="code">kubectl create -f agent.yaml</span> 命令添加集群。',
  CLUSTER_AGENT_TIP_3_DESC: '此操作可能需要一定时间，请等待集群状态更新。',
  CREATING_CLUSTER: '集群创建中...',
  CREATING_CLUSTER_DESC: '集群正在创建中，当前状态不可用。',
  CLUSTER_INIT_FAILED: '集群初始化失败。',
  CLUSTER_CREATION_PROGRESS: '集群创建进度',
  FETCHING_LOGS: '正在加载日志...',
  CURRENT_STEP: '当前步骤：{step}',
  CLUSTER_CREATION_PROGRESS_TIP: '取决于集群规模和基础设施环境，集群创建可能需要 30 到 60 分钟。'
};