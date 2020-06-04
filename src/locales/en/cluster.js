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
  IMPORT_CLUSTER_DESC: 'Import an existing Kubernetes cluster',

  CLUSTER_TAG: 'Tag',
  CLUSTER_TAG_DESC:
    'To indicate what the cluster is used for, such as a production environment, testing environment or demo environment',
  CLUSTER_PROVIDER_DESC: 'The cluster infrastructure provider',

  CLUSTER_BASE_INFO_DESC:
    'This module summarizes the basic information of the current cluster.',

  UNBIND_CLUSTER_DESC:
    'After the cluster is unbound, KubeSphere will be unable to manage the cluster and Kubernetes resources within the cluster will not be deleted.',
  SURE_TO_UNBIND_CLUSTER: 'I confirm I want to unbind the cluster.',

  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC:
    'Clusters can be assigned to workspaces through authorization.',

  PUBLIC_CLUSTER_DESC:
    'A public cluster means all platform users can access the cluster, in which they are able to create and schedule resources.',

  CLUSTER_AUTHORIZATION_DESC:
    'Clusters can be assigned to workspaces through authorization.',

  CLUSTER_VISIBILITY_Q1: 'How to authorize clusters to specific workspaces?',
  CLUSTER_VISIBILITY_A1: '',
  CLUSTER_VISIBILITY_Q2: 'What is a public cluster?',
  CLUSTER_VISIBILITY_A2:
    'A public cluster means all platform users can access the cluster, in which they are able to create and schedule resources.',
}
