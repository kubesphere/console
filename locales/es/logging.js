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
  Activate: 'Activar',
  ADD_LOG_RECEIVER: 'Add Log Receiver',
  'Add Service Address': 'Agregar dirección de servicio',
  Address: 'Dirección',
  AUDIT_LOG_COUNT: 'Estadísticas de auditoría',
  'Back to previous': 'Volver al anterior',
  CHANGE_STATUS: 'Cambiar Estado',
  Collecting: 'Recolectar',
  'Current Statistics Start Time': 'Hora actual de inicio de estadísticas',
  'Delete Log Receiver': 'Delete Log Receiver',
  'Display Content': 'Mostrar el contenido',
  'Event statistics': 'Estadísticas de eventos',
  EXACT_QUERY: 'Consulta exacta',
  FUZZY_QUERY: 'Consulta difusa',
  HIDE_HELP_INFORMATION: 'Ocultar información de ayuda',
  INDEX_PREFIX: 'Index Prefix',
  KEYWORD: 'Palabra clave',
  'Log Collections': 'Colecciones de logs',
  'Log Receiver': 'Log Receiver',
  'Log Management': 'Gestión de logs',
  'Log Query': 'Consulta de logs',
  'Log Start Time': 'Hora de inicio del log',
  CONTAINER_LOG_COUNT: 'Estadísticas de logs',
  AUDITING_NOT_ENABLED_DESC:
    'No hay clúster con módulo de auditoría habilitado',
  EVENT_NOT_ENABLED_DESC: 'No hay clúster con consulta de eventos habilitada',
  LOGGING_NOT_ENABLED_DESC: 'No hay clúster con módulo de registro habilitado',
  'No cluster with event query enabled':
    'No hay clúster con consulta de eventos habilitada',
  'No cluster with logging module enabled':
    'No hay clúster con módulo de registro habilitado',
  LOGGING_DISABLED: 'Logging Disabled',
  'Passwords must be at least 6 characters long':
    'Las contraseñas deben tener al menos 6 caracteres.',
  'Please enter a filter to search for logs.':
    'Introduce un filtro para buscar en los logs.',
  ADDRESS_EMPTY_DESC: 'Please enter an address.',
  ENTER_SERVICE_ADDRESS: 'Por favor introduce la dirección del servicio',
  'Real-Time Data': 'Datos en tiempo real',
  'Recently Configured Updated': 'Actualizado y configurado recientemente',
  'Recently Updated': 'Recientemente actualizado',
  'Refresh Interval': 'Intervalo de actualización',
  REFRESH_RATE_COLON: 'Frecuencia de actualización: ',
  CONTAINER_LOG_SOURCE: 'Container Log Source',
  REFRESH_INTERVAL_VALUE: 'Refresh interval: {value}s',
  'Refresh Rate': 'Frecuencia de actualización',
  'Region Data': 'Datos de región',
  'Release Collection': 'Colección de releases',
  RESOURCE_NAME_AND_TYPE: 'Nombre y tipo de recurso',
  SEARCH_RESULTS: 'Resultados de búsqueda',
  QUERYING_RULES: 'Regla de búsqueda',
  SERVICE_ADDRESS: 'Dirección de Servicio',
  TIME_TOPOLOGY: 'Topología de tiempo',
  TOPIC: 'tema',
  'Auditing log trends in the last 12 hours':
    'Tendencias en el número total de registros de auditoría en las últimas 12 horas',
  RESOURCE_EVENT_TRENDS_12H:
    'Tendencias en el número total de eventos en las últimas 12 horas.',
  CONTAINER_LOG_TRENDS_12H:
    'Tendencias en el número total de registros en las últimas 12 horas.',
  LOG_DATE: 'DD/MM/YYYY HH:mm',
  EVENT_DATE: 'DD/MM/YYYY 00:00',
  ES_DESC:
    'Elasticsearch es un motor de búsqueda y análisis distribuido y RESTful.',
  KAFKA_DESC:
    'Kafka es una popular plataforma de procesamiento de flujo de código abierto.',
  FLUENTD_DESC:
    'Fluentd es un recopilador de datos de código abierto para la capa de registro unificada.',
  TOOLBOX_SHIFT_TIPS:
    '👻 Puedes abrir la página en una nueva ventana con "MAYÚS + CLIC IZQUIERDO".',
  LOG_COLLECTION_DESC:
    'El sistema recopilará los registros stdout y stderr de cada contenedor y los enviará a uno o más servicios de destino.',
  LOG_COLLECTION_ENABLE_TIPS:
    'El nuevo estado tarda aproximadamente 1 minuto en surtir efecto.',
  LOG_COLLECTION_FLUENTD_URL_TIPS:
    'Enter the address of the Fluentd service that receives logs.',
  EMPTY_LOG_COLLECTIONS:
    'No log receiver is found. You can add log receivers and send logs to external log receivers.',
  LOG_COLLECTION_TIPS: 'You can add one log receiver for each type.',
  URL_SYNTAX_ERROR: 'Error de sintaxis de URL',
  LOG_COLLECTION_ES_URL_TIPS:
    'The built-in Elasticsearch service is used by default. You can also enter the IP address of Elasticsearch independently deployed inside or outside the cluster.',
  LOG_COLLECTION_ES_INDEX_TIPS:
    'Use the index prefix to speed up queries. The index prefix is automatically generated in <Index prefix>-<Year-month-date> format.',
  'Search Logs by': 'Buscar logs por {field}',
  CONTAINER_LOG_KEYWORD_TIP:
    'Introduce la palabra clave para encontrar el log. También puedes encontrar el log de errores por palabras clave como "Error", "Fail", "Fatal", "Exception" y "Warning".',
  CONTAINER_LOG_PROJECT_TIP:
    'Puedes ver la información de log relacionada de acuerdo con el nombre del proyecto.',
  CONTAINER_LOG_WORKLOAD_TIP:
    'Puedes ver la información de log relacionada de acuerdo con el nombre de la carga de trabajo.',
  CONTAINER_LOG_CONTAINER_TIP:
    'Puedes ver la información de log relacionada de acuerdo con el nombre del contenedor.',
  CONTAINER_LOG_POD_TIP:
    'Puedes ver la información de log relacionada de acuerdo con el nombre del pod.',
  'Search Events by': 'Buscar eventos por {field}',
  RESOURCE_EVENT_WORKSPACE_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el espacio de trabajo.',
  RESOURCE_EVENT_PROJECT_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el proyecto.',
  RESOURCE_EVENT_RESOURCE_TYPE_TIP:
    'Puedes ver información de eventos relacionados según el tipo de recurso.',
  RESOURCE_EVENT_RESOURCE_NAME_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el nombre del recurso.',
  RESOURCE_EVENT_MESSAGE_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el mensaje.',
  RESOURCE_EVENT_CATEGORY_TIP:
    'Puedes ver información relacionada del evento según la categoría.',
  RESOURCE_EVENT_REASON_TIP:
    'Puedes ver información relacionada con el evento según el motivo.',
  'Pod Event Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con el nombre del pod.',
  TOTAL_LOGS:
    'Un total de <span class={className}>{logs}</span> registros de <br/> Se recogieron <span class={className}>{contenedores}</span> contenedores.',
  TIME_S: '{num}s',
  CONTAINER_LOGS_NOT_SUPPORTED:
    'El contenedor no admite logs en tiempo real en el estado actual, intente nuevamente más tarde.',
  TOTAL_LOGS_TODAY:
    'Hoy se recolectó un total de <span class={className}>{logs}</span> logs de <span class={className}>{contenedores}</span> contenedores.',
  TOTAL_EVENTS_TODAY:
    'Hoy se recopilaron un total de <span class={className}>{events}</span> eventos.',
  NO_RESOURCE_EVENTS_TODAY: 'Eventos no encontrados hoy',
  START_REAL_TIME_LOG: 'activar el registro de logs en tiempo real',
  STOP_REAL_TIME_LOG: 'desactivar el registro de logs en tiempo real',
  EXPORT_LOGS: 'Exportar logs',
  CREATE_CUSTOM_MONITORING_DASHBOARD:
    'Crear un panel de monitoreo personalizado',
  MONITORING_TEMPLATE: 'Monitoring Template',
  CUSTOM_MONITORING_TEMPLATE_DESC:
    'Select a default template, upload a template, or customize a template to generate a custom monitoring dashboard.',
  CUSTOM_MONITORING_DASHBOARD: 'Panel de control personalizado',

  UPLOAD_GRAFANA_DASHBOARD: 'Upload Grafana Dashboard',
  IMPORT_GRAFANA_JSON_FILE: 'Import Grafana JSON Files',
  UPLOAD_GRAFANA_URL: 'Upload a Grafana dashboard from URL.',
  SUPPORT_JSON_FILE: 'Only files in JSON format are supported.',
  UPLOAD_FROM_LOCAL_TITLE: 'Select or Drag a File',
  FILE_UPLOAD_ERROR: 'Only one file can be uploaded.',
  UPLOAD_FILE_TIP: 'Please upload a file.',
  ENTER_GRAFANA_URL: 'Please enter a Grafana dashboard URL.',

  CUSTOMMONITORDASHBOARD: 'Panel de control personalizado',
  CUSTOMMONITORDASHBOARD_PL: 'Custom Monitoring Dashboards',
  CUSTOM_MONITORING_DASHBOARD_PL: 'Custom Monitoring Dashboards',
  CUSTOMMONITORDASHBOARD_LOW: 'custom monitoring dashboard',
  CUSTOM_MONITORING_DASHBOARD_EMPTY_DESC:
    'Please create a custom monitoring dashboard.',

  SERVICE_BUILT_INTERFACE:
    'la supervisión del servicio se genera con la captura de datos de interfaz',
  'Search Auditing Logs by': 'Auditoría de búsqueda por {field}',
  AUDIT_LOG_WORKSPACE_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el espacio de trabajo.',
  AUDIT_LOG_PROJECT_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el proyecto.',
  AUDIT_LOG_RESOURCE_NAME_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el nombre del recurso.',
  AUDIT_LOG_RESOURCE_TYPE_TIP:
    'Puedes ver información de eventos relacionados según el tipo de recurso.',
  AUDIT_LOG_VERB_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el verbo.',
  AUDIT_LOG_STATUS_CODE_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el código de estado.',
  AUDIT_LOG_OPERATOR_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con la cuenta de operación.',
  AUDIT_LOG_SOURCE_IP_ADDRESS_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con la IP de origen.',
  TOTAL_AUDITING_TODAY:
    'Hoy se han recopilado un total de <span class={className}>{auditing}</span> registros de auditoría.',
  NO_AUDIT_LOG_TODAY: 'Registros de auditoría no encontrados hoy',
  LOGGING_LOG_COLLECTOR: 'Log Receiver',
  EVENTS_LOG_COLLECTOR: 'Events Log Receiver',
  AUDITING_LOG_COLLECTOR: 'Auditing Log Receiver',

  // Log Collection
  LOG_COLLECTION: 'Log Collection',
  LOG_RECEIVER_PL: 'Log Receivers',
  LOG_ADDRESS: 'Address: ',
  LOG_COLLECTING: 'Collecting',
  LOG_DISABLED: 'Disabled',
  INVALID_SERVICE_ADDRESS: 'Please enter a correct service address.',
  ADD_SERVICE_ADDRESS: 'Add',
  EXAMPLE: 'Example: ',
  PORT_NUMBER_EMPTY: 'Please enter a port number.',
  PARAMETER_REQUIRED: 'This parameter is mandatory.',
  EVENT_PL: 'Events',
  CREATION_TIME: 'Creation time',

  // Log Collection > Details
  ADDRESS: 'Address',
  CHANGE_STATUS_SCAP: 'Change status',
  EVENTS: 'Events',
  SELECT_STATUS_TIP: 'Select a status',

  // Container Log Search
  LOG_EXPORT_SCAP: 'Log export',
  SEARCH_BY_KEYWORD: 'Search by Keyword',
  SEARCH_BY_PROJECT: 'Search by Project',
  SEARCH_BY_WORKLOAD: 'Search by Workload',
  SEARCH_BY_POD: 'Search by Pod',
  SEARCH_BY_CONTAINER: 'Search by Container',
  START_TIME_COLON: 'Start Time: ',
  LOG: 'Log',
  DISPLAY: 'Display',
  HIDE: 'Hide',
  STOP_REAL_TIME_CONTAINER_LOG: 'Pause real-time container logs',
  START_REAL_TIME_CONTAINER_LOG: 'View real-time container logs',
  REASON_COLON: 'Reason: ',
  MESSAGE_COLON: 'Message: ',

  // Resource Event Search
  STOP_REAL_TIME_RESOURCE_EVENT: 'Pause real-time resource events',
  START_REAL_TIME_RESOURCE_EVENT: 'View real-time resource events',
  RESOURCE_EVENT_COUNT: 'Resource Events',
  SEARCH_BY_MESSAGE: 'Search by Message',
  SEARCH_BY_WORKSPACE: 'Search by Workspace',
  SEARCH_BY_RESOURCE_TYPE: 'Search by Resource Type',
  SEARCH_BY_RESOURCE_NAME: 'Search by Resource Name',
  SEARCH_BY_REASON: 'Search by Reason',
  SEARCH_BY_CATEGORY: 'Search by Category',

  // Audit Log Search
  VERB: 'Verb',
  STATUS_CODE: 'Status Code',
  SUBRESOURCE: 'Subresource',
  SEARCH_BY_VERB: 'Search by Verb',
  SEARCH_BY_STATUS_CODE: 'Search by Status Code',
  SEARCH_BY_OPERATOR: 'Search by Operator',
  SEARCH_BY_SOURCE_IP_ADDRESS: 'Search by Source IP Address',
}
