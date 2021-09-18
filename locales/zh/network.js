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
  'Network Policy': '网络策略',
  NETWORK_POLICY: '网络策略',
  NETWORK_POLICY_PL: '网络策略',
  NETWORK_POLICY_LOW: 'network policy',
  NETWORK_POLICY_EMPTY_DESC: '请创建一个网络策略。',
  'Network Policys': '网络策略',
  NETWORK_ISOLATION: '网络隔离',
  CREATE_NETWORK_POLICY_TCAP: '创建网络策略',
  // Network Policies Page
  CREATE_BTN: '创建',
  ADD_ALLOWLIST: '添加白名单',
  EGRESS: '出口',
  Ingress: '入口',
  'Traffic Egress': '流量出口',
  'Traffic Ingress': '流量入口',
  RULE_DIRECTION: '规则方向',
  NETWORK_POLICY_DESC:
    '通过配置网络策略，允许在同个集群内实现网络的隔离，即可以在某些实例（Pod）之间架起防火墙。',
  NETWORK_ISOLATION_DESC:
    '通过配置网络隔离控制同一集群内容器组之间的流量以及来自外部的流量，从而实现隔离应用并增强应用的安全性。',
  CREATE_NETWORK_POLICY_DESC:
    '通过配置网络策略控制同一集群内 Pod 之间的流量以及来自外部的流量，从而实现隔离应用并增强应用的安全性。',
  NETWORK_POLICY_Q: '如何更好地使用网络策略?',
  NETWORK_ISOLATION_Q: '如何更好地使用网络隔离?',
  NETWORK_POLICY_A:
    '我们根据实际使用场景整理了几种较为常见的应用场景，您可以查阅文档了解更多。',
  NETWORK_POLICY_Q1: 'CNI 插件实现网络策略需满足哪些必要条件？',
  NETWORK_ISOLATION_Q1: 'CNI 插件实现网络隔离需满足哪些必要条件？',
  NETWORK_POLICY_A1:
    'Kubernetes 所使用 CNI 必须支持 Kubernetes 原生<a href="https://kubernetes.io/zh/docs/concepts/services-networking/network-policies/" target="_blank">网络策略</a>，例如 Calico、Cilium、Kube-router、Romana 和 Weave Net。',
  NETWORK_POLICY_EMP_TITLE: '未启用网络隔离',
  NETWORK_POLICY_EMP_DESC:
    '启用项目网络隔离后，将禁止其他项目访问当前项目，但您可以按需放行项目、服务以及外部 IP 地址。',
  PROJECT_NETWORK_ISOLATION: '项目网络隔离',
  NETWORK_POLICY_EGRESS_DESC: '允许当前项目访问满足以下任意网络策略的资源。',
  NETWORK_POLICY_INGRESS_DESC: '允许满足以下任意网络策略的资源访问当前项目。',
  INTERNAL_ALLOWLIST: '内部白名单',
  INTERNAL_ALLOWLIST_DESC: '指定去往和来自当前集群中项目和服务的允许访问名单。',
  INTERNAL_ALLOWLIST_TIP: '将集群内部的项目和服务添加到白名单。',
  EXTERNAL_ALLOWLIST: '外部白名单',
  EXTERNAL_ALLOWLIST_DESC: '指定去往和来自集群外部网段的允许访问名单。',
  EXTERNAL_ALLOWLIST_TIP: '将集群外的网段添加到白名单。',
  EXTERNAL_RULE_DIRECTION_DESC:
    '指定允许访问的网段方向或允许不同网段访问的方向。',
  NETWORK_SEGMENT_DESC: '设置网段（支持 CIDR）。',

  CIDR_DESC: '将根据流量的方向',
  SELECT_RULE_DIRECTION_TIP: '请选择规则方向。',
  ENTER_VALID_ADDRESS_DESC: '请输入有效地址。',
  ENTER_VALID_PORT_NUMBER_DESC: '请输入有效端口号。',
  EMPTY_RESOURCE_DESC: '请选择至少一个项目或服务。',
}
