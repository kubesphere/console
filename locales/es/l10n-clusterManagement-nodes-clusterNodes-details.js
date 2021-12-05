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
  DETAILS: 'Detalles',
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
  TAINTS_DESC: 'Si se agrega un taint con "clave=valor" al nodo, significa que no se programará ningún pod en este nodo (política PodToleratesNodeTaints) o al menos se evita la programación tanto como sea posible (política TaintTolerationPriority), a menos que el pod tenga una coincidencia tolerancia con "clave=valor".',
  ADD_TAINT: 'Añadir Taint',
  COMMON_TAINTS: 'Taints Comunes',
  NOSCHEDULE: 'NoProgramable',
  PREFER_NOSCHEDULE: 'PreferNoSchedule',
  NOEXECUTE: 'NoEjecutar',
  TAINTS_TIPS: 'Si hay al menos un taint no ignorado con efecto NoProgramable, entonces el sistema no programará pods en ese nodo. <br /> Si no hay un taint no ignorado con efecto NoProgramable pero hay al menos un taint no ignorada con efecto PreferNoSchedule, entonces el sistema intentará no programar pods en el nodo. <br /> si hay al menos un taint no ignorada con efecto NoEjecutar, los pods serán expulsados del nodo (si ya se está ejecutando en el nodo) y no se programarán en el nodo (si aún no se está ejecutando en el nodo).',
  // Running Status > Resource Usage
  RESOURCE_USAGE: 'Resource Usage',
  MAXIMUM_PODS: 'Maximum Pods',
  MAXIMUM_PODS_SCAP: 'Maximum Pods',
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
  NODE_NETWORKUNAVAILABLE_DESC: 'Compruebe si la configuración de red en el nodo está disponible',
  NODE_MEMORYPRESSURE: 'Carga de memoria',
  NODE_MEMORYPRESSURE_DESC: 'Si la carga de uso de memoria en el nodo es demasiado alta, la programación falla',
  NODE_DISKPRESSURE: 'Carga de disco',
  NODE_DISKPRESSURE_DESC: 'Si existe carga sobre el tamaño del disco, es decir, si la capacidad del disco es baja',
  NODE_PIDPRESSURE: 'Carga PID',
  NODE_PIDPRESSURE_DESC: 'Si existe carga sobre los procesos, es decir, si hay demasiados procesos en el nodo',
  NODE_READY: 'Listo',
  NODE_READY_DESC: 'Si el nodo está sano y listo para aceptar pods',
  // Running Status > Taints
  NO_TAINTS_TIPS: 'Aún no se han establecido taints.',
  POLICY: 'Policy',
  // Pods
  READY_VALUE: 'Ready: {readyCount}/{total}',
  STATUS_VALUE: 'Status: {value}',
  CREATED_AGO: 'Creado {diff}'
};