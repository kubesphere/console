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
  'Add Cluster': 'Add Cluster',
  'Add New Cluster': 'Add New Cluster',
  'All Projects': 'All Projects',
  'Authorize the cluster to workspace': 'Assign the Cluster to Workspaces',
  Authorized: 'Authorized',
  'Available Clusters': 'Available Clusters',
  'Choose a provider': 'Choose a provider',
  'Click to Copy': 'Click to Copy',
  'Cluster Info': 'Cluster Information',
  'Cluster initialization failed': 'Cluster initialization failed',
  'Cluster List': 'Cluster List',
  'Cluster Management': 'Cluster Management',
  'Cluster Member': 'Cluster Member',
  'Cluster Members': 'Cluster Members',
  'Cluster Name': 'Cluster Name',
  'Cluster Roles': 'Cluster Roles',
  'Cluster Settings': 'Cluster Settings',
  'Cluster Visibility': 'Cluster Visibility',
  'Connection Method': 'Connection Method',
  'Copy successfully': 'Copy successfully',
  'Custom Resources': 'CRDs',
  'Edit cluster basic information': 'Edit cluster basic information',
  'Edit Cluster Info': 'Edit Cluster Information',
  'Edit Visibility': 'Edit Visibility',
  'Enter the project': 'Enter the project',
  'Go back': 'Go back',
  'Host Cluster': 'Host Cluster',
  'Host Clusters': 'Host Clusters',
  Import: 'Import',
  'Import Kubernetes Cluster': 'Import Kubernetes Cluster',
  'Invite members to the cluster': 'Invite members to the cluster',
  'Kubernetes Settings': 'Kubernetes Settings',
  'Kubernetes Status': 'Kubernetes Status',
  'Kubernetes Version': 'Kubernetes Version',
  'KubeSphere Version': 'KubeSphere Version',
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
  'Scheduler Scheduling Times': 'Scheduler Scheduling Times',
  'Scheduling Failed Pods': 'Scheduling Failed Pods',
  'Select Clusters': 'Select Clusters',
  'Set as public cluster': 'Set as a public cluster',
  Snapshots: 'Snapshots',
  'Storage Management': 'Storage',
  'System Projects': 'System Projects',
  'The current cluster is public': 'The current cluster is public',
  Tools: 'Tools',
  Unauthorized: 'Unauthorized',
  Unbind: 'Unbind',
  'Unbind Cluster': 'Unbind Cluster',
  'User Projects': 'User Projects',
  Validating: 'Validating',
  'Validation failed': 'Validation failed',
  'Waiting for the cluster to join': 'Waiting for the cluster to join',
  'How to Add': 'How to Add',
  'New Cluster': 'New Cluster',
  'Import Cluster': 'Import Cluster',
  'Cluster Basic Info': 'Cluster Basic Information',
  'Node Settings': 'Node Settings',
  'Please add at least one cluster node':
    'Please add at least one cluster node',
  "Please specify the node's roles": "Please specify the node's roles",
  'Please input the IP address': 'Please input the IP address',
  'Add node to the cluster': 'Add node to the cluster',
  'Node Internal IP Address': 'Node Internal IP Address',
  'SSH Port': 'SSH Port',
  'SSH IP Address': 'SSH IP Address',
  'Username & Password': 'Username & Password',
  'SSH Secret': 'SSH Secret',
  'SSH Authentication Mode': 'SSH Authentication Mode',
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
  'Invalid IP address': 'Invalid IP address',

  NO_CLUSTER_TIP: 'Please add at least one cluster.',
  NO_CLUSTER_TIP_DESC:
    'A cluster is a group of nodes (physical or virtual machines) running Kubernetes, and the function of Kubesphere also depends on the nodes in the cluster.',
  ADD_NEW_CLUSTER_DESC: 'Add a new Kubernetes cluster',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere provides a solution for quickly deploying Kubernetes clusters among mainstream service providers',

  VISIBILITY_PART: 'Partially Visible',
  VISIBILITY_PUBLIC: 'Public',

  MULTI_CLUSTER: 'Multi-Clusters',

  IMPORT_CLUSTER_DESC: 'Import an existing Kubernetes cluster.',
  SELECT_CLUSTERS_DESC: 'Select the cluster available in the workspace.',

  CLUSTER_SETTINGS_DESC: 'Define cluster configuration information',
  CLUSTER_TAG: 'Tag',
  CLUSTER_TAG_DESC:
    'Indicate what the cluster is used for, such as a production environment, testing environment or demo environment.',
  CLUSTER_PROVIDER_DESC: 'The cluster infrastructure provider.',
  CLUSTER_CONNECT_METHOD_DESC:
    'Directly connect to the cluster or use an agent.',

  CONNTECT_DIRECT: 'Direct connection',
  CONNTECT_PROXY: 'Agent connection',

  CLUSTER_WAITING_JOIN_DESC:
    'There are currently no nodes available. The cluster is unusable. You can add the following configuration file to import the cluster.',

  CLUSTER_AGENT_TIP_1:
    'Please create a file named agent.yaml in the target cluster via SSH',
  CLUSTER_AGENT_TIP_1_DESC:
    'For example <span class="code">vi agent.yaml</span>.',
  CLUSTER_AGENT_TIP_2: 'Copy the following configuration file to agent.yaml',
  CLUSTER_AGENT_TIP_2_DESC:
    'The agent file can connect the target cluster to the platform.',
  CLUSTER_AGENT_TIP_3:
    'Execute in command line <span class="code">kubectl create -f agent.yaml</span>',
  CLUSTER_AGENT_TIP_3_DESC:
    'After you execute the command, wait for the update of the cluster status.',

  CLUSTER_CONDITIONS: 'Cluster Conditions',
  CLUSTER_BASE_INFO_DESC:
    'This module summarizes the basic information of the current cluster.',

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
    'After the cluster is unbound, KubeSphere will be unable to manage the cluster and Kubernetes resources within the cluster will not be deleted.',
  SURE_TO_UNBIND_CLUSTER: 'I confirm I want to unbind the cluster.',

  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC:
    'Clusters can be assigned to workspaces through authorization.',

  PUBLIC_CLUSTER_DESC:
    'A public cluster means all platform users can access the cluster, in which they are able to create and schedule resources.',

  CLUSTER_AUTHORIZATION_DESC:
    'The cluster can be assigned to workspaces through authorization.',

  CLUSTER_VISIBILITY_Q1: 'How do I assign the cluster to specific workspaces?',
  CLUSTER_VISIBILITY_A1:
    'You can assign the cluster to different workspaces by clicking Edit Visibility.',
  CLUSTER_VISIBILITY_Q2: 'What is a public cluster?',
  CLUSTER_VISIBILITY_A2:
    'A public cluster means all platform users can access the cluster, in which they are able to create and schedule resources.',

  SELECT_HOST_CLUSTER_WARNING:
    'Please try not to create resources on the host cluster to avoid excessive loads, which can lead to a decrease in the stability across clusters.',
  HOST_CLUSTER_VISIBILITY_WARNING:
    'Please be careful to assign the host cluster to workspaces. If the load of the host cluster is too high, the stability across clusters will decrease.',
  CLUSTER_VISIBILITY_REMOVE_WARNING:
    'Once the authorization for the workspace to use the cluster is removed, all resources of the workspace in the current cluster will be deleted.',

  REMOVE_WORKSPACE_CONFIRM_TITLE: 'Are you sure to remove authorization?',
  REMOVE_WORKSPACE_CONFIRM_DESC:
    'Are you sure to remove the authorization to the workspace(s) {resource}? Once the authorization for the workspace to use the cluster is removed, all resources of the workspace in the current cluster will be deleted.',

  SELECT_ADD_CLUSTER_METHOD: 'Choose how to add a cluster',
  SELECT_ADD_CLUSTER_METHOD_DESC:
    'Support for adding new clusters and importing existing clusters.',

  NEW_CLUSTER_DESC: 'add a new Kubernetes cluster',
  CLUSTER_NODE_SETTINGS_DESC: 'add the nodes for the cluster',
  CLUSTER_NODE_INTERNAL_IP_DESC:
    'The internal IP address for the connection between cluster nodes.',
  NODE_ROLE_DESC:
    'The number of master nodes needs to be 1 or 3, and the number of woker nodes must be at least 1.',
  SSH_IP_ADDRESS_DESC:
    'Please fill in the IP address that the current Host cluster can access.',
  SSH_AUTH_MODE_DESC: 'Support username password and SSH key',
  SSH_ACCOUNT_DESC: 'Log in as root user by default',
  SSH_PASSWORD_DESC: 'Password required to log in to the node',
  SSH_SECRET_PLACEHOLDER: 'Paste the key here',

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

  CLUSTER_CREATING: 'Cluster is being created',
  CLUSTER_CREATING_TIP:
    'The current cluster is being created, and there are no nodes available for the time being.',

  CLUSTER_INIT_NODES: 'Init Nodes',
  CLUSTER_PULL_IMAGES: 'Pull Images',
  CLUSTER_INIT_ETCD_CLUSTER: 'Init etcd Cluster',
  CLUSTER_INIT_CONTROL_PLANE: 'Init Control Plane',
  CLUSTER_JOIN_NODES: 'Join Nodes',
  CLUSTER_INSTALL_ADDONS: 'Install Addons',
  FETCHING_LOGS: `Fetching logs...`,

  MASTER_NODE_COUNT_TIP: 'The number of Master nodes needs to be 1 or 3',
  WORKER_NODE_COUNT_TIP: 'The number of Worker nodes is at least 1',

  CLUSTER_CREATION_PROGRESS_TIP:
    'It takes about 30 to 60 minutes to create the entire cluster depending on the cluster size and network.',

  CLUSTER_UPGRADE_REQUIRED:
    'This function is not available in the current cluster version. Please upgrade to {version} or above.',
  MEMBER_CLUSTER_UPGRADE_TIP:
    'Member Clusters of version lower than {version} cannot use this function. Please upgrade the Member Cluster to {version} or above.',
}
