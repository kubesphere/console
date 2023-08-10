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
  // Banner
  NETWORK_POLICY: '网络策略',
  NETWORK_POLICY_PL: '网络策略',
  NETWORK_POLICY_DESC: '通过配置网络策略，允许在同个集群内实现网络的隔离，即可以在某些实例（容器组）之间架起防火墙。',
  NETWORK_POLICY_Q: '如何更好地使用网络策略?',
  NETWORK_POLICY_A: '我们根据实际使用场景整理了几种较为常见的应用场景，您可以查阅文档了解更多。',
  NETWORK_POLICY_Q1: 'CNI 插件实现网络策略需满足哪些必要条件？',
  NETWORK_POLICY_A1: 'Kubernetes 所使用 CNI 必须支持 Kubernetes 原生网络策略，例如 Calico、Cilium、Kube-router、Romana 和 Weave Net。',
  // List
  NETWORK_POLICY_EMPTY_DESC: '请创建一个网络策略。',
  // List > Create
  CREATE_NETWORK_POLICY_TCAP: '创建网络策略',
  CREATE_BTN: '创建',
  CREATE_NETWORK_POLICY_DESC: '通过配置网络策略控制同一集群内 Pod 之间的流量以及来自外部的流量，从而实现隔离应用并增强应用的安全性。',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  NETWORK_POLICY_LOW: '网络策略'
};