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
  DURATION: '기간',
  // Alert Rules
  VIEW_METRIC_DATA: 'View metric data',
  ALERTING_RULE: '알림 규칙',
  MONITORING_TARGETS_SCAP: '모니터링 대상',
  TRIGGER_CONDITION_SCAP: '트리거 조건',
  METRIC_MONITORING: '메트릭 모니터링',
  ALERT_MONITORING: '알림 모니터링',
  NOTIFICATION_SUMMARY_COLON: '개요: ',
  DETAILS_COLON: '세부 정보: ',
  NODES_VALUES: 'Nodes: {values}',
  TRIGGER_CONDITION: 'Trigger Condition',
  MESSAGE_SUMMARY: '개요',
  MESSAGE_DETAILS: '세부 정보',
  VIEW_METRIC_DATA_TCAP: 'View Metric Data',
  ALERT_RULE_TEXT_PERCENT_SECOND: '{alterTypeText} {comparator} {thresholds}% for {durationValue, plural, =1 {1 second} other {# seconds}}',
  ALERT_RULE_TEXT_PERCENT_MINUTE: '{alterTypeText} {comparator} {thresholds}% for {durationValue, plural, =1 {1 minute} other {# minutes}}',
  ALERT_RULE_TEXT_PERCENT_HOUR: '{alterTypeText} {comparator} {thresholds}% for {durationValue, plural, =1 {1 hour} other {# hours}}',
  ALERT_RULE_TEXT_SECOND: '{alterTypeText} {comparator} {thresholds} {unit} for {durationValue, plural, =1 {1 second} other {# seconds}}',
  ALERT_RULE_TEXT_MINUTE: '{alterTypeText} {comparator} {thresholds} {unit} for {durationValue, plural, =1 {1 minute} other {# minutes}}',
  ALERT_RULE_TEXT_HOUR: '{alterTypeText} {comparator} {thresholds} {unit} for {durationValue, plural, =1 {1 hour} other {# hours}}',
  // Alert Rules > View Metric Data
  CPU_UTILIZATION_NO_PERCENT_TCAP: 'CPU 사용량',
  CPU_LOAD_1_TCAP: '1-Minute CPU Load Average',
  CPU_LOAD_5_TCAP: '5-Minute CPU Load Average',
  CPU_LOAD_15_TCAP: '15-Minute CPU Load Average',
  MEMORY_UTILIZATION_NO_PERCENT_TCAP: '메모리 사용량',
  MEMORY_AVAILABLE_TCAP: 'Available Memory',
  DATA_SEND_RATE_TCAP: 'Network Data Sending Rate',
  DATA_RECEIVE_RATE_TCAP: 'Network Data Receiving Rate',
  DISK_SPACE_UTILIZATION_NO_PERCENT_TCAP: 'Local Disk Usage',
  DISK_SPACE_AVAILABLE_TCAP: 'Available Local Disk Space',
  INODE_UTILIZATION_NO_PERCENT_TCAP: 'Inode 사용량',
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
  NO_DATA_DESC: '데이터를 찾을 수 없습니다'
};