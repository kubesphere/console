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
  ALERTING_POLICY_PL: '规则组',
  ALERTING_POLICY_DESC: '规则组包含告警规则，用于监测集群资源。',
  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: '告警是如何产生的？',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A: '您需要创建一个规则组并设置告警规则。当资源指标满足规则组中配置的条件时，系统将生成告警。',
  // List
  CUSTOM_POLICIES: '自定义规则组',
  BUILT_IN_POLICIES: '内置规则组',
  ALERTING_POLICY_EMPTY_DESC: '请创建一个规则组。',
  ALERT_RULE_INACTIVE: '未触发',
  ALERT_RULE_PENDING: '验证中',
  ALERT_RULE_FIRING: '已触发',
  ALERT_RULE_DISABLED: '已禁用',
  POLICY_STATUS: '规则组状态',
  RULE_STATUS: '规则状态',
  TIME_SPENT: '耗时',
  RECENT_DETECT_TIME: '最近检查',
  EDIT_ALERT_RULES: '编辑告警规则',
  RESET: '重置',
  // List > Create > Basic Information
  SEVERITY: '告警级别',
  CREATE_ALERTING_POLICY: '创建规则组',
  CRITICAL_ALERT: '危险告警',
  ERROR_ALERT: '重要告警',
  WARNING_ALERT: '一般告警',
  INVALID_TIME_DESC: '参数值无效，请输入 0 或正整数。',
  ALIAS: '别名',
  DURATION_MIN: '持续时间（分钟）',
  ALERT_DURATION: '设置系统等待一段时间并检查告警情况是否持续存在，如果告警情况持续存在才触发告警。',
  LONG_NAME_DESC: '名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。',
  NAME_EXIST_DESC: '名称已存在，请输入其他名称。',
  ALIAS_NAME_DESC: '别名只能包含中文、字母、数字和连字符（-），不得以连字符（-）开头或结尾，最长 63 个字符。',
  CHECK_INTERVAL: '检查间隔',
  ALERTING_POLICY_CHECK_INTERVAL_DESC: '设置指标检查间隔。默认值为1分钟。',
  // List > Create > Rule Settings > Rule List
  ADD_ALERTING_RULE: '添加告警规则',
  ADD_ALERTING_RULE_DESC: '将告警规则添加到规则组。',
  // List > Create > Rule Settings > Rule Template
  RULE_NAME: '规则名称',
  CUSTOM_RULE_NAME_DESC: '规则名称可包含任意字符，最长 63 个字符。',
  LASTING_MINUTES: 'For {minutes, plural, =1 {1 minute} other {# minutes}}',
  THRESHOLD_REQUIRED: '请输入指标阈值。',
  MESSAGE_SUMMARY_DESC: '消息摘要可包含任意字符，最长 63 个字符。',
  MESSAGE_DETAILS_DESC: '消息详情可包含任意字符，最长 256 个字符。',
  RULE_TEMPLATE: '规则模板',
  RULE_SETTINGS: '规则设置',
  MONITORING_TARGETS: '监控目标',
  SET_ACTIVATION_CONDITION_DESC: '请设置触发条件。',
  THRESHOLD: '阈值',
  UNAVAILABLE_POD_RATIO: '容器组不可用率（%）',
  POD_QUOTA_UTILIZATION_SCAP: '容器组配额用量（%）',
  CPU_USAGE_SCAP: 'CPU 用量',
  CPU_UTILIZATION_SCAP: 'CPU 用量（%）',
  CPU_LOAD_1: '1 分钟 CPU 平均负载',
  CPU_LOAD_5: '5 分钟 CPU 平均负载',
  CPU_LOAD_15: '15 分钟 CPU 平均负载',
  MEMORY_AVAILABLE: '可用内存',
  MEMORY_UTILIZATION_SCAP: '内存用量（%）',
  DISK_SPACE_AVAILABLE: '本地磁盘可用空间',
  DISK_SPACE_UTILIZATION: '本地磁盘用量（%）',
  INODE_UTILIZATION: 'Inode 用量（%）',
  DISK_READ_IOPS: '本地磁盘读取 IOPS',
  DISK_WRITE_IOPS: '本地磁盘写入 IOPS',
  DISK_READ_THROUGHPUT: '本地磁盘读取吞吐量',
  DISK_WRITE_THROUGHPUT: '本地磁盘写入吞吐量',
  DATA_RECEIVE_RATE: '网络数据接收速率',
  DATA_SEND_RATE: '网络数据发送速率',
  MEMORY_USAGE_SCAP: '内存用量',
  MEMORY_USAGE_WO_CACHE_SCAP: '内存用量不含缓存',
  UNAVAILABLE_WORKLOAD_REPLICA_RATIO: '副本不可用率（%）',
  SELECT_NODE_TIP: '请选择至少一个集群节点。',
  // List > Create > Rule Settings > Custom Rule
  CUSTOM_RULE: '自定义规则',
  RULE_EXPRESSION: '告警规则表达式',
  ENTER_RULE_EXPRESSION: '请输入告警规则表达式。',
  ALERT_RULE_EXPRESSION_DESC: '您可以通过 PromQL 语句来自定义告警规则。<a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">了解更多</a>',
  ALERT_FUNCTIONS: '函数',
  ALERT_METRICS: '指标',
  ALERT_LABELS: '标签',
  ALERT_RATE_RANGES: '比率范围',
  // List > Create > Message Settings
  ALERTING_MESSAGE: '告警',
  MESSAGE_SETTINGS: '消息设置',
  NOTIFICATION_SUMMARY: '概要',
  NOTIFICATION_DETAILS: '详情',
  // List > Edit
  EDIT_ALERTING_POLICY: '编辑规则组',
  // List > Disable
  DISABLE_ALERTING_POLICY: '禁用规则组',
  // List > Delete
  ALERTING_POLICY: '规则组',
  ALERTING_POLICY_LOW: '规则组'
};