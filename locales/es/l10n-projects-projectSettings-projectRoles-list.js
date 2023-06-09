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
  PROJECT_ROLE_PL: 'Roles del proyecto',
  PROJECT_ROLE_DESC:
    'Los roles de proyecto definen la autorización que los usuarios tienen en el proyecto actual.',
  // List
  ROLE_PROJECT_ADMIN: 'Manage all resources in the project.',
  ROLE_PROJECT_REGULAR:
    'El que mantiene el namespace, que puede administrar recursos en el mismo excepto usuarios y roles.',
  ROLE_PROJECT_VIEWER:
    'Permite el acceso de lectura para ver todos los recursos en el namespace.',
  ROLE_PROJECT_OPERATOR:
    'El que mantiene el proyecto, que puede administrar recursos en el mismo excepto usuarios y roles.',
  PROJECT_ROLE_EMPTY_DESC: 'Please create a project role.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Edit Permissions > Application Workloads
  PERMIGROUP_APPLICATION_WORKLOADS: 'Workload de aplicaciones',
  PERMISSION_APPLICATION_WORKLOADS_VIEW: 'Application Workload Viewing',
  PERMISSION_APPLICATION_WORKLOADS_VIEW_DESC:
    'View resources such as applications, services, workloads, jobs, grayscale release jobs, and image builders in the project.',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT:
    'Application Workload Management',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT_DESC:
    'Create, edit, and delete resources such as applications, services, workloads, jobs, grayscale release jobs, and image builders in the project.',
  // List > Edit Permissions > Storage
  PERMIGROUP_STORAGE_MANAGEMENT: 'Storage',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW: 'Volume Snapshot Viewing',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW_DESC:
    'View volume snapshots in the project.',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT: 'Volume Snapshot Management',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT_DESC:
    'Create, edit, and delete volume snapshots in the project.',
  PERMISSION_VOLUMES_VIEW: 'Persistent Volume Claim Viewing',
  PERMISSION_VOLUMES_VIEW_DESC: 'View persistent volume claims in the project.',
  PERMISSION_VOLUMES_MANAGEMENT: 'Persistent Volume Claim Management',
  PERMISSION_VOLUMES_MANAGEMENT_DESC:
    'Create, edit, and delete persistent volume claims in the project.',
  // List > Edit Permissions > Configuration
  PERMIGROUP_CONFIGURATION_CENTER: 'Configuration',
  PERMISSION_CONFIGMAPS_VIEW: 'Configmap Viewing',
  PERMISSION_CONFIGMAPS_VIEW_DESC: 'View configmaps in the project.',
  PERMISSION_CONFIGMAPS_MANAGEMENT: 'Configmap Management',
  PERMISSION_CONFIGMAPS_MANAGEMENT_DESC:
    'Create, edit, and delete configmaps in the project.',
  PERMISSION_SECRETS_VIEW: 'Secret Viewing',
  PERMISSION_SECRETS_VIEW_DESC: 'View secrets in the project.',
  PERMISSION_SECRETS_MANAGEMENT: 'Secret Management',
  PERMISSION_SECRETS_MANAGEMENT_DESC:
    'Create, edit, and delete secrets in the project.',
  PERMISSION_SERVICEACCOUNT_VIEW: 'Service Account Viewing',
  PERMISSION_SERVICEACCOUNT_VIEW_DESC: 'View service accounts in the project.',
  PERMISSION_SERVICEACCOUNT_MANAGEMENT: 'Service Account Management',
  PERMISSION_SERVICEACCOUNT_MANAGEMENT_DESC:
    'Create, edit, and delete service accounts in the project.',
  // List > Edit Permissions > Monitoring & Alerting
  PERMIGROUP_MONITORING_ALERTING: 'Monitorización y alertas',
  PERMISSION_ALERTING_MESSAGES_VIEW: 'Alert Viewing',
  PERMISSION_ALERTING_MESSAGES_VIEW_DESC: 'View alerts in the project.',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT: 'Alert Management',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT_DESC:
    'Comment on and delete alerts in the project.',
  PERMISSION_ALERTING_POLICIES_VIEW: 'Rule Group Viewing',
  PERMISSION_ALERTING_POLICIES_VIEW_DESC: 'View rule groups in the project.',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT: 'Rule Group Management',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT_DESC:
    'Create, edit, and delete rule groups in the project.',
  PERMISSION_CUSTOM_MONITORING_VIEW: 'Custom Monitoring Viewing',
  PERMISSION_CUSTOM_MONITORING_VIEW_DESC:
    'View custom monitoring dashboards in the project.',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT: 'Custom Monitoring Management',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT_DESC:
    'Create, edit, and delete custom monitoring dashboards in the project.',
  // List > Edit Permissions > Access Control
  PERMISSION_PROJECT_MEMBERS_VIEW: 'Vista de miembros del proyecto',
  PERMISSION_PROJECT_MEMBERS_VIEW_DESC: 'View project members.',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT: 'Gestión de miembros de proyecto',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT_DESC:
    'Invite, edit, and remove project members.',
  PERMISSION_PROJECT_ROLES_VIEW: 'Vista de roles de proyecto',
  PERMISSION_PROJECT_ROLES_VIEW_DESC: 'View project roles.',
  PERMISSION_PROJECT_ROLES_MANAGEMENT: 'Gestión de Roles de Proyecto',
  PERMISSION_PROJECT_ROLES_MANAGEMENT_DESC:
    'Create, edit, and delete project roles except preset roles.',
  // List > Edit Permissions > Project Settings
  PERMIGROUP_PROJECT_SETTINGS: 'Configuraciones del proyecto',
  PERMISSION_PROJECT_SETTINGS: 'Project Settings Management',
  PERMISSION_PROJECT_SETTINGS_DESC:
    'Manage project settings including project basic information, external access settings, network policies, resource quotas, and log collection settings.',
  // List > Delete
  DELETE_ROLE: 'Delete Role',
  DELETE_ROLE_TIP:
    'Are you sure you want to delete the role <strong>{resource}</strong>?',
  DELETE_ROLE_USER_TIP_PL:
    'The role is authorized to <strong>{count}</strong> users. Please delete the users or change the roles of the user first.',
  DELETE_ROLE_USER_TIP:
    'The role is authorized to <strong>{count}</strong> user. Please delete the user or change the role of the user first.',
  DELETE_ROLE_DEPARTMENT_TIP_PL:
    'The role is authorized to <strong>{count}</strong> departments. Please delete the departments or change the roles of the departments first.',
  DELETE_ROLE_DEPARTMENT_TIP:
    'The role is authorized to <strong>{count}</strong> department. Please delete the department or change the role of the department first.',
}
