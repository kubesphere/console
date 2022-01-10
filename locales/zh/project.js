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
  ADD_QUOTA: '添加配额',
  Closed: '已关闭',
  EDIT_DEFAULT_CONTAINER_QUOTA: '编辑默认容器配额',
  cronjobs: '定时任务',
  DaemonSet: '守护进程集',
  daemonsets: '守护进程集',
  'Default limit resource': '默认最大使用资源',
  'default request CPU should not be greater than default limit CPU': '最低保证可以使用的 CPU 数不应大于限制使用的 CPU 数',
  'default request memory should not be greater than default limit memory': '最低保证可以使用的内存不应大于限制使用的内存',
  'Default request resource': '默认最小使用资源',
  Deleting: '删除中',
  Deployment: '部署',
  deployments: '部署',
  Details: '详情',
  'DevOps Projects': 'DevOps 项目',
  DISK_LOG_COLLECTION: '落盘日志收集',
  EDIT_PROJECT: '编辑项目',
  'Empty value means no limit, CPU 1 Core = 1000m': '值为空表示不限制, CPU 1核 = 1000m',
  'Enter DevOps Project': '进入项目',
  'Enter Project': '进入项目',
  GATEWAY_PL: 'Gateways',
  'Help Information': '帮助信息',
  'Invalid project name': '项目名格式不合法',
  'Invite Member': '邀请成员',
  INVITE_DEVOPS_MEMBER: '邀请成员到该 DevOps 项目',
  'Invite Members to the Project': '邀请成员到该项目',
  jobs: '任务',
  LoadBalancer: '负载均衡',
  MANAGE_PROJECT: '管理项目',
  'Member Name': '成员名称',
  Members: '成员',
  'Members Management': '成员管理',
  'Modify Member Role': '修改成员角色',
  'Modify Members Role': '修改成员角色',
  'Multi-cluster Project': '多集群项目',
  'Multi-cluster Projects': '多集群项目',
  MULTI_CLUSTER_PROJECT_DELETE_TIP: '删除多集群项目同时也会删除依赖于主集群上的同名项目,</br>请输入{type}名称 <strong>{resource}</strong> 确保您已了解操作所带来的风险。',
  'No Platform Manage Authorization': '无平台管理权限',
  'Not Assigned': '未分配',
  Opened: '已开启',
  'Please input project name': '请输入项目名',
  pods: '容器组',
  'Project Member': '项目成员',
  'project members': '项目成员',
  'Project name exists': '项目名已存在',
  'Project Overview': '项目预览',
  'Project Placement': '项目位置',
  PROJECT_QUOTA: '项目配额',
  'Project Role': '项目角色',
  // Create Service Account Page
  Project_Admin: '项目管理员',
  Projects: '项目',
  projects: '项目',
  'Quota Management': '配额管理',
  'Remove Member': 'Remove Member',
  'Remove Members': '移除成员',
  REQUESTS_CPU: 'CPU 预留',
  REQUESTS_MEMORY: '内存预留',
  'Select Project Type': '选择项目类型',
  StatefulSet: '有状态副本集',
  statefulsets: '有状态副本集',
  'Target Workspace': '目标企业空间',
  Terminating: '删除中',
  Usage: '使用情况',
  Volume: '存储卷',
  'Number of volumes': '存储卷（数量）',
  RESOURCE_QUANTITY_LIMIT: '资源数量限制',
  PROJECTS_DESC: 'KubeSphere 中的项目对应的是 Kubernetes 的 namespace，是对一组资源和对象的抽象集合，常用来将系统内部的对象划分为不同的项目组或用户组。',
  PROJECT_ADVANCE_DESC: '设置项目资源默认请求',
  PROJECT_BASEINFO_DESC: '项目基础信息设置',
  PROJECT_TYPES_PROJECT_TITLE: '创建资源型项目',
  PROJECT_TYPES_PROJECT_DESC: 'KubeSphere 中的项目对应的是 Kubernetes 的 namespace，是对一组资源和对象的抽象集合，可以根据不同的业务部门或者产品项目进行资源分组。',
  PROJECT_TYPES_DEVOPS_TITLE: '创建一个 DevOps 项目',
  PROJECT_TYPES_DEVOPS_DESC: '持续、自动地构建/测试软件项目。',
  DELETE_MEMBER_TIP: '确定移除成员 <strong>{name}</strong> ? 移除后该成员将无法访问本项目。',
  PROJECT_ADMIN_DESC: '可以指定项目内一个成员为管理员',
  DELETE_INTERNET_ACCESS_TITLE: '删除外网访问设置',
  DELETE_INTERNET_ACCESS_DESC: '您确定删除外网访问设置吗？删除设置后，您可以重新设置外网访问。',
  NO_RELATE_PROJECTS_TITLE: '未发现与您相关联的项目',
  NO_RELATE_PROJECTS_DESC: '您可以创建或者联系项目管理员将您邀请到项目中开始您的工作',
  DEFAULT_RESOURCE_UNIT_DESC: 'CPU无单位时为核数, 1核 = 1000m',
  DEFAULT_RESOURCE_ALERT: '创建工作负载时，如未设置工作负载的资源使用限制，将默认使用此设置。如无特殊需求，请保持此设定默认。',
  QUOTA_EDIT_TIP: '值为空时将不限制配额',
  WHAT_IS_INTERNET_GATEWAY: '什么是外网访问网关?',
  COLLECTING_FILE_LOG_DESC: '对容器内的落盘日志进行收集，并转发到标准输出，然后由日志收集系统统一采集。',
  PROJECT_MEMBERS_DESC: '对项目内的成员进行管理及角色分配',
  PROJECT_ADVANCED_SETTINGS_DESC: '高级设置用于配置项目的外网访问、应用治理以及日志收集功能。',
  PROJECT_TYPES_Q: '项目中的服务如何通过外网访问？',
  PROJECT_TYPES_A: '项目网关负责创建对应的应用路由控制器，用来负责将请求转发到对应的后端服务；开启项目网关后可以将服务通过 Ingress 暴露给外网访问。',
  NETWORK_ISOLATED_DESC: '设置网络隔离策略',
  MULTI_CLUSER_PROJECT_TIP: '当前项目跨多个集群部署。您可以点击一个集群以查看项目在该集群中的设置。',
  // Custom Monotoring
  // Basic Information
  PROJECT_NAME_SCAP: '项目名称',
  WS_RESOURCE_REQUESTS: '资源预留',
  // Concatenated
  WS_RESOURCE_LIMITS: '资源限制',
  // Concatenated
  USAGE: '用量',
  // Project Members
  PROJECT_MEMBER: '项目成员'
};