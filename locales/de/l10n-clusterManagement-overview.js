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
  HOST_CLUSTER: 'Host cluster',
  MEMBER_CLUSTER: 'Member cluster',
  // Baisc Information
  PROVIDER: 'Anbieter',
  KUBERNETES_VERSION: 'Kubernetes Version',
  KUBESPHERE_VERSION: 'KubeSphere Version',
  VISIBILITY_PARTIAL: 'Sichtbar für einige Arbeitsbereiche',
  VISIBILITY_PUBLIC: 'Für alle Arbeitsbereiche sichtbar',
  CLUSTER_BASE_INFO_DESC: 'Grundlegende Informationen bieten einen Überblick über den Cluster. Sie können Clusterinformationen ansehen und bearbeiten.',
  // System Components
  // Resource Usage
  MEMORY: 'Memory',
  TOTAL: 'Total',
  USED: 'Verwendet',
  // Tools
  TOOLS: 'Tools',
  KUBECTL_DESC: 'Befehlszeilentool zur Steuerung des aktuellen Clusters.',
  KUBECONFIG_DESC: 'Datei, die zum Konfigurieren der Zugriffsinformationen zum aktuellen Cluster verwendet wird.',
  // Kubernetes Status
  KUBERNETES_STATUS: 'Kubernetes Status',
  API_REQUESTS_PER_SECOND: 'API-Anfragen pro Sekunde',
  VALUE_REQUESTS_SECOND: '{value, plural, =1 {1 Anfrage} other {# Anfragen}}/s',
  API_REQUEST_LATENCY: 'API request latency',
  SCHEDULING_OPERATIONS: 'Scheduling operations',
  SCHEDULING_OPERATION: 'Scheduling operation',
  SCHEDULING_FAILURES: 'Scheduling failures',
  SCHEDULING_FAILURE: 'Scheduling failure',
  // Nodes
  VIEW_MORE: 'Mehr anzeigen',
  NODE_CPU_UTILISATION: 'CPU-Auslastung',
  NODE_LOAD1: 'Durchschnittliche CPU-Last (1 Min.)',
  NODE_MEMORY_UTILISATION: 'Speicherverbrauch',
  NODE_DISK_SIZE_UTILISATION: 'Speicherverbrauch',
  NODE_DISK_INODE_UTILISATION: 'Inode usage',
  NODE_POD_UTILISATION: 'Pod usage',
  // Cluster Initializing
  WAIT_FOR_CLUSTER: 'Warte auf den Beitritt des Clusters...',
  WAIT_FOR_CLUSTER_DESC: 'The cluster is unavailable. Perform the following steps to add the cluster.',
  CLUSTER_AGENT_TIP_1: '1. Log in to the cluster over SSH and run the <span class="code">vi agent.yaml</span> command to create a configuration file.',
  CLUSTER_AGENT_TIP_2: '2. Copy the following information to the <span class="code">agent.yaml</span> file.',
  CLUSTER_AGENT_TIP_3: '3. Run the <span class="code">kubectl create -f agent.yaml</span> command to add the cluster.',
  CLUSTER_AGENT_TIP_3_DESC: 'This operation may take a while. Please wait until the cluster status is updated.',
  CREATING_CLUSTER: 'Cluster wird erstellt...',
  CREATING_CLUSTER_DESC: 'Der Cluster wird erstellt und ist derzeit nicht verfügbar.',
  CLUSTER_INIT_FAILED: 'Cluster-Initialisierung fehlgeschlagen.',
  CLUSTER_CREATION_PROGRESS: 'Fortschritt der Cluster-Erstellung',
  FETCHING_LOGS: 'Fetching logs...',
  CURRENT_STEP: 'Aktueller Schritt: {step}',
  CLUSTER_CREATION_PROGRESS_TIP: 'Abhängig von der Clustergröße und der Infrastruktur kann die Erstellung von Clustern 30 bis 60 Minuten dauern.'
};