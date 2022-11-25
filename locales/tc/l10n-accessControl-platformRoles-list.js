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
  PLATFORM_ROLE_PL: '平台角色',
  // List
  PLATFORM_ROLE_EMPTY_DESC: '請創建一個網路策略。',
  ROLE_USERS_MANAGER: '平台用戶管理員，管理平台所有用戶。',
  ROLE_WORKSPACES_MANAGER: '平台企業空間管理員，管理平台所有企業空間。',
  ROLE_PLATFORM_ADMIN: '平台管理員，可以管理平台内的所有資源。',
  ROLE_PLATFORM_REGULAR: '平台普通用戶，在被邀請加入企業空間或集群之前沒有任何資源操作權限。',
  ROLE_PLATFORM_SELF_PROVISIONER: 'Create workspaces and become an administrator of the created workspaces.',
  CREATION_TIME_TCAP: '創建時間',
  // List > Create
  CREATE_PLATFORM_ROLE: '創建帳戶角色',
  // List > Create > Edit Permissions > Cluster Management
  PERMIGROUP_CLUSTERS_MANAGEMENT: '集群',
  PERMISSION_CLUSTERS_VIEW: 'Cluster Viewing',
  PERMISSION_CLUSTERS_VIEW_DESC: 'View all clusters and cluster resources.',
  PERMISSION_CLUSTERS_MANAGEMENT: 'Cluster Management',
  PERMISSION_CLUSTERS_MANAGEMENT_DESC: 'Create clusters, delete clusters, and manage resources in all clusters.',
  // List > Create > Edit Permissions > Access Control
  PERMIGROUP_ACCESS_CONTROL: '訪問控制',
  PERMISSION_WORKSPACES_VIEW: 'Workspace Viewing',
  PERMISSION_WORKSPACES_VIEW_DESC: 'View workspaces.',
  PERMISSION_WORKSPACES_MANAGEMENT: 'Workspace Management',
  PERMISSION_WORKSPACES_MANAGEMENT_DESC: 'Create, edit, delete, and view workspaces.',
  PERMISSION_WORKSPACES_CREATE: 'Workspace Creation',
  PERMISSION_WORKSPACES_CREATE_DESC: 'Create workspaces and become an administrator of the created workspaces.',
  PERMISSION_USERS_VIEW: 'User Viewing',
  PERMISSION_USERS_VIEW_DESC: 'View users.',
  PERMISSION_USERS_MANAGEMENT: 'User Management',
  PERMISSION_USERS_MANAGEMENT_DESC: 'Create, edit, and delete users.',
  PERMISSION_ROLES_VIEW: '角色查看',
  PERMISSION_ROLES_VIEW_DESC: 'View platform roles.',
  PERMISSION_ROLES_MANAGEMENT: '角色管理',
  PERMISSION_ROLES_MANAGEMENT_DESC: 'Create, edit, and delete platform roles.',
  // List > Create > Edit Permissions > Apps
  PERMIGROUP_APPS_MANAGEMENT: '應用程式',
  PERMISSION_APP_TEMPLATES_VIEW: 'App Viewing',
  PERMISSION_APP_TEMPLATES_VIEW_DESC: 'View the platform App Store.',
  PERMISSION_APP_TEMPLATES_MANAGEMENT: '應用模板管理',
  PERMISSION_APP_TEMPLATES_MANAGEMENT_DESC: 'Manage the platform App Store and life cycles of cloud-native applications.',
  // List > Create > Edit Permissions > Platform Settings
  PERMIGROUP_PLATFORM_SETTINGS: '平台設置',
  PERMISSION_PLATFORM_SETTINGS_MANAGEMENT: 'Platform Settings Management',
  PERMISSION_PLATFORM_SETTINGS_MANAGEMENT_DESC: 'View and edit settings of the KubeSphere platform.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Delete
  DELETING_PRESET_ROLES_NOT_ALLOWED: 'Preset roles cannot be deleted.'
};