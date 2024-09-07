/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Navigation Pane
  GATEWAY_SETTINGS: '网关设置',
  // Banner
  CLUSTER_GATEWAY_DESC: '对集群中的外网访问网关以及服务治理等配置进行设置和管理。',
  // Cluster Gateway
  CLUSTER_GATEWAY_NOT_ENABLED: '集群网关未启用',
  CLUSTER_ENABLE_GATEWAY_DESC: '请启用集群网关。',
  CLUSTER_GATEWAY: '集群网关',
  GATEWAY_ADDRESS_SCAP: '网关地址',
  LOAD_BALANCER_PROVIDER_SCAP: '负载均衡器提供商',
  // Cluster Gateway > Enable Gateway
  ENABLE_GATEWAY: '启用网关',
  GATEWAY_TRACING_TIP:
    '如果启用<b>链路追踪</b>后路由无法访问，请在路由中添加注解 <b>nginx.ingress.kubernetes.io/service-upstream: true</b>。',
  // Cluster Gateway > Manage > View Details
  VIEW_DETAILS: '查看详情',
  // Cluster Gateway > Manage > Disable
  DISABLE: '禁用',
  DISABLE_GATEWAY: '禁用网关',
  DISABLE_GATEWAY_TIP: '您确定禁用网关吗？',
  DISABLE_SUCCESSFUL: '禁用成功。',
  // Cluster Gateway > Manage > Edit
  EDIT: '编辑',
  EDIT_TITLE: '编辑{title}',
  // Cluster Gateway > Manage > Update
  UPDATE: '更新',
  UPDATE_GATEWAY_DESC: '当前网关可以更新。',
  // Project Gateways
  PROJECT_GATEWAY_PL: '项目网关',
  PROJECT_GATEWAY_NOT_ENABLED: '项目网关未启用',
  PROJECT_ENABLE_GATEWAY_DESC: '请启用项目网关。',
  REPLICA_COUNT: '副本数量',
  NODE_PORTS: '节点端口',
  UPDATE_GATEWAY_DESC: '可更新当前网关。',
  // Workspace Gateways
  WORKSPACE_GATEWAY_PL: '企业空间网关',
  // Project Gateways > Disable
  PROJECT_GATEWAY_LOW: '项目网关',
  DISABLE_MULTIPLE_GATEWAYS: '批量禁用网关',
};
