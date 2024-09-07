/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Cluster Initializing
  WAIT_FOR_CLUSTER: 'Waiting for the cluster to join...',
  WAIT_FOR_CLUSTER_DESC: 'The cluster is currently unavailable, please try again later.',
  CLUSTER_AGENT_TIP_1:
    '1. Log in to the cluster over SSH and run the <span class="code">vi agent.yaml</span> command to create a configuration file.',
  CLUSTER_AGENT_TIP_2:
    '2. Copy the following information to the <span class="code">agent.yaml</span> file.',
  CLUSTER_AGENT_TIP_3:
    '3. Run the <span class="code">kubectl create -f agent.yaml</span> command to add the cluster.',
  CLUSTER_AGENT_TIP_3_DESC:
    'This operation may take a while. Please wait until the cluster status is updated.',
  CREATING_CLUSTER: 'Creating the cluster...',
  CREATING_CLUSTER_DESC: 'The cluster is being created and is currently unavailable.',
  CLUSTER_INIT_FAILED: 'Cluster initialization failed.',
  CLUSTER_CREATION_PROGRESS: 'Cluster Creation Progress',
  FETCHING_LOGS: 'Fetching logs...',
  CURRENT_STEP: 'Current step: {step}',
  CLUSTER_CREATION_PROGRESS_TIP:
    'Depending on the cluster size and infrastructure environment, cluster creation may take 30 to 60 minutes.',
  // Create Cluster
  SELECT_ADD_CLUSTER_METHOD: 'Choose how to add a cluster',
  SELECT_ADD_CLUSTER_METHOD_DESC:
    'Support for adding new clusters and importing existing clusters.',
  NEW_CLUSTER_DESC: 'add a new Kubernetes cluster',
  CLUSTER_NODE_SETTINGS_DESC: 'add the nodes for the cluster',
  K8S_CLUSTER_SETTINGS_DESC: 'Initially configure the new Kubernetes cluster.',
  CLUSTER_MAX_PODS_DESC:
    'maxPods is the number of pods that can run on this Kubelet. [Default: 110].',
  KUBE_PODS_CIDR_DESC:
    "The pod running on the node allocates IP addresses from the node's pod CIDR range.",
  KUBE_SERVICE_CIDR_DESC: 'IP address range assigned to the service.',
  CLUSTER_COMPONENTS_DESC: 'Customize the service components of the cluster.',
  CLUSTER_ADVANCED_SETTINGS_DESC:
    'You can configure the services you need according to your needs.',
  CLUSTER_PRIVATE_REGISTRY_DESC:
    'Configure a private registry for the cluster. The cluster will use this registry to pull all the required mirrors.',
  CLUSTER_CONTROLPLANE_ENDPOINT: 'Cluster Access EndPoint',
  CLUSTER_CONTROLPLANE_ENDPOINT_DESC:
    'Directly communicate with the cluster through the authorized cluster access address, and generate kubeconfig for the cluster to access the cluster.',
  CLUSTER_ETCD_BACKUP_DESC: 'Make regular backup settings for etcd',
  CLUSTER_ETCD_BACKUP_DIR_DESC: 'The location to store etcd backups files on etcd host machines.',
  CLUSTER_ETCD_BACKUP_PERIOD_DESC: 'Period of running backup etcd job, the unit is minutes.',
  CLUSTER_ETCD_BACKUP_NUMBER_DESC: 'How many backup replicas to keep.',
  CLUSTER_KUBESPHERE_SETTINGS_DESC: 'Customized settings for KubeSphere',
  MASTER_NODE_COUNT_TIP: 'The number of Master nodes needs to be 1 or 3',
  WORKER_NODE_COUNT_TIP: 'The number of Worker nodes is at least 1',
  // Add Node
  NODE_ROLE_EMPTY_DESC: 'Please set the role of the node in the cluster.',
  EXTERNAL_IP: 'External IP Address',
  SSH_KEY_TCAP: 'SSH Key',
  SSH_KEY_SCAP: 'SSH key',
  SSH_AUTH_MODE: 'SSH Authentication Mode',
  NODE_INTERNAL_IP_DESC: 'Set the internal IP address of the node in the KubeSphere cluster.',
  NODE_INTERNAL_IP_EMPTY_DESC:
    'Please set the internal IP address of the node in the KubeSphere cluster.',
  NODE_ROLE_DESC: 'Set the role of the node in the cluster.',
  NODE_EXTERNAL_IP_DESC: 'Enter the node IP address and port number used for SSH login.',
  NODE_EXTERNAL_IP_EMPTY_DESC:
    'Please enter the node IP address and port number used for SSH login.',
  SSH_AUTH_MODE_DESC: 'Select an SSH authentication mode.',
  NODE_USERNAME_DESC: 'Enter the username used for SSH login.',
  NODE_PASSWORD_DESC: 'Enter the password used for SSH login.',
};
