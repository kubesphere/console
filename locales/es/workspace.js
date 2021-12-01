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
  'Cluster Authorization Info': 'Información de autorización de clúster',
  CREATE_WORKSPACE: 'Crear espacio de trabajo',
  CREATE_WORKSPACE_ROLE: 'Crear rol de espacio de trabajo',
  'Created Projects': 'Proyectos creados',
  DELETE_WORKSPACE: 'Eliminar espacio de trabajo',
  'DevOps Project Number': 'Número de proyecto DevOps',
  EDIT_QUOTAS: 'Editar quota',
  'Edit Workspace Role': 'Editar rol del espacio de trabajo',
  'Involved Projects': 'Proyectos involucrados',
  'Manage Organizations': 'Administrar organizaciones',
  NO_AVAILABLE_CLUSTER: 'Clúster no disponible',
  WORKSPACE_NAME_EMPTY_DESC: 'Introduce el nombre del espacio de trabajo',
  'Project Number': 'Número de proyecto',
  'Remove from Workspace': 'Eliminar del espacio de trabajo',
  'The current name is not applicable.': 'El nombre actual no es aplicable.',
  'View Workspace': 'Ver espacio de trabajo',
  WORKSPACE: 'Espacio de trabajo',
  WORKSPACE_PL: 'Workspaces',
  WORKSPACE_LOW: 'workspace',
  WORKSPACE_INFO: 'Información del espacio de trabajo',
  'Workspace Logo': 'Logotipo del espacio de trabajo',
  'Workspace Members': 'Miembros del espacio de trabajo',
  WORKSPACE_MEMBER: 'Workspace Member',
  WORKSPACE_MEMBER_PL: 'Workspace Members',
  WORKSPACE_MEMBER_TCAP: 'Workspace member',
  WORKSPACE_MEMBER_TCAP_PL: 'Workspace members',
  'Workspace Name': 'Nombre del espacio de trabajo',
  'Workspace name exists': 'El nombre del espacio de trabajo ya existe',
  WS_NETWORK_ISOLATION: 'Aislamiento de red de espacio de trabajo',
  'Workspace Role': 'Rol del espacio de trabajo',
  WORKSPACE_ROLE_PL: 'Roles del espacio de trabajo',
  WORKSPACE_SETTINGS: 'Configuración del espacio de trabajo',
  'Workspace Settings': 'Configuración del espacio de trabajo',
  DEPARTMENT_MANAGEMENT: 'Department Management',
  SET_DEPARTMENTS: 'Set Departments',
  DEPARTMENT_PL: 'Grupos de espacios de trabajo',
  'Maintain Organization': 'Mantener la estructura organizativa',

  'All members': 'Todos los miembros',
  Assigned: 'Asignado',

  devops: 'DevOps Projects',
  EDIT_WORKSPACE_QUOTAS: 'Edit Workspace Quotas',
  'Edit Workspace Quota': 'Edit Workspace Quota',
  Workspaces: 'Espacios de trabajo',
  'Workspaces Manager': 'Gestor de espacios de trabajo',
  WORKSPACE_OVERVIEW_DESC:
    'Workspace proporciona a KubeSphere una plataforma segura, aislada y accesible. Aquí puedes ver el estado de ejecución de los recursos en el espacio de trabajo actual.',
  WORKSPACE_DESC:
    'Los espacios de trabajo son una unidad lógica para organizar tus proyectos de carga de trabajo / namespaces de Kubernetes, proyectos DevOps, administrar el acceso a recursos y compartir información dentro de tu equipo. Es un lugar de trabajo aislado para tu equipo.',
  WORKSPACE_SEARCH_PLACEHOLDER:
    'Introduce el nombre de tu espacio de trabajo para encontrarlo',
  WORKSPACE_CREATE_DESC:
    'Los esapcios de trabajo son una unidad lógica para organizar tus proyectos y proyectos DevOps. El acceso a los recursos y los recursos compartidos del equipo se pueden administrar aquí. Puede servir como un espacio de trabajo independiente para tu equipo.',
  WORKSPACE_NAME_DESC:
    'Usa un nombre de espacio de trabajo corto, como por ejemplo la abreviatura del nombre de tu empresa.',
  WORKSPACE_LOGO_PLACEHOLDER:
    'El tamaño del logotipo del espacio de trabajo debe ser inferior a 200 px X 200 px y admite formato PNG, JPG. Se recomienda cargar una imagen en formato PNG con un fondo transparente para una mejor visualización.',
  NO_WORKSPACE_TIP:
    'Tu cuenta no pertenece a ningún espacio de trabajo actualmente. Crea uno o ponte en contacto con el administrador para que te invite a un espacio de trabajo.',
  WORKSPACE_MEMBER_DESC:
    'Workspace members can view or manage workspace resources. You can manage members and control their permissions in the workspace.',
  INVITE_WORKSPACE_MEMBER_DESC: 'You can invite members to the workspace.',
  WORKSPACE_ROLE_DESC:
    'El rol del espacio de trabajo determina los permisos del rol en el espacio de trabajo actual.',
  SEARCH_WORKSPACE_TIP: 'Introduce el nombre del espacio de trabajo a buscar',
  WORKSPACE_ROLE_EMPTY_DESC: 'Please create a workspace role.',
  NO_CLUSTER_AVAILABLE_DESC:
    'No hay clústeres públicos disponibles, solicita autorización para clúster al administrador de la plataforma o al administrador del clúster después de crear el espacio de trabajo',
  WORKSPACE_NO_CLUSTER_TIP:
    'You need to contact the platform or cluster administrator to authorize a cluster to the workspace.',
  WORKSPACE_BASE_INFO_Q1:
    '¿Cómo solicitar más clústeres para el espacio de trabajo?',
  WORKSPACE_BASE_INFO_A1:
    'Contact the platform or cluster administrator to apply for more clusters.',
  WORKSPACE_BASE_INFO_Q2: '¿Cómo definir una política de red?',
  WORKSPACE_BASE_INFO_A2: '',
  WORKSPACE_CLUSTERS_DESC:
    'La información del clúster muestra cómo se utilizan los recursos del clúster en el espacio de trabajo.',
  HOW_TO_APPLY_MORE_CLUSTER_Q:
    '¿Cómo solicitar más clústeres para el espacio de trabajo?',
  HOW_TO_APPLY_MORE_CLUSTER_A:
    'Contact the platform or cluster administrator to apply for more clusters.',
  DELETE_WORKSPACE_DESC:
    'El espacio de trabajo no se puede restaurar después de ser eliminado y los recursos en el espacio de trabajo también se eliminarán.',
  DELETE_WORKSPACE_TIP:
    '¿Estás seguro de eliminar el espacio de trabajo <strong>{resource}</strong> ? No podrás recuperarlo, y los recursos en el espacio de trabajo también se eliminarán.',

  DEPARTMENT_MANAGEMENT_DESC:
    'A department in a workspace is a logical unit used for permission control. You can set a workspace role, multiple project roles, and multiple DevOps project roles in a department, and assign users to the department to control user permissions in batches.',
  DEPARTMENT_EMPTY_DESC: 'No Department Available',
  WORKSPACE_GROUP_USER_EMPTY_DESC: 'Actualmente no hay miembros asignables',
  WORKSPACE_QUOTAS_DESC:
    'Workspace quotas are used to control the total resource usage of all projects and DevOps projects in a workspace.',

  DELETE_WORKSPACE_PROJECTS_DESC:
    'Eliminar el proyecto asociado con el espacio empresarial',

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
  WS_MEMBER_SCAP: 'Workspace member',
  WS_MEMBER_SCAP_PL: 'Workspace members',

  // Quota Management
  QUOTA_MANAGEMENT: 'Quota Management',
  RESOURCE_LIMIT: 'Resource limit',
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
