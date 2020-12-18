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
  'Network Subnet': '子网',
  'Network Subnets': '子网管理',
  'Create Subnet': '创建子网',
  'Edit Subnet': '编辑子网',
  'Available IP': '可用IP数',
  'Using IP': '已用IP数',
  'Total IP': '总IP数',
  'Add Nodes': '添加节点',
  'Add Namespace': '添加项目',
  'Subnet Settings': '子网设置',
  'Please Input CIDRBlock': '请输入子网',
  'Add Annotations': '添加注解',
  'Please Select Node': '请选择网关节点',
  'Subnet Name exists': '名称在子网中已经存在',
  'Contains default subnet':
    '所包含的子网 ovn-default/join 为默认子网，无法删除',
  'Please Select Namespace': '请选择项目',

  Subnets: '子网管理',
  Subnet: '子网',

  Gateway: '网关',
  Protocol: '协议类型',
  Vlan: 'VLAN ID',
  Namespaces: '绑定项目',
  CIDR: 'IP地址',
  IPAM: 'IP分布',
  IpAddress: 'IP地址',
  GatewayAddress: '网关地址',
  GatewayNode: '网关节点',
  GatewayType: '网关类型',
  distributed: '分布式',
  centralized: '集中式',
  NatOutgoing: 'NAT',
  MacAddress: 'MAC地址',
  AddressType: '分配方式',
  dynamic: 'DHCP',
  static: '静态分配',
  PodName: '容器组名称',
  SubnetStatus: '分配状态',
  NodeName: '调度节点',
  Default_Subnet: '默认子网',

  SUBNET_DESC:
    '集群中以子网来组织 IP，每个项目可以归属于不同的子网，项目下的 Pod 会自动从所属的子网中获取 IP，并共享子网的网络配置（CIDR，网关类型，访问控制，NAT控制等）。',
  SUBNET_CIDR: 'IP地址范围',
  SUBNET_CREATE_DESC:
    '在集群中我们通过子网组织 IP，一个或多个项目可以被绑定到一个子网中，这些项目下的 Pod 将会从该子网中分配 IP，并使用子网下的网络配置（网关，访问控制，nat 等）。',

  SUBNET_GATEWAY_TYPE: '网关类型',
  SUBNET_DISTRIBUTED_TITLE: '分布式网关',
  SUBNET_DISTRIBUTED_DESC:
    '每个节点(node) 会作为当前节点上应用负载(pod) 访问外部网络的网关',
  SUBNET_CENTRALIZED_TITLE: '集中式网关',
  SUBNET_CENTRALIZED_DESC:
    '应用负载(pod)访问外网的数据包会首先被路由到特定节点(node)上, 便以审计和白名单等安全操作',

  SUBNET_NATOUTGOING_TITLE: 'NAT访问外部网络',
  SUBNET_NATOUTGOING_DESC: '应用负载(pod)访问外部网络将会使用当前网关节点的IP',
  SUBNET_CIDRBLOCK: '子网网段',
  SUBNET_CIDRBLOCK_INVALID: '不合法的地址网段',
  SUBNET_CIDRBLOCK_PLACEHOLDER: '添加子网, 例如: 192.168.1.0/24',
  SUBNET_CIDRBLOCK_EXCLUDEIPS: '排除地址范围',
  SUBNET_NAMESPACE: '关联的项目',
  SUBNET_NODES: '网关节点',

  DELETE_DEFAULT_SUBNET: '默认子网，无法删除!',
  EDIT_DEFAULT_SUBNET: '默认子网, 无法编辑!',
  DELETE_USINGIP_SUBNET: '子网已分配IP, 请等待IP被回收后删除子网',
  CREATE_EXISTS_CIDR: '子网重复定义',
  CREATE_EXISTS_NAMESPACE: '重复关联项目',
  CREATE_CONTAIN_NAMESPACE:
    '重复关联项目, 子网 {name} 已经关联了项目 {namespace}',
}
