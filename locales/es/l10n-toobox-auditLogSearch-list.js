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
  // Title
  TOTAL_AUDITING_TODAY: 'Hoy se han recopilado un total de <span class={className}>{auditing}</span> registros de auditoría.',
  NO_AUDIT_LOG_TODAY: 'Registros de auditoría no encontrados hoy',
  // Search
  NO_AVAILABLE_CLUSTER: 'Clúster no disponible',
  AUDITING_NOT_ENABLED_DESC: 'No hay clúster con módulo de auditoría habilitado',
  TIME_RANGE_LAST: 'Time range: last {value}',
  TIME_RANGE_RANGE: 'Time range: {startTime} - {endTime}',
  // Querying Rules
  AUDIT_LOG_WORKSPACE_TIP: 'Puedes ver información de eventos relacionados de acuerdo con el espacio de trabajo.',
  AUDIT_LOG_PROJECT_TIP: 'Puedes ver información de eventos relacionados de acuerdo con el proyecto.',
  AUDIT_LOG_RESOURCE_NAME_TIP: 'Puedes ver información de eventos relacionados de acuerdo con el nombre del recurso.',
  AUDIT_LOG_RESOURCE_TYPE_TIP: 'Puedes ver información de eventos relacionados según el tipo de recurso.',
  AUDIT_LOG_VERB_TIP: 'Puedes ver información de eventos relacionados de acuerdo con el verbo.',
  AUDIT_LOG_STATUS_CODE_TIP: 'Puedes ver información de eventos relacionados de acuerdo con el código de estado.',
  AUDIT_LOG_OPERATOR_TIP: 'Puedes ver información de eventos relacionados de acuerdo con la cuenta de operación.',
  AUDIT_LOG_SOURCE_IP_ADDRESS_TIP: 'Puedes ver información de eventos relacionados de acuerdo con la IP de origen.',
  SEARCH_BY_VERB: 'Search by Verb',
  SEARCH_BY_STATUS_CODE: 'Search by Status Code',
  SEARCH_BY_OPERATOR: 'Search by Operator',
  SEARCH_BY_SOURCE_IP_ADDRESS: 'Search by Source IP Address'
};