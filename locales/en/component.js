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
  'All Components': 'All Components',
  components: 'components',
  Components: 'Components',
  'Installed Components': 'Installed Components',
  'Instance Count': 'Instance Count',
  'Not Installed Components': 'Not Installed Components',
  'Running Status': 'Running Status',
  'Service Details': 'Service Details',

  SERVICE_COMPONENTS_DESC:
    'This module monitors the health status of various service components in KubeSphere, Kubernetes, OpenPitrix and so on. It shows the health status and running time of the current cluster, and helps users monitor the status of the cluster and locate problems in time.',

  'KS-ACCOUNT_DESC': 'Provides users and authorizations management API',
  'KS-APIGATEWAY_DESC':
    'Responsible for processing service requests and handling all tasks in the API call process.',
  'KS-APISERVER_DESC':
    'Provides REST APIs for cluster management. This component is also used for communication between cluster components and cluster security control.',
  'KS-CONSOLE_DESC': 'Provides KubeSphere console services.',
  OPENLDAP_DESC: 'Stores and manages user information in a centralized manner.',
  REDIS_DESC:
    'Open-source, in-memory data structure store, which is used as a database, cache, and message broker.',

  COREDNS_DESC: 'DNS and Service Discovery in the cluster',
  'KUBE-CONTROLLER-MANAGER_DESC':
    'Daemon that embeds the core control loops shipped with Kubernetes.',
  'KUBE-SCHEDULER_DESC':
    'Kubernetes scheduler that assigns Pods to appropriate nodes.',
  'METRICS-SERVER_DESC':
    'Kubernetes monitoring component that collects metrics from kubelet of each node.',
  'TILLER-DEPLOY_DESC':
    'Helm server, interacts directly with the Kubernetes API server to install, upgrade, query, and remove Kubernetes resources',
  'OPENPITRIX-API-GATEWAY_DESC':
    'Responsible for processing platform service requests and handling all tasks in the API call process',
  'OPENPITRIX-APP-MANAGER_DESC':
    "Provides OpenPitrix's application lifecycle management",
  'OPENPITRIX-CATEGORY-MANAGER_DESC':
    'Provides application classification management in OpenPitrix',
  'OPENPITRIX-CLUSTER-MANAGER_DESC':
    'Provides cluster (instance) lifecycle management in OpenPitrix',
  'OPENPITRIX-DB_DESC': 'OpenPitrix database service',
  'OPENPITRIX-ETCD_DESC':
    'A distributed key value store that provides a reliable way to store data across a cluster of machines',
  'OPENPITRIX-IAM-SERVICE_DESC':
    'Control who is authenticated (signed in) and authorized (has permissions) to use resources',
  'OPENPITRIX-JOB-MANAGER_DESC':
    'Executes the OpenPitrix application instance lifecycle Action',
  'OPENPITRIX-MINIO_DESC':
    'Provides object storage services for storing unstructured data',
  'OPENPITRIX-REPO-INDEXER_DESC':
    "Provides OpenPitrix's App Repository Indexing Service",
  'OPENPITRIX-REPO-MANAGER_DESC':
    "Provides OpenPitrix's App Repository Management",
  'OPENPITRIX-RUNTIME-MANAGER_DESC':
    'Provides cloud runtime management in the platform',
  'OPENPITRIX-TASK-MANAGER_DESC':
    'Executes sub-tasks of the OpenPitrix application instance lifecycle Action',

  'ISTIO-CITADEL_DESC':
    'Service-to-service and end-user authentication with built-in identity and credential management',
  'ISTIO-GALLEY_DESC':
    "Istio's configuration validation, ingestion, processing and distribution component",
  'ISTIO-INGRESSGATEWAY_DESC':
    'Provides a gateway for external network access.',
  'ISTIO-PILOT_DESC':
    'Provides service discovery for the Envoy sidecars, traffic management capabilities for intelligent routing',
  'ISTIO-POLICY_DESC':
    'Supports access controls, rate limits and quotas for envoy',
  'ISTIO-SIDECAR-INJECTOR_DESC':
    'Automatically injects sidecar for configuring the pod',
  'ISTIO-TELEMETRY_DESC':
    'Provides Envoy with data reporting and log collection services',
  'JAEGER-COLLECTOR_DESC':
    'Collects sidecar data. The sidecar of Istio is jaeger-agent.',
  'JAEGER-COLLECTOR-HEADLESS_DESC':
    'Collects sidecar data. The sidecar of Istio is jaeger-agent.',
  'JAEGER-OPERATOR_DESC':
    'Responsible for creating the jaeger service and automatically applying it to the jaeger service when update',
  'JAEGER-QUERY_DESC':
    'Accepts query requests, retrieves traces from the backend storage system, and displays the data on the web UI.',

  'KUBE-STATE-METRICS_DESC':
    'Listens on the Kubernetes API server to obtain the status of cluster API objects such as nodes, workloads, and Pods, and generates monitoring data for Prometheus.',
  'NODE-EXPORTER_DESC':
    'Provides monitoring data of all cluster nodes for Prometheus.',
  'PROMETHEUS-K8S_DESC':
    'Provides monitoring data of nodes, workloads, and API objects.',
  'PROMETHEUS-K8S-SYSTEM_DESC':
    'Provides monitoring data for Kubernetes components such as etcd, coredns, kube-apiserver, kube-scheduler and kube-controller-manager',
  'PROMETHEUS-OPERATED_DESC':
    'Service corresponding to all Prometheus instances, which is used internally by Prometheus Operator.',
  'PROMETHEUS-OPERATOR_DESC': 'Manages Prometheus instances.',

  'ELASTICSEARCH-LOGGING-DATA_DESC':
    'Provides Elasticsearch services such as data storage, backup, and searching.',
  'ELASTICSEARCH-LOGGING-DISCOVERY_DESC':
    'Provides Elasticsearch cluster management services.',

  'LOGSIDECAR-INJECTOR_DESC':
    'Injects a sidecar container in a Pod for disk log collection',

  'CONTROLLER-MANAGER-METRICS-SERVICE_DESC':
    'Provides monitoring data for the s2i controller',
  'KS-JENKINS_DESC':
    'Jenkins master service that provides basic DevOps functions.',
  'KS-JENKINS-AGENT_DESC':
    'Service used when a Jenkins agent connects to the Jenkins master.',
  'KS-SONARQUBE-POSTGRESQL_DESC':
    'The code quality analysis component is the backend database of SonarQube',
  'KS-SONARQUBE-SONARQUBE_DESC': 'SonarQube core service',
  S2IOPERATOR_DESC:
    'The s2i controller provides full declaration period management for s2i',
  'UC-JENKINS-UPDATE-CENTER_DESC':
    'Jenkins update center that provides installation packages for Jenkins plugins',
  'WEBHOOK-SERVER-SERVICE_DESC':
    'Provides the default values and authentication webhook for S2I.',

  MYSQL_DESC:
    'An open-source database management system that allows users to manage relational databases. Data in these databases are structured or organized in the form of tables or columns, instead of being stored in one big storeroom',
  ETCD_DESC:
    'A reliable distributed data store that persistently stores the cluster configuration',
  TOWER_DESC: 'Tool used for network connection between clusters over proxy.',
  'KUBE-SCHEDULER-SVC_DESC':
    'Kubernetes scheduler that assigns Pods to appropriate nodes.',
  'KUBE-CONTROLLER-MANAGER-SVC_DESC':
    'Daemon that embeds the core control loops shipped with Kubernetes.',

  'S2IOPERATOR-METRICS-SERVICE_DESC':
    'S2I monitoring service that provides basic monitoring data.',
  MINIO_DESC:
    'Open-source high performance object storage server ideal for storing massive unstructured data.',
  'ALERTMANAGER-OPERATED_DESC':
    'Alertmanager service used for integrating Alertmanager with Prometheus.',
  'ALERTMANAGER-MAIN_DESC': 'Alertmanager Web UI service.',
  'NOTIFICATION-MANAGER-SVC_DESC':
    'Provides interfaces for sending notifications such as emails, WeChat messages, and Slack messages.',
  'NOTIFICATION-MANAGER-CONTROLLER-METRICS_DESC':
    'Provides internal monitoring data for Notification Manager Controller.',
  HYPERPITRIX_DESC:
    'A component that provides the App Store service for Helm-based applications and lifecycle management of apps',
  'JAEGER-OPERATOR-METRICS_DESC': 'Provides monitoring metrics for Operator.',
  'LOGSIDECAR-INJECTOR-ADMISSION_DESC':
    'Automatically injects sidecar containers into Pods for disk log collection.',
  'KS-EVENTS-ADMISSION_DESC':
    'Provides the authentication webhook for event rule management.',
  'KS-EVENTS-RULER_DESC':
    'Event rule engine service that provides filtering and alerting features.',
  'KS-CONTROLLER-MANAGER_DESC':
    'Implements service logic. This component creates permissions when a workspace is created and generates Istio configuration for service strategies.',
  'KUBE-AUDITING-WEBHOOK-SVC_DESC':
    'Used for audit collection, comparison, persistence, and alerting.',
}
