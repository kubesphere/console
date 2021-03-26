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
  'Log Management': '日志管理',
  'Search Rule': '查询规则',
  TOTAL_LOGS:
    '总共收录了 <span class={className}>{containers}</span> 个容器<br/> <span class={className}> {logs} </span> 条日志信息',
  LOG_DATE: 'YYYY年MM月DD日HH时',
  EVENT_DATE: 'YYYY年MM月DD日0时',
  topic: '主题',
  Keyword: '关键字',
  'Region Data': '元数据',
  'Refresh Rate': '刷新频率',
  'Back to previous': '返回上一级',
  'Log Start Time': '收录起始时间',
  'Current Statistics Start Time': '本次统计起始时间',
  'Log trends in the last 12 hours': '最近 12 小时日志总数变化趋势',
  'Search Logs by': '通过{field}查询日志',
  'KeyWord Log Query Tip':
    '请输入关键字查找日志, 还可以通过 “Error” “Fail” “Fatal” “Exception ” “Warning” 等关键字查找错误日志',
  'Project Log Query Tip': '可以根据项目名称查看相关的日志信息',
  'Workload Log Query Tip': '可以根据工作负载名称查看相关的日志信息',
  'Container Log Query Tip': '可以根据容器名称查看相关的日志信息',
  'Pod Log Query Tip': '可以根据容器组名称查看相关的日志信息',
  'Event trends in the last 12 hours': '最近 12 小时事件总数变化趋势',
  'Search Events by': '通过{field}查询事件',
  'Workspace Event Query Tip': '可以根据企业空间查看相关的事件信息',
  'Project Event Query Tip': '可以根据项目查看相关的事件信息',
  'Resource Type Event Query Tip': '可以根据资源类型查看相关的事件信息',
  'Resource Name Event Query Tip': '可以根据资源名称查看相关的事件信息',
  'Reason Event Query Tip': '可以根据原因查看相关的事件信息',
  'Message Event Query Tip': '可以根据消息查看相关的事件信息',
  'Category Event Query Tip': '可以根据类别查看相关的事件信息',
  'Pod Event Query Tip': '可以根据容器组查看相关的事件信息',
  'Event statistics': '事件统计',
  'Time topology': '时间拓扑图',
  'Display Content': '显示内容',
  'Search Result': '搜索结果',
  'Please enter a filter to search for logs.': '请输入条件过滤日志',
  'Log Query': '日志查询',
  'Log statistics': '日志统计',
  'Auditing statistics': '操作审计统计',
  'Exact Query': '精确匹配',
  'Fuzzy Query': '模糊匹配',
  'Log Collections': '日志收集',

  'Search Auditing Logs by': '通过{field}查询审计',
  'Workspace Auditing Query Tip': '可以根据企业空间查看相关的操作审计',
  'Project Auditing Query Tip': '可以根据项目查看相关的操作审计',
  'Resource Name Auditing Query Tip': '可以根据资源名称查看相关的操作审计',
  'Resource Type Auditing Query Tip': '可以根据资源类型查看相关的操作审计',
  'Verb Auditing Query Tip': '可以根据操作行为查看相关的操作审计',
  'Status Code Auditing Query Tip': '可以根据状态码查看相关的操作审计',
  'Operation Account Auditing Query Tip': '可以根据操作帐户查看相关的操作审计',
  'Source IP Auditing Query Tip': '可以根据来源IP查看相关的操作审计',
  'Auditing log trends in the last 12 hours':
    '最近 12 小时操作审计总数变化趋势',

  TOTAL_AUDITING_TODAY:
    '今日总共收录了 <span class={className}> {auditing} </span> 条操作审计',
  NO_AUDITING_TODAY: '今日没有收录的操作审计',

  LOG_COLLECTION_DESC:
    '系统将收集每个容器的标准输出和标准错误输出日志，并将其发送到一个或多个目标服务',
  'Add Log Receiver': '添加日志接收器',
  EMPTY_LOG_COLLECTIONS:
    '暂时没有设置日志收集器，您可以添加日志收集器将日志导出到外埠的日志收集工具中',
  LOG_COLLECTION_TIPS:
    '每种类型的日志接收器只能添加一个，如果已存在则只能修改，不可以再添加',

  Address: '地址',
  'Service Address': '服务地址',
  'Add Service Address': '添加服务地址',
  'Please input service address': '请输入服务地址',

  URL_SYNTAX_ERROR: 'URL 语法错误',
  'Please enter the address': '请输入地址',
  LOG_COLLECTION_ES_URL_TIPS:
    '默认使用系统部署的 Elasticsearch，也可以输入外部或者单独部署的 Elasticsearch 地址',
  LOG_COLLECTION_ES_INDEX_TIPS:
    '默认按日期分类建立索引，例：索引前缀-2020.01.01',
  LOG_COLLECTION_FLUENTD_URL_TIPS: '输入接收日志的 Fluentd 的地址',

  'Refresh Interval': '刷新频率',
  'Recently Updated': '最近刷新',
  'Recently Configured Updated': '最近配置更新',
  Collecting: '收集中',
  'Change Status': '更改状态',
  'Release Collection': '释放收集',
  'Delete Log Receiver': '删除日志接收器',
  'Log Receiver': '日志接收器',
  Activate: '激活',
  'Real-Time Data': '实时数据',
  'Index Prefix': '索引前缀',

  'Resource Name & Type': '资源名称与类型',

  TOOLBOX_SHIFT_TIPS: ' 👻 Shift + 鼠标左键 可以在新窗口中打开',
  'Hide help information': '不再显示帮助信息',
  ES_DESC: 'Elasticsearch 是分布式、RESTful 风格的搜索和分析引擎',
  KAFKA_DESC: 'Kafka 是流行的开源流处理平台',
  FLUENTD_DESC: 'Fluentd 是提供统一日志处理层的开源数据收集器',
  LOG_COLLECTION_ENABLE_TIPS: '新的状态需 1 分钟左右生效',
  'Passwords must be at least 6 characters long': '密码至少 6 个字节',
  CONTAINER_REAL_TIME_LOGS_UNSUPPORTED_TIPS:
    '容器在当前状态下不支持实时日志，请稍后再试',
  TOTAL_LOGS_TODAY:
    '今日总共收录了 <span class={className}>{containers}</span> 个容器<br/> <span class={className}> {logs} </span> 条日志信息',
  START_REAL_TIME_LOG: '开始实时日志',
  STOP_REAL_TIME_LOG: '关闭实时日志',
  LOG_EXPORT: '日志导出',
  CUSTOM_MONITORING_DASHBOARD: '自定义监控面板',
  CREATE_CUSTOM_MONITORING_DASHBOARD: '创建自定义监控面板',
  SELECT_SUITABLE_MONITORING_TEMPLATE: '选择适合您应用应用模板',
  CUSTON_MONITORING_TEMPLATE_DESC: '监控面板将根据应用类型生成默认的面板配置',
  SERVICE_BUILT_INTERFACE: '服务已内置监控数据抓取接口',
  TOTAL_EVENTS_TODAY:
    '今日总共收录了 <span class={className}> {events} </span> 条事件',
  NO_EVENTS_TODAY: '今日没有收录的事件',

  'No cluster with event query enabled': '暂无启用事件查询的集群',
  'No cluster with auditing module enabled': '暂无启用审计模块的集群',
  'No cluster with logging module enabled': '暂无启用日志模块的集群',

  LOGGING_LOG_COLLECTOR: '日志接收器',
  EVENTS_LOG_COLLECTOR: '事件日志接收器',
  AUDITING_LOG_COLLECTOR: '审计日志接收器',
}
