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
  DURATION: 'Duration',
  // Alert Rules
  VIEW_METRIC_DATA: 'View metric data',
  ALERTING_RULE: 'Alert Rules',
  MONITORING_TARGETS_SCAP: '監控目標',
  TRIGGER_CONDITION_SCAP: 'Trigger condition',
  METRIC_MONITORING: '指標監控',
  ALERT_MONITORING: 'Alert Monitoring',
  NOTIFICATION_SUMMARY_COLON: 'Summary: ',
  DETAILS_COLON: 'Details: ',
  NODES_VALUES: 'Nodes: {values}',
  TRIGGER_CONDITION: 'Trigger Condition',
  ALERT_RULE_TEXT_PERCENT_MINUTE: '{alterTypeText} {comparator} {thresholds}% for {durationValue, plural, =1 {1 minute} other {# minutes}}',
  MESSAGE_SUMMARY: '概括',
  MESSAGE_DETAILS: '詳情',
  VIEW_METRIC_DATA_TCAP: 'View Metric Data',
  ALERT_RULE_TEXT_PERCENT_SECOND: '{alterTypeText} {comparator} {thresholds}% for {durationValue, plural, =1 {1 second} other {# seconds}}',
  ALERT_RULE_TEXT_PERCENT_MINUTE: '{alterTypeText} {comparator} {thresholds}% for {durationValue, plural, =1 {1 minute} other {# minutes}}',
  ALERT_RULE_TEXT_PERCENT_HOUR: '{alterTypeText} {comparator} {thresholds}% for {durationValue, plural, =1 {1 hour} other {# hours}}',
  ALERT_RULE_TEXT_SECOND: '{alterTypeText} {comparator} {thresholds} {unit} for {durationValue, plural, =1 {1 second} other {# seconds}}',
  ALERT_RULE_TEXT_MINUTE: '{alterTypeText} {comparator} {thresholds} {unit} for {durationValue, plural, =1 {1 minute} other {# minutes}}',
  ALERT_RULE_TEXT_HOUR: '{alterTypeText} {comparator} {thresholds} {unit} for {durationValue, plural, =1 {1 hour} other {# hours}}',
  // Alert Rules > View Metric Data
  CPU_UTILIZATION_NO_PERCENT_TCAP: 'CPU 使用量',
  CPU_LOAD_1_TCAP: '1-Minute CPU Load Average',
  CPU_LOAD_5_TCAP: '5-Minute CPU Load Average',
  CPU_LOAD_15_TCAP: '15-Minute CPU Load Average',
  MEMORY_UTILIZATION_NO_PERCENT_TCAP: '記憶體使用量',
  MEMORY_AVAILABLE_TCAP: 'Available Memory',
  DATA_SEND_RATE_TCAP: 'Network Data Sending Rate',
  DATA_RECEIVE_RATE_TCAP: 'Network Data Receiving Rate',
  DISK_SPACE_UTILIZATION_NO_PERCENT_TCAP: 'Local Disk Usage',
  DISK_SPACE_AVAILABLE_TCAP: 'Available Local Disk Space',
  INODE_UTILIZATION_NO_PERCENT_TCAP: 'Inode 用量',
  DISK_READ_IOPS_TCAP: 'Local Disk Read IOPS',
  DISK_WRITE_IOPS_TCAP: 'Local Disk Write IOPS',
  DISK_READ_THROUGHPUT_TCAP: 'Local Disk Read Throughput',
  DISK_WRITE_THROUGHPUT_TCAP: 'Local Disk Write Throughput',
  UNAVAILABLE_POD_RATIO_NO_PERCENT_TCAP: 'Unavailable Pod Ratio',
  POD_QUOTA_UTILIZATION_NO_PERCENT_TCAP: 'Pod Quota Usage',
  MEMORY_USAGE_WO_CACHE_TCAP: 'Memory Usage Without Cache',
  UNAVAILABLE_WORKLOAD_REPLICA_RATIO_NO_PERCENT_TCAP: 'Unavailable Replica Ratio',
  THRESHOLD_VALUE: 'Threshold: {value}',
  // Alerting History
  NO_DATA_DESC: '未發現資料'
};