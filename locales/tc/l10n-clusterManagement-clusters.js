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
  NO_CLUSTER_TIP: '請添加至少 1 個集群',
  // Add Cluster > Basic Information
  IMPORT_CLUSTER_DESC: '導入已有的 Kubernetes 集群',
  ADD_CLUSTER: '添加集群',
  TAG: '標籤',
  CLUSTER_TAG_DESC: '選擇標籤來識別集群的用途。',
  CLUSTER_PROVIDER_DESC: '選擇提供集群基礎設施的服務商。',
  // Add Cluster > Cluster Settings
  CLUSTER_SETTINGS_DESC: '定義集群配置資訊',
  CLUSTER_CONNECT_METHOD_DESC: '可以直接連接集群或者使用代理',
  CONNTECT_DIRECT: '直接連接Kubernetes集群',
  CONNTECT_PROXY: '集群連接代理',
  INPUT_KUBECONFIG: '請填寫目標集群的 kubeConfig',
  CLUSTER_DIRECT_IMPORT_TIP: 'KubeSphere 多集群控制平面通過提供的 kubeconfig 來直接連接導入集群，此種方式要求目前集群能夠通過 kubeconfig 中的 server 地址直接訪問待導入集群. </br>通常適用於:</br>1. 目前集群和待導入集群在同一内網網路中</br>2. 目前集群和待導入集群已通過 VPN 或穿隧協定等其它技術連通所在網路</br>3. kubeconfig 的 server 地址可以通過公網訪問',
  CLUSTER_AGENT_IMPORT_TIP: 'KubeSphere 控制平面通過代理方式連接待導入集群，控制平面啟動一個公開的代理服務，待導入集群創建相應的客戶端組件連接代理服務，與控制平面之間建立一個反向代理。此種方式不需要待導入集群和控制平面在同一網路，也不要求待導入集群暴露集群的 ApiServer 地址，但會有一定的網路性能損耗</br></br>通常適用於:</br>1. 目前集群和待導入集群不在同一網路中<br/>2. 目前集群和待導入集群無法通過 VPN 或穿隧協定等其它技術連通所在網路<br/>3. 對集群間網路性能損耗能容忍',
  CLUSTER_AGENT_TITLE: '請根據集群中提供的代理連接設置加入集群',
  CLUSTER_AGENT_DESC: '需要在集群中設置下相應的代理 Agent',
  HOW_TO_GET_KUBECONFIG: '如何獲取 kubeconfig ？',
  // List
  HOST_CLUSTER_TCAP: '主集群',
  HOST_CLUSTER_PL_TCAP: '主集群',
  NODE_COUNT: '節點數量',
  ENV_PRODUCTION: '生產環境',
  ENV_DEVELOPMENT: '開發環境',
  ENV_TESTING: '測試環境',
  ENV_DEMO: '示範環境',
  UPDATE_KUBECONFIG: '更新 kubeconfig',
  KUBE_CONFIG_IS_EXPIRED: 'kubeconfig 已過期',
  EXPIRE_DATE: '過期時間',
  LAST_KUBE_CONFIG_EXPIRED: 'kubeconfig 將在 <span class="kubeConfig_expired">{count}</span> 天後過期'
};