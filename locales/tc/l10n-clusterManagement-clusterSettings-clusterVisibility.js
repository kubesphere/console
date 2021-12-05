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
  CLUSTER_VISIBILITY: '集群能見度',
  EDIT_VISIBILITY_DESC: 'Edit the cluster visibility in workspaces.',
  UNAUTHORIZED: 'Unauthorized',
  CLUSTER_VISIBILITY_DESC: 'Cluster visibility controls the cluster authorization to workspaces. After a cluster is authorized to workspaces, you can view and manage the cluster resources in the workspaces.',
  CLUSTER_VISIBILITY_Q1: '如何將集群授權給指定的企業空間使用？',
  CLUSTER_VISIBILITY_A1: 'You can assign a cluster to specific workspaces by clicking Edit Visibility.',
  CLUSTER_VISIBILITY_Q2: '什麼是公開集群?',
  CLUSTER_VISIBILITY_A2: '公開狀態的集群意味著平台内的用戶都可以使用該集群，並在集群中創建和調度資源',
  // List
  WORKSPACE: '企業空間',
  CLUSTER_VISIBILITY_SCAP: '集群能見度',
  // List > Edit Visibility
  EDIT_VISIBILITY: '編輯可見範圍',
  AUTHORIZED: '已授權',
  SET_PUBLIC_CLUSTER: '設置為公開集群',
  HOST_CLUSTER_VISIBILITY_WARNING: '請謹慎將主集群授權给企業空間，主集群負載過高會導致多集群穩定性下降。',
  CLUSTER_VISIBILITY_REMOVE_WARNING: 'After the authorization for a workspace to use the cluster is removed, all resources of the workspace on the cluster will be deleted.',
  REMOVE_WORKSPACE_CONFIRM_TITLE: 'Remove Authorization',
  REMOVE_WORKSPACE_CONFIRM_SI: 'Enter the workspace name <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  REMOVE_WORKSPACE_CONFIRM_PL: 'Enter the workspace names <strong>{resource}</strong> to confirm that you understand the risks of this operation.'
};