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
  NO_CLUSTER_TIP: '하나 이상의 클러스터를 추가하십시오.',
  // Add Cluster > Basic Information
  CLUSTER_NAME_EMPTY: '클러스터 이름을 입력하세요.',
  ADD_CLUSTER: '클러스터 추가',
  TAG: '태그',
  CLUSTER_TAG_DESC: '클러스터의 용도를 식별할 태그를 선택합니다.',
  CLUSTER_PROVIDER_DESC: '클러스터 인프라 제공자를 선택합니다.',
  // Add Cluster > Connection Settings
  CONNECTION_SETTINGS: '연결 설정',
  CONNECTION_MODE: '연결 모드',
  CLUSTER_CONNECT_MODE_DESC: '클러스터에 직접 연결하거나 에이전트를 사용합니다.',
  CONNTECT_DIRECT: '직접 연결',
  CONNTECT_PROXY: '에이전트 연결',
  INPUT_KUBECONFIG: '맴버 클러스터 kubeconfig',
  CLUSTER_DIRECT_IMPORT_TIP: 'KubeSphere의 멀티 클러스터 컨트롤 플레인은 제공된 Kubeconfig를 통해 멤버 클러스터에 연결됩니다. 이 방법을 사용하려면 호스트 클러스터가 kubeconfig의 서버 주소를 통해 멤버 클러스터에 직접 액세스할 수 있어야 합니다.</br></br>이 방법은 일반적으로 다음과 같은 시나리오에 적용됩니다. </br>1. 호스트 클러스터와 멤버 클러스터가 동일한 내부 네트워크에 있습니다.</br>2. 호스트 클러스터와 멤버 클러스터의 네트워크는 모두 VPN 또는 다른 기술(예: 터널링)을 통해 연결됩니다.</br>3. kubeconfig 내 서버 주소는 공용 네트워크를 통해 액세스할 수 있습니다.',
  CLUSTER_AGENT_IMPORT_TIP: 'KubeSphere 컨트롤 플레인은 프록시를 통해 멤버 클러스터에 연결됩니다. 컨트롤 플레인은 맴버 클러스터에서 생성한 클라이언트 구성 요소에 연결된 공용 프록시 서비스를 실행합니다. 따라서 reserved 프록시가 생성됩니다. 이 방법의 경우 컨트롤 플레인과 맴버 클러스터가 동일한 네트워크에 있을 필요는 없습니다. 멤버 클러스터의 API 서버 주소를 노출할 필요가 없습니다. 그러나 네트워크 성능이 영향을 받을 수 있습니다.</br></br>이 방법은 일반적으로 다음과 같은 시나리오에 적용됩니다. </br>1. 호스트 클러스터와 멤버 클러스터가 동일한 네트워크에 있지 않습니다.<br/>2. 호스트 클러스터와 멤버 클러스터 모두의 네트워크는 VPN 또는 다른 기술(예: 터널링)을 통해 연결할 수 없습니다.<br/>3. 클러스터 내의 네트워크 성능 저하를 감수할 수 있습니다.',
  CLUSTER_AGENT_TITLE: '클러스터에 제공된 에이전트를 기준으로 맴버 클러스터를 추가하십시오.',
  CLUSTER_AGENT_DESC: '클러스터에 에이전트를 설정해야 합니다.',
  HOW_TO_GET_KUBECONFIG: 'kubeconfig를 얻으려면 어떻게 해야 합니까?',
  // List
  HOST_CLUSTER_TCAP: '호스트 클러스터',
  HOST_CLUSTER_PL_TCAP: '호스트 클러스터',
  MEMBER_CLUSTER_TCAP_PL: '맴버 클러스터',
  CLUSTER_CONDITION_INITIALIZED: '초기화 됨',
  CLUSTER_CONDITION_AGENTAVAILABLE: '에이전트 가용함',
  CLUSTER_CONDITION_FEDERATED: '페더레인션에 가입 됨',
  CLUSTER_CONDITION_EXTERNALACCESSREADY: '외부 접근 가용 함',
  CLUSTER_CONDITION_READY: '클러스터 준비 완료',
  CLUSTER_CONDITION_OPENPITRIXRUNTIMEREADY: '앱스토어 준비 완료',
  CLUSTER_CONDITION_KUBECONFIGCERTEXPIRESINSEVENDAYS: 'kubeconfig가 곧 만료됩니다',
  NODE_COUNT: '노드',
  ENV_PRODUCTION: '프로덕션',
  ENV_DEVELOPMENT: '개발',
  ENV_TESTING: '테스팅',
  ENV_DEMO: '데모',
  UPDATE_KUBECONFIG: 'kubeconfig 업데이트',
  KUBE_CONFIG_IS_EXPIRED: 'KubeConfig가 만료 되었음',
  EXPIRE_DATE: '만료 시간',
  LAST_KUBE_CONFIG_EXPIRED: 'KubeConfig가 <span class="kubeConfig_expired">{count}/<span>일 후에 만료됨',
  VALIDATION_FAILED: '인증 실패',
  NO_CLUSTER_TIP_DESC: '클러스터는 KubeSphere를 실행하는 노드(물리적 또는 가상 머신)의 그룹입니다.',
  // List > Remove Cluster
  RISK_WARNING: '위험 경고',
  REMOVE_CLUSTER_TIP_A: '클러스터가 제거된 후에는 클러스터의 리소스가 자동으로 지워지지 않습니다.',
  REMOVE_CLUSTER_TIP_B: '클러스터가 제거된 후에는 클러스터의 멀티 클러스터 구성 데이터가 자동으로 지워지지 않습니다. KubeSphere를 제거하거나 관련 리소스를 삭제하면 사용자 데이터가 손실될 수 있습니다. <a href="https://kubesphere.io/docs/"> 공식 KubeSphere 설명서</a>를 참조하여 제거된 클러스터의 멀티 클러스터 구성 데이터를 수동으로 지워야 합니다.',
  CLUSTER_CONFIRM_TEXT: '클러스터를 제거할 때의 위험을 인지하였습니다.',
  ENTER_CLUSTER_NAME: '이 작업은 실행 취소할 수 없습니다. 클러스터 이름 <strong>{name}</strong>을 입력하여 이 작업의 위험을 이해하고 있는지 확인합니다.'
};