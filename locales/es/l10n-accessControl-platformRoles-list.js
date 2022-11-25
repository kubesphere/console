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
  PLATFORM_ROLE_PL: 'Roles de Plataforma',
  // List
  PLATFORM_ROLE_EMPTY_DESC: 'Por favor, cree un rol de plataforma.',
  ROLE_USERS_MANAGER: 'Maneje todos los usuarios en la plataforma KubeSphere.',
  ROLE_WORKSPACES_MANAGER: 'Maneje todos los espacios de trabajo en la plataforma KubeSphere.',
  ROLE_PLATFORM_ADMIN: 'Administrador de la plataforma que puede administrar todos los recursos en la plataforma.',
  ROLE_PLATFORM_REGULAR: 'Usuario normal en la plataforma que no tiene acceso a ningún recurso antes de unirse al espacio de trabajo o clúster.',
  ROLE_PLATFORM_SELF_PROVISIONER: 'Create workspaces and become an administrator of the created workspaces.',
  CREATION_TIME_TCAP: 'Fecha de creación',
  // List > Create
  CREATE_PLATFORM_ROLE: 'Create Platform Role',
  // List > Create > Edit Permissions > Cluster Management
  PERMIGROUP_CLUSTERS_MANAGEMENT: 'Clusters',
  PERMISSION_CLUSTERS_VIEW: 'Cluster Viewing',
  PERMISSION_CLUSTERS_VIEW_DESC: 'View all clusters and cluster resources.',
  PERMISSION_CLUSTERS_MANAGEMENT: 'Cluster Management',
  PERMISSION_CLUSTERS_MANAGEMENT_DESC: 'Create clusters, delete clusters, and manage resources in all clusters.',
  // List > Create > Edit Permissions > Access Control
  PERMIGROUP_ACCESS_CONTROL: 'Control de acceso',
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
  PERMISSION_ROLES_VIEW: 'Vista de roles de proyecto',
  PERMISSION_ROLES_VIEW_DESC: 'View platform roles.',
  PERMISSION_ROLES_MANAGEMENT: 'Gestión de Roles de Proyecto',
  PERMISSION_ROLES_MANAGEMENT_DESC: 'Create, edit, and delete platform roles.',
  // List > Create > Edit Permissions > Apps
  PERMIGROUP_APPS_MANAGEMENT: 'Aplicaciones',
  PERMISSION_APP_TEMPLATES_VIEW: 'App Viewing',
  PERMISSION_APP_TEMPLATES_VIEW_DESC: 'View the platform App Store.',
  PERMISSION_APP_TEMPLATES_MANAGEMENT: 'Gestión de plantillas de aplicaciones del espacio de trabajo',
  PERMISSION_APP_TEMPLATES_MANAGEMENT_DESC: 'Manage the platform App Store and life cycles of cloud-native applications.',
  // List > Create > Edit Permissions > Platform Settings
  PERMIGROUP_PLATFORM_SETTINGS: 'Configuración de la plataforma',
  PERMISSION_PLATFORM_SETTINGS_MANAGEMENT: 'Platform Settings Management',
  PERMISSION_PLATFORM_SETTINGS_MANAGEMENT_DESC: 'View and edit settings of the KubeSphere platform.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Delete
  DELETING_PRESET_ROLES_NOT_ALLOWED: 'Preset roles cannot be deleted.'
};