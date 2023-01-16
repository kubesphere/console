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
  CLUSTER_NODE_PL: 'Cluster Nodes',
  CLUSTER_NODE: 'Cluster Node',
  CLUSTER_NODE_DESC: 'Cluster nodes are basic servers of the KubeSphere cluster. You can manage cluster nodes on this page.',
  NODE_TYPES_Q: 'What are the types of cluster nodes?',
  NODE_TYPES_A: 'Nodes are classified into control plane nodes and worker nodes.',
  WHAT_IS_NODE_TAINTS_Q: 'What are node taints?',
  WHAT_IS_NODE_TAINTS_A: 'Taints allow a node to repel certain pods. Taints and tolerations work together to ensure that pods are not scheduled onto inappropriate nodes.',
  LEARN_MORE: 'Learn More',
  // Node Count
  NODE_SI: 'Node',
  NODE_PL: 'Nodes',
  MASTER_NODE_SI: 'Control plane node',
  MASTER_NODE_PL: 'Control plane nodes',
  WORKER_NODE_SI: 'Worker node',
  WORKER_NODE_PL: 'Worker nodes',
  // List
  KUBE_OPERATE: 'Sort',
  KUBE_ASCENDING_ORDER: 'Ascending',
  KUBE_DESCENDING_ORDER: 'Descending',
  KUBE_FILTER: 'Filter',
  SEARCH: 'Search',
  ADD_NODE: 'Add Node',
  NODE_STATUS_UNSCHEDULABLE: 'Unschedulable',
  NODE_STATUS_RUNNING: 'Running',
  NODE_STATUS_WARNING: 'Warnung',
  NODE_STATUS_PENDING: 'Creating',
  NODE_STATUS_FAILED: 'Failed',
  CLUSTER_NODE_EMPTY_DESC: 'Please add a node to the cluster.',
  NODE_NAME_EMPTY_DESC: 'Please set a name for the node.',
  CPU_USAGE: 'CPU Usage',
  MEMORY_USAGE: 'Memory Usage',
  CONTROL_PLANE: 'Control plane',
  WORKER: 'Worker',
  ALLOCATED_CPU: 'Allocated CPU',
  ALLOCATED_MEMORY: 'Allocated Memory',
  CPU_LIMIT_SI: 'Resource limit: {core} core ({percent})',
  CPU_LIMIT_PL: 'Resource limit: {core} cores ({percent})',
  CPU_REQUEST_SI: '{core} core ({percent})',
  CPU_REQUEST_PL: '{core} cores ({percent})',
  CORE_PL: 'cores',
  CPU_CORE_PERCENT_SI: '{core} core ({percent})',
  CPU_CORE_PERCENT_PL: '{core} cores ({percent})',
  MEMORY_GIB_PERCENT: '{gib} GiB ({percent})',
  MEMORY_LIMIT_VALUE: 'Resource limit: {gib} GiB ({percent})',
  MEMORY_REQUEST_VALUE: '{gib} GiB ({percent})',
  RESOURCE_REQUEST: 'Resource request',
  CORDON: 'Cordon',
  UNCORDON: 'Uncordon',
  OPEN_TERMINAL: 'Open Terminal',
  CUSTOM_COLUMNS: 'Customize Columns',
  NO_MATCHING_RESULT_FOUND: 'No Matching Result Found',
  STATUS: 'Status',
  TOTAL_ITEMS: 'Total: {num}',
  YOU_CAN_TRY_TO: 'You can try',
  REFRESH_DATA: 'refreshing data',
  CLEAR_SEARCH_CONDITIONS: 'clearing search conditions',
  // List > Edit Taints
  DUPLICATE_KEYS: 'The key already exists. Please enter another key.',
  EMPTY_KEY: 'Please enter a key.'
};