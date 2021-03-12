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
  Workspace: '企业空间',
  Workspaces: '企业空间',
  'Workspace Settings': '企业空间设置',
  'Workspace Members': '企业成员',
  'Workspace Roles': '企业角色',
  'Workspace Role': '企业角色',
  'Create Workspace Role': '创建企业角色',
  'Edit Workspace Role': '编辑企业角色',
  'Workspace Name': '企业空间名称',
  'Workspace Logo': '企业空间 Logo',
  'Workspace Manager': '企业空间管理员',
  'Workspaces Manager': '企业空间管理员',
  'Create Workspace': '创建企业空间',
  'Workspace Groups': '企业组织',
  'Maintain Organization': '维护组织结构',

  projects: '项目',
  devops: 'DevOps 工程',

  'Project Number': '项目数量',
  'DevOps Project Number': 'DevOps 工程数量',
  'Edit Quota': '编辑配额',

  'Workspace Quota': '企业空间配额',
  'Edit Workspace Quota': '企业空间配额',

  'View Workspace': '进入企业空间',
  'Delete Workspace': '删除企业空间',

  'Workspace Info': '企业空间信息',

  'Manage Organizations': '管理组织结构',

  'Involved Projects': '参与项目',
  'Created Projects': '创建的项目',
  'Workspace name exists': '企业空间名称已存在',
  'The current name is not applicable.': '当前名称不可用',

  'Cluster Authorization Info': '集群授权信息',
  'Workspace Network Isolation': '企业空间网络隔离',

  'Cluster Info': '集群信息',

  'No Available Cluster': '暂时没有可用集群',
  'Network module is not installed': '网络模块未安装',

  'All members': '全部成员',
  Assigned: '已分配',

  WORKSPACE_OVERVIEW_DESC:
    '企业空间为 KubeSphere 提供了安全隔离的、具有访问权限控制的工作平台。这里您可以看到当前企业空间内资源运行的概况。',

  WORKSPACE_DESC:
    '企业空间是一个组织您的项目和 DevOps 工程、管理资源访问权限以及在团队内部共享资源等的逻辑单元，可以作为团队工作的独立工作空间。',

  WORKSPACE_SEARCH_PLACEHOLDER: '请输入企业空间名称进行查找',

  WORKSPACE_CREATE_DESC:
    '企业空间是一个组织您的项目和 DevOps 工程、管理资源访问权限以及在团队内部共享资源等的逻辑单元，可以作为团队工作的独立工作空间。',

  WORKSPACE_NAME_DESC:
    '请尽量保持名称简短，比如用企业名称的缩写或者大家经常的称呼，无需使用企业的完整名称或者营业执照上的注册名称。',

  WORKSPACE_ROLE_DESC: '企业角色定义了在当前企业空间下用户所拥有的权限。',
  WORKSPACE_LOGO_PLACEHOLDER:
    '企业标志尺寸必须小于 200px X 200px，支持 png，jpg 格式。建议从上传透明背景的 PNG 格式图片以达到最佳展示效果。',

  'Remove from Workspace': '从企业空间移除',
  'Please input workspace name': '请输入企业空间名称',

  NO_WORKSPACE_TIP:
    '您的帐户目前不属于任何企业空间，请您创建一个企业空间或者联系管理员邀请您到其企业空间内进行工作',

  SEARCH_WORKSPACE_TIP: '请输入企业名称进行查找',

  'Invite members to the workspace': '邀请成员到该企业空间',
  WORKSPACE_MEMBER_DESC:
    '对企业空间内的成员进行管理及角色分配。项目可以邀请当前企业空间内的企业成员作为项目成员，协同工作。',
  INVITE_WORKSPACE_MEMBER_DESC: '您可以邀请新的成员来您的企业空间',
  INVITE_WORKSPACE_MEMBER_SEARCH_PLACEHODLER: '输入用户名邀请企业空间成员',

  DELETE_WORKSPACE_TIP:
    '确定删除企业空间 <strong>{resource}</strong> ? 删除后将无法恢复, 企业空间下的资源也同时会被销毁。',

  DELETE_WORKSPACE_DESC: '删除后将无法恢复, 企业空间下的资源也同时会被销毁。',
  SURE_TO_DELETE_WORKSPACE: '确定删除企业空间',

  WORKSPACE_BASE_INFO_Q1: '如何为企业空间申请更多的集群？',
  WORKSPACE_BASE_INFO_A1:
    '集群由平台管理员以及集群管理员共同运营维护，如果您需要使用更多的集群请联系您的平台管理员，或者提交申请',
  WORKSPACE_BASE_INFO_Q2: '如何定义网络策略?',
  WORKSPACE_BASE_INFO_A2: '',

  WORKSPACE_CLUSTERS_DESC: '集群信息是企业空间对集群资源的使用情况的统计',

  HOW_TO_APPLY_MORE_CLUSTER_Q: '如何为企业空间申请更多的集群？',
  HOW_TO_APPLY_MORE_CLUSTER_A:
    '集群由平台管理员以及集群管理员共同运营维护，如果您需要使用更多的集群请联系您的平台管理员，或者提交申请',

  NO_PUBLIC_CLUSTER_TIP:
    '暂无可用的公开集群, 请在企业空间创建完毕后, 向平台管理员或集群管理员申请集群的授权',
  WORKSPACE_NO_CLUSTER_TIP:
    '您需要联系平台管理员或者集群管理员为企业空间授权集群的访问权限',

  WORKSPACE_GROUP_DESC:
    '组织可以以用户组或者部门的形式授予项目以及 Devops 工程权限',
  WORKSPACE_GROUP_EMPTY_DESC:
    '暂时没有可用的组织机构，请先维护组织机构后添加成员',
  WORKSPACE_GROUP_USER_EMPTY_DESC: '暂时没有可分配的成员',
  WORKSPACE_QUOTA_MANAGE_DESC:
    '管理企业空间配额，企业空间下的所有项目 / DevOps 工程将共享这些配额',
}
