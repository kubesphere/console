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
  'Create Route': '创建应用路由',
  ADD_PATH_TIP: '请添加至少一个路径。',
  Rules: '规则',
  EDIT_RULES_TCAP: '编辑规则',
  EDIT_ANNOTATION: '编辑注解',
  ROUTE_RULES_TCAP: '路由规则',
  GATEWAY_ADDRESS_TCAP: '网关地址',
  DOMAIN_NAME_TIP: '请输入域名。',
  'Click to visit': '点击访问',
  PATH_SERVICE_TIP: '服务',
  ADD_PATH_TCAP: '添加路径',
  'Please select a service': '请选择一个服务',
  'Add Path': '添加 Path',
  ADD_ANNOTATION: '添加注解',

  SET_ROUTE_RULE_TCAP: '设置路由规则',

  AUTO_GENERATE_TCAP: '自动生成',
  SPECIFY_DOMAIN_TCAP: '指定域名',

  'Unable to access': '无法访问',

  INVALID_DOMAIN_TIP: '域名格式错误。',

  'Gateway IP': '网关 IP',
  'Gateway Type': '网关类型',

  MODE_TCAP: '模式',
  PATH_PL: '路径',
  DOMAIN_NAME_TCAP: '域名',

  INVALID_PATH_TIP: '请填写正确路径。',

  ROUTE_DESC:
    '应用路由即 Kubernetes 的 Ingress，您可以使用应用路由和单个 IP 地址来聚合和暴露多个服务。',
  ROUTE_CREATE_DESC:
    '应用路由即 Kubernetes 的 Ingress，您可以使用应用路由和单个 IP 地址来聚合和暴露多个服务。',
  ROUTE_ANNOTATION_DESC:
    '可以通过给应用路由添加注解来设置应用路由的行为。详细的可供配置的注解列表，参见 <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a>。',

  INGRESS_CONTROLLER_NODEPORT_DESC:
    '开启网关后，系统会自动分配 http 及 https 相应的端口号；应用路由可以通过反向代理的方式对服务进行访问。',
  INGRESS_CONTROLLER_LOADBALANCER_DESC:
    '如需使用 QingCloud LoadBalancer 作为服务网关，需要部署 QingCloud Cloud Controller Manager 插件。',

  GATEWAY_APPLICATION_GOVERNANCE_TIP:
    '如您不需要使用应用治理的功能，无需打开此项；如果您需要使用应用治理的 Tracing 功能，请打开此项。打开此项后，如果您的应用路由无法访问，请检查应用路由中是否添加 `nginx.ingress.kubernetes.io/service-upstream: true` 注解，如无，请手动添加。',

  ADD_ROUTE_RULE_DESC: '添加一个路由规则将域名映射至服务。',

  UNABLE_TO_ACCESS_TIP:
    '● 请确保您设置的域名可以解析到访问入口的 IP 地址;<br/>● 如果在私有云环境中，请修改本地的 host 文件，并通过<strong>域名+节点端口</strong>的方式来访问;<br/>● 通过通配 DNS 访问，将域名修改为 hostname + 网关地址 + nip.io，然后可以通过<strong>hostname.网关地址.nip.io:节点端口</strong>的形式来访问服务;<br/>● 如果通过域名访问被拦截，请确认您的域名是真实而且已经备案。',

  NO_INTERNET_ACCESS_TIP:
    '若要使用自动生成模式，请联系项目管理员在此项目的高级设置中设置网关访问方式。',
  UNABLE_CREATE_ROUTE_TIP:
    '当前项目中没有找到可用的网关地址，无法创建应用路由。',

  RULE_SETTING_MODE_AUTO:
    '配置路径以自动生成域名，域名格式为 &lt服务名称&gt + &lt项目名称&gt + &lt网关地址&gt + nip.io，然后可以通过 &lt服务名称&gt.&lt项目名称&gt.&lt网关地址&gt.nip.io:&ltNodePort&gt 的形式来访问服务。<br/>请确保所在网络环境可以正常访问网关地址。',
  RULE_SETTING_MODE_SPECIFY:
    '指定自定义域名，通过本地 hosts 文件或 DNS 服务器将域名解析为网关 IP 地址。',

  GATEWAY_SERVICE_MESH_STATUS_ON: '已开启',
  GATEWAY_SERVICE_MESH_STATUS_OFF: '未开启',

  PREREQUESTS_FOR_USE_ROUTE_Q: '使用应用路由的前提条件?',
  PREREQUESTS_FOR_USE_ROUTE_A:
    '使用应用路由需要由管理员对当前的项目进行外网访问设置，即开启外网访问网关。',

  ACCESS_TYPES_OF_ROUTE_Q: '应用路由支持的访问方式?',
  ACCESS_TYPES_OF_ROUTE_A:
    'KubeSphere 应用路由支持自定义域名 (HostName) 的方式以及通配符 DNS 的访问方式。',
}
