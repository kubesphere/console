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
  'Add Quota Item': 'Agregar elemento de cuota',
  'Are you sure to disable it?': '¿Estás seguro de deshabilitarlo?',
  'Assign Workspace': 'Asignar espacio de trabajo',
  'Choose a workspace': 'Elige un espacio de trabajo',
  Closed: 'Cerrado',
  'Container Resource Default Request':
    'Solicitud predeterminada de recursos de contenedor',
  'Create Multi-cluster Project': 'Crear proyecto de clúster múltiple',
  'Create Project': 'Crear proyecto',
  cronjobs: 'cronjobs',
  DaemonSet: 'DaemonSet',
  daemonsets: 'daemonsets',
  'Default limit resource': 'Recurso límite predeterminado',
  'default request CPU should not be greater than default limit CPU':
    'la solicitud predeterminada de la CPU no debe ser mayor que la CPU predeterminada del límite',
  'default request memory should not be greater than default limit memory':
    'la memoria de solicitud predeterminada no debe ser mayor que la memoria límite predeterminada',
  'Default request resource': 'Recurso de solicitud predeterminado',
  'Delete Project': 'Eliminar proyecto',
  Deleting: 'Borrando',
  Deployment: 'Despliegue',
  deployments: 'implementaciones',
  Details: 'Detalles',
  'DevOps Project': 'Proyecto DevOps',
  'DevOps Projects': 'Proyectos DevOps',
  'Disk Log Collection': 'Colección de registro de disco',
  'Disk Log Collection of the project is about to be disabled.':
    'La recopilación de registros de disco del proyecto está a punto de desactivarse.',
  'Edit Gateway': 'Editar puerta de enlace',
  'Edit Project': 'Editar proyecto',
  'Edit Project Quota': 'Editar cuota de proyecto',
  'Edit Resource Default Request':
    'Editar solicitud predeterminada de recursos',
  'Empty value means no limit, CPU 1 Core = 1000m':
    'El valor vacío significa que no hay límite, 1 Core de CPU = 1000m',
  'Enter DevOps Project': 'Introduce el proyecto DevOps',
  'Enter Project': 'Entrar al proyecto',
  FED_HOST_NAMESPACE_TIP:
    'Por favor, no manipules los recursos de este proyecto puesto que pertence a un proyecto multicluster',
  'Gateway Info': 'Información de puerta de enlace',
  'Gateway Not Set': 'Puerta de enlace no establecida',
  'Help Information': 'Información de ayuda',
  'How do I invite other members to the current project?':
    '¿Cómo invitar a otros miembros al proyecto actual?',
  'How do I set the project gateway?':
    '¿Cómo configurar la puerta de enlace del proyecto?',
  'Invalid project name': 'Nombre de proyecto inválido',
  'Invite Member': 'Miembro invitado',
  'Invite Members to the DevOps Project': 'Invitar miembros al proyecto DevOps',
  'Invite Members to the Project': 'Invitar miembros al proyecto',
  jobs: 'trabajos',
  'limits.cpu': 'limit.cpu',
  'limits.memory': 'limits.memoria',
  LoadBalancer: 'LoadBalancer',
  'Manage Project': 'Gestionar proyecto',
  'Member Name': 'Nombre de miembro',
  Members: 'Miembros',
  'Members Management': 'Gestión de miembros',
  'Modify Member Role': 'Modificar rol de miembro',
  'Modify Members Role': 'Modificar rol de miembros',
  'Multi-cluster Project': 'Proyecto de clúster múltiple',
  'Multi-cluster Projects': 'Proyectos de clústeres múltiples',
  MULTI_CLUSTER_PROJECT_DELETE_TIP:
    'Borrar un proyecto multi-cluster borra también el mismo proyecto en el host de cluster.</br>Por favor, introduce el nombre {type} <strong>{resource}</strong> para estar seguro de que entiendes el riesgo de esta operación.',
  'Network Isolation': 'Aislamiento de red',
  'No Platform Manage Authorization':
    'Sin autorización de gestión de plataforma',
  'Not Assigned': 'No asignado',
  Opened: 'Abierto',
  'Please input project name': 'Por favor introduce el nombre del proyecto',
  pods: 'pods',
  'Project Info': 'Información del proyecto',
  'Project Manager': 'Gestor de proyecto',
  'Project Member': 'Miembro del proyecto',
  'Project Members': 'Miembros del proyecto',
  'project members': 'miembros del proyecto',
  'Project Name': 'Nombre del proyecto',
  'Project name exists': 'El nombre del proyecto existe',
  'Project name exists on host cluster':
    'El nombre del proyecto existe en el clúster',
  'Project Overview': 'Descripción del proyecto',
  'Project Placement': 'Colocación del proyecto',
  'Project Quota': 'Cuota de proyecto',
  'Project Role': 'Rol del proyecto',
  'Project Roles': 'Roles del proyecto',
  Project_Admin: 'Project_Admin',
  Projects: 'Proyectos',
  projects: 'proyectos',
  'Quota Management': 'Gestión de cuotas',
  'Remove Member': 'Eliminar miembro',
  'Remove Members': 'Eliminar miembros',
  'requests.cpu': 'request.cpu',
  'requests.memory': 'requests.memory',
  'Resource Quota': 'Cuota de recursos',
  'Resource Type': 'Tipo de recurso',
  'Select a user of the workspace as the manager of the project.':
    'Selecciona un usuario del espacio de trabajo como administrador del proyecto.',
  'Select Project Type': 'Seleccionar tipo de proyecto',
  'Select the cluster to create the project.':
    'Selecciona el clúster para crear el proyecto.',
  Service: 'Servicio',
  'Set Gateway': 'Establecer puerta de enlace',
  StatefulSet: 'StatefulSet',
  statefulsets: 'statefulsets',
  'Target Workspace': 'Espacio de trabajo de destino',
  Terminating: 'Terminando',
  Usage: 'Uso',
  Volume: 'Volumen',
  'You can limit the number of resources. Blank means no limit.':
    'Puedes limitar la cantidad de recursos. En blanco significa que no hay límite.',
  PROJECTS_DESC:
    'Un proyecto es un namespace de Kubernetes en KubeSphere, que proporciona un mecanismo para organizar los recursos en un espacio de trabajo.',
  PROJECT_CREATE_DESC:
    'Un proyecto es un namespace de Kubernetes en KubeSphere, que proporciona un mecanismo para organizar los recursos en un espacio de trabajo.',
  PROJECT_ADVANCE_DESC:
    'Establecer la solicitud de recursos predeterminada del proyecto',
  PROJECT_NAME_DESC:
    'El nombre del proyecto solo puedes contener letras minúsculas, números y guiones ("-").',
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
    'Puedes invitar a nuevos miembros para ayudar a su proyecto.',
  INVITE_MEMBER_DESC_DEVOPS:
    'Puedes invitar a nuevos miembros para que ayuden en tu proyecto DevOps.',
  INVITE_MEMBER_SEARCH_PLACEHODLER:
    'Introduce una dirección de correo electrónico para invitar miembros',
  INVITE_MEMBER_CHOOSE_ROLE_TIP: 'Asigna un rol a este miembro',
  DELETE_MEMBER_TIP:
    '¿Estás seguro de eliminar el miembro <strong>{name}</strong> ? El miembro no podrá acceder a este proyecto una vez eliminado.',
  PROJECT_ADMIN_DESC:
    'Puedes especificar un miembro del proyecto como administrador.',
  DEVOPS_ADMIN_DESC:
    'Puedes especificar un miembro del proyecto DevOps como administrador.',
  PROJECT_INTERNET_ACCESS_DESC:
    'Antes de crear una ruta, debe habilitar el portal de acceso a Internet (es decir, la puerta de enlace). Este paso crea un controlador de enrutamiento correspondiente para reenviar la solicitud al servicio de back-end correspondiente.',
  DELETE_INTERNET_ACCESS_TITLE:
    '¿Está seguro de eliminar la configuración de acceso a la red externa?',
  DELETE_INTERNET_ACCESS_DESC:
    'Puedes volver a vincular después de la eliminación.',
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
  HOW_TO_USE_QUOTA_Q: '¿Cómo usar las cuotas?',
  HOW_TO_USE_QUOTA_A:
    'Las cuotas de recursos son un mecanismo utilizado para limitar el uso de recursos del usuario. Puedes limitar la cantidad de CPU, memoria y réplicas de pod.',
  WHAT_IS_LIMIT_RANGE_Q:
    '¿Cuál es la solicitud predeterminada del recurso contenedor?',
  WHAT_IS_LIMIT_RANGE_A:
    'La solicitud predeterminada de recursos del contenedor (LimitRange) se basa en la gestión de recursos del proyecto, incluidos los límites de recursos y las solicitudes de recursos.',
  WHAT_IS_INTERNET_GATEWAY:
    '¿Qué es una puerta de enlace de acceso a Internet?',
  WHAT_IS_COLLECT_FILE_LOG_A:
    'La ruta de registro en el volumen montado en el contenedor se da en un patrón global. La ruta de registro se puede configurar en el workload para recopilar registros. El administrador debe habilitar la recopilación de registros de disco de antemano.',
  HOW_TO_INVITE_MEMBER_Q: '¿Cómo invitar a miembros?',
  HOW_TO_INVITE_MEMBER_A:
    'Los administradores del proyecto o los usuarios con privilegios de invitación a miembros pueden invitar a miembros del espacio de trabajo actual a unirse al proyecto.',
  CLOSE_FILE_LOG_TIP:
    'La colección de registros de archivos está a punto de cerrarse. Después de deshabilitarlo, el servicio continúa recopilando los registros de archivos antes de que se reinicien las réplicas de Pod. Después de reiniciar Pod, los registros de archivos no se recopilarán. Si necesita recopilarlos nuevamente, active la recopilación de registros de archivos y reinicie los Pods.',
  COLLECTING_FILE_LOG_DESC:
    'Los registros de disco en el contenedor se recopilarán y exportarán a stdout, que luego recopilará el recopilador de registros del sistema.',
  PROJECT_BASIC_INFO_DESC:
    'La información básica del proyecto incluye el nombre del proyecto y el estado de la cuota del proyecto.',
  PROJECT_QUOTA_MANAGE_DESC:
    'Este módulo le permite administrar cuotas de proyectos.',
  PROJECT_ROLE_DESC:
    'Los roles de proyecto definen la autorización que los usuarios tienen en el proyecto actual.',
  PROJECT_MEMBERS_DESC:
    'Gestionar y asignar roles para los miembros del proyecto.',
  PROJECT_ADVANCED_SETTINGS_DESC:
    'Este módulo le permite configurar el acceso a la puerta de enlace para direcciones externas y el gobierno del servicio. Además, también puedes configurar la colección de registros en el disco.',
  PROJECT_TYPES_Q:
    '¿Cómo puedes acceder a los servicios del proyecto a través de la red externa?',
  PROJECT_TYPES_A:
    'La puerta de enlace del proyecto es responsable de crear el controlador de enrutamiento de la aplicación correspondiente para reenviar la solicitud al servicio de back-end correspondiente. Después de abrir la puerta de enlace del proyecto, el servicio puedes exponerse a la red externa a través de Ingress.',
  NAME_EXIST_IN_CLUSTER: 'El nombre existe en {cluster}',
  PROJECT_CLUSTER_SETTINGS_DESC:
    'Selecciona el clúster para crear el proyecto. Cuando se seleccionan varios grupos, se creará un proyecto de múltiples grupos.',
  NETWORK_ISOLATED_DESC: 'Establecer estrategia de aislamiento de red',
  FEDPROJECT_RESOURCE_TIP:
    'No se pueden crear recursos de proyectos de múltiples clústeres en la administración de clústeres, vaya a la página del proyecto de múltiples clústeres para operar.',
  FEDPROJECT_CANNOT_DEPLOY_APP_TIP:
    'No se pueden implementar aplicaciones en proyectos de múltiples clústeres.',
  MULTI_CLUSER_PROJECT_TIP:
    'El proyecto multi-clúster actual se ejecuta en distintos clústers. Puedes saltar entre clústers para comprobar los parámetros de este proyecto en cada uno de ellos.',
  MULTI_CLUSER_RESOURCE_TIP:
    'El recurso multi-clúster actual se ejecuta en distintos clústers. Puedes saltar entre clústers para comprobar los parámetros de este recurso en cada uno de ellos.',
  MULTI_CLUSTER_PROJECT_CREATE_DESC:
    'Un proyecto multi-clúster se ejecuta sobre distintos clústers a la vez, lo que ayuda a que puedas construir un entorno de contenedores para una rápida iteración de aplicaciones y conseguir alta disponibilidad.',

  'Project Quota Not Set': 'Project Quota Not Set',
  'Resource Default Request Not Set': 'Resource Default Request Not Set',
}
