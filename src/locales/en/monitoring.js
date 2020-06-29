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
  Interval: 'Interval',
  Last: 'Last',
  TIME_M: '{num, plural, =1 {1 minute} other{# minutes}}',
  TIME_H: '{num, plural, =1 {1 hour} other{# hours}}',
  TIME_D: '{num, plural, =1 {1 day} other{# days}}',
  UTILIZATION: 'Utilization',
  RESOURCE_USAGE_TITLE: 'Resources Usage',
  MONITORING_CLUSTER_DESC:
    'You can monitor the running status of the cluster in this module.',
  MONITORING_PHYSICAL_DESC:
    'Monitor the running status of the physical resources',
  MONITORING_APPLICATION_DESC:
    'You can monitor the running status of the application resources in this module.',
  TIMERANGE_SELECTOR_MSG: 'End time must be later than start time',
  MONITORING_SELECT_LIMIT_MSG: 'You can select up to ten resources',

  AVERAGE: 'Average',
  TOTAL_AVERAGE: 'Total',
  SCHEDULED_SUCCESS: 'Scheduled',
  SCHEDULED_ERROR: 'Error',
  SCHEDULED_FAIL: 'Unschedulable',
  ETCD_NODE_TITLE: 'ETCD Node',
  ETCD_LEADER_TITLE: 'Is there a Leader',
  ETCD_CHANGES_TITLE: 'Leader change times (within 1 hour)',
  ETCD_STATUS: 'Service <span>status</span>',
  ETCD_PROPOSAL: 'Raft <span>proposal</span>',
  ETCD_DB_SIZE: 'DB <span>size</span>',
  ETCD_CLIENT_TRAFFIC: 'Client <span>traffic</span>',
  REQUEST_LATENCY: 'Request <span>latency</span>',
  REQUEST_RATE: 'Request <span>rate</span>',
  ATTEMPT_FREQUENCY: 'Attempt <span>frequency</span>',
  ATTEMPT_RATE: 'Attempt <span>rate</span>',
  PROPOSAL_COMMITTED: 'Committed',
  PROPOSAL_APPLIED: 'Applied',
  PROPOSAL_FAILED: 'Failed',
  PROPOSAL_PENDING: 'Pending',

  CustomMonitorDashboards: 'Custom Monitoring Dashboards',
  CUSTOMMONITORDASHBOARD_DESC:
    'Users can define their application monitoring dashboards according to their own needs.',
  CUSTOMMONITORDASHBOARD_CREATE_DESC:
    'Users can define their application monitoring dashboards according to their own needs.',

  ADD_MONITOR_ITEM: 'Add Monitoring Item',
  ADD_MONITOR_ROW: 'Add Monitoring Group',
  SELECT_CHART_TYPE: 'Select a Chart Type',
  SELECT_CHART_TYPE_MODAL_DESC: 'Select a customized chart type',
  GRAPH_TYPES: 'Chart Types',
  LINE_CHART: 'Line Chart',
  BAR_CHART: 'Bar Chart',
  SINGLE_STATE_CHART: 'Real-time Text',
  DISPLAY_POSITION: 'Display Position',
  APPLICABLE_SCENE: 'Applicable Scenario',
  BASE_LINE_CHART: 'Base Line Chart',
  BASE_BAR_CHART: 'Base Bar Chart',
  STACK_LINE_CHART: 'Stacked Area Chart',
  STACK_BAR_CHART: 'Stacked Bar Chart',
  LINE_CHART_DESC:
    'A line chart is mainly used to visualize a trend or change in data over time.',
  BASE_LINE_CHART_DESC:
    'A line chart is mainly used to visualize a trend or change in data over time. It is very useful for displaying a series of two-dimensional continuous data, such as website traffic or product prices.',
  STACK_LINE_CHART_DESC:
    'A stacked area chart is a special kind of area charts that can be used to compare multiple variables in an interval. It is very useful when multiple data series are available as you can analyze the relation of each group to the whole chart and display their respective proportion.',
  BAR_CHART_DESC:
    'A bar chart is the most common type of charts. It presents different categorical data with horizontal or vertical bars with heights or lengths proportional to the values that they represent.',
  BASE_BAR_CHART_DESC:
    'One axis of the base bar chart features the categories being compared, while the other axis represents the value of each.',
  STACK_BAR_CHART_DESC:
    'A stacked bar chart is an extension of bar charts. A standard bar chart compares individual data points with each other while in a stacked bar chart, parts of the data are adjacent or stacked. It can be used to present the total amount of a category as well as its sub-amounts (proportion). Therefore, it is very helpful for examining part-to-whole relations.',
  DISPLAY_FORMAT: 'Display Format',
  FIELD_NAME: 'Field Name',
  COLUMN_NAME: 'Column Name',
  GRAPH_NAME: 'Chart Name',
  DECIMALS: 'Decimal Places',
  TABLE: 'Table',
  TABLE_SETTINGS: 'Table Settings',
  VALUE_FOMATER: 'Value Format',
  PER_PAGE_LINES: 'Lines Per Page',
  CUSTOM_DISPLAY_STYLE: 'Display Style',
  DATA_TYPE: 'Data Type',
  CUSTOM_DISPLAY_MODAL_DESC:
    'Customize the table display style according to your needs',
  Y_AXIS: 'Y Axis',
  GRAPH_COLORS: 'Chart Colors',
  SINGLE_GRAPH_TYPE: 'The most common chart type',
  SINGLE_GRAPH_TYPE_NAME: 'Basic Chart',
  STACKED_GRAPH_TYPE: 'Stacked Chart',
  STACKED_GRAPH_TYPE_DESC: 'Useful for displaying part-to-whole relations',
  MONITOR_TYPE_NO_SUPPORT: 'The type is not supported currently',
  MONITOR_METRICS: 'Monitoring Metrics',
  METRIC_NAME: 'Metric Name',
  DEBUGB_DATA: 'Debugging Data',
  TIME_FORMAT: 'Time Format',
  HIGHT_RULES: 'Highlighting Rules',
  EDIT_TEMPLATE: 'Edit Template',
  SAVE_TEMPLATE: 'Save Template',
  THRESHOLD_FILL: 'Threshold Settings',
  THRESHOLD_FILL_DESC:
    'You can set a threshold and the style can be changed automatically after the threshold is exceeded.',
}
