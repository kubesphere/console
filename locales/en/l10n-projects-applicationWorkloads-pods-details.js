/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
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
  POD_ASSIGNED_DESC:
    'The system schedules a pod to a node with sufficient available resources based on the resource requests of the Pod.',
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
};
