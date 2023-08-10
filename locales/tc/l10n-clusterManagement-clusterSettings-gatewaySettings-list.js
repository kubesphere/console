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
  CLUSTER_GATEWAY_NOT_ENABLED: '集群網關未開啟',
  CLUSTER_ENABLE_GATEWAY_DESC: '請開啟集群網關。',
  CLUSTER_GATEWAY: '集群網關',
  GATEWAY_ADDRESS_SCAP: '網關地址',
  LOAD_BALANCER_PROVIDER_SCAP: '負載均衡器供應商',
  // Cluster Gateway > Enable Gateway
  ENABLE_GATEWAY: '開啟網關',
  GATEWAY_TRACING_TIP: '如果開啟<b>鏈路追蹤</b>後路由無法訪問，請在路由中添加註釋 <b>nginx.ingress.kubernetes.io/service-upstream: true</b>。',
  // Cluster Gateway > Manage > View Details
  VIEW_DETAILS: '查看詳情',
  // Cluster Gateway > Manage > Disable
  DISABLE: '關閉',
  DISABLE_GATEWAY: '關閉網關',
  DISABLE_GATEWAY_TIP: '您確定關閉網關嗎？',
  DISABLE_SUCCESSFUL: '關閉成功。',
  // Cluster Gateway > Manage > Edit
  EDIT: '編輯',
  EDIT_TITLE: '編輯 {title}',
  // Cluster Gateway > Manage > Update
  UPDATE: 'Update',
  UPDATED_GATEWAY_TITLE: 'Update Gateway',
  UPDATE_GATEWAY_DESC: 'This operation may interrupt business for a short while. Exercise caution when performing this operation.',
  // Project Gateways
  PROJECT_GATEWAY_PL: '項目網關',
  PROJECT_GATEWAY_NOT_ENABLED: '項目網關 未開啟',
  PROJECT_ENABLE_GATEWAY_DESC: '請開啟項目網關。',
  REPLICA_COUNT: '副本數量',
  NODE_PORTS: '主機通訊埠',
  UPDATE_GATEWAY_DESC: 'The current gateway can be updated.',
  // Project Gateways > Disable
  PROJECT_GATEWAY_LOW: '項目網關',
  DISABLE_MULTIPLE_GATEWAYS: 'Disable Multiple Gateways'
};