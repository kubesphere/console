/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Attributes
  ATTRIBUTES: 'Attributes',
  ARCHITECTURE: 'Arquitectura',
  OS_VERSION: 'OS Version',
  OS_TYPE: 'Sistema operativo',
  LINUX: 'Linux',
  KERNEL_VERSION: 'Versión del Kernel',
  CONTAINER_RUNTIME: 'ContainerRuntimeVersion',
  KUBELET_VERSION: 'Versión Kubelet',
  KUBE_PROXY_VERSION: 'Versión Kube-Proxy',
  IP_ADDRESS: 'Dirección IP',
  SCHEDULABLE: 'Schedulable',
  YES: 'Sí',
  // More > Edit Labels
  EDIT_LABELS: 'Editar etiquetas',
  LABEL_PL: 'Labels',
  // More > Edit Taints
  TAINTS: 'Taints',
  EDIT_TAINTS: 'Gestión de Taints',
  TAINTS_DESC:
    'Si se agrega un taint con "clave=valor" al nodo, significa que no se programará ningún pod en este nodo (política PodToleratesNodeTaints) o al menos se evita la programación tanto como sea posible (política TaintTolerationPriority), a menos que el pod tenga una coincidencia tolerancia con "clave=valor".',
  COMMON_TAINTS: 'Taints Comunes',
  NOSCHEDULE: 'NoProgramable',
  PREFER_NOSCHEDULE: 'PreferNoSchedule',
  NOEXECUTE: 'NoEjecutar',
  TAINT_SELECT_TIPS: 'Join Common Taints',
  TAINTS_TIPS:
    'Si hay al menos un taint no ignorado con efecto NoProgramable, entonces el sistema no programará pods en ese nodo. <br /> Si no hay un taint no ignorado con efecto NoProgramable pero hay al menos un taint no ignorada con efecto PreferNoSchedule, entonces el sistema intentará no programar pods en el nodo. <br /> si hay al menos un taint no ignorada con efecto NoEjecutar, los pods serán expulsados del nodo (si ya se está ejecutando en el nodo) y no se programarán en el nodo (si aún no se está ejecutando en el nodo).',
  TAINT_DELETE_TIP: 'Delete taint',
  // Running Status > Resource Usage
  RESOURCE_USAGE: 'Resource Usage',
  MAXIMUM_PODS: 'Maximum Pods',
  MAXIMUM_PODS_SCAP: 'Maximum Pods',
  DISK_USAGE_SCAP: 'Disk usage',
  // Running Status > Allocated resources
  MEMORY_REQUEST_SCAP: 'Memory request',
  MEMORY_LIMIT_SCAP: 'Memory limit',
  CPU_REQUEST_SCAP: 'CPU request',
  CPU_LIMIT_SCAP: 'CPU limit',
  // Running Status > Allocated Resources
  ALLOCATED_RESOURCES: 'Allocated Resources',
  // Running Status > Health Status
  RUNNING_STATUS: 'Estado de ejecución',
  HEALTH_STATUS: 'Health Status',
  NODE_NETWORKUNAVAILABLE: 'Red no disponible',
  NODE_NETWORKUNAVAILABLE_DESC: 'Whether the network status of the node is normal.',
  NODE_MEMORYPRESSURE: 'Carga de memoria',
  NODE_MEMORYPRESSURE_DESC: 'Whether the remaining memory of the node is less than the threshold.',
  NODE_DISKPRESSURE: 'Carga de disco',
  NODE_DISKPRESSURE_DESC:
    'Whether the ramaining disk space or inodes of the node is less than the threshold.',
  NODE_PIDPRESSURE: 'Carga PID',
  NODE_PIDPRESSURE_DESC:
    'Whether the number of processes allowed to be created on the node is less the threshold.',
  NODE_READY: 'Readiness',
  NODE_READY_DESC: 'Whether the node is ready to accept pods.',
  LAST_HEARTBEAT_VALUE: 'Last Heartbeat: {value}',
  // Running Status > Taints
  NO_TAINTS_TIPS: 'Aún no se han establecido taints.',
  POLICY: 'Policy',
  // Pods
  READY_VALUE: 'Ready: {readyCount}/{total}',
  STATUS_VALUE: 'Status: {value}',
  // Metadata
  // Monitoring
  USAGE: 'Usage',
  OUT: 'Out',
  IN: 'En',
};
