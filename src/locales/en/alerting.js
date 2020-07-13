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

export default {
  'Add Policy': 'Add Policy',
  'Add Rule': 'Add Rule',
  'Alert Occurred': 'Alert Occurred',
  Alerting: 'Alerting',
  'Alerting Detail': 'Alerting Detail',
  'Alerting History': 'Alerting History',
  'Alerting Level': 'Alerting Level',
  'Alerting Message': 'Alerting Message',
  'Alerting Messages': 'Alerting Messages',
  'Alerting Number': 'Alerting Number',
  'Alerting Policies': 'Alerting Policies',
  'alerting policy': 'alerting policy',
  'Alerting Policy': 'Alerting Policy',
  'alerting rule': 'alerting rule',
  'Alerting Rule': 'Alerting Rule',
  'Alerting Rules': 'Alerting Rules',
  'Alerting Status': 'Alerting Status',
  'Alerting Time': 'Alerting Time',
  'Alerting Type': 'Alerting Type',
  cleared: 'cleared',
  Cleared: 'Cleared',
  'Cluster Nodes': 'Cluster Nodes',
  commented: 'commented',
  Commented: 'Commented',
  Condition: 'Condition',
  'Consecutive Count': 'Consecutive Count',
  'cpu usage': 'cpu usage',
  'cpu utilization rate': 'cpu utilization rate',
  Critical: 'Critical',
  critical: 'critical',
  'Critical Alert': 'Critical Alert',
  'disk read iops': 'disk read iops',
  'disk read throughput': 'disk read throughput',
  'disk space available': 'disk space available',
  'disk write iops': 'disk write iops',
  'disk write throughput': 'disk write throughput',
  'Edit Rule': 'Edit Rule',
  'inode utilization rate': 'inode utilization rate',
  'local disk space utilization rate': 'local disk space utilization rate',
  major: 'major',
  Major: 'Major',
  'Major Alert': 'Major Alert',
  'memory available': 'memory available',
  'memory usage': 'memory usage',
  'memory usage (including cache)': 'memory usage (including cache)',
  'memory utilisation (including cache)':
    'memory utilisation (including cache)',
  'memory utilization rate': 'memory utilization rate',
  Message: 'Message',
  minor: 'minor',
  Minor: 'Minor',
  'Minor Alert': 'Minor Alert',
  'Monitoring Rules': 'Monitoring Rules',
  'monitoring target': 'monitoring target',
  'Monitoring Target': 'Monitoring Target',
  'Monitoring Target Count': 'Monitoring Target Count',
  'network data receiving rate': 'network data receiving rate',
  'network data transmitting rate': 'network data transmitting rate',
  'Node Role': 'Node Role',
  'Notification Channel': 'Notification Channel',
  'Notification List': 'Notification List',
  'Notification Rule': 'Notification Rule',
  'Notification Rules': 'Notification Rules',
  Period: 'Period',
  'Please add at least one rule': 'Please add at least one rule',
  'Please input a monitoring target to find':
    'Please input a monitoring target to find',
  'Please input the threshold': 'Please input the threshold',
  'pod abnormal ratio': 'pod abnormal ratio',
  'pod utilization rate': 'pod utilization rate',
  Receiver: 'Receiver',
  receiver: 'receiver',
  'Recent Alert Time': 'Recent Alert Time',
  'Recent Notification': 'Recent Notification',
  'Recovery Time': 'Recovery Time',
  'Repeat Rule': 'Repeat Rule',
  resumed: 'resumed',
  Resumed: 'Resumed',
  Rule: 'Rule',
  'Rule Name': 'Rule Name',
  'Sending Rules': 'Sending Rules',
  sent_failed: 'sent_failed',
  sent_success: 'sent_success',
  'Sented Failed': 'Sented Failed',
  'Sented Successfully': 'Sented Successfully',
  'Service Components': 'Service Components',
  'Service Count': 'Service Count',
  'Service Status': 'Service Status',
  Threshold: 'Threshold',
  Triggered: 'Triggered',
  triggered: 'triggered',
  'triggered alerting messages': 'triggered alerting messages',
  'Unavailable daemonset replicas ratio':
    'Unavailable daemonset replicas ratio',
  'Unavailable deployment replicas ratio':
    'Unavailable deployment replicas ratio',
  'Unavailable statefulset replicas ratio':
    'Unavailable statefulset replicas ratio',
  'View Details': 'View Details',

  load1: 'CPU load average 1 minute',
  load5: 'CPU load average 5 minute',
  load15: 'CPU load average 15 minute',

  ALERT_TYPE: '{type} Alert',
  ALERT_POLICY_TYPE: '{type} Alerting Policy',
  ALERT_POLICY_DESC: 'Set alert rules',
  ALERT_MESSAGE_DESC:
    'Alerting messages are generated based on the monitoring metrics and the workload alert policies in the current project. They can help users detect problems and respond in time.',
  ALERT_POLICY_TRIGGER_RULE:
    'Trigger Rules: Any of the following conditions is met.',
  ALERT_METRIC_NAME: 'Metric Name',
  ALERT_COMMENT: 'Comment',
  ALERT_COMMENT_DESC:
    'Comments will be retained as records for alert processing, but not as a means of handling alerts. Record information will be used to check the processing status of the alerts.',
  ALERT_POLICY_SETTING_TITLE:
    'The relevant alerting policy is not set temporarily',
  ALERT_POLICY_SETTING_DESC:
    'You can find the abnormal condition of the resource in time by setting the alert rules',
  ALERTING_POLICY_CREATE_DESC:
    'You can find the abnormal condition of the resource in time by setting the alert rules',
  'ALERTING-POLICY_BASEINFO_DESC':
    'Set basic information about the alerting policy',
  'ALERTING-POLICY_MONITORING-TARGET_DESC':
    'Select the monitoring target of the alerting policy',
  'ALERTING-POLICY_ALERTING-RULE_DESC': 'Set alert rules',
  'ALERTING-POLICY_NOTIFICATION-RULE_DESC': 'Set notification rules',
  TOTAL_POLICIES: 'Total {num} alerting policies',

  PERIOD_OPTIONS:
    '{value, plural, =1 {1 minute/period} other {# minutes/period}}',
  CONSECUTIVE_OPTIONS: '{value} consecutive times',

  MAX_SEND_NOT_LIMIT: 'Not limited',
  MAX_SEND_COUNT: 'Resend up to {count}',
  REPEAT_CUSTOM_TITLE: 'Customize Repetition Rules',
  REPEAT_CUSTOM_DESC:
    'Alerting messages will be pushed repeatedly at specific intervals according to their severity. The default policy will be adopted unless you make any change to it.',
  REPEAT_INTERVAL_NOT_REPEAT: 'Not repeating',
  REPEAT_INTERVAL_MINUTE: 'Alert once every {num} minutes',
  REPEAT_INTERVAL_HOUR: 'Alert once every {num} hour',
  REPEAT_INTERVAL_DAY: 'Alert once every {num} days',
  REPEAT_INTERVAL_EXP: 'Incremental exponential period',
  REPEAT_RULE_EXP_TIP:
    'Periodic index increment notification: When the alert duration reaches 1, 2, 4, 8, 16, 32... times of the alert statistics period, an alert notification is sent.',
  REPEAT_RULE_TIPS:
    'Alerting messages will be pushed repeatedly according to their severity. By default, <strong>Critical alert is repeated every 30 minutes</strong> / <strong>Major alert is repeated every 2 hours</strong> / <strong>Minor alert is not repeated</strong>.<br> If you need to modify the repetition rules, please customize the settings in Notification Rule section (next section).',

  NOTIFY_TIME_LABEL: 'Effective Notification Time Range',
  NOTIFY_TIME_TIP:
    'You can set an effective time range for an alerting message.',
  NOTIFY_LIST_ADD_TIP: 'Press the enter button or click to add',
  NOTIFY_LIST_INPUT_ERRPR_TIP:
    'The input format is incorrect. Please enter the correct email address.',
  NOTIFY_LIST_INPUT_PLACEHOLDER:
    'Please enter the email address of the member to be notified.',
  NOTIFY_CURRENT_COUNT: 'Notification times: {count} in total',
  RESOURCE_SELECTOR_FORM_TIP: 'Please fill in the label selector',
  RESOURCE_NODE_FORM_TIP: 'Please select a cluster node',
  RESOURCE_WORKLOAD_FORM_TIP: 'Please select a workload',
  SEVERITY_MSG_FIXED_MINUTES: 'Notify every {count} minutes',
  SEVERITY_MSG_NO_LIMIT: 'Not limited',
  SEVERITY_MSG_EXP: 'Notice by exponential period',
  SEVERITY_MSG_NOT_REPEAT: 'No repeat notification',
  ALERT_RULE_STATUS_OCCURRED: 'Alerting',
  ALERT_RULE_STATUS_NO_OCCURRED: 'Not alert yet',
  SENT_RULE_TIME_TITLE: 'Effective Time Period',
  SENT_RULE_CHANNEL_TITLE: 'Notification Method',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q:
    'Prerequisites for triggering an alerting message?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    'You need to set an alerting policy for a resource. When a certain indicator of a resource reaches the threshold of the alerting policy, the message is triggered and pushed.',
  REQUESTS_FOR_PUSH_AN_ALARM_Q:
    'Prerequisites for a push message of alerting policy?',
  REQUESTS_FOR_PUSH_AN_ALARM_A:
    'The platform administrator is required to set up the mail server.',
  HOW_TO_SUPRESS_AN_ALARM_Q: 'How to suppress alerting messages?',
  HOW_TO_SUPRESS_AN_ALARM_A:
    'Each alerting policy can be set at different levels, and each level corresponds to a different alert period and repetition period.',

  PROJECT_MONITOR_TARGET_TIPS:
    'An alert can specify only one resource type policy',

  RULE_NAME_DESC:
    'The rule name can be composed of any character to help you better distinguish resources.',
}
