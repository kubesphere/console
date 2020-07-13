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
  'Network Policies': '网络策略',
  'Network Policys': '网络策略',
  'Network Isolation': '网络隔离',
  'Create Network Policy': '创建网络策略',
  'Add Allowlist': '添加白名单',
  Egress: '出口',
  Ingress: '入口',
  'Traffic Egress': '流量出口',
  'Traffic Ingress': '流量入口',
  Direction: '方向',
  NETWORK_POLICY_DESC:
    '通过配置网络策略，允许在同个集群内实现网络的隔离，也就是可以在某些实例（Pod）之间架起防火墙。',
  NETWORK_ISOLATION_DESC:
    '通过配置网络隔离控制同一集群内 Pod 之间的流量以及来自外部的流量，从而实现隔离应用并增强应用的安全性。',
  NETWORK_POLICY_CREATE_DESC:
    '通过配置网络策略控制同一集群内 Pod 之间的流量以及来自外部的流量，从而实现隔离应用并增强应用的安全性。',
  NETWORK_POLICY_Q: '如何更好地使用网络策略?',
  NETWORK_ISOLATION_Q: '如何更好地使用网络隔离?',
  NETWORK_POLICY_A:
    '根据实际使用场景我们整理了几种较为常见的应用场景，您可以查阅文档了解更多',
  NETWORK_POLICY_Q1: '实现网络策略的必要条件',
  NETWORK_ISOLATION_Q1: '实现网络隔离的必要条件',
  NETWORK_POLICY_A1:
    'Kubernetes所使用CNI必须支持Kubernetes原生<a href="https://kubernetes.io/zh/docs/concepts/services-networking/network-policies/" target="_blank">网络策略</a>，例如Calico,Cilium, Kube-router, Romana and Weave Net。',
  NETWORK_POLICY_EMP_TITLE: '项目网络隔离未开启',
  NETWORK_POLICY_EMP_DESC:
    '由于企业空间的设置，当前项目允许集群内其他项目进行访问。启用项目网络隔离后，将禁止其他项目访问当前项目，同时可以自定义需要放行的项目、服务、外部地址',
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
    '选择特定的 IP CIDR 范围以允许作为入口源或出口目的地。',
  NETWORK_POLICY_D_DESC: '匹配 Egress(出口) 流量以及 Ingress(入口) 流量',
  NETWORK_POLICY_D_DESC2: 'CIDR 代表一个合法的 IP 地址段,例如 “192.168.1.1/24”',
  NETWORK_POLICY_D_OP1: 'Egress(出口)',
  NETWORK_POLICY_D_OP2: 'Ingress(入口)',

  CIDR_DESC: '将根据流量的方向',
}
