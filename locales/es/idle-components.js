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
  // Cluster Initializing
  WAIT_FOR_CLUSTER: 'Esperando a que el clúster se añada',
  WAIT_FOR_CLUSTER_DESC: 'Actualmente no hay nodos disponibles. Puedes agregar el siguiente archivo de configuración para habilitar el clúster.',
  CLUSTER_AGENT_TIP_1: '1. Cree un archivo llamado agent.yaml en el clúster de destino a través de SSH',
  CLUSTER_AGENT_TIP_2: '2. Copie el siguiente archivo de configuración en agent.yaml',
  CLUSTER_AGENT_TIP_3: '3. Ejecutar en la línea de comando <span class="code">kubectl create -f agent.yaml</span>',
  CLUSTER_AGENT_TIP_3_DESC: 'Después de ejecutar el comando, espere la actualización del estado del clúster.',
  CREATING_CLUSTER: 'Cluster is being created',
  CREATING_CLUSTER_DESC: 'The current cluster is being created, and there are no nodes available for the time being.',
  CLUSTER_INIT_FAILED: 'Cluster initialization failed.',
  CLUSTER_CREATION_PROGRESS: 'Cluster Creation Progress',
  FETCHING_LOGS: 'Fetching logs...',
  CURRENT_STEP: 'Current step: {step}',
  CLUSTER_CREATION_PROGRESS_TIP: 'According to the size of the created cluster and the difference in network connection, it takes about 30 to 60 minutes to create the entire cluster. ',
  // Create Cluster
  SELECT_ADD_CLUSTER_METHOD: 'Choose how to add a cluster',
  SELECT_ADD_CLUSTER_METHOD_DESC: 'Support for adding new clusters and importing existing clusters.',
  NEW_CLUSTER_DESC: 'add a new Kubernetes cluster',
  CLUSTER_NODE_SETTINGS_DESC: 'add the nodes for the cluster',
  K8S_CLUSTER_SETTINGS_DESC: 'Initially configure the new Kubernetes cluster.',
  CLUSTER_MAX_PODS_DESC: 'maxPods is the number of pods that can run on this Kubelet. [Default: 110].',
  KUBE_PODS_CIDR_DESC: 'The Pod running on the node allocates IP addresses from the node\'s Pod CIDR range.F',
  KUBE_SERVICE_CIDR_DESC: 'IP address range assigned to the service.',
  CLUSTER_COMPONENTS_DESC: 'Customize the service components of the cluster.',
  CLUSTER_ADVANCED_SETTINGS_DESC: 'You can configure the services you need according to your needs.',
  CLUSTER_PRIVATE_REGISTRY_DESC: 'Configure a private registry for the cluster. The cluster will use this registry to pull all the required mirrors.',
  CLUSTER_CONTROLPLANE_ENDPOINT: 'Cluster Access EndPoint',
  CLUSTER_CONTROLPLANE_ENDPOINT_DESC: 'Directly communicate with the cluster through the authorized cluster access address, and generate kubeconfig for the cluster to access the cluster.',
  CLUSTER_ETCD_BACKUP_DESC: 'Make regular backup settings for etcd',
  CLUSTER_ETCD_BACKUP_DIR_DESC: 'The location to store etcd backups files on etcd host machines.',
  CLUSTER_ETCD_BACKUP_PERIOD_DESC: 'Period of running backup etcd job, the unit is minutes.',
  CLUSTER_ETCD_BACKUP_NUMBER_DESC: 'How many backup replicas to keep.',
  CLUSTER_KUBESPHERE_SETTINGS_DESC: 'Customized settings for KubeSphere',
  MASTER_NODE_COUNT_TIP: 'The number of Master nodes needs to be 1 or 3',
  WORKER_NODE_COUNT_TIP: 'The number of Worker nodes is at least 1',
  // Add Node
  NODE_ROLE_EMPTY_DESC: 'Please specify the node\'s roles',
  EXTERNAL_IP: 'External IP Address',
  SSH_KEY_TCAP: 'SSH Key',
  SSH_KEY_SCAP: 'SSH key',
  SSH_AUTH_MODE: 'SSH Authentication Mode',
  NODE_INTERNAL_IP_DESC: 'The internal IP address for the connection between cluster nodes.',
  NODE_INTERNAL_IP_EMPTY_DESC: 'Please set the IP address of the node in the KubeSphere cluster.',
  NODE_ROLE_DESC: 'The number of master nodes needs to be 1 or 3, and the number of woker nodes must be at least 1.',
  NODE_EXTERNAL_IP_DESC: 'Enter the node IP address and port number used for SSH login.',
  NODE_EXTERNAL_IP_EMPTY_DESC: 'Please enter the node IP address and port number used for SSH login.',
  SSH_AUTH_MODE_DESC: 'Select an SSH authentication mode.',
  NODE_USERNAME_DESC: 'Set the username used for SSH login.',
  NODE_PASSWORD_DESC: 'Set the password used for SSH login.'
};