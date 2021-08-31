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
  NOTIFICATION_MESSAGE: '消息',
  SUMMARY: '标题',
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
  'Alerting Policies': '告警策略',
  ALERTING_HISTORY: '告警历史',
  'alerting rule': '告警规则',
  ALERTING_RULE: '告警规则',
  ALERTING_RULES: '告警规则',
  ALERTING_STATUS: '告警状态',
  ALERTING_TYPE: '告警级别',
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
  'View Details': '查看详情',
  ACTIVATED_AT: '告警激活时间',
  SET_RULE_DESC: '请设置告警规则。',
  'Please input the threshold': '请输入阈值',
  CRITICAL_ALERT: '危险告警',
  ERROR_ALERT: '重要告警',
  WARNING_ALERT: '一般告警',

  Condition: '条件',
  THRESHOLD: '阈值',

  RULE_TEMPLATES: '规则模板',
  CUSTOM_RULES: '自定义规则',
  RULE_EXPRESSION: '告警规则表达式',
  INVALID_TIME_DESC:
    '数值无效。请从下拉列表中选择一个数值，或者输入 0 或正整数。',
  ALIAS: '别名',
  ALERT_DURATION_MIN: '告警持续时间（分钟）',

  ENTER_RULE_EXPRESSION: '请输入告警规则表达式。',
  ALERT_FUNCTIONS: '函数',
  ALERT_METRICS: '指标',
  ALERT_LABELS: '标签',
  ALERT_RATE_RANGES: 'Rate Ranges',

  NOTIFICATION_CONTENT: '通知内容',

  CUSTOM_POLICIES: '自定义策略',
  BUILT_IN_POLICIES: '内置策略',

  ALERT_TYPE: '{type}告警',
  ALERT_POLICY_DESC:
    '使用告警策略监控资源指标，资源指标达到告警条件阈值后将触发告警消息。',
  ALERT_MESSAGE_DESC:
    '用户可以查看集群级别的告警策略中，所有满足告警规则的告警消息。',

  ALERTING_POLICY_CREATE_DESC: '您可以创建告警规则，即时发现资源的异常情况。',

  CPU_LOAD_1: '过去 1 分钟的 CPU 平均负载',
  CPU_LOAD_5: '过去 5 分钟的 CPU 平均负载',
  CPU_LOAD_15: '过去 15 分钟的 CPU 平均负载',

  POD_ANOMALY: '容器组异常率',
  POD_USAGE_SCAP: '容器组利用率',
  CPU_USAGE_SCAP: 'CPU 利用率',
  MEMORY_AVAILABLE: '可用内存',
  MEMORY_USAGE_SCAP: '内存利用率',
  DISK_SPACE_AVAILABLE: '本地磁盘可用空间',
  DISK_SPACE_USAGE: '本地磁盘空间利用率',
  INODE_USAGE: 'inode 利用率',
  DISK_READ_IOPS: '本地磁盘读取 IOPS',
  DISK_WRITE_IOPS: '本地磁盘写入 IOPS',
  DISK_READ_THROUGHPUT: '本地磁盘读取吞吐量',
  DISK_WRITE_THROUGHPUT: '本地磁盘写入吞吐量',
  DATA_SEND_RATE: '网络发送数据速率',
  DATA_RECEIVE_RATE: '网络接收数据速率',
  'cpu usage': 'CPU用量',
  'memory utilisation (including cache)': '内存使用率(包含缓存)',
  'memory usage (including cache)': '内存用量(包含缓存)',
  'memory usage': '内存用量',
  'Unavailable replicas ratio': '副本不可用率',
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
    '平台管理员需要选择告警通知的方式并配置对应的服务器。',
  HOW_TO_SUPRESS_AN_ALARM_Q: '如何对告警消息进行抑制？',
  HOW_TO_SUPRESS_AN_ALARM_A:
    '您可以对每条告警策略进行多级别的设置，每个级别对应不同的告警周期及重复周期。',

  ALERT_DURATION: '告警持续时间达到预设值后将触发告警。',
  ALERT_RULE_INACTIVE: '未触发',
  ALERT_RULE_PENDING: '待触发',
  ALERT_RULE_FIRING: '触发中',
  ALERT_RULE_HEALTH_OK: '健康',
  ALERT_RULE_HEALTH_ERR: '错误',
  ALERT_RULE_HEALTH_UNKNOWN: '未知',

  ALERT_RULE_EXPRESSION_DESC:
    '告警规则可以通过 PromQL 语句来自定义，PromQL 相关语法请参见 <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">Prometheus Querying</a>。',

  // Alerting Messages
  ALERTING_MESSAGES: '告警消息',
  NO_DATA_DESC: '没有找到数据',

  // Alerting Policies
  ALERTING_POLICIES: '告警策略',
  NOTIFICATION_SETTINGS: '通知设置',
  DEPLOYMENT: '部署',
  STATEFULSET: '有状态副本集',
  DAEMONSET: '守护进程集',
}
