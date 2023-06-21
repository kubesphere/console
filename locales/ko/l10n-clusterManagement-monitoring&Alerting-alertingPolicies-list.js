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
  ALERTING_POLICY_PL: '규칙 그룹',
  ALERTING_POLICY_DESC: '규칙 그룹에는 클러스터 리소스를 모니터링하는 데 사용되는 알림 규칙이 포함되어 있습니다.',
  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: '알림이 어떻게 생성됩니까?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A: '규칙 그룹을 생성하고 알림 규칙을 설정해야 합니다. 리소스 메트릭이 규칙 그룹에 구성된 조건을 충족하면 시스템에서 알림을 생성합니다.',
  // List
  CUSTOM_POLICIES: '커스텀 규칙 그룹',
  BUILT_IN_POLICIES: '기본 정의 규칙 그룹',
  ALERTING_POLICY_EMPTY_DESC: '규칙 그룹을 생성하십시오.',
  ALERT_RULE_INACTIVE: '비활성화',
  ALERT_RULE_PENDING: '대기 중',
  ALERT_RULE_FIRING: 'Firing',
  ALERT_RULE_DISABLED: '사용안함',
  POLICY_STATUS: 'Rule Group Status',
  RULE_STATUS: 'Rule Status',
  TIME_SPENT: 'Time Spent',
  RECENT_DETECT_TIME: 'Last Check',
  EDIT_ALERT_RULES: 'Edit Alert Rules',
  RESET: 'Reset',
  // List > Create > Basic Information
  SEVERITY: '심각도',
  CREATE_ALERTING_POLICY: '규칙 그룹 생성',
  CRITICAL_ALERT: '심각',
  ERROR_ALERT: '오류',
  WARNING_ALERT: '주의',
  INVALID_TIME_DESC: '잘못된 값입니다. 0 또는 정수를 입력하십시오.',
  ALIAS: '별칭',
  DURATION_MIN: '지속 시간 (분)',
  ALERT_DURATION: '시스템이 특정 기간 동안 대기하도록 설정하고 경고를 실행하기 전에 알림 상황이 지속되는지 확인합니다.',
  LONG_NAME_DESC: '이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 253자입니다.',
  NAME_EXIST_DESC: '이미 존재하는 이름입니다. 다른 이름을 입력하십시오.',
  ALIAS_NAME_DESC: '별칭 이름은 문자, 숫자 및 하이픈(-)만 포함할 수 있으며 하이픈으로 시작하거나 끝날 수 없습니다. 최대 길이는 63자입니다.',
  CHECK_INTERVAL: 'Check Interval',
  ALERTING_POLICY_CHECK_INTERVAL_DESC: 'Set the interval between metric checks. The default value is 1 minute.',
  // List > Create > Rule Settings > Rule Template
  RULE_TEMPLATE: '규칙 템플릿',
  RULE_SETTINGS: '규칙 설정',
  MONITORING_TARGETS: '모니터링 대상',
  SET_ACTIVATION_CONDITION_DESC: '트리거 조건을 설정하십시오.',
  THRESHOLD: '임계값',
  UNAVAILABLE_POD_RATIO: '사용할 수 없는 파드 비율 (%)',
  POD_QUOTA_UTILIZATION_SCAP: '파드 할당량 사용 비율 (%)',
  CPU_USAGE_SCAP: 'CPU 사용량',
  CPU_UTILIZATION_SCAP: 'CPU 사용량 (%)',
  CPU_LOAD_1: '1분 CPU 평균 로드',
  CPU_LOAD_5: '5분 CPU 평균 로드',
  CPU_LOAD_15: '15분 CPU 평균 로드',
  MEMORY_AVAILABLE: '사용 가능한 메모리',
  MEMORY_UTILIZATION_SCAP: '메모리 사용량 (%)',
  DISK_SPACE_AVAILABLE: '사용 가능한 로컬 디스크 공간',
  DISK_SPACE_UTILIZATION: '로컬 디스크 사용량 (%)',
  INODE_UTILIZATION: 'Inode 사용량 (%)',
  DISK_READ_IOPS: '로컬 디스크 읽기 IOPS',
  DISK_WRITE_IOPS: '로컬 디스크 쓰기 IOPS',
  DISK_READ_THROUGHPUT: '로컬 디스크 읽기 처리량',
  DISK_WRITE_THROUGHPUT: '로컬 디스크 쓰기 처리량',
  DATA_RECEIVE_RATE: '네트워크 데이터 수신 속도',
  DATA_SEND_RATE: '네트워크 데이터 송신 속도',
  MEMORY_USAGE_SCAP: '메모리 사용량',
  MEMORY_USAGE_WO_CACHE_SCAP: '캐시가 없는 메모리 사용량',
  UNAVAILABLE_WORKLOAD_REPLICA_RATIO: '사용할 수 없는 replica 비율 (%)',
  SELECT_NODE_TIP: '하나 이상의 클러스터 노드를 선택하십시오.',
  // List > Create > Rule Settings > Custom Rule
  CUSTOM_RULE: '커스텀 규칙',
  RULE_EXPRESSION: '규칙식',
  ENTER_RULE_EXPRESSION: '규칙식을 입력하십시오.',
  ALERT_RULE_EXPRESSION_DESC: 'PromQL 문을 사용하여 커스텀 규칙을 정의할 수 있습니다. <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">더 알아보기</a>',
  ALERT_FUNCTIONS: 'Functions',
  ALERT_METRICS: '메트릭',
  ALERT_LABELS: '레이블',
  ALERT_RATE_RANGES: '비율 범위',
  // List > Create > Message Settings
  ALERTING_MESSAGE: '알림',
  MESSAGE_SETTINGS: '메시지 설정',
  NOTIFICATION_SUMMARY: '개요',
  NOTIFICATION_DETAILS: '세부 정보',
  // List > Edit
  EDIT_ALERTING_POLICY: '규칙 그룹 편집',
  // List > Delete
  ALERTING_POLICY: '규칙 그룹',
  ALERTING_POLICY_LOW: '규칙 그룹'
};