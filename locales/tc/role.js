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
  'Account Role': '帳戶角色',
  'Account Roles': '帳戶角色',
  Terminating: '刪除中',
  'Create Role': '創建角色',
  'Edit Role': '編輯角色',
  'Project Details': '項目詳情',
  'Project Roles': '項目角色',
  'Cluster Role': '集群角色',
  'Authorization List': '權限列表',
  'Authorized Users': '授權用戶',
  'Authorization Settings': '權限設置',
  'User Name': '用戶名稱',
  Cluster: '集群',
  Member: '成員',

  'Role Identifier': '角色識別碼',
  'Edit Authorization': '編輯權限',
  WORKSPACE_ROLE_NAME_TIP: '請設置一個唯一識別碼作為角色名稱。',

  'Create Project Role': '創建項目角色',
  'Edit Project Role': '編輯項目角色',
  'Create Account Role': '創建帳戶角色',
  'Edit Account Role': '編輯帳戶角色',
  'Create Cluster Role': '創建集群角色',
  'Edit Cluster Role': '編輯集群角色',

  'Please specify role authorization': '請選擇角色權限',

  'Role Name': '角色名稱',
  'Role Type': '角色類型',
  'Please input role name': '請輸入角色名稱',
  'Invalid role name': '角色名稱格式不合法',
  'Role name exists': '角色名稱已存在',
  Modules: '功能模組',
  'Authorized Actions': '可執行操作',
  'No Authorization': '暫無權限規則',
  NO_AVAILABLE_ROLE: '目前項目無可用角色',
  JOIN_PROJECT_PLACEHOLDER: '輸入用戶名稱或者郵箱邀請用戶加入到項目中',
  ROLE_DELETE_TIP: '目前角色已有用戶綁定，請解綁後重試',
  ROLE_NO_AVAILABLE_TIP: '目前項目無可用角色',
  ROLE_PROJECTS_JOIN_TIP: '輸入用戶名或者郵箱邀請用戶加入到項目中',
  ROLE_TYPE_DESC:
    '角色類型根據權限範圍分為集群、項目兩類，目前角色的授權為該項目範圍。',

  DELETE_ROLE_TIP: '確定刪除角色 <strong>{resource}</strong>?',
  ROLE_USERS_TIP:
    '目前角色有 <strong>{count}</strong> 名授權用戶，請先移除授權用戶或更改角色後再刪除。',

  'Depend on': '依賴於',

  'Clusters Management': '集群管理',
  CLUSTERS_MANAGEMENT_DESC: '創建刪除集群，管理所有集群下的資源',
  'Clusters View': '集群查看',
  CLUSTERS_VIEW_DESC: '查看平台中所有的集群及集群下所有的資源',
  'Users Management': '帳戶管理',
  USERS_MANAGEMENT_DESC: '支持帳戶的管理，包括添加/刪除/更新帳戶資訊',
  'Users View': '帳戶查看',
  USERS_VIEW_DESC: '可以查看目前平台有哪些用戶',
  'Roles Management': '角色管理',
  ROLES_MANAGEMENT_DESC: '支持帳戶角色的管理，包括添加/刪除/更新帳戶角色',
  'Roles View': '角色查看',
  ROLES_VIEW_DESC: '可以查看目前平台有哪些角色',
  'Workspaces Management': '企業空間管理',
  WORKSPACES_MANAGEMENT_DESC:
    '支持企業空間的管理，包括添加/刪除/編輯企業空間，查看平台的所有企業空間。',
  'Workspaces View': '企業空間查看',
  WORKSPACES_VIEW_DESC: '可以查看用戶目前授權的企業空間',
  'App Templates View': '應用商店查看',
  APP_TEMPLATES_VIEW_DESC: '查看平台級别的應用商店',
  'App Templates Management': '應用商店管理',
  APP_TEMPLATES_MANAGEMENT_DESC:
    '管理平台級别的應用商店，對雲原生應用的上架、下架以及審核等應用全生命週期的統一管理。',
  'Platform Settings Management': '平台設置管理',
  PLATFORM_SETTINGS_MANAGEMENT_DESC:
    '管理平台設置，如自定義平台資訊，logo，配置紀錄收集，郵件通知等。',

  'Workspace Groups Management': '企業組織管理',
  WORKSPACE_GROUPS_MANAGEMENT_DESC:
    '管理企業組織架構，邀請/移除組織成員，為組織授權',
  'Workspace Groups View': '企業組織查看',
  WORKSPACE_GROUPS_VIEW_DESC: '查看企業組織架構及成員',
  'Workspace Roles View': '角色查看',
  'Workspace Roles Management': '角色管理',
  WORKSPACE_ROLES_VIEW_DESC: '查看企業空間角色',
  WORKSPACE_ROLES_MANAGEMENT_DESC:
    '可以 創建/編輯/刪除 企業空間角色，系統預設角色無法刪除',
  'Workspace Members View': '成員查看',
  'Workspace Members Management': '成員管理',
  WORKSPACE_MEMBERS_VIEW_DESC: '查看企業空間成員',
  WORKSPACE_MEMBERS_MANAGEMENT_DESC: '邀請/編輯/移除企業空間成員',
  'Workspace App Repos View': '應用倉庫查看',
  'Workspace App Repos Management': '應用倉庫管理',
  WORKSPACE_APP_REPOS_VIEW_DESC: '查看應用倉庫列表',
  WORKSPACE_APP_REPOS_MANAGEMENT_DESC: '可以 創建/編輯/刪除 應用倉庫',
  'Workspace App Templates View': '應用模板查看',
  'Workspace App Templates Management': '應用模板管理',
  WORKSPACE_APP_TEMPLATES_VIEW_DESC: '查看企業空間應用模板',
  WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC:
    '上传/編輯/刪除 企業空間應用模板，上架/下架應用到平台的應用商店',

  'Projects Management': '項目管理',
  'Projects View': '項目查看',
  'Projects Create': '項目創建',
  'DevOps Management': 'DevOps 工程管理',
  'DevOps View': 'DevOps 工程查看',
  'DevOps Create': 'DevOps 工程創建',

  PROJECTS_MANAGEMENT_DESC:
    '管理企業空間裡的所有項目，可以 創建/編輯/刪除 項目',
  PROJECTS_CREATE_DESC: '擁有創建項目的權限，項目管理員只能為創建者自己',
  PROJECTS_VIEW_DESC: '可以查看企業空間裡的所有項目',
  FEDERATED_PROJECTS_MANAGEMENT_DESC:
    '管理企業空間裡的所有多集群項目，可以 創建/編輯/刪除 多集群項目',
  DEVOPS_MANAGEMENT_DESC:
    '管理企業空間裡的所有 DevOps 工程，可以 創建/編輯/刪除 DevOps 工程',
  DEVOPS_CREATE_DESC:
    '擁有創建DevOps 工程的權限，DevOps 工程管理員只能為創建者自己',
  DEVOPS_VIEW_DESC: '可以查看企業空間裡的所有DevOps 工程',

  'Application Workloads View': '應用負載查看',
  'Application Workloads Management': '應用負載管理',
  APPLICATION_WORKLOADS_VIEW_DESC:
    '查看項目裡的應用，服務，工作負載，任務，灰度發佈，構建鏡像等資源',
  APPLICATION_WORKLOADS_MANAGEMENT_DESC:
    '創建/編輯/刪除/項目裡的應用，服務，工作負載，任務，灰度發佈，構建鏡像等資源',
  'Volumes View': '儲存卷查看',
  'Volumes Management': '儲存卷管理',
  VOLUMES_VIEW_DESC: '查看項目裡的儲存卷',
  VOLUMES_MANAGEMENT_DESC: '創建/編輯/刪除/項目裡的儲存卷',
  'Secrets View': '密鑰查看',
  'Secrets Management': '密鑰管理',
  SECRETS_VIEW_DESC: '查看項目裡的密鑰',
  SECRETS_MANAGEMENT_DESC: '創建/編輯/刪除/項目裡的密鑰',
  'ConfigMaps View': '配置查看',
  'ConfigMaps Management': '配置管理',
  CONFIGMAPS_VIEW_DESC: '查看項目里的配置',
  CONFIGMAPS_MANAGEMENT_DESC: '創建/編輯/刪除/項目里的配置',
  'ServiceAccount Management': '服務帳戶管理',
  'ServiceAccount View': '服務帳戶查看',
  SERVICEACCOUNT_MANAGEMENT_DESC: '創建/編輯/刪除/項目裏的服務帳戶',
  SERVICEACCOUNT_VIEW_DESC: '查看項目裏的服務帳戶',
  'Alerting Policies View': '告警策略查看',
  'Alerting Policies Management': '告警策略管理',
  ALERTING_POLICIES_VIEW_DESC: '查看告警策略',
  ALERTING_POLICIES_MANAGEMENT_DESC: '創建/編輯/刪除 告警策略',
  'Alerting Messages View': '告警訊息查看',
  'Alerting Messages Management': '告警訊息管理',
  ALERTING_MESSAGES_VIEW_DESC: '查看告警訊息',
  ALERTING_MESSAGES_MANAGEMENT_DESC: '評論/刪除 告警訊息',

  'Custom Monitoring View': '自定義監控查看',
  'Custom Monitoring Management': '自定義監控管理',
  CUSTOM_MONITORING_VIEW_DESC: '查看自定義監控',
  CUSTOM_MONITORING_MANAGEMENT_DESC: '創建管理自定義監控',

  'Project Roles View': '角色查看',
  'Project Roles Management': '角色管理',
  PROJECT_ROLES_VIEW_DESC: '查看項目角色',
  PROJECT_ROLES_MANAGEMENT_DESC:
    '可以 創建/編輯/刪除 項目角色，系統預設角色無法刪除',
  'Project Members View': '成員查看',
  'Project Members Management': '成員管理',
  PROJECT_MEMBERS_VIEW_DESC: '查看項目成員',
  PROJECT_MEMBERS_MANAGEMENT_DESC: '邀請/編輯/移除項目成員',
  PROJECT_SETTINGS_DESC:
    '管理項目設置，編輯項目資訊、外網訪問、網路策略、資源配額、落盤紀錄收集配置等',

  'Cluster Resources Management': '集群資源管理',
  'Project Resources Management': '項目資源管理',
  'Nodes View': '節點查看',
  'Nodes Management': '節點管理',
  NODES_VIEW_DESC: '查看節點資訊',
  NODES_MANAGEMENT_DESC: '管理節點，停用/啟用、汙點管理等',
  'Components Management': '服務組件管理',
  COMPONENTS_MANAGEMENT_DESC: '管理集群的服務組件',
  'CRD Management': '自定義資源(CRD)管理',
  CRD_MANAGEMENT_DESC: '管理集群的自定義資源，可 查看/修改/刪除 集群 CRD 資源',
  'Network Policies Management': '網路策略管理',
  'Network Policies View': '網路策略查看',
  NETWORK_POLICIES_MANAGEMENT_DESC: '創建/編輯/刪除 集群網路策略',
  NETWORK_POLICIES_VIEW_DESC: ' 查看集群網路策略',
  'StorageClasses View': '儲存類型查看',
  'StorageClasses Management': '儲存類型管理',
  STORAGECLASSES_VIEW_DESC: '查看集群所有儲存類型',
  STORAGECLASSES_MANAGEMENT_DESC: '創建/編輯/刪除 儲存類型，設置預設儲存類型',
  'Volume Snapshots View': '儲存快照查看',
  'Volume Snapshots Management': '儲存快照管理',
  VOLUME_SNAPSHOTS_VIEW_DESC: '查看所有儲存快照',
  VOLUME_SNAPSHOTS_MANAGEMENT_DESC: '創建/編輯/刪除 儲存快照',
  'Cluster Monitoring View': '集群監控查看',
  CLUSTER_MONITORING_VIEW_DESC: '查看集群物理資源，應用資源的監控數據',
  'Cluster Roles View': '角色查看',
  'Cluster Roles Management': '角色管理',
  CLUSTER_ROLES_VIEW_DESC: '查看集群角色',
  CLUSTER_ROLES_MANAGEMENT_DESC:
    '可以 創建/編輯/刪除 集群角色，系統預設角色無法刪除',
  'Cluster Members View': '成員查看',
  'Cluster Members Management': '成員管理',
  CLUSTER_MEMBERS_VIEW_DESC: '查看集群成員',
  CLUSTER_MEMBERS_MANAGEMENT_DESC: '邀請/編輯/移除集群成員',
  CLUSTER_SETTINGS_DESC:
    '管理集群設置，編輯集群資訊，集群對企業空間的授權管理等',

  'Pipelines Management': '流水線管理',
  'Pipelines View': '流水線查看',
  PIPELINES_MANAGEMENT_DESC:
    '授予管理 DevOps 工程流水線的權限，包含 創建/編輯/刪除 等操作.',
  PIPELINES_VIEW_DESC: '授予查看 DevOps 工程流水線的權限，下載成品等.',
  'Credentials Management': '憑證管理',
  'Credentials View': '憑證查看',
  CREDENTIALS_MANAGEMENT_DESC:
    '管理 DevOps 工程憑證，包含 創建/編輯/刪除 等操作.',
  CREDENTIALS_VIEW_DESC: '查看與使用憑證',

  'DevOps Roles View': '角色查看',
  'DevOps Roles Management': '角色管理',
  DEVOPS_ROLES_VIEW_DESC: '查看 DevOps 工程角色',
  DEVOPS_ROLES_MANAGEMENT_DESC:
    '可以 創建/編輯/刪除  DevOps 工程角色，系統預設角色無法刪除',
  'DevOps Members View': '成員查看',
  'DevOps Members Management': '成員管理',
  DEVOPS_MEMBERS_VIEW_DESC: '查看 DevOps 工程成員',
  DEVOPS_MEMBERS_MANAGEMENT_DESC: '邀請/編輯/移除 DevOps 工程成員',
  'DevOps Settings': 'DevOps 工程設置',
  DEVOPS_SETTINGS_DESC: '管理 DevOps 工程設置，編輯 DevOps 工程資訊',

  'Default user role which allows a user to manage resources within the projects created by the user himself or invited by others. It does not allow the user to manage unauthorized resources in the cluster.':
    '預設用戶角色，僅允許對自己創建或受邀加入的項目中的資源進行管理，無權操作集群範圍内其他資源。',

  NO_AUTHORIZED_USERS: '目前沒有用戶被授權此角色',

  'Unable to delete preset role': '無法刪除預設角色',

  ROLE_PLATFORM_ADMIN: '平台管理員，可以管理平台内的所有資源。',
  ROLE_PLATFORM_REGULAR:
    '平台普通用戶，在被邀請加入企業空間或集群之前沒有任何資源操作權限。',
  ROLE_USERS_MANAGER: '平台用戶管理員，管理平台所有用戶。',

  ROLE_CLUSTER_ADMIN: '集群管理員，可以管理集群中所有的資源。',
  ROLE_CLUSTER_VIEWER: '集群觀察者，可以查看集群下所有的資源。',

  ROLE_WORKSPACE_ADMIN: '企業空間管理員，可以管理企業空間下所有的資源。',
  ROLE_WORKSPACES_MANAGER: '平台企業空間管理員，管理平台所有企業空間。',
  ROLE_WORKSPACE_REGULAR: '企業空間普通成員，無法創建 DevOps 工程和項目。',
  ROLE_WORKSPACE_VIEWER: '企業空間的觀察者，可以查看企業空間下所有的資源資訊。',
  ROLE_WORKSPACE_SELF_PROVISIONER:
    '企業空間普通成員，可以在企業空間下創建 DevOps 工程和項目。',

  ROLE_PROJECT_ADMIN: '項目管理員，可以管理項目下所有的資源。',
  ROLE_PROJECT_OPERATOR: '項目維護者，可以管理項目下除用戶和角色之外的資源。',
  ROLE_PROJECT_VIEWER: '項目觀察者，可以查看項目下所有的資源。',

  ROLE_DEVOPS_ADMIN: 'DevOps 工程管理員，可以管理 DevOps 工程下所有的資源。',
  ROLE_DEVOPS_OPERATOR:
    'DevOps 工程普通成員，可以在 DevOps 工程下創建流水線憑證等。',
  ROLE_DEVOPS_VIEWER: 'DevOps 工程觀察者，可以查看 DevOps 工程下所有的資源。',

  ACCOUNT_ROLE_DESC: '帳號角色可以定義平台内的帳號擁有的權限',
  ACCOUNT_ROLE_CREATE_DESC: '帳號角色可以定義平台内的帳號擁有的權限',

  ROLE_CREATE_TIP_TITLE: '接下來要做的事情',
  ROLE_CREATE_TIP_MESSAGE:
    '接下來您需要編輯權限，編輯好權限後帳號角色才能創建成功。',

  RULE_RELATED_WITH: '當前權限被 {resource} 依賴，無法移除',

  WORKSPACE_SETTINGS_DESC: '管理企業空間設置，編輯企業空間信息、網絡策略等',
}
