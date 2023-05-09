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
  CONTINUOUS_DEPLOYMENT_PL: '지속적 배포',
  CONTINUOUS_DEPLOYMENT_DESC: '깃옵스(GitOps)를 통해 리소스를 지속적으로 배포하기 위한 지속적인 배포 관리를 수행한다. ',
  // List
  CONTINUOUS_DEPLOYMENT_EMPTY_DESC: '지속적 배포를 하나 생성하십시오.',
  DEGRADED: '열화됨',
  PROGRESSING: '진행 중',
  SYNCED: '동기화됨',
  MISSING: '누락됨',
  SUSPENDED: '중단됨',
  OUTOFSYNC: '동기화되지 않음',
  DEPLOY_LOCATION: '배포 위치',
  // List > Create
  NEED_TO_SYNC_REPO: '저장소 동기화 필요',
  CREATE_CONTINUOUS_DEPLOYMENT: '지속적 배포 생성',
  CD_SELECT_CODE_REPO_DESC: '지속적 배포 시 사용할 코드 저장소를 선택합니다.',
  DEPLOYMENT_SETTINGS: '배포 설정',
  CODE_REPOSITORY_SETTINGS: '코드 저장소 설정',
  SYNC_STRATEGY_TCAP: '동기화 전략',
  AUTO_SYNC_DESC: '설정된 동기화 옵션에 따라 Git 저장소에 존재하는 매니페스트와 배포된 리소스의 실시간 상태가 다를 경우 애플리케이션 동기화를 자동으로 트리거합니다.',
  // MANUAL_SYNC_DESC: 'Sync according to custom rules.',
  PRUNE_RESOURCES: '리소스 정리(삭제)',
  SELF_HEAL: '셀프 힐(self-heal)',
  MANIFEST_FILE_PATH: '매니페스트 파일 경로',
  // MANIFEST_FILE_PATH_DESC: 'Set the manifest file path. ',
  DIRECTORY_RECURSE: '디렉토리 재귀 탐색',
  REPO_EMPTY_DESC: '코드 저장소를 선택하십시오.',
  VALUES_FILES: 'Values 파일',
  VALUES_FROM: 'Values 소스',
  STORAGE_NAMESPACE: '스토리지 네임스페이스',
  TEST: '테스트',
  REVISIONS_DESC: 'Git 저장소 커밋 ID, 브랜치 또는 태그입니다. 예: "master", "v1.2.0", "0a1b2c3" 또는 "HEAD"입니다.',
  MANIFEST_FILE_PATH_DESC: '매니페스트 파일 경로(예: "deployments/nginx" 또는 "deployments/")',
  MANUAL_SYNC_DESC: '커스텀 규칙에 따라 동기화합니다.',
  AUTO_SYNC_DESC: '설정된 동기화 옵션에 따라 Git의 매니페스트와 배포된 리소스의 런타임 상태가 다를 경우 애플리케이션 동기화를 자동으로 트리거합니다.',
  PRUNE_RESOURCES_DESC: '이 옵션을 선택하면 Git에 없는 리소스가 자동 동기화 중에 삭제됩니다. 이 옵션을 선택하지 않으면 자동 동기화가 트리거될 때 클러스터의 리소스가 삭제되지 않습니다.',
  SELF_HEAL_DESC: '이 옵션을 선택하면 Git의 정의된 상태와 배포된 리소스 간에 편차가 있을 경우 Git의 정의된 상태가 적용됩니다. 이 옵션을 선택하지 않으면 배포된 리소스가 변경될 때 자동 동기화가 트리거되지 않습니다.',
  FOREGROUND_DESC: '먼저 종속 된 리소스를 삭제한 다음, 메인 리소스를 삭제하십시오.',
  BACKGROUND_DESC: '먼저 메인 리소스를 삭제하고, 그 다음 종속된 리소스를 삭제하십시오.',
  ORPHAN_DESC: '메인 리소스만 삭제하고 종속 된 리소스를 orphan 상태로 남겨둡니다.',
  SKIP_SCHEMA_VALIDATION_DESC: 'kubectl 유효성 검사를 건너뜁니다. kubectl apply를 실행할 때 자동으로 --validation=false 플래그를 추가합니다.',
  AUTO_CREATE_PROJECT_DESC: '애플리케이션에 대한 프로젝트가 존재하지 않는 경우 자동으로 프로젝트를 생성합니다.',
  PRUNE_LAST_DESC: '다른 리소스들이 모두 배포 완료되어 정상 상태로 동작 중일 경우에만 리소스를 정리합니다.',
  APPLY_OUT_OF_SYNC_ONLY_DESC: '동기화되지 않은 리소스에만 적용합니다.',
  // List > Delete
  CONTINUOUS_DEPLOYMENT: '지속적 배포',
  CONTINUOUS_DEPLOYMENT_LOW: '지속적 배포',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_SI: '지속적 배포 {resource}을(를) 삭제하려고 합니다. <br/>지속적 배포를 통하여 생성된 리소스를 삭제할지 여부를 확인하십시오.\n',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_PL: '지속적 배포 {resource}을(를) 삭제하려고 합니다. <br/>지속적 배포에 의하여 생성된 리소스를 삭제할지 여부를 확인하십시오.',
  NO_CONTINUOUS_DEPLOYMENT_RELATED_RESOURCE_DESC: '지속적 배포를 통하여 생성된 리소스를 찾을 수 없습니다.',
  DELETE_MULTIPLE_CONTINUOUS_DEPLOYMENT: '지속적 배포 일괄 삭제',
  DELETE_CONTINUOUS_DEPLOYMENT: '지속적 배포 삭제',
  DELETE_CONTINUOUS_DEPLOYMENT_RELATE_DESC: '{resourceName}에 의하여 생성된 리소스 삭제',
  // List > Sync
  SYNC: '동기화',
  SYNC_RESOURCE: '리소스 동기화',
  REVISION: '리비전',
  REVISION_DESC: '코드 저장소의 브랜치 또는 태그를 설정합니다.',
  PRUNE: '정리',
  DRY_RUN: '모의 실행',
  APPLY_ONLY: '적용만 하기',
  FORCE: '강제',
  SYNC_SETTINGS: '동기화 설정',
  SKIP_SCHEMA_VALIDATION: '스키마 유효성 검사 건너뛰기',
  AUTO_CREATE_PROJECT: '프로젝트 자동 생성',
  PRUNE_LAST: '마지막 정리',
  APPLY_OUT_OF_SYNC_ONLY: '동기화되지 않은 경우에만 적용',
  PRUNE_PROPAGATION_POLICY: '정리 전파 정책 (Prune Propagation Policy)',
  REPLACE_RESOURCE: '리소스 대체 (Replace Resource)',
  REPLACE_RESOURCE_DESC: '이미 존재하는 리소스를 대체합니다.',
  EMPTY_CD_TITLE: '지속적 배포를 찾을 수 없습니다',
  SYNC_TRIGGERED: '리소스 동기화가 성공적으로 트리거되었습니다.',
  // List > Parameter
  PARAMETER_SETTINGS: '매개변수 설정',
  AUTO_PARAMETER: '자동',
  AUTO_PARAMETER_DESC: '자동으로 설정합니다.',
  HELM_PARAMETER: 'Helm',
  HELM_PARAMETER_DESC: 'Helm 매개변수를 설정합니다.',
  KUSTOMIZE_PARAMETER: 'Kustomize',
  KUSTOMIZE_PARAMETER_DESC: 'Kustomize 매개변수를 설정합니다.',
  PASS_CREDENTIALS: 'Pass Credentials',
  IGNORE_MISSING_VALUE_FILES: '누락된 Values 파일 무시하기',
  SKIP_CRDS: 'CRDs 건너뛰기',
  RELEASE_NAME: '릴리스 이름',
  VALUE_FILES: 'Values 파일',
  FORCE_STRING: '강제 문자열',
  FILE_PARAMETERS: '파일 매개변수',
  NAME_PREFIX: '이름 접두사',
  NAME_SUFFIX: '이름 접미사',
  IMAGES: '이미지',
  COMMON_LABELS: '공통 레이블',
  COMMON_ANNOTATIONS: '공통 어노테이션'
};