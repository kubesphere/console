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
  // More > Add Service
  ADD_SERVICE: 'Agregar servicio',
  ADD_ROUTE: 'Add Ingress',
  SERVICE_ADDED_SUCCESSFULLY: 'The service was added successfully.',
  // More > Add Ingress
  // Attributes
  // Resource Status
  WORKLOAD_TYPE_DEPLOYMENTS: 'Deployment',
  WORKLOAD_TYPE_DAEMONSETS: 'DaemonSet',
  WORKLOAD_TYPE_STATEFULSETS: 'StatefulSet',
  // Traffic Monitoring
  TRAFFIC_MONITORING: 'Monitor de tráfico',
  TRAFFIC_MONITORING_UNAVAILABLE_DESC: 'La aplicación no ha recibido una solicitud durante mucho tiempo, visita la aplicación y prueba el gestor de tráfico',
  TRAFFIC_ENTRY: 'Entrada de tráfico',
  NO_DATA: 'Sin datos',
  REFRESH: 'Refrescar',
  SUCCESS_RATE: 'Success rate',
  TRAFFIC_RPS: 'Traffic (RPS)',
  BANDWIDTH: 'Bandwidth',
  HTTP_INBOUND_TRAFFIC: 'HTTP Inbound Traffic',
  HTTP_OUTBOUND_TRAFFIC: 'HTTP Outbound Traffic',
  TRAFFIC_POLICIES: 'Traffic Policies',
  LOAD_BALANCING: 'Load Balancing',
  LOAD_BALANCING_ALGORITHM: 'Load Balancing Algorithm',
  LB_ROUND_ROBIN: 'Round robin',
  LB_LEAST_CONN: 'Least connection',
  LB_RANDOM: 'Random',
  LB_ALG_DESC: '<strong>Round robin</strong>: Distributes client requests to backends in rotation.<br/><strong>Least connection</strong>: Randomly selects two healthy backends and sends client requests to the one with fewer connections.<br/><strong>Random</strong>: Sends client requests to a backend randomly selected from all healthy backends.',
  HASH_BASED_ON_HTTP_HEADER: 'Hash based on HTTP header',
  HASH_BASED_ON_HTTP_COOKIE: 'Hash based on HTTP cookie',
  HASH_BASED_ON_SOURCE_IP_ADDRESS: 'Hash based on source IP address',
  HTTP_HEADER: 'HTTP Header',
  HTTP_COOKIE: 'HTTP Cookie',
  CONNECTION_POOL: 'Connection Pool',
  CONNECTION_POOL_TIP: 'Creates a fixed number of connection objects for the application and stores them in a connection pool for reuse. A connection object is retrieved from the connection pool for each request and returned to the pool after use.',
  MAXIMUM_CONNECTIONS: 'Maximum Connections',
  MAXIMUM_CONNECTIONS_DESC: 'Maximum of number of HTTP1 or TCP connections to a destination backend.',
  MAXIMUM_REQUESTS_PER_CONNECTION: 'Maximum Requests per Connection',
  MAXIMUM_REQUESTS_PER_CONNECTION_DESC: 'Maximum number of requests per connection to a backend.',
  TRAFFIC_MONITORING_MAXIMUM_RETRIES: 'Límite de retroceso',
  TRAFFIC_MONITORING_MAXIMUM_RETRIES_DESC: 'Maximum number of retries for requests.',
  CONNECTION_TIMEOUT: 'Connection Timeout',
  CONNECTION_TIMEOUT_DESC: 'TCP connection timeout period.',
  MAXIMUM_REQUESTS: 'Maximum Requests',
  MAXIMUM_PENDING_REQUESTS: 'Maximum Pending Requests',
  CIRCUIT_BREAKER: 'Circuit Breaker',
  CIRCUIT_BREAKER_DESC: 'If a service cannot be accessed and the specified criteria are met, the ciruit breaker marks the service as unavailable and returns error response to clients directly for a specified period of time.',
  CONSECUTIVE_FIVEXX_ERRORS: 'Consecutive 5XX Errors',
  CONSECUTIVE_FIVEXX_ERRORS_DESC: 'Number of 5XX errors before a backend is ejected from the connection pool.',
  INSPECTION_INTERVAL_S: 'Inspection Interval (s)',
  INSPECTION_INTERVAL_S_DESC: 'Interval between two backend inspections.',
  MAXIUM_EJECTION_RATIO: 'Maximum Ejection Ratio (%)',
  MAXIUM_EJECTION_RATIO_DESC: 'Maximum percentage of backends that can be ejected.',
  BASE_EJECTION_TIME_S: 'Base Ejection Time (s)',
  BASE_EJECTION_TIME_S_DESC: 'Maximum ejection duration.',
  UPDATED_AT_VALUE_SCAP: 'Updated at {value}',
  METHOD: 'Method',
  TRAFFIC_MANAGEMENT_UNAVAILABLE: 'Traffic Management Unavailable',
  APPLICATION_GOVERNANCE_NOT_ENABLED: 'Please enable Application Governance.',
  // Grayscale Release
  CREATE_GRAYSCALE_RELEASE_TASK: 'Create Grayscale Release Task',
  GRAYSCALE_RELEASE_DESC: 'Grayscale release represents an important method of application iteration in the production environment. You can choose different release methods for the smooth transition as you upgrade your applications to a new version.',
  NO_GRAYSCALE_RELEASE_TASK_FOUND: 'No Grayscale Release Task Found',
  NO_GRAYSCALE_RELEASE_TASK_FOUND_DESC: 'Please create a grayscale release job.',
  TYPE_SERVICE_DEPLOYMENT: 'Type: stateless service (deployment)',
  TYPE_SERVICE_STATEFULSET: 'Type: stateful service (statefulset)',
  // Tracing
  TRACING: 'Tracing',
  TRACING_NO_DATA_DESC: 'Por favor prueba otras condiciones en la consulta',
  NUM_SPAN_SI: '{num} span',
  NUM_SPAN_PL: '{num} spans',
  NUM_ERROR_SI: '{num} error',
  NUM_ERROR_PL: '{num} errors',
  LAST_NUM_RECORDS: 'Últimos {num} registros',
  PROCESS: 'Process',
  SERVICES_AND_OPERATIONS: 'Services & Operations',
  TRACING_UNAVAILABLE: 'Tracing Unavailable',
  CALLED_SERVICES: 'Called Services',
  CALLED_DEPTH: 'Call Depth'
};