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

export default {
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

  INVITE_MEMBER_DESC: 'You can invite new members to work with your project.',
  INVITE_MEMBER_DESC_DEVOPS:
    'You can invite new members to work with your DevOps project.',
  INVITE_MEMBER_SEARCH_PLACEHODLER: 'Enter an email to invite members',
  INVITE_MEMBER_CHOOSE_ROLE_TIP: 'Please assign a role to this member',
  PROJECT_ADMIN_DESC:
    'You can specify a member of the project as an administrator',
  DEVOPS_ADMIN_DESC:
    'You can specify a member of the devops project as an administrator',

  PROJECT_INTERNET_ACCESS_DESC:
    'Before creating a route, you need to enable the internet access portal, that is, the gateway. This step is to create a corresponding routing controller to forward the request to the corresponding backend service.',

  DELETE_INTERNET_ACCESS_TITLE:
    'Are you sure about deleting the external network access settings ?',
  DELETE_INTERNET_ACCESS_DESC: 'You can re-bind after deleting',

  NO_RELATE_PROJECTS_TITLE: 'No project associated with you',
  NO_RELATE_PROJECTS_DESC:
    'You can create or contact the project manager to invite you to the project to start your work.',

  DELETE_PROJECT_TIP:
    'Are you sure about deleting the project <strong>{resource}</strong> ? After the deletion, you will not be able to recover, and the resources under the project will also be destroyed.',

  DEFAULT_RESOURCE_UNIT_DESC:
    'The value of CPU indicates the number of CPU cores when it has no unit. 1 Core = 1000m',

  DEFAULT_RESOURCE_ALERT:
    'When creating a workload, this settings will be used by default if the resource limit and request for the workload is not set. If there is no special requirements, please keep this default settings.',

  QUOTA_EDIT_TIP:
    'If the value is empty, the resource quota will not be limited.',

  HOW_TO_USE_QUOTA_Q: 'How to use quota ?',
  HOW_TO_USE_QUOTA_A:
    "Resource Quotas are a mechanism used to limit user's resources usage. You can limit the number of CPUs, memory, and pod replicas.",

  WHAT_IS_LIMIT_RANGE_Q: 'What is container resource defaut request ?',
  WHAT_IS_LIMIT_RANGE_A:
    'The container resource default request (LimitRange) is based on project resource management, including resource limits and resource requests, etc.',

  WHAT_IS_INTERNET_GATEWAY: 'What is an internet access gateway?',
  WHAT_IS_COLLECT_FILE_LOG_A:
    'The log paths in the volumes mounted by the container are given in glob mode, and the log paths can be configured in the workload to collect these logs. The administrator needs to open the file log collection in advance.',

  HOW_TO_INVITE_MEMBER_Q: 'How to invite members ?',
  HOW_TO_INVITE_MEMBER_A:
    'Project administrators or users with member invitation privileges can invite members of the current workspace to join the project.',

  CLOSE_FILE_LOG_TIP:
    'The file log collection is about to close. After disabled, the service still continues to collect the file logs before the Pod replicas restart. After Pod restarted, file logs will not be collected. If you need to collect them again, turn on the file log collection and restart the Pods.',
  COLLECTING_FILE_LOG_DESC:
    'Redirect the file-based logs to standout using sidecar which is collected by the system log system so that you can search and view the logs through container log terminal or log searcher.',

  PROJECT_BASIC_INFO_DESC:
    "The project's basic information covers project name and the project's quota status.",
  PROJECT_ROLE_DESC:
    'Project roles define what access users have in the current project.',
  PROJECT_MEMBERS_DESC: 'Manage and assign roles for project members.',
  PROJECT_ADVANCED_SETTINGS_DESC:
    'Configure gateway access for external websites as well as microservice and the collection of logs on disks.',

  PROJECT_TYPES_Q:
    'How can the services in the project be accessed through the external network?',
  PROJECT_TYPES_A:
    'The project gateway is responsible for creating the corresponding application routing controller to forward the request to the corresponding backend service. After the project gateway is opened, the service can be exposed to the external network through Ingress.',

  NAME_EXIST_IN_CLUSTER: 'Name exists in {cluster}',

  PROJECT_CLUSTER_SETTINGS_DESC:
    'Select the cluster to create the project. When multiple clusters are selected, the multi-cluster project will be created',
  NETWORK_ISOLATED_DESC: 'Set network isolation strategy',
}
