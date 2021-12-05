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
  'Not Installed Components': 'Not Installed Components',
  KS_ACCOUNT_DESC: 'Provides users and authorizations management API',
  KS_APIGATEWAY_DESC: 'Responsible for processing service requests and handling all tasks in the API call process.',
  TILLER_DEPLOY_DESC: 'Helm server, interacts directly with the Kubernetes API server to install, upgrade, query, and remove Kubernetes resources',
  OPENPITRIX_API_GATEWAY_DESC: 'Responsible for processing platform service requests and handling all tasks in the API call process',
  OPENPITRIX_APP_MANAGER_DESC: 'Provides OpenPitrix\'s application lifecycle management',
  OPENPITRIX_CATEGORY_MANAGER_DESC: 'Provides application classification management in OpenPitrix',
  OPENPITRIX_CLUSTER_MANAGER_DESC: 'Provides cluster (instance) lifecycle management in OpenPitrix',
  OPENPITRIX_DB_DESC: 'OpenPitrix database service',
  OPENPITRIX_ETCD_DESC: 'A distributed key value store that provides a reliable way to store data across a cluster of machines',
  OPENPITRIX_IAM_SERVICE_DESC: 'Control who is authenticated (signed in) and authorized (has permissions) to use resources',
  OPENPITRIX_JOB_MANAGER_DESC: 'Executes the OpenPitrix application instance lifecycle Action',
  OPENPITRIX_MINIO_DESC: 'Provides object storage services for storing unstructured data',
  OPENPITRIX_REPO_INDEXER_DESC: 'Provides OpenPitrix\'s App Repository Indexing Service',
  OPENPITRIX_REPO_MANAGER_DESC: 'Provides OpenPitrix\'s App Repository Management',
  OPENPITRIX_RUNTIME_MANAGER_DESC: 'Provides cloud runtime management in the platform',
  OPENPITRIX_TASK_MANAGER_DESC: 'Executes sub-tasks of the OpenPitrix application instance lifecycle Action',
  ISTIO_CITADEL_DESC: 'Service-to-service and end-user authentication with built-in identity and credential management',
  ISTIO_GALLEY_DESC: 'Istio\'s configuration validation, ingestion, processing and distribution component',
  ISTIO_INGRESSGATEWAY_DESC: 'Provides a gateway for external network access.',
  ISTIO_PILOT_DESC: 'Provides service discovery for the Envoy sidecars, traffic management capabilities for intelligent routing',
  ISTIO_POLICY_DESC: 'Supports access controls, rate limits and quotas for envoy',
  ISTIO_SIDECAR_INJECTOR_DESC: 'Automatically injects sidecar for configuring the pod',
  ISTIO_TELEMETRY_DESC: 'Provides Envoy with data reporting and log collection services',
  JAEGER_OPERATOR_DESC: 'Responsible for creating the jaeger service and automatically applying it to the jaeger service when update',
  PROMETHEUS_K8S_SYSTEM_DESC: 'Provides monitoring data for Kubernetes components such as etcd, coredns, kube-apiserver, kube-scheduler and kube-controller-manager',
  LOGSIDECAR_INJECTOR_DESC: 'Injects a sidecar container in a pod for disk log collection',
  CONTROLLER_MANAGER_METRICS_SERVICE_DESC: 'Provides monitoring data for the s2i controller',
  KS_JENKINS_DESC: 'Jenkins master service that provides basic DevOps functions.',
  KS_JENKINS_AGENT_DESC: 'Service used when a Jenkins agent connects to the Jenkins master.',
  KS_SONARQUBE_POSTGRESQL_DESC: 'The code quality analysis component is the backend database of SonarQube',
  KS_SONARQUBE_SONARQUBE_DESC: 'SonarQube core service',
  S2IOPERATOR_DESC: 'The s2i controller provides full declaration period management for s2i',
  UC_JENKINS_UPDATE_CENTER_DESC: 'Jenkins update center that provides installation packages for Jenkins plugins',
  MYSQL_DESC: 'An open-source database management system that allows users to manage relational databases. Data in these databases are structured or organized in the form of tables or columns, instead of being stored in one big storeroom',
  ETCD_DESC: 'A reliable distributed data store that persistently stores the cluster configuration',
  MINIO_DESC: 'Open-source high performance object storage server ideal for storing massive unstructured data.',
  HYPERPITRIX_DESC: 'A component that provides the App Store service for Helm-based applications and lifecycle management of apps'
};