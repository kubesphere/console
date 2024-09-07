/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Title
  // Navigation Pane > Cluster
  METERING_NOT_ENABLED_DESC:
    'This module is not enabled. <a href="{docUrl}/toolbox/metering-and-billing/enable-billing/">Learn More</a>',
  NO_METER_DATA: 'No resource consumption data is found.',
  // Navigation Pane > Cluster Node
  // Navigation Pane > Cluster Node > Pod
  // Navigation Pane > Checkbox
  EXPORT_BILL: 'Export consumption records in CSV file format.',
  // Resource Consumption Statictics
  TOTAL_COST: 'Total Cost ({unit})',
  PRICE_CONFIG_DESC: 'The price information has not been configured.',
  METER_CPU_USAGE: 'CPU 使用量',
  METER_MEMORY_USAGE: '記憶體使用量',
  METER_VOLUME_USAGE: 'Volume Usage',
  METER_NET_RECEIVED_USAGE: 'Inbound Traffic Usage',
  METER_NET_TRANSMITTED_USAGE: 'Outbound Traffic Usage',
  NET_RECEIVED: '入站流量',
  NET_TRANSMITTED: '出站流量',
  COMPOSING_APP: 'Composed app',
  CLUSTER_NODE_SCAP: 'Cluster node',
  POD_SCAP: '容器組',
  APP_TEMPLATE_SCAP: 'App template',
  COMPOSING_APP_SCAP: 'Composed app',
  DEPLOYMENT_SCAP: '部署',
  STATEFULSET_SCAP: '有狀態副本集',
  DAEMONSET_SCAP: '守護進程集',
  WORKSPACE_SCAP: '企業空間',
  CLUSTER_SCAP: '集群',
  PROJECT_SCAP: '項目',
  SERVICE_SCAP: '服務',
  HOST_CLUSTER_SCAP: '主集群',
  MEMBER_CLUSTER_SCAP: 'Member cluster',
  // Consumtion History
  CONSUMPTION_HISTORY: 'Consumption History',
  BILLING_CYCLE: 'Billing Cycle',
  CONSUMER_TRENDS: 'Cost Trends',
  AVERAGE_USAGE: 'Average Usage',
  TOTAL_CONSUMPTION: 'Total Consumption',
  TOTAL_CONSUMPTION_Q: 'What is total consumption?',
  TOTAL_CONSUMPTION_A:
    'Total consumption is the sum of resource usage per sampling point in the current billing cycle.',
  TIMERANGE_MORE_30DAY_MSG:
    'If the interval between the end time and the start time is greater than 30 days, the minimum sampling interval should be 1 day.',
  MAXIMUM_USAGE: 'Maximum Usage',
  MINIMUM_USAGE: 'Minimum Usage',
  RESOURCE_TYPE: 'Resource Type',
  // Current Consumption
  CURRRENT_RESOURCE_CONSUMPTION: 'Current Consumption',
  // Current Consumption > Tip
  METER_RESOURCE_DESC: 'Resource consumption in 1 h',
};
