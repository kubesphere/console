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
  WAIT_FOR_CLUSTER_DESC: '集群当前不可用。请执行以下步骤添加集群。',
  CLUSTER_AGENT_TIP_1: '1. 通过 SSH 登录集群，并执行 <span class="code">vi agent.yaml</span> 命令创建配置文件。',
  CLUSTER_AGENT_TIP_2: '2. 将以下信息复制到 <span class="code">agent.yaml</span> 文件中。',
  CLUSTER_AGENT_TIP_3: '3. 执行 <span class="code">kubectl create -f agent.yaml</span> 命令添加集群。',
  CLUSTER_AGENT_TIP_3_DESC: '此操作可能需要一定时间，请等待集群状态更新。',
  CREATING_CLUSTER: '集群创建中...',
  CREATING_CLUSTER_DESC: '集群正在创建中，当前状态不可用。',
  CLUSTER_INIT_FAILED: '集群初始化失败。',
  CLUSTER_CREATION_PROGRESS: '集群创建进度',
  FETCHING_LOGS: 'Fetching logs...',
  CURRENT_STEP: '当前步骤：{step}',
  CLUSTER_CREATION_PROGRESS_TIP: '取决于集群规模和基础设施环境，集群创建可能需要 30 到 60 分钟。',
  // Create Cluster
  SELECT_ADD_CLUSTER_METHOD: '选择添加集群的方式',
  SELECT_ADD_CLUSTER_METHOD_DESC: '支持添加新集群和导入已存在集群',
  NEW_CLUSTER_DESC: '添加新的 Kubernetes 集群',
  CLUSTER_NODE_SETTINGS_DESC: '添加集群需要的节点',
  K8S_CLUSTER_SETTINGS_DESC: '对即将新建的 Kubernetes 集群进行初始化配置',
  CLUSTER_MAX_PODS_DESC: '可以在此 Kubelet 上运行的 pod 的数量. 默认为 110.',
  KUBE_PODS_CIDR_DESC: '在节点上运行的 Pod 从节点的 Pod CIDR 范围分配 IP 地址。',
  KUBE_SERVICE_CIDR_DESC: '分配给服务的 IP 池',
  CLUSTER_COMPONENTS_DESC: '对集群的服务组件进行定制',
  CLUSTER_ADVANCED_SETTINGS_DESC: '可以根据需要配置您所需要的服务',
  CLUSTER_PRIVATE_REGISTRY_DESC: '给集群配置私有镜像仓库，当开始构建集群时会通过此镜像仓库拉取所需的全部镜像。',
  CLUSTER_CONTROLPLANE_ENDPOINT: '授权集群访问地址',
  CLUSTER_CONTROLPLANE_ENDPOINT_DESC: '通过授权的集群访问地址与集群直接通信，为集群生成 kubeconfig 来访问集群。',
  CLUSTER_ETCD_BACKUP_DESC: '对 etcd 进行定期备份设置',
  CLUSTER_ETCD_BACKUP_DIR_DESC: '在 etcd 主机上存储 etcd 备份文件的位置。',
  CLUSTER_ETCD_BACKUP_PERIOD_DESC: '运行 etcd 备份任务的时间，单位为分钟。',
  CLUSTER_ETCD_BACKUP_NUMBER_DESC: '要保留多少个备份副本。',
  CLUSTER_KUBESPHERE_SETTINGS_DESC: '针对 KubeSphere 的一些定制化设置',
  MASTER_NODE_COUNT_TIP: 'Master 节点数量需要为 1 或 3',
  WORKER_NODE_COUNT_TIP: 'Worker 节点数量至少为 1',
  // Add Node
  NODE_ROLE_EMPTY_DESC: '设置节点在集群中的角色。',
  EXTERNAL_IP: '外网 IP 地址',
  SSH_KEY_TCAP: 'SSH 密钥',
  SSH_KEY_SCAP: 'SSH 密钥',
  SSH_AUTH_MODE: 'SSH 认证方式',
  NODE_INTERNAL_IP_DESC: '设置节点在 KubeSphere 集群内部的 IP 地址。',
  NODE_INTERNAL_IP_EMPTY_DESC: '请设置节点在 KubeSphere 集群内部的 IP 地址。',
  NODE_ROLE_DESC: '设置节点在集群中的角色。',
  NODE_EXTERNAL_IP_DESC: '输入用于 SSH 登录的节点 IP 地址和端口号。',
  NODE_EXTERNAL_IP_EMPTY_DESC: '请输入用于 SSH 登录的节点 IP 地址。',
  SSH_AUTH_MODE_DESC: '选择 SSH 认证模式。',
  NODE_USERNAME_DESC: '输入用于 SSH 登录节点的用户名。',
  NODE_PASSWORD_DESC: '输入用于 SSH 登录节点的密码。'
};