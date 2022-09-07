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
  CUSTOM_MONITORING: '自定义监控',
  CUSTOM_MONITORING_DASHBOARD: '自定义监控面板',
  CUSTOM_MONITORING_DASHBOARD_PL: '自定义监控面板',
  CUSTOM_MONITORING_DASHBOARD_EMPTY_DESC: '请创建一个自定义监控面板。',
  CUSTOM_MONITORING_DASHBOARD_DESC: '自定义监控提供应用监控模板，您可以根据需求自定义监控面板。',
  // List
  // List > Create
  TEMPLATE: 'Template',
  CREATE_CUSTOM_MONITORING_DASHBOARD: '创建自定义监控面板',
  MONITORING_TEMPLATE: '监控模板',
  CUSTOM_MONITORING_TEMPLATE_DESC: '选择默认模板、上传模板或自定义模板来生成自定义监控面板。',
  // List > Create > Grafana
  UPLOAD_GRAFANA_DASHBOARD: '上传 Grafana 监控面板',
  SUPPORT_JSON_FILE: '仅支持 JSON 格式的文件。',
  UPLOAD_GRAFANA_URL: '通过 URL 上传 Grafana 监控面板。',
  UPLOAD_FROM_LOCAL_TITLE: '选择或拖动文件',
  FILE_UPLOAD_ERROR: '只能上传一个文件。',
  UPLOAD_FILE_TIP: '请上传文件。',
  ENTER_GRAFANA_URL: '请输入 Grafana 监控面板 URL。',
  UPLOAD_FROM_LOCAL_STORAGE: '从本地上传',
  UPLOAD_FROM_URL: '通过 URL 上传',
  // List > Create > Custom
  APPLICABLE_SCENE: 'Applicable Scenario',
  BASE_LINE_CHART: 'Base Line Chart',
  STACK_LINE_CHART: 'Stacked Area Chart',
  BASE_LINE_CHART_DESC: 'A line chart is mainly used to visualize a trend or change in data over time. It is very useful for displaying a series of two-dimensional continuous data, such as website traffic or product prices.',
  STACK_LINE_CHART_DESC: 'A stacked area chart is a special kind of area charts that can be used to compare multiple variables in an interval. It is very useful when multiple data series are available as you can analyze the relation of each group to the whole chart and display their respective proportion.',
  LINE_CHART_DESC: 'A line chart is mainly used to visualize a trend or change in data over time.',
  BASE_BAR_CHART: 'Base Bar Chart',
  STACK_BAR_CHART: 'Stacked Bar Chart',
  BAR_CHART_DESC: 'A bar chart is the most common type of charts. It presents different categorical data with horizontal or vertical bars with heights or lengths proportional to the values that they represent.',
  BASE_BAR_CHART_DESC: 'One axis of the base bar chart features the categories being compared, while the other axis represents the value of each.',
  STACK_BAR_CHART_DESC: 'A stacked bar chart is an extension of bar charts. A standard bar chart compares individual data points with each other while in a stacked bar chart, parts of the data are adjacent or stacked. It can be used to present the total amount of a category as well as its sub-amounts (proportion). Therefore, it is very helpful for examining part-to-whole relations.',
  CUSTOM_DISPLAY_MODAL_DESC: 'Customize the table display style according to your needs',
  THRESHOLD_FILL_DESC: 'You can set a threshold and the style can be changed automatically after the threshold is exceeded.',
  ADD_MONITOR_ITEM: '添加监控项',
  ADD_MONITOR_ROW: '添加监控组',
  CHART_TYPES: '图表类型',
  GRAPH_TYPES: '图例类型',
  LINE_CHART: '折线图',
  BAR_CHART: '柱状图',
  SELECT_CHART_TYPE: '选择图表类型',
  SELECT_CHART_TYPE_MODAL_DESC: '选择您要添加的自定义图表类型',
  SINGLE_STATE_CHART: '即时文本',
  DISPLAY_POSITION: '图表布局位置',
  EMPTY_CHART_PLACEHOLDER: '图表将显示在此区域',
  DISPLAY_FORMAT: '显示格式',
  FIELD_NAME: '字段名称',
  COLUMN_NAME: '列名称',
  GRAPH_NAME: '图表名称',
  DECIMALS: '精确位',
  TABLE: '表格',
  TABLE_SETTINGS: '表格设置',
  VALUE_FOMATER: '数据取值',
  PER_PAGE_LINES: '每页行数',
  CUSTOM_DISPLAY_STYLE: '设置显示格式',
  DATA_TYPE: '数据类型',
  Y_AXIS: 'Y轴',
  GRAPH_COLORS: '图表配色',
  SINGLE_GRAPH_TYPE_NAME: '基础图',
  SINGLE_GRAPH_TYPE: '最常见的图表类型',
  STACKED_GRAPH_TYPE: '堆叠图',
  STACKED_GRAPH_TYPE_DESC: '适用于各大类总量及分量之间的对比显示',
  MONITOR_TYPE_NO_SUPPORT: '当前不支持该类型',
  MONITOR_METRIC: '监控指标',
  METRIC_NAME: '图例名称',
  DEBUGB_DATA: '调试数据',
  TIME_FORMAT: '时间格式',
  HIGHT_RULES: '高亮规则',
  EDIT_TEMPLATE: '编辑模板',
  SAVE_TEMPLATE: '保存模板',
  THRESHOLD_FILL: '阈值填充',
  UNIT: 'Unit',
  COOL_COLORS: 'Cool Colors',
  WARM_COLORS: 'Warm Colors',
  DEFAULT_COLORS: 'Default Colors',
  LAST: 'Last',
  SECOND_TIME: '{count, plural, =1 {1 second} other{# seconds}}',
  MINUTE_TIME: '{count, plural, =1 {1 minute} other{# minutes}}',
  HOUR_TIME: '{count, plural, =1 {1 hour} other{# hours}}',
  DAY_TIME: '{count, plural, =1 {1 day} other{# days}}',
  WEEK_TIME: '{count, plural, =1 {1 week} other{# weeks}}',
  NO_REFRESHING: 'No refreshing',
  INTERVAL: 'Interval',
  // List > Edit Information
  // List > Edit YAMl
  // List > Delete
  CUSTOM_MONITORING_DASHBOARD_LOW: '自定义监控面板'
};