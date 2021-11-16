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
  CLUSTER: 'Cluster',
  CLUSTER_PL: 'Clusters',
  CLUSTER_VALUE: 'Cluster: {value}',
  ADD_QUOTA: 'Agregar elemento de cuota',
  DISABLE_LOG_COLLECTION: 'Disable Log Collection',
  ASSIGN_WORKSPACE: 'Asignar espacio de trabajo',
  SELECT_WORKSPACE_DESC: 'Elige un espacio de trabajo',
  Closed: 'Cerrado',
  EDIT_DEFAULT_CONTAINER_QUOTA: 'Edit Default Container Quota',
  EDIT_DEFAULT_CONTAINER_QUOTAS: 'Edit Default Container Quotas',
  DEFAULT_CONTAINER_QUOTA_PL: 'Default Container Quotas',
  CREATE_MULTI_CLUSTER_PROJECT: 'Crear proyecto de clúster múltiple',
  CREATE_PROJECT: 'Crear proyecto',
  cronjobs: 'cronjobs',
  DaemonSet: 'DaemonSet',
  daemonsets: 'daemonsets',
  'Default limit resource': 'Recurso límite predeterminado',
  'default request CPU should not be greater than default limit CPU':
    'la solicitud predeterminada de la CPU no debe ser mayor que la CPU predeterminada del límite',
  'default request memory should not be greater than default limit memory':
    'la memoria de solicitud predeterminada no debe ser mayor que la memoria límite predeterminada',
  'Default request resource': 'Recurso de solicitud predeterminado',
  Deleting: 'Borrando',
  Deployment: 'Despliegue',
  deployments: 'implementaciones',
  Details: 'Detalles',
  'DevOps Projects': 'Proyectos DevOps',
  DISK_LOG_COLLECTION: 'Colección de registro de disco',
  COLLECT_LOGS_ON_VOLUMES: 'Colección de registro de disco',
  LOG_COLLECTION_ENABLED_DESC:
    'After this function is enabled or disabled, you need to restart the Pod replicas to make the change take effect.',
  EDIT_PROJECT: 'Editar proyecto',
  EDIT_PROJECT_QUOTA: 'Edit Project Quota',
  'Empty value means no limit, CPU 1 Core = 1000m':
    'El valor vacío significa que no hay límite, 1 Core de CPU = 1000m',
  'Enter DevOps Project': 'Introduce el proyecto DevOps',
  'Enter Project': 'Entrar al proyecto',
  FED_HOST_NAMESPACE_TIP:
    'Por favor, no manipules los recursos de este proyecto puesto que pertence a un proyecto multicluster',
  GATEWAY: 'Información de puerta de enlace',
  GATEWAY_NOT_ENABLED: 'Puerta de enlace no establecida',
  'Help Information': 'Información de ayuda',
  HOW_TO_INVITE_USERS: '¿Cómo invitar a otros miembros al proyecto actual?',
  HOW_TO_SET_PROJECT_GATEWAY:
    '¿Cómo configurar la puerta de enlace del proyecto?',
  'Invalid project name': 'Nombre de proyecto inválido',
  'Invite Member': 'Miembro invitado',
  INVITE_DEVOPS_MEMBER: 'Invitar miembros al proyecto DevOps',
  'Invite Members to the Project': 'Invitar miembros al proyecto',
  jobs: 'trabajos',
  LIMITS_CPU: 'limit.cpu',
  LIMITS_MEMORY: 'limits.memoria',
  LoadBalancer: 'LoadBalancer',
  MANAGE_PROJECT: 'Gestionar proyecto',
  'Member Name': 'Nombre de miembro',
  Members: 'Miembros',
  'Members Management': 'Gestión de miembros',
  'Modify Member Role': 'Modificar rol de miembro',
  'Modify Members Role': 'Modificar rol de miembros',
  'Multi-cluster Project': 'Proyecto de clúster múltiple',
  MULTI_CLUSTER_PROJECT: 'Proyecto de clúster múltiple',
  MULTI_CLUSTER_PROJECT_LOW: 'Proyecto de clúster múltiple',
  MULTI_CLUSTER_PROJECT_SCAP: 'Multi-cluster project',
  'Multi-cluster Projects': 'Proyectos de clústeres múltiples',
  MULTI_CLUSTER_PROJECT_PL: 'Proyectos de clústeres múltiples',
  PROJECT_NAME_EXISTS_IN_HOST: 'The project name exists on the host cluster.',
  FEDPROJECT_CANNOT_ADD_CLUSTER: 'Unable to add a new cluster',

  MULTI_CLUSTER_PROJECT_DELETE_TIP:
    'Borrar un proyecto multi-cluster borra también el mismo proyecto en el host de cluster.</br>Por favor, introduce el nombre {type} <strong>{resource}</strong> para estar seguro de que entiendes el riesgo de esta operación.',
  'No Platform Manage Authorization':
    'Sin autorización de gestión de plataforma',
  'Not Assigned': 'No asignado',
  Opened: 'Abierto',
  'Please input project name': 'Por favor introduce el nombre del proyecto',
  pods: 'pods',
  PROJECT_INFO: 'Información del proyecto',
  PROJECT_ADMINISTRATOR: 'Gestor de proyecto',
  'Project Member': 'Miembro del proyecto',
  PROJECT_MEMBER_PL: 'Miembros del proyecto',
  'project members': 'miembros del proyecto',
  PROJECT_NAME: 'Nombre del proyecto',
  'Project name exists': 'El nombre del proyecto existe',
  'Project name exists on host cluster':
    'El nombre del proyecto existe en el clúster',
  'Project Overview': 'Descripción del proyecto',
  'Project Placement': 'Colocación del proyecto',
  PROJECT_QUOTA: 'Cuota de proyecto',
  EDIT_PROJECT_QUOTAS: 'Edit Project Quotas',
  'Project Role': 'Rol del proyecto',
  // Create ServiceAccount Page
  PROJECT_ROLE_SI: 'Rol del proyecto',
  PROJECT_ROLE_PL: 'Roles del proyecto',
  Project_Admin: 'Project_Admin',
  Projects: 'Proyectos',
  projects: 'proyectos',
  'Quota Management': 'Gestión de cuotas',
  REMOVE_MEMBER: 'Eliminar miembro',
  REMOVE_MULTIPLE_MEMBERS: 'Remove Multiple Members',
  REMOVE_MULTIPLE_MEMBERS_TIP:
    'Enter the usernames <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  WORKSPACE_QUOTA_PL: 'Workspace Quotas',
  PROJECT_QUOTA_PL: 'Project Quotas',
  'Remove Member': 'Eliminar miembro',
  'Remove Members': 'Eliminar miembros',
  REQUESTS_CPU: 'CPU',
  REQUESTS_MEMORY: 'Memory Request',
  RESOURCE_QUOTA_PL: 'Cuota de recursos',
  PROJECT_RESOURCE_QUOTAS: 'Project Resource Quotas',
  RESOURCE_TYPE: 'Tipo de recurso',
  RESOURCE_TYPE_SCAP: 'Tipo de recurso',
  PROJECT_ADMINISTRATOR_DESC:
    'Selecciona un usuario del espacio de trabajo como administrador del proyecto.',
  'Select Project Type': 'Seleccionar tipo de proyecto',
  SELECT_CLUSTER_DESC: 'Selecciona el clúster para crear el proyecto.',
  CLUSTER_EMPTY_DESC: 'Selecciona un cluster, por favor.',
  ENABLE_GATEWAY: 'Establecer puerta de enlace',
  StatefulSet: 'StatefulSet',
  statefulsets: 'statefulsets',
  'Target Workspace': 'Espacio de trabajo de destino',
  Terminating: 'Terminando',
  Usage: 'Uso',
  Volume: 'Volumen',
  'Number of volumes': 'Numero de volúmenes',
  RESOURCE_QUANTITY_LIMIT: 'Resource quantity limit',
  PROJECTS_DESC:
    'Un proyecto es un namespace de Kubernetes en KubeSphere, que proporciona un mecanismo para organizar los recursos en un espacio de trabajo.',
  CREATE_PROJECT_DESC:
    'Un proyecto es un namespace de Kubernetes en KubeSphere, que proporciona un mecanismo para organizar los recursos en un espacio de trabajo.',
  PROJECT_ADVANCE_DESC:
    'Establecer la solicitud de recursos predeterminada del proyecto',
  PROJECT_NAME_DESC:
    'Solo puede contener letras minúsculas, números y guiones ("-"), y debe comenzar con una letra minúscula y terminar con un número o letra minúscula. La longitud máxima de caracteres se establece en 63.',
  PROJECT_NAME_INVALID_DESC:
    'Solo puede contener letras minúsculas, números y guiones ("-"), y debe comenzar con una letra minúscula y terminar con un número o letra minúscula. La longitud máxima de caracteres se establece en 63.',
  PROJECT_BASEINFO_DESC: 'Configuración de información básica del proyecto',
  PROJECT_TYPES_PROJECT_TITLE: 'Crear un proyecto de recursos',
  PROJECT_TYPES_PROJECT_DESC:
    'El proyecto en KubeSphere corresponde al namespace de Kubernetes, que es una colección abstracta de un conjunto de recursos y objetos que se pueden agrupar de acuerdo con diferentes unidades de negocio o proyectos de productos.',
  PROJECT_TYPES_DEVOPS_TITLE: 'Crear un proyecto DevOps',
  PROJECT_TYPES_DEVOPS_DESC:
    'Cree y pruebe proyectos de software de forma continua y automática.',
  PROJECT_ASSIGN_DESC:
    'Una vez que el proyecto se asigna a un espacio de trabajo ya no se puedes cambiar.',
  INVITE_MEMBER_DESC:
    'You can invite members who belong to the workspace to the project.',
  PROJECT_MEMBER_EMPTY_DESC:
    'Please invite a member of the current workspace to the project.',
  INVITE_MEMBER_DESC_DEVOPS:
    'You can invite members who belong to the workspace to the DevOps project.',
  INVITE_MEMBER_SEARCH_PLACEHOLDER:
    'Introduce una dirección de correo electrónico para invitar miembros',
  ASSIGN_ROLE: 'Assign Role',
  DELETE_MEMBER_TIP:
    '¿Estás seguro de eliminar el miembro <strong>{name}</strong> ? El miembro no podrá acceder a este proyecto una vez eliminado.',
  PROJECT_ADMIN_DESC:
    'Puedes especificar un miembro del proyecto como administrador.',
  ENABLE_GATEWAY_DESC:
    'Antes de crear una ruta, debe habilitar el portal de acceso a Internet (es decir, la puerta de enlace). Este paso crea un controlador de enrutamiento correspondiente para reenviar la solicitud al servicio de back-end correspondiente.',
  DELETE_INTERNET_ACCESS_TITLE: 'Remove Network Access Settings',
  DELETE_INTERNET_ACCESS_DESC:
    'Are you sure you want to remove network access settings? You can reset the network access after the settings are removed.',
  NO_RELATE_PROJECTS_TITLE: 'Ningún proyecto asociado contigo',
  NO_RELATE_PROJECTS_DESC:
    'Puedes crear o ponerse en contacto con el gerente del proyecto para invitarlo al proyecto a comenzar su trabajo.',
  DELETE_PROJECT_TIP:
    '¿Está seguro de eliminar el proyecto <strong>{resource}</strong> ? Después de la eliminación no podrás recuperarlo y los recursos del proyecto también serán destruidos.',
  DEFAULT_RESOURCE_UNIT_DESC:
    'El valor de CPU indica el número de núcleos de CPU cuando no tiene unidad. 1 núcleo = 1000m',
  DEFAULT_RESOURCE_ALERT:
    'Cuando creas una carga de trabajo, esta configuración se utilizará de manera predeterminada si el límite de recursos y la solicitud de la carga de trabajo no están establecidos. Si no hay requisitos especiales, mantenga esta configuración predeterminada sin cambios.',
  QUOTA_EDIT_TIP:
    'Si el valor está vacío, la cuota de recursos no estará limitada.',
  HOW_TO_USE_QUOTA_Q: 'How do I use resource quotas?',
  HOW_TO_USE_QUOTA_A:
    'Resource quotas are a mechanism used to limit the resource usage. You can edit project resource quotas and default container quotas by clicking <b>Edit Project</b>.',
  DEFAULT_CONTAINER_QUOTAS_DESC:
    'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',
  PROJECT_QUOTAS_DESC:
    'Project quotas specify the number of available CPU and memory resources and the maximum number of application resources such as Pods, Deployments, and Services allowed in the project.',
  WHAT_IS_COLLECT_FILE_LOG_A:
    'La ruta de registro en el volumen montado en el contenedor se da en un patrón global. La ruta de registro se puede configurar en el workload para recopilar registros. El administrador debe habilitar la recopilación de registros de disco de antemano.',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_Q: 'What are default container quotas?',
  WHAT_ARE_DEFAULT_CONTAINER_QUOTAS_A:
    'Default container quotas specify the default CPU request, CPU limit, memory request, and memory limit of containers created in the project.',
  WHAT_IS_INTERNET_GATEWAY: 'What is a network access gateway?',
  COLLECT_LOGS_ON_VOLUMES_A:
    'To collect logs on volumes, you need to mount a volume in read and write mode to a container and set the container to export logs to the volume.',
  HOW_TO_INVITE_MEMBER_Q: 'How do I invite members to the project?',
  HOW_TO_INVITE_MEMBER_A:
    'The project administrator or users who have permission to invite project members can invite workspace members to the project.',
  DISABLE_LOG_COLLECTION_TIP:
    'Are you sure you want to disable log collection? After it is disabled, services that have enabled log collection will continue to collect logs saved in the volumes before the Pod replicas are restarted. If you need to collect the logs again, please enable log collection and restart the Pod replicas.',
  COLLECTING_FILE_LOG_DESC:
    'Los registros de disco en el contenedor se recopilarán y exportarán a stdout, que luego recopilará el recopilador de registros del sistema.',
  PROJECT_BASIC_INFO_DESC:
    'Basic information provides an overview of the project. You can view the project information and resource quotas.',
  PROJECT_ROLE_DESC:
    'Los roles de proyecto definen la autorización que los usuarios tienen en el proyecto actual.',
  SERVICE_ACCOUNT_PROJECT_ROLE_DESC:
    'Select the role of the service account in the current project.',
  PROJECT_ROLE_EMPTY_DESC: 'Please create a project role.',
  PROJECT_MEMBERS_DESC:
    'Gestionar y asignar roles para los miembros del proyecto.',
  PROJECT_ADVANCED_SETTINGS_DESC:
    'Advanced settings are used to configure external access, application governance, and log collection in the project.',
  PROJECT_TYPES_Q:
    '¿Cómo puedes acceder a los servicios del proyecto a través de la red externa?',
  PROJECT_TYPES_A:
    'La puerta de enlace del proyecto es responsable de crear el controlador de enrutamiento de la aplicación correspondiente para reenviar la solicitud al servicio de back-end correspondiente. Después de abrir la puerta de enlace del proyecto, el servicio puedes exponerse a la red externa a través de Ingress.',
  PROJECT_NAME_EXISTS_IN_CLUSTER: 'El nombre existe en {cluster}',
  PROJECT_CLUSTER_SETTINGS_DESC:
    'Selecciona el clúster para crear el proyecto. Cuando se seleccionan varios grupos, se creará un proyecto de múltiples grupos.',
  NETWORK_ISOLATED_DESC: 'Establecer estrategia de aislamiento de red',
  FEDPROJECT_RESOURCE_TIP:
    'No se pueden crear recursos de proyectos de múltiples clústeres en la administración de clústeres, vaya a la página del proyecto de múltiples clústeres para operar.',
  FEDPROJECT_CANNOT_DEPLOY_APP_TIP:
    'No se pueden implementar aplicaciones en proyectos de múltiples clústeres.',
  MULTI_CLUSER_PROJECT_TIP:
    'El proyecto multi-clúster actual se ejecuta en distintos clústers. Puedes saltar entre clústers para comprobar los parámetros de este proyecto en cada uno de ellos.',
  MULTI_CLUSTER_RESOURCE_TIP:
    'El recurso multi-clúster actual se ejecuta en distintos clústers. Puedes saltar entre clústers para comprobar los parámetros de este recurso en cada uno de ellos.',

  CREATE_MULTI_CLUSTER_PROJECT_DESC:
    'Un proyecto multi-clúster se ejecuta sobre distintos clústers a la vez, lo que ayuda a que puedas construir un entorno de contenedores para una rápida iteración de aplicaciones y conseguir alta disponibilidad.',

  PROJECT_QUOTAS_NOT_SET: 'Project Quota Not Set',
  DEFAULT_CONTAINER_QUOTAS_NOT_SET: 'Resource Default Request Not Set',

  // Custom Monotoring
  CUSTOM_MONITORING_DASHBOARD_LOW: 'custom monitoring dashbord',

  // Basic Information
  PROJECT_NAME_SCAP: 'Project name',
  PROJECT_ROLE_SCAP: 'Project role',
  PROJECT_ROLE_SCAP_PL: 'Project roles',
  PROJECT_MEMBER_SCAP: 'Project member',
  PROJECT_MEMBER_SCAP_PL: 'Project members',
  CPU_REQUEST_LOW: 'CPU request',
  CPU_LIMIT_LOW: 'CPU limit',
  MEMORY_REQUEST_SCAP: 'Memory request',
  MEMORY_LIMIT_SCAP: 'Memory limit',
  CPU_REQUEST_CORE: '{value} Core',
  CPU_LIMIT_CORE: '{value} Core',
  MEMORY_REQUEST_MIB: '{value} Mi',
  MEMORY_LIMIT_MIB: '{value} Mi',
  WS_RESOURCE_REQUESTS: 'Resource requests:',
  WS_RESOURCE_LIMITS: 'Resource limits:',
  SELECT_RESOURCE_TIP: 'Select a resource or enter a resource name',
  NUMBER_OF_ROUTES: 'Number of Routes',
  NUMBER_OF_SECRETS: 'Number of Secrets',
  NUMBER_OF_CONFIGMAPS: 'Number of ConfigMaps',
  USAGE: 'Usage',

  // Project Members
  PROJECT_MEMBER: 'Project Member',
  PROJECT_MEMBER_DESC:
    'Project members can view or manage project resources. The project administrator can invite members who belong to the workspace to the project and manage project members.',

  // Advanced Settings
  REMOVE: 'Remove',
  DISABLED: 'Disabled',
  ENABLE: 'Enable',
  DISABLE: 'Disable',
  ENABLE_GATEWAY_TIP:
    'To use the gateway, please configure the gateway in the cluster or the project.',

  // Network Isolation
  INGRESS: 'Ingress',
  INTERNAL_TRAFFIC_DIRECTION_DESC:
    'Egress indicates the direction from the current project to other projects. Ingress indicates the direction from other projects to the current project.',
  NETWORK_SEGMENT_EXAMPLE: 'Example: 10.0.0.0',
  PORT_EXAMPLE: 'Example: 80',
}
