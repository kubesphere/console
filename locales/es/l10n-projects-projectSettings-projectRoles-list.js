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
  PROJECT_ROLE_PL: 'Roles del proyecto',
  PROJECT_ROLE_DESC: 'Los roles de proyecto definen la autorización que los usuarios tienen en el proyecto actual.',
  // List
  ROLE_PROJECT_ADMIN: 'Permite el acceso de administrador para realizar cualquier acción en cualquier recurso. Le da control total sobre todos los recursos en el namespace.',
  ROLE_PROJECT_REGULAR: 'El que mantiene el namespace, que puede administrar recursos en el mismo excepto usuarios y roles.',
  ROLE_PROJECT_VIEWER: 'Permite el acceso de lectura para ver todos los recursos en el namespace.',
  ROLE_PROJECT_OPERATOR: 'El que mantiene el proyecto, que puede administrar recursos en el mismo excepto usuarios y roles.',
  PROJECT_ROLE_EMPTY_DESC: 'Please create a project role.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Edit Permissions > Application Workloads
  APPLICATION_WORKLOADS_MANAGEMENT: 'Gestión de workload de aplicaciones',
  APPLICATION_WORKLOADS_VIEW: 'Vista de workload de aplicaciones',
  APPLICATION_WORKLOADS_VIEW_DESC: 'Grant permission to view applications, services, workloads, jobs, grayscale releases and image builder tasks in the project',
  APPLICATION_WORKLOADS_MANAGEMENT_DESC: 'Grant permission to create, edit, and delete applications, services, workloads, jobs, grayscale releases and image builder tasks in the project',
  // List > Edit Permissions > Storage Management
  VOLUME_SNAPSHOTS_MANAGEMENT: 'Gestión de snapshots de volumen',
  VOLUME_SNAPSHOTS_VIEW: 'Vista de snapshots de volumen',
  VOLUMES_MANAGEMENT: 'Gestión de volúmenes',
  VOLUMES_VIEW: 'Vista de volúmenes',
  VOLUME_SNAPSHOTS_VIEW_DESC: 'Ver todas las instantáneas de volumen en el clúster',
  VOLUME_SNAPSHOTS_MANAGEMENT_DESC: 'Crear / editar / eliminar instantáneas de volumen',
  VOLUMES_VIEW_DESC: 'Ver volúmenes de proyectos',
  VOLUMES_MANAGEMENT_DESC: 'Crear / editar / eliminar volúmenes de proyecto',
  // List > Edit Permissions > Configuration Management
  CONFIGMAPS_MANAGEMENT: 'ConfigMaps Management',
  CONFIGMAPS_VIEW: 'ConfigMaps View',
  SECRETS_MANAGEMENT: 'Gestión de secretos',
  SECRETS_VIEW: 'Vista de secretos',
  SERVICEACCOUNT_MANAGEMENT: 'Gestión de cuentas de servicio',
  SERVICEACCOUNT_VIEW: 'Vista de cuenta de servicio',
  SECRETS_VIEW_DESC: 'Ver secretos del proyecto',
  SECRETS_MANAGEMENT_DESC: 'Crear / editar / eliminar secretos del proyecto',
  CONFIGMAPS_VIEW_DESC: 'Grant permission to view project configmaps',
  CONFIGMAPS_MANAGEMENT_DESC: 'Grant permission to create/edit/delete project configmaps',
  SERVICEACCOUNT_MANAGEMENT_DESC: 'Crear, editar y eliminar cuentas de servicio del proyecto',
  SERVICEACCOUNT_VIEW_DESC: 'Ver cuentas de servicio del proyecto',
  // List > Edit Permissions > Monitoring & Alerting
  ALERTING_MESSAGES_MANAGEMENT: 'Gestión de mensajes de alerta',
  ALERTING_MESSAGES_VIEW: 'Vista de mensajes de alerta',
  ALERTING_POLICIES_MANAGEMENT: 'Gestión de Políticas de alerta',
  ALERTING_POLICIES_VIEW: 'Vista de políticas de alerta',
  CUSTOM_MONITORING_VIEW: 'Custom Monitoring View',
  CUSTOM_MONITORING_MANAGEMENT: 'Custom Monitoring Management',
  CUSTOM_MONITORING_VIEW_DESC: 'Grant permission to view custom monitoring data',
  CUSTOM_MONITORING_MANAGEMENT_DESC: 'Grant permission to create and manage custom monitoring data',
  ALERTING_POLICIES_VIEW_DESC: 'Ver políticas de alertas',
  ALERTING_POLICIES_MANAGEMENT_DESC: 'Crear / editar / eliminar políticas de alertas',
  ALERTING_MESSAGES_VIEW_DESC: 'Ver mensajes de alerta',
  ALERTING_MESSAGES_MANAGEMENT_DESC: 'Comentar / eliminar mensajes de alerta',
  // List > Edit Permissions > Access Control
  PROJECT_MEMBERS_MANAGEMENT: 'Gestión de miembros de proyecto',
  PROJECT_MEMBERS_VIEW: 'Vista de miembros del proyecto',
  PROJECT_ROLES_MANAGEMENT: 'Gestión de Roles de Proyecto',
  PROJECT_ROLES_VIEW: 'Vista de roles de proyecto',
  PROJECT_ROLES_VIEW_DESC: 'Ver roles del proyecto',
  PROJECT_ROLES_MANAGEMENT_DESC: 'Crear, editar y eliminar roles de proyecto (los roles preestablecidos del sistema no se pueden eliminar)',
  PROJECT_MEMBERS_VIEW_DESC: 'Ver miembros del proyecto',
  PROJECT_MEMBERS_MANAGEMENT_DESC: 'Invitar / editar / eliminar miembros del proyecto',
  // List > Edit Permissions > Project Settings
  PROJECT_SETTINGS_DESC: 'Administra la configuración del proyecto y edita su información incluyendo el acceso a Internet, las políticas de red, la cuota de recursos y la recopilación y configuración del registro de disco',
  // List > Delete
  DELETE_ROLE: 'Delete Role',
  DELETE_ROLE_TIP: 'Are you sure you want to delete the role <strong>{resource}</strong>?',
  DELETE_ROLE_USER_TIP_PL: 'The role is authorized to <strong>{count}</strong> users. Please delete the users or change the roles of the user first.',
  DELETE_ROLE_USER_TIP: 'The role is authorized to <strong>{count}</strong> user. Please delete the user or change the role of the user first.',
  DELETE_ROLE_DEPARTMENT_TIP_PL: 'The role is authorized to <strong>{count}</strong> departments. Please delete the departments or change the roles of the departments first.',
  DELETE_ROLE_DEPARTMENT_TIP: 'The role is authorized to <strong>{count}</strong> department. Please delete the department or change the role of the department first.'
};