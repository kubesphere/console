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
  SYSTEM_COMPONENT_PL: '系统组件',
  SERVICE_COMPONENTS_DESC: '系统组件是 KubeSphere 系统中提供各种功能的软件组件，您可以在此页面查看系统组件的运行状态。',
  // KubeSphere
  STOPPED: '已停止',
  RUNNING_TIME: '运行时间',
  KS_CONSOLE_DESC: '提供 KubeSphere 的控制台服务。',
  KS_APISERVER_DESC: '提供用于集群管理的 API 接口。此组件同时也用于集群内部模块通信和集群安全控制。',
  OPENLDAP_DESC: '集中存储和管理用户的账户信息。',
  REDIS_DESC: '开源内存数据结构化存储组件，用作数据库、缓存和消息中介。',
  TOWER_DESC: '用于集群间通过代理方式创建网络连接。',
  KS_CONTROLLER_MANAGER_DESC: '实现业务逻辑。例如，创建企业空间时创建对应的权限，创建服务策略时生成对应的 Istio 配置。',
  // Kubernetes
  COREDNS_DESC: '为 Kubernetes 集群提供服务发现的功能',
  METRICS_SERVER_DESC: 'Kubernetes 的监控组件，用于从每个节点的 kubelet 采集指标信息。',
  KUBE_SCHEDULER_DESC: 'Kubernetes 的调度器，用于将容器组调度到合适的节点。',
  KUBE_SCHEDULER_SVC_DESC: 'Kubernetes 调度器，用于将容器组调度到合适的节点。',
  KUBE_CONTROLLER_MANAGER_SVC_DESC: '守护进程，用于内嵌随 Kubernetes 一起发布的核心控制回路。',
  // Istio
  JAEGER_COLLECTOR_DESC: '收集 Sidecar 的数据。Istio 中的 Sidecar 为 jaeger-agent。',
  JAEGER_COLLECTOR_HEADLESS_DESC: '收集 Sidecar 的数据。Istio 中的 Sidecar 为 jaeger-agent。',
  JAEGER_QUERY_DESC: '接收查询请求，然后从后端存储系统中检索 Trace 并通过 Web UI 展示。',
  JAEGER_OPERATOR_METRICS_DESC: '提供 Operator 的监控指标。',
  // Monitoring
  MONITORING: '监控',
  PROMETHEUS_K8S_DESC: '提供节点、工作负载、 API 对象的相关监控数据。',
  NODE_EXPORTER_DESC: '收集集群各个节点的监控数据，供 Prometheus 抓取。',
  KUBE_STATE_METRICS_DESC: '监听 Kubernetes API 服务器以获取集群中的节点、工作负载、容器组等 API 对象的状态，并生成相关监控数据供 Prometheus 抓取。',
  PROMETHEUS_OPERATED_DESC: '所有 Prometheus 实例对应的服务，供 Prometheus Operator 内部使用。',
  PROMETHEUS_OPERATOR_DESC: '管理 Prometheus 实例。',
  ALERTMANAGER_OPERATED_DESC: 'Alertmanager 服务，用于集成 Prometheus 和 Alertmanager。',
  ALERTMANAGER_MAIN_DESC: 'Alertmanager Web UI 服务。',
  NOTIFICATION_MANAGER_SVC_DESC: '提供发送邮件、微信消息、Slack 消息等通知的接口。',
  NOTIFICATION_MANAGER_CONTROLLER_METRICS_DESC: '提供 Notification Manager Controller 内部监控数据。',
  // Logging
  LOGGING: '日志',
  ELASTICSEARCH_LOGGING_DATA_DESC: '提供 Elasticsearch 数据存储、备份、搜索等服务。',
  ELASTICSEARCH_LOGGING_DISCOVERY_DESC: '提供 Elasticsearch 集群管理服务。',
  LOGSIDECAR_INJECTOR_ADMISSION_DESC: '为指定容器组自动注入用于落盘日志收集的 Sidecar 容器。',
  KS_EVENTS_ADMISSION_DESC: '为事件规则管理提供验证 Webhook。',
  KS_EVENTS_RULER_DESC: '事件规则引擎服务，提供事件过滤和告警功能。',
  KUBE_AUDITING_WEBHOOK_SVC_DESC: '负责审计日志的收集、比对、持久化和告警上报。',
  // DevOps
  S2IOPERATOR_METRICS_SERVICE_DESC: 'S2I 监控服务组件，提供基础监控数据。',
  WEBHOOK_SERVER_SERVICE_DESC: '为 S2I 提供默认值和验证 Webhook。'
};