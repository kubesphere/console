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
  'Consumption Bill': 'Metering and Billing',
  'Export Bill': 'Export resource consumption records in csv format',
  'Consumption by Yesterday': 'Consumption by Yesterday',
  'Reconciliation Cycle': 'Billing Cycle',
  'Consumer Trends': 'Cost Trends',
  'Current Resources Included': 'Current Resources Included',
  Trend: 'Trend',
  'Average Usage': 'Average Usage',
  'Total Consumption': 'Total Consumption',
  'Total Consumption By Creation': 'has consumed the following since creation:',
  Consumption: 'Consumption',
  'Net Received': 'Inbound Traffic',
  'Net Transmitted': 'Outbound Traffic',
  'View Consumption': 'View Consumption',
  'Select View Type': 'Choose the category you want to view',
  'Cluster Consumption': 'Cluster Resource Consumption',

  CLUSTER_CONSUMPTION_DESC:
    'View metering and billing information of cluster resources.',
  CLUSTER_RESOURCE_CONSUMPTION_DESC:
    'Resource consumption of the <strong>cluster</strong>, including CPU, memory and storage.',
  CLUSTER_NODE_CONSUMPTION_DESC:
    'Resource consumption of <strong>nodes</strong>, including CPU, memory, and storage.',
  'Workspace Consumption': 'Workspace (Project) Resource Consumption',
  WORKSPACE_CONSUMPTION_DESC:
    'View metering and billing information of workspace resources.',
  WORKSPACE_RESOURCE_CONSUMPTION_DESC:
    'Resource consumption of <strong>workspaces</strong>, including CPU, memory, and storage.',
  WORKSPACE_PROJECT_CONSUMPTION_DESC:
    'Resource consumption of workspace <strong>projects</strong>, including CPU, memory, and storage.',
  PROJECT_CONSUMPTION_DESC:
    'Resource consumption of <strong>apps, Services and Pods</strong> in projects, including CPU, memory, and storage.',
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
  'Meter Volume Usage': 'Volume Usage',
  'Meter Net Received Usage': 'Inbound Traffic Usage',
  'Meter Net Transmitted Usage': 'Outbound Traffic Usage',
  'Total Consumer Meaning': 'What does total consumption mean?',
  'Total Consumer Desc':
    'It refers to the total consumption of a resource type within the current billing cycle.',
  TIMERANGE_MORE_30DAY_MSG:
    'When the interval between the end time and the start time is greater than 30 days, the minimum interval is 1 day.',
  TOTAL_COST: 'Total Cost ({unit})',
  '￥': '￥',
  Price: 'Cost',
  PRICE_CONFIG_DESC: 'Price information has not been configured yet.',
  METER_RESOURCE_DESC: 'Consumption in the last hour.',
  'No cluster with metering module enabled': 'No cluster has Metering enabled.',
  INVALID_METERING: 'invalid metering',
}
