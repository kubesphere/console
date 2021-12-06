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
  ADD_ANNOTATION: '添加注解',
  ADD_PATH_TCAP: '添加路径',
  'Add Path': '添加 Path',
  'Auto Generate': 'Auto Generate',
  VISIT: '點擊訪問',
  'Create Route': '創建應用路由',
  EDIT_RULES: '編輯規則',
  PATH_SI: '路徑',
  Route: '應用路由',
  ROUTE_ANNOTATION_DESC: '可以通過給應用路由添加注解來設置應用路由的行為。詳細的可供配置的注解列表，參見 <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a>。',
  RULE_SETTING_MODE_AUTO: '配置路徑以自動生成域名，域名格式為 &lt服務名稱&gt + &lt項目名稱&gt + &lt網關地址&gt + nip.io，然後可以通過 &lt服務名稱&gt.&lt項目名稱&gt.&lt網關地址&gt.nip.io:&ltNodePort&gt 的形式來訪問服務。<br/>請確保所在網路環境可以正常訪問網關地址。',
  RULE_SETTING_MODE_SPECIFY: '指定自定義域名，通過本地 hosts 文件或 DNS 服務器將域名解析為網關 IP 地址。',
  GATEWAY_SERVICE_MESH_STATUS_ON: 'On',
  GATEWAY_SERVICE_MESH_STATUS_OFF: 'Off',
  INGRESS_CONTROLLER_NODEPORT_DESC: '開啟網關後，系統會自動分配 http 及 https 相應的端口號；應用路由可以通過反向代理的方式對服務進行訪問。',
  INGRESS_CONTROLLER_LOADBALANCER_DESC: '如需使用 QingCloud LoadBalancer 作為服務網關，需要部署 QingCloud Cloud Controller Manager 外掛程式。',
  UNABLE_CREATE_ROUTE_TIP: '目前項目中沒有找到可用的網關地址，無法創建應用路由。'
};