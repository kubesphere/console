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
  RUNNING_STATUS: '运行状态',
  'All Components': '全部服务组件',
  components: '服务组件',
  Components: '服务组件',
  'Installed Components': '已安装组件',
  'Not Installed Components': '未安装组件',
  INSTANCE_COUNT: '实例数量',

  SERVICE_DETAILS: '服务详情',

  SERVICE_COMPONENTS_DESC:
    '系统组件是 KubeSphere 系统中提供各种功能的软件组件，您可以在此页面查看系统组件的运行状态。',

  KS_ACCOUNT_DESC: '提供用户、权限管理相关的 API',
  KS_APIGATEWAY_DESC: '负责处理服务请求和处理 API 调用过程中的所有任务',
  KS_APISERVER_DESC:
    '提供用于集群管理的 API 接口。此组件同时也用于集群内部模块通信和集群安全控制。',
  KS_CONSOLE_DESC: '提供 KubeSphere 的控制台服务。',
  OPENLDAP_DESC: '集中存储和管理用户的帐户信息。',
  REDIS_DESC: '开源内存数据结构化存储组件，用作数据库、缓存和消息中介。',

  COREDNS_DESC: '为 Kubernetes 集群提供服务发现的功能',
  KUBE_CONTROLLER_MANAGER_DESC:
    '由一系列的控制器组成，处理集群中常规任务的后台线程',
  KUBE_SCHEDULER_DESC: 'Kubernetes 的调度器，用于将容器组调度到合适的节点。',
  METRICS_SERVER_DESC:
    'Kubernetes 的监控组件，用于从每个节点的 kubelet 采集指标信息。',
  TILLER_DEPLOY_DESC: 'Helm 的服务端，负责管理发布 release',

  OPENPITRIX_API_GATEWAY_DESC:
    '负责处理平台的服务请求和处理 API 调用过程中的所有任务',
  OPENPITRIX_APP_MANAGER_DESC: '提供 OpenPitrix 的应用生命周期管理',
  OPENPITRIX_CATEGORY_MANAGER_DESC: '提供 OpenPitrix 中的应用分类管理',
  OPENPITRIX_CLUSTER_MANAGER_DESC: '提供 OpenPitrix 中的应用实例生命周期管理',
  OPENPITRIX_DB_DESC: 'OpenPitrix 数据库',
  OPENPITRIX_ETCD_DESC: '高可用键值存储系统，用于共享配置、服务发现和全局锁',
  OPENPITRIX_IAM_SERVICE_DESC:
    '控制哪些用户可使用您的资源（身份验证）以及可使用的资源和采用的方式（授权）',
  OPENPITRIX_JOB_MANAGER_DESC: '具体执行 OpenPitrix 应用实例生命周期 Action',
  OPENPITRIX_MINIO_DESC: '对象存储服务，用于存储非结构化数据',
  OPENPITRIX_REPO_INDEXER_DESC: '提供 OpenPitrix 的应用仓库索引服务',
  OPENPITRIX_REPO_MANAGER_DESC: '提供 OpenPitrix 的应用仓库管理',
  OPENPITRIX_RUNTIME_MANAGER_DESC: '提供平台中的云运行时环境管理',
  OPENPITRIX_TASK_MANAGER_DESC:
    '具体执行 OpenPitrix 应用实例生命周期 Action 子任务',

  ISTIO_CITADEL_DESC:
    '通过内置身份和凭证管理赋能强大的服务间和最终用户身份验证',
  ISTIO_GALLEY_DESC:
    '代表其他的 Istio 控制平面组件，用来验证用户编写的 Istio API 配置',
  ISTIO_INGRESSGATEWAY_DESC: '提供外网访问的网关。',
  ISTIO_PILOT_DESC: '为 Envoy sidecar 提供服务发现功能',
  ISTIO_POLICY_DESC:
    '用于向 Envoy 提供准入策略控制，黑白名单控制，速率限制等相关策略',
  ISTIO_SIDECAR_INJECTOR_DESC: '为配置注入的 Pod 自动注入 sidecar',
  ISTIO_TELEMETRY_DESC: '为 Envoy 提供了数据上报和日志搜集服务',
  JAEGER_COLLECTOR_DESC:
    '收集 Sidecar 的数据。Istio 中的 Sidecar 为 jaeger-agent。',
  JAEGER_COLLECTOR_HEADLESS_DESC:
    '收集 Sidecar 的数据。Istio 中的 Sidecar 为 jaeger-agent。',
  JAEGER_OPERATOR_DESC:
    '负责创建 Jaeger 服务，并在配置更新时自动应用到 Jaeger 服务',
  JAEGER_QUERY_DESC:
    '接收查询请求，然后从后端存储系统中检索 Trace 并通过 Web UI 展示。',

  KUBE_STATE_METRICS_DESC:
    '监听 Kubernetes API 服务器以获取集群中的节点、工作负载、容器组等 API 对象的状态，并生成相关监控数据供 Prometheus 抓取。',
  NODE_EXPORTER_DESC: '收集集群各个节点的监控数据，供 Prometheus 抓取。',
  PROMETHEUS_K8S_DESC: '提供节点、工作负载、 API 对象的相关监控数据。',
  PROMETHEUS_K8S_SYSTEM_DESC:
    '提供 etcd, coredns, kube-apiserver, kube-scheduler, kube-controller-manager 等 Kubernetes 组件的监控数据',
  PROMETHEUS_OPERATED_DESC:
    '所有 Prometheus 实例对应的服务，供 Prometheus Operator 内部使用。',
  PROMETHEUS_OPERATOR_DESC: '管理 Prometheus 实例。',

  ELASTICSEARCH_LOGGING_DATA_DESC:
    '提供 Elasticsearch 数据存储、备份、搜索等服务。',
  ELASTICSEARCH_LOGGING_DISCOVERY_DESC: '提供 Elasticsearch 集群管理服务。',
  LOGSIDECAR_INJECTOR_DESC:
    '为指定容器组自动注入用于落盘日志收集的 Sidecar 容器。',

  CONTROLLER_MANAGER_METRICS_SERVICE_DESC: '提供 S2I 控制器的监控数据',
  KS_JENKINS_DESC: 'Jenkins Master 服务，提供 DevOps 基础功能。',
  KS_JENKINS_AGENT_DESC: 'Jenkins Agent 连接 Jenkins Master 所使用的服务。',
  KS_SONARQUBE_POSTGRESQL_DESC: '代码质量分析组件 Sonarqube 的后端数据库',
  KS_SONARQUBE_SONARQUBE_DESC: 'Sonarqube 的主服务',
  S2IOPERATOR_DESC: 'S2I 控制器，S2I 的全生命周期管理',
  UC_JENKINS_UPDATE_CENTER_DESC: 'Jenkins 更新中心，提供 Jenkins 插件的安装包',
  WEBHOOK_SERVER_SERVICE_DESC: '为 S2I 提供默认值和验证 Webhook。',

  ETCD_DESC: '一个可靠的分布式数据存储，能持久化存储集群配置',
  MYSQL_DESC:
    '一个开源的数据库管理系统，让用户能够管理关系型数据库。关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内',
  TOWER_DESC: '用于集群间通过代理方式创建网络连接。',
  KUBE_SCHEDULER_SVC_DESC: 'Kubernetes 调度器，用于将容器组调度到合适的节点。',
  KUBE_CONTROLLER_MANAGER_SVC_DESC:
    '守护进程，用于内嵌随 Kubernetes 一起发布的核心控制回路。',

  S2IOPERATOR_METRICS_SERVICE_DESC: 'S2I 监控服务组件，提供基础监控数据。',
  MINIO_DESC: '开源高性能对象存储服务器，适合存储大规模非结构化数据。',
  ALERTMANAGER_OPERATED_DESC:
    'Alertmanager 服务，用于集成 Prometheus 和 Alertmanager。',
  ALERTMANAGER_MAIN_DESC: 'Alertmanager Web UI 服务。',
  NOTIFICATION_MANAGER_SVC_DESC:
    '提供发送邮件、微信消息、Slack 消息等通知的接口。',
  NOTIFICATION_MANAGER_CONTROLLER_METRICS_DESC:
    '提供 Notification Manager Controller 内部监控数据。',
  HYPERPITRIX_DESC:
    '针对基于 Helm 的应用程序提供应用商店服务，管理应用生命周期',
  JAEGER_OPERATOR_METRICS_DESC: '提供 Operator 的监控指标。',
  LOGSIDECAR_INJECTOR_ADMISSION_DESC:
    '为指定容器组自动注入用于落盘日志收集的 Sidecar 容器。',
  KS_EVENTS_ADMISSION_DESC: '为事件规则管理提供验证 Webhook。',
  KS_EVENTS_RULER_DESC: '事件规则引擎服务，提供事件过滤和告警功能。',
  KS_CONTROLLER_MANAGER_DESC:
    '实现业务逻辑。例如，创建企业空间时创建对应的权限，创建服务策略时生成对应的 Istio 配置。',
  KUBE_AUDITING_WEBHOOK_SVC_DESC:
    '负责审计日志的收集、比对、持久化和告警上报。',
}
