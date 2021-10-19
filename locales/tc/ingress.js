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
  Route: '應用路由',
  ROUTE: '應用路由',
  ROUTE_PL: 'Routes',
  ROUTE_LOW: 'Route',
  'Create Route': '創建應用路由',
  PATH_EMPTY_DESC: '請添加至少一個路徑。',
  RULES: '規則',
  EDIT_RULES: '編輯規則',
  EDIT_ANNOTATION: '編輯注解',
  Rules: '規則',
  EDIT_RULES_TCAP: '編輯規則',
  EDIT_ANNOTATIONS: '編輯注解',
  ROUTING_RULES: '路由規則',
  GATEWAY_ADDRESS_TCAP: '網關地址',
  GATEWAY_ADDRESS_SCAP: 'Gateway address',
  DOMAIN_NAME_EMPTY_DESC: '請輸入域名。',
  VISIT: '點擊訪問',
  PATH_SERVICE_TIP: '服務',
  ADD_PATH_TCAP: '添加路径',
  EDIT_ROUTING_RULES: 'Edit Routing Rules',
  'Please select a service': '請選擇一個服務',
  'Add Path': '添加 Path',
  ADD_ANNOTATION: '添加注解',

  SET_ROUTING_RULES: '設置路由規則',

  AUTO_GENERATE_TCAP: '自動生成',
  SPECIFY_DOMAIN_TCAP: '指定域名',

  UNABLE_TO_ACCESS: '無法訪問服務',

  INVALID_DOMAIN_DESC: '域名格式錯誤',

  GATEWAY_IP_ADDRESS: '網關 IP',
  GATEWAY_ACCESS_MODE: '網關類型',

  MODE_TCAP: '模式',
  PATH_PL: '路徑',
  PATH_SI: '路徑',
  PATH_VALUE: '路徑：{value}',
  DOMAIN_NAME_TCAP: '域名',
  DOMAIN_NAME_VALUE: 'Domain Name: {value}',

  INVALID_PATH_DESC: '請填寫正確路徑。',
  PATH_EXIST: 'PATH 重複，請重新輸入。',
  ROUTE_DESC:
    '應用路由提供一種聚合服務的方式，您可以將集群的内部服務通過一個外部可訪問的 IP 地址暴露給集群外部。',
  ROUTE_EMPTY_DESC:
    '應用路由提供一種聚合服務的方式，您可以將集群的内部服務通過一個外部可訪問的 IP 地址暴露給集群外部。',
  ROUTE_ANNOTATION_DESC:
    '可以通過給應用路由添加注解來設置應用路由的行為。詳細的可供配置的注解列表，參見 <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a>。',

  INGRESS_CONTROLLER_NODEPORT_DESC:
    '開啟網關後，系統會自動分配 http 及 https 相應的端口號；應用路由可以通過反向代理的方式對服務進行訪問。',
  INGRESS_CONTROLLER_LOADBALANCER_DESC:
    '如需使用 QingCloud LoadBalancer 作為服務網關，需要部署 QingCloud Cloud Controller Manager 外掛程式。',

  GATEWAY_APPLICATION_GOVERNANCE_TIP:
    '如果您不需要使用應用治理的功能，無需打開此項；如果您需要使用應用治理的 Tracing 功能，請打開開此項。打開此項後，如果您的應用路由無法訪問，請檢查應用路由中是否添加 `nginx.ingress.kubernetes.io/service-upstream: true` 注解，如無，請手動添加。',

  ADD_ROUTING_RULE_DESC: '添加一個路由規則將域名映射至服務。',
  ROUTING_RULE_EMPTY_DESC: 'Please add at least one routing rule.',
  UNABLE_TO_ACCESS_TIP:
    '● 請確保您設置的域名可以解析到訪問入口的 IP 地址;<br/>● 如果在私有雲環境中，請修改本地的 host 檔案，並通過&lt域名&gt:&ltNodePort&gt的方式來訪問;<br/>● 通過配置 DNS 訪問，將域名修改為&ltHostname&gt.&lt網關地址&gt.nip.io，然後可以通過&ltHostname&gt.&lt網關地址&gt.nip.io:&ltNodePort&gt的形式來訪問服務;<br/>● 如果通過域名訪問被拒絕，請確認您的域名是真實域名而且已經申請通過。',

  NO_GATEWAY_DESC:
    '若要使用自動生成模式，請聯系項目管理員在此項目的高級設置中設置網關訪問方式。',
  UNABLE_CREATE_ROUTE_TIP:
    '目前項目中沒有找到可用的網關地址，無法創建應用路由。',

  RULE_SETTING_MODE_AUTO:
    '配置路徑以自動生成域名，域名格式為 &lt服務名稱&gt + &lt項目名稱&gt + &lt網關地址&gt + nip.io，然後可以通過 &lt服務名稱&gt.&lt項目名稱&gt.&lt網關地址&gt.nip.io:&ltNodePort&gt 的形式來訪問服務。<br/>請確保所在網路環境可以正常訪問網關地址。',
  RULE_SETTING_MODE_SPECIFY:
    '指定自定義域名，通過本地 hosts 文件或 DNS 服務器將域名解析為網關 IP 地址。',

  PREREQUESTS_FOR_USE_ROUTE_Q: '使用應用路由的前提條件?',
  PREREQUESTS_FOR_USE_ROUTE_A:
    '使用應用路由需要由項目管理員對當前項目設置網關。',

  ACCESS_TYPES_OF_ROUTE_Q: '應用路由支持的訪問方式?',
  ACCESS_TYPES_OF_ROUTE_A:
    'KubeSphere 應用路由支持 NodePort 訪問方式以及 LoadBalancer 訪問方式。',

  // Route Detail Page
  ROUTE_PATH_VALUE: '路徑：<strong>{value}</strong>',
  ROUTE_SERVICE_VALUE: '服務：<strong>{value}</strong>',
  ROUTE_PORT_VALUE: '端口：<strong>{value}</strong>',
  ACCESS_SERVICE: '訪問服務',
}
