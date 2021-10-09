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
  ALL: 'All',
  'Pod IP Pool': '容器組 IP 地址範圍',
  'Pod IP Pools': '容器組 IP 地址範圍',

  'Create Pod IP Pool': '創建容器組 IP 地址範圍',

  IP_MASK_BIT_TCAP: 'IP / 遮罩位元',
  USED_IP_TCAP: '已用 IP',
  NETWORK_SEGMENT: 'IP / 遮罩位元',
  'Used IP': '已用 IP',

  Mask: '遮罩',
  MASK_BIT_TCAP: '遮罩位元',
  NETWORK: '網路',
  NETWORK_RESOURCE_PL: 'Network Resources',

  STARTING_IP_ADDRESS: '起始 IP 地址',
  ENDING_IP_ADDRESS: '結束 IP 地址',
  AVAILABLE_ADDRESSES: '可用數量',

  POD_IP_POOL: '容器組 IP 地址範圍',
  POD_IP_POOL_PL: '容器組 IP 池',
  POD_IP_POOL_LOW: '容器組 IP 池',
  POD_IP_POOL_EMPTY_DESC: '請創建一個容器組 IP 池。',

  NUMBER_OF_CREATION_TCAP: '創建數量',
  'Pod IP Pools to be created': '即將創建的容器組 IP 地址範圍',
  'Set to be globally available': '設為全局可用',

  'Please input the IP address': '請輸入 IP 地址。',
  MASK_BIT_TIP: '請輸入遮罩位元。',
  'Please input the IP/mask bit': '請輸入 IP 地址 / 遮罩位元',

  IP_POOL_NUM_TIP: '請輸入需要創建的容器組 IP 地址範圍數量。',

  POD_IP_POOL_DESC:
    '容器組 IP 池用於規劃集群內 Pod 的網絡地址空間，您可以按需創建容器組 IP 池。',
  IP_POOL_CREATE_COUNT_DESC:
    '可以同時創建多個容器組 IP 地址範圍，數量範圍為 1～10',
  IPPOOL_USAGE_Q: '如何利用 IP 地址範圍規劃容器組網路？',
  IPPOOL_USAGE_A:
    'IP 地址範圍用於規劃 Pod 網路地址空間，每個 IP 地址範圍之間地址空間不能。創建工作負載時，可選擇特定的 IP 地址範圍，這樣創建出的容器組將從該 IP 地址範圍中分配 IP。',

  IPPOOL_ASSIGN_WORKSPACE_DESC:
    'IP 地址範圍分配给企業空間之後才能被企業空間使用。',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING:
    'IP 地址範圍已被使用，無法分配给某一個具體的企業空間',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING:
    'IP 地址範圍已被使用，且已指定具體的企業空間，無法更改目標企業空間',

  IPPOOL_WORKSPACE_EMPTY_TIP: '暫無企業空間使用此 IP 地址範圍',
}
