/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Title
  TOTAL_AUDITING_TODAY:
    'A total of <span class={className}> {auditing} </span> audit log entries have been collected today.',
  NO_AUDIT_LOG_TODAY: 'No Audit Log Collected Today',
  // Search
  NO_AVAILABLE_CLUSTER: 'No Available Cluster',
  AUDITING_NOT_ENABLED_DESC:
    'The component is not enabled. <a href="{docUrl}/pluggable-components/auditing-logs/" target="_blank">Learn More</a>',
  TIME_RANGE_LAST: 'Time range: last {value}',
  TIME_RANGE_RANGE: 'Time range: {startTime} – {endTime}',
  // Querying Rules
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
  ENABLE_AUDIT_LOG_COLLECTION_DESC:
    'You need to enable audit log collection if it is disabled. <a href="{link}" target="_blank">Learn More</a>',
};
