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
  NO_CLUSTER_TIP: 'Please add at least 1 cluster',
  NO_CLUSTER_TIP_DESC:
    'A cluster is a group of nodes (physical or virtual machines) running Kubernetes, and the function of Kubesphere also depends on the nodes in the cluster.',
  ADD_NEW_CLUSTER_DESC: 'Add a new Kubernetes cluster',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere provides a solution for quickly deploying Kubernetes clusters among mainstream service providers',

  VISIBILITY_PART: 'Partially Visible',
  VISIBILITY_PUBLIC: 'Public',

  MULTI_CLUSTER: 'Multi-Clusters',

  IMPORT_CLUSTER_DESC: 'Import an existing Kubernetes cluster',

  CLUSTER_SETTINGS_DESC: 'Define cluster configuration information',
  CLUSTER_TAG: 'Tag',
  CLUSTER_TAG_DESC:
    'To indicate what the cluster is used for, such as a production environment, testing environment or demo environment',
  CLUSTER_PROVIDER_DESC: 'The cluster infrastructure provider',
  CLUSTER_CONNECT_METHOD_DESC: 'Directly connect to the cluster or use a agent',

  CONNTECT_DIRECT: 'Direct connection to Kubernetes cluster',
  CONNTECT_PROXY: 'Cluster connection agent',

  CLUSTER_WAITING_JOIN_DESC:
    'There are currently no nodes available, the cluster is unusable, you can add the following configuration file to enable the cluster',

  CLUSTER_AGENT_TIP_1:
    'Please create a file named agent.yaml in the target cluster via SSH',
  CLUSTER_AGENT_TIP_1_DESC:
    'For example <span class="code">vi agent.yaml</span>',
  CLUSTER_AGENT_TIP_2: 'Copy the following configuration file to agent.yaml',
  CLUSTER_AGENT_TIP_2_DESC:
    'The agent file can connect the target cluster to the platform',
  CLUSTER_AGENT_TIP_3:
    'Execute in command line  <span class="code">kubectl create -f agent.yaml</span>',
  CLUSTER_AGENT_TIP_3_DESC:
    'After executing the command, wait for the update of the cluster status',

  CLUSTER_CONDITIONS: 'Cluster Conditions',

  INVITE_CLUSTER_MEMBER_DESC: 'You can invite new members to this cluster',

  SELECT_CLUSTERS_DESC: 'Select the cluster available in the workspace',

  CLUSTER_API_SERVER_TITLE: 'Kubesphere API Server to be added to the cluster',
  CLUSTER_API_SERVER_DESC:
    'You need to input the KubeSphere API Server address to be added to the cluster',

  INPUT_KUBECONFIG: 'Please fill in the KubeConfig of the target cluster',

  CLUSTER_DIRECT_IMPORT_TIP:
    'The multi-cluster control interface of KubeSphere connects to imported clusters through the kubeconfig provided and the KubeSphere apiserver address exposed. For this method, the current cluster must be able to directly access clusters that are to be imported through the server address in the kubeconfig and the Kubesphere apiserver address.</br></br>This method generally applies to the conditions below:</br>1. The current cluster and clusters to be imported are in the same internal network.</br>2. The network of both the current cluster and clusters to be imported is connected through VPN or other technologies (e.g. Tunneling).</br>3. The server address in the kubeconfig and the Kubesphere apiserver address can be accessed through public network.',
  CLUSTER_AGENT_IMPORT_TIP:
    'The KubeSphere control interface connects to clusters that are to be imported through a proxy. The control interface runs a public proxy service, which is connected to a client component created by clusters to be imported. Thus, a reserve proxy is created. For this method, the control interface and clusters to be imported do not need to be in the same network. The apiserver address of clusters to be imported does not need to be exposed either. However, network performance may be affected.</br></br>This method generally applies to the conditions below:</br>1. The current cluster and clusters to be imported are not in the same network.<br/>2. The network of both the current cluster and clusters to be imported cannot be connected through VPN or other technologies (e.g. Tunneling).<br/>3. Network performance deficiencies within clusters can be accepted.',

  HOW_TO_GET_KUBECONFIG: 'How to get KubeConfig?',

  CLUSTER_BASE_INFO_DESC:
    'This module summarizes the basic information of the current cluster.',

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
  CLUSTER_VISIBILITY_A1: '',
  CLUSTER_VISIBILITY_Q2: 'What is a public cluster?',
  CLUSTER_VISIBILITY_A2:
    'A public cluster means all platform users can access the cluster, in which they are able to create and schedule resources.',
}
