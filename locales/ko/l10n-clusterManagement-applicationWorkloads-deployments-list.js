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
  APPLICATION_WORKLOAD_PL: '애플리케이션 워크로드',
  WORKLOAD_PL: '워크로드',
  // List
  DEPLOYMENTS: '디플로이먼트',
  UPDATE_TIME_TCAP: '업데이트 시간',
  ALL_PROJECTS: '모든 프로젝트',
  SHOW_NUM: '페이지당 표시 수: {num}',
  // List > Create > Basic Information
  SELECT_PROJECT_DESC: '리소스를 생성할 프로젝트를 선택합니다.',
  PROJECT_NOT_SELECT_DESC: '프로젝트를 선택하십시오',
  BASIC_INFORMATION: '기본 정보',
  NAME: '이름',
  FEDPROJECT_RESOURCE_TIP: '멀티 클러스터 프로젝트에서 워크로드 리소스를 생성하려면 멀티 클러스터 프로젝트의 워크로드 페이지로 이동합니다.',
  FINISHED: '설정완료',
  NOT_SET: '미설정',
  CURRENT: '현재',
  PROJECT: '프로젝트',
  // List > Create > Pod Settings
  PREVIOUS: '이전',
  NOTE: '비고',
  // List > Create > Pod Settings > Add Container > Container Settings
  IMAGE: '이미지',
  IMAGE_VALUE: '이미지: {value}',
  // List > Create > Pod Settings > Add Container > Health Check > Readiness Check > TCP Port
  PORT_NUMBER_EMPTY: '포트 번호를 입력하세요.',
  USER: '사용자',
  // List > Create > Storage Settings
  VOLUME_NAME_EXIST: '이미 존재하는 볼륨 이름입니다.',
  SELECT_TYPE: '선택 {type}',
  SPECIFY_SUBPATH: '하위 경로 지정',
  SPECIFY_SUBPATH_TIP: '컨테이너에 마운트할 볼륨의 하위 경로를 지정합니다.',
  MOUNT_PATH: '마운트 경로',
  MOUNT_PATH_NOT_SPECIFIED: '마운트할 키와 키의 마운트 경로를 선택하십시오',
  MOUNT_PATH_EMPTY: '마운트 경로를 입력하십시오.',
  MOUNT_PATH_REPEATED: '이미 존재하는 마운트 경로입니다.',
  // List > Create > Advanced Settings
  NETWORK_SEGMENT_SCAP: '네트워크 세그먼트',
  AVAILABLE_ADDRESSES: '사용 가능한 주소',
  POD_IP_POOL: '파드 IP 풀',
  SUBPATH: '하위 경로',
  // List > Create > Advanced Settings > Add Metadata
  ANNOTATION_PL: '어노테이션',
  CREATE_SUCCESSFUL: '성공적으로 생성되었습니다!',
  // List > Edit Information
  // List > Edit YAML
  // List > Re-create
  // List > Delete
  // List > Stop
  STOP: '중지',
  STOP_TITLE_SI: '중지 {type}',
  STOP_TITLE_PL: '대량 중지 {type}',
  STOP_DESC: '이 자원을 삭제하겠습니까?'
};