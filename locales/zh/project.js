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
  Deployment: '部署',
  StatefulSet: '有状态副本集',
  DaemonSet: '守护进程集',
  Service: '服务',
  LoadBalancer: '负载均衡',
  Volume: '存储卷',
  Terminating: '删除中',
  Deleting: '删除中',
  'Create Project': '创建项目',
  'Create Multi-cluster Project': '创建多集群项目',
  'Edit Project': '编辑项目',
  Details: '详情',
  Members: '成员',
  'Project Roles': '项目角色',
  'Project Role': '项目角色',
  projects: '项目',
  Projects: '项目',
  'Project Overview': '项目预览',
  'Members Management': '成员管理',
  'Project Manager': '项目管理员',
  'Manage Project': '项目管理',
  'Resource Quota': '资源配额',
  'Project Name': '项目名称',
  'Project Members': '项目成员',
  'project members': '项目成员',
  'Member Name': '成员名称',
  'Modify Member Role': '修改成员角色',
  'Modify Members Role': '修改成员角色',
  'Remove Members': '移除成员',
  'Remove Member': '移除成员',
  'Invite Member': '邀请成员',
  'Gateway Info': '网关信息',
  'Set Gateway': '设置网关',
  'Edit Gateway': '编辑网关',

  'Gateway Not Set': '网关未设置',

  'Delete Project': '删除项目',
  'Project Info': '项目信息',
  'Project Quota': '项目配额',
  'Quota Management': '配额管理',

  'Project Quota Not Set': '项目配额未设置',
  'Resource Default Request Not Set': '容器资源默认请求未设置',

  'Project Placement': '项目位置',

  'Multi-cluster Project': '多集群项目',
  'Multi-cluster Projects': '多集群项目',

  Opened: '已开启',
  Closed: '已关闭',

  PROJECT_CREATE_DESC:
    'KubeSphere 中的项目对应的是 Kubernetes 的 namespace，是对一组资源和对象的抽象集合，常用来将系统内部的对象划分为不同的项目组或用户组。',
  PROJECT_NAME_DESC: '项目名只能包含小写字母、数字及分隔符("-")',
  'Please input project name': '请输入项目名',
  'Invalid project name': '项目名格式不合法',
  'Project name exists': '项目名已存在',

  DELETE_MEMBER_TIP:
    '确定移除成员 <strong>{name}</strong> ? 移除后该成员将无法访问本项目。',

  'DevOps Project': 'DevOps 工程',
  'DevOps Projects': 'DevOps 工程',
  'Select Project Type': '选择项目类型',

  'Edit Project Quota': '编辑项目配额',
  'Add Quota Item': '添加配额项',

  'Network Isolation': '网络隔离',

  deployments: '部署',
  statefulsets: '有状态副本集',
  daemonsets: '守护进程集',
  jobs: '任务',
  cronjobs: '定时任务',
  pods: '容器组',

  'requests.cpu': 'CPU 需求',
  'limits.cpu': 'CPU 限额',
  'requests.memory': '内存需求',
  'limits.memory': '内存限额',

  'Container Resource Default Request': '容器资源默认请求',
  'Edit Resource Default Request': '编辑资源默认请求',

  'Resource Type': '资源类型',

  'Help Information': '帮助信息',

  'Enter Project': '进入项目',
  'Enter DevOps Project': '进入工程',
  Project_Admin: '工程管理员',
  'No Platform Manage Authorization': '无平台管理权限',

  'Default limit resource': '默认最大使用资源',
  'Default request resource': '默认最小使用资源',

  'Assign Workspace': '分配企业空间',
  'Target Workspace': '目标企业空间',
  'Choose a workspace': '选择一个企业空间',
  'Not Assigned': '未分配',
  'Select a user of the workspace as the manager of the project.':
    '选择企业空间的用户作为管理员。',

  'Disk Log Collection': '落盘日志收集',

  'Are you sure to disable it?': '确认关闭？',
  'Disk Log Collection of the project is about to be disabled.':
    '项目的落盘日志收集即将关闭.',

  'Select the cluster to create the project.': '选择要创建项目的集群.',

  'Project Member': '项目成员',

  CLOSE_FILE_LOG_TIP:
    '落盘日志收集即将关闭。 关闭后，已开启落盘日志收集的服务在容器组副本重启前将继续进行落盘日志的收集，重启后，将不再收集。</br>如果需要再次收集，请开启落盘日志收集，并重起容器组副本。',

  Usage: '使用情况',

  PROJECTS_DESC:
    'KubeSphere 中的项目对应的是 Kubernetes 的 namespace，是对一组资源和对象的抽象集合，常用来将系统内部的对象划分为不同的项目组或用户组。',
  PROJECT_BASEINFO_DESC: '项目基础信息设置',
  PROJECT_ADVANCE_DESC: '设置项目资源默认请求',

  PROJECT_TYPES_PROJECT_TITLE: '创建资源型项目',
  PROJECT_TYPES_PROJECT_DESC:
    'KubeSphere 中的项目对应的是 Kubernetes 的 namespace，是对一组资源和对象的抽象集合，可以根据不同的业务部门或者产品项目进行资源分组。',
  PROJECT_TYPES_DEVOPS_TITLE: '创建一个 DevOps 工程',
  PROJECT_TYPES_DEVOPS_DESC: '持续、自动地构建/测试软件项目。',

  PROJECT_ASSIGN_DESC: '项目一旦被分配到企业空间后将不允许修改企业空间',

  'Invite Members to the Project': '邀请成员到该项目',
  'Invite Members to the DevOps Project': '邀请成员到该工程',
  INVITE_MEMBER_DESC: '您可以邀请新的成员来协助您的项目',
  INVITE_MEMBER_DESC_DEVOPS: '您可以邀请新的成员来协助您的工程',
  INVITE_MEMBER_SEARCH_PLACEHODLER: '输入用户名邀请项目成员',
  INVITE_MEMBER_CHOOSE_ROLE_TIP: '请选择一个角色赋予该成员',
  PROJECT_ADMIN_DESC: '可以指定项目内一个成员为管理员',

  PROJECT_INTERNET_ACCESS_DESC:
    '在创建应用路由之前，需要先启用外网访问入口，即网关。这一步是创建对应的应用路由控制器，用来负责将请求转发到对应的后端服务。',

  DELETE_INTERNET_ACCESS_TITLE: '确定删除外网访问设置?',
  DELETE_INTERNET_ACCESS_DESC: '删除后可重新绑定',

  NO_RELATE_PROJECTS_TITLE: '没有找到与您相关联的项目',
  NO_RELATE_PROJECTS_DESC:
    '您可以创建或者联系项目管理员将您邀请到项目中开始您的工作',

  DELETE_PROJECT_TIP:
    '确定删除项目 <strong>{resource}</strong> ? 删除后将无法恢复, 项目下的资源也同时会被销毁。',

  'default request CPU should not be greater than default limit CPU':
    '最低保证可以使用的 CPU 数不应大于限制使用的 CPU 数',
  'default request memory should not be greater than default limit memory':
    '最低保证可以使用的内存不应大于限制使用的内存',

  'Empty value means no limit, CPU 1 Core = 1000m':
    '值为空表示无限制, CPU 1核 = 1000m',

  'The project name exists on the host cluster.': '项目名在 Host 集群上已存在',

  MULTI_CLUSTER_PROJECT_DELETE_TIP:
    '删除多集群项目同时也会删除依赖于 Host 集群上的同名项目,</br>请输入{type}名称 <strong>{resource}</strong> 确保您已了解操作所带来的风险。',

  DEFAULT_RESOURCE_UNIT_DESC: 'CPU无单位时为核数, 1核 = 1000m',
  DEFAULT_RESOURCE_ALERT:
    '创建工作负载时，如未设置工作负载的资源使用限制，将默认使用此设置。如无特殊需求，请保持此设定默认。',

  QUOTA_EDIT_TIP: '值为空时将不限制配额',

  PROJECT_BASIC_INFO_DESC: '项目的基本信息涵盖了项目名称及项目的配额状态',
  PROJECT_QUOTA_MANAGE_DESC: '管理项目的配额',
  PROJECT_ADVANCED_SETTINGS_DESC:
    '对项目中的外网访问网关以及服务治理和落盘日志收集等配置进行设置',
  PROJECT_MEMBERS_DESC: '对项目内的成员进行管理及角色分配',
  PROJECT_ROLE_DESC: '项目角色定义了在当前项目下用户所拥有的权限',
  COLLECTING_FILE_LOG_DESC:
    '对容器内的落盘日志进行收集，并转发到标准输出，然后由日志收集系统统一采集。',

  HOW_TO_USE_QUOTA_Q: '如何使用配额?',
  HOW_TO_USE_QUOTA_A:
    '资源配额 (ResourceQuota) 是用来限制用户资源用量的一种机制，可以对 CPU、内存、容器组数量等进行配额限制。',

  WHAT_IS_LIMIT_RANGE_Q: '什么是容器资源默认请求?',
  WHAT_IS_LIMIT_RANGE_A:
    '容器资源默认请求 (LimitRange) 基于项目的资源管理，包括容器组和容器的保留资源、最大限额等。',

  WHAT_IS_INTERNET_GATEWAY: '什么是外网访问网关?',
  WHAT_IS_COLLECT_FILE_LOG_A:
    '容器所挂载的存储卷中的日志路径以 glob 方式给出，可在工作负载中配置日志路径以收集这些日志。需要管理员预先开启落盘日志收集。',

  HOW_TO_INVITE_MEMBER_Q: '如何邀请成员？',
  HOW_TO_INVITE_MEMBER_A:
    '项目管理员或者拥有成员邀请权限的用户可以邀请当前企业空间内的成员加入项目',

  'How do I invite other members to the current project?':
    '邀请其他成员到当前项目中?',
  'How do I set the project gateway?': '如何设置项目网关？',
  'You can limit the number of resources. Blank means no limit.':
    '您可以对资源的数量进行限制, 不填即不限制',

  PROJECT_TYPES_Q: '项目中的服务如何通过外网访问？',
  PROJECT_TYPES_A:
    '项目网关负责创建对应的应用路由控制器，用来负责将请求转发到对应的后端服务；开启项目网关后可以将服务通过 Ingress 暴露给外网访问。',

  PROJECT_CLUSTER_SETTINGS_DESC:
    '选择要创建项目的集群. 当选择了多个集群时, 将创建多集群项目, 并会在 Host 集群上创建同名项目',
  NETWORK_ISOLATED_DESC: '设置网络隔离策略',

  NAME_EXIST_IN_CLUSTER: '项目名在集群 {cluster} 中已存在',

  MULTI_CLUSER_PROJECT_TIP:
    '当前项目为多集群项目，项目将分布在不同集群中共同来构成多集群项目，您可以切换到不同集群查看项目在该集群中的设置。',

  MULTI_CLUSER_RESOURCE_TIP:
    '当前资源为多集群资源，资源将分布在不同集群中共同来构成多集群资源，您可以切换到不同集群查看资源在该集群中的设置。',

  FEDPROJECT_RESOURCE_TIP:
    '无法在集群管理内创建多集群项目的资源, 请到多集群项目页面内进行操作。',
  FEDPROJECT_CANNOT_DEPLOY_APP_TIP: '无法在多集群项目里部署应用。',

  FED_HOST_NAMESPACE_TIP:
    '该项目为多集群项目的相关资源, 请勿在此项目下操作资源',

  MULTI_CLUSTER_PROJECT_CREATE_DESC:
    '您可以创建多集群项目，让项目运行在多个集群中，为应用提供快速迭代开发的容器环境并实现高可用。',
}
