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
  PROJECT_GATEWAY_DESC: '對集群和項目中的外網訪問網關以及服務治理等配置進行設置和管理',
  // Project Gateway
  PROJECT_GATEWAY: 'Project Gateway',
  // Project Gateway > Enable Gateway
  ENABLE_GATEWAY_DESC: '在創建應用路由之前，需要先啟用外網訪問入口，即網關。這一步是創建對應的應用路由控制器，用來負責將請求轉發到對應的後端服務。',
  // Project Gateway > Enable Gateway > NodePort
  // Project Gateway > Enable Gateway > LoadBalancer
  LOAD_BALANCER_PROVIDER: 'LoadBalancer提供商',
  GATEWAY_UPDATING_TIP: 'Updating the gateway. Please try again later.',
  // Manage > View Details
  // Manage > Edit
  // Manage > Edit > NodePort
  // Manage > Edit > LoadBalancer
  // Manage > Disable
  // Cluster Gateway (displayed when the cluster gateway and project gateway are both enabled)
  CLUSTER_GATEWAY_GUIDE_DESC: '開啟集群網關後，無法再設置項目網關。若已存在項目網關，刪除後無法重新設置。 '
};