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
  // Title
  TOTAL_AUDITING_TODAY: '오늘 총 <span class={className}> {auditing} </span> 감사 로그 항목이 수집되었습니다.',
  NO_AUDIT_LOG_TODAY: '오늘 수집된 감사 로그 없음',
  AUDIT_LOG_TREND_LAST_TWELVE_HOURS: '최근 12시간 동안의 감사 로그 추이',
  START_TIME_VALUE: '시작 시간: {value}',
  // Search
  NO_DATA_AUTHORIZED: '인증된 데이터 없음',
  NO_DATA_AUTHORIZED_DESC: '데이터 승인을 받으려면 관리자에게 문의하십시오.',
  TIME_RANGE_LAST: '시간 범위: 마지막 {value}',
  TIME_RANGE_RANGE: '시간 범위: {startTime} – {endTime}',
  // Querying Rules
  AUDIT_LOGS_12H: '지난 12시간 동안의 감사 로그',
  AUDIT_LOG_WORKSPACE_TIP: '감사 로그를 검색할 워크스페이스 이름을 입력합니다.',
  AUDIT_LOG_PROJECT_TIP: '감사 로그를 검색할 프로젝트 이름을 입력합니다.',
  AUDIT_LOG_RESOURCE_NAME_TIP: '감사 로그를 검색할 리소스 이름을 입력합니다.',
  AUDIT_LOG_RESOURCE_TYPE_TIP: '감사 로그를 검색할 리소스 유형을 입력합니다.',
  AUDIT_LOG_VERB_TIP: '감사 로그를 검색할 verb를 입력합니다.',
  AUDIT_LOG_STATUS_CODE_TIP: '감사 로그를 검색할 상태 코드를 입력합니다.',
  AUDIT_LOG_OPERATOR_TIP: '감사 로그를 검색할 연산자를 입력합니다.',
  AUDIT_LOG_SOURCE_IP_ADDRESS_TIP: '감사 로그를 검색할 소스 IP 주소를 입력합니다.',
  SEARCH_BY_VERB: 'Verb으로 검색',
  SEARCH_BY_STATUS_CODE: '상태 코드로 검색',
  SEARCH_BY_OPERATOR: '연산자로 검색',
  SEARCH_BY_SOURCE_IP_ADDRESS: '소스 IP 주소로 검색',
  ENABLE_AUDIT_LOG_COLLECTION_DESC: '감사 로그 수집이 실행 중지된 경우 실행해야 합니다. <a href="{link}" target="_blank">자세히 알아보기</a>'
};