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
  CREATE_WORKSPACE: 'Create Workspace',
  CREATE_WORKSPACE_ROLE: 'Create Workspace Role',
  'Created Projects': 'Created Projects',
  DELETE_WORKSPACE: 'Delete Workspace',
  'DevOps Project Number': 'DevOps Projects',
  EDIT_QUOTAS: 'Edit Quotas',
  'Edit Workspace Role': 'Edit Workspace Role',
  'Involved Projects': 'Involved Projects',
  'Manage Organizations': 'Manage Organization',
  NO_AVAILABLE_CLUSTER: 'No Available Cluster',
  WORKSPACE_NAME_EMPTY_DESC: 'Please enter a workspace name.',
  'Project Number': 'Projects',
  'Remove from Workspace': 'Remove from Workspace',
  'The current name is not applicable.': 'The name is invalid.',
  'View Workspace': 'View Workspace',
  WORKSPACE: 'Workspace',
  WORKSPACE_PL: 'Workspaces',
  WORKSPACE_LOW: 'workspace',
  WORKSPACE_INFO: 'Workspace Information',
  'Workspace Logo': 'Workspace Logo',
  'Workspace Members': 'Workspace Members',
  WORKSPACE_MEMBER: 'Workspace Member',
  WORKSPACE_MEMBER_PL: 'Workspace Members',
  WORKSPACE_MEMBER_TCAP: 'Workspace member',
  WORKSPACE_MEMBER_TCAP_PL: 'Workspace members',
  'Workspace Name': 'Name',
  'Workspace name exists': 'The workspace name already exists.',
  WS_NETWORK_ISOLATION: 'Workspace network isolation',
  'Workspace Role': 'Workspace Role',
  WORKSPACE_ROLE_PL: 'Workspace Roles',
  WORKSPACE_SETTINGS: 'Workspace Settings',
  'Workspace Settings': 'Workspace Settings',
  Workspaces: 'Workspaces',
  'Workspaces Manager': 'Workspace Manager',
  devops: 'DevOps Projects',
  EDIT_WORKSPACE_QUOTAS: 'Edit Workspace Quotas',
  'Edit Workspace Quota': 'Edit Workspace Quota',
  SET_DEPARTMENTS: 'Set Departments',

  WORKSPACE_OVERVIEW_DESC: 'View the resource status of the workspace.',
  WORKSPACE_DESC:
    'A workspace is an isolated logical unit used to organize projects and DevOps projects, manage resource access, and share information within your team.',
  WORKSPACE_SEARCH_PLACEHOLDER: 'Enter a workspace name.',
  WORKSPACE_CREATE_DESC: 'Set the basic information about the workspace.',
  WORKSPACE_NAME_DESC:
    'You are advised to use a short workspace name such as the abbreviation of your company name.',
  WORKSPACE_LOGO_PLACEHOLDER:
    'The maximum size of the workspace logo is 200 x 200 pixels. Only PNG (recommended) and JPG formats are supported.',

  NO_WORKSPACE_TIP:
    'Your account does not belong to any workspace currently. Please create a workspace or contact the administrator to invite you to a workspace.',
  WORKSPACE_MEMBER_DESC:
    'Workspace members can view or manage workspace resources. You can manage members and control their permissions in the workspace.',
  INVITE_WORKSPACE_MEMBER_DESC: 'You can invite members to the workspace.',

  WORKSPACE_ROLE_DESC:
    'The role of a workspace member determines the permissions of the member in the workspace.',
  WORKSPACE_ROLE_EMPTY_DESC: 'Please create a workspace role.',
  SEARCH_WORKSPACE_TIP: 'Enter a workspace name.',

  NO_CLUSTER_AVAILABLE_DESC:
    'No cluster is available. After the workspace is created, please contact the platform or cluster administrator to authorize a cluster to the workspace.',

  WORKSPACE_NO_CLUSTER_TIP:
    'Please contact the platform or cluster administrator to authorize a cluster to the workspace.',

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
  DELETE_WORKSPACE_TIP:
    'Are you sure you want to delete the workspace <strong>{resource}</strong>? The workspace cannot be restored after it is deleted and all resources in the workspace will be removed.',

  DEPARTMENT_MANAGEMENT_DESC:
    'A department in a workspace is a logical unit used for permission control. You can set a workspace role, multiple project roles, and multiple DevOps project roles in a department, and assign users to the department to control user permissions in batches.',
  DEPARTMENT_EMPTY_DESC: 'No Department Available',
  WORKSPACE_GROUP_USER_EMPTY_DESC: 'No user available.',
  WORKSPACE_QUOTAS_DESC:
    'Workspace quotas are used to control the total resource usage of all projects and DevOps projects in a workspace.',

  DELETE_WORKSPACE_PROJECTS_DESC: 'Delete projects in the workspace',
  DELETE_WORDSPACE_RELATED_RESOURCES_DESC:
    'Delete the project associated with the workspace',

  // App Repositories
  ACCESS_KEY_ID: 'Access Key ID',
  SECRET_ACCESS_KEY: 'Secret Access Key',

  // Basic Information
  WORKSPACE_BASIC_INFO_DESC:
    'Basic information provides the overview of the workspace. You can view the basic information of the workspace.',
  SURE_TO_DELETE_WORKSPACE: 'Are you sure you want to delete the workspace?',
  ON: 'On',
  OFF: 'Off',
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  NETWORK_POLICY_UNINSATLLED_DESC:
    'The network policy component is not installed in this cluster.',
  WS_MEMBER_LOW: 'Workspace member',
  WS_MEMBER_LOW_PL: 'Workspace members',

  // Quota Management
  QUOTA_MANAGEMENT: 'Quota Management',
  RESOURCE_TYPE_LOW: 'Resource type',
  USED_PERCENT: 'Used: {percent}%',

  // Worksapce Members
  CHANGE_MEMBER_ROLE: 'Change Member Role',
  INVITE_MEMBER: 'Invite Member',
  INVITE: 'Invite',
  WORKSPACE_MEMBERS: 'Workspace Members',

  // Department Management
  'Workspace Groups': 'Department Mangement',
  NOT_ASSIGNED_TCAP: 'Not Assigned',
  ASSIGNED: 'Assigned',
  PROJECT_VALUE: 'Project: {value}',
  PROJECT_ROLE_VALUE: 'Project role: {value}',
  DEVOPS_VALUE: 'DevOps project: {value}',
  DEVOPS_PROJECT_ROLES_VALUE: 'DevOps project role: {value}',

  // Workspace Members > Details
  REMOVE_MEMBER_PL: 'Remove Members',
}
