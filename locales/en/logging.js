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
  ADD_LOG_RECEIVER: 'Add Log Receiver',
  ADD_SERVICE_ADDRESS: 'Add',
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
  HIDE_HELP_INFORMATION: 'Hide Help Information',
  INDEX_PREFIX: 'Index Prefix',
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
  ENTER_SERVICE_ADDRESS: 'Please enter a Service address.',
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
  SERVICE_ADDRESS: 'Service Address',
  'Time topology': 'Time topology',
  TOPIC: 'Topic',
  'Auditing log trends in the last 12 hours':
    'Auditing log trends in the last 12 hours',
  'Event trends in the last 12 hours': 'Event trends in the last 12 hours',
  'Log trends in the last 12 hours': 'Log trends in the last 12 hours',

  LOG_DATE: 'YYYY/MM/DD HH:mm',
  EVENT_DATE: 'YYYY/MM/DD 00:00',
  ES_DESC:
    'Elasticsearch is a distributed, RESTful search and analytics engine.',
  KAFKA_DESC: 'Kafka is a popular open-source, stream-processing platform.',
  FLUENTD_DESC:
    'Fluentd is an open-source data collector for unified logging layer.',
  TOOLBOX_SHIFT_TIPS:
    ' 👻 You can open the page in a new window with "SHIFT + LEFT CLICK".',

  LOG_COLLECTION_DESC:
    'The system collects standard output (stdout) and standard error (stderr) logs from each container and sends them to one or more target services.',
  LOG_COLLECTION_ENABLE_TIPS:
    'The new status takes about 1 minute to take effect.',
  LOG_COLLECTION_FLUENTD_URL_TIPS:
    'Enter the address of the Fluentd that receives logs.',
  EMPTY_LOG_COLLECTIONS:
    'No log receiver is found. You can add log receivers to export logs to external log collectors.',
  LOG_COLLECTION_TIPS:
    'You can add one log receiver for each type. If a type of log receiver is already added, you cannot add it again.',
  URL_SYNTAX_ERROR: 'URL syntax error',

  LOG_COLLECTION_ES_URL_TIPS:
    'The built-in Elasticsearch service is used by default. You can also enter the IP address of Elasticsearch independently deployed inside or outside the cluster.',
  LOG_COLLECTION_ES_INDEX_TIPS:
    'The index is created based on the date. For example, {prefix}-2020.01.01.',
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

  CREATE_CUSTOM_MONITORING_DASHBOARD: 'Create Custom Monitoring Dashboard',
  SELECT_MONITORING_TEMPLATE: 'Select Monitoring Template',
  CUSTON_MONITORING_TEMPLATE_DESC:
    'Generate default monitoring template based on the application template you select or customize a template.',
  CUSTOM_MONITORING_DASHBOARD: 'Custom Monitoring Dashboard',
  IMPORT_GRAFANA_DASHBOARD: 'Import Grafana dashboard',
  SUPPORT_JSON_FILE: 'Only supports JSON files',
  IMPORT_GRAFANA_JSON_FILE: 'Import Grafana JSON Files',
  IMPORT_GRAFANA_URL: 'Import using Grafana dashboard URL',
  'Click or drag files to this area to upload':
    'Click or drag files to this area to upload',
  'Only one file can be uploaded': 'Only one file can be uploaded',
  'Need to upload a file': 'Need to upload a file',
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

  // Log Collection
  LOG_COLLECTION: 'Log Collection',
  LOG_ADDRESS: 'Address: ',
  LOG_COLLECTING: 'Collecting',
  LOG_CLOSE: 'Close',
  INVALID_SERVICE_ADDRESS: 'Invalid service address.',
  EXAMPLE: 'Example: ',
  PORT_NUMBER_EMPTY: 'Please enter a port number.',
  PARAMETER_REQUIRED: 'This parameter is mandatory.',
}
