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
  NETWORK_ISOLATION_DESC: 'By configuring network isolation, users can control traffic between pods within the same workspace and traffic from outside to implement application isolation and enhance application security.',
  NETWORK_ISOLATION_Q: '如何更好地使用网络隔离?',
  NETWORK_ISOLATION_Q1: 'CNI 插件实现网络隔离需满足哪些必要条件？',
  // Network Isolation
  NETWORK_ISOLATION: '网络隔离',
  ENABLE: '启用',
  PROJECT_NETWORK_ISOLATION: '项目网络隔离',
  NETWORK_POLICY_EMP_TITLE: '未启用网络隔离',
  NETWORK_POLICY_EMP_DESC: '启用项目网络隔离后，将禁止其他项目访问当前项目，但您可以按需放行项目、服务以及外部 IP 地址。',
  // Network Isolation > Internal Allowlist
  INTERNAL_ALLOWLIST: '内部白名单',
  INTERNAL_ALLOWLIST_TIP: 'Add projects and services in the workspace to the allowlist.',
  INTERNAL_EGRESS_DESC: '当前项目中的容器组可以访问以下服务和项目的容器组。',
  INTERNAL_INGRESS_DESC: '当前项目中的容器组可以被以下服务和项目的容器组访问。',
  INTERNAL_ALLOWLIST_DESC: 'Allow pods in the current project to communicate with pods in other projects of the current workspace.',
  EMPTY_RESOURCE_DESC: '请选择至少一个项目或服务。',
  // Network Isolation > External Allowlist
  EXTERNAL_ALLOWLIST: '外部白名单',
  EXTERNAL_ALLOWLIST_TIP: 'Add network segments and ports outside the workspace to the allowlist.',
  EXTERNAL_ALLOWLIST_DESC: 'Allow pods in the current project to communicate with specific network segments and ports outside the workspace.',
  NETWORK_SEGMENT_EXAMPLE: '例如：10.0.0.0',
  PORT_EXAMPLE: '例如：80',
  EXTERNAL_EGRESS_DESC: '当前项目中的容器组可以访问以下网段和端口。',
  EXTERNAL_INGRESS_DESC: '当前项目中的容器组可以被以下网段和端口访问。',
  SELECT_RULE_DIRECTION_TIP: '请选择流量方向。',
  ENTER_VALID_SEGMENT_DESC: '请输入一个有效的网段。',
  ENTER_VALID_PORT_NUMBER_DESC: '请输入有效端口号。',
  // Add Allowlist Entry
  ADD_ALLOWLIST_ENTRY: '添加白名单条目',
  EXTERNAL_TRAFFIC_DIRECTION_DESC: 'Egress indicates the direction from the current project to outside the workspace. Ingress indicates the direction from outside the workspace to the current project.',
  TRAFFIC_DIRECTION: '流量方向',
  NETWORK_SEGMENT_DESC: '设置网段（支持 CIDR）。',
  EGRESS: '出站',
  INGRESS: '入站',
  INTERNAL_TRAFFIC_DIRECTION_DESC: '出站表示从当前项目到其他项目的方向。入站表示从其他项目到当前项目的方向。',
  // Add Allowlist Entry > Project
  // Add Allowlist Entry > Service
  // Delete Allowlist Entry
  ALLOWLIST_ENTRY: '白名单条目',
  ALLOWLIST_ENTRY_LOW: '白名单条目'
};