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
  ROUTE_DESC: '인그레스는 서비스 트래픽을 통합해주는 방법을 제공합니다. 외부에서 엑세스 할 수 있는 IP 주소를 이용하여 클러스터 내부 서비스를 외부에 노출시킬 수 있습니다.',
  PREREQUESTS_FOR_USE_ROUTE_Q: '인그레스를 사용하기 위하여 필요한 조건은 무엇입니까?',
  PREREQUESTS_FOR_USE_ROUTE_A: '인그레스를 사용하려면 프로젝트 관리자에게 문의하여 프로젝트의 게이트웨이를 설정해야 합니다.',
  ACCESS_TYPES_OF_ROUTE_Q: '인그레스의 외부 액세스 모드는 무엇입니까?',
  ACCESS_TYPES_OF_ROUTE_A: 'KubeSphere 인그레서는 NodePort 및 LoadBalancer 두 가지 유형의 외부 액세스 모드를 지원합니다.',
  ROUTE_PL: '인그레스',
  // List
  GATEWAY_ADDRESS_TCAP: '게이트웨이 주소',
  ROUTE_EMPTY_DESC: '\b인그레스를 생성하세요.',
  // List > Create > Basic Information
  // List > Create > Routing Rules
  ADD_ROUTING_RULE_DESC: '라우팅 규칙을 추가하여 도메인 이름 경로를 서비스에 매핑합니다.',
  ADD_ROUTING_RULE: '라우팅 규칙 추가',
  ROUTING_RULE_EMPTY_DESC: '라우팅 규칙을 하나 이상 추가하십시오.',
  PATH_EMPTY_DESC: '경로를 하나 이상 추가하십시오.',
  AUTO_GENERATE_TCAP: '자동 생성',
  DOMAIN_NAME_TCAP: '도메인 이름',
  DOMAIN_NAME_EMPTY_DESC: '도메인 이름을 입력 하십시오.',
  INVALID_DOMAIN_DESC: '유효하지 않은 도메인 이름',
  INVALID_PATH_DESC: '잘못된 경로',
  MODE_TCAP: '모드',
  PATH_PL: '경로',
  PATH_SERVICE_TIP: '서비스',
  SET_ROUTING_RULES: '라우팅 규칙 추가',
  SPECIFY_DOMAIN_TCAP: '도메인 지정',
  NO_GATEWAY_DESC: '자동 생성 기능을 사용하려면 프로젝트 관리자에게 문의하여 프로젝트의 게이트웨이 설정에서 게이트웨이 액세스 모드를 설정하십시오.',
  PATH: '경로',
  PROTOCOL: '프로토콜',
  PORT: '포트',
  PORT_VALUE: '포트: {value}',
  CERTIFICATE: '인증서',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Routing Rules
  EDIT_ROUTING_RULES: '라우팅 규칙 편집',
  // List > Edit Annotations
  EDIT_ANNOTATIONS: '어노테이션 편집',
  // List > Delete
  ROUTE_LOW: '인그레스'
};