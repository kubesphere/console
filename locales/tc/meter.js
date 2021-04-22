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
  'Export Bill': '導出 csv 格式的資源消費記錄',
  'Consumption by Yesterday': '截止到昨天的消費歷史',
  'Reconciliation Cycle': '對帳週期',
  'Consumer Trends': '消費者趨勢',
  'Current Resources Included': '當前包含的資源',
  Trend: '趨勢圖',
  'Average Usage': '平均用量',
  'Total Consumption': '共消費',
  'Total Consumption By Creation': '自創建以來共消費',
  Consumption: '消費',
  'Net Received': '網絡流入',
  'Net Transmitted': '網絡流出',
  'View Consumption': '查看消費',
  'Select View Type': '選擇您要查看的類別',
  'Cluster Consumption': '集群資源消費情況',

  CLUSTER_CONSUMPTION_DESC:
    '集群資源消費情況以集群為維度統計集群，節點，項目的CPU、內存、存儲等資源消費情況',
  CLUSTER_RESOURCE_CONSUMPTION_DESC:
    '<strong>集群</strong> 的CPU、內存、存儲等資源消費情況',
  CLUSTER_NODE_CONSUMPTION_DESC:
    '集群中 <strong>節點</strong> 的CPU、內存、存儲等資源消費情況',
  'Workspace Consumption': '企業空間(項目)資源消費情況',
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
  'Max Usage': '最大用量',
  'Min Usage': '最小用量',
  'Meter CPU Usage': 'CPU 用量',
  'Meter Memory Usage': '內存 用量',
  'Meter Volume Usage': '存儲卷 用量',
  'Meter Net Received Usage': '網絡流入 用量',
  'Meter Net Transmitted Usage': '網絡流出 用量',
  'Total Consumer Meaning': '共消費表示什麼？',
  'Total Consumer Desc':
    '共消費表示在當前對帳週期中每個計費採樣點的資源用量之和',
  TIMERANGE_MORE_30DAY_MSG:
    '結束時間與開始時間的間隔大於 30 天時，時間間隔最小為 1 天',
  TOTAL_COST: '總金額({unit})',
  '￥': '￥',
  $: '$',
  Price: '價格',
  PRICE_CONFIG_DESC: '暫未配置價格信息',
  METER_RESOURCE_DESC: '最近 1 小時的消費統計',
  'No cluster with metering module enabled': '暫無啟用計量模塊的集群',
  INVALID_METERING: '未開啟消費統計',
}
