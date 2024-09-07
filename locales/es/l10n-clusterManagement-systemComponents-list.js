/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  SYSTEM_COMPONENT_PL: 'Componentes',
  SERVICE_COMPONENTS_DESC:
    'Este módulo monitorea el estado de varios componentes del servicio en KubeSphere, Kubernetes, OpenPitrix, etc. Muestra el estado de mantenimiento y el tiempo de ejecución del clúster actual, y ayuda a los usuarios a monitorear el estado del clúster y localizar problemas a tiempo.',
  // KubeSphere
  STOPPED: 'Stopped',
  RUNNING_TIME: 'Tiempo de ejecución',
  KS_CONSOLE_DESC: 'Proporciona servicios de consola para KubeSphere.',
  KS_APISERVER_DESC:
    'Sirve los puntos finales API REST y proporciona la interfaz para el estado compartido del clúster a través del cual interactúan todos los demás componentes, así como el control de seguridad del clúster',
  OPENLDAP_DESC:
    'Responsable del almacenamiento centralizado y la gestión de la información de la cuenta del usuario.',
  REDIS_DESC:
    'Responsable del almacén de estructura de datos en memoria, utilizado como base de datos, caché y agente de mensajes',
  TOWER_DESC: 'A tool for network connection between clusters through an agent',
  KS_CONTROLLER_MANAGER_DESC:
    'A backend component that implements business logic. For example, it creates authorizations when a workspace is created and generates istio configurations for service strategies',
  // Kubernetes
  COREDNS_DESC: 'DNS y descubrimiento de servicios en el clúster',
  METRICS_SERVER_DESC: 'Recopile métricas de la API de resumen, expuesta por Kubelet en cada nodo',
  KUBE_SCHEDULER_DESC: 'El planificador de Kubernetes que conecta el Pod al nodo apropiado',
  KUBE_SCHEDULER_SVC_DESC:
    'The scheduler of Kubernetes that attaches the Pod to an appropriate node',
  KUBE_CONTROLLER_MANAGER_SVC_DESC:
    'A daemon that embeds the core control loops shipped with Kubernetes',
  // Istio
  JAEGER_COLLECTOR_DESC: 'Recopila los datos del sidecar, el sidecar de istio es jaeger-agent',
  JAEGER_COLLECTOR_HEADLESS_DESC:
    'Recopila los datos del sidecar, el sidecar de istio es jaeger-agent',
  JAEGER_QUERY_DESC: 'Sirve los puntos finales API y un servicio de IU',
  JAEGER_OPERATOR_METRICS_DESC: 'A component that provides the monitoring metrics of Operator',
  // Monitoring
  MONITORING: 'Monitorización',
  PROMETHEUS_K8S_DESC: 'Proporciona datos de monitoreo para nodos, workload y objetos API',
  NODE_EXPORTER_DESC: 'Exportador de Prometheus para métricas de hardware y sistema operativo',
  KUBE_STATE_METRICS_DESC:
    'Escucha el servidor API de Kubernetes y genera métricas sobre el estado de los objetos.',
  PROMETHEUS_OPERATED_DESC:
    'El servicio para todas las instancias de Prometheus solo para uso interno de Prometheus Operator',
  PROMETHEUS_OPERATOR_DESC: 'Operador para gestionar instancias de Prometheus',
  ALERTMANAGER_OPERATED_DESC:
    'The Alertmanager service that provides Alertmanager integrations, such as Prometheus',
  ALERTMANAGER_MAIN_DESC: 'The Alertmanager Web UI service',
  NOTIFICATION_MANAGER_SVC_DESC:
    'The Notification Manager service that provides the interface to send notifications, such as emails, WeChat and Slack messages',
  NOTIFICATION_MANAGER_CONTROLLER_METRICS_DESC:
    'A component that provides internal monitoring data services of Notification Manager Controller',
  // Logging
  LOGGING: 'Logging',
  ELASTICSEARCH_LOGGING_DATA_DESC:
    'Proporciona almacenamiento, copia de seguridad, búsqueda y otros servicios de datos de Elasticsearch.',
  ELASTICSEARCH_LOGGING_DISCOVERY_DESC:
    'Proporciona servicios de gestión de clúster Elasticsearch.',
  LOGSIDECAR_INJECTOR_ADMISSION_DESC:
    'A component that automatically injects sidecar containers for a specific pod for disk log collection',
  KS_EVENTS_ADMISSION_DESC:
    'A component that provides webhook authentication for Events rule management',
  KS_EVENTS_RULER_DESC:
    'The Events rule engine service that provides filtering and alerting features',
  KUBE_AUDITING_WEBHOOK_SVC_DESC:
    'A component used for auditing logs in terms of collection, comparison, persistence and alert',
  // DevOps
  S2IOPERATOR_METRICS_SERVICE_DESC:
    'The s2i monitoring service component that provides basic monitoring data',
  WEBHOOK_SERVER_SERVICE_DESC: 'Proporciona valores predeterminados y valida el webhook para s2i',
};
