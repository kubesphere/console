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
  ROUTE_DESC: '应用路由提供一种聚合服务的方式，您可以通过一个外部可访问的 IP 地址将集群的内部服务暴露给外部。',
  PREREQUESTS_FOR_USE_ROUTE_Q: '使用应用路由的前提条件是什么？',
  PREREQUESTS_FOR_USE_ROUTE_A: '如需使用应用路由，您需要联系项目管理员启用项目网关。',
  ACCESS_TYPES_OF_ROUTE_Q: '应用路由支持哪些外部访问模式？',
  ACCESS_TYPES_OF_ROUTE_A: 'KubeSphere 应用路由支持 NodePort 访问模式以及 LoadBalancer 访问模式。',
  ROUTE_PL: '应用路由',
  // List
  GATEWAY_ADDRESS_TCAP: '网关地址',
  ROUTE_EMPTY_DESC: '请创建应用路由。',
  // List > Create > Basic Information
  // List > Create > Routing Rules
  ADD_ROUTING_RULE_DESC: '添加一个路由规则将域名路径映射至服务。',
  ADD_ROUTING_RULE: '添加路由规则',
  ROUTING_RULE_EMPTY_DESC: '请添加至少一个路由规则。',
  PATH_EMPTY_DESC: '请添加至少一个路径。',
  AUTO_GENERATE_TCAP: '自动生成',
  DOMAIN_NAME_TCAP: '域名',
  DOMAIN_NAME_EMPTY_DESC: '请输入一个域名。',
  INVALID_DOMAIN_DESC: '域名格式错误。',
  INVALID_PATH_DESC: '路径不正确。',
  MODE_TCAP: '模式',
  PATH_PL: '路径',
  PATH_SERVICE_TIP: '服务',
  SET_ROUTING_RULES: '设置路由规则',
  SPECIFY_DOMAIN_TCAP: '指定域名',
  NO_GATEWAY_DESC: '如需使用自动生成模式，请联系项目管理员在此项目的高级设置中设置网关访问模式。',
  PATH: '路径',
  PROTOCOL: '协议',
  PORT: '端口',
  PORT_VALUE: '端口：{value}',
  CERTIFICATE: '证书',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Routing Rules
  EDIT_ROUTING_RULES: '编辑路由规则',
  // List > Edit Annotations
  EDIT_ANNOTATIONS: '编辑注解',
  // List > Delete
  ROUTE_LOW: '应用路由'
};