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
  'Consumption Bill': '消費帳單',
  Memory: 'Memory',
  EXPORT_BILL: '導出 csv 格式的資源消費記錄',
  CONSUMPTION_HISTORY: '截止到昨天的消費歷史',
  BILLING_CYCLE: '對帳週期',
  CONSUMER_TRENDS: '消費者趨勢',
  CURRENT_RESOURCE_CONSUMPTION: '當前包含的資源',
  Trend: '趨勢圖',
  AVERAGE_USAGE: '平均用量',
  TOTAL_CONSUMPTION: '共消費',
  'Total Consumption By Creation': '自創建以來共消費',
  Consumption: '消費',
  'Net Received': '網絡流入',
  'Net Transmitted': '網絡流出',
  VIEW: '查看',
  RESOURCE_CONSUMPTION_DESC: '選擇您要查看的類別',
  CLUSTER_CONSUMPTION: '集群資源消費情況',

  CLUSTER_CONSUMPTION_DESC:
    '集群資源消費情況以集群為維度統計集群，節點的CPU、內存、存儲等資源消費情況',
  CLUSTER_RESOURCE_CONSUMPTION_DESC:
    '<strong>集群</strong> 的CPU、內存、存儲等資源消費情況',
  CLUSTER_NODE_CONSUMPTION_DESC:
    '集群中 <strong>節點</strong> 的CPU、內存、存儲等資源消費情況',
  CLUSTER_POD_CONSUMPTION_DESC:
    '節點中 <strong>容器組</strong> 的CPU、內存等資源消費情況',
  WORKSPACE_CONSUMPTION: '企業空間(項目)資源消費情況',
  WORKSPACE_CONSUMPTION_DESC:
    '企業空間(項目)資源消費情況以企業空間為維度統計企業空間和項目的CPU、內存、存儲等資源消費情況',
  WORKSPACE_RESOURCE_CONSUMPTION_DESC:
    '<strong>企業空間</strong> 的CPU、內存、存儲等資源消費情況',
  WORKSPACE_PROJECT_CONSUMPTION_DESC:
    '企業空間中的 <strong>項目</strong> 的CPU、內存、存儲等資源消費情況',
  PROJECT_CONSUMPTION_DESC:
    '項目中的 <strong>應用、服務、容器組</strong> 等資源的CPU、內存、存儲等資源消費情況',
  APP_CONSUMPTION_DESC: '應用商店模板資源消費統計',
  APP_RESOURCE_CONSUMPTION_DESC:
    '應用商店模板資源消費統計支持對模板在 KubeSphere 平台中被部署的次數查詢，支持以下查詢',
  APP_WORKSPACE_CONSUMPTION_DESC:
    '應用模板在 <strong>企業空間</strong> 中的部署次數',
  APP_WORKSPACE_PROJECT_CONSUMPTION_DESC:
    '應用模板在企業空間下的某個 <strong>項目</strong> 中的部署次數',
  MAXIMUM_USAGE: '最大用量',
  MINIMUM_USAGE: '最小用量',
  'Meter CPU Usage': 'CPU 用量',
  'Meter Memory Usage': '內存 用量',
  'Meter Volume Usage': '存儲卷 用量',
  'Meter Net Received Usage': '網絡流入 用量',
  'Meter Net Transmitted Usage': '網絡流出 用量',
  TOTAL_CONSUMPTION_Q: '共消費表示什麼？',
  TOTAL_CONSUMPTION_A: '共消費表示在當前對帳週期中每個計費採樣點的資源用量之和',
  TIMERANGE_MORE_30DAY_MSG:
    '結束時間與開始時間的間隔大於 30 天時，時間間隔最小為 1 天',
  TOTAL_COST: '總金額({unit})',
  '￥': '￥',
  $: '$',
  Price: '價格',
  PRICE_CONFIG_DESC: '暫未配置價格信息',
  METER_RESOURCE_DESC: '最近 1 小時的消費統計',
  METERING_NOT_ENABLED_DESC: '暫無啟用計量模塊的集群',
  INVALID_METERING: '未開啟消費統計',
  NO_METER_DATA: '新創建的資源，需要等待一小時後才能查看數據',

  // Resource Consumption Statistics
  METER_CPU_USAGE: 'CPU Usage',
  METER_MEMORY_USAGE: 'Memory Usage',
  METER_VOLUME_USAGE: 'Volume Usage',
  METER_NET_RECEIVED_USAGE: 'Inbound Traffic Usage',
  METER_NET_TRANSMITTED_USAGE: 'Outbound Traffic Usage',
  NET_RECEIVED: 'Inbound Traffic',
  NET_TRANSMITTED: 'Outbound Traffic',
  COMPOSING_APP: 'Composed app',
  CLUSTER_NODE_SCAP: 'Cluster node',
  POD_SCAP: 'Pod',
  APP_TEMPLATE_SCAP: 'Template-based app',
  COMPOSING_APP_SCAP: 'Composed app',
  DEPLOYMENT_SCAP: 'Deployment',
  STATEFULSET_SCAP: 'StatefulSet',
  DAEMONSET_SCAP: 'DaemonSet',
  WORKSPACE_SCAP: 'Workspace',
  CLUSTER_SCAP: 'Cluster',
  PROJECT_SCAP: 'Project',
  SERVICE_SCAP: 'Service',
  HOST_CLUSTER_SCAP: 'Host cluster',
  MEMBER_CLUSTER_SCAP: 'Member cluster',
}
