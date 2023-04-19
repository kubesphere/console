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
  QOS_CLASS: 'QoS 클래스',
  NODE_NAME: '노드 이름',
  POD_IP_ADDRESS: '파드 IP 주소',
  // Run Records
  JOB_UNFINISHED: '완료되지 않음',
  // Resource Status
  TERMINATED: '종료됨',
  // Scheduling Information
  SCHEDULED_TO_NODE: '{value}(으)로 스케줄링됨',
  SCHEDULING_NOT_SUCCESSFUL: '스케줄링 실패',
  SCHEDULING_INFORMATION: '스케줄링 정보',
  SCHEDULING_RESULT: '스케줄링 결과',
  POD_SCHEDULING_METHOD: '파드 스케줄링 방법',
  POD_ASSIGNED_DESC: '시스템은 파드의 리소스 요청에 따라 사용 가능한 리소스가 충분한 노드로 파드를 예약합니다.',
  STATUS_INFORMATION: '상태 정보',
  WORKLOAD_CONDITION_AVAILABLE: '사용 가능',
  WORKLOAD_CONDITION_PROGRESSING: '진행 중',
  NOT_SUCCESSFUL: '실패',
  CURRENT_STATUS: '현재 상태',
  POD_CONDITION_INITIALIZED: '초기화 됨',
  POD_CONDITION_INITIALIZED_DESC: '파드내 모든 init 컨테이너들을 시작합니다.',
  POD_CONDITION_READY: '파드 준비',
  POD_CONDITION_READY_DESC: '파드 실행을 시작하고 파드에 액세스할 수 있도록 합니다.',
  POD_CONDITION_CONTAINERSREADY: '컨테이너 준비',
  POD_CONDITION_CONTAINERSREADY_DESC: '파드내 모든 컨테이너들을 시작합니다.',
  POD_CONDITION_PODSCHEDULED: '파드 스케줄링 됨',
  POD_CONDITION_PODSCHEDULED_DESC: '클러스터의 노드로 파드를 스케줄링합니다.'
};