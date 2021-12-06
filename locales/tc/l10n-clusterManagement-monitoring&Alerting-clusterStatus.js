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
  MONITORING_AND_ALERTING: '監控告警',
  // Banner
  CLUSTER_STATUS: '集群狀態',
  MONITORING_CLUSTER_DESC: 'Cluster status displays the overview and details of cluster resources. You can view the monitoring data and the usage ranking of cluster resources.',
  // Overview > Cluster Node Status
  CLUSTER_NODE_STATUS: '集群節點狀態',
  ALL_NODES: '全部節點',
  ONLINE_NODES: '在線節點',
  NODE_ONLINE_STATUS: '節點在線狀態',
  // Overview > Component Status
  COMPONENT_STATUS: '組件狀態',
  CONTROLLER_MANAGER: '管理控制中心',
  KUBERNETES_SCHEDULER: 'K8s 調度器',
  NOT_ENABLED: 'Not enabled',
  // Overview > Cluster Resource Usage
  CLUSTER_RESOURCE_USAGE: '集群資源使用情況',
  POD_COUNT: 'Pods',
  COUNT: 'Count',
  PODS: '容器組',
  // Overview > etcd Monitoring
  SERVICE_STATUS: '服務狀態',
  ETCD_MONITORING: 'etcd 監控',
  DB_SIZE: '資料庫大小',
  RAFT_PROPOSAL: 'Raft 提議',
  ETCD_STATUS: '服務 <span>狀態</span>',
  ETCD_PROPOSAL: 'Raft <span>提議</span>',
  ETCD_DB_SIZE: '資料庫 <span>大小</span>',
  ETCD_CLIENT_TRAFFIC: '客戶端 <span>流量</span>',
  TITLE_UNIT: '{title} ({unit})',
  // Overview > Service Component Monitoring
  SERVICE_COMPONENT_MONITORING: '服務組件監控',
  SCHEDULE_ATTEMPTS: '調度次數',
  SCHEDULING_RATE: '調度速率',
  REQUEST: '請求',
  REQUEST_PER_SECOND: '每秒請求數',
  SCHEDULER: '調度器',
  TOTAL_AVERAGE: '總平均值',
  SUCCESS: '成功',
  ERROR: '錯誤',
  FAILURE: '失敗',
  REQUEST_LATENCY_TCAP: '請求 <span>延遲</span>',
  REQUEST_RATE: '請求 <span>速率</span>',
  SCHEDULE_ATTEMPTS_TCAP: '調度 <span>次數</span>',
  SCHEDULING_RATE_TCAP: '調度 <span>速率</span>',
  API_SERVER: 'API Server',
  // Physical Resource Monitoring
  SELECT_TIME_RANGE: '選擇時間範圍',
  LAST_TIME: 'Last {value}',
  LAST_TIME_M: '最近 {num} 分鐘',
  LAST_TIME_H: '最近 {num} 小時',
  LAST_TIME_D: '最近 {num} 天',
  TIMERANGE_SELECTOR_MSG: '結束時間需晚於開始時間。',
  PHYSICAL_RESOURCES_MONITORING: '物理資源監控',
  INODE_USAGE: 'Inode Usage',
  DISK_USAGE: 'Disk Usage',
  AVERAGE_CPU_LOAD: 'Average CPU Load',
  DISK_THROUGHPUT: 'Disk Throughput',
  NETWORK_BANDWIDTH: 'Network Bandwidth',
  POD_STATUS: 'Pod Status',
  COMPLETED: 'Completed',
  WARNING: 'Warning',
  IN: '入',
  READ: '讀',
  WRITE: '寫',
  RUNNING: '運行中',
  // Physical Resource Monitoring > Average CPU Load
  TIME_M: '{num} 分鐘',
  // etcd Monitoring
  EXTERNAL_ETCD: '外部 etcd',
  DB_FSYNC: '資料庫同步時間',
  GRPC_STREAM_MESSAGES: 'gRPC 流式訊息',
  CLIENT_TRAFFIC: '客戶端流量',
  RECEIVED: '接收',
  SENT: '發送',
  WAL_FSYNC: 'WAL 紀錄同步時間',
  ETCD_LEADER_TITLE: 'Leader exists',
  ETCD_CHANGES_TITLE: 'Leader changes in 1 h',
  NODE_IP_ADDRESS_VALUE: 'Node IP Address: {value}',
  // API Server Monitoring
  API_SERVER_MONITORING: 'API Server 監控',
  REQUEST_LATENCY: '請求延遲',
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
  SCHEDULER_MONITORING: '調度器監控',
  SCHEDULING_LATENCY: '調度延遲',
  // Resource Usage Ranking
  RESOURCE_USAGE_RANKING: 'Resource Usage Ranking',
  SORT_BY_NODE_CPU_UTILISATION: '按 CPU 使用率排行',
  SORT_BY_NODE_MEMORY_UTILISATION: '按記憶體使用率排行',
  SORT_BY_NODE_DISK_SIZE_UTILISATION: '按本地儲存用量排行',
  SORT_BY_NODE_POD_UTILISATION: '按容器組用量排行',
  SORT_BY_NODE_DISK_INODE_UTILISATION: '按 Inode 使用率排行',
  SORT_BY_NODE_LOAD1: '按 CPU 平均負載排行',
  SORT_BY_NAMESPACE_MEMORY_USAGE_WO_CACHE: '按記憶體使用量排行',
  POD_USAGE: 'Pod Usage',
  EXPORT: '匯出'
};