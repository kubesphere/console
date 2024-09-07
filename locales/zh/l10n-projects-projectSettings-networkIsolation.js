/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  NETWORK_ISOLATION_DESC:
    '通过配置网络隔离控制同一企业空间容器组之间的流量以及来自外部的流量，从而实现隔离应用并增强应用的安全性。',
  NETWORK_ISOLATION_Q: '如何更好地使用网络隔离?',
  NETWORK_ISOLATION_Q1: 'CNI 插件实现网络隔离需满足哪些必要条件？',
  // Network Isolation
  NETWORK_ISOLATION: '网络隔离',
  ENABLE: '启用',
  PROJECT_NETWORK_ISOLATION: '项目网络隔离',
  NETWORK_POLICY_EMP_TITLE: '未启用网络隔离',
  NETWORK_POLICY_EMP_DESC:
    '启用项目网络隔离后，将禁止其他项目访问当前项目，但您可以按需放行项目、服务以及外部 IP 地址。',
  // Network Isolation > Internal Allowlist
  INTERNAL_ALLOWLIST: '内部白名单',
  INTERNAL_ALLOWLIST_TIP: '将企业空间内部的项目和服务添加到白名单。',
  INTERNAL_EGRESS_DESC: '当前项目中的容器组可以访问以下服务和项目的容器组。',
  INTERNAL_INGRESS_DESC: '当前项目中的容器组可以被以下服务和项目的容器组访问。',
  INTERNAL_ALLOWLIST_DESC: '允许当前项目中的容器组与当前企业空间其他项目中的服务进行通信。',
  EMPTY_RESOURCE_DESC: '请选择至少一个项目或服务。',
  // Network Isolation > External Allowlist
  EXTERNAL_ALLOWLIST: '外部白名单',
  EXTERNAL_ALLOWLIST_TIP: '将企业空间外部的网段和端口添加到白名单。',
  EXTERNAL_ALLOWLIST_DESC: '允许当前项目中的容器组与企业空间外部的特定网段和端口进行通信。',
  NETWORK_SEGMENT_EXAMPLE: '例如：10.0.0.0',
  PORT_EXAMPLE: '例如：80',
  EXTERNAL_EGRESS_DESC: '当前项目中的容器组可以访问以下网段和端口。',
  EXTERNAL_INGRESS_DESC: '当前项目中的容器组可以被以下网段和端口访问。',
  SELECT_RULE_DIRECTION_TIP: '请选择流量方向。',
  ENTER_VALID_SEGMENT_DESC: '请输入一个有效的网段。',
  ENTER_VALID_PORT_NUMBER_DESC: '请输入有效端口号。',
  // Add Allowlist Entry
  ADD_ALLOWLIST_ENTRY: '添加白名单条目',
  EXTERNAL_TRAFFIC_DIRECTION_DESC:
    '出站表示从当前项目到企业空间外的方向。入站表示从企业空间外到当前项目的方向。',
  TRAFFIC_DIRECTION: '流量方向',
  NETWORK_SEGMENT_DESC: '设置网段（支持 CIDR）。',
  EGRESS: '出站',
  INGRESS: '入站',
  INTERNAL_TRAFFIC_DIRECTION_DESC:
    '出站表示从当前项目到其他项目的方向。入站表示从其他项目到当前项目的方向。',
  // Add Allowlist Entry > Project
  // Add Allowlist Entry > Service
  // Delete Allowlist Entry
  ALLOWLIST_ENTRY: '白名单条目',
  ALLOWLIST_ENTRY_LOW: '白名单条目',
};
