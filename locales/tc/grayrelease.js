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
  'Grayscale Release': '灰度發佈',
  'Job Status': '任務狀態',

  GRAY_RELEASE_CATEGORIES: '灰度策略',
  TOTAL_GRAY_RELEASE_JOBS: '共計 {num} 個灰度任務',
  NO_GRAY_RELEASE_JOBS_TIP: '暫時沒有進行中的灰度任務',
  NO_GRAY_RELEASE_JOBS_TIP_2: '您可以綁定灰度策略進行灰度任務發佈',

  'Blue-green Deployment': '藍綠部署',
  'Canary Release': '金絲雀發佈',
  'A/B Testing': 'A/B 測試',
  'Traffic Mirroring': '流量鏡像',

  traffic: '流量',

  'Release Job Name': '發佈任務名稱',
  'Grayscale Release Components': '灰度組件',
  'Grayscale Release Component': '灰度組件',
  'Grayscale Release Version': '灰度版本',
  'Grayscale Release Version Number': '灰度版本號',
  'Grayscale Release Strategy': '灰度策略',
  'Version Comparison': '版本對比',
  'Policy Config': '策略配置',

  'Create Job': '發佈任務',

  'Rule Description': '規則描述',
  'Traffic Ratio': '流量比例',

  'Version Off': '版本下線',
  'Take Over': '接管所有流量',

  'Edit Grayscale Release Job': '編輯灰度任務',

  'Please select a grayscale release component': '請選擇一個灰度組件',

  'Exact Match': '完全匹配',
  'Regex Match': '正則匹配',
  'Prefix Match': '前綴匹配',

  'Traffic Control': '流量控制',
  'Introduce traffic that meets the following rules into grayscale version':
    '將符合以下規則的流量引入灰度版本',

  'Cookie Content': 'Cookie 内容',
  'Operating System': '操作系統',
  'Custom Header': '自定義 Header',
  'Mirrored traffic is only receiving traffic, no service':
    '鏡像流量只負責接收流量，不提供服務',
  'The current version is not online, you can let this version take over all traffic and bring it online.':
    '目前版本未上線，您可以讓該版本接管所有流量，使該版本上線',
  'Mirrored traffic': '鏡像流量',

  'version number is invalid': '版本號不可用',

  'Not online': '未上線',

  'Job offline': '任務下線',

  'Job offline Successfully': '任務下線成功',

  'Real-time traffic distribution': '實時流量分布',
  'Real-time traffic ratio': '流量實時占比',
  'Allocate all traffic proportionally to grayscale release components':
    '將所有的流量按比例分配給灰度組件',

  'Has taken over all traffic': '已接管全部流量',

  'Traffic monitor': '流量監控',
  'Request success rate': '請求成功率',
  'Request duration': '請求延遲',

  'Traffic of last five minutes': '最近五分鐘流量',

  'Unfinished grayscale release jobs exist': ' 存在未完成的灰度任務',
  'Unsupported workload type': '不支持該工作負載類型',
  'No workload found': '未找到工作負載',

  'Create Grayscale Release Job': '發佈灰度任務',

  'Grayscale release version access rule': '灰度版本訪問規則',

  'Traffic comes from the following operating systems':
    '流量來自於以下操作系統',

  'Please input grayscale release version': '請輸入灰度版本號',

  Recover: '恢復',

  'Two Versions': '兩個版本',
  'Traffic Rules': '流量規則',
  'Version offline': '下線此版本',
  'Take over all traffic': '接管所有流量',
  'Forward by traffic ratio': '按流量比例下發',
  'Forward by request content': '按請求内容下發',

  'Deploy sample application': '部署範例應用',
  'Deploy Sample App': '部署範例應用',
  POLICY_REQUEST_CONTENT_TIP:
    '端口協定非 HTTP, HTTP2 或 gRPC, 不能發佈按内容分配的策略',

  NO_SERVICE_MESH_TIP: '未開啟應用治理的應用無法使用灰度發佈',

  BLUE_GREEN_DEPLOYMENT_DESC:
    '藍綠發佈提供了一種不停機的部署方式，在 <strong> 保留舊版本的同時部署新版本 </strong>。兩個版本中總有一個版本處於在線狀態接收所有流量，另一個版本則保持待機，如果有問題可以快速處理。',
  CANARY_RELEASES_DESC:
    '將一部分實際流量引入一個新版本進行測試，測試新版本的性能和表現，在保證系統整體穩定運行的前提下，盡早發現新版本在實際環境上的問題。',
  AB_TESTING_DESC:
    '當產品已經相對穩定，同時又有新的業務需求或者產品形態，在保證業務的穩定運行前提下，獲取產品更新或者優化是否達到合理的預期。',
  TRAFFIC_MIRROR_DESC:
    '流量鏡像用來更為真實地測試新版本，提前發現問題，同時不對生產環境產生影響，從而，提高版本發佈的安全性可靠性。',
  GRAY_RELEASE_VERSION_DESC: '將新版本引入已有的應用服務網格中',
  GRAY_RELEASE_VERSION_FORMAT_DESC:
    '只能包含小寫字母及數字，長度在 16 個字元内',
  POLICY_CONFIG_DESC:
    '基於流量比例發佈：根據流量比例配置規則，將從原版本中切分指定比例的流量到灰度版本。',

  MIRROR_POLICY_DESC:
    '微服務讓我們可以更快地實現交付。在追求快速的同時保證業務的穩定性。流量鏡像可以降低變更所带来的風險，並且同時讓生產環境上的新變化變得更為安全。</br>流量鏡像將生產環境的流量複製灰度版本中，在真正負載實時流量（也就是客戶流量）之前驗證新版本是不是沒有問題',

  JOB_OFFLINE_WARNING:
    '為了保證服務的正常運行，任務下線需要將需要保留一個可用版本並且將流量全部切換至該版本。我们需要您選擇一個需要下線的版本。系統會自動將全部流量切換至該另外的可用版本。',
  JOB_OFFLINE_INFO: '現在可下線任務, 版本 {version} 將被移除。',

  GRAY_RELEASE_DESC:
    '灰度發佈是疊代的軟體產品在生產環境安全上線的一種重要手段，提供軟體版本部署升級平滑過渡的一種發佈方式。',
  GRAYSCALE_RELEASE_DESC:
    '灰度發佈是疊代的軟體產品在生產環境安全上線的一種重要手段，提供軟體版本部署升級平滑過渡的一種發佈方式。',

  GRAY_RELEASE_BY_CONTENT_TIP:
    '基於請求内容發佈：根據請求内容配置規則，只有請求内容中滿足特定條件的流量會切分到灰度版本上。該策略只對直接訪問的入口服務有效。',

  RATIO_MODIFY_NOTIFY_CONTENT:
    '您已將{version}版本的目標流量比例調整至 {ratio}%  , 您也可以繼續調整目標流量比例，或者使它立即生效。',
  CANARY_BY_TRAFFIC_DESC:
    '根據基於流量比例規則，對組件 {component} 的訪問滿足 {ratio}% 的請求流量會轉發到灰度版本 {newVersion}',

  DEPLOY_APP_CONFIRM: '確認部署範例應用?',

  DEPLOY_APP_TIP: '您即將部署範例應用 {name}',

  DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP:
    '目前項目中沒有找到已開啟應用治理的網關，因此您無法部署範例應用。請聯繫您的項目管理員在【高級設置】中設置外網訪問方式',

  PREREQUEST_FOR_USE_GRAYRELEASE_Q: '使用灰度發佈的前提條件?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A:
    '使用灰度發佈功能您需要創建自定義應用，並且將需要灰度發佈的服務開啟服務治理功能。',
}
