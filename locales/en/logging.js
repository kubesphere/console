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
  AUDIT_LOG_COUNT: 'Audit Logs',
  'Back to previous': 'Back to previous',
  CHANGE_STATUS: 'Change Status',
  Collecting: 'Collecting',
  'Current Statistics Start Time': 'Current Statistics Start Time',
  'Delete Log Receiver': 'Delete Log Receiver',
  'Display Content': 'Display Content',
  'Event statistics': 'Event statistics',
  EXACT_QUERY: 'Exact Query',
  FUZZY_QUERY: 'Fuzzy Query',
  HIDE_HELP_INFORMATION: 'Hide Help Information',
  INDEX_PREFIX: 'Index Prefix',
  KEYWORD: 'Keyword',
  'Log Collections': 'Log Collection',
  'Log Receiver': 'Log Receiver',
  'Log Management': 'Log Management',
  'Log Query': 'Log Query',
  'Log Start Time': 'Log Start Time',
  CONTAINER_LOG_COUNT: 'Container Logs',
  AUDITING_NOT_ENABLED_DESC:
    'The component is not enabled. <a href="https://v3-1.docs.kubesphere.io/docs/pluggable-components/auditing-logs/" target="_blank">Learn More</a>',
  EVENT_NOT_ENABLED_DESC:
    'The component is not enabled. <a href="https://v3-1.docs.kubesphere.io/docs/pluggable-components/events/" target="_blank">Learn More</a>',
  LOGGING_NOT_ENABLED_DESC:
    'The component is not enabled. <a href="https://v3-1.docs.kubesphere.io/docs/pluggable-components/logging/" target="_blank">Learn More</a>',
  'Log statistics': 'Log statistics',
  'No cluster with auditing module enabled': 'No cluster has Auditing enabled.',
  'No cluster with event query enabled': 'No cluster has Events enabled.',
  'No cluster with logging module enabled': 'No cluster has Logging enabled.',
  LOGGING_DISABLED: 'Logging Disabled',
  'Passwords must be at least 6 characters long':
    'Passwords must be at least 6 characters long',
  'Please enter a filter to search for logs.':
    'Please enter a filter to search for logs.',
  ADDRESS_EMPTY_DESC: 'Please enter an address.',
  ENTER_SERVICE_ADDRESS: 'Please enter a service address.',
  'Real-Time Data': 'Real-Time Data',
  'Recently Configured Updated': 'Recently Configured Updated',
  'Recently Updated': 'Recently Updated',
  'Refresh Interval': 'Refresh Interval',
  REFRESH_RATE_COLON: 'Refresh Rate: ',
  CONTAINER_LOG_SOURCE: 'Container Log Source',
  REFRESH_INTERVAL_VALUE: 'Refresh interval: {value}s',
  'Refresh Rate': 'Refresh Rate',
  'Region Data': 'Region Data',
  'Release Collection': 'Release Collection',
  RESOURCE_NAME_AND_TYPE: 'Resource Type & Name',
  SEARCH_RESULTS: 'Search Results',
  QUERYING_RULES: 'Querying Rules',
  SERVICE_ADDRESS: 'Service Address',
  TIME_TOPOLOGY: 'Time Topology ',
  TOPIC: 'Topic',
  'Auditing log trends in the last 12 hours':
    'Auditing log trends in the last 12 hours',
  RESOURCE_EVENT_TRENDS_12H: 'Resource event trends in 12 h',
  CONTAINER_LOG_TRENDS_12H: 'Container log trends in 12 h',

  LOG_DATE: 'YYYY/MM/DD HH:mm',
  EVENT_DATE: 'YYYY/MM/DD 00:00',
  ES_DESC:
    'Elasticsearch is a distributed, RESTful search and analytics engine.',
  KAFKA_DESC: 'Kafka is a popular open-source, stream-processing platform.',
  FLUENTD_DESC:
    'Fluentd is an open-source data collector for unified logging layer.',
  TOOLBOX_SHIFT_TIPS:
    ' 👻 Press "shift+left click" to open kubectl in a new browser window.',

  LOG_COLLECTION_DESC:
    'The system collects standard output (stdout) and standard error (stderr) logs from each container and sends them to one or more target services.',
  LOG_COLLECTION_ENABLE_TIPS:
    'The new status requires about 1 minute to take effect.',
  LOG_COLLECTION_FLUENTD_URL_TIPS:
    'Enter the address of the Fluentd service that receives logs.',
  EMPTY_LOG_COLLECTIONS:
    'No log receiver is found. You can add log receivers and send logs to external log receivers.',
  LOG_COLLECTION_TIPS: 'You can add one log receiver for each type.',
  URL_SYNTAX_ERROR: 'URL syntax error',

  LOG_COLLECTION_ES_URL_TIPS:
    'The built-in Elasticsearch service is used by default. You can also enter the IP address of Elasticsearch independently deployed inside or outside the cluster.',
  LOG_COLLECTION_ES_INDEX_TIPS:
    'Use the index prefix to speed up queries. The index prefix is automatically generated in <Index prefix>-<Year-month-date> format.',
  'Search Logs by': 'Search Logs by {field}',
  CONTAINER_LOG_KEYWORD_TIP: 'Enter a keyword to search for container logs.',
  CONTAINER_LOG_PROJECT_TIP:
    'Enter a project name to search for container logs.',
  CONTAINER_LOG_WORKLOAD_TIP:
    'Enter a workload name to search for container logs.',
  CONTAINER_LOG_CONTAINER_TIP:
    'Enter a container name to search for container logs.',
  CONTAINER_LOG_POD_TIP: 'Enter a Pod name to search for container logs.',
  'Search Events by': 'Search Events by {field}',
  RESOURCE_EVENT_WORKSPACE_TIP:
    'Enter a workspace name to search for container logs.',
  RESOURCE_EVENT_PROJECT_TIP:
    'Enter a project name to search for container logs.',
  RESOURCE_EVENT_RESOURCE_TYPE_TIP:
    'Enter a resource type to search for container logs.',
  RESOURCE_EVENT_RESOURCE_NAME_TIP:
    'Enter a resource name to search for container logs.',
  RESOURCE_EVENT_MESSAGE_TIP: 'Enter a message to search for resource events.',
  RESOURCE_EVENT_CATEGORY_TIP:
    'Enter a category name to search for container logs.',
  RESOURCE_EVENT_REASON_TIP: 'Enter a reason to search for container logs.',
  'Pod Event Query Tip': 'Enter a Pod name to search for container logs.',
  TOTAL_LOGS:
    'A total of <span class={className}> {logs} </span> log entries from<br/> <span class={className}>{containers}</span> containers have been collected.',
  TIME_S: '{num}s',
  CONTAINER_LOGS_NOT_SUPPORTED:
    'The container does not support real-time logs currently. Please try again later.',
  TOTAL_LOGS_TODAY:
    'A total of <span class={className}> {logs} </span> log entries from <span class={className}>{containers}</span> containers have been collected today.',
  TOTAL_EVENTS_TODAY:
    'A total of <span class={className}> {events} </span> resource events were collected today.',
  NO_RESOURCE_EVENTS_TODAY: 'No Resource Events Collected Today',
  START_REAL_TIME_LOG: 'Enable real-time logging',
  STOP_REAL_TIME_LOG: 'Disable real-time container logs',
  LOG_EXPORT: 'Log Export',
  EXPORT_LOGS: 'Export Logs',

  CREATE_CUSTOM_MONITORING_DASHBOARD: 'Create Custom Monitoring Dashboard',
  MONITORING_TEMPLATE: 'Monitoring Template',
  CUSTOM_MONITORING_TEMPLATE_DESC:
    'Select a default template, upload a template, or customize a template to generate a custom monitoring dashboard.',
  CUSTOM_MONITORING_DASHBOARD: 'Custom Monitoring Dashboard',

  UPLOAD_GRAFANA_DASHBOARD: 'Upload Grafana Dashboard',
  SUPPORT_JSON_FILE: 'Only files in JSON format are supported.',
  IMPORT_GRAFANA_JSON_FILE: 'Import Grafana JSON Files',
  UPLOAD_GRAFANA_URL: 'Upload a Grafana dashboard from URL.',
  UPLOAD_FROM_LOCAL_TITLE: 'Select or Drag a File',
  FILE_UPLOAD_ERROR: 'Only one file can be uploaded.',
  UPLOAD_FILE_TIP: 'Please upload a file.',
  ENTER_GRAFANA_URL: 'Please enter a Grafana dashboard URL.',

  CUSTOMMONITORDASHBOARD: 'Custom Monitoring Dashboard',
  CUSTOM_MONITORING_DASHBOARD_PL: 'Custom Monitoring Dashboards',
  CUSTOMMONITORDASHBOARD_PL: 'Custom Monitoring Dashboards',
  CUSTOMMONITORDASHBOARD_LOW: 'custom monitoring dashboard',
  CUSTOM_MONITORING_DASHBOARD_EMPTY_DESC:
    'Please create a custom monitoring dashboard.',

  SERVICE_BUILT_INTERFACE: 'service monitoring is built interface data capture',

  'Search Auditing Logs by': 'Search Auditing Logs by {field}',
  AUDIT_LOG_WORKSPACE_TIP: 'Enter a workspace name to search for audit logs.',
  AUDIT_LOG_PROJECT_TIP: 'Enter a project name to search for audit logs.',
  AUDIT_LOG_RESOURCE_NAME_TIP:
    'Enter a resource name to search for audit logs.',
  AUDIT_LOG_RESOURCE_TYPE_TIP:
    'Enter a resource type to search for audit logs.',
  AUDIT_LOG_VERB_TIP: 'Enter a verb to search for audit logs.',
  AUDIT_LOG_STATUS_CODE_TIP: 'Enter a status code to search for audit logs.',
  AUDIT_LOG_OPERATOR_TIP: 'Enter an operator to search for audit logs.',
  AUDIT_LOG_SOURCE_IP_ADDRESS_TIP:
    'Enter a source IP address to search for audit logs.',
  TOTAL_AUDITING_TODAY:
    'A total of <span class={className}> {auditing} </span> audit log entries have been collected today.',
  NO_AUDIT_LOG_TODAY: 'No Audit Log Collected Today',

  LOGGING_LOG_COLLECTOR: 'Log Receiver',
  EVENTS_LOG_COLLECTOR: 'Events Log Receiver',
  AUDITING_LOG_COLLECTOR: 'Auditing Log Receiver',

  // Log Collection
  LOG_COLLECTION: 'Log Collection',
  LOG_RECEIVER_PL: 'Log Receivers',
  LOG_ADDRESS: 'Address: ',
  LOG_COLLECTING: 'Collecting',
  LOG_DISABLED: 'Disabled',
  INVALID_SERVICE_ADDRESS: 'Please enter a correct service address.',
  EXAMPLE: 'Example: ',
  PORT_NUMBER_EMPTY: 'Please enter a port number.',
  PARAMETER_REQUIRED: 'This parameter is mandatory.',
  EVENT_PL: 'Events',
  CREATION_TIME: 'Creation time',

  // Log Collection > Details
  ADDRESS: 'Address',
  CHANGE_STATUS_LOW: 'Change status',
  EVENTS: 'Events',
  SELECT_STATUS_TIP: 'Select a status',

  // Container Log Search
  LOG_EXPORT_SCAP: 'Log export',
  SEARCH_BY_KEYWORD: 'Search by Keyword',
  SEARCH_BY_PROJECT: 'Search by Project',
  SEARCH_BY_WORKLOAD: 'Search by Workload',
  SEARCH_BY_POD: 'Search by Pod',
  SEARCH_BY_CONTAINER: 'Search by Container',
  START_TIME_COLON: 'Start Time: ',
  TIME_RANGE: 'Time Range',
  LOG: 'Log',
  DISPLAY: 'Display',
  HIDE: 'Hide',
  STOP_REAL_TIME_CONTAINER_LOG: 'Pause real-time container logs',
  START_REAL_TIME_CONTAINER_LOG: 'View real-time container logs',
  REASON_COLON: 'Reason: ',
  MESSAGE_COLON: 'Message: ',

  // Resource Event Search
  STOP_REAL_TIME_RESOURCE_EVENT: 'Pause real-time resource events',
  START_REAL_TIME_RESOURCE_EVENT: 'View real-time resource events',
  RESOURCE_EVENT_COUNT: 'Resource Events',
  SEARCH_BY_MESSAGE: 'Search by Message',
  SEARCH_BY_WORKSPACE: 'Search by Workspace',
  SEARCH_BY_RESOURCE_TYPE: 'Search by Resource Type',
  SEARCH_BY_RESOURCE_NAME: 'Search by Resource Name',
  SEARCH_BY_REASON: 'Search by Reason',
  SEARCH_BY_CATEGORY: 'Search by Category',

  // Audit Log Search
  VERB: 'Verb',
  STATUS_CODE: 'Status Code',
  SUBRESOURCE: 'Subresource',
  START_REAL_TIME_AUDIT_LOG: 'Pause real-time audit logs',
  STOP_REAL_TIME_AUDIT_LOG: 'View real-time audit logs',
  SEARCH_BY_VERB: 'Search by Verb',
  SEARCH_BY_STATUS_CODE: 'Search by Status Code',
  SEARCH_BY_OPERATOR: 'Search by Operator',
  SEARCH_BY_SOURCE_IP_ADDRESS: 'Search by Source IP Address',
}
