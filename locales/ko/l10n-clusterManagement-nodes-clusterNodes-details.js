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
  ATTRIBUTES: '속성',
  ARCHITECTURE: '아키텍처',
  OS_VERSION: 'OS 버전',
  OS_TYPE: 'OS 유형',
  LINUX: 'Linux',
  KERNEL_VERSION: '커널 버전',
  CONTAINER_RUNTIME: '컨테이너 런타임',
  KUBELET_VERSION: 'kubelet 버전',
  KUBE_PROXY_VERSION: 'kube-proxy 버전',
  IP_ADDRESS: 'IP 주소',
  SCHEDULABLE: '스케줄링 가능',
  YES: '예',
  // More > Edit Labels
  EDIT_LABELS: '레이블 편집',
  LABEL_PL: '레이블',
  // More > Edit Taints
  TAINTS: '테인트',
  EDIT_TAINTS: '테인트 편집',
  TAINTS_DESC: '노드에 테인트를 추가하여 파드가 노드에 스케줄링 되지 않도록 하거나 가능한 경우 노드에 스케줄링 되지 않도록 합니다. 노드에 테인트를 추가한 후 파드에 허용 오차를 설정하여 특정 테인트가 설정 된 노드로 \b파드를 스케줄링 할 수 있습니다.',
  COMMON_TAINTS: '공통 테인트',
  NOSCHEDULE: '스케줄링 방지',
  PREFER_NOSCHEDULE: '가능한 스케줄링하지 않음',
  NOEXECUTE: '스케줄링 방지 및 기존 파드 제거',
  TAINT_SELECT_TIPS: '공통 테인트 가입',
  TAINTS_TIPS: '<b>스케줄링 방지 </b><br />모든 파드가 노드에 스케줄링 되지 않도록 합니다.<br /><br /><b>가능한 경우 스케줄링 방지</b><br />가능한 경우 모든 파드가 노드로 스케줄링 되는 것을 방지합니다.<br /><br /><b>스케줄링을 방지하고 기존 파드를 제거합니다. </b><br />모든 파드가 노드로 스케줄링 되지 않도록 하고 노드의 기존 파드를 모두 제거합니다.',
  TAINT_DELETE_TIP: '테인트 삭제',
  // Running Status > Resource Usage
  RESOURCE_USAGE: '리소스 사용량',
  MAXIMUM_PODS: '최대 파드 수',
  MAXIMUM_PODS_SCAP: '최대 파드 수',
  DISK_USAGE_SCAP: '디스크 사용량',
  // Running Status > Allocated resources
  MEMORY_REQUEST_SCAP: '메모리 요청',
  MEMORY_LIMIT_SCAP: '메모리 제한',
  CPU_REQUEST_SCAP: 'CPU 요청',
  CPU_LIMIT_SCAP: 'CPU 제한',
  // Running Status > Allocated Resources
  ALLOCATED_RESOURCES: '할당된 리소스',
  // Running Status > Health Status
  RUNNING_STATUS: '실행 상태',
  HEALTH_STATUS: '건상 상태',
  NODE_NETWORKUNAVAILABLE: '네트워크 가용성',
  NODE_NETWORKUNAVAILABLE_DESC: '노드의 네트워크 상태가 정상인지 여부를 나타냅니다.',
  NODE_MEMORYPRESSURE: '메모리 압박',
  NODE_MEMORYPRESSURE_DESC: '노드의 남은 메모리가 임계값보다 작은지 여부를 나타냅니다.',
  NODE_DISKPRESSURE: '디스크 압박',
  NODE_DISKPRESSURE_DESC: '노드의 남은 디스크 공간 또는 남은 inode가 임계값보다 작은지 여부를 나타냅니다.',
  NODE_PIDPRESSURE: 'PID 압박',
  NODE_PIDPRESSURE_DESC: '노드에서 생성 가능한 프로세스 수가 임계값보다 작은지 여부를 나타냅니다.',
  NODE_READY: 'Readiness',
  NODE_READY_DESC: '노드가 파드를 생성할 준비가 되었는지 여부를 나타냅니다.',
  LAST_HEARTBEAT_VALUE: '마지막 Heartbeat: {value}',
  // Running Status > Taints
  NO_TAINTS_TIPS: '테인트를 찾을 수 없음.',
  POLICY: '정책',
  // Pods
  READY_VALUE: '준비: {readyCount}/{total}',
  STATUS_VALUE: '상태: {value}',
  // Metadata
  // Monitoring
  USAGE: '사용량',
  OUT: 'Out',
  IN: 'In'
};