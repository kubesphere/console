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
  JOB_STATUS: '任務狀態',
  RELEASE_JOBS: 'Release Jobs',
  RELEASE_MODE_PL: '灰度策略',
  RELEASE_MODE: 'Release mode',
  GRAY_RELEASE_STRATEGY_SI: 'Grayscale Release Strategy',
  TOTAL_GRAY_RELEASE_JOB: '共計 {num} 個灰度任務',
  TOTAL_GRAY_RELEASE_JOBS: '共計 {num} 個灰度任務',
  NO_GRAYSCALE_RELEASE_JOB_FOUND: '沒有找到灰度發佈任務',
  NO_GRAYSCALE_RELEASE_TASK_FOUND_DESC: '請創建一個灰度發布任務。',

  BLUE_GREEN_DEPLOYMENT: '藍綠部署',
  CREATE_BLUE_GREEN_DEPLOYMENT_JOB: 'Create Blue-Green Deployment Job',
  CREATE_CANARY_RELEASE_JOB: 'Create Canary Release Job',
  CREATE_TRAFFIC_MIRRORING_JOB: 'Create Traffic Mirroring Job',
  CANARY_RELEASE: '金絲雀發佈',
  BLUE_GREEN_DEPLOYMENT_LOW: 'blue-green deployment',
  CANARY_RELEASE_LOW: 'canary release',
  TRAFFIC_MIRRORING_LOW: 'traffic mirroring',
  'A/B Testing': 'A/B 測試',
  TRAFFIC_MIRRORING: '流量鏡像',

  traffic: '流量',

  GRAY_RELEASE_JOB_NAME: '灰度任務名稱',
  GRAYSCALE_RELEASE_COMPONENT_PL: '灰度組件',
  NEW_VERSION_SETTINGS: 'New Version Settings',
  NEW_VERSION_NUMBER: 'New Version Number',
  GRAYSCALE_RELEASE_COMPONENT: '灰度組件',
  GRAYSCALE_RELEASE_VERSION_TCAP: '灰度版本',
  GRAYSCALE_RELEASE_VERSION_NUMBER: '灰度版本號',
  VERSION_COMPARISON: '版本對比',
  STRATEGY_CONFIGURATIONS_TCAP: '策略配置',

  CREATE_JOB: '發佈任務',

  RULE_DESCRIPTION: '規則描述',
  TRAFFIC_DISTRIBUTION: '流量比例',

  'Version Off': '版本下線',
  'Take Over': '接管所有流量',

  'Edit Grayscale Release Job': '編輯灰度任務',

  SELECT_GRAY_COMPONENT_TIP: '請選擇一個灰度組件。',

  EXACT_MATCH: '完全匹配',
  REGEX_MATCH: '正則匹配',
  PREFIX_MATCH: '前綴匹配',

  TRAFFIC_CONTROL: '流量控制',

  COOKIE_EXACT_MATCH: 'Cookie (exact match)',
  COOKIE_REGEX_MATCH: 'Cookie (regex match)',
  HEADER_EXACT_MATCH: 'Header (exact match)',
  HEADER_REGEX_MATCH: 'Header (regex match)',
  URL_PREFIX_MATCH: 'URL (prefix match)',
  URL_EXACT_MATCH: 'URL (regex match)',
  'Operating System': '操作系統',
  HEADER: '自定義 Header',
  'Mirrored traffic is only receiving traffic, no service':
    '鏡像流量只負責接收流量，不提供服務',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    '目前版本未上線，您可以讓該版本接管所有流量，使該版本上線',
  MIRRORED_TRAFFIC: '鏡像流量',

  'version number is invalid': '版本號不可用。',

  'Not online': '未上線',

  DELETE_JOB: '任務下線',

  JOB_OFFLINE_SUCCESSFULLY: '任務下線成功。',

  REAL_TIME_TRAFFIC_DIST_TCAP: '實時流量分布',
  TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC:
    'A copy of traffic is sent to the new version for testing.',
  BLUE_GREEN_TRAFFIC_DISTRI_DESC:
    'The new version or old version receives all traffic.',
  ALLOCATE_TRAFFIC_DESC: '將所有流量按比例分配給灰度組件。',

  SERVICE_VERSION_RECEIVE_ALL_TRAFFIC:
    'The version <b>{version}</b> has taken over all traffic.',

  TRAFFIC_MONITORING: '流量監控',
  TRAFFIC: 'Traffic',
  SUCCESSFUL_REQUEST_RATE: '請求成功率',

  TRAFFIC_IN_LAST_FIVE_MINUTES: '最近五分鐘流量',

  UNFINISHED_GRAY_JOB: '存在未完成的灰度任務',
  UNSUPPORTED_WORKLOAD_TYPE: '不支持該工作負載類型',
  NO_WORKLOAD_FOUND_TIP: '未找到工作負載',

  CREATE_GRAYSCALE_RELEASE_JOB: '創建灰度任務',

  REQUEST_PARAMETERS: '灰度版本訪問規則',

  CLIENT_OS: '流量來自於以下操作系統',
  OS: 'OS',

  NEW_VERSION_NUMBER_EMPTY_DESC: '請輸入灰度版本號。',

  RESTORE: '恢復',

  BLUE_GREEN_STRATEGY_DESC: '兩個版本。',
  SELECT_VERSION: '流量規則',
  TAKE_OFFLINE: '下線此版本',
  TAKE_OVER: 'Take Over',
  TAKE_ONLINE: '接管所有流量',
  SPECIFY_TRAFFIC_DISTRIBUTION: '按流量比例下發',
  SPECIFY_REQUEST_PARAMETERS: '按請求内容下發',

  'Deploy sample application': '部署範例應用',
  DEPLOY_SAMPLE_APP: '部署範例應用',
  POLICY_REQUEST_CONTENT_TIP:
    '如果端口協定非 HTTP、HTTP2 或 gRPC，則按請求内容下發不可用。',

  NO_SERVICE_MESH_TIP: '未開啟應用治理的應用無法使用灰度發佈',

  BLUE_GREEN_DEPLOYMENT_DESC:
    '藍綠部署在保留舊版本的同時部署新版本，確保不停機。兩個版本中總有一個版本處於在線狀態接收所有流量，另一個版本則保持待機，如果有問題，可以快速回滾至舊版本。',
  CANARY_RELEASE_DESC:
    '金絲雀發佈將一部分實際流量引入一個新版本進行測試，測試新版本的性能和表現，在保證系統整體穩定運行的前提下，盡早發現新版本在實際環境上的問題。',
  AB_TESTING_DESC:
    '當產品已經相對穩定，同時又有新的業務需求或者產品形態，在保證業務的穩定運行前提下，獲取產品更新或者優化是否達到合理的預期。',
  TRAFFIC_MIRRORING_DESC:
    '流量鏡像用來更為真實地測試新版本，提前發現問題，同時不對生產環境產生影響，從而，提高版本發佈的安全性可靠性。',
  GRAY_RELEASE_VERSION_DESC: '將新版本引入已有的應用服務網格中',
  NEW_VERSION_NUMBER_DESC: '只能包含小寫字母及數字，長度在 16 個字元内',
  NEW_VERSION_NUMBER_INVALID_DESC:
    'Invalid new version number. The new version number can contain only lowercase letters and numbers. The maximum length is 16 characters.',
  POLICY_CONFIG_DESC:
    '基於流量比例發佈：根據流量比例配置規則，將從原版本中切分指定比例的流量到灰度版本。',

  MIRROR_POLICY_DESC:
    '流量鏡像將生產環境的流量復製到灰度版本中，在新版本上線到真實環境之前使用實時用戶流量對它進行測試。</br>因此，流量鏡像可以降低直接在生產環境進行變更所帶來的風險。',

  DELETE_GRAYSCALE_RELEASE_JOB_DESC:
    '您需要選擇一個下線版本，系統會保留一個可用版本並且自動將流量全部切換至該可用版本，保證服務正常運行。',
  NEW_VERSION_TAKEOVER_DESC:
    'The new version <b>{newVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the old version <b>{oldVersion}</b> will be also be deleted.',
  OLD_VERSION_TAKEOVER_DESC:
    'The old version <b>{oldVersion}</b> is receiving all traffic. If you delete the current grayscale release job, the new version <b>{newVersion}</b> will be also be deleted.',

  GRAYSCALE_RELEASE_DESC:
    'Grayscale release represents an important method of application iteration in the production environment. You can choose different release methods for the smooth transition as you upgrade your applications to a new version.',

  SPECIFY_REQUEST_PARAMETERS_DESC:
    '根據請求内容配置規則，只有請求内容中滿足特定條件的流量會切分到灰度版本上。該策略只對直接訪問入口服務有效。',

  ADJUST_TRAFFIC_DISTRIBUTION_DESC:
    'Are you sure you want to send {ratioNew}% of traffic to the new version <b>{newVersion}</b> and {ratioOld}% to the old version <b>{oldVersion}</b>?',
  CANARY_BY_TRAFFIC_DESC:
    '根據流量比例，對組件 <b>{component}</b> 的 {ratio}% 的請求流量會轉發到灰度版本 <b>{newVersion}</b>。',

  DEPLOY_APP_CONFIRM: '確認部署範例應用?',

  DEPLOY_APP_TIP: '您即將部署範例應用 {name}',

  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    '目前項目中沒有找到已開啟應用治理的網關，因此您無法部署範例應用。請聯繫您的項目管理員在【高級設置】中設置外網訪問方式',

  PREREQUEST_FOR_USE_GRAYRELEASE_Q: '使用灰度發佈的前提條件?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    '使用灰度發佈功能前，您需要創建自定義應用並且開啟應用治理功能。',

  // Grayscale release detail page
  GRAY_COMPONENT_DESC:
    'The grayscale release components used to serve the traffic.',
  TRAFFIC_LOW: '流量',
  VERSION_TRAFFIC_PERCENT: '{version} traffic {percent}%',

  // Grayscale release components tab
  GRAY_APP_NAME: '應用：{name}',
  GRAY_WORKLOAD_TYPE: '負載類型：',

  // Grayscale release version tab
  NEW_VERSION_NUMBER_EXIST_DESC:
    'Deployment {name} exists. Please enter another version number.',
  INIT_CONTAINER: 'Init 容器',
  INIT_CONTAINER_VALUE: 'Init Container: {value}',
  CONTAINER_VALUE: 'Container: {value}',
  GRAYSCALE_IMAGE: '鏡像：{image}',

  // Grayscale strategy configurations tab
  GRAYSCALE_VERSION: '版本：{version}',
  GRAYSCALE_REPLICA_SI: '副本數量：{count}',
  GRAYSCALE_REPLICA_PL: '副本數量：{count}',

  // Canary Strategy Tab
  COOKIE: 'Cookie',

  // Grayscale Release Job List
  GRAYSCALE_JOB_STRATEGY: '灰度策略',
  GRAYSCALE_JOB_COMPONENT: '灰度組件',
}
