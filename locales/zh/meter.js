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
  'Export Bill': '导出 csv 格式的资源消费记录',
  'Consumption by Yesterday': '截止到昨天的消费历史',
  'Reconciliation Cycle': '对账周期',
  'Consumer Trends': '消费者趋势',
  'Current Resources Included': '当前包含的资源',
  Trend: '趋势图',
  'Average Usage': '平均用量',
  'Total Consumption': '共消费',
  'Total Consumption By Creation': '自创建以来共消费',
  Consumption: '消费',
  'Net Received': '网络流入',
  'Net Transmitted': '网络流出',
  'View Consumption': '查看消费',
  'Select View Type': '选择您要查看的类别',
  'Cluster Consumption': '集群资源消费情况',

  CLUSTER_CONSUMPTION_DESC:
    '集群资源消费情况以集群为维度统计集群，节点，项目的CPU、内存、存储等资源消费情况',
  CLUSTER_RESOURCE_CONSUMPTION_DESC:
    '<strong>集群</strong> 的CPU、内存、存储等资源消费情况',
  CLUSTER_NODE_CONSUMPTION_DESC:
    '集群中 <strong>节点</strong> 的CPU、内存、存储等资源消费情况',
  'Workspace Consumption': '企业空间（项目）资源消费情况',
  WORKSPACE_CONSUMPTION_DESC:
    '企业空间(项目)资源消费情况以企业空间为维度统计企业空间和项目的CPU、内存、存储等资源消费情况',
  WORKSPACE_RESOURCE_CONSUMPTION_DESC:
    '<strong>企业空间</strong> 的CPU、内存、存储等资源消费情况',
  WORKSPACE_PROJECT_CONSUMPTION_DESC:
    '企业空间中的 <strong>项目</strong> 的CPU、内存、存储等资源消费情况',
  PROJECT_CONSUMPTION_DESC:
    '项目中的<strong>应用、服务、容器组</strong>等资源 的CPU、内存、存储等资源消费情况',
  APP_CONSUMPTION_DESC: '应用商店模板资源消费统计',
  APP_RESOURCE_CONSUMPTION_DESC:
    '应用商店模板资源消费统计支持对模板在 KubeSphere 平台中被部署的次数查询，支持以下查询',
  APP_WORKSPACE_CONSUMPTION_DESC:
    '应用模板在 <strong>企业空间</strong> 中的部署次数',
  APP_WORKSPACE_PROJECT_CONSUMPTION_DESC:
    '应用模板在企业空间下的某个 <strong>项目</strong> 中的部署次数',
  'Max Usage': '最大用量',
  'Min Usage': '最小用量',
  'Meter CPU Usage': 'CPU 用量',
  'Meter Memory Usage': '内存 用量',
  'Meter Volume Usage': '存储卷 用量',
  'Meter Net Received Usage': '网络流入 用量',
  'Meter Net Transmitted Usage': '网络流出 用量',
  'Total Consumer Meaning': '共消费表示什么？',
  'Total Consumer Desc':
    '共消费表示在当前对账周期中每个计费采样点的资源用量之和',
  TIMERANGE_MORE_30DAY_MSG:
    '结束时间与开始时间的间隔大于30天时，时间间隔最小为1天',
  TOTAL_COST: '总金额({unit})',
  '￥': '￥',
  $: '$',
  Price: '价格',
  PRICE_CONFIG_DESC: '暂未配置价格信息',
  METER_RESOURCE_DESC: '最近1小时的消费统计',
  'No cluster with metering module enabled': '暂无启用计量模块的集群',

  INVALID_METERING: '未开启消费统计',
}
