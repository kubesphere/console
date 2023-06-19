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
  // List
  STATEFULSET_EMPTY_DESC: '스케이트풀셋을 생성하십시오.',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  // List > Create > Pod Settings
  POD_SETTINGS: '파드 설정',
  POD_REPLICAS: '파드 복제본',
  ONDELETE: '삭제 시 업데이트',
  ONDELETE_DESC: '파드 복제본을 수동으로 삭제할 때만 업데이트합니다.',
  PARTITION_ORDINAL: '파드 복제본 분할을 위한 순서값',
  PARTITION_ORDINAL_DESC: '파드 복제본을 두 그룹으로 분할하는 순서를 설정합니다. 스테이트풀세트가 업데이트되면 이 매개 변수 값보다 크거나 같은 순서를 가진 파드 복제본만 업데이트됩니다.',
  // List > Create > Storage Settings
  PVC_NAME_PREFIX: 'PVC 이름 접두사',
  PVC_NAME_PREFIX_DESC: '퍼시스턴트 볼륨 클레임 이름의 접두사입니다. 접두사는 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 253자입니다.',
  PVC_NAME_PREFIX_EMPTY: '퍼시스턴트 볼륨 클레임 이름의 접두사를 입력하십시오.',
  INVALID_PVC_NAME_PREFIX: '접두사가 잘못되었습니다. 접두사는 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 253자입니다.',
  PVC_NAME_PREFIX_EXISTS: '접두사가 이미 \b존재합니다. 다른 접두사를 입력하십시오.',
  ADD_PERSISTENT_VOLUME_CLAIM_TEMPLATE: '퍼시스턴트 볼륨 클레임 템플릿 추가',
  ADD_PERSISTENT_VOLUME_CLAIM_TEMPLATE_DESC: '퍼시스턴트 볼륨 클레임 템플릿을 추가하여 스테이트풀세트의 각 파드에 퍼시스턴트 볼륨을 마운트합니다.',
  VOLUME_CAPACITY_TCAP: '볼륨 용량',
  MOUNT_PATH_TCAP: '마운트 경로',
  VOLUME_TEMPLATES: '볼륨 템플릿',
  // List > Create > Advanced Settings
  // List > Create > Cluster Differences
  SERVICE_PORT: '서비스 포트',
  SERVICE_PORT_VALUE: '서비스 포트: {value}',
  // List > Create > Cluster Differences (Displayed after you add a volume template)
  VOLUME_TEMPLATE_SETTINGS: '볼륨 템플릿 설정',
  CLUSTER_VOLUME_DIFF_DESC: '서로 다른 클러스터에서 서로 다른 스토리지 설정을 사용합니다.'
};