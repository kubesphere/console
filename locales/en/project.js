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
  CLUSTER: 'Cluster',
  CLUSTER_PL: 'Clusters',
  CLUSTER_VALUE: 'Cluster: {value}',
  ADD_QUOTA: 'Add Quota',
  DISABLE_LOG_COLLECTION: 'Disable Log Collection',
  ASSIGN_WORKSPACE: 'Assign Workspace',
  SELECT_WORKSPACE_DESC: 'Select a workspace.',
  Closed: 'Closed',
  DEFAULT_CONTAINER_QUOTA_PL: 'Default Container Quotas',
  EDIT_DEFAULT_CONTAINER_QUOTA: 'Edit Default Container Quota',
  EDIT_DEFAULT_CONTAINER_QUOTAS: 'Edit Default Container Quotas',
  CREATE_MULTI_CLUSTER_PROJECT: 'Create Multi-cluster Project',
  CREATE_PROJECT: 'Create Project',
  cronjobs: 'cronjobs',
  DaemonSet: 'DaemonSet',
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
  COLLECT_LOGS_ON_VOLUMES: 'Collect Logs on Volumes',
  LOG_COLLECTION_ENABLED_DESC:
    'After this function is enabled or disabled, you need to restart the Pod replicas to make the change take effect.',
  EDIT_PROJECT: 'Edit Project',
  EDIT_PROJECT_QUOTA: 'Edit Project Quota',
  'Empty value means no limit, CPU 1 Core = 1000m':
    'Empty value means no limit, CPU 1 Core = 1000m',
  'Enter DevOps Project': 'Enter DevOps Project',
  'Enter Project': 'Enter Project',
  FED_HOST_NAMESPACE_TIP:
    'Do not change resources in this project because it is related to a multi-cluster project.',
  GATEWAY: 'Gateway',
  GATEWAY_PL: 'Gateways',
  GATEWAY_LOW: 'gateway',
  GATEWAY_NOT_SET: 'Gateway Not Set',
  'Help Information': 'Help Information',
  HOW_TO_INVITE_USERS: 'How do I invite users to the current project?',
  HOW_TO_SET_PROJECT_GATEWAY: 'How do I set the project gateway?',
  'Invalid project name': 'Invalid project name',
  'Invite Member': 'Invite Member',
  INVITE_DEVOPS_MEMBER: 'Invite Members to the DevOps Project',
  'Invite Members to the Project': 'Invite Members to the Project',
  jobs: 'jobs',
  LIMITS_CPU: 'CPU Limit',
  LIMITS_MEMORY: 'Memory Limit',
  LoadBalancer: 'LoadBalancer',
  MANAGE_PROJECT: 'Manage Project',
  'Member Name': 'Member Name',
  Members: 'Members',
  'Members Management': 'Members Management',
  'Modify Member Role': 'Modify Member Role',
  'Modify Members Role': 'Modify Members Role',
  'Multi-cluster Project': 'Multi-cluster Project',
  MULTI_CLUSTER_PROJECT: 'Multi-cluster Project',
  MULTI_CLUSTER_PROJECT_LOW: 'multi-cluster project',
  MULTI_CLUSTER_PROJECT_SCAP: 'Multi-cluster project',
  MULTI_CLUSTER_PROJECT_PL: 'Multi-cluster Projects',
  'Multi-cluster Projects': 'Multi-cluster Projects',
  MULTI_CLUSTER_PROJECT_DELETE_TIP:
    'Deleting a multi-cluster project will also delete the same project on the host cluster.</br>Please enter the {type} name <strong>{resource}</strong> to make sure you understand the risk of the operation.',
  'No Platform Manage Authorization': 'No Platform Manage Authorization',
  'Not Assigned': 'Unassigned',
  Opened: 'Opened',
  'Please input project name': 'Please input project name',
  pods: 'pods',
  PROJECT_INFO: 'Project Information',
  PROJECT_ADMINISTRATOR: 'Project Administrator',
  'Project Member': 'Project Member',
  PROJECT_MEMBER_PL: 'Project Members',
  'project members': 'project members',
  PROJECT_NAME: 'Project name',
  'Project name exists': 'Project name exists',
  PROJECT_NAME_EXISTS_IN_HOST:
    'The project name already exists in the host cluster. Please enter another project name.',
  'Project Overview': 'Project Overview',
  'Project Placement': 'Project Placement',
  PROJECT_QUOTA: 'Project Quota',
  EDIT_PROJECT_QUOTAS: 'Edit Project Quotas',
  'Project Role': 'Project Role',
  // Create ServiceAccount Page
  PROJECT_ROLE_SI: 'Project Role',
  PROJECT_ROLE_PL: 'Project Roles',
  PROJECT_QUOTAS_NOT_SET: 'Project Quotas Not Set',
  DEFAULT_CONTAINER_QUOTAS_NOT_SET: 'Default Container Quotas Not Set',
  Project_Admin: 'Project_Admin',
  Projects: 'Projects',
  projects: 'projects',
  'Quota Management': 'Quota Management',
  REMOVE_MEMBER: 'Remove Member',
  WORKSPACE_QUOTA_PL: 'Workspace Quotas',
  PROJECT_QUOTA_PL: 'Project Quotas',
  'Remove Member': 'Remove Member',
  'Remove Members': 'Remove Members',
  REQUESTS_CPU: 'CPU Request',
  REQUESTS_MEMORY: 'Memory Request',
  RESOURCE_QUOTA_PL: 'Resource Quotas',
  PROJECT_RESOURCE_QUOTAS: 'Project Resource Quotas',
  RESOURCE_TYPE: 'Resource Type',
  RESOURCE_TYPE_SCAP: 'Resource type',
  PROJECT_ADMINISTRATOR_DESC:
    'Select a user in the workspace as the project administrator.',
  'Select Project Type': 'Select Project Type',
  SELECT_CLUSTER_DESC:
    'Select the cluster in which the project is to be created.',
  CLUSTER_EMPTY_DESC: 'Please select a cluster.',
  SET_GATEWAY: 'Set Gateway',
  StatefulSet: 'StatefulSet',
  statefulsets: 'statefulsets',
  'Target Workspace': 'Target Workspace',
  Terminating: 'Terminating',
  Usage: 'Usage',
  Volume: 'Volume',
  'Number of volumes': 'Number of volumes',
  RESOURCE_QUANTITY_LIMIT: 'Resource quantity limit',

  FEDPROJECT_CANNOT_ADD_CLUSTER: 'No cluster is available.',

  PROJECTS_DESC:
    'A project is a Kubernetes namespace in KubeSphere, which provides a mechanism to organize resources in a workspace.',
  CREATE_PROJECT_DESC:
    'Create a project to group resources and control the resource management permissions of different users.',
  PROJECT_ADVANCE_DESC: 'Set the default resource request of the project',
  PROJECT_NAME_DESC:
    'The name can contain only lowercase letters, numbers, and hyphens (-), must start with a lowercase letter, and must end with a lowercase letter or number. The maximum length is 63 characters.',
  PROJECT_NAME_INVALID_DESC:
    'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-), must start with a lowercase letter, and must end with a lowercase letter or number. The maximum length is 63 characters.',
  PROJECT_BASEINFO_DESC: 'Project basic information settings',

  PROJECT_TYPES_PROJECT_TITLE: 'Create a resource project',
  PROJECT_TYPES_PROJECT_DESC:
    'The project in KubeSphere corresponds to the Kubernetes namespace, which is an abstract collection of a set of resources and objects that can be grouped according to different business units or product projects.',
  PROJECT_TYPES_DEVOPS_TITLE: 'Create a DevOps project',
  PROJECT_TYPES_DEVOPS_DESC:
    'Build and test software projects continuously and automatically.',

  PROJECT_ASSIGN_DESC:
    'After the project is assigned to a workspace, the workspace cannot be changed.',

  INVITE_MEMBER_DESC: 'Invite members of the current workspace to the project.',
  PROJECT_MEMBER_EMPTY_DESC:
    'Please invite a member of the current workspace to the project.',
  INVITE_MEMBER_DESC_DEVOPS:
    'Invite members of the current workspace to the DevOps project.',
  INVITE_MEMBER_SEARCH_PLACEHOLDER: 'Enter a username to invite members',
  ASSIGN_ROLE: 'Assign Role',
  DELETE_MEMBER_TIP:
    'Are you sure about deleting the member <strong>{name}</strong>? The member cannot access this project once removed.',

  PROJECT_ADMIN_DESC:
    'You can specify a member of the project as an administrator.',

  SET_GATEWAY_DESC:
    'Set a gateway controller to forward traffic to different Services based on domain names and paths configured in Routes.',
  DELETE_INTERNET_ACCESS_TITLE: 'Remove Network Access Settings',
  DELETE_INTERNET_ACCESS_DESC:
    'Are you sure you want to remove network access settings? You can reset the network access after the settings are removed.',

  NO_RELATE_PROJECTS_TITLE: 'No project associated with you',
  NO_RELATE_PROJECTS_DESC:
    'You can create or contact the project manager to invite you to the project to start your work.',

  DELETE_PROJECT_TIP:
    'Are you sure you want to delete the project <strong>{resource}</strong>? After the deletion, you will not be able to recover it, and all project resources will also be destroyed.',

  DEFAULT_RESOURCE_UNIT_DESC:
    'The value of CPU indicates the number of CPU cores when it has no unit. 1 Core = 1000m',
  DEFAULT_RESOURCE_ALERT:
    'When you create a workload, this setting will be used by default if the resource limit and request for the workload are not set. If there is no special requirements, please keep this default setting unchanged.',

  QUOTA_EDIT_TIP:
    'If the value is empty, the resource quota will not be limited.',

  HOW_TO_USE_QUOTA_Q: 'How do I use resource quotas?',
  HOW_TO_USE_QUOTA_A:
    'Resource quotas are a mechanism used to limit the resource usage. You can edit project resource quotas and default container quotas by clicking <b>Edit Project</b>.',
  PROJECT_QUOTAS_DESC:
    'Project quotas specify the number of available CPU and memory resources and the maximum number of application resources such as Pods, Deployments, and Services allowed in the project.',

  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_Q: 'What are default container quotas?',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_A:
    'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',
  DEFAULT_CONTAINER_QUOTAS_DESC:
    'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',
  WHAT_IS_INTERNET_GATEWAY: 'What is a network access gateway?',
  COLLECT_LOGS_ON_VOLUMES_A:
    'To collect logs on volumes, you need to mount a volume in read and write mode to a container and set the container to export logs to the volume.',

  HOW_TO_INVITE_MEMBER_Q: 'How do I invite members to the project?',
  HOW_TO_INVITE_MEMBER_A:
    'The project administrator or users who have permission to invite project members can invite workspace members to the project.',

  DISABLE_LOG_COLLECTION_TIP:
    'Are you sure you want to disable log collection? You need to restart the Pod replicas to make the change take effect.',
  COLLECTING_FILE_LOG_DESC:
    'Disk logs in the container will be collected and exported to stdout, which will then be collected by the system log collector together.',

  PROJECT_BASIC_INFO_DESC:
    'Basic information provides an overview of the project. You can view the project information and default container quotas.',
  PROJECT_ROLE_DESC: 'Project roles define the permissions of project members.',
  SERVICE_ACCOUNT_PROJECT_ROLE_DESC:
    'Select the role of the service account in the current project.',
  PROJECT_MEMBERS_DESC: 'Manage and assign roles for project members.',
  PROJECT_ROLE_EMPTY_DESC: 'Please create a project role.',
  PROJECT_ADVANCED_SETTINGS_DESC:
    'Advanced settings are used to configure external access, application governance, and log collection in the project.',

  PROJECT_TYPES_Q:
    'How can the services in the project be accessed through the external network?',
  PROJECT_TYPES_A:
    'The project gateway is responsible for creating the corresponding application routing controller to forward the request to the corresponding backend Service. After the project gateway is opened, the service can be exposed to the external network through Ingress.',

  PROJECT_NAME_EXISTS_IN_CLUSTER:
    'The project name already exists in the {cluster} cluster. Please enter another project name.',

  PROJECT_CLUSTER_SETTINGS_DESC:
    'Select at least one cluster for the project. If you select multiple clusters, a project with the same name will be created in the host cluster.',
  NETWORK_ISOLATED_DESC: 'Set network isolation strategy',

  FEDPROJECT_RESOURCE_TIP:
    'Unable to create multi-cluster project resources in cluster management, please go to the multi-cluster project page to operate.',
  FEDPROJECT_CANNOT_DEPLOY_APP_TIP:
    'The app cannot be deployed in a multi-cluster project.',
  MULTI_CLUSER_PROJECT_TIP:
    'The current project is deployed across multiple clusters. You can click a cluster to view the project settings in the cluster.',

  MULTI_CLUSTER_RESOURCE_TIP:
    'The current resource is deployed across multiple clusters. You can click a cluster to view the resource settings in the cluster.',

  CREATE_MULTI_CLUSTER_PROJECT_DESC:
    'A multi-cluster project runs across different clusters, which helps you to build a container environment for rapid iteration of applications and achieve high availability.',

  // Custom Monotoring
  CUSTOM_MONITORING_DASHBOARD_LOW: 'custom monitoring dashbord',

  // Basic Information
  PROJECT_NAME_SCAP: 'Project name',
  PROJECT_ROLE_LOW: 'Project role',
  PROJECT_ROLE_LOW_PL: 'Project roles',
  PROJECT_MEMBER_LOW: 'Project member',
  PROJECT_MEMBER_LOW_PL: 'Project members',
  CPU_REQUEST_LOW: 'CPU request',
  CPU_LIMIT_LOW: 'CPU limit',
  MEMORY_REQUEST_LOW: 'Memory request',
  MEMORY_LIMIT_LOW: 'Memory limit',
  CPU_REQUEST_CORE: '{value} Core',
  CPU_LIMIT_CORE: '{value} Core',
  MEMORY_REQUEST_MIB: '{value} Mi',
  MEMORY_LIMIT_MIB: '{value} Mi',
  WS_RESOURCE_REQUESTS: 'Resource requests:',
  WS_RESOURCE_LIMITS: 'Resource limits:',
  SELECT_RESOURCE_TIP: 'Select a resource or enter a resource name',
  NUMBER_OF_ROUTES: 'Number of Routes',
  NUMBER_OF_SECRETS: 'Number of Secrets',
  NUMBER_OF_CONFIGMAPS: 'Number of ConfigMaps',
  USAGE: 'Usage',

  // Project Members
  PROJECT_MEMBER: 'Project Member',
  PROJECT_MEMBER_DESC:
    'Project members can view or manage project resources. The project administrator can invite members who belong to the workspace to the project and manage project members.',

  // Advanced Settings
  REMOVE: 'Remove',
  DISABLED: 'Disabled',
  ENABLE: 'Enable',
  DISABLE: 'Disable',
  SET_GATEWAY_TIP:
    'To use the gateway, please configure the gateway in the cluster or the project.',

  // Network Isolation
  INGRESS: 'Ingress',
  INTERNAL_TRAFFIC_DIRECTION_DESC:
    'Egress indicates the direction from the current project to other projects. Ingress indicates the direction from other projects to the current project.',
  NETWORK_SEGMENT_EXAMPLE: 'Example: 10.0.0.0',
  PORT_EXAMPLE: 'Example: 80',
}
