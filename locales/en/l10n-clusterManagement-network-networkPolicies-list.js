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
  NETWORK_POLICY: 'Network Policy',
  NETWORK_POLICY_PL: 'Network Policies',
  NETWORK_POLICY_DESC: 'The network policy configuration allows network isolation within the same cluster, which means firewalls can be set up between certain instances (pods).',
  NETWORK_POLICY_Q: 'How do I use a network policy better?',
  NETWORK_POLICY_A: 'We have identified several common use cases based on actual scenarios, and you can refer to the documentation for more information.',
  NETWORK_POLICY_Q1: 'What are the requirements on the CNI plugin for implementing a network policy?',
  NETWORK_POLICY_A1: 'Make sure that the CNI network plugin used by the cluster supports <a href="https://kubernetes.io/docs/concepts/services-networking/network-policies/" target="_blank">Network Policies</a>. A number of CNI network plugins support Network Policies, including Calico, Cilium, Kube-router, Romana, and Weave Net.',
  // List
  NETWORK_POLICY_EMPTY_DESC: 'Please create a network policy.',
  // List > Create
  CREATE_NETWORK_POLICY_TCAP: 'Create Network Policy',
  CREATE_BTN: 'Create',
  CREATE_NETWORK_POLICY_DESC: 'The network policy is configured to allow network isolation within the same cluster, namely, the ability to build a firewall between certain instances (pods).',
  // List > Edit Information

  // List > Edit YAML

  // List > Delete
  NETWORK_POLICY_LOW: 'network policy',
}
