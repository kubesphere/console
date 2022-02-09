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
  GRAYSCALE_RELEASE: 'Grayscale Release',
  // Release Modes
  BLUE_GREEN_DEPLOYMENT: 'Despliegue blue-green',
  CANARY_RELEASE: 'Canary Release',
  TRAFFIC_MIRRORING: 'Mirroring de tráfico',
  BLUE_GREEN_DEPLOYMENT_DESC: 'Blue-green deployment deploys the new version while retaining the old version to ensure zero downtime. At any time, only one of the versions is active serving all the traffic and the other one remains idle. If anything goes wrong, you can quickly roll back to the old version.',
  CANARY_RELEASE_DESC: 'Este método trae parte del tráfico real a una nueva versión para probar su rendimiento y confiabilidad. Puedes ayudar a detectar posibles problemas en el entorno real sin afectar la estabilidad general del sistema.',
  TRAFFIC_MIRRORING_DESC: 'El traffic mirroring proporciona una forma más precisa de probar nuevas versiones, ya que los problemas se pueden detectar por adelantado sin afectar el entorno de producción. Por lo tanto, sirve como un método más seguro y confiable para el despliegue de versiones.',
  // Release Modes > Blue-Green Deployment > Create > Basic Information
  CREATE_BLUE_GREEN_DEPLOYMENT_JOB: 'Create Blue-Green Deployment Job',
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
  CREATE_CANARY_RELEASE_JOB: 'Create Canary Release Job',
  // Release Modes > Canary Release > Create > Service Settings
  UNFINISHED_GRAY_JOB: 'Unfinished grayscale release job exists.',
  NO_SERVICE_MESH_TIP: 'Las aplicaciones que no están habilitadas para el Application Governance no se pueden publicar en Grayscale.',
  GRAY_APP_NAME: 'App: {name}',
  UNSUPPORTED_WORKLOAD_TYPE: 'Tipo de carga de trabajo no compatible',
  // Release Modes > Canary Release > Create > New Version Settings
  NEW_VERSION_NUMBER_EXIST_DESC: 'Deployment {name} exists. Please enter another version number.',
  INIT_CONTAINER: 'Init Container',
  INIT_CONTAINER_VALUE: 'Init Container: {value}',
  CONTAINER_VALUE: 'Container: {value}',
  GRAYSCALE_IMAGE: 'Image: {image}',
  NEW_VERSION_NUMBER: 'New Version Number',
  NEW_VERSION_NUMBER_EMPTY_DESC: 'Introduce la versión Grayscale Release',
  NEW_VERSION_SETTINGS: 'New Version Settings',
  NEW_VERSION_NUMBER_DESC: 'Solo puede contener letras minúsculas y números. La longitud máxima de carácteres se establece en 16.',
  NEW_VERSION_NUMBER_INVALID_DESC: 'Invalid new version number. The new version number can contain only lowercase letters and numbers. The maximum length is 16 characters.',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Request Parameters
  KEY_EQ_VALUE: 'Key=Value',
  HEADER: 'Cabecera personalizada',
  CLIENT_OS: 'El tráfico proviene de los siguientes sistemas operativos',
  COOKIE: 'Cookie',
  SPECIFY_REQUEST_PARAMETERS_DESC: 'De acuerdo con la regla de configuración del contenido de la solicitud, solo el tráfico que cumpla ciertas condiciones en el contenido solicitado se dividirá en versiones en Grayscale Release. Esta política solo es válida para el acceso directo al servicio del portal.',
  POLICY_REQUEST_CONTENT_TIP: 'Forwarding by request content is unavailable if port protocol is not HTTP, HTTP2, or gRPC.',
  SPECIFY_REQUEST_PARAMETERS: 'Reenviar por contenido de solicitud',
  REQUEST_PARAMETERS: 'Regla de acceso a la versión de Grayscale Release',
  EXACT_MATCH: 'Coincidencia exacta',
  PREFIX_MATCH: 'Coincidencia de prefijo',
  REGEX_MATCH: 'Coincidencia regex',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Traffic Distribution
  CANARY_BY_TRAFFIC_DESC: 'De acuerdo con la regla de proporción de tráfico, el {ratio}% del tráfico solicitado al componente <b>{component}</b> se reenviará a la versión en Grayscale Release <b>{newVersion}</b>.',
  SPECIFY_TRAFFIC_DISTRIBUTION: 'Reenviar por ratio de tráfico',
  TRAFFIC: 'Traffic',
  TRAFFIC_DISTRIBUTION: 'Ratio de tráfico',
  // Release Modes > Traffic Mirroring > Create
  CREATE_TRAFFIC_MIRRORING_JOB: 'Create Traffic Mirroring Job',
  // Release Modes > Traffic Mirroring > Create > Strategy Settings
  // Release Jobs
  PREREQUEST_FOR_USE_GRAYRELEASE_Q: '¿Cuales son los requisitos previos para usar Grayscale Release?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A: 'You need to create a composed app and enable the application governance feature before you implement grayscale release.',
  RELEASE_JOBS: 'Release Jobs',
  TCP_INBOUND_TRAFFIC: 'TCP - Tráfico entrante',
  TCP_OUTBOUND_TRAFFIC: 'TCP - Tráfico saliente',
  NO_DATA_SCAP: 'No data',
  REPLICA_COUNT_LOW: 'replicas',
  MIRROR_POLICY_DESC: 'With traffic mirroring, the network traffic in the production environment can be copied into a grayscale version. It serves as an effective way to test the new version with real-time user traffic before it runs in the actual environment.</br>Therefore, traffic mirroring reduces the risk of directly making changes in the production environment.',
  // Release Jobs > Blue-Green Deployment > Job Status
  BLUE_GREEN_TRAFFIC_DISTRI_DESC: 'The new version or old version receives all traffic.',
  TRAFFIC_LOW: 'tráfico',
  VERSION_TRAFFIC_PERCENT: '{version} traffic {percent}%',
  // Release Jobs > Canary Release > Job Status
  JOB_OFFLINE_SUCCESSFULLY: 'Trabajo fuera de línea con éxito',
  JOB_STATUS: 'Estado del trabajo',
  ADJUST_TRAFFIC_DISTRIBUTION_DESC: 'Are you sure you want to send {ratioNew}% of traffic to the new version <b>{newVersion}</b> and {ratioOld}% to the old version <b>{oldVersion}</b>?',
  ALLOCATE_TRAFFIC_DESC: 'Asignar todo el tráfico de forma proporcional a los componentes de Grayscale Release',
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
  DELETE_GRAYSCALE_RELEASE_JOB_DESC: 'You need to select a version to take it offline. The system will retain an available version and automatically transfer all traffic to this available version to make sure the service can run smoothly.',
  GRAY_COMPONENT_DESC: 'The grayscale release components used to serve the traffic.',
  // Release Jobs > Traffic Mirroring > Job Status
  MIRRORED_TRAFFIC: 'Tráfico reflejado',
  RELEASE_MODE_PL: 'Strategies',
  RELEASE_MODE: 'Release mode',
  NEW_VERSION_TAKEOVER_DESC: 'The new version <b>{newVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the old version <b>{oldVersion}</b> will be also be deleted.',
  OLD_VERSION_TAKEOVER_DESC: 'The old version <b>{oldVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the new version <b>{newVersion}</b> will be also be deleted.',
  GRAYSCALE_REPLICA_SI: 'Réplica: {count}',
  GRAYSCALE_REPLICA_PL: 'Réplicas: {count}',
  TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC: 'A copy of traffic is sent to the new version for testing.',
  // Release Jobs > Job Status > Edit
  EDIT_GRAYSCALE_RELEASE_JOB: 'Editar componente',
  // Release Jobs > Canary Release > Traffic Distribution
  ADJUST_TRAFFIC_DISTRIBUTION: 'Adjust Traffic Distribution'
};