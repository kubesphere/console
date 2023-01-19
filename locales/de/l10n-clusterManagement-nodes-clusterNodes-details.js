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
  ATTRIBUTES: 'Attribute',
  ARCHITECTURE: 'Architektur',
  OS_VERSION: 'OS Version',
  OS_TYPE: 'OS Typ',
  LINUX: 'Linux',
  KERNEL_VERSION: 'Kernel Version',
  CONTAINER_RUNTIME: 'Container Laufzeit',
  KUBELET_VERSION: 'kubelet Version',
  KUBE_PROXY_VERSION: 'kube-proxy Version',
  IP_ADDRESS: 'IP-Adresse',
  SCHEDULABLE: 'Planbar',
  YES: 'Ja',
  // More > Edit Labels
  EDIT_LABELS: 'Labels bearbeiten',
  LABEL_PL: 'Labels',
  // More > Edit Taints
  TAINTS: 'Taints',
  EDIT_TAINTS: 'Edit Taints',
  TAINTS_DESC: 'Add taints to nodes so that pods are not scheduled to the nodes or not scheduled to the nodes if possible. After you add taints to nodes, you can set tolerations on a pod to allow the pod to be scheduled to nodes with certain taints.',
  COMMON_TAINTS: 'Common Taints',
  NOSCHEDULE: 'Planung verhindern',
  PREFER_NOSCHEDULE: 'Planung verhindern, wenn möglich',
  NOEXECUTE: 'Planung verhindern und vorhandene Pods entfernen',
  TAINT_SELECT_TIPS: 'Join Common Taints',
  TAINTS_TIPS: '<b>Prevent scheduling</b><br />Prevents all pods from being scheduled to the node.<br /><br /><b>Prevent scheduling if possible</b><br />Prevents all pods from being scheduled to the node if possible.<br /><br /><b>Prevent scheduling and evict existing pods</b><br />Prevents all pods from being scheduled to the node and evict all existing pods on the node.',
  TAINT_DELETE_TIP: 'Delete taint',
  // Running Status > Resource Usage
  RESOURCE_USAGE: 'Ressourcenverwendung',
  MAXIMUM_PODS: 'Maximale Pods',
  MAXIMUM_PODS_SCAP: 'Maximale pods',
  DISK_USAGE_SCAP: 'Speicherverbrauch',
  // Running Status > Allocated resources
  MEMORY_REQUEST_SCAP: 'Memory request',
  MEMORY_LIMIT_SCAP: 'Memory limit',
  CPU_REQUEST_SCAP: 'CPU request',
  CPU_LIMIT_SCAP: 'CPU limit',
  // Running Status > Allocated Resources
  ALLOCATED_RESOURCES: 'Zugewiesene Ressourcen',
  // Running Status > Health Status
  RUNNING_STATUS: 'Running Status',
  HEALTH_STATUS: 'Gesundheitszustand',
  NODE_NETWORKUNAVAILABLE: 'Netzwerkverfügbarkeit',
  NODE_NETWORKUNAVAILABLE_DESC: 'Ob der Netzwerkstatus der Node normal ist.',
  NODE_MEMORYPRESSURE: 'Memory Pressure',
  NODE_MEMORYPRESSURE_DESC: 'Whether the remaining memory of the node is less than the threshold.',
  NODE_DISKPRESSURE: 'Disk Pressure',
  NODE_DISKPRESSURE_DESC: 'Whether the ramaining disk space or inodes of the node is less than the threshold.',
  NODE_PIDPRESSURE: 'PID Pressure',
  NODE_PIDPRESSURE_DESC: 'Whether the number of processes allowed to be created on the node is less the threshold.',
  NODE_READY: 'Bereitschaft',
  NODE_READY_DESC: 'Ob die Node bereit ist, Pods zu akzeptieren.',
  LAST_HEARTBEAT_VALUE: 'Letztes Lebenszeichen: {value}',
  // Running Status > Taints
  NO_TAINTS_TIPS: 'No taint is found.',
  POLICY: 'Richtlinie',
  // Pods
  READY_VALUE: 'Fertig: {readyCount}/{total}',
  STATUS_VALUE: 'Status: {value}',
  // Metadata
  // Monitoring
  USAGE: 'Verwendung',
  OUT: 'Aus',
  IN: 'Ein'
};