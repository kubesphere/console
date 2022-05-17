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
  IMPORT_CLUSTER_DESC: '导入已有的 Kubernetes 集群',
  ADD_CLUSTER: '添加集群',
  TAG: '标签',
  CLUSTER_TAG_DESC: '选择标签来标识集群的用途。',
  CLUSTER_PROVIDER_DESC: '选择提供集群基础设施的服务商。',
  // Add Cluster > Cluster Settings
  CLUSTER_SETTINGS_DESC: '定义集群配置信息',
  CLUSTER_CONNECT_METHOD_DESC: '可以直接连接集群或者使用代理',
  CONNTECT_DIRECT: '直接连接 Kubernetes 集群',
  CONNTECT_PROXY: '集群连接代理',
  INPUT_KUBECONFIG: '请填写目标集群的 KubeConfig',
  CLUSTER_DIRECT_IMPORT_TIP: 'KubeSphere 多集群控制平面通过提供的 kubeconfig 来直接连接导入集群，此种方式要求当前集群能够通过 kubeconfig 中的 server 地址直接访问待导入集群。 </br></br>通常适用于:</br>1. 当前集群和待导入集群在同一内网网络中</br>2. 当前集群和待导入集群已通过 VPN 或隧道等其它技术连通所在网络</br>3. kubeconfig 的 server 地址可以通过公网访问',
  CLUSTER_AGENT_IMPORT_TIP: 'KubeSphere 控制平面通过代理方式连接待导入集群，控制平面启动一个公开的代理服务，待导入集群创建相应的客户端组件连接代理服务，与控制平面之间建立一个反向代理。此种方式不需要待导入集群和控制平面在同一网络，也不要求待导入集群暴露集群的 apiserver 地址，但会有一定的网络性能损耗。</br></br>通常适用于:</br>1. 当前集群和待导入集群不在同一网络中<br/>2. 当前集群和待导入集群无法通过 VPN 或隧道等其它技术连通所在网络<br/>3. 对集群间网络性能损耗能容忍',
  CLUSTER_AGENT_TITLE: '请根据集群中提供的代理连接设置加入集群',
  CLUSTER_AGENT_DESC: '需要在集群中设置下相应的代理 Agent',
  HOW_TO_GET_KUBECONFIG: '如何获取 KubeConfig?',
  // List
  HOST_CLUSTER_TCAP: '主集群',
  HOST_CLUSTER_PL_TCAP: '主集群',
  NODE_COUNT: '节点数量',
  ENV_PRODUCTION: '生产环境',
  ENV_DEVELOPMENT: '开发环境',
  ENV_TESTING: '测试环境',
  ENV_DEMO: '演示环境',
  UPDATE_KUBECONFIG: '更新 kubeconfig',
  KUBE_CONFIG_IS_EXPIRED: 'kubeconfig 已过期',
  EXPIRE_DATE: '过期时间',
  LAST_KUBE_CONFIG_EXPIRED: 'kubeconfig 将在 <span class="kubeConfig_expired">{count}</span> 天后过期'
};