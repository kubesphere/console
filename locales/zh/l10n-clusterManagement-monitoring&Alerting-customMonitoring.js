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
  TEMPLATE: '模板',
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
  DASHBOARD_TITILE: 'Dashboard title',
  APPLICABLE_SCENE: '适用场景',
  BASE_LINE_CHART: '基础折线图',
  STACK_LINE_CHART: '堆叠面积图',
  BASE_LINE_CHART_DESC: '折线图主要用来展示数据相随着时间推移的趋势或变化。折线图非常适合用于展示一个连续的二维数据，如某网站访问人数或商品销量价格的波动。',
  STACK_LINE_CHART_DESC: '堆积面积图是一种特殊的面积图，可以用来比较在一个区间内的多个变量。如果有多个数据系列，并想分析每个类别的部分到整体的关系，并展现部分量对于总量的贡献时，使用堆积面积图是非常合适的选择。',
  LINE_CHART_DESC: '折线图主要用来展示数据相随着时间推移的趋势或变化。',
  BASE_BAR_CHART: '基础柱状图',
  STACK_BAR_CHART: '堆叠柱状图',
  BAR_CHART_DESC: '柱状图是最常见的图表类型，通过使用水平或垂直方向\b柱子的高度来显示不同类别的数值。',
  BASE_BAR_CHART_DESC: '基础柱状图的一个轴显示正在比较的类别，而另一个轴代表对应的刻度值。',
  STACK_BAR_CHART_DESC: '堆叠柱状图是柱状图的扩展，不同的是，柱状图的数据值为并行排列，堆叠柱图则是一个个叠加起来的。它可以展示每一个分类的总量，以及该分类包含的每个小分类的大小及占比，因此非常适合处理部分与整体的关系。',
  CUSTOM_DISPLAY_MODAL_DESC: '根据需要定制 Table 中的显示格式',
  THRESHOLD_FILL_DESC: '可以设置阈值，数值超出后可以自动更改样式提示',
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
  UNIT: '单位',
  COOL_COLORS: '冷色调',
  WARM_COLORS: '暖色调',
  DEFAULT_COLORS: '默认颜色',
  LAST: '最近',
  SECOND_TIME: '{count, plural, =1 {1 秒} other{# 秒}}',
  MINUTE_TIME: '{count, plural, =1 {1 分钟} other{# 分钟}}',
  HOUR_TIME: '{count, plural, =1 {1 小时} other{# 小时}}',
  DAY_TIME: '{count, plural, =1 {1 天} other{# 天}}',
  WEEK_TIME: '{count, plural, =1 {1 周} other{# 周}}',
  NO_REFRESHING: '不刷新',
  INTERVAL: '间隔',
  // List > Edit Information
  // List > Edit YAMl
  // List > Delete
  CUSTOM_MONITORING_DASHBOARD_LOW: '自定义监控面板'
};