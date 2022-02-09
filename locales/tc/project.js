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
  ADD_QUOTA: '添加配額項目',
  Closed: '已關閉',
  EDIT_DEFAULT_CONTAINER_QUOTA: 'Edit Default Container Quota',
  cronjobs: '定時任務',
  DaemonSet: '守護進程集',
  daemonsets: '守護進程集',
  'Default limit resource': '預設最大使用資源',
  'default request CPU should not be greater than default limit CPU': '最低保證可以使用的 CPU 數不應大於限制使用的 CPU 數',
  'default request memory should not be greater than default limit memory': '最低保證可以使用的記憶體不應大於限制使用的記憶體',
  'Default request resource': '預設最小使用資源',
  Deleting: 'Deleting',
  Deployment: '部署',
  deployments: '部署',
  Details: '詳情',
  'DevOps Projects': 'DevOps 项目',
  DISK_LOG_COLLECTION: '落盤紀錄收集',
  EDIT_PROJECT: '編輯項目',
  'Empty value means no limit, CPU 1 Core = 1000m': '值為空表示無限制, CPU 1核 = 1000m',
  'Enter DevOps Project': '進入项目',
  'Enter Project': '進入項目',
  GATEWAY_PL: 'Gateways',
  'Help Information': '幫助資訊',
  'Invalid project name': '項目名稱格式不合法',
  'Invite Member': '邀請成員',
  INVITE_DEVOPS_MEMBER: '邀請成員到該 DevOps 项目',
  'Invite Members to the Project': '邀請成員到該項目',
  jobs: '任務',
  LoadBalancer: '負載平衡',
  MANAGE_PROJECT: '項目管理',
  'Member Name': '成員名稱',
  Members: '成員',
  'Members Management': '成員管理',
  'Modify Member Role': '修改成員角色',
  'Modify Members Role': '修改成員角色',
  'Multi-cluster Project': '多集群項目',
  'Multi-cluster Projects': '多集群項目',
  MULTI_CLUSTER_PROJECT_DELETE_TIP: '刪除多集群項目同時也會刪除依賴於主集群上的同名項目,</br>請輸入{type}名稱 <strong>{resource}</strong> 確保您已經了解操作所带來的風險。',
  'No Platform Manage Authorization': '無平台管理權限',
  'Not Assigned': '未分配',
  Opened: '已開啟',
  'Please input project name': '請輸入項目名稱',
  pods: '容器組',
  'Project Member': '項目成員',
  'project members': '項目成員',
  'Project name exists': '項目名稱已存在',
  'Project Overview': '項目預覽',
  'Project Placement': '項目位置',
  PROJECT_QUOTA: '項目配額',
  'Project Role': '項目角色',
  // Create Service Account Page
  Project_Admin: '项目管理員',
  Projects: '項目',
  projects: '項目',
  'Quota Management': '配額管理',
  'Remove Member': 'Remove Member',
  'Remove Members': '移除成員',
  REQUESTS_CPU: 'CPU 需求',
  REQUESTS_MEMORY: '記憶體需求',
  'Select Project Type': '選擇項目類型',
  StatefulSet: '有狀態副本集',
  statefulsets: '有狀態副本集',
  'Target Workspace': '目標企業空間',
  Terminating: '刪除中',
  Usage: '用量',
  Volume: '儲存卷',
  'Number of volumes': '存儲卷（數量）',
  RESOURCE_QUANTITY_LIMIT: 'Resource quantity limit',
  PROJECTS_DESC: 'KubeSphere 中的項目對應的是 Kubernetes 的 namespace，是對一組資源和對象的抽象集合，常用來將系統内部的對象劃分為不同的項目組或用戶組。',
  PROJECT_ADVANCE_DESC: '設置項目資源預設請求',
  PROJECT_BASEINFO_DESC: '項目基礎資訊設置',
  PROJECT_TYPES_PROJECT_TITLE: '創建資源類型項目',
  PROJECT_TYPES_PROJECT_DESC: 'KubeSphere 中的項目對應的是 Kubernetes 的 namespace，是對一組資源和對象的抽象集合，可以根據不同的業務部門或者產品項目進行資源分組。',
  PROJECT_TYPES_DEVOPS_TITLE: '創建一個 DevOps 项目',
  PROJECT_TYPES_DEVOPS_DESC: '持續、自動地構建/測試軟體項目。',
  DELETE_MEMBER_TIP: '確定移除成員 <strong>{name}</strong> ? 移除後該成員將無法訪問此項目。',
  PROJECT_ADMIN_DESC: '可以指定項目内一個成員為管理員',
  DELETE_INTERNET_ACCESS_TITLE: 'Remove Network Access Settings',
  DELETE_INTERNET_ACCESS_DESC: 'Are you sure you want to remove network access settings? You can reset the network access after the settings are removed.',
  NO_RELATE_PROJECTS_TITLE: '沒有找到與您相關聯的項目',
  NO_RELATE_PROJECTS_DESC: '您可以創建或者聯繫項目管理員將您邀請到項目中開始您的工作',
  DEFAULT_RESOURCE_UNIT_DESC: 'CPU無單位時為核心數, 1核 = 1000m',
  DEFAULT_RESOURCE_ALERT: '創建工作負載時，如未設置工作負載的資源使用限制，將預設使用此設置。如無特殊需求，請保持此設定預設。',
  QUOTA_EDIT_TIP: '值為空時將不限制配額',
  WHAT_IS_INTERNET_GATEWAY: '什麼是外網訪問網關?',
  COLLECTING_FILE_LOG_DESC: '對容器内的落盤紀錄進行收集，並轉發到標準輸出，然後由紀錄收集系統統一採集。',
  PROJECT_MEMBERS_DESC: '對項目内的成員進行管理及角色分配',
  PROJECT_ADVANCED_SETTINGS_DESC: 'Advanced settings are used to configure external access, application governance, and log collection in the project.',
  PROJECT_TYPES_Q: '項目中的服務如何通過外網訪問？',
  PROJECT_TYPES_A: '項目網關負責創建對應的應用路由控制器，用來負責將請求轉發到對應的後端服務；開啟項目網關後可以將服務通過 Ingress 暴露给外網訪問。',
  NETWORK_ISOLATED_DESC: '設置網路隔離策略',
  MULTI_CLUSER_PROJECT_TIP: '目前項目為多集群項目，項目將分布在不同集群中共同來構成多集群項目，您可以切換到不同集群查看項目在該集群中的設置。',
  // Custom Monotoring
  // Basic Information
  PROJECT_NAME_SCAP: 'Project name',
  WS_RESOURCE_REQUESTS: 'Resource requests:',
  // Concatenated
  WS_RESOURCE_LIMITS: 'Resource limits:',
  // Concatenated
  USAGE: 'Usage',
  // Project Members
  PROJECT_MEMBER: 'Project Member'
};