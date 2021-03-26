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
  'Log Management': '紀錄管理',
  'Search Rule': '查詢規則',
  TOTAL_LOGS:
    '總共收錄了 <span class={className}>{containers}</span> 個容器<br/> <span class={className}> {logs} </span> 條紀錄資訊',
  LOG_DATE: 'YYYY年MM月DD日HH時',
  EVENT_DATE: 'YYYY年MM月DD日0時',
  topic: '主題',
  Keyword: '關鍵字',
  'Region Data': '元數據',
  'Refresh Rate': '刷新頻率',
  'Back to previous': '返回上一級',
  'Log Start Time': '紀錄起始時間',
  'Current Statistics Start Time': '本次統計起始時間',
  'Log trends in the last 12 hours': '最近 12 小時紀錄總數變化趨勢',
  'Search Logs by': '通過{field}查詢紀錄',
  'KeyWord Log Query Tip':
    '請輸入關鍵字查詢紀錄, 還可以通過 “Error” “Fail” “Fatal” “Exception ” “Warning” 等關鍵字查詢錯誤紀錄',
  'Project Log Query Tip': '可以根據項目名稱查看相關的紀錄資訊',
  'Workload Log Query Tip': '可以根據工作負載名稱查看相關的紀錄資訊',
  'Container Log Query Tip': '可以根據容器名稱查看相關的紀錄資訊',
  'Pod Log Query Tip': '可以根據容器組名稱查看相關的紀錄資訊',
  'Event trends in the last 12 hours': '最近 12 小時事件總數變化趨勢',
  'Search Events by': '通過{field}查詢事件',
  'Workspace Event Query Tip': '可以根據企業空間查看相關的事件資訊',
  'Project Event Query Tip': '可以根據項目查看相關的事件資訊',
  'Resource Type Event Query Tip': '可以根據資源類型查看相關的事件資訊',
  'Resource Name Event Query Tip': '可以根據資源名稱查看相關的事件資訊',
  'Reason Event Query Tip': '可以根據原因查看相關的事件資訊',
  'Message Event Query Tip': '可以根據消息查看相關的事件資訊',
  'Category Event Query Tip': '可以根據類别查看相關的事件資訊',
  'Pod Event Query Tip': '可以根據容器組查看相關的事件資訊',
  'Event statistics': '事件統計',
  'Time topology': '時間拓撲圖',
  'Display Content': '顯示内容',
  'Search Result': '搜尋結果',
  'Please enter a filter to search for logs.': '請輸入條件過濾紀錄',
  'Log Query': '紀錄查詢',
  'Log statistics': '紀錄統計',
  'Auditing statistics': '操作審計統計',
  'Exact Query': '精準匹配',
  'Fuzzy Query': '模糊匹配',
  'Log Collections': '紀錄收集',

  'Resource Name & Type': '資源名稱與類型',

  'Search Auditing Logs by': '通過{field}查詢審計',
  'Workspace Auditing Query Tip': '可以根據企業空間查看相關的操作審計',
  'Project Auditing Query Tip': '可以根據項目查看相關的操作審計',
  'Resource Name Auditing Query Tip': '可以根據資源名稱查看相關的操作審計',
  'Resource Type Auditing Query Tip': '可以根據資源類型查看相關的操作審計',
  'Verb Auditing Query Tip': '可以根據操作行為查看相關的操作審計',
  'Status Code Auditing Query Tip': '可以根據狀態碼查看相關的操作審計',
  'Operation Account Auditing Query Tip': '可以根據操作帳號查看相關的操作審計',
  'Source IP Auditing Query Tip': '可以根據來源IP查看相關的操作審計',
  'Auditing log trends in the last 12 hours':
    '最近 12 小時操作審計總數變化趨勢',

  TOTAL_AUDITING_TODAY:
    '今日總共收錄了 <span class={className}> {auditing} </span> 條操作審計',
  NO_AUDITING_TODAY: '今日沒有收錄的操作審計',

  LOG_COLLECTION_DESC:
    '系統將收集每個容器的標準輸出和標準錯誤輸出紀錄，並將其發送到一個或多個目標服務',
  'Add Log Receiver': '添加紀錄接收者',
  EMPTY_LOG_COLLECTIONS:
    '暫時沒有設置紀錄收集器，您可以添加紀錄收集器將紀錄導出到外埠的紀錄收集工具中',
  LOG_COLLECTION_TIPS:
    '每種類型的紀錄接收者只能添加一個，如果已存在則只能修改，不可以再添加',

  Address: '地址',
  'Service Address': '服務地址',
  'Add Service Address': '添加服務地址',
  'Please input service address': '請輸入服務地址',

  URL_SYNTAX_ERROR: 'URL 語法錯誤',
  'Please enter the address': '請輸入地址',
  LOG_COLLECTION_ES_URL_TIPS:
    '預設使用系統部署的 Elasticsearch，也可以輸入外部或者單獨部署的 Elasticsearch 地址',
  LOG_COLLECTION_ES_INDEX_TIPS:
    '預設按照日期分類建立索引，例：索引前綴-2020.01.01',
  LOG_COLLECTION_FLUENTD_URL_TIPS: '輸入接收紀錄的 Fluentd 的地址',

  'Refresh Interval': '刷新頻率',
  'Recently Updated': '最近刷新',
  'Recently Configured Updated': '最近配置更新',
  Collecting: '收集中',
  'Change Status': '更改狀態',
  'Release Collection': '釋放收集',
  'Delete Log Receiver': '刪除紀錄接收者',
  'Log Receiver': '紀錄接收者',
  Activate: '啟用',
  'Real-Time Data': '實時數據',
  'Index Prefix': '索引前缀',

  TOOLBOX_SHIFT_TIPS: ' 👻 Shift + 鼠標左鍵 可以在新視窗中打開',
  'Hide help information': '不再顯示幫助資訊',
  ES_DESC: 'Elasticsearch 是分布式、RESTful 風格的搜索和分析引擎',
  KAFKA_DESC: 'Kafka 是流行的開源流處理平台',
  FLUENTD_DESC: 'Fluentd 是提供統一紀錄處理層的開源數據收集器',
  LOG_COLLECTION_ENABLE_TIPS: '新的狀態需 1 分鐘左右生效',
  'Passwords must be at least 6 characters long': '密碼至少 6 個字元',
  CONTAINER_REAL_TIME_LOGS_UNSUPPORTED_TIPS:
    '容器在目前狀態下不支持實時紀錄，請稍後再試',
  TOTAL_LOGS_TODAY:
    '今日總共收錄了 <span class={className}>{containers}</span> 個容器<br/> <span class={className}> {logs} </span> 條紀錄資訊',
  START_REAL_TIME_LOG: '開始實時紀錄',
  STOP_REAL_TIME_LOG: '關閉實時紀錄',
  LOG_EXPORT: '紀錄導出',
  CUSTOM_MONITORING_DASHBOARD: '自定義監控面板',
  CREATE_CUSTOM_MONITORING_DASHBOARD: '創建自定義監控面板',
  SELECT_SUITABLE_MONITORING_TEMPLATE: '選擇適合您應用應用模板',
  CUSTON_MONITORING_TEMPLATE_DESC: '監控面板將根據應用類型生成預設的面板配置',
  SERVICE_BUILT_INTERFACE: '服務已内置監控數據抓取介面',
  TOTAL_EVENTS_TODAY:
    '今日總共收錄了 <span class={className}> {events} </span> 條事件',
  NO_EVENTS_TODAY: '今日沒有收錄的事件',

  'No cluster with event query enabled': '暫無啟用事件查詢的集群',
  'No cluster with auditing module enabled': '暫無啟用審計模組的集群',
  'No cluster with logging module enabled': '暫無啟用紀錄模組的集群',

  LOGGING_LOG_COLLECTOR: '紀錄接收者',
  EVENTS_LOG_COLLECTOR: '事件紀錄接收者',
  AUDITING_LOG_COLLECTOR: '審計紀錄接收者',
}
