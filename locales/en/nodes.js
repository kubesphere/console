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
  'Add Node': 'Add Node',
  'Add Node Type': 'Add Node Type',
  'Add Taint': 'Add Taint',
  'Add Type': 'Add Type',
  'All Nodes': 'All Nodes',
  'Allocated CPU': 'Allocated CPU',
  'Allocated Memory': 'Allocated Memory',
  'Allocated Resources': 'Allocated Resources',
  Annotations: 'Annotations',
  Architecture: 'Architecture',
  'Cluster Node': 'Cluster Node',
  'Edge Node': 'Edge Node',
  'Edge Nodes': 'Edge Nodes',
  'Common Taints': 'Common Taints',
  Conditions: 'Conditions',
  ContainerRuntimeVersion: 'ContainerRuntimeVersion',
  'CPU Limits': 'CPU Limits',
  'CPU Requests': 'CPU Requests',
  'CPU Used': 'CPU Used',
  'CPU Utilization': 'CPU Utilization',
  'Delete All Taints': 'Delete All Taints',
  'IP Address': 'IP Address',
  KernelVersion: 'KernelVersion',
  'Kube-Proxy Version': 'Kube-Proxy Version',
  'Kubelet Version': 'Kubelet Version',
  lastHeartbeatTime: 'lastHeartbeatTime',
  'Local Storage Capacity': 'Local Storage Capacity',
  'Master Node': 'Master Node',
  'Memory Limits': 'Memory Limits',
  'Memory Requests': 'Memory Requests',
  'Memory Used': 'Memory Used',
  'Memory Utilization': 'Memory Utilization',
  Metadata: 'Metadata',
  'Node IP': 'Node IP',
  'Node List': 'Node List',
  'Node Online Status': 'Node Online Status',
  'Node Status': 'Node Status',
  'Node Taints': 'Node Taints',
  'Online Nodes': 'Online Nodes',
  OperatingSystem: 'OperatingSystem',
  'OS Image': 'OS Image',
  OsImage: 'OsImage',
  'Pod Count': 'Pod Count',
  'Pod Quantity Trend': 'Pod Quantity Trend',
  'Pod Usage': 'Pod Usage',
  'Pod Used': 'Pod Used',
  'Resource Usage': 'Resource Usage',
  'Resource Usage Status': 'Resource Usage Status',
  'Scheduling Policy': 'Scheduling Policy',
  'System Version': 'System Version',
  taint: 'taint',
  Taint: 'Taint',
  'Taint Management': 'Taint Management',
  taints: 'taints',
  Taints: 'Taints',
  'Type Name': 'Type Name',
  Unschedulable: 'Unschedulable',
  used: 'used',
  'Worker Node': 'Worker Node',

  NOSCHEDULE_OPTION: 'NoSchedule',
  PREFER_NOSCHEDULE_OPTION: 'PreferNoSchedule',
  NOEXECUTE_OPTION: 'NoExecute',

  TAINTS_MSG:
    'If a taint with "key=value" is added to the node, it means no Pod will be scheduled to this node (PodToleratesNodeTaints policy) or at least scheduling is avoided as much as possible (TaintTolerationPriority policy), unless the Pod has a matching toleration with "key=value".',
  TAINTS_TIPS:
    'If there is at least one un-ignored taint with effect NoSchedule, then the system will not schedule pods onto that node. <br />If there is no un-ignored taint with effect NoSchedule but there is at least one un-ignored taint with effect PreferNoSchedule, then the system will try not to schedule pods onto the node.<br />if there is at least one un-ignored taint with effect NoExecute, then the pods will be evicted from the node (if it is already running on the node), and will not be scheduled onto the node (if it is not yet running on the node).',
  NO_TAINTS_TIPS: 'No taints have been set yet.',
  TAINT_SELECT_TIPS: 'Join Common Taints',
  TAINT_DELETE_TIPS: 'Delete Taint',

  NODE_STATUS_UNSCHEDULABLE: 'Unschedulable',
  NODE_STATUS_RUNNING: 'Running',
  NODE_STATUS_WARNING: 'Warning',
  NODE_STATUS_PENDING: 'Creating',
  NODE_STATUS_FAILED: 'Failed',

  CLUSTER_NODE_DESC:
    'This module manages cluster nodes and shows the status of them. You can edit or delete nodes here.',
  CLUSTER_NODE_CREATE_DESC:
    'This module manages cluster nodes and shows the status of them. You can edit or delete nodes here.',
  EDGE_NODE_DESC:
    'This module manages edge nodes and shows the status of them. You can edit or delete nodes here.',
  EDGE_NODE_CREATE_DESC:
    'This module manages edge nodes and shows the status of them. You can edit or delete nodes here.',
  NODE_NETWORKUNAVAILABLE: 'NetworkUnavailable',
  NODE_NETWORKUNAVAILABLE_DESC:
    'Check if the network configuration on the node is available',
  NODE_OUTOFDISK: 'OutOfDisk',
  NODE_OUTOFDISK_DESC: 'Check if there is space on the node to add a new pod',
  NODE_MEMORYPRESSURE: 'MemoryPressure',
  NODE_MEMORYPRESSURE_DESC:
    'If the memory usage pressure on the node is too high, the scheduling fails',
  NODE_DISKPRESSURE: 'DiskPressure',
  NODE_DISKPRESSURE_DESC:
    'If pressure exists on the disk size–that is, if the disk capacity is low',
  NODE_PIDPRESSURE: 'PIDPressure',
  NODE_PIDPRESSURE_DESC:
    'If pressure exists on the processes—that is, if there are too many processes on the node',
  NODE_READY: 'Ready',
  NODE_READY_DESC: 'If the node is healthy and ready to accept pods',

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
  NODE_TYPES_A: 'Nodes include master nodes and worker nodes.',
  WHAT_IS_NODE_TAINTS_Q: 'What are node taints?',
  WHAT_IS_NODE_TAINTS_A:
    'Taints allow a node to repel a set of Pods. Taints and tolerations work together to ensure that Pods are not scheduled onto inappropriate nodes.',

  NODE_TYPE_DESC:
    'Node types help users to divide nodes into different groups. Users can add the hosting node to a corresponding group by creating nodes of different types that are properly connected with each other. In this way, Pods can be deployed to appropriate physical nodes based on the group. Resource availability and business continuity can also be improved.',
  NODE_TYPE_DESCRIPTION_DEC:
    'The description will help users to select nodes types and use the cluster.',
  ADD_EDGE_COMMAND: 'Run the above command on your edge node to configure it.',
  IN_USE_Node_IP: 'Node IP {ip} in use',
  IN_USE_Node_NAME: 'Node name {name} in use',
  'Add Edge Node': 'Add Edge Node',
  "Please input the node's name": 'Please input the node name',
  INSTALL_EDGENODE_DESC:
    'Before running the command, you must install a container runtime such as Docker or containerd on your edge node. See the KubeEdge <a href="https://kubeedge.io/en/docs/" target="_blank">documentation</a> for more details.',
  ADD_DEFAULT_STAIN: 'Add the default taint {params}.',
}
