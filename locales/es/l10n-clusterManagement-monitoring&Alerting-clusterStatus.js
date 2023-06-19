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
  // Navigation pane
  MONITORING_AND_ALERTING: 'Monitorización y alertas',
  // Banner
  CLUSTER_STATUS: 'Monitorización de estado del clúster',
  MONITORING_CLUSTER_DESC: 'Cluster status displays the overview and details of cluster resources. You can view the monitoring data and the usage ranking of cluster resources.',
  // Overview > Cluster Node Status
  CLUSTER_NODE_STATUS: 'Estado del nodo del clúster',
  ALL_NODES: 'Todos los nodos',
  ONLINE_NODES: 'Nodos en línea',
  NODE_ONLINE_STATUS: 'Estado del nodo online',
  TIMES_PER_SECOND: 'times/s',
  // Overview > Component Status
  COMPONENT_STATUS: 'Estado de los componentes',
  CONTROLLER_MANAGER: 'Manager de controlador',
  KUBERNETES_SCHEDULER: 'Scheduler K8s',
  // Overview > Cluster Resource Usage
  CLUSTER_RESOURCE_USAGE: 'Uso de recursos del clúster',
  POD_COUNT: 'Pods',
  COUNT: 'Count',
  PODS: 'Pods',
  // Overview > etcd Monitoring
  SERVICE_STATUS: 'Service Status',
  ETCD_MONITORING: 'Monitorización etcd',
  DB_SIZE: 'Tamaño DB',
  RAFT_PROPOSAL: 'Raft Proposal',
  ETCD_STATUS: '<span>Estado</span> del servicio',
  ETCD_PROPOSAL: '<span>Propuesta</span> de raft',
  ETCD_DB_SIZE: '<span>Tamaño</span> de DB',
  ETCD_CLIENT_TRAFFIC: '<span>Tráfico</span> de clientes',
  TITLE_UNIT: '{title} ({unit})',
  AVERAGE: 'Average',
  PROPOSAL_COMMITTED: 'Committed',
  PROPOSAL_APPLIED: 'Applied',
  PROPOSAL_FAILED: 'Failed',
  PROPOSAL_PENDING: 'Pendiente',
  // Overview > Service Component Monitoring
  SERVICE_COMPONENT_MONITORING: 'Servicio de Monitorización de Componentes',
  SCHEDULE_ATTEMPTS: 'Scheduling Attempts',
  SCHEDULING_RATE: 'Scheduling Rate',
  REQUEST: 'Request',
  REQUEST_PER_SECOND: 'Requests per Second',
  SCHEDULER: 'Scheduler',
  TOTAL_AVERAGE: 'Total',
  SUCCESS: 'Success',
  ERROR: 'Error',
  FAILURE: 'Failure',
  REQUEST_LATENCY_TCAP: '<span>Latencia</span> de las peticiones',
  REQUEST_RATE: '<span>Tasa</span> de peticiones',
  SCHEDULE_ATTEMPTS_TCAP: 'Scheduling <span>Attempts</span>',
  SCHEDULING_RATE_TCAP: 'Scheduling <span>Rate</span>',
  API_SERVER: 'API Server',
  // Physical Resource Monitoring
  SELECT_TIME_RANGE: 'Seleccionar rango de tiempo',
  LAST_TIME: 'Last {value}',
  LAST_TIME_M: '{num, plural, =1 {last 1 minute} other{last # minutes}}',
  LAST_TIME_H: '{num, plural, =1 {last 1 hour} other{last # hours}}',
  LAST_TIME_D: '{num, plural, =1 {last 1 day} other{last # days}}',
  TIMERANGE_SELECTOR_MSG: 'The end time must be later than the start time.',
  TIMERANGE_SELECTOR_ERROR_MSG: 'Please confirm whether the selected time range is appropriate!',
  PHYSICAL_RESOURCES_MONITORING: 'Monitorización de recursos físicos',
  INODE_USAGE: 'Inode Usage',
  DISK_USAGE: 'Disk Usage',
  DISK_USAGE_DETAILS: 'Disk Usage Details',
  AVERAGE_CPU_LOAD: 'Average CPU Load',
  DISK_THROUGHPUT: 'Disk Throughput',
  POD_STATUS: 'Pod Status',
  COMPLETED: 'Completed',
  WARNING: 'Warning',
  READ: 'Lectura',
  WRITE: 'Escribir',
  RUNNING: 'En ejecución',
  // Physical Resource Monitoring > Average CPU Load
  TIME_M: '{num, plural, =1 {1 minute} other{# minutes}}',
  TIME_H: '{num, plural, =1 {1 hour} other{# hours}}',
  TIME_D: '{num, plural, =1 {1 day} other{# days}}',
  // etcd Monitoring
  EXTERNAL_ETCD: 'etcd externo',
  DB_FSYNC: 'DB Fsync',
  GRPC_STREAM_MESSAGES: 'gRPC Stream Message',
  CLIENT_TRAFFIC: 'Tráfico de clientes',
  RECEIVED: 'Received',
  SENT: 'Enviado',
  WAL_FSYNC: 'WAL Fsync',
  ETCD_LEADER_TITLE: 'Leader exists',
  ETCD_CHANGES_TITLE: 'Leader changes in 1 h',
  NODE_IP_ADDRESS_VALUE: 'Node IP Address: {value}',
  // API Server Monitoring
  API_SERVER_MONITORING: 'Monitorización de API Server',
  REQUEST_LATENCY: 'Request Latency',
  REQUEST_LATENCY_MS: 'Request Latency (ms)',
  REST_CREATE: 'CREATE',
  REST_DELETE: 'DELETE',
  REST_DELETECOLLECTION: 'DELETECOLLECTION',
  REST_GET: 'GET',
  REST_POST: 'POST',
  REST_PATCH: 'PATCH',
  REST_PUT: 'PUT',
  REST_UPDATE: 'UPDATE',
  REST_LIST: 'LIST',
  // Scheduler Monitoring
  SCHEDULER_MONITORING: 'Programación de monitorización',
  SCHEDULING_LATENCY: 'Programación de latencia',
  // Resource Usage Ranking
  RESOURCE_USAGE_RANKING: 'Resource Usage Ranking',
  SORT_BY_NODE_CPU_UTILISATION: 'Sort by CPU usage (%)',
  SORT_BY_NODE_MEMORY_UTILISATION: 'Sort by memory usage (%)',
  SORT_BY_NODE_DISK_SIZE_UTILISATION: 'Sort by disk usage (%)',
  SORT_BY_NODE_POD_UTILISATION: 'Ordenar mediante el uso de pod',
  SORT_BY_NODE_DISK_INODE_UTILISATION: 'Ordenar por inodo Utilización',
  SORT_BY_NODE_LOAD1: 'Sort by 1-minute CPU load average',
  SORT_BY_NAMESPACE_MEMORY_USAGE_WO_CACHE: 'Ordenar por uso de memoria',
  POD_USAGE: 'Pod Usage',
  EXPORT: 'Export'
};