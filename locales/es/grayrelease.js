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
  'A/B Testing': 'Testing A/B',
  ALLOCATE_TRAFFIC_DESC:
    'Asignar todo el tráfico de forma proporcional a los componentes de Grayscale Release',
  BLUE_GREEN_DEPLOYMENT: 'Despliegue blue-green',
  CREATE_BLUE_GREEN_DEPLOYMENT_JOB: 'Create Blue-Green Deployment Job',
  CREATE_CANARY_RELEASE_JOB: 'Create Canary Release Job',
  CREATE_TRAFFIC_MIRRORING_JOB: 'Create Traffic Mirroring Job',
  CANARY_RELEASE: 'Canary Release',
  BLUE_GREEN_DEPLOYMENT_LOW: 'blue-green deployment',
  CANARY_RELEASE_LOW: 'canary release',
  TRAFFIC_MIRRORING_LOW: 'traffic mirroring',
  COOKIE_EXACT_MATCH: 'Cookie (exact match)',
  COOKIE_REGEX_MATCH: 'Cookie (regex match)',
  HEADER_EXACT_MATCH: 'Header (exact match)',
  HEADER_REGEX_MATCH: 'Header (regex match)',
  URL_PREFIX_MATCH: 'URL (prefix match)',
  URL_EXACT_MATCH: 'URL (regex match)',
  CREATE_GRAYSCALE_RELEASE_JOB: 'Crear un job de Grayscale Release',
  HEADER: 'Cabecera personalizada',
  'Deploy sample application': 'Implementar aplicación de demo',
  DEPLOY_SAMPLE_APP: 'Implementar aplicación de demo',
  'Edit Grayscale Release Job': 'Editar job de Grayscale Release',
  EXACT_MATCH: 'Coincidencia exacta',
  SPECIFY_REQUEST_PARAMETERS: 'Reenviar por contenido de solicitud',
  SPECIFY_TRAFFIC_DISTRIBUTION: 'Reenviar por ratio de tráfico',
  GRAYSCALE_RELEASE_COMPONENT: 'Componente de Grayscale Release',
  GRAYSCALE_RELEASE_COMPONENT_PL: 'Componentes de Grayscale Release',
  NEW_VERSION_SETTINGS: 'New Version Settings',
  NEW_VERSION_NUMBER: 'New Version Number',
  GRAYSCALE_RELEASE_VERSION_TCAP: 'Versión de Grayscale Release',
  REQUEST_PARAMETERS: 'Regla de acceso a la versión de Grayscale Release',
  GRAYSCALE_RELEASE_VERSION_NUMBER: 'Número de versión Grayscale Release',
  SERVICE_VERSION_RECEIVE_ALL_TRAFFIC:
    'The version <b>{version}</b> has taken over all traffic.',
  DELETE_JOB: 'Trabajo fuera de línea',
  JOB_OFFLINE_SUCCESSFULLY: 'Trabajo fuera de línea con éxito',
  JOB_STATUS: 'Estado del trabajo',
  RELEASE_JOBS: 'Release Jobs',
  MIRRORED_TRAFFIC: 'Tráfico reflejado',
  'Mirrored traffic is only receiving traffic, no service':
    'El tráfico reflejado solo recibe tráfico, no hay servicio',
  NO_WORKLOAD_FOUND_TIP: 'No se encontró carga de trabajo',
  'Not online': 'Fuera de linea',
  TAKE_OFFLINE: 'Desconectado esta versión',
  TAKE_OVER: 'Take Over',
  'Operating System': 'Sistema operativo',
  NEW_VERSION_NUMBER_EMPTY_DESC: 'Introduce la versión Grayscale Release',
  SELECT_GRAY_COMPONENT_TIP: 'Selecciona un componente Grayscale Release',
  STRATEGY_CONFIGURATIONS_TCAP: 'Configuración de estrategia',
  POLICY_REQUEST_CONTENT_TIP:
    'Forwarding by request content is unavailable if port protocol is not HTTP, HTTP2, or gRPC.',
  PREFIX_MATCH: 'Coincidencia de prefijo',
  REAL_TIME_TRAFFIC_DIST_TCAP: 'Distribución de tráfico en tiempo real.',
  TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC:
    'A copy of traffic is sent to the new version for testing.',
  BLUE_GREEN_TRAFFIC_DISTRI_DESC:
    'The new version or old version receives all traffic.',
  RESTORE: 'Recuperar',
  REGEX_MATCH: 'Coincidencia regex',
  GRAY_RELEASE_JOB_NAME: 'Liberar nombre del job',
  SUCCESSFUL_REQUEST_RATE: 'Tasa de éxito de solicitud',
  RULE_DESCRIPTION: 'Descripción de la regla',
  'Take Over': 'Tomar el control',
  TAKE_ONLINE: 'Tomar el control de todo el tráfico',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    'La versión actual no está online, puedes dejar que esta versión tome el control de todo el tráfico y lo ponga online.',
  traffic: 'tráfico',
  CLIENT_OS: 'El tráfico proviene de los siguientes sistemas operativos',
  OS: 'OS',
  TRAFFIC_CONTROL: 'Control de trafico',
  TRAFFIC_MIRRORING: 'Mirroring de tráfico',
  TRAFFIC_MONITORING: 'Monitor de tráfico',
  TRAFFIC: 'Traffic',
  TRAFFIC_IN_LAST_FIVE_MINUTES: 'Tráfico de los últimos cinco minutos',
  TRAFFIC_DISTRIBUTION: 'Ratio de tráfico',
  SELECT_VERSION: 'Reglas de tráfico',
  BLUE_GREEN_STRATEGY_DESC: 'Dos versiones',
  UNFINISHED_GRAY_JOB: 'Unfinished grayscale release job exists.',
  UNSUPPORTED_WORKLOAD_TYPE: 'Tipo de carga de trabajo no compatible',
  VERSION_COMPARISON: 'Comparar versiones',
  'version number is invalid': 'el número de versión no es válido',
  'Version Off': 'Versión desactivada',
  RELEASE_MODE_PL: 'Strategies',
  RELEASE_MODE: 'Release mode',
  GRAY_RELEASE_STRATEGY_SI: 'Grayscale Release Strategy',
  BLUE_GREEN_DEPLOYMENT_DESC:
    'Blue-green deployment deploys the new version while retaining the old version to ensure zero downtime. At any time, only one of the versions is active serving all the traffic and the other one remains idle. If anything goes wrong, you can quickly roll back to the old version.',
  CANARY_RELEASE_DESC:
    'Este método trae parte del tráfico real a una nueva versión para probar su rendimiento y confiabilidad. Puedes ayudar a detectar posibles problemas en el entorno real sin afectar la estabilidad general del sistema.',
  TRAFFIC_MIRRORING_DESC:
    'El traffic mirroring proporciona una forma más precisa de probar nuevas versiones, ya que los problemas se pueden detectar por adelantado sin afectar el entorno de producción. Por lo tanto, sirve como un método más seguro y confiable para el despliegue de versiones.',
  AB_TESTING_DESC:
    'Este método es muy útil para comprender si las actualizaciones o mejoras del producto han cumplido con las expectativas. Se puede usar cuando surgen nuevas necesidades y no afectará la estabilidad del negocio.',
  NO_SERVICE_MESH_TIP:
    'Las aplicaciones que no están habilitadas para el Application Governance no se pueden publicar en Grayscale.',
  NO_GRAYSCALE_RELEASE_JOB_FOUND: 'No Grayscale Release Job Found',
  NO_GRAYSCALE_RELEASE_TASK_FOUND_DESC:
    'Please create a grayscale release job.',
  TOTAL_GRAY_RELEASE_JOB:
    '{num} total de trabajos de liberación en Grayscale Release',
  TOTAL_GRAY_RELEASE_JOBS:
    '{num} total de trabajos de liberación en Grayscale Release',
  NEW_VERSION_NUMBER_DESC:
    'Solo puede contener letras minúsculas y números. La longitud máxima de carácteres se establece en 16.',
  NEW_VERSION_NUMBER_INVALID_DESC:
    'Invalid new version number. The new version number can contain only lowercase letters and numbers. The maximum length is 16 characters.',
  GRAY_RELEASE_VERSION_DESC:
    'Introducir la nueva versión en el service-mesh de aplicación existente',
  POLICY_CONFIG_DESC:
    'Versión basada en el ratio de tráfico: de acuerdo con la regla de configuración del ratio de tráfico, la proporción especificada de tráfico se dividirá de la versión original a la versión en Grayscale Release.',
  GRAYSCALE_RELEASE_DESC:
    'Grayscale release represents an important method of application iteration in the production environment. You can choose different release methods for the smooth transition as you upgrade your applications to a new version.',
  SPECIFY_REQUEST_PARAMETERS_DESC:
    'De acuerdo con la regla de configuración del contenido de la solicitud, solo el tráfico que cumpla ciertas condiciones en el contenido solicitado se dividirá en versiones en Grayscale Release. Esta política solo es válida para el acceso directo al servicio del portal.',
  MIRROR_POLICY_DESC:
    'With traffic mirroring, the network traffic in the production environment can be copied into a grayscale version. It serves as an effective way to test the new version with real-time user traffic before it runs in the actual environment.</br>Therefore, traffic mirroring reduces the risk of directly making changes in the production environment.',
  ADJUST_TRAFFIC_DISTRIBUTION_DESC:
    'Are you sure you want to send {ratioNew}% of traffic to the new version <b>{newVersion}</b> and {ratioOld}% to the old version <b>{oldVersion}</b>?',
  CANARY_BY_TRAFFIC_DESC:
    'De acuerdo con la regla de proporción de tráfico, el {ratio}% del tráfico solicitado al componente <b>{component}</b> se reenviará a la versión en Grayscale Release <b>{newVersion}</b>.',
  DEPLOY_APP_CONFIRM: '¿Seguro que deseas desplegar la aplicación de demo?',
  DEPLOY_APP_TIP: 'Desplegar la aplicación de demo {name}.',
  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    'El gateway para el application governance no se encuentra en el proyecto actual, por lo que no puedes implementar la aplicación de demo. Ponte en contacto con el administrador de tu proyecto para activarlo en [Configuración avanzada].',
  PREREQUEST_FOR_USE_GRAYRELEASE_Q:
    '¿Cuales son los requisitos previos para usar Grayscale Release?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    'You need to create a composed app and enable the application governance feature before you implement grayscale release.',
  DELETE_GRAYSCALE_RELEASE_JOB_DESC:
    'You need to select a version to take it offline. The system will retain an available version and automatically transfer all traffic to this available version to make sure the service can run smoothly.',
  NEW_VERSION_TAKEOVER_DESC:
    'The new version <b>{newVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the old version <b>{oldVersion}</b> will be also be deleted.',
  OLD_VERSION_TAKEOVER_DESC:
    'The old version <b>{oldVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the new version <b>{newVersion}</b> will be also be deleted.',

  // Grayscale release detail page
  GRAY_COMPONENT_DESC:
    'The grayscale release components used to serve the traffic.',
  TRAFFIC_LOW: 'tráfico',
  VERSION_TRAFFIC_PERCENT: '{version} traffic {percent}%',

  // Grayscale release components tab
  GRAY_APP_NAME: 'App: {name}',
  GRAY_WORKLOAD_TYPE: 'Tipo de carga de trabajo: ',

  // Grayscale release version tab
  NEW_VERSION_NUMBER_EXIST_DESC:
    'Deployment {name} exists. Please enter another version number.',
  INIT_CONTAINER: 'Init Container',
  INIT_CONTAINER_VALUE: 'Init Container: {value}',
  CONTAINER_VALUE: 'Container: {value}',
  GRAYSCALE_IMAGE: 'Image: {image}',

  // Grayscale strategy configurations tab
  GRAYSCALE_VERSION: 'Versión: {version}',
  GRAYSCALE_REPLICA_SI: 'Réplica: {count}',
  GRAYSCALE_REPLICA_PL: 'Réplicas: {count}',

  // Canary Strategy Tab
  COOKIE: 'Cookie',

  // Grayscale Release Job List
  GRAYSCALE_JOB_STRATEGY: 'Grayscale release strategy',
  GRAYSCALE_JOB_COMPONENT: 'Componente de Grayscale Release',
}
