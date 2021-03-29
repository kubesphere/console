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
  StatefulSet: '有狀態副本集',
  DaemonSet: '守護進程集',
  Service: '服務',
  LoadBalancer: '負載平衡',
  Volume: '儲存卷',
  Terminating: '刪除中',
  'Create Project': '創建項目',
  'Edit Project': '編輯項目',
  Details: '詳情',
  Members: '成員',
  'Project Roles': '項目角色',
  'Project Role': '項目角色',
  projects: '項目',
  Projects: '項目',
  'Project Overview': '項目預覽',
  'Members Management': '成員管理',
  'Project Manager': '項目管理員',
  'Manage Project': '項目管理',
  'Resource Quota': '資源配額',
  'Project Name': '項目名稱',
  'Project Members': '項目成員',
  'project members': '項目成員',
  'Member Name': '成員名稱',
  'Modify Member Role': '修改成員角色',
  'Modify Members Role': '修改成員角色',
  'Remove Members': '移除成員',
  'Remove Member': '移除成員',
  'Invite Member': '邀請成員',
  'Gateway Info': '網關資訊',
  'Set Gateway': '設置網關',
  'Edit Gateway': '編輯網關',

  'Gateway Not Set': '網關未設置',

  'Delete Project': '刪除項目',
  'Project Info': '項目資訊',
  'Project Quota': '項目配額',
  'Quota Management': '配額管理',

  'Project Placement': '項目位置',

  'Multi-cluster Project': '多集群項目',
  'Multi-cluster Projects': '多集群項目',

  Opened: '已開啟',
  Closed: '已關閉',

  PROJECT_CREATE_DESC:
    'KubeSphere 中的項目對應的是 Kubernetes 的 namespace，是對一組資源和對象的抽象集合，常用來將系統内部的對象劃分為不同的項目組或用戶組。',
  PROJECT_NAME_DESC: '項目名稱只能包含小寫字母、數字及分隔符號("-")',
  'Please input project name': '請輸入項目名稱',
  'Invalid project name': '項目名稱格式不合法',
  'Project name exists': '項目名稱已存在',

  DELETE_MEMBER_TIP:
    '確定移除成員 <strong>{name}</strong> ? 移除後該成員將無法訪問此項目。',

  'DevOps Project': 'DevOps 工程',
  'DevOps Projects': 'DevOps 工程',
  'Select Project Type': '選擇項目類型',

  'Edit Project Quota': '編輯項目配額',
  'Add Quota Item': '添加配額項目',

  'Network Isolation': '網路隔离',

  deployments: '部署',
  statefulsets: '有狀態副本集',
  daemonsets: '守護進程集',
  jobs: '任務',
  cronjobs: '定時任務',
  pods: '容器組',

  'requests.cpu': 'CPU 需求',
  'limits.cpu': 'CPU 限額',
  'requests.memory': '記憶體需求',
  'limits.memory': '記憶體限額',

  'Container Resource Default Request': '容器資源預設請求',
  'Edit Resource Default Request': '編輯資源預設請求',

  'Resource Type': '資源類型',

  'Help Information': '幫助資訊',

  'Enter Project': '進入項目',
  'Enter DevOps Project': '進入工程',
  Project_Admin: '工程管理員',
  'No Platform Manage Authorization': '無平台管理權限',

  'Default limit resource': '預設最大使用資源',
  'Default request resource': '預設最小使用資源',

  'Assign Workspace': '分配企業空間',
  'Target Workspace': '目標企業空間',
  'Choose a workspace': '選擇一個企業空間',
  'Not Assigned': '未分配',
  'Select a user of the workspace as the manager of the project.':
    '選擇企業空間的用戶作為管理員。',

  'Disk Log Collection': '落盤紀錄收集',

  'Are you sure to close ?': '確認關閉？',
  "The project's file log collection is about to close.":
    '項目的落盤紀錄收集即將關閉.',

  'Select the cluster to create the project.': '選擇要創建項目的集群.',

  'Project Member': '項目成員',

  CLOSE_FILE_LOG_TIP:
    '落盤紀錄收集即將關閉。 關閉後，已開啟落盤紀錄收集的服務在容器組副本重啟前將繼續進行落盤紀錄的收集，重啟後，將不再收集。</br>如果需要再次收集，請開啟落盤紀錄收集，並重起容器組副本。',

  Usage: '使用情況',

  PROJECTS_DESC:
    'KubeSphere 中的項目對應的是 Kubernetes 的 namespace，是對一組資源和對象的抽象集合，常用來將系統内部的對象劃分為不同的項目組或用戶組。',
  PROJECT_BASEINFO_DESC: '項目基礎資訊設置',
  PROJECT_ADVANCE_DESC: '設置項目資源預設請求',

  PROJECT_TYPES_PROJECT_TITLE: '創建資源類型項目',
  PROJECT_TYPES_PROJECT_DESC:
    'KubeSphere 中的項目對應的是 Kubernetes 的 namespace，是對一組資源和對象的抽象集合，可以根據不同的業務部門或者產品項目進行資源分組。',
  PROJECT_TYPES_DEVOPS_TITLE: '創建一個 DevOps 工程',
  PROJECT_TYPES_DEVOPS_DESC: '持續、自動地構建/測試軟體項目。',

  PROJECT_ASSIGN_DESC: '項目一旦被分配到企業空間後將不允許修改企業空間',

  'Invite Members to the Project': '邀請成員到該項目',
  'Invite Members to the DevOps Project': '邀請成員到該工程',
  INVITE_MEMBER_DESC: '您可以邀請新的成員來協助您的項目',
  INVITE_MEMBER_DESC_DEVOPS: '您可以邀請新的成員來協助您的工程',
  INVITE_MEMBER_SEARCH_PLACEHODLER: '輸入郵箱邀請項目成員',
  INVITE_MEMBER_CHOOSE_ROLE_TIP: '請選擇一個角色赋予該成員',
  PROJECT_ADMIN_DESC: '可以指定項目内一個成員為管理員',

  PROJECT_INTERNET_ACCESS_DESC:
    '在創建應用路由之前，需要先啟用外網訪問入口，即網關。這一步是創建對應的應用路由控制器，用來負責將請求轉發到對應的後端服務。',

  DELETE_INTERNET_ACCESS_TITLE: '確定刪除外網訪問設置?',
  DELETE_INTERNET_ACCESS_DESC: '刪除後可重新綁定',

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

  PROJECT_BASIC_INFO_DESC: '項目的基本資訊涵蓋了項目名稱及項目的配額狀態',
  PROJECT_QUOTA_MANAGE_DESC: '管理項目的配額',
  PROJECT_ADVANCED_SETTINGS_DESC:
    '對項目中的外網訪問網關以及服務治理和落盤紀錄收集等配置進行設置',
  PROJECT_MEMBERS_DESC: '對項目内的成員進行管理及角色分配',
  PROJECT_ROLE_DESC: '項目角色定義了在目前項目下用戶所擁有的權限',
  COLLECTING_FILE_LOG_DESC:
    '對容器内的落盤紀錄進行收集，並轉發到標準輸出，然後由紀錄收集系統統一採集。',

  HOW_TO_USE_QUOTA_Q: '如何使用配額?',
  HOW_TO_USE_QUOTA_A:
    '資源配額（Resource Quotas）是用來限制用戶資源用量的一種機制，可以對 CPU、記憶體、容器組數量等進行配額限制。',

  WHAT_IS_LIMIT_RANGE_Q: '什麼是容器資源預設請求?',
  WHAT_IS_LIMIT_RANGE_A:
    '容器資源預設請求 (LimitRange) 基於項目的資源管理，包括容器組和容器的保留資源、最大限額等。',

  WHAT_IS_INTERNET_GATEWAY: '什麼是外網訪問網關?',
  WHAT_IS_COLLECT_FILE_LOG_A:
    '容器所掛載的儲存卷中的紀錄路徑以 glob 方式給出，可在工作負載中配置紀錄路徑以收集這些紀錄。需要管理員預先開啟落盤紀錄收集。',

  HOW_TO_INVITE_MEMBER_Q: '如何邀請成員？',
  HOW_TO_INVITE_MEMBER_A:
    '項目管理員或者擁有成員邀請權限的用戶可以邀請目前企業空間内的成員加入項目',

  'How do I invite other members to the current project?':
    '邀請其他成員到目前項目中?',
  'How do I set the project gateway?': '如何設置項目網關？',
  'You can limit the number of resources. Blank means no limit.':
    '您可以對資源的數量進行限制, 不填寫即不限制',

  PROJECT_TYPES_Q: '項目中的服務如何通過外網訪問？',
  PROJECT_TYPES_A:
    '項目網關負責創建對應的應用路由控制器，用來負責將請求轉發到對應的後端服務；開啟項目網關後可以將服務通過 Ingress 暴露给外網訪問。',

  PROJECT_CLUSTER_SETTINGS_DESC:
    '選擇要創建項目的集群. 當選擇了多個集群時, 將創建聯邦項目',
  NETWORK_ISOLATED_DESC: '設置網路隔離策略',

  NAME_EXIST_IN_CLUSTER: '項目名稱在集群 {cluster} 中已存在',

  MULTI_CLUSER_PROJECT_TIP:
    '目前項目為多集群項目，項目將分布在不同集群中共同來構成多集群項目，您可以切換到不同集群查看項目在該集群中的設置。',

  MULTI_CLUSER_RESOURCE_TIP:
    '目前資源為多集群資源，資源將分布在不同集群中共同來構成多集群資源，您可以切換到不同集群查看資源在該集群中的設置。',

  FEDPROJECT_RESOURCE_TIP:
    '無法在集群管理内創建多集群項目的資源, 請到多集群項目頁面内進行操作.',
  FEDPROJECT_CANNOT_DEPLOY_APP_TIP: '無法在多集群項目裡部署應用.',

  'The project name exists on the host cluster.': '項目名在 Host 集群上已存在',

  MULTI_CLUSTER_PROJECT_DELETE_TIP:
    '刪除多集群項目同時也會刪除依賴於 Host 集群上的同名項目,</br>請輸入{type}名稱 <strong>{resource}</strong> 確保您已經了解操作所带來的風險。',

  FED_HOST_NAMESPACE_TIP:
    '該項目為多集群項目的相關資源, 請勿在此項目下操作資源',

  MULTI_CLUSTER_PROJECT_CREATE_DESC:
    '您可以創建多集群項目，讓項目運行在多個集群中，為應用提供快速疊代開發的容器環境並實現高可用。',

  'Project Quota Not Set': '項目配額未設置',
  'Resource Default Request Not Set': '容器資源預設請求未設置',
}
