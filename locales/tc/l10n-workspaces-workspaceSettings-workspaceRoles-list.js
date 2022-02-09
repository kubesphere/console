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
  WORKSPACE_ROLE_PL: '企業角色',
  WORKSPACE_ROLE_DESC: '企業角色定義了在目前企業空間下用戶所擁有的權限。',
  // List
  WORKSPACE_ROLE_EMPTY_DESC: 'Please create a workspace role.',
  ROLE_WORKSPACE_ADMIN: '企業空間管理員，可以管理企業空間下所有的資源。',
  ROLE_WORKSPACE_REGULAR: '企業空間普通成員，無法創建 DevOps 项目和項目。',
  ROLE_WORKSPACE_VIEWER: '企業空間的觀察者，可以查看企業空間下所有的資源資訊。',
  ROLE_WORKSPACE_SELF_PROVISIONER: '企業空間普通成員，可以在企業空間下創建 DevOps 项目和項目。',
  // List > Create
  CREATE_WORKSPACE_ROLE: '創建企業角色',
  WORKSPACE_ROLE_NAME_TIP: '請設置一個唯一識別碼作為角色名稱。',
  NEXT_STEP: '接下來要做的事情',
  NEXT_STEP_DESC: '接下來您需要編輯權限，編輯好權限後帳號角色才能創建成功。',
  // List > Create > Edit Permissions > Project Management
  PROJECTS_CREATE: '項目創建',
  PROJECTS_MANAGEMENT: '項目管理',
  PROJECTS_VIEW: '項目查看',
  PROJECTS_MANAGEMENT_DESC: '管理企業空間裡的所有項目，可以 創建/編輯/刪除 項目',
  PROJECTS_CREATE_DESC: '擁有創建項目的權限，項目管理員只能為創建者自己',
  PROJECTS_VIEW_DESC: '可以查看企業空間裡的所有項目',
  // List > Create > Edit Permissions > DevOps Project Management
  DEVOPS_CREATE: 'DevOps 项目創建',
  DEVOPS_MANAGEMENT: 'DevOps 项目管理',
  DEVOPS_VIEW: 'DevOps 项目查看',
  DEVOPS_MANAGEMENT_DESC: '管理企業空間裡的所有 DevOps 项目，可以 創建/編輯/刪除 DevOps 项目',
  DEVOPS_CREATE_DESC: '擁有創建DevOps 项目的權限，DevOps 项目管理員只能為創建者自己',
  DEVOPS_VIEW_DESC: '可以查看企業空間裡的所有DevOps 项目',
  // List > Create > Edit Permissions > App Management
  WORKSPACE_APP_REPOS_MANAGEMENT: '應用倉庫管理',
  WORKSPACE_APP_REPOS_VIEW: '應用倉庫查看',
  WORKSPACE_APP_TEMPLATES_MANAGEMENT: '應用模板管理',
  WORKSPACE_APP_TEMPLATES_VIEW: '應用模板查看',
  APP_TEMPLATES_MANAGEMENT: '應用商店管理',
  APP_TEMPLATES_VIEW: '應用商店查看',
  WORKSPACE_APP_REPOS_VIEW_DESC: '查看應用倉庫列表',
  WORKSPACE_APP_REPOS_MANAGEMENT_DESC: '可以 創建/編輯/刪除 應用倉庫',
  WORKSPACE_APP_TEMPLATES_VIEW_DESC: '查看企業空間應用模板',
  WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC: '上传/編輯/刪除 企業空間應用模板，上架/下架應用到平台的應用商店',
  // List > Create > Edit Permissions > Access Control
  WORKSPACE_GROUPS_MANAGEMENT: '企業組織管理',
  WORKSPACE_GROUPS_VIEW: '企業組織查看',
  DEPARTMENT_MANAGEMENT: 'Department Management',
  WORKSPACE_MEMBERS_MANAGEMENT: '企業成員管理',
  WORKSPACE_MEMBERS_VIEW: '企業成員查看',
  WORKSPACE_ROLES_MANAGEMENT: '企业空间角色管理',
  WORKSPACE_ROLES_VIEW: '企業角色查看',
  WORKSPACE_GROUPS_VIEW_DESC: '查看企業組織架構及成員',
  WORKSPACE_GROUPS_MANAGEMENT_DESC: '管理企業組織架構，邀請/移除組織成員，為組織授權',
  WORKSPACE_ROLES_VIEW_DESC: '查看企業空間角色',
  WORKSPACE_ROLES_MANAGEMENT_DESC: '可以 創建/編輯/刪除 企業空間角色，系統預設角色無法刪除',
  WORKSPACE_MEMBERS_VIEW_DESC: '查看企業空間成員',
  WORKSPACE_MEMBERS_MANAGEMENT_DESC: '邀請/編輯/移除企業空間成員',
  // List > Create > Edit Permissions > Workspace Settings
  WORKSPACE_SETTINGS_VIEW: '企業空間設置查看',
  WORKSPACE_SETTINGS_MANAGEMENT: '企業空間設置管理',
  WORKSPACE_SETTINGS_DESC: '管理企業空間設置，編輯企業空間信息、網絡策略等',
  WORKSPACE_SETTINGS_VIEW_DESC: '查看企業空間設置',
  WORKSPACE_SETTINGS_MANAGEMENT_DESC: '管理企業空間設置，編輯企業空間信息、網絡策略等'
};