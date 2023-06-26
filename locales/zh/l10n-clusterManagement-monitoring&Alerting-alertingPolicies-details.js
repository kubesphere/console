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
  // Attributes
  DURATION: '持续时间',
  // Alert Rules
  VIEW_METRIC_DATA: '查看指标数据',
  ALERTING_RULE: '告警规则',
  MONITORING_TARGETS_SCAP: '监控目标',
  TRIGGER_CONDITION_SCAP: '触发条件',
  METRIC_MONITORING: '指标监控',
  ALERT_MONITORING: '告警监控',
  NOTIFICATION_SUMMARY_COLON: '消息概要：',
  DETAILS_COLON: '详情：',
  NODES_VALUES: '节点：{values}',
  TRIGGER_CONDITION: '触发条件',
  ALERT_RULE_TEXT_PERCENT_MINUTE: '{alterTypeText} {comparator} {thresholds}% 持续 {durationValue, plural, =1 {1 分钟} other {# 分钟}}',
  MESSAGE_SUMMARY: '概要',
  MESSAGE_DETAILS: '详情',
  VIEW_METRIC_DATA_TCAP: '查看指标数据',
  ALERT_RULE_TEXT_PERCENT_SECOND: '{alterTypeText} {comparator} {thresholds}% 持续 {durationValue, plural, =1 {1 秒} other {# 秒}}',
  ALERT_RULE_TEXT_PERCENT_MINUTE: '{alterTypeText} {comparator} {thresholds}% 持续 {durationValue, plural, =1 {1 分钟} other {# 分钟}}',
  ALERT_RULE_TEXT_PERCENT_HOUR: '{alterTypeText} {comparator} {thresholds}% 持续 {durationValue, plural, =1 {1 小时} other {# 小时}}',
  ALERT_RULE_TEXT_SECOND: '{alterTypeText} {comparator} {thresholds} {unit} 持续 {durationValue, plural, =1 {1 秒} other {# 秒}}',
  ALERT_RULE_TEXT_MINUTE: '{alterTypeText} {comparator} {thresholds} {unit} 持续 {durationValue, plural, =1 {1 分钟} other {# 分钟}}',
  ALERT_RULE_TEXT_HOUR: '{alterTypeText} {comparator} {thresholds} {unit} 持续 {durationValue, plural, =1 {1 小时} other {# 小时}}',
  // Alert Rules > View Metric Data
  CPU_UTILIZATION_NO_PERCENT_TCAP: 'CPU 用量',
  CPU_LOAD_1_TCAP: 'CPU 平均负载（1 分钟）',
  CPU_LOAD_5_TCAP: 'CPU 平均负载（5 分钟）',
  CPU_LOAD_15_TCAP: 'CPU 平均负载（15 分钟）',
  MEMORY_UTILIZATION_NO_PERCENT_TCAP: '内存用量',
  MEMORY_AVAILABLE_TCAP: '可用内存',
  DATA_SEND_RATE_TCAP: '网络数据发送速率',
  DATA_RECEIVE_RATE_TCAP: '网络数据接收速率',
  DISK_SPACE_UTILIZATION_NO_PERCENT_TCAP: '本地磁盘用量',
  DISK_SPACE_AVAILABLE_TCAP: '本地磁盘可用空间',
  INODE_UTILIZATION_NO_PERCENT_TCAP: 'Inode 用量',
  DISK_READ_IOPS_TCAP: '本地磁盘读取 IOPS',
  DISK_WRITE_IOPS_TCAP: '本地磁盘写入 IOPS',
  DISK_READ_THROUGHPUT_TCAP: '本地磁盘读取吞吐量',
  DISK_WRITE_THROUGHPUT_TCAP: '本地磁盘写入吞吐量',
  UNAVAILABLE_POD_RATIO_NO_PERCENT_TCAP: '容器组不可用率',
  POD_QUOTA_UTILIZATION_NO_PERCENT_TCAP: '容器组配额用量',
  MEMORY_USAGE_WO_CACHE_TCAP: '内存用量不含缓存',
  UNAVAILABLE_WORKLOAD_REPLICA_RATIO_NO_PERCENT_TCAP: '副本不可用率',
  THRESHOLD_VALUE: '阈值：{value}',
  // Alerting History
  NO_DATA_DESC: '未发现数据'
};