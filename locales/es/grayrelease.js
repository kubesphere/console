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
  CANARY_RELEASE: 'Canary Release',
  'Cookie Content': 'Contenido de cookies',
  CREATE_GRAYSCALE_RELEASE_JOB: 'Crear un job de Grayscale Release',
  CUSTOM_HEADER: 'Cabecera personalizada',
  'Deploy sample application': 'Implementar aplicación de demo',
  DEPLOY_SAMPLE_APP: 'Implementar aplicación de demo',
  'Edit Grayscale Release Job': 'Editar job de Grayscale Release',
  EXACT_MATCH: 'Coincidencia exacta',
  FORWARD_BY_REQUEST_CONTENT: 'Reenviar por contenido de solicitud',
  FORWARD_BY_TRAFFIC_RATIO: 'Reenviar por ratio de tráfico',
  GRAYSCALE_RELEASE_COMPONENT: 'Componente de Grayscale Release',
  GRAYSCALE_RELEASE_COMPONENT_PL: 'Componentes de Grayscale Release',
  GRAYSCALE_RELEASE_VERSION_TCAP: 'Versión de Grayscale Release',
  GRAYSCALE_ACCESS_RULE: 'Regla de acceso a la versión de Grayscale Release',
  GRAYSCALE_RELEASE_VERSION_NUMBER: 'Número de versión Grayscale Release',
  'Has taken over all traffic': 'Se ha apoderado de todo el tráfico',
  TRAFFIC_CONTROL_DESC:
    'Introducir tráfico que cumpla con las siguientes reglas en la versión en Grayscale Release',
  JOB_OFFLINE: 'Trabajo fuera de línea',
  JOB_OFFLINE_SUCCESSFULLY: 'Trabajo fuera de línea con éxito',
  JOB_STATUS: 'Estado del trabajo',
  'Mirrored traffic': 'Tráfico reflejado',
  'Mirrored traffic is only receiving traffic, no service':
    'El tráfico reflejado solo recibe tráfico, no hay servicio',
  NO_WORKLOAD_FOUND_TIP: 'No se encontró carga de trabajo',
  'Not online': 'Fuera de linea',
  VERSION_OFFLINE: 'Desconectado esta versión',
  'Operating System': 'Sistema operativo',
  GRAY_VERSION_TIP: 'Introduce la versión Grayscale Release',
  SELECT_GRAY_COMPONENT_TIP: 'Selecciona un componente Grayscale Release',
  STRATEGY_CONFIGURATIONS_TCAP: 'Configuración de estrategia',
  POLICY_REQUEST_CONTENT_TIP:
    'Forwarding by request content is unavailable if port protocol is not HTTP, HTTP2, or gRPC.',
  PREFIX_MATCH: 'Coincidencia de prefijo',
  REAL_TIME_TRAFFIC_DIST_TCAP: 'Distribución de tráfico en tiempo real.',
  REAL_TIME_TRAFFIC_RATIO: 'Ratio de tráfico en tiempo real',
  Recover: 'Recuperar',
  REGEX_MATCH: 'Coincidencia regex',
  GRAY_RELEASE_JOB_NAME: 'Liberar nombre del job',
  REQUEST_LATENCY: 'Duración de solicitud',
  REQUEST_SUCCESS_RATE: 'Tasa de éxito de solicitud',
  RULE_DESCRIPTION: 'Descripción de la regla',
  'Take Over': 'Tomar el control',
  TAKE_OVER_ALL_TRAFFIC: 'Tomar el control de todo el tráfico',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    'La versión actual no está online, puedes dejar que esta versión tome el control de todo el tráfico y lo ponga online.',
  traffic: 'tráfico',
  TRAFFIC_OS: 'El tráfico proviene de los siguientes sistemas operativos',
  TRAFFIC_CONTROL: 'Control de trafico',
  TRAFFIC_MIRRORING: 'Mirroring de tráfico',
  TRAFFIC_MONITORING: 'Monitor de tráfico',
  TRAFFIC_IN_LAST_FIVE_MINUTES: 'Tráfico de los últimos cinco minutos',
  TRAFFIC_RATIO: 'Ratio de tráfico',
  TRAFFIC_RULES: 'Reglas de tráfico',
  TWO_VERSIONS: 'Dos versiones',
  UNFINISHED_GRAY_JOB: 'Unfinished grayscale release job exists.',
  UNSUPPORTED_WORKLOAD_TYPE: 'Tipo de carga de trabajo no compatible',
  VERSION_COMPARISON: 'Comparar versiones',
  'version number is invalid': 'el número de versión no es válido',
  'Version Off': 'Versión desactivada',
  GRAY_RELEASE_CATEGORIES: 'Strategies',
  GRAY_RELEASE_STRATEGY_SI: 'Grayscale Release Strategy',
  BLUE_GREEN_DEPLOYMENT_DESC:
    'Blue-green deployment deploys the new version while retaining the old version to ensure zero downtime. At any time, only one of the versions is active serving all the traffic and the other one remains idle. If anything goes wrong, you can quickly roll back to the old version.',
  CANARY_RELEASES_DESC:
    'Este método trae parte del tráfico real a una nueva versión para probar su rendimiento y confiabilidad. Puedes ayudar a detectar posibles problemas en el entorno real sin afectar la estabilidad general del sistema.',
  TRAFFIC_MIRROR_DESC:
    'El traffic mirroring proporciona una forma más precisa de probar nuevas versiones, ya que los problemas se pueden detectar por adelantado sin afectar el entorno de producción. Por lo tanto, sirve como un método más seguro y confiable para el despliegue de versiones.',
  AB_TESTING_DESC:
    'Este método es muy útil para comprender si las actualizaciones o mejoras del producto han cumplido con las expectativas. Se puede usar cuando surgen nuevas necesidades y no afectará la estabilidad del negocio.',
  NO_SERVICE_MESH_TIP:
    'Las aplicaciones que no están habilitadas para el Application Governance no se pueden publicar en Grayscale.',
  NO_GRAY_RELEASE_JOBS_TIP: 'No Grayscale Release Job Found',
  NO_GRAY_RELEASE_JOBS_TIP_2: 'Please create a grayscale release job.',
  TOTAL_GRAY_RELEASE_JOB:
    '{num} total de trabajos de liberación en Grayscale Release',
  TOTAL_GRAY_RELEASE_JOBS:
    '{num} total de trabajos de liberación en Grayscale Release',
  GRAY_RELEASE_VERSION_FORMAT_DESC:
    'Solo puede contener letras minúsculas y números. La longitud máxima de carácteres se establece en 16.',
  GRAY_RELEASE_VERSION_DESC:
    'Introducir la nueva versión en el service-mesh de aplicación existente',
  POLICY_CONFIG_DESC:
    'Versión basada en el ratio de tráfico: de acuerdo con la regla de configuración del ratio de tráfico, la proporción especificada de tráfico se dividirá de la versión original a la versión en Grayscale Release.',
  GRAY_RELEASE_DESC:
    'Grayscale release represents an important method of application iteration in the production environment. You can choose different release methods for the smooth transition as you upgrade your applications to a new version.',
  GRAYSCALE_RELEASE_DESC:
    'Grayscale release represents an important method of application iteration in the production environment. You can choose different release methods for the smooth transition as you upgrade your applications to a new version.',
  GRAY_RELEASE_BY_CONTENT_TIP:
    'De acuerdo con la regla de configuración del contenido de la solicitud, solo el tráfico que cumpla ciertas condiciones en el contenido solicitado se dividirá en versiones en Grayscale Release. Esta política solo es válida para el acceso directo al servicio del portal.',
  MIRROR_POLICY_DESC:
    'With traffic mirroring, the network traffic in the production environment can be copied into a grayscale version. It serves as an effective way to test the new version with real-time user traffic before it runs in the actual environment.</br>Therefore, traffic mirroring reduces the risk of directly making changes in the production environment.',
  RATIO_MODIFY_NOTIFY_CONTENT:
    'Ha ajustado el índice de tráfico objetivo de la versión {version} a {ratio}%, y puedes continuar ajustando el índice de tráfico objetivo o hacer que surta efecto de inmediato.',
  CANARY_BY_TRAFFIC_DESC:
    'De acuerdo con la regla de proporción de tráfico, el {ratio}% del tráfico solicitado al componente {component} se reenviará a la versión en Grayscale Release {newVersion}.',
  DEPLOY_APP_CONFIRM: '¿Seguro que deseas desplegar la aplicación de demo?',
  DEPLOY_APP_TIP: 'Desplegar la aplicación de demo {name}.',
  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    'El gateway para el application governance no se encuentra en el proyecto actual, por lo que no puedes implementar la aplicación de demo. Ponte en contacto con el administrador de tu proyecto para activarlo en [Configuración avanzada].',
  PREREQUEST_FOR_USE_GRAYRELEASE_Q:
    '¿Cuales son los requisitos previos para usar Grayscale Release?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    'You need to create a composed app and enable the application governance feature before you implement grayscale release.',
  JOB_OFFLINE_WARNING:
    'You need to select a version to take it offline. The system will retain an available version and automatically transfer all traffic to this available version to make sure the service can run smoothly.',
  JOB_OFFLINE_INFO:
    'Ya puedes desconectar la tarea para proceder a eliminar la versión {versión}.',

  // Grayscale release detail page
  GRAY_COMPONENT_DESC:
    'The grayscale release components used to serve the traffic.',
  TRAFFIC_LOW: 'tráfico',

  // Grayscale release components tab
  GRAY_APP_NAME: 'App: {name}',
  GRAY_WORKLOAD_TYPE: 'Tipo de carga de trabajo: ',

  // Grayscale release version tab
  GRAY_DEPLOY_VERSION_TIP:
    'Deployment {name} exists. Version number is invalid.',
  INIT_CONTAINER: 'Init Container',
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
