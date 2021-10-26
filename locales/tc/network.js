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
  'Network Policy': '網路策略',
  NETWORK_POLICY: '網路策略',
  NETWORK_POLICY_PL: '網路策略',
  NETWORK_POLICY_LOW: '網路策略',
  NETWORK_POLICY_EMPTY_DESC: '請創建一個網路策略。',
  NETWORK_ISOLATION: '網路隔離',
  CREATE_NETWORK_POLICY_TCAP: '創建網路策略',
  // Network Policies Page
  CREATE_BTN: '創建',
  ADD_ALLOWLIST_ENTRY: '添加白名單',
  EGRESS: '出口',
  Ingress: '入口',
  EGRESS_TRAFFIC: '流量出口',
  INGRESS_TRAFFIC: '流量入口',
  DESTINATION: '目的地',

  TRAFFIC_DIRECTION: '流量方向',
  NETWORK_POLICY_DESC:
    '通過配置網路策略，允許在同個集群内時現網路的隔離，也就是可以在某些實例（Pod）之間架起防火牆。',
  NETWORK_ISOLATION_DESC:
    '通過配置網路隔離控制同一集群内 Pod 之間的流量以及來自外部的流量，從而實現隔離應用並增強應用的安全性。',
  CREATE_NETWORK_POLICY_DESC:
    '通過配置網路策略控制同一集群内 Pod 之間的流量以及來自外部的流量，從而實現隔離應用並增強應用的安全性。',
  NETWORK_POLICY_Q: '如何更好地使用網路策略?',
  NETWORK_ISOLATION_Q: '如何更好地使用網路隔離?',
  NETWORK_POLICY_A:
    '根據實際使用場景我们整理了幾種較為常見的應用場景，您可以查閱文件了解更多',
  NETWORK_POLICY_Q1: 'CNI 插件實現網絡策略需滿足哪些必要條件？',
  NETWORK_ISOLATION_Q1:
    'What are the requirements on the CNI plugin for implementing network isolation?',
  NETWORK_POLICY_A1:
    'Kubernetes 所使用 CNI 必須支持 Kubernetes 原生<a href="https://kubernetes.io/zh/docs/concepts/services-networking/network-policies/" target="_blank">網路策略</a>，例如 Calico, Cilium, Kube-router, Romana and Weave Net。',
  NETWORK_POLICY_EMP_TITLE: '網路隔離未開啟',
  NETWORK_POLICY_EMP_DESC:
    'After the project network access is enabled, other projects will be unable to access the project. But you can allow projects, Services, and external IP addresses to access this project based on your needs.',
  PROJECT_NETWORK_ISOLATION: '項目網路隔離',
  EXTERNAL_EGRESS_DESC:
    'Pods in the current project are allowed to access the following network segments and ports.',
  EXTERNAL_INGRESS_DESC:
    'Pods in the current project are allowed to be accessed by the following network segments and ports.',
  INTERNAL_EGRESS_DESC:
    'Allows access to resources that match any of the following network policies.',
  INTERNAL_INGRESS_DESC:
    'Allows access from resources that match any of the following network policies.',
  INTERNAL_ALLOWLIST: '内部白名單',
  INTERNAL_ALLOWLIST_DESC:
    'Specifies the allowed access to and from projects and services in the cluster.',
  INTERNAL_ALLOWLIST_TIP:
    'Add projects and services in the cluster to the allowlist.',
  EXTERNAL_ALLOWLIST: 'External Allowlist',
  EXTERNAL_ALLOWLIST_DESC:
    'Specifies the allowed access to and from network segments outside the cluster.',
  EXTERNAL_ALLOWLIST_TIP:
    'Add network segments outside the cluster to the allowlist.',
  EXTERNAL_TRAFFIC_DIRECTION_DESC:
    'Egress indicates the direction from the current project to outside the cluster. Ingress indicates the direction from outside the cluster to the current project.',
  NETWORK_SEGMENT_DESC: 'Set a network segment (CIDR is supported).',

  CIDR_DESC: '將根據流量的方向',
  SELECT_RULE_DIRECTION_TIP: 'Please select a traffic direction.',
  ENTER_VALID_SEGMENT_DESC: 'Please enter a valid network segment.',
  ENTER_VALID_PORT_NUMBER_DESC: 'Please enter a valid port number.',
  EMPTY_RESOURCE_DESC: 'Please select at least one project or Service.',
  ALLOWLIST_ENTRY: '白名單條目',
  ALLOWLIST_ENTRY_LOW: '白名單條目',
}
