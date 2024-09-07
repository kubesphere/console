/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Attributes
  NODE_IP_ADDRESS: 'Node IP Address',
  CLUSTER: 'Cluster',
  // Resource Status > Containers
  CONTAINER_PL: 'Contenedores',
  PROBE_PL: 'Investigacion',
  HOOK_PL: 'Hooks',
  // Resource Status > Containers > Container Logs
  CONTAINER_LOGS_NOT_SUPPORTED:
    'El contenedor no admite logs en tiempo real en el estado actual, intente nuevamente más tarde.',
  CONTAINER_LOGS: 'Registros de contenedores',
  // Resource Status > Details > Container Details > Attributes
  COMMAND: 'Comando',
  IMAGE_ID: 'ID de imagen',
  IMAGE_PULL_POLICY: 'Política de extracción de imagen',
  CONTAINER_DETAILS_PAGE_SCAP: 'Container details page.',
  CPU_VALUE: 'CPU: {value, plural, =1 {1 core} other {# cores}}',
  MEMORY_VALUE: 'Memory: {value}',
  NVIDIA_COM_GPU_VALUE: 'GPU: {value}',
  // Resource Status > Details > Container Details > Terminal
  LOADING: 'Cargando',
  RESOURCE_LIMITS: 'Límites de recursos',
  RESOURCE_REQUESTS: 'Solicitudes de recursos',
  TERMINAL: 'Terminal',
  // Resource Status > Details > Container Details > Resource Status
  RESTART_PL: 'Reiniciar contadores',
  RESTART: 'Restart',
  STORAGE_DEVICES: 'Dispositivo de almacenamiento',
  LIVENESS_PROBE: 'Sonda de estado',
  READINESS_PROBE: 'Sonda de preparación',
  STARTUP_PROBE: 'Startup Probe',
  REQUEST_TYPE: 'Request type',
  // Resource Status > Details > Container Details > Monitoring
  // Resource Status > Details > Container Details > Environment Variables
  // Resource Status > Details > Container Details > Container Logs
  NO_LOG_DATA_FOUND: 'No Log Data Found',
  NO_LOG_DATA_FOUND_TIP: 'No log data is found.',
  // Resource Status > Volumes
  VOLUME_PL: 'Volumes',
  TYPE_CONFIGMAP: 'Volume type: ConfigMap',
  TYPE_SECRET: 'Volume type: Secret',
  TYPE_EMPTYDIR: 'Volume type: emptyDir',
  TYPE_HOSTPATH: 'Volume type: HostPath',
  // Scheduling Information
  REASON_VALUE: 'Reason: {value}',
  MESSAGE_VALUE: 'Message: {value}',
  UPDATED_AT_VALUE: 'Updated At: {value}',
  // Metadata
  // Monitoring
  NO_MONITORING_DATA: 'No Monitoring Data',
  OUTBOUND: 'Outbound',
  INBOUND: 'Inbound',
};
