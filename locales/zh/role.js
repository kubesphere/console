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
  roles: '角色',
  Roles: '角色',
  Role: '角色',
  'Role Management': '角色管理',
  'Account Role': '帐户角色',
  PLATFORM_ROLE: '平台角色',
  PLATFORM_ROLE_PL: '平台角色',
  'Platform Roles': '平台角色',
  'Account Roles': '帐户角色',
  CREATE_ROLE: '创建角色',
  'Edit Role': '编辑角色',
  'Project Details': '项目详情',
  'Cluster Role': '集群角色',
  'Authorization List': '权限列表',
  PERMISSIONS: '权限',
  'Authorized Users': '授权用户',
  'Authorization Settings': '权限设置',
  Cluster: '集群',
  Member: '成员',

  EDIT_PERMISSION: '编辑权限',
  WORKSPACE_ROLE_NAME_TIP: '角色的名称将作为角色的唯一标识符。',

  'Create Project Role': '创建项目角色',
  'Edit Project Role': '编辑项目角色',
  CREATE_PLATFORM_ROLE: '创建平台角色',
  'Edit Account Role': '编辑帐户角色',
  'Create Cluster Role': '创建集群角色',
  'Edit Cluster Role': '编辑集群角色',

  'Please specify role authorization': '请选择角色权限',

  'Role Name': '角色名称',
  'Role Type': '角色类型',
  ROLE_NAME_EMPTY_DESC: '请输入角色名称',
  'Invalid role name': '角色名称格式不合法',
  'Role name exists': '角色名已存在',
  MODULES: '功能模块',
  'Authorized Actions': '可执行操作',
  'No Authorization': '暂无权限规则',
  'Invited Successfully': '邀请成功',
  NO_AVAILABLE_ROLE: '当前项目无可用角色',
  JOIN_PROJECT_PLACEHOLDER: '输入用户名或者邮箱邀请用户加入到项目中',
  ROLE_DELETE_TIP: '当前角色已有用户绑定，请解绑后重试',
  ROLE_NO_AVAILABLE_TIP: '当前项目无可用角色',
  ROLE_PROJECTS_JOIN_TIP: '输入用户名或者邮箱邀请用户加入到项目中',
  ROLE_TYPE_DESC:
    '角色类型根据权限范围分为集群、项目两类，当前角色的授权为该项目范围。',

  DELETE_ROLE_TIP: '确定删除角色 <strong>{resource}</strong>?',
  ROLE_USERS_TIP:
    '当前角色有 <strong>{count}</strong> 名授权用户，请先移除授权用户或更改角色后再删除。',
  ROLE_USER_TIP:
    '当前角色有 <strong>{count}</strong> 名授权用户，请先移除授权用户或更改角色后再删除。',
  ROLE_USER_GROUPS_TIP:
    '当前角色已被分配给 <strong>{count}</strong> 个部门，请先移除授权部门或更改角色后再删除。',
  DEPENDS_ON: '依赖于：',
  'Clusters Management': '集群管理',
  CLUSTERS_MANAGEMENT: '集群管理',
  CLUSTERS_MANAGEMENT_DESC: '创建删除集群，管理所有集群下的资源',
  CLUSTERS_VIEW: '集群查看',
  CLUSTERS_VIEW_DESC: '查看 KubeSphere 平台中所有的集群及集群中所有的资源',
  USERS_MANAGEMENT: '帐户管理',
  USERS_MANAGEMENT_DESC: '支持帐户的管理，包括添加/删除/更新帐户信息',
  USERS_VIEW: '帐户查看',
  USERS_VIEW_DESC: '可以查看当前平台有哪些用户',
  ROLES_MANAGEMENT: '角色管理',
  ROLES_MANAGEMENT_DESC: '支持平台角色的管理，包括添加/删除/更新平台角色。',
  ROLES_VIEW: '角色查看',
  ROLES_VIEW_DESC: '可以查看当前平台有哪些角色',
  WORKSPACES_MANAGEMENT: '企业空间管理',
  WORKSPACES_MANAGEMENT_DESC:
    '支持企业空间的管理，包括添加/删除/编辑企业空间，查看平台的所有企业空间。',
  WORKSPACES_VIEW: '企业空间查看',
  WORKSPACES_VIEW_DESC: '可以查看用户当前授权的企业空间',
  APP_TEMPLATES_VIEW: '应用商店查看',
  APP_TEMPLATES_VIEW_DESC: '查看平台级别的应用商店',
  APP_TEMPLATES_MANAGEMENT: '应用商店管理',
  APP_TEMPLATES_MANAGEMENT_DESC:
    '管理平台级别的应用商店，对云原生应用的上架、下架以及审核等应用全生命周期的统一管理。',
  PLATFORM_SETTINGS_MANAGEMENT: '平台设置管理',
  PLATFORM_SETTINGS_MANAGEMENT_DESC: '管理平台设置',

  WORKSPACE_GROUPS_MANAGEMENT: '部门管理',
  WORKSPACE_GROUPS_MANAGEMENT_DESC: '管理企业空间部门的结构、成员和权限。',
  WORKSPACE_GROUPS_VIEW: '部门查看',
  WORKSPACE_GROUPS_VIEW_DESC: '查看企业空间部门的结构和成员。',
  WORKSPACE_ROLES_VIEW: '企业空间角色查看',
  WORKSPACE_ROLES_MANAGEMENT: '企业空间角色管理',
  WORKSPACE_ROLES_VIEW_DESC: '查看企业空间角色。',
  WORKSPACE_ROLES_MANAGEMENT_DESC:
    '创建、编辑和删除系统预置角色外的企业空间角色。',
  WORKSPACE_MEMBERS_VIEW: '企业空间成员查看',
  WORKSPACE_MEMBERS_MANAGEMENT: '企业空间成员管理',
  WORKSPACE_MEMBERS_VIEW_DESC: '查看企业空间成员。',
  WORKSPACE_MEMBERS_MANAGEMENT_DESC: '邀请、编辑和移除企业空间成员。',
  WORKSPACE_APP_REPOS_VIEW: '应用仓库查看',
  WORKSPACE_APP_REPOS_MANAGEMENT: '应用仓库管理',
  WORKSPACE_APP_REPOS_VIEW_DESC: '查看企业空间中的应用仓库。',
  WORKSPACE_APP_REPOS_MANAGEMENT_DESC: '创建、编辑和删除企业空间中的应用仓库。',
  WORKSPACE_APP_TEMPLATES_VIEW: '应用模板查看',
  WORKSPACE_APP_TEMPLATES_MANAGEMENT: '应用模板管理',
  WORKSPACE_APP_TEMPLATES_VIEW_DESC: '查看企业空间中的应用模板。',
  WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC:
    '上传、编辑和删除应用模板以及在平台应用商店上架和下架应用。',

  WORKSPACE_SETTINGS_VIEW: '企业空间设置查看',
  WORKSPACE_SETTINGS_MANAGEMENT: '企业空间设置管理',
  WORKSPACE_SETTINGS_DESC: '管理企业空间的基本信息、网络策略等设置。',
  WORKSPACE_SETTINGS_VIEW_DESC: '查看企业空间的基本信息、网络策略等设置。',
  WORKSPACE_SETTINGS_MANAGEMENT_DESC:
    '管理企业空间的基本信息、网络策略等设置。',

  PROJECTS_MANAGEMENT: '项目管理',
  PROJECTS_VIEW: '项目查看',
  'Federated Projects Management': '联邦项目管理',
  PROJECTS_CREATE: '项目创建',
  DEVOPS_MANAGEMENT: 'DevOps 工程管理',
  DEVOPS_VIEW: 'DevOps 工程查看',
  DEVOPS_CREATE: 'DevOps 工程创建',

  PROJECTS_MANAGEMENT_DESC: '创建、编辑和删除企业空间中的项目。',
  PROJECTS_CREATE_DESC: '创建项目。项目的管理员为项目的创建者。',
  PROJECTS_VIEW_DESC: '查看企业空间中的所有项目。',
  FEDERATED_PROJECTS_MANAGEMENT_DESC:
    '管理企业空间里的所有多集群项目，可以 创建/编辑/删除 多集群项目',
  DEVOPS_MANAGEMENT_DESC: '创建、编辑和删除企业空间中的 DevOps 工程。',
  DEVOPS_CREATE_DESC: '创建 DevOps 工程。DevOps 工程的管理员为工程的创建者。',
  DEVOPS_VIEW_DESC: '查看企业空间中的所有 DevOps 工程。',

  'Application Workloads View': '应用负载查看',
  'Application Workloads Management': '应用负载管理',
  APPLICATION_WORKLOADS_VIEW_DESC:
    '查看项目里的应用、服务、工作负载、任务、灰度发布和镜像构建器等资源',
  APPLICATION_WORKLOADS_MANAGEMENT_DESC:
    '创建/编辑/删除/项目里的应用、服务、工作负载、任务、灰度发布和镜像构建器等资源',
  'Volumes View': '存储卷查看',
  'Volumes Management': '存储卷管理',
  VOLUMES_VIEW_DESC: '查看项目里的存储卷',
  VOLUMES_MANAGEMENT_DESC: '创建/编辑/删除/项目里的存储卷',
  'Secrets View': 'Secrets 查看',
  'Secrets Management': 'Secrets 管理',
  SECRETS_VIEW_DESC: '查看项目里的Secrets',
  SECRETS_MANAGEMENT_DESC: '创建/编辑/删除/项目里的Secrets',
  'ConfigMaps View': '配置查看',
  'ConfigMaps Management': '配置管理',
  CONFIGMAPS_VIEW_DESC: '查看项目里的配置',
  CONFIGMAPS_MANAGEMENT_DESC: '创建/编辑/删除/项目里的配置',
  'ServiceAccount Management': '服务帐户管理',
  'ServiceAccount View': '服务帐户查看',
  SERVICEACCOUNT_MANAGEMENT_DESC: '创建/编辑/删除/项目里的服务帐户',
  SERVICEACCOUNT_VIEW_DESC: '查看项目里的服务帐户',
  'Alerting Policies View': '告警策略查看',
  'Alerting Policies Management': '告警策略管理',
  ALERTING_POLICIES_VIEW_DESC: '查看告警策略',
  ALERTING_POLICIES_MANAGEMENT_DESC: '创建/编辑/删除 告警策略',
  'Alerting Messages View': '告警消息查看',
  'Alerting Messages Management': '告警消息管理',
  ALERTING_MESSAGES_VIEW_DESC: '查看告警消息',
  ALERTING_MESSAGES_MANAGEMENT_DESC: '评论/删除 告警消息',
  'Custom Monitoring View': '自定义监控查看',
  'Custom Monitoring Management': '自定义监控管理',
  CUSTOM_MONITORING_VIEW_DESC: '查看自定义监控',
  CUSTOM_MONITORING_MANAGEMENT_DESC: '创建管理自定义监控',

  'Project Roles View': '角色查看',
  'Project Roles Management': '角色管理',
  PROJECT_ROLES_VIEW_DESC: '查看项目角色',
  PROJECT_ROLES_MANAGEMENT_DESC:
    '可以 创建/编辑/删除 项目角色，系统预置角色无法删除',
  'Project Members View': '成员查看',
  'Project Members Management': '成员管理',
  PROJECT_MEMBERS_VIEW_DESC: '查看项目成员',
  PROJECT_MEMBERS_MANAGEMENT_DESC: '邀请/编辑/移除项目成员',
  PROJECT_SETTINGS_DESC:
    '管理项目设置，编辑项目信息、外网访问、网络策略、资源配额、落盘日志收集配置等',

  CLUSTER_RESOURCES_MANAGEMENT: '集群资源管理',
  PROJECT_RESOURCES_MANAGEMENT: '项目资源管理',
  'Nodes View': '节点查看',
  NODES_VIEW_DESC: '查看节点信息',
  NODES_MANAGEMENT_DESC: '管理节点，停用/启用、污点管理等',
  'Components Management': '服务组件管理',
  COMPONENTS_MANAGEMENT_DESC: '管理集群的服务组件',
  'CRD Management': '自定义资源(CRD)管理',
  CRD_MANAGEMENT_DESC: '管理集群的自定义资源，可 查看/修改/删除 集群 CRD 资源',
  'Network Policies Management': '网络策略管理',
  'Network Policies View': '网络策略查看',
  NETWORK_POLICIES_MANAGEMENT_DESC: '创建/编辑/删除 集群网络策略',
  NETWORK_POLICIES_VIEW_DESC: ' 查看集群网络策略',
  'StorageClasses View': '存储类型查看',
  'StorageClasses Management': '存储类型管理',
  STORAGECLASSES_VIEW_DESC: '查看集群所有存储类型',
  STORAGECLASSES_MANAGEMENT_DESC: '创建/编辑/删除 存储类型，设置默认存储类型',
  'Volume Snapshots View': '存储快照查看',
  'Volume Snapshots Management': '存储快照管理',
  VOLUME_SNAPSHOTS_VIEW_DESC: '查看所有存储快照',
  VOLUME_SNAPSHOTS_MANAGEMENT_DESC: '创建/编辑/删除 存储快照',
  'Cluster Monitoring View': '集群监控查看',
  CLUSTER_MONITORING_VIEW_DESC: '查看集群物力资源，应用资源的监控数据',
  'Cluster Roles View': '角色查看',
  'Cluster Roles Management': '角色管理',
  CLUSTER_ROLES_VIEW_DESC: '查看集群角色',
  CLUSTER_ROLES_MANAGEMENT_DESC:
    '可以 创建/编辑/删除 集群角色，系统预置角色无法删除',
  'Cluster Members View': '成员查看',
  'Cluster Members Management': '成员管理',
  CLUSTER_MEMBERS_VIEW_DESC: '查看集群成员',
  CLUSTER_MEMBERS_MANAGEMENT_DESC: '邀请/编辑/移除集群成员',
  CLUSTER_SETTINGS_DESC:
    '管理集群设置，编辑集群信息，集群对企业空间的授权管理等',

  PIPELINE_MANAGEMENT: '流水线管理',
  'Pipelines View': '流水线查看',
  PIPELINES_MANAGEMENT_DESC:
    '管理 DevOps 工程流水线，包含 创建/编辑/删除 等操作.',
  PIPELINES_VIEW_DESC: '查看 DevOps 工程流水线，下载制品等.',
  'Credentials View': '凭证查看',
  CREDENTIALS_MANAGEMENT_DESC:
    '管理 DevOps 工程凭证，包含 创建/编辑/删除 等操作.',
  CREDENTIALS_VIEW_DESC: '查看与使用凭证',

  'DevOps Roles View': '角色查看',
  'DevOps Roles Management': '角色管理',
  DEVOPS_ROLES_VIEW_DESC: '查看 DevOps 工程角色',
  DEVOPS_ROLES_MANAGEMENT_DESC:
    '可以 创建/编辑/删除  DevOps 工程角色，系统预置角色无法删除',
  'DevOps Members View': '成员查看',
  'DevOps Members Management': '成员管理',
  DEVOPS_MEMBERS_VIEW_DESC: '查看 DevOps 工程成员',
  DEVOPS_MEMBERS_MANAGEMENT_DESC: '邀请/编辑/移除 DevOps 工程成员',
  DEVOPS_SETTINGS: 'DevOps 工程设置',
  DEVOPS_SETTINGS_DESC: '管理 DevOps 工程设置，编辑 DevOps 工程信息',

  'Default user role which allows a user to manage resources within the projects created by the user himself or invited by others. It does not allow the user to manage unauthorized resources in the cluster.':
    '默认用户角色，仅允许对自己创建或受邀加入的项目中的资源进行管理，无权操作集群范围内其他资源。',

  NO_AUTHORIZED_USERS: '目前没有用户被授权此角色',

  'Unable to delete preset role': '无法删除预置角色',

  ROLE_PLATFORM_ADMIN: '平台管理员，可以管理 KubeSphere 平台上的所有资源。',
  ROLE_PLATFORM_REGULAR:
    '平台普通用户，在被邀请加入企业空间之前没有任何资源操作权限。',
  ROLE_USERS_MANAGER: '平台用户管理员，可以管理 KubeSphere 平台上的所有用户。',
  ROLE_WORKSPACES_MANAGER:
    '平台企业空间管理员，可以管理 KubeSphere 平台上的所有企业空间。',

  ROLE_CLUSTER_ADMIN: '集群管理员，可以管理集群中所有的资源。',
  ROLE_CLUSTER_VIEWER: '集群观察者，可以查看集群下所有的资源。',

  ROLE_WORKSPACE_ADMIN: '企业空间管理员，可以管理企业空间中的所有资源。',
  ROLE_WORKSPACE_REGULAR: '企业空间普通成员，可以查看企业空间设置。',
  ROLE_WORKSPACE_VIEWER: '企业空间观察员，可以查看企业空间中的所有资源。',
  ROLE_WORKSPACE_SELF_PROVISIONER:
    '企业空间普通成员，可以查看企业设置、管理应用模板、创建项目和 DevOps 工程。',

  ROLE_PROJECT_ADMIN: '项目管理员，可以管理项目下所有的资源。',
  ROLE_PROJECT_OPERATOR: '项目维护者，可以管理项目下除用户和角色之外的资源。',
  ROLE_PROJECT_VIEWER: '项目观察者，可以查看项目下所有的资源。',

  ROLE_DEVOPS_ADMIN: 'DevOps 工程管理员，可以管理 DevOps 工程下所有的资源。',
  ROLE_DEVOPS_OPERATOR:
    'DevOps 工程普通成员，可以在 DevOps 工程下创建流水线凭证等。',
  ROLE_DEVOPS_VIEWER: 'DevOps 工程观察者，可以查看 DevOps 工程下所有的资源。',

  ACCOUNT_ROLE_DESC: '帐户角色可以定义平台内的帐户拥有的权限',
  ACCOUNT_ROLE_CREATE_DESC: '帐户角色可以定义平台内的帐户拥有的权限',

  NEXT_STEP: '下一步',
  NEXT_STEP_DESC: '您需要进一步编辑角色的权限。',

  RULE_RELATED_WITH: '当前权限被 {resource} 依赖，无法移除',
}
