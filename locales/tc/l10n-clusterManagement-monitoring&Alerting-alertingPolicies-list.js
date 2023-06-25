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
  ALERTING_POLICY_PL: 'Rule Groups',
  ALERTING_POLICY_DESC:
    'A rule group contains alert rules used to monitor cluster resources.',
  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'How are alerts generated?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    'You need to create a rule group and set alert rules. The system will generate alerts when resource metrics meet conditions configured in rule groups.',
  // List
  CUSTOM_POLICIES: 'Custom Rule Groups',
  BUILT_IN_POLICIES: 'Built-in Rule Groups',
  ALERTING_POLICY_EMPTY_DESC: 'Please create a rule group.',
  ALERT_RULE_INACTIVE: '未觸發',
  ALERT_RULE_PENDING: '待觸發',
  ALERT_RULE_FIRING: '觸發中',
  ALERT_RULE_DISABLED: '已禁用',
  POLICY_STATUS: 'Rule Group Status',
  RULE_STATUS: 'Rule Status',
  TIME_SPENT: 'Time Spent',
  RECENT_DETECT_TIME: 'Last Check',
  EDIT_ALERT_RULES: 'Edit Alert Rules',
  RESET: 'Reset',
  // List > Create > Basic Information
  SEVERITY: '告警級別',
  CREATE_ALERTING_POLICY: 'Create Rule Group',
  CRITICAL_ALERT: '危險告警',
  ERROR_ALERT: '重要告警',
  WARNING_ALERT: '一般告警',
  INVALID_TIME_DESC: 'Invalid value. Please enter 0 or a positive integer.',
  ALIAS: '別名',
  DURATION_MIN: 'Duration (minutes)',
  ALERT_DURATION:
    'Set the system to wait for a certain duration and check whether the alert situation persists before firing an alert.',
  LONG_NAME_DESC:
    '最長 253 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母或數字開頭及結尾',
  NAME_EXIST_DESC: '名稱已存在',
  ALIAS_NAME_DESC: 'The alias name can contain only letters, numbers, and hyphens (-), and cannot start or end with a hyphen. The maximum length is 63 characters.',
  CHECK_INTERVAL: 'Check Interval',
  ALERTING_POLICY_CHECK_INTERVAL_DESC: 'Set the interval between metric checks. The default value is 1 minute.',
  // List > Create > Rule Settings > Rule List
  ADD_ALERTING_RULE: 'Add Alert Rule',
  ADD_ALERTING_RULE_DESC: 'Add an alert rule to the rule group.',
  ENABLE_RULE: 'Enable rule',
  DISABLE_RULE: 'Disable rule',
  // List > Create > Rule Settings > Rule Template
  RULE_NAME: 'Rule Name',
  CUSTOM_RULE_NAME_DESC: 'The rule name can contain any characters. The maximum length is 63 characters.',
  LASTING_MINUTES: 'For {minutes, plural, =1 {1 minute} other {# minutes}}',
  THRESHOLD_REQUIRED: 'Please enter a metric threshold.',
  MESSAGE_SUMMARY_DESC: 'The message summary can contain any characters. The maximum length is 63 characters.',
  MESSAGE_DETAILS_DESC: 'The message details can contain any characters. The maximum length is 256 characters.',
  RULE_TEMPLATE: '規則模板',
  RULE_SETTINGS: '規則設置',
  MONITORING_TARGETS: '監控目標',
  SET_ACTIVATION_CONDITION_DESC: 'Please set a trigger condition.',
  THRESHOLD: '閾值',
  UNAVAILABLE_POD_RATIO: 'Unavailable pod ratio (%)',
  POD_QUOTA_UTILIZATION_SCAP: 'Pod quota usage (%)',
  CPU_USAGE_SCAP: 'CPU 用量',
  CPU_UTILIZATION_SCAP: 'CPU usage (%)',
  CPU_LOAD_1: '1-minute CPU load average',
  CPU_LOAD_5: '5-minute CPU load average',
  CPU_LOAD_15: '15-minute CPU load average',
  MEMORY_AVAILABLE: '可用記憶體',
  MEMORY_UTILIZATION_SCAP: 'Memory usage (%)',
  DISK_SPACE_AVAILABLE: '本地磁碟可用空間',
  DISK_SPACE_UTILIZATION: 'Local disk usage (%)',
  INODE_UTILIZATION: 'Inode usage (%)',
  DISK_READ_IOPS: '本地磁碟讀取 IOPS',
  DISK_WRITE_IOPS: '本地磁碟寫入 IOPS',
  DISK_READ_THROUGHPUT: '本地磁碟讀取吞吐量',
  DISK_WRITE_THROUGHPUT: '本地磁碟寫入吞吐量',
  DATA_RECEIVE_RATE: '網路接收數據速率',
  DATA_SEND_RATE: '網路發送數據速率',
  MEMORY_USAGE_SCAP: '記憶體用量',
  MEMORY_USAGE_WO_CACHE_SCAP: 'Memory usage without cache',
  UNAVAILABLE_WORKLOAD_REPLICA_RATIO: 'Unavailable replica ratio (%)',
  SELECT_NODE_TIP: '請選擇至少一個集群節點。',
  // List > Create > Rule Settings > Custom Rule
  CUSTOM_RULE: '自定義規則',
  RULE_EXPRESSION: '告警規則表達式',
  ENTER_RULE_EXPRESSION: '請輸入告警規則表達式。',
  ALERT_RULE_EXPRESSION_DESC: '您可以通過 PromQL 語句來自定義告警規則。',
  ALERT_FUNCTIONS: 'Functions',
  ALERT_METRICS: 'Metrics',
  ALERT_LABELS: '標籤',
  ALERT_RATE_RANGES: 'Rate Ranges',
  // List > Create > Message Settings
  ALERTING_MESSAGE: 'Alert',
  MESSAGE_SETTINGS: '訊息設置',
  NOTIFICATION_SUMMARY: '概括',
  NOTIFICATION_DETAILS: '詳情',
  // List > Edit
  EDIT_ALERTING_POLICY: 'Edit Rule Group',
  // List > Disable
  DISABLE_ALERTING_POLICY: 'Disable Rule Group',
  // List > Delete
  ALERTING_POLICY: 'Rule Group',
  ALERTING_POLICY_LOW: 'rule group',
  // List > reset
  RESET_ALERTING_POLICY: 'Reset Rule Group',
  RESET_ALERTING_POLICY_DESC: 'Are you sure you want to reset the rule group?'
};