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
  SYSTEM_COMPONENT_PL: 'Systemkomponenten',
  SERVICE_COMPONENTS_DESC: 'Systemkomponenten sind Softwarekomponenten im KubeSphere-System, die verschiedene Funktionen bereitstellen. Auf dieser Seite können Sie den Ausführungsstatus von Dienstkomponenten ansehen.',
  // KubeSphere
  STOPPED: 'Gestoppt',
  RUNNING_TIME: 'Laufzeit',
  KS_CONSOLE_DESC: 'Stellt KubeSphere-Konsolendienste bereit.',
  KS_APISERVER_DESC: 'Stellt REST-APIs für die Clusterverwaltung bereit. Diese Komponente wird auch für die Kommunikation zwischen Cluster-Komponenten und der Cluster-Sicherheitssteuerung verwendet.',
  OPENLDAP_DESC: 'Speichert und verwaltet Benutzerinformationen auf zentrale Weise.',
  REDIS_DESC: 'Open-source, in-memory data structure store, which is used as a database, cache, and message broker.',
  TOWER_DESC: 'Tool für die Netzwerkverbindung zwischen Clustern über Proxy.',
  KS_CONTROLLER_MANAGER_DESC: 'Implementiert Dienstlogik. Diese Komponente erstellt Berechtigungen, wenn ein Arbeitsbereich erstellt wird, und generiert eine Istio-Konfiguration für Servicestrategien.',
  // Kubernetes
  COREDNS_DESC: 'Stellt die Service Discovery Funktion für den Kubernetes Cluster zur Verfügung.',
  METRICS_SERVER_DESC: 'Kubernetes Monitoring Komponente, die Metriken von kubelet von jeder Node sammelt.',
  KUBE_SCHEDULER_DESC: 'Kubernetes scheduler that assigns pods to appropriate nodes.',
  KUBE_SCHEDULER_SVC_DESC: 'Kubernetes scheduler that assigns pods to appropriate nodes.',
  KUBE_CONTROLLER_MANAGER_SVC_DESC: 'Daemon that embeds the core control loops shipped with Kubernetes.',
  // Istio
  JAEGER_COLLECTOR_DESC: 'Sammelt sidecar Daten. Der sidecar von Istio ist jaeger-agent.',
  JAEGER_COLLECTOR_HEADLESS_DESC: 'Sammelt sidecar Daten. Der sidecar von Istio ist jaeger-agent.',
  JAEGER_QUERY_DESC: 'Akzeptiert Abfrageanforderungen, ruft Traces aus dem Back-End-Speichersystem ab und zeigt die Daten auf der Web-Benutzeroberfläche an.',
  JAEGER_OPERATOR_METRICS_DESC: 'Stellt Überwachungsmetriken für den Betreiber bereit.',
  // Monitoring
  MONITORING: 'Überwachung',
  PROMETHEUS_K8S_DESC: 'Provides monitoring data of nodes, workloads, and API objects.',
  NODE_EXPORTER_DESC: 'Provides monitoring data of all cluster nodes for Prometheus.',
  KUBE_STATE_METRICS_DESC: 'Listens on the Kubernetes API server to obtain the status of cluster API objects such as nodes, workloads, and pods, and generates monitoring data for Prometheus.',
  PROMETHEUS_OPERATED_DESC: 'Service corresponding to all Prometheus instances, which is used internally by Prometheus Operator.',
  PROMETHEUS_OPERATOR_DESC: 'Manages Prometheus instances.',
  ALERTMANAGER_OPERATED_DESC: 'Alertmanager service used for integrating Alertmanager with Prometheus.',
  ALERTMANAGER_MAIN_DESC: 'Alertmanager Web UI service.',
  NOTIFICATION_MANAGER_SVC_DESC: 'Provides interfaces for sending notifications such as emails, WeChat messages, and Slack messages.',
  NOTIFICATION_MANAGER_CONTROLLER_METRICS_DESC: 'Provides internal monitoring data for Notification Manager Controller.',
  // Logging
  LOGGING: 'Logging',
  ELASTICSEARCH_LOGGING_DATA_DESC: 'Provides Elasticsearch services such as data storage, backup, and searching.',
  ELASTICSEARCH_LOGGING_DISCOVERY_DESC: 'Provides Elasticsearch cluster management services.',
  LOGSIDECAR_INJECTOR_ADMISSION_DESC: 'Automatically injects sidecar containers into pods for disk log collection.',
  KS_EVENTS_ADMISSION_DESC: 'Provides the authentication webhook for event rule management.',
  KS_EVENTS_RULER_DESC: 'Event rule engine service that provides filtering and alerting features.',
  KUBE_AUDITING_WEBHOOK_SVC_DESC: 'Used for audit collection, comparison, persistence, and alerting.',
  // DevOps
  S2IOPERATOR_METRICS_SERVICE_DESC: 'S2I monitoring service that provides basic monitoring data.',
  WEBHOOK_SERVER_SERVICE_DESC: 'Provides the default values and authentication webhook for S2I.'
};