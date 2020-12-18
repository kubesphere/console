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

export default {
  'Network Subnet': '子網',
  'Network Subnets': '子網管理',
  'Create Subnet': '創建子網',
  'Edit Subnet': '編輯子網',
  'Available IP': '可用IP數',
  'Using IP': '已用IP數',
  'Total IP': '總IP數',
  'Add Nodes': '添加節點',
  'Add Namespace': '添加項目',
  'Subnet Settings': '子網設置',
  'Please Input CIDRBlock': '請輸入子網',
  'Please Select Node': '請選擇網關節點',
  'Subnet Name exists': '名稱在子網中已存在',
  'Contains default subnet':
    '所包含的子網 ovn-default/join 為默認子網，無法刪除',
  'Please Select Namespace': '請選擇項目',

  Subnets: '子網管理',
  Subnet: '子網',

  Gateway: '網關',
  Protocol: '協議類型',
  Vlan: 'VLAN ID',
  Namespaces: '綁定項目',
  CIDR: 'IP地址',
  IPAM: 'IP分佈',
  IpAddress: 'IP地址',
  GatewayAddress: '網關地址',
  GatewayNode: '網關節點',
  GatewayType: '網關類型',
  distributed: '分佈式',
  centralized: '集中式',
  NatOutgoing: 'NAT',
  MacAddress: 'MAC地址',
  AddressType: '分配方式',
  PodName: '容器組名稱',
  SubnetStatus: '分配狀態',
  NodeName: '調度節點',
  Default_Subnet: '默認子網',

  SUBNET_DESC:
    '集群以子網來組織 IP，每個項目可以歸屬不同的子網，項目下的 pod 會自動從所屬的子網中獲取IP,併共享子網的網絡配置（CIDR, 網絡類型，訪問控制，NAT控制等）。',
  SUBNET_CIDR: 'IP地址範圍',
  SUBNET_CREATE_DESC:
    '在集群中我們通過子網組織IP,一個或者多個項目可以被綁定到同一個子網中，這些項目下的Pod將會從該子網中分配IP,並使用子網下的網絡配置（網關，訪問控制，NAT控制等）。',

  SUBNET_GATEWAY_TYPE: '網關類型',
  SUBNET_DISTRIBUTED_TITLE: '分佈式網關',
  SUBNET_DISTRIBUTED_DESC:
    '每個節點(node) 會作為當前負載上(pod) 訪問外部網絡的網關',
  SUBNET_CENTRALIZED_TITLE: '集中式網關',
  SUBNET_CENTRALIZED_DESC:
    '應用負載(pod)訪問外部網絡的數據包會首先被路由到特定的節點(node)上, 便於審計和白名單等操作',

  SUBNET_NATOUTGOING_TITLE: 'NAT訪問外部網絡',
  SUBNET_NATOUTGOING_DESC: '應用負載(pod)訪問外部網絡將會使用當前網關節點的IP',
  SUBNET_CIDRBLOCK: '子網網段',
  SUBNET_CIDRBLOCK_INVALID: '不合法的地址',
  SUBNET_CIDRBLOCK_PLACEHOLDER: '添加子網, 例如: 192.168.1.0/24',
  SUBNET_CIDRBLOCK_EXCLUDEIPS: '排除地址範圍',
  SUBNET_NAMESPACE: '關聯的項目',
  SUBNET_NODES: '網關節點',

  DELETE_DEFAULT_SUBNET: '默認子網，無法刪除!',
  EDIT_DEFAULT_SUBNET: '默認子網，無法編輯!',
  DELETE_USINGIP_SUBNET: '子網已經分配IP, 請等待IP回收後刪除子網',
  CREATE_EXISTS_CIDR: '子網重複定義',
  CREATE_EXISTS_NAMESPACE: '重複關聯項目',
  CREATE_CONTAIN_NAMESPACE:
    '重複關聯項目, 子網 {name} 已經關聯了項目 {namespace}',
}
