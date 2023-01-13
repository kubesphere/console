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
  ADD_SERVICE: '添加服务',
  ADD_ROUTE: 'Add Ingress',
  SERVICE_ADDED_SUCCESSFULLY: '服务添加成功。',
  // More > Add Ingress
  // Attributes
  // Resource Status
  WORKLOAD_TYPE_DEPLOYMENTS: '部署',
  WORKLOAD_TYPE_DAEMONSETS: '守护进程集',
  WORKLOAD_TYPE_STATEFULSETS: '有状态副本集',
  // Traffic Monitoring
  TRAFFIC_MONITORING: '流量监控',
  TRAFFIC_MONITORING_UNAVAILABLE_DESC: '应用长时间未收到请求，请稍后重试。',
  TRAFFIC_ENTRY: '流量入口',
  NO_DATA: '暂无数据',
  REFRESH: '刷新',
  SUCCESS_RATE: '成功率',
  TRAFFIC_RPS: '流量（RPS）',
  BANDWIDTH: '带宽',
  HTTP_INBOUND_TRAFFIC: 'HTTP 入站流量',
  HTTP_OUTBOUND_TRAFFIC: 'HTTP 出站流量',
  TRAFFIC_POLICIES: '流量策略',
  LOAD_BALANCING: '负载均衡',
  LOAD_BALANCING_ALGORITHM: '负载均衡算法',
  LB_ROUND_ROBIN: '轮询',
  LB_LEAST_CONN: '最少连接',
  LB_RANDOM: '随机',
  LB_ALG_DESC: '<strong>轮询</strong>：将客户端请求轮流发送给各个后端。<br/><strong>最少连接</strong>：随机选择两个健康的后端，并将客户端请求发送给连接数较少的后端。<br/><strong>随机</strong>：将客户端请求发送给一个随机的健康后端。',
  HASH_BASED_ON_HTTP_HEADER: '基于 HTTP Header 哈希',
  HASH_BASED_ON_HTTP_COOKIE: '基于 HTTP Cookie 哈希',
  HASH_BASED_ON_SOURCE_IP_ADDRESS: '基于源 IP 地址哈希',
  HTTP_HEADER: 'HTTP Header',
  HTTP_COOKIE: 'HTTP Cookie',
  CONNECTION_POOL: '连接池',
  CONNECTION_POOL_TIP: '为应用程序创建固定数量的连接对象，并将其存储在一个连接池中供重复使用。每次请求都从连接池中获取连接对象，并在使用后将连接对象返还到连接池。',
  MAXIMUM_CONNECTIONS: '最大连接数',
  MAXIMUM_CONNECTIONS_DESC: '目标后端 HTTP1 或 TCP 连接的最大数量。',
  MAXIMUM_REQUESTS_PER_CONNECTION: '每个连接最大请求数',
  MAXIMUM_REQUESTS_PER_CONNECTION_DESC: '后端每个连接的最大请求数量。',
  TRAFFIC_MONITORING_MAXIMUM_RETRIES: '最大重试次数',
  TRAFFIC_MONITORING_MAXIMUM_RETRIES_DESC: '请求的最大重试次数。',
  CONNECTION_TIMEOUT: '连接超时',
  CONNECTION_TIMEOUT_DESC: 'TCP 连接超时时间。',
  MAXIMUM_REQUESTS: '最大请求数量',
  MAXIMUM_PENDING_REQUESTS: '最大等待请求数量',
  CIRCUIT_BREAKER: '熔断器',
  CIRCUIT_BREAKER_DESC: '如果服务无法访问并且符合指定的条件， 熔断器会将服务标记为不可用，并在指定时间范围内直接向返回客户端错误响应。',
  CONSECUTIVE_FIVEXX_ERRORS: '连续 5XX 错误数量',
  CONSECUTIVE_FIVEXX_ERRORS_DESC: '从连接池中排除后端所需的连续 5XX 错误数量。',
  INSPECTION_INTERVAL_S: '检查间隔（秒）',
  INSPECTION_INTERVAL_S_DESC: '两次后端检查的时间间隔。',
  MAXIUM_EJECTION_RATIO: '最大排除比例（%）',
  MAXIUM_EJECTION_RATIO_DESC: '允许排除后端数量的最大百分比。',
  BASE_EJECTION_TIME_S: '排除时间（秒）',
  BASE_EJECTION_TIME_S_DESC: '最大后端排除时间。',
  UPDATED_AT_VALUE_SCAP: '更新于 {value}',
  METHOD: '方式',
  TRAFFIC_MANAGEMENT_UNAVAILABLE: '流量管理不可用',
  APPLICATION_GOVERNANCE_NOT_ENABLED: '请启用应用治理。',
  // Grayscale Release
  CREATE_GRAYSCALE_RELEASE_TASK: '创建灰度发布任务',
  GRAYSCALE_RELEASE_DESC: '灰度发布是在生产环境进行应用迭代的一种重要方式。您可以选择不同的发布方法，在应用升级至新版本的过程中实现平滑过渡。',
  NO_GRAYSCALE_RELEASE_TASK_FOUND: '未发现灰度发布任务',
  NO_GRAYSCALE_RELEASE_TASK_FOUND_DESC: '请创建一个灰度发布任务。',
  TYPE_SERVICE_DEPLOYMENT: '类型：无状态服务（部署）',
  TYPE_SERVICE_STATEFULSET: '类型：有状态服务（有状态副本集）',
  // Tracing
  TRACING: '链路追踪',
  TRACING_NO_DATA_DESC: '请修改搜索条件后重试。',
  NUM_SPAN_SI: '{num} 跨度',
  NUM_SPAN_PL: '{num} 跨度',
  NUM_ERROR_SI: '{num} 错误',
  NUM_ERROR_PL: '{num} 错误',
  LAST_NUM_RECORDS: '最近 {num} 条记录',
  PROCESS: '进程',
  SERVICES_AND_OPERATIONS: '服务和操作',
  TRACING_UNAVAILABLE: '链路追踪不可用',
  CALLED_SERVICES: '调用服务',
  CALLED_DEPTH: '调用深度'
};