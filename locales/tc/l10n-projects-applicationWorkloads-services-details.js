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
  // Details
  ENDPOINT: 'Endpoint',
  SESSION_AFFINITY: '會話親和性',
  // More
  EDIT_EXTERNAL_ACCESS: '編輯外網訪問',
  EDIT_MONITORING_EXPORTER: 'Edit Monitoring Exporter',
  EDIT_SERVICE: '編輯服務',
  // More > Edit Service
  // More > Edit Service > Specify Workload
  // More > Edit External Access > Access Mode
  ACCESS_NONE_TIP: '不提供外網訪問。',
  EXTERNAL_SERVICE: '外部服務',
  // More > Edit Monitoring Exporter
  SERVICE_MONITORING_EXPORTER: '服務監控導出器',
  EXPORTER_SERVICE_PORTS: '導出服務端口',
  SCRAPE_INTERVAL_MIN: '採集間隔（分鐘）',
  SCRAP_INTERVAL_DESC: '監控數據採集區間隔，默認為 1 分鐘',
  SELECT_AUTHENTICATION_METHOD: '選擇認證方式',
  PORT_CONNECTION_AUTHENTICATION: '端口連接認證。',
  NO_AUTH_TIP: '接口可直接連接，無須認證。',
  CREATE_A_NEW_SECRET: '建創新保密字典',
  REFRESH_SECRETS: '刷新保密字典。',
  SCRAP_TIMEOUT_DESC: '超時，默認值 10 秒',
  CERTIFICATE_AUTHORITY: 'Certificate Authority',
  ENCRYPTION_KEY: 'Encryption Key',
  SERVER_NAME: 'Server Name',
  NO_AUTHENTICATION_TCAP: 'No Authentication',
  TLS_SETTINGS_TCAP: 'TLS Settings',
  BEARER_TOKEN_TCAP: 'Bearer Token',
  BASIC_AUTHENTICATION_TCAP: 'Basic Authentication',
  // More > Edit YAML
  // Details
  EXTERNAL_IP_ADDRESS: '外部 IP 地址',
  // Resource Status
  MONITORING_EXPORTER: '監控導出器',
  MONITORING_EXPORTER_VALUE: 'Monitoring exporter: {value}',
  PORT_PL: 'Ports',
  SERVICE_NODE_PORT_DESC: '如果您目前的網路與集群節點在同一網路内，那麼您可以透通<集群 IP 地址>:<NodePort>進行訪問，或者通過<節點 IP 地址>:<NodePort>進行訪問。',
  IMAGE_BUILDING_FAILED: 'Image building failed',
  IMAGE_BUILDING_SUCCESSFUL: 'Image building successful',
  BUILDING_IMAGE: 'Building image'
};