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
  // Banner
  ALERTING_POLICY_PL: '告警策略',
  ALERT_POLICY_DESC: '告警策略是用于监控集群资源的一系列条件，您可以创建告警策略对资源进行监控。',
  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: '如何触发告警消息？',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A: '您需要对资源设置告警策略，当资源的某项指标达到告警策略的阈值后即会触发告警消息。',
  // List
  ALERTING_STATUS: '告警状态',
  ALERTING_POLICY_EMPTY_DESC: '请创建一个告警规则。',
  ALERT_RULE_INACTIVE: '未触发',
  ALERT_RULE_PENDING: '待触发',
  ALERT_RULE_FIRING: '触发中',
  ALERT_RULE_HEALTH_OK: '健康',
  ALERT_RULE_HEALTH_ERR: '错误',
  ALERT_RULE_HEALTH_UNKNOWN: '未知',
  // List > Create > Basic Information
  SEVERITY: '告警级别',
  CREATE_ALERTING_POLICY: '创建告警策略',
  CRITICAL_ALERT: '危险告警',
  ERROR_ALERT: '重要告警',
  WARNING_ALERT: '一般告警',
  INVALID_TIME_DESC: '数值无效。请从下拉列表中选择一个数值，或者输入 0 或正整数。',
  ALIAS: '别名',
  THRESHOLD_DURATION_MIN: '阈值时间（分钟）',
  ALERT_DURATION: '告警规则中设置的情形持续时间达到该阈值后，告警策略将变为触发中状态。',
  LONG_NAME_DESC: '名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。',
  // List > Create > Rule Settings > Rule Template
  RULE_SETTINGS: '规则设置',
  MONITORING_TARGETS: '监控目标',
  CPU_USAGE_SCAP: 'CPU 用量',
  DISK_READ_IOPS: '本地磁盘读取 IOPS',
  DISK_READ_THROUGHPUT: '本地磁盘读取吞吐量',
  DISK_SPACE_AVAILABLE: '本地磁盘可用空间',
  DISK_WRITE_IOPS: '本地磁盘写入 IOPS',
  DISK_WRITE_THROUGHPUT: '本地磁盘写入吞吐量',
  DISK_SPACE_USAGE: '本地磁盘空间利用率',
  MEMORY_AVAILABLE: '可用内存',
  MEMORY_USAGE_CACHE: '内存用量（包含缓存）',
  MEMORY_USAGE_SCAP: '内存用量',
  DATA_RECEIVE_RATE: '网络接收数据速率',
  DATA_SEND_RATE: '网络发送数据速率',
  SET_RULE_DESC: '请设置告警规则。',
  ABNORMAL_PODS: '容器组异常率',
  POD_USAGE_SCAP: '容器组利用率',
  THRESHOLD: '阈值',
  UNAVAILABLE_REPLICAS: '副本不可用率',
  RULE_TEMPLATE: '规则模板',
  CPU_LOAD_1: '过去 1 分钟的 CPU 平均负载',
  CPU_LOAD_5: '过去 5 分钟的 CPU 平均负载',
  CPU_LOAD_15: '过去 15 分钟的 CPU 平均负载',
  SELECT_NODE_TIP: '请选择至少一个集群节点。',
  // List > Create > Rule Settings > Custom Rule
  CUSTOM_RULE: '自定义规则',
  RULE_EXPRESSION: '告警规则表达式',
  ENTER_RULE_EXPRESSION: '请输入告警规则表达式。',
  ALERT_RULE_EXPRESSION_DESC: '您可以通过 PromQL 语句来自定义告警规则。<a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">了解更多</a>',
  // List > Create > Message Settings
  MESSAGE_SETTINGS: '消息设置',
  NOTIFICATION_SUMMARY: '概括',
  NOTIFICATION_DETAILS: '详情',
  // List > Edit
  EDIT_ALERTING_POLICY: '编辑告警策略',
  // List > Delete
  ALERTING_POLICY: '告警策略',
  ALERTING_POLICY_LOW: '告警策略'
};