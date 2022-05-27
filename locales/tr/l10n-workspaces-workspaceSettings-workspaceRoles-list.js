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
  WORKSPACE_ROLE_PL: 'Çalışma Alanı Rolleri',
  WORKSPACE_ROLE_DESC: 'Çalışma alanı üyesinin rolü, üyenin çalışma alanındaki izinlerini belirler.',
  // List
  WORKSPACE_ROLE_EMPTY_DESC: 'Lütfen bir çalışma alanı rolü oluşturun.',
  ROLE_WORKSPACE_ADMIN: 'Çalışma alanındaki tüm kaynakları kontrol edin.',
  ROLE_WORKSPACE_REGULAR: 'Çalışma alanları ayarları.',
  ROLE_WORKSPACE_VIEWER: 'Çalışma alanındaki tüm kaynakları görüntüleyin.',
  ROLE_WORKSPACE_SELF_PROVISIONER: 'Çalışma alanı ayarlarını görüntüleyin, uygulama şablonlarını yönetin ve projeler ile DevOps projeleri oluşturun.',
  // List > Create
  CREATE_WORKSPACE_ROLE: 'Çalışma alanı rolü oluştur',
  WORKSPACE_ROLE_NAME_TIP: 'Rol adı, rolün benzersiz tanımlayıcısı olarak kullanılır.',
  NEXT_STEP: 'Sonraki Adım',
  NEXT_STEP_DESC: 'Rolün izinlerini daha fazla düzenlemeniz gerekir.',
  // List > Create > Edit Permissions > Project Management
  PERMIGROUP_PROJECTS_MANAGEMENT: 'Projeler',
  PERMISSION_PROJECTS_VIEW: 'Project Viewing',
  PERMISSION_PROJECTS_VIEW_DESC: 'View all projects in the workspace.',
  PERMISSION_PROJECTS_MANAGEMENT: 'Project Management',
  PERMISSION_PROJECTS_MANAGEMENT_DESC: 'Create, edit, and delete projects in the workspace.',
  PERMISSION_PROJECTS_CREATE: 'Project Creation',
  PERMISSION_PROJECTS_CREATE_DESC: 'Create projects. The creator of a project is the project administrator.',
  // List > Create > Edit Permissions > DevOps Project Management
  PERMIGROUP_DEVOPS_MANAGEMENT: 'DevOps Projeleri',
  PERMISSION_DEVOPS_VIEW: 'DevOps Project Viewing',
  PERMISSION_DEVOPS_VIEW_DESC: 'View all DevOps projects in the workspace.',
  PERMISSION_DEVOPS_MANAGEMENT: 'DevOps Project Management',
  PERMISSION_DEVOPS_MANAGEMENT_DESC: 'Create, edit, and delete DevOps projects in the workspace.',
  PERMISSION_DEVOPS_CREATE: 'DevOps Project Creation',
  PERMISSION_DEVOPS_CREATE_DESC: 'Create DevOps projects. The creator of a DevOps project is the DevOps project administrator.',
  // List > Create > Edit Permissions > App Management
  PERMISSION_APPS_MANAGEMENT: 'Uygulama Yönetimi',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW: 'App Repository Viewing',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW_DESC: 'View app repositories in the workspace.',
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT: 'App Repository Management',
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT_DESC: 'Create, edit, and delete app repositories in the workspace.',
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW: 'App Template Viewing',
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW_DESC: 'View app templates in the workspace.',
  PERMISSION_WORKSPACE_APP_TEMPLATES_MANAGEMENT: 'Uygulama Şablon Yönetimi',
  PERMISSION_WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC: 'Upload, edit, and delete workspace app templates, and release and delete apps in the platform App Store.',
  // List > Create > Edit Permissions > Access Control
  PERMISSION_WORKSPACE_GROUPS_VIEW: 'Department Viewing',
  PERMISSION_WORKSPACE_GROUPS_VIEW_DESC: 'View the structure and members of workspace departments.',
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT: 'Department Management',
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT_DESC: 'Manage the structure, members, and permissions of workspace departments.',
  PERMISSION_WORKSPACE_MEMBERS_VIEW: 'Workspace Member Viewing',
  PERMISSION_WORKSPACE_MEMBERS_VIEW_DESC: 'View workspace members.',
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT: 'Workspace Member Management',
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT_DESC: 'Invite, edit, and delete workspace members.',
  PERMISSION_WORKSPACE_ROLES_VIEW: 'Workspace Role Viewing',
  PERMISSION_WORKSPACE_ROLES_VIEW_DESC: 'View workspace roles.',
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT: 'Workspace Role Management',
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT_DESC: 'Create, edit, and delete workspace roles except system preset roles.',
  // List > Create > Edit Permissions > Workspace Settings Management
  PERMIGROUP_WORKSPACE_SETTINGS: 'Çalışma Alanı Ayarları',
  PERMISSION_WORKSPACE_SETTINGS_VIEW: 'Workspace Settings Viewing',
  PERMISSION_WORKSPACE_SETTINGS_VIEW_DESC: 'Çalışma alanları ayarları.',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT: 'Workspace Settings Management',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT_DESC: 'Manage workspace settings and edit workspace information and network policies.'
};