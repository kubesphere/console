/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  POD_IP_POOL_PL: '容器组 IP 池',
  POD_IP_POOL_DESC: '容器组 IP 池用于规划集群内容器组的网络地址空间，您可以按需创建容器组 IP 池。',
  IPPOOL_USAGE_Q: '如何利用 IP 池规划容器组网络？',
  IPPOOL_USAGE_A:
    'IP 池用于规划 Pod 网络地址空间，每个 IP 池之间地址空间不能重叠。创建工作负载时，可选择特定的 IP 池，这样创建出的容器组将从该 IP 池中分配 IP。',
  // List
  POD_IP_POOL_EMPTY_DESC: '请创建一个容器组 IP 池。',
  TOTAL_VALUE: '总计：{value}',
  ALL: '全部',
  NOT_ASSIGNED: '未分配',
  // List > Create
  CREATE_POD_IP_POOL: '创建容器组 IP 池',
  NETWORK_SEGMENT: '网段',
  USED_IP_ADDRESSES: '已用 IP 地址',
  QUANTITY: '数量',
  IP_POOL_CREATE_DESC: '即将创建的容器组 IP 池',
  IP_ADDRESS_EMPTY_DESC: '请输入 IP 地址。',
  MASK_TIP: '请输入掩码。',
  ENTER_NETWORK_SEGMENT_TIP: '请输入网段。',
  IP_POOL_NUM_TIP: '请输入需要创建的容器组 IP 池数量。',
  IP_POOL_CREATE_COUNT_DESC: '最多可同时创建 10 个容器组 IP 池。',
  INVALID_IP_DESC: 'IP 地址格式错误。',
  // List > Edit Information
  // List > View YAML
  // Assign Workspace
  IPPOOL_ASSIGN_WORKSPACE_DESC: '为 IP 池分配一个企业空间。',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING: 'IP 池已被使用，无法分配给另一个具体的企业空间。',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING: 'IP 池已被使用且已指定具体的企业空间，无法更改企业空间。',
  ASSIGN_WORKSPACE: '分配企业空间',
  SELECT_WORKSPACE_DESC: '选择一个企业空间。',
  // List > Delete
  POD_IP_POOL_LOW: '容器组 IP 池',
};
