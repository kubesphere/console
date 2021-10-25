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
  NETWORK_POLICY_LOW: '网络策略',
  NETWORK_POLICY_EMPTY_DESC: '请创建一个网络策略。',
  NETWORK_ISOLATION: '网络隔离',
  CREATE_NETWORK_POLICY_TCAP: '创建网络策略',
  // Network Policies Page
  CREATE_BTN: '创建',
  ADD_ALLOWLIST_ENTRY: '添加白名单条目',
  EGRESS: '出站',
  Ingress: '入口',
  EGRESS_TRAFFIC: '出站流量',
  INGRESS_TRAFFIC: '入站流量',
  DESTINATION: '目的地',

  TRAFFIC_DIRECTION: '流量方向',
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
  NETWORK_POLICY_EMP_TITLE: '未开启网络隔离',
  NETWORK_POLICY_EMP_DESC:
    '开启项目网络隔离后，将禁止其他项目访问当前项目，但您可以按需放行项目、服务以及外部 IP 地址。',
  PROJECT_NETWORK_ISOLATION: '项目网络隔离',
  EXTERNAL_EGRESS_DESC: '当前项目中的容器组可以访问以下网段和端口。',
  EXTERNAL_INGRESS_DESC: '当前项目中的容器组可以被以下网段和端口访问。',
  INTERNAL_EGRESS_DESC: '当前项目中的容器组可以访问以下服务和项目的容器组。',
  INTERNAL_INGRESS_DESC: '当前项目中的容器组可以被以下服务和项目的容器组访问。',
  INTERNAL_ALLOWLIST: '内部白名单',
  INTERNAL_ALLOWLIST_DESC:
    '允许当前项目中的容器组与当前集群其他项目中的服务进行通信。',
  INTERNAL_ALLOWLIST_TIP: '将集群内部的项目和服务添加到白名单。',
  EXTERNAL_ALLOWLIST: '外部白名单',
  EXTERNAL_ALLOWLIST_DESC:
    '允许当前项目中的容器组与集群外部的特定网段和端口进行通信。',
  EXTERNAL_ALLOWLIST_TIP: '将集群外部的网段和端口添加到白名单。',
  EXTERNAL_TRAFFIC_DIRECTION_DESC:
    '出站表示从当前项目到集群外的方向。入站表示从集群外到当前项目的方向。',
  NETWORK_SEGMENT_DESC: '设置网段（支持 CIDR）。',

  CIDR_DESC: '将根据流量的方向',
  SELECT_RULE_DIRECTION_TIP: '请选择流量方向。',
  ENTER_VALID_SEGMENT_DESC: '请输入一个有效的网段。',
  ENTER_VALID_PORT_NUMBER_DESC: '请输入有效端口号。',
  EMPTY_RESOURCE_DESC: '请选择至少一个项目或服务。',
  ALLOWLIST_ENTRY: '白名单条目',
  ALLOWLIST_ENTRY_LOW: '白名单条目',
}
