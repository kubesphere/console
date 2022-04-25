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
  CLUSTER_VISIBILITY: 'Cluster Visibility',
  EDIT_VISIBILITY_DESC: 'Edit the cluster visibility in workspaces.',
  UNAUTHORIZED: 'Unauthorized',
  CLUSTER_VISIBILITY_DESC: 'Cluster visibility controls the cluster authorization to workspaces. After a cluster is authorized to workspaces, you can view and manage the cluster resources in the workspaces.',
  CLUSTER_VISIBILITY_Q1: 'How do I authorize a cluster to specific workspaces?',
  CLUSTER_VISIBILITY_A1: 'You can assign a cluster to specific workspaces by clicking Edit Visibility.',
  CLUSTER_VISIBILITY_Q2: '¿Qué es un clúster público?',
  CLUSTER_VISIBILITY_A2: 'Un clúster público significa que todos los usuarios de la plataforma pueden acceder al clúster, en el que pueden crear y programar recursos.',
  // List
  WORKSPACE: 'Espacio de trabajo',
  CLUSTER_VISIBILITY_SCAP: 'Visibilidad de clúster',
  AUTHORIZATION_TIME_TCAP: 'Authorization Time',
  // List > Edit Visibility
  EDIT_VISIBILITY: 'Editar visibilidad',
  AUTHORIZED: 'Autorizado',
  SET_PUBLIC_CLUSTER: 'Set as Public Cluster',
  HOST_CLUSTER_VISIBILITY_WARNING: 'The visibility of the multi-cluster environment will decrease if the host cluster is overloaded. Exercise caution when assigning the host cluster to workspaces.',
  CLUSTER_VISIBILITY_REMOVE_WARNING: 'After the authorization for a workspace to use the cluster is removed, all resources of the workspace on the cluster will be deleted.',
  REMOVE_WORKSPACE_CONFIRM_TITLE: 'Remove Authorization',
  REMOVE_WORKSPACE_CONFIRM_SI: 'Enter the workspace name <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  REMOVE_WORKSPACE_CONFIRM_PL: 'Enter the workspace names <strong>{resource}</strong> to confirm that you understand the risks of this operation.'
};