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
  WORKSPACE_ROLE_PL: 'Workspace Roles',
  WORKSPACE_ROLE_DESC: 'The role of a workspace member determines the permissions of the member in the workspace.',
  // List
  WORKSPACE_ROLE_EMPTY_DESC: 'Please create a workspace role.',
  ROLE_WORKSPACE_ADMIN: 'Control all resources in the workspace.',
  ROLE_WORKSPACE_REGULAR: 'View workspace settings.',
  ROLE_WORKSPACE_VIEWER: 'View all resources in the workspace.',
  ROLE_WORKSPACE_SELF_PROVISIONER: 'View workspace settings, manage app templates, and create projects and DevOps projects.',
  // List > Create
  CREATE_WORKSPACE_ROLE: 'Create Workspace Role',
  WORKSPACE_ROLE_NAME_TIP: 'The role name is used as the unique identifier of the role.',
  NEXT_STEP: 'Next Step',
  NEXT_STEP_DESC: 'You need to further edit permissions of the role.',
  // List > Create > Edit Permissions > Project Management
  PROJECTS_CREATE: 'Project Creation',
  PROJECTS_MANAGEMENT: 'Project Management',
  PROJECTS_VIEW: 'Project Viewing',
  PROJECTS_MANAGEMENT_DESC: 'Create, edit, and delete projects in the workspace.',
  PROJECTS_CREATE_DESC: 'Create projects. The creator of a project is the project administrator.',
  PROJECTS_VIEW_DESC: 'View all projects in the workspace.',
  // List > Create > Edit Permissions > DevOps Project Management
  DEVOPS_CREATE: 'DevOps Project Creation',
  DEVOPS_MANAGEMENT: 'DevOps Project Management',
  DEVOPS_VIEW: 'DevOps Project Viewing',
  DEVOPS_MANAGEMENT_DESC: 'Create, edit, and delete DevOps projects in the workspace.',
  DEVOPS_CREATE_DESC: 'Create DevOps projects. The creator of a DevOps project is the DevOps project administrator.',
  DEVOPS_VIEW_DESC: 'View all DevOps projects in the workspace.',
  // List > Create > Edit Permissions > App Management
  WORKSPACE_APP_REPOS_MANAGEMENT: 'App Repository Management',
  WORKSPACE_APP_REPOS_VIEW: 'App Repository Viewing',
  WORKSPACE_APP_TEMPLATES_MANAGEMENT: 'App Template Management',
  WORKSPACE_APP_TEMPLATES_VIEW: 'App Template Viewing',
  APP_TEMPLATES_MANAGEMENT: 'App Template Management',
  APP_TEMPLATES_VIEW: 'App Template Viewing',
  WORKSPACE_APP_REPOS_VIEW_DESC: 'View app repositories in the workspace.',
  WORKSPACE_APP_REPOS_MANAGEMENT_DESC: 'Create, edit, and delete app repositories in the workspace.',
  WORKSPACE_APP_TEMPLATES_VIEW_DESC: 'View app templates in the workspace.',
  WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC: 'Upload, edit, and delete workspace app templates, and release and delete apps in the platform App Store.',
  // List > Create > Edit Permissions > Access Control
  WORKSPACE_GROUPS_MANAGEMENT: 'Department Management',
  WORKSPACE_GROUPS_VIEW: 'Department Viewing',
  DEPARTMENT_MANAGEMENT: 'Department Management',
  WORKSPACE_MEMBERS_MANAGEMENT: 'Workspace Member Management',
  WORKSPACE_MEMBERS_VIEW: 'Workspace Member Viewing',
  WORKSPACE_ROLES_MANAGEMENT: 'Workspace Role Management',
  WORKSPACE_ROLES_VIEW: 'Workspace Role Viewing',
  WORKSPACE_GROUPS_VIEW_DESC: 'View the structure and members of workspace departments.',
  WORKSPACE_GROUPS_MANAGEMENT_DESC: 'Manage the structure, members, and permissions of workspace departments.',
  WORKSPACE_ROLES_VIEW_DESC: 'View workspace roles.',
  WORKSPACE_ROLES_MANAGEMENT_DESC: 'Create, edit, and delete workspace roles except system preset roles.',
  WORKSPACE_MEMBERS_VIEW_DESC: 'View workspace members.',
  WORKSPACE_MEMBERS_MANAGEMENT_DESC: 'Invite, edit, and delete workspace members.',
  // List > Create > Edit Permissions > Workspace Settings
  WORKSPACE_SETTINGS_VIEW: 'Workspace Settings View',
  WORKSPACE_SETTINGS_MANAGEMENT: 'Workspace Settings Management',
  WORKSPACE_SETTINGS_DESC: 'Manage workspace settings.',
  WORKSPACE_SETTINGS_VIEW_DESC: 'View workspace settings.',
  WORKSPACE_SETTINGS_MANAGEMENT_DESC: 'Manage workspace settings and edit workspace information and network policies.'
};