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
  NOTIFICATION_SUMMARY: 'Summary',
  NOTIFICATION_MESSAGE: 'Notification Message',
  'Alerting Detail': 'Alerting Detail',
  ALERTING_HISTORY: 'Alerting History',
  ALERTING_MESSAGE: 'Alerting Message',
  'Alerting Messages': 'Alerting Messages',
  ALERT_MONITORING: 'Alert Monitoring',
  'Alerting Policies': 'Alerting Policies',
  'alerting policy': 'alerting policy',
  ALERTING_POLICY: 'Alerting Policy',
  ALERTING_POLICY_PL: 'Alerting Policies',
  ALERTING_POLICY_LOW: 'alerting policy',
  CREATE_ALERTING_POLICY: 'Create Alerting Policy',
  'Alerting Resource': 'Alerting Resource',
  'alerting rule': 'alerting rule',
  ALERTING_RULE: 'Alerting Rule',
  RULE_SETTINGS: 'Rule Settings',
  ALERTING_STATUS: 'Status',
  'Alerting Duration': 'Duration',
  ALERTING_SEVERITY: 'Alert severity',
  ALERTING_TYPE: 'Type',
  ALERTING_NAME: 'Alert name',
  SEVERITY: 'Severity',
  Condition: 'Condition',
  'cpu usage': 'CPU usage',
  CPU_USAGE_SCAP: 'CPU usage',
  DISK_READ_IOPS: 'Local disk read IOPS',
  DISK_READ_THROUGHPUT: 'Local disk read throughput',
  DISK_SPACE_AVAILABLE: 'Available local disk space',
  DISK_WRITE_IOPS: 'Local disk write IOPS',
  DISK_WRITE_THROUGHPUT: 'Local disk write throughput',
  'Edit Rule': 'Edit Rule',
  DISK_SPACE_USAGE: 'Local disk space usage',
  MEMORY_AVAILABLE: 'Available memory',
  'memory usage': 'Memory usage',
  MEMORY_USAGE_CACHE: 'Memory usage (including caches)',
  'memory utilisation (including cache)':
    'Memory utilization (including caches)',
  MEMORY_USAGE_SCAP: 'Memory usage',

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
  ABNORMAL_PODS: 'Abnormal Pods',
  POD_USAGE_SCAP: 'Pod usage',
  ACTIVATION_TIME: 'Activation Time',
  'Recent Notification': 'Recent Notification',
  'Recovery Time': 'Recovery Time',
  Rule: 'Rule',
  RULE: 'Rule',
  'Rule Name': 'Rule Name',
  THRESHOLD: 'Threshold',
  UNAVAILABLE_REPLICAS: 'Unavailable replicas',
  'Unavailable daemonset replicas ratio':
    'Unavailable daemonset replicas ratio',
  'Unavailable deployment replicas ratio':
    'Unavailable deployment replicas ratio',
  'Unavailable statefulset replicas ratio':
    'Unavailable statefulset replicas ratio',
  VIEW_DETAILS: 'View Details',

  RULE_TEMPLATE: 'Rule Template',
  CUSTOM_RULE: 'Custom Rule',
  RULE_EXPRESSION: 'Rule Expression',
  INVALID_TIME_DESC:
    'Invalid value. Please select a value from the drop-down list or enter 0 or a positive integer.',

  ALIAS: 'Alias',
  THRESHOLD_DURATION_MIN: 'Threshold Duration (min)',

  ENTER_RULE_EXPRESSION: 'Please enter a rule expression.',
  ALERT_FUNCTIONS: 'Functions',
  ALERT_METRICS: 'Metrics',
  ALERT_LABELS: 'Labels',
  ALERT_RATE_RANGES: 'Rate Ranges',

  NOTIFICATION_DETAILS: 'Details',

  CUSTOM_POLICIES: 'Custom Policies',
  BUILT_IN_POLICIES: 'Built-in Policies',

  CPU_LOAD_1: 'Average CPU load over the past 1 min',
  CPU_LOAD_5: 'Average CPU load over the past 5 min',
  CPU_LOAD_15: 'Average CPU load over the past 15 min',

  ALERT_TYPE: '{type} Alert',
  ALERT_POLICY_DESC:
    'Alerting policies are a series of conditions used to monitor cluster resources. You can create alerting policies to monitor resources.',
  ALERT_MESSAGE_DESC:
    'Alert messages display details of triggered alerts that have met the conditions of the alert rules.',
  ALERTING_MESSAGE_EMPTY_DESC:
    'No alerting message is found in the current project.',
  ALERTING_POLICY_EMPTY_DESC: 'Please create an alerting policy.',
  ALERTING_POLICY_CREATE_DESC:
    'You can create alerting policies to detect abnormal resources in real time.',

  SELECT_NODE_TIP: 'Please select at least one cluster node.',
  SELECT_WORKLOAD_TIP: 'Please select at least one workload.',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'How are alerting messages generated?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    'You need to set an alerting policy for a resource. Alerting messages will be generated when the metric configured in the alerting policy reaches a threshold.',
  REQUESTS_FOR_PUSH_AN_ALARM_Q:
    'How do I receive alerting messages if an alerting policy is triggered?',
  REQUESTS_FOR_PUSH_AN_ALARM_A:
    'The platform administrator needs to select a notification method and configure the server corresponding to the method.',
  HOW_TO_SUPRESS_AN_ALARM_Q: 'How do I suppress alerting messages?',
  HOW_TO_SUPRESS_AN_ALARM_A:
    'You can set alerting policies at different levels. Each level corresponds to an alerting interval.',

  EDIT_TCAP: 'Edit',
  EDIT_ALERTING_POLICY: 'Edit Alerting Policy',
  DELETE_TCAP: 'Delete',

  ALERT_DURATION:
    'The status of the alerting policy becomes Firing when the duration of the condition configured in the alerting rule reaches the threshold.',
  ALERT_RULE_INACTIVE: 'Inactive',
  ALERT_RULE_PENDING: 'Pending',
  ALERT_RULE_FIRING: 'Firing',
  ALERT_RULE_HEALTH_OK: 'Healthy',
  ALERT_RULE_HEALTH_ERR: 'Error',
  ALERT_RULE_HEALTH_UNKNOWN: 'UnKnown',

  ALERT_RULE_EXPRESSION_DESC:
    'You can define a custom rule using PromQL statements. <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">Learn More</a>',

  // Alerting Messages
  ALERTING_MESSAGE_PL: 'Alerting Messages',
  ALERTING_RESOURCE: 'Alerting Resource',
  NO_DATA_DESC: 'No Data Found',
  MONITORING_TARGET: 'Monitoring Target',

  // Alerting Policies
  ALERTING_POLICIES: 'Alerting Policies',
  MESSAGE_SETTINGS: 'Message Settings',
  DEPLOYMENT: 'Deployment',
  DEPLOYMENT_PL: 'Deployments',
  STATEFULSET: 'StatefulSet',
  STATEFULSET_PL: 'StatefulSets',
  DAEMONSET: 'DaemonSet',
  DAEMONSET_PL: 'DaemonSets',
  DEPLOYMENTS_VALUE: 'Deployments: {value}',
  STATEFULSETS_VALUE: 'StatefulSets: {value}',
  DAEMONSETS_VALUE: 'DaemonSets: {value}',

  // Alerting Policies > Details
  NOTIFICATION_SUMMARY_COLON: 'Summary: ',
  DETAILS_COLON: 'Details: ',
  MONITORING_TARGETS_LOW: 'Monitoring targets',
  ALERTING_RULE_LOW: 'Alerting rule',
  THRESHOLD_DURATION: 'Threshold Duration',
}
