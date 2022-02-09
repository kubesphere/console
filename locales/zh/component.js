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
  'All Components': '全部服务组件',
  components: '服务组件',
  Components: '服务组件',
  'Installed Components': '已安装组件',
  'Not Installed Components': '未安装组件',
  KS_ACCOUNT_DESC: '提供用户、权限管理相关的 API',
  KS_APIGATEWAY_DESC: '负责处理服务请求和处理 API 调用过程中的所有任务',
  TILLER_DEPLOY_DESC: 'Helm 的服务端，负责管理发布 release',
  OPENPITRIX_API_GATEWAY_DESC: '负责处理平台的服务请求和处理 API 调用过程中的所有任务',
  OPENPITRIX_APP_MANAGER_DESC: '提供 OpenPitrix 的应用生命周期管理',
  OPENPITRIX_CATEGORY_MANAGER_DESC: '提供 OpenPitrix 中的应用分类管理',
  OPENPITRIX_CLUSTER_MANAGER_DESC: '提供 OpenPitrix 中的应用实例生命周期管理',
  OPENPITRIX_DB_DESC: 'OpenPitrix 数据库',
  OPENPITRIX_ETCD_DESC: '高可用键值存储系统，用于共享配置、服务发现和全局锁',
  OPENPITRIX_IAM_SERVICE_DESC: '控制哪些用户可使用您的资源（身份验证）以及可使用的资源和采用的方式（授权）',
  OPENPITRIX_JOB_MANAGER_DESC: '具体执行 OpenPitrix 应用实例生命周期 Action',
  OPENPITRIX_MINIO_DESC: '对象存储服务，用于存储非结构化数据',
  OPENPITRIX_REPO_INDEXER_DESC: '提供 OpenPitrix 的应用仓库索引服务',
  OPENPITRIX_REPO_MANAGER_DESC: '提供 OpenPitrix 的应用仓库管理',
  OPENPITRIX_RUNTIME_MANAGER_DESC: '提供平台中的云运行时环境管理',
  OPENPITRIX_TASK_MANAGER_DESC: '具体执行 OpenPitrix 应用实例生命周期 Action 子任务',
  ISTIO_CITADEL_DESC: '通过内置身份和凭证管理赋能强大的服务间和最终用户身份验证',
  ISTIO_GALLEY_DESC: '代表其他的 Istio 控制平面组件，用来验证用户编写的 Istio API 配置',
  ISTIO_INGRESSGATEWAY_DESC: '提供外网访问的网关。',
  ISTIO_PILOT_DESC: '为 Envoy sidecar 提供服务发现功能',
  ISTIO_POLICY_DESC: '用于向 Envoy 提供准入策略控制，黑白名单控制，速率限制等相关策略',
  ISTIO_SIDECAR_INJECTOR_DESC: '为配置注入的 Pod 自动注入 sidecar',
  ISTIO_TELEMETRY_DESC: '为 Envoy 提供了数据上报和日志搜集服务',
  JAEGER_OPERATOR_DESC: '负责创建 Jaeger 服务，并在配置更新时自动应用到 Jaeger 服务',
  PROMETHEUS_K8S_SYSTEM_DESC: '提供 etcd, coredns, kube-apiserver, kube-scheduler, kube-controller-manager 等 Kubernetes 组件的监控数据',
  LOGSIDECAR_INJECTOR_DESC: '为指定容器组自动注入用于落盘日志收集的 Sidecar 容器。',
  CONTROLLER_MANAGER_METRICS_SERVICE_DESC: '提供 S2I 控制器的监控数据',
  KS_JENKINS_DESC: 'Jenkins Master 服务，提供 DevOps 基础功能。',
  KS_JENKINS_AGENT_DESC: 'Jenkins Agent 连接 Jenkins Master 所使用的服务。',
  KS_SONARQUBE_POSTGRESQL_DESC: '代码质量分析组件 Sonarqube 的后端数据库',
  KS_SONARQUBE_SONARQUBE_DESC: 'Sonarqube 的主服务',
  S2IOPERATOR_DESC: 'S2I 控制器，S2I 的全生命周期管理',
  UC_JENKINS_UPDATE_CENTER_DESC: 'Jenkins 更新中心，提供 Jenkins 插件的安装包',
  MYSQL_DESC: '一个开源的数据库管理系统，让用户能够管理关系型数据库。关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内',
  ETCD_DESC: '一个可靠的分布式数据存储，能持久化存储集群配置',
  MINIO_DESC: '开源高性能对象存储服务器，适合存储大规模非结构化数据。',
  HYPERPITRIX_DESC: '针对基于 Helm 的应用程序提供应用商店服务，管理应用生命周期'
};