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
    'Set up and manage the configuration of the external network access gateway and service management in the cluster and project',
  PROJECT_GATEWAY_DESC:
    'Set up and manage the configuration of the external network access gateway and service management in the cluster and project',
  CLUSTER_GATEWAY: 'Cluster Gateway',
  PROJECT_GATEWAY: 'Project Gateway',
  CLUSTER_GATEWAY_LOW: 'cluster gateway',
  PROJECT_GATEWAY_PL: 'Project Gateways',
  PROJECT_GATEWAY_LOW: 'project gateway',
  CLUSTER_SET_GATEWAY_DESC:
    'Before creating an application route, you need to enable the external network access portal, that is, the gateway. This step is to create the corresponding application routing controller, which is responsible for forwarding the request to the corresponding back-end service. ',
  PROJECT_SET_GATEWAY_DESC:
    'The cluster management page does not support the setting of the project gateway. If you need to set it, you need to go to the corresponding project to set it. ',
  CLUSTER_GATEWAY_NOT_SET: 'Cluster Gateway Not Set',
  PROJECT_GATEWAY_NOT_SET: 'Project Gateway Not Set',
  'Gateway Not Set': 'Gateway Not Set',
  'Set Gateway': 'Set Gateway',
  EDIT_GATEWAY: 'Edit Gateway',
  'Update Gateway': 'Update Gateway',
  GATEWAY_LOW: 'Gateway',
  CONFIGURATION_OPTIONS: 'Gateway Config',
  'Gateway Config': 'Gateway Config',
  GATEWAY_LOGS: 'Gateway Logs',
  'Add Gateway Config': 'Add Gateway Config',
  LOAD_BALANCER_PROVIDER: 'LoadBalancer Provider',
  LOAD_BALANCER_PROVIDER_SCAP: 'Load balancer provider',
  LOAD_BALANCER_SCAP: 'Load balancer',
  LOAD_BALANCERS_SCAP: 'Load balancers',
  USE_DEFAULT_ANNOTATIONS: 'Use Default Annotations',
  GATEWAY_IP: 'Access address',
  UPDATE_GATEWAY_DESC: 'The current gateway can be upgraded',
  DISK_LOG_COLLECTION_DESC:
    'The Log Collection function allows the system to collect container logs saved on volumes. To use this function, you need to mount a volume in read and write mode to a container and set the container to export logs to the volume.',
  UPDATED_GATEWAY_DESC:
    'Please operate during the low peak period of the business. The upgrade process may cause a short business interruption. ',
  UPDATED_GATEWAY_TITLE: 'Confirm to upgrade the gateway?',
  CLUSTER_GATEWAY_GUIDE_DESC:
    'After the cluster gateway is turned on, the project gateway can no longer be set. If the project gateway already exists, it cannot be reset after deleting it. ',
  'Request Count': 'Request Count',
  CONNECTION_COUNT: 'Connections',
  FAILED_REQUEST_COUNT: 'Request Error',
  AVERAGE_LATENCY: 'Average Latency',
  P_FIFTY_LATENCY: 'P50 Latency',
  P_NINETY_FIVE_LATENCY: 'P95 Latency',
  P_NINETY_NINE_LATENCY: 'P99 Latency',
  FOUR_XX_REQUEST_COUNT: '4xx error',
  FIVE_XX_REQUEST_COUNT: '5xx error',
  TOTAL_REQUESTS: 'Total Requests',
  SUCCESSFUL_REQUESTS: 'Request Success',
  GATEWAYS_REPLICA_DESC:
    'Deployment (Deployment) is used to describe the desired target state of the application. It is mainly used to describe the stateless application. The number and state of replicas are maintained by the controller behind it to ensure that the state is consistent with the defined desired state. You can increase the number of replicas to meet higher loads; roll back the deployed version to eliminate erroneous changes to the program; create an autoscaler to flexibly respond to the load in different scenarios. ',
  PROJECT_GATEWAY_EMPTY_DESC:
    'The cluster management page does not support the setting of the project gateway. If you need to set it, you need to go to the corresponding project to set it.',
}
