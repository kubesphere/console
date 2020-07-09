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
  'Import Kubernetes Cluster': '导入Kubernetes集群',
  Import: '导入',

  Validating: '校验中',
  'Validation failed': '校验失败',

  'Cluster Name': '集群名称',
  'Cluster Management': '集群管理',
  'Nodes Management': '节点管理',
  'Node Types': '节点类型',
  'Network Management': '网络管理',
  'Custom Resources': '自定义资源 CRD',
  'Storage Management': '存储管理',
  'Cluster Settings': '集群设置',
  Snapshots: '存储卷快照',
  'IP Ranges': 'IP 地址范围',
  'Network Policies': '网络策略',
  'Network Topology': '网络拓扑',
  'Cluster Visibility': '集群可见性',
  'Cluster Members': '集群成员',
  'Cluster Roles': '集群角色',
  'Kubernetes Settings': 'Kubernetes 设置',
  'Connection Method': '连接方式',

  'Kubernetes Version': 'Kubernetes 版本',

  'Edit Cluster Info': '编辑集群信息',

  'Cluster List': '集群列表',
  'Cluster Info': '集群信息',
  'Kubernetes Status': 'Kubernetes 组件状态',
  Tools: '工具',

  'Edit Visibility': '编辑可见范围',

  'Go back': '返回上一步',

  'Choose a provider': '选择服务商',

  'User Projects': '用户项目',
  'System Projects': '系统项目',

  'Waiting for the cluster to join': '等待集群加入',

  'Click to Copy': '点击复制',

  'Cluster initialization failed': '集群初始化失败',

  'Not Ready': '未就绪',

  'Copy successfully': '复制成功',

  Unbind: '解除绑定',

  'Unbind Cluster': '解绑集群',

  'Cluster Member': '集群成员',

  Authorized: '已授权',
  Unauthorized: '待授权',

  'Authorize the cluster to workspace': '集群授权企业空间',
  'Set as public cluster': '设置为公开集群',

  'The current cluster is public': '当前集群处于公开状态',

  'Available Clusters': '可用集群',
  'Select Clusters': '集群选择',
  'Edit cluster basic information': '编辑集群基础信息',

  'Scheduler Scheduling Times': '调度器调度次数',
  'Scheduling Failed Pods': '调度失败的容器组',

  'Please select or input a tag': '请选择或输入标识',
  'Please select or input a provider': '请选择或输入服务商',
  'Please input the kubesphere api server address of the cluster':
    '请输入待加入集群的 Kubesphere API Server 地址',

  'All Projects': '全部项目',

  'Enter the project': '进入项目',

  NO_CLUSTER_TIP: '请添加至少 1 个集群',
  NO_CLUSTER_TIP_DESC:
    '集群是一组运行着 Kubernetes 的节点（物理或者虚拟机）, Kubesphere 的功能也依托于集群中的节点来运行',
  ADD_NEW_CLUSTER_DESC: '添加新的Kubernetes集群',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere提供了在主流服务商中快速部署Kubernetes集群的方案',

  VISIBILITY_PART: '部分可见',
  VISIBILITY_PUBLIC: '公开',

  MULTI_CLUSTER: '多集群',

  IMPORT_CLUSTER_DESC: '导入已有的Kubernetes集群',

  CLUSTER_SETTINGS_DESC: '定义集群配置信息',
  CLUSTER_TAG: '标识',
  CLUSTER_TAG_DESC: '标识此集群的用途，例如 生产环境、测试环境、演示环境 等',
  CLUSTER_PROVIDER_DESC: '提供集群基础设施的厂商',
  CLUSTER_CONNECT_METHOD_DESC: '可以直接连接集群或者使用代理',

  CONNTECT_DIRECT: '直接连接Kubernetes集群',
  CONNTECT_PROXY: '集群连接代理',

  CLUSTER_WAITING_JOIN_DESC:
    '暂时没有可用的节点，集群为不可以用状态，您可以添加以下配置文件以启用该集群',

  CLUSTER_AGENT_TIP_1:
    '请在通过SSH在目标集群中创建一个名称为 agent.yaml 的文件',
  CLUSTER_AGENT_TIP_1_DESC: '例如 <span class="code">vi agent.yaml</span>',
  CLUSTER_AGENT_TIP_2: '复制以下配置文件至 agent.yaml 中',
  CLUSTER_AGENT_TIP_2_DESC: '该代理文件可以将目标集群与平台进行连接',
  CLUSTER_AGENT_TIP_3:
    '通过命令行执行 <span class="code">kubectl create -f agent.yaml</span>',
  CLUSTER_AGENT_TIP_3_DESC: '执行命令之后等待集群状态的更新',

  CLUSTER_CONDITIONS: '集群状态',
  CLUSTER_BASE_INFO_DESC: '当前集群基础信息总览',

  UNBIND_CLUSTER_DESC:
    '解绑集群后，KubeSphere将无法再对该集群进行管理。 解绑后，该集群内的Kubernetes资源不会被删除。',
  SURE_TO_UNBIND_CLUSTER: '我确定要执行解绑集群的操作',

  'Invite members to the cluster': '邀请成员到该集群',
  INVITE_CLUSTER_MEMBER_DESC: '您可以邀请新的成员来此集群',

  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC:
    '集群授权可以将集群通过授权的形式指定给企业空间使用该集群',

  PUBLIC_CLUSTER_DESC:
    '公开状态的集群意味着平台内的用户都可以使用该集群，并在集群中创建和调度资源',

  CLUSTER_AUTHORIZATION_DESC:
    '集群授权可以将集群通过授权的形式指定给企业空间使用该集群',

  CLUSTER_VISIBILITY_Q1: '如何将集群授权给指定的企业空间使用？',
  CLUSTER_VISIBILITY_A1:
    '集群可以通过“编辑可见范围”将集群授权给不同的企业空间使用',
  CLUSTER_VISIBILITY_Q2: '什么是公开集群?',
  CLUSTER_VISIBILITY_A2:
    '公开状态的集群意味着平台内的用户都可以使用该集群，并在集群中创建和调度资源',

  SELECT_CLUSTERS_DESC: '选择企业空间下可用的集群',

  CLUSTER_API_SERVER_TITLE: '待加入集群的 Kubesphere API Server',
  CLUSTER_API_SERVER_DESC: '需要添加待加入集群的 KubeSphere API Server 地址',

  INPUT_KUBECONFIG: '请填写目标集群的 KubeConfig',

  CLUSTER_DIRECT_IMPORT_TIP:
    'KubeSphere 多集群控制平面通过提供的 kubeconfig 来直接连接导入集群，此种方式要求当前集群能够通过 kubeconfig 中的 server 地址直接访问待导入集群. </br>通常适用于:</br>1. 当前集群和待导入集群在同一内网网络中</br>2. 当前集群和待导入集群已通过vpn或隧道等其它技术连通所在网络</br>3. kubeconfig 的 server 地址可以通过公网访问',
  CLUSTER_AGENT_IMPORT_TIP:
    'KubeSphere 控制平面通过代理方式连接待导入集群，控制平面启动一个公开的代理服务，待导入集群创建相应的客户端组件连接代理服务，与控制平面之间建立一个反向代理。此种方式不需要待导入集群和控制平面在同一网络，也不要求待导入集群暴露集群的 apiserver 地址，但会有一定的网络性能损耗</br></br>通常适用于:</br>1. 当前集群和待导入集群不在同一网络中<br/>2. 当前集群和待导入集群无法通过vpn或隧道等其它技术连通所在网络<br/>3. 对集群间网络性能损耗能容忍',

  HOW_TO_GET_KUBECONFIG: '如何获取KubeConfig?',

  CLUSTER_AGENT_TITLE: '请根据集群中提供的代理连接设置加入集群',
  CLUSTER_AGENT_DESC: '需要在集群中设置下相应的代理Agent',
}
