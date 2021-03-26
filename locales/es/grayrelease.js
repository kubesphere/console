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
  'Allocate all traffic proportionally to grayscale release components':
    'Asignar todo el tráfico de forma proporcional a los componentes de Grayscale Release',
  'Blue-green Deployment': 'Despliegue blue-green',
  'Canary Release': 'Canary Release',
  'Cookie Content': 'Contenido de cookies',
  'Create Grayscale Release Job': 'Crear un job de Grayscale Release',
  'Create Job': 'Crear job',
  'Custom Header': 'Cabecera personalizada',
  'Deploy sample application': 'Implementar aplicación de demo',
  'Deploy Sample App': 'Implementar aplicación de demo',
  'Edit Grayscale Release Job': 'Editar job de Grayscale Release',
  'Exact Match': 'Coincidencia exacta',
  'Forward by request content': 'Reenviar por contenido de solicitud',
  'Forward by traffic ratio': 'Reenviar por ratio de tráfico',
  'Grayscale Release': 'Grayscale Release',
  'Grayscale Release Component': 'Componente de Grayscale Release',
  'Grayscale Release Components': 'Componentes de Grayscale Release',
  'Grayscale Release Strategy': 'Estrategia Grayscale Release',
  'Grayscale Release Version': 'Versión de Grayscale Release',
  'Grayscale release version access rule':
    'Regla de acceso a la versión de Grayscale Release',
  'Grayscale Release Version Number': 'Número de versión Grayscale Release',
  'Has taken over all traffic': 'Se ha apoderado de todo el tráfico',
  'Introduce traffic that meets the following rules into grayscale version':
    'Introducir tráfico que cumpla con las siguientes reglas en la versión en Grayscale Release',
  'Job offline': 'Trabajo fuera de línea',
  'Job offline Successfully': 'Trabajo fuera de línea con éxito',
  'Job Status': 'Estado del trabajo',
  'Mirrored traffic': 'Tráfico reflejado',
  'Mirrored traffic is only receiving traffic, no service':
    'El tráfico reflejado solo recibe tráfico, no hay servicio',
  'No workload found': 'No se encontró carga de trabajo',
  'Not online': 'Fuera de linea',
  'Version offline': 'Desconectado esta versión',
  'Operating System': 'Sistema operativo',
  'Please input grayscale release version':
    'Introduce la versión Grayscale Release',
  'Please select a grayscale release component':
    'Selecciona un componente Grayscale Release',
  'Policy Config': 'Configuración de política',
  POLICY_REQUEST_CONTENT_TIP:
    'El protocolo de puerto no es HTTP, no se puede publicar la política por el contenido de la solicitud',
  'Prefix Match': 'Coincidencia de prefijo',
  'Real-time traffic distribution': 'Distribución de tráfico en tiempo real.',
  'Real-time traffic ratio': 'Ratio de tráfico en tiempo real',
  Recover: 'Recuperar',
  'Regex Match': 'Coincidencia regex',
  'Release Job Name': 'Liberar nombre del job',
  'Request duration': 'Duración de solicitud',
  'Request success rate': 'Tasa de éxito de solicitud',
  'Rule Description': 'Descripción de la regla',
  'Take Over': 'Tomar el control',
  'Take over all traffic': 'Tomar el control de todo el tráfico',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    'La versión actual no está online, puedes dejar que esta versión tome el control de todo el tráfico y lo ponga online.',
  traffic: 'tráfico',
  'Traffic comes from the following operating systems':
    'El tráfico proviene de los siguientes sistemas operativos',
  'Traffic Control': 'Control de trafico',
  'Traffic Mirroring': 'Mirroring de tráfico',
  'Traffic monitor': 'Monitor de tráfico',
  'Traffic of last five minutes': 'Tráfico de los últimos cinco minutos',
  'Traffic Ratio': 'Ratio de tráfico',
  'Traffic Rules': 'Reglas de tráfico',
  'Two Versions': 'Dos versiones',
  'Unfinished grayscale release jobs exist':
    'Existen jobs de Grayscale Release sin finalizar',
  'Unsupported workload type': 'Tipo de carga de trabajo no compatible',
  'Version Comparison': 'Comparar versiones',
  'version number is invalid': 'el número de versión no es válido',
  'Version Off': 'Versión desactivada',
  GRAY_RELEASE_CATEGORIES: 'Categorías',
  BLUE_GREEN_DEPLOYMENT_DESC:
    'The blue-green release provides a zero downtime deployment, which means the new version can be deployed with the old one preserved. At any time, only one of the versions is active serving all the traffic, while the other one remains idle. If there is a problem with running, you can quickly roll back to the old version.',
  CANARY_RELEASES_DESC:
    'Este método trae parte del tráfico real a una nueva versión para probar su rendimiento y confiabilidad. Puedes ayudar a detectar posibles problemas en el entorno real sin afectar la estabilidad general del sistema.',
  TRAFFIC_MIRROR_DESC:
    'El traffic mirroring proporciona una forma más precisa de probar nuevas versiones, ya que los problemas se pueden detectar por adelantado sin afectar el entorno de producción. Por lo tanto, sirve como un método más seguro y confiable para el despliegue de versiones.',
  AB_TESTING_DESC:
    'Este método es muy útil para comprender si las actualizaciones o mejoras del producto han cumplido con las expectativas. Se puede usar cuando surgen nuevas necesidades y no afectará la estabilidad del negocio.',
  NO_SERVICE_MESH_TIP:
    'Las aplicaciones que no están habilitadas para el Application Governance no se pueden publicar en Grayscale.',
  NO_GRAY_RELEASE_JOBS_TIP:
    'No se está ejecutando un job de Grayscale Release.',
  NO_GRAY_RELEASE_JOBS_TIP_2:
    'Puedes vincular estrategias de Grayscale Release para publicar jobs de Grayscale Release.',
  TOTAL_GRAY_RELEASE_JOBS:
    '{num} total de trabajos de liberación en Grayscale Release',
  GRAY_RELEASE_VERSION_FORMAT_DESC:
    'Solo puede contener letras minúsculas y números. La longitud máxima de carácteres se establece en 16.',
  GRAY_RELEASE_VERSION_DESC:
    'Introducir la nueva versión en el service-mesh de aplicación existente',
  POLICY_CONFIG_DESC:
    'Versión basada en el ratio de tráfico: de acuerdo con la regla de configuración del ratio de tráfico, la proporción especificada de tráfico se dividirá de la versión original a la versión en Grayscale Release.',
  GRAY_RELEASE_DESC:
    'Grayscale Release es un método muy potente para desplegar el software en producción. Proporciona un método de despliegue para la una transición suave de las aplicaciones a medida que se actualizan y se implementan.',
  GRAYSCALE_RELEASE_DESC:
    'Grayscale Release es un método muy potente para desplegar el software en producción. Proporciona un método de despliegue para la una transición suave de las aplicaciones a medida que se actualizan y se implementan.',
  GRAY_RELEASE_BY_CONTENT_TIP:
    'Despliegue basado en el contenido de solicitud: de acuerdo con la regla de configuración del contenido de la solicitud, solo el tráfico que cumpla ciertas condiciones en el contenido solicitado se dividirá en versiones en Grayscale Release. Esta política solo es válida para el acceso directo al servicio del portal.',
  MIRROR_POLICY_DESC:
    'Los microservicios nos permiten entregar aplicaciones más rápido sin afectar la estabilidad del negocio. En este sentido, el traffic mirroring reduce el riesgo de sufrir cambios en el entorno de producción. </br> Con Traffic Mirroring, el tráfico de red del entorno de producción se puede duplicar hacia una versión de Grayscale Release, que sirve como una forma efectiva de probar la nueva versión antes de que se ejecute en el entorno real (con tráfico de usuarios en tiempo real).',
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
    'Debes crear una composite-application y habilitar la función application-governance para el servicio que utilizará la versión en Grayscale Release.',
  JOB_OFFLINE_WARNING:
    'Antes de desconectar una tarea, primero debes seleccionar una versión disponible para asegurarte de que el servicio pueda funcionar sin problemas durante todo el proceso. Debes seleccionar una versión y desconectarla. Después de eso, el sistema transferirá automáticamente todo el tráfico a otra versión disponible.',
  JOB_OFFLINE_INFO:
    'Ya puedes desconectar la tarea para proceder a eliminar la versión {versión}.',
}
