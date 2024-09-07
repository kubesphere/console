/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  GRAYSCALE_RELEASE: 'Grayscale Release',
  // Release Modes
  BLUE_GREEN_DEPLOYMENT: 'Despliegue blue-green',
  CANARY_RELEASE: 'Canary Release',
  TRAFFIC_MIRRORING: 'Mirroring de tráfico',
  BLUE_GREEN_DEPLOYMENT_DESC:
    'Blue-green deployment deploys the new version while retaining the old version to ensure zero downtime. At any time, only one of the versions is active serving all the traffic and the other one remains idle. If anything goes wrong, you can quickly roll back to the old version.',
  CANARY_RELEASE_DESC:
    'Este método trae parte del tráfico real a una nueva versión para probar su rendimiento y confiabilidad. Puedes ayudar a detectar posibles problemas en el entorno real sin afectar la estabilidad general del sistema.',
  TRAFFIC_MIRRORING_DESC:
    'El traffic mirroring proporciona una forma más precisa de probar nuevas versiones, ya que los problemas se pueden detectar por adelantado sin afectar el entorno de producción. Por lo tanto, sirve como un método más seguro y confiable para el despliegue de versiones.',
  // Release Modes > Blue-Green Deployment > Create > Basic Information
  CREATE_BLUE_GREEN_DEPLOYMENT_TASK: 'Create Blue-Green Deployment Task',
  // Release Modes > Blue-Green Deployment > Create > Service Settings
  DESELECT: 'Deseleccionar',
  SELECT: 'Seleccionar',
  SELECT_GRAY_COMPONENT_TIP: 'Selecciona un componente Grayscale Release',
  // Release Modes > Blue-Green Deployment > Create > New Version Settings
  REPLICA: 'Replica',
  REPLICA_PL: 'Replicas',
  GRAYSCALE_REPLICAS_DESC: 'Especificar el número de réplicas',
  // Release Modes > Blue-Green Deployment > Create > Strategy Settings
  SELECT_VERSION: 'Reglas de tráfico',
  BLUE_GREEN_STRATEGY_DESC: 'Dos versiones',
  TAKE_OFFLINE: 'Desconectado esta versión',
  TAKE_OVER: 'Take Over',
  GRAYSCALE_VERSION: 'Versión: {version}',
  // Release Modes > Canary Release > Create
  CREATE_CANARY_RELEASE_TASK: 'Create Canary Release Task',
  // Release Modes > Canary Release > Create > Service Settings
  UNFINISHED_GRAY_TASK: 'Grayscale release in progress',
  NO_WORKLOAD_FOUND_TIP: 'No workload found',
  NO_SERVICE_MESH_TIP:
    'Las aplicaciones que no están habilitadas para el Application Governance no se pueden publicar en Grayscale.',
  GRAY_APP_NAME: 'App: {name}',
  UNSUPPORTED_WORKLOAD_TYPE: 'Tipo de carga de trabajo no compatible',
  // Release Modes > Canary Release > Create > New Version Settings
  VERSION_EXISTS: 'The version code already exists. Please enter another version code.',
  NEW_VERSION_NUMBER_EXIST_DESC:
    'The workload {name} already exists. Please enter another version code.',
  INIT_CONTAINER: 'Init Container',
  INIT_CONTAINER_VALUE: 'Init Container: {value}',
  CONTAINER_VALUE: 'Container: {value}',
  GRAYSCALE_IMAGE: 'Image: {image}',
  NEW_VERSION_NUMBER: 'New Version Number',
  NEW_VERSION_NUMBER_EMPTY_DESC: 'Introduce la versión Grayscale Release',
  NEW_VERSION_SETTINGS: 'New Version Settings',
  NEW_VERSION_NUMBER_DESC:
    'Solo puede contener letras minúsculas y números. La longitud máxima de carácteres se establece en 16.',
  NEW_VERSION_NUMBER_INVALID_DESC:
    'Invalid new version number. The new version number can contain only lowercase letters and numbers. The maximum length is 16 characters.',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Request Parameters
  KEY_EQ_VALUE: 'Key=Value',
  HEADER: 'Cabecera personalizada',
  CLIENT_OS: 'El tráfico proviene de los siguientes sistemas operativos',
  COOKIE: 'Cookie',
  SPECIFY_REQUEST_PARAMETERS_DESC:
    'De acuerdo con la regla de configuración del contenido de la solicitud, solo el tráfico que cumpla ciertas condiciones en el contenido solicitado se dividirá en versiones en Grayscale Release. Esta política solo es válida para el acceso directo al servicio del portal.',
  POLICY_REQUEST_CONTENT_TIP:
    'Forwarding by request content is unavailable if port protocol is not HTTP, HTTP2, or gRPC.',
  SPECIFY_REQUEST_PARAMETERS: 'Reenviar por contenido de solicitud',
  REQUEST_PARAMETERS: 'Regla de acceso a la versión de Grayscale Release',
  EXACT_MATCH: 'Coincidencia exacta',
  PREFIX_MATCH: 'Coincidencia de prefijo',
  REGEX_MATCH: 'Coincidencia regex',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Traffic Distribution
  CANARY_BY_TRAFFIC_DESC:
    'De acuerdo con la regla de proporción de tráfico, el {ratio}% del tráfico solicitado al componente <b>{component}</b> se reenviará a la versión en Grayscale Release <b>{newVersion}</b>.',
  SPECIFY_TRAFFIC_DISTRIBUTION: 'Reenviar por ratio de tráfico',
  TRAFFIC: 'Traffic',
  TRAFFIC_DISTRIBUTION: 'Ratio de tráfico',
  // Release Modes > Traffic Mirroring > Create
  CREATE_TRAFFIC_MIRRORING_TASK: 'Create Traffic Mirroring Task',
  // Release Modes > Traffic Mirroring > Create > Strategy Settings
  // Release Tasks
  PREREQUEST_FOR_USE_GRAYRELEASE_Q:
    '¿Cuales son los requisitos previos para usar Grayscale Release?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    'You need to create a composed app and enable the application governance feature before you implement grayscale release.',
  RELEASE_TASKS: 'Release Tasks',
  TCP_INBOUND_TRAFFIC: 'TCP - Tráfico entrante',
  TCP_OUTBOUND_TRAFFIC: 'TCP - Tráfico saliente',
  NO_DATA_SCAP: 'No data',
  REPLICA_COUNT_LOW: 'replicas',
  MIRROR_POLICY_DESC:
    'With traffic mirroring, the network traffic in the production environment can be copied into a grayscale version. It serves as an effective way to test the new version with real-time user traffic before it runs in the actual environment.</br>Therefore, traffic mirroring reduces the risk of directly making changes in the production environment.',
  // Release Tasks > Blue-Green Deployment > Task Status
  BLUE_GREEN_DEPLOYMENT_LOW: 'blue-green deployment',
  BLUE_GREEN_TRAFFIC_DISTRI_DESC: 'The new version or old version receives all traffic.',
  TRAFFIC_LOW: 'tráfico',
  VERSION_TRAFFIC_PERCENT: '{version} traffic {percent}%',
  OFFLINE: 'Offline',
  OFFLINE_TIP:
    'No service traffic is sent to this version. You can take the version online to make it take over all traffic.',
  // Release Tasks > Canary Release > Task Status
  CANARY_RELEASE_LOW: 'canary release',
  ADJUST_TRAFFIC_DISTRIBUTION_DESC:
    'Are you sure you want to send {ratioNew}% of traffic to the new version <b>{newVersion}</b> and {ratioOld}% to the old version <b>{oldVersion}</b>?',
  ALLOCATE_TRAFFIC_DESC:
    'Asignar todo el tráfico de forma proporcional a los componentes de Grayscale Release',
  COOKIE_EXACT_MATCH: 'Cookie (exact match)',
  COOKIE_REGEX_MATCH: 'Cookie (regex match)',
  HEADER_EXACT_MATCH: 'Header (exact match)',
  HEADER_REGEX_MATCH: 'Header (regex match)',
  URL_PREFIX_MATCH: 'URL (prefix match)',
  URL_EXACT_MATCH: 'URL (regex match)',
  OS: 'OS',
  SERVICE_VERSION_RECEIVE_ALL_TRAFFIC: 'The version <b>{version}</b> has taken over all traffic.',
  RESTORE: 'Recuperar',
  SUCCESSFUL_REQUEST_RATE: 'Tasa de éxito de solicitud',
  TRAFFIC_IN_LAST_FIVE_MINUTES: 'Tráfico de los últimos cinco minutos',
  DELETE_GRAYSCALE_RELEASE_TASK_DESC:
    'Please select a version to take over all traffic before deleting the grayscale release task.',
  GRAY_COMPONENT_DESC: 'The grayscale release components used to serve the traffic.',
  // Release Tasks > Traffic Mirroring > Task Status
  TRAFFIC_MIRRORING_LOW: 'traffic mirroring',
  MIRRORED_TRAFFIC: 'Tráfico reflejado',
  MIRRORED_TRAFFIC_TIP: 'Traffic mirroring does not actually expose the new version.',
  RELEASE_MODE_PL: 'Strategies',
  RELEASE_MODE: 'Release mode',
  NEW_VERSION_TAKEOVER_DESC:
    'The new version <b>{newVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the old version <b>{oldVersion}</b> will be also be deleted.',
  OLD_VERSION_TAKEOVER_DESC:
    'The old version <b>{oldVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the new version <b>{newVersion}</b> will be also be deleted.',
  GRAYSCALE_REPLICA_SI: 'Réplica: {count}',
  GRAYSCALE_REPLICA_PL: 'Réplicas: {count}',
  TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC:
    'A copy of traffic is sent to the new version for testing.',
  // Release Tasks > Task Status > Edit
  EDIT_GRAYSCALE_RELEASE_TASK: 'Edit Grayscale Release Task',
  // Release Tasks > Canary Release > Traffic Distribution
  ADJUST_TRAFFIC_DISTRIBUTION: 'Adjust Traffic Distribution',
};
