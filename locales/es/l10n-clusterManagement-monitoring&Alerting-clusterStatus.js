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
  // Overview > Component Status
  COMPONENT_STATUS: 'Estado de los componentes',
  CONTROLLER_MANAGER: 'Manager de controlador',
  KUBERNETES_SCHEDULER: 'Scheduler K8s',
  NOT_ENABLED: 'Not enabled',
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
  // Overview > Service Component Monitoring
  SERVICE_COMPONENT_MONITORING: 'Servicio de Monitorización de Componentes',
  SCHEDULE_ATTEMPTS: 'Scheduling Attempts',
  SCHEDULING_RATE: 'Scheduling Rate',
  REQUEST: 'Request',
  REQUEST_PER_SECOND: 'Request per Second',
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
  PHYSICAL_RESOURCES_MONITORING: 'Monitorización de recursos físicos',
  INODE_USAGE: 'Inode Usage',
  DISK_USAGE: 'Disk Usage',
  AVERAGE_CPU_LOAD: 'Average CPU Load',
  DISK_THROUGHPUT: 'Disk Throughput',
  NETWORK_BANDWIDTH: 'Network Bandwidth',
  POD_STATUS: 'Pod Status',
  COMPLETED: 'Completed',
  WARNING: 'Warning',
  IN: 'En',
  READ: 'Lectura',
  WRITE: 'Escribir',
  RUNNING: 'En ejecución',
  // Physical Resource Monitoring > Average CPU Load
  TIME_M: '{num, plural, =1 {1 minute} other{# minutes}}',
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
  SORT_BY_NODE_CPU_UTILISATION: 'Ordenar por CPU',
  SORT_BY_NODE_MEMORY_UTILISATION: 'Ordenar por memoria',
  SORT_BY_NODE_DISK_SIZE_UTILISATION: 'Ordenar por almacenamiento local',
  SORT_BY_NODE_POD_UTILISATION: 'Ordenar mediante el uso de pod',
  SORT_BY_NODE_DISK_INODE_UTILISATION: 'Ordenar por inodo Utilización',
  SORT_BY_NODE_LOAD1: 'Ordenar por promedio de carga',
  SORT_BY_NAMESPACE_MEMORY_USAGE_WO_CACHE: 'Ordenar por uso de memoria',
  POD_USAGE: 'Pod Usage',
  EXPORT: 'Export'
};