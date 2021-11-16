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
  WORKSPACE: '企業空間',
  WORKSPACE_PL: 'Workspaces',
  WORKSPACE_LOW: 'workspace',
  Workspaces: '企業空間',
  WORKSPACE_SETTINGS: '企業空間設置',
  'Workspace Settings': '企業空間設置',
  'Workspace Members': '企業空間成員',
  WORKSPACE_MEMBER: 'Workspace Member',
  WORKSPACE_MEMBER_PL: 'Workspace Members',
  WORKSPACE_MEMBER_TCAP: 'Workspace member',
  WORKSPACE_MEMBER_TCAP_PL: 'Workspace members',
  WORKSPACE_ROLE_PL: '企業角色',
  'Workspace Role': '企業角色',
  CREATE_WORKSPACE_ROLE: '創建企業角色',
  'Edit Workspace Role': '編輯企業角色',
  'Workspace Name': '企業空間名稱',
  'Workspace Logo': '企業空間 Logo',
  'Workspaces Manager': '企業空間管理員',
  CREATE_WORKSPACE: '創建企業空間',
  DEPARTMENT_MANAGEMENT: 'Department Management',
  SET_DEPARTMENTS: 'Set Departments',
  DEPARTMENT_PL: '企業組織',
  'Maintain Organization': '維護組織結構',

  devops: 'DevOps 项目',

  'Project Number': '項目數量',
  'DevOps Project Number': 'DevOps 项目數量',
  EDIT_QUOTAS: '編輯配額',

  'View Workspace': '進入企業空間',
  DELETE_WORKSPACE: '刪除企業空間',

  EDIT_WORKSPACE_QUOTAS: 'Edit Workspace Quotas',
  'Edit Workspace Quota': '企業空間配額',

  WORKSPACE_INFO: '企業空間資訊',

  'Manage Organizations': '管理組織結構',

  'Involved Projects': '參與項目',
  'Created Projects': '創建的項目',
  'Workspace name exists': '企業空間名稱已存在',
  'The current name is not applicable.': '目前名稱不可用',

  'Cluster Authorization Info': '集群授權資訊',
  WS_NETWORK_ISOLATION: '企業空間網路隔離',

  NO_AVAILABLE_CLUSTER: '暫時沒有可用集群',

  'All members': '全部成員',
  Assigned: '已分配',

  WORKSPACE_OVERVIEW_DESC:
    '企業空間為 KubeSphere 提供了安全隔離的、具有訪問權限控制的工作平台。這裡您可以看到目前企業空間内資源運行的概況。',

  WORKSPACE_DESC:
    '企業空間是一個組織您的項目和 DevOps 项目、管理資源訪問權限以及在團隊内部共享資源等的邏輯單元，可以作為團隊工作的獨立工作空間。',

  WORKSPACE_SEARCH_PLACEHOLDER: '請輸入企業空間名稱進行查找',

  WORKSPACE_CREATE_DESC:
    '企業空間是一個組織您的項目和 DevOps 项目、管理資源訪問權限以及在團隊内部共享資源等的邏輯單元，可以作為團隊工作的獨立工作空間。',

  WORKSPACE_NAME_DESC:
    '請盡量保持名稱簡短，比如用企業名稱的縮寫或者大家經常的稱呼，無需使用企業的完整名稱或者營業執照上的註冊名稱。',

  WORKSPACE_ROLE_DESC: '企業角色定義了在目前企業空間下用戶所擁有的權限。',
  WORKSPACE_ROLE_EMPTY_DESC: 'Please create a workspace role.',
  WORKSPACE_LOGO_PLACEHOLDER:
    '企業標誌尺寸必須小於 200px X 200px，支持 png、jpg 格式。建議從上傳透明背景的 png 格式圖片以達到最佳顯示效果。',

  'Remove from Workspace': '從企業空間移除',
  WORKSPACE_NAME_EMPTY_DESC: '請輸入企業空間名稱',

  NO_WORKSPACE_TIP:
    '您的帳號目前不屬於任何企業空間，請您創建一個企業空間或者聯繫管理員邀請您到其企業空間内進行工作',

  SEARCH_WORKSPACE_TIP: '請輸入企業名稱進行查找',

  WORKSPACE_MEMBER_DESC:
    'Workspace members can view or manage workspace resources. You can manage members and control their permissions in the workspace.',
  INVITE_WORKSPACE_MEMBER_DESC: 'You can invite members to the workspace.',

  DELETE_WORKSPACE_TIP:
    '確定刪除企業空間 <strong> {resource} </strong> ？ 刪除後將無法恢復，企業空間下的資源也同時會被銷毀。',

  DELETE_WORKSPACE_DESC: '刪除後將無法恢復，企業空間下的資源也同時會被銷毀。',

  WORKSPACE_BASE_INFO_Q1: '如何為企業空間申請更多的集群？',
  WORKSPACE_BASE_INFO_A1:
    'Contact the platform or cluster administrator to apply for more clusters.',
  WORKSPACE_BASE_INFO_Q2: '如何定義網路策略？',
  WORKSPACE_BASE_INFO_A2: '',

  WORKSPACE_CLUSTERS_DESC: '集群資訊是企業空間對集群資源的使用情況的統計',

  HOW_TO_APPLY_MORE_CLUSTER_Q: '如何為企業空間申請更多的集群？',
  HOW_TO_APPLY_MORE_CLUSTER_A:
    'Contact the platform or cluster administrator to apply for more clusters.',

  NO_CLUSTER_AVAILABLE_DESC:
    '暫無可用的公開集群，請在企業空間創建完畢後，向平台管理員或集群管理員申請集群的授權。',
  WORKSPACE_NO_CLUSTER_TIP:
    '您需要聯繫平台管理員或者集群管理員為企業空間授權集群的訪問權限。',

  DEPARTMENT_MANAGEMENT_DESC:
    'A department in a workspace is a logical unit used for permission control. You can set a workspace role, multiple project roles, and multiple DevOps project roles in a department, and assign users to the department to control user permissions in batches.',
  DEPARTMENT_EMPTY_DESC: 'No Department Available',
  WORKSPACE_GROUP_USER_EMPTY_DESC: '暫時沒有可分配的成員',
  WORKSPACE_QUOTAS_DESC:
    'Workspace quotas are used to control the total resource usage of all projects and DevOps projects in a workspace.',

  DELETE_WORKSPACE_PROJECTS_DESC: '刪除該企業空間關聯項目',
  DELETE_WORDSPACE_RELATED_RESOURCES_DESC: '刪除該企業空間關聯項目',

  // App Repositories
  ACCESS_KEY_ID: 'Access Key ID',
  SECRET_ACCESS_KEY: 'Secret Access Key',

  // Basic Information
  WORKSPACE_BASIC_INFO_DESC:
    'Basic information provides the overview of the workspace. You can view the basic information of the workspace.',
  SURE_TO_DELETE_WORKSPACE: 'Are you sure you want to delete the workspace?',
  ON: 'On',
  OFF: 'Off',
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  NETWORK_POLICY_UNINSATLLED_DESC:
    'The network policy component is not installed in this cluster.',
  WS_MEMBER_SCAP: 'Workspace member',
  WS_MEMBER_SCAP_PL: 'Workspace members',

  // Quota Management
  QUOTA_MANAGEMENT: 'Quota Management',
  RESOURCE_LIMIT: 'Resource limit',
  USED_PERCENT: 'Used: {percent}%',

  // Worksapce Members
  CHANGE_MEMBER_ROLE: 'Change Member Role',
  INVITE_MEMBER: 'Invite Member',
  INVITE: 'Invite',
  WORKSPACE_MEMBERS: 'Workspace Members',

  // Department Management
  'Workspace Groups': 'Department Mangement',
  NOT_ASSIGNED_TCAP: 'Not Assigned',
  ASSIGNED: 'Assigned',
  WORKSPACE_ROLE: 'Workspace Role',
  WORKSPACE_MEMBER_EMPTY_DESC: 'Please invite a user to the workspace.',
  PROJECT_VALUE: 'Project: {value}',
  PROJECT_ROLE_VALUE: 'Project role: {value}',
  DEVOPS_VALUE: 'DevOps project: {value}',
  DEVOPS_PROJECT_ROLES_VALUE: 'DevOps project role: {value}',

  // Workspace Members > Details
  REMOVE_MEMBER_PL: 'Remove Members',
}
