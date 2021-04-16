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
  'Cluster Authorization Info': 'Cluster Authorization Information',
  'Cluster Info': 'Cluster Information',
  'Create Workspace': 'Create Workspace',
  'Create Workspace Role': 'Create Workspace Role',
  'Created Projects': 'Created Projects',
  'Delete Workspace': 'Delete Workspace',
  'DevOps Project Number': 'DevOps Projects',
  'Edit Quota': 'Edit Quota',
  'Edit Workspace Role': 'Edit Workspace Role',
  'Invite members to the workspace': 'Invite Member',
  'Involved Projects': 'Involved Projects',
  'Manage Organizations': 'Manage Organization',
  'No Available Cluster': 'No Cluster Available',
  'Please input workspace name': 'Enter a workspace name.',
  'Project Number': 'Projects',
  'Remove from Workspace': 'Remove from Workspace',
  'The current name is not applicable.': 'The name is invalid.',
  'View Workspace': 'View Workspace',
  Workspace: 'Workspace',
  'Workspace Info': 'Workspace Information',
  'Workspace Logo': 'Workspace Logo',
  'Workspace Manager': 'Administrator',
  'Workspace Members': 'Workspace Members',
  'Workspace Name': 'Name',
  'Workspace name exists': 'The workspace name already exists.',
  'Workspace Network Isolation': 'Network Isolation',
  'Workspace Role': 'Workspace Role',
  'Workspace Roles': 'Workspace Roles',
  'Workspace Settings': 'Workspace Settings',
  Workspaces: 'Workspaces',
  'Workspaces Manager': 'Workspace Manager',
  projects: 'Projects',
  devops: 'DevOps Projects',
  'Workspace Quota': 'Edit Workspace Quota',
  'Edit Workspace Quota': 'Edit Workspace Quota',
  'Maintain Organization': 'Set Department',

  WORKSPACE_OVERVIEW_DESC: 'View the resource status of the workspace.',
  WORKSPACE_DESC:
    'A workspace is an isolated logical unit used to organize projects and DevOps projects, manage resource access, and share information within your team.',
  WORKSPACE_SEARCH_PLACEHOLDER: 'Enter a workspace name.',
  WORKSPACE_CREATE_DESC:
    'A workspace is an isolated logical unit used to organize projects and DevOps projects, manage resource access, and share information within your team.',
  WORKSPACE_NAME_DESC:
    'You are advised to use a short workspace name such as the abbreviation of your company name.',
  WORKSPACE_LOGO_PLACEHOLDER:
    'The maximum size of the workspace logo is 200 x 200 pixels. Only PNG (recommended) and JPG formats are supported.',

  NO_WORKSPACE_TIP:
    'Your account does not belong to any workspace currently. Please create a workspace or contact the administrator to invite you to a workspace.',
  WORKSPACE_MEMBER_DESC:
    'Manage workspace members and their roles. Workspace members can be invited to projects in the workspace.',
  INVITE_WORKSPACE_MEMBER_DESC: 'Invite members to the workspace.',
  INVITE_WORKSPACE_MEMBER_SEARCH_PLACEHODLER: 'Enter a username.',

  MEMBER_CREATE_DESC: '',

  WORKSPACE_ROLE_DESC:
    'The role of a workspace member determines the permissions of the member in the workspace.',

  SEARCH_WORKSPACE_TIP: 'Enter a workspace name.',

  NO_PUBLIC_CLUSTER_TIP:
    'No public cluster available. Please contact the platform or cluster administrator to obtain authorization.',

  WORKSPACE_NO_CLUSTER_TIP:
    'No cluster available. Please contact the platform or cluster administrator to obtain authorization.',

  WORKSPACE_BASE_INFO_Q1: 'How do I apply for more clusters for the workspace?',
  WORKSPACE_BASE_INFO_A1:
    'Contact the platform or cluster administrator to apply for more clusters.',
  WORKSPACE_BASE_INFO_Q2: 'How do I define a network policy?',
  WORKSPACE_BASE_INFO_A2: '',

  WORKSPACE_CLUSTERS_DESC:
    'The cluster information shows how cluster resources are used in the workspace.',

  HOW_TO_APPLY_MORE_CLUSTER_Q:
    'How do I apply for more clusters for the workspace?',
  HOW_TO_APPLY_MORE_CLUSTER_A:
    'Contact the platform or cluster administrator to apply for more clusters.',

  DELETE_WORKSPACE_DESC:
    'The workspace cannot be restored after it is deleted and all resources in the workspace will be removed.',
  SURE_TO_DELETE_WORKSPACE: 'Delete Workspace',
  DELETE_WORKSPACE_TIP:
    'Are you sure you want to delete the workspace <strong>{resource}</strong>? The workspace cannot be restored after it is deleted and all resources in the workspace will be removed.',

  WORKSPACE_GROUP_DESC:
    'Create departments in your workspace and assign users to different departments to implement permission control.',
  WORKSPACE_GROUP_EMPTY_DESC: 'No Department Available',
  WORKSPACE_GROUP_USER_EMPTY_DESC: 'No user available.',
  WORKSPACE_QUOTA_MANAGE_DESC:
    'Manage workspace quotas, which are shared by all projects and DevOps projects in the workspace.',
}
