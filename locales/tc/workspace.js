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
  Workspace: '企業空間',
  Workspaces: '企業空間',
  'Workspace Settings': '企業空間設置',
  'Workspace Members': '企業成員',
  'Workspace Roles': '企業角色',
  'Workspace Role': '企業角色',
  'Create Workspace Role': '創建企業角色',
  'Edit Workspace Role': '編輯企業角色',
  'Workspace Name': '企業空間名稱',
  'Workspace Logo': '企業空間 Logo',
  'Workspace Manager': '企業空間管理員',
  'Workspaces Manager': '企業空間管理員',
  'Create Workspace': '創建企業空間',
  'Workspace Groups': '企業組織',
  'Maintain Organization': '維護組織結構',

  projects: '項目',
  devops: 'DevOps 工程',

  'Project Number': '項目數量',
  'DevOps Project Number': 'DevOps 工程數量',
  'Edit Quota': '編輯配額',

  'View Workspace': '進入企業空間',
  'Delete Workspace': '刪除企業空間',

  'Workspace Quota': '企業空間配額',
  'Edit Workspace Quota': '企業空間配額',

  'Workspace Info': '企業空間資訊',

  'Manage Organizations': '管理組織結構',

  'Involved Projects': '參與項目',
  'Created Projects': '創建的項目',
  'Workspace name exists': '企業空間名稱已存在',
  'The current name is not applicable.': '目前名稱不可用',

  'Cluster Authorization Info': '集群授權資訊',
  'Workspace Network Isolation': '企業空間網路隔離',

  'Cluster Info': '集群資訊',

  'No Available Cluster': '暫時沒有可用集群',

  'All members': '全部成員',
  Assigned: '已分配',

  WORKSPACE_OVERVIEW_DESC:
    '企業空間為 KubeSphere 提供了安全隔離的、具有訪問權限控制的工作平台。這裡您可以看到目前企業空間内資源運行的概況。',

  WORKSPACE_DESC:
    '企業空間是一個組織您的項目和 DevOps 工程、管理資源訪問權限以及在團隊内部共享資源等的邏輯單元，可以作為團隊工作的獨立工作空間。',

  WORKSPACE_SEARCH_PLACEHOLDER: '請輸入企業空間名稱進行查找',

  WORKSPACE_CREATE_DESC:
    '企業空間是一個組織您的項目和 DevOps 工程、管理資源訪問權限以及在團隊内部共享資源等的邏輯單元，可以作為團隊工作的獨立工作空間。',

  WORKSPACE_NAME_DESC:
    '請盡量保持名稱簡短，比如用企業名稱的縮寫或者大家經常的稱呼，無需使用企業的完整名稱或者營業執照上的註冊名稱。',

  WORKSPACE_ROLE_DESC: '企業角色定義了在目前企業空間下用戶所擁有的權限。',
  WORKSPACE_LOGO_PLACEHOLDER:
    '企業標誌尺寸必須小於 200px X 200px，支持 png、jpg 格式。建議從上傳透明背景的 png 格式圖片以達到最佳顯示效果。',

  'Remove from Workspace': '從企業空間移除',
  'Please input workspace name': '請輸入企業空間名稱',

  NO_WORKSPACE_TIP:
    '您的帳號目前不屬於任何企業空間，請您創建一個企業空間或者聯繫管理員邀請您到其企業空間内進行工作',

  SEARCH_WORKSPACE_TIP: '請輸入企業名稱進行查找',

  'Invite members to the workspace': '邀請成員到該企業空間',
  WORKSPACE_MEMBER_DESC:
    '對企業空間内的成員進行管理及角色分配。項目可以邀請目前企業空間内的企業成員作為項目成員，協同工作。',
  INVITE_WORKSPACE_MEMBER_DESC: '您可以邀請新的成員來您的企業空間',
  INVITE_WORKSPACE_MEMBER_SEARCH_PLACEHODLER: '輸入郵箱邀請企業空間成員',

  DELETE_WORKSPACE_TIP:
    '確定刪除企業空間 <strong> {resource} </strong> ？ 刪除後將無法恢復，企業空間下的資源也同時會被銷毀。',

  DELETE_WORKSPACE_DESC: '刪除後將無法恢復，企業空間下的資源也同時會被銷毀。',
  SURE_TO_DELETE_WORKSPACE: '確定刪除企業空間',

  WORKSPACE_BASE_INFO_Q1: '如何為企業空間申請更多的集群？',
  WORKSPACE_BASE_INFO_A1:
    '集群由平台管理員以及集群管理員共同營運維護，如果您需要使用更多的集群請聯繫您的平台管理員，或者提交申請。',
  WORKSPACE_BASE_INFO_Q2: '如何定義網路策略？',
  WORKSPACE_BASE_INFO_A2: '',

  WORKSPACE_CLUSTERS_DESC: '集群資訊是企業空間對集群資源的使用情況的統計',

  HOW_TO_APPLY_MORE_CLUSTER_Q: '如何為企業空間申請更多的集群？',
  HOW_TO_APPLY_MORE_CLUSTER_A:
    '集群由平台管理員以及集群管理員共同營運維護，如果您需要使用更多的集群請聯繫您的平台管理員，或者提交申請。',

  NO_PUBLIC_CLUSTER_TIP:
    '暫無可用的公開集群，請在企業空間創建完畢後，向平台管理員或集群管理員申請集群的授權。',
  WORKSPACE_NO_CLUSTER_TIP:
    '您需要聯繫平台管理員或者集群管理員為企業空間授權集群的訪問權限',

  WORKSPACE_GROUP_DESC:
    '組織可以以用戶組或者部門的形式授予項目以及 Devops 工程權限',
  WORKSPACE_GROUP_EMPTY_DESC:
    '暫時沒有可用的組織機構，請先維護組織機構後添加成員',
  WORKSPACE_GROUP_USER_EMPTY_DESC: '暫時沒有可分配的成員',
  WORKSPACE_QUOTA_MANAGE_DESC:
    '管理企業空間配額，企業空間下的所有項目 / DevOps 工程將共享這些配額',
}
