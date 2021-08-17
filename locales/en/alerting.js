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
  'Add Rule': 'Add Rule',
  Alerting: 'Alerting',
  SUMMARY: 'Summary',
  NOTIFICATION_MESSAGE: 'Message',
  'Alerting Detail': 'Alerting Detail',
  ALERTING_HISTORY: 'Alerting History',
  ALERTING_MESSAGE: 'Alerting Message',
  'Alerting Messages': 'Alerting Messages',
  ALERT_MONITORING: 'Alert Monitoring',
  'Alerting Policies': 'Alerting Policies',
  'alerting policy': 'alerting policy',
  ALERTING_POLICY: 'Alerting Policy',
  CREATE_ALERTING_POLICY: 'Create Alerting Policy',
  'Alerting Resource': 'Alerting Resource',
  'alerting rule': 'alerting rule',
  ALERTING_RULE: 'Alerting Rule',
  ALERTING_RULES: 'Alerting Rules',
  ALERTING_STATUS: 'Status',
  'Alerting Duration': 'Duration',
  ALERTING_TYPE: 'Severity',
  Condition: 'Condition',
  'cpu usage': 'CPU usage',
  CPU_USAGE_SCAP: 'CPU usage',
  DISK_READ_IOPS: 'Local disk read IOPS',
  DISK_READ_THROUGHPUT: 'Local disk read throughput',
  DISK_SPACE_AVAILABLE: 'Available local disk space',
  DISK_WRITE_IOPS: 'Local disk write IOPS',
  DISK_WRITE_THROUGHPUT: 'Local disk write throughput',
  'Edit Rule': 'Edit Rule',
  INODE_USAGE: 'inode usage',
  DISK_SPACE_USAGE: 'Local disk space usage',
  MEMORY_AVAILABLE: 'Available memory',
  'memory usage': 'Memory usage',
  'memory usage (including cache)': 'Memory usage (including caches)',
  'memory utilisation (including cache)':
    'Memory utilization (including caches)',
  MEMORY_USAGE_SCAP: 'Memory usage',
  Message: 'Message',

  CRITICAL_ALERT: 'Critical',
  ERROR_ALERT: 'Error',
  WARNING_ALERT: 'Warning',

  'Monitoring Rules': 'Monitoring Rules',
  'monitoring target': 'monitoring target',
  MONITORING_TARGETS: 'Monitoring Targets',
  DATA_RECEIVE_RATE: 'Network data receiving rate',
  DATA_SEND_RATE: 'Network data sending rate',
  'Notification Channel': 'Notification Channel',
  'Notification List': 'Notification List',
  'Notification Settings': 'Notification Settings',
  SET_RULE_DESC: 'Please set an alerting rule.',
  'Please input the threshold': 'Please input the threshold',
  POD_ANOMALY: 'Pod anomalies',
  POD_USAGE_SCAP: 'Pod usage',
  ACTIVATED_AT: 'Activated At',
  'Recent Notification': 'Recent Notification',
  'Recovery Time': 'Recovery Time',
  Rule: 'Rule',
  'Rule Name': 'Rule Name',
  THRESHOLD: 'Threshold',
  'Unavailable replicas ratio': 'Unavailable replicas',
  'Unavailable daemonset replicas ratio':
    'Unavailable daemonset replicas ratio',
  'Unavailable deployment replicas ratio':
    'Unavailable deployment replicas ratio',
  'Unavailable statefulset replicas ratio':
    'Unavailable statefulset replicas ratio',
  'View Details': 'View Details',

  RULE_TEMPLATES: 'Rule Templates',
  CUSTOM_RULES: 'Custom Rules',
  RULE_EXPRESSION: 'Rule Expression',
  INVALID_TIME_DESC:
    'Invalid value. Please select a value from the drop-down list or enter 0 or a positive integer.',
  NAME: 'Name',
  ALIAS: 'Alias',
  ALERT_DURATION_MIN: 'Duration (Minutes)',

  ENTER_RULE_EXPRESSION: 'Please enter a rule expression.',
  ALERT_FUNCTIONS: 'Functions',
  ALERT_METRICS: 'Metrics',
  ALERT_LABELS: 'Labels',
  ALERT_RATE_RANGES: 'Rate Ranges',

  NOTIFICATION_CONTENT: 'Notification Content',

  CUSTOM_POLICIES: 'Custom Policies',
  BUILT_IN_POLICIES: 'Built-in Policies',

  CPU_LOAD_1: 'Average CPU load over the past 1 min',
  CPU_LOAD_5: 'Average CPU load over the past 5 min',
  CPU_LOAD_15: 'Average CPU load over the past 15 min',

  ALERT_TYPE: '{type} Alert',
  ALERT_POLICY_DESC:
    'Alerting policies are used to monitor resource metrics. Alerting messages will be triggered when the resource metrics reach the threshold of the alerting policies.',
  ALERT_MESSAGE_DESC:
    'Users can view all alerting messages that have met the conditions of alerting policies at the cluster level.',

  ALERTING_POLICY_CREATE_DESC:
    'You can notice if a resource is abnormal in real time by creating an alerting policy.',

  SELECT_NODE_TIP: 'Please select at least a cluster resource.',
  SELECT_WORKLOAD_TIP: 'Please select at least a workload.',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'How do I trigger alerting messages?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    'You need to set an alerting policy for a resource. Alerting messages will be triggered when the resource metric reaches the threshold of the alerting policy.',
  REQUESTS_FOR_PUSH_AN_ALARM_Q:
    'How do I receive alerting messages if an alerting policy is triggered?',
  REQUESTS_FOR_PUSH_AN_ALARM_A:
    'The platform administrator needs to select a notification method and configure the corresponding server.',
  HOW_TO_SUPRESS_AN_ALARM_Q: 'How do I suppress alerting messages?',
  HOW_TO_SUPRESS_AN_ALARM_A:
    'You can set alerting policies at different levels. Each level corresponds to an alerting period and repetition period.',

  EDIT_TCAP: 'Edit',
  EDIT_ALERTING_POLICY: 'Edit Alerting Policy',
  DELETE_TCAP: 'Delete',

  ALERT_DURATION:
    'An alert is triggered when the duration reaches the pre-set value.',
  ALERT_RULE_INACTIVE: 'Inactive',
  ALERT_RULE_PENDING: 'Pending',
  ALERT_RULE_FIRING: 'Firing',
  ALERT_RULE_HEALTH_OK: 'Health',
  ALERT_RULE_HEALTH_ERR: 'Error',
  ALERT_RULE_HEALTH_UNKNOWN: 'UnKnown',

  ALERT_RULE_EXPRESSION_DESC:
    'You can define a custom rule using PromQL statements. For more information, see <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener"> Prometheus Querying</a>.',

  // Alerting Messages
  ALERTING_MESSAGES: 'Alerting Messages',
  ALERTING_RESOURCE: 'Alerting Resource',
  NO_DATA_DESC: 'No Data Found',

  // Alerting Policies
  ALERTING_POLICIES: 'Alerting Policies',
  NOTIFICATION_SETTINGS: 'Notification Settings',

  // Custom Monitoring
  CREATED_AT: 'Created At',
}
