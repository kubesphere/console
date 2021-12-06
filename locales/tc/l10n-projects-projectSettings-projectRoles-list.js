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
  // Banner
  PROJECT_ROLE_PL: '項目角色',
  PROJECT_ROLE_DESC: '項目角色定義了在目前項目下用戶所擁有的權限',
  // List
  ROLE_PROJECT_ADMIN: '項目管理員，可以管理項目下所有的資源。',
  ROLE_PROJECT_REGULAR: 'Manage resources other than users and roles in the project.',
  ROLE_PROJECT_VIEWER: '項目觀察者，可以查看項目下所有的資源。',
  ROLE_PROJECT_OPERATOR: '項目維護者，可以管理項目下除用戶和角色之外的資源。',
  PROJECT_ROLE_EMPTY_DESC: 'Please create a project role.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Edit Permissions > Application Workloads
  APPLICATION_WORKLOADS_MANAGEMENT: '應用負載管理',
  APPLICATION_WORKLOADS_VIEW: '應用負載查看',
  APPLICATION_WORKLOADS_VIEW_DESC: '查看項目裡的應用，服務，工作負載，任務，灰度發佈，構建鏡像等資源',
  APPLICATION_WORKLOADS_MANAGEMENT_DESC: '創建/編輯/刪除/項目裡的應用，服務，工作負載，任務，灰度發佈，構建鏡像等資源',
  // List > Edit Permissions > Storage Management
  VOLUME_SNAPSHOTS_MANAGEMENT: '儲存快照管理',
  VOLUME_SNAPSHOTS_VIEW: '儲存快照查看',
  VOLUMES_MANAGEMENT: '儲存卷管理',
  VOLUMES_VIEW: '儲存卷查看',
  VOLUME_SNAPSHOTS_VIEW_DESC: '查看所有儲存快照',
  VOLUME_SNAPSHOTS_MANAGEMENT_DESC: '創建/編輯/刪除 儲存快照',
  VOLUMES_VIEW_DESC: '查看項目裡的儲存卷',
  VOLUMES_MANAGEMENT_DESC: '創建/編輯/刪除/項目裡的儲存卷',
  // List > Edit Permissions > Configuration Management
  CONFIGMAPS_MANAGEMENT: '配置管理',
  CONFIGMAPS_VIEW: '配置查看',
  SECRETS_MANAGEMENT: '密鑰管理',
  SECRETS_VIEW: '密鑰查看',
  SERVICEACCOUNT_MANAGEMENT: '服務帳戶管理',
  SERVICEACCOUNT_VIEW: '服務帳戶查看',
  SECRETS_VIEW_DESC: '查看項目裡的密鑰',
  SECRETS_MANAGEMENT_DESC: '創建/編輯/刪除/項目裡的密鑰',
  CONFIGMAPS_VIEW_DESC: '查看項目里的配置',
  CONFIGMAPS_MANAGEMENT_DESC: '創建/編輯/刪除/項目里的配置',
  SERVICEACCOUNT_MANAGEMENT_DESC: '創建/編輯/刪除/項目裏的服務帳戶',
  SERVICEACCOUNT_VIEW_DESC: '查看項目裏的服務帳戶',
  // List > Edit Permissions > Monitoring & Alerting
  ALERTING_MESSAGES_MANAGEMENT: '告警訊息管理',
  ALERTING_MESSAGES_VIEW: '告警訊息查看',
  ALERTING_POLICIES_MANAGEMENT: '告警策略管理',
  ALERTING_POLICIES_VIEW: '告警策略查看',
  CUSTOM_MONITORING_VIEW: '自定義監控查看',
  CUSTOM_MONITORING_MANAGEMENT: '自定義監控管理',
  CUSTOM_MONITORING_VIEW_DESC: '查看自定義監控',
  CUSTOM_MONITORING_MANAGEMENT_DESC: '創建管理自定義監控',
  ALERTING_POLICIES_VIEW_DESC: '查看告警策略',
  ALERTING_POLICIES_MANAGEMENT_DESC: '創建/編輯/刪除 告警策略',
  ALERTING_MESSAGES_VIEW_DESC: '查看告警訊息',
  ALERTING_MESSAGES_MANAGEMENT_DESC: '評論/刪除 告警訊息',
  // List > Edit Permissions > Access Control
  PROJECT_MEMBERS_MANAGEMENT: '成員管理',
  PROJECT_MEMBERS_VIEW: '成員查看',
  PROJECT_ROLES_MANAGEMENT: '角色管理',
  PROJECT_ROLES_VIEW: '角色查看',
  PROJECT_ROLES_VIEW_DESC: '查看項目角色',
  PROJECT_ROLES_MANAGEMENT_DESC: '可以 創建/編輯/刪除 項目角色，系統預設角色無法刪除',
  PROJECT_MEMBERS_VIEW_DESC: '查看項目成員',
  PROJECT_MEMBERS_MANAGEMENT_DESC: '邀請/編輯/移除項目成員',
  // List > Edit Permissions > Project Settings
  PROJECT_SETTINGS_DESC: '管理項目設置，編輯項目資訊、外網訪問、網路策略、資源配額、落盤紀錄收集配置等',
  // List > Delete
  DELETE_ROLE: 'Delete Role',
  DELETE_ROLE_TIP: 'Are you sure you want to delete the role <strong>{resource}</strong>?',
  DELETE_ROLE_USER_TIP_PL: 'The role is authorized to <strong>{count}</strong> users. Please delete the users or change the roles of the user first.',
  DELETE_ROLE_USER_TIP: 'The role is authorized to <strong>{count}</strong> user. Please delete the user or change the role of the user first.',
  DELETE_ROLE_DEPARTMENT_TIP_PL: 'The role is authorized to <strong>{count}</strong> departments. Please delete the departments or change the roles of the departments first.',
  DELETE_ROLE_DEPARTMENT_TIP: 'The role is authorized to <strong>{count}</strong> department. Please delete the department or change the role of the department first.'
};