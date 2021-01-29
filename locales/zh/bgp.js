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
  'BGP Configuration': 'BGP 配置',
  'BGP Configurations': 'BGP 配置',
  'Router ID': '路由器 ID',
  'Listen Port': '监听端口',
  'Add BGP Peer': '添加 BGP 邻居',
  'BGP Peers': 'BGP 邻居',
  'Neighbor ASN': '邻居 ASN',
  'Neighbor IP Address': '邻居 IP 地址',
  'Please input Neighbor ASN': '请输入邻居 ASN',
  'Please input neighbor ip address': '请输入邻居 IP 地址',
  'Edit BGP Global Config': '编辑 BGP 全局配置',
  'Please input ASN': '请输入 ASN',
  'Please input router id': '请输入路由 ID',
  'Invalid router id': '非法 路由 ID',
  'Please input listen port': '请输入监听端口',
  'Edit BGP Peer': '编辑 BGP 邻居',

  BGP_CONFIGURATION_DESC:
    'BGP是一种基于 TCP 协议的动态路由协议，主要应用于不同自治域间交换路由信息和网络可达信息。在使用 BGP 同步路由之前， 您需要配置集群所使用的 ASN（Autonomous System Number）和路由器 ID， 并添加 BGP 邻居， 同时也需要您在路由器上添加集群节点 BGP 邻居。',
  ASN_DESC:
    'AS 是指在一个实体管辖下的拥有相同选路策略的IP网络。BGP 网络中的每个 AS 都被分配一个唯一的 AS 号，用于区分不同的 AS。',
}
