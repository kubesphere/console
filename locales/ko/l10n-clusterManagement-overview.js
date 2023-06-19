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
  HOST_CLUSTER: '호스트 클러스터',
  MEMBER_CLUSTER: '맴버 클러스터',
  // Baisc Information
  PROVIDER: 'Provider',
  KUBERNETES_VERSION: 'Kubernetes 버전',
  KUBESPHERE_VERSION: 'KubeSphere 버전',
  VISIBILITY_PARTIAL: '일부 워크스페이스 표시 됨',
  VISIBILITY_PUBLIC: '모든 워크스페이스에 표시 됨',
  CLUSTER_BASE_INFO_DESC: '기본 정보는 클러스터의 개요를 제공합니다. 클러스터 정보를 보고 편집할 수 있습니다.',
  // System Components
  // Resource Usage
  MEMORY: '메모리',
  TOTAL: '전체',
  USED: '사용됨',
  // Tools
  TOOLS: '도구',
  KUBECTL_DESC: '현재 클러스터를 제어하는 데 사용되는 명령어 도구입니다.',
  KUBECONFIG_DESC: '현재 클러스터에 대한 액세스 정보를 구성하는 데 사용되는 파일입니다.',
  // Kubernetes Status
  KUBERNETES_STATUS: 'Kubernetes 상태',
  API_REQUESTS_PER_SECOND: '초당 API 요청 수',
  VALUE_REQUESTS_SECOND: '{value, plural, =1 {1 요청} other {# 요청}}/초',
  API_REQUEST_LATENCY: 'API 요청 지연 시간',
  SCHEDULING_OPERATIONS: '스케줄링 횟수',
  SCHEDULING_OPERATION: '스케줄링 횟수',
  SCHEDULING_FAILURES: '스케줄링 실패 횟수',
  SCHEDULING_FAILURE: '스케줄링 실패 횟수',
  // Nodes
  VIEW_MORE: '더 보기',
  NODE_CPU_UTILISATION: 'CPU 사용량',
  NODE_LOAD1: '평균 CPU 사용량(1분)',
  NODE_MEMORY_UTILISATION: '메모리 사용량',
  NODE_DISK_SIZE_UTILISATION: '디스크 사용량',
  NODE_DISK_INODE_UTILISATION: 'Inode 사용량',
  NODE_POD_UTILISATION: '파드 사용량',
  // Cluster Initializing
  WAIT_FOR_CLUSTER: '클러스터가 가입하기를 기다리는 중...',
  WAIT_FOR_CLUSTER_DESC: '클러스터를 사용할 수 없습니다. 다음 단계를 수행하여 클러스터를 추가합니다.',
  CLUSTER_AGENT_TIP_1: '1. SSH를 통해 클러스터에 로그인하고 <span class="code">vi agent.sysl</span> 명령을 실행하여 구성 파일을 생성합니다.',
  CLUSTER_AGENT_TIP_2: '2. 다음 정보를 <span class="code">agent.svl </span> 파일에 복사합니다.',
  CLUSTER_AGENT_TIP_3: '3. <span class="code"> create -f agent.sysl </span> 명령을 실행하여 클러스터를 추가합니다.',
  CLUSTER_AGENT_TIP_3_DESC: '이 작업은 시간이 좀 걸릴 수 있습니다. 클러스터 상태가 업데이트될 때까지 기다려 주십시오.',
  CREATING_CLUSTER: '클러스터를 생성하는 중...',
  CREATING_CLUSTER_DESC: '클러스터를 생성 중에 있으며 현재 사용할 수 없습니다.',
  CLUSTER_INIT_FAILED: '클러스터를 초기화하지 못했습니다.',
  CLUSTER_CREATION_PROGRESS: '클러스터 생성 진행률',
  FETCHING_LOGS: '로그를 가져오는 중...',
  CURRENT_STEP: '현재 단계: {step}',
  CLUSTER_CREATION_PROGRESS_TIP: '클러스터 크기 및 인프라 환경에 따라 클러스터를 생성하는 데 30분에서 60분이 걸릴 수 있습니다.'
};