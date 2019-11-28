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
  NOSCHEDULE_OPTION: 'NoSchedule',
  PREFER_NOSCHEDULE_OPTION: 'PreferNoSchedule',
  NOEXECUTE_OPTION: 'NoExecute',

  TAINTS_MSG:
    'If the node is placed a taint with "key=value", then no pod will be able to schedule (PodToleratesNodeTaints policy) or try to avoid scheduling (TaintTolerationPriority policy) onto this node unless the pod has a matching toleration with "key=value".',
  TAINTS_TIPS:
    'If there is at least one un-ignored taint with effect NoSchedule then the system will not schedule pods onto that node. <br />If there is no un-ignored taint with effect NoSchedule but there is at least one un-ignored taint with effect PreferNoSchedule then the system will try to not schedule pods onto the node.<br />if there is at least one un-ignored taint with effect NoExecute then the pods will be evicted from the node (if it is already running on the node), and will not be scheduled onto the node (if it is not yet running on the node).',
  NO_TAINTS_TIPS: 'No taints have been set yet.',
  TAINT_SELECT_TIPS: 'Join Common Taints',
  TAINT_DELETE_TIPS: 'Delete Taint',

  NODE_STATUS_UNSCHEDULABLE: 'Unschedulable',
  NODE_STATUS_RUNNING: 'Running',
  NODE_STATUS_WARNING: 'Warning',

  NODE_DESC:
    'The computing power of KubeSphere cluster is provided by the nodes where all the pods are running on those working nodes.',

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
  NODE_TYPES_A: 'The nodes are divided into master nodes and worker nodes.',
  WHAT_IS_NODE_TAINTS_Q: 'What is node taints ?',
  WHAT_IS_NODE_TAINTS_A:
    'Taints allow a node to repel a set of pods. Taints and tolerations work together to ensure that pods are not scheduled onto inappropriate nodes.',
}
