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
  Activate: 'Activate',
  'Add Log Receiver': 'Add Log Receiver',
  'Add Service Address': 'Add Service Address',
  Address: 'Address',
  'Auditing statistics': 'Auditing statistics',
  'Back to previous': 'Back to previous',
  'Change Status': 'Change Status',
  Collecting: 'Collecting',
  'Current Statistics Start Time': 'Current Statistics Start Time',
  'Delete Log Receiver': 'Delete Log Receiver',
  'Display Content': 'Display Content',
  'Event statistics': 'Event statistics',
  'Exact Query': 'Exact Query',
  'Fuzzy Query': 'Fuzzy Query',
  'Hide help information': 'Hide help information',
  'Index Prefix': 'Index Prefix',
  Keyword: 'Keyword',
  'Log Collections': 'Log Collection',
  'Log Receiver': 'Log Receiver',
  'Log Management': 'Log Management',
  'Log Query': 'Log Query',
  'Log Start Time': 'Log Start Time',
  'Log statistics': 'Log statistics',
  'No cluster with auditing module enabled': 'No cluster has Auditing enabled.',
  'No cluster with event query enabled': 'No cluster has Events enabled.',
  'No cluster with logging module enabled': 'No cluster has Logging enabled.',
  'Passwords must be at least 6 characters long':
    'Passwords must be at least 6 characters long',
  'Please enter a filter to search for logs.':
    'Please enter a filter to search for logs.',
  'Please enter the address': 'Please enter the address',
  'Please input service address': 'Please input service address',
  'Real-Time Data': 'Real-Time Data',
  'Recently Configured Updated': 'Recently Configured Updated',
  'Recently Updated': 'Recently Updated',
  'Refresh Interval': 'Refresh Interval',
  'Refresh Rate': 'Refresh Rate',
  'Region Data': 'Region Data',
  'Release Collection': 'Release Collection',
  'Resource Name & Type': 'Resource Name & Type',
  'Search Result': 'Search Result',
  'Search Rule': 'Search Rule',
  'Service Address': 'Service Address',
  'Time topology': 'Time topology',
  topic: 'topic',
  'Auditing log trends in the last 12 hours':
    'Auditing log trends in the last 12 hours',
  'Event trends in the last 12 hours': 'Event trends in the last 12 hours',
  'Log trends in the last 12 hours': 'Log trends in the last 12 hours',

  LOG_DATE: 'YYYY/MM/DD HH:mm',
  EVENT_DATE: 'YYYY/MM/DD 00:00',
  ES_DESC:
    'Elasticsearch is a distributed, RESTful search and analytics engine.',
  KAFKA_DESC: 'Kafka is a popular open-source stream-processing platform.',
  FLUENTD_DESC:
    'Fluentd is an open source data collector for unified logging layer.',
  TOTAL_COLLECTIONS: 'Total {num} receivers',
  TOOLBOX_SHIFT_TIPS:
    ' 👻 You can open the page in a new window with "SHIFT + LEFT CLICK".',

  LOG_COLLECTION_DESC:
    'The system will collect the stdout and stderr logs from each container and send them to one or more target services.',
  LOG_COLLECTION_ENABLE_TIPS:
    'The new status takes about 1 minute to take effect.',
  LOG_COLLECTION_FLUENTD_URL_TIPS:
    'Enter the address of the Fluentd that receives the log.',
  EMPTY_LOG_COLLECTIONS:
    'The log collector is not set up temporarily. You can add a log collector to export the log to the external log collector.',
  LOG_COLLECTION_TIPS:
    'Only one log receiver can be added for each type. If there is one already added, you are only allowed to edit it.',
  URL_SYNTAX_ERROR: 'URL syntax error',

  LOG_COLLECTION_ES_URL_TIPS:
    'The built-in Elasticsearch service is used by default. You can change it to use an Elasticsearch service deployed by your own either within or out of the cluster.',
  LOG_COLLECTION_ES_INDEX_TIPS:
    'The indexes are built with prefix and the date, for example: {prefix}-2020.01.01',
  'Search Logs by': 'Search Logs by {field}',
  'KeyWord Log Query Tip':
    'Please enter the keyword to find the log. You can also find the error log by keywords such as “Error”, “Fail”, “Fatal”, “Exception” and “Warning”.',
  'Project Log Query Tip':
    'You can view related log information according to the project name.',
  'Workload Log Query Tip':
    'You can view related log information according to the workload name.',
  'Container Log Query Tip':
    'You can view related log information according to the container name.',
  'Pod Log Query Tip':
    'You can view related log information according to the Pod name.',
  'Search Events by': 'Search Events by {field}',
  'Workspace Event Query Tip':
    'You can view related event information according to the workspace.',
  'Project Event Query Tip':
    'You can view related event information according to the project.',
  'Resource Type Event Query Tip':
    'You can view related event information according to the resource type.',
  'Resource Name Event Query Tip':
    'You can view related event information according to the resource name.',
  'Message Event Query Tip':
    'You can view related event information according to the message.',
  'Category Event Query Tip':
    'You can view related event information according to the category.',
  'Reason Event Query Tip':
    'You can view related event information according to the reason.',
  'Pod Event Query Tip':
    'You can view related event information according to the pod name.',
  TOTAL_LOGS:
    'A total of <span class={className}> {logs} </span> logs from<br/> <span class={className}>{containers}</span> containers were collected.',
  TIME_S: '{num} s',
  CONTAINER_REAL_TIME_LOGS_UNSUPPORTED_TIPS:
    'The container does not support real-time logs in the current state, please try again later.',
  TOTAL_LOGS_TODAY:
    'A total of <span class={className}> {logs} </span> logs from <span class={className}>{containers}</span> containers were collected today.',
  TOTAL_EVENTS_TODAY:
    'A total of <span class={className}> {events} </span> events were collected today.',
  NO_EVENTS_TODAY: 'Events not found today',
  START_REAL_TIME_LOG: 'Enable real-time logging',
  STOP_REAL_TIME_LOG: 'Disable real-time logging',
  LOG_EXPORT: 'Log Export',

  CREATE_CUSTOM_MONITORING_DASHBOARD: 'Create custom monitoring dashboard',
  SELECT_SUITABLE_MONITORING_TEMPLATE: 'Select Suitable Monitoring Template',
  CUSTON_MONITORING_TEMPLATE_DESC:
    'The default monitoring dashboard settings will be created based on the template you select.',
  CUSTOM_MONITORING_DASHBOARD: 'Custom Monitoring Dashboard',

  SERVICE_BUILT_INTERFACE: 'service monitoring is built interface data capture',

  'Search Auditing Logs by': 'Search Auditing Logs by {field}',
  'Workspace Auditing Query Tip':
    'You can view related event information according to the workspace.',
  'Project Auditing Query Tip':
    'You can view related event information according to the project.',
  'Resource Name Auditing Query Tip':
    'You can view related event information according to the resource name.',
  'Resource Type Auditing Query Tip':
    'You can view related event information according to the resource type.',
  'Verb Auditing Query Tip':
    'You can view related event information according to the verb.',
  'Status Code Auditing Query Tip':
    'You can view related event information according to the status code.',
  'Operation Account Auditing Query Tip':
    'You can view related event information according to the operation account.',
  'Source IP Auditing Query Tip':
    'You can view related event information according to the source IP.',
  TOTAL_AUDITING_TODAY:
    'A total of <span class={className}> {auditing} </span> auditing logs were collected today.',
  NO_AUDITING_TODAY: 'Auditing logs not found today',

  LOGGING_LOG_COLLECTOR: 'Log Receiver',
  EVENTS_LOG_COLLECTOR: 'Events Log Receiver',
  AUDITING_LOG_COLLECTOR: 'Auditing Log Receiver',
}
