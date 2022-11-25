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
  // Attributes
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
  COLLECTION_INTERVAL_MIN: 'Collection Interval (min)',
  COLLECTION_INTERVAL_MIN_DESC: 'Interval in minutes between two metric collection operations. The default value is 1.',
  COLLECTION_TIMEOUT_DESC: 'Timeout interval in seconds of each collection operation. The default value is 10.',
  SELECT_AUTHENTICATION_METHOD: '選擇認證方式',
  SELECT_AUTHENTICATION_METHOD_DESC: 'Select the authentication method used during metric collection.',
  NO_AUTHENTICATION_TCAP: 'No Authentication',
  NO_AUTHENTICATION_TIP: 'Authentication is not used during metric collection.',
  CREATE_A_NEW_SECRET: '建創新保密字典',
  REFRESH_SECRETS: '刷新保密字典。',
  CERTIFICATE_AUTHORITY: 'Certificate Authority',
  SERVER_NAME: 'Server Name',
  TLS_SETTINGS_TCAP: 'TLS Settings',
  BEARER_TOKEN_TCAP: 'Bearer Token',
  BASIC_AUTHENTICATION_TCAP: 'Basic Authentication',
  // More > Edit YAML
  // Attributes
  EXTERNAL_IP_ADDRESS: '外部 IP 地址',
  // Resource Status
  MONITORING_EXPORTER: '監控導出器',
  MONITORING_EXPORTER_VALUE: 'Monitoring exporter: {value}',
  PORT_PL: '通訊埠',
  SERVICE_NODE_PORT_DESC: '如果您目前的網路與集群節點在同一網路内，那麼您可以透通<集群 IP 地址>:<NodePort>進行訪問，或者通過<節點 IP 地址>:<NodePort>進行訪問。',
  IMAGE_BUILDING_FAILED: 'Image building failed',
  IMAGE_BUILDING_SUCCESSFUL: 'Image building successful',
  BUILDING_IMAGE: 'Building image'
};