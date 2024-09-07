/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  SYSTEM_COMPONENT_PL: 'System Components',
  SERVICE_COMPONENTS_DESC:
    'System components are software components in the KubeSphere system, which provide various functions. You can view the running status of services components on this page.',
  // KubeSphere
  STOPPED: 'Stopped',
  RUNNING_TIME: 'Running time',
  KS_CONSOLE_DESC: 'Provides KubeSphere console services.',
  KS_APISERVER_DESC:
    'Provides REST APIs for cluster management. This component is also used for communication between cluster components and cluster security control.',
  OPENLDAP_DESC: 'Stores and manages user information in a centralized manner.',
  REDIS_DESC:
    'Open-source, in-memory data structure store, which is used as a database, cache, and message broker.',
  TOWER_DESC: 'Tool used for network connection between clusters over proxy.',
  KS_CONTROLLER_MANAGER_DESC:
    'Implements service logic. This component creates permissions when a workspace is created and generates Istio configuration for service strategies.',
  // Kubernetes
  COREDNS_DESC: 'Provides the service discovery function for the Kubernetes cluster.',
  METRICS_SERVER_DESC:
    'Kubernetes monitoring component that collects metrics from kubelet of each node.',
  KUBE_SCHEDULER_DESC: 'Kubernetes scheduler that assigns pods to appropriate nodes.',
  KUBE_SCHEDULER_SVC_DESC: 'Kubernetes scheduler that assigns pods to appropriate nodes.',
  KUBE_CONTROLLER_MANAGER_SVC_DESC:
    'Daemon that embeds the core control loops shipped with Kubernetes.',
  // Istio
  JAEGER_COLLECTOR_DESC: 'Collects sidecar data. The sidecar of Istio is jaeger-agent.',
  JAEGER_COLLECTOR_HEADLESS_DESC: 'Collects sidecar data. The sidecar of Istio is jaeger-agent.',
  JAEGER_QUERY_DESC:
    'Accepts query requests, retrieves traces from the backend storage system, and displays the data on the web UI.',
  JAEGER_OPERATOR_METRICS_DESC: 'Provides monitoring metrics for Operator.',
  // Monitoring
  MONITORING: 'Monitoring',
  PROMETHEUS_K8S_DESC: 'Provides monitoring data of nodes, workloads, and API objects.',
  NODE_EXPORTER_DESC: 'Provides monitoring data of all cluster nodes for Prometheus.',
  KUBE_STATE_METRICS_DESC:
    'Listens on the Kubernetes API server to obtain the status of cluster API objects such as nodes, workloads, and pods, and generates monitoring data for Prometheus.',
  PROMETHEUS_OPERATED_DESC:
    'Service corresponding to all Prometheus instances, which is used internally by Prometheus Operator.',
  PROMETHEUS_OPERATOR_DESC: 'Manages Prometheus instances.',
  ALERTMANAGER_OPERATED_DESC:
    'Alertmanager service used for integrating Alertmanager with Prometheus.',
  ALERTMANAGER_MAIN_DESC: 'Alertmanager Web UI service.',
  NOTIFICATION_MANAGER_SVC_DESC:
    'Provides interfaces for sending notifications such as emails, WeChat messages, and Slack messages.',
  NOTIFICATION_MANAGER_CONTROLLER_METRICS_DESC:
    'Provides internal monitoring data for Notification Manager Controller.',
  // Logging
  LOGGING: 'Logging',
  ELASTICSEARCH_LOGGING_DATA_DESC:
    'Provides Elasticsearch services such as data storage, backup, and searching.',
  ELASTICSEARCH_LOGGING_DISCOVERY_DESC: 'Provides Elasticsearch cluster management services.',
  LOGSIDECAR_INJECTOR_ADMISSION_DESC:
    'Automatically injects sidecar containers into pods for disk log collection.',
  KS_EVENTS_ADMISSION_DESC: 'Provides the authentication webhook for event rule management.',
  KS_EVENTS_RULER_DESC: 'Event rule engine service that provides filtering and alerting features.',
  KUBE_AUDITING_WEBHOOK_SVC_DESC:
    'Used for audit collection, comparison, persistence, and alerting.',
  // DevOps
  S2IOPERATOR_METRICS_SERVICE_DESC: 'S2I monitoring service that provides basic monitoring data.',
  WEBHOOK_SERVER_SERVICE_DESC: 'Provides the default values and authentication webhook for S2I.',
};
