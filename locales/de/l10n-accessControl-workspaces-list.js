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
  WORKSPACE_PL: 'Workspaces',
  WORKSPACE_DESC: 'A workspace is an isolated logical unit used to organize projects and DevOps projects, manage resource access, and share information within your team.',
  // List
  CLUSTER_PL: 'Cluster',
  // List > Create > Basic Information
  CREATE_WORKSPACE: 'Create Workspace',
  WORKSPACE_NAME_EMPTY_DESC: 'Please enter a workspace name.',
  WORKSPACE_CREATE_DESC: 'Set the basic information about the workspace.',
  ADMINISTRATOR: 'Administrator',
  WORKSPACE_NAME_EXISTS_DESC: 'The workspace name already exists.',
  INVALID_WORKSPACE_NAME: 'Invalid workspace name.',
  // List > Create > Cluster Settings
  SELECT_CLUSTERS_DESC: 'Select clusters to be used in the workspace.',
  NO_CLUSTER_AVAILABLE: 'No Cluster Available',
  NO_CLUSTER_AVAILABLE_DESC: 'No cluster is available. After the workspace is created, please contact the platform or cluster administrator to authorize a cluster to the workspace.',
  WORKSPACE_NO_CLUSTER_TIP: 'Please contact the platform or cluster administrator to authorize a cluster to the workspace.',
  AVAILABLE_CLUSTERS: 'Available Clusters',
  CLUSTER_SETTINGS: 'Cluster Settings',
  SELECT_HOST_CLUSTER_WARNING: 'The current system is a multi-cluster system. Please avoid creating resources in the host cluster if possible. Excessive loads in the host cluster will decrease the stability of the multi-cluster system.',
  // List > Edit Information
  // List > Delete
  DELETE_WORKSPACE: 'Delete Workspace',
  WORKSPACE_LOW: 'workspace'
};