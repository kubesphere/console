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
  ALERTING_POLICY_PL: 'Alerting Policies',
  ALERTING_POLICY_DESC: 'Alerting policies are a series of conditions used to monitor cluster resources. You can create alerting policies to monitor resources.',
  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'How are alerts generated?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A: 'You need to set an alerting policy for a resource. Alerts will be generated when the metric configured in the alerting policy reaches a threshold.',
  // List
  CUSTOM_POLICIES: 'Custom Policies',
  BUILT_IN_POLICIES: 'Built-in Policies',
  ALERTING_POLICY_EMPTY_DESC: 'Please create an alerting policy.',
  ALERT_RULE_INACTIVE: 'Inactive',
  ALERT_RULE_PENDING: 'लंबित',
  ALERT_RULE_FIRING: 'Firing',
  ALERT_RULE_HEALTH_OK: 'Healthy',
  ALERT_RULE_HEALTH_ERR: 'Error',
  ALERT_RULE_HEALTH_UNKNOWN: 'UnKnown',
  // List > Create > Basic Information
  SEVERITY: 'Severity',
  CREATE_ALERTING_POLICY: 'Create Alerting Policy',
  CRITICAL_ALERT: 'Critical',
  ERROR_ALERT: 'Error',
  WARNING_ALERT: 'Warning',
  INVALID_TIME_DESC: 'Invalid value. Please enter 0 or a positive integer.',
  ALIAS: 'Alias',
  DURATION_MIN: 'Duration (minutes)',
  ALERT_DURATION: 'When the alert situation persists longer than the value of this parameter, the system starts to send alerts to users.',
  LONG_NAME_DESC: 'The name can contain only lowercase letters, numbers, and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 253 characters.',
  NAME_EXIST_DESC: 'The name already exists. Please enter another name.',
  // List > Create > Rule Settings > Rule Template
  RULE_TEMPLATE: 'Rule Template',
  RULE_SETTINGS: 'Rule Settings',
  MONITORING_TARGETS: 'Monitoring Targets',
  ACTIVATION_CONDITION: 'Activation Condition',
  MEMORY_PERCENTAGE_SCAP: 'Memory percentage',
  SET_ACTIVATION_CONDITION_DESC: 'Please set an activation condition.',
  THRESHOLD: 'Threshold',
  ABNORMAL_PODS: 'Abnormal pods',
  POD_QUOTA_UTILIZATION_SCAP: 'Pod quota usage (%)',
  CPU_USAGE_SCAP: 'CPU usage',
  CPU_UTILIZATION_SCAP: 'CPU usage (%)',
  CPU_LOAD_1: '1-minute CPU load average',
  CPU_LOAD_5: '5-minute CPU load average',
  CPU_LOAD_15: '15-minute CPU load average',
  MEMORY_AVAILABLE: 'Available memory',
  MEMORY_UTILIZATION_SCAP: 'Memory usage (%)',
  DISK_SPACE_AVAILABLE: 'Available local disk space',
  DISK_SPACE_UTILIZATION: 'Local disk usage (%)',
  INODE_UTILIZATION: 'Inode usage (%)',
  DISK_READ_IOPS: 'Local disk read IOPS',
  DISK_WRITE_IOPS: 'Local disk write IOPS',
  DISK_READ_THROUGHPUT: 'Local disk read throughput',
  DISK_WRITE_THROUGHPUT: 'Local disk write throughput',
  DATA_RECEIVE_RATE: 'Network data receiving rate',
  DATA_SEND_RATE: 'Network data sending rate',
  MEMORY_USAGE_SCAP: 'Memory usage',
  MEMORY_USAGE_WO_CACHE_SCAP: 'Memory usage without cache',
  UNAVAILABLE_WORKLOAD_REPLICA_RATIO: 'Unavailable workload replica ratio',
  SELECT_NODE_TIP: 'Please select at least one cluster node.',
  // List > Create > Rule Settings > Custom Rule
  CUSTOM_RULE: 'Custom Rule',
  RULE_EXPRESSION: 'Rule Expression',
  ENTER_RULE_EXPRESSION: 'Please enter a rule expression.',
  ALERT_RULE_EXPRESSION_DESC: 'You can define a custom rule using PromQL statements. <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">Learn More</a>',
  ALERT_FUNCTIONS: 'Functions',
  ALERT_METRICS: 'Metrics',
  ALERT_LABELS: 'Labels',
  ALERT_RATE_RANGES: 'Rate Ranges',
  // List > Create > Message Settings
  ALERTING_MESSAGE: 'Alert',
  MESSAGE_SETTINGS: 'Message Settings',
  NOTIFICATION_SUMMARY: 'Summary',
  NOTIFICATION_DETAILS: 'Details',
  // List > Edit
  EDIT_ALERTING_POLICY: 'Edit Alerting Policy',
  // List > Delete
  ALERTING_POLICY: 'Alerting Policy',
  ALERTING_POLICY_LOW: 'alerting policy'
};