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
  GATEWAY_SETTING: 'Gateway Settings',
  GATEWAY_DESC:
    'Set up and manage the configuration of the external network access gateway and service management in the cluster and project',
  CLUSTER_GATEWAY: 'Cluster Gateway',
  PROJECT_GATEWAY: 'Project Gateway',
  CLUSTER_GATEWAYS_SETTING_DESC:
    'Before creating an application route, you need to enable the external network access portal, that is, the gateway. This step is to create the corresponding application routing controller, which is responsible for forwarding the request to the corresponding back-end service. ',
  PROJECT_GATEWAYS_SETTING_DESC:
    'The cluster management page does not support the setting of the project gateway. If you need to set it, you need to go to the corresponding project to set it. ',
  'Cluster Gateway Not Set': 'Cluster Gateway Not Set',
  'Project Gateway Not Set': 'Project Gateway Not Set',
  'Gateway Not Set': 'Gateway Not Set',
  'View Gateway': 'View Gateway',
  'Set Gateway': 'Set Gateway',
  'Edit Gateway': 'Edit Gateway',
  'Update Gateway': 'Update Gateway',
  'Gateway Config': 'Gateway Config',
  'Add Gateway Config': 'Add Gateway Config',
  'LoadBalancer Support': 'LoadBalancer Provider',
  'Use default annotations': 'Use default annotations',
  GATEWAY_IP: 'Access address',
  UPDATE_GATEWAY_DESC: 'The current gateway can be upgraded',
  DISK_LOG_COLLECTION_DESC:
    'The Log Collection function allows the system to collect container logs saved on volumes and send the logs to standard output.',
  UPDATED_GATEWAY_DESC:
    'Please operate during the low peak period of the business. The upgrade process may cause a short business interruption. ',
  UPDATED_GATEWAY_TITLE: 'Confirm to upgrade the gateway?',
  CLUSTER_GATEWAY_GUIDE_DESC:
    'After the cluster gateway is turned on, the project gateway can no longer be set. If the project gateway already exists, it cannot be reset after deleting it. ',
  'Request Count': 'Request Count',
  'Active Connections': 'Number of connections',
  'Request Duration': 'Request Duration',
  'Request Error': 'Request Error',
  'Duration Average': 'Average Delay',
  'Duration 50percentage': 'P50 delay',
  'Duration 95percentage': 'P95 delay',
  'Duration 99percentage': 'P99 delay',
  'Request 4xx': '4xx error',
  'Request 5xx': '5xx error',
  'Total Requests': 'Total Requests',
  'Request Success': 'Request Success',
  GATEWAYS_REPLICA_DESC:
    'Deployment (Deployment) is used to describe the desired target state of the application. It is mainly used to describe the stateless application. The number and state of replicas are maintained by the controller behind it to ensure that the state is consistent with the defined desired state. You can increase the number of replicas to meet higher loads; roll back the deployed version to eliminate erroneous changes to the program; create an autoscaler to flexibly respond to the load in different scenarios. ',
}
