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
  ADD_QUOTA: 'Agregar elemento de cuota',
  Closed: 'Cerrado',
  EDIT_DEFAULT_CONTAINER_QUOTA: 'Edit Default Container Quota',
  cronjobs: 'cronjobs',
  DaemonSet: 'DaemonSet',
  daemonsets: 'daemonsets',
  'Default limit resource': 'Recurso límite predeterminado',
  'default request CPU should not be greater than default limit CPU': 'la solicitud predeterminada de la CPU no debe ser mayor que la CPU predeterminada del límite',
  'default request memory should not be greater than default limit memory': 'la memoria de solicitud predeterminada no debe ser mayor que la memoria límite predeterminada',
  'Default request resource': 'Recurso de solicitud predeterminado',
  Deleting: 'Borrando',
  Deployment: 'Despliegue',
  deployments: 'implementaciones',
  Details: 'Detalles',
  'DevOps Projects': 'Proyectos DevOps',
  DISK_LOG_COLLECTION: 'Colección de registro de disco',
  EDIT_PROJECT: 'Editar proyecto',
  'Empty value means no limit, CPU 1 Core = 1000m': 'El valor vacío significa que no hay límite, 1 Core de CPU = 1000m',
  'Enter DevOps Project': 'Introduce el proyecto DevOps',
  'Enter Project': 'Entrar al proyecto',
  GATEWAY_PL: 'Gateways',
  'Help Information': 'Información de ayuda',
  'Invalid project name': 'Nombre de proyecto inválido',
  'Invite Member': 'Miembro invitado',
  INVITE_DEVOPS_MEMBER: 'Invitar miembros al proyecto DevOps',
  'Invite Members to the Project': 'Invitar miembros al proyecto',
  jobs: 'trabajos',
  LoadBalancer: 'LoadBalancer',
  MANAGE_PROJECT: 'Gestionar proyecto',
  'Member Name': 'Nombre de miembro',
  Members: 'Miembros',
  'Members Management': 'Gestión de miembros',
  'Modify Member Role': 'Modificar rol de miembro',
  'Modify Members Role': 'Modificar rol de miembros',
  'Multi-cluster Project': 'Proyecto de clúster múltiple',
  'Multi-cluster Projects': 'Proyectos de clústeres múltiples',
  MULTI_CLUSTER_PROJECT_DELETE_TIP: 'Borrar un proyecto multi-cluster borra también el mismo proyecto en el host de cluster.</br>Por favor, introduce el nombre {type} <strong>{resource}</strong> para estar seguro de que entiendes el riesgo de esta operación.',
  'No Platform Manage Authorization': 'Sin autorización de gestión de plataforma',
  'Not Assigned': 'No asignado',
  Opened: 'Abierto',
  'Please input project name': 'Por favor introduce el nombre del proyecto',
  pods: 'pods',
  'Project Member': 'Miembro del proyecto',
  'project members': 'miembros del proyecto',
  'Project name exists': 'El nombre del proyecto existe',
  'Project Overview': 'Descripción del proyecto',
  'Project Placement': 'Colocación del proyecto',
  PROJECT_QUOTA: 'Cuota de proyecto',
  'Project Role': 'Rol del proyecto',
  // Create Service Account Page
  Project_Admin: 'Project_Admin',
  Projects: 'Proyectos',
  projects: 'proyectos',
  'Quota Management': 'Gestión de cuotas',
  'Remove Member': 'Eliminar miembro',
  'Remove Members': 'Eliminar miembros',
  REQUESTS_CPU: 'CPU',
  REQUESTS_MEMORY: 'Memory Request',
  'Select Project Type': 'Seleccionar tipo de proyecto',
  StatefulSet: 'StatefulSet',
  statefulsets: 'statefulsets',
  'Target Workspace': 'Espacio de trabajo de destino',
  Terminating: 'Terminando',
  Usage: 'Uso',
  Volume: 'Volumen',
  'Number of volumes': 'Numero de volúmenes',
  RESOURCE_QUANTITY_LIMIT: 'Resource quantity limit',
  PROJECTS_DESC: 'Un proyecto es un namespace de Kubernetes en KubeSphere, que proporciona un mecanismo para organizar los recursos en un espacio de trabajo.',
  PROJECT_ADVANCE_DESC: 'Establecer la solicitud de recursos predeterminada del proyecto',
  PROJECT_BASEINFO_DESC: 'Configuración de información básica del proyecto',
  PROJECT_TYPES_PROJECT_TITLE: 'Crear un proyecto de recursos',
  PROJECT_TYPES_PROJECT_DESC: 'El proyecto en KubeSphere corresponde al namespace de Kubernetes, que es una colección abstracta de un conjunto de recursos y objetos que se pueden agrupar de acuerdo con diferentes unidades de negocio o proyectos de productos.',
  PROJECT_TYPES_DEVOPS_TITLE: 'Crear un proyecto DevOps',
  PROJECT_TYPES_DEVOPS_DESC: 'Cree y pruebe proyectos de software de forma continua y automática.',
  DELETE_MEMBER_TIP: '¿Estás seguro de eliminar el miembro <strong>{name}</strong> ? El miembro no podrá acceder a este proyecto una vez eliminado.',
  PROJECT_ADMIN_DESC: 'Puedes especificar un miembro del proyecto como administrador.',
  DELETE_INTERNET_ACCESS_TITLE: 'Remove Network Access Settings',
  DELETE_INTERNET_ACCESS_DESC: 'Are you sure you want to remove network access settings? You can reset the network access after the settings are removed.',
  NO_RELATE_PROJECTS_TITLE: 'Ningún proyecto asociado contigo',
  NO_RELATE_PROJECTS_DESC: 'Puedes crear o ponerse en contacto con el gerente del proyecto para invitarlo al proyecto a comenzar su trabajo.',
  DEFAULT_RESOURCE_UNIT_DESC: 'El valor de CPU indica el número de núcleos de CPU cuando no tiene unidad. 1 núcleo = 1000m',
  DEFAULT_RESOURCE_ALERT: 'Cuando creas una carga de trabajo, esta configuración se utilizará de manera predeterminada si el límite de recursos y la solicitud de la carga de trabajo no están establecidos. Si no hay requisitos especiales, mantenga esta configuración predeterminada sin cambios.',
  QUOTA_EDIT_TIP: 'Si el valor está vacío, la cuota de recursos no estará limitada.',
  WHAT_IS_INTERNET_GATEWAY: 'What is a network access gateway?',
  COLLECTING_FILE_LOG_DESC: 'Los registros de disco en el contenedor se recopilarán y exportarán a stdout, que luego recopilará el recopilador de registros del sistema.',
  PROJECT_MEMBERS_DESC: 'Gestionar y asignar roles para los miembros del proyecto.',
  PROJECT_ADVANCED_SETTINGS_DESC: 'Advanced settings are used to configure external access, application governance, and log collection in the project.',
  PROJECT_TYPES_Q: '¿Cómo puedes acceder a los servicios del proyecto a través de la red externa?',
  PROJECT_TYPES_A: 'La puerta de enlace del proyecto es responsable de crear el controlador de enrutamiento de la aplicación correspondiente para reenviar la solicitud al servicio de back-end correspondiente. Después de abrir la puerta de enlace del proyecto, el servicio puedes exponerse a la red externa a través de Ingress.',
  NETWORK_ISOLATED_DESC: 'Establecer estrategia de aislamiento de red',
  MULTI_CLUSER_PROJECT_TIP: 'El proyecto multi-clúster actual se ejecuta en distintos clústers. Puedes saltar entre clústers para comprobar los parámetros de este proyecto en cada uno de ellos.',
  // Custom Monotoring
  // Basic Information
  PROJECT_NAME_SCAP: 'Project name',
  WS_RESOURCE_REQUESTS: 'Resource requests:',
  // Concatenated
  WS_RESOURCE_LIMITS: 'Resource limits:',
  // Concatenated
  USAGE: 'Usage',
  // Project Members
  PROJECT_MEMBER: 'Project Member'
};