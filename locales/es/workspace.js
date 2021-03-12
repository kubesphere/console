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
  'Cluster Info': 'Información del clúster',
  'Create Workspace': 'Crear espacio de trabajo',
  'Create Workspace Role': 'Crear rol de espacio de trabajo',
  'Created Projects': 'Proyectos creados',
  'Delete Workspace': 'Eliminar espacio de trabajo',
  'DevOps Project Number': 'Número de proyecto DevOps',
  'Edit Quota': 'Editar quota',
  'Edit Workspace Role': 'Editar rol del espacio de trabajo',
  'Invite members to the workspace': 'Invitar miembros al espacio de trabajo',
  'Involved Projects': 'Proyectos involucrados',
  'Manage Organizations': 'Administrar organizaciones',
  'No Available Cluster': 'Clúster no disponible',
  'Please input workspace name': 'Introduce el nombre del espacio de trabajo',
  'Project Number': 'Número de proyecto',
  'Remove from Workspace': 'Eliminar del espacio de trabajo',
  'The current name is not applicable.': 'El nombre actual no es aplicable.',
  'View Workspace': 'Ver espacio de trabajo',
  Workspace: 'Espacio de trabajo',
  'Workspace Info': 'Información del espacio de trabajo',
  'Workspace Logo': 'Logotipo del espacio de trabajo',
  'Workspace Manager': 'Gestor del espacio de trabajo',
  'Workspace Members': 'Miembros del espacio de trabajo',
  'Workspace Name': 'Nombre del espacio de trabajo',
  'Workspace name exists': 'El nombre del espacio de trabajo ya existe',
  'Workspace Network Isolation': 'Aislamiento de red de espacio de trabajo',
  'Workspace Role': 'Rol del espacio de trabajo',
  'Workspace Roles': 'Roles del espacio de trabajo',
  'Workspace Settings': 'Configuración del espacio de trabajo',
  'Workspace Groups': 'Grupos de espacios de trabajo',
  'Maintain Organization': 'Mantener la estructura organizativa',

  'All members': 'Todos los miembros',
  Assigned: 'Asignado',

  projects: 'Projects',
  devops: 'DevOps Projects',
  'Workspace Quota': 'Workspace Quota',
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
    'Este módulo te permite administrar miembros del espacio de trabajo y asignarles roles. Los miembros en el espacio de trabajo actual pueden ser invitados como miembros del proyecto.',
  INVITE_WORKSPACE_MEMBER_DESC:
    'Puedes invitar a nuevos miembros a trabajar en el espacio de trabajo.',
  INVITE_WORKSPACE_MEMBER_SEARCH_PLACEHODLER:
    'Introduce direcciones de correo electrónico para invitar a miembros del espacio de trabajo',
  MEMBER_CREATE_DESC: '',
  WORKSPACE_ROLE_DESC:
    'El rol del espacio de trabajo determina los permisos del rol en el espacio de trabajo actual.',
  SEARCH_WORKSPACE_TIP: 'Introduce el nombre del espacio de trabajo a buscar',
  NO_PUBLIC_CLUSTER_TIP:
    'No hay clústeres públicos disponibles, solicita autorización para clúster al administrador de la plataforma o al administrador del clúster después de crear el espacio de trabajo',
  WORKSPACE_NO_CLUSTER_TIP:
    'Debes ponerte en contacto con el administrador de la plataforma o el administrador del clúster para que valide los derechos de acceso del clúster en el espacio de trabajo.',
  WORKSPACE_BASE_INFO_Q1:
    '¿Cómo solicitar más clústeres para el espacio de trabajo?',
  WORKSPACE_BASE_INFO_A1:
    'El administrador de la plataforma y el administrador del clúster operan y mantienen un clúster. Si necesitas más clústeres, ponte en contacto con el administrador de tu plataforma o envía una solicitud.',
  WORKSPACE_BASE_INFO_Q2: '¿Cómo definir una política de red?',
  WORKSPACE_BASE_INFO_A2: '',
  WORKSPACE_CLUSTERS_DESC:
    'La información del clúster muestra cómo se utilizan los recursos del clúster en el espacio de trabajo.',
  HOW_TO_APPLY_MORE_CLUSTER_Q:
    '¿Cómo solicitar más clústeres para el espacio de trabajo?',
  HOW_TO_APPLY_MORE_CLUSTER_A:
    'El administrador de la plataforma y el administrador del clúster operan y mantienen un clúster. Si necesita más clústeres, ponte en contacto con el administrador de tu plataforma o envía una solicitud.',
  DELETE_WORKSPACE_DESC:
    'El espacio de trabajo no se puede restaurar después de ser eliminado y los recursos en el espacio de trabajo también se eliminarán.',
  SURE_TO_DELETE_WORKSPACE: 'Deseas eliminar el espacio de trabajo?',
  DELETE_WORKSPACE_TIP:
    '¿Estás seguro de eliminar el espacio de trabajo <strong>{resource}</strong> ? No podrás recuperarlo, y los recursos en el espacio de trabajo también se eliminarán.',

  WORKSPACE_GROUP_DESC:
    'Project roles and DevOps roles can be assigned to members in a user group or department of an organization.',
  WORKSPACE_GROUP_EMPTY_DESC:
    'No hay una organización disponible por el momento, primero mantenga la organización y luego agregue miembros',
  WORKSPACE_GROUP_USER_EMPTY_DESC: 'Actualmente no hay miembros asignables',
  WORKSPACE_QUOTA_MANAGE_DESC:
    'Manage workspace quotas which are shared by all projects and DevOps projects in a workspace.',
}
