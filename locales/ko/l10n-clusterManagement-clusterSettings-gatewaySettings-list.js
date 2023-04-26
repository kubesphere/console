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
  // Navigation Pane
  GATEWAY_SETTINGS: '게이트웨이 설정',
  // Banner
  CLUSTER_GATEWAY_DESC: '클러스터에서 외부 네트워크 액세스 게이트웨이 및 서비스 관리의 구성을 설정하고 관리합니다.',
  // Cluster Gateway
  CLUSTER_GATEWAY_NOT_ENABLED: '클러스터 게이트웨이가 활성화되지 않음',
  CLUSTER_ENABLE_GATEWAY_DESC: '클러스터 게이트웨이를 활성화 하십시오.',
  CLUSTER_GATEWAY: '클러스터 게이트웨이',
  GATEWAY_ADDRESS_SCAP: '게이트웨어 주소',
  LOAD_BALANCER_PROVIDER_SCAP: '로드 밸런서 제공자',
  // Cluster Gateway > Enable Gateway
  ENABLE_GATEWAY: '게이트웨이 활성화',
  GATEWAY_TRACING_TIP: '<b>Tracing</b>을 활성화한 후 인그레스에 엑세스할 수 없다면, 인그레이스에 <b>nginx.ingress.kubernetes.io/service-upstream: true</b> 어노테이션을 추가하세요.',
  // Cluster Gateway > Manage > View Details
  VIEW_DETAILS: '상세 보기',
  // Cluster Gateway > Manage > Disable
  DISABLE: '비활성화',
  DISABLE_GATEWAY: '게이트웨이 활성화',
  DISABLE_GATEWAY_TIP: '이 게이트웨이를 비활성화하시겠습니까?',
  DISABLE_SUCCESSFUL: '성공적으로 비활성화하였습니다.',
  // Cluster Gateway > Manage > Edit
  EDIT: '편집',
  EDIT_TITLE: '편집 {title}',
  // Cluster Gateway > Manage > Update
  UPDATE: '업데이트',
  UPDATED_GATEWAY_TITLE: 'Update Gateway',
  UPDATE_GATEWAY_DESC: '이 작업으로 인해 잠시 동안 업무가 중단될 수 있습니다. 이 작업을 수행할 때는 주의해야 합니다.',
  // Project Gateways
  PROJECT_GATEWAY_PL: '프로젝트 게이트웨이',
  PROJECT_GATEWAY_NOT_ENABLED: '프로젝트 게이트웨이가 활성화되지 않음',
  PROJECT_ENABLE_GATEWAY_DESC: '프로젝트 게이트웨이를 활성화 하십시오.',
  REPLICA_COUNT: '복제본 수',
  NODE_PORTS: '노드 포트',
  UPDATE_GATEWAY_DESC: '현재 게이트웨이를 업데이트할 수 있습니다.',
  // Project Gateways > Disable
  PROJECT_GATEWAY_LOW: '프로젝트 게이트웨이',
  DISABLE_MULTIPLE_GATEWAYS: '일괄적으로 게이트웨이 사용 안 함'
};