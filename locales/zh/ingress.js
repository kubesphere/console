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
  VISIT: '访问',
  'Create Route': '创建应用路由',
  EDIT_RULES: '编辑规则',
  PATH_SI: '路径',
  Route: '应用路由',
  ROUTE_ANNOTATION_DESC: '可以通过给应用路由添加注解来设置应用路由的行为。详细的可供配置的注解列表，参见 <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/" target="_blank">Annotations</a>。',
  RULE_SETTING_MODE_AUTO: '系统将自动按照 &lt服务名称&gt.&lt项目名称&gt.&lt网关地址&gt.nip.io 格式生成域名，该域名将由 nip.io 自动解析为网关 IP 地址。此模式仅支持 HTTP 协议。',
  RULE_SETTING_MODE_SPECIFY: '指定自定义域名并通过本地 hosts 文件或 DNS 服务器将域名解析为网关 IP 地址。',
  GATEWAY_SERVICE_MESH_STATUS_ON: '已开启',
  GATEWAY_SERVICE_MESH_STATUS_OFF: '未开启',
  INGRESS_CONTROLLER_NODEPORT_DESC: '开启网关后，系统会自动分配 http 及 https 相应的端口号；应用路由可以通过反向代理的方式对服务进行访问。',
  INGRESS_CONTROLLER_LOADBALANCER_DESC: '如需使用 QingCloud LoadBalancer 作为服务网关，需要部署 QingCloud Cloud Controller Manager 插件。',
  UNABLE_CREATE_ROUTE_TIP: '当前项目中未发现可用的网关地址，无法创建应用路由。'
};