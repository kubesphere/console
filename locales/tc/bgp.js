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
  'Listen Port': '監聽端口',
  'Add BGP Peer': '添加 BGP 鄰居',
  'BGP Peers': 'BGP 鄰居',
  'Neighbor ASN': '鄰居 ASN',
  'Neighbor IP Address': '鄰居 IP 地址',
  'Please input Neighbor ASN': '請輸入鄰居 ASN',
  'Please input neighbor ip address': '請輸入鄰居 IP 地址',
  'Edit BGP Global Config': '編輯 BGP 全局配置',
  'Please input ASN': '請輸入 ASN',
  'Please input router id': '請輸入路由 ID',
  'Invalid router id': '非法 路由 ID',
  'Please input listen port': '請輸入監聽端口',

  BGP_CONFIG_DESC:
    'BGP是壹種基於 TCP 協議的動態路由協議，主要應用於不同自治域間交換路由信息和網絡可達信息。在使用 BGP 同步路由之前， 您需要配置集群所使用的 ASN（Autonomous System Number）和路由器 ID， 並添加 BGP 鄰居， 同時也需要您在路由器上添加集群節點 BGP 鄰居。',
  ASN_DESC:
    'AS 是指在壹個實體管轄下的擁有相同選路策略的IP網絡。BGP 網絡中的每個 AS 都被分配壹個唯壹的 AS 號，用於區分不同的 AS。',
}
