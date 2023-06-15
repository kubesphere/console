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
  WORKLOAD_DESC: 'La carga de trabajo suele ser el operador real para acceder al servicio, y también es el operador real en ejecución para aplicaciones del sistema, como la recopilación y supervisión de registros de nodos. Workload es un modelo abstracto para un grupo de Pods.',
  // List
  DEPLOYMENT_EMPTY_DESC: 'Cree un deployment.',
  UPDATING: 'Actualización',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  NEXT: 'Siguiente',
  INVALID_PROJECT: 'Invalid project.',
  // List > Create > Pod Settings > Replica Scheduling Mode
  REPLICA_SCHEDULING_MODE: 'Modo de despliegue',
  SPECIFY_REPLICAS: 'Especificar las réplicas',
  WEIGHTS: 'Pesas',
  SPECIFY_WEIGHTS: 'Especificar los pesos',
  SPECIFY_WEIGHTS_DESC: 'El número total de copias establecido se asignará a los grupos seleccionados de acuerdo con los pesos establecidos, y las copias de los grupos no disponibles se migrarán automáticamente a los grupos disponibles.',
  SPECIFY_REPLICAS_DESC: 'Especifique claramente la cantidad de réplicas que se implementarán para cada clúster.',
  REPLICA_LOW_SI: 'replica',
  REPLICA_LOW_PL: 'replicas',
  WEIGHT: 'Peso',
  TOTAL_REPLICAS: 'Número total de copias',
  // List > Create > Pod Settings > Add Container > Container Settings
  COST: 'Cost',
  ADD_CONTAINER: 'Add Container',
  ADD_CONTAINER_DESC: 'KubeSphere admite la extracción de imágenes de los Registros de imágenes y la creación de nuevas imágenes a través del código fuente (Fuente a imagen).',
  CONTAINERS: 'Imagen de contenedor',
  IMAGE_TIME_SIZE_LAYER: 'Updated {time}',
  IMAGE_DESC: 'Para implementar desde un repositorio de imágenes privado, primero debe <a href={link} target="_blank">crear un secreto de registro de imágenes</a> y luego extraer la imagen.',
  IMAGE_PLACEHOLDER: 'Selecciona el registro de la lista desplegable o introduce una dirección de registro público',
  IMAGE_EMPTY: 'Please set an image.',
  ENTER_POSITIVE_INTEGER_DESC: 'La entrada de copia es ilegal',
  TOTAL_REPLICAS_EMPTY_DESC: 'Ingrese el número total de copias',
  CONTAINER_NAME: 'Nombre del contenedor',
  CONTAINER_TYPE: 'Tipo de contenedor',
  USE_DEFAULT_PORTS: 'Usar puertos predeterminados',
  NO_DEFAULT_PORT: 'Sin configuración de puertos predeterminada',
  REGISTRY: 'registro',
  SET_IMAGE_DESC: 'Por favor selecciona imagen',
  WORKER_CONTAINER: 'Contenedor de trabajo',
  CONTAINER_RESOURCE_LIMIT_TIP: 'Set the resource limits and requests of the container so that the container is scheduled to appropriate nodes.',
  GPU_TYPE: 'GPU Type',
  GPU_LIMIT: 'GPU Limit',
  NVIDIA_COM_GPU: 'NVIDIA GPU',
  NO_LIMIT: 'Ilimitado',
  NO_REQUEST: 'Ninguna solicitud',
  NO_RESOURCE_LIMIT: 'No resource limit',
  IGNORE_AND_RETRY: 'para volver a intentarlo',
  AVAILABLE_QUOTAS: 'Available Quotas',
  // List > Create > Pod Settings > Add Container > Port Settings
  PORT_SETTINGS: 'Configuraciones de puerto',
  ISTIO_PROTOCOL_TIP: 'To fully use the Application Governance feature, select a protocol based on the actual usage of the Service. The port name will be generated in the <Protocol>-<Name> format.',
  REQUIRED: 'requerido',
  // List > Create > Pod Settings > Add Container > Use Local Image First
  IMAGE_PULL_POLICY_ALWAYS: 'Volver a descargar la imagen (siempre)',
  IMAGE_PULL_POLICY_NEVER: 'Usar solo imagen local (nunca)',
  IMAGE_PULL_POLICY_ALWAYS_DESC: 'Pulls an image always when the pod is created or updated.',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC: 'Pulls an image only when the required image does not exist locally.',
  IMAGE_PULL_POLICY_NEVER_DESC: 'Solo se usará la imagen local, lo que hará que el contenedor sea anormal si la imagen requerida no existe localmente.',
  IMAGE_PULL_POLICY_IFNOTPRESENT: 'Use la imagen local primero (IfNotPresent)',
  // List > Create > Pod Settings > Add Container > Health Check
  LIVENESS_CHECK: 'Verificación del estado del contenedor',
  READINESS_CHECK: 'Verificación Readiness del contenedor',
  STARTUP_CHECK: 'Comprobación de inicio de contenedor',
  LIVENESS_CHECK_DESC: 'Este método de verificación se utiliza para detectar si el contenedor está vivo.',
  READINESS_CHECK_DESC: 'Este método de verificación se utiliza para detectar si el contenedor está listo para atender solicitudes.',
  STARTUP_CHECK_DESC: 'Este método de verificación se utiliza para detectar si el contenedor se inicia correctamente.',
  ADD_PROBE: 'Add Checker',
  COMMANDS: 'Comando',
  HEALTH_CHECK: 'Health check',
  STARTUP_CHECK_TIP: 'Kubernetes v1.18 or later is required.',
  HTTP_PATH_EMPTY: 'Please set a path for the HTTP check.',
  // List > Create > Pod Settings > Add Container > Life Management
  LIFECYCLE_MANAGEMENT: 'Lifecycle Management',
  LIFECYCLE_MANAGEMENT_DESC: 'Add actions to be performed after the container is started or before it is stopped for environment preparation or graceful shutdown.',
  POSTSTART_ACTION: 'Post-start Action',
  PRESTOP_ACTION: 'Pre-stop Action',
  POSTSTART_ACTION_DESC: 'Add an action to be performed after the container is started.',
  PRESTOP_ACTION_DESC: 'Add an action to be performed before the container is stopped.',
  ADD_ACTION: 'Add Action',
  // List > Create > Pod Settings > Add Container > Environment Variables
  ADD_ENVIRONMENT_VARIABLE: 'Agregar variable de entorno',
  KEY_IN_RESOURCE: 'Seleccionar clave',
  LABEL_TYPE: '{label} <span style="{style}">({type})</span>',
  RESOURCE: 'Resource',
  CREATE_CONFIGMAP_SECRET_DESC: 'If no configmap or secret meets the requirements, you can',
  CREATE_CONFIG: 'create a configmap',
  OR: 'or',
  CREATE_SECRET: 'create a secret.',
  DEFAULT_REPOSITORY: 'Default repository',
  SET_DEFAULT_REPOSITORY: 'Set default repository',
  SET_AS_DEFAULT_REPOSITORY_DESC: 'Set as default repository after setting, if not specified, the system will use the default repository to create the application load. Only one default repository can be set in a project.',
  SET_AS_DEFAULT_REPOSITORY: 'Set as default mirror repository',
  SET_DEFAULT_REPO_SUCCESSFUL: 'Set default repository successful',
  // List > Create > Pod Settings > Add Container > Container Security Context
  CONTAINER_SECURITY_CONTEXT: 'Contexto de seguridad del contenedor',
  CONTAINER_SECURITY_CONTEXT_DESC: 'Un contexto de seguridad define la configuración de privilegios y control de acceso para un Pod o Contenedor.',
  PRIVILEGED_MODE: 'Privilegiado',
  PRIVILEGED_MODE_DESC: 'El proceso en el contenedor es esencialmente equivalente al usuario raíz en el nodo host.',
  ALLOW_PRIVILEGE_ESCALATION: 'AllowPrivilegeEscalation',
  ALLOW_PRIVILEGE_ESCALATION_DESC: 'Si el proceso puede adquirir más privilegios que el proceso padre. Cuando se ejecuta en modo privilegiado, está habilitado.',
  ROOT_DIRECTORY_READONLY: 'ReadOnlyRootFilesystem',
  ROOT_DIRECTORY_READONLY_DESC: 'Si la ruta raíz del sistema de archivos del contenedor es de solo lectura.',
  USER_AND_USER_GROUP: 'Usuario y grupo de usuarios',
  USER_GROUP: 'Grupo de usuario',
  RUN_AS_NON_ROOT: 'Ejecutar como no root',
  RUN_AS_NON_ROOT_DESC: 'kubernetes realizará una comprobación antes de ejecutar el contenedor para asegurarse de que el proceso del contenedor no se esté ejecutando como usuario raíz (UID 0); de lo contrario, el contenedor no se iniciará.',
  RUN_AS_USER_DESC: 'El UID para ejecutar el punto de entrada del proceso contenedor. El valor predeterminado es el usuario especificado en los metadatos de la imagen si no se especifica.',
  RUN_AS_USER_GROUP_DESC: 'El GID para ejecutar el punto de entrada del proceso contenedor. Utiliza el tiempo de ejecución predeterminado si no está configurado.',
  SELINUX_CONTEXT: 'SELinux Context',
  CAPABILITIES: 'Capabilities',
  DROP: 'Drop',
  ACCESS_CONTROL: 'Control de acceso',
  LEVEL: 'Nivel',
  // List > Create > Pod Settings > Add Container > Synchronize Host Timezone
  SYNC_HOST_TIMEZONE_DESC: 'El timezone del contenedor será consistente con el del host después de la sincronización.',
  SYNC_HOST_TIMEZONE: 'Synchronize Host Timezone',
  // List > Create > Pod Settings > Update Strategy
  UPDATE_STRATEGY: 'Actualizar estrategia',
  ROLLING_UPDATE_RECOMMENDED: 'RollingUpdate (recomendado)',
  SIMULTANEOUS_UPDATE: 'Recrear',
  ROLLINGUPDATE_DESC: 'Una actualización continua significa que la instancia de la versión anterior se reemplazará gradualmente por otras nuevas. Durante el proceso de actualización, el tráfico se equilibrará con la carga y se distribuirá a las instancias antiguas y nuevas simultáneamente, por lo que el servicio no se interrumpirá.',
  SIMULTANEOUS_UPDATE_DESC: 'Todos los Pods existentes serán eliminados antes de que se creen otros nuevos. Tenga en cuenta que el servicio se interrumpirá durante el proceso de actualización.',
  ENTER_INTEGER_OR_PERCENTAGE: 'Introduce el valor',
  MAX_EXTRA_EMPTY: 'Please set the maximum number of extra Pod replicas allowed during the update process.',
  // List > Create > Pod Settings > Pod Security Context
  POD_SECURITY_CONTEXT: 'Contexto de seguridad de pod',
  POD_SECURITY_CONTEXT_DESC: 'Customize the Pod privilege settings.',
  POD_SECURITY_CONTEXT_TIP: 'Contexto de seguridad de pod puede proporcionar configuraciones predeterminadas de usuarios y grupos de usuarios y configuraciones de parámetros seLinuxOptions para contenedores en el pod. Si estos parámetros se han definido en el contenedor, la configuración en el contenedor tiene prioridad.',
  // List > Create > Pod Settings > Pod Scheduling Rules
  POD_SCHEDULING_RULES: 'Pod Assignment Strategy',
  POD_SCHEDULING_RULES_DESC: 'You can specify rules for pod scheduling',
  DEFAULT_RULES: 'Default Rules',
  DEFAULT_RULES_DESC: 'Schedules the Pod replicas to nodes according to default rules.',
  DECENTRALIZED_SCHEDULING: 'Despliegue descentralizado de pod',
  CUSTOM_RULES: 'Custom Rules',
  CUSTOM_RULES_DESC: 'Las réplicas de pod se implementarán de acuerdo con la política predeterminada.',
  DECENTRALIZED_SCHEDULING_DESC: 'Las réplicas de pod se implementarán en diferentes nodos tanto como sea posible.',
  CENTRALIZED_SCHEDULING_DESC: 'Las réplicas de pod se implementarán en el mismo nodo tanto como sea posible.',
  CENTRALIZED_SCHEDULING: 'Implementación de agregación de pod',
  SCHEDULE_WITH_TARGET: 'Deploy with target',
  SCHEDULE_AWAY_FROM_TARGET: 'Schedule away from target',
  MATCH_IF_POSSIBLE: 'Match if possible',
  MUST_MATCH: 'Must match',
  TARGET: 'Target',
  STRATEGY: 'Strategy',
  // List > Create > Pod Settings > Pod Grace Period
  POD_GRACE_PERIOD: 'Pod Grace Period',
  POD_GRACE_PERIOD_DESC: 'Set the waiting time before Pod terminates, after which Pod will be forcibly terminated.',
  TERMINATION_GRACEPERIOD_SECONDS: 'Termination GracePeriod Seconds (s)',
  // List > Create > Pod Settings > Add Metadata
  ADD_METADATA: 'Agregar metadatos',
  POD_ADD_METADATA_DESC: 'Add metadata to the Pod replicas.',
  // List > Create > Storage Settings
  STORAGE_SETTINGS: 'Storage Settings',
  READ_ONLY_LOW: 'read-only',
  READ_AND_WRITE_LOW: 'read and write',
  // List > Create > Storage Settings > Mount Volume
  MOUNT_VOLUME: 'Mount Volume',
  WORKLOAD_MOUNT_VOLUME_DESC: 'Mount an persistent volume, temporary volume, or HostPath volume to the containers.',
  SELECT_PERSISITENT_VOLUME_CLAIM: 'Select Persistent Volume Claim',
  SELECT_PERSISITENT_VOLUME_CLAIM_DESC: 'Mount a persistent volume created according to the persistent volume claim to the containers.',
  CAPACITY: 'Capacidad',
  PVC_NOT_SELECT: 'Please select a persistent volume claim.',
  TEMPORARY_VOLUME: 'Volumen Temporal',
  VOLUME_NAME: 'Nombre del volumen',
  VOLUME_NAME_EMPTY: 'Por favor introduce el nombre del volumen',
  HOST_PATH_EMPTY: 'Por favor introduce el ruta del host del volumen',
  CONTAINER_NOT_SELECTED: 'Selecciona al menos un contenedor para montar',
  NOT_MOUNT: 'No montado',
  HOSTPATH_VOLUME: 'HostPath Volume',
  HOSTPATH_TIP: 'Un volumen de tipo HostPath montará un fichero o directorio del sistema de ficheros del nodo host en tu Pod. La mayoría de Pods no lo necesitarán, pero puede resultar muy útil para algunas aplicaciones.',
  HOST_PATH: 'Host Path',
  READ_AND_WRITE: 'Lectura y escritura',
  READ_ONLY: 'Solo lectura',
  // List > Create > Storage Settings > Mount Configmap or Secret
  MOUNT_CONFIGMAP_OR_SECRET: 'Monte ConfigMap o Secret',
  MOUNT_CONFIGMAP_OR_SECRET_DESC: 'Monte el configmap o secret en el directorio especificado.',
  CONFIGMAP: 'ConfigMap',
  SELECT_CONFIGMAP_DESC: 'Agregue un nuevo volumen desde el valor de ConfigMap.',
  READ_WRITE_MOUNT_EMPTY: 'Especifique el modo de lectura y escritura y la ruta de montaje',
  SELECT_SPECIFIC_KEYS: 'Seleccionar claves y caminos específicos',
  SELECT_SPECIFIC_KEYS_DESC: 'Selecciona la clave que desea usar y la ruta del archivo donde se expondrá cada clave. La ruta del archivo es equivalente a la ruta de montaje. El contenido de cada archivo es el valor de la clave.',
  SELECT_SECRET_DESC: 'Agregue un nuevo volumen desde el valor Secreto.',
  CONFIGMAP_NOT_SELECT: 'Por favor selecciona un mapa de configuración',
  SECRET_NOT_SELECT: 'Por favor selecciona un secreto',
  NO_AVAILABLE_RESOURCE: 'No hay recursos disponibles',
  // List > Create > Advanced Settings
  SELECT_NODES: 'Establecer política de programación de nodos',
  SELECT_NODES_DESC: 'Puede permitir que las réplicas de Pod se ejecuten en nodos específicos.',
  ADD_NODE_SELECTOR: 'Agregar selector de nodo',
  ADD_METADATA_DESC: 'Add metadata to resources.',
  KEY: 'Clave',
  VALUE: 'Valor',
  ADVANCED_SETTINGS: 'Ajustes avanzados',
  DUPLICATE_LABELS: 'Duplicate labels cannot be added.',
  // List > Create > Advanced Settings > Specify Node
  WORKLOAD_SPECIFY_NODE_DESC: 'Assign Pod replicas to a specific node.',
  // List > Create > Cluster Differences
  CLUSTER_DIFF: 'Cluster Differences',
  CLUSTER_DIFF_CONTAINER_SETTINGS_DESC: 'Establecer diferentes contenedores en diferentes grupos según las necesidades',
  CLUSTER_DIFF_PORT_SETTINGS_DESC: 'Se pueden configurar diferentes puertos de servicio en diferentes grupos',
  CLUSTER_DIFF_ENVIRONMENT_VARIABLES_DESC: 'Se pueden configurar diferentes entornos de contenedores en diferentes grupos',
  CONTAINER_IMAGE: 'Container Image'
};