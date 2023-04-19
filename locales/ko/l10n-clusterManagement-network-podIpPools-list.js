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
  POD_IP_POOL_PL: '파드 IP 풀',
  POD_IP_POOL_DESC: '파드 IP 풀은 클러스터의 파드 네트워크 주소 공간을 관리하는 데 사용됩니다. 필요에 따라 파드 IP 풀을 생성할 수 있습니다.',
  IPPOOL_USAGE_Q: '파드 IP 풀을 사용하여 파드 네트워크를 관리하려면 어떻게 해야 합니까?',
  IPPOOL_USAGE_A: '파드 IP 풀은 파드 네트워크 주소 공간을 관리하는 데 사용되며 서로 다른 파드 IP 풀 사이의 주소 공간은 중복될 수 없습니다. 워크로드를 생성할 때 특정 파드 IP 풀을 선택하여 이 파드 IP 풀의 IP 주소를 생성된 파드에 할당할 수 있습니다.',
  // List
  POD_IP_POOL_EMPTY_DESC: '파드 IP 풀을 생성하십시오.',
  TOTAL_VALUE: '전체: {value}',
  ALL: '전체',
  NOT_ASSIGNED: '할당되지 않음',
  // List > Create
  CREATE_POD_IP_POOL: '파드 IP 풀 생성',
  NETWORK_SEGMENT: '네트워크 세그먼트',
  USED_IP_ADDRESSES: '사용 된 IP 주소',
  QUANTITY: '수량',
  IP_POOL_CREATE_DESC: '생성할 파드 IP 풀',
  IP_ADDRESS_EMPTY_DESC: 'IP 주소를 입력하십시오.',
  MASK_TIP: 'Please enter a mask.',
  ENTER_NETWORK_SEGMENT_TIP: '네트워크 세그먼트를 입력하십시오.',
  IP_POOL_NUM_TIP: '생성할 파드 IP 풀 수를 입력하십시오.',
  IP_POOL_CREATE_COUNT_DESC: '동시에 최대 10개의 파드 IP 풀을 만들 수 있습니다.',
  INVALID_IP_DESC: '잘못된 IP 주소 형식입니다.',
  // List > Edit Information
  // List > View YAML
  // Assign Workspace
  IPPOOL_ASSIGN_WORKSPACE_DESC: '파드 IP 풀을 워크스페이스에 할당합니다.',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING: '파드 IP 풀이 사용 중이므로 다른 특정 워크스페이스에 할당할 수 없습니다.',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING: '파드 IP 풀이 특정 워크스페이스에 할당된 상태에서 사용 중입니다. 워크스페이스를 변경할 수 없습니다.',
  ASSIGN_WORKSPACE: '워크스페이스 할당',
  SELECT_WORKSPACE_DESC: '워크스페이스를 선택하십시오.',
  // List > Delete
  POD_IP_POOL_LOW: '파드 IP 풀'
};