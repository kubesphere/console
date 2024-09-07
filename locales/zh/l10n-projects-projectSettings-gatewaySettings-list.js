/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  PROJECT_GATEWAY_DESC: '对项目中的外网访问网关以及服务治理等配置进行设置和管理。',
  // Project Gateway
  PROJECT_GATEWAY: '项目网关',
  PROJECT_GATEWAY_EMPTY_DESC: '请创建一个项目网关。',
  // Project Gateway > Enable Gateway
  ENABLE_GATEWAY_DESC:
    '在创建应用路由之前，需要先启用外网访问入口，即网关。这一步是创建对应的应用路由控制器，负责将请求转发到对应的后端服务。',
  // Project Gateway > Enable Gateway > NodePort
  // Project Gateway > Enable Gateway > LoadBalancer
  LOAD_BALANCER_PROVIDER: '负载均衡器提供商',
  GATEWAY_UPDATING_TIP: '网关升级中，请稍后再试。',
  // Manage > View Details
  // Manage > Edit
  // Manage > Edit > NodePort
  // Manage > Edit > LoadBalancer
  // Manage > Disable
  // Cluster Gateway (displayed when the cluster gateway and project gateway are both enabled)
  CLUSTER_GATEWAY_GUIDE_DESC:
    '如果同时存在集群网关和项目网关，项目网关禁用后无法再次启用。建议仅使用集群网关或仅使用项目网关。',
};
