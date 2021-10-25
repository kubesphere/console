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
  Memory: 'Memory',
  EXPORT_BILL: 'Export consumption records in CSV file format.',
  CONSUMPTION_HISTORY: 'Consumption History',
  BILLING_CYCLE: 'Billing Cycle',
  CONSUMER_TRENDS: 'Cost Trends',
  CURRENT_RESOURCE_CONSUMPTION: 'Current Consumption',
  Trend: 'Trend',
  AVERAGE_USAGE: 'Average Usage',
  TOTAL_CONSUMPTION: 'Total Consumption',
  'Total Consumption By Creation': 'has consumed the following since creation:',
  Consumption: 'Consumption',
  'Net Received': 'Inbound Traffic',
  'Net Transmitted': 'Outbound Traffic',
  VIEW: 'View',
  RESOURCE_CONSUMPTION_DESC:
    'Select a category to view the resource consumption information.',
  CLUSTER_CONSUMPTION: 'Cluster Resource Consumption',

  CLUSTER_CONSUMPTION_DESC:
    'View the consumption information of cluster resources.',
  CLUSTER_RESOURCE_CONSUMPTION_DESC:
    'Consumption of resources such as CPU, memory, and volumes of <strong>clusters</strong>',
  CLUSTER_NODE_CONSUMPTION_DESC:
    'Consumption of resources such as CPU, memory, and volumes of cluster <strong>nodes</strong>',
  WORKSPACE_CONSUMPTION: 'Workspace Resource Consumption',
  CLUSTER_POD_CONSUMPTION_DESC:
    'Consumption of CPU and memory of <strong>Pods</strong> in nodes',
  WORKSPACE_CONSUMPTION_DESC:
    'View the consumption information of workspace resources.',
  WORKSPACE_RESOURCE_CONSUMPTION_DESC:
    'Consumption of resources such as CPU, memory, and volumes of <strong>workspaces</strong>',
  WORKSPACE_PROJECT_CONSUMPTION_DESC:
    'Consumption of resources such as CPU, memory, and volumes of <strong>projects</strong> in workspaces',
  PROJECT_CONSUMPTION_DESC:
    'Consumption of CPU and memory of <strong>apps</strong>, <strong>Services</strong> and <strong>Pods</strong> in projects',
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
  'Meter Volume Usage': 'Volume Usage',
  'Meter Net Received Usage': 'Inbound Traffic Usage',
  'Meter Net Transmitted Usage': 'Outbound Traffic Usage',
  TOTAL_CONSUMPTION_Q: 'What is total consumption?',
  TOTAL_CONSUMPTION_A:
    'Total consumption is the sum of resource usage per sampling point in the current billing cycle.',
  TIMERANGE_MORE_30DAY_MSG:
    'If the interval between the end time and the start time is greater than 30 days, the minimum sampling interval should be 1 day.',
  TOTAL_COST: 'Total Cost ({unit})',
  '￥': '￥',
  Price: 'Cost',
  PRICE_CONFIG_DESC: 'The price information has not been configured.',
  METER_RESOURCE_DESC: 'Resource consumption in 1 h',
  METERING_NOT_ENABLED_DESC:
    'This module is not enabled. <a href="https://v3-1.docs.kubesphere.io/docs/toolbox/metering-and-billing/enable-billing/">Learn More</a>',
  INVALID_METERING: 'invalid metering',
  NO_METER_DATA: 'No resource consumption data is found.',

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
