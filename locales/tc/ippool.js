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
  'Pod IP Pool': '容器組 IP 地址範圍',
  'Pod IP Pools': '容器組 IP 地址範圍',

  CREATE_POD_IP_POOL: '創建容器組 IP 地址範圍',

  NETWORK_SEGMENT: '网段',
  USED_IP_ADDRESSES: '已用 IP 地址',
  'Used IP': '已用 IP',

  MASK: '遮罩',
  Network: '網路',

  'First Available': '第一個可用',
  'Last Available': '最後可用',
  AVAILABLE_ADDRESSES: '可用數量',

  POD_IP_POOL: '容器組 IP 地址範圍',

  NUMBER_OF_CREATION_TCAP: '創建數量',
  IP_POOL_CREATE_DESC: '即將創建的容器組 IP 地址範圍',
  'Set to be globally available': '設為全局可用',

  IP_ADDRESS_EMPTY_DESC: '請輸入 IP 地址。',
  MASK_TIP: '請輸入遮罩。',
  ENTER_NETWORK_SEGMENT_TIP: '請輸入網段。',

  IP_POOL_NUM_TIP: '請輸入需要創建的容器組 IP 地址範圍數量。',

  POD_IP_POOL_DESC: '集群内容器組 IP 地址範圍',
  IP_POOL_CREATE_COUNT_DESC:
    '可以同時創建多個容器組 IP 地址範圍，數量範圍為 1～10',
  IPPOOL_USAGE_Q: '如何利用 IP 地址範圍規劃容器組網路？',
  IPPOOL_USAGE_A:
    'IP 地址範圍用於規劃 Pod 網路地址空間，每個 IP 地址範圍之間地址空間不能。創建工作負載時，可選擇特定的 IP 地址範圍，這樣創建出的容器組將從該 IP 地址範圍中分配 IP。',

  IPPOOL_ASSIGN_WORKSPACE_DESC: '为 IP 地址範圍分配一个企業空間。',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING:
    'IP 地址範圍已被使用，無法分配给另一個具體的企業空間。',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING:
    'IP 地址範圍已被使用且已指定具體的企業空間，無法更改企業空間。',

  IPPOOL_WORKSPACE_EMPTY_TIP: '暫無企業空間使用此 IP 地址範圍',
  // IP Pod Pools List Page
  TOTAL_VALUE: '總計：{value}',
  ALL: '全部',
  NOT_ASSIGNED: '未分配',
  WORKSPACE: '企業空間',
}
