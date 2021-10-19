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
  Route: '应用路由',
  ROUTE: '应用路由',
  ROUTE_PL: '应用路由',
  ROUTE_LOW: '应用路由',
  EDIT_ROUTING_RULES: '编辑路由规则',
  'Create Route': '创建应用路由',
  PATH_EMPTY_DESC: '请添加至少一个路径。',
  RULES: '规则',
  EDIT_RULES: '编辑规则',
  EDIT_ANNOTATION: '编辑注解',
  Rules: '规则',
  EDIT_RULES_TCAP: '编辑规则',
  EDIT_ANNOTATIONS: '编辑注解',
  ROUTING_RULES: '路由规则',
  GATEWAY_ADDRESS_TCAP: '网关地址',
  GATEWAY_ADDRESS_SCAP: '网关地址',
  DOMAIN_NAME_EMPTY_DESC: '请输入一个域名。',
  VISIT: '访问',
  PATH_SERVICE_TIP: '服务',
  ADD_PATH_TCAP: '添加路径',
  'Please select a service': '请选择一个服务',
  'Add Path': '添加 Path',
  ADD_ANNOTATION: '添加注解',

  SET_ROUTING_RULES: '设置路由规则',

  AUTO_GENERATE_TCAP: '自动生成',
  SPECIFY_DOMAIN_TCAP: '指定域名',

  UNABLE_TO_ACCESS: '无法访问服务',

  INVALID_DOMAIN_DESC: '域名格式错误。',

  GATEWAY_IP_ADDRESS: '网关 IP 地址',
  GATEWAY_ACCESS_MODE: '网关访问模式',

  MODE_TCAP: '模式',
  PATH_PL: '路径',
  PATH_SI: '路径',
  PATH_VALUE: '路径：{value}',
  DOMAIN_NAME_TCAP: '域名',
  DOMAIN_NAME_VALUE: '域名：{value}',

  INVALID_PATH_DESC: '路径不正确。',
  PATH_EXIST: 'PATH 重复，请重新输入。',

  ROUTE_DESC:
    '应用路由提供一种聚合服务的方式，您可以通过一个外部可访问的 IP 地址将集群的内部服务暴露给外部。',
  ROUTE_EMPTY_DESC: '请创建一个应用路由。',
  ROUTE_ANNOTATION_DESC:
    '可以通过给应用路由添加注解来设置应用路由的行为。详细的可供配置的注解列表，参见 <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a>。',

  INGRESS_CONTROLLER_NODEPORT_DESC:
    '开启网关后，系统会自动分配 http 及 https 相应的端口号；应用路由可以通过反向代理的方式对服务进行访问。',
  INGRESS_CONTROLLER_LOADBALANCER_DESC:
    '如需使用 QingCloud LoadBalancer 作为服务网关，需要部署 QingCloud Cloud Controller Manager 插件。',

  GATEWAY_APPLICATION_GOVERNANCE_TIP:
    '如您不需要使用应用治理的功能，无需打开此项；如果您需要使用应用治理的 Tracing 功能，请打开此项。打开此项后，如果您的应用路由无法访问，请检查应用路由中是否添加 `nginx.ingress.kubernetes.io/service-upstream: true` 注解，如无，请手动添加。',

  ADD_ROUTING_RULE_DESC: '添加一个路由规则将域名路径映射至服务。',
  ROUTING_RULE_EMPTY_DESC: '请添加至少一个路由规则。',
  UNABLE_TO_ACCESS_TIP:
    '* 如果域名由系统自动生成，请确保您的客户机可以访问 nip.io。<br/>* 如果域名由用户手动指定，请确保您的 DNS 服务器或客户机的本地 hosts 文件中已配置了域名解析策略。',

  NO_GATEWAY_DESC:
    '如需使用自动生成模式，请联系项目管理员在此项目的高级设置中设置网关访问模式。',
  UNABLE_CREATE_ROUTE_TIP:
    '当前项目中没有找到可用的网关地址，无法创建应用路由。',

  RULE_SETTING_MODE_AUTO:
    '系统将自动按照 &lt服务名称&gt.&lt项目名称&gt.&lt网关地址&gt.nip.io 格式生成域名，该域名将由 nip.io 自动解析为网关 IP 地址。此模式仅支持 HTTP 协议。',
  RULE_SETTING_MODE_SPECIFY:
    '指定自定义域名并通过本地 hosts 文件或 DNS 服务器将域名解析为网关 IP 地址。',

  GATEWAY_SERVICE_MESH_STATUS_ON: '已开启',
  GATEWAY_SERVICE_MESH_STATUS_OFF: '未开启',

  PREREQUESTS_FOR_USE_ROUTE_Q: '使用应用路由的前提条件？',
  PREREQUESTS_FOR_USE_ROUTE_A:
    '使用应用路由需要由项目管理员对当前项目设置网关。',

  ACCESS_TYPES_OF_ROUTE_Q: '应用路由支持哪些的访问模式？',
  ACCESS_TYPES_OF_ROUTE_A:
    'KubeSphere 应用路由支持 NodePort 访问模式以及 LoadBalancer 访问模式。',

  // Route Detail Page
  ROUTE_PATH_VALUE: '路径：<strong>{value}</strong>',
  ROUTE_SERVICE_VALUE: '服务：<strong>{value}</strong>',
  ROUTE_PORT_VALUE: '端口：<strong>{value}</strong>',
  ACCESS_SERVICE: '访问服务',
}
