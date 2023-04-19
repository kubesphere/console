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
  LOG_COLLECTION: '로그 수집',
  DISK_LOG_COLLECTION_DESC: '로그 수집 기능을 사용하면 시스템에서 볼륨에 저장된 컨테이너 로그를 수집하여 표준 출력으로 보낼 수 있습니다.',
  COLLECT_LOGS_ON_VOLUMES_Q: '볼륨에서 로그를 수집하려면 어떻게 해야 합니까?',
  COLLECT_LOGS_ON_VOLUMES_A: '볼륨에서 로그를 수집하려면 읽기 및 쓰기 모드의 볼륨을 컨테이너에 마운트하고 로그를 볼륨으로 내보내도록 컨테이너를 설정해야 합니다.',
  // Collect Logs on Volumes
  COLLECT_LOGS_ON_VOLUMES: '볼륨에서 로그 수집',
  DISABLE_LOG_COLLECTION: '로그 수집 사용 안 함',
  DISABLE_LOG_COLLECTION_TIP: '로그 수집을 사용하지 않도록 설정하시겠습니까? 변경사항을 적용하려면 파드 복제본을 재시작해야 합니다.',
  LOG_COLLECTION_ENABLED_DESC: '이 기능을 사용 가능 또는 사용 불가능으로 설정한 후 변경사항을 적용하려면 파드 복제본을 재시작해야 합니다.',
  DISABLED: '사용 안 함',
  ENABLED: '사용함'
};