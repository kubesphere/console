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
  HPA_SET_TIP: '수평 파드 자동 스케일링(Horizontal Pod Autoscaling)이 설정되었습니다.',
  WORKLOAD_EMPTY_DESC: '워크로드를 생성하십시오.',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Container Settings
  INVALID_IMAGE: '잘못된 이미지입니다.',
  INVALID_NAME_DESC: '잘못된 이름입니다. 이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 63자입니다.',
  NO_IMAGE_FOUND: '이미지를 찾을 수 없음',
  CONTAINER_EMPTY_DESC: '워커 컨테이너를 하나 이상 추가하십시오.',
  RESOURC_QUOTAS_UNSET: '리소스 할당량 설정 안됨',
  INSUFFICENT_RESOURCES: '리소스 부족',
  REMAINING_QUOTAS: '남은 할당량',
  // List > Create > Pod Settings > Add Container > Container Settings > Environment Settings
  ENVIRONMENT_INVALID_TIP: '환경 변수의 키는 문자, 숫자, 밑줄(_), 하이픈(-) 및 마침표(.)만 포함할 수 있으며 숫자로 시작할 수 없습니다.',
  ENVIRONMENT_CANNOT_BE_EMPTY: '환경 변수에 대한 키를 설정하십시오.',
  // List > Create > Pod Settings > Port Settings
  WORKLOAD_PORT_NAME_DESC: '파드 이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자로 시작하고 소문자 또는 숫자로 끝나야 합니다. 최대 길이는 15자입니다.',
  // List > Create > Pod Settings > Update Strategy > Rolling Update Settings
  MAX_EXTRA_PODS_DESC: '업데이트 프로세스 중에 허용되는 여유 파드의 최대 수 또는 백분율입니다.',
  MAX_EXTRA_PODS: '최대 여유 파드 수',
  // List > Create > Storage Settings
  AVAILABLE: '사용 가능',
  IN_USER: '사용 중',
  ACCESS_MODE_SCAP: '액세스 모드',
  PVC_OR_TEMPLATE_EMPTY: '볼륨에서 로그 수집을 사용하도록 설정했습니다. 퍼시스턴트 볼륨, 임시 볼륨 또는 퍼시스턴트 볼륨 클레임 템플릿을 하나 이상 추가하고 컨테이너 로그의 경로를 지정하십시오.',
  PVC_EMPTY: '볼륨에서 로그 수집을 사용하도록 설정했습니다. 하나 이상의 퍼시스턴트 볼륨 또는 임시 볼륨을 추가하고 컨테이너 로그의 경로를 지정하십시오.',
  PROJECT_COLLECT_SAVED_DISABLED_DESC: '이 기능을 사용하려면 프로젝트 설정에서 볼륨의 로그 수집을 사용하도록 설정해야 합니다.',
  COLLECT_LOGS_ON_VOLUMES_DESC: '시스템이 볼륨에 저장된 컨테이너 로그를 수집할 수 있습니다. 이 기능을 사용하려면 읽기 및 쓰기 모드의 볼륨을 컨테이너에 마운트하고 로그를 볼륨으로 내보내도록 컨테이너를 설정해야 합니다.',
  // List > Create
  // List > Create > Storage Settings > Mount Volume
  CONTAINER_LOG_PATH: '컨테이너 로그 경로',
  // List > Create > Storage Settings > Mount Volume > Temporary Volume
  CONTAINER_LOG_PATH_TIP: '볼륨 마운트 경로를 기준으로 한 컨테이너 로그 경로입니다. 글로빙(globbing) 패턴이 지원됩니다. 쉼표(,)를 사용하여 여러 경로를 구분할 수 있습니다.<br /><br /><b>예제</b><br />볼륨 마운트 경로가 /data인 경우 log/*.log에 컨테이너 로그 파일이 /data/log 디렉토리에 있는 모든 .log 파일로 표시됩니다.',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Re-create
  RECREATE_CONFIRM_DESC: '{type} {resource}을(를) 다시 생성하시겠습니까? 파드 복제본은 업데이트 전략에 따라 업데이트되고 서비스가 중단됩니다.',
  // List > Delete
  NO_WORKLOAD_RELATED_RESOURCE_DESC: '워크로드와 관련된 리소스를 찾을 수 없습니다.',
  SELECT_ALL: '전체 선택',
  DELETE_WORKLOAD_DESC_SI: '{resource} 워크로드를 삭제하려고 합니다.<br/>워크로드와 관련된 리소스도 삭제하시겠습니까?',
  DELETE_WORKLOAD_DESC_PL: '{resource} 워크로드를 삭제하려고 합니다.<br/>워크로드와 관련된 리소스도 삭제하시겠습니까?',
  DELETE_WORKLOAD: '워크로드 삭제',
  DELETE_MULTIPLE_WORKLOADS: '여러 개 워크로드 삭제',
  DELETE_APP_RESOURCE_TIP: '리소스는 <strong>{app}</strong>에 의해 관리되며, 리소스가 삭제되면 이 앱의 정상적인 사용에 영향을 줄 수 있습니다. 작업과 관련된 위험을 이해했는지 확인하려면 {type} 이름 <strong>{resource}</strong>을 입력하십시오.',
  STOP_APP_RESOURCE_TIP: '리소스는 <strong>{app}</strong>에 의해 관리되며, 리소스가 중지되면 이 앱의 정상적인 사용에 영향을 줄 수 있습니다. 작업과 관련된 위험을 이해했는지 확인하려면 {type} 이름 <strong>{resource}</strong>을 입력하십시오.'
};