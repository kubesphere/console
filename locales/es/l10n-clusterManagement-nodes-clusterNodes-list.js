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
  // Banner
  CLUSTER_NODE_PL: 'Nodo de clúster',
  CLUSTER_NODE: 'Cluster Node',
  CLUSTER_NODE_DESC: 'Este módulo gestiona los nodos del clúster y muestra el estado de ejecución de ellos. Puedes editar o eliminar nodos aquí.',
  NODE_TYPES_Q: '¿Cuáles son los tipos de nodos de clúster?',
  NODE_TYPES_A: 'Nodes are classified into control plane nodes and worker nodes.',
  WHAT_IS_NODE_TAINTS_Q: '¿Qué son los taints de nodos?',
  WHAT_IS_NODE_TAINTS_A: 'Los taints permiten que un nodo repele un conjunto de pods. Las contaminaciones y las tolerancias funcionan juntas para garantizar que los pods no se programen en nodos inapropiados.',
  LEARN_MORE: 'Aprende más',
  // Node Count
  NODE_SI: 'Nodo',
  NODE_PL: 'Nodos',
  MASTER_NODE_SI: 'Control plane node',
  MASTER_NODE_PL: 'Control plane nodes',
  WORKER_NODE_SI: 'Nodo worker',
  WORKER_NODE_PL: 'Nodo worker',
  // List
  KUBE_OPERATE: 'Operar',
  KUBE_ASCENDING_ORDER: 'ASC...',
  KUBE_DESCENDING_ORDER: 'DESC...',
  KUBE_FILTER: 'Filtro',
  SEARCH: 'Introduce las condiciones para filtrar',
  ADD_NODE: 'Añadir nodo',
  NODE_STATUS_UNSCHEDULABLE: 'No programable',
  NODE_STATUS_RUNNING: 'Corriendo',
  NODE_STATUS_WARNING: 'Advertencia',
  NODE_STATUS_PENDING: 'Creating',
  NODE_STATUS_FAILED: 'Failed',
  CLUSTER_NODE_EMPTY_DESC: 'Este módulo gestiona los nodos del clúster y muestra el estado de ejecución de ellos. Puedes editar o eliminar nodos aquí.',
  NODE_NAME_EMPTY_DESC: 'Please set a name for the node.',
  CPU_USAGE: 'Uso de CPU',
  MEMORY_USAGE: 'Uso de memoria',
  CONTROL_PLANE: 'Control plane',
  WORKER: 'Worker',
  ALLOCATED_CPU: 'CPU reservada',
  ALLOCATED_MEMORY: 'Memoria reservada',
  CPU_LIMIT_SI: 'Límite de recursos: {core} core ({percent})',
  CPU_LIMIT_PL: 'Límite de recursos: {core} cores ({percent})',
  CPU_REQUEST_SI: '{core} core ({percent})',
  CPU_REQUEST_PL: '{core} cores ({percent})',
  CORE_PL: 'cores',
  CPU_CORE_PERCENT_SI: '{core} core ({percent})',
  CPU_CORE_PERCENT_PL: '{core} cores ({percent})',
  MEMORY_GIB_PERCENT: '{gib} GiB ({percent})',
  MEMORY_LIMIT_VALUE: 'Límite de recursos: {gib} GiB ({percent})',
  MEMORY_REQUEST_VALUE: '{gib} GiB ({percent})',
  RESOURCE_REQUEST: 'Solicitud de recursos',
  CORDON: 'Cordon',
  UNCORDON: 'Uncordon',
  OPEN_TERMINAL: 'Open Terminal',
  CUSTOM_COLUMNS: 'Columnas personalizadas',
  NO_MATCHING_RESULT_FOUND: 'Aún no se han encontrado recursos que coincidan con el filtro',
  STATUS: 'Estado',
  TOTAL_ITEMS: 'Total de {num} artículos',
  YOU_CAN_TRY_TO: 'You can try',
  REFRESH_DATA: 'refreshing data',
  CLEAR_SEARCH_CONDITIONS: 'clearing search conditions',
  // List > Edit Taints
  DUPLICATE_KEYS: 'Calves duplicadas',
  EMPTY_KEY: 'Claves vacías'
};