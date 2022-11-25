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
  WORKSPACE_DESC: 'Los espacios de trabajo son una unidad lógica para organizar tus proyectos de carga de trabajo / namespaces de Kubernetes, proyectos DevOps, administrar el acceso a recursos y compartir información dentro de tu equipo. Es un lugar de trabajo aislado para tu equipo.',
  // List
  CLUSTER_PL: 'Clusters',
  // List > Create > Basic Information
  CREATE_WORKSPACE: 'Crear espacio de trabajo',
  WORKSPACE_NAME_EMPTY_DESC: 'Introduce el nombre del espacio de trabajo',
  WORKSPACE_CREATE_DESC: 'Los esapcios de trabajo son una unidad lógica para organizar tus proyectos y proyectos DevOps. El acceso a los recursos y los recursos compartidos del equipo se pueden administrar aquí. Puede servir como un espacio de trabajo independiente para tu equipo.',
  ADMINISTRATOR: 'Administrator',
  WORKSPACE_NAME_EXISTS_DESC: 'The workspace name already exists.',
  INVALID_WORKSPACE_NAME: 'Invalid workspace name.',
  // List > Create > Cluster Settings
  SELECT_CLUSTERS_DESC: 'Selecciona el clúster disponible en el espacio de trabajo.',
  NO_CLUSTER_AVAILABLE: 'No Cluster Available',
  NO_CLUSTER_AVAILABLE_DESC: 'No hay clústeres públicos disponibles, solicita autorización para clúster al administrador de la plataforma o al administrador del clúster después de crear el espacio de trabajo',
  WORKSPACE_NO_CLUSTER_TIP: 'You need to contact the platform or cluster administrator to authorize a cluster to the workspace.',
  AVAILABLE_CLUSTERS: 'Clusters Disponibles',
  CLUSTER_SETTINGS: 'Configuraciones de clúster',
  SELECT_HOST_CLUSTER_WARNING: 'The visibility of the multi-cluster environment will decrease if the host cluster is overloaded. It is not recommended to create resources on the host cluster.',
  // List > Edit Information
  // List > Delete
  DELETE_WORKSPACE: 'Eliminar espacio de trabajo',
  WORKSPACE_LOW: 'workspace'
};