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
  GRAYSCALE_RELEASE: '그레이스케일 릴리즈',
  // Release Modes
  BLUE_GREEN_DEPLOYMENT: '블루-그린 배포',
  CANARY_RELEASE: '카나리 릴리스',
  TRAFFIC_MIRRORING: '트래픽 미러링',
  BLUE_GREEN_DEPLOYMENT_DESC: '테스트를 위해 서비스 트래픽을 새 버전으로 전달합니다. 새 버전이 제대로 작동하지 않으면 서비스 트래픽을 즉시 이전 버전으로 전환할 수 있습니다.',
  CANARY_RELEASE_DESC: '새 버전과 이전 버전 간에 서비스 트래픽을 할당하여 새 버전을 테스트하고 서비스 연속성을 보장합니다.',
  TRAFFIC_MIRRORING_DESC: '실제로 새 버전을 노출하지 않고 테스트할 수 있도록 서비스 트래픽 복사본을 새 버전으로 보냅니다.',
  // Release Modes > Blue-Green Deployment > Create > Basic Information
  CREATE_BLUE_GREEN_DEPLOYMENT_TASK: '블루-그린 배포 작업 생성',
  // Release Modes > Blue-Green Deployment > Create > Service Settings
  DESELECT: '선택 해제',
  SELECT: '선택',
  SELECT_GRAY_COMPONENT_TIP: '서비스를 선택하십시오.',
  // Release Modes > Blue-Green Deployment > Create > New Version Settings
  REPLICA: '복제본',
  REPLICA_PL: '복제본',
  GRAYSCALE_REPLICAS_DESC: '새 버전의 파드 복제본',
  // Release Modes > Blue-Green Deployment > Create > Strategy Settings
  SELECT_VERSION: '버전 선택',
  BLUE_GREEN_STRATEGY_DESC: '모든 서비스 트래픽을 처리할 버전을 선택합니다.',
  TAKE_OFFLINE: '오프라인으로 전환',
  TAKE_OVER: '인계',
  GRAYSCALE_VERSION: '버전: {version}',
  // Release Modes > Canary Release > Create
  CREATE_CANARY_RELEASE_TASK: '카나리 릴리스 작업 생성',
  // Release Modes > Canary Release > Create > Service Settings
  UNFINISHED_GRAY_TASK: '그레이스케일 릴리즈 진행 중',
  NO_WORKLOAD_FOUND_TIP: '워크로드를 찾을 수 없습니다',
  NO_SERVICE_MESH_TIP: '애플리케이션 거버넌스가 앱에 대해 비활성화되어 있어 그레이스케일 릴리스를 사용할 수 없습니다.',
  GRAY_APP_NAME: '앱: {name}',
  UNSUPPORTED_WORKLOAD_TYPE: '지원되지 않는 워크로드 유형',
  // Release Modes > Canary Release > Create > New Version Settings
  VERSION_EXISTS: '버전 코드가 이미 있습니다. 다른 버전 코드를 입력하십시오.',
  NEW_VERSION_NUMBER_EXIST_DESC: '{name} 워크로드가 이미 존재합니다. 다른 버전 코드를 입력하십시오.',
  INIT_CONTAINER: 'Init 컨테이너',
  INIT_CONTAINER_VALUE: 'Init 컨테이너: {value}',
  CONTAINER_VALUE: '컨테이너: {value}',
  GRAYSCALE_IMAGE: '이미지: {image}',
  NEW_VERSION_NUMBER: '새 버전 번호',
  NEW_VERSION_NUMBER_EMPTY_DESC: '새 버전 번호를 입력하십시오.',
  NEW_VERSION_SETTINGS: '새 버전 설정',
  NEW_VERSION_NUMBER_DESC: '새 버전 번호는 소문자와 숫자만 포함할 수 있습니다. 최대 길이는 16자입니다.',
  NEW_VERSION_NUMBER_INVALID_DESC: '새 버전 번호가 잘못되었습니다. 새 버전 번호는 소문자와 숫자만 포함할 수 있습니다. 최대 길이는 16자입니다.',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Request Parameters
  KEY_EQ_VALUE: 'Key=Value',
  HEADER: '헤더',
  CLIENT_OS: '클라이언트 OS',
  COOKIE: '쿠키',
  SPECIFY_REQUEST_PARAMETERS_DESC: '다음 조건을 충족하는 요청은 새 버전으로 전송됩니다.',
  POLICY_REQUEST_CONTENT_TIP: '요청 매개 변수 지정 기능은 HTTP, HTTPS 및 gRPG 요청만 지원합니다.',
  SPECIFY_REQUEST_PARAMETERS: '요청 매개 변수 지정',
  REQUEST_PARAMETERS: '요청 매개 변수',
  EXACT_MATCH: 'Exact match',
  PREFIX_MATCH: 'Prefix match',
  REGEX_MATCH: 'Regex match',
  // Release Modes > Canary Release > Create > Strategy Settings > Specify Traffic Distribution
  CANARY_BY_TRAFFIC_DESC: '서비스 <b>{component}</b>로 향하는 트래픽의 {ratio}%가 새 버전 <b>{newVersion}</b>로 전송됩니다.',
  SPECIFY_TRAFFIC_DISTRIBUTION: '트래픽 분포 지정',
  TRAFFIC: '트래픽',
  TRAFFIC_DISTRIBUTION: '트래픽 분포',
  // Release Modes > Traffic Mirroring > Create
  CREATE_TRAFFIC_MIRRORING_TASK: '트래픽 미러링 작업 생성',
  // Release Modes > Traffic Mirroring > Create > Strategy Settings
  // Release Tasks
  PREREQUEST_FOR_USE_GRAYRELEASE_Q: '그레이스케일 릴리스를 구현하기 위한 전제 조건은 무엇입니까?',
  PREREQUEST_FOR_USE_GRAYRELEASE_A: '그레이스케일 릴리스를 구현하기 전에 composed 앱을 생성하고 앱에 대한 애플리케이션 거버넌스를 활성화해야 합니다.',
  RELEASE_TASKS: '릴리스 작업',
  TCP_INBOUND_TRAFFIC: 'TCP 인바운드 트래픽',
  TCP_OUTBOUND_TRAFFIC: 'TCP 아웃바운드 트래픽',
  NO_DATA_SCAP: '데이터 없음',
  REPLICA_COUNT_LOW: '복제본',
  MIRROR_POLICY_DESC: '테스트를 위해 서비스 트래픽 복사본이 새 버전으로 전송됩니다. 이전 버전만 노출되고 새 버전은 노출되지 않습니다.',
  // Release Tasks > Blue-Green Deployment > Task Status
  BLUE_GREEN_DEPLOYMENT_LOW: '블루-그린 배포',
  BLUE_GREEN_TRAFFIC_DISTRI_DESC: '새 버전 또는 이전 버전이 모든 트래픽을 수신합니다.',
  TRAFFIC_LOW: '트래픽',
  VERSION_TRAFFIC_PERCENT: '{version} 트래픽 {percent}%',
  OFFLINE: '오프라인',
  OFFLINE_TIP: '이 버전으로 전송되는 서비스 트래픽이 없습니다. 버전을 온라인으로 전환하여 모든 트래픽을 처리할 수 있습니다.',
  // Release Tasks > Canary Release > Task Status
  CANARY_RELEASE_LOW: '카나리 릴리스',
  ADJUST_TRAFFIC_DISTRIBUTION_DESC: '트래픽의 {ratioNew}%를 새 버전 <b>{newVersion}</b>로 보내고 {ratioOld}%를 이전 버전 <b>{oldVersion}</b>로 보내시겠습니까?',
  ALLOCATE_TRAFFIC_DESC: '슬라이더를 이동하여 새 버전으로 전송된 트래픽과 이전 버전으로 전송된 트래픽의 비율을 설정합니다.',
  COOKIE_EXACT_MATCH: '쿠키(exact match)',
  COOKIE_REGEX_MATCH: '쿠키(regex match)',
  HEADER_EXACT_MATCH: '헤더(exact match)',
  HEADER_REGEX_MATCH: '헤더(regex match)',
  URL_PREFIX_MATCH: 'URL (prefix match)',
  URL_EXACT_MATCH: 'URL (regex match)',
  OS: 'OS',
  SERVICE_VERSION_RECEIVE_ALL_TRAFFIC: '버전 <b>{version}</b>이 모든 트래픽을 처리했습니다.',
  RESTORE: '복원',
  SUCCESSFUL_REQUEST_RATE: '성공된 요청 비율',
  TRAFFIC_IN_LAST_FIVE_MINUTES: '최근 5분간의 트래픽입니다.',
  DELETE_GRAYSCALE_RELEASE_TASK_DESC: '그레이스케일 릴리스 작업을 삭제하기 전에 모든 트래픽을 처리할 버전을 선택하십시오.',
  GRAY_COMPONENT_DESC: '테스트 중인 새 버전과 이전 버전에 대한 정보입니다.',
  // Release Tasks > Traffic Mirroring > Task Status
  TRAFFIC_MIRRORING_LOW: '트래픽 미러링',
  MIRRORED_TRAFFIC: '미러링된 트래픽',
  MIRRORED_TRAFFIC_TIP: '트래픽 미러링은 실제로 새 버전을 표시하지 않습니다.',
  RELEASE_MODE_PL: '릴리즈 모드',
  RELEASE_MODE: '릴리스 모드',
  NEW_VERSION_TAKEOVER_DESC: '새 버전 <b>{newVersion}</b>이 모든 트래픽을 수신하고 있습니다. 현재 그레이스케일 릴리스 작업을 삭제하면 이전 버전 <b>{oldVersion} </b>도 삭제됩니다.',
  OLD_VERSION_TAKEOVER_DESC: '이전 버전 <b>{oldVersion}</b>이 모든 트래픽을 수신하고 있습니다. 현재 그레이스케일 릴리스 작업을 삭제하면 새 버전 <b>{newVersion} </b>도 삭제됩니다.',
  GRAYSCALE_REPLICA_SI: '복제본: {count}',
  GRAYSCALE_REPLICA_PL: '복제본: {count}',
  TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC: '테스트를 위해 트래픽 복사본이 새 버전으로 전송됩니다.',
  // Release Tasks > Task Status > Edit
  EDIT_GRAYSCALE_RELEASE_TASK: '그레이스케일 릴리스 작업 편집',
  // Release Tasks > Canary Release > Traffic Distribution
  ADJUST_TRAFFIC_DISTRIBUTION: '트래픽 분포 조정'
};