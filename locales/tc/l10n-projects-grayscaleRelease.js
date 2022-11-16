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
  GRAYSCALE_RELEASE: '灰度發佈',
  // Release Modes
  BLUE_GREEN_DEPLOYMENT: '藍綠部署',
  CANARY_RELEASE: '金絲雀發佈',
  TRAFFIC_MIRRORING: '流量鏡像',
  BLUE_GREEN_DEPLOYMENT_DESC: '藍綠部署在保留舊版本的同時部署新版本，確保不停機。兩個版本中總有一個版本處於在線狀態接收所有流量，另一個版本則保持待機，如果有問題，可以快速回滾至舊版本。',
  CANARY_RELEASE_DESC: '金絲雀發佈將一部分實際流量引入一個新版本進行測試，測試新版本的性能和表現，在保證系統整體穩定運行的前提下，盡早發現新版本在實際環境上的問題。',
  TRAFFIC_MIRRORING_DESC: '流量鏡像用來更為真實地測試新版本，提前發現問題，同時不對生產環境產生影響，從而，提高版本發佈的安全性可靠性。',
  // Release Modes > Blue-Green Deployment > Create > Basic Information
  CREATE_BLUE_GREEN_DEPLOYMENT_TASK: 'Create Blue-Green Deployment Task',
  // Release Modes > Blue-Green Deployment > Create > Service Settings
  DESELECT: '取消選擇',
  SELECT: '選擇',
  SELECT_GRAY_COMPONENT_TIP: '請選擇一個灰度組件。',
  // Release Modes > Blue-Green Deployment > Create > New Version Settings
  REPLICA: 'Replica',
  REPLICA_PL: '副本數量',
  GRAYSCALE_REPLICAS_DESC: '指定副本數量',
  // Release Modes > Blue-Green Deployment > Create > Strategy Settings
  SELECT_VERSION: '流量規則',
  BLUE_GREEN_STRATEGY_DESC: '兩個版本。',
  TAKE_OFFLINE: '下線此版本',
  TAKE_OVER: 'Take Over',
  GRAYSCALE_VERSION: '版本：{version}',
  // Release Modes > Canary Release > Create
  CREATE_CANARY_RELEASE_TASK: 'Create Canary Release Task',
  // Release Modes > Canary Release > Create > Service Settings
  UNFINISHED_GRAY_TASK: 'Grayscale release in progress',
  NO_WORKLOAD_FOUND_TIP: 'No workload found',
  NO_SERVICE_MESH_TIP: '未開啟應用治理的應用無法使用灰度發佈',
  GRAY_APP_NAME: '應用：{name}',
  UNSUPPORTED_WORKLOAD_TYPE: '不支持該工作負載類型',
  // Release Modes > Canary Release > Create > New Version Settings
  VERSION_EXISTS: 'The version code already exists. Please enter another version code.',
  NEW_VERSION_NUMBER_EXIST_DESC: 'The workload {name} already exists. Please enter another version code.',
  INIT_CONTAINER: 'Init 容器',
  INIT_CONTAINER_VALUE: 'Init Container: {value}',
  CONTAINER_VALUE: 'Container: {value}',
  GRAYSCALE_IMAGE: '鏡像：{image}',
  NEW_VERSION_NUMBER: 'New Version Number',
  NEW_VERSION_NUMBER_EMPTY_DESC: '請輸入灰度版本號。',
  NEW_VERSION_SETTINGS: 'New Version Settings',
  NEW_VERSION_NUMBER_DESC: '只能包含小寫字母及數字，長度在 16 個字元内',
  NEW_VERSION_NUMBER_INVALID_DESC: 'Invalid new version number. The new version number can contain only lowercase letters and numbers. The maximum length is 16 characters.',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Request Parameters
  KEY_EQ_VALUE: 'Key=Value',
  HEADER: '自定義 Header',
  CLIENT_OS: '流量來自於以下操作系統',
  COOKIE: 'Cookie',
  SPECIFY_REQUEST_PARAMETERS_DESC: '根據請求内容配置規則，只有請求内容中滿足特定條件的流量會切分到灰度版本上。該策略只對直接訪問入口服務有效。',
  POLICY_REQUEST_CONTENT_TIP: '如果端口協定非 HTTP、HTTP2 或 gRPC，則按請求内容下發不可用。',
  SPECIFY_REQUEST_PARAMETERS: '按請求内容下發',
  REQUEST_PARAMETERS: '灰度版本訪問規則',
  EXACT_MATCH: '完全匹配',
  PREFIX_MATCH: '前綴匹配',
  REGEX_MATCH: '正則匹配',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Traffic Distribution
  CANARY_BY_TRAFFIC_DESC: '根據流量比例，對組件 <b>{component}</b> 的 {ratio}% 的請求流量會轉發到灰度版本 <b>{newVersion}</b>。',
  SPECIFY_TRAFFIC_DISTRIBUTION: '按流量比例下發',
  TRAFFIC: 'Traffic',
  TRAFFIC_DISTRIBUTION: '流量比例',
  // Release Modes > Traffic Mirroring > Create
  CREATE_TRAFFIC_MIRRORING_TASK: 'Create Traffic Mirroring Task',
  // Release Modes > Traffic Mirroring > Create > Strategy Settings
  // Release Tasks
  PREREQUEST_FOR_USE_GRAYRELEASE_Q: '使用灰度發佈的前提條件?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A: '使用灰度發佈功能前，您需要創建自定義應用並且開啟應用治理功能。',
  RELEASE_TASKS: 'Release Tasks',
  TCP_INBOUND_TRAFFIC: 'TCP 入站流量',
  TCP_OUTBOUND_TRAFFIC: 'TCP 出站流量',
  NO_DATA_SCAP: 'No data',
  REPLICA_COUNT_LOW: '副本',
  MIRROR_POLICY_DESC: '流量鏡像將生產環境的流量復製到灰度版本中，在新版本上線到真實環境之前使用實時用戶流量對它進行測試。</br>因此，流量鏡像可以降低直接在生產環境進行變更所帶來的風險。',
  // Release Tasks > Blue-Green Deployment > Task Status
  BLUE_GREEN_DEPLOYMENT_LOW: 'blue-green deployment',
  BLUE_GREEN_TRAFFIC_DISTRI_DESC: 'The new version or old version receives all traffic.',
  TRAFFIC_LOW: '流量',
  VERSION_TRAFFIC_PERCENT: '{version} traffic {percent}%',
  OFFLINE: 'Offline',
  OFFLINE_TIP: 'No service traffic is sent to this version. You can take the version online to make it take over all traffic.',
  // Release Tasks > Canary Release > Task Status
  CANARY_RELEASE_LOW: 'canary release',
  ADJUST_TRAFFIC_DISTRIBUTION_DESC: 'Are you sure you want to send {ratioNew}% of traffic to the new version <b>{newVersion}</b> and {ratioOld}% to the old version <b>{oldVersion}</b>?',
  ALLOCATE_TRAFFIC_DESC: '將所有流量按比例分配給灰度組件。',
  COOKIE_EXACT_MATCH: 'Cookie (exact match)',
  COOKIE_REGEX_MATCH: 'Cookie (regex match)',
  HEADER_EXACT_MATCH: 'Header (exact match)',
  HEADER_REGEX_MATCH: 'Header (regex match)',
  URL_PREFIX_MATCH: 'URL (prefix match)',
  URL_EXACT_MATCH: 'URL (regex match)',
  OS: 'OS',
  SERVICE_VERSION_RECEIVE_ALL_TRAFFIC: 'The version <b>{version}</b> has taken over all traffic.',
  RESTORE: '恢復',
  SUCCESSFUL_REQUEST_RATE: '請求成功率',
  TRAFFIC_IN_LAST_FIVE_MINUTES: '最近五分鐘流量',
  DELETE_GRAYSCALE_RELEASE_TASK_DESC: 'Please select a version to take over all traffic before deleting the grayscale release task.',
  GRAY_COMPONENT_DESC: 'The grayscale release components used to serve the traffic.',
  // Release Tasks > Traffic Mirroring > Task Status
  TRAFFIC_MIRRORING_LOW: 'traffic mirroring',
  MIRRORED_TRAFFIC: '鏡像流量',
  MIRRORED_TRAFFIC_TIP: 'Traffic mirroring does not actually expose the new version.',
  RELEASE_MODE_PL: '灰度策略',
  RELEASE_MODE: 'Release mode',
  NEW_VERSION_TAKEOVER_DESC: 'The new version <b>{newVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the old version <b>{oldVersion}</b> will be also be deleted.',
  OLD_VERSION_TAKEOVER_DESC: 'The old version <b>{oldVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the new version <b>{newVersion}</b> will be also be deleted.',
  GRAYSCALE_REPLICA_SI: '副本數量：{count}',
  GRAYSCALE_REPLICA_PL: '副本數量：{count}',
  TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC: 'A copy of traffic is sent to the new version for testing.',
  // Release Tasks > Task Status > Edit
  EDIT_GRAYSCALE_RELEASE_TASK: 'Edit Grayscale Release Task',
  // Release Tasks > Canary Release > Traffic Distribution
  ADJUST_TRAFFIC_DISTRIBUTION: 'Adjust Traffic Distribution'
};