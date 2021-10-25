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
  GATEWAY_SETTINGS: '網關設置',
  CLUSTER_GATEWAY_DESC:
    '對集群和項目中的外網訪問網關以及服務治理等配置進行設置和管理',
  PROJECT_GATEWAY_DESC:
    '對集群和項目中的外網訪問網關以及服務治理等配置進行設置和管理',
  CLUSTER_GATEWAY: '集群網關',
  PROJECT_GATEWAY: '項目網關',
  CLUSTER_GATEWAY_LOW: 'cluster gateway',
  PROJECT_GATEWAY_PL: 'Project Gateways',
  PROJECT_GATEWAY_LOW: 'project gateway',
  CLUSTER_SET_GATEWAY_DESC:
    '創建應用路由之前，需要先啟用外網訪問入口，即網關。這一步是創建對應的應用路由控制器，負責將請求轉發到對應的後端服務。 ',
  PROJECT_SET_GATEWAY_DESC:
    '集群管理頁面不支持項目網關的設置，如需設置需要轉到對應項目下進行設置。 ',
  CLUSTER_GATEWAY_NOT_SET: '集群網關未設置',
  PROJECT_GATEWAY_NOT_SET: '沒有找到 項目網關',
  'Gateway Not Set': '網關未設置',
  'Set Gateway': '設置網關',
  EDIT_GATEWAY: '編輯網關',
  'Update Gateway': '更新網關',
  CONFIGURATION_OPTIONS: '網關配置',
  'Gateway Config': '網關配置',
  GATEWAY_LOGS: '網關日志',
  GATEWAY_LOW: '網關',
  'Add Gateway Config': '添加網關配置',
  LOAD_BALANCER_PROVIDER: 'LoadBalancer提供商',
  LOAD_BALANCER_PROVIDER_SCAP: 'Load balancer provider',
  LOAD_BALANCER_SCAP: 'Load balancer',
  LOAD_BALANCERS_SCAP: 'Load balancers',
  USE_DEFAULT_ANNOTATIONS: '使用默認註解',
  GATEWAY_IP: '訪問地址',
  UPDATE_GATEWAY_DESC: '當前網關可升級',
  DISK_LOG_COLLECTION_DESC:
    'The Log Collection function allows the system to collect container logs saved on volumes. To use this function, you need to mount a volume in read and write mode to a container and set the container to export logs to the volume.',
  UPDATED_GATEWAY_DESC: '請在業務低峰期操作，升級過程可能會造成業務短暫中斷。 ',
  UPDATED_GATEWAY_TITLE: '升級網關確認?',
  CLUSTER_GATEWAY_GUIDE_DESC:
    '開啟集群網關後，無法再設置項目網關。若已存在項目網關，刪除後無法重新設置。 ',
  'Request Count': '請求量',
  CONNECTION_COUNT: '連接數',
  FAILED_REQUEST_COUNT: '請求錯誤',
  AVERAGE_LATENCY: '平均延遲',
  P_FIFTY_LATENCY: 'P50 延遲',
  P_NINETY_FIVE_LATENCY: 'P95 延遲',
  P_NINETY_NINE_LATENCY: 'P99 延遲',
  FOUR_XX_REQUEST_COUNT: '4xx 錯誤',
  FIVE_XX_REQUEST_COUNT: '5xx 錯誤',
  TOTAL_REQUESTS: '總請求數',
  SUCCESSFUL_REQUESTS: '請求成功',
  GATEWAYS_REPLICA_DESC:
    '部署 (Deployment) 用來描述期望應用達到的目標狀態，主要用來描述無狀態應用，副本的數量和狀態由其背後的控制器來維護，確保狀態與定義的期望狀態一致。您可以增加副本數量來滿足更高負載；回滾部署的版本來消除程序的錯誤修改；創建自動伸縮器來彈性應對不同場景下的負載。 ',
  PROJECT_GATEWAY_EMPTY_DESC:
    '集群管理页面不支持项目网关的设置，如需设置需要转到对应项目下进行设置。',
}
