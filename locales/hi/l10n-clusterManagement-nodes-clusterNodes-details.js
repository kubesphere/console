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
  // Details
  DETAILS: 'Details',
  ARCHITECTURE: 'Architecture',
  OS_VERSION: 'OS Version',
  OS_TYPE: 'OS Type',
  LINUX: 'Linux',
  KERNEL_VERSION: 'Kernel Version',
  CONTAINER_RUNTIME: 'Container Runtime',
  KUBELET_VERSION: 'kubelet Version',
  KUBE_PROXY_VERSION: 'kube-proxy Version',
  IP_ADDRESS: 'IP Address',
  SCHEDULABLE: 'Schedulable',
  YES: 'Yes',
  // More > Edit Labels
  EDIT_LABELS: 'Edit Labels',
  LABEL_PL: 'Labels',
  // More > Edit Taints
  TAINTS: 'Taints',
  EDIT_TAINTS: 'Edit Taints',
  TAINTS_DESC: 'Add taints to nodes so that pods are not scheduled to the nodes or not scheduled to the nodes if possible. After you add taints to nodes, you can set tolerations on a pod to allow the pod to be scheduled to nodes with certain taints.',
  ADD_TAINT: 'Add Taint',
  COMMON_TAINTS: 'Common Taints',
  NOSCHEDULE: 'Prevent scheduling',
  PREFER_NOSCHEDULE: 'Prevent scheduling if possible',
  NOEXECUTE: 'Prevent scheduling and evict existing pods',
  TAINTS_TIPS: '<b>Prevent scheduling</b><br />Prevents all pods from being scheduled to the node.<br /><br /><b>Prevent scheduling if possible</b><br />Prevents all pods from being scheduled to the node if possible.<br /><br /><b>Prevent scheduling and evict existing pods</b><br />Prevents all pods from being scheduled to the node and evict all existing pods on the node.',
  // Running Status > Resource Usage
  RESOURCE_USAGE: 'Resource Usage',
  MAXIMUM_PODS: 'Maximum Pods',
  MAXIMUM_PODS_SCAP: 'Maximum pods',
  // Running Status > Allocated resources
  MEMORY_REQUEST_SCAP: 'Memory request',
  MEMORY_LIMIT_SCAP: 'Memory limit',
  CPU_REQUEST_SCAP: 'CPU request',
  CPU_LIMIT_SCAP: 'CPU limit',
  // Running Status > Allocated Resources
  ALLOCATED_RESOURCES: 'Allocated Resources',
  // Running Status > Health Status
  RUNNING_STATUS: 'Running Status',
  HEALTH_STATUS: 'Health Status',
  NODE_NETWORKUNAVAILABLE: 'Network Availability',
  NODE_NETWORKUNAVAILABLE_DESC: 'Check if the network configuration on the node is available.',
  NODE_MEMORYPRESSURE: 'Memory Pressure',
  NODE_MEMORYPRESSURE_DESC: 'If the memory usage pressure on the node is too high, the scheduling fails.',
  NODE_DISKPRESSURE: 'Disk Pressure',
  NODE_DISKPRESSURE_DESC: 'If pressure exists on the disk size–that is, if the disk capacity is low.',
  NODE_PIDPRESSURE: 'PID Pressure',
  NODE_PIDPRESSURE_DESC: 'If pressure exists on the processes—that is, if there are too many processes on the node.',
  NODE_READY: 'Node Readiness',
  NODE_READY_DESC: 'Whether the node is ready to accept new pods.',
  // Running Status > Taints
  NO_TAINTS_TIPS: 'No taint is found.',
  POLICY: 'Policy',
  // Pods
  READY_VALUE: 'Ready: {readyCount}/{total}',
  STATUS_VALUE: 'Status: {value}',
  CREATED_AGO: 'Created {diff}'
};