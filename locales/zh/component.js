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
  'Running Status': '运行状态',
  'All Components': '全部服务组件',
  components: '服务组件',
  Components: '服务组件',
  'Installed Components': '已安装组件',
  'Not Installed Components': '未安装组件',
  'Instance Count': '实例数量',

  'Service Details': '服务详情',

  SERVICE_COMPONENTS_DESC:
    '服务组件提供 KubeSphere、Kubernetes 和 OpenPitrix 集群内各项服务组件的健康状态监控，可以查看当前集群的健康状态和运行时间，能够帮助用户监测集群的状况和及时定位问题。',

  'KS-ACCOUNT_DESC': '提供用户、权限管理相关的 API',
  'KS-APIGATEWAY_DESC': '负责处理服务请求和处理 API 调用过程中的所有任务',
  'KS-APISERVER_DESC':
    '整个集群管理的 API 接口和集群内部各个模块之间通信的枢纽，以及集群安全控制',
  'KS-CONSOLE_DESC': '提供 KubeSphere 的控制台服务',
  OPENLDAP_DESC: '负责集中存储和管理用户的帐户信息',
  REDIS_DESC: '将结构化的数据存储在内存中的存储系统',

  COREDNS_DESC: '为 Kubernetes 集群提供服务发现的功能',
  'KUBE-CONTROLLER-MANAGER_DESC':
    '由一系列的控制器组成，处理集群中常规任务的后台线程',
  'KUBE-SCHEDULER_DESC':
    'Kubernetes 的调度器，将 Pod 调度到合适的 Node 节点上去',
  'METRICS-SERVER_DESC':
    'Kubernetes 的监控组件，从每个节点的 Kubelet 采集指标信息',
  'TILLER-DEPLOY_DESC': 'Helm 的服务端，负责管理发布 release',

  'OPENPITRIX-API-GATEWAY_DESC':
    '负责处理平台的服务请求和处理 API 调用过程中的所有任务',
  'OPENPITRIX-APP-MANAGER_DESC': '提供 OpenPitrix 的应用生命周期管理',
  'OPENPITRIX-CATEGORY-MANAGER_DESC': '提供 OpenPitrix 中的应用分类管理',
  'OPENPITRIX-CLUSTER-MANAGER_DESC': '提供 OpenPitrix 中的应用实例生命周期管理',
  'OPENPITRIX-DB_DESC': 'OpenPitrix 数据库',
  'OPENPITRIX-ETCD_DESC': '高可用键值存储系统，用于共享配置、服务发现和全局锁',
  'OPENPITRIX-IAM-SERVICE_DESC':
    '控制哪些用户可使用您的资源（身份验证）以及可使用的资源和采用的方式（授权）',
  'OPENPITRIX-JOB-MANAGER_DESC': '具体执行 OpenPitrix 应用实例生命周期 Action',
  'OPENPITRIX-MINIO_DESC': '对象存储服务，用于存储非结构化数据',
  'OPENPITRIX-REPO-INDEXER_DESC': '提供 OpenPitrix 的应用仓库索引服务',
  'OPENPITRIX-REPO-MANAGER_DESC': '提供 OpenPitrix 的应用仓库管理',
  'OPENPITRIX-RUNTIME-MANAGER_DESC': '提供平台中的云运行时环境管理',
  'OPENPITRIX-TASK-MANAGER_DESC':
    '具体执行 OpenPitrix 应用实例生命周期 Action 子任务',

  'ISTIO-CITADEL_DESC':
    '通过内置身份和凭证管理赋能强大的服务间和最终用户身份验证',
  'ISTIO-GALLEY_DESC':
    '代表其他的 Istio 控制平面组件，用来验证用户编写的 Istio API 配置',
  'ISTIO-INGRESSGATEWAY_DESC': '提供外网访问的网关',
  'ISTIO-PILOT_DESC': '为 Envoy sidecar 提供服务发现功能',
  'ISTIO-POLICY_DESC':
    '用于向 Envoy 提供准入策略控制，黑白名单控制，速率限制等相关策略',
  'ISTIO-SIDECAR-INJECTOR_DESC': '为配置注入的 Pod 自动注入 sidecar',
  'ISTIO-TELEMETRY_DESC': '为 Envoy 提供了数据上报和日志搜集服务',
  'JAEGER-COLLECTOR_DESC':
    '收集 sidecar 的数据，istio 里面 sidecar 就是 jaeger-agent',
  'JAEGER-COLLECTOR-HEADLESS_DESC':
    '收集 sidecar 的数据，Istio 里面 sidecar 就是 jaeger-agent',
  'JAEGER-OPERATOR_DESC':
    '负责创建 jaeger 服务，并在配置更新时自动应用到 Jaeger 服务',
  'JAEGER-QUERY_DESC':
    '接收查询请求，然后从后端存储系统中检索 trace 并通过 UI 进行展示',

  'KUBE-STATE-METRICS_DESC':
    '监听 Kubernetes API server 以获取集群中各种 API 对象的状态包括节点，工作负载和 Pod 等，并生成相关监控数据供 Prometheus 抓取',
  'NODE-EXPORTER_DESC': '收集集群各个节点的监控数据，供 Prometheus 抓取',
  'PROMETHEUS-K8S_DESC': '提供节点、工作负载、 API 对象相关监控数据',
  'PROMETHEUS-K8S-SYSTEM_DESC':
    '提供 etcd, coredns, kube-apiserver, kube-scheduler, kube-controller-manager 等 Kubernetes 组件的监控数据',
  'PROMETHEUS-OPERATED_DESC':
    '所有 Prometheus 实例对应的服务，供 Prometheus Operator 内部使用',
  'PROMETHEUS-OPERATOR_DESC': '管理 Prometheus 实例的 Operator',

  'ELASTICSEARCH-LOGGING-DATA_DESC':
    '提供 Elasticsearch 数据存储、备份、搜索等数据服务',
  'ELASTICSEARCH-LOGGING-DISCOVERY_DESC': '提供 Elasticsearch 集群管理服务',
  'LOGSIDECAR-INJECTOR_DESC': '为指定 Pod 自动注入落盘日志收集 Sidecar 容器',

  'CONTROLLER-MANAGER-METRICS-SERVICE_DESC': '提供 S2I 控制器的监控数据',
  'KS-JENKINS_DESC': 'Jenkins master 服务，提供 DevOps 基础功能',
  'KS-JENKINS-AGENT_DESC': 'Jenkins agent 连接 Jenkins master 所使用的服务',
  'KS-SONARQUBE-POSTGRESQL_DESC': '代码质量分析组件 Sonarqube 的后端数据库',
  'KS-SONARQUBE-SONARQUBE_DESC': 'Sonarqube 的主服务',
  S2IOPERATOR_DESC: 'S2I 控制器，S2I 的全生命周期管理',
  'UC-JENKINS-UPDATE-CENTER_DESC':
    'Jenkins 更新中心，提供 Jenkins 插件的安装包',
  'WEBHOOK-SERVER-SERVICE_DESC': '为 S2I 提供默认值和验证 webhook',

  ETCD_DESC: '一个可靠的分布式数据存储，能持久化存储集群配置',
  MYSQL_DESC:
    '一个开源的数据库管理系统，让用户能够管理关系型数据库。关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内',
  TOWER_DESC: '一个可以在集群间通过代理方式创建网络连接的工具',
  'KUBE-SCHEDULER-SVC_DESC':
    'Kubernetes 的调度器，将 Pod 调度到合适的 Node 节点上去',
  'KUBE-CONTROLLER-MANAGER-SVC_DESC':
    '由一系列的控制器组成，处理集群中常规任务的后台线程',

  'S2IOPERATOR-METRICS-SERVICE_DESC': 'S2I 监控服务组件，提供基础监控数据',
  MINIO_DESC: '一个高性能的开源对象存储服务器，适合存储大容量非结构化的数据',
  'ALERTMANAGER-OPERATED_DESC':
    'Alertmanager 服务，用于 Prometheus 等与 Alertmanager 集成',
  'ALERTMANAGER-MAIN_DESC': 'Alertmanager Web UI 服务',
  'NOTIFICATION-MANAGER-SVC_DESC':
    'Notification Manager 服务，提供发送邮件、微信、Slack 等通知的接口',
  'NOTIFICATION-MANAGER-CONTROLLER-METRICS_DESC':
    '提供 Notification Manager Controller 内部监控数据的服务',
  HYPERPITRIX_DESC:
    '针对基于 Helm 的应用程序提供应用商店服务，管理应用生命周期',
  'JAEGER-OPERATOR-METRICS_DESC': '提供 operator 的监控 metrics',
  'LOGSIDECAR-INJECTOR-ADMISSION_DESC':
    '为指定 Pod 自动注入落盘日志收集 Sidecar 容器',
  'KS-EVENTS-ADMISSION_DESC': '为 Events 规则管理提供验证 webhook',
  'KS-EVENTS-RULER_DESC': 'Events 规则引擎服务，提供 Events 过滤和告警功能',
  'KS-CONTROLLER-MANAGER_DESC':
    '实现业务逻辑，例如创建企业空间时，为其创建对应的权限；创建服务策略时，生成对应的 Istio 配置等',
  'KUBE-AUDITING-WEBHOOK-SVC_DESC': '负责审计日志的收集、比对、持久化和告警',
}
