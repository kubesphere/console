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
  SERVICE_PL: '服務',
  SERVICE_DESC: '服務（Service）提供一種抽象的方法，將運行在容器组（Pod）上的應用程式公開為網路服務。',
  // List
  SERVICE_EMPTY_DESC: '請創建一個服務。',
  UNKNOWN: '未知',
  EXTERNAL_ACCESS: '外網訪問',
  INTERNAL_ACCESS_PL: '內網訪問',
  // List > Edit YAML
  // List > Edit Service
  UNKNOWN_SERVICE_TYPE: '未知服務類型',
  // List > Delete
  SERVICE: '服務',
  SERVICE_LOW: '服務',
  // List > Create
  INTERNAL_ACCESS_MODE: '内部訪問模式',
  CREATE_SERVICE: '創建服務',
  // List > Create > Basic Information
  SERVICE_NAME_DESC: '名稱只能包含小寫字母、數字和連字符號（-），必須以小寫字母開頭並以小寫字母或數字结尾，最長 63 個字元。',
  // List > Create > Service Settings
  VIRTUAL_IP_TITLE: '虚擬 IP 地址',
  INTERNAL_DOMAIN_NAME: '内部域名',
  CONTAINER_PORT: '容器通訊埠',
  INVALID_PORT: '通訊埠無效。',
  PORT_EMPTY: '請輸入通訊埠',
  ENTER_SELECTOR_TIP: '請設置工作負載選擇器。',
  Ports: '通訊埠',
  SPECIFY_WORKLOAD: '指定工作負載',
  SELECT_WORKLOAD_DESC: '使用工作負載的標籤作為選擇器。',
  VIRTUAL_IP_DESC: '為服務分配虚擬 IP 地址，可通過虚擬 IP 地址在集群内部訪問服務。',
  INTERNAL_DOMAIN_NAME_DESC: '不為服務分配 IP 地址，可通過集群的 DNS 機制在集群内部訪問服務。',
  SERVICE_PORTS_DESC: '設置容器通訊埠和服務通訊埠。',
  NO_WORKLOAD_MATCH_SELECTOR: '没有工作負載匹配目前選擇器。',
  WORKLOADS_MATCH_SELECTOR_SI: '目前選擇器（{selector}）與 {count} 個工作負載匹配。',
  WORKLOADS_MATCH_SELECTOR_PL: '目前選擇器（{selector}）與 {count} 個工作負載匹配。',
  WORKLOAD_SELECTOR: '工作負載選擇器',
  SERVICE_SETTINGS: '服務設置',
  // List > Create > Service Settings > Workload Selector > View Details
  TOTAL_WORKLOADS_VALUE: '工作負載總數：{count}',
  // List > Create > Advanced Settings
  STICKY_SESSION: '會話保持',
  MAXIMUM_STICKINESS_DURATION: '最大會話保持時間（s）',
  STICKY_SESSION_DESC: '設置系統在指定的時間内將同一個會話中来自同一個用戶端的請求全部轉發給同一個容器組。',
  SERVICE_EXTERNAL_ACCESS_DESC: '設置從集群外訪問服務的方式。',
  ACCESS_NODEPORT_TIP: '通過集群節點的對應通訊埠來訪問服務。',
  ACCESS_LOADBALANCER_TIP: '通過負載平衡器來訪問服務。',
  WORKLOAD_ANNOTATIONS: '工作負載註釋',
  LABEL_FORMAT_DESC: '標籤的鍵和值只能包含字母、數字、連字號（-）、底線（_）和句點（.），必須以數字或字母開頭和結尾。鍵和值分别最長 63 個字元（如鍵包含域名則最長 253 個字元）。'
};