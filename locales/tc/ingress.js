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
  'Create Route': '創建應用路由',
  Rules: '規則',
  'Edit Rules': '編輯規則',
  'Edit Annotations': '編輯注解',
  'Route Rules': '路由規則',
  'Gateway Address': '網關地址',
  'Please input Hostname': '請輸入 Hostname',
  'Click to visit': '點擊訪問',
  'Please select a service': '請選擇一個服務',
  'Add Path': '添加 Path',
  'Add Annotation': '添加注解',

  'Set Route Rule': '設置路由規則',

  'Auto Generate': '自動生成',
  'Specify Domain': '指定域名',

  'Unable to access': '無法訪問',

  'Invalid host': '域名格式錯誤',

  'Gateway IP': '網關 IP',
  'Gateway Type': '網關類型',

  Mode: '模式',
  Paths: '路徑',
  HostName: '域名',

  'Invalid paths': '請填寫正確路徑',

  ROUTE_DESC:
    '應用路由提供一種聚合服務的方式，您可以將集群的内部服務通過一個外部可訪問的 IP 地址暴露給集群外部。',
  ROUTE_CREATE_DESC:
    '應用路由提供一種聚合服務的方式，您可以將集群的内部服務通過一個外部可訪問的 IP 地址暴露給集群外部。',
  ROUTE_ANNOTATION_DESC:
    '可以通過給應用路由添加注解來設置應用路由的行為。詳細的可供配置的注解列表，參見 <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a>。',

  INGRESS_CONTROLLER_NODEPORT_DESC:
    '開啟網關後，系統會自動分配 http 及 https 相應的端口號；應用路由可以通過反向代理的方式對服務進行訪問。',
  INGRESS_CONTROLLER_LOADBALANCER_DESC:
    '如需使用 QingCloud LoadBalancer 作為服務網關，需要部署 QingCloud Cloud Controller Manager 外掛程式。',

  GATEWAY_APPLICATION_GOVERNANCE_TIP:
    '如果您不需要使用應用治理的功能，無需打開此項；如果您需要使用應用治理的 Tracing 功能，請打開開此項。打開此項後，如果您的應用路由無法訪問，請檢查應用路由中是否添加 `nginx.ingress.kubernetes.io/service-upstream: true` 注解，如無，請手動添加。',

  'Please add at least one routing rule.': '請至少添加一個路由規則',

  UNABLE_TO_ACCESS_TIP:
    '● 請確保您設置的域名可以解析到訪問入口的 IP 地址;<br/>● 如果在私有雲環境中，請修改本地的 host 檔案，並通過 域名+節點端口 的方式來訪問;<br/>● 通過配置 DNS 訪問，將域名修改為 hostname + 網關地址 + nip.io，然後可以通過 hostname.網關地址.nip.io:節點端口 的形式來訪問服務;<br/>● 如果通過域名訪問被拒絕，請確認您的域名是真實而且已經申請通過。',

  NO_INTERNET_ACCESS_TIP:
    '目前項目中沒有找到可用的網關地址，因此您無法使用自動生成模式。請聯繫您的項目管理員在 <strong>高級設置</strong> 中設置外網訪問方式',
  UNABLE_CREATE_ROUTE_TIP: '目前項目中沒有找到可用的網關地址，無法創建應用路由',

  RULE_SETTING_MODE_AUTO:
    '通過配置 DNS 訪問，將域名修改為 hostname + 網關地址 + nip.io，然後可以通過 hostname.網關地址.nip.io:節點端口 的形式來訪問服務;<br/>請確保所在網路環境可以正常訪問網關地址。',
  RULE_SETTING_MODE_SPECIFY:
    '請確保您設置的域名可以解析到訪問入口的 IP 地址;<br/>如果在私有雲環境中，請修改本地的 host 檔案，並通過 域名+節點端口 的方式來訪問',

  GATEWAY_SERVICE_MESH_STATUS_ON: '已開啟',
  GATEWAY_SERVICE_MESH_STATUS_OFF: '未開啟',

  PREREQUESTS_FOR_USE_ROUTE_Q: '使用應用路由的前提條件?',
  PREREQUESTS_FOR_USE_ROUTE_A:
    '使用應用路由需要由管理員對目前的項目進行外網訪問設置，即開啟外網訪問網關。',

  ACCESS_TYPES_OF_ROUTE_Q: '應用路由支持的訪問方式?',
  ACCESS_TYPES_OF_ROUTE_A:
    'KubeSphere 應用路由支持自定義域名 (HostName) 的方式以及萬用字元 DNS 的訪問方式。',
}
