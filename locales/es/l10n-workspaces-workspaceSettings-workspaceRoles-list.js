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
  WORKSPACE_ROLE_PL: 'Roles del espacio de trabajo',
  WORKSPACE_ROLE_DESC: 'El rol del espacio de trabajo determina los permisos del rol en el espacio de trabajo actual.',
  // List
  WORKSPACE_ROLE_EMPTY_DESC: 'Please create a workspace role.',
  ROLE_WORKSPACE_ADMIN: 'Manage all resources in the workspace.',
  ROLE_WORKSPACE_REGULAR: 'Usuario normal en el espacio de trabajo que no puede crear espacios de nombres o proyectos DevOps.',
  ROLE_WORKSPACE_VIEWER: 'Permite el acceso de lectura para ver todos los recursos en el espacio de trabajo.',
  ROLE_WORKSPACE_SELF_PROVISIONER: 'Usuario normal en el espacio de trabajo que puede crear espacios de nombres y proyectos DevOps.',
  // List > Create
  CREATE_WORKSPACE_ROLE: 'Crear rol de espacio de trabajo',
  WORKSPACE_ROLE_NAME_TIP: 'The role name is used as the unique identifier of the role.',
  NEXT_STEP: 'Next Step',
  NEXT_STEP_DESC: 'You need to further edit permissions of the role.',
  // List > Create > Edit Permissions > Project Management
  PERMIGROUP_PROJECTS_MANAGEMENT: 'Projects',
  PERMISSION_PROJECTS_VIEW: 'Project Viewing',
  PERMISSION_PROJECTS_VIEW_DESC: 'View all projects in the workspace.',
  PERMISSION_PROJECTS_MANAGEMENT: 'Project Management',
  PERMISSION_PROJECTS_MANAGEMENT_DESC: 'Create, edit, and delete projects in the workspace.',
  PERMISSION_PROJECTS_CREATE: 'Project Creation',
  PERMISSION_PROJECTS_CREATE_DESC: 'Create projects and become an administrator of the created projects.',
  // List > Create > Edit Permissions > DevOps Project Management
  PERMIGROUP_DEVOPS_MANAGEMENT: 'DevOps Projects',
  PERMISSION_DEVOPS_VIEW: 'DevOps Project Viewing',
  PERMISSION_DEVOPS_VIEW_DESC: 'View all DevOps projects in the workspace.',
  PERMISSION_DEVOPS_MANAGEMENT: 'DevOps Project Management',
  PERMISSION_DEVOPS_MANAGEMENT_DESC: 'Create, edit, and delete DevOps projects in the workspace.',
  PERMISSION_DEVOPS_CREATE: 'DevOps Project Creation',
  PERMISSION_DEVOPS_CREATE_DESC: 'Create DevOps projects and become an administrator of the created DevOps projects.',
  // List > Create > Edit Permissions > App Management
  PERMISSION_APPS_MANAGEMENT: 'Gestión de Alicaciones',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW: 'App Repository Viewing',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW_DESC: 'View app repositories in the workspace.',
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT: 'App Repository Management',
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT_DESC: 'Create, edit, and delete app repositories in the workspace.',
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW: 'App Template Viewing',
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW_DESC: 'View app templates in the workspace.',
  PERMISSION_WORKSPACE_APP_TEMPLATES_MANAGEMENT: 'Gestión de plantillas de aplicaciones del espacio de trabajo',
  PERMISSION_WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC: 'Upload, edit, and delete workspace app templates, and release and delete apps in the platform App Store.',
  // List > Create > Edit Permissions > Access Control
  PERMISSION_WORKSPACE_GROUPS_VIEW: 'Department Viewing',
  PERMISSION_WORKSPACE_GROUPS_VIEW_DESC: 'View the structure and members of workspace departments.',
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT: 'Department Management',
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT_DESC: 'Manage the structure, members, and permissions of workspace departments.',
  PERMISSION_WORKSPACE_MEMBERS_VIEW: 'Vista de miembros del proyecto',
  PERMISSION_WORKSPACE_MEMBERS_VIEW_DESC: 'View workspace members.',
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT: 'Gestión de miembros de proyecto',
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT_DESC: 'Invite, edit, and delete workspace members.',
  PERMISSION_WORKSPACE_ROLES_VIEW: 'Vista de roles de proyecto',
  PERMISSION_WORKSPACE_ROLES_VIEW_DESC: 'View workspace roles.',
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT: 'Gestión de Roles de Proyecto',
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT_DESC: 'Create, edit, and delete workspace roles except system preset roles.',
  // List > Create > Edit Permissions > Workspace Settings Management
  PERMIGROUP_WORKSPACE_SETTINGS: 'Configuración del espacio de trabajo',
  PERMISSION_WORKSPACE_SETTINGS_VIEW: 'Workspace Settings Viewing',
  PERMISSION_WORKSPACE_SETTINGS_VIEW_DESC: 'Usuario normal en el espacio de trabajo que no puede crear espacios de nombres o proyectos DevOps.',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT: 'Workspace Settings Management',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT_DESC: 'Manage workspace settings and edit workspace information and network policies.'
};