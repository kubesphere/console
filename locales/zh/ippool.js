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
  'Pod IP Pool': '容器组 IP 池',
  'Pod IP Pools': '容器组 IP 池',

  CREATE_POD_IP_POOL: '创建容器组 IP 池',

  NETWORK_SEGMENT: '网段',
  USED_IP_ADDRESSES: '已用 IP 地址',
  'Used IP': '已用 IP',

  MASK: '掩码',
  NETWORK: '网络',
  NETWORK_RESOURCE_PL: '网络资源',

  STARTING_IP_ADDRESS: '起始 IP 地址',
  ENDING_IP_ADDRESS: '结束 IP 地址',
  AVAILABLE_ADDRESSES: '可用地址数量',

  POD_IP_POOL: '容器组 IP 池',
  POD_IP_POOL_PL: '容器组 IP 池',
  POD_IP_POOL_LOW: '容器组 IP 池',
  POD_IP_POOL_EMPTY_DESC: '请创建一个容器组 IP 池。',

  NUMBER_OF_CREATION_TCAP: '创建数量',
  IP_POOL_CREATE_DESC: '即将创建的容器组 IP 池',
  'Set to be globally available': '设为全局可用',

  IP_ADDRESS_EMPTY_DESC: '请输入 IP 地址。',
  MASK_TIP: '请输入掩码。',
  ENTER_NETWORK_SEGMENT_TIP: '请输入网段。',

  IP_POOL_NUM_TIP: '请输入需要创建的容器组 IP 池数量。',

  POD_IP_POOL_DESC:
    '容器组 IP 池用于规划集群内 Pod 的网络地址空间，您可以按需创建容器组 IP 池。',
  IP_POOL_CREATE_COUNT_DESC: '可以同时创建多个容器组 IP 池，数量范围为 1～10',
  IPPOOL_USAGE_Q: '如何利用 IP 池规划容器组网络？',
  IPPOOL_USAGE_A:
    'IP 池用于规划 Pod 网络地址空间，每个 IP 池之间地址空间不能重叠。创建工作负载时，可选择特定的 IP 池，这样创建出的容器组将从该 IP 池中分配 IP。',

  IPPOOL_ASSIGN_WORKSPACE_DESC: '为 IP 池分配一个企业空间。',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING:
    'IP 池已被使用，无法分配给另一个具体的企业空间。',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING:
    'IP 池已被使用且已指定具体的企业空间，无法更改企业空间。',

  IPPOOL_WORKSPACE_EMPTY_TIP: '暂无企业空间使用此 IP 池',
  // IP Pod Pools List Page
  TOTAL_VALUE: '总计：{value}',
  ALL: '全部',
  NOT_ASSIGNED: '未分配',
}
