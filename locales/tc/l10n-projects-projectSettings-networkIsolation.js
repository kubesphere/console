/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  NETWORK_ISOLATION_DESC:
    'By configuring network isolation, users can control traffic between pods within the same workspace and traffic from outside to implement application isolation and enhance application security.',
  NETWORK_ISOLATION_Q: '如何更好地使用網路隔離?',
  NETWORK_ISOLATION_Q1:
    'What are the requirements on the CNI plugin for implementing network isolation?',
  // Network Isolation
  NETWORK_ISOLATION: '網路隔離',
  ENABLE: 'Enable',
  PROJECT_NETWORK_ISOLATION: '項目網路隔離',
  NETWORK_POLICY_EMP_TITLE: '網路隔離未開啟',
  NETWORK_POLICY_EMP_DESC:
    'After the project network access is enabled, other projects will be unable to access the project. But you can allow projects, Services, and external IP addresses to access this project based on your needs.',
  // Network Isolation > Internal Allowlist
  INTERNAL_ALLOWLIST: '内部白名單',
  INTERNAL_ALLOWLIST_TIP: 'Add projects and services in the workspace to the allowlist.',
  INTERNAL_EGRESS_DESC:
    'Allows access to resources that match any of the following network policies.',
  INTERNAL_INGRESS_DESC:
    'Allows access from resources that match any of the following network policies.',
  INTERNAL_ALLOWLIST_DESC:
    'Allow pods in the current project to communicate with pods in other projects of the current workspace.',
  EMPTY_RESOURCE_DESC: 'Please select at least one project or Service.',
  // Network Isolation > External Allowlist
  EXTERNAL_ALLOWLIST: 'External Allowlist',
  EXTERNAL_ALLOWLIST_TIP: 'Add network segments and ports outside the workspace to the allowlist.',
  EXTERNAL_ALLOWLIST_DESC:
    'Allow pods in the current project to communicate with specific network segments and ports outside the workspace.',
  NETWORK_SEGMENT_EXAMPLE: 'Example: 10.0.0.0',
  PORT_EXAMPLE: 'Example: 80',
  EXTERNAL_EGRESS_DESC:
    'Pods in the current project are allowed to access the following network segments and ports.',
  EXTERNAL_INGRESS_DESC:
    'Pods in the current project are allowed to be accessed by the following network segments and ports.',
  SELECT_RULE_DIRECTION_TIP: 'Please select a traffic direction.',
  ENTER_VALID_SEGMENT_DESC: 'Please enter a valid network segment.',
  ENTER_VALID_PORT_NUMBER_DESC: 'Please enter a valid port number.',
  // Add Allowlist Entry
  ADD_ALLOWLIST_ENTRY: '添加白名單',
  EXTERNAL_TRAFFIC_DIRECTION_DESC:
    'Egress indicates the direction from the current project to outside the workspace. Ingress indicates the direction from outside the workspace to the current project.',
  TRAFFIC_DIRECTION: '流量方向',
  NETWORK_SEGMENT_DESC: 'Set a network segment (CIDR is supported).',
  EGRESS: '出口',
  INGRESS: 'Ingress',
  INTERNAL_TRAFFIC_DIRECTION_DESC:
    'Egress indicates the direction from the current project to other projects. Ingress indicates the direction from other projects to the current project.',
  // Add Allowlist Entry > Project
  // Add Allowlist Entry > Service
  // Delete Allowlist Entry
  ALLOWLIST_ENTRY: 'Allowlist Entry',
  ALLOWLIST_ENTRY_LOW: '白名單條目',
};
