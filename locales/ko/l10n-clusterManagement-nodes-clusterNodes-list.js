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
  CLUSTER_NODE_PL: '클러스터 노드',
  CLUSTER_NODE: '클러스터 노드',
  CLUSTER_NODE_DESC: '클러스터 노드는 KubeSphere 클러스터의 기본 서버입니다. 이 페이지에서 클러스터 노드를 관리할 수 있습니다.',
  NODE_TYPES_Q: '클러스터 노드의 유형은 무엇입니까?',
  NODE_TYPES_A: '노드는 컨트롤 플레인 노드와 워커 노드로 분류됩니다.',
  WHAT_IS_NODE_TAINTS_Q: '노드 테인트란 무엇입니까?',
  WHAT_IS_NODE_TAINTS_A: '테인트는 노드가 특정한 파드를 거부할 수 있게 해줍니다. 테인트와 톨러레이션은 함께 작동하여 적절하지 않은 노드에 파드가 스케줄링되지 않도록 보장합니다.',
  LEARN_MORE: '더 알아보기',
  // Node Count
  NODE_SI: '노드',
  NODE_PL: '노드',
  MASTER_NODE_SI: '컨트롤 플레인 노드',
  MASTER_NODE_PL: '컨트롤 플레인 노드',
  WORKER_NODE_SI: '워커 노드',
  WORKER_NODE_PL: '워커 노드',
  // List
  KUBE_OPERATE: '정렬',
  KUBE_ASCENDING_ORDER: '오름차순',
  KUBE_DESCENDING_ORDER: '내림차순',
  KUBE_FILTER: '필터',
  SEARCH: '검색',
  ADD_NODE: '노드 추가',
  NODE_STATUS_UNSCHEDULABLE: '스케줄링 불가',
  NODE_STATUS_RUNNING: '실행 중',
  NODE_STATUS_WARNING: '주의',
  NODE_STATUS_PENDING: '생성 중',
  NODE_STATUS_FAILED: '실패',
  CLUSTER_NODE_EMPTY_DESC: '클러스터에 노드를 추가하십시오.',
  NODE_NAME_EMPTY_DESC: '노드의 이름을 설정하십시오.',
  CPU_USAGE: 'CPU 사용량',
  MEMORY_USAGE: '메모리 사용량',
  CONTROL_PLANE: '컨트롤 플레인',
  WORKER: '워커',
  ALLOCATED_CPU: '할당된 CPU',
  ALLOCATED_MEMORY: '할당된 메모리',
  CPU_LIMIT_SI: '리소스 제한: {core} 코어 ({percent})',
  CPU_LIMIT_PL: '리소스 제한: {core} 코어 ({percent})',
  CPU_REQUEST_SI: '{core} 코어 ({percent})',
  CPU_REQUEST_PL: '{core} \b코어 ({percent})',
  CORE_PL: '코어',
  CPU_CORE_PERCENT_SI: '{core} 코어 ({percent})',
  CPU_CORE_PERCENT_PL: '{core} \b코어 ({percent})',
  MEMORY_GIB_PERCENT: '{gib} GiB ({percent})',
  MEMORY_LIMIT_VALUE: '리소스 제한: {gib} GiB ({percent})',
  MEMORY_REQUEST_VALUE: '{gib} GiB ({percent})',
  RESOURCE_REQUEST: '리소스 요청',
  CORDON: 'Cordon',
  UNCORDON: 'Uncordon',
  OPEN_TERMINAL: '터미널 열기',
  CUSTOM_COLUMNS: '열 커스터마이즈',
  NO_MATCHING_RESULT_FOUND: '일치하는 결과를 찾을 수 없음',
  STATUS: '상태',
  TOTAL_ITEMS: '전체: {num}',
  YOU_CAN_TRY_TO: '아래의 조치를 취해보세요.',
  REFRESH_DATA: '데이터 새로고침',
  CLEAR_SEARCH_CONDITIONS: '검색 조건 지우기',
  // List > Edit Taints
  DUPLICATE_KEYS: '이미 존재하는 키입니다. 다른 키를 입력하십시오.',
  EMPTY_KEY: '키를 입력하십시오.'
};