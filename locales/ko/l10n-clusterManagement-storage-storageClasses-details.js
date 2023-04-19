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
  // Attributes
  TRUE: '예',
  FALSE: '아니오',
  // More > Set as Default Storage Class
  SET_DEFAULT_STORAGE_CLASS_TITLE: '기본 스토리지 클래스로 설정',
  SET_AS_DEFAULT_STORAGE_CLASS: '기본 스토리지 클래스로 설정',
  STORAGE_CLASS_SET_DEFAULT_DESC: '기본 스토리지 클래스가 설정된 후 특별한 요구 사항이 추가되지 않은 경우 시스템은 기본적으로 이 클래스의 볼륨을 생성합니다. KubeSphere 클러스터에는 기본 스토리지 클래스가 하나만 허용됩니다.',
  // More > Edit Authorization Rules
  SET_AUTHORIZATION_RULES: '권한 부여 규칙 설정',
  AUTHORIZATION_RULES: '권한 부여 규칙',
  AUTHORIZATION_RULES_DESC: '특정 프로젝트 및 워크스페이스에서만 스토리지 클래스에 액세스할 수 있도록 권한 부여 규칙을 설정합니다.',
  AUTHORIZATION_NOT_SUPPORT: '클러스터가 현재 이 기능을 지원하지 않습니다. KubeSphere를 v3.3.0 이상으로 업그레이드하거나  <a href="https://github.com/kubesphere/storageclass-accessor" target="_blank">storageclass-accessor</a>를 수동으로 설치하십시오.',
  OPERATOR_IN: 'In',
  OPERATOR_NOT_IN: 'Not in',
  // More > Set Volume Permissions
  SET_VOLUME_OPERATIONS: '볼륨 작업 설정',
  VOLUME_CLONING: '볼륨 복제',
  VOLUME_CLONING_DESC: '사용자가 볼륨을 복제할 수 있도록 합니다.',
  VOLUME_SNAPSHOT_CREATION: '볼륨 스냅샷 생성',
  VOLUME_SNAPSHOT_CREATION_DESC: '사용자가 볼륨 스냅샷을 만들 수 있도록 합니다.',
  VOLUME_EXPANSION_DESC: '사용자가 볼륨을 확장할 수 있도록 합니다. 볼륨은 확장만 가능하며 축소할 수 없습니다.',
  SET_VOLUME_OPERATIONS_TIP: '다음 설정은 사용자가 웹 콘솔에서 작업을 수행할 수 있는지 여부만 제어합니다. 스토리지 클래스를 기반으로 생성된 퍼시스턴트 볼륨이 실제로 해당 작업을 지원하는지 여부는 백엔드 스토리지 시스템에 따라 다릅니다.',
  // More > Set Auto Expansion
  SET_AUTO_EXPANSION: '자동 확장 설정',
  AUTO_EXPANSION: '자동 확장',
  AUTO_EXPANSION_DESC: '나머지 볼륨 공간이 임계값보다 작을 때 볼륨을 자동으로 확장하도록 시스템을 설정합니다.',
  AUTO_EXPANSION_SETTINGS: '자동 확장 설정',
  MAXIMUM_SIZE: '최대 크기',
  INCREMENT: '증가',
  INCREMENT_DESC: '스토리지 클래스의 CSI 플러그인에 따라 볼륨 크기 \b증가분을 설정합니다.',
  RESTART_WORKLOAD_AUTOMATICALLY: '워크로드 자동 다시 시작',
  RESTART_WORKLOAD_AUTOMATICALLY_DESC: '시스템은 자동으로 볼륨 상태를 확인하여 워크로드를 재시작해야 하는지 여부를 결정합니다.',
  RESTART_WORKLOAD_AUTOMATICALLY_TIP: '시간 초과 기간이 만료되었을 때 볼륨이 성공적으로 확장되지 않으면 시스템은 "restart.kubesphere.io/skip" 주석을 워크로드에 추가하여 워크로드가 더 이상 다시 시작되지 않도록 합니다. 워크로드에 대해 자동 재시작 기능을 다시 활성화하려면 워크로드의 주석을 수동으로 삭제해야 합니다.',
  // More > Delete
  // Persistent Volume Claims > Persistent Volume Claims
  MAXIMUM_SIZE_SCAP: '최대 크기',
  VALUE_TIMEOUT: '{value}s (시간 초과)',
  // Persistent Volume Claims > Persistent Volume Claims
  PVC_COUNT: 'PVCs'
};