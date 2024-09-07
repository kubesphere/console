/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  NO_CLUSTER_TIP: '請添加至少 1 個集群',
  // Add Cluster > Basic Information
  CLUSTER_NAME_EMPTY: 'Please enter a cluster name.',
  ADD_CLUSTER: '添加集群',
  TAG: '標籤',
  CLUSTER_TAG_DESC: '選擇標籤來識別集群的用途。',
  CLUSTER_PROVIDER_DESC: '選擇提供集群基礎設施的服務商。',
  // Add Cluster > Connection Settings
  CONNECTION_SETTINGS: 'Connection Settings',
  CONNECTION_MODE: 'Connection Mode',
  CLUSTER_CONNECT_MODE_DESC: 'Directly connect to the cluster or use an agent.',
  CONNTECT_DIRECT: '直接連接Kubernetes集群',
  CONNTECT_PROXY: '集群連接代理',
  INPUT_KUBECONFIG: 'Member Cluster kubeconfig',
  CLUSTER_DIRECT_IMPORT_TIP:
    'KubeSphere 多集群控制平面通過提供的 kubeconfig 來直接連接導入集群，此種方式要求目前集群能夠通過 kubeconfig 中的 server 地址直接訪問待導入集群. </br>通常適用於:</br>1. 目前集群和待導入集群在同一内網網路中</br>2. 目前集群和待導入集群已通過 VPN 或穿隧協定等其它技術連通所在網路</br>3. kubeconfig 的 server 地址可以通過公網訪問',
  CLUSTER_AGENT_IMPORT_TIP:
    'KubeSphere 控制平面通過代理方式連接待導入集群，控制平面啟動一個公開的代理服務，待導入集群創建相應的客戶端組件連接代理服務，與控制平面之間建立一個反向代理。此種方式不需要待導入集群和控制平面在同一網路，也不要求待導入集群暴露集群的 ApiServer 地址，但會有一定的網路性能損耗</br></br>通常適用於:</br>1. 目前集群和待導入集群不在同一網路中<br/>2. 目前集群和待導入集群無法通過 VPN 或穿隧協定等其它技術連通所在網路<br/>3. 對集群間網路性能損耗能容忍',
  CLUSTER_AGENT_TITLE: '請根據集群中提供的代理連接設置加入集群',
  CLUSTER_AGENT_DESC: '需要在集群中設置下相應的代理 Agent',
  HOW_TO_GET_KUBECONFIG: 'How do I obtain kubeconfig?',
  // List
  HOST_CLUSTER_TCAP: '主集群',
  HOST_CLUSTER_PL_TCAP: '主集群',
  MEMBER_CLUSTER_TCAP_PL: 'Member Clusters',
  CLUSTER_CONDITION_INITIALIZED: 'Initialized',
  CLUSTER_CONDITION_AGENTAVAILABLE: 'Agent Available',
  CLUSTER_CONDITION_FEDERATED: 'Federated',
  CLUSTER_CONDITION_EXTERNALACCESSREADY: 'External Access Ready',
  CLUSTER_CONDITION_READY: 'Cluster Ready',
  CLUSTER_CONDITION_OPENPITRIXRUNTIMEREADY: 'App Store Ready',
  CLUSTER_CONDITION_KUBECONFIGCERTEXPIRESINSEVENDAYS: 'kubeconfig About to Expire',
  NODE_COUNT: '節點數量',
  ENV_PRODUCTION: '生產環境',
  ENV_DEVELOPMENT: '開發環境',
  ENV_TESTING: '測試環境',
  ENV_DEMO: '示範環境',
  UPDATE_KUBECONFIG: 'Update kubeconfig',
  KUBE_CONFIG_IS_EXPIRED: 'kubeconfig 已過期',
  EXPIRE_DATE: '過期時間',
  LAST_KUBE_CONFIG_EXPIRED:
    'kubeconfig 將在 <span class="kubeConfig_expired">{count}</span> 天後過期',
  VALIDATION_FAILED: 'Validation failed.',
  NO_CLUSTER_TIP_DESC:
    'A cluster is a group of nodes (physical or virtual machines) running KubeSphere.',
  // List > Remove Cluster
  RISK_WARNING: 'Risk Warning',
  REMOVE_CLUSTER_TIP_A:
    'After the cluster is removed, resources in the cluster will not be cleared automatically.',
  REMOVE_CLUSTER_TIP_B:
    'After the cluster is removed, multi-cluster configuration data in the cluster will not be cleared automatically. Uninstalling KubeSphere or deleting related resources may cause user data loss. You must manually clear the multi-cluster configuration data in the removed cluster by refering to the <a href="https://docs.kubesphere.com.cn/">official KubeSphere documentation</a>.',
  CLUSTER_CONFIRM_TEXT: 'I understand the risks of removing the cluster',
  ENTER_CLUSTER_NAME:
    'This operation cannot be undone. Enter the cluster name <strong>{name}</strong> to confirm that you understand the risks of this operation.',
};
