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
  HOST_CLUSTER: 'Host Kümesi',
  MEMBER_CLUSTER: 'Üye kümesi',
  // Baisc Information
  PROVIDER: 'Sağlayıcı',
  KUBERNETES_VERSION: 'Kubernetes Sürümü',
  KUBESPHERE_VERSION: 'KubeSphere sürümü',
  VISIBILITY_PARTIAL: 'Bazı çalışma alanlarında görünür',
  VISIBILITY_PUBLIC: 'Tüm çalışma alanlarında görünür',
  CLUSTER_BASE_INFO_DESC: 'Temel bilgiler, kümeye genel bir bakış sağlar. Küme bilgilerini görüntüleyebilir ve düzenleyebilirsiniz.',
  // System Components
  // Resource Usage
  MEMORY: 'Bellek',
  TOTAL: 'Toplam',
  USED: 'Kullanılan',
  // Tools
  TOOLS: 'Tools',
  KUBECTL_DESC: 'Geçerli kümeyi kontrol etmek için kullanılan komut satırı aracı.',
  KUBECONFIG_DESC: 'Geçerli kümeyle ilgili erişim bilgilerini yapılandırmak için kullanılan dosya.',
  // Kubernetes Status
  KUBERNETES_STATUS: 'Kubernetes Durumu',
  API_REQUESTS_PER_SECOND: 'Saniye başına API istekleri',
  VALUE_REQUESTS_SECOND: '{value, plural, =1 {1 request} other {# requests}}/s',
  API_REQUEST_LATENCY: 'API isteği gecikmesi',
  SCHEDULING_OPERATIONS: 'Zamanlama işlemleri',
  SCHEDULING_OPERATION: 'Zamanlama işlemleri',
  SCHEDULING_FAILURES: 'Zamanlama hataları',
  SCHEDULING_FAILURE: 'Zamanlama hataları',
  // Nodes
  VIEW_MORE: 'Daha Fazla Görüntüle',
  NODE_CPU_UTILISATION: 'CPU kullanımı',
  NODE_LOAD1: 'Average CPU load (1 min)',
  NODE_MEMORY_UTILISATION: 'Hafıza kullanımı',
  NODE_DISK_SIZE_UTILISATION: 'Disk usage',
  NODE_DISK_INODE_UTILISATION: 'Inode usage',
  NODE_POD_UTILISATION: 'Kapsül kullanımı',
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