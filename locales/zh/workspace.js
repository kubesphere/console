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
  WORKSPACE: '企业空间',
  WORKSPACE_PL: '企业空间',
  WORKSPACE_LOW: '企业空间',
  Workspaces: '企业空间',
  WORKSPACE_SETTINGS: '企业空间设置',
  'Workspace Settings': '企业空间设置',
  'Workspace Members': '企业空间成员',
  WORKSPACE_MEMBER: '企业空间成员',
  WORKSPACE_MEMBER_PL: '企业空间成员',
  WORKSPACE_MEMBER_TCAP: '企业空间成员',
  WORKSPACE_MEMBER_TCAP_PL: '企业空间成员',
  WORKSPACE_ROLE_PL: '企业空间角色',
  'Workspace Role': '企业空间角色',
  CREATE_WORKSPACE_ROLE: '创建企业空间角色',
  'Edit Workspace Role': '编辑企业空间角色',
  'Workspace Name': '企业空间名称',
  'Workspace Logo': '企业空间 Logo',
  'Workspaces Manager': '企业空间管理员',
  CREATE_WORKSPACE: '创建企业空间',
  DEPARTMENT_MANAGEMENT: '部门管理',
  SET_DEPARTMENTS: '设置部门',
  DEPARTMENT_PL: '部门管理',
  'Maintain Organization': '维护组织结构',

  devops: 'DevOps 项目',

  'Project Number': '项目数量',
  'DevOps Project Number': 'DevOps 项目数量',
  EDIT_QUOTAS: '编辑配额',

  EDIT_WORKSPACE_QUOTAS: '编辑企业空间配额',
  'Edit Workspace Quota': '企业空间配额',

  'View Workspace': '进入企业空间',
  DELETE_WORKSPACE: '删除企业空间',

  WORKSPACE_INFO: '企业空间信息',

  'Manage Organizations': '管理组织结构',

  'Involved Projects': '参与项目',
  'Created Projects': '创建的项目',
  'Workspace name exists': '企业空间名称已存在',
  'The current name is not applicable.': '当前名称不可用',

  'Cluster Authorization Info': '集群授权信息',
  WS_NETWORK_ISOLATION: '企业空间网络隔离',

  NO_AVAILABLE_CLUSTER: '未发现可用集群',
  NETWORK_POLICY_UNINSATLLED_DESC: '该集群未安装网络策略组件。',

  'All members': '全部成员',
  Assigned: '已分配',

  WORKSPACE_OVERVIEW_DESC:
    '企业空间为 KubeSphere 提供了安全隔离的、具有访问权限控制的工作平台。这里您可以看到当前企业空间内资源运行的概况。',

  WORKSPACE_DESC:
    '企业空间是一个组织您的项目和 DevOps 项目、管理资源访问权限以及在团队内部共享资源等的逻辑单元，可以作为团队工作的独立工作空间。',

  WORKSPACE_SEARCH_PLACEHOLDER: '请输入企业空间名称进行查找',

  WORKSPACE_CREATE_DESC: '设置企业空间的基本信息。',

  WORKSPACE_NAME_DESC:
    '请尽量保持名称简短，比如用企业名称的缩写或者大家经常的称呼，无需使用企业的完整名称或者营业执照上的注册名称。',

  WORKSPACE_ROLE_DESC: '企业空间角色定义了在当前企业空间下用户所拥有的权限。',
  WORKSPACE_ROLE_EMPTY_DESC: '请创建一个企业空间角色。',
  WORKSPACE_LOGO_PLACEHOLDER:
    '企业标志尺寸必须小于 200px X 200px，支持 png，jpg 格式。建议从上传透明背景的 PNG 格式图片以达到最佳展示效果。',

  'Remove from Workspace': '从企业空间移除',
  WORKSPACE_NAME_EMPTY_DESC: '请输入企业空间名称。',

  NO_WORKSPACE_TIP:
    '您的帐户目前不属于任何企业空间，请您创建一个企业空间或者联系管理员邀请您到其企业空间内进行工作',

  SEARCH_WORKSPACE_TIP: '请输入企业名称进行查找',

  WORKSPACE_MEMBER_DESC:
    '企业空间成员可以查看或管理企业空间资源。您可以管理企业空间中的成员并控制成员权限。',
  INVITE_WORKSPACE_MEMBER_SEARCH_PLACEHODLER: '输入用户名邀请企业空间成员',
  INVITE_WORKSPACE_MEMBER_DESC: '邀请用户到当前企业空间。',

  DELETE_WORKSPACE_TIP:
    '确定删除企业空间 <strong>{resource}</strong> ? 删除后将无法恢复, 企业空间下的资源也同时会被销毁。',

  DELETE_WORKSPACE_DESC:
    '企业空间删除后将无法恢复, 企业空间下的资源也同时会被销毁。',

  WORKSPACE_BASE_INFO_Q1: '如何为企业空间申请更多的集群？',
  WORKSPACE_BASE_INFO_A1: '请联系平台管理员或集群管理员来申请更多的集群。',
  WORKSPACE_BASE_INFO_Q2: '如何定义网络策略?',
  WORKSPACE_BASE_INFO_A2: '',

  WORKSPACE_CLUSTERS_DESC: '集群信息是企业空间对集群资源的使用情况的统计',

  HOW_TO_APPLY_MORE_CLUSTER_Q: '如何为企业空间申请更多的集群？',
  HOW_TO_APPLY_MORE_CLUSTER_A: '请联系平台管理员或集群管理员以申请更多集群。',

  NO_CLUSTER_AVAILABLE_DESC:
    '未发现可用的集群。请在企业空间创建完成后，联系平台管理员或集群管理员将一个集群授权给该企业空间。',
  WORKSPACE_NO_CLUSTER_TIP:
    '请联系平台管理员或者集群管理员将一个集群授权给企业空间。',

  DEPARTMENT_MANAGEMENT_DESC:
    '企业空间中的部门是用来管理权限的逻辑单元。您可以在部门中设置企业空间角色、多个项目角色以及多个 DevOps 项目角色，还可以将用户分配到部门中以批量管理用户权限。',
  DEPARTMENT_EMPTY_DESC: '没有可用部门',
  WORKSPACE_GROUP_USER_EMPTY_DESC: '未发现可分配的成员',
  WORKSPACE_QUOTAS_DESC:
    '企业空间配额用于管理企业空间中所有项目和 DevOps 项目的总资源用量。',

  DELETE_WORKSPACE_PROJECTS_DESC: '删除企业空间中的项目',
  DELETE_WORDSPACE_RELATED_RESOURCES_DESC: '删除该企业空间关联项目',

  // App Repositories
  ACCESS_KEY_ID: '访问密钥 ID',
  SECRET_ACCESS_KEY: '秘密访问密钥',

  // Basic Information
  WORKSPACE_BASIC_INFO_DESC:
    '基本信息提供企业空间的信息概览，您可以查看企业空间的基本信息。',
  SURE_TO_DELETE_WORKSPACE: '您确定删除企业空间吗？',
  ON: '开启',
  OFF: '关闭',
  ONLINE: '上线',
  OFFLINE: '下线',
  WS_MEMBER_SCAP: '企业空间成员',
  WS_MEMBER_SCAP_PL: '企业空间成员',

  // Quota Management
  QUOTA_MANAGEMENT: '配额管理',
  RESOURCE_LIMIT: '资源限制',
  USED_PERCENT: '已使用：{percent}%',

  // Worksapce Members
  CHANGE_MEMBER_ROLE: '修改成员角色',
  INVITE_MEMBER: '邀请成员',
  INVITE: '邀请',
  WORKSPACE_MEMBERS: '企业空间成员',

  // Department Management
  'Workspace Groups': '部门管理',
  NOT_ASSIGNED_TCAP: '未分配',
  ASSIGNED: '已分配',
  WORKSPACE_ROLE: '企业空间角色',
  WORKSPACE_MEMBER_EMPTY_DESC: '请邀请一个用户到当前企业空间。',
  PROJECT_VALUE: '项目：{value}',
  PROJECT_ROLE_VALUE: '项目角色：{value}',
  DEVOPS_VALUE: 'DevOps 项目：{value}',
  DEVOPS_PROJECT_ROLES_VALUE: 'DevOps 项目角色：{value}',

  // Workspace Members > Details
  REMOVE_MEMBER_PL: '移除成员',
}
