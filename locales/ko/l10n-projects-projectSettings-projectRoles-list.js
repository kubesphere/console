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
  PROJECT_ROLE_PL: 'Project Roles',
  PROJECT_ROLE_DESC: 'Project roles define the permissions of project members.',
  // List
  ROLE_PROJECT_ADMIN: 'Control all resources in the project.',
  ROLE_PROJECT_REGULAR: 'Manage resources other than users and roles in the project.',
  ROLE_PROJECT_VIEWER: 'View all resources in the project.',
  ROLE_PROJECT_OPERATOR: 'Manage resources other than users and roles in the project.',
  PROJECT_ROLE_EMPTY_DESC: 'Please create a project role.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Edit Permissions > Application Workloads
  APPLICATION_WORKLOADS_MANAGEMENT: 'Application Workload Management',
  APPLICATION_WORKLOADS_VIEW: 'Application Workload Viewing',
  APPLICATION_WORKLOADS_VIEW_DESC: 'View resources such as applications, services, workloads, jobs, grayscale release jobs, and image builders in the project.',
  APPLICATION_WORKLOADS_MANAGEMENT_DESC: 'Create, edit, and delete resources such as applications, services, workloads, jobs, grayscale release jobs, and image builders in the project.',
  // List > Edit Permissions > Storage Management
  VOLUME_SNAPSHOTS_MANAGEMENT: 'Volume Snapshot Management',
  VOLUME_SNAPSHOTS_VIEW: 'Volume Snapshot Viewing',
  VOLUMES_MANAGEMENT: 'Volume Management',
  VOLUMES_VIEW: 'Volume Viewing',
  VOLUME_SNAPSHOTS_VIEW_DESC: 'View volume snapshots in the project.',
  VOLUME_SNAPSHOTS_MANAGEMENT_DESC: 'Create, edit, and delete volume snapshots in the project.',
  VOLUMES_VIEW_DESC: 'View volumes in the project.',
  VOLUMES_MANAGEMENT_DESC: 'Create, edit, and delete volumes in the project.',
  // List > Edit Permissions > Configuration Management
  CONFIGMAPS_MANAGEMENT: 'Configmap Management',
  CONFIGMAPS_VIEW: 'Configmap Viewing',
  SECRETS_MANAGEMENT: 'Secret Management',
  SECRETS_VIEW: 'Secret Viewing',
  SERVICEACCOUNT_MANAGEMENT: 'Service Account Management',
  SERVICEACCOUNT_VIEW: 'Service Account Viewing',
  SECRETS_VIEW_DESC: 'View secrets in the project.',
  SECRETS_MANAGEMENT_DESC: 'Create, edit, and delete secrets in the project.',
  CONFIGMAPS_VIEW_DESC: 'View configmaps in the project.',
  CONFIGMAPS_MANAGEMENT_DESC: 'Create, edit, and delete configmaps in the project.',
  SERVICEACCOUNT_MANAGEMENT_DESC: 'Create, edit, and delete service accounts in the project.',
  SERVICEACCOUNT_VIEW_DESC: 'View service accounts in the project.',
  // List > Edit Permissions > Monitoring & Alerting
  ALERTING_MESSAGES_MANAGEMENT: 'Alerting Message Management',
  ALERTING_MESSAGES_VIEW: 'Alerting Message Viewing',
  ALERTING_POLICIES_MANAGEMENT: 'Alerting Policy Management',
  ALERTING_POLICIES_VIEW: 'Alerting Policy Viewing',
  CUSTOM_MONITORING_VIEW: 'Custom Monitoring Viewing',
  CUSTOM_MONITORING_MANAGEMENT: 'Custom Monitoring Management',
  CUSTOM_MONITORING_VIEW_DESC: 'View custom monitoring dashboards in the project.',
  CUSTOM_MONITORING_MANAGEMENT_DESC: 'Create, edit, and delete custom monitoring dashboards in the project.',
  ALERTING_POLICIES_VIEW_DESC: 'View alerting policies in the project.',
  ALERTING_POLICIES_MANAGEMENT_DESC: 'Create, edit, and delete alerting policies in the project.',
  ALERTING_MESSAGES_VIEW_DESC: 'View alerting messages in the project.',
  ALERTING_MESSAGES_MANAGEMENT_DESC: 'Comment on and delete alerting messages in the project.',
  // List > Edit Permissions > Access Control
  PROJECT_MEMBERS_MANAGEMENT: 'Member Management',
  PROJECT_MEMBERS_VIEW: 'Member Viewing',
  PROJECT_ROLES_MANAGEMENT: 'Role Management',
  PROJECT_ROLES_VIEW: 'Role Viewing',
  PROJECT_ROLES_VIEW_DESC: 'View project roles.',
  PROJECT_ROLES_MANAGEMENT_DESC: 'Create, edit, and delete project roles except preset roles.',
  PROJECT_MEMBERS_VIEW_DESC: 'View project members.',
  PROJECT_MEMBERS_MANAGEMENT_DESC: 'Invite, edit, and remove project members.',
  // List > Edit Permissions > Project Settings
  PROJECT_SETTINGS_DESC: 'Manage project settings including project basic information, external access settings, network policies, resource quotas, and log collection settings.',
  // List > Delete
  DELETE_ROLE: 'Delete Role',
  DELETE_ROLE_TIP: 'Are you sure you want to delete the role <strong>{resource}</strong>?',
  DELETE_ROLE_USER_TIP_PL: 'The role is authorized to <strong>{count}</strong> users. Please delete the users or change the roles of the user first.',
  DELETE_ROLE_USER_TIP: 'The role is authorized to <strong>{count}</strong> user. Please delete the user or change the role of the user first.',
  DELETE_ROLE_DEPARTMENT_TIP_PL: 'The role is authorized to <strong>{count}</strong> departments. Please delete the departments or change the roles of the departments first.',
  DELETE_ROLE_DEPARTMENT_TIP: 'The role is authorized to <strong>{count}</strong> department. Please delete the department or change the role of the department first.'
};