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
  GATEWAY_SETTINGS: '網關設置',
  // Banner
  CLUSTER_GATEWAY_DESC: '對集群和項目中的外網訪問網關以及服務治理等配置進行設置和管理',
  // Cluster Gateway
  CLUSTER_GATEWAY_NOT_ENABLED: '集群網關未設置',
  CLUSTER_ENABLE_GATEWAY_DESC: '創建應用路由之前，需要先啟用外網訪問入口，即網關。這一步是創建對應的應用路由控制器，負責將請求轉發到對應的後端服務。 ',
  CLUSTER_GATEWAY: '集群網關',
  GATEWAY_ADDRESS_SCAP: 'Gateway address',
  LOAD_BALANCER_PROVIDER_SCAP: 'Load balancer provider',
  // Cluster Gateway > Enable Gateway
  ENABLE_GATEWAY: '設置網關',
  GATEWAY_TRACING_TIP: '如果您不需要使用應用治理的功能，無需打開此項；如果您需要使用應用治理的 Tracing 功能，請打開開此項。打開此項後，如果您的應用路由無法訪問，請檢查應用路由中是否添加 `nginx.ingress.kubernetes.io/service-upstream: true` 注解，如無，請手動添加。',
  // Cluster Gateway > Manage > View Details
  VIEW_DETAILS: 'View Details',
  // Cluster Gateway > Manage > Disable
  DISABLE: 'Disable',
  DISABLE_GATEWAY: 'Disable Gateway',
  DISABLE_GATEWAY_TIP: 'Are you sure you want to disable the gateway?',
  DISABLE_SUCCESSFUL: 'Disabled successfully.',
  // Cluster Gateway > Manage > Edit
  EDIT: '編輯',
  EDIT_TITLE: 'Edit {title}',
  // Cluster Gateway > Manage > Delete
  // Project Gateway
  PROJECT_GATEWAY: '項目網關',
  PROJECT_GATEWAY_NOT_ENABLED: '沒有找到 項目網關',
  PROJECT_ENABLE_GATEWAY_DESC: '集群管理頁面不支持項目網關的設置，如需設置需要轉到對應項目下進行設置。 ',
  REPLICA_COUNT: '副本數量',
  NODE_PORTS: '主機端口',
  UPDATE_GATEWAY_DESC: '當前網關可升級',
  // Project Gateway > Delete
  PROJECT_GATEWAY_PL: 'Project Gateways',
  PROJECT_GATEWAY_LOW: 'project gateway'
};