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
  ROUTE_DESC: '應用路由提供一種聚合服務的方式，您可以將集群的内部服務通過一個外部可訪問的 IP 地址暴露給集群外部。',
  PREREQUESTS_FOR_USE_ROUTE_Q: '使用應用路由的前提條件?',
  PREREQUESTS_FOR_USE_ROUTE_A: '使用應用路由需要由項目管理員對當前項目設置網關。',
  ACCESS_TYPES_OF_ROUTE_Q: '應用路由支持的訪問方式?',
  ACCESS_TYPES_OF_ROUTE_A: 'KubeSphere 應用路由支持 NodePort 訪問方式以及 LoadBalancer 訪問方式。',
  ROUTE_PL: '應用路由',
  // List
  GATEWAY_ADDRESS_TCAP: '網關地址',
  ROUTE_EMPTY_DESC: '應用路由提供一種聚合服務的方式，您可以將集群的内部服務通過一個外部可訪問的 IP 地址暴露給集群外部。',
  // List > Create > Basic Information
  // List > Create > Routing Rules
  ADD_ROUTING_RULE_DESC: '添加一個路由規則將域名映射至服務。',
  ADD_ROUTING_RULE: '添加路由規則',
  ROUTING_RULE_EMPTY_DESC: '請添加至少一個路由規則。',
  PATH_EMPTY_DESC: '請添加至少一個路徑。',
  AUTO_GENERATE_TCAP: '自動生成',
  DOMAIN_NAME_TCAP: '域名',
  DOMAIN_NAME_EMPTY_DESC: '請輸入域名。',
  INVALID_DOMAIN_DESC: '域名格式錯誤',
  INVALID_PATH_DESC: '請填寫正確路徑。',
  MODE_TCAP: '模式',
  PATH_PL: '路徑',
  PATH_SERVICE_TIP: '服務',
  SET_ROUTING_RULES: '設置路由規則',
  SPECIFY_DOMAIN_TCAP: '指定域名',
  NO_GATEWAY_DESC: '若要使用自動生成模式，請聯系項目管理員在此項目的高級設置中設置網關訪問方式。',
  PATH: '路徑',
  PROTOCOL: '協定',
  PORT: '通訊埠',
  PORT_VALUE: '通訊埠：{value}',
  CERTIFICATE: '憑證',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Routing Rules
  EDIT_ROUTING_RULES: '編輯路由規則',
  // List > Edit Annotations
  EDIT_ANNOTATIONS: '編輯註釋',
  // List > Delete
  ROUTE_LOW: '應用路由'
};