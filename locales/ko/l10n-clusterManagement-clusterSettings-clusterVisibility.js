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
  CLUSTER_VISIBILITY: '클러스터 가시성',
  EDIT_VISIBILITY_DESC: '워크스페이스에서 클러스터 가시성을 편집합니다.',
  UNAUTHORIZED: '엑세스 권한 없음',
  CLUSTER_VISIBILITY_DESC: '클러스터 가시성은 워크스페이스에 대한 클러스터 권한 부여를 제어합니다. 클러스터에 워크스페이스 권한이 부여되면 워크스페이스에서 클러스터 리소스를 보고 관리할 수 있습니다.',
  CLUSTER_VISIBILITY_Q1: '어떻게 클러스터를 특정 워크스페이스에 위임하여 사용할 수 있습니까?',
  CLUSTER_VISIBILITY_A1: '가시성 편집을 클릭하여 특정 워크스페이스에 클러스터를 \b위임할 수 있습니다.',
  CLUSTER_VISIBILITY_Q2: '공용 클러스터란 무엇입니까?',
  CLUSTER_VISIBILITY_A2: '공용 클러스터는 모든 플랫폼 사용자가 액세스할 수 있습니다. 사용자는 공용 클러스터에 리소스를 만들고 예약할 수 있습니다.',
  // List
  WORKSPACE: '워크스페이스',
  CLUSTER_VISIBILITY_SCAP: '클러스터 가시성',
  AUTHORIZATION_TIME_TCAP: '인증 시간',
  // List > Edit Visibility
  EDIT_VISIBILITY: '가시성 편집',
  AUTHORIZED: '권한 부여 됨',
  SET_PUBLIC_CLUSTER: '공용 클러스터로 설정',
  HOST_CLUSTER_VISIBILITY_WARNING: '호스트 클러스터를 워크스페이스에 할당할 때는 신중해야 합니다. 호스트 클러스터의 부하가 너무 높으면 멀티 클러스터 시스템의 안정성이 저하될 수 있습니다.',
  CLUSTER_VISIBILITY_REMOVE_WARNING: '클러스터를 사용하는 워크스페이스에 대한 권한이 제거되면 클러스터에 있는 워크스페이스의 모든 리소스가 삭제됩니다.',
  REMOVE_WORKSPACE_CONFIRM_TITLE: '권한 제거',
  REMOVE_WORKSPACE_CONFIRM_SI: '워크스페이스 이름 <strong>{resource}</strong>을 입력하여 이 작업의 위험을 이해하고 있는지 확인합니다.',
  REMOVE_WORKSPACE_CONFIRM_PL: '워크스페이스 이름 <strong>{resource}</strong>들을 입력하여 이 작업의 위험을 이해하고 있는지 확인합니다.'
};