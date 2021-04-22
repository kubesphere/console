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
  'Alerting Detail': 'Alerting Detail',
  'Alerting History': 'Alerting History',
  'Alerting Message': 'Alerting Message',
  'Alerting Messages': 'Alerting Messages',
  'Alerting Monitoring': 'Alert Monitoring',
  'Alerting Policies': 'Alerting Policies',
  'alerting policy': 'alerting policy',
  'Alerting Policy': 'Alerting Policy',
  'Alerting Resource': 'Alerting Resource',
  'alerting rule': 'alerting rule',
  'Alerting Rule': 'Alerting Rule',
  'Alerting Rules': 'Alerting Rules',
  'Alerting Status': 'Status',
  'Alerting Duration': 'Duration',
  'Alerting Type': 'Severity',
  Condition: 'Condition',
  'cpu usage': 'CPU usage',
  'cpu utilization rate': 'CPU utilization',
  'disk read iops': 'Disk read IOPS',
  'disk read throughput': 'Disk read throughput',
  'disk space available': 'Available disk space',
  'disk write iops': 'Disk write IOPS',
  'disk write throughput': 'Disk write throughput',
  'Edit Rule': 'Edit Rule',
  'inode utilization rate': 'inode utilization',
  'local disk space utilization rate': 'Local disk space utilization',
  'memory available': 'Available memory',
  'memory usage': 'Memory usage',
  'memory usage (including cache)': 'Memory usage (including caches)',
  'memory utilisation (including cache)':
    'Memory utilization (including caches)',
  'memory utilization rate': 'Memory utilization',
  Message: 'Message',

  'Critical Alert': 'Critical',
  'Error Alert': 'Error',
  'Warning Alert': 'Warning',

  'Monitoring Rules': 'Monitoring Rules',
  'monitoring target': 'monitoring target',
  'Monitoring Target': 'Monitoring Target',
  'network data receiving rate': 'Network data receiving speed',
  'network data transmitting rate': 'Network data transmission speed',
  'Notification Channel': 'Notification Channel',
  'Notification List': 'Notification List',
  'Notification Settings': 'Notification Settings',
  'Please add at least one rule': 'Please add at least one rule',
  'Please input the threshold': 'Please input the threshold',
  'pod abnormal ratio': 'Abnormal Pods',
  'pod utilization rate': 'Pod utilization',
  'Alert Active Time': 'Activated Time',
  'Recent Notification': 'Recent Notification',
  'Recovery Time': 'Recovery Time',
  Rule: 'Rule',
  'Rule Name': 'Rule Name',
  Threshold: 'Threshold',
  'Unavailable replicas ratio': 'Unavailable replicas',
  'Unavailable daemonset replicas ratio':
    'Unavailable daemonset replicas ratio',
  'Unavailable deployment replicas ratio':
    'Unavailable deployment replicas ratio',
  'Unavailable statefulset replicas ratio':
    'Unavailable statefulset replicas ratio',
  'View Details': 'View Details',

  'Rule Templates': 'Rule Templates',
  'Custom Rule': 'Custom Rule',
  'Rule Expression': 'Rule Expression',

  'Please input the rule expression': 'Please input the rule expression',

  'Notification Content': 'Notification Content',

  'Custom Policies': 'Custom Policies',
  'Built-In Policies': 'Built-in Policies',

  load1: 'CPU load average 1 minute',
  load5: 'CPU load average 5 minutes',
  load15: 'CPU load average 15 minutes',

  ALERT_TYPE: '{type} Alert',
  ALERT_POLICY_DESC:
    'Specify conditions for alerting policies and customize monitoring targets and notification messages.',
  ALERT_MESSAGE_DESC:
    'Alerting messages are generated based on the monitoring metrics and the workload alert policies in the current project. They can help users detect problems and respond in time.',

  ALERTING_POLICY_CREATE_DESC:
    'You can find abnormal conditions of resources instantly by setting alerting policies.',

  RESOURCE_NODE_FORM_TIP: 'Please select cluster nodes',
  RESOURCE_WORKLOAD_FORM_TIP: 'Please select workloads',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'How do I trigger alerts?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    'You need to set an alerting policy for a resource. When a certain indicator of a resource reaches the threshold of the alerting policy, the message is triggered and pushed.',
  REQUESTS_FOR_PUSH_AN_ALARM_Q:
    'How do I receive alerting messages if an alerting policy is triggered?',
  REQUESTS_FOR_PUSH_AN_ALARM_A:
    'The platform administrator must select a notification method and configure the corresponding server.',
  HOW_TO_SUPRESS_AN_ALARM_Q: 'How do I suppress alerting messages?',
  HOW_TO_SUPRESS_AN_ALARM_A:
    'Each alerting policy can be set at different levels, and each level corresponds to a different alert period and repetition period.',

  ALERTING_DURATION:
    'Once the monitoring target meets the alert condition for the alert duration, the alert will be triggered.',
  ALERT_RULE_INACTIVE: 'Inactive',
  ALERT_RULE_PENDING: 'Pending',
  ALERT_RULE_FIRING: 'Firing',
  ALERT_RULE_HEALTH_OK: 'Health',
  ALERT_RULE_HEALTH_ERR: 'Error',
  ALERT_RULE_HEALTH_UNKNOWN: 'UnKnown',

  ALERT_RULE_EXPRESSION_DESC:
    'Alerting rules can be customized through PromQL statements. For PromQL related syntax, refer to <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener"> Prometheus Querying</a>.',
}
