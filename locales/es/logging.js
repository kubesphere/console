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
  'Auditing statistics': 'Estadísticas de auditoría',
  'Back to previous': 'Volver al anterior',
  CHANGE_STATUS: 'Cambiar Estado',
  Collecting: 'Recolectar',
  'Current Statistics Start Time': 'Hora actual de inicio de estadísticas',
  'Delete Log Receiver': 'Delete Log Receiver',
  'Display Content': 'Mostrar el contenido',
  'Event statistics': 'Estadísticas de eventos',
  'Exact Query': 'Consulta exacta',
  'Fuzzy Query': 'Consulta difusa',
  HIDE_HELP_INFORMATION: 'Ocultar información de ayuda',
  INDEX_PREFIX: 'Index Prefix',
  Keyword: 'Palabra clave',
  'Log Collections': 'Colecciones de logs',
  'Log Receiver': 'Log Receiver',
  'Log Management': 'Gestión de logs',
  'Log Query': 'Consulta de logs',
  'Log Start Time': 'Hora de inicio del log',
  'Log statistics': 'Estadísticas de logs',
  'No cluster with auditing module enabled':
    'No hay clúster con módulo de auditoría habilitado',
  'No cluster with event query enabled':
    'No hay clúster con consulta de eventos habilitada',
  'No cluster with logging module enabled':
    'No hay clúster con módulo de registro habilitado',
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
  'Refresh Rate': 'Frecuencia de actualización',
  'Region Data': 'Datos de región',
  'Release Collection': 'Colección de releases',
  'Resource Name & Type': 'Nombre y tipo de recurso',
  'Search Result': 'Resultados de búsqueda',
  'Search Rule': 'Regla de búsqueda',
  SERVICE_ADDRESS: 'Dirección de Servicio',
  'Time topology': 'Topología de tiempo',
  TOPIC: 'tema',
  'Auditing log trends in the last 12 hours':
    'Tendencias en el número total de registros de auditoría en las últimas 12 horas',
  'Event trends in the last 12 hours':
    'Tendencias en el número total de eventos en las últimas 12 horas.',
  'Log trends in the last 12 hours':
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
  'KeyWord Log Query Tip':
    'Introduce la palabra clave para encontrar el log. También puedes encontrar el log de errores por palabras clave como "Error", "Fail", "Fatal", "Exception" y "Warning".',
  'Project Log Query Tip':
    'Puedes ver la información de log relacionada de acuerdo con el nombre del proyecto.',
  'Workload Log Query Tip':
    'Puedes ver la información de log relacionada de acuerdo con el nombre de la carga de trabajo.',
  'Container Log Query Tip':
    'Puedes ver la información de log relacionada de acuerdo con el nombre del contenedor.',
  'Pod Log Query Tip':
    'Puedes ver la información de log relacionada de acuerdo con el nombre del pod.',
  'Search Events by': 'Buscar eventos por {field}',
  'Workspace Event Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con el espacio de trabajo.',
  'Project Event Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con el proyecto.',
  'Resource Type Event Query Tip':
    'Puedes ver información de eventos relacionados según el tipo de recurso.',
  'Resource Name Event Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con el nombre del recurso.',
  'Message Event Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con el mensaje.',
  'Category Event Query Tip':
    'Puedes ver información relacionada del evento según la categoría.',
  'Reason Event Query Tip':
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
  NO_EVENTS_TODAY: 'Eventos no encontrados hoy',
  START_REAL_TIME_LOG: 'activar el registro de logs en tiempo real',
  STOP_REAL_TIME_LOG: 'desactivar el registro de logs en tiempo real',
  LOG_EXPORT: 'Exportar logs',
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
  'Workspace Auditing Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con el espacio de trabajo.',
  'Project Auditing Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con el proyecto.',
  'Resource Name Auditing Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con el nombre del recurso.',
  'Resource Type Auditing Query Tip':
    'Puedes ver información de eventos relacionados según el tipo de recurso.',
  'Verb Auditing Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con el verbo.',
  'Status Code Auditing Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con el código de estado.',
  'Operation Account Auditing Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con la cuenta de operación.',
  'Source IP Auditing Query Tip':
    'Puedes ver información de eventos relacionados de acuerdo con la IP de origen.',
  TOTAL_AUDITING_TODAY:
    'Hoy se han recopilado un total de <span class={className}>{auditing}</span> registros de auditoría.',
  NO_AUDITING_TODAY: 'Registros de auditoría no encontrados hoy',
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
  CHANGE_STATUS_LOW: 'Change status',
  EVENTS: 'Events',
  SELECT_STATUS_TIP: 'Select a status',
}
