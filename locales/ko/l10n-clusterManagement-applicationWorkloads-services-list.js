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
  SERVICE_PL: '서비스',
  SERVICE_DESC: '서비스는 피드에서 실행 중인 애플리케이션을 네트워크 서비스로 노출할 수 있는 추상적화된 방법을 제공합니다.',
  // List
  SERVICE_EMPTY_DESC: '서비스를 생성하세요.',
  UNKNOWN: '알 수 없음',
  EXTERNAL_ACCESS: '외부 엑세스',
  INTERNAL_ACCESS: '내부 엑세스',
  // List > Edit YAML
  // List > Edit Service
  UNKNOWN_SERVICE_TYPE: '알려지지 않은 서비스 유형',
  // List > Delete
  SERVICE: '서비스',
  SERVICE_LOW: '서비스',
  // List > Create
  INTERNAL_ACCESS_MODE: '내부 엑세스 모드',
  CREATE_SERVICE: '서비스 생성',
  // List > Create > Basic Information
  SERVICE_NAME_DESC: '이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자로 시작하고 소문자 또는 숫자로 끝나야 합니다. 최대 길이는 63자입니다.',
  // List > Create > Service Settings
  VIRTUAL_IP_TITLE: '가상 IP 주소',
  INTERNAL_DOMAIN_NAME: '내부 도메인 이름',
  CONTAINER_PORT: '컨테이너 포트',
  INVALID_PORT: '유효하지않은 포트',
  PORT_EMPTY: '포트를 하나 이상 설정하십시오.',
  ENTER_SELECTOR_TIP: '워크로드 셀렉터를 설정하십시오.',
  Ports: '포트',
  SPECIFY_WORKLOAD: '워크로드 지정',
  SELECT_WORKLOAD_DESC: '워크로드 레이블을 셀렉터로 사용합니다.',
  VIRTUAL_IP_DESC: '가상 IP 주소가 서비스에 할당되었습니다. 서비스는 가상 IP 주소를 통해 클러스터 내에서 액세스할 수 있습니다.',
  INTERNAL_DOMAIN_NAME_DESC: '서비스에 할당된 IP 주소가 없습니다. 서비스는 클러스터 DNS 메커니즘을 통해 클러스터 내에서 액세스할 수 있습니다.',
  SERVICE_PORTS_DESC: '컨테이너 포트 및 서비스 포트를 설정합니다.',
  NO_WORKLOAD_MATCH_SELECTOR: '현재 셀렉터가 워크로드와 일치하지 않습니다.',
  WORKLOADS_MATCH_SELECTOR_SI: '현재 셀렉터({selector})가 {count}개의 워크로드와 일치합니다.',
  WORKLOADS_MATCH_SELECTOR_PL: '현재 셀렉터({selector})가 {count}개의 워크로드와 일치합니다.',
  WORKLOAD_SELECTOR: '워크로드 셀렉터',
  SERVICE_SETTINGS: '서비스 설정',
  // List > Create > Service Settings > Workload Selector > View Details
  TOTAL_WORKLOADS_VALUE: '전체 워크로드: {count}',
  // List > Create > Advanced Settings
  OPENELB_NOT_READY: 'OpenELB가 설치되지 않았습니다. OpenELB를 설치하십시오.',
  SESSION_PERSISTENCE: '세션 Persistence',
  MAXIMUM_STICKINESS_DURATION: '최대 세션 유지 시간 (초)',
  SESSION_PERSISTENCE_DESC: '지정된 기간 내에 동일한 클라이언트에서 동일한 파드로 모든 요청을 전달하도록 시스템을 설정합니다.',
  SERVICE_EXTERNAL_ACCESS_DESC: '클러스터 외부에서 서비스에 액세스하는 방법을 설정합니다.',
  ACCESS_NODEPORT_TIP: '클러스터 노드의 포트를 사용하여 서비스에 액세스합니다.',
  ACCESS_LOADBALANCER_TIP: '로드 밸런서를 사용하여 서비스에 액세스합니다.',
  WORKLOAD_ANNOTATIONS: '워크로드 어노테이션',
  LABEL_FORMAT_DESC: '레이블의 키 및 값은 문자, 숫자, 하이픈(-), 밑줄(_) 및 점(.)만 포함할 수 있으며 문자 또는 숫자로 시작하고 끝나야 합니다. 각 키와 각 값의 최대 길이는 63자입니다 (키에 도메인 이름이 포함된 경우 최대 길이는 253자입니다).'
};