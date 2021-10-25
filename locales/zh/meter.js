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
  'Consumption Bill': '消费账单',
  Memory: '内存',
  EXPORT_BILL: '导出 CSV 文件格式的消费记录。',
  CONSUMPTION_HISTORY: '消费历史',
  BILLING_CYCLE: '对账周期',
  CONSUMER_TRENDS: '消费者趋势',
  CURRENT_RESOURCE_CONSUMPTION: '当前消费',
  Trend: '趋势图',
  AVERAGE_USAGE: '平均用量',
  TOTAL_CONSUMPTION: '总消费情况',
  'Total Consumption By Creation': '自创建以来共消费',
  Consumption: '消费',
  'Net Received': '网络流入',
  'Net Transmitted': '网络流出',
  VIEW: '查看',
  RESOURCE_CONSUMPTION_DESC: '选择一个类别以查看资源消费情况。',
  CLUSTER_CONSUMPTION: '集群资源消费情况',

  CLUSTER_CONSUMPTION_DESC: '查看集群资源的消费情况。',
  CLUSTER_RESOURCE_CONSUMPTION_DESC:
    '<strong>集群</strong>的 CPU、内存、存储卷等资源的消费情况',
  CLUSTER_NODE_CONSUMPTION_DESC:
    '集群<strong>节点</strong>的 CPU、内存、存储卷等资源的消费情况',
  CLUSTER_POD_CONSUMPTION_DESC:
    '节点中<strong>容器组</strong>的 CPU、内存等资源的消费情况',
  WORKSPACE_CONSUMPTION: '企业空间资源消费情况',
  WORKSPACE_CONSUMPTION_DESC: '查看企业空间的资源消费情况。',
  WORKSPACE_RESOURCE_CONSUMPTION_DESC:
    '<strong>企业空间</strong>的 CPU、内存、存储卷等资源的消费情况',
  WORKSPACE_PROJECT_CONSUMPTION_DESC:
    '企业空间中<strong>项目</strong>的 CPU、内存、存储卷等资源的消费情况',
  PROJECT_CONSUMPTION_DESC:
    '项目中的<strong>应用</strong>、<strong>服务</strong>、<strong>容器组</strong>的 CPU、内存、存储卷等资源的消费情况',
  APP_CONSUMPTION_DESC: '应用商店模板资源消费统计',
  APP_RESOURCE_CONSUMPTION_DESC:
    '应用商店模板资源消费统计支持对模板在 KubeSphere 平台中被部署的次数查询，支持以下查询',
  APP_WORKSPACE_CONSUMPTION_DESC:
    '应用模板在 <strong>企业空间</strong> 中的部署次数',
  APP_WORKSPACE_PROJECT_CONSUMPTION_DESC:
    '应用模板在企业空间下的某个 <strong>项目</strong> 中的部署次数',
  MAXIMUM_USAGE: '最大用量',
  MINIMUM_USAGE: '最小用量',
  'Meter CPU Usage': 'CPU 用量',
  'Meter Memory Usage': '内存 用量',
  'Meter Volume Usage': '存储卷 用量',
  'Meter Net Received Usage': '网络流入 用量',
  'Meter Net Transmitted Usage': '网络流出 用量',
  TOTAL_CONSUMPTION_Q: '什么是总消费情况？',
  TOTAL_CONSUMPTION_A:
    '总消费情况表示在当前对账周期中每个计费采样点的资源用量之和。',
  TIMERANGE_MORE_30DAY_MSG:
    '结束时间与开始时间的间隔大于 30 天时，采样间隔最小为 1 天。',
  TOTAL_COST: '总金额({unit})',
  '￥': '￥',
  $: '$',
  Price: '价格',
  PRICE_CONFIG_DESC: '尚未配置价格信息。',
  METER_RESOURCE_DESC: '1 小时内的资源消费情况',
  METERING_NOT_ENABLED_DESC:
    '当前模块尚未启用。<a href="https://v3-1.docs.kubesphere.io/zh/docs/toolbox/metering-and-billing/enable-billing/">了解更多</a>',

  INVALID_METERING: '未开启消费统计',
  NO_METER_DATA: '没有找到资源消费数据。',

  // Resource Consumption Statistics
  METER_CPU_USAGE: 'CPU 用量',
  METER_MEMORY_USAGE: '内存用量',
  METER_VOLUME_USAGE: '存储卷用量',
  METER_NET_RECEIVED_USAGE: '入站流量用量',
  METER_NET_TRANSMITTED_USAGE: '出站流量用量',
  NET_RECEIVED: '入站流量',
  NET_TRANSMITTED: '出站流量',
  COMPOSING_APP: '自制应用',
  CLUSTER_NODE_SCAP: '集群节点',
  POD_SCAP: '容器组',
  APP_TEMPLATE_SCAP: '基于模板的应用',
  COMPOSING_APP_SCAP: '自制应用',
  DEPLOYMENT_SCAP: '部署',
  STATEFULSET_SCAP: '有状态副本集',
  DAEMONSET_SCAP: '守护进程集',
  WORKSPACE_SCAP: '企业空间',
  CLUSTER_SCAP: '集群',
  PROJECT_SCAP: '项目',
  SERVICE_SCAP: '服务',
  HOST_CLUSTER_SCAP: '主集群',
  MEMBER_CLUSTER_SCAP: '成员集群',
}
