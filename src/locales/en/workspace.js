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
  WORKSPACE_OVERVIEW_DESC:
    'Workspace provides KubeSphere with a secure, isolated and accessible platform. Here you can see the resource running status in the current workspace.',
  WORKSPACE_DESC:
    'Workspace is a logical unit to organize your workload projects / Kubernetes namespaces, DevOps projects, manage resource access and share information within your team. It is an isolated working place for your team.',
  WORKSPACE_SEARCH_PLACEHOLDER: 'Please enter your workspace name to find it',
  WORKSPACE_CREATE_DESC:
    'Workspace is a logical unit to organize your projects and DevOps projects. Resource access and shared team resources can be managed here. It can serve as an independent workspace for your team.',
  WORKSPACE_NAME_DESC:
    'Please keep your workspace name short, such as the abbreviation of your company name.',
  WORKSPACE_LOGO_PLACEHOLDER:
    'The workspace logo size must be less than 200px X 200px and supports PNG, JPG format. It is recommended to upload a PNG format image with a transparent background for the best display.',

  NO_WORKSPACE_TIP:
    'Your account does not belong to any workspace currently. Please create one or contact the administrator to invite you to work in a workspace.',
  WORKSPACE_MEMBER_DESC:
    'This module allows you to manage workspace members and assign roles to them. Members in the current workspace can be invited as project members.',
  INVITE_WORKSPACE_MEMBER_DESC:
    'You can invite new members to work in the workspace.',
  INVITE_WORKSPACE_MEMBER_SEARCH_PLACEHODLER:
    'Enter email addresss to invite workspace members',

  MEMBER_CREATE_DESC: '',

  WORKSPACE_ROLE_DESC:
    "Workspace role determines the role's authorizations in the current workspace.",

  SEARCH_WORKSPACE_TIP: 'Please enter the workspace name to search',

  NO_PUBLIC_CLUSTER_TIP:
    'There are no public clusters available, please apply for cluster authorization from the platform administrator or cluster administrator after workspace is created',

  WORKSPACE_NO_CLUSTER_TIP:
    'You need to contact the platform administrator or cluster administrator to authorize the access rights of the cluster for the workspace.',

  WORKSPACE_BASE_INFO_Q1: 'How to apply for more clusters for the workspace?',
  WORKSPACE_BASE_INFO_A1:
    'A cluster is operated and maintained by the platform administrator and cluster administrator. If you need more clusters, please contact your platform administrator or submit an application.',
  WORKSPACE_BASE_INFO_Q2: 'How to define a network policy?',
  WORKSPACE_BASE_INFO_A2: '',

  WORKSPACE_CLUSTERS_DESC:
    'Cluster information shows how cluster resources are used in the workspace.',

  HOW_TO_APPLY_MORE_CLUSTER_Q:
    'How to apply for more clusters for the workspace?',
  HOW_TO_APPLY_MORE_CLUSTER_A:
    'A cluster is operated and maintained by the platform administrator and cluster administrator. If you need more clusters, please contact your platform administrator or submit an application.',

  DELETE_WORKSPACE_DESC:
    'The workspace cannot be restored after it is deleted and the resources in the workspace will also be removed.',
  SURE_TO_DELETE_WORKSPACE: 'Sure to delete the workspace',
  DELETE_WORKSPACE_TIP:
    'Are you sure to delete the workspace <strong>{resource}</strong> ? You will not be able to recover it, and the resources under the workspace will also be deleted.',
}
