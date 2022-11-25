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
  MONITORING_AND_ALERTING: 'Monitoring & Alerting',
  // Banner
  CLUSTER_STATUS: 'Cluster Status',
  MONITORING_CLUSTER_DESC: 'Cluster status displays the overview and details of cluster resources. You can view the monitoring data and the usage ranking of cluster resources.',
  // Overview > Cluster Node Status
  CLUSTER_NODE_STATUS: 'Cluster Node Status',
  ALL_NODES: 'All nodes',
  ONLINE_NODES: 'Online nodes',
  NODE_ONLINE_STATUS: 'Node Online Status',
  TIMES_PER_SECOND: 'times/s',
  // Overview > Component Status
  COMPONENT_STATUS: 'Component Status',
  CONTROLLER_MANAGER: 'Controller Manager',
  KUBERNETES_SCHEDULER: 'Kubernetes Scheduler',
  // Overview > Cluster Resource Usage
  CLUSTER_RESOURCE_USAGE: 'Cluster Resource Usage',
  POD_COUNT: 'Pods',
  COUNT: 'Count',
  PODS: 'Pods',
  // Overview > etcd Monitoring
  SERVICE_STATUS: 'Service Status',
  ETCD_MONITORING: 'etcd Monitoring',
  DB_SIZE: 'DB Size',
  RAFT_PROPOSAL: 'Raft Proposal',
  ETCD_STATUS: 'Service <span>Status</span>',
  ETCD_PROPOSAL: 'Raft <span>Proposal</span>',
  ETCD_DB_SIZE: 'DB <span>Size</span>',
  ETCD_CLIENT_TRAFFIC: 'Client <span>Traffic</span>',
  TITLE_UNIT: '{title} ({unit})',
  AVERAGE: 'Average',
  PROPOSAL_COMMITTED: 'Committed',
  PROPOSAL_APPLIED: 'Applied',
  PROPOSAL_FAILED: 'Failed',
  PROPOSAL_PENDING: 'Pending',
  // Overview > Service Component Monitoring
  SERVICE_COMPONENT_MONITORING: 'Service Component Monitoring',
  SCHEDULE_ATTEMPTS: 'Scheduling Attempts',
  SCHEDULING_RATE: 'Scheduling Rate',
  REQUEST: 'Request',
  REQUEST_PER_SECOND: 'Request per Second',
  SCHEDULER: 'Scheduler',
  TOTAL_AVERAGE: 'Total',
  SUCCESS: 'Success',
  ERROR: 'Error',
  FAILURE: 'Failure',
  REQUEST_LATENCY_TCAP: 'Request <span>Latency</span>',
  REQUEST_RATE: 'Request <span>Rate</span>',
  SCHEDULE_ATTEMPTS_TCAP: 'Scheduling <span>Attempts</span>',
  SCHEDULING_RATE_TCAP: 'Scheduling <span>Rate</span>',
  API_SERVER: 'API Server',
  // Physical Resource Monitoring
  SELECT_TIME_RANGE: 'Select Time Range',
  LAST_TIME: 'Last {value}',
  LAST_TIME_M: '{num, plural, =1 {Last 1 minute} other{Last # minutes}}',
  LAST_TIME_H: '{num, plural, =1 {Last 1 hour} other{Last # hours}}',
  LAST_TIME_D: '{num, plural, =1 {Last 1 day} other{Last # days}}',
  TIMERANGE_SELECTOR_MSG: 'The end time must be later than the start time.',
  TIMERANGE_SELECTOR_ERROR_MSG: 'Please confirm whether the selected time range is appropriate!',
  PHYSICAL_RESOURCES_MONITORING: 'Physical Resource Monitoring',
  INODE_USAGE: 'Inode Usage',
  DISK_USAGE: 'Disk Usage',
  DISK_USAGE_DETAILS: 'Disk Usage Details',
  AVERAGE_CPU_LOAD: 'Average CPU Load',
  DISK_THROUGHPUT: 'Disk Throughput',
  POD_STATUS: 'Pod Status',
  COMPLETED: 'Completed',
  WARNING: 'Warning',
  READ: 'Read',
  WRITE: 'Write',
  RUNNING: 'Running',
  // Physical Resource Monitoring > Average CPU Load
  TIME_M: '{num, plural, =1 {1 minute} other{# minutes}}',
  TIME_H: '{num, plural, =1 {1 hour} other{# hours}}',
  TIME_D: '{num, plural, =1 {1 day} other{# days}}',
  // etcd Monitoring
  EXTERNAL_ETCD: 'External etcd',
  DB_FSYNC: 'DB Fsync',
  GRPC_STREAM_MESSAGES: 'gRPC Stream Message',
  CLIENT_TRAFFIC: 'Client Traffic',
  RECEIVED: 'Received',
  SENT: 'Sent',
  WAL_FSYNC: 'WAL Fsync',
  ETCD_LEADER_TITLE: 'Leader exists',
  ETCD_CHANGES_TITLE: 'Leader changes in 1 h',
  NODE_IP_ADDRESS_VALUE: 'Node IP Address: {value}',
  // API Server Monitoring
  API_SERVER_MONITORING: 'API Server Monitoring',
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
  SCHEDULER_MONITORING: 'Scheduler Monitoring',
  SCHEDULING_LATENCY: 'Scheduling Latency',
  // Resource Usage Ranking
  RESOURCE_USAGE_RANKING: 'Resource Usage Ranking',
  SORT_BY_NODE_CPU_UTILISATION: 'Sort by CPU usage (%)',
  SORT_BY_NODE_MEMORY_UTILISATION: 'Sort by memory usage (%)',
  SORT_BY_NODE_DISK_SIZE_UTILISATION: 'Sort by disk usage (%)',
  SORT_BY_NODE_POD_UTILISATION: 'Sort by pod usage',
  SORT_BY_NODE_DISK_INODE_UTILISATION: 'Sort by inode usage',
  SORT_BY_NODE_LOAD1: 'Sort by 1-minute CPU load average',
  SORT_BY_NAMESPACE_MEMORY_USAGE_WO_CACHE: 'Sort by memory usage',
  POD_USAGE: 'Pod Usage',
  EXPORT: 'Export'
};