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
  WORKSPACE_ROLE_PL: 'Roles del espacio de trabajo',
  WORKSPACE_ROLE_DESC: 'El rol del espacio de trabajo determina los permisos del rol en el espacio de trabajo actual.',
  // List
  WORKSPACE_ROLE_EMPTY_DESC: 'Please create a workspace role.',
  ROLE_WORKSPACE_ADMIN: 'Permite el acceso de administrador para realizar cualquier acción en cualquier recurso. Le da control total sobre todos los recursos en el espacio de trabajo.',
  ROLE_WORKSPACE_REGULAR: 'Usuario normal en el espacio de trabajo que no puede crear espacios de nombres o proyectos DevOps.',
  ROLE_WORKSPACE_VIEWER: 'Permite el acceso de lectura para ver todos los recursos en el espacio de trabajo.',
  ROLE_WORKSPACE_SELF_PROVISIONER: 'Usuario normal en el espacio de trabajo que puede crear espacios de nombres y proyectos DevOps.',
  // List > Create
  CREATE_WORKSPACE_ROLE: 'Crear rol de espacio de trabajo',
  WORKSPACE_ROLE_NAME_TIP: 'The role name is used as the unique identifier of the role.',
  NEXT_STEP: 'Next Step',
  NEXT_STEP_DESC: 'You need to further edit permissions of the role.',
  // List > Create > Edit Permissions > Project Management
  PROJECTS_CREATE: 'Creación de proyectos',
  PROJECTS_MANAGEMENT: 'Project Management',
  PROJECTS_VIEW: 'Vista de proyectos',
  PROJECTS_MANAGEMENT_DESC: 'Administra todos los proyectos en el espacio de trabajo, incluyendo la creación / edición / eliminación de proyectos',
  PROJECTS_CREATE_DESC: 'Autorización para crear proyectos. El creador será el administrador del proyecto',
  PROJECTS_VIEW_DESC: 'Ver todos los proyectos en el espacio de trabajo',
  // List > Create > Edit Permissions > DevOps Project Management
  DEVOPS_CREATE: 'Creación de DevOps',
  DEVOPS_MANAGEMENT: 'DevOps Project Management',
  DEVOPS_VIEW: 'Vista de DevOps',
  DEVOPS_MANAGEMENT_DESC: 'Administra todos los proyectos DevOps en el espacio de trabajo, incluyendo la creación / edición / eliminación de proyectos DevOps',
  DEVOPS_CREATE_DESC: 'Autorización para crear proyectos DevOps. El creador será el administrador del proyecto DevOps',
  DEVOPS_VIEW_DESC: 'Ver todos los proyectos de DevOps en el espacio de trabajo',
  // List > Create > Edit Permissions > App Management
  WORKSPACE_APP_REPOS_MANAGEMENT: 'Gestión de repositorios de aplicaciones del espacio de trabajo',
  WORKSPACE_APP_REPOS_VIEW: 'Vista de repositorios de aplicaciones del espacio de trabajo',
  WORKSPACE_APP_TEMPLATES_MANAGEMENT: 'Gestión de plantillas de aplicaciones del espacio de trabajo',
  WORKSPACE_APP_TEMPLATES_VIEW: 'Vista de plantillas de aplicación del espacio de trabajo',
  APP_TEMPLATES_MANAGEMENT: 'App Template Management',
  APP_TEMPLATES_VIEW: 'App Template Viewing',
  WORKSPACE_APP_REPOS_VIEW_DESC: 'Ver listas de repositorios de aplicaciones',
  WORKSPACE_APP_REPOS_MANAGEMENT_DESC: 'Crear / editar / eliminar repositorios de aplicaciones',
  WORKSPACE_APP_TEMPLATES_VIEW_DESC: 'Ver plantillas de aplicaciones de espacio de trabajo',
  WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC: 'Cargar / editar / eliminar plantillas de aplicaciones de espacio de trabajo; liberar / eliminar aplicaciones para la tienda de aplicaciones en la plataforma',
  // List > Create > Edit Permissions > Access Control
  WORKSPACE_GROUPS_MANAGEMENT: 'Workspace Department Management',
  WORKSPACE_GROUPS_VIEW: 'Workspace Department Viewing',
  DEPARTMENT_MANAGEMENT: 'Department Management',
  WORKSPACE_MEMBERS_MANAGEMENT: 'Gestión de miembros del espacio de trabajo',
  WORKSPACE_MEMBERS_VIEW: 'Vista de miembros del espacio de trabajo',
  WORKSPACE_ROLES_MANAGEMENT: 'Gestión de roles del espacio de trabajo',
  WORKSPACE_ROLES_VIEW: 'Vista de roles del espacio de trabajo',
  WORKSPACE_GROUPS_VIEW_DESC: 'Conceder permiso para ver la estructura y los miembros de la organización empresarial',
  WORKSPACE_GROUPS_MANAGEMENT_DESC: 'administrar la estructura organizacional de la empresa, invitar / remover miembros de la organización y autorizar la organización',
  WORKSPACE_ROLES_VIEW_DESC: 'Ver roles del espacio de trabajo',
  WORKSPACE_ROLES_MANAGEMENT_DESC: 'Crear, editar y eliminar roles del espacio de trabajo (los roles preestablecidos del sistema no se pueden eliminar)',
  WORKSPACE_MEMBERS_VIEW_DESC: 'Ver miembros del espacio de trabajo',
  WORKSPACE_MEMBERS_MANAGEMENT_DESC: 'Invitar / editar / eliminar miembros del espacio de trabajo',
  // List > Create > Edit Permissions > Workspace Settings
  WORKSPACE_SETTINGS_VIEW: 'vista de configuración del espacio de trabajo',
  WORKSPACE_SETTINGS_MANAGEMENT: 'gestión de la configuración del espacio de trabajo',
  WORKSPACE_SETTINGS_DESC: 'Concede permiso para gestionar el workspace: cambiar los parámetros, editar la información, network policies, etc.',
  WORKSPACE_SETTINGS_VIEW_DESC: 'Vea la configuración del espacio de trabajo.',
  WORKSPACE_SETTINGS_MANAGEMENT_DESC: 'Concede permiso para gestionar el workspace: cambiar los parámetros, editar la información, network policies, etc.'
};