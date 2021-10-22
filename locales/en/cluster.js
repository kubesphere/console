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
  ADD_CLUSTER: 'Add Cluster',
  'Add New Cluster': 'Add New Cluster',
  ALL_PROJECTS: 'All projects',
  'Authorize the cluster to workspace': 'Assign the Cluster to Workspaces',
  AUTHORIZED: 'Authorized',
  AVAILABLE_CLUSTERS: 'Available Clusters',
  'Choose a provider': 'Choose a provider',
  'Click to Copy': 'Click to Copy',
  CLUSTER_INFORMATION: 'Cluster Information',
  'Cluster initialization failed': 'Cluster initialization failed',
  'Cluster List': 'Cluster List',
  'Cluster Management': 'Cluster Management',
  'Cluster Member': 'Cluster Member',
  'Cluster Members': 'Cluster Members',
  CLUSTER_NAME: 'Cluster Name',
  'Cluster Roles': 'Cluster Roles',
  CLUSTER_SETTINGS: 'Cluster Settings',
  CLUSTER_VISIBILITY_SCAP: 'Cluster visibility',
  CLUSTER_VISIBILITY_TCAP: 'Cluster Visibility',
  'Connection Method': 'Connection Method',
  'Copy successfully': 'Copy successfully',
  'Custom Resources': 'CRDs',
  EDIT_CLUSTER_INFO_DESC: 'Edit basic information of the cluster.',
  EDIT_VISIBILITY: 'Edit Visibility',
  'Enter the project': 'Enter the project',
  'Go back': 'Go back',
  'Host Cluster': 'Host Cluster',
  HOST_CLUSTER: 'Host cluster',
  'Host Clusters': 'Host Clusters',
  Import: 'Import',
  'Import Kubernetes Cluster': 'Import Kubernetes Cluster',
  'Invite members to the cluster': 'Invite members to the cluster',
  'Kubernetes Settings': 'Kubernetes Settings',
  KUBERNETES_STATUS: 'Kubernetes Status',
  KUBERNETES_VERSION: 'Kubernetes version',
  KUBESPHERE_VERSION: 'KubeSphere version',
  'Member Cluster': 'Member Cluster',
  'Member Clusters': 'Member Clusters',
  'Network Management': 'Network',
  'Network Policies': 'Network Policies',
  'Network Topology': 'Network Topology',
  'Node Types': 'Node Types',
  'Nodes Management': 'Nodes Management',
  'Not Ready': 'Not Ready',
  'Please input cluster name': 'Please enter a cluster name.',
  'Please input the kubesphere api server address of the cluster':
    'Please input the kubesphere api server address of the cluster',
  'Please select or input a provider': 'Please select or input a provider',
  'Please select or input a tag': 'Please select or input a tag',
  SCHEDULING_OPERATIONS: 'Scheduling operations',
  SCHEDULING_OPERATION: 'Scheduling operation',
  SCHEDULING_FAILURES: 'Scheduling failures',
  SCHEDULING_FAILURE: 'Scheduling failure',
  SELECT_CLUSTERS: 'Select Clusters',
  SET_PUBLIC_CLUSTER: 'Set as Public Cluster',
  STORAGE: 'Storage',
  SYSTEM_PROJECTS: 'System Projects',
  'The current cluster is public': 'The current cluster is public',
  Tools: 'Tools',
  Unauthorized: 'Unauthorized',
  UNBIND: 'Unbind',
  UNBIND_CLUSTER: 'Unbind Cluster',
  USER_PROJECTS: 'User Projects',
  Validating: 'Validating',
  'Validation failed': 'Validation failed',
  WAIT_FOR_CLUSTER: 'Waiting for the cluster to join...',
  'How to Add': 'How to Add',
  'New Cluster': 'New Cluster',
  'Import Cluster': 'Import Cluster',
  'Cluster Basic Info': 'Cluster Basic Information',
  'Node Settings': 'Node Settings',
  'Please add at least one cluster node':
    'Please add at least one cluster node',
  NODE_ROLE_EMPTY_DESC: 'Please set the role of the node in the cluster.',
  'Add node to the cluster': 'Add node to the cluster',
  INTERNAL_IP_ADDRESS: 'Internal IP Address',
  PORT: 'Port',
  PORT_VALUE: 'Port: {value}',
  EXTERNAL_IP: 'External IP Address',
  USERNAME_AND_PASSWORD: 'Username and password',
  SSH_KEY_TCAP: 'SSH Key',
  SSH_KEY_SCAP: 'SSH key',
  SSH_AUTH_MODE: 'SSH Authentication Mode',
  'Kubernetes Cluster Settings': 'Kubernetes Cluster Settings',
  'Network Plugin': 'Network Plugin',
  'Max Pods': 'Max Pods',
  'Pods CIDR': 'Pods CIDR',
  'Service CIDR': 'Service CIDR',
  'Default Storage Plugin': 'Default Storage Plugin',
  'Private Registry Configuration': 'Private Registry Configuration',
  'etcd Backup': 'etcd Backup',
  'etcd Backup Dir': 'etcd Backup Dir',
  'etcd Backup Period': 'etcd Backup Period',
  'Keep Backup Number': 'Keep Backup Number',
  'KubeSphere Settings': 'KubeSphere Settings',
  INVALID_IP_DESC: 'Invalid IP address format.',
  CLUSTER_BASIC_INFO: 'Basic Information',

  NO_CLUSTER_TIP: 'Please add at least one cluster.',
  NO_CLUSTER_TIP_DESC:
    'A cluster is a group of nodes (physical or virtual machines) running Kubernetes, and the function of Kubesphere also depends on the nodes in the cluster.',
  ADD_NEW_CLUSTER_DESC: 'Add a new Kubernetes cluster',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere provides a solution for quickly deploying Kubernetes clusters among mainstream service providers',

  VISIBILITY_PARTIAL: 'Visible to Some Workspaces',
  VISIBILITY_PUBLIC: 'Visible to All Workspaces',

  MULTI_CLUSTER: 'Multi-Clusters',

  IMPORT_CLUSTER_DESC: 'Import an existing Kubernetes cluster.',
  SELECT_CLUSTERS_DESC: 'Select clusters to be used in the workspace.',

  CLUSTER_SETTINGS_DESC: 'Define cluster configuration information',
  TAG: 'Tag',
  CLUSTER_TAG_DESC: 'Select a tag to identify the purpose of the cluster.',
  CLUSTER_PROVIDER_DESC: 'Select the provider of the cluster infrastructure.',
  CLUSTER_CONNECT_METHOD_DESC:
    'Directly connect to the cluster or use an agent.',

  CONNTECT_DIRECT: 'Direct connection',
  CONNTECT_PROXY: 'Agent connection',

  WAIT_FOR_CLUSTER_DESC:
    'The cluster is unavailable. Perform the following steps to add the cluster.',

  CLUSTER_AGENT_TIP_1:
    '1. Log in to the cluster over SSH and run the <span class="code">vi agent.yaml</span> command to create a configuration file.',
  CLUSTER_AGENT_TIP_2:
    '2. Copy the following information to the <span class="code">agent.yaml</span> file.',
  CLUSTER_AGENT_TIP_3:
    '3. Run the <span class="code">kubectl create -f agent.yaml</span> command to add the cluster.',
  CLUSTER_AGENT_TIP_3_DESC:
    'This operation may take a while. Please wait until the cluster status is updated.',

  CLUSTER_CONDITIONS: 'Cluster Conditions',
  CLUSTER_BASE_INFO_DESC:
    'Basic information provides an overview of the cluster. You can view and edit cluster information.',
  CLUSTER_INFO_TCAP: 'Cluster Information',

  INVITE_CLUSTER_MEMBER_DESC: 'You can invite new members to this cluster.',

  CLUSTER_API_SERVER_TITLE: 'Kubesphere API Server to be added to the cluster',
  CLUSTER_API_SERVER_DESC:
    'You need to input the KubeSphere API Server address to be added to the cluster',

  INPUT_KUBECONFIG: 'Please fill in the kubeconfig of the target cluster',

  CLUSTER_DIRECT_IMPORT_TIP:
    'The multi-cluster control plane of KubeSphere connects to the member cluster through the kubeconfig provided. For this method, the host cluster must be able to directly access the member cluster through the server address in the kubeconfig.</br></br>This method generally applies to the scenarios like the following:</br>1. The host cluster and the member cluster are in the same internal network.</br>2. The network of both the host cluster and the member cluster is connected through VPN or other technologies (e.g. Tunneling).</br>3. The server address in the kubeconfig can be accessed through public network.',
  CLUSTER_AGENT_IMPORT_TIP:
    'The KubeSphere control plane connects to the member cluster through a proxy. The control plane runs a public proxy service, which is connected to a client component created by the member cluster. Thus, a reserve proxy is created. For this method, the control plane and the member cluster do not need to be in the same network. The apiserver address of the member cluster does not need to be exposed. However, network performance may be affected.</br></br>This method generally applies to the scenarios like the following:</br>1. The host cluster and the member cluster are not in the same network.<br/>2. The network of both the host cluster and the member cluster cannot be connected through VPN or other technologies (e.g. Tunneling).<br/>3. Network performance deficiencies within clusters can be accepted.',
  CLUSTER_AGENT_TITLE:
    'Please add the member cluster based on the agent provided in the cluster.',
  CLUSTER_AGENT_DESC: 'A corresponding agent needs to be set in the cluster.',

  HOW_TO_GET_KUBECONFIG: 'How do I get kubeconfig?',

  UNBIND_CLUSTER_DESC:
    'After the cluster is unbound, KubeSphere will not be able to manage the cluster. The Kubernetes resources on the cluster will not be deleted.',
  SURE_TO_UNBIND_CLUSTER: 'I understand the risks of this operation.',

  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC:
    'Clusters can be assigned to workspaces through authorization.',

  PUBLIC_CLUSTER_DESC:
    'A public cluster means all platform users can access the cluster, in which they are able to create and schedule resources.',

  CLUSTER_AUTHORIZATION_DESC:
    'The cluster can be assigned to workspaces through authorization.',

  CLUSTER_VISIBILITY_Q1: 'How do I authorize a cluster to specific workspaces?',
  CLUSTER_VISIBILITY_A1:
    'You can assign a cluster to specific workspaces by clicking Edit Visibility.',
  CLUSTER_VISIBILITY_Q2: 'What are public clusters?',
  CLUSTER_VISIBILITY_A2:
    'Public clusters can be accessed by all platform users. Users can create and schedule resources on public clusters.',

  SELECT_HOST_CLUSTER_WARNING:
    'The current system is a multi-cluster system. Please avoid creating resources in the host cluster if possible. Excessive loads in the host cluster will decrease the stability of the multi-cluster system.',
  HOST_CLUSTER_VISIBILITY_WARNING:
    'The stability of the multi-cluster system will decrease if the host cluster is overloaded. Exercise caution when assigning the host cluster to workspaces.',
  CLUSTER_VISIBILITY_REMOVE_WARNING:
    'After the authorization for a workspace to use the cluster is removed, all resources of the workspace on the cluster will be deleted.',

  REMOVE_WORKSPACE_CONFIRM_TITLE: 'Remove Authorization',
  REMOVE_WORKSPACE_CONFIRM_DESC:
    'Enter the name of the workspace(s) <strong>{resource}</strong> to confirm that you understand the risks of this operation.',

  SELECT_ADD_CLUSTER_METHOD: 'Choose how to add a cluster',
  SELECT_ADD_CLUSTER_METHOD_DESC:
    'Support for adding new clusters and importing existing clusters.',

  NEW_CLUSTER_DESC: 'add a new Kubernetes cluster',
  CLUSTER_NODE_SETTINGS_DESC: 'add the nodes for the cluster',
  NODE_INTERNAL_IP_DESC:
    'Set the internal IP address of the node in the KubeSphere cluster.',
  EDGENODE_INTERNAL_IP_DESC:
    'Set the internal IP address of the edge node in the KubeSphere cluster.',
  NODE_INTERNAL_IP_EMPTY_DESC:
    'Please set the internal IP address of the node in the KubeSphere cluster.',
  EDGENODE_INTERNAL_IP_EMPTY_DESC:
    'Please set the internal IP address of the edge node in the KubeSphere cluster.',
  NODE_ROLE_DESC: 'Set the role of the node in the cluster.',
  NODE_EXTERNAL_IP_DESC:
    'Enter the node IP address and port number used for SSH login.',
  NODE_EXTERNAL_IP_EMPTY_DESC:
    'Please enter the node IP address and port number used for SSH login.',
  SSH_AUTH_MODE_DESC: 'Select an SSH authentication mode.',
  NODE_USERNAME_DESC: 'Enter the username used for SSH login.',
  NODE_PASSWORD_DESC: 'Enter the password used for SSH login.',

  K8S_CLUSTER_SETTINGS_DESC: 'Initially configure the new Kubernetes cluster.',

  CLUSTER_MAX_PODS_DESC:
    'maxPods is the number of pods that can run on this Kubelet. [Default: 110].',

  K8S_NETWORK_PLUGIN_CALICO:
    'Calico is a pure 3-layer network solution that seamlessly integrates the IaaS cloud architecture and can provide IP communication between VMs, containers, and bare metal.',
  K8S_NETWORK_PLUGIN_FLANNEL:
    'Flannel allows Docker containers created by different node hosts in the cluster to have a unique virtual IP address in the entire cluster',
  K8S_NETWORK_PLUGIN_CILIUM:
    'eBPF-based Networking, Security, and Observability.',

  KUBE_PODS_CIDR_DESC:
    "The Pod running on the node allocates IP addresses from the node's Pod CIDR range.F",
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
  CLUSTER_ETCD_BACKUP_DIR_DESC:
    'The location to store etcd backups files on etcd host machines.',
  CLUSTER_ETCD_BACKUP_PERIOD_DESC:
    'Period of running backup etcd job, the unit is minutes.',
  CLUSTER_ETCD_BACKUP_NUMBER_DESC: 'How many backup replicas to keep.',
  CLUSTER_KUBESPHERE_SETTINGS_DESC: 'Customized settings for KubeSphere',
  CREATING_CLUSTER: 'Creating the cluster...',
  CREATING_CLUSTER_DESC:
    'The cluster is being created and is currently unavailable.',
  COPY_SUCCESSFUL: 'Copied successfully.',
  CLUSTER_INIT_FAILED: 'Cluster initialization failed.',
  CLUSTER_CREATION_PROGRESS: 'Cluster Creation Progress',
  INIT_NODES: 'Initialize nodes',
  PULL_IMAGES: 'Pull images',
  INIT_ETCD_CLUSTER: 'Initialize the etcd cluster',
  INIT_CONTROL_PLANE: 'Initialize the control plane',
  JOIN_NODES: 'Add nodes',
  INSTALL_ADDONS: 'Install plugins',
  FETCHING_LOGS: `Fetching logs...`,
  CURRENT_STEP: 'Current step: {step}',

  MASTER_NODE_COUNT_TIP: 'The number of Master nodes needs to be 1 or 3',
  WORKER_NODE_COUNT_TIP: 'The number of Worker nodes is at least 1',

  CLUSTER_CREATION_PROGRESS_TIP:
    'Depending on the cluster size and infrastructure environment, cluster creation may take 30 to 60 minutes.',

  CLUSTER_UPGRADE_REQUIRED:
    'The current KubeSphere version does not support this function. Please upgrade KubeSphere to {version} or later.',
  MEMBER_CLUSTER_UPGRADE_TIP:
    'Member clusters with versions earlier than {version} do not support this function. Please upgrade the member clusters to {version} or later.',

  // Unbind Cluster
  UNBIND_CLUSTER_Q: 'Unbind Cluster',

  // Cluster Visibility
  NODE: 'Node',
  ADMINISTRATOR: 'Administrator',
  CLUSTER_VISIBILITY: 'Cluster Visibility',
  CLUSTER_VISIBILITY_DESC:
    'Cluster visibility controls the cluster authorization to workspaces. After a cluster is authorized to workspaces, you can view and manage the cluster resources in the workspaces.',
  EDIT_VISIBILITY_DESC: 'Edit the cluster visibility in workspaces.',
  UNAUTHORIZED: 'Unauthorized',
  AUDITING: 'Auditing',
  REMOVE_WORKSPACE_CONFIRM_SI:
    'Enter the workspace name <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  REMOVE_WORKSPACE_CONFIRM_PL:
    'Enter the workspace names <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
}
