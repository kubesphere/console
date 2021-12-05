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
  SESSION_AFFINITY: 'Affinity de sesión',
  // More
  EDIT_EXTERNAL_ACCESS: 'Editar acceso a Internet',
  EDIT_MONITORING_EXPORTER: 'Edit Monitoring Exporter',
  EDIT_SERVICE: 'Servicio de edición',
  // More > Edit Service
  // More > Edit Service > Specify Workload
  // More > Edit External Access > Access Mode
  ACCESS_NONE_TIP: 'Internet access is not supported. The Service can be accessed only within the cluster.',
  EXTERNAL_SERVICE: 'Servicio externo',
  // More > Edit Monitoring Exporter
  SERVICE_MONITORING_EXPORTER: 'Service Monitoring Exporter',
  EXPORTER_SERVICE_PORTS: 'Exporter Service Ports',
  SCRAPE_INTERVAL_MIN: 'Scrape Interval (Min)',
  SCRAP_INTERVAL_DESC: 'Monitoring data collection interval, the default is 1 minute.',
  SELECT_AUTHENTICATION_METHOD: 'Select Authentication Method',
  PORT_CONNECTION_AUTHENTICATION: 'Port connection authentication.',
  NO_AUTH_TIP: 'The interface can be directly connected without authentication.',
  CREATE_A_NEW_SECRET: 'Create a new Secret',
  REFRESH_SECRETS: 'refresh Secrets.',
  SCRAP_TIMEOUT_DESC: 'Collection timeout, the default value is 10 seconds',
  CERTIFICATE_AUTHORITY: 'Certificate Authority',
  ENCRYPTION_KEY: 'Encryption Key',
  SERVER_NAME: 'Server Name',
  NO_AUTHENTICATION_TCAP: 'No Authentication',
  TLS_SETTINGS_TCAP: 'TLS Settings',
  BEARER_TOKEN_TCAP: 'Bearer Token',
  BASIC_AUTHENTICATION_TCAP: 'Basic Authentication',
  // More > Edit YAML
  // Details
  EXTERNAL_IP_ADDRESS: 'External IP Address',
  // Resource Status
  MONITORING_EXPORTER: 'Monitoring Exporter',
  MONITORING_EXPORTER_VALUE: 'Monitoring exporter: {value}',
  PORT_PL: 'Ports',
  SERVICE_NODE_PORT_DESC: 'If your current network is on the same network as the cluster node, you can access it through <Cluster IP address>:<NodePort> or through <Node IP address>:<NodePort>.',
  IMAGE_BUILDING_FAILED: 'Image building failed',
  IMAGE_BUILDING_SUCCESSFUL: 'Image building successful',
  BUILDING_IMAGE: 'Building image'
};