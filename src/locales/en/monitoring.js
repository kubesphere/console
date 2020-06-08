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
  MONITORING_CLUSTER_DESC: 'Monitor the running status of the cluster',
  MONITORING_PHYSICAL_DESC:
    'Monitor the running status of the physical resources',
  MONITORING_APPLICATION_DESC:
    'Monitor the running status of the application resources',
  TIMERANGE_SELECTOR_MSG: 'End time needs to be later than start time',
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

  EDIT_TEMPLATE: 'Edit Template',
  SAVE_TEMPLATE: 'Save Template',

  GRAPH_COLORS: 'Graph colors',
  SINGLE_GRAPH_TYPE: 'Normal Graph Type',
  SINGLE_GRAPH_TYPE_NAME: 'Normal Type',
  STACKED_GRAPH_TYPE: 'Stacked Type',
  STACKED_GRAPH_TYPE_DESC:
    'Applicable to the comparative display between major categories and components',
  GRAPH_TYPES: 'Graph Types',
  ADD_MONITOR_ITEM: 'Add Monitor Item',
  ADD_MONITOR_ROW: 'Add Monitor Row',
  MONITOR_TYPE_NO_SUPPORT: 'This type is not currently supported',
  TABLE_SETTINGS: 'Table Settings',
  PER_PAGE_LINES: 'Per Page Lines',
  CUSTOM_DISPLAY_STYLE: 'Custom display style',
  CUSTOM_DISPLAY_MODAL_DESC: 'Customize the display format in Table as needed',
  DATA_TYPE: 'Data Type',
  DECIMALS: 'Decimals',
  THRESHOLD_FILL: 'Threshold Fill',
  THRESHOLD_FILL_DESC:
    'The threshold can be set, and the style hint can be changed automatically after the value exceeds',
  HIGHT_RULES: 'Hight Line Rules',
  TIME_FORMAT: 'Time Format',
  MONITOR_METRICS: 'Monitor Metrics',
  DEBUGB_DATA: 'Debug Data',
  LINE_CHART: 'Line Chart',
  BAR_CHART: 'Bar Chart',
  SINGLE_STATE_CHART: 'Single State Chart',
  APPLICABLE_SCENE: 'Applicable Scene',
  BASE_LINE_CHART: 'Base Line Chart',
  STACK_LINE_CHART: 'Stack Line Chart',
  BASE_BAR_CHART: 'Base Bar Chart',
  STACK_BAR_CHART: 'Stack Bar Chart',

  LINE_CHART_DESC:
    'The line chart is mainly used to show the trend or change of the data phase over time',
  BASE_LINE_CHART_DESC:
    'The line chart is mainly used to show the trend or change of the data phase over time. The line chart is very suitable for displaying a continuous two-dimensional data, such as the number of visits to a website or the fluctuation of product sales prices',
  STACK_LINE_CHART_DESC:
    'A stacked area chart is a special area chart that can be used to compare multiple variables within a range. If there are multiple data series, and you want to analyze the relationship between each part of the category to the whole, and show the contribution of the part to the total, using the stacked area chart is a very suitable choice',
  BAR_CHART_DESC:
    'Histogram is the most common type of chart. It uses the height of the bar in the horizontal or vertical direction to display different categories of values',
  BASE_BAR_CHART_DESC:
    'One axis of the basic histogram shows the category being compared, while the other axis represents the corresponding scale value',
  STACK_BAR_CHART_DESC:
    'The stacked histogram is an extension of the histogram. The difference is that the data values of the histogram are arranged in parallel, and the stacked histograms are superimposed one by one. It can display the total amount of each category, as well as the size and proportion of each small category included in the category, so it is very suitable for dealing with the relationship between the part and the whole',
  SELECT_CHART_TYPE: 'Select Chart Type',
  SELECT_CHART_TYPE_MODAL_DESC:
    'Choose the type of custom chart you want to add',
  DISPLAY_POSITION: 'Display Position',
  DISPLAY_FORMAT: 'Display Format',
  FIELD_NAME: 'Field Name',
  COLUMN_NAME: 'Column Name',
  METRIC_NAME: 'Metric Name',
  GRAPH_NAME: 'Graph Name',
  TABLE: 'Table',
  VALUE_FOMATER: 'Value Format',
  Y_AXIS: 'Y Axis',
  CustomMonitorDashboards: 'Custom Monitor Dashboards',
  CUSTOMMONITORDASHBOARD_DESC:
    'users can define application requirements according to their own monitoring dashboards',
}
