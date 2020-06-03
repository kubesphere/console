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
  'Snapshots Management': '快照管理',
  'IP Ranges': 'IP 地址范围',
  'Network Policies': '网络策略',
  'Network Topology': '网络拓扑',
  'Cluster Visibility': '集群可见性',
  'Cluster Members': '集群成员',
  'Cluster Roles': '集群角色',
  'Kubernetes Settings': 'Kubernetes 设置',
  'Connect Method': '连接方式',

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

  'Cluster initialized failed': '集群初始化失败',

  'Not Ready': '未就绪',

  'Copy successful': '复制成功',

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

  'Scheduler scheduling times': '调度器调度次数',
  'Failed scheduling pods': '调度失败的容器组',

  'Please select or input a tag': '请选择或输入标识',
  'Please select or input a provider': '请选择或输入服务商',
  'Please input the kubesphere api server address of the cluster':
    '请输入待加入集群的 Kubesphere API Server 地址',

  'All Projects': '全部项目',

  NO_CLUSTER_TIP: '请添加至少 1 个集群',
  NO_CLUSTER_TIP_DESC:
    '集群是一组运行着 Kubernetes 的节点（物理或者虚拟机）, Kubesphere 的功能也依托于集群中的节点来运行',
  ADD_NEW_CLUSTER_DESC: '添加新的Kubernetes集群',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere提供了在主流服务商中快速部署Kubernetes集群的方案',

  VISIBILITY_PART: '部分可见',
  VISIBILITY_PUBLIC: 'Public',

  MULTI_CLUSTER: '多集群',

  IMPORT_CLUSTER_DESC: 'Import an existing Kubernetes cluster',

  CLUSTER_SETTINGS_DESC: '定义集群配置信息',
  CLUSTER_NAME_DESC:
    '只能包含小写字母、数字及分隔符("-")，且必须以小写字母或数字开头及结尾',
  CLUSTER_TAG: 'Tag',
  CLUSTER_TAG_DESC:
    'To indicate what the cluster is used for, such as a production environment, testing environment or demo environment',
  CLUSTER_PROVIDER_DESC: 'The cluster infrastructure provider',
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
  CLUSTER_BASE_INFO_DESC:
    'This module summarizes the basic information of the current cluster.',

  UNBIND_CLUSTER_DESC:
    'After the cluster is unbound, KubeSphere will be unable to manage the cluster and Kubernetes resources within the cluster will not be deleted.',
  SURE_TO_UNBIND_CLUSTER: 'I confirm I want to unbind the cluster.',

  'Invite members to the cluster': '邀请成员到该集群',
  INVITE_CLUSTER_MEMBER_DESC: '您可以邀请新的成员来此集群',

  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC:
    'Clusters can be assigned to workspaces through authorization.',

  PUBLIC_CLUSTER_DESC:
    'A public cluster means all platform users can access the cluster, in which they are able to create and schedule resources.',

  CLUSTER_AUTHORIZATION_DESC:
    'Clusters can be assigned to workspaces through authorization.',

  CLUSTER_VISIBILITY_Q1: 'How to authorize clusters to specific workspaces?',
  CLUSTER_VISIBILITY_A1: '',
  CLUSTER_VISIBILITY_Q2: 'What is a public cluster?',
  CLUSTER_VISIBILITY_A2:
    'A public cluster means all platform users can access the cluster, in which they are able to create and schedule resources.',

  SELECT_CLUSTERS_DESC: '选择企业空间下可用的集群',

  CLUSTER_API_SERVER_TITLE: '待加入集群的 Kubesphere API Server',
  CLUSTER_API_SERVER_DESC:
    '需要添加待加入集群的 KubeSphere API Server 地址，获取方式请查阅<a href="" target="_blank">文档</a>',

  INPUT_KUBECONFIG: '请填写目标集群的 KubeConfig',

  CLUSTER_DIRECT_IMPORT_TIP:
    'KubeSphere 多集群控制平面通过提供的 kubeconfig 和暴露 kubesphere apiserver 地址来连接导入集群，此种方式要求当前集群能够通过 kubeconfig 中的 server 地址和 kubesphere apiserver 地址直接访问待导入集群</br></br>通常适用于:</br>1. 当前集群和待导入集群在同一内网网络中</br>2. 当前集群和待导入集群已通过vpn或隧道等其它技术连通所在网络</br>3. kubeconfig 的 server 地址和 kubesphere apiserver 地址可以通过公网访问',
  CLUSTER_AGENT_IMPORT_TIP:
    'KubeSphere 控制平面通过代理方式连接待导入集群，控制平面启动一个公开的代理服务，待导入集群创建相应的客户端组件连接代理服务，与控制平面之间建立一个反向代理。此种方式不需要待导入集群和控制平面在同一网络，也不要求待导入集群暴露集群的 apiserver 地址，但会有一定的网络性能损耗</br></br>通常适用于:</br>1. 当前集群和待导入集群不在同一网络中<br/>2. 当前集群和待导入集群无法通过vpn或隧道等其它技术连通所在网络<br/>3. 对集群间网络性能损耗能容忍',

  HOW_TO_GET_KUBECONFIG: '如何获取KubeConfig?',
}
