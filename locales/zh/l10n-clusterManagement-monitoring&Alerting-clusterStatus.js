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
  MONITORING_AND_ALERTING: '监控告警',
  // Banner
  CLUSTER_STATUS: '集群状态',
  MONITORING_CLUSTER_DESC: '集群状态展示集群资源的概览和详情，您可以查看集群资源的监控数据和用量排行情况。',
  // Overview > Cluster Node Status
  CLUSTER_NODE_STATUS: '集群节点状态',
  ALL_NODES: '全部节点',
  ONLINE_NODES: '在线节点',
  NODE_ONLINE_STATUS: '节点在线状态',
  TIMES_PER_SECOND: '次/秒',
  // Overview > Component Status
  COMPONENT_STATUS: '组件状态',
  CONTROLLER_MANAGER: '管理控制中心',
  KUBERNETES_SCHEDULER: 'Kubernetes 调度器',
  // Overview > Cluster Resource Usage
  CLUSTER_RESOURCE_USAGE: '集群资源用量',
  POD_COUNT: '容器组数量',
  COUNT: '数量',
  PODS: '容器组',
  // Overview > etcd Monitoring
  SERVICE_STATUS: '服务状态',
  ETCD_MONITORING: 'etcd 监控',
  DB_SIZE: '库大小',
  RAFT_PROPOSAL: 'Raft 提议',
  ETCD_STATUS: '服务 <span>状态</span>',
  ETCD_PROPOSAL: 'Raft <span>提议</span>',
  ETCD_DB_SIZE: '库 <span>大小</span>',
  ETCD_CLIENT_TRAFFIC: '客户端 <span>流量</span>',
  TITLE_UNIT: '{title}（{unit}）',
  AVERAGE: '平均值',
  PROPOSAL_COMMITTED: '已提交',
  PROPOSAL_APPLIED: '已应用',
  PROPOSAL_FAILED: '失败',
  PROPOSAL_PENDING: '等待中',
  // Overview > Service Component Monitoring
  SERVICE_COMPONENT_MONITORING: '服务组件监控',
  SCHEDULE_ATTEMPTS: '调度次数',
  SCHEDULING_RATE: '调度速率',
  REQUEST: '请求',
  REQUEST_PER_SECOND: '每秒请求数',
  SCHEDULER: '调度器',
  TOTAL_AVERAGE: '总均值',
  SUCCESS: '成功',
  ERROR: '错误',
  FAILURE: '失败',
  REQUEST_LATENCY_TCAP: '请求 <span>延迟</span>',
  REQUEST_RATE: '请求 <span>速率</span>',
  SCHEDULE_ATTEMPTS_TCAP: '调度 <span>次数</span>',
  SCHEDULING_RATE_TCAP: '调度 <span>速率</span>',
  API_SERVER: 'API 服务器',
  // Physical Resource Monitoring
  SELECT_TIME_RANGE: '选择时间范围',
  LAST_TIME: '最近 {value}',
  LAST_TIME_M: '最近 {num} 分钟',
  LAST_TIME_H: '最近 {num} 小时',
  LAST_TIME_D: '最近 {num} 天',
  TIMERANGE_SELECTOR_MSG: '结束时间需晚于开始时间。',
  TIMERANGE_SELECTOR_ERROR_MSG: '时间范围设置错误。',
  PHYSICAL_RESOURCES_MONITORING: '物理资源监控',
  INODE_USAGE: 'Inode 用量',
  DISK_USAGE: '磁盘用量',
  DISK_USAGE_DETAILS: '磁盘用量详情',
  AVERAGE_CPU_LOAD: 'CPU 平均负载',
  DISK_THROUGHPUT: '磁盘吞吐',
  POD_STATUS: '容器组状态',
  COMPLETED: '已完成',
  WARNING: '异常',
  READ: '读',
  WRITE: '写',
  RUNNING: '运行中',
  // Physical Resource Monitoring > Average CPU Load
  TIME_M: '{num} 分钟',
  TIME_H: '{num, plural, =1 {1 小时} other{# 小时}}',
  TIME_D: '{num, plural, =1 {1 天} other{# 天}}',
  // etcd Monitoring
  EXTERNAL_ETCD: '外部 etcd',
  DB_FSYNC: '库同步时间',
  GRPC_STREAM_MESSAGES: 'gRPC 流式消息',
  CLIENT_TRAFFIC: '客户端流量',
  RECEIVED: '接收',
  SENT: '发送',
  WAL_FSYNC: 'WAL 日志同步时间',
  ETCD_LEADER_TITLE: '是否有 Leader',
  ETCD_CHANGES_TITLE: '1 小时内 Leader 变更次数',
  NODE_IP_ADDRESS_VALUE: '节点 IP 地址：{value}',
  // API Server Monitoring
  API_SERVER_MONITORING: 'API Server 监控',
  REQUEST_LATENCY: '请求延迟',
  REQUEST_LATENCY_MS: '请求延迟（ms）',
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
  SCHEDULER_MONITORING: '调度器监控',
  SCHEDULING_LATENCY: '调度延迟',
  // Resource Usage Ranking
  RESOURCE_USAGE_RANKING: '资源用量排行',
  SORT_BY_NODE_CPU_UTILISATION: '按 CPU 用量排行（%）',
  SORT_BY_NODE_MEMORY_UTILISATION: '按内存用量排行（%）',
  SORT_BY_NODE_DISK_SIZE_UTILISATION: '按磁盘用量排行（%）',
  SORT_BY_NODE_POD_UTILISATION: '按容器组用量排行',
  SORT_BY_NODE_DISK_INODE_UTILISATION: '按 Inode 用量排行',
  SORT_BY_NODE_LOAD1: 'Sort by 1-minute CPU load average',
  SORT_BY_NAMESPACE_MEMORY_USAGE_WO_CACHE: '按内存用量排行',
  POD_USAGE: '容器组用量',
  EXPORT: '导出'
};