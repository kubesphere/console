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
  'All Components': 'Todos los componentes',
  components: 'componentes',
  Components: 'Componentes',
  'Installed Components': 'Componentes instalados',
  'Instance Count': 'Recuento de instancias',
  'Not Installed Components': 'Componentes no instalados',
  'Running Status': 'Estado de ejecución',
  'Service Details': 'Detalles del servicio',
  SERVICE_COMPONENTS_DESC:
    'Este módulo monitorea el estado de varios componentes del servicio en KubeSphere, Kubernetes, OpenPitrix, etc. Muestra el estado de mantenimiento y el tiempo de ejecución del clúster actual, y ayuda a los usuarios a monitorear el estado del clúster y localizar problemas a tiempo.',
  'KS-ACCOUNT_DESC':
    'Proporciona la API de administración de usuarios y autorizaciones.',
  'KS-APIGATEWAY_DESC':
    'Responsable de procesar solicitudes de servicio y manejar todas las tareas en el proceso de llamada a la API',
  'KS-APISERVER_DESC':
    'Sirve los puntos finales API REST y proporciona la interfaz para el estado compartido del clúster a través del cual interactúan todos los demás componentes, así como el control de seguridad del clúster',
  'KS-CONSOLE_DESC': 'Proporciona servicios de consola para KubeSphere.',
  OPENLDAP_DESC:
    'Responsable del almacenamiento centralizado y la gestión de la información de la cuenta del usuario.',
  REDIS_DESC:
    'Responsable del almacén de estructura de datos en memoria, utilizado como base de datos, caché y agente de mensajes',
  COREDNS_DESC: 'DNS y descubrimiento de servicios en el clúster',
  'KUBE-CONTROLLER-MANAGER_DESC':
    'Un demonio que incorpora los bucles de control central enviados con Kubernetes',
  'KUBE-SCHEDULER_DESC':
    'El planificador de Kubernetes que conecta el Pod al nodo apropiado',
  'METRICS-SERVER_DESC':
    'Recopile métricas de la API de resumen, expuesta por Kubelet en cada nodo',
  'TILLER-DEPLOY_DESC':
    'Servidor de helm, interactúa directamente con el servidor API de Kubernetes para instalar, actualizar, consultar y eliminar recursos de Kubernetes',
  'OPENPITRIX-API-GATEWAY_DESC':
    'Responsable de procesar solicitudes de servicio de plataforma y manejar todas las tareas en el proceso de llamada API',
  'OPENPITRIX-APP-MANAGER_DESC':
    'Proporciona la gestión del ciclo de vida de las aplicaciones de OpenPitrix.',
  'OPENPITRIX-CATEGORY-MANAGER_DESC':
    'Proporciona gestión de clasificación de aplicaciones en OpenPitrix',
  'OPENPITRIX-CLUSTER-MANAGER_DESC':
    'Proporciona gestión del ciclo de vida del clúster (instancia) en OpenPitrix',
  'OPENPITRIX-DB_DESC': 'Servicio de base de datos OpenPitrix',
  'OPENPITRIX-ETCD_DESC':
    'Un almacén de valores clave distribuido que proporciona una forma confiable de almacenar datos en un grupo de máquinas',
  'OPENPITRIX-IAM-SERVICE_DESC':
    'Controle quién está autenticado (conectado) y autorizado (tiene permisos) para usar recursos',
  'OPENPITRIX-JOB-MANAGER_DESC':
    'Ejecuta la acción del ciclo de vida de la instancia de la aplicación OpenPitrix.',
  'OPENPITRIX-MINIO_DESC':
    'Proporciona servicios de almacenamiento de objetos para almacenar datos no estructurados.',
  'OPENPITRIX-REPO-INDEXER_DESC':
    'Proporciona el servicio de indexación de repositorio de aplicaciones de OpenPitrix',
  'OPENPITRIX-REPO-MANAGER_DESC':
    'Proporciona la gestión del repositorio de aplicaciones de OpenPitrix',
  'OPENPITRIX-RUNTIME-MANAGER_DESC':
    'Proporciona gestión de tiempo de ejecución en la nube en la plataforma.',
  'OPENPITRIX-TASK-MANAGER_DESC':
    'Ejecuta subtareas del ciclo de vida de la instancia de la aplicación OpenPitrix Acción',
  'ISTIO-CITADEL_DESC':
    'Comunicación entre servicios y autenticación de usuario final con gestión de identidad y credenciales incorporada',
  'ISTIO-GALLEY_DESC':
    'Componente de validación de configuración, ingestión, procesamiento y distribución de Istio',
  'ISTIO-INGRESSGATEWAY_DESC':
    'Puerta de enlace para proporcionar acceso a la red externa',
  'ISTIO-PILOT_DESC':
    'Proporciona descubrimiento de servicio para los sidecars de Envoy, capacidades de gestión de tráfico para enrutamiento inteligente',
  'ISTIO-POLICY_DESC':
    'Admite controles de acceso, límites y cuotas para el enviado',
  'ISTIO-SIDECAR-INJECTOR_DESC':
    'Inyecta automáticamente el sidecar para configurar el pod',
  'ISTIO-TELEMETRY_DESC':
    'Proporciona a Envoy servicios de informes de datos y recopilación de registros.',
  'JAEGER-COLLECTOR_DESC':
    'Recopila los datos del sidecar, el sidecar de istio es jaeger-agent',
  'JAEGER-COLLECTOR-HEADLESS_DESC':
    'Recopila los datos del sidecar, el sidecar de istio es jaeger-agent',
  'JAEGER-OPERATOR_DESC':
    'Responsable de crear el servicio jaeger y aplicarlo automáticamente al servicio jaeger cuando se actualiza',
  'JAEGER-QUERY_DESC': 'Sirve los puntos finales API y un servicio de IU',
  'KUBE-STATE-METRICS_DESC':
    'Escucha el servidor API de Kubernetes y genera métricas sobre el estado de los objetos.',
  'NODE-EXPORTER_DESC':
    'Exportador de Prometheus para métricas de hardware y sistema operativo',
  'PROMETHEUS-K8S_DESC':
    'Proporciona datos de monitoreo para nodos, workload y objetos API',
  'PROMETHEUS-K8S-SYSTEM_DESC':
    'Proporciona datos de monitoreo para componentes de Kubernetes como etcd, coredns, kube-apiserver, kube-scheduler, kube-controller-manager',
  'PROMETHEUS-OPERATED_DESC':
    'El servicio para todas las instancias de Prometheus solo para uso interno de Prometheus Operator',
  'PROMETHEUS-OPERATOR_DESC':
    'Operador para gestionar instancias de Prometheus',
  'ELASTICSEARCH-LOGGING-DATA_DESC':
    'Proporciona almacenamiento, copia de seguridad, búsqueda y otros servicios de datos de Elasticsearch.',
  'ELASTICSEARCH-LOGGING-DISCOVERY_DESC':
    'Proporciona servicios de gestión de clúster Elasticsearch.',
  'LOGSIDECAR-INJECTOR_DESC':
    'Recoge contenedores Sidecar para los Pods especificados automáticamente inyectados en el registro de caída',
  'CONTROLLER-MANAGER-METRICS-SERVICE_DESC':
    'Proporciona datos de monitoreo para el controlador s2i',
  'KS-JENKINS_DESC':
    'Servicio principal de Jenkins, que proporciona funciones básicas de DevOps',
  'KS-JENKINS-AGENT_DESC':
    'El servicio que utiliza el agente Jenkins se conecta al maestro Jenkins.',
  'KS-SONARQUBE-POSTGRESQL_DESC':
    'El componente de análisis de calidad de código es la base de datos de SonarQube',
  'KS-SONARQUBE-SONARQUBE_DESC': 'Servicio principal de SonarQube',
  S2IOPERATOR_DESC:
    'El controlador s2i proporciona una gestión completa del período de declaración para s2i',
  'UC-JENKINS-UPDATE-CENTER_DESC':
    'Centro de actualización de Jenkins que proporciona paquetes de instalación para complementos de Jenkins',
  'WEBHOOK-SERVER-SERVICE_DESC':
    'Proporciona valores predeterminados y valida el webhook para s2i',

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
