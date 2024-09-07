/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  SERVICE_PL: '服务',
  SERVICE_DESC:
    '服务（Service）提供一种抽象的方法，将运行在容器组（Pod）上的应用程序公开为网络服务。',
  // List
  SERVICE_EMPTY_DESC: '请创建一个服务。',
  UNKNOWN: '未知',
  EXTERNAL_ACCESS: '外部访问',
  INTERNAL_ACCESS: '内部访问',
  // List > Edit YAML
  // List > Edit Service
  UNKNOWN_SERVICE_TYPE: '未知服务类型',
  // List > Delete
  SERVICE: '服务',
  SERVICE_LOW: '服务',
  // List > Create
  INTERNAL_ACCESS_MODE: '内部访问模式',
  CREATE_SERVICE: '创建服务',
  // List > Create > Basic Information
  SERVICE_NAME_DESC:
    '名称只能包含小写字母、数字和连字符（-），必须以小写字母开头并以小写字母或数字结尾，最长 63 个字符。',
  // List > Create > Service Settings
  VIRTUAL_IP_TITLE: '虚拟 IP 地址',
  INTERNAL_DOMAIN_NAME: '内部域名',
  CONTAINER_PORT: '容器端口',
  INVALID_PORT: '端口无效。',
  PORT_EMPTY: '请设置至少一个端口。',
  ENTER_SELECTOR_TIP: '请设置工作负载选择器。',
  Ports: '端口',
  SPECIFY_WORKLOAD: '指定工作负载',
  SELECT_WORKLOAD_DESC: '使用工作负载的标签作为选择器。',
  VIRTUAL_IP_DESC: '为服务分配虚拟 IP 地址，可通过虚拟 IP 地址在集群内部访问服务。',
  INTERNAL_DOMAIN_NAME_DESC: '不为服务分配 IP 地址，可通过集群的 DNS 机制在集群内部访问服务。',
  SERVICE_PORTS_DESC: '设置容器端口和服务端口。',
  NO_WORKLOAD_MATCH_SELECTOR: '没有工作负载匹配当前选择器。',
  WORKLOADS_MATCH_SELECTOR_SI: '当前选择器（{selector}）与 {count} 个工作负载匹配。',
  WORKLOADS_MATCH_SELECTOR_PL: '当前选择器（{selector}）与 {count} 个工作负载匹配。',
  WORKLOAD_SELECTOR: '工作负载选择器',
  SERVICE_SETTINGS: '服务设置',
  // List > Create > Service Settings > Workload Selector > View Details
  TOTAL_WORKLOADS_VALUE: '工作负载总数：{count}',
  // List > Create > Advanced Settings
  OPENELB_NOT_READY: 'OpenELB 未安装。请安装 OpenELB。',
  SESSION_PERSISTENCE: '会话保持',
  MAXIMUM_STICKINESS_DURATION: '最长会话保持时间（s）',
  SESSION_PERSISTENCE_DESC:
    '设置系统在指定的时间内将同一个会话中来自同一个客户端的请求全部转发给同一个容器组。',
  SERVICE_EXTERNAL_ACCESS_DESC: '设置从集群外访问服务的方式。',
  ACCESS_NODEPORT_TIP: '通过集群节点的端口访问服务。',
  ACCESS_LOADBALANCER_TIP: '通过负载均衡器访问服务。',
  WORKLOAD_ANNOTATIONS: '工作负载注解',
  LABEL_FORMAT_DESC:
    '标签的键和值只能包含字母、数字、连字符（-）、下划线（_）和句点（.），必须以数字或字母开头和结尾。键和值分别最长 63 个字符（如键包含域名则最长 253 个字符）。',
};
