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
  CREATE_MULTI_CLUSTER_PROJECT: 'Create Multi-cluster Project',
  Deployment: '部署',
  StatefulSet: '有狀態副本集',
  DaemonSet: '守護進程集',
  LoadBalancer: '負載平衡',
  Volume: '儲存卷',
  Terminating: '刪除中',
  CREATE_PROJECT: '創建項目',
  EDIT_PROJECT: '編輯項目',
  Details: '詳情',
  Members: '成員',
  PROJECT_ROLE_PL: '項目角色',
  'Project Role': '項目角色',
  // Create ServiceAccount Page
  PROJECT_ROLE_SI: '項目角色',
  projects: '項目',
  Projects: '項目',
  'Project Overview': '項目預覽',
  'Members Management': '成員管理',
  PROJECT_ADMINISTRATOR: '項目管理員',
  MANAGE_PROJECT: '項目管理',
  RESOURCE_QUOTA_PL: '資源配額',
  PROJECT_NAME: '項目名稱',
  PROJECT_MEMBER_PL: '項目成員',
  PROJECT_RESOURCE_QUOTAS: 'Project Resource Quotas',
  'Project Members': '項目成員',
  'project members': '項目成員',
  'Member Name': '成員名稱',
  'Modify Member Role': '修改成員角色',
  'Modify Members Role': '修改成員角色',
  'Remove Members': '移除成員',
  REMOVE_MEMBER: '移除成員',
  REMOVE_MULTIPLE_MEMBERS: 'Remove Multiple Members',
  REMOVE_MULTIPLE_MEMBERS_TIP:
    'Enter the usernames <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  'Invite Member': '邀請成員',
  GATEWAY: '網關資訊',
  ENABLE_GATEWAY: '設置網關',

  GATEWAY_NOT_ENABLED: '網關未設置',

  PROJECT_INFO: '項目資訊',
  PROJECT_QUOTA: '項目配額',
  EDIT_PROJECT_QUOTAS: 'Edit Project Quotas',
  'Quota Management': '配額管理',
  WORKSPACE_QUOTA_PL: 'Workspace Quotas',
  PROJECT_QUOTA_PL: 'Project Quotas',

  'Project Placement': '項目位置',

  'Multi-cluster Project': '多集群項目',
  MULTI_CLUSTER_PROJECT: '多集群項目',
  MULTI_CLUSTER_PROJECT_LOW: '多集群項目',
  MULTI_CLUSTER_PROJECT_SCAP: '多集群項目',
  MULTI_CLUSTER_PROJECT_PL: '多集群項目',
  'Multi-cluster Projects': '多集群項目',

  Opened: '已開啟',
  Closed: '已關閉',

  CREATE_PROJECT_DESC:
    'KubeSphere 中的項目對應的是 Kubernetes 的 namespace，是對一組資源和對象的抽象集合，常用來將系統内部的對象劃分為不同的項目組或用戶組。',
  PROJECT_NAME_DESC:
    '最長 63 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母開頭, 字母或數字結尾',
  PROJECT_NAME_INVALID_DESC:
    '最長 63 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母開頭, 字母或數字結尾',
  'Please input project name': '請輸入項目名稱',
  'Invalid project name': '項目名稱格式不合法',
  'Project name exists': '項目名稱已存在',

  DELETE_MEMBER_TIP:
    '確定移除成員 <strong>{name}</strong> ? 移除後該成員將無法訪問此項目。',

  'DevOps Projects': 'DevOps 项目',
  'Select Project Type': '選擇項目類型',

  ADD_QUOTA: '添加配額項目',
  EDIT_PROJECT_QUOTA: 'Edit Project Quota',

  deployments: '部署',
  statefulsets: '有狀態副本集',
  daemonsets: '守護進程集',
  jobs: '任務',
  cronjobs: '定時任務',
  pods: '容器組',

  REQUESTS_CPU: 'CPU 需求',
  LIMITS_CPU: 'CPU 限額',
  REQUESTS_MEMORY: '記憶體需求',
  LIMITS_MEMORY: '記憶體限額',

  EDIT_DEFAULT_CONTAINER_QUOTA: 'Edit Default Container Quota',
  EDIT_DEFAULT_CONTAINER_QUOTAS: 'Edit Default Container Quotas',
  'Edit Resource Default Request': '編輯資源預設請求',
  DEFAULT_CONTAINER_QUOTA_PL: 'Default Container Quotas',

  RESOURCE_TYPE: '資源類型',
  RESOURCE_TYPE_SCAP: '資源類型',

  'Help Information': '幫助資訊',

  'Enter Project': '進入項目',
  'Enter DevOps Project': '進入项目',
  Project_Admin: '项目管理員',
  'No Platform Manage Authorization': '無平台管理權限',

  'Default limit resource': '預設最大使用資源',
  'Default request resource': '預設最小使用資源',

  ASSIGN_WORKSPACE: '分配企業空間',
  'Target Workspace': '目標企業空間',
  SELECT_WORKSPACE_DESC: '選擇一個企業空間',
  'Not Assigned': '未分配',
  PROJECT_ADMINISTRATOR_DESC: '選擇企業空間的用戶作為管理員。',

  DISK_LOG_COLLECTION: '落盤紀錄收集',
  COLLECT_LOGS_ON_VOLUMES: '落盤紀錄收集',
  LOG_COLLECTION_ENABLED_DESC:
    'After this function is enabled or disabled, you need to restart the Pod replicas to make the change take effect.',

  'Are you sure to close ?': '確認關閉？',
  "The project's file log collection is about to close.":
    '項目的落盤紀錄收集即將關閉.',

  SELECT_CLUSTER_DESC: '選擇要創建項目的集群。',
  CLUSTER_EMPTY_DESC: '請選擇集群。',

  'Project Member': '項目成員',

  'Number of volumes': '存儲卷（數量）',

  FEDPROJECT_CANNOT_ADD_CLUSTER: '無法添加新的集羣',

  DISABLE_LOG_COLLECTION_TIP:
    'Are you sure you want to disable log collection? After it is disabled, services that have enabled log collection will continue to collect logs saved in the volumes before the Pod replicas are restarted. If you need to collect the logs again, please enable log collection and restart the Pod replicas.',

  Usage: '用量',
  PROJECTS_DESC:
    'KubeSphere 中的項目對應的是 Kubernetes 的 namespace，是對一組資源和對象的抽象集合，常用來將系統内部的對象劃分為不同的項目組或用戶組。',
  PROJECT_BASEINFO_DESC: '項目基礎資訊設置',
  PROJECT_ADVANCE_DESC: '設置項目資源預設請求',

  PROJECT_TYPES_PROJECT_TITLE: '創建資源類型項目',
  PROJECT_TYPES_PROJECT_DESC:
    'KubeSphere 中的項目對應的是 Kubernetes 的 namespace，是對一組資源和對象的抽象集合，可以根據不同的業務部門或者產品項目進行資源分組。',
  PROJECT_TYPES_DEVOPS_TITLE: '創建一個 DevOps 项目',
  PROJECT_TYPES_DEVOPS_DESC: '持續、自動地構建/測試軟體項目。',

  PROJECT_ASSIGN_DESC: '項目一旦被分配到企業空間後將不允許修改企業空間',

  'Invite Members to the Project': '邀請成員到該項目',
  INVITE_DEVOPS_MEMBER: '邀請成員到該 DevOps 项目',
  INVITE_MEMBER_DESC:
    'You can invite members who belong to the workspace to the project.',
  INVITE_MEMBER_DESC_DEVOPS: '您可以邀請當前企業空間成員至該 DevOps 项目。',
  PROJECT_MEMBER_EMPTY_DESC:
    'Please invite a member of the current workspace to the project.',
  INVITE_MEMBER_SEARCH_PLACEHOLDER: '輸入用戶名邀請項目成員',
  ASSIGN_ROLE: 'Assign Role',
  PROJECT_ADMIN_DESC: '可以指定項目内一個成員為管理員',

  ENABLE_GATEWAY_DESC:
    '在創建應用路由之前，需要先啟用外網訪問入口，即網關。這一步是創建對應的應用路由控制器，用來負責將請求轉發到對應的後端服務。',

  DELETE_INTERNET_ACCESS_TITLE: 'Remove Network Access Settings',
  DELETE_INTERNET_ACCESS_DESC:
    'Are you sure you want to remove network access settings? You can reset the network access after the settings are removed.',

  NO_RELATE_PROJECTS_TITLE: '沒有找到與您相關聯的項目',
  NO_RELATE_PROJECTS_DESC:
    '您可以創建或者聯繫項目管理員將您邀請到項目中開始您的工作',

  DELETE_PROJECT_TIP:
    '確定刪除項目 <strong>{resource}</strong> ? 刪除後將無法恢復, 項目下的資源也同時會被銷毀。',

  'default request CPU should not be greater than default limit CPU':
    '最低保證可以使用的 CPU 數不應大於限制使用的 CPU 數',
  'default request memory should not be greater than default limit memory':
    '最低保證可以使用的記憶體不應大於限制使用的記憶體',

  'Empty value means no limit, CPU 1 Core = 1000m':
    '值為空表示無限制, CPU 1核 = 1000m',

  DEFAULT_RESOURCE_UNIT_DESC: 'CPU無單位時為核心數, 1核 = 1000m',
  DEFAULT_RESOURCE_ALERT:
    '創建工作負載時，如未設置工作負載的資源使用限制，將預設使用此設置。如無特殊需求，請保持此設定預設。',

  QUOTA_EDIT_TIP: '值為空時將不限制配額',

  PROJECT_BASIC_INFO_DESC:
    'Basic information provides an overview of the project. You can view the project information and resource quotas.',
  PROJECT_ADVANCED_SETTINGS_DESC:
    'Advanced settings are used to configure external access, application governance, and log collection in the project.',
  PROJECT_MEMBERS_DESC: '對項目内的成員進行管理及角色分配',
  PROJECT_ROLE_DESC: '項目角色定義了在目前項目下用戶所擁有的權限',
  SERVICE_ACCOUNT_PROJECT_ROLE_DESC:
    'Select the role of the service account in the current project.',
  PROJECT_ROLE_EMPTY_DESC: 'Please create a project role.',
  COLLECTING_FILE_LOG_DESC:
    '對容器内的落盤紀錄進行收集，並轉發到標準輸出，然後由紀錄收集系統統一採集。',

  HOW_TO_USE_QUOTA_Q: '如何使用資源配額?',
  HOW_TO_USE_QUOTA_A:
    'Resource quotas are a mechanism used to limit the resource usage. You can edit project resource quotas and default container quotas by clicking <b>Edit Project</b>.',

  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_Q: 'What are default container quotas?',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_A:
    'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',

  PROJECT_QUOTAS_DESC:
    'Project quotas specify the number of available CPU and memory resources and the maximum number of application resources such as Pods, Deployments, and Services in the project.',
  DEFAULT_CONTAINER_QUOTAS_DESC:
    'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',
  WHAT_IS_INTERNET_GATEWAY: '什麼是外網訪問網關?',
  COLLECT_LOGS_ON_VOLUMES_A:
    'To collect logs on volumes, you need to mount a volume in read and write mode to a container and set the container to export logs to the volume.',

  HOW_TO_INVITE_MEMBER_Q: 'How do I invite members to the project?',
  HOW_TO_INVITE_MEMBER_A:
    '項目管理員或者擁有成員邀請權限的用戶可以邀請目前企業空間内的成員加入項目。',

  HOW_TO_INVITE_USERS: '邀請其他成員到目前項目中?',
  HOW_TO_SET_PROJECT_GATEWAY: '如何設置項目網關？',
  RESOURCE_QUANTITY_LIMIT: 'Resource quantity limit',
  SET_PROJECT_RESOURCE_QUOTA:
    'You can set the resource quota by specifying a number.',

  PROJECT_TYPES_Q: '項目中的服務如何通過外網訪問？',
  PROJECT_TYPES_A:
    '項目網關負責創建對應的應用路由控制器，用來負責將請求轉發到對應的後端服務；開啟項目網關後可以將服務通過 Ingress 暴露给外網訪問。',
  PROJECT_CLUSTER_SETTINGS_DESC:
    '選擇要創建項目的集群. 當選擇了多個集群時, 將創建聯邦項目',
  NETWORK_ISOLATED_DESC: '設置網路隔離策略',

  PROJECT_NAME_EXISTS_IN_CLUSTER: '項目名稱在集群 {cluster} 中已存在',

  MULTI_CLUSER_PROJECT_TIP:
    '目前項目為多集群項目，項目將分布在不同集群中共同來構成多集群項目，您可以切換到不同集群查看項目在該集群中的設置。',

  MULTI_CLUSTER_RESOURCE_TIP:
    '目前資源為多集群資源，資源將分佈在不同集群中共同來構成多集群資源，您可以切換到不同集群查看資源在該集群中的設置。',

  FEDPROJECT_RESOURCE_TIP:
    '無法在集群管理内創建多集群項目的資源, 請到多集群項目頁面内進行操作.',
  FEDPROJECT_CANNOT_DEPLOY_APP_TIP: '無法在多集群項目裡部署應用.',

  PROJECT_NAME_EXISTS_IN_HOST: '項目名在主集群上已存在',

  MULTI_CLUSTER_PROJECT_DELETE_TIP:
    '刪除多集群項目同時也會刪除依賴於主集群上的同名項目,</br>請輸入{type}名稱 <strong>{resource}</strong> 確保您已經了解操作所带來的風險。',

  FED_HOST_NAMESPACE_TIP:
    '該項目為多集群項目的相關資源, 請勿在此項目下操作資源',

  CREATE_MULTI_CLUSTER_PROJECT_DESC:
    '您可以創建多集群項目，讓項目運行在多個集群中，為應用提供快速疊代開發的容器環境並實現高可用。',

  PROJECT_QUOTAS_NOT_SET: '項目配額未設置',
  DEFAULT_CONTAINER_QUOTAS_NOT_SET: '容器資源預設請求未設置',

  // Custom Monotoring
  CUSTOM_MONITORING_DASHBOARD_LOW: 'custom monitoring dashbord',

  // Basic Information
  PROJECT_NAME_SCAP: 'Project name',
  PROJECT_ROLE_SCAP: 'Project role',
  PROJECT_ROLE_SCAP_PL: 'Project roles',
  PROJECT_MEMBER_SCAP: 'Project member',
  PROJECT_MEMBER_SCAP_PL: 'Project members',
  CPU_REQUEST_LOW: 'CPU request',
  CPU_LIMIT_LOW: 'CPU limit',
  MEMORY_REQUEST_SCAP: 'Memory request',
  MEMORY_LIMIT_SCAP: 'Memory limit',
  CPU_REQUEST_CORE: '{value} Core',
  CPU_LIMIT_CORE: '{value} Core',
  MEMORY_REQUEST_MIB: '{value} Mi',
  MEMORY_LIMIT_MIB: '{value} Mi',
  WS_RESOURCE_REQUESTS: 'Resource requests:',
  WS_RESOURCE_LIMITS: 'Resource limits:',
  SELECT_RESOURCE_TIP: 'Select a resource or enter a resource name',
  NUMBER_OF_ROUTES: 'Number of Routes',
  NUMBER_OF_SECRETS: 'Number of Secrets',
  NUMBER_OF_CONFIGMAPS: 'Number of ConfigMaps',
  USAGE: 'Usage',

  // Project Members
  PROJECT_MEMBER: 'Project Member',
  PROJECT_MEMBER_DESC:
    'Project members can view or manage project resources. The project administrator can invite members who belong to the workspace to the project and manage project members.',

  // Advanced Settings
  REMOVE: 'Remove',
  DISABLED: 'Disabled',
  ENABLE: 'Enable',
  DISABLE: 'Disable',
  DISABLE_LOG_COLLECTION: 'Disable Log Collection',
  ENABLE_GATEWAY_TIP: '要使用網關，請在集群或項目中配置網關',

  // Network Isolation
  INGRESS: 'Ingress',
  INTERNAL_TRAFFIC_DIRECTION_DESC:
    'Egress indicates the direction from the current project to other projects. Ingress indicates the direction from other projects to the current project.',
  NETWORK_SEGMENT_EXAMPLE: 'Example: 10.0.0.0',
  PORT_EXAMPLE: 'Example: 80',
}
