/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Attributes
  NODE_IP_ADDRESS: 'Node IP Address',
  CLUSTER: 'Cluster',
  // Resource Status > Containers
  CONTAINER_PL: 'Containers',
  PROBE_PL: 'Probes',
  HOOK_PL: 'Hooks',
  // Resource Status > Containers > Container Logs
  CONTAINER_LOGS_NOT_SUPPORTED:
    'The container does not support real-time logs currently. Please try again later.',
  CONTAINER_LOGS: 'Container Logs',
  // Resource Status > Details > Container Details > Attributes
  COMMAND: 'Command',
  IMAGE_ID: 'Image ID',
  IMAGE_PULL_POLICY: 'Image Pull Policy',
  CONTAINER_DETAILS_PAGE_SCAP: 'Container details page.',
  CPU_VALUE: 'CPU: {value, plural, =1 {1 core} other {# cores}}',
  MEMORY_VALUE: 'Memory: {value}',
  NVIDIA_COM_GPU_VALUE: 'GPU: {value}',
  // Resource Status > Details > Container Details > Terminal
  LOADING: 'Loading...',
  RESOURCE_LIMITS: 'Resource Limits',
  RESOURCE_REQUESTS: 'Resource Requests',
  TERMINAL: 'Terminal',
  // Resource Status > Details > Container Details > Resource Status
  RESTART_PL: 'Restarts',
  RESTART: 'Restart',
  STORAGE_DEVICES: 'Storage Devices',
  LIVENESS_PROBE: 'Liveness Probe',
  READINESS_PROBE: 'Readiness Probe',
  STARTUP_PROBE: 'Startup Probe',
  REQUEST_TYPE: 'Request type',
  // Resource Status > Details > Container Details > Monitoring

  // Resource Status > Details > Container Details > Environment Variables

  // Resource Status > Details > Container Details > Container Logs
  NO_LOG_DATA_FOUND: 'No Log Data Found',
  NO_LOG_DATA_FOUND_TIP: 'No log data is found.',
  // Resource Status > Volumes
  VOLUME_PL: 'Volumes',
  TYPE_CONFIGMAP: 'Volume type: configmap',
  TYPE_SECRET: 'Volume type: secret',
  TYPE_EMPTYDIR: 'Volume type: emptyDir',
  TYPE_HOSTPATH: 'Volume type: host path',
  // Scheduling Information
  REASON_VALUE: 'Reason: {value}',
  MESSAGE_VALUE: 'Message: {value}',
  UPDATED_AT_VALUE: 'Updated At: {value}',
  // Metadata

  // Monitoring
  NO_MONITORING_DATA: 'No Monitoring Data',
  OUTBOUND: 'Outbound',
  INBOUND: 'Inbound',
  // Environment Variables

  // Events
};
