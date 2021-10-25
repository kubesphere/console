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
  GATEWAY_SETTINGS: 'Gateway Settings',
  CLUSTER_GATEWAY_DESC:
    'Set up and manage the configuration of the external network access gateway and service management in the cluster.',
  PROJECT_GATEWAY_DESC:
    'Set up and manage the configuration of the external network access gateway and service management in the project',
  CLUSTER_GATEWAY: 'Cluster Gateway',
  CLUSTER_GATEWAY_LOW: 'cluster gateway',
  PROJECT_GATEWAY_PL: 'Project Gateways',
  PROJECT_GATEWAY_LOW: 'project gateway',
  PROJECT_GATEWAY: 'Project Gateway',
  CLUSTER_SET_GATEWAY_DESC: 'Please set the cluster gateway.',
  PROJECT_SET_GATEWAY_DESC: 'Please set the project gateway.',
  CLUSTER_GATEWAY_NOT_SET: 'Cluster Gateway Not Set',
  PROJECT_GATEWAY_NOT_SET: 'Project Gateway Not Set',
  'Gateway Not Set': 'Gateway Not Set',
  'Set Gateway': 'Set Gateway',
  EDIT_GATEWAY: 'Edit Gateway',
  'Update Gateway': 'Update Gateway',
  CONFIGURATION_OPTIONS: 'Configuration Options',
  'Gateway Config': 'Gateway Config',
  GATEWAY_LOGS: 'Gateway Logs',
  GATEWAY_LOW: 'Gateway',
  'Add Gateway Config': 'Add Gateway Config',
  LOAD_BALANCER_PROVIDER: 'Load Balancer Provider',
  LOAD_BALANCER_PROVIDER_SCAP: 'Load balancer provider',
  LOAD_BALANCER_SCAP: 'Load balancer',
  LOAD_BALANCERS_SCAP: 'Load balancers',
  USE_DEFAULT_ANNOTATIONS: 'Use Default Annotations',
  GATEWAY_IP: 'Access address',
  UPDATE_GATEWAY_DESC: 'The current gateway can be updated.',
  DISK_LOG_COLLECTION_DESC:
    'The Log Collection function allows the system to collect container logs saved on volumes and send the logs to standard output.',
  UPDATED_GATEWAY_DESC:
    'Please operate during the low peak period of the business. The upgrade process may cause a short business interruption. ',
  UPDATED_GATEWAY_TITLE: 'Confirm to upgrade the gateway?',
  CLUSTER_GATEWAY_GUIDE_DESC:
    'If the cluster gateway and project gateway both exist, the project gateway cannot be enabled after it is disabled. You are advised to used either the cluster gateway or project gateway.',
  'Request Count': 'Request Count',
  CONNECTION_COUNT: 'Connections',
  FAILED_REQUEST_COUNT: 'Failed Requests',
  AVERAGE_LATENCY: 'Average Latency',
  P_FIFTY_LATENCY: 'P50 Latency',
  P_NINETY_FIVE_LATENCY: 'P95 Latency',
  P_NINETY_NINE_LATENCY: 'P99 Latency',
  FOUR_XX_REQUEST_COUNT: '4XX Requests',
  FIVE_XX_REQUEST_COUNT: '5XX Requests',
  TOTAL_REQUESTS: 'Total Requests',
  SUCCESSFUL_REQUESTS: 'Successful Requests',
  GATEWAYS_REPLICA_DESC:
    'Deployment (Deployment) is used to describe the desired target state of the application. It is mainly used to describe the stateless application. The number and state of replicas are maintained by the controller behind it to ensure that the state is consistent with the defined desired state. You can increase the number of replicas to meet higher loads; roll back the deployed version to eliminate erroneous changes to the program; create an autoscaler to flexibly respond to the load in different scenarios. ',
  PROJECT_GATEWAY_EMPTY_DESC:
    'The cluster management page does not support the setting of the project gateway. If you need to set it, you need to go to the corresponding project to set it.',
}
