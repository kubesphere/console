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
  'BGP Configuration': 'BGP Configuration',
  'BGP Configurations': 'BGP Configuration',
  'Router ID': 'Router ID',
  'Listen Port': 'Listen Port',
  'Add BGP Peer': 'Add BGP Peer',
  'BGP Peers': 'BGP Peers',
  'Neighbor ASN': 'Neighbor ASN',
  'Neighbor IP Address': 'Neighbor IP Address',
  'Please input Neighbor ASN': 'Please input Neighbor ASN',
  'Please input neighbor ip address': 'Please input neighbor ip address',
  'Edit BGP Global Config': 'Edit BGP Global Config',
  'Please input ASN': 'Please input ASN',
  'Please input router id': 'Please input router id',
  'Invalid router id': 'Illegal router id',
  'Please input listen port': 'Please input listen port',
  'Edit BGP Peer': 'Edit BGP Peer',

  BGP_CONFIG_DESC:
    'BGP is a dynamic routing protocol based on the TCP protocol, which is mainly used to exchange routing information and network reachability information between different autonomous domains. Before using BGP to synchronize routes, you need to configure the Autonomous System Number (ASN) and router ID used by the cluster, and Add BGP Peers. At the same time, you also need to add cluster node BGP Peers on the router. ',
  ASN_DESC:
    'AS refers to an IP network with the same routing strategy under the jurisdiction of an entity. Each AS in the BGP network is assigned a unique AS number, which is used to distinguish different ASs. ',
}
