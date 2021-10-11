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
  NODE_SI: 'Nodo',
  NODE_PL: 'Nodos',
  MASTER_NODE_SI: 'Nodo master',
  MASTER_NODE_PL: 'Nodo master',
  WORKER_NODE_SI: 'Nodo worker',
  WORKER_NODE_PL: 'Nodo worker',

  ADD_NODE: 'Añadir nodo',
  'Add Node Type': 'Añadir tipo de nodo',
  ADD_TAINT: 'Añadir Taint',
  'Add Type': 'Añadir tipo',
  ALL_NODES: 'Todos los nodos',
  'Allocated CPU': 'CPU reservada',
  'Allocated Memory': 'Memoria reservada',
  ANNOTATION_PL: 'Anotaciones',
  WORKLOAD_ANNOTATIONS: 'Workload Annotations',
  ARCHITECTURE: 'Arquitectura',
  'Cluster Node': 'Nodo de clúster',
  CLUSTER_NODE_PL: 'Nodo de clúster',
  CLUSTER_NODE: 'Cluster Node',
  'Cluster Nodes': 'Nodo de clúster',
  'Edge Node': 'Nó de Borda',
  EDGE_NODE_PL: 'Nó de Borda',
  COMMON_TAINTS: 'Taints Comunes',
  Conditions: 'Condiciones',
  CONTAINER_RUNTIME: 'ContainerRuntimeVersion',
  'CPU Limits': 'Límites de CPU',
  'CPU Requests': 'Solicitudes de CPU',
  'CPU Used': 'CPU utilizada',
  'Delete All Taints': 'Eliminar todas los Taints',
  IP_ADDRESS: 'Dirección IP',
  LINUX: 'Linux',
  ALLOCATED_RESOURCES: 'Allocated Resources',
  KERNEL_VERSION: 'Versión del Kernel',
  KUBE_PROXY_VERSION: 'Versión Kube-Proxy',
  KUBELET_VERSION: 'Versión Kubelet',
  lastHeartbeatTime: 'lastHeartbeatTime',
  LATEST_UPDATE_VALUE: 'Latest update: {value}',
  'Local Storage Capacity': 'Capacidad de almacenamiento local',
  'Master Node': 'Nodo master',
  'Memory Limits': 'Límites de memoria',
  'Memory Requests': 'Solicitudes de memoria',
  'Memory Used': 'Memoria usada',
  METADATA: 'Metadatos',
  'Node IP': 'IP de nodo',
  'Node List': 'Lista de nodos',
  NODE_ONLINE_STATUS: 'Estado del nodo online',
  'Node Taints': 'Taints de los nodos',
  ONLINE_NODES: 'Nodos en línea',
  OS_TYPE: 'Sistema operativo',
  'OS Image': 'Imagen del sistema operativo',
  OS_VERSION: 'OS Version',
  PODS: 'Pods',
  'Pod Quantity Trend': 'Tendencia de cantidad de pods',
  'Pod Usage': 'Uso de pods',
  'Pod Used': 'Pod utilizado',
  'Resource Usage': 'Uso de recursos',
  'Resource Usage Status': 'Estado de uso de recursos',
  'Scheduling Policy': 'Política de programación',
  'System Version': 'Versión del sistema',
  taint: 'taint',
  Taint: 'Taint',
  EDIT_TAINT: 'Gestión de Taints',
  EDIT_TAINTS: 'Gestión de Taints',
  taints: 'taints',
  TAINTS: 'Taints',
  'Type Name': 'Escribe un nombre',
  Unschedulable: 'No programable',
  SCHEDULABLE: 'Schedulable',
  used: 'usado',
  'Worker Node': 'Nodo Worker',
  NOSCHEDULE: 'NoProgramable',
  PREFER_NOSCHEDULE: 'PreferNoSchedule',
  NOEXECUTE: 'NoEjecutar',
  TAINTS_DESC:
    'Si se agrega un taint con "clave=valor" al nodo, significa que no se programará ningún pod en este nodo (política PodToleratesNodeTaints) o al menos se evita la programación tanto como sea posible (política TaintTolerationPriority), a menos que el pod tenga una coincidencia tolerancia con "clave=valor".',
  TAINTS_TIPS:
    'Si hay al menos un taint no ignorado con efecto NoProgramable, entonces el sistema no programará pods en ese nodo. <br /> Si no hay un taint no ignorado con efecto NoProgramable pero hay al menos un taint no ignorada con efecto PreferNoSchedule, entonces el sistema intentará no programar pods en el nodo. <br /> si hay al menos un taint no ignorada con efecto NoEjecutar, los pods serán expulsados del nodo (si ya se está ejecutando en el nodo) y no se programarán en el nodo (si aún no se está ejecutando en el nodo).',
  NO_TAINTS_TIPS: 'Aún no se han establecido taints.',
  TAINT_SELECT_TIPS: 'Unir taints comunes',
  TAINT_DELETE_TIPS: 'Eliminar taint',
  NODE_STATUS_UNSCHEDULABLE: 'No programable',
  NODE_STATUS_RUNNING: 'Corriendo',
  NODE_STATUS_WARNING: 'Advertencia',
  CLUSTER_NODE_DESC:
    'Este módulo gestiona los nodos del clúster y muestra el estado de ejecución de ellos. Puedes editar o eliminar nodos aquí.',
  CLUSTER_NODE_EMPTY_DESC:
    'Este módulo gestiona los nodos del clúster y muestra el estado de ejecución de ellos. Puedes editar o eliminar nodos aquí.',
  NODE_NETWORKUNAVAILABLE: 'Red no disponible',
  EDGE_NODE_DESC:
    'Este módulo gestiona los nodos del borda y muestra el estado de ejecución de ellos. Puedes editar o eliminar nodos aquí.',
  EDGE_NODE_EMPTY_DESC:
    'Este módulo gestiona los nodos del borda y muestra el estado de ejecución de ellos. Puedes editar o eliminar nodos aquí.',

  NODE_NETWORKUNAVAILABLE_DESC:
    'Compruebe si la configuración de red en el nodo está disponible',
  NODE_OUTOFDISK: 'OutOfDisk',
  NODE_OUTOFDISK_DESC:
    'Compruebe si hay espacio en el nodo para agregar un nuevo pod',
  NODE_MEMORYPRESSURE: 'Carga de memoria',
  NODE_MEMORYPRESSURE_DESC:
    'Si la carga de uso de memoria en el nodo es demasiado alta, la programación falla',
  NODE_DISKPRESSURE: 'Carga de disco',
  NODE_DISKPRESSURE_DESC:
    'Si existe carga sobre el tamaño del disco, es decir, si la capacidad del disco es baja',
  NODE_PIDPRESSURE: 'Carga PID',
  NODE_PIDPRESSURE_DESC:
    'Si existe carga sobre los procesos, es decir, si hay demasiados procesos en el nodo',
  NODE_READY: 'Listo',
  NODE_READY_DESC: 'Si el nodo está sano y listo para aceptar pods',
  NODE_NETWORKUNAVAILABLE_TIP:
    'Si la red para el nodo está configurada correctamente.',
  NODE_OUTOFDISK_TIP:
    'Si no hay suficiente espacio libre en el nodo para agregar nuevos pods.',
  NODE_MEMORYPRESSURE_TIP:
    'Si existe carga en la memoria del nodo, es decir, si la memoria del nodo es baja.',
  NODE_DISKPRESSURE_TIP:
    'Si existe carga sobre el tamaño del disco, es decir, si la capacidad del disco es baja.',
  NODE_PIDPRESSURE_TIP:
    'Si existe carga sobre los procesos, es decir, si hay demasiados procesos en el nodo.',
  NODE_READY_TIP: 'Si el nodo está sano y listo para aceptar pods.',
  NODE_TYPES_Q: '¿Cuáles son los tipos de nodos de clúster?',
  NODE_TYPES_A: 'Los nodos se dividen en nodos maestros y nodos de trabajo.',
  WHAT_IS_NODE_TAINTS_Q: '¿Qué son los taints de nodos?',
  WHAT_IS_NODE_TAINTS_A:
    'Los taints permiten que un nodo repele un conjunto de pods. Las contaminaciones y las tolerancias funcionan juntas para garantizar que los pods no se programen en nodos inapropiados.',
  NODE_TYPE_DESC:
    'Los tipos de nodos ayudan a los usuarios a dividir los nodos en diferentes grupos. Los usuarios pueden agregar el nodo de alojamiento a un grupo correspondiente creando nodos de diferentes tipos que estén conectados adecuadamente entre sí. De esta forma, los Pods pueden desplegarse en los nodos físicos apropiados según el grupo. La disponibilidad de recursos y la continuidad del negocio también se pueden mejorar.',
  NODE_TYPE_DESCRIPTION_DEC:
    'La descripción ayudará a los usuarios a seleccionar tipos de nodos y usar el clúster.',
  ADD_EDGE_COMMAND: 'Run the above command on your edge node to configure it.',
  IN_USE_Node_IP: 'Node IP {ip} in use',
  IN_USE_Node_NAME: 'Node name {name} in use',
  'Add Edge Node': 'Add Edge Node',
  NODE_NAME_EMPTY_DESC: 'Please set a name for the node.',
  EDGENODE_NAME_EMPTY_DESC: 'Please set a name for the node.',
  EDGENODE_CONFIG_COMMAND_TIP:
    'Before running the command, you must install a container runtime such as Docker or containerd on your edge node. See the KubeEdge <a href="https://kubeedge.io/en/docs/" target="_blank">documentation</a> for more details.',
  ADD_DEFAULT_TAINT: 'Adicionar mancha padrão {params}',
}
