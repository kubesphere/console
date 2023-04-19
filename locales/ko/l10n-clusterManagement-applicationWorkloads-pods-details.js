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
  // Attributes
  NODE_IP_ADDRESS: '노드 IP 주소',
  CLUSTER: '클러스터',
  // Resource Status > Containers
  CONTAINER_PL: '컨테이너',
  PROBE_PL: 'Probes',
  HOOK_PL: 'Hooks',
  // Resource Status > Containers > Container Logs
  CONTAINER_LOGS_NOT_SUPPORTED: '컨테이너가 실시간 로깅을 지원하지 않습니다. 나중에 다시 시도해 주세요.',
  CONTAINER_LOGS: '컨테이너 로그',
  // Resource Status > Details > Container Details > Attributes
  COMMAND: '명령어',
  IMAGE_ID: '이미지 ID',
  IMAGE_PULL_POLICY: '이미지 풀 정책',
  CONTAINER_DETAILS_PAGE_SCAP: '컨테이너 상세 페이지',
  CPU_VALUE: 'CPU: {value, plural, =1 {1 코어} other {# 코어}}',
  MEMORY_VALUE: '메모리: {value}',
  NVIDIA_COM_GPU_VALUE: 'GPU: {value}',
  // Resource Status > Details > Container Details > Terminal
  LOADING: '불러오는 중…',
  RESOURCE_LIMITS: '리소스 제한',
  RESOURCE_REQUESTS: '리소스 요청',
  TERMINAL: '터미널',
  // Resource Status > Details > Container Details > Resource Status
  RESTART_PL: '재시작',
  RESTART: '재시작',
  STORAGE_DEVICES: '스토리지 장치',
  LIVENESS_PROBE: 'Liveness Probe',
  READINESS_PROBE: 'Readiness Probe',
  STARTUP_PROBE: 'Startup Probe',
  REQUEST_TYPE: '요청 유형',
  // Resource Status > Details > Container Details > Monitoring
  // Resource Status > Details > Container Details > Environment Variables
  // Resource Status > Details > Container Details > Container Logs
  NO_LOG_DATA_FOUND: '로그 데이터를 찾을 수 없음',
  NO_LOG_DATA_FOUND_TIP: '로그 데이터를 찾을 수 없음.',
  // Resource Status > Volumes
  VOLUME_PL: '볼륨',
  TYPE_CONFIGMAP: '볼륨 유형: configmap',
  TYPE_SECRET: '볼륨 유형: secret',
  TYPE_EMPTYDIR: '볼륨 유형: emptyDir',
  TYPE_HOSTPATH: '볼륨 유형: host path',
  // Scheduling Information
  REASON_VALUE: '이유: {value}',
  MESSAGE_VALUE: '메시지: {value}',
  UPDATED_AT_VALUE: '업데이트 시간: {value}',
  // Metadata
  // Monitoring
  NO_MONITORING_DATA: '모니터링 데이터가 없습니다',
  OUTBOUND: '아웃바운드',
  INBOUND: '인바운드'
};