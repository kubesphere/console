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
  Alerting: '告警',
  Notification: '通知',
  NOTIFICATION_MESSAGE: '通知消息',
  NOTIFICATION_SUMMARY: '概括',
  EDIT_TCAP: '编辑',
  EDIT_ALERTING_POLICY: '编辑告警策略',
  DELETE_TCAP: '删除',
  CREATE_ALERTING_POLICY: '创建告警策略',
  'Alerting Detail': '告警详情',
  ALERTING_MESSAGE: '告警消息',
  'Alerting Messages': '告警消息',
  ALERT_MONITORING: '告警监控',
  'alerting policy': '告警策略',
  ALERTING_POLICY: '告警策略',
  ALERTING_POLICY_PL: '告警策略',
  ALERTING_POLICY_LOW: '告警策略',
  'Alerting Policies': '告警策略',
  ALERTING_HISTORY: '告警历史',
  'alerting rule': '告警规则',
  ALERTING_RULE: '告警规则',
  RULE_SETTINGS: '规则设置',
  ALERTING_STATUS: '告警状态',
  ALERTING_SEVERITY: '告警级别',
  ALERTING_TYPE: '告警类型',
  ALERTING_NAME: '告警名称',
  SEVERITY: '告警级别',
  'Alerting Duration': '告警持续时间',
  'Notification Settings': '通知设置',
  'monitoring target': '监控目标',
  MONITORING_TARGETS: '监控目标',
  'Monitoring Rules': '监控规则',
  ALERTING_RESOURCE: '告警资源',

  Rule: '规则',
  RULE: '规则',
  'Add Rule': '添加规则',
  'Edit Rule': '编辑规则',
  'Rule Name': '规则名称',
  VIEW_DETAILS: '查看详情',
  ACTIVATION_TIME: '触发时间',
  SET_RULE_DESC: '请设置告警规则。',
  'Please input the threshold': '请输入阈值',
  CRITICAL_ALERT: '危险告警',
  ERROR_ALERT: '重要告警',
  WARNING_ALERT: '一般告警',

  Condition: '条件',
  THRESHOLD: '阈值',

  RULE_TEMPLATE: '规则模板',
  CUSTOM_RULE: '自定义规则',
  RULE_EXPRESSION: '告警规则表达式',
  INVALID_TIME_DESC:
    '数值无效。请从下拉列表中选择一个数值，或者输入 0 或正整数。',
  ALIAS: '别名',
  THRESHOLD_DURATION_MIN: '阈值时间（分钟）',

  ENTER_RULE_EXPRESSION: '请输入告警规则表达式。',
  ALERT_FUNCTIONS: '函数',
  ALERT_METRICS: '指标',
  ALERT_LABELS: '标签',
  ALERT_RATE_RANGES: 'Rate Ranges',

  NOTIFICATION_DETAILS: '详情',

  CUSTOM_POLICIES: '自定义策略',
  BUILT_IN_POLICIES: '内置策略',

  ALERT_TYPE: '{type}告警',
  ALERT_POLICY_DESC:
    '告警策略是用于监控集群资源的一系列条件，您可以创建告警策略对资源进行监控。',
  ALERT_MESSAGE_DESC: '告警消息显示满足告警规则后触发的告警详细信息。',
  ALERTING_MESSAGE_EMPTY_DESC: '没有在当前项目中找到告警消息。',
  ALERTING_POLICY_EMPTY_DESC: '请创建一个告警规则。',
  ALERTING_POLICY_CREATE_DESC: '您可以创建告警策略以即时发现资源的异常情况。',

  CPU_LOAD_1: '过去 1 分钟的 CPU 平均负载',
  CPU_LOAD_5: '过去 5 分钟的 CPU 平均负载',
  CPU_LOAD_15: '过去 15 分钟的 CPU 平均负载',

  ABNORMAL_PODS: '容器组异常率',
  POD_USAGE_SCAP: '容器组利用率',
  CPU_USAGE_SCAP: 'CPU 用量',
  MEMORY_AVAILABLE: '可用内存',
  MEMORY_USAGE_SCAP: '内存用量',
  DISK_SPACE_AVAILABLE: '本地磁盘可用空间',
  DISK_SPACE_USAGE: '本地磁盘空间利用率',
  DISK_READ_IOPS: '本地磁盘读取 IOPS',
  DISK_WRITE_IOPS: '本地磁盘写入 IOPS',
  DISK_READ_THROUGHPUT: '本地磁盘读取吞吐量',
  DISK_WRITE_THROUGHPUT: '本地磁盘写入吞吐量',
  DATA_SEND_RATE: '网络发送数据速率',
  DATA_RECEIVE_RATE: '网络接收数据速率',
  'cpu usage': 'CPU用量',
  'memory utilisation (including cache)': '内存使用率(包含缓存)',
  MEMORY_USAGE_CACHE: '内存用量（包含缓存）',
  'memory usage': '内存用量',
  UNAVAILABLE_REPLICAS: '副本不可用率',
  'Unavailable deployment replicas ratio': '部署副本不可用率',
  'Unavailable daemonset replicas ratio': '守护进程集副本不可用率',
  'Unavailable statefulset replicas ratio': '有状态副本集副本不可用率',

  SELECT_NODE_TIP: '请选择至少一个集群节点。',
  SELECT_WORKLOAD_TIP: '请选择至少一个工作负载。',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: '如何触发告警消息？',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    '您需要对资源设置告警策略，当资源的某项指标达到告警策略的阈值后即会触发告警消息。',
  REQUESTS_FOR_PUSH_AN_ALARM_Q: '如何在告警策略触发后接收告警消息？',
  REQUESTS_FOR_PUSH_AN_ALARM_A:
    '平台管理员需要选择告警通知的方式并配置与该方式对应的服务器。',
  HOW_TO_SUPRESS_AN_ALARM_Q: '如何对告警消息进行抑制？',
  HOW_TO_SUPRESS_AN_ALARM_A:
    '您可以对每条告警策略进行多级别的设置，每个级别对应不同的告警周期。',

  ALERT_DURATION:
    '告警规则中设置的情形持续时间达到该阈值后，告警策略将变为触发中状态。',
  ALERT_RULE_INACTIVE: '未触发',
  ALERT_RULE_PENDING: '待触发',
  ALERT_RULE_FIRING: '触发中',
  ALERT_RULE_HEALTH_OK: '健康',
  ALERT_RULE_HEALTH_ERR: '错误',
  ALERT_RULE_HEALTH_UNKNOWN: '未知',

  ALERT_RULE_EXPRESSION_DESC:
    '您可以通过 PromQL 语句来自定义告警规则。<a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">了解更多</a>',

  // Alerting Messages
  ALERTING_MESSAGE_PL: '告警消息',
  NO_DATA_DESC: '未发现数据',
  MONITORING_TARGET: '监控目标',

  // Alerting Policies
  ALERTING_POLICIES: '告警策略',
  MESSAGE_SETTINGS: '消息设置',
  DEPLOYMENT: '部署',
  DEPLOYMENT_PL: '部署',
  STATEFULSET: '有状态副本集',
  STATEFULSET_PL: '有状态副本集',
  DAEMONSET: '守护进程集',
  DAEMONSET_PL: '守护进程集',
  DEPLOYMENTS_VALUE: '部署：{value}',
  STATEFULSETS_VALUE: '有状态副本集数量：{value}',
  DAEMONSETS_VALUE: '守护进程集数量：{value}',

  // Alerting Policies > Details
  NOTIFICATION_SUMMARY_COLON: '概括：',
  DETAILS_COLON: '详情：',
  MONITORING_TARGETS_SCAP: '监控目标',
  ALERTING_RULE_SCAP: '告警规则',
  THRESHOLD_DURATION: '告警持续时间',
}
