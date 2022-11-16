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
  CUSTOM_MONITORING: '自定義監控',
  CUSTOM_MONITORING_DASHBOARD: '自定義監控面板',
  CUSTOM_MONITORING_DASHBOARD_PL: '自定義監控面板',
  CUSTOM_MONITORING_DASHBOARD_EMPTY_DESC: '請創建一個自定義監控面板。',
  CUSTOM_MONITORING_DASHBOARD_DESC: '自定義監控提供應用監控模板，您可以根據需求自定義監控面板。',
  // List
  // List > Create
  TEMPLATE: 'Template',
  CREATE_CUSTOM_MONITORING_DASHBOARD: '創建自定義監控面板',
  MONITORING_TEMPLATE: '監控模板',
  CUSTOM_MONITORING_TEMPLATE_DESC: '選擇預設模板、上傳模板或自定義模板來生成自定義監控面板。',
  // List > Create > Grafana
  UPLOAD_GRAFANA_DASHBOARD: '上傳 Grafana 監控面板',
  SUPPORT_JSON_FILE: '僅支援 JSON 格式的文件。',
  UPLOAD_GRAFANA_URL: '通過 URL 上傳 Grafana 監控面板。',
  UPLOAD_FROM_LOCAL_TITLE: '選擇或拖移文件',
  FILE_UPLOAD_ERROR: '只能上傳一個文件。',
  UPLOAD_FILE_TIP: '請上傳文件。',
  ENTER_GRAFANA_URL: '請輸入 Grafana 監控面板 URL。',
  UPLOAD_FROM_LOCAL_STORAGE: '從本地上傳',
  UPLOAD_FROM_URL: '通過 URL 上傳',
  // List > Create > Custom
  DASHBOARD_TITILE: 'Dashboard title',
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
  ADD_MONITOR_ITEM: '添加監控項',
  ADD_MONITOR_ROW: '添加監控組',
  CHART_TYPES: '圖表類型',
  GRAPH_TYPES: '圖例類型',
  LINE_CHART: '折線圖',
  BAR_CHART: '柱狀圖',
  SELECT_CHART_TYPE: '選擇圖表類型',
  SELECT_CHART_TYPE_MODAL_DESC: '選擇您要添加的自定義圖表類型',
  SINGLE_STATE_CHART: '即時文本',
  DISPLAY_POSITION: '圖表布局位置',
  EMPTY_CHART_PLACEHOLDER: '圖表將顯示在此區域',
  DISPLAY_FORMAT: '顯示格式',
  FIELD_NAME: '字段名稱',
  COLUMN_NAME: '列名稱',
  GRAPH_NAME: '圖表名稱',
  DECIMALS: '精確位',
  TABLE: '表格',
  TABLE_SETTINGS: '表格設置',
  VALUE_FOMATER: '數據取值',
  PER_PAGE_LINES: '每頁行數',
  CUSTOM_DISPLAY_STYLE: '設置顯示格式',
  DATA_TYPE: '數據類型',
  Y_AXIS: 'Y軸',
  GRAPH_COLORS: '圖表配色',
  SINGLE_GRAPH_TYPE_NAME: '基礎圖',
  SINGLE_GRAPH_TYPE: '最常見的圖表類型',
  STACKED_GRAPH_TYPE: '堆疊圖',
  STACKED_GRAPH_TYPE_DESC: '適用於各大類總量及分量之間的對比顯示',
  MONITOR_TYPE_NO_SUPPORT: '目前不支持該類型',
  MONITOR_METRIC: '監控指標',
  METRIC_NAME: '圖例名稱',
  DEBUGB_DATA: '除錯數據',
  TIME_FORMAT: '時間格式',
  HIGHT_RULES: '高亮規則',
  EDIT_TEMPLATE: '編輯模板',
  SAVE_TEMPLATE: '保存模板',
  THRESHOLD_FILL: '臨界值填充',
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
  CUSTOM_MONITORING_DASHBOARD_LOW: '自定義監控面板'
};