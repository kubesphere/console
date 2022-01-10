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
  'Not Installed Components': 'Componentes no instalados',
  KS_ACCOUNT_DESC: 'Proporciona la API de administración de usuarios y autorizaciones.',
  KS_APIGATEWAY_DESC: 'Responsable de procesar solicitudes de servicio y manejar todas las tareas en el proceso de llamada a la API',
  TILLER_DEPLOY_DESC: 'Servidor de helm, interactúa directamente con el servidor API de Kubernetes para instalar, actualizar, consultar y eliminar recursos de Kubernetes',
  OPENPITRIX_API_GATEWAY_DESC: 'Responsable de procesar solicitudes de servicio de plataforma y manejar todas las tareas en el proceso de llamada API',
  OPENPITRIX_APP_MANAGER_DESC: 'Proporciona la gestión del ciclo de vida de las aplicaciones de OpenPitrix.',
  OPENPITRIX_CATEGORY_MANAGER_DESC: 'Proporciona gestión de clasificación de aplicaciones en OpenPitrix',
  OPENPITRIX_CLUSTER_MANAGER_DESC: 'Proporciona gestión del ciclo de vida del clúster (instancia) en OpenPitrix',
  OPENPITRIX_DB_DESC: 'Servicio de base de datos OpenPitrix',
  OPENPITRIX_ETCD_DESC: 'Un almacén de valores clave distribuido que proporciona una forma confiable de almacenar datos en un grupo de máquinas',
  OPENPITRIX_IAM_SERVICE_DESC: 'Controle quién está autenticado (conectado) y autorizado (tiene permisos) para usar recursos',
  OPENPITRIX_JOB_MANAGER_DESC: 'Ejecuta la acción del ciclo de vida de la instancia de la aplicación OpenPitrix.',
  OPENPITRIX_MINIO_DESC: 'Proporciona servicios de almacenamiento de objetos para almacenar datos no estructurados.',
  OPENPITRIX_REPO_INDEXER_DESC: 'Proporciona el servicio de indexación de repositorio de aplicaciones de OpenPitrix',
  OPENPITRIX_REPO_MANAGER_DESC: 'Proporciona la gestión del repositorio de aplicaciones de OpenPitrix',
  OPENPITRIX_RUNTIME_MANAGER_DESC: 'Proporciona gestión de tiempo de ejecución en la nube en la plataforma.',
  OPENPITRIX_TASK_MANAGER_DESC: 'Ejecuta subtareas del ciclo de vida de la instancia de la aplicación OpenPitrix Acción',
  ISTIO_CITADEL_DESC: 'Comunicación entre servicios y autenticación de usuario final con gestión de identidad y credenciales incorporada',
  ISTIO_GALLEY_DESC: 'Componente de validación de configuración, ingestión, procesamiento y distribución de Istio',
  ISTIO_INGRESSGATEWAY_DESC: 'Puerta de enlace para proporcionar acceso a la red externa',
  ISTIO_PILOT_DESC: 'Proporciona descubrimiento de servicio para los sidecars de Envoy, capacidades de gestión de tráfico para enrutamiento inteligente',
  ISTIO_POLICY_DESC: 'Admite controles de acceso, límites y cuotas para el enviado',
  ISTIO_SIDECAR_INJECTOR_DESC: 'Inyecta automáticamente el sidecar para configurar el pod',
  ISTIO_TELEMETRY_DESC: 'Proporciona a Envoy servicios de informes de datos y recopilación de registros.',
  JAEGER_OPERATOR_DESC: 'Responsable de crear el servicio jaeger y aplicarlo automáticamente al servicio jaeger cuando se actualiza',
  PROMETHEUS_K8S_SYSTEM_DESC: 'Proporciona datos de monitoreo para componentes de Kubernetes como etcd, coredns, kube-apiserver, kube-scheduler, kube-controller-manager',
  LOGSIDECAR_INJECTOR_DESC: 'Recoge contenedores Sidecar para los Pods especificados automáticamente inyectados en el registro de caída',
  CONTROLLER_MANAGER_METRICS_SERVICE_DESC: 'Proporciona datos de monitoreo para el controlador s2i',
  KS_JENKINS_DESC: 'Servicio principal de Jenkins, que proporciona funciones básicas de DevOps',
  KS_JENKINS_AGENT_DESC: 'El servicio que utiliza el agente Jenkins se conecta al maestro Jenkins.',
  KS_SONARQUBE_POSTGRESQL_DESC: 'El componente de análisis de calidad de código es la base de datos de SonarQube',
  KS_SONARQUBE_SONARQUBE_DESC: 'Servicio principal de SonarQube',
  S2IOPERATOR_DESC: 'El controlador s2i proporciona una gestión completa del período de declaración para s2i',
  UC_JENKINS_UPDATE_CENTER_DESC: 'Centro de actualización de Jenkins que proporciona paquetes de instalación para complementos de Jenkins',
  MYSQL_DESC: 'An open-source database management system that allows users to manage relational databases. Data in these databases are structured or organized in the form of tables or columns, instead of being stored in one big storeroom',
  ETCD_DESC: 'A reliable distributed data store that persistently stores the cluster configuration',
  MINIO_DESC: 'An open source high performance object storage server, which is useful to store massive unstructured data',
  HYPERPITRIX_DESC: 'A component that provides the App Store service for Helm-based applications and lifecycle management of apps'
};