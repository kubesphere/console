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
  DURATION: '기간',
  // Alert Rules
  VIEW_METRIC_DATA: '메트릭 데이터 보기',
  ALERTING_RULE: '알림 규칙',
  MONITORING_TARGETS_SCAP: '모니터링 대상',
  TRIGGER_CONDITION_SCAP: '트리거 조건',
  METRIC_MONITORING: '메트릭 모니터링',
  ALERT_MONITORING: '알림 모니터링',
  NOTIFICATION_SUMMARY_COLON: '개요: ',
  DETAILS_COLON: '세부 정보: ',
  NODES_VALUES: '노드: {values}',
  TRIGGER_CONDITION: '트리거 조건',
  MESSAGE_SUMMARY: '개요',
  MESSAGE_DETAILS: '세부 정보',
  VIEW_METRIC_DATA_TCAP: '메트릭 데이터 보기',
  ALERT_RULE_TEXT_PERCENT_SECOND: '{alterTypeText} {comparator} {thresholds}% 에서 {durationValue, plural, =1 {1 초} other {# 초}} 동안 지속',
  ALERT_RULE_TEXT_PERCENT_MINUTE: '{alterTypeText} {comparator} {thresholds}% 에서 {durationValue, plural, =1 {1 분} other {# 분}} 동안 지속',
  ALERT_RULE_TEXT_PERCENT_HOUR: '{alterTypeText} {comparator} {thresholds}% 에서 {durationValue, plural, =1 {1 시간} other {# 시간}} 동안 지속',
  ALERT_RULE_TEXT_SECOND: '{alterTypeText} {comparator} {thresholds} {unit} 에서 {durationValue, plural, =1 {1 초} other {# 초}} 동안 지속',
  ALERT_RULE_TEXT_MINUTE: '{alterTypeText} {comparator} {thresholds} {unit} 에서 {durationValue, plural, =1 {1 분} other {# 분}} 동안 지속',
  ALERT_RULE_TEXT_HOUR: '{alterTypeText} {comparator} {thresholds} {unit} 에서 {durationValue, plural, =1 {1 시간} other {# 시간}} 동안 지속',
  // Alert Rules > View Metric Data
  CPU_UTILIZATION_NO_PERCENT_TCAP: 'CPU 사용량',
  CPU_LOAD_1_TCAP: '1분 CPU 평균 로드',
  CPU_LOAD_5_TCAP: '5분 CPU 평균 로드',
  CPU_LOAD_15_TCAP: '15분 CPU 평균 로드',
  MEMORY_UTILIZATION_NO_PERCENT_TCAP: '메모리 사용량',
  MEMORY_AVAILABLE_TCAP: '사용 가능한 메모리',
  DATA_SEND_RATE_TCAP: '네트워크 데이터 전송 속도',
  DATA_RECEIVE_RATE_TCAP: '네트워크 데이터 수신 속도',
  DISK_SPACE_UTILIZATION_NO_PERCENT_TCAP: '로컬 디스크 사용량',
  DISK_SPACE_AVAILABLE_TCAP: '사용 가능한 로컬 디스크 공간',
  INODE_UTILIZATION_NO_PERCENT_TCAP: 'Inode 사용량',
  DISK_READ_IOPS_TCAP: '로컬 디스크 읽기 IOPS',
  DISK_WRITE_IOPS_TCAP: '로컬 디스크 쓰기 IOPS',
  DISK_READ_THROUGHPUT_TCAP: '로컬 디스크 읽기 처리량',
  DISK_WRITE_THROUGHPUT_TCAP: '로컬 디스크 쓰기 처리량',
  UNAVAILABLE_POD_RATIO_NO_PERCENT_TCAP: '가용하지 않은 파드 비율',
  POD_QUOTA_UTILIZATION_NO_PERCENT_TCAP: '파드 할당 사용량',
  MEMORY_USAGE_WO_CACHE_TCAP: '캐쉬를 제외한 메모리 사용량',
  UNAVAILABLE_WORKLOAD_REPLICA_RATIO_NO_PERCENT_TCAP: '가용하지 않은 복제본 비율',
  THRESHOLD_VALUE: '임계값: {value}',
  // Alerting History
  NO_DATA_DESC: '데이터를 찾을 수 없습니다'
};