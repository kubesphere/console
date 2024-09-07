/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Title
  // Navigation Pane > Cluster
  METERING_NOT_ENABLED_DESC:
    '当前模块尚未启用。<a href="{docUrl}/toolbox/metering-and-billing/enable-billing/">了解更多</a>',
  NO_METER_DATA: '未发现资源消费数据。',
  // Navigation Pane > Cluster Node
  // Navigation Pane > Cluster Node > Pod
  // Navigation Pane > Checkbox
  EXPORT_BILL: '导出 CSV 文件格式的消费记录。',
  // Resource Consumption Statictics
  TOTAL_COST: '总金额（{unit}）',
  PRICE_CONFIG_DESC: '尚未配置价格信息。',
  METER_CPU_USAGE: 'CPU 用量',
  METER_MEMORY_USAGE: '内存用量',
  METER_VOLUME_USAGE: '卷用量',
  METER_NET_RECEIVED_USAGE: '入站流量用量',
  METER_NET_TRANSMITTED_USAGE: '出站流量用量',
  NET_RECEIVED: '入站流量',
  NET_TRANSMITTED: '出站流量',
  COMPOSING_APP: '自制应用',
  CLUSTER_NODE_SCAP: '集群节点',
  POD_SCAP: '容器组',
  APP_TEMPLATE_SCAP: '应用模板',
  COMPOSING_APP_SCAP: '自制应用',
  DEPLOYMENT_SCAP: '部署',
  STATEFULSET_SCAP: '有状态副本集',
  DAEMONSET_SCAP: '守护进程集',
  WORKSPACE_SCAP: '企业空间',
  CLUSTER_SCAP: '集群',
  PROJECT_SCAP: '项目',
  SERVICE_SCAP: '服务',
  HOST_CLUSTER_SCAP: '主集群',
  MEMBER_CLUSTER_SCAP: '成员集群',
  // Consumtion History
  CONSUMPTION_HISTORY: '消费历史',
  BILLING_CYCLE: '对账周期',
  CONSUMER_TRENDS: '费用趋势',
  AVERAGE_USAGE: '平均用量',
  TOTAL_CONSUMPTION: '总消费情况',
  TOTAL_CONSUMPTION_Q: '什么是总消费情况？',
  TOTAL_CONSUMPTION_A: '总消费情况表示在当前对账周期中每个计费采样点的资源用量之和。',
  TIMERANGE_MORE_30DAY_MSG: '结束时间与开始时间的间隔大于 30 天时，采样间隔最小为 1 天。',
  MAXIMUM_USAGE: '最大用量',
  MINIMUM_USAGE: '最小用量',
  RESOURCE_TYPE: '资源类型',
  // Current Consumption
  CURRRENT_RESOURCE_CONSUMPTION: '当前消费',
  // Current Consumption > Tip
  METER_RESOURCE_DESC: '1 小时内的资源消费情况',
};
