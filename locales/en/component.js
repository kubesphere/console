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
  INSTANCE_COUNT: 'Instances',
  'Not Installed Components': 'Not Installed Components',
  RUNNING_STATUS: 'Running Status',
  SERVICE_DETAILS: 'Service Details',

  SERVICE_COMPONENTS_DESC:
    'System components are software components in the KubeSphere system, which provide various functions. You can view the running status of services components on this page.',

  KS_ACCOUNT_DESC: 'Provides users and authorizations management API',
  KS_APIGATEWAY_DESC:
    'Responsible for processing service requests and handling all tasks in the API call process.',
  KS_APISERVER_DESC:
    'Provides REST APIs for cluster management. This component is also used for communication between cluster components and cluster security control.',
  KS_CONSOLE_DESC: 'Provides KubeSphere console services.',
  OPENLDAP_DESC: 'Stores and manages user information in a centralized manner.',
  REDIS_DESC:
    'Open-source, in-memory data structure store, which is used as a database, cache, and message broker.',

  COREDNS_DESC:
    'Provides the service discovery function for the Kubernetes cluster.',
  KUBE_CONTROLLER_MANAGER_DESC:
    'Daemon that embeds the core control loops shipped with Kubernetes.',
  KUBE_SCHEDULER_DESC:
    'Kubernetes scheduler that assigns Pods to appropriate nodes.',
  METRICS_SERVER_DESC:
    'Kubernetes monitoring component that collects metrics from kubelet of each node.',
  TILLER_DEPLOY_DESC:
    'Helm server, interacts directly with the Kubernetes API server to install, upgrade, query, and remove Kubernetes resources',
  OPENPITRIX_API_GATEWAY_DESC:
    'Responsible for processing platform service requests and handling all tasks in the API call process',
  OPENPITRIX_APP_MANAGER_DESC:
    "Provides OpenPitrix's application lifecycle management",
  OPENPITRIX_CATEGORY_MANAGER_DESC:
    'Provides application classification management in OpenPitrix',
  OPENPITRIX_CLUSTER_MANAGER_DESC:
    'Provides cluster (instance) lifecycle management in OpenPitrix',
  OPENPITRIX_DB_DESC: 'OpenPitrix database service',
  OPENPITRIX_ETCD_DESC:
    'A distributed key value store that provides a reliable way to store data across a cluster of machines',
  OPENPITRIX_IAM_SERVICE_DESC:
    'Control who is authenticated (signed in) and authorized (has permissions) to use resources',
  OPENPITRIX_JOB_MANAGER_DESC:
    'Executes the OpenPitrix application instance lifecycle Action',
  OPENPITRIX_MINIO_DESC:
    'Provides object storage services for storing unstructured data',
  OPENPITRIX_REPO_INDEXER_DESC:
    "Provides OpenPitrix's App Repository Indexing Service",
  OPENPITRIX_REPO_MANAGER_DESC:
    "Provides OpenPitrix's App Repository Management",
  OPENPITRIX_RUNTIME_MANAGER_DESC:
    'Provides cloud runtime management in the platform',
  OPENPITRIX_TASK_MANAGER_DESC:
    'Executes sub-tasks of the OpenPitrix application instance lifecycle Action',

  ISTIO_CITADEL_DESC:
    'Service-to-service and end-user authentication with built-in identity and credential management',
  ISTIO_GALLEY_DESC:
    "Istio's configuration validation, ingestion, processing and distribution component",
  ISTIO_INGRESSGATEWAY_DESC: 'Provides a gateway for external network access.',
  ISTIO_PILOT_DESC:
    'Provides service discovery for the Envoy sidecars, traffic management capabilities for intelligent routing',
  ISTIO_POLICY_DESC:
    'Supports access controls, rate limits and quotas for envoy',
  ISTIO_SIDECAR_INJECTOR_DESC:
    'Automatically injects sidecar for configuring the pod',
  ISTIO_TELEMETRY_DESC:
    'Provides Envoy with data reporting and log collection services',
  JAEGER_COLLECTOR_DESC:
    'Collects sidecar data. The sidecar of Istio is jaeger-agent.',
  JAEGER_COLLECTOR_HEADLESS_DESC:
    'Collects sidecar data. The sidecar of Istio is jaeger-agent.',
  JAEGER_OPERATOR_DESC:
    'Responsible for creating the jaeger service and automatically applying it to the jaeger service when update',
  JAEGER_QUERY_DESC:
    'Accepts query requests, retrieves traces from the backend storage system, and displays the data on the web UI.',

  KUBE_STATE_METRICS_DESC:
    'Listens on the Kubernetes API server to obtain the status of cluster API objects such as nodes, workloads, and Pods, and generates monitoring data for Prometheus.',
  NODE_EXPORTER_DESC:
    'Provides monitoring data of all cluster nodes for Prometheus.',
  PROMETHEUS_K8S_DESC:
    'Provides monitoring data of nodes, workloads, and API objects.',
  PROMETHEUS_K8S_SYSTEM_DESC:
    'Provides monitoring data for Kubernetes components such as etcd, coredns, kube-apiserver, kube-scheduler and kube-controller-manager',
  PROMETHEUS_OPERATED_DESC:
    'Service corresponding to all Prometheus instances, which is used internally by Prometheus Operator.',
  PROMETHEUS_OPERATOR_DESC: 'Manages Prometheus instances.',

  ELASTICSEARCH_LOGGING_DATA_DESC:
    'Provides Elasticsearch services such as data storage, backup, and searching.',
  ELASTICSEARCH_LOGGING_DISCOVERY_DESC:
    'Provides Elasticsearch cluster management services.',

  LOGSIDECAR_INJECTOR_DESC:
    'Injects a sidecar container in a Pod for disk log collection',

  CONTROLLER_MANAGER_METRICS_SERVICE_DESC:
    'Provides monitoring data for the s2i controller',
  KS_JENKINS_DESC:
    'Jenkins master service that provides basic DevOps functions.',
  KS_JENKINS_AGENT_DESC:
    'Service used when a Jenkins agent connects to the Jenkins master.',
  KS_SONARQUBE_POSTGRESQL_DESC:
    'The code quality analysis component is the backend database of SonarQube',
  KS_SONARQUBE_SONARQUBE_DESC: 'SonarQube core service',
  S2IOPERATOR_DESC:
    'The s2i controller provides full declaration period management for s2i',
  UC_JENKINS_UPDATE_CENTER_DESC:
    'Jenkins update center that provides installation packages for Jenkins plugins',
  WEBHOOK_SERVER_SERVICE_DESC:
    'Provides the default values and authentication webhook for S2I.',

  MYSQL_DESC:
    'An open-source database management system that allows users to manage relational databases. Data in these databases are structured or organized in the form of tables or columns, instead of being stored in one big storeroom',
  ETCD_DESC:
    'A reliable distributed data store that persistently stores the cluster configuration',
  TOWER_DESC: 'Tool used for network connection between clusters over proxy.',
  KUBE_SCHEDULER_SVC_DESC:
    'Kubernetes scheduler that assigns Pods to appropriate nodes.',
  KUBE_CONTROLLER_MANAGER_SVC_DESC:
    'Daemon that embeds the core control loops shipped with Kubernetes.',

  S2IOPERATOR_METRICS_SERVICE_DESC:
    'S2I monitoring service that provides basic monitoring data.',
  MINIO_DESC:
    'Open-source high performance object storage server ideal for storing massive unstructured data.',
  ALERTMANAGER_OPERATED_DESC:
    'Alertmanager service used for integrating Alertmanager with Prometheus.',
  ALERTMANAGER_MAIN_DESC: 'Alertmanager Web UI service.',
  NOTIFICATION_MANAGER_SVC_DESC:
    'Provides interfaces for sending notifications such as emails, WeChat messages, and Slack messages.',
  NOTIFICATION_MANAGER_CONTROLLER_METRICS_DESC:
    'Provides internal monitoring data for Notification Manager Controller.',
  HYPERPITRIX_DESC:
    'A component that provides the App Store service for Helm-based applications and lifecycle management of apps',
  JAEGER_OPERATOR_METRICS_DESC: 'Provides monitoring metrics for Operator.',
  LOGSIDECAR_INJECTOR_ADMISSION_DESC:
    'Automatically injects sidecar containers into Pods for disk log collection.',
  KS_EVENTS_ADMISSION_DESC:
    'Provides the authentication webhook for event rule management.',
  KS_EVENTS_RULER_DESC:
    'Event rule engine service that provides filtering and alerting features.',
  KS_CONTROLLER_MANAGER_DESC:
    'Implements service logic. This component creates permissions when a workspace is created and generates Istio configuration for service strategies.',
  KUBE_AUDITING_WEBHOOK_SVC_DESC:
    'Used for audit collection, comparison, persistence, and alerting.',
}
