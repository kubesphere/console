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

export default {
  'Add Cluster': 'Add Cluster',
  'Add New Cluster': 'Add New Cluster',
  'All Projects': 'All Projects',
  'Authorize the cluster to workspace': 'Authorize the cluster to workspace',
  Authorized: 'Authorized',
  'Available Clusters': 'Available Clusters',
  'Choose a provider': 'Choose a provider',
  'Click to Copy': 'Click to Copy',
  'Cluster Info': 'Cluster Info',
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
  CRDs: 'CRDs',
  'Edit cluster basic information': 'Edit cluster basic information',
  'Edit Cluster Info': 'Edit Cluster Info',
  'Edit Visibility': 'Edit Visibility',
  'Enter the project': 'Enter the project',
  'Go back': 'Go back',
  'Host Cluster': 'Host Cluster',
  'Host Clusters': 'Host Clusters',
  Import: 'Import',
  'Import Kubernetes Cluster': 'Import Kubernetes Cluster',
  'Invite members to the cluster': 'Invite members to the cluster',
  'IP Ranges': 'IP Ranges',
  'Kubernetes Settings': 'Kubernetes Settings',
  'Kubernetes Status': 'Kubernetes Status',
  'Kubernetes Version': 'Kubernetes Version',
  'Member Cluster': 'Member Cluster',
  'Member Clusters': 'Member Clusters',
  Network: 'Network',
  'Network Policies': 'Network Policies',
  'Network Topology': 'Network Topology',
  'Node Types': 'Node Types',
  Nodes: 'Nodes',
  'Not Ready': 'Not Ready',
  'Please input cluster name': 'Please input cluster name',
  'Please input the kubesphere api server address of the cluster':
    'Please input the kubesphere api server address of the cluster',
  'Please select or input a provider': 'Please select or input a provider',
  'Please select or input a tag': 'Please select or input a tag',
  'Scheduler Scheduling Times': 'Scheduler Scheduling Times',
  'Scheduling Failed Pods': 'Scheduling Failed Pods',
  'Select Clusters': 'Select Clusters',
  'Set as public cluster': 'Set as public cluster',
  Snapshots: 'Snapshots',
  Storage: 'Storage',
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

  NO_CLUSTER_TIP: 'Please add at least one cluster.',
  NO_CLUSTER_TIP_DESC:
    'A cluster is a group of nodes (physical or virtual machines) running Kubernetes, and the function of Kubesphere also depends on the nodes in the cluster.',
  ADD_NEW_CLUSTER_DESC: 'Add a new Kubernetes cluster',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere provides a solution for quickly deploying Kubernetes clusters among mainstream service providers',

  VISIBILITY_PART: 'Partially Visible',
  VISIBILITY_PUBLIC: 'Public',

  MULTI_CLUSTER: 'Multi-Clusters',

  IMPORT_CLUSTER_DESC: 'Import an existing Kubernetes cluster',
  SELECT_CLUSTERS_DESC: 'Select the cluster available in the workspace.',

  CLUSTER_SETTINGS_DESC: 'Define cluster configuration information',
  CLUSTER_TAG: 'Tag',
  CLUSTER_TAG_DESC:
    'To indicate what the cluster is used for, such as a production environment, testing environment or demo environment',
  CLUSTER_PROVIDER_DESC: 'The cluster infrastructure provider',
  CLUSTER_CONNECT_METHOD_DESC:
    'Directly connect to the cluster or use an agent',

  CONNTECT_DIRECT: 'Direct connection to Kubernetes cluster',
  CONNTECT_PROXY: 'Cluster connection agent',

  CLUSTER_WAITING_JOIN_DESC:
    'There are currently no nodes available. The cluster is unusable. You can add the following configuration file to enable the cluster.',

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
    'The multi-cluster control plane of KubeSphere connects to imported clusters through the kubeconfig provided. For this method, the current cluster must be able to directly access clusters that are to be imported through the server address in the kubeconfig.</br></br>This method generally applies to the conditions below:</br>1. The current cluster and clusters to be imported are in the same internal network.</br>2. The network of both the current cluster and clusters to be imported is connected through VPN or other technologies (e.g. Tunneling).</br>3. The server address in the kubeconfig can be accessed through public network.',
  CLUSTER_AGENT_IMPORT_TIP:
    'The KubeSphere control plane connects to clusters that are to be imported through a proxy. The control plane runs a public proxy service, which is connected to a client component created by clusters to be imported. Thus, a reserve proxy is created. For this method, the control plane and clusters to be imported do not need to be in the same network. The apiserver address of clusters to be imported does not need to be exposed either. However, network performance may be affected.</br></br>This method generally applies to the conditions below:</br>1. The current cluster and clusters to be imported are not in the same network.<br/>2. The network of both the current cluster and clusters to be imported cannot be connected through VPN or other technologies (e.g. Tunneling).<br/>3. Network performance deficiencies within clusters can be accepted.',
  CLUSTER_AGENT_TITLE:
    'Please add the cluster based on the Agent provided in the cluster.',
  CLUSTER_AGENT_DESC: 'A corresponding Agent needs to be set in the cluster.',

  HOW_TO_GET_KUBECONFIG: 'How to get kubeconfig?',

  UNBIND_CLUSTER_DESC:
    'After the cluster is unbound, KubeSphere will be unable to manage the cluster and Kubernetes resources within the cluster will not be deleted.',
  SURE_TO_UNBIND_CLUSTER: 'I confirm I want to unbind the cluster.',

  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC:
    'Clusters can be assigned to workspaces through authorization.',

  PUBLIC_CLUSTER_DESC:
    'A public cluster means all platform users can access the cluster, in which they are able to create and schedule resources.',

  CLUSTER_AUTHORIZATION_DESC:
    'Clusters can be assigned to workspaces through authorization.',

  CLUSTER_VISIBILITY_Q1: 'How to authorize clusters to specific workspaces?',
  CLUSTER_VISIBILITY_A1:
    'You can authorize the cluster to different workspaces by clicking Edit Visibility.',
  CLUSTER_VISIBILITY_Q2: 'What is a public cluster?',
  CLUSTER_VISIBILITY_A2:
    'A public cluster means all platform users can access the cluster, in which they are able to create and schedule resources.',

  SELECT_HOST_CLUSTER_WARNING:
    'Please try not to create resources on the host cluster to avoid excessive loads, which can lead to a decrease in the stability across clusters.',
  HOST_CLUSTER_VISIBILITY_WARNING:
    'Please be careful to authorize the host cluster to the workspace. If the load of the host cluster is too high, the stability across clusters will decrease.',
  CLUSTER_VISIBILITY_REMOVE_WARNING:
    'Once the authorization for the workspace to use the cluster is removed, all resources of the workspace in the current cluster will be deleted.',

  REMOVE_WORKSPACE_CONFIRM_TITLE: 'Are you sure to remove authorization?',
  REMOVE_WORKSPACE_CONFIRM_DESC:
    'Are you sure to remove the authorization to the workspace(s) {resource}? Once the authorization for the workspace to use the cluster is removed, all resources of the workspace in the current cluster will be deleted.',
}
