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
  // Title
  // Navigation Pane > Cluster
  METERING_NOT_ENABLED_DESC: 'No hay clúster con módulo de medição habilitado',
  NO_METER_DATA: 'Newly created resource, you need to wait an hour before you can view the data',
  // Navigation Pane > Cluster Node
  // Navigation Pane > Cluster Node > Pod
  // Navigation Pane > Checkbox
  EXPORT_BILL: 'Export resource consumption records in csv format',
  // Resource Consumption Statictics
  TOTAL_COST: 'Total amount ({unit})',
  PRICE_CONFIG_DESC: 'Price information has not been configured yet',
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
  // Consumtion History
  CONSUMPTION_HISTORY: 'Consumption by Yesterday',
  BILLING_CYCLE: 'Reconciliation Cycle',
  CONSUMER_TRENDS: 'Consumer Trends',
  AVERAGE_USAGE: 'Average Usage',
  TOTAL_CONSUMPTION: 'Total Consumption',
  TOTAL_CONSUMPTION_Q: 'What does total consumption mean?',
  TOTAL_CONSUMPTION_A: 'Total consumption means the sum of resource usage of each charging sampling point in the current reconciliation cycle',
  TIMERANGE_MORE_30DAY_MSG: 'When the interval between the end time and the start time is greater than 30 days, the minimum interval is 1 day',
  MAXIMUM_USAGE: 'Maximum Usage',
  MINIMUM_USAGE: 'Minimum Usage',
  RESOURCE_TYPE: 'Tipo de recurso',
  // Current Consumption
  CURRRENT_RESOURCE_CONSUMPTION: 'Current Consumption',
  // Current Consumption > Tip
  METER_RESOURCE_DESC: 'Consumption statistics in the last hour'
};