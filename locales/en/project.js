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
  ADD_QUOTA: 'Add Quota',

  Closed: 'Closed',

  EDIT_DEFAULT_CONTAINER_QUOTA: 'Edit Default Container Quota',

  cronjobs: 'cronjobs',
  DaemonSet: 'Daemonset',
  daemonsets: 'daemonsets',
  'Default limit resource': 'Default limit resource',
  'default request CPU should not be greater than default limit CPU':
    'default request CPU should not be greater than default limit CPU',
  'default request memory should not be greater than default limit memory':
    'default request memory should not be greater than default limit memory',
  'Default request resource': 'Default request resource',
  Deleting: 'Deleting',
  Deployment: 'Deployment',
  deployments: 'deployments',
  Details: 'Details',
  'DevOps Projects': 'DevOps Projects',
  DISK_LOG_COLLECTION: 'Disk Log Collection',

  EDIT_PROJECT: 'Edit Project',

  'Empty value means no limit, CPU 1 Core = 1000m':
    'Empty value means no limit, CPU 1 Core = 1000m',
  'Enter DevOps Project': 'Enter DevOps Project',
  'Enter Project': 'Enter Project',

  GATEWAY_PL: 'Gateways',
  'Help Information': 'Help Information',

  'Invalid project name': 'Invalid project name',
  'Invite Member': 'Invite Member',
  INVITE_DEVOPS_MEMBER: 'Invite Members to the DevOps Project',
  'Invite Members to the Project': 'Invite Members to the Project',
  jobs: 'jobs',

  LoadBalancer: 'LoadBalancer',
  MANAGE_PROJECT: 'Manage Project',
  'Member Name': 'Member Name',
  Members: 'Members',
  'Members Management': 'Members Management',
  'Modify Member Role': 'Modify Member Role',
  'Modify Members Role': 'Modify Members Role',
  'Multi-cluster Project': 'Multi-cluster Project',

  'Multi-cluster Projects': 'Multi-cluster Projects',
  MULTI_CLUSTER_PROJECT_DELETE_TIP:
    'Deleting a multi-cluster project will also delete the same project on the host cluster.</br>Please enter the {type} name <strong>{resource}</strong> to make sure you understand the risk of the operation.',
  'No Platform Manage Authorization': 'No Platform Manage Authorization',
  'Not Assigned': 'Unassigned',
  Opened: 'Opened',
  'Please input project name': 'Please input project name',
  pods: 'pods',

  'Project Member': 'Project Member',

  'project members': 'project members',

  'Project name exists': 'Project name exists',

  'Project Overview': 'Project Overview',
  'Project Placement': 'Project Placement',
  PROJECT_QUOTA: 'Project Quota',

  'Project Role': 'Project Role',
  // Create Service Account Page

  Project_Admin: 'Project_Admin',
  Projects: 'Projects',
  projects: 'projects',
  'Quota Management': 'Quota Management',
  'Remove Member': 'Remove Member',
  'Remove Members': 'Remove Members',
  REQUESTS_CPU: 'CPU Request',
  REQUESTS_MEMORY: 'Memory Request',

  'Select Project Type': 'Select Project Type',

  StatefulSet: 'Statefulset',
  statefulsets: 'statefulsets',
  'Target Workspace': 'Target Workspace',
  Usage: 'Usage',
  Volume: 'Volume',
  'Number of volumes': 'Number of volumes',
  RESOURCE_QUANTITY_LIMIT: 'Resource quantity limit',

  PROJECTS_DESC:
    'A project is a Kubernetes namespace in KubeSphere, which provides a mechanism to organize resources in a workspace.',

  PROJECT_ADVANCE_DESC: 'Set the default resource request of the project',

  PROJECT_BASEINFO_DESC: 'Project basic information settings',

  PROJECT_TYPES_PROJECT_TITLE: 'Create a resource project',
  PROJECT_TYPES_PROJECT_DESC:
    'The project in KubeSphere corresponds to the Kubernetes namespace, which is an abstract collection of a set of resources and objects that can be grouped according to different business units or product projects.',
  PROJECT_TYPES_DEVOPS_TITLE: 'Create a DevOps project',
  PROJECT_TYPES_DEVOPS_DESC:
    'Build and test software projects continuously and automatically.',

  DELETE_MEMBER_TIP:
    'Are you sure about deleting the member <strong>{name}</strong>? The member cannot access this project once removed.',

  PROJECT_ADMIN_DESC:
    'You can specify a member of the project as an administrator.',

  DELETE_INTERNET_ACCESS_TITLE: 'Remove Network Access Settings',
  DELETE_INTERNET_ACCESS_DESC:
    'Are you sure you want to remove network access settings? You can reset the network access after the settings are removed.',

  NO_RELATE_PROJECTS_TITLE: 'No project associated with you',
  NO_RELATE_PROJECTS_DESC:
    'You can create or contact the project manager to invite you to the project to start your work.',

  DEFAULT_RESOURCE_UNIT_DESC:
    'The value of CPU indicates the number of CPU cores when it has no unit. 1 Core = 1000m',
  DEFAULT_RESOURCE_ALERT:
    'When you create a workload, this setting will be used by default if the resource limit and request for the workload are not set. If there is no special requirements, please keep this default setting unchanged.',

  QUOTA_EDIT_TIP:
    'If the value is empty, the resource quota will not be limited.',

  WHAT_IS_INTERNET_GATEWAY: 'What is a network access gateway?',

  COLLECTING_FILE_LOG_DESC:
    'Disk logs in the container will be collected and exported to stdout, which will then be collected by the system log collector together.',

  PROJECT_MEMBERS_DESC: 'Manage and assign roles for project members.',

  PROJECT_ADVANCED_SETTINGS_DESC:
    'Advanced settings are used to configure external access, application governance, and log collection in the project.',

  PROJECT_TYPES_Q:
    'How can the services in the project be accessed through the external network?',
  PROJECT_TYPES_A:
    'The project gateway is responsible for creating the corresponding application routing controller to forward the request to the corresponding backend service. After the project gateway is opened, the service can be exposed to the external network through Ingress.',

  NETWORK_ISOLATED_DESC: 'Set network isolation strategy',

  MULTI_CLUSER_PROJECT_TIP:
    'The current project is deployed across multiple clusters. You can click a cluster to view the project settings in the cluster.',

  // Custom Monotoring

  // Basic Information
  PROJECT_NAME_SCAP: 'Project name',

  WS_RESOURCE_REQUESTS: 'Resource requests', // Concatenated
  WS_RESOURCE_LIMITS: 'Resource limits', // Concatenated

  USAGE: 'Usage',

  // Project Members
  PROJECT_MEMBER: 'Project Member',
}
