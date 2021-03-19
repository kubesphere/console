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
    'Responsible for processing service requests and handling all tasks in the API call process',
  'KS-APISERVER_DESC':
    'Serves the REST API endpoints and provides the frontend to the cluster’s shared state through which all other components interact, as well as cluster security control',
  'KS-CONSOLE_DESC': 'Provides console services for KubeSphere',
  OPENLDAP_DESC:
    'Responsible for centralized storage and management of user account information',
  REDIS_DESC:
    'Responsible for in-memory data structure store, used as a database, cache and message broker',

  COREDNS_DESC: 'DNS and Service Discovery in the cluster',
  'KUBE-CONTROLLER-MANAGER_DESC':
    'A daemon that embeds the core control loops shipped with Kubernetes',
  'KUBE-SCHEDULER_DESC':
    'The scheduler of Kubernetes that attaches the Pod to an appropriate node',
  'METRICS-SERVER_DESC':
    'Collect metrics from the Summary API, exposed by Kubelet on each node',
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
  'ISTIO-INGRESSGATEWAY_DESC': 'Gateway for providing external network access',
  'ISTIO-PILOT_DESC':
    'Provides service discovery for the Envoy sidecars, traffic management capabilities for intelligent routing',
  'ISTIO-POLICY_DESC':
    'Supports access controls, rate limits and quotas for envoy',
  'ISTIO-SIDECAR-INJECTOR_DESC':
    'Automatically injects sidecar for configuring the pod',
  'ISTIO-TELEMETRY_DESC':
    'Provides Envoy with data reporting and log collection services',
  'JAEGER-COLLECTOR_DESC':
    'Collects the data of sidecar, the sidecar of istio is jaeger-agent',
  'JAEGER-COLLECTOR-HEADLESS_DESC':
    'Collects the data of sidecar, the sidecar of istio is jaeger-agent',
  'JAEGER-OPERATOR_DESC':
    'Responsible for creating the jaeger service and automatically applying it to the jaeger service when update',
  'JAEGER-QUERY_DESC': 'Serves the API endpoints and a UI service',

  'KUBE-STATE-METRICS_DESC':
    'Listens to the Kubernetes API server and generates metrics about the state of the objects',
  'NODE-EXPORTER_DESC': 'Prometheus exporter for hardware and OS metrics',
  'PROMETHEUS-K8S_DESC':
    'Provides monitoring data for nodes, workloads, and API objects',
  'PROMETHEUS-K8S-SYSTEM_DESC':
    'Provides monitoring data for Kubernetes components such as etcd, coredns, kube-apiserver, kube-scheduler and kube-controller-manager',
  'PROMETHEUS-OPERATED_DESC':
    'The service for all Prometheus instances only for internal use by Prometheus Operator',
  'PROMETHEUS-OPERATOR_DESC': 'Operator for managing Prometheus instances',

  'ELASTICSEARCH-LOGGING-DATA_DESC':
    'Provides Elasticsearch data storage, backup, search and other data services',
  'ELASTICSEARCH-LOGGING-DISCOVERY_DESC':
    'Provides Elasticsearch cluster management services',

  'LOGSIDECAR-INJECTOR_DESC':
    'Injects a sidecar container in a Pod for disk log collection',

  'CONTROLLER-MANAGER-METRICS-SERVICE_DESC':
    'Provides monitoring data for the s2i controller',
  'KS-JENKINS_DESC': 'Jenkins master service, providing DevOps basic functions',
  'KS-JENKINS-AGENT_DESC':
    'The service that used by Jenkins agent connects to the Jenkins master',
  'KS-SONARQUBE-POSTGRESQL_DESC':
    'The code quality analysis component is the backend database of SonarQube',
  'KS-SONARQUBE-SONARQUBE_DESC': 'SonarQube core service',
  S2IOPERATOR_DESC:
    'The s2i controller provides full declaration period management for s2i',
  'UC-JENKINS-UPDATE-CENTER_DESC':
    'Jenkins update center that provides installation packages for Jenkins plugins',
  'WEBHOOK-SERVER-SERVICE_DESC':
    'Provides default values and validate webhook for s2i',

  MYSQL_DESC:
    'An open-source database management system that allows users to manage relational databases. Data in these databases are structured or organized in the form of tables or columns, instead of being stored in one big storeroom',
  ETCD_DESC:
    'A reliable distributed data store that persistently stores the cluster configuration',
  TOWER_DESC: 'A tool for network connection between clusters through an agent',
  'KUBE-SCHEDULER-SVC_DESC':
    'The scheduler of Kubernetes that attaches the Pod to an appropriate node',
  'KUBE-CONTROLLER-MANAGER-SVC_DESC':
    'A daemon that embeds the core control loops shipped with Kubernetes',

  'S2IOPERATOR-METRICS-SERVICE_DESC':
    'The s2i monitoring service component that provides basic monitoring data',
  MINIO_DESC:
    'An open source high performance object storage server, which is useful to store massive unstructured data',
  'ALERTMANAGER-OPERATED_DESC':
    'The Alertmanager service that provides Alertmanager integrations, such as Prometheus',
  'ALERTMANAGER-MAIN_DESC': 'The Alertmanager Web UI service',
  'NOTIFICATION-MANAGER-SVC_DESC':
    'The Notification Manager service that provides the interface to send notifications, such as emails, WeChat and Slack messages',
  'NOTIFICATION-MANAGER-CONTROLLER-METRICS_DESC':
    'A component that provides internal monitoring data services of Notification Manager Controller',
  HYPERPITRIX_DESC:
    'A component that provides the App Store service for Helm-based applications and lifecycle management of apps',
  'JAEGER-OPERATOR-METRICS_DESC':
    'A component that provides the monitoring metrics of Operator',
  'LOGSIDECAR-INJECTOR-ADMISSION_DESC':
    'A component that automatically injects sidecar containers for a specific pod for disk log collection',
  'KS-EVENTS-ADMISSION_DESC':
    'A component that provides webhook authentication for Events rule management',
  'KS-EVENTS-RULER_DESC':
    'The Events rule engine service that provides filtering and alerting features',
  'KS-CONTROLLER-MANAGER_DESC':
    'A backend component that implements business logic. For example, it creates authorizations when a workspace is created and generates istio configurations for service strategies',
  'KUBE-AUDITING-WEBHOOK-SVC_DESC':
    'A component used for auditing logs in terms of collection, comparison, persistence and alert',
}
