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
  CLUSTER_NAME_EMPTY: 'Please enter a cluster name.',
  ADD_CLUSTER: 'Add Cluster',
  TAG: 'Tag',
  CLUSTER_TAG_DESC: 'Select a tag to identify the purpose of the cluster.',
  CLUSTER_PROVIDER_DESC: 'Select the provider of the cluster infrastructure.',
  // Add Cluster > Connection Settings
  CONNECTION_SETTINGS: 'Connection Settings',
  CONNECTION_MODE: 'Connection Mode',
  CLUSTER_CONNECT_MODE_DESC: 'Directly connect to the cluster or use an agent.',
  CONNTECT_DIRECT: 'Direct connection',
  CONNTECT_PROXY: 'Agent connection',
  INPUT_KUBECONFIG: 'Member Cluster kubeconfig',
  CLUSTER_DIRECT_IMPORT_TIP: 'The multi-cluster control plane of KubeSphere connects to the member cluster through the kubeconfig provided. For this method, the host cluster must be able to directly access the member cluster through the server address in the kubeconfig.</br></br>This method generally applies to the scenarios like the following:</br>1. The host cluster and the member cluster are in the same internal network.</br>2. The network of both the host cluster and the member cluster is connected through VPN or other technologies (e.g. Tunneling).</br>3. The server address in the kubeconfig can be accessed through public network.',
  CLUSTER_AGENT_IMPORT_TIP: 'The KubeSphere control plane connects to the member cluster through a proxy. The control plane runs a public proxy service, which is connected to a client component created by the member cluster. Thus, a reserve proxy is created. For this method, the control plane and the member cluster do not need to be in the same network. The apiserver address of the member cluster does not need to be exposed. However, network performance may be affected.</br></br>This method generally applies to the scenarios like the following:</br>1. The host cluster and the member cluster are not in the same network.<br/>2. The network of both the host cluster and the member cluster cannot be connected through VPN or other technologies (e.g. Tunneling).<br/>3. Network performance deficiencies within clusters can be accepted.',
  CLUSTER_AGENT_TITLE: 'Please add the member cluster based on the agent provided in the cluster.',
  CLUSTER_AGENT_DESC: 'A corresponding agent needs to be set in the cluster.',
  HOW_TO_GET_KUBECONFIG: 'How do I obtain kubeconfig?',
  // List
  HOST_CLUSTER_TCAP: 'Host Cluster',
  HOST_CLUSTER_PL_TCAP: 'Host Clusters',
  MEMBER_CLUSTER_TCAP_PL: 'Member Clusters',
  CLUSTER_CONDITION_INITIALIZED: 'Initialized',
  CLUSTER_CONDITION_AGENTAVAILABLE: 'Agent Available',
  CLUSTER_CONDITION_FEDERATED: 'Federated',
  CLUSTER_CONDITION_EXTERNALACCESSREADY: 'External Access Ready',
  CLUSTER_CONDITION_READY: 'Cluster Ready',
  CLUSTER_CONDITION_OPENPITRIXRUNTIMEREADY: 'App Store Ready',
  CLUSTER_CONDITION_KUBECONFIGCERTEXPIRESINSEVENDAYS: 'kubeconfig About to Expire',
  NODE_COUNT: 'Nodes',
  ENV_PRODUCTION: 'Production',
  ENV_DEVELOPMENT: 'Development',
  ENV_TESTING: 'Testing',
  ENV_DEMO: 'Demo',
  UPDATE_KUBECONFIG: 'Update kubeconfig',
  KUBE_CONFIG_IS_EXPIRED: 'KubeConfig has expired',
  EXPIRE_DATE: 'Expiration Time',
  LAST_KUBE_CONFIG_EXPIRED: 'KubeConfig expires in <span class="kubeConfig_expired">{count}</span> days',
  VALIDATION_FAILED: 'Validation failed.',
  NO_CLUSTER_TIP_DESC: 'A cluster is a group of nodes (physical or virtual machines) running KubeSphere.',
  // List > Remove Cluster
  RISK_WARNING: 'Risk Warning',
  REMOVE_CLUSTER_TIP_A: 'After the cluster is removed, resources in the cluster will not be cleared automatically.',
  REMOVE_CLUSTER_TIP_B: 'After the cluster is removed, multi-cluster configuration data will not be cleared automatically. Uninstalling KubeSphere or deleting related resources may cause user data loss. You must manually clear the multi-cluster configuration data in the removed cluster by refering to the <a href="https://kubesphere.io/docs/">official KubeSphere documentation</a>.',
  CLUSTER_CONFIRM_TEXT: 'I understand the risks of removing the cluster',
  ENTER_CLUSTER_NAME: 'This operation cannot be undone. Enter the cluster name <strong>{name}</strong> to confirm that you understand the risks of this operation.'
}
