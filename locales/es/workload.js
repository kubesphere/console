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
  SELECT_PROJECT_DESC:
    'Select a project in which the resource is to be created.',
  PROJECT_EMPTY_DESC: 'Please select a project.',
  REPLICA_LOW_SI: 'replica',
  REPLICA_LOW_PL: 'replicas',
  IMAGE_TIME_SIZE_LAYER_PL: '{time}, {size}, {layer} layers',
  IMAGE_TIME_SIZE_LAYER_SI: '{time}, {size}, {layer} layers',
  TAG: 'Tag',
  CPU_REQUEST: 'CPU Request',
  CPU_LIMIT: 'CPU Limit',
  MEMORY_REQUEST: 'Memory Request',
  MEMORY_LIMIT: 'Memory Limit',
  ADD_PROBE: 'Add Checker',
  LABEL_TYPE: '{label} <span style="{style}">({type})</span>',
  SELINUX_CONTEXT: 'SELinux Context',
  CAPABILITIES_BETA: 'Capabilities (beta)',
  SYNC_HOST_TIMEZONE: 'Synchronize Host Timezone',
  POD_SETTINGS: 'Pod Settings',
  MAX_UNAVAILABLE_PODS: 'Maximum Unavailable Pods',
  MAX_UNAVAILABLE_PODS_DESC:
    'Maximum number or percentage of unavailable Pods during the update.',
  ADD_RULE: 'Add Rule',
  RULE_NOT_COMPLETE: 'Please set a complete rule.',
  SCHEDULE_WITH_TARGET: 'Deploy with target',
  SCHEDULE_AWAY_FROM_TARGET: 'Schedule away from target',
  MATCH_IF_POSSIBLE: 'Match if possible',
  MUST_MATCH: 'Must match',
  MOUNT_PATH_EMPTY: 'Please enter a mount path.',
  CONFIGMAP: 'ConfigMap',
  SECRET: 'Secret',
  PARTITION_ORDINAL: 'Ordinal for Dividing Pod Replicas',
  PARTITION_ORDINAL_DESC:
    'Ordinal that divides the Pod replicas into two groups. When the StatefulSet is updated, only Pod replicas with an ordinal greater than or equal to the value of this parameter are updated.',
  'Access Mode': 'Modo de acceso',
  'Add argument': 'Agregar argumento',
  'Add Command': 'Agregar comando',
  'Add command': 'Agregar comando',
  'Add Container': 'Agregar contenedor',
  ADD_ENVIRONMENT_VARIABLE: 'Agregar variable de entorno',
  'Add Existing Volume': 'Agregar volumen existente',
  'Add HostPath': 'Añadir HostPath',
  ADD_LABEL: 'Agregar etiqueta',
  'Add Labels': 'Agregar etiquetas',
  ADD_METADATA: 'Agregar metadatos',
  'Add new container': 'Agregar nuevo contenedor',
  'Add Node Selector': 'Agregar selector de nodo',
  ADD_NODE_SELECTOR: 'Agregar selector de nodo',
  ADD_PORT: 'Agregar puerto',
  'Add Probe': 'Añadir sonda',
  'Add Temporary Volume': 'Agregar volumen temporal',
  'Add Volume': 'Agregar volumen',
  'Add Volume Template': 'Agregar plantilla de volumen',
  'Adding new contianer': 'Agregar nuevo contianer',
  ADD_METADATA_DESC: 'Add metadata to resources.',
  'Advanced Options': 'Opciones avanzadas',
  'Applied to the workload': 'Aplicado a la carga de trabajo.',
  Argument: 'Argumento',
  ARGUMENTS: 'Argumentos',
  'Available number of nodes scheduled':
    'Número disponible de nodos programados',
  'Can be found by node IP or node name':
    'Se puede encontrar por IP de nodo o nombre de nodo',
  CAPACITY: 'Capacidad',
  capacity: 'capacidad',
  SELECT_VOLUME: 'Elige un volumen existente',
  SELECT_TYPE: 'Select {type}',
  SPECIFY_SUBPATH: 'Haga clic para agregar subPath',
  'Cluster Resource Status': 'Estado de recursos del clúster',
  'Coding Mode': 'Modo de codificación',
  'Collecting file log': 'Recopilar registro de logs',
  Commands: 'Comandos',
  CONCURRENCY_POLICY: 'Concurrency Policy',
  'Config Template': 'Plantilla de configuración',
  'Container Config': 'Configuración de contenedor',
  'Container CPU Resource Request, 1 Core = 1000m':
    'Solicitud de recursos de CPU de contenedor, 1 núcleo = 1000 m',
  CONTAINERS: 'Imagen de contenedor',
  CONTAINER_IMAGE: 'Imagen de contenedor',
  ADD_CONTAINER: 'Add Container',
  LIVENESS_CHECK: 'Verificación del estado del contenedor',
  CONTAINER_LOG_PATH: 'ruta relativa del registro de contenedor',
  'Container Logs': 'Registros de contenedores',
  'Container Memory Resource Request':
    'Solicitud de recurso de memoria de contenedor',
  CONTAINER_NAME: 'Nombre del contenedor',
  READINESS_CHECK: 'Verificación Readiness del contenedor',
  CONTAINER_SECURITY_CONTEXT: 'Contexto de seguridad del contenedor',
  'Container Setting': 'Configuración de contenedor',
  STARTUP_CHECK: 'Comprobación de inicio de contenedor',
  CONTAINER_TYPE: 'Tipo de contenedor',
  ContainerCreating: 'Creación de contenedores',
  ContainerNotReady: 'Contenedor No Listo',
  ContainersNotInitialized: 'Contenedores No inicializados',
  ContainersNotReady: 'Contenedores No preparados',
  'CPU Target Utilization': 'Utilización de CPU',
  'CPU(m)': 'CPU (m)',
  CrashLoopBackOff: 'CrashLoopBackOff',
  CreateContainerConfigError: 'CreateContainerConfigError',
  CreateContainerError: 'CreateContainerError',
  created: 'creado',
  CronJob: 'CronJob',
  'CronJob Settings': 'Configuración de CronJob',
  'Current number of nodes scheduled': 'Número actual de nodos programados',
  'Current Replicas': 'Réplicas actuales',
  'Current Revision': 'Revisión actual',
  'Current Stage(phase)': 'Estado actual (fase)',
  'Current Utilization': 'Utilización actual',
  DEPLOYMENT_LOCATION: 'Ubicación de despliegue',
  'Deployment Mode': 'Modo de despliegue',
  POD_SCHEDULING_RULES: 'Pod Assignment Strategy',
  POD_SCHEDULING_RULES_DESC: 'You can specify rules for pod scheduling',
  DeploymentPaused: 'Despliegue Pausado',
  DeploymentResumed: 'Despliegue Reanudado',
  'Desired number of nodes scheduled': 'Número deseado de nodos programado',
  'Desired Replicas': 'Réplicas deseadas',
  'Diff Settings': 'Configuración de diferencias',
  DockerDaemonNotReady: 'DockerDaemonNotReady',
  'Edit Config Template': 'Editar plantilla de configuración',
  EDIT_CONTAINER: 'Editar contenedor',
  'Edit Labels': 'Editar etiquetas',
  EDIT_YAML: 'Editar YAML',
  EmptyDir: 'EmptyDir',
  Environment: 'Entorno',
  'Environment Variables': 'Variables de entorno',
  ENVIRONMENT_VARIABLES: 'Variables de entorno',
  'environment variables': 'Variables de entorno',
  ErrImageNeverPull: 'ErrImageNeverPull',
  ErrImagePull: 'ErrImagePull',
  EVERY_DAY: ' (Cada día)',
  EVERY_HOUR: ' (Cada hora)',
  EVERY_MONTH: ' (Cada mes)',
  EVERY_WEEK: ' (Cada semana)',
  'Exec Command Check': 'Verificación de ejecutables',
  'Every Day': 'Cada día',
  'Every Hour': 'Cada hora',
  'Every Month': 'Cada mes',
  'Every Week': 'Cada semana',
  'Execution Records': 'Registros de ejecución',
  EXISTING_VOLUME: 'Volumen existente',
  FailedCreate: 'FailedCreate',
  FailedDelete: 'Falló Eliminar',
  failedJobsHistoryLimit: 'failureJobsHistoryLimit',
  SUCCESS_THRESHOLD: 'Umbral de fallo',
  'File List': 'Lista de archivos',
  'for example': 'por ejemplo',
  FoundNewReplicaSet: 'FoundNewReplicaSet',
  'Horizontal Pod Autoscaling': 'Autoescalado horizontal de pods',
  'Horizontal Pod Autoscaling has been set':
    'El Autoscaling Horizontal de Pods ha sido configurado',
  'Host Path': 'Ruta de host',
  'Host Port': 'Puerto host',
  'How pods are assinged to nodes?': '¿Cómo se asignan los pods a los nodos?',
  HTTP_REQUEST: 'Comprobación de solicitudes HTTP',
  HTTP_PATH_EMPTY: 'Please set a path for the HTTP check.',
  IMAGE: 'Imagen',
  IMAGE_VALUE: 'Imagen: {value}',
  'Image ID': 'ID de imagen',
  'Image Name': 'Nombre de la imágen',
  'Image Pull Policy': 'Política de extracción de imagen',
  ImageInspectError: 'ImageInspectError',
  ImagePullBackOff: 'ImagePullBackOff',
  INIT_CONTAINER: 'Contenedor Init',
  'Initial Delay': 'Retraso inicial',
  INITIAL_DELAY_S: 'Retraso (s) inicial',
  INITIAL_DELAY_TIMEOUT_VALUE:
    '{delay}s initial delay, {timeout}s timeout period',
  STARTUP_CHECK_TIP: 'Kubernetes v1.18 or later is required.',
  'Instance Status': 'Estado de instancia',
  'Invalid image': 'Imagen inválida',

  'Invalid name': 'Nombre inválido. {message}',
  'Invalid pod': 'Pod inválido',
  INVALID_IMAGE: 'Imagen inválida.',
  INVALID_NAME_DESC: 'Nombre inválido. {message}',
  InvalidImageName: 'InvalidImageName',
  'is running': 'En ejecución',
  Job: 'Trabajo',
  'Job Settings': 'Configuraciones de tareas',
  'Job Template': 'Plantilla de tareas',
  ADD_CONTAINER_DESC:
    'KubeSphere admite la extracción de imágenes de los Registros de imágenes y la creación de nuevas imágenes a través del código fuente (Fuente a imagen).',
  EMPTY_LABEL_DESC: 'Please add a label.',
  LABEL_EXIST_DESC: 'The label already exsists. Please use another label.',
  'Labels cannot be empty': 'Las etiquetas no pueden estar vacías',
  DUPLICATE_LABELS: 'Existen etiquetas',
  layers: 'capas',
  'Liveness Probe': 'Sonda de estado',
  'log path relative to container mount path':
    'ruta de registro relativa a la ruta de montaje del contenedor',
  'm.internalLifecycle.PreStartContainer':
    'm.internalLifecycle.PreStartContainer',
  'Max Replicas Number': 'Número máximo de réplicas',
  MAX_SURGE_POD_VALIDATOR: 'MAX_SURGE_POD_VALIDATOR',
  'Maximum number of replicas': 'Número máximo de réplicas',
  'Memory Target Usage': 'Uso de destino de memoria',
  'Memory Target Utilization': 'Utilización de destino de memoria',
  'Min Replicas Number': 'Número mínimo de réplicas',
  'min replicas number should not be greater than max replicas number':
    'el número mínimo de réplicas no debe ser mayor que el número máximo de réplicas',
  MinimumReplicasAvailable: 'Réplicas mínimas disponibles',
  MinimumReplicasUnavailable: 'Réplicas mínimas No disponible',
  Mount: 'Montar',
  MOUNT_CONFIGMAP_OR_SECRET: 'Monte ConfigMap o Secret',
  MOUNT_PATH: 'Punto de montaje',
  MOUNT_PATH_IN_USE: 'El punto de montaje ya está en uso',
  'Mount point': 'punto de montaje',
  'Mount Temporary Volume': 'Montar volumen temporalmente',
  MOUNT_CONFIGMAP_OR_SECRET_DESC:
    'Monte el configmap o secret en el directorio especificado.',
  'Mount Volume': 'Montar Volúmen',
  VOLUME_SETTINGS: 'Montar Volúmenes',
  mounted: 'montado',
  NetworkPluginNotReady: 'NetworkPluginNotReady',
  'New Volume': 'Nuevo volumen',
  NewReplicaSetAvailable: 'NewReplicaSetAvailable',
  NewReplicaSetCreated: 'NewReplicaSetCreated',
  NO_DEFAULT_PORT: 'Sin configuración de puertos predeterminada',
  NO_LIMIT: 'Ilimitado',
  'No related resources found with the current workload(s)':
    'No se encontraron recursos relacionados con las cargas de trabajo actuales',
  'No related resources': 'No hay recursos relacionados.',
  NO_REQUEST: 'Ninguna solicitud',
  NO_RESOURCE_LIMIT: 'No resource limit',
  'Node Name': 'Nombre del nodo',
  'Node Scheduling Info': 'Información de programación de nodos',
  NO_IMAGE_FOUND: 'No encontré esta imagen',
  ONDELETE: 'OnDelete',
  CHECK_INTERVAL_S: 'Periodo de Segundos',
  CONTAINER_EMPTY_DESC: 'Por favor agregue al menos un contenedor.',
  MOUNT_VOLUME: 'Mount Volume',
  MOUNT_VOLUME_OR_TEMPLATE:
    'Agregue al menos un volumen o plantilla de volumen',
  ENTER_SCHEDULE_TIP: 'Please enter a schedule.',
  'Please input command': 'Por favor introduce el comando',
  'Please input a schedule.': 'Por favor introduce un horario.',
  PROBE_COMMAND_EMPTY: 'Por favor introduce el comando',
  'Please input mount point': 'Por favor introduce el punto de montaje',
  'Please input port': 'Por favor introduce el puerto',
  VOLUME_NAME_EMPTY: 'Por favor introduce el nombre del volumen',
  CONFIGMAP_NOT_SELECT: 'Por favor selecciona un mapa de configuración',
  SECRET_NOT_SELECT: 'Por favor selecciona un secreto',
  'Please select a storage class':
    'Por favor selecciona una clase de almacenamiento',
  VOLUME_NOT_SELECT: 'Por favor selecciona un volumen',
  CONTAINER_NOT_SELECTED: 'Selecciona al menos un contenedor para montar',
  SET_IMAGE_DESC: 'Por favor selecciona imagen',
  'Please select protocol': 'Por favor selecciona protocolo',
  'Please select rollback revision':
    'Por favor selecciona revisión de reversión',
  'Please specify an image': 'Por favor especifique una imagen',
  READ_WRITE_MOUNT_EMPTY:
    'Especifique el modo de lectura y escritura y la ruta de montaje',
  CENTRALIZED_SCHEDULING: 'Implementación de agregación de pod',
  'Pod CPU Request': 'Solicitud de CPU para el pod',
  'Pod Decentralized Deployment': 'Despliegue descentralizado de pod',
  'Pod Default Deployment': 'Despliegue predeterminado del pod',
  POD_IP_ADDRESS: 'IP del POD',
  DECENTRALIZED_SCHEDULING: 'Despliegue descentralizado de pod',
  'Pod Memory Request': 'Solicitud de memoria de pod',
  POD_REPLICAS: 'Réplicas de pod',
  DEFAULT_RULES: 'Default Rules',
  DEFAULT_RULES_DESC:
    'Schedules Pod replicas to nodes according to default rules.',
  CUSTOM_RULES_DESC:
    'Las réplicas de pod se implementarán de acuerdo con la política predeterminada.',
  'Pod replicas will be deployed according to user customization.':
    'Las réplicas de pod se implementarán de acuerdo con la personalización del usuario.',
  DECENTRALIZED_SCHEDULING_DESC:
    'Las réplicas de pod se implementarán en diferentes nodos tanto como sea posible.',
  CENTRALIZED_SCHEDULING_DESC:
    'Las réplicas de pod se implementarán en el mismo nodo tanto como sea posible.',
  POD_SECURITY_CONTEXT: 'Contexto de seguridad de pod',
  'Pod Status': 'Estado del pod',
  'Pod Status Analysis': 'Análisis de estado de pod',
  POD_REASON_FAILEDCREATE: 'POD_REASON_FAILEDCREATE',
  POD_REASON_FAILEDDELETE: 'POD_REASON_FAILEDDELETE',
  POD_REASON_SUCCESSFULCREATE: 'POD_REASON_SUCCESSFULCREATE',
  POD_REASON_SUCCESSFULDELETE: 'POD_REASON_SUCCESSFULDELETE',
  PodInitializing: 'Pod inicialización',
  'Pods List': 'Lista de pods',
  Port: 'Puerto',
  'Port(s)': 'Puerto (s)',
  ports: 'puertos',
  PostStartHookError: 'Error de Hook posterior al inicio',
  'Private Registry': 'Registro privado',
  Privileged: 'Privilegiado',
  Probe: 'Investigacion',
  ProgressDeadlineExceeded: 'ProgressDeadlineExceeded',
  Protocols: 'Protocolos',
  PROVISIONER: 'Provisioner',
  'Read Write Mode': 'Modo Read Write',
  'Readiness Probe': 'Sonda de preparación',
  SIMULTANEOUS_UPDATE: 'Recrear',
  REDEPLOY: 'Redesplegar',
  'Redeploy Successfully': 'Desplegado correctamente',
  REGISTRY: 'registro',
  RegistryUnavailable: 'Registro no disponible',
  'Replica Status': 'Estado de la réplica',
  'Replicas Number': 'Número de réplicas',
  ReplicaSetCreateError: 'ReplicaSetCreateError',
  ReplicaSetUpdated: 'ReplicaSetUpdated',
  'request CPU should not be greater than limit CPU':
    'La solicitud de CPU no debe ser mayor que el límite de CPU',
  'request memory should not be greater than limit memory':
    'La solicitud de memoria no debe ser mayor que la memoria límite',
  'Request Type': 'tipo de petición',
  RERUN: 'Repetición',
  'Resource Info': 'Información de recursos',
  'Resource Limit': 'Límite de recursos',
  'Resource Limits': 'Límites de recursos',
  'Resource limits remaining quota': 'Límite de recursos, cuota restante',
  'Resource Name': 'Nombre del recurso',
  'Resource Request': 'Solicitud de recursos',
  'Resource Requests': 'Solicitudes de recursos',
  'Resource requests remaining quota': 'Solicitudes de recursos dejaron cuota',
  'Resource Status': 'Estado del recurso',
  'Restart Count': 'Reiniciar contadores',
  RESTART_POLICY: 'Política de reinicio',
  Revision: 'Revisión',
  'Revision Records': 'Registros de revisión',
  'Revision Rollback': 'Revisión de Rollback',
  'Rollback Revisions': 'Revisiones de Rollback',
  RollingUpdate: 'RollingUpdate',
  ROLLING_UPDATE_RECOMMENDED: 'RollingUpdate (recomendado)',
  RunContainerError: 'RunContainerError',
  Schedule: 'Calendario',
  'Scheduled to node': 'Programado para el nodo',
  'Scheduling Info': 'Información de programación',
  'Select by Node': 'Seleccionar por nodo',
  RESOURCE: 'Seleccionar recurso',
  SELECT_SPECIFIC_KEYS: 'Seleccionar claves y caminos específicos',
  'Service Configuration': 'Configuración del servicio',
  'Service Labels': 'Etiquetas de servicio',
  'Session Affinity': 'Affinity de sesión',
  'Set Mount Path': 'Establecer punto de montaje',
  SELECT_NODES: 'Establecer política de programación de nodos',
  'Specify Replicas Number': 'Especificar el número de réplicas',
  startingDeadlineSeconds: 'startingDeadlineSeconds',
  'startingDeadlineSeconds(s)': 'startingDeadlineSeconds (s)',
  'Storage Size': 'Tamaño de almacenamiento',
  'Strategy Type': 'Tipo de estrategia',
  SUBPATH: 'sub ruta',
  FAILURE_THRESHOLD: 'Umbral de éxito',
  SuccessfulCreate: 'ExitosoCrear',
  SuccessfulDelete: 'Exitoso Eliminar',
  successfulJobsHistoryLimit: 'successfulJobsHistoryLimit',
  WORKLOAD_MOUNT_VOLUME_DESC: 'Admite EmptyDir y PersistentVolumeClaim.',
  'Sure to delete the workload(s)?':
    '¿Seguro para eliminar la (s) carga (s) de trabajo?',
  'target port': 'puerto de destino',
  'Target Usage': 'Uso objetivo',
  'Target Utilization': 'Utilización objetivo',
  'TCP Port Check': 'Comprobación de puerto TCP',
  'Temporary Volume': 'Volumen Temporal',
  CONCURRENCY_POLICY_DESC:
    'Select a concurrency policy of a Job created by the CronJob.',
  FAILED_JOBS_DESC: 'Specify the number of failed Jobs to be retained.',
  SUCCESSFUL_JOBS_DESC: 'Specify the number of successful Jobs to be retained.',
  'Timeout(s)': 'Tiempo de espera (s)',
  TCP_PORT: 'Comprobación de puerto TCP',
  TEMPORARY_VOLUME: 'Volumen Temporal',
  HOSTPATH_VOLUME: 'HostPath Volume',
  'The concurrency policy setting.':
    'La configuración de la política de concurrencia.',
  'The minimum of the replicas that can be set by HPA':
    'El mínimo de las réplicas que puede configurar HPA',
  'The number of failed jobs allowed to be retained.':
    'El número de trabajos fallidos que se pueden retener.',
  'The number of successful jobs allowed to be retained.':
    'El número de trabajos correctos permitidos para ser guardados.',
  TIMEOUT_PERIOD_S: 'Tiempo de espera (s)',
  'UI Mode': 'Modo UI',
  'Update Strategy': 'Actualizar estrategia',
  UPDATE_STRATEGY: 'Actualizar estrategia',
  USE_CONFIGMAP_OR_SECRET: 'Use ConfigMap o Secret',
  USE_DEFAULT_PORT: 'Usar puertos predeterminados',
  USER_AND_USER_GROUP: 'Usuario y grupo de usuarios',
  USER_GROUP: 'Grupo de usuario',
  'View YAML': 'Ver YAML',
  VOLUME_CAPACITY_TCAP: 'Capacidad de volumen',
  'Volume Name': 'Nombre del volumen',
  'Volume Source': 'Fuente de volumen',
  DISK_LOG_COLLECTION_Q: 'What is disk log collection?',
  'Worker Container': 'Contenedor de trabajo',
  VOLUME_CAPACITY: 'Capacidad de volumen',
  VOLUME_NAME: 'Nombre del volumen',
  'What is Disk Log Collection?':
    '¿Qué es la recopilación de registro de disco?',
  WORKER_CONTAINER: 'Contenedor de trabajo',
  Workload: 'Carga de trabajo',

  'Not Limited': 'Not Limited',
  Cost: 'Cost',
  'Project Remaining Quota': 'Project Remaining Quota',
  'Workspace Remaining Quota': 'Workspace Remaining Quota',
  QUOTA_OVERCOST_TIP:
    'The current resource usage has exceeded the remaining quota',

  WORKLOAD_REASON_DEPLOYMENTPAUSED: 'WORKLOAD_REASON_DEPLOYMENTPAUSED',
  WORKLOAD_REASON_DEPLOYMENTRESUMED: 'WORKLOAD_REASON_DEPLOYMENTRESUMED',
  WORKLOAD_REASON_FAILEDCREATE: 'WORKLOAD_REASON_FAILEDCREATE',
  WORKLOAD_REASON_FOUNDNEWREPLICASET: 'WORKLOAD_REASON_FOUNDNEWREPLICASET',
  WORKLOAD_REASON_MINIMUMREPLICASAVAILABLE:
    'WORKLOAD_REASON_MINIMUMREPLICAS DISPONIBLE',
  WORKLOAD_REASON_MINIMUMREPLICASUNAVAILABLE:
    'WORKLOAD_REASON_MINIMUMREPLICASUNAVAILABLE',
  WORKLOAD_REASON_NEWREPLICASETAVAILABLE:
    'WORKLOAD_REASON_NEWREPLICASETAVAILABLE',
  WORKLOAD_REASON_NEWREPLICASETCREATED: 'WORKLOAD_REASON_NEWREPLICASETCREATED',
  WORKLOAD_REASON_PROGRESSDEADLINEEXCEEDED:
    'WORKLOAD_REASON_PROGRESSDEADLINEEXCEEDED',
  WORKLOAD_REASON_REPLICASETCREATEERROR:
    'WORKLOAD_REASON_REPLICASETCREATEERROR',
  WORKLOAD_REASON_REPLICASETUPDATED: 'WORKLOAD_REASON_REPLICASETUPDATED',
  Workloads: 'Cargas de trabajo',
  SELECT_NODES_DESC:
    'Puede permitir que las réplicas de Pod se ejecuten en nodos específicos.',
  WORKLOAD_SPECIFY_NODE_DESC: 'Assign Pod replicas to a specific node.',
  WORKLOAD_DESC:
    'La carga de trabajo suele ser el operador real para acceder al servicio, y también es el operador real en ejecución para aplicaciones del sistema, como la recopilación y supervisión de registros de nodos. Workload es un modelo abstracto para un grupo de Pods.',
  DEPLOYMENT_DESC:
    'La implementación proporciona una gestión detallada de aplicaciones comunes en KubeSphere. La configuración de implementación describe el estado deseado de componentes específicos de una aplicación como plantillas Pod.',
  DEPLOYMENT_CREATE_DESC:
    'Un controlador de implementación proporciona actualizaciones declarativas para Pods y ReplicaSets, se usa para reemplazar ReplicationController para facilitar la administración de aplicaciones. Por lo general, el uso de la implementación para crear pods y ReplicateSet, la actualización progresiva y la reversión de aplicaciones, el escalado horizontal o en las aplicaciones, la detención o reanudación de las aplicaciones.',
  STATEFULSET_DESC:
    'StatefulSet se usa para administrar aplicaciones con estado, administrar la implementación y la ampliación de un conjunto de Pods, y proporciona garantías sobre el orden y la unicidad de estos Pods.',
  STATEFULSET_CREATE_DESC:
    'StatefulSet se usa para administrar aplicaciones con estado, administrar la implementación y la ampliación de un conjunto de Pods, y proporciona garantías sobre el orden y la unicidad de estos Pods.',
  DAEMONSET_DESC:
    'Un DaemonSet asegura que todos (o algunos) nodos ejecuten una copia de un Pod. Por lo general, un DaemonSet se usa para ejecutar una colección de registros, monitorear daemon u otras aplicaciones de administración del sistema.',
  DAEMONSET_CREATE_DESC:
    'Un DaemonSet asegura que todos (o algunos) nodos ejecuten una copia de un Pod. Por lo general, un DaemonSet se usa para ejecutar una colección de registros, monitorear daemon u otras aplicaciones de administración del sistema.',
  JOB_DESC:
    'Jobs are used to perform short-lived, one-off tasks. A Job creates one or more Pods and ensures that a specific number of Pods successfully terminate.',
  JOB_CREATE_DESC:
    'Jobs are used to perform short-lived, one-off tasks. A Job creates one or more Pods and ensures that a specific number of Pods successfully terminate.',
  CRONJOB_DESC:
    'CronJobs manages Jobs on a time-based schedule and can be used to perform periodic or recurring tasks.',
  CRONJOB_CREATE_DESC:
    'CronJobs manages Jobs on a time-based schedule and can be used to perform periodic or recurring tasks.',
  CRONJOB_NAME_DESC:
    'Solo puede contener letras minúsculas, números y guiones ("-"), y debe comenzar con una letra minúscula y terminar con un número o letra minúscula. La longitud máxima de caracteres se establece en 52.',
  CRONJOB_NAME_TOO_LONG: 'La longitud máxima de caracteres se establece en 52.',
  REPLICAS_SCALE_NOTIFY_TITLE: '¿Tiene efecto de inmediato?',
  REPLICAS_SCALE_NOTIFY_CONTENT:
    'Va a cambiar las réplicas de su carga de trabajo a {num}. Puede continuar cambiando el número de réplicas o puede hacer que el cambio surta efecto de inmediato.',
  REPLICAS_SCALE_NOTIFY_CONFIRM: 'Aplicar cambios ({segundos} s)',
  REPLICAS_SCALE_NOTIFY_CANCEL: 'Descartar los cambios',
  ROLLING_UPDATE_SETTINGS: 'El número de pods cuando se actualiza',
  MIN_AVAILABLE_POD_LABEL: 'El número mínimo disponible de pods',
  MAX_EXTRA_PODS: 'El número máximo disponible de pods',
  UPDATE_STRATEGY_DESC:
    'Se utiliza para configurar la estrategia para reemplazar los pods durante el proceso de actualización. <a href="{link}" target="_blank">Aprende más.</a>',
  MAX_UNAVAILABLE_DESC:
    'El porcentaje máximo de pods no disponibles permitidos durante el proceso de actualización',
  MIN_AVAILABLE_POD_DESC:
    'Se recomienda que el número mínimo de Pods disponibles para cada RollingUpdate sea un número entero positivo con un mínimo de 1',
  MAX_EXTRA_PODS_DESC:
    'El número máximo de pods permitido durante una actualización continua',
  MIN_AVAILABLE_POD_VALIDATOR_MIN:
    'El número mínimo de pods disponibles no puede ser inferior a 1',
  MIN_AVAILABLE_POD_VALIDATOR_MAX:
    'El número mínimo de pods disponibles no puede ser mayor que el número actual de réplicas',
  MAX_SURGE_POD_VALIDATOR_MIN:
    'El número máximo de pods no puede ser menor que el número de réplicas',
  MAX_SURGE_POD_VALIDATOR_MAX:
    'El número máximo de pods no puede ser mayor que el doble del número actual de réplicas',
  ROLLING_UPDATE_POD_TIP:
    'Limita las cantidades mínimas y máximas disponibles en función de las réplicas actuales cuando está en actualización continua. El número mínimo de réplicas no puede exceder el número actual de réplicas, y el número máximo de Pods no puede exceder 2 veces las réplicas actuales.',
  ONDELETE_DESC:
    'El controlador no actualizará automáticamente el Pod. Se actualizará y reemplazará las instancias del Pod cuando el Pod se elimine manualmente.',
  ROLLINGUPDATE_DESC:
    'Una actualización continua significa que la instancia de la versión anterior se reemplazará gradualmente por otras nuevas. Durante el proceso de actualización, el tráfico se equilibrará con la carga y se distribuirá a las instancias antiguas y nuevas simultáneamente, por lo que el servicio no se interrumpirá.',
  SIMULTANEOUS_UPDATE_DESC:
    'Todos los Pods existentes serán eliminados antes de que se creen otros nuevos. Tenga en cuenta que el servicio se interrumpirá durante el proceso de actualización.',
  STATEFULSET_PARTITION_DESC:
    'Partición indica el ordinal en el que se debe particionar StatefulSet. El valor predeterminado es 0.',
  PARTITION_ORDINAL_EMPTY: 'Please set a ordinal for dividing Pod replicas.',
  MIN_READY_SECONDS: 'Minimum Running Time for Pod Readiness (s)',
  MIN_READY_SECONDS_DESC:
    'Especifica el número mínimo de segundos para los pods de un inicio de daemonset',
  MIN_READY_SECONDS_EMPTY:
    'Please set the minimum stable running time required for a Pod replica to be considered ready.',
  IMAGE_PLACEHOLDER:
    'Selecciona el registro de la lista desplegable o introduce una dirección de registro público',
  IMAGE_EMPTY: 'Please set an image.',
  IMAGE_REGISTRY_PLACEHOLDER: 'Selecciona el secreto del registro',
  IMAGE_DESC:
    'Para implementar desde un repositorio de imágenes privado, primero debe <a href={link} target="_blank">crear un secreto de registro de imágenes</a> y luego extraer la imagen.',
  REPLICAS_DESC: 'Se creará el número deseado de pods para el {módulo}.',
  VOLUME_SUB_TEXT:
    'Volúmenes utilizados por los contenedores de la carga de trabajo.',
  EMPTYDIR_DESC: 'Almacenamiento temporal creado para la carga de trabajo.',
  HOSTPATH_DESC:
    'Un volumen hostPath monta un archivo o directorio del sistema de archivos del nodo host en su Pod.',
  PORT_INPUT_DESC: 'The port name already exists. Please enter another name.',
  PORT_NAME_DESC:
    'The port name can contain only lowercase letters, numbers, and hyphens (-) and must begin and end with a lowercase letter or number. The maximum length is 63 characters.',
  WORKLOAD_PORT_NAME_DESC:
    'The port name can contain only lowercase letters, numbers and hyphens (-), and must begin and end with a lowercase letter or number. The maximum length is 15 characters.',
  DEPLOYMENTS_BASEINFO_DESC:
    'Puede asignar un nombre a la implementación que sea fácil de distinguir cuando la use.',
  DEPLOYMENT_POD_TEMPLATE_DESC:
    'La carga de trabajo puede crear automáticamente un número específico de pods en función de la plantilla de Pod y el número de réplicas que establezca.',
  DEPLOYMENTS_VOLUME_DESC:
    'Puede montar el mismo volumen de almacenamiento temporal o volumen de almacenamiento persistente en cada copia de los pods implementados.',
  DEPLOYMENT_LABEL_SETTINGS_DESC:
    'Las etiquetas son uno o más pares clave-valor asociados con un recurso, como un Pod. Por lo general, identificamos, organizamos o encontramos objetos de recursos a través de etiquetas.',
  DEPLOYMENT_NODE_SELECT_DESC:
    'Al usar un selector para enviar un Pod a un nodo que se espera que se ejecute, estos selectores son uno o más conjuntos de pares clave-valor que coinciden con las etiquetas del nodo.',
  DEPLOYMENT_JOB_SETTINGS_DESC:
    'Puede configurar la plantilla de Job Spec, donde Job Controller es responsable de crear pods basados en Job Spec y seguir monitoreando el estado del Pod hasta que se complete con éxito. Si falla, RestartPolicy (que admite OnFailure y Never) determina si se debe crear un nuevo Pod y volver a ejecutar el trabajo.',
  DEPLOYMENT_CRONJOB_SETTINGS_DESC:
    'La configuración de CronJob es la parte de la plantilla para CronJob, tiene exactamente el mismo esquema que un trabajo, donde el controlador de trabajo es responsable de crear pods basados en la especificación de CronJob y seguir monitoreando el estado del Pod hasta que se complete con éxito. Si falla, RestartPolicy (que admite OnFailure y Never) determina si se debe crear un nuevo Pod y volver a ejecutar CronJob.',
  STATEFULSETS_VOLUME_TEMPLATE_DESC:
    'Cree un volumen persistente dedicado para cada Pod del conjunto con estado y móntelo en el Pod apropiado',
  STATEFULSETS_ADD_VOLUME_TEMPLATE_DESC:
    'Por favor agregue una plantilla de volumen',
  STATEFULSETS_BASEINFO_DESC:
    'StatefulSet se usa para administrar aplicaciones con estado.',
  STATEFULSETS_SERVICE_CONFIG_DESC:
    'El clúster no genera IP de clúster para el servicio. En otras palabras, un StatefulSet funciona con un headless servicio con selector. Por lo tanto, se accede al servicio internamente a través de las IP de punto final del servicio directamente. StatefulSet se utiliza para aplicaciones con estado, como los servicios maestro-esclavo.',
  DAEMONSETS_BASEINFO_DESC:
    'El daemonset garantiza que se está ejecutando una copia del contenedor en cada host, a menudo utilizada para implementar registros, monitoreo u otras aplicaciones de administración del sistema para algunos clústeres.',
  DAEMONSETS_VOLUME_DESC:
    'Puede montar un HostPath, volúmenes temporales o volúmenes persistentes en un Pod del conjunto de daemons.',
  JOBS_BASEINFO_DESC: '',
  JOBS_POD_TEMPLATE_DESC:
    'Especifique la plantilla de Pod para ejecutar en el trabajo',
  JOBS_VOLUME_DESC:
    'Puede montar volúmenes temporales o volúmenes persistentes en un Pod del trabajo.',
  BACK_OFF_LIMIT: 'Límite de retroceso',
  BACK_OFF_LIMIT_DESC:
    'Maximum number of retries before marking a Job as failed. The default value is 6.',
  JOB_PARALLELISM_LABEL: 'Paralelismo',
  JOB_PARALLELISM_DESC: 'Number of Pods that run concurrently.',
  JOB_COMPLETION_LABEL: 'Terminaciones',
  JOB_COMPLETION_DESC:
    'Number of Pods that need to run successfully before a Job is complete.',
  JOB_ACTIVE_DEADLINE: 'Active Deadline (s)',
  JOB_ACTIVE_DEADLINE_DESC:
    'Duration of a Job. The running Pods are terminated when the Job reaches the duration. The value must be a positive integer.',
  RESTART_POLICY_TIP:
    'RestartPolicy solo puede especificar Never o OnFailure, cuando el trabajo no se completa: <br/> * Si RestartPolicy especifica Nunca, el trabajo crea un nuevo Pod cuando el Pod falla y el Pod fallido no desaparece. <br/> * Si RestartPolicy especifica OnFailure, el trabajo reiniciará internamente el contenedor cuando el Pod falle, en lugar de crear un nuevo Pod.',
  RESTART_POLICY_NEVER_DESC: ' (Crear un nuevo Pod cuando un Pod falla)',
  RESTART_POLICY_ONFAILURE_DESC:
    ' (Reinicia el contenedor cuando falla un Pod)',
  CRONJOBS_BASEINFO_DESC:
    'Información básica sobre el CronJob. Debe especificar el nombre y el horario.',
  CRONJOBS_VOLUME_DESC:
    'Puede montar volúmenes temporales o volúmenes persistentes en un Pod del cronjob.',
  CRONJOB_CRON_DESC:
    'Set a schedule of a CronJob to be executed. For Cron syntax, see <a href="//en.wikipedia.org/wiki/Cron" target="_blank">Cron</a>. Kubernetes use UTC by default. You need to adjust the schedule according to your time zone.',
  START_DEADLINE_SECONDS_DESC: 'Set the deadline for starting a Job.',
  VOLUME_EMPTY_TIP: 'No hay volúmenes creados',
  HOST_PATH_DESC:
    'HostPath le permite montar el sistema de archivos en el host al Pod. Si el Pod necesita usar archivos en el host, puede usar HostPath.',
  SELECT_SPECIFIC_KEYS_DESC:
    'Selecciona la clave que desea usar y la ruta del archivo donde se expondrá cada clave. La ruta del archivo es equivalente a la ruta de montaje. El contenido de cada archivo es el valor de la clave.',
  EMPTY_DIR_DESC:
    'Los volúmenes temporales se asignan al host junto con el Pod. Cuando se elimina un Pod del host, el volumen temporal también se elimina y los datos del volumen se eliminan permanentemente. <br /> Nota: Eliminar un contenedor no afecta el volumen temporal.',
  SELECT_VOLUME_TYPE_DESC:
    'Puede elegir un tipo de volumen adecuado para agregar',
  MOUNT_VOLUME_DESC:
    'Para volúmenes de almacenamiento persistentes, selecciona un volumen que admita el modo de lectura y escritura de múltiples nodos (ROX o RWX). De lo contrario, la actualización de los pods puede fallar porque los pods no están en el mismo nodo. Si elige un volumen de modo de lectura-escritura (RWO) de nodo único, también puede programar los pods en el mismo nodo por selección de nodo para evitar errores de actualización.',
  CPU_REQUEST_TARGET_DESC:
    'Las réplicas aumentarán cuando el uso de la CPU exceda este valor objetivo, por el contrario, disminuirá.',
  MEMORY_REQUEST_TARGET_DESC:
    'Las réplicas aumentarán cuando el uso de la memoria exceda este valor objetivo, por el contrario, disminuirá.',
  MIN_REPLICAS_DESC: 'Valor mínimo de la cantidad de réplicas',
  MAX_REPLICAS_DESC: 'Valor máximo del número de réplicas.',
  REPLICAS_PLACEHOLDER: 'Predeterminado: 1',
  ADD_VOLUME_TEMPLATE_DESC:
    'El ciclo de vida del volumen será el mismo que el del pod.',
  MORE: 'Más',
  VIEW_YAML: 'Ver YAML',
  REVISION_ROLLBACK_SELECT: 'Por favor selecciona la versión a revertir',
  REVISION_TITLE: '{nombre} revisión',
  PROBE_TIME: '{delay} s delay, {timeout} s timeout',
  INITIAL_DELAY_DESC:
    'Número de segundos después de que el contenedor se haya iniciado antes de que se inicien las sondas de vida.',
  TIMEOUT_PERIOD_DESC:
    'Número de segundos después de los cuales la sonda agota el tiempo de espera. El valor predeterminado es 1 segundo y el valor mínimo es 1.',
  CHECK_INTERVAL_DESC:
    'Frecuencia de la sonda (en segundos), que por defecto es de 10 segundos. El valor mínimo es 1.',
  SUCCESS_THRESHOLD_DESC:
    'Mínimos éxitos consecutivos para que la sonda se considere exitosa después de haber fallado. El valor predeterminado es 1 y debe ser 1 para la vida y el inicio. El valor mínimo es 1.',
  FAILURE_THRESHOLD_DESC:
    'Fallos mínimos consecutivos para que la sonda se considere fallida después de haber tenido éxito. El valor predeterminado es 3 y el valor mínimo es 1.',
  HPA_MSG:
    'Escala automática de las réplicas automáticamente de acuerdo con el uso de CPU y memoria. Si se especifican tanto la CPU como la memoria, las réplicas se agregan o eliminan después de que se cumpla alguna de las condiciones.',
  PROBE_MSG:
    'Readiness Probe comprueba si el contenedor está listo para manejar solicitudes. Fallo significa que el contenedor no debe recibir ningún tráfico del agente, incluso si se estuviera ejecutando. Liveness Probe comprueba si el contenedor que lo configura se está ejecutando. Si la sonda falla, el contenedor se eliminará y la política de reinicio se implementará para el contenedor.',
  WORKLOAD_REPLICA_MSG:
    'En el ámbito definido por el usuario, si aumenta el número de Pods, ReplicationController terminará los Pods adicionales. En cambio, el RC creará un nuevo Pod que permanece en el alcance definido. Por ejemplo, el RC recreará el Pod en el nodo después del mantenimiento del Pod (como las actualizaciones del kernel).',
  DEPLOYMENTS_REPLICA_DESC:
    'La implementación se usa para describir el estado deseado que se espera que alcance la aplicación. Se utiliza principalmente para describir aplicaciones sin estado. El controlador de implementación mantiene el número y el estado de las réplicas, lo que garantiza que el estado sea coherente con el estado esperado definido. Puede aumentar las réplicas para cumplir con cargas más altas. Revertir la versión de implementación puede eliminar errores del programa. Y puede crear un autoescalador para manejar de manera flexible la carga en diferentes escenarios.',
  STATEFULSETS_REPLICA_DESC:
    'StatefulSet se usa para describir aplicaciones con estado, como las relaciones maestro-esclavo entre réplicas y el almacenamiento de datos persistente. Al igual que una implementación, un StatefulSet crea réplicas idénticas. La diferencia es que cada réplica tiene un identificador persistente y único que mantiene en cualquier reprogramación. Puede usar StatefulSets para lograr la implementación ordenada, la eliminación y las actualizaciones sucesivas.',
  DAEMONSETS_REPLICA_DESC:
    'DaemonSet garantiza que cada nodo del clúster ejecute una réplica. Cuando un nodo se une al clúster o se va, el número de réplicas se ajusta automáticamente para garantizar que el número de réplicas sea el mismo que el número de nodos en el clúster. Puede usar DaemonSets para ejecutar servicios de almacenamiento (GlusterFS, Ceph, etc.), servicios de recopilación de registros (Fluentd, Logstash, etc.) y servicios de monitoreo.',
  SELECT_CONFIGMAP_DESC:
    'Agregue un nuevo volumen desde el valor de ConfigMap.',
  SELECT_SECRET_DESC: 'Agregue un nuevo volumen desde el valor Secreto.',
  MONITORING_ALERT_DESC:
    'El gráfico de monitoreo actual muestra cinco réplicas como máximo. Puede hacer clic en "Ver todas las réplicas" para ver más gráficos de monitoreo si el número de réplicas supera las cinco.',
  RESOURCE_REQUESTS: 'Solicitud',
  RESOURCE_LIMITS: 'Límite',
  CONTAINER_CPU_DESC:
    'Se utiliza como criterio de asignación de recursos al programar contenedores. Se permite programar el contenedor en el nodo solo si la cantidad total de CPU que se puede asignar en el nodo es igual o mayor que el valor de solicitud de la CPU del contenedor.',
  CONTAINER_MEMORY_DESC:
    'Se utiliza como criterio de asignación de recursos al programar contenedores. Se permite programar el contenedor en el nodo solo si la cantidad total de memoria que se puede asignar en el nodo es igual o mayor que el valor de solicitud de la memoria del contenedor.',
  IMAGE_PULL_POLICY_ALWAYS: 'Volver a descargar la imagen (siempre)',
  IMAGE_PULL_POLICY_IFNOTPRESENT: 'Use la imagen local primero (IfNotPresent)',
  IMAGE_PULL_POLICY_NEVER: 'Usar solo imagen local (nunca)',
  IMAGE_PULL_POLICY_ALWAYS_DESC:
    'Tire de la imagen cada vez que se inicia el pod.',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC:
    'Tire de la imagen solo si no existe localmente.',
  IMAGE_PULL_POLICY_NEVER_DESC:
    'Solo se usará la imagen local, lo que hará que el contenedor sea anormal si la imagen requerida no existe localmente.',
  LIVENESS_CHECK_DESC:
    'Este método de verificación se utiliza para detectar si el contenedor está vivo.',
  READINESS_CHECK_DESC:
    'Este método de verificación se utiliza para detectar si el contenedor está listo para atender solicitudes.',
  STARTUP_CHECK_DESC:
    'Este método de verificación se utiliza para detectar si el contenedor se inicia correctamente.',
  POD_CONDITION_INITIALIZED: 'Inicializado',
  POD_CONDITION_INITIALIZED_DESC:
    'Todos los contenedores init se han iniciado con éxito.',
  POD_CONDITION_READY: 'Listo',
  POD_CONDITION_READY_DESC:
    'El pod ya se está ejecutando y se puede acceder a través del servicio.',
  POD_CONDITION_CONTAINERSREADY: 'Contenedores Listo',
  POD_CONDITION_CONTAINERSREADY_DESC:
    'Los contenedores en la cápsula están listos.',
  POD_CONDITION_PODSCHEDULED: 'Pod programado',
  POD_CONDITION_PODSCHEDULED_DESC:
    'El pod se ha asignado correctamente a un nodo.',
  POD_ASSIGNED_DESC:
    'El valor de solicitud (es decir, Solicitud) establecido por el pod en el grupo de pod se utiliza como base para determinar la asignación de recursos. Solo cuando la cantidad que se puede asignar en el nodo ≥ el valor requerido del pod, se puede asignar el pod a este nodo.',
  POD_DESC:
    'Un Pod es la unidad de ejecución básica de una aplicación Kubernetes, que representa la unidad más pequeña y más simple en el modelo de objetos Kubernetes que crea o implementa.',
  POD_CREATE_DESC:
    'Un Pod es la unidad de ejecución básica de una aplicación Kubernetes, que representa la unidad más pequeña y más simple en el modelo de objetos Kubernetes que crea o implementa.',
  FILL_IMAGE_DEFAULT_PORTS_DESC:
    'Ya sea para exponer el puerto predeterminado de la imagen?',
  REQUEST_EXCEED_LIMIT:
    'Las solicitudes de recursos no deben ser mayores que los límites de recursos',
  REQUEST_EXCCED_WORKSPACE:
    'Resource setting should not be greater than workspace resource limits.',
  WORKLOAD_CONDITIONS: 'Condiciones',
  WORKLOAD_CONDITION_AVAILABLE: 'Disponible',
  WORKLOAD_CONDITION_PROGRESSING: 'Progresando',
  VOLUME_OR_TEMPLATE_EMPTY:
    'Ha habilitado la opción de recopilar los registros en el disco. Agregue al menos un volumen y especifique el directorio en el que se encuentra el registro.',
  VOLUME_EMPTY:
    'You have enabled Disk Log Collection. Please mount at least one volume and specify the directory of the logs.',
  PROJECT_COLLECT_SAVED_DISABLED_DESC:
    'Please contact the project administrator to enable disk log collection in <b>Project Settings</b> > <b>Advanced Settings</b>.',
  COLLECT_FILE_LOG_TIP:
    'After you add a volume (ReadAndWrite mode), you can collect logs inside the volume. When you enable disk log collection, the Filebeat image will be used as a sidecar pattern and injected into the Pod to collect logs.',
  ISTIO_PROTOCOL_TIP:
    'To fully use the Application Governance feature, select a protocol based on the actual usage of the Service. The port name will be generated in the <Protocol>-<Name> format.',
  CONTAINER_LOG_PATH_TIP:
    'La ruta relativa del registro del contenedor es la ruta desde la ruta de montaje del módulo, que se puede proporcionar en modo global. Cuando hay varios grupos, sepárelos por comas. Por ejemplo, cuando la ruta de montaje del pod es / data, la ruta relativa del registro de pod se configura como log / *. Log, lo que significa que todos los archivos de sufijos .log en el directorio / data / log coinciden. Si necesita hacer coincidir todos los archivos de sufijos .log en el directorio / data / log y sus subdirectorios, puede configurar la ruta relativa del registro de pod a log / ** / *. Log.',
  SPECIFY_SUBPATH_TIP:
    'Solo es apropiado para montar volúmenes, pero no para hostpath',
  DELETE_WORKLOAD_DESC:
    'Está a punto de eliminar la (s) carga (s) de trabajo {recurso}. ¿Confirma si desea eliminar el recurso asociado?',
  SELECT_VOLUME_DESC:
    'Selecciona un volumen que se haya creado y móntelo en el contenedor.',
  REDEPLOY_CONFIRM_DESC:
    'Está a punto de volver a implementar la carga de trabajo {resource} ({type}), el pod se volverá a implementar de acuerdo con la estrategia de actualización y su negocio puede verse interrumpido temporalmente.',
  CONTAINER_SECURITY_CONTEXT_DESC:
    'Un contexto de seguridad define la configuración de privilegios y control de acceso para un Pod o Contenedor.',
  POD_SECURITY_CONTEXT_DESC: 'Customize the Pod privilege settings.',
  POD_SECURITY_CONTEXT_TIP:
    'Contexto de seguridad de pod puede proporcionar configuraciones predeterminadas de usuarios y grupos de usuarios y configuraciones de parámetros seLinuxOptions para contenedores en el pod. Si estos parámetros se han definido en el contenedor, la configuración en el contenedor tiene prioridad.',
  PRIVILEGED_MODE: 'Privilegiado',
  PRIVILEGED_MODE_DESC:
    'El proceso en el contenedor es esencialmente equivalente al usuario raíz en el nodo host.',
  ALLOW_PRIVILEGE_ESCALATION: 'AllowPrivilegeEscalation',
  ALLOW_PRIVILEGE_ESCALATION_DESC:
    'Si el proceso puede adquirir más privilegios que el proceso padre. Cuando se ejecuta en modo privilegiado, está habilitado.',
  ROOT_DIRECTORY_READONLY: 'ReadOnlyRootFilesystem',
  ROOT_DIRECTORY_READONLY_DESC:
    'Si la ruta raíz del sistema de archivos del contenedor es de solo lectura.',
  RUN_AS_NON_ROOT: 'Ejecutar como no root',
  RUN_AS_NON_ROOT_DESC:
    'kubernetes realizará una comprobación antes de ejecutar el contenedor para asegurarse de que el proceso del contenedor no se esté ejecutando como usuario raíz (UID 0); de lo contrario, el contenedor no se iniciará.',
  RUN_AS_USER_DESC:
    'El UID para ejecutar el punto de entrada del proceso contenedor. El valor predeterminado es el usuario especificado en los metadatos de la imagen si no se especifica.',
  RUN_AS_USER_GROUP_DESC:
    'El GID para ejecutar el punto de entrada del proceso contenedor. Utiliza el tiempo de ejecución predeterminado si no está configurado.',
  WORKLOAD_CREATE_DESC:
    'La carga de trabajo suele ser el operador real para acceder a los servicios y también es el operador real para las aplicaciones del sistema, como la recopilación y supervisión de registros de nodos. Workload es también un modelo abstracto para un grupo de Pods.',
  CONTAINER_RESOURCE_LIMIT_TIP:
    'Set the resource limits and requests of the container so that the container is scheduled to appropriate nodes.',
  COMPARE_WITH: 'Comparación con la versión anterior {versión}',
  REVISION_DESC:
    'Después de cambiar la plantilla de recursos de la carga de trabajo, se generará un nuevo registro y los pods se reprogramarán para la actualización de la versión. Las últimas 10 versiones se guardarán de forma predeterminada. Puede implementar una redistribución basada en el registro de cambios.',
  CLUSTER_CONTAINER_IMAGE_DIFF_DESC:
    'Establecer diferentes contenedores en diferentes grupos según las necesidades',
  CLUSTER_SERVICE_DIFF_DESC:
    'Se pueden configurar diferentes puertos de servicio en diferentes grupos',
  CLUSTER_ENV_DIFF_DESC:
    'Se pueden configurar diferentes entornos de contenedores en diferentes grupos',
  POD_SCALE_DESC: 'El número de instancias de Pod que se pueden escalar',
  REPLICAS_AVAILABLE: 'Disponibles',
  REPLICAS_EXPECTED: 'Esperadas',
  SYNC_HOST_TIMEZONE_DESC:
    'El timezone del contenedor será consistente con el del host después de la sincronización.',
  HOSTPATH_TIP:
    'Un volumen de tipo HostPath montará un fichero o directorio del sistema de ficheros del nodo host en tu Pod. La mayoría de Pods no lo necesitarán, pero puede resultar muy útil para algunas aplicaciones.',

  DEPLOY_PLACEMENT_TIP_TITLE: 'What is Deployment Location?',
  DEPLOY_PLACEMENT_TIP_VALUE:
    'You can deploy Pods on different clusters and define the number of replicas deployed. The Federation Controller Manager schedules Pods on different clusters in a unified way and synchronizes status.',
  CERT_ERROR:
    'A certificate error was found, do you want to ignore the certificate verification',
  IGNORE_CERT_WARN_DESC:
    'Ignoring the verification certificate may cause the account password to be disclosed. ',
  INVALID_PROJECT: 'Proyecto no válido',

  // Pods Page
  NODE_IP: '{node} ({ip})',

  // Jobs
  JOBS: 'Jobs',
  CRONJOBS: 'CronJobs',
  SCHEDULE: 'Schedule',

  // CronJobs
  ADD_VOLUME: 'Add Volume',
  RESTART_POLICY_DESC:
    'The Pod restart policy. The value can be Never or onFailure.',
  MOUNT_VOLUMES: 'Mount Volumes',
}
