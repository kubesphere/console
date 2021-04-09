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
  application: '應用',
  Applications: '應用',
  'Deployed Applications': '已部署應用',
  'Deploy New Application': '部署新應用',
  'Deploy App': '部署應用',
  'Create Composing Application': '構建應用',
  'App Template': '應用模板',
  Deploy: '部署',
  'Application Type': '應用類型',
  TOTAL_APPS: '共計 {num} 個應用',
  TOTAL_COLLECTIONS: '共計 {num} 個接收者',
  Upgrade: '升級',
  Rollback: '回滾',

  'Create Application by Service': '通過服務構建應用',

  'Application Name': '應用名稱',
  'Application Version(Optional)': '應用版本(可選)',
  'Application Governance': '應用治理',
  'Application Components': '應用組件',
  'Application Component': '應用組件',
  'Application Route': '應用路由',
  'Traffic Management': '流量管理',

  'Application governance is not enabled': '應用治理未啟用',

  'Build an app by services': '通過服務構建應用',
  'Build an app by app template': '應用模板部署',
  'Choose existing services or create new service components to build an app':
    '選擇已有服務或者新建服務組件來構建應用',
  'Deploy applications with one-click application templates provided by Kubesphere':
    '通過 Kubesphere 提供的應用模板一鍵部署應用',
  'Sample apps can help you get started with app creation and app governance':
    '示例應用可以幫助您快速入手應用創建, 以及應用治理功能',

  'Add Service': '添加服務',
  'Add Component': '添加組件',
  'Edit Component': '編輯組件',
  'Add New Component': '添加新組件',

  'Application Icon': '應用圖示',

  'Component Version': '組件版本',

  'Please input an application name': '請輸入應用名稱',

  'Service components should not be empty': '服務組件不能為空',
  'Please finish the sub form first': '請完成子表單的編輯',

  'Service Ports': '服務端口',
  'Traffic Entry': '流量入口',

  'App Description': '應用描述',

  'Composing Apps': '自制應用',
  'Composing App': '自制應用',

  'Workload Type': '負載類型',

  'Current Version': '目前版本',

  'Cluster Selection': '集群選擇',

  'Traffic Monitoring': '流量監測',

  'Traffic (requests per second)': '流量(每秒請求)',
  'TCP - Inbound Traffic': 'TCP - 入站流量',
  'TCP - Outbound Traffic': 'TCP - 出站流量',

  'Connection timeout': '連接超時時間',
  'TCP connection timeout.': 'TCP 連接超時時間。',
  'Maximum requests': '最大請求數',
  'Maximum pending requests': '最大等待請求數(等待列隊的長度)',
  'Max request retries': '最大請求重試次數',
  'The maximum number of retries to the target host within the specified time.':
    '在指定時間内對目標主機最大重試次數。',
  'Max number of requests per connection': '每條連接最大請求數',
  'If the maximum number of requests in the backend connection is set to 1, the keep alive feature is disabled.':
    '對後端連接中最大的請求數量若設為1則會禁止 keep alive 特性。',
  'Max number of connections': '最大連接數',
  'The maximum number of HTTP1 or TCP connections to the target host.':
    '到目標主機 HTTP1 或 TCP 連接的最大數量。',
  'Load balance algorithm': '負載平衡算法',
  'Session retention': '會話保持',

  Method: '方式',
  'According to the HTTP header': '根據 HTTP header',

  On: '開啟',
  Off: '關閉',

  Traffic: '流量',
  Send: '發送',
  Receive: '接收',

  'Success rate': '成功率',

  'Circuit Breaker': '熔斷器',

  APPLICATIONS_DESC:
    '應用為用戶提供完整的業務功能，由一個或多個特定功能的組件組成。',
  APP_DEPLOYMENT_DESC:
    '輕量化、可移植、自包含的軟體封裝技術，使應用可以在幾乎任何地方以相同的方式運行。',
  APP_GOVERNANCE_DESC:
    '開啟應用治理後會在每個組件中以 SideCar 的方式注入 Istio-proxy 容器 <a href="https://istio.io/docs/setup/kubernetes/additional-setup/sidecar-injection/" target="_blank">了解更多</a>',

  COMPONENT_VERSION_DESC: '最長 16 個字元，只能包含小寫字母及數字',

  APP_ICON_TIP: '點擊上傳應用圖示，尺寸最大為 120px * 120px',

  CLUSTER_NAME_DESC:
    '最長 14 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母或數字開頭及結尾',

  SERVICE_PORT_NAME_DESC:
    '端口的名字必須遵循如下格式 <protocol>[-<suffix>]，可以是 http、http2、 grpc、 mongo、 或者 redis 作為 <protocol> ，這樣才能使用 Istio 的路由功能。例如 name: http2-foo 和 name: http 都是有效的端口名稱，而 name: http2foo 不是。',

  LB_ALG_DESC:
    '支持標準的負載平衡算法</br>ROUND_ROBIN：輪詢，預設負載平衡算法。</br>LEAST_CONN：随機選取兩個健康的主機，再從所選取的兩個主機中選擇一個連接數較少的主機。</br>RANDOM：從所有健康的主機中，随機選取一個。',
  LB_ROUND_ROBIN: '輪詢(ROUND_ROBIN)',
  LB_LEAST_CONN: '最小連接數(LEAST_CONN)',
  LB_RANDOM: '随機(RANDOM)',

  'Last {num} records': '最近 {num} 條紀錄',
  'Last {hour} hour': '最近 {hour} 小時',
  'Last {hour} hours': '最近 {hour} 小時',
  'Last {day} days': '最近 {day} 天',

  APP_WORKLOAD_TYPE_DESC: '支持無狀態服務(部署)及有狀態服務(有狀態副本集)',

  SERVICE_DEPLOYMENT: '無狀態服務(部署)',
  SERVICE_STATEFULSET: '有狀態服務(有狀態副本集)',

  'Temporarily unable to use traffic management': '暫時無法使用流量治理',
  'Temporarily unable to use tracing': '暫時無法使用 Tracing',
  'The app has not received the request for a long time, please visit the app and try traffic management':
    '應用長時間未收到請求，請訪問應用後嘗試流量治理',
  'Application components combine workloads and services as components in applications':
    '應用組件組合了工作負載和服務作為應用中的組件',
  'If you need to access applications by application route, add routing rules':
    '如果您需要將應用通過應用路由的方式進行訪問，請添加路由規則',

  'No result found': '未查詢到結果',
  'Please try other query conditions': '請嘗試其它查詢條件',

  'Deploy sample app Bookinfo': '部署示例應用 Bookinfo',
  'Please save the current form first': '請先保存目前表單',
  'Add Component Successfully': '添加組件成功',

  'Connection pool management': '連接池管理',
  CONNECTION_POOL_TIP:
    '為應用程序創建固定數量的連接對象，保存在池中以供重複使用。每次訪問時會從池中獲取已存在的連接對象，使用完畢後，連接對象將返回池中。',
  'Continuous error response (5xx) number': '連續錯誤響應(5xx)個數',
  'The number of consecutive 5xx errors in one inspection cycle':
    '在一個檢查週期内連續出现5xx錯誤的個數',
  'Inspection period (unit: s)': '檢查週期(單位: s)',
  'The response code will be filtered in the inspection cycle.':
    '將會對檢查週期内的響應碼進行篩選',
  'Pod isolation ratio (unit: %)': '容器組隔離比例(單位: %)',
  'Base ejection time (s)': '短隔離時間(s)',
  'Hash based on a specific HTTP header.':
    '根據 HTTP header 中的内容獲取哈希值',
  'Hash based on HTTP cookie.': '根據 HTTP cookie 中的内容獲取哈希值',
  'Hash based on the source IP address.': '根據來源 IP 獲取哈希值',
  'Based on HTTP header': '根據 HTTP header',
  'Based on HTTP cookie': '根據 HTTP cookie',

  'Called Services': '調用服務',
  'Called Depth': '調用深度',
  'Services & Operations': '服務與操作',
  Tags: '標籤',
  Process: '進程',
  Log: '紀錄',

  POD_ISOLATION_RATIO_DESC:
    '允許容器組被隔離的最大比例。採用向上取整，若 10 個實例，設為 13% 則最多會隔離 2 個實例',
  BASE_EJECTION_TIME_DESC:
    '容器組第一次被隔離的時間，之後每次隔離時間為次數與最短隔離時間的乘積',
  CIRCUIT_DESC:
    '熔斷機制是應對雪崩效應的一種微服務鏈路保護機制。當扇出鏈路的某個微服務不可用或者響應時間太長時，會進行服務的降級，進而熔斷該節點微服務的調用，快速返回錯誤的響應資訊。當檢測到該節點微服務調用響應正常後，恢復調用鏈路。',

  'Please input component version': '請輸入組件版本',
  'Invalid version': '版本格式不合法',
  WORKLOAD_NAME_EXIST: '工作負載 {name} 已存在',

  APPLICATION_TYPE_DESC:
    'KubeSphere 支持來自於應用商店和應用倉庫的應用部署(基於 Helm)，同樣也支持自制應用(Application CRD)。',

  APPLICATION_SERVICE_DESC:
    '根據應用中服務類型的不同設置不同類型的服務組件，支持無狀態服務和有狀態服務',
  APPLICATION_BASEINFO_DESC: 'ˇ對應用的名稱描述資訊等基本的資訊定義',

  HOW_TO_USE_APPLICATION_GOVE_Q: '如何使用應用治理？',
  HOW_TO_USE_APPLICATION_GOVE_A:
    '使用應用治理需要創建自制應用並對每項服務開啟服務治理功能',

  'App Types': '應用的類型',
  TIP_APP_TYPE:
    'KubeSphere 支持來自於應用商店和應用倉庫的應用部署(基於 Helm)，同样也支持自制應用(Application CRD)。',
  'How to use Application Governance': '如何使用應用治理',
  TIP_APP_GOVERNANCE:
    '使用應用治理需要創建自制應用並對每項服務開啟服務治理功能',
  'App store deployment': '應用商店部署',
  'From App Store': '來自應用商店',
  'From App Templates': '來自應用模板',
  'From third party Helm': '來自第三方 Helm',
  FROM_APP_STORE_DESC:
    '來自KubeSphere官方應用商店，提供高質量應用和簡易的部署方式',
  FROM_APP_TEMPLATES_DESC:
    '來自於企業空間的自制應用模板以及應用倉庫中添加的第三方 Helm 應用模板',
  COMPOSING_APP_DESC: '通過資源編排的方式發佈服務構建應用(支持應用治理功能)',
  APP_TEMPLATES_MODAL_DESC:
    '應用模板來自於企業空間和第三方的 Helm 應用模板，支持一鍵部署並可通過視覺化的方式在 KubeSphere 中展示並提供部署及管理的功能',
  APP_REPOS_DESC:
    '應用倉庫來自於第三方的 Helm Chart Repo，通過視覺化的方式在 KubeSphere 中展示並提供部署及管理功能，用戶可以基於應用倉庫中的模板快速地一鍵部署應用。',
  SEARCH_TIPS: '您可以根據相關條件進行過濾',

  'From workspace': '來自企業空間',
  'Add stateful or stateless services': '添加有狀態服務或無狀態服務',
  'Add an Internet access rule for the application': '為應用添加外網訪問規則',

  INTERNET_ACCESS_DESC: '可以設置應用的外網訪問規則 (Ingress)',

  'Microservice enabled': '微服務已啟用',
  'Microservice not enabled': '微服務未啟用',

  TRAFFIC_MANAGEMENT_NO_MICROSERVICE_TIP:
    '流量治理依賴於微服務模組，目前集群未啟用微服務模組',
  TRACING_NO_MICROSERVICE_TIP:
    'Tracing 依賴於微服務模組，目前集群未啟用微服務模組',
}
