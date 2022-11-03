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
  MONITORING_CLUSTER_DESC: '集群狀態展示集群資源的概覽和詳情，您可以查看集群資源的監控數據和用量排行情況。',
  // Overview > Cluster Node Status
  CLUSTER_NODE_STATUS: '集群節點狀態',
  ALL_NODES: '全部節點',
  ONLINE_NODES: '在線節點',
  NODE_ONLINE_STATUS: '節點在線狀態',
  TIMES_PER_SECOND: 'times/s',
  // Overview > Component Status
  COMPONENT_STATUS: '組件狀態',
  CONTROLLER_MANAGER: '管理控制中心',
  KUBERNETES_SCHEDULER: 'K8s 調度器',
  // Overview > Cluster Resource Usage
  CLUSTER_RESOURCE_USAGE: '集群資源使用情況',
  POD_COUNT: '容器組數量',
  COUNT: '數量',
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
  TITLE_UNIT: '{title}（{unit}）',
  AVERAGE: 'Average',
  PROPOSAL_COMMITTED: 'Committed',
  PROPOSAL_APPLIED: 'Applied',
  PROPOSAL_FAILED: '失敗',
  PROPOSAL_PENDING: '等待中',
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
  API_SERVER: 'API 伺服器',
  // Physical Resource Monitoring
  SELECT_TIME_RANGE: '選擇時間範圍',
  LAST_TIME: '最近 {value}',
  LAST_TIME_M: '最近 {num} 分鐘',
  LAST_TIME_H: '最近 {num} 小時',
  LAST_TIME_D: '最近 {num} 天',
  TIMERANGE_SELECTOR_MSG: '結束時間需晚於開始時間。',
  TIMERANGE_SELECTOR_ERROR_MSG: '時間範圍設置錯誤。',
  PHYSICAL_RESOURCES_MONITORING: '物理資源監控',
  INODE_USAGE: 'Inode 用量',
  DISK_USAGE: '磁碟用量',
  DISK_USAGE_DETAILS: 'Disk Usage Details',
  AVERAGE_CPU_LOAD: 'CPU 平均負載',
  DISK_THROUGHPUT: '磁碟吞吐量',
  POD_STATUS: '容器組狀態',
  COMPLETED: '已完成',
  WARNING: '異常',
  READ: '讀',
  WRITE: '寫',
  RUNNING: '運行中',
  // Physical Resource Monitoring > Average CPU Load
  TIME_M: '{num} 分鐘',
  TIME_H: '{num, plural, =1 {1 hour} other{# hours}}',
  TIME_D: '{num, plural, =1 {1 day} other{# days}}',
  // etcd Monitoring
  EXTERNAL_ETCD: '外部 etcd',
  DB_FSYNC: '資料庫同步時間',
  GRPC_STREAM_MESSAGES: 'gRPC 流式訊息',
  CLIENT_TRAFFIC: '客戶端流量',
  RECEIVED: '接收',
  SENT: '發送',
  WAL_FSYNC: 'WAL 紀錄同步時間',
  ETCD_LEADER_TITLE: '是否有 Leader',
  ETCD_CHANGES_TITLE: '1 小時内 Leader 變更次數',
  NODE_IP_ADDRESS_VALUE: '節點 IP 地址：{value}',
  // API Server Monitoring
  API_SERVER_MONITORING: 'API Server 監控',
  REQUEST_LATENCY: '請求延遲',
  REQUEST_LATENCY_MS: '請求延遲（ms）',
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
  RESOURCE_USAGE_RANKING: '資源用量排行',
  SORT_BY_NODE_CPU_UTILISATION: 'Sort by CPU usage (%)',
  SORT_BY_NODE_MEMORY_UTILISATION: 'Sort by memory usage (%)',
  SORT_BY_NODE_DISK_SIZE_UTILISATION: 'Sort by disk usage (%)',
  SORT_BY_NODE_POD_UTILISATION: '按容器組用量排行',
  SORT_BY_NODE_DISK_INODE_UTILISATION: '按 Inode 使用率排行',
  SORT_BY_NODE_LOAD1: 'Sort by 1-minute CPU load average',
  SORT_BY_NAMESPACE_MEMORY_USAGE_WO_CACHE: '按記憶體使用量排行',
  POD_USAGE: '容器組用量',
  EXPORT: '匯出'
};