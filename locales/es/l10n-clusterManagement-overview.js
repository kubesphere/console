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
  HOST_CLUSTER: 'Clúster de host',
  MEMBER_CLUSTER: 'Member cluster',
  // Baisc Information
  PROVIDER: 'Proveedor',
  KUBERNETES_VERSION: 'Versión de Kubernetes',
  KUBESPHERE_VERSION: 'Versión de KubeSphere',
  VISIBILITY_PARTIAL: 'Parcialmente visible',
  VISIBILITY_PUBLIC: 'Público',
  CLUSTER_BASE_INFO_DESC: 'Basic information provides an overview of the cluster. You can view and edit cluster information.',
  // System Components
  // Resource Usage
  MEMORY: 'Memoria',
  TOTAL: 'Total',
  USED: 'En uso',
  // Tools
  TOOLS: 'Tools',
  KUBECTL_DESC: 'Herramienta de línea de comandos para controlar el clúster Kubernetes actual',
  KUBECONFIG_DESC: 'Puedes usar este archivo para configurar el acceso al clúster Kubernetes actual',
  // Kubernetes Status
  KUBERNETES_STATUS: 'Estado de Kubernetes',
  API_REQUESTS_PER_SECOND: 'API solicitudes por segundo',
  VALUE_REQUESTS_SECOND: '{value, plural, =1 {1 request} other {# requests}}/s',
  API_REQUEST_LATENCY: 'API latencia de solicitud',
  SCHEDULING_OPERATIONS: 'Horarios de programación',
  SCHEDULING_OPERATION: 'Scheduling operation',
  SCHEDULING_FAILURES: 'Programar pods fallidos',
  SCHEDULING_FAILURE: 'Scheduling failure',
  // Nodes
  VIEW_MORE: 'Ver más',
  NODE_CPU_UTILISATION: 'ratio de uso de CPU',
  NODE_LOAD1: 'Average CPU load (1 min)',
  NODE_MEMORY_UTILISATION: 'ratio de uso de memoria',
  NODE_DISK_SIZE_UTILISATION: 'Disk usage',
  NODE_DISK_INODE_UTILISATION: 'Inode usage',
  NODE_POD_UTILISATION: 'ratio de utilización de pod',
  // Cluster Initializing
  WAIT_FOR_CLUSTER: 'Waiting for the cluster to join...',
  WAIT_FOR_CLUSTER_DESC: 'The cluster is unavailable. Perform the following steps to add the cluster.',
  CLUSTER_AGENT_TIP_1: '1. Log in to the cluster over SSH and run the <span class="code">vi agent.yaml</span> command to create a configuration file.',
  CLUSTER_AGENT_TIP_2: '2. Copy the following information to the <span class="code">agent.yaml</span> file.',
  CLUSTER_AGENT_TIP_3: '3. Run the <span class="code">kubectl create -f agent.yaml</span> command to add the cluster.',
  CLUSTER_AGENT_TIP_3_DESC: 'This operation may take a while. Please wait until the cluster status is updated.',
  CREATING_CLUSTER: 'Creating the cluster...',
  CREATING_CLUSTER_DESC: 'The cluster is being created and is currently unavailable.',
  CLUSTER_INIT_FAILED: 'Cluster initialization failed.',
  CLUSTER_CREATION_PROGRESS: 'Cluster Creation Progress',
  FETCHING_LOGS: 'Fetching logs...',
  CURRENT_STEP: 'Current step: {step}',
  CLUSTER_CREATION_PROGRESS_TIP: 'Depending on the cluster size and infrastructure environment, cluster creation may take 30 to 60 minutes.'
};