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
  NETWORK_ISOLATION_DESC: 'By configuring network isolation, users can control traffic between pods within the same cluster and traffic from outside to implement application isolation and enhance application security.',
  NETWORK_ISOLATION_Q: 'How do I use network isolation better?',
  NETWORK_ISOLATION_Q1: 'What are the requirements on the CNI plugin for implementing network isolation?',
  // Network Isolation
  NETWORK_ISOLATION: 'Network Isolation',
  ENABLE: 'Enable',
  PROJECT_NETWORK_ISOLATION: 'Project network isolation',
  NETWORK_POLICY_EMP_TITLE: 'Network Isolation Not Enabled',
  NETWORK_POLICY_EMP_DESC: 'After the project network access is enabled, other projects will be unable to access the project. But you can allow projects, services, and external IP addresses to access this project based on your needs.',
  // Network Isolation > Internal Allowlist
  INTERNAL_ALLOWLIST: 'Internal Allowlist',
  INTERNAL_ALLOWLIST_TIP: 'Add projects and services in the cluster to the allowlist.',
  INTERNAL_EGRESS_DESC: 'Pods in the current project are allowed to access pods of the following services and projects.',
  INTERNAL_INGRESS_DESC: 'Pods in the current project are allowed to be accessed by pods of the following services and projects.',
  INTERNAL_ALLOWLIST_DESC: 'Allow pods in the current project to communicate with pods in other projects of the current cluster.',
  EMPTY_RESOURCE_DESC: 'Please select at least one project or service.',
  // Network Isolation > External Allowlist
  EXTERNAL_ALLOWLIST: 'External Allowlist',
  EXTERNAL_ALLOWLIST_TIP: 'Add network segments and ports outside the cluster to the allowlist.',
  EXTERNAL_ALLOWLIST_DESC: 'Allow pods in the current project to communicate with specific network segments and ports outside the cluster.',
  NETWORK_SEGMENT_EXAMPLE: 'Example: 10.0.0.0',
  PORT_EXAMPLE: 'Example: 80',
  EXTERNAL_EGRESS_DESC: 'Pods in the current project are allowed to access the following network segments and ports.',
  EXTERNAL_INGRESS_DESC: 'Pods in the current project are allowed to be accessed by the following network segments and ports.',
  SELECT_RULE_DIRECTION_TIP: 'Please select a traffic direction.',
  ENTER_VALID_SEGMENT_DESC: 'Please enter a valid network segment.',
  ENTER_VALID_PORT_NUMBER_DESC: 'Please enter a valid port number.',
  // Add Allowlist Entry
  ADD_ALLOWLIST_ENTRY: 'Add Allowlist Entry',
  EXTERNAL_TRAFFIC_DIRECTION_DESC: 'Egress indicates the direction from the current project to outside the cluster. Ingress indicates the direction from outside the cluster to the current project.',
  TRAFFIC_DIRECTION: 'Traffic Direction',
  NETWORK_SEGMENT_DESC: 'Set a network segment (CIDR is supported).',
  EGRESS: 'Egress',
  INGRESS: 'Ingress',
  INTERNAL_TRAFFIC_DIRECTION_DESC: 'Egress indicates the direction from the current project to other projects. Ingress indicates the direction from other projects to the current project.',
  // Add Allowlist Entry > Project

  // Add Allowlist Entry > Service
  // Delete Allowlist Entry
  ALLOWLIST_ENTRY: 'Allowlist Entry',
  ALLOWLIST_ENTRY_LOW: 'allowlist entry',
}
