/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Title
  TOTAL_AUDITING_TODAY:
    'Hoy se han recopilado un total de <span class={className}>{auditing}</span> registros de auditoría.',
  NO_AUDIT_LOG_TODAY: 'Registros de auditoría no encontrados hoy',
  // Search
  NO_AVAILABLE_CLUSTER: 'Clúster no disponible',
  AUDITING_NOT_ENABLED_DESC: 'No hay clúster con módulo de auditoría habilitado',
  TIME_RANGE_LAST: 'Time range: last {value}',
  TIME_RANGE_RANGE: 'Time range: {startTime} - {endTime}',
  // Querying Rules
  AUDIT_LOG_WORKSPACE_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el espacio de trabajo.',
  AUDIT_LOG_PROJECT_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el proyecto.',
  AUDIT_LOG_RESOURCE_NAME_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el nombre del recurso.',
  AUDIT_LOG_RESOURCE_TYPE_TIP:
    'Puedes ver información de eventos relacionados según el tipo de recurso.',
  AUDIT_LOG_VERB_TIP: 'Puedes ver información de eventos relacionados de acuerdo con el verbo.',
  AUDIT_LOG_STATUS_CODE_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con el código de estado.',
  AUDIT_LOG_OPERATOR_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con la cuenta de operación.',
  AUDIT_LOG_SOURCE_IP_ADDRESS_TIP:
    'Puedes ver información de eventos relacionados de acuerdo con la IP de origen.',
  SEARCH_BY_VERB: 'Search by Verb',
  SEARCH_BY_STATUS_CODE: 'Search by Status Code',
  SEARCH_BY_OPERATOR: 'Search by Operator',
  SEARCH_BY_SOURCE_IP_ADDRESS: 'Search by Source IP Address',
  ENABLE_AUDIT_LOG_COLLECTION_DESC:
    'You need to enable audit log collection if it is disabled. <a href="{link}" target="_blank">Learn More</a>',
};
