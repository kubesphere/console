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
  SESSION_AFFINITY: 'Session Affinity',
  // More
  EDIT_EXTERNAL_ACCESS: 'Edit External Access',
  EDIT_MONITORING_EXPORTER: 'Edit Monitoring Exporter',
  EDIT_SERVICE: 'Edit Service',
  // More > Edit Service
  // More > Edit Service > Specify Workload
  // More > Edit External Access > Access Mode
  ACCESS_NONE_TIP: 'Internet access is not supported. The service can be accessed only within the cluster.',
  EXTERNAL_SERVICE: 'External Service',
  // More > Edit Monitoring Exporter
  COLLECTION_INTERVAL_MIN: 'Collection Interval (min)',
  COLLECTION_INTERVAL_MIN_DESC: 'Interval in minutes between two metric collection operations. The default value is 1.',
  COLLECTION_TIMEOUT_DESC: 'Timeout interval in seconds of each collection operation. The default value is 10.',
  SELECT_AUTHENTICATION_METHOD: 'Select Authentication Method',
  SELECT_AUTHENTICATION_METHOD_DESC: 'Select the authentication method used during metric collection.',
  NO_AUTHENTICATION_TCAP: 'No Authentication',
  NO_AUTHENTICATION_TIP: 'Authentication is not used during metric collection.',
  CREATE_A_NEW_SECRET: 'Create a new secret',
  REFRESH_SECRETS: 'refresh secrets.',
  CERTIFICATE_AUTHORITY: 'Certificate Authority',
  SERVER_NAME: 'Server Name',
  TLS_SETTINGS_TCAP: 'TLS Settings',
  BEARER_TOKEN_TCAP: 'Bearer Token',
  BASIC_AUTHENTICATION_TCAP: 'Basic Authentication',
  // More > Edit YAML
  // Attributes
  EXTERNAL_IP_ADDRESS: 'External IP Address',
  // Resource Status
  MONITORING_EXPORTER: 'Monitoring Exporter',
  MONITORING_EXPORTER_VALUE: 'Monitoring exporter: {value}',
  PORT_PL: 'Ports',
  SERVICE_NODE_PORT_DESC: 'If your client machine is on the same network as the cluster, you can use <Node IP address>:<Node port> to access the service.',
  IMAGE_BUILDING_FAILED: 'Image building failed',
  IMAGE_BUILDING_SUCCESSFUL: 'Image building successful',
  BUILDING_IMAGE: 'Building image'
};