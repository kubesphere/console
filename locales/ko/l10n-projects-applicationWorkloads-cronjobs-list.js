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
  CRONJOBS: '크론잡',
  CRONJOB_DESC: '크론잡은 시간 기반 예약에 따라 작업을 관리하며 정기 또는 반복 태스크를 수행하는 데 사용할 수 있습니다.',
  // List
  CRONJOB_PAUSED: '일시정지',
  CRONJOB_RUNNING: '실행 중',
  CRONJOB_FAILED: '실패',
  // List > Create > Basic Information
  SCHEDULE: '스케쥴',
  ENTER_SCHEDULE_TIP: '스케줄을 선택해주십시오.',
  CRONJOB_CRON_DESC: '크론잡에 대한 스케줄을 설정합니다. KubeSphere는 기본적으로 UTC를 사용하며 사용자는 표준 시간대에 따라 일정을 조정해야 합니다. <a href="//en.wikipedia.org/wiki/Cron" target="_blank">자세히 알아보기</a>',
  // List > Create > Advanced settings
  MAXIMUM_DELAY: '최대 시작 지연(초)',
  SUCCESSFUL_JOBS_RETAINED: '성공적인 잡 예약 수',
  FAILED_JOBS_RETAINED: '실패한 잡 예약 수',
  CONCURRENCY_POLICY: '동시성 정책',
  MAXIMUM_DELAY_DESC: '특정 이유로 작업이 누락된 경우 예약된 잡을 시작하기 전 최대 지연 시간입니다.',
  CONCURRENCY_POLICY_DESC: '크론잡의 여러 잡이 서로 중복될 때 시스템에서 채택하는 정책입니다.',
  FAILED_JOBS_RETAINED_DESC: '유지할 수 있는 실패한 잡 수입니다. 기본값은 1입니다.',
  SUCCESSFUL_JOBS_RETAINED_DESC: '유지할 수 있는 성공적인  잡 수입니다. 기본값은 3입니다.',
  RUN_JOBS_CONCURRENTLY: '동시에 잡들을 실행',
  SKIP_NEW_JOB: '새 잡 건너뛰기',
  SKIP_OLD_JOB: '오래 된 잡 건너뛰기',
  // List > Create > Strategy Settings
  STRATEGY_SETTINGS: '전략 설정',
  MAXIMUM_RETRIES: '최대 재시도 횟수',
  MAXIMUM_RETRIES_DESC: '잡이 실패한 것으로 마킹되기 전까지 최대 재시도 횟수입니다. 기본값은 6입니다.',
  PARALLEL_PODS_DESC: '하나의 잡에서 병렬로 실행 가능한 파드 수입니다.',
  COMPLETE_PODS_DESC: '잡을 완료로 마킹하는데 필요한 완료 된 파드 수입니다.',
  MAXIMUM_DURATION_DESC: '잡의 최대 지속 시간입니다. 잡은 최대 지속 시간에 도달하면 종료됩니다.',
  PARALLEL_PODS: '패러럴 파드',
  COMPLETE_PODS: '완료된 파드',
  MAXIMUM_DURATION: '최대 지속 시간(초)',
  // List > Create > Pod Settings
  RESTART_POLICY: '정책 다시 시작',
  RESTART_POLICY_DESC: '파드의 컨테이너가 비정상적으로 종료 될 때 시스템에서 채택할 정책을 선택합니다.',
  // List > Create > Storage Settings
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Pause
  // List > Delete
  CRONJOB_PL: '크론잡',
  CRONJOB_LOW: '크론잡'
};