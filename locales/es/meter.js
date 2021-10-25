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
  'Consumption Bill': 'Consumption Bill',
  Memory: 'Memory',
  EXPORT_BILL: 'Export resource consumption records in csv format',
  CONSUMPTION_HISTORY: 'Consumption by Yesterday',
  BILLING_CYCLE: 'Reconciliation Cycle',
  CONSUMER_TRENDS: 'Consumer Trends',
  CURRENT_RESOURCE_CONSUMPTION: 'Current Resources Included',
  Trend: 'Trend',
  AVERAGE_USAGE: 'Average Usage',
  TOTAL_CONSUMPTION: 'Total Consumption',
  'Total Consumption By Creation': 'has been consumed since its creation',
  Consumption: 'Consumption',
  'Net Received': 'Net Received',
  'Net Transmitted': 'Net Transmitted',
  VIEW: 'View',
  RESOURCE_CONSUMPTION_DESC: 'Choose the category you want to view',
  CLUSTER_CONSUMPTION: 'Cluster resource consumption',

  CLUSTER_CONSUMPTION_DESC:
    'View metering and billing information of cluster resources.',
  CLUSTER_RESOURCE_CONSUMPTION_DESC:
    '<strong>Cluster</strong> CPU, memory, storage and other resource consumption',
  CLUSTER_NODE_CONSUMPTION_DESC:
    'Resource consumption of <strong>nodes</strong> in the cluster, such as CPU, memory, and storage',
  WORKSPACE_CONSUMPTION: 'Workspace (project) resource consumption',
  CLUSTER_POD_CONSUMPTION_DESC:
    'Resource consumption of <strong>Pods</strong> in a node, such as CPU and memory',
  WORKSPACE_CONSUMPTION_DESC:
    'Workspace (project) resource consumption statistics take the workspace as the dimension to calculate the CPU, memory, storage and other resource consumption of workspace and projects',
  WORKSPACE_RESOURCE_CONSUMPTION_DESC:
    '<strong>Workspace</strong> CPU, memory, storage and other resource consumption',
  WORKSPACE_PROJECT_CONSUMPTION_DESC:
    'The consumption of CPU, memory, storage and other resources of the <strong>project</strong> in the workspace',
  PROJECT_CONSUMPTION_DESC:
    'The consumption of CPU, memory, storage and other resources of <strong>applications, services, container groups</strong> and other resources in the project',
  APP_CONSUMPTION_DESC:
    'Application store template resource consumption statistics',
  APP_RESOURCE_CONSUMPTION_DESC:
    'Application store template resource consumption statistics support querying the number of times a template has been deployed on the KubeSphere platform, and support the following queries',
  APP_WORKSPACE_CONSUMPTION_DESC:
    'The number of deployments of the application template in the <strong>workspace</strong>',
  APP_WORKSPACE_PROJECT_CONSUMPTION_DESC:
    'The number of deployments of the application template in a <strong>project</strong> in the workspace',
  MAXIMUM_USAGE: 'Maximum Usage',
  MINIMUM_USAGE: 'Minimum Usage',
  'Meter CPU Usage': 'CPU Usage',
  'Meter Memory Usage': 'Memory Usage',
  'Meter Volume Usage': 'Storage Volume Usage',
  'Meter Net Received Usage': 'Network Incoming Usage',
  'Meter Net Transmitted Usage': 'Network Outbound Usage',
  TOTAL_CONSUMPTION_Q: 'What does total consumption mean?',
  TOTAL_CONSUMPTION_A:
    'Total consumption means the sum of resource usage of each charging sampling point in the current reconciliation cycle',
  TIMERANGE_MORE_30DAY_MSG:
    'When the interval between the end time and the start time is greater than 30 days, the minimum interval is 1 day',
  TOTAL_COST: 'Total amount ({unit})',
  '￥': '￥',
  Price: 'Price',
  PRICE_CONFIG_DESC: 'Price information has not been configured yet',
  METER_RESOURCE_DESC: 'Consumption statistics in the last hour',
  METERING_NOT_ENABLED_DESC: 'No hay clúster con módulo de medição habilitado',
  INVALID_METERING: 'MEDIÇÃO INVÁLIDA',

  NO_METER_DATA:
    'Newly created resource, you need to wait an hour before you can view the data',

  // Resource Consumption Statistics
  METER_CPU_USAGE: 'CPU Usage',
  METER_MEMORY_USAGE: 'Memory Usage',
  METER_VOLUME_USAGE: 'Volume Usage',
  METER_NET_RECEIVED_USAGE: 'Inbound Traffic Usage',
  METER_NET_TRANSMITTED_USAGE: 'Outbound Traffic Usage',
  NET_RECEIVED: 'Inbound Traffic',
  NET_TRANSMITTED: 'Outbound Traffic',
  COMPOSING_APP: 'Composed app',
  CLUSTER_NODE_SCAP: 'Cluster node',
  POD_SCAP: 'Pod',
  APP_TEMPLATE_SCAP: 'Template-based app',
  COMPOSING_APP_SCAP: 'Composed app',
  DEPLOYMENT_SCAP: 'Deployment',
  STATEFULSET_SCAP: 'StatefulSet',
  DAEMONSET_SCAP: 'DaemonSet',
  WORKSPACE_SCAP: 'Workspace',
  CLUSTER_SCAP: 'Cluster',
  PROJECT_SCAP: 'Project',
  SERVICE_SCAP: 'Service',
  HOST_CLUSTER_SCAP: 'Host cluster',
  MEMBER_CLUSTER_SCAP: 'Member cluster',
}
