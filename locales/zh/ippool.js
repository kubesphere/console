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
  'IP Pool': 'IP 地址范围',
  'IP Pools': 'IP 地址范围',

  'Create IP Pool': '创建 IP 地址范围',

  'IP/Mask': 'IP/掩码位',
  'Used IP': '已用 IP',

  Mask: '掩码',
  Network: '网络',

  'First Available': '第一个可用',
  'Last Available': '最后可用',
  'Available Number': '可用数量',

  'Base Network': '基础网络',
  'Pod IP Range': '容器组 IP 地址范围',

  'Number of Creations': '创建数量',
  'CIDRs to be created': '即将创建的CIDR',
  'Set to be globally available': '设为全局可用',

  IP_POOL_DESC: '集群内容器组 IP 地址范围',
  IPPOOL_USAGE_Q: '如何利用 IP 地址范围规划容器组网络？',
  IPPOOL_USAGE_A:
    'IP 地址范围用于规划Pod网络地址空间， 每个 IP 地址范围之间地址空间不能重叠，为了更好的使用 IP 地址范围可以结合网络策略加强租户隔离。',

  DEFAULT_NETWORK_DESC: '容器组默认网络地址范围',

  IPPOOL_ASSIGN_WORKSPACE_DESC:
    'IP 地址范围分配给企业空间之后才能被企业空间使用。如果企业空间没有被分配，那么它将会使用默认 IP 地址范围',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING:
    'IP 地址范围已被使用，无法分配给某一个具体的企业空间',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING:
    'IP 地址范围已被使用, 且已指定具体的企业空间，无法更改目标企业空间',

  IPPOOL_WORKSPACE_EMPTY_TIP: '暂无企业空间使用此 IP 地址范围',
}
