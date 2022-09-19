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
  // Title
  TOTAL_AUDITING_TODAY: 'A total of <span class={className}> {auditing} </span> audit log entries have been collected today.',
  NO_AUDIT_LOG_TODAY: 'No Audit Log Collected Today',
  AUDIT_LOG_TREND_LAST_TWELVE_HOURS: 'Audit log trend in the last 12 hours',
  START_TIME_VALUE: 'Start Time: {value}',
  // Search
  NO_DATA_AUTHORIZED: 'No Data Authorized',
  NO_DATA_AUTHORIZED_DESC: 'Please contact an administrator to obtain data authorization.',
  TIME_RANGE_LAST: 'Time range: last {value}',
  TIME_RANGE_RANGE: 'Time range: {startTime} – {endTime}',
  // Querying Rules
  AUDIT_LOGS_12H: 'Audit logs in the last 12 hours',
  AUDIT_LOG_WORKSPACE_TIP: 'Enter a workspace name to search for audit logs.',
  AUDIT_LOG_PROJECT_TIP: 'Enter a project name to search for audit logs.',
  AUDIT_LOG_RESOURCE_NAME_TIP: 'Enter a resource name to search for audit logs.',
  AUDIT_LOG_RESOURCE_TYPE_TIP: 'Enter a resource type to search for audit logs.',
  AUDIT_LOG_VERB_TIP: 'Enter a verb to search for audit logs.',
  AUDIT_LOG_STATUS_CODE_TIP: 'Enter a status code to search for audit logs.',
  AUDIT_LOG_OPERATOR_TIP: 'Enter an operator to search for audit logs.',
  AUDIT_LOG_SOURCE_IP_ADDRESS_TIP: 'Enter a source IP address to search for audit logs.',
  SEARCH_BY_VERB: 'Search by Verb',
  SEARCH_BY_STATUS_CODE: 'Search by Status Code',
  SEARCH_BY_OPERATOR: 'Search by Operator',
  SEARCH_BY_SOURCE_IP_ADDRESS: 'Search by Source IP Address',
  ENABLE_AUDIT_LOG_COLLECTION_DESC: 'You need to enable audit log collection if it is disabled. <a href="{link}" target="_blank">Learn More</a>',
}
