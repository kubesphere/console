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
  'Cluster Nodes': 'Cluster Nodes',

  'Add Node Type': 'Add Node Type',

  'Add Type': 'Add Type',

  'Allocated CPU': 'Allocated CPU',
  'Allocated Memory': 'Allocated Memory',

  'Cluster Node': 'Cluster Node',
  'Edge Node': 'Edge Node',

  Conditions: 'Conditions',

  'CPU Limits': 'CPU Limits',
  'CPU Requests': 'CPU Requests',
  'CPU Used': 'CPU Used',
  'Delete All Taints': 'Delete All Taints',

  lastHeartbeatTime: 'lastHeartbeatTime',

  'Local Storage Capacity': 'Local Storage Capacity',
  'Master Node': 'Master Node',
  'Memory Limits': 'Memory Limits',
  'Memory Requests': 'Memory Requests',
  'Memory Used': 'Memory Used',

  'Node IP': 'Node IP',
  'Node List': 'Node List',

  'Node Taints': 'Node Taints',

  'OS Image': 'OS Image',

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
  EDIT_TAINT: 'Edit Taint',

  taints: 'taints',

  'Type Name': 'Type Name',
  Unschedulable: 'Unschedulable',

  used: 'used',
  'Worker Node': 'Worker Node',

  TAINT_SELECT_TIPS: 'Join Common Taints',
  TAINT_DELETE_TIPS: 'Delete Taint',

  NODE_OUTOFDISK: 'OutOfDisk',
  NODE_OUTOFDISK_DESC: 'Check if there is space on the node to add a new pod',

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

  NODE_TYPE_DESC:
    'Node types help users to divide nodes into different groups. Users can add the hosting node to a corresponding group by creating nodes of different types that are properly connected with each other. In this way, pods can be deployed to appropriate physical nodes based on the group. Resource availability and business continuity can also be improved.',
  NODE_TYPE_DESCRIPTION_DEC:
    'The description will help users to select nodes types and use the cluster.',

  'Add Edge Node': 'Add Edge Node',
}
