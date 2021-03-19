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
  'Add Allowlist': 'Add Allowlist',
  'Create Network Policy': 'Create Network Policy',
  Direction: 'Direction',
  Egress: 'Egress',
  Ingress: 'Ingress',
  'Network Isolation': 'Network Isolation',
  'Network Policies': 'Network Policies',
  'Network Policy': 'Network Policy',
  'Traffic Egress': 'Traffic Egress',
  'Traffic Ingress': 'Traffic Ingress',

  'Network Policys': 'Network Policies',
  NETWORK_POLICY_DESC:
    'The network policy configuration allows network isolation within the same cluster, which means firewalls can be set up between certain instances (Pods).',
  NETWORK_ISOLATION_DESC:
    'By configuring network isolation to control traffic among Pods within the same cluster and traffic from outside, users can isolate applications with security enhanced.',
  NETWORK_POLICY_Q: 'How do I use a network policy better?',
  NETWORK_ISOLATION_Q: 'How do I use network isolation better?',
  NETWORK_POLICY_A:
    'We have compiled several common application scenarios based on the actual scenarios, and you can refer to the documentation for more information.',
  NETWORK_POLICY_Q1: 'Requirement to implement a network policy',
  NETWORK_ISOLATION_Q1: 'Requirement to implement network isolation',
  NETWORK_POLICY_A1:
    'Make sure that the CNI network plugin used by the cluster supports <a href="https://kubernetes.io/docs/concepts/services-networking/network-policies/" target="_blank">NetworkPolicy</a>. There are a number of CNI network plugins that support NetworkPolicy, including Calico, Cilium, Kube-router, Romana and Weave Net.',
  NETWORK_POLICY_EMP_TITLE: 'Project Network Isolation Not Enabled',
  NETWORK_POLICY_EMP_DESC:
    'The current project can be accessed by other projects in the cluster based on the workspace settings. Once network isolation is enabled for the project, other projects will be unable to access it while you can still customize specific projects, services or external addresses that can be released.',
  NETWORK_POLICY_STATUS: 'Project Network Isolation',
  NETWORK_POLICY_R_DESC1:
    'You can set access to the following resources (matching any of the following policies)',
  NETWORK_POLICY_R_DESC2:
    'The following resources can be allowed to access the current project (matching any of the following policies)',
  NETWORK_POLICY_R1_TITLE: 'Cluster Internal Allowlist',
  NETWORK_POLICY_R1_DESC: 'Allow access for services within the cluster',
  NETWORK_POLICY_R1_DESC1:
    'Select a specific project or service as an allowlist member so that these resources can access the current project.',
  NETWORK_POLICY_R2_TITLE: 'Cluster External IP Address',
  NETWORK_POLICY_R2_DESC: 'Allow access for CIRD outside the cluster',
  NETWORK_POLICY_R2_DESC1:
    'Select a specific IP CIDR range as an entry source or exit destination.',
  NETWORK_POLICY_D_DESC: 'Match Egress traffic and Ingress traffic',
  NETWORK_POLICY_D_DESC2:
    'CIDR is a string representing a valid IP block, such as "192.168.1.1/24".',
  NETWORK_POLICY_D_OP1: 'Egress',
  NETWORK_POLICY_D_OP2: 'Ingress',
  NETWORK_POLICY_CREATE_DESC:
    'The network policy is configured to allow network isolation within the same cluster, that is, the ability to build a firewall between certain instances (pods).',
  CIDR_DESC: 'Based on the traffic direction',
  NETWORK_POLICY_MODAL_DIRECT: 'Please select the rule direction',
  NETWORK_POLICY_MODAL_CIDRERR: 'Please fill in the CIDR information correctly',
  NETWORK_POLICY_MODAL_PORTERR: 'Please fill in the port correctly',
  NETWORK_POLICY_MODAL_EMPDIR: 'The direction is required',
  NETWORK_POLICY_MODAL_EMPTP: 'The project or service is required',
}
