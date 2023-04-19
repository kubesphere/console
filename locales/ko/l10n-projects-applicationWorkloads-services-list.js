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
  SERVICE_TYPES_Q: 'KubeSphere에서 지원하는 서비스 유형은 무엇입니까?',
  SERVICE_TYPES_A: 'KubeSphere는 상태 유지가 필요하지 않는 서비스(stateless service) 및 상태 유지가 필요한 서비스(stateful service)를 지원합니다. 상태 유지가 필요하지 않는 서비스의 파드 복제본은 동일한 볼륨을 공유하지만 상태 유지가 필요한 서비스의 각 파드 복제본은 독립적인 볼륨을 가집니다.',
  SCENARIOS_FOR_SERVICES_Q: '상태 유지가 필요하지 않는 서비스 및 상태 유지가 필요한 서비스의 사용 사례는 무엇입니까?',
  SCENARIOS_FOR_SERVICES_A: '상태 유지가 필요하지 않는 서비스는 Nginx 및 Tomcat과 같이 데이터 지속성이 필요하지 않은 시나리오에 적합합니다. 상태 유지가 필요한 서비스는 MySQL 데이터베이스, Kafka 및 Zookeeper와 같이 데이터 지속성이 필요한 시나리오에 적합합니다.',
  // Service List
  SERVICE_TYPE: '서비스 유형',
  SERVICE_LIST: '서비스 목록',
  SERVICE_TYPE_STATEFULSERVICE: '상태 유지가 필요한 서비스',
  SERVICE_TYPE_STATELESSSERVICE: '상태 유지가 필요하지 않는 서비스',
  SERVICE_TYPE_EXTERNALSERVICE: '외부 서비스',
  HEADLESS: '헤드리스',
  EXTERNALNAME: 'ExternalName',
  // List > Create
  CREATE_SERVICE_DESC: '서비스 생성 방법을 선택합니다.',
  SELECT_SERVICE_TYPE_DESC: '상태 유지가 필요하지 않는 서비스 또는 상태 유지가 필요한 서비스를 생성하거나 서비스를 외부 서비스에 매핑합니다.',
  SERVICE_FROM_CODE: '소스 코드로부터 서비스 생성',
  SERVICE_FROM_ARTIFACT: '아티팩트로부터 서비스 생성',
  SERVICE_FROM_CODE_DESC: '기존 소스 코드로 이미지를 빌드하고 이미지를 배포합니다.',
  SERVICE_FROM_ARTIFACT_DESC: '기존 아티팩트를 이용하여 이미지를 빌드하고 이미지를 배포합니다.',
  CUSTOMIZE_SERVICE: '서비스 커스터마이즈',
  CUSTOMIZE_SERVICE_DESC: '워크로드를 지정하거나 YAML 구성 파일을 편집하여 서비스를 생성합니다.',
  // List > Create > Select Service Type > Stateless Service > Pod Settings > Port Settings
  PORT_INPUT_DESC: '포트 이름이 이미 존재합니다. 다른 이름을 입력하십시오.',
  PORT_NAME_DESC: '포트 이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 63자입니다.',
  // List > Create > Select Service Type > Stateful Service
  // List > Create > Select Service Type > External Service
  CREATE_EXTERNAL_SERVICE_DESC: '서비스를 생성하고 외부 서비스에 매핑합니다.',
  CREATE_EXTERNAL_SERVICE: '외부 서비스 생성',
  EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC: '외부 서비스의 도메인 이름을 입력하십시오.',
  EXTERNAL_SERVICE_ADDRESS: '외부 서비스 주소',
  EXTERNAL_SERVICE_ADDRESS_DESC: '외부 서비스의 도메인 이름을 입력합니다.',
  // List > Create > Create Service from Source Code
  JAVA: 'Java',
  NODEJS: 'Node.js',
  PYTHON: 'Python',
  LANGUAGE_TYPE_VALUE: '언어 유형: {value}',
  // List > Create > Create Service from Source Code > Java > Basic Information
  // List > Create > Create Service from Source Code > Java > Build Settings
  // List > Create > Create Service from Source Code > Java > Pod Settings
  // List > Create > Create Service from Source Code > Java > Volume Settings
  // List > Create > Create Service from Source Code > Java > Advanced Settings
  // List > Create > Create Service from Source Code > Node.js > Basic Information
  // List > Create > Create Service from Source Code > Node.js > Build Settings
  // List > Create > Create Service from Source Code > Node.js > Pod Settings
  CONTAINER_SETTINGS: '컨테이너 설정',
  // List > Create > Create Service from Source Code > Node.js > Volume Settings
  // List > Create > Create Service from Source Code > Node.js > Advanced Settings
  // List > Create > Create Service from Source Code > Python > Basic Information
  // List > Create > Create Service from Source Code > Python > Build Settings
  // List > Create > Create Service from Source Code > Python > Pod Settings
  // List > Create > Create Service from Source Code > Python > Volume Settings
  // List > Create > Create Service from Source Code > Python > Advanced Settings
  // List > Create > Create Service from Artifact
  ARTIFACT_TYPE_VALUE: '아티팩트 유형: {value}',
  // List > Create > Create Service from Artifact > JAR > Basic Information
  // List > Create > Create Service from Artifact > JAR > Build Settings
  // List > Create > Create Service from Artifact > JAR > Pod Settings
  // List > Create > Create Service from Artifact > JAR > Volume Settings
  // List > Create > Create Service from Artifact > JAR > Advanced Settings
  // List > Create > Create Service from Artifact > WAR > Basic Information
  // List > Create > Create Service from Artifact > WAR > Build Settings
  // List > Create > Create Service from Artifact > WAR > Pod Settings
  // List > Create > Create Service from Artifact > WAR > Volume Settings
  // List > Create > Create Service from Artifact > WAR > Advanced Settings
  // List > Create > Create Service from Artifact > Binary > Basic Information
  BINARY: '바이너리',
  // List > Create > Create Service from Artifact > Binary > Build Settings
  // List > Create > Create Service from Artifact > Binary > Pod Settings
  // List > Create > Create Service from Artifact > Binary > Volume Settings
  // List > Create > Create Service from Artifact > Binary > Advanced Settings
  // List > Create > Customize Service > Specify Workload > Basic Information
  SPECIFY_WORKLOAD_TO_CREATE_SERVICE: '워크로드를 지정하여 서비스 생성',
  EDIT_YAML_TO_CREATE_SERVICE: 'YAML을 편집하여 서비스 생성',
  SPECIFY_WORKLOAD_DESC: '하나 이상의 기존 워크로드를 사용하여 서비스를 생성합니다.',
  // List > Create > Customize Service > Specify Workload > Service Settings
  // List > Create > Customize Service > Specify Workload > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Service
  // List > Edit External Access
  // List > Delete
  NO_RELATED_RESOURCE_FOUND: '관련 리소스를 찾을 수 없음',
  NO_SERVICE_RELATED_RESOURCE_DESC: '서비스와 관련된 리소스를 찾을 수 없습니다.',
  DELETE_SERVICE_DESC: '{resource} 서비스를 삭제하려고 합니다. 연결된 리소스를 삭제할지 여부를 확인하십시오?',
  DELETE_SERVICE_DESC_PL: '{resource} 서비스를 삭제하려고 합니다.<br/>서비스와 관련된 다음 리소스도 삭제하시겠습니까?',
  DELETE_SERVICE_DESC_SI: '{resource} 서비스를 삭제하려고 합니다.<br/>서비스와 관련된 다음 리소스도 삭제하시겠습니까?',
  DELETE_SERVICE: '서비스 삭제',
  DELETE_MULTIPLE_SERVICES: '여러 서비스 삭제',
  // Service Topology
  SERVICE_TOPOLOGY: '서비스 토폴로지',
  AUTO_REFRESH: '자동 새로고침',
  POD_COUNT_VALUE: '파드: {value}'
};