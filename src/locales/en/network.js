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
  NETWORK_POLICY_DESC:
    'The network policy is configured to allow network isolation within the same cluster, that is, the ability to build a firewall between certain instances (pods).',
  NETWORK_POLICY_Q: 'How to use network strategies better?',
  NETWORK_POLICY_A:
    'We have compiled several common application scenarios based on the actual usage scenarios, and you can refer to the documentation for more information.',
  NETWORK_POLICY_Q1: 'requirement to implement a network strategy',
  NETWORK_POLICY_A1: 'xxxxxxxxxx',
  NETWORK_POLICY_EMP_TITLE: 'project network isolation not enabled',
  NETWORK_POLICY_EMP_DESC:
    'If project network isolation is not enabled for the current project, it will allow other projects in the namespace to access directly by default. If network isolation is not enabled for the namespace, all projects in the cluster will be allowed to access',
  NETWORK_POLICY_STATUS: 'project network isolation',
  NETWORK_POLICY_R_DESC1:
    'You can set access to the following resources (matching any of the following policies)',
  NETWORK_POLICY_R_DESC2:
    'The following resources can be allowed to access the current project (matching any of the following policies)',
  NETWORK_POLICY_R1_TITLE: 'Cluster internal whitelist',
  NETWORK_POLICY_R1_DESC: 'Allows access to services within the cluster',
  NETWORK_POLICY_R1_DESC1:
    'Select the specified project or service as a whitelist member to allow these resources to access the current project.',
  NETWORK_POLICY_R2_TITLE: 'Cluster external IP address',
  NETWORK_POLICY_R2_DESC: 'Allow access to CIRD outside the cluster',
  NETWORK_POLICY_R2_DESC1:
    'Select a specific IP CIDR range to allow as an entry source or exit destination. Cluster external IP',
  NETWORK_POLICY_D_DESC: 'Match Egress traffic and Ingress traffic',
  NETWORK_POLICY_D_OP1: 'Egress',
  NETWORK_POLICY_D_OP2: 'Ingress',
  NETWORK_POLICY_CREATE_DESC:
    'The network policy is configured to allow network isolation within the same cluster, that is, the ability to build a firewall between certain instances (pods).',
}
