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
  NO_CLUSTER_TIP: '请添加至少 1 个集群',
  // Add Cluster > Basic Information
  CLUSTER_NAME_EMPTY: '请输入集群名称。',
  ADD_CLUSTER: '添加集群',
  TAG: '标签',
  CLUSTER_TAG_DESC: '选择标签来标识集群的用途。',
  CLUSTER_PROVIDER_DESC: '选择提供集群基础设施的服务商。',
  // Add Cluster > Connection Settings
  CONNECTION_SETTINGS: '连接设置',
  CONNECTION_MODE: '连接模式',
  CLUSTER_CONNECT_MODE_DESC: '直接连接集群或使用代理连接集群。',
  CONNTECT_DIRECT: '直接连接',
  CONNTECT_PROXY: '代理连接',
  INPUT_KUBECONFIG: '成员集群 kubeconfig',
  CLUSTER_DIRECT_IMPORT_TIP: 'KubeSphere 多集群控制平面通过提供的 kubeconfig 来直接连接导入集群，此种方式要求当前集群能够通过 kubeconfig 中的 server 地址直接访问待导入集群。 </br></br>通常适用于:</br>1. 当前集群和待导入集群在同一内网网络中</br>2. 当前集群和待导入集群已通过 VPN 或隧道等其它技术连通所在网络</br>3. kubeconfig 的 server 地址可以通过公网访问',
  CLUSTER_AGENT_IMPORT_TIP: 'KubeSphere 控制平面通过代理方式连接待导入集群，控制平面启动一个公开的代理服务，待导入集群创建相应的客户端组件连接代理服务，与控制平面之间建立一个反向代理。此种方式不需要待导入集群和控制平面在同一网络，也不要求待导入集群暴露集群的 apiserver 地址，但会有一定的网络性能损耗。</br></br>通常适用于:</br>1. 当前集群和待导入集群不在同一网络中<br/>2. 当前集群和待导入集群无法通过 VPN 或隧道等其它技术连通所在网络<br/>3. 对集群间网络性能损耗能容忍',
  CLUSTER_AGENT_TITLE: '请根据集群中提供的代理连接设置加入集群',
  CLUSTER_AGENT_DESC: '需要在集群中设置下相应的代理 Agent',
  HOW_TO_GET_KUBECONFIG: '如何获取 kubeconfig?',
  // List
  HOST_CLUSTER_TCAP: '主集群',
  HOST_CLUSTER_PL_TCAP: '主集群',
  MEMBER_CLUSTER_TCAP_PL: '成员集群',
  CLUSTER_CONDITION_INITIALIZED: '初始化完成',
  CLUSTER_CONDITION_AGENTAVAILABLE: '代理可用',
  CLUSTER_CONDITION_FEDERATED: '已加入联邦',
  CLUSTER_CONDITION_EXTERNALACCESSREADY: '外部访问就绪',
  CLUSTER_CONDITION_READY: '集群就绪',
  CLUSTER_CONDITION_OPENPITRIXRUNTIMEREADY: '应用商店就绪',
  CLUSTER_CONDITION_KUBECONFIGCERTEXPIRESINSEVENDAYS: 'kubeconfig 证书即将过期',
  NODE_COUNT: '节点数量',
  ENV_PRODUCTION: '生产环境',
  ENV_DEVELOPMENT: '开发环境',
  ENV_TESTING: '测试环境',
  ENV_DEMO: '演示环境',
  UPDATE_KUBECONFIG: '更新 kubeconfig',
  KUBE_CONFIG_IS_EXPIRED: 'kubeconfig 已过期',
  EXPIRE_DATE: '过期时间',
  LAST_KUBE_CONFIG_EXPIRED: 'kubeconfig 将在 <span class="kubeConfig_expired">{count}</span> 天后过期',
  VALIDATION_FAILED: '校验失败。',
  NO_CLUSTER_TIP_DESC: '集群是运行 KubeSphone 的一组节点（物理或虚拟机）。',
  // List > Remove Cluster
  RISK_WARNING: '风险警告',
  REMOVE_CLUSTER_TIP_A: '集群被移除后，集群中的资源和配置信息不会被自动清除。',
  REMOVE_CLUSTER_TIP_B: '为避免集群加入其他多集群系统时出现资源冲突，您需要参阅 <a href="https://kubesphere.io/docs/">KubeSphere 官方文档</a>手动清除集群中的配置信息。',
  CLUSTER_CONFIRM_TEXT: '我了解移除集群的风险',
  ENTER_CLUSTER_NAME: '此操作不能撤消。输入群集名称 <strong>{name}</strong> 以确认您了解此操作的风险。'
};