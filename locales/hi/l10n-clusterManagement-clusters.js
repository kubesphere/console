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
  NO_CLUSTER_TIP: 'Please add at least one cluster.',
  // Add Cluster > Basic Information
  IMPORT_CLUSTER_DESC: 'Import an existing Kubernetes cluster.',
  ADD_CLUSTER: 'Add Cluster',
  TAG: 'Tag',
  CLUSTER_TAG_DESC: 'Select a tag to identify the purpose of the cluster.',
  CLUSTER_PROVIDER_DESC: 'Select the provider of the cluster infrastructure.',
  // Add Cluster > Cluster Settings
  CLUSTER_SETTINGS_DESC: 'Define cluster configuration information',
  CLUSTER_CONNECT_METHOD_DESC: 'Directly connect to the cluster or use an agent.',
  CONNTECT_DIRECT: 'Direct connection',
  CONNTECT_PROXY: 'Agent connection',
  INPUT_KUBECONFIG: 'Please fill in the kubeconfig of the target cluster',
  CLUSTER_DIRECT_IMPORT_TIP: 'The multi-cluster control plane of KubeSphere connects to the member cluster through the kubeconfig provided. For this method, the host cluster must be able to directly access the member cluster through the server address in the kubeconfig.</br></br>This method generally applies to the scenarios like the following:</br>1. The host cluster and the member cluster are in the same internal network.</br>2. The network of both the host cluster and the member cluster is connected through VPN or other technologies (e.g. Tunneling).</br>3. The server address in the kubeconfig can be accessed through public network.',
  CLUSTER_AGENT_IMPORT_TIP: 'The KubeSphere control plane connects to the member cluster through a proxy. The control plane runs a public proxy service, which is connected to a client component created by the member cluster. Thus, a reserve proxy is created. For this method, the control plane and the member cluster do not need to be in the same network. The apiserver address of the member cluster does not need to be exposed. However, network performance may be affected.</br></br>This method generally applies to the scenarios like the following:</br>1. The host cluster and the member cluster are not in the same network.<br/>2. The network of both the host cluster and the member cluster cannot be connected through VPN or other technologies (e.g. Tunneling).<br/>3. Network performance deficiencies within clusters can be accepted.',
  CLUSTER_AGENT_TITLE: 'Please add the member cluster based on the agent provided in the cluster.',
  CLUSTER_AGENT_DESC: 'A corresponding agent needs to be set in the cluster.',
  HOW_TO_GET_KUBECONFIG: 'How do I get kubeconfig?',
  // List
  HOST_CLUSTER_TCAP: 'Host Cluster',
  HOST_CLUSTER_PL_TCAP: 'Host Clusters',
  NODE_COUNT: 'Nodes',
  ENV_PRODUCTION: 'Production',
  ENV_DEVELOPMENT: 'Development',
  ENV_TESTING: 'Testing',
  ENV_DEMO: 'Demo',
  UPDATE_KUBECONFIG: 'Update KubeConfig',
  KUBE_CONFIG_IS_EXPIRED: 'KubeConfig has expired',
  EXPIRE_DATE: 'Expiration Time',
  LAST_KUBE_CONFIG_EXPIRED: 'KubeConfig expires in <span class="kubeConfig_expired">{count}</span> days'
};