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
  // List
  ROLE_DEVOPS_VIEWER: 'View all resources in the DevOps project.',
  ROLE_DEVOPS_OPERATOR: 'Create credentials in the DevOps project.',
  ROLE_DEVOPS_ADMIN: 'Control all resources in the DevOps project.',

  // List > Edit Information
  // List > Edit Permissions
  // List > Create
  EDIT_PERMISSIONS: 'Edit Permissions',

  CREATE_ROLE: 'Create Role',

  // List > Create > Edit Permissions
  MODULES: 'Modules',
  // List > Create > Edit Permissions > Pipeline Management
  DEPENDS_ON: 'Depends on: ',
  PIPELINES_MANAGEMENT: 'Pipeline Management',
  PIPELINES_VIEW: 'Pipeline Viewing',
  PIPELINES_MANAGEMENT_DESC:
    'Create, edit, and delete DevOps project pipelines.',
  PIPELINES_VIEW_DESC: 'View DevOps project pipelines and download artifacts.',

  // List > Create > Edit Permissions > Credential Management
  CREDENTIALS_MANAGEMENT: 'Credential Management',
  CREDENTIALS_MANAGEMENT_DESC: 'Create, edit, and delete DevOps credentials.',
  CREDENTIALS_VIEW_DESC: 'View and use DevOps credentials.',
  CREDENTIALS_VIEW: 'Credential Viewing',

  // List > Create > Edit Permissions > Access Control

  ROLES_MANAGEMENT: 'Role Management',
  ROLES_VIEW: 'Role Viewing',

  // List > Create > Edit Permissions > DevOps Settings
  DEVOPS_SETTINGS: 'DevOps Settings',
  DEVOPS_SETTINGS_DESC: 'Manage DevOps project settings.',
}
