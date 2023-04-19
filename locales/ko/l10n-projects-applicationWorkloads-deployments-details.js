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
  // More > Roll Back
  ROLL_BACK: '롤백',
  CURRENT_REVISION_RECORD: '현재 리비전 기록',
  TARGET_REVISION_EMPTY_DESC: '대상 리비전 기록을 선택하십시오.',
  TARGET_REVISION_RECORD: '대상 리비전 기록',
  // More > Edit Autoscaling
  CONFIGURE_AUTOSCALING_DESC: '대상 CPU 사용량 및 대상 메모리 사용량에 따라 파드 복제본 수를 자동으로 조정하도록 시스템을 설정합니다.',
  EDIT_AUTOSCALING: '자동스케일링 편집',
  TARGET_CPU_USAGE_UNIT: '대상 CPU 사용량 (%)',
  AUTOSCALING: '자동스케일링',
  RESOURCE_NAME: '리소스 이름',
  TARGET_CPU_USAGE_DESC: '시스템은 실제 CPU 사용량이 대상보다 높거나 낮을 경우 파드 복제본 수를 자동으로 감소/증가시킵니다.',
  TARGET_MEMORY_USAGE_DESC: '실제 메모리 사용량이 대상보다 높거나 낮을 경우 시스템은 파드 복제본 수를 자동으로 줄이거나 늘립니다.',
  MINIMUM_REPLICAS_DESC: '허용되는 최소 파드 복제본 수를 설정합니다. 기본값은 1입니다.',
  MAXIMUM_REPLICAS_DESC: '허용되는 파드 복제본의 최대 수를 설정합니다. 기본값은 1입니다.',
  TARGET_MEMORY_USAGE_UNIT: '대상 메모리 사용량(MiB)',
  MINIMUM_REPLICAS: '최소 복제본 수',
  MAXIMUM_REPLICAS: '최대 복제본 수',
  // More > Edit Settings > Update Strategy
  EDIT_SETTINGS: '설정 편집',
  // More > Edit Settings > Containers
  FROM_CONFIGMAP: '컨피그맵으로부터',
  FROM_SECRET: '시크릿으로부터',
  BATCH_REFERENCE: '배치 참조',
  BATCH_REFERENCE_DESC: '컨피그맵 또는 스크릿에서 여러 키를 참조합니다.',
  DESELECT_ALL: '모두 선택 해제',
  KEY_PL: '키',
  // More > Edit Settings > Volumes
  // More > Edit Settings > Volumes > Mount Volume
  // More > Edit Settings > Volumes > Mount Configmap or Secret
  // More > Edit Settings > Pod Scheduling Rules
  RULE_NOT_COMPLETE: '전체 규칙을 설정하세요.',
  // Attributes
  // Revision Records
  REVISION_RECORDS: '리비전 기록',
  CONFIG_FILE: '설정 파일',
  COMPARE_WITH: '이전 기록 {version}과(와) 비교',
  // Resource Status
  REPLICAS_DESIRED: '예상 복제본 수',
  REPLICAS_CURRENT: '현재 복제본 수',
  ADJUST_REPLICAS: '복제본 수 조정',
  REPLICAS_SCALE_NOTIFY_CONTENT: '파드 복제본 수를 {num}개로 변경하시겠습니까?',
  REPLICAS_SCALE_NOTIFY_CONFIRM: '확인 ({seconds}s)',
  REPLICAS_SCALE_NOTIFY_CANCEL: '취소',
  // Resource Status > Autoscaling
  TARGET_MEMORY_USAGE: '대상 메모리 사용량',
  TARGET_CPU_USAGE: '대상 CPU 사용량',
  TARGET_CURRENT: '{target}(현재: {current})',
  NOT_ENABLE: '{resource} 사용 안 함',
  // Resource Status > Image Builder
  CONTAINER_LOG_NOT_ENABLED: '컨테이너 로그를 사용할 수 없습니다.',
  BUILD_LOG: '빌드 로그',
  TASK: '작업',
  IN_PROGRESS: '진행 중',
  IMAGE_BUILDING: '이미지 빌드 중',
  HAS_FAILED: '실패함',
  // Metadata
  // Monitoring
  // Monitoring > View All Replicas (visible only when replicas > 5)
  VIEW_ALL_REPLICAS: '모든 복제본 보기',
  SHOW_SELECTED_ONLY: '선택한 항목만 표시',
  MONITORING_SELECT_LIMIT_MSG: '최대 10개의 리소스를 선택할 수 있습니다.',
  MONITORING_ALERT_DESC: '최대 5개의 파드 복제본에 대한 정보가 기본적으로 표시됩니다. <b>모든 복제본 보기</b>를 눌러 모든 파드 복제본에 대한 정보를 확인할 수 있습니다.',
  CURRENT_VALUE: '현재: {value}',
  // Environment Variables
  ENVIRONMENT_VARIABLE_PL: '환경 변수',
  // Events
  EVENT_AGE: '발생 시간',
  EVENT_AGE_DATA: '{lastTime}<br/>({duration} 동안 {count}번)',
  EVENT_AGE_DATA_TWICE: '{lastTime}<br/>({duration} 동안 두 번)',
  SOURCE: '출처'
};