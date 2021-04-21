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
  'Add Quota Item': 'Add Quota Item',
  'Are you sure to disable it?': 'Are you sure to disable it?',
  'Assign Workspace': 'Assign Workspace',
  'Choose a workspace': 'Choose a workspace',
  Closed: 'Closed',
  'Container Resource Default Request': 'Container Resource Default Request',
  'Create Multi-cluster Project': 'Create Multi-cluster Project',
  'Create Project': 'Create Project',
  cronjobs: 'cronjobs',
  DaemonSet: 'DaemonSet',
  daemonsets: 'daemonsets',
  'Default limit resource': 'Default limit resource',
  'default request CPU should not be greater than default limit CPU':
    'default request CPU should not be greater than default limit CPU',
  'default request memory should not be greater than default limit memory':
    'default request memory should not be greater than default limit memory',
  'Default request resource': 'Default request resource',
  'Delete Project': 'Delete Project',
  Deleting: 'Deleting',
  Deployment: 'Deployment',
  deployments: 'deployments',
  Details: 'Details',
  'DevOps Project': 'DevOps Project',
  'DevOps Projects': 'DevOps Projects',
  'Disk Log Collection': 'Disk Log Collection',
  'Disk Log Collection of the project is about to be disabled.':
    'Disk Log Collection of the project is about to be disabled.',
  'Edit Gateway': 'Edit Gateway',
  'Edit Project': 'Edit Project',
  'Edit Project Quota': 'Edit Project Quota',
  'Edit Resource Default Request': 'Edit Resource Default Request',
  'Empty value means no limit, CPU 1 Core = 1000m':
    'Empty value means no limit, CPU 1 Core = 1000m',
  'Enter DevOps Project': 'Enter DevOps Project',
  'Enter Project': 'Enter Project',
  FED_HOST_NAMESPACE_TIP:
    'Please do not manipulate resources in this project as it is related to a multi-cluster project.',
  'Gateway Info': 'Gateway Info',
  'Gateway Not Set': 'Gateway Not Set',
  'Help Information': 'Help Information',
  'How do I invite other members to the current project?':
    'How do I invite other members to the current project?',
  'How do I set the project gateway?': 'How do I set the project gateway?',
  'Invalid project name': 'Invalid project name',
  'Invite Member': 'Invite Member',
  'Invite Members to the DevOps Project':
    'Invite Members to the DevOps Project',
  'Invite Members to the Project': 'Invite Members to the Project',
  jobs: 'jobs',
  'limits.cpu': 'limits.cpu',
  'limits.memory': 'limits.memory',
  LoadBalancer: 'LoadBalancer',
  'Manage Project': 'Manage Project',
  'Member Name': 'Member Name',
  Members: 'Members',
  'Members Management': 'Members Management',
  'Modify Member Role': 'Modify Member Role',
  'Modify Members Role': 'Modify Members Role',
  'Multi-cluster Project': 'Multi-cluster Project',
  'Multi-cluster Projects': 'Multi-cluster Projects',
  MULTI_CLUSTER_PROJECT_DELETE_TIP:
    'Deleting a multi-cluster project will also delete the same project on the host cluster.</br>Please enter the {type} name <strong>{resource}</strong> to make sure you understand the risk of the operation.',
  'Network Isolation': 'Network Isolation',
  'No Platform Manage Authorization': 'No Platform Manage Authorization',
  'Not Assigned': 'Unassigned',
  Opened: 'Opened',
  'Please input project name': 'Please input project name',
  pods: 'pods',
  'Project Info': 'Project Information',
  'Project Manager': 'Project Manager',
  'Project Member': 'Project Member',
  'Project Members': 'Project Members',
  'project members': 'project members',
  'Project Name': 'Project Name',
  'Project name exists': 'Project name exists',
  'The project name exists on the host cluster.':
    'The project name exists on the host cluster.',
  'Project Overview': 'Project Overview',
  'Project Placement': 'Project Placement',
  'Project Quota': 'Project Quota',
  'Project Role': 'Project Role',
  'Project Roles': 'Project Roles',
  'Project Quota Not Set': 'Project Quota Not Set',
  'Resource Default Request Not Set': 'Resource Default Request Not Set',
  Project_Admin: 'Project_Admin',
  Projects: 'Projects',
  projects: 'projects',
  'Quota Management': 'Quota Management',
  'Remove Member': 'Remove Member',
  'Remove Members': 'Remove Members',
  'requests.cpu': 'requests.cpu',
  'requests.memory': 'requests.memory',
  'Resource Quota': 'Resource Quota',
  'Resource Type': 'Resource Type',
  'Select a user of the workspace as the manager of the project.':
    'Select a user of the workspace as the manager of the project.',
  'Select Project Type': 'Select Project Type',
  'Select the cluster to create the project.':
    'Select the cluster to create the project.',
  Service: 'Service',
  'Set Gateway': 'Set Gateway',
  StatefulSet: 'StatefulSet',
  statefulsets: 'statefulsets',
  'Target Workspace': 'Target Workspace',
  Terminating: 'Terminating',
  Usage: 'Usage',
  Volume: 'Volume',
  'You can limit the number of resources. Blank means no limit.':
    'You can limit the number of resources. Blank means no limit.',

  PROJECTS_DESC:
    'A project is a Kubernetes namespace in KubeSphere, which provides a mechanism to organize resources in a workspace.',
  PROJECT_CREATE_DESC:
    'A project is a Kubernetes namespace in KubeSphere, which provides a mechanism to organize resources in a workspace.',
  PROJECT_ADVANCE_DESC: 'Set the default resource request of the project',
  PROJECT_NAME_DESC:
    'Project name can only contain lowercase letters, numbers and hyphens ("-").',
  PROJECT_BASEINFO_DESC: 'Project basic information settings',

  PROJECT_TYPES_PROJECT_TITLE: 'Create a resource project',
  PROJECT_TYPES_PROJECT_DESC:
    'The project in KubeSphere corresponds to the Kubernetes namespace, which is an abstract collection of a set of resources and objects that can be grouped according to different business units or product projects.',
  PROJECT_TYPES_DEVOPS_TITLE: 'Create a DevOps project',
  PROJECT_TYPES_DEVOPS_DESC:
    'Build and test software projects continuously and automatically.',

  PROJECT_ASSIGN_DESC:
    'Once the project is assigned to a workspace, it cannot be changed.',

  INVITE_MEMBER_DESC: 'You can invite new members to assist in your project.',
  INVITE_MEMBER_DESC_DEVOPS:
    'You can invite new members to assist your DevOps project.',
  INVITE_MEMBER_SEARCH_PLACEHODLER: 'Enter a username to invite members',
  INVITE_MEMBER_CHOOSE_ROLE_TIP: 'Please assign a role to this member',
  DELETE_MEMBER_TIP:
    'Are you sure about deleting the member <strong>{name}</strong>? The member cannot access this project once removed.',

  PROJECT_ADMIN_DESC:
    'You can specify a member of the project as an administrator.',
  DEVOPS_ADMIN_DESC:
    'You can specify a member of the DevOps project as an administrator.',

  PROJECT_INTERNET_ACCESS_DESC:
    'Before creating a route, you need to enable the Internet access portal (i.e. the gateway). This step is to create a corresponding routing controller to forward the request to the corresponding backend Service.',
  DELETE_INTERNET_ACCESS_TITLE:
    'Are you sure about deleting the external network access settings?',
  DELETE_INTERNET_ACCESS_DESC: 'You can rebind after the deletion.',

  NO_RELATE_PROJECTS_TITLE: 'No project associated with you',
  NO_RELATE_PROJECTS_DESC:
    'You can create or contact the project manager to invite you to the project to start your work.',

  DELETE_PROJECT_TIP:
    'Are you sure about deleting the project <strong>{resource}</strong>? After the deletion, you will not be able to recover it, and the resources under the project will also be destroyed.',

  DEFAULT_RESOURCE_UNIT_DESC:
    'The value of CPU indicates the number of CPU cores when it has no unit. 1 Core = 1000m',
  DEFAULT_RESOURCE_ALERT:
    'When you create a workload, this setting will be used by default if the resource limit and request for the workload are not set. If there is no special requirements, please keep this default setting unchanged.',

  QUOTA_EDIT_TIP:
    'If the value is empty, the resource quota will not be limited.',

  HOW_TO_USE_QUOTA_Q: 'How do I use quotas?',
  HOW_TO_USE_QUOTA_A:
    "Resource Quotas are a mechanism used to limit user's resources usage. You can limit the number of CPUs, memories, and Pod replicas.",

  WHAT_IS_LIMIT_RANGE_Q: 'What is the container resource default request?',
  WHAT_IS_LIMIT_RANGE_A:
    'The container resource default request (LimitRange) is based on project resource management, including resource limits and resource requests.',

  WHAT_IS_INTERNET_GATEWAY: 'What is an Internet Access Gateway?',
  WHAT_IS_COLLECT_FILE_LOG_A:
    'The log path in the volume mounted to the container is given in glob pattern. The log path can be configured in the workload to collect logs. The administrator needs to enable Disk Log Collection in advance.',

  HOW_TO_INVITE_MEMBER_Q: 'How to invite members?',
  HOW_TO_INVITE_MEMBER_A:
    'Project administrators or users with member invitation privileges can invite members of the current workspace to join the project.',

  CLOSE_FILE_LOG_TIP:
    'Disk Log Collection will be turned off. After it is disabled, the service with this function enabled will not stop collecting disk logs until Pod replicas restart. </br>If you need to collect them again, please enable Disk Log Collection and restart the Pod.',
  COLLECTING_FILE_LOG_DESC:
    'Disk logs in the container will be collected and exported to stdout, which will then be collected by the system log collector together.',

  PROJECT_BASIC_INFO_DESC:
    "The project basic information includes the project name and the project's quota status.",
  PROJECT_QUOTA_MANAGE_DESC: 'This module allows you to manage project quotas.',
  PROJECT_ROLE_DESC:
    'Project roles define the authorization users have in the current project.',
  PROJECT_MEMBERS_DESC: 'Manage and assign roles for project members.',
  PROJECT_ADVANCED_SETTINGS_DESC:
    'This module allows you to configure gateway access for external addresses and service governance. Besides, you can also configure the collection of logs on the disk.',

  PROJECT_TYPES_Q:
    'How can the services in the project be accessed through the external network?',
  PROJECT_TYPES_A:
    'The project gateway is responsible for creating the corresponding application routing controller to forward the request to the corresponding backend Service. After the project gateway is opened, the service can be exposed to the external network through Ingress.',

  NAME_EXIST_IN_CLUSTER: 'Name exists in {cluster}',

  PROJECT_CLUSTER_SETTINGS_DESC:
    'Select the cluster to create the project. When multiple clusters are selected, a multi-cluster project will be created.',
  NETWORK_ISOLATED_DESC: 'Set network isolation strategy',

  FEDPROJECT_RESOURCE_TIP:
    'Unable to create multi-cluster project resources in cluster management, please go to the multi-cluster project page to operate.',
  FEDPROJECT_CANNOT_DEPLOY_APP_TIP:
    'Unable to deploy applications in multi-cluster projects.',
  MULTI_CLUSER_PROJECT_TIP:
    'The current multi-cluster project runs on different clusters. You can switch between clusters to check the setting of this project in each of them.',

  MULTI_CLUSER_RESOURCE_TIP:
    'The current multi-cluster resource runs on different clusters. You can switch between clusters to check the setting of this resource in each of them.',

  MULTI_CLUSTER_PROJECT_CREATE_DESC:
    'A multi-cluster project runs across different clusters, which helps you to build a container environment for rapid iteration of applications and achieve high availability.',
}
