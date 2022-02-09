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
  PLATFORM_ROLE_PL: 'Platform Roles',
  // List
  PLATFORM_ROLE_EMPTY_DESC: 'Please create a platform role.',
  ROLE_USERS_MANAGER: '平台用戶管理員，管理平台所有用戶。',
  ROLE_WORKSPACES_MANAGER: '平台企業空間管理員，管理平台所有企業空間。',
  ROLE_PLATFORM_ADMIN: '平台管理員，可以管理平台内的所有資源。',
  ROLE_PLATFORM_REGULAR: '平台普通用戶，在被邀請加入企業空間或集群之前沒有任何資源操作權限。',
  CREATION_TIME_TCAP: '創建時間',
  // List > Create
  CREATE_PLATFORM_ROLE: '創建帳戶角色',
  // List > Create > Edit Permissions > Cluster Management
  CLUSTERS_MANAGEMENT: '集群管理',
  CLUSTERS_VIEW: '集群查看',
  CLUSTERS_VIEW_DESC: '查看平台中所有的集群及集群下所有的資源',
  CLUSTERS_MANAGEMENT_DESC: '創建刪除集群，管理所有集群下的資源',
  // List > Create > Edit Permissions > Access Control
  USERS_MANAGEMENT: '帳戶管理',
  USERS_VIEW: '帳戶查看',
  WORKSPACES_MANAGEMENT_DESC: '支持企業空間的管理，包括添加/刪除/編輯企業空間，查看平台的所有企業空間。',
  USERS_MANAGEMENT_DESC: '支持帳戶的管理，包括添加/刪除/更新帳戶資訊',
  ROLES_MANAGEMENT_DESC: '支持帳戶角色的管理，包括添加/刪除/更新帳戶角色',
  WORKSPACES_VIEW_DESC: '可以查看用戶目前授權的企業空間',
  ROLES_VIEW_DESC: '可以查看目前平台有哪些角色',
  USERS_VIEW_DESC: '可以查看目前平台有哪些用戶',
  // List > Create > Edit Permissions > App Management
  APP_TEMPLATES_VIEW_DESC: '查看平台級别的應用商店',
  APP_TEMPLATES_MANAGEMENT_DESC: '管理平台級别的應用商店，對雲原生應用的上架、下架以及審核等應用全生命週期的統一管理。',
  // List > Create > Edit Permissions > Platform Settings
  PLATFORM_SETTINGS_MANAGEMENT: '平台設置管理',
  PLATFORM_SETTINGS_MANAGEMENT_DESC: '管理平台設置，如自定義平台資訊，logo，配置紀錄收集，郵件通知等。'
};