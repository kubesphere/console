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
  PROJECT_GATEWAY_DESC: '对项目中的外网访问网关以及服务治理等配置进行设置和管理。',
  // Project Gateway
  PROJECT_GATEWAY: '项目网关',
  PROJECT_GATEWAY_EMPTY_DESC: '请创建项目网关。',
  // Project Gateway > Enable Gateway
  ENABLE_GATEWAY_DESC: '在创建应用路由之前，需要先启用外网访问入口，即网关。这一步是创建对应的应用路由控制器，负责将请求转发到对应的后端服务。',
  // Project Gateway > Enable Gateway > NodePort
  // Project Gateway > Enable Gateway > LoadBalancer
  LOAD_BALANCER_PROVIDER: '负载均衡器提供商',
  GATEWAY_UPDATING_TIP: '网关升级中，请稍后再试。',
  // Manage > View Details
  // Manage > Edit
  // Manage > Edit > NodePort
  // Manage > Edit > LoadBalancer
  // Manage > Disable
  // Cluster Gateway (displayed when the cluster gateway and project gateway are both enabled)
  CLUSTER_GATEWAY_GUIDE_DESC: '如果同时存在集群网关和项目网关，项目网关禁用后无法再次启用。建议仅使用集群网关或仅使用项目网关。'
};