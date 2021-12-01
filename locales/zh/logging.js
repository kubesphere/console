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
  TIME_S: '{num}s',
  'Log Management': '日志管理',
  QUERYING_RULES: '查询规则',
  TOTAL_LOGS:
    '总共收录了 <span class={className}>{containers}</span> 个容器<br/> <span class={className}> {logs} </span> 条日志信息',
  LOG_DATE: 'YYYY 年 MM 月 DD 日 HH 时',
  EVENT_DATE: 'YYYY 年 MM 月 DD 日 0 时',
  TOPIC: '主题',
  Keyword: '关键字',
  CONTAINER_LOG_SOURCE: '容器日志来源',
  REFRESH_RATE_COLON: '刷新频率：',
  'Region Data': '元数据',
  'Refresh Rate': '刷新频率',
  'Back to previous': '返回上一级',
  'Log Start Time': '收录起始时间',
  'Current Statistics Start Time': '本次统计起始时间',
  CONTAINER_LOG_TRENDS_12H: '12 小时内容器日志变化趋势',
  'Search Logs by': '通过{field}查询日志',
  CONTAINER_LOG_KEYWORD_TIP: '输入关键词查找容器日志。',
  CONTAINER_LOG_PROJECT_TIP: '输入项目名称查找容器日志。',
  CONTAINER_LOG_WORKLOAD_TIP: '输入工作负载名称查找容器日志。',
  CONTAINER_LOG_CONTAINER_TIP: '输入容器名称查找容器日志。',
  CONTAINER_LOG_POD_TIP: '输入容器组名称查找容器日志。',
  RESOURCE_EVENT_TRENDS_12H: '12 小时内资源事件变化趋势',
  'Search Events by': '通过{field}查询事件',
  RESOURCE_EVENT_WORKSPACE_TIP: '输入企业空间名称查找资源事件。',
  RESOURCE_EVENT_PROJECT_TIP: '输入项目名称查找资源事件。',
  RESOURCE_EVENT_RESOURCE_TYPE_TIP: '输入资源类型查找资源事件。',
  RESOURCE_EVENT_RESOURCE_NAME_TIP: '输入资源名称查找资源事件。',
  RESOURCE_EVENT_REASON_TIP: '输入原因查找资源事件。',
  RESOURCE_EVENT_MESSAGE_TIP: '输入消息查找资源事件。',
  RESOURCE_EVENT_CATEGORY_TIP: '输入分类名称查找资源事件。',
  'Pod Event Query Tip': '输入容器组名称查找资源事件。',
  'Event statistics': '事件统计',
  TIME_TOPOLOGY: '时间拓扑图 ',
  'Display Content': '显示内容',
  SEARCH_RESULTS: '搜索结果',
  'Please enter a filter to search for logs.': '请输入条件过滤日志',
  'Log Query': '日志查询',
  CONTAINER_LOG_COUNT: '容器日志数量',
  AUDIT_LOG_COUNT: '审计日志数量',
  EXACT_QUERY: '精确查询',
  FUZZY_QUERY: '模糊查询',
  'Log Collections': '日志收集',

  'Search Auditing Logs by': '通过{field}查询审计',
  AUDIT_LOG_WORKSPACE_TIP: '输入企业空间名称查找审计日志。',
  AUDIT_LOG_PROJECT_TIP: '输入项目名称查找审计日志。',
  AUDIT_LOG_RESOURCE_NAME_TIP: '输入资源名称查找审计日志。',
  AUDIT_LOG_RESOURCE_TYPE_TIP: '输入资源类型查找审计日志。',
  AUDIT_LOG_VERB_TIP: '输入操作行为查找审计日志。',
  AUDIT_LOG_STATUS_CODE_TIP: '输入状态码查找审计日志。',
  AUDIT_LOG_OPERATOR_TIP: '输入操作者查找审计日志。',
  AUDIT_LOG_SOURCE_IP_ADDRESS_TIP: '输入源 IP 地址查找审计日志。',
  'Auditing log trends in the last 12 hours':
    '最近 12 小时操作审计总数变化趋势',

  TOTAL_AUDITING_TODAY:
    '今日总共收录了 <span class={className}> {auditing} </span> 条审计日志',
  NO_AUDIT_LOG_TODAY: '今日没有收录的审计日志',

  LOG_COLLECTION_DESC:
    '系统将收集每个容器的标准输出和标准错误输出日志，并将其发送到一个或多个目标服务。',
  ADD_LOG_RECEIVER: '添加日志接收器',
  EMPTY_LOG_COLLECTIONS:
    '未发现日志接收器。您可以添加日志接收器将日志发送到外部日志接收器中。',
  LOG_COLLECTION_TIPS: '每种类型的日志收集器只能添加一个。',

  Address: '地址',
  SERVICE_ADDRESS: '服务地址',
  ADD_SERVICE_ADDRESS: '添加',
  ENTER_SERVICE_ADDRESS: '请输入服务地址。',

  URL_SYNTAX_ERROR: 'URL 语法错误',
  ADDRESS_EMPTY_DESC: '请输入地址。',
  LOG_COLLECTION_ES_URL_TIPS:
    '默认使用系统部署的 Elasticsearch 服务，您也可以输入在集群内部或外部单独部署的 Elasticsearch 服务的地址。',
  LOG_COLLECTION_ES_INDEX_TIPS:
    '使用索引前缀进行快速搜索。系统以<索引前缀>-<年-月-日>格式自动生成索引前缀。',
  LOG_COLLECTION_FLUENTD_URL_TIPS: '输入接收日志的 Fluentd 服务的地址。',

  'Refresh Interval': '刷新频率',
  REFRESH_INTERVAL_VALUE: '刷新间隔：{value}s',
  'Recently Updated': '最近刷新',
  'Recently Configured Updated': '最近配置更新',
  Collecting: '收集中',
  CHANGE_STATUS: '更改状态',
  'Release Collection': '释放收集',
  'Delete Log Receiver': '删除日志接收器',
  'Log Receiver': '日志接收器',
  Activate: '激活',
  'Real-Time Data': '实时数据',
  INDEX_PREFIX: '索引前缀',

  RESOURCE_NAME_AND_TYPE: '资源类型与名称',

  TOOLBOX_SHIFT_TIPS: ' 👻 按下“shift+左键”可在浏览器新窗口中打开 kubectl。',
  HIDE_HELP_INFORMATION: '隐藏帮助信息',
  ES_DESC: 'Elasticsearch 是分布式、RESTful 风格的搜索和分析引擎。',
  KAFKA_DESC: 'Kafka 是流行的开源流处理平台。',
  FLUENTD_DESC: 'Fluentd 是提供统一日志处理层的开源数据收集器。',
  LOG_COLLECTION_ENABLE_TIPS: '新的状态需要 1 分钟左右生效。',
  'Passwords must be at least 6 characters long': '密码至少 6 个字节',
  CONTAINER_LOGS_NOT_SUPPORTED: '容器在当前不支持实时日志，请稍后重试。',
  TOTAL_LOGS_TODAY:
    '今日总共收录了 <span class={className}>{containers}</span> 个容器<br/> <span class={className}> {logs} </span> 条日志信息',
  LOG_EXPORT: '日志导出',
  START_REAL_TIME_LOG: '开启实时日志',
  STOP_REAL_TIME_LOG: '停止实时日志',
  EXPORT_LOGS: '导出日志',
  CUSTOM_MONITORING_DASHBOARD: '自定义监控面板',
  CUSTOM_MONITORING_DASHBOARD_PL: '自定义监控面板',
  CUSTOMMONITORDASHBOARD_PL: '自定义监控面板',
  CUSTOMMONITORDASHBOARD_LOW: '自定义监控面板',
  CUSTOM_MONITORING_DASHBOARD_EMPTY_DESC: '请创建一个自定义监控面板。',
  CREATE_CUSTOM_MONITORING_DASHBOARD: '创建自定义监控面板',
  MONITORING_TEMPLATE: '监控模板',
  CUSTOM_MONITORING_TEMPLATE_DESC:
    '选择默认模板、上传模板或自定义模板来生成自定义监控面板。',
  SERVICE_BUILT_INTERFACE: '服务已内置监控数据抓取接口',
  TOTAL_EVENTS_TODAY:
    '今日总共收录了 <span class={className}> {events} </span> 条资源事件',
  NO_RESOURCE_EVENTS_TODAY: '今日没有收录的资源事件',
  UPLOAD_GRAFANA_DASHBOARD: '上传 Grafana 监控面板',
  IMPORT_GRAFANA_JSON_FILE: '导入 Grafana JSON 文件',
  SUPPORT_JSON_FILE: '仅支持 JSON 格式的文件。',
  UPLOAD_GRAFANA_URL: '通过 URL 上传 Grafana 监控面板。',
  FILE_UPLOAD_ERROR: '只能上传一个文件。',
  UPLOAD_FILE_TIP: '请上传文件。',
  ENTER_GRAFANA_URL: '请输入 Grafana 监控面板 URL。',
  UPLOAD_FROM_LOCAL_TITLE: '选择或拖动文件',
  EVENT_NOT_ENABLED_DESC:
    '当前组件尚未开启。<a href="{docUrl}/pluggable-components/events/" target="_blank">了解更多</a>',
  AUDITING_NOT_ENABLED_DESC:
    '当前组件尚未开启。<a href="{docUrl}/pluggable-components/auditing-logs/" target="_blank">了解更多</a>',
  LOGGING_NOT_ENABLED_DESC:
    '当前组件尚未开启。<a href="{docUrl}/pluggable-components/logging/" target="_blank">了解更多</a>',
  'No cluster with event query enabled': '未发现开启事件查询的集群',
  'No cluster with auditing module enabled': '未发现开启审计模块的集群',
  'No cluster with logging module enabled': '未发现开启日志模块的集群',
  LOGGING_DISABLED: '日志组件未开启',

  LOGGING_LOG_COLLECTOR: '日志接收器',
  EVENTS_LOG_COLLECTOR: '事件日志接收器',
  AUDITING_LOG_COLLECTOR: '审计日志接收器',

  // Log Collection
  LOG_COLLECTION: '日志收集',
  LOG_RECEIVER_PL: '日志接收器',
  LOG_ADDRESS: '地址：',
  LOG_COLLECTING: '收集中',
  LOG_DISABLED: '关闭',
  INVALID_SERVICE_ADDRESS: '请输入正确的服务地址。',
  EXAMPLE: '例如：',
  PORT_NUMBER_EMPTY: '请输入端口号。',
  PARAMETER_REQUIRED: '此参数为必填项。',
  EVENT_PL: '事件',
  CREATION_TIME: '创建时间',

  // Log Collection > Details
  ADDRESS: '地址',
  CHANGE_STATUS_SCAP: '更改状态',
  EVENTS: '事件',
  SELECT_STATUS_TIP: '选择一个状态',

  // Container Log Search
  LOG_EXPORT_SCAP: '日志导出',
  SEARCH_BY_KEYWORD: '按关键词搜索',
  SEARCH_BY_PROJECT: '按项目搜索',
  SEARCH_BY_WORKLOAD: '按工作负载搜索',
  SEARCH_BY_POD: '按容器组搜索',
  SEARCH_BY_CONTAINER: '按容器搜索',
  START_TIME_COLON: '开始时间：',
  KEYWORD: '关键词',
  LOG: '日志',
  DISPLAY: '显示',
  HIDE: '隐藏',
  STOP_REAL_TIME_CONTAINER_LOG: '暂停实时容器日志',
  START_REAL_TIME_CONTAINER_LOG: '查看实时容器日志',
  REASON_COLON: '原因：',
  MESSAGE_COLON: '消息：',

  // Resource Event Search
  STOP_REAL_TIME_RESOURCE_EVENT: '暂停实时资源事件',
  START_REAL_TIME_RESOURCE_EVENT: '查看实时资源事件',
  RESOURCE_EVENT_COUNT: '资源事件数量',
  SEARCH_BY_MESSAGE: '按消息搜索',
  SEARCH_BY_WORKSPACE: '按企业空间搜索',
  SEARCH_BY_RESOURCE_TYPE: '按资源类型搜索',
  SEARCH_BY_RESOURCE_NAME: '按资源名称搜索',
  SEARCH_BY_REASON: '按原因搜索',
  SEARCH_BY_CATEGORY: '按分类搜索',

  // Audit Log Search
  VERB: '操作行为',
  STATUS_CODE: '状态码',
  SUBRESOURCE: '子资源',
  SEARCH_BY_VERB: '按操作行为搜索',
  SEARCH_BY_STATUS_CODE: '按状态码搜索',
  SEARCH_BY_OPERATOR: '按操作者搜索',
  SEARCH_BY_SOURCE_IP_ADDRESS: '按源 IP 地址搜索',
}
