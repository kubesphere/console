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
  // Navigation pane
  MONITORING_AND_ALERTING: '모니터링 및 알림',
  // Banner
  CLUSTER_STATUS: '클러스터 상태',
  MONITORING_CLUSTER_DESC: '클러스터 상태는 클러스터 리소스의 개요와 세부 정보를 표시합니다. 모니터링 데이터와 클러스터 리소스의 사용량 순위를 볼 수 있습니다.',
  // Overview > Cluster Node Status
  CLUSTER_NODE_STATUS: '클러스터 노드 상태',
  ALL_NODES: '모든 노드',
  ONLINE_NODES: '온라인 노드',
  NODE_ONLINE_STATUS: '노드 온라인 상태',
  TIMES_PER_SECOND: '횟수/초',
  // Overview > Component Status
  COMPONENT_STATUS: '구성요소 상태',
  CONTROLLER_MANAGER: '컨트롤러 관리자',
  KUBERNETES_SCHEDULER: 'Kubernetes 스케줄러',
  // Overview > Cluster Resource Usage
  CLUSTER_RESOURCE_USAGE: '클러스터 리소스 사용량',
  POD_COUNT: '파드',
  COUNT: 'Count',
  PODS: '파드',
  // Overview > etcd Monitoring
  SERVICE_STATUS: '서비스 상태',
  ETCD_MONITORING: 'etcd 모니터링',
  DB_SIZE: 'DB 크기',
  RAFT_PROPOSAL: 'Raft Proposal',
  ETCD_STATUS: '서비스 <span>상태</span>',
  ETCD_PROPOSAL: 'Raft <span>Proposal</span>',
  ETCD_DB_SIZE: 'DB <span>크기</span>',
  ETCD_CLIENT_TRAFFIC: '클라이언트 <span>트래픽</span>',
  TITLE_UNIT: '{title} ({unit})',
  AVERAGE: '평균',
  PROPOSAL_COMMITTED: '커밋',
  PROPOSAL_APPLIED: '적용',
  PROPOSAL_FAILED: '실패',
  PROPOSAL_PENDING: '대기 중',
  // Overview > Service Component Monitoring
  SERVICE_COMPONENT_MONITORING: '서비스 구성요소 모니터링',
  SCHEDULE_ATTEMPTS: '스케줄링 시도',
  SCHEDULING_RATE: '스케줄링률',
  REQUEST: '요청',
  REQUEST_PER_SECOND: '초당 요청 수',
  SCHEDULER: '스케줄러',
  TOTAL_AVERAGE: '전체',
  SUCCESS: '성공',
  ERROR: '오류',
  FAILURE: '실패',
  REQUEST_LATENCY_TCAP: '요청 <span>지연</span>',
  REQUEST_RATE: '요청 <span>률</span>',
  SCHEDULE_ATTEMPTS_TCAP: '스케줄링 <span>시도</span>',
  SCHEDULING_RATE_TCAP: '스케줄링 <span>률</span>',
  API_SERVER: 'API 서버',
  // Physical Resource Monitoring
  SELECT_TIME_RANGE: '시간 범위를 선택하세요.',
  LAST_TIME: '최근 {value}',
  LAST_TIME_M: '{num, plural, =1 {최근 1 분} other{최근 # 분}}',
  LAST_TIME_H: '{num, plural, =1 {최근 1 시간} other{최근 # 시간}}',
  LAST_TIME_D: '{num, plural, =1 {최근 1 일} other{최근 # 일}}',
  TIMERANGE_SELECTOR_MSG: '종료 시간은 시작 시간 이후여야 합니다.',
  TIMERANGE_SELECTOR_ERROR_MSG: '선택한 시간 범위가 적절한지 확인하십시오!',
  PHYSICAL_RESOURCES_MONITORING: '물리 리소스 모니터링',
  INODE_USAGE: 'Inode 사용량',
  DISK_USAGE: '디스크 사용량',
  DISK_USAGE_DETAILS: '디스크 사용량 상세',
  AVERAGE_CPU_LOAD: '평균 CPU 로드',
  DISK_THROUGHPUT: '디스크 처리량',
  POD_STATUS: '파드 상태',
  COMPLETED: '완료',
  WARNING: '주의',
  READ: '읽기',
  WRITE: '쓰기',
  RUNNING: '실행 중',
  // Physical Resource Monitoring > Average CPU Load
  TIME_M: '{num, plural, =1 {1 분} other{# 분}}',
  TIME_H: '{num, plural, =1 {1 시간} other{# 시간}}',
  TIME_D: '{num, plural, =1 {1 일} other{# 일}}',
  // etcd Monitoring
  EXTERNAL_ETCD: '외부 etcd',
  DB_FSYNC: 'DB Fsync',
  GRPC_STREAM_MESSAGES: 'gRPC 스트림 메시지',
  CLIENT_TRAFFIC: '클라이언트 트래픽',
  RECEIVED: '수신됨',
  SENT: '전송됨',
  WAL_FSYNC: 'WAL Fsync',
  ETCD_LEADER_TITLE: 'Leader 존재',
  ETCD_CHANGES_TITLE: '1시간 이내에 Leader 교체 예정',
  NODE_IP_ADDRESS_VALUE: '노드 IP 주소: {value}',
  // API Server Monitoring
  API_SERVER_MONITORING: 'API 서버 모니터링',
  REQUEST_LATENCY: '요청 지연 시간',
  REQUEST_LATENCY_MS: '요청 지연 시간 (ms)',
  REST_CREATE: 'CREATE',
  REST_DELETE: 'DELETE',
  REST_DELETECOLLECTION: 'DELETECOLLECTION',
  REST_GET: 'GET',
  REST_POST: 'POST',
  REST_PATCH: 'PATCH',
  REST_PUT: 'PUT',
  REST_UPDATE: 'UPDATE',
  REST_LIST: 'LIST',
  // Scheduler Monitoring
  SCHEDULER_MONITORING: '스케줄러 모니터링',
  SCHEDULING_LATENCY: '스케줄링 지연 시간',
  // Resource Usage Ranking
  RESOURCE_USAGE_RANKING: '리소스 사용 순위',
  SORT_BY_NODE_CPU_UTILISATION: 'CPU 사용량 순 (%)',
  SORT_BY_NODE_MEMORY_UTILISATION: '메모리 사용량 순 (%)',
  SORT_BY_NODE_DISK_SIZE_UTILISATION: '디스크 사용량 순 (%)',
  SORT_BY_NODE_POD_UTILISATION: '파드 사용량 순',
  SORT_BY_NODE_DISK_INODE_UTILISATION: 'inode 사용량 순',
  SORT_BY_NODE_LOAD1: '1분 CPU 평균 로드 순',
  SORT_BY_NAMESPACE_MEMORY_USAGE_WO_CACHE: '메모리 사용량 순',
  POD_USAGE: '파드 사용량',
  EXPORT: '내보내기'
};