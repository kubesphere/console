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
  // Attributes
  QOS_CLASS: 'QoS Class',
  NODE_NAME: 'Node Name',
  POD_IP_ADDRESS: 'Pod IP Address',
  // Run Records
  JOB_UNFINISHED: 'Unfinished',
  // Resource Status
  TERMINATED: 'Terminated',
  // Scheduling Information
  SCHEDULED_TO_NODE: 'Scheduled to {value}',
  SCHEDULING_NOT_SUCCESSFUL: 'Scheduling Not Successful',
  SCHEDULING_INFORMATION: 'Scheduling Information',
  SCHEDULING_RESULT: 'Scheduling Result',
  POD_SCHEDULING_METHOD: 'Pod Scheduling Method',
  POD_ASSIGNED_DESC: 'The system schedules a pod to a node with sufficient available resources based on the resource requests of the Pod.',
  STATUS_INFORMATION: 'Status Information',
  WORKLOAD_CONDITION_AVAILABLE: 'Available',
  WORKLOAD_CONDITION_PROGRESSING: 'Progressing',
  NOT_SUCCESSFUL: 'Not successful',
  CURRENT_STATUS: 'Current status',
  POD_CONDITION_INITIALIZED: 'Initialized',
  POD_CONDITION_INITIALIZED_DESC: 'Starts all init containers in the pod.',
  POD_CONDITION_READY: 'Pod Ready',
  POD_CONDITION_READY_DESC: 'Starts running the pod and allows the pod to be accessed.',
  POD_CONDITION_CONTAINERSREADY: 'Containers Ready',
  POD_CONDITION_CONTAINERSREADY_DESC: 'Starts all containers in the pod.',
  POD_CONDITION_PODSCHEDULED: 'Pod Scheduled',
  POD_CONDITION_PODSCHEDULED_DESC: 'Schedules the pod to a node in the cluster.',
  // Metadata
  // Monitoring
  // Environment Variables
  // Events
}
