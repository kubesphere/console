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
  'Export Bill': 'Export resource consumption records in csv format',
  'Consumption by Yesterday': 'Consumption by Yesterday',
  'Reconciliation Cycle': 'Reconciliation Cycle',
  'Consumer Trends': 'Consumer Trends',
  'Current Resources Included': 'Current Resources Included',
  Trend: 'Trend',
  'Average Usage': 'Average Usage',
  'Total Consumption': 'Total Consumption',
  'Total Consumption By Creation': 'has been consumed since its creation',
  Consumption: 'Consumption',
  'Net Received': 'Net Received',
  'Net Transmitted': 'Net Transmitted',
  'View Consumption': 'View Consumption',
  'Select View Type': 'Choose the category you want to view',
  'Cluster Consumption': 'Cluster resource consumption',

  CLUSTER_CONSUMPTION_DESC:
    'Cluster resource consumption statistics take cluster as the dimension to calculate the CPU, memory, storage and other resource consumption of clusters, nodes, and projects',
  CLUSTER_RESOURCE_CONSUMPTION_DESC:
    '<strong>Cluster</strong> CPU, memory, storage and other resource consumption',
  CLUSTER_NODE_CONSUMPTION_DESC:
    'Resource consumption of <strong>nodes</strong> in the cluster, such as CPU, memory, and storage',
  'Workspace Consumption': 'Workspace (project) resource consumption',
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
  'Max Usage': 'Max Usage',
  'Min Usage': 'Min Usage',
  'Meter CPU Usage': 'CPU Usage',
  'Meter Memory Usage': 'Memory Usage',
  'Meter Volume Usage': 'Storage Volume Usage',
  'Meter Net Received Usage': 'Network Incoming Usage',
  'Meter Net Transmitted Usage': 'Network Outbound Usage',
  'Total Consumer Meaning': 'What does total consumption mean?',
  'Total Consumer Desc':
    'Total consumption means the sum of resource usage of each charging sampling point in the current reconciliation cycle',
  TIMERANGE_MORE_30DAY_MSG:
    'When the interval between the end time and the start time is greater than 30 days, the minimum interval is 1 day',
  TOTAL_COST: 'Total amount ({unit})',
  '￥': '￥',
  Price: 'Price',
  PRICE_CONFIG_DESC: 'Price information has not been configured yet',
  METER_RESOURCE_DESC: 'Consumption statistics in the last hour',
  'No cluster with metering module enabled':
    'No hay clúster con módulo de medição habilitado',
  INVALID_METERING: 'MEDIÇÃO INVÁLIDA',
}
