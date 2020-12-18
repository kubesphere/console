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
  IpAddress: 'Ip Address',
  GatewayAddress: 'Gateway Address',
  GatewayNode: 'Gateway Node',
  GatewayType: 'Gateway Type',
  distributed: 'Distributed',
  centralized: 'Centralized',
  NatOutgoing: 'NAT',
  MacAddress: 'Mac Address',
  AddressType: 'Address Type',
  PodName: 'Pod Name',
  SubnetStatus: 'Subnet Status',
  NodeName: 'Node Name',
  Default_Subnet: 'Default Subnet',

  SUBNET_DESC:
    'The cluster organizes IP by subnet, each project can belong to a different subnet, the pod under the project will automatically obtain the IP from the subnet to which it belongs, and share the network configuration of the subnet (CIDR, network type, access control, NAT Control etc.).',
  SUBNET_CIDR: 'Subnet CIDR',
  SUBNET_CREATE_DESC:
    'In the cluster, we organize IP through subnets. One or more projects can be bound to the same subnet. Pods under these projects will allocate IP from this subnet and use the network configuration under the subnet ( Gateway, access control, NAT control, etc.).',

  SUBNET_GATEWAY_TYPE: 'Gateway Type',
  SUBNET_DISTRIBUTED_TITLE: 'Distributed Title',
  SUBNET_DISTRIBUTED_DESC:
    'Each node will serve as a gateway for the pod to access the external network',
  SUBNET_CENTRALIZED_TITLE: 'Subnet Centrialized Title',
  SUBNET_CENTRALIZED_DESC:
    'Pod access to external network data packets will first be routed to a specific node, which is convenient for auditing and whitelisting operations.',

  SUBNET_NATOUTGOING_TITLE: 'NAT Outting Title',
  SUBNET_NATOUTGOING_DESC:
    'Pod access to the external network will use the IP of the current gateway node',
  SUBNET_CIDRBLOCK: 'CIDRBlock',
  SUBNET_CIDRBLOCK_INVALID: 'CIDR Invalid',
  SUBNET_CIDRBLOCK_PLACEHOLDER: 'add subnet, such as: 192.168.1.0/24',
  SUBNET_CIDRBLOCK_EXCLUDEIPS: 'Exclude Ips',
  SUBNET_NAMESPACE: 'Namespaces',
  SUBNET_NODES: 'Nodes',

  DELETE_DEFAULT_SUBNET: "Default Subnet, Can't Delete!",
  EDIT_DEFAULT_SUBNET: "Default Subnet, Can't Edit!",
  DELETE_USINGIP_SUBNET:
    'The subnet has been assigned an IP, please wait for the IP to be recovered and delete the subnet',
  CREATE_EXISTS_CIDR: 'Has Exist CIDR',
  CREATE_EXISTS_NAMESPACE: 'Has Exist Namespace',
  CREATE_CONTAIN_NAMESPACE:
    'Already contains Namespace, Subnet {name} Has Bind Namespace {namespace}',
}
