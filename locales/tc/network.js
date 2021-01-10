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
  'Network Policies': '網路策略',
  'Network Policys': '網路策略',
  'Network Isolation': '網路隔離',
  'Create Network Policy': '創建網路策略',
  'Add Allowlist': '添加白名單',
  Egress: '出口',
  Ingress: '入口',
  'Traffic Egress': '流量出口',
  'Traffic Ingress': '流量入口',
  Direction: '方向',
  NETWORK_POLICY_DESC:
    '通過配置網路策略，允許在同個集群内時現網路的隔離，也就是可以在某些實例（Pod）之間架起防火牆。',
  NETWORK_ISOLATION_DESC:
    '通過配置網路隔離控制同一集群内 Pod 之間的流量以及來自外部的流量，從而實現隔離應用並增強應用的安全性。',
  NETWORK_POLICY_CREATE_DESC:
    '通過配置網路策略控制同一集群内 Pod 之間的流量以及來自外部的流量，從而實現隔離應用並增強應用的安全性。',
  NETWORK_POLICY_Q: '如何更好地使用網路策略?',
  NETWORK_ISOLATION_Q: '如何更好地使用網路隔離?',
  NETWORK_POLICY_A:
    '根據實際使用場景我们整理了幾種較為常見的應用場景，您可以查閱文件了解更多',
  NETWORK_POLICY_Q1: '實現網路策略的必要條件',
  NETWORK_ISOLATION_Q1: '實現網路隔離的必要條件',
  NETWORK_POLICY_A1:
    'Kubernetes 所使用 CNI 必須支持 Kubernetes 原生<a href="https://kubernetes.io/zh/docs/concepts/services-networking/network-policies/" target="_blank">網路策略</a>，例如 Calico, Cilium, Kube-router, Romana and Weave Net。',
  NETWORK_POLICY_EMP_TITLE: '項目網路隔離未開啟',
  NETWORK_POLICY_EMP_DESC:
    '由於企業空間的設置，目前項目允許集群内其他項目進行訪問。啟用項目網路隔離後，將禁止其他項目訪問目前項目，同時可以自定義需要放行的項目、服務、外部地址',
  NETWORK_POLICY_STATUS: '項目網路隔離',
  NETWORK_POLICY_R_DESC1: '可以設置對以下資源進行訪問(匹配下面任意策略)',
  NETWORK_POLICY_R_DESC2:
    '可以允許以下資源對目前項目進行訪問(匹配下面任意策略)',
  NETWORK_POLICY_R1_TITLE: '集群内部白名單',
  NETWORK_POLICY_R1_DESC: '允許集群内部服務訪問',
  NETWORK_POLICY_R1_DESC1:
    '選擇指定的項目或者服務作為白名單成員，允許這些資源訪問目前項目。',
  NETWORK_POLICY_R2_TITLE: '集群外部 IP 地址',
  NETWORK_POLICY_R2_DESC: '允許集群外部 CIRD 訪問',
  NETWORK_POLICY_R2_DESC1:
    '選擇特定的 IP CIDR 範圍以允許作為入口來源或出口目的地。',
  NETWORK_POLICY_D_DESC: '匹配 Egress(出口) 流量以及 Ingress(入口) 流量',
  NETWORK_POLICY_D_DESC2:
    'CIDR 代表一個合法的 IP 地址區段,例如 “192.168.1.1/24”',
  NETWORK_POLICY_D_OP1: 'Egress(出口)',
  NETWORK_POLICY_D_OP2: 'Ingress(入口)',

  CIDR_DESC: '將根據流量的方向',
  NETWORK_POLICY_MODAL_DIRECT: '請選擇規則方向',
  NETWORK_POLICY_MODAL_CIDRERR: '請正確填寫 CIDR 資訊',
  NETWORK_POLICY_MODAL_PORTERR: '請正確填寫端口',
  NETWORK_POLICY_MODAL_EMPDIR: '請選擇方向',
  NETWORK_POLICY_MODAL_EMPTP: '項目或服務不能為空',
}
