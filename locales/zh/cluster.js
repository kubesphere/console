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
  'Import Kubernetes Cluster': '导入 Kubernetes 集群',
  Import: '导入',

  Validating: '校验中',
  'Validation failed': '校验失败',

  CLUSTER_NAME: '集群名称',
  'Cluster Management': '集群管理',
  'Nodes Management': '节点管理',
  'Node Types': '节点类型',
  'Network Management': '网络管理',
  'Custom Resources': '自定义资源 CRD',
  STORAGE: '存储',
  CLUSTER_SETTINGS: '集群设置',
  'Network Policies': '网络策略',
  'Network Topology': '网络拓扑',
  CLUSTER_VISIBILITY_SCAP: '集群可见性',
  CLUSTER_VISIBILITY_TCAP: '集群可见性',
  'Cluster Members': '集群成员',
  'Cluster Roles': '集群角色',
  'Kubernetes Settings': 'Kubernetes 设置',
  'Connection Method': '连接方式',

  'Host Cluster': '主集群',
  HOST_CLUSTER: '主集群',
  'Host Clusters': '主集群',
  'Member Cluster': '成员集群',
  'Member Clusters': '成员集群',

  KUBERNETES_VERSION: 'Kubernetes 版本',
  KUBESPHERE_VERSION: 'KubeSphere 版本',

  'Cluster List': '集群列表',
  CLUSTER_INFORMATION: '集群信息',
  KUBERNETES_STATUS: 'Kubernetes 状态',
  Tools: '工具',

  EDIT_VISIBILITY: '编辑可见性',

  'Go back': '返回上一步',

  'Choose a provider': '选择服务商',

  USER_PROJECTS: '用户项目',
  SYSTEM_PROJECTS: '系统项目',

  WAIT_FOR_CLUSTER: '等待集群加入...',

  'Click to Copy': '点击复制',

  'Cluster initialization failed': '集群初始化失败',

  'Not Ready': '未就绪',

  'Copy successfully': '复制成功',

  UNBIND: '解绑',

  UNBIND_CLUSTER: '解绑集群',
  'Are you sure you want to unbind the cluster?': '您确定解绑集群吗？',

  'Cluster Member': '集群成员',

  AUTHORIZED: '已授权',
  Unauthorized: '待授权',

  'Please input cluster name': '请输入集群名称',

  'Authorize the cluster to workspace': '集群授权企业空间',
  SET_PUBLIC_CLUSTER: '设置为公开集群',

  'The current cluster is public': '当前集群处于公开状态',

  AVAILABLE_CLUSTERS: '可用集群',
  SELECT_CLUSTERS: '选择集群',
  EDIT_CLUSTER_INFO_DESC: '编辑集群基本信息。',

  SCHEDULING_OPERATIONS: '调度次数',
  SCHEDULING_OPERATION: '调度次数',
  SCHEDULING_FAILURES: '调度失败次数',
  SCHEDULING_FAILURE: '调度失败次数',

  'Please select or input a tag': '请选择或输入标识',
  'Please select or input a provider': '请选择或输入服务商',
  'Please input the kubesphere api server address of the cluster':
    '请输入待加入集群的 Kubesphere API Server 地址',

  ALL_PROJECTS: '全部项目',

  'Enter the project': '进入项目',

  'How to Add': '添加方式',

  'New Cluster': '新建集群',

  'Import Cluster': '导入集群',

  'Cluster Basic Info': '集群基本信息',

  'Node Settings': '节点设置',

  'Please add at least one cluster node': '请至少添加一个集群节点',
  NODE_ROLE_EMPTY_DESC: '设置节点在集群中的角色。',

  'Add node to the cluster': '添加节点到集群中',

  INTERNAL_IP_ADDRESS: '内部 IP 地址',
  PORT: '端口',
  PORT_VALUE: '端口：{value}',
  EXTERNAL_IP: '外网 IP 地址',
  USERNAME_AND_PASSWORD: '用户名和密码',
  SSH_KEY_TCAP: 'SSH 密钥',
  SSH_KEY_SCAP: 'SSH 密钥',

  SSH_AUTH_MODE: 'SSH 认证方式',
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

  INVALID_IP_DESC: 'IP 地址格式错误。',

  CLUSTER_CREATION_PROGRESS: '集群创建进度',

  CURRENT_STEP: '当前步骤：{step}',

  'Log Info': '日志信息',
  'Cluster Visibility': '集群可见性',

  CLUSTER_BASIC_INFO: '基本信息',
  NO_CLUSTER_TIP: '请添加至少 1 个集群',
  NO_CLUSTER_TIP_DESC:
    '集群是一组运行着 Kubernetes 的节点 (物理或者虚拟机)，Kubesphere 的功能也依托于集群中的节点来运行',
  ADD_NEW_CLUSTER_DESC: '添加新的 Kubernetes 集群',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere 提供了在主流服务商中快速部署 Kubernetes 集群的方案',

  VISIBILITY_PARTIAL: '对部分企业空间可见',
  VISIBILITY_PUBLIC: '对所有企业空间可见',

  MULTI_CLUSTER: '多集群',

  CLUSTER_SETTINGS_DESC: '定义集群配置信息',
  TAG: '标签',
  CLUSTER_TAG_DESC: '选择标签来标识集群的用途。',
  CLUSTER_PROVIDER_DESC: '选择提供集群基础设施的服务商。',
  CLUSTER_CONNECT_METHOD_DESC: '可以直接连接集群或者使用代理',

  CONNTECT_DIRECT: '直接连接 Kubernetes 集群',
  CONNTECT_PROXY: '集群连接代理',

  WAIT_FOR_CLUSTER_DESC: '集群当前不可用。请执行以下步骤添加集群。',

  CLUSTER_AGENT_TIP_1:
    '1. 通过 SSH 登录集群，并执行 <span class="code">vi agent.yaml</span> 命令创建配置文件。',
  CLUSTER_AGENT_TIP_2:
    '2. 将以下信息复制到 <span class="code">agent.yaml</span> 文件中。',
  CLUSTER_AGENT_TIP_3:
    '3. 执行 <span class="code">kubectl create -f agent.yaml</span> 命令添加集群。',
  CLUSTER_AGENT_TIP_3_DESC: '此操作可能需要一定时间，请等待集群状态更新。',

  CLUSTER_CONDITIONS: '集群状态',
  CLUSTER_BASE_INFO_DESC:
    '基本信息是当前集群的信息概览，您可以查看和编辑集群的基本信息。',
  CLUSTER_INFO_TCAP: '集群信息',

  UNBIND_CLUSTER_DESC:
    '解绑集群后，KubeSphere 将无法管理该集群，但该集群上的 Kubernetes 资源不会被删除。',
  SURE_TO_UNBIND_CLUSTER: '我已了解操作所带来的风险。',

  'Invite members to the cluster': '邀请成员到该集群',
  INVITE_CLUSTER_MEMBER_DESC: '您可以邀请新的成员来此集群',

  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC:
    '集群授权可以将集群通过授权的形式指定给企业空间使用该集群',

  PUBLIC_CLUSTER_DESC:
    '公开状态的集群意味着平台内的用户都可以使用该集群，并在集群中创建和调度资源',

  CLUSTER_AUTHORIZATION_DESC:
    '集群授权可以将集群通过授权的形式指定给企业空间使用该集群',

  CLUSTER_VISIBILITY_Q1: '如何将集群授权给指定的企业空间使用？',
  CLUSTER_VISIBILITY_A1: '您可以点击编辑可见性将集群授权给指定的企业空间使用。',
  CLUSTER_VISIBILITY_Q2: '什么是公开集群?',
  CLUSTER_VISIBILITY_A2:
    '公开状态的集群意味着平台内的用户都可以使用该集群，并在集群中创建和调度资源。',

  SELECT_CLUSTERS_DESC: '选择企业空间需要使用的集群。',

  CLUSTER_API_SERVER_TITLE: '待加入集群的 Kubesphere API Server',
  CLUSTER_API_SERVER_DESC: '需要添加待加入集群的 KubeSphere API Server 地址',

  INPUT_KUBECONFIG: '请填写目标集群的 KubeConfig',

  CLUSTER_DIRECT_IMPORT_TIP:
    'KubeSphere 多集群控制平面通过提供的 kubeconfig 来直接连接导入集群，此种方式要求当前集群能够通过 kubeconfig 中的 server 地址直接访问待导入集群。 </br></br>通常适用于:</br>1. 当前集群和待导入集群在同一内网网络中</br>2. 当前集群和待导入集群已通过 VPN 或隧道等其它技术连通所在网络</br>3. kubeconfig 的 server 地址可以通过公网访问',
  CLUSTER_AGENT_IMPORT_TIP:
    'KubeSphere 控制平面通过代理方式连接待导入集群，控制平面启动一个公开的代理服务，待导入集群创建相应的客户端组件连接代理服务，与控制平面之间建立一个反向代理。此种方式不需要待导入集群和控制平面在同一网络，也不要求待导入集群暴露集群的 apiserver 地址，但会有一定的网络性能损耗。</br></br>通常适用于:</br>1. 当前集群和待导入集群不在同一网络中<br/>2. 当前集群和待导入集群无法通过 VPN 或隧道等其它技术连通所在网络<br/>3. 对集群间网络性能损耗能容忍',

  HOW_TO_GET_KUBECONFIG: '如何获取 KubeConfig?',

  CLUSTER_AGENT_TITLE: '请根据集群中提供的代理连接设置加入集群',
  CLUSTER_AGENT_DESC: '需要在集群中设置下相应的代理 Agent',

  SELECT_HOST_CLUSTER_WARNING:
    '当前系统为多集群系统，请尽量避免在主集群上创建资源。主集群负载过高会导致多集群系统稳定性下降。',
  HOST_CLUSTER_VISIBILITY_WARNING:
    '请谨慎将主集群授权给企业空间，主集群负载过高会导致多集群系统稳定性下降。',
  CLUSTER_VISIBILITY_REMOVE_WARNING:
    '移除集群对企业空间的授权后，该企业空间在当前集群下的所有资源将被删除。',

  REMOVE_WORKSPACE_CONFIRM_TITLE: '移除授权',
  REMOVE_WORKSPACE_CONFIRM_DESC:
    '请输入企业空间名称 <strong>{resource}</strong> 确保您已了解操作所带来的风险。',

  SELECT_ADD_CLUSTER_METHOD: '选择添加集群的方式',
  SELECT_ADD_CLUSTER_METHOD_DESC: '支持添加新集群和导入已存在集群',

  NEW_CLUSTER_DESC: '添加新的 Kubernetes 集群',
  IMPORT_CLUSTER_DESC: '导入已有的 Kubernetes 集群',
  CLUSTER_NODE_SETTINGS_DESC: '添加集群需要的节点',
  NODE_INTERNAL_IP_DESC: '设置节点在 KubeSphere 集群内部的 IP 地址。',
  EDGENODE_INTERNAL_IP_DESC: '设置边缘节点在 KubeSphere 集群内部的 IP 地址。',
  NODE_INTERNAL_IP_EMPTY_DESC: '请设置节点在 KubeSphere 集群内部的 IP 地址。',
  EDGENODE_INTERNAL_IP_EMPTY_DESC:
    '请设置边缘节点在 KubeSphere 集群内部的 IP 地址。',
  NODE_ROLE_DESC: '设置节点在集群中的角色。',
  NODE_EXTERNAL_IP_DESC: '输入用于 SSH 登录的节点 IP 地址和端口号。',
  NODE_EXTERNAL_IP_EMPTY_DESC: '请输入用于 SSH 登录的节点 IP 地址。',
  SSH_AUTH_MODE_DESC: '选择 SSH 认证模式。',
  NODE_USERNAME_DESC: '输入用于 SSH 登录节点的用户名。',
  NODE_PASSWORD_DESC: '输入用于 SSH 登录节点的密码。',

  K8S_CLUSTER_SETTINGS_DESC: '对即将新建的 Kubernetes 集群进行初始化配置',

  CLUSTER_MAX_PODS_DESC: '可以在此 Kubelet 上运行的 pod 的数量. 默认为 110.',

  K8S_NETWORK_PLUGIN_CALICO:
    'Calico 是一个纯3层的网络方案，无缝集成 IaaS 云架构，能够提供的 VM、容器、裸机之间的IP通信',
  K8S_NETWORK_PLUGIN_FLANNEL:
    'Flannel 可以让集群中的不同节点主机创建的 Docker 容器都具有全集群唯一的虚拟IP地址',
  K8S_NETWORK_PLUGIN_CILIUM: '基于 eBPF 的网络，具有安全性和可观察性',

  KUBE_PODS_CIDR_DESC:
    '在节点上运行的 Pod 从节点的 Pod CIDR 范围分配 IP 地址。',
  KUBE_SERVICE_CIDR_DESC: '分配给服务的 IP 池',

  CLUSTER_COMPONENTS_DESC: '对集群的服务组件进行定制',

  CLUSTER_ADVANCED_SETTINGS_DESC: '可以根据需要配置您所需要的服务',
  CLUSTER_PRIVATE_REGISTRY_DESC:
    '给集群配置私有镜像仓库，当开始构建集群时会通过此镜像仓库拉取所需的全部镜像。',

  CLUSTER_CONTROLPLANE_ENDPOINT: '授权集群访问地址',
  CLUSTER_CONTROLPLANE_ENDPOINT_DESC:
    '通过授权的集群访问地址与集群直接通信，为集群生成 kubeconfig 来访问集群。',
  CLUSTER_ETCD_BACKUP_DESC: '对 etcd 进行定期备份设置',
  CLUSTER_ETCD_BACKUP_DIR_DESC: '在 etcd 主机上存储 etcd 备份文件的位置。',
  CLUSTER_ETCD_BACKUP_PERIOD_DESC: '运行 etcd 备份任务的时间，单位为分钟。',
  CLUSTER_ETCD_BACKUP_NUMBER_DESC: '要保留多少个备份副本。',
  CLUSTER_KUBESPHERE_SETTINGS_DESC: '针对 KubeSphere 的一些定制化设置',

  CREATING_CLUSTER: '集群创建中...',
  CREATING_CLUSTER_DESC: '集群正在创建中，当前状态不可用。',
  COPY_SUCCESSFUL: '复制成功。',
  CLUSTER_INIT_FAILED: '集群初始化失败。',
  INIT_NODES: '初始化节点',
  PULL_IMAGES: '拉取镜像',
  INIT_ETCD_CLUSTER: '初始化 etcd 集群',
  INIT_CONTROL_PLANE: '初始化控制平面',
  JOIN_NODES: '添加节点',
  INSTALL_ADDONS: '安装插件',
  FETCHING_LOGS: `获取日志中...`,

  MASTER_NODE_COUNT_TIP: 'Master 节点数量需要为 1 或 3',
  WORKER_NODE_COUNT_TIP: 'Worker 节点数量至少为 1',

  CLUSTER_CREATION_PROGRESS_TIP:
    '取决于集群规模和基础设施环境，集群创建可能需要 30 到 60 分钟。',

  CLUSTER_UPGRADE_REQUIRED:
    '当前 KubeSphere 版本不支持此功能，请将 KubeSphere 升级到 {version} 或以上版本。',
  MEMBER_CLUSTER_UPGRADE_TIP:
    '低于 {version} 版本的成员集群不支持此功能, 请将成员集群升级到 {version} 或以上版本。',

  // Unbind Cluster
  UNBIND_CLUSTER_Q: '解绑集群',

  // Cluster Visibility
  NODE: '节点',
  ADMINISTRATOR: '管理员',
  CLUSTER_VISIBILITY: '集群可见性',
  CLUSTER_VISIBILITY_DESC:
    '集群可见性控制集群对企业空间的授权。将集群授权给企业空间后，即可在企业空间中查看并管理集群资源。',
  EDIT_VISIBILITY_DESC: '编辑集群在企业空间中的可见性。',
  UNAUTHORIZED: '未授权',
  AUDITING: '审计',
  REMOVE_WORKSPACE_CONFIRM_SI:
    '请输入企业空间名称 <strong>{resource}</strong> 确保您已了解操作所带来的风险。',
  REMOVE_WORKSPACE_CONFIRM_PL:
    '请输入企业空间名称 <strong>{resource}</strong> 确保您已了解操作所带来的风险。',
}
