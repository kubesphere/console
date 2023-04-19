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
  // Edit
  MODIFY_SUCCESSFUL: '수정되었습니다.',
  SERVICE_PROVIDER_WEBSITE_DESC: '서비스 공급자의 공식 웹 사이트 주소입니다.',
  WRONG_ADDRESS_TIP: '주소 형식이 잘못되었습니다. 올바른 주소를 입력하십시오.',
  APP_NAME_DESC: '이름에는 모든 문자를 사용할 수 있으며 최대 길이는 20자입니다.',
  APP_DESCRIPTION_DESC: '설명은 임의의 문자를 포함할 수 있으며 최대 길이는 120자입니다.',
  APP_ICON_FORMAT: '형식: PNG 또는 JPG',
  APP_ICON_SIZE: '크기: 96 x 96 픽셀',
  CHOOSE_APP_CATEGORY_DESC: '앱의 카테고리를 선택합니다.',
  EDIT_APP_DESC: '앱 템플릿의 기본 정보를 편집합니다.',
  ICON: '아이콘',
  SERVICE_PROVIDER_WEBSITE_TCAP: '서비스 제공자 웹사이트',
  START_EDITING: '편집 시작...',
  SCREENSHOTS_COLON: '스크린샷: ',
  DELETE_ALL: '전체삭제',
  // More > Install
  // More > Upload Version
  ADD_VERSION_SUCCESSFUL: '버전이 성공적으로 추가되었습니다.',
  UPLOAD_PACKAGE_OK_NOTE: '버전이 이미 존재합니다. 다른 버전을 업로드하십시오.',
  UPLOAD_NEW_VERSION: '업로드 버전',
  UPLOAD_NEW_VERSION_DESC: '새 버전의 앱 템플릿을 업로드합니다.',
  // More > Delete
  DELETE_APP_TEMPLATE_DESC: '애플리케이션 템플릿 이름 <b>{resource}</b>을(를) 입력하여 이 작업의 위험을 이해하고 있는지 확인합니다.',
  DELETE_APP_TEMPLATE_VERSIONS_DESC: '앱 템플릿 이름 <b>{resource}</b>을(를) 입력하여 이 작업의 위험을 이해하고 있는지 확인합니다. 앱 템플릿을 삭제하기 전에 템플릿의 모든 버전을 삭제해야 합니다.',
  APP_TEMPLATE_LOW: '앱 템플릿',
  // Attributes
  // Versions
  APP_STATUS_SUBMITTED: '제출됨',
  APP_STATUS_NOT_SUBMITTED: '미제출',
  VERSION_INFO: '버전 정보',
  INSTALL: '설치',
  SUBMIT_FOR_REVIEW: '검토를 위해 제출하기',
  DOWNLOAD_SUCCESSFUL: '다운로드 성공!',
  VERSION_DELETE_TIP: '버전 <strong>{name}</strong>을(를) 삭제하시겠습니까?',
  VERSION_SUBMIT_TIP: '버전 <strong>{name}</strong>을(를) 릴리즈하시겠습니까?',
  VERSION_CANCEL_TIP: '<strong>{name}</strong> 버전 제출을 취소하시겠습니까?',
  VERSION_RELEASE_TIP: '사용자는 버전 <strong>{name}</strong>이 출시된 후 앱스토어에서 해당 버전을 조회하고 배포할 수 있습니다. 정말로 릴리스하시겠습니까?',
  VERSION_SUSPEND_TIP: '일시 중단하면 <strong>{name}</strong> 버전은 앱스토어에 표시되지 않습니다. 그래도 일시 중단하시겠습니까?',
  VERSION_RECOVER_TIP: '복구하면 <strong>{name}</strong> 버전은 다시 앱스토어에서 표시됩니다. 복구하시겠습니까?',
  UPDATE_TIME_SCAP: '업데이트 시간',
  VIEW_IN_STORE: '스토어에서 보기',
  // Versions > Upload
  UPLOAD_AGAIN_TIP: '오류가 발생했습니다. 다시 시도하십시오.',
  // Versions > Submit for Review
  ENTER_VERSION_NUMBER_TIP: '버전 번호를 입력하십시오.',
  SUBMIT_REVIEW_DESC: '앱 스토어에 배포하기 전에 앱 템플릿을 제출하여 검토하십시오.',
  APP_LEARN_MORE: '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">더 알아보기</a>',
  INVALID_VERSION_TIP: '올바른 버전 번호를 입력하십시오.',
  // Versions > Submit for Review > Test Steps
  TEST_STEPS: '테스트 단계',
  VERSION_SUBMIT_TEST_STEPS: '1. 의존 된 모든 Chart들이 제출되었습니다. <br/>' + '2. 정적 분석이 통과되었습니다 (helm lint).<br/>' + '3. 기본값을 사용하여 앱을 시작할 수 있습니다(helm 설치). 모든 파드가 실행 중인 상태이며 모든 서비스에 하나 이상의 endpoint가(이) 있습니다.<br/>' + '4. 사용된 이미지에는 보안 취약점이 발견되지 않았습니다.<br/>' + '5. 업그레이드가 지원됩니다.<br/>' + '6. 커스텀 애플리케이션 구성이 지원됩니다.<br/>' + '7. Kubernetes의 알파 기능을 사용하지 마십시오.<br/>' + '8. 앱 소개, 전제 조건 및 커스텀 매개 변수 구성을 포함한 상세 문서가 제공됩니다.<br/>',
  VERSION_SUBMIT_NOTE: '제출하기 전에 앱이 다음 요구 사항을 충족하는지 확인하십시오:',
  // Versions > Submit for Review > Update Log
  UPDATE_LOG_DESC: '앱 업데이트에 대한 자세한 정보를 입력합니다.',
  SUBMIT_SUCCESSFUL: '제출 완료',
  CANCEL_SUCCESSFUL: '취소 완료',
  // App Information
  // App Release
  // App Instances
  APP_INSTANCES: '앱 인스턴스'
};