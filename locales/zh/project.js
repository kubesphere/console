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
  CLUSTER: '集群',
  CLUSTER_PL: '集群',
  CLUSTER_VALUE: '集群：{value}',
  Deployment: '部署',
  StatefulSet: '有状态副本集',
  DaemonSet: '守护进程集',
  LoadBalancer: '负载均衡',
  Volume: '存储卷',
  Terminating: '删除中',
  Deleting: '删除中',
  CREATE_PROJECT: '创建项目',
  CREATE_MULTI_CLUSTER_PROJECT: '创建多集群项目',
  EDIT_PROJECT: '编辑项目',
  Details: '详情',
  Members: '成员',
  PROJECT_ROLE_PL: '项目角色',
  'Project Role': '项目角色',
  // Create ServiceAccount Page
  PROJECT_ROLE_SI: '项目角色',
  projects: '项目',
  Projects: '项目',
  'Project Overview': '项目预览',
  'Members Management': '成员管理',
  PROJECT_ADMINISTRATOR: '项目管理员',
  MANAGE_PROJECT: '管理项目',
  RESOURCE_QUOTA_PL: '资源配额',
  PROJECT_NAME: '项目名称',
  PROJECT_MEMBER_PL: '项目成员',
  PROJECT_RESOURCE_QUOTAS: '项目资源配额',
  'Project Members': '项目成员',
  'project members': '项目成员',
  'Member Name': '成员名称',
  'Modify Member Role': '修改成员角色',
  'Modify Members Role': '修改成员角色',
  'Remove Members': '移除成员',
  REMOVE_MEMBER: '移除成员',
  REMOVE_MULTIPLE_MEMBERS: '指移除成员',
  REMOVE_MULTIPLE_MEMBERS_TIP:
    '请输入用户名 <strong>{resource}</strong> 以确认您了解此操作的风险。',
  'Invite Member': '邀请成员',
  GATEWAY: '网关',
  ENABLE_GATEWAY: '开启网关',

  GATEWAY_NOT_ENABLED: '网关未开启',

  PROJECT_INFO: '项目信息',
  PROJECT_QUOTA: '项目配额',
  EDIT_PROJECT_QUOTAS: '编辑项目配额',
  'Quota Management': '配额管理',
  WORKSPACE_QUOTA_PL: '企业空间配额',
  PROJECT_QUOTA_PL: '项目配额',

  PROJECT_QUOTAS_NOT_SET: '项目配额未设置',
  DEFAULT_CONTAINER_QUOTAS_NOT_SET: '默认容器配额未设置',

  'Project Placement': '项目位置',

  'Multi-cluster Project': '多集群项目',
  MULTI_CLUSTER_PROJECT: '多集群项目',
  MULTI_CLUSTER_PROJECT_LOW: '多集群项目',
  MULTI_CLUSTER_PROJECT_SCAP: '多集群项目',
  MULTI_CLUSTER_PROJECT_PL: '多集群项目',
  'Multi-cluster Projects': '多集群项目',

  Opened: '已开启',
  Closed: '已关闭',

  CREATE_PROJECT_DESC: '创建项目以对资源进行分组并控制不同用户的权限。',
  PROJECT_NAME_DESC:
    '名称只能包含小写字母、数字和连字符（-），必须以小写字母开头并以小写字母或数字结尾，最长 63 个字符。',
  PROJECT_NAME_INVALID_DESC:
    '名称无效。名称只能包含小写字母、数字和连字符（-），必须以小写字母开头并以小写字母或数字结尾，最长 63 个字符。',
  'Please input project name': '请输入项目名',
  'Invalid project name': '项目名格式不合法',
  'Project name exists': '项目名已存在',

  DELETE_MEMBER_TIP:
    '确定移除成员 <strong>{name}</strong> ? 移除后该成员将无法访问本项目。',

  'DevOps Projects': 'DevOps 项目',
  'Select Project Type': '选择项目类型',

  'Edit Project Quota': '编辑项目配额',
  ADD_QUOTA: '添加配额',

  deployments: '部署',
  statefulsets: '有状态副本集',
  daemonsets: '守护进程集',
  jobs: '任务',
  cronjobs: '定时任务',
  pods: '容器组',

  REQUESTS_CPU: 'CPU 预留',
  LIMITS_CPU: 'CPU 限制',
  REQUESTS_MEMORY: '内存预留',
  LIMITS_MEMORY: '内存限制',

  DEFAULT_CONTAINER_QUOTA_PL: '默认容器配额',
  EDIT_DEFAULT_CONTAINER_QUOTA: '编辑默认容器配额',
  EDIT_DEFAULT_CONTAINER_QUOTAS: '编辑默认容器配额',
  'Edit Resource Default Request': '编辑资源默认请求',
  EDIT_PROJECT_QUOTA: '编辑项目配额',

  RESOURCE_TYPE: '资源类型',
  RESOURCE_TYPE_SCAP: '资源类型',

  'Help Information': '帮助信息',

  'Enter Project': '进入项目',
  'Enter DevOps Project': '进入项目',
  Project_Admin: '项目管理员',
  'No Platform Manage Authorization': '无平台管理权限',

  'Default limit resource': '默认最大使用资源',
  'Default request resource': '默认最小使用资源',

  ASSIGN_WORKSPACE: '分配企业空间',
  'Target Workspace': '目标企业空间',
  SELECT_WORKSPACE_DESC: '选择一个企业空间。',
  'Not Assigned': '未分配',
  PROJECT_ADMINISTRATOR_DESC: '选择企业空间中的用户作为项目管理员。',

  DISK_LOG_COLLECTION: '落盘日志收集',
  COLLECT_LOGS_ON_VOLUMES: '收集存储卷上的日志',
  LOG_COLLECTION_ENABLED_DESC:
    '开启或停用此功能后，您需要重启容器组副本才能使修改生效。',

  DISABLE_LOG_COLLECTION: '停用日志收集',

  SELECT_CLUSTER_DESC: '选择要创建项目的集群。',
  CLUSTER_EMPTY_DESC: '请选择一个集群。',

  'Project Member': '项目成员',

  'Number of volumes': '存储卷（数量）',

  FEDPROJECT_CANNOT_ADD_CLUSTER: '没有可添加的集群。',

  DISABLE_LOG_COLLECTION_TIP:
    '您确定停用日志收集吗？您需要重启容器组副本才能使修改生效。',

  Usage: '使用情况',
  USAGE: '用量',
  PROJECTS_DESC:
    'KubeSphere 中的项目对应的是 Kubernetes 的 namespace，是对一组资源和对象的抽象集合，常用来将系统内部的对象划分为不同的项目组或用户组。',
  PROJECT_BASEINFO_DESC: '项目基础信息设置',
  PROJECT_ADVANCE_DESC: '设置项目资源默认请求',

  PROJECT_TYPES_PROJECT_TITLE: '创建资源型项目',
  PROJECT_TYPES_PROJECT_DESC:
    'KubeSphere 中的项目对应的是 Kubernetes 的 namespace，是对一组资源和对象的抽象集合，可以根据不同的业务部门或者产品项目进行资源分组。',
  PROJECT_TYPES_DEVOPS_TITLE: '创建一个 DevOps 项目',
  PROJECT_TYPES_DEVOPS_DESC: '持续、自动地构建/测试软件项目。',

  PROJECT_ASSIGN_DESC: '项目被分配到企业空间后不允许变更项目所属的企业空间。',

  'Invite Members to the Project': '邀请成员到该项目',
  INVITE_DEVOPS_MEMBER: '邀请成员到该 DevOps 项目',
  INVITE_MEMBER_DESC: '邀请当前企业空间的成员到当前项目。',
  PROJECT_MEMBER_EMPTY_DESC: '请邀请当前企业空间的成员到当前项目。',
  INVITE_MEMBER_DESC_DEVOPS: '邀请当前企业空间的成员到当前 DevOps 项目。',
  INVITE_MEMBER_SEARCH_PLACEHOLDER: '输入用户名邀请项目成员',
  ASSIGN_ROLE: '分配角色',
  PROJECT_ADMIN_DESC: '可以指定项目内一个成员为管理员',

  ENABLE_GATEWAY_DESC:
    '在创建应用路由之前，需要先开启外网访问入口，即网关。这一步是创建对应的应用路由控制器，负责将请求转发到对应的后端服务。',

  DELETE_INTERNET_ACCESS_TITLE: '删除外网访问设置',
  DELETE_INTERNET_ACCESS_DESC:
    '您确定删除外网访问设置吗？删除设置后，您可以重新设置外网访问。',

  NO_RELATE_PROJECTS_TITLE: '未发现与您相关联的项目',
  NO_RELATE_PROJECTS_DESC:
    '您可以创建或者联系项目管理员将您邀请到项目中开始您的工作',

  DELETE_PROJECT_TIP:
    '确定删除项目 <strong>{resource}</strong> ? 删除后将无法恢复, 项目下的资源也同时会被销毁。',

  'default request CPU should not be greater than default limit CPU':
    '最低保证可以使用的 CPU 数不应大于限制使用的 CPU 数',
  'default request memory should not be greater than default limit memory':
    '最低保证可以使用的内存不应大于限制使用的内存',

  'Empty value means no limit, CPU 1 Core = 1000m':
    '值为空表示不限制, CPU 1核 = 1000m',

  PROJECT_NAME_EXISTS_IN_HOST:
    '项目名称在主集群中已经存在，请输入其他项目名称。',

  MULTI_CLUSTER_PROJECT_DELETE_TIP:
    '删除多集群项目同时也会删除依赖于主集群上的同名项目,</br>请输入{type}名称 <strong>{resource}</strong> 确保您已了解操作所带来的风险。',

  DEFAULT_RESOURCE_UNIT_DESC: 'CPU无单位时为核数, 1核 = 1000m',
  DEFAULT_RESOURCE_ALERT:
    '创建工作负载时，如未设置工作负载的资源使用限制，将默认使用此设置。如无特殊需求，请保持此设定默认。',

  QUOTA_EDIT_TIP: '值为空时将不限制配额',

  PROJECT_BASIC_INFO_DESC:
    '基本信息提供项目的信息概览，您可以查看项目的信息以及默认容器配额。',
  PROJECT_ADVANCED_SETTINGS_DESC:
    '高级设置用于配置项目的外网访问、应用治理以及日志收集功能。',
  PROJECT_MEMBERS_DESC: '对项目内的成员进行管理及角色分配',
  PROJECT_ROLE_DESC: '项目角色定义了在当前项目下用户所拥有的权限。',
  SERVICE_ACCOUNT_PROJECT_ROLE_DESC: '选择服务帐户在当前项目中的角色。',
  PROJECT_ROLE_EMPTY_DESC: '请创建一个项目角色。',
  COLLECTING_FILE_LOG_DESC:
    '对容器内的落盘日志进行收集，并转发到标准输出，然后由日志收集系统统一采集。',

  HOW_TO_USE_QUOTA_Q: '如何使用资源配额?',
  HOW_TO_USE_QUOTA_A:
    '资源配额是用来限制资源用量的一种机制，您可以通过<b>编辑项目</b>来编辑项目资源配额和默认容器配额。',
  PROJECT_QUOTAS_DESC:
    '项目配额用于指定项目中可用的 CPU 和内存资源数量和容器组、部署、服务等应用资源的最大数量。',
  DEFAULT_CONTAINER_QUOTAS_DESC:
    '默认容器配额用于指定项目中创建的容器的默认 CPU 预留、CPU 限制、内存预留和内存限制。',

  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_Q: '什么是默认容器配额?',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_A:
    '默认容器配额用于指定项目中创建的容器的默认 CPU 预留、CPU 限制、内存预留和内存限制。',

  WHAT_IS_INTERNET_GATEWAY: '什么是外网访问网关?',
  COLLECT_LOGS_ON_VOLUMES_A:
    '如需收集存储卷上的日志，请为容器挂载读写模式的存储卷并设置容器将日志导出到存储卷。',

  HOW_TO_INVITE_MEMBER_Q: '如何邀请成员到项目？',
  HOW_TO_INVITE_MEMBER_A:
    '项目管理员或者拥有成员邀请权限的用户可以邀请当前企业空间内的成员加入项目。',

  HOW_TO_INVITE_USERS: '如何邀请用户到当前项目中？',
  HOW_TO_SET_PROJECT_GATEWAY: '如何设置项目网关？',
  RESOURCE_QUANTITY_LIMIT: '资源数量限制',

  PROJECT_TYPES_Q: '项目中的服务如何通过外网访问？',
  PROJECT_TYPES_A:
    '项目网关负责创建对应的应用路由控制器，用来负责将请求转发到对应的后端服务；开启项目网关后可以将服务通过 Ingress 暴露给外网访问。',

  PROJECT_CLUSTER_SETTINGS_DESC:
    '为项目选择至少一个集群。如果选择多个集群，主集群上将创建同名项目。',
  NETWORK_ISOLATED_DESC: '设置网络隔离策略',

  PROJECT_NAME_EXISTS_IN_CLUSTER:
    '项目名称在在 {cluster} 集群中已存在，请输入其他项目名称。',

  MULTI_CLUSER_PROJECT_TIP:
    '当前项目跨多个集群部署。您可以点击一个集群以查看项目在该集群中的设置。',

  MULTI_CLUSTER_RESOURCE_TIP:
    '当前资源跨多个集群部署。您可以点击一个集群以查看资源在该集群中的设置。',

  FEDPROJECT_RESOURCE_TIP:
    '无法在集群管理内创建多集群项目的资源, 请到多集群项目页面内进行操作。',
  FEDPROJECT_CANNOT_DEPLOY_APP_TIP: '无法在多集群项目中部署应用。',

  FED_HOST_NAMESPACE_TIP: '该项目与多集群项目关联, 请勿修改此项目中的资源。',

  CREATE_MULTI_CLUSTER_PROJECT_DESC:
    '您可以创建多集群项目，让项目运行在多个集群中，为应用提供快速迭代开发的容器环境并实现高可用。',

  // Jobs
  running: '运行中',

  // Custom Monotoring
  CUSTOM_MONITORING_DASHBOARD_LOW: '自定义监控面板',

  // Basic Information
  PROJECT_NAME_SCAP: '项目名称',
  PROJECT_ROLE_SCAP: '项目角色',
  PROJECT_ROLE_SCAP_PL: '项目角色',
  PROJECT_MEMBER_SCAP: '项目成员',
  PROJECT_MEMBER_SCAP_PL: '项目成员',
  CPU_REQUEST_LOW: 'CPU 预留',
  CPU_LIMIT_LOW: 'CPU 限制',
  MEMORY_REQUEST_SCAP: '内存预留',
  MEMORY_LIMIT_SCAP: '内存限制',
  CPU_REQUEST_CORE: '{value} 核',
  CPU_LIMIT_CORE: '{value} 核',
  MEMORY_REQUEST_MIB: '{value} Mi',
  MEMORY_LIMIT_MIB: '{value} Mi',
  WS_RESOURCE_REQUESTS: '资源预留',
  WS_RESOURCE_LIMITS: '资源限制',
  SELECT_RESOURCE_TIP: '请选择资源或输入资源名称',
  NUMBER_OF_ROUTES: '应用路由数量',
  NUMBER_OF_SECRETS: '保密字典数量',
  NUMBER_OF_CONFIGMAPS: '配置字典数量',

  // Project Members
  PROJECT_MEMBER: '项目成员',
  PROJECT_MEMBER_DESC:
    '项目成员可以查看或管理项目资源。项目管理员可以邀请企业空间成员至该项目并对项目成员进行管理。',

  // Advanced Settings
  REMOVE: '移除',
  DISABLED: '未开启',
  ENABLE: '开启',
  DISABLE: '关闭',
  ENABLE_GATEWAY_TIP: '要使用网关，请在集群或项目中配置网关',

  // Network Isolation
  INGRESS: '入站',
  INTERNAL_TRAFFIC_DIRECTION_DESC:
    '出站表示从当前项目到其他项目的方向。入站表示从其他项目到当前项目的方向。',
  NETWORK_SEGMENT_EXAMPLE: '例如：10.0.0.0',
  PORT_EXAMPLE: '例如：80',
}
