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
  'Network Policy': '网络策略',
  'Network Policys': '网络策略',
  'Add WhiteList': '添加白名单',
  Egress: '出口',
  Ingress: '入口',
  'Traffic Egress': '流量出口',
  'Traffic Ingress': '流量入口',
  Direction: '方向',
  NETWORK_POLICY_DESC:
    '通过配置网络策略，允许在同个集群内实现网络的隔离，也就是可以在某些实例（Pod）之间架起防火墙。',
  NETWORK_POLICY_Q: '如何更好的使用网络策略?',
  NETWORK_POLICY_A:
    '根据实际使用场景我们整理了几种较为常见的应用场景，您可以查阅文档了解更多',
  NETWORK_POLICY_Q1: '实现网络策略的必要条件',
  NETWORK_POLICY_A1: 'xxxxxxxxxx',
  NETWORK_POLICY_EMP_TITLE: '项目网络隔离未开启',
  NETWORK_POLICY_EMP_DESC:
    '当前项目未开启项目网络隔离，默认将允许企业空间内其它项目直接进行访问，如果企业空间未开启网络隔离，则将会允许集群内所有项目进行访问',
  NETWORK_POLICY_STATUS: '项目网络隔离',
  NETWORK_POLICY_R_DESC1: '可以设置对以下资源进行访问(匹配下面任意策略)',
  NETWORK_POLICY_R_DESC2:
    '可以允许以下资源对当前项目进行访问(匹配下面任意策略)',
  NETWORK_POLICY_R1_TITLE: '集群内部白名单',
  NETWORK_POLICY_R1_DESC: '允许集群内部服务访问',
  NETWORK_POLICY_R1_DESC1:
    '选择指定的项目或者服务作为白名单成员，允许这些资源访问当前项目。',
  NETWORK_POLICY_R2_TITLE: '集群外部IP地址',
  NETWORK_POLICY_R2_DESC: '允许集群外部CIRD访问',
  NETWORK_POLICY_R2_DESC1:
    '选择特定的IP CIDR范围以允许作为入口源或出口目的地。集群外部IP',
  NETWORK_POLICY_D_DESC: '匹配Egress(出口)流量以及Ingress(入口)流量',
  NETWORK_POLICY_D_OP1: 'Egress(出口)',
  NETWORK_POLICY_D_OP2: 'Ingress(入口)',
}
