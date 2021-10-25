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
  ADD_ALLOWLIST_ENTRY: 'Add Allowlist Entry',
  CREATE_NETWORK_POLICY_TCAP: 'Create Network Policy',
  // Network Policies Page
  CREATE_BTN: 'Create',
  TRAFFIC_DIRECTION: 'Traffic Direction',
  EGRESS: 'Egress',
  Ingress: 'Ingress',
  NETWORK_ISOLATION: 'Network Isolation',
  'Network Policy': 'Network Policy',
  NETWORK_POLICY: 'Network Policy',
  NETWORK_POLICY_PL: 'Network Policies',
  NETWORK_POLICY_LOW: 'network policy',
  NETWORK_POLICY_EMPTY_DESC: 'Please create a network policy.',
  EGRESS_TRAFFIC: 'Egress Traffic',
  INGRESS_TRAFFIC: 'Ingress Traffic',
  DESTINATION: 'Destination',

  NETWORK_POLICY_DESC:
    'The network policy configuration allows network isolation within the same cluster, which means firewalls can be set up between certain instances (Pods).',
  NETWORK_ISOLATION_DESC:
    'By configuring network isolation, users can control traffic between Pods within the same cluster and traffic from outside to implement application isolation and enhance application security.',
  NETWORK_POLICY_Q: 'How do I use a network policy better?',
  NETWORK_ISOLATION_Q: 'How do I use network isolation better?',
  NETWORK_POLICY_A:
    'We have identified several common use cases based on actual scenarios, and you can refer to the documentation for more information.',
  NETWORK_POLICY_Q1:
    'What are the requirements on the CNI plugin for implementing a network policy?',
  NETWORK_ISOLATION_Q1:
    'What are the requirements on the CNI plugin for implementing network isolation?',
  NETWORK_POLICY_A1:
    'Make sure that the CNI network plugin used by the cluster supports <a href="https://kubernetes.io/docs/concepts/services-networking/network-policies/" target="_blank">Network Policies</a>. A number of CNI network plugins support Network Policies, including Calico, Cilium, Kube-router, Romana, and Weave Net.',
  NETWORK_POLICY_EMP_TITLE: 'Network Isolation Not Enabled',
  NETWORK_POLICY_EMP_DESC:
    'After the project network access is enabled, other projects will be unable to access the project. But you can allow projects, Services, and external IP addresses to access this project based on your needs.',
  PROJECT_NETWORK_ISOLATION: 'Project network isolation',
  EXTERNAL_EGRESS_DESC:
    'Pods in the current project are allowed to access the following network segments and ports.',
  EXTERNAL_INGRESS_DESC:
    'Pods in the current project are allowed to be accessed by the following network segments and ports.',
  INTERNAL_EGRESS_DESC:
    'Pods in the current project are allowed to access Pods of the following Services and projects.',
  INTERNAL_INGRESS_DESC:
    'Pods in the current project are allowed to be accessed by Pods of the following Services and projects.',
  INTERNAL_ALLOWLIST: 'Internal Allowlist',
  INTERNAL_ALLOWLIST_DESC:
    'Allow Pods in the current project to communicate with Pods in other projects of the current cluster.',
  INTERNAL_ALLOWLIST_TIP:
    'Add projects and Services in the cluster to the allowlist.',
  EXTERNAL_ALLOWLIST: 'External Allowlist',
  EXTERNAL_ALLOWLIST_DESC:
    'Allow Pods in the current project to communicate with specific network segments and ports outside the cluster.',
  EXTERNAL_ALLOWLIST_TIP:
    'Add network segments and ports outside the cluster to the allowlist.',
  EXTERNAL_TRAFFIC_DIRECTION_DESC:
    'Egress indicates the direction from the current project to outside the cluster. Ingress indicates the direction from outside the cluster to the current project.',
  NETWORK_SEGMENT_DESC: 'Set a network segment (CIDR is supported).',
  CREATE_NETWORK_POLICY_DESC:
    'The network policy is configured to allow network isolation within the same cluster, namely, the ability to build a firewall between certain instances (Pods).',
  CIDR_DESC: 'Based on the traffic direction',
  SELECT_RULE_DIRECTION_TIP: 'Please select a traffic direction.',
  ENTER_VALID_SEGMENT_DESC: 'Please enter a valid network segment.',
  ENTER_VALID_PORT_NUMBER_DESC: 'Please enter a valid port number.',
  EMPTY_RESOURCE_DESC: 'Please select at least one project or Service.',
  ALLOWLIST_ENTRY: 'Allowlist Entry',
  ALLOWLIST_ENTRY_LOW: 'allowlist entry',
}
