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
  CLUSTER_NODE_PL: 'Cluster Nodes',
  CLUSTER_NODE: 'Cluster Node',
  CLUSTER_NODE_DESC: 'Cluster Nodes sind Basisserver des KubeSphere-Clusters. Auf dieser Seite können Sie Cluster Nodes verwalten.',
  NODE_TYPES_Q: 'Was sind die Arten von Cluster Nodes?',
  NODE_TYPES_A: 'Nodes werden in Steuer Nodes und Arbeiter Nodes eingeteilt.',
  WHAT_IS_NODE_TAINTS_Q: 'What are node taints?',
  WHAT_IS_NODE_TAINTS_A: 'Taints allow a node to repel certain pods. Taints and tolerations work together to ensure that pods are not scheduled onto inappropriate nodes.',
  LEARN_MORE: 'Mehr erfahren',
  // Node Count
  NODE_SI: 'Node',
  NODE_PL: 'Nodes',
  MASTER_NODE_SI: 'Control plane node',
  MASTER_NODE_PL: 'Control plane nodes',
  WORKER_NODE_SI: 'Worker node',
  WORKER_NODE_PL: 'Worker nodes',
  // List
  KUBE_OPERATE: 'Sortieren',
  KUBE_ASCENDING_ORDER: 'Aufsteigend',
  KUBE_DESCENDING_ORDER: 'Absteigend',
  KUBE_FILTER: 'Filter',
  SEARCH: 'Suchen',
  ADD_NODE: 'Node hinzufügen',
  NODE_STATUS_UNSCHEDULABLE: 'Unplanbar',
  NODE_STATUS_RUNNING: 'Laufend',
  NODE_STATUS_WARNING: 'Warnung',
  NODE_STATUS_PENDING: 'Wird erstellt',
  NODE_STATUS_FAILED: 'Fehlgeschlagen',
  CLUSTER_NODE_EMPTY_DESC: 'Please add a node to the cluster.',
  NODE_NAME_EMPTY_DESC: 'Please set a name for the node.',
  CPU_USAGE: 'CPU Usage',
  MEMORY_USAGE: 'Memory Usage',
  CONTROL_PLANE: 'Control plane',
  WORKER: 'Arbeiter',
  ALLOCATED_CPU: 'Allocated CPU',
  ALLOCATED_MEMORY: 'Allocated Memory',
  CPU_LIMIT_SI: 'Resource limit: {core} core ({percent})',
  CPU_LIMIT_PL: 'Resource limit: {core} cores ({percent})',
  CPU_REQUEST_SI: '{core} Kern ({percent})',
  CPU_REQUEST_PL: '{core} Kerne ({percent})',
  CORE_PL: 'cores',
  CPU_CORE_PERCENT_SI: '{core} Kern ({percent})',
  CPU_CORE_PERCENT_PL: '{core} Kerne ({percent})',
  MEMORY_GIB_PERCENT: '{gib} GiB ({percent})',
  MEMORY_LIMIT_VALUE: 'Resource limit: {gib} GiB ({percent})',
  MEMORY_REQUEST_VALUE: '{gib} GiB ({percent})',
  RESOURCE_REQUEST: 'Resource request',
  CORDON: 'Cordon',
  UNCORDON: 'Uncordon',
  OPEN_TERMINAL: 'Terminal öffnen',
  CUSTOM_COLUMNS: 'Spalten anpassen',
  NO_MATCHING_RESULT_FOUND: 'Kein passendes Ergebnis gefunden',
  STATUS: 'Status',
  TOTAL_ITEMS: 'Gesamt: {num}',
  YOU_CAN_TRY_TO: 'Sie können versuchen',
  REFRESH_DATA: 'aktualisiere Daten',
  CLEAR_SEARCH_CONDITIONS: 'Suchbedingungen löschen',
  // List > Edit Taints
  DUPLICATE_KEYS: 'Der Schlüssel existiert bereits. Bitte geben Sie einen anderen Schlüssel ein.',
  EMPTY_KEY: 'Bitte geben Sie einen Schlüssel ein.'
};