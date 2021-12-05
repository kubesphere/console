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
  // Navigation Pane
  GATEWAY_SETTINGS: '网关设置',
  // Banner
  CLUSTER_GATEWAY_DESC: '对集群中的外网访问网关以及服务治理等配置进行设置和管理。',
  // Cluster Gateway
  CLUSTER_GATEWAY_NOT_ENABLED: '集群网关未开启',
  CLUSTER_ENABLE_GATEWAY_DESC: '请开启集群网关。',
  CLUSTER_GATEWAY: '集群网关',
  GATEWAY_ADDRESS_SCAP: '网关地址',
  LOAD_BALANCER_PROVIDER_SCAP: '负载均衡器提供商',
  // Cluster Gateway > Enable Gateway
  ENABLE_GATEWAY: '开启网关',
  GATEWAY_TRACING_TIP: '如果开启<b>链路追踪</b>后路由无法访问，请在路由中添加注解 <b>nginx.ingress.kubernetes.io/service-upstream: true</b>。',
  // Cluster Gateway > Manage > View Details
  VIEW_DETAILS: '查看详情',
  // Cluster Gateway > Manage > Disable
  DISABLE: '关闭',
  DISABLE_GATEWAY: '关闭网关',
  DISABLE_GATEWAY_TIP: '您确定关闭网关吗？',
  DISABLE_SUCCESSFUL: '关闭成功。',
  // Cluster Gateway > Manage > Edit
  EDIT: '编辑',
  EDIT_TITLE: '编辑{title}',
  // Cluster Gateway > Manage > Delete
  // Project Gateway
  PROJECT_GATEWAY: '项目网关',
  PROJECT_GATEWAY_NOT_ENABLED: '项目网关未开启',
  PROJECT_ENABLE_GATEWAY_DESC: '请开启项目网关。',
  REPLICA_COUNT: '副本数量',
  NODE_PORTS: '节点端口',
  UPDATE_GATEWAY_DESC: '当前网关可更新。',
  // Project Gateway > Delete
  PROJECT_GATEWAY_PL: '项目网关',
  PROJECT_GATEWAY_LOW: '项目网关'
};