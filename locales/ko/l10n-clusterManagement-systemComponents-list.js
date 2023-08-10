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
  SYSTEM_COMPONENT_PL: '시스템 구성 요소',
  SERVICE_COMPONENTS_DESC: '시스템 구성 요소는 다양한 기능을 제공하는 KubeSphere 시스템의 소프트웨어 구성 요소입니다. 이 페이지에서 서비스 구성 요소의 실행 상태를 볼 수 있습니다.',
  // KubeSphere
  STOPPED: '중지됨',
  RUNNING_TIME: '실행 시간',
  KS_CONSOLE_DESC: 'KubeSphere 콘솔 서비스를 제공합니다.',
  KS_APISERVER_DESC: '클러스터 관리를 위한 REST API를 제공합니다. 이 구성 요소는 클러스터 구성 요소와 클러스터 보안 제어 간의 통신에도 사용됩니다.',
  OPENLDAP_DESC: '사용자 정보를 중앙 집중식으로 저장하고 관리합니다.',
  REDIS_DESC: '데이터베이스, 캐시 및 메시지 브로커로 사용되는 오픈 소스, 메모리 내 데이터 구조 저장소입니다.',
  TOWER_DESC: '프록시를 통한 클러스터 간의 네트워크 연결에 사용되는 도구입니다.',
  KS_CONTROLLER_MANAGER_DESC: '서비스 로직을 구현합니다. 이 구성 요소는 워크스페이스가 생성될 때 사용 권한을 생성하고 서비스 전략에 대한 Istio 구성을 생성합니다.',
  // Kubernetes
  COREDNS_DESC: 'Kubernetes 클러스터에 대한 서비스 검색 기능을 제공합니다.',
  METRICS_SERVER_DESC: '각 노드의 kubelet에서 메트릭을 수집하는 Kubernetes 모니터링 구성 요소입니다.',
  KUBE_SCHEDULER_DESC: '적절한 노드에 파드를 할당하는 Kubernetes 스케줄러',
  KUBE_SCHEDULER_SVC_DESC: '적절한 노드에 파드를 할당하는 Kubernetes 스케줄러입니다.',
  KUBE_CONTROLLER_MANAGER_SVC_DESC: 'Kubernetes와 함께 제공된 핵심 제어 루프를 내장한 데몬입니다.',
  // Istio
  JAEGER_COLLECTOR_DESC: '사이드카 데이터를 수집합니다. Istio의 사이드카는 jaeger-agent입니다.',
  JAEGER_COLLECTOR_HEADLESS_DESC: '사이드카 데이터를 수집합니다. Istio의 사이드카는 jaeger-agent입니다.',
  JAEGER_QUERY_DESC: '쿼리 요청을 수락하고, 백엔드 스토리지 시스템에서 추적을 검색하고, 웹 UI에 데이터를 표시합니다.',
  JAEGER_OPERATOR_METRICS_DESC: '운영자에게 모니터링 메트릭을 제공합니다.',
  // Monitoring
  MONITORING: '모니터링',
  PROMETHEUS_K8S_DESC: '노드, 워크로드 및 API 개체의 모니터링 데이터를 제공합니다.',
  NODE_EXPORTER_DESC: 'Prometheus에 모든 클러스터 노드의 모니터링 데이터를 제공합니다.',
  KUBE_STATE_METRICS_DESC: 'Kubernetes API 서버에서 노드, 워크로드, 파드 등의 클러스터 API 개체의 상태를 확인하고 Prometeus에서 사용할 모니터링 데이터를 생성합니다.',
  PROMETHEUS_OPERATED_DESC: '모든 Prometheus 인스턴스에 해당하는 서비스로, Prometheus Operator에서 사용합니다.',
  PROMETHEUS_OPERATOR_DESC: 'Prometeus 인스턴스를 관리합니다.',
  ALERTMANAGER_OPERATED_DESC: 'Alertmanager와 Prometheus를 통합하는 데 사용되는 Alertmanager 서비스입니다.',
  ALERTMANAGER_MAIN_DESC: 'Alertmanager 웹 UI 서비스입니다.',
  NOTIFICATION_MANAGER_SVC_DESC: '이메일, WeChat 메시지 및 Slack 메시지와 같은 메시지 프로그램에 알림을 보내기 위한 인터페이스를 제공합니다.',
  NOTIFICATION_MANAGER_CONTROLLER_METRICS_DESC: 'Notification Manager 컨트롤러에 내부 모니터링 데이터를 제공합니다.',
  // Logging
  LOGGING: '로깅',
  ELASTICSEARCH_LOGGING_DATA_DESC: '데이터 저장, 백업 및 검색과 같은 ElasticSearch 서비스를 제공합니다.',
  ELASTICSEARCH_LOGGING_DISCOVERY_DESC: 'ElasticSearch의 클러스터 관리 서비스를 제공합니다.',
  LOGSIDECAR_INJECTOR_ADMISSION_DESC: '디스크 로그 수집을 위해 사이드카 컨테이너를 파드에 자동으로 주입합니다.',
  KS_EVENTS_ADMISSION_DESC: '이벤트 규칙 관리를 위한 인증 Webhook을 제공합니다.',
  KS_EVENTS_RULER_DESC: '필터링 및 알림 기능을 제공하는 이벤트 규칙 엔진 서비스입니다.',
  KUBE_AUDITING_WEBHOOK_SVC_DESC: '감사 수집, 비교, 퍼시스턴스 및 알림에 사용됩니다.',
  // DevOps
  S2IOPERATOR_METRICS_SERVICE_DESC: '기본 모니터링 데이터를 제공하는 S2I 모니터링 서비스입니다.',
  WEBHOOK_SERVER_SERVICE_DESC: 'S2I에 대한 기본값 및 인증 webhook을 제공합니다.'
};