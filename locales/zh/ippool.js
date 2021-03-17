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

  'Create Pod IP Pool': '创建容器组 IP 池',

  'IP/Mask Bit': 'IP/掩码位',
  'Used IP': '已用 IP',

  Mask: '掩码',
  'Mask Bit': '掩码位',
  Network: '网络',

  'First Available': '第一个可用',
  'Last Available': '最后可用',
  'Available Number': '可用数量',

  'Pod IP Range': '容器组 IP 池',

  'Number of Creation': '创建数量',
  'Pod IP Pools to be created': '即将创建的容器组 IP 池',
  'Set to be globally available': '设为全局可用',

  'Please input the IP address': '请输入 IP 地址',
  'Please input the mask bit': '请输入掩码位',
  'Please input the IP/mask bit': '请输入 IP 地址/掩码位',

  'Please input the number of Pod IP Pools to be created':
    '请输入需要创建的容器组 IP 池数量',

  POD_IP_POOL_DESC: '集群内容器组 IP 池',
  IP_POOL_CREATE_COUNT_DESC: '可以同时创建多个容器组 IP 池，数量范围为 1～10',
  IPPOOL_USAGE_Q: '如何利用 IP 池规划容器组网络？',
  IPPOOL_USAGE_A:
    'IP 池用于规划 Pod 网络地址空间，每个 IP 池之间地址空间不能重叠。创建工作负载时，可选择特定的 IP 池，这样创建出的容器组将从该 IP 池中分配 IP。',

  IPPOOL_ASSIGN_WORKSPACE_DESC: 'IP 池分配给企业空间之后才能被企业空间使用。',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING:
    'IP 池已被使用，无法分配给某一个具体的企业空间',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING:
    'IP 池已被使用，且已指定具体的企业空间，无法更改目标企业空间',

  IPPOOL_WORKSPACE_EMPTY_TIP: '暂无企业空间使用此 IP 池',
}
