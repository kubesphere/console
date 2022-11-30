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
  NO_CLUSTER_TIP: 'Agregue al menos un clúster.',
  // Add Cluster > Basic Information
  CLUSTER_NAME_EMPTY: 'Please enter a cluster name.',
  ADD_CLUSTER: 'Agregar clúster',
  TAG: 'Etiqueta',
  CLUSTER_TAG_DESC: 'Select a tag to identify the purpose of the cluster.',
  CLUSTER_PROVIDER_DESC: 'Select the provider of the cluster infrastructure.',
  // Add Cluster > Connection Settings
  CONNECTION_SETTINGS: 'Connection Settings',
  CONNECTION_MODE: 'Connection Mode',
  CLUSTER_CONNECT_MODE_DESC: 'Directly connect to the cluster or use an agent.',
  CONNTECT_DIRECT: 'Conexión directa al clúster de Kubernetes',
  CONNTECT_PROXY: 'Agente de conexión de clúster',
  INPUT_KUBECONFIG: 'Member Cluster kubeconfig',
  CLUSTER_DIRECT_IMPORT_TIP: 'La interfaz de control de múltiples clústeres de KubeSphere se conecta a los clústeres importados a través del kubeconfig proporcionado. Para este método, el clúster actual debe poder acceder directamente a los clústeres que se importarán a través de la dirección del servidor en kubeconfig. </br></br> Este método generalmente se aplica a las siguientes condiciones: </br> 1. El clúster actual y los clústeres que se importarán están en la misma red interna. </br> 2. La red tanto del clúster actual como de los clústeres que se importarán está conectada a través de VPN u otras tecnologías (por ejemplo, Túneles). </br> 3. Se puedes acceder a la dirección del servidor en kubeconfig a través de la red pública.',
  CLUSTER_AGENT_IMPORT_TIP: 'La interfaz de control de KubeSphere se conecta a los clústeres que se importarán a través de un proxy. La interfaz de control ejecuta un servicio de proxy público, que está conectado a un componente de cliente creado por clústeres para importar. Por lo tanto, se crea un proxy de reserva. Para este método, la interfaz de control y los clústeres que se van a importar no necesitan estar en la misma red. La dirección de apiserver de los clústeres a importar tampoco necesita exponerse. Sin embargo, el rendimiento de la red puedes verse afectado. </br></br> Este método generalmente se aplica a las siguientes condiciones: </br> 1. El clúster actual y los clústeres que se importarán no están en la misma red. <br/> 2. La red tanto del clúster actual como de los clústeres que se van a importar no se puedes conectar a través de VPN u otras tecnologías (por ejemplo, Túneles). <br/> 3. Se pueden aceptar deficiencias de rendimiento de la red dentro de los clústeres.',
  CLUSTER_AGENT_TITLE: 'Agregue el clúster en función del agente proporcionado en el clúster.',
  CLUSTER_AGENT_DESC: 'Se debe establecer un agente correspondiente en el clúster.',
  HOW_TO_GET_KUBECONFIG: 'How do I obtain kubeconfig?',
  // List
  HOST_CLUSTER_TCAP: 'Host Cluster',
  HOST_CLUSTER_PL_TCAP: 'Host Clusters',
  MEMBER_CLUSTER_TCAP_PL: 'Member Clusters',
  CLUSTER_CONDITION_INITIALIZED: 'Inicializado',
  CLUSTER_CONDITION_AGENTAVAILABLE: 'Agent Available',
  CLUSTER_CONDITION_FEDERATED: 'Federated',
  CLUSTER_CONDITION_EXTERNALACCESSREADY: 'External Access Ready',
  CLUSTER_CONDITION_READY: 'Cluster Ready',
  CLUSTER_CONDITION_OPENPITRIXRUNTIMEREADY: 'App Store Ready',
  CLUSTER_CONDITION_KUBECONFIGCERTEXPIRESINSEVENDAYS: 'kubeconfig About to Expire',
  NODE_COUNT: 'Cantidad de nodos',
  ENV_PRODUCTION: 'Producción',
  ENV_DEVELOPMENT: 'Desarrollo',
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
  REMOVE_CLUSTER_TIP_B: 'After the cluster is removed, multi-cluster configuration data in the cluster will not be cleared automatically. Uninstalling KubeSphere or deleting related resources may cause user data loss. You must manually clear the multi-cluster configuration data in the removed cluster by refering to the <a href="https://kubesphere.io/docs/">official KubeSphere documentation</a>.',
  CLUSTER_CONFIRM_TEXT: 'I understand the risks of removing the cluster',
  ENTER_CLUSTER_NAME: 'This operation cannot be undone. Enter the cluster name <strong>{name}</strong> to confirm that you understand the risks of this operation.'
};