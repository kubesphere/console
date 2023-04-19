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
  // List
  DAEMONSETS: '데몬셋',
  DAEMONSET_EMPTY_DESC: '데몬셋을 생성하십시오.',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Update Strategy > Rolling Update Settings
  MIN_READY_SECONDS: '파드 Readiness 체크를 위한 최소 실행 시간',
  MAX_UNAVAILABLE_PODS: '가용하지 않은 최대 파드 수',
  ROLLING_UPDATE_SETTINGS: '롤링 업데이트 설정',
  MAX_UNAVAILABLE_PODS_DESC: '업데이트 과정에서 사용 불가능한 파드 복제본의 최대 수 또는 백분율',
  MIN_READY_SECONDS_DESC: '파드 복제본이 준비 상태로 간주되기 위해 필요한 최소 안정적인 실행 시간',
  MIN_READY_SECONDS_EMPTY: '파드 복제본이 준비된 것으로 간주되는 데 필요한 최소 안정적인 실행 시간을 설정하십시오.',
  MAX_UNAVAILABLE_EMPTY: '업데이트 과정에서 사용 불가능한 파드 복제본의 최대 수 또는 백분율을 설정하십시오.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > HTTP Request
  FAILURE_THRESHOLD: '실패 임계값',
  HTTP_REQUEST: 'HTTP 요청',
  INITIAL_DELAY_S: '초기 지연 (s)',
  INITIAL_DELAY_TIMEOUT_VALUE: '{delay}s 초기 지연, {timeout}s 시간 초과',
  PROBE_TIME: '초기 지연: {delay}s, 시간 초과: {timeout}s',
  TIMEOUT_PERIOD_S: '시간 초과 (s)',
  CHECK_INTERVAL_S: '확인하는 간격 (s)',
  SUCCESS_THRESHOLD: '성공 임계값',
  INITIAL_DELAY_DESC: '컨테이너 시작 후 시도가 시작되기 전까지의 지연 시간입니다. 값은 정수여야 하며 최소값은 0입니다.',
  TIMEOUT_PERIOD_DESC: '시도가 시간 초과되고 실패한 것으로 간주되는 시간 초과 기간입니다. 값은 정수여야 하며 최소값은 1입니다.',
  CHECK_INTERVAL_DESC: '확인 시도 간격입니다. 값은 정수여야 하며 최소값은 1입니다.',
  SUCCESS_THRESHOLD_DESC: '시도가 실패한 후 성공한 것으로 간주되는 최소 연속 성공 수입니다. 활성 및 시작 프로브의 경우 최소값은 1이고 값은 1이어야 합니다.',
  FAILURE_THRESHOLD_DESC: '시도가 성공한 후 실패한 것으로 간주되는 최소 연속 실패 횟수입니다. 최소값은 1입니다.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > Command
  PROBE_COMMAND_EMPTY: '하나 이상의 명령을 입력하십시오.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > TCP Port
  TCP_PORT: 'TCP 포트',
  // List > Create > Storage Settings
  MOUNT_PATH_IN_USE: '마운트 경로가 이미 사용 중입니다. 다른 마운트 경로를 입력하십시오.'
};