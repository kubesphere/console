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
  NETWORK_ISOLATION_DESC: '네트워크 격리를 구성하면 사용자는 동일한 워크스페이스 내의 파드 간 트래픽과 외부로부터의 트래픽을 제어하여 애플리케이션 격리를 구현하고 애플리케이션 보안을 강화할 수 있습니다.',
  NETWORK_ISOLATION_Q: '네트워크 격리를 더 잘 사용하려면 어떻게 해야 합니까?',
  NETWORK_ISOLATION_Q1: '네트워크 격리를 구현하기 위한 CNI 플러그인의 요구 사항은 무엇입니까?',
  // Network Isolation
  NETWORK_ISOLATION: '네트워크 격리',
  ENABLE: '사용',
  PROJECT_NETWORK_ISOLATION: '프로젝트 네트워크 격리',
  NETWORK_POLICY_EMP_TITLE: '네트워크 격리 사용 안 함',
  NETWORK_POLICY_EMP_DESC: '프로젝트 네트워크 액세스가 활성화된 후에는 다른 프로젝트에서 이 프로젝트에 접근할 수 없습니다. 그러나 프로젝트, 서비스 및 외부 IP 주소가 필요에 따라 이 프로젝트에 액세스하도록 허용할 수 있습니다.',
  // Network Isolation > Internal Allowlist
  INTERNAL_ALLOWLIST: '내부 허용 목록',
  INTERNAL_ALLOWLIST_TIP: '워크스페이스의 프로젝트 및 서비스를 허용 목록에 추가합니다.',
  INTERNAL_EGRESS_DESC: '현재 프로젝트의 파드는 다음 서비스 및 프로젝트의 파드에 접근할 수 있습니다.',
  INTERNAL_INGRESS_DESC: '현재 프로젝트의 파드는 다음 서비스 및 프로젝트의 파드에서 접근할 수 있습니다.',
  INTERNAL_ALLOWLIST_DESC: '현재 프로젝트의 파드가 현재 워크스페이스의 다른 프로젝트의 파드와 통신할 수 있도록 허용합니다.',
  EMPTY_RESOURCE_DESC: '프로젝트 또는 서비스를 하나 이상 선택하십시오.',
  // Network Isolation > External Allowlist
  EXTERNAL_ALLOWLIST: '외부 허용 목록',
  EXTERNAL_ALLOWLIST_TIP: '워크스페이스 외부의 네트워크 세그먼트 및 포트를 허용 목록에 추가합니다.',
  EXTERNAL_ALLOWLIST_DESC: '현재 프로젝트의 파드가 워크스페이스 외부의 특정 네트워크 세그먼트 및 포트와 통신할 수 있도록 허용합니다.',
  NETWORK_SEGMENT_EXAMPLE: '예제: 10.0.0.0',
  PORT_EXAMPLE: '예제: 80',
  EXTERNAL_EGRESS_DESC: '현재 프로젝트의 파드는 다음 네트워크 세그먼트 및 포트에 액세스할 수 있습니다.',
  EXTERNAL_INGRESS_DESC: '현재 프로젝트의 파드는 다음 네트워크 세그먼트 및 포트에서 액세스할 수 있습니다.',
  SELECT_RULE_DIRECTION_TIP: '트래픽 방향을 선택하십시오.',
  ENTER_VALID_SEGMENT_DESC: '올바른 네트워크 세그먼트를 입력하십시오.',
  ENTER_VALID_PORT_NUMBER_DESC: '유효한 포트 번호를 입력하십시오.',
  // Add Allowlist Entry
  ADD_ALLOWLIST_ENTRY: '허용 목록 항목 추가',
  EXTERNAL_TRAFFIC_DIRECTION_DESC: '이그레스는 현재 프로젝트에서 워크스페이스 외부로 향하는 방향을 나타냅니다. 인그레스는 워크스페이스 외부에서 현재 프로젝트로 향하는 방향을 나타냅니다.',
  TRAFFIC_DIRECTION: '트래픽 방향',
  NETWORK_SEGMENT_DESC: '네트워크 세그먼트를 설정합니다(CIDR이 지원됨).',
  EGRESS: '이그레스',
  INGRESS: '인그레스',
  INTERNAL_TRAFFIC_DIRECTION_DESC: '이그레스는 현재 프로젝트에서 다른 프로젝트로 향하는 방향을 나타냅니다. 인그레스는 다른 프로젝트에서 현재 프로젝트로 향하는 방향을 나타냅니다.',
  // Add Allowlist Entry > Project
  // Add Allowlist Entry > Service
  // Delete Allowlist Entry
  ALLOWLIST_ENTRY: '허용 목록 항목',
  ALLOWLIST_ENTRY_LOW: '허용 목록 항목'
};