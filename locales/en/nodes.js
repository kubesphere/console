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
  NODE_SI: 'Node',
  NODE_PL: 'Nodes',
  MASTER_NODE_SI: 'Master node',
  MASTER_NODE_PL: 'Master nodes',
  WORKER_NODE_SI: 'Worker node',
  WORKER_NODE_PL: 'Worker nodes',

  CLUSTER_NODE_PL: 'Cluster Nodes',
  CLUSTER_NODE: 'Cluster Node',
  'Cluster Nodes': 'Cluster Nodes',

  ADD_NODE: 'Add Node',
  'Add Node Type': 'Add Node Type',
  ADD_TAINT: 'Add Taint',
  'Add Type': 'Add Type',
  ALL_NODES: 'All nodes',
  'Allocated CPU': 'Allocated CPU',
  'Allocated Memory': 'Allocated Memory',
  ALLOCATED_RESOURCES: 'Allocated Resources',
  ANNOTATION_PL: 'Annotations',
  WORKLOAD_ANNOTATIONS: 'Workload Annotations',
  ARCHITECTURE: 'Architecture',
  'Cluster Node': 'Cluster Node',
  'Edge Node': 'Edge Node',
  EDGE_NODE_PL: 'Edge Nodes',
  COMMON_TAINTS: 'Common Taints',
  Conditions: 'Conditions',
  CONTAINER_RUNTIME: 'Container Runtime',
  'CPU Limits': 'CPU Limits',
  'CPU Requests': 'CPU Requests',
  'CPU Used': 'CPU Used',
  'Delete All Taints': 'Delete All Taints',
  IP_ADDRESS: 'IP Address',
  LINUX: 'Linux',
  KERNEL_VERSION: 'Kernel Version',
  KUBE_PROXY_VERSION: 'kube-proxy Version',
  KUBELET_VERSION: 'kubelet Version',
  lastHeartbeatTime: 'lastHeartbeatTime',
  LATEST_UPDATE_VALUE: 'Latest update: {value}',
  'Local Storage Capacity': 'Local Storage Capacity',
  'Master Node': 'Master Node',
  'Memory Limits': 'Memory Limits',
  'Memory Requests': 'Memory Requests',
  'Memory Used': 'Memory Used',
  METADATA: 'Metadata',
  'Node IP': 'Node IP',
  'Node List': 'Node List',
  NODE_ONLINE_STATUS: 'Node Online Status',
  'Node Taints': 'Node Taints',
  ONLINE_NODES: 'Online nodes',
  OS_TYPE: 'OS Type',
  'OS Image': 'OS Image',
  OS_VERSION: 'OS Version',
  'Pod Count': 'Pod Count',
  PODS: 'Pods',
  'Pod Quantity Trend': 'Pod Quantity Trend',
  'Pod Usage': 'Pod Usage',
  'Pod Used': 'Pod Used',
  'Resource Usage': 'Resource Usage',
  'Resource Usage Status': 'Resource Usage Status',
  'Scheduling Policy': 'Scheduling Policy',
  'System Version': 'System Version',
  taint: 'taint',
  Taint: 'Taint',
  EDIT_TAINT: 'Edit Taint',
  EDIT_TAINTS: 'Edit Taints',
  taints: 'taints',
  TAINTS: 'Taints',
  'Type Name': 'Type Name',
  Unschedulable: 'Unschedulable',
  SCHEDULABLE: 'Schedulable',
  used: 'used',
  'Worker Node': 'Worker Node',

  NOSCHEDULE: 'Prevent scheduling',
  PREFER_NOSCHEDULE: 'Prevent scheduling if possible',
  NOEXECUTE: 'Prevent scheduling and evict existing Pods',

  TAINTS_DESC:
    'Add taints to nodes so that Pods are not scheduled to the nodes or not scheduled to the nodes if possible. After you add taints to nodes, you can set tolerations on a Pod to allow the Pod to be scheduled to nodes with certain taints.',
  TAINTS_TIPS:
    '<b>Prevent scheduling</b><br />Prevents all Pods from being scheduled to the node.<br /><br /><b>Prevent scheduling if possible</b><br />Prevents all Pods from being scheduled to the node if possible.<br /><br /><b>Prevent scheduling and evict existing Pods</b><br />Prevents all Pods from being scheduled to the node and evict all existing Pods on the node.',
  NO_TAINTS_TIPS: 'No taint is found.',
  TAINT_SELECT_TIPS: 'Join Common Taints',
  TAINT_DELETE_TIPS: 'Delete Taint',

  NODE_STATUS_UNSCHEDULABLE: 'Unschedulable',
  NODE_STATUS_RUNNING: 'Running',
  NODE_STATUS_WARNING: 'Warning',
  NODE_STATUS_PENDING: 'Creating',
  NODE_STATUS_FAILED: 'Failed',

  CLUSTER_NODE_DESC:
    'Cluster nodes are basic servers of the KubeSphere cluster. You can manage cluster nodes on this page.',
  CLUSTER_NODE_EMPTY_DESC: 'Please add a node to the cluster.',
  EDGE_NODE_DESC:
    'Edge nodes are servers deployed outside the KubeSphere cluster. You can add edge nodes to the KubeSphere cluster to manage them.',
  EDGE_NODE_EMPTY_DESC: 'Please add an edge node to the cluster.',
  NODE_NETWORKUNAVAILABLE: 'Network Availability',
  NODE_NETWORKUNAVAILABLE_DESC:
    'Check if the network configuration on the node is available',
  NODE_OUTOFDISK: 'OutOfDisk',
  NODE_OUTOFDISK_DESC: 'Check if there is space on the node to add a new pod',
  NODE_MEMORYPRESSURE: 'Memory Pressure',
  NODE_MEMORYPRESSURE_DESC:
    'If the memory usage pressure on the node is too high, the scheduling fails',
  NODE_DISKPRESSURE: 'Disk Pressure',
  NODE_DISKPRESSURE_DESC:
    'If pressure exists on the disk size–that is, if the disk capacity is low',
  NODE_PIDPRESSURE: 'PID Pressure',
  NODE_PIDPRESSURE_DESC:
    'If pressure exists on the processes—that is, if there are too many processes on the node',
  NODE_READY: 'Node Readiness',
  NODE_READY_DESC: 'Whether the node is ready to accept new Pods.',

  NODE_NETWORKUNAVAILABLE_TIP:
    'If the network for the node is correctly configured.',
  NODE_OUTOFDISK_TIP:
    'If there is insufficient free space on the node for adding new pods.',
  NODE_MEMORYPRESSURE_TIP:
    'If pressure exists on the node memory – that is, if the node memory is low.',
  NODE_DISKPRESSURE_TIP:
    ' If pressure exists on the disk size – that is, if the disk capacity is low.',
  NODE_PIDPRESSURE_TIP:
    'If pressure exists on the processes – that is, if there are too many processes on the node.',
  NODE_READY_TIP: 'If the node is healthy and ready to accept pods.',

  NODE_TYPES_Q: 'What are the types of cluster nodes?',
  NODE_TYPES_A: 'Nodes are classified into master nodes and worker nodes.',
  WHAT_IS_NODE_TAINTS_Q: 'What are node taints?',
  WHAT_IS_NODE_TAINTS_A:
    'Taints allow a node to repel certain Pods. Taints and tolerations work together to ensure that Pods are not scheduled onto inappropriate nodes.',

  NODE_TYPE_DESC:
    'Node types help users to divide nodes into different groups. Users can add the hosting node to a corresponding group by creating nodes of different types that are properly connected with each other. In this way, Pods can be deployed to appropriate physical nodes based on the group. Resource availability and business continuity can also be improved.',
  NODE_TYPE_DESCRIPTION_DEC:
    'The description will help users to select nodes types and use the cluster.',
  ADD_EDGE_COMMAND: 'Run the above command on your edge node to configure it.',
  IN_USE_Node_IP:
    'The IP address {ip} is in use. Please enter another IP address.',
  IN_USE_Node_NAME:
    'The node name {name} already exists. Please enter another name.',
  'Add Edge Node': 'Add Edge Node',
  NODE_NAME_EMPTY_DESC: 'Please set a name for the node.',
  EDGENODE_NAME_EMPTY_DESC: 'Please set a name for the edge node.',
  EDGENODE_CONFIG_COMMAND_TIP:
    'Before running the command, you must install a container runtime such as Docker or containerd on your edge node. <a href="https://kubeedge.io/en/docs/" target="_blank">Learn More</a>',
  ADD_DEFAULT_TAINT: 'Add the default taint {params}',
}
