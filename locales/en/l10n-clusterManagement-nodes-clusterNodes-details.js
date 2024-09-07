/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Attributes
  ATTRIBUTES: 'Attributes',
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
  TAINTS_DESC:
    'Add taints to nodes so that pods are not scheduled to the nodes or not scheduled to the nodes if possible. After you add taints to nodes, you can set tolerations on a pod to allow the pod to be scheduled to nodes with certain taints.',
  COMMON_TAINTS: 'Common Taints',
  NOSCHEDULE: 'Prevent scheduling',
  PREFER_NOSCHEDULE: 'Prevent scheduling if possible',
  NOEXECUTE: 'Prevent scheduling and evict existing pods',
  TAINT_SELECT_TIPS: 'Join Common Taints',
  TAINTS_TIPS:
    '<b>Prevent scheduling</b><br />Prevents all pods from being scheduled to the node.<br /><br /><b>Prevent scheduling if possible</b><br />Prevents all pods from being scheduled to the node if possible.<br /><br /><b>Prevent scheduling and evict existing pods</b><br />Prevents all pods from being scheduled to the node and evict all existing pods on the node.',
  TAINT_DELETE_TIP: 'Delete taint',
  // Running Status > Resource Usage
  RESOURCE_USAGE: 'Resource Usage',
  MAXIMUM_PODS: 'Maximum Pods',
  MAXIMUM_PODS_SCAP: 'Maximum pods',
  DISK_USAGE_SCAP: 'Disk usage',
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
  NODE_NETWORKUNAVAILABLE_DESC: 'Whether the network status of the node is normal.',
  NODE_MEMORYPRESSURE: 'Memory Pressure',
  NODE_MEMORYPRESSURE_DESC: 'Whether the remaining memory of the node is less than the threshold.',
  NODE_DISKPRESSURE: 'Disk Pressure',
  NODE_DISKPRESSURE_DESC:
    'Whether the ramaining disk space or inodes of the node is less than the threshold.',
  NODE_PIDPRESSURE: 'PID Pressure',
  NODE_PIDPRESSURE_DESC:
    'Whether the number of processes allowed to be created on the node is less the threshold.',
  NODE_READY: 'Readiness',
  NODE_READY_DESC: 'Whether the node is ready to accept pods.',
  LAST_HEARTBEAT_VALUE: 'Last Heartbeat: {value}',
  // Running Status > Taints
  NO_TAINTS_TIPS: 'No taint is found.',
  POLICY: 'Policy',
  // Pods
  READY_VALUE: 'Ready: {readyCount}/{total}',
  STATUS_VALUE: 'Status: {value}',
  // Metadata
  // Monitoring
  USAGE: 'Usage',
  OUT: 'Out',
  IN: 'In',
  // Events
};
