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
  application: '应用',
  APP_PL: '应用',
  DEPLOYED_APPS: '已部署应用',
  CREATE_APP: '创建应用',
  'Deploy App': '部署应用',
  CREATE_COMPOSED_APP: '创建自制应用',
  'App Template': '应用模板',
  APP_TEMPLATE: '应用模板',
  APP_TEMPLATE_PL: '应用模板',
  TEMPLATE_BASED_APP_PL: '基于模板的应用',
  NO_TEMPLATE_BASED_APP_FOUND: '没有找到基于模板的应用',
  TEMPLATE_BASED_APP_EMPTY_DESC: '请从 KubeSphere 应用商店或应用模板创建应用。',
  APP_TEMPLATE_LOW: '应用模板',
  APP_TEMPLATE_EMPTY_DESC: '请创建一个应用模板。',
  DEPLOY: '部署',
  APP_TYPES_Q: 'KubeSphere 支持哪些应用类型？',
  TOTAL_APPS: '共计 {num} 个应用',
  TOTAL_COLLECTIONS: '共计 {num} 个接收器',
  Upgrade: '升级',
  Rollback: '回滚',

  'Create Application by Service': '通过服务构建应用',

  APP_VERSION: '应用版本',
  APPLICATION_GOVERNANCE: '应用治理',
  APPLICATION_GOVERNANCE_SCAP: '应用治理',
  APP_COMPONENT_PL: '应用组件',
  'Application Component': '应用组件',
  'Application Route': '应用路由',
  TRAFFIC_MANAGEMENT: '流量管理',
  NETWORK_TRAFFIC: '网络流量',

  'No Components': '暂无组件',
  'Cluster Select': '集群选择',

  'Application governance is not enabled': '应用治理未开启',

  'Build an app by services': '通过服务构建应用',
  'Build an app by app template': '应用模板部署',
  'Choose existing services or create new service components to build an app':
    '选择已有服务或者新建服务组件来构建应用',
  'Deploy applications with one-click application templates provided by Kubesphere':
    '通过 Kubesphere 提供的应用模板一键部署应用',
  'Sample apps can help you get started with app creation and app governance':
    '示例应用可以帮助您快速入手应用创建, 以及应用治理功能',

  ADD_SERVICE: '添加服务',
  ADD_ROUTE: '添加应用路由',
  'Add Component': '添加组件',
  EDIT_GRAYSCALE_RELEASE_JOB: '编辑灰度发布任务',
  'Add New Component': '添加新组件',

  'Application Icon': '应用图标',

  'Component Version': '组件版本',

  'Please input an application name': '请输入应用名称',
  APP: '应用',
  APP_LOW: '应用',
  'Service components should not be empty': '服务组件不能为空',
  'Please finish the sub form first': '请完成子表单的编辑',

  SERVICE_PORTS: '服务端口',
  'Traffic Entry': '流量入口',
  'Service Ports': '服务端口',
  TRAFFIC_ENTRY: '流量入口',

  APP_DESCRIPTION: '应用描述',
  APP_INTRODUCTION: '应用介绍',

  COMPOSED_APP_PL: '自制应用',
  NO_COMPOSED_APP_FOUND: '没有找到自制应用',
  'Composing App': '自制应用',

  'Workload Type': '负载类型',

  'Current Version': '当前版本',

  'Cluster Selection': '集群选择',

  'Traffic Monitoring': '流量监测',

  'Traffic (requests per second)': '流量(每秒请求)',
  'HTTP - Inbound Traffic': 'HTTP - 入站流量',
  'HTTP - Outbound Traffic': 'HTTP - 出站流量',
  TCP_INBOUND_TRAFFIC: 'TCP 入站流量',
  TCP_OUTBOUND_TRAFFIC: 'TCP 出站流量',

  'Connection timeout': '连接超时时间',
  'TCP connection timeout.': 'TCP连接超时时间。',
  'Maximum requests': '最大请求数',
  'Maximum pending requests': '最大等待请求数(等待列队的长度)',
  'Max request retries': '最大请求重试次数',
  'The maximum number of retries to the target host within the specified time.':
    '在指定时间内对目标主机最大重试次数。',
  'Max number of requests per connection': '每条连接最大请求数',
  'If the maximum number of requests in the backend connection is set to 1, the keep alive feature is disabled.':
    '对后端连接中最大的请求数量若设为1则会禁止 keep alive 特性。',
  'Max number of connections': '最大连接数',
  'The maximum number of HTTP1 or TCP connections to the target host.':
    '到目标主机HTTP1或TCP连接的最大数量。',
  'Load balance algorithm': '负载均衡算法',
  'Session retention': '会话保持',

  METHOD: '方式',
  CREATION_METHOD: '创建方式',
  'According to the HTTP header': '根据 HTTP header',

  On: '开启',
  Off: '关闭',

  Traffic: '流量',
  Send: '发送',
  Receive: '接收',

  'Success rate': '成功率',

  'Circuit Breaker': '熔断器',

  APPLICATIONS_DESC:
    '应用为用户提供完整的业务功能，由一个或多个特定功能的组件组成。',
  CREATE_APP_DESC: '从 KubeSphere 应用商店或应用模板创建应用。',
  APPLICATION_GOVERNANCE_DESC:
    '开启应用治理后可以对应用使用流量监控、灰度发布和链路追踪功能。',

  VERSION_DESC: '版本只能包含小写字母和数字，最长 16 个字符。',

  APP_ICON_TIP: '点击上传应用图标，尺寸最大为 120px * 120px',

  CLUSTER_NAME_DESC:
    '名称只能包含小写字母、数字和连字符（-），必须以小写字母开头并以小写字母或数字结尾，最长 53 个字符。',

  SERVICE_PORT_NAME_DESC:
    '端口的名字必须遵循如下格式 <protocol>[-<suffix>]，可以是 http、http2、 grpc、 mongo、 或者 redis 作为 <protocol> ，这样才能使用 Istio 的路由功能。例如 name: http2-foo 和 name: http 都是有效的端口名称，而 name: http2foo 不是。',

  LB_ALG_DESC:
    '支持标准的负载均衡算法</br>ROUND_ROBIN：轮询，默认负载均衡算法。</br>LEAST_CONN：随机选取两个健康的主机，再从所选取的两个主机中选择一个链接数较少的主机。</br>RANDOM：从所有健康的主机中，随机选取一个。',
  LB_ROUND_ROBIN: '轮询(ROUND_ROBIN)',
  LB_LEAST_CONN: '最小连接数(LEAST_CONN)',
  LB_RANDOM: '随机(RANDOM)',

  LAST_NUM_RECORDS: '最近 {num} 条记录',
  'Last {hour} hour': '最近 {hour} 小时',
  'Last {hour} hours': '最近 {hour} 小时',
  'Last {day} days': '最近 {day} 天',

  APP_WORKLOAD_TYPE_DESC: '支持无状态服务(部署)及有状态服务(有状态副本集)',

  TYPE_SERVICE_DEPLOYMENT: '类型：无状态服务（部署）',
  TYPE_SERVICE_STATEFULSET: '类型：有状态服务（有状态副本集）',
  TRACING_UNAVAILABLE: '暂时无法使用链路追踪',
  TRAFFIC_MONITORING_UNAVAILABLE_DESC: '应用长时间未收到请求，请稍后重试。',
  'Application components combine workloads and services as components in applications':
    '应用组件组合了工作负载和服务作为应用中的组件',
  'If you need to access applications by application route, add routing rules':
    '如果您需要将应用通过应用路由的方式进行访问，请添加路由规则',

  'No result found': '未查询到结果',
  TRACING_NO_DATA_DESC: '请修改搜索条件后重试。',
  TRACING: '链路追踪',
  NUM_SPAN_SI: '{num} span',
  NUM_SPAN_PL: '{num} spans',
  NUM_ERROR_SI: '{num} 错误',
  NUM_ERROR_PL: '{num} 错误',
  'Deploy sample app Bookinfo': '部署示例应用 Bookinfo',
  SAVE_FORM_TIP: '请先保存当前设置。',
  'Add Component Successfully': '添加组件成功',
  'Add Route Successfully': '添加应用路由成功',

  'Connection pool management': '连接池管理',
  CONNECTION_POOL_TIP:
    '为应用程序创建固定数量的连接对象，保存在池中进行复用。每次访问时会从池中获取已存在的连接对象，使用完毕后，连接对象将返回池中。',
  'Continuous error response (5xx) number': '连续错误响应(5xx)个数',
  'The number of consecutive 5xx errors in one inspection cycle':
    '在一个检查周期内连续出现5xx错误的个数',
  'Inspection period (unit: s)': '检查周期(单位: s)',
  'The response code will be filtered in the inspection cycle.':
    '将会对检查周期内的响应码进行筛选',
  'Pod isolation ratio (unit: %)': '容器组隔离比例(单位: %)',
  'Base ejection time (s)': '短隔离时间(s)',
  'Hash based on a specific HTTP header.': '根据 HTTP header 中的内容获取哈希',
  'Hash based on HTTP cookie.': '根据 HTTP cookie 中的内容获取哈希',
  'Hash based on the source IP address.': '根据源 IP 获取哈希',
  'Based on HTTP header': '根据 HTTP header',
  'Based on HTTP cookie': '根据 HTTP cookie',

  'Called Services': '调用服务',
  'Called Depth': '调用深度',
  'Services & Operations': '服务与操作',
  Tags: '标签',
  Process: '进程',
  Log: '日志',

  POD_ISOLATION_RATIO_DESC:
    '允许容器组被隔离的最大比例。采用向上取整，若10个实例，设为13%则最多会隔离2个实例',
  BASE_EJECTION_TIME_DESC:
    '容器组第一次被隔离的时间，之后每次隔离时间为次数与最短隔离时间的乘积',
  CIRCUIT_DESC:
    '熔断机制是应对雪崩效应的一种微服务链路保护机制。当算出链路的某个微服务不可用或者响应时间太长时，会进行服务的降级，进而熔断该节点微服务的调用，快速返回错误的响应信息。当检测到该节点微服务调用响应正常后，恢复调用链路。',

  'Please input component version': '请输入组件版本',
  INVALID_VERSION_TIP: '无效版本格式。',
  WORKLOAD_NAME_EXIST: '工作负载 {name} 已存在',

  APP_TYPES_A:
    'KubeSphere 支持基于模板的应用和自制应用。基于模板的应用创建自 KubeSphere 应用商店或应用模板，自制应用由用户自定义。',

  APPLICATION_SERVICE_DESC: '根据需求为应用添加有状态服务或无状态服务。',
  APP_BASIC_INFORMATION_DESC: '设置应用的基本信息。',

  HOW_TO_USE_APP_GOVERN_Q: '如何使用应用治理功能?',
  HOW_TO_USE_APP_GOVERN_A: '您可以在创建自制应用时开启应用治理功能。',

  'App Types': '应用的类型',
  TIP_APP_TYPE:
    'KubeSphere 支持来自于应用商店和应用仓库的应用部署(基于 Helm)，同样也支持自制应用 (Application CRD)。',
  'How to use Application Governance': '如何使用应用治理',
  TIP_APP_GOVERNANCE:
    '使用应用治理需要创建自制应用并对每项服务开启服务治理功能',
  'App store deployment': '应用商店部署',
  FROM_APP_STORE: '从应用商店',
  FROM_APP_TEMPLATE: '从应用模板',
  'From third party Helm': '来自第三方 Helm',
  FROM_APP_STORE_DESC: '从 KubeSphere 应用商店创建应用。',
  FROM_APP_TEMPLATE_DESC: '从企业空间或远程应用仓库中的应用模板创建应用。',
  COMPOSED_APP_EMPTY_DESC: '请创建一个自制应用。',
  APP_TEMPLATES_MODAL_DESC:
    '从下拉列表中选择当前企业空间或远程应用仓库以查看可用的应用模板。',
  APP_REPOS_DESC:
    '应用仓库来自于第三方的 Helm Chart Repo，通过可视化的方式在 KubeSphere 中展示并提供部署及管理功能，用户可以基于应用仓库中的模板快速地一键部署应用。',

  CURRENT_WORKSPACE: '当前企业空间',
  SELECT_APP_REPOSITORY: '选择应用仓库',
  APP_CREATE_SERVICE_DESC: '为自制应用创建一个服务。',
  CREATE_SERVICE_DESC: '选择创建服务的方式。',
  'Add an Internet access rule for the application': '为应用添加外网访问规则',
  ROUTE_SETTINGS: '路由设置',
  ROUTE_SETTINGS_DESC: '为应用设置路由规则。',

  APPLICATION_GOVERNANCE_ENABLED: '应用治理已开启',
  APPLICATION_GOVERNANCE_DISABLED: '应用治理已关闭',

  TRAFFIC_MANAGEMENT_NO_MICROSERVICE_TIP:
    '流量治理依赖于微服务模块, 当前集群未开启微服务模块',
  TRACING_NO_MICROSERVICE_TIP: '请在当前集群中开启应用治理组件。',
}
