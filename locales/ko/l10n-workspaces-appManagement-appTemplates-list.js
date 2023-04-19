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
  APP_TEMPLATE_PL: '앱 템플릿',
  APPS_MANAGEMENT: '앱 관리',
  UPLOAD_TEMPLATE: '템플릿 업로드',
  APP_TEMPLATE_DESC: 'KubeSphere는 애플리케이션에 대한 전체 라이프사이클 관리 기능을 제공합니다. 새 앱 템플릿을 업로드하거나 생성하여 빠르게 테스트할 수 있습니다. 또한 앱을 앱스토어에 게시하여 다른 사용자가 원클릭으로 배포할 수 있습니다.',
  DEVELOP_APP_DESC: 'Helm Chart를 업로드하거나 KubeSphere에서 제공하는 리소스 오케스트레이션 도구를 사용하여 앱 템플릿을 작성할 수 있습니다.',
  DEVELOP_APP_TITLE: '앱 템플릿을 개발하려면 어떻게 해야 합니까?',
  HOW_PUBLISH_APP_TITLE: '앱 스토어에 앱을 릴리스하려면 어떻게 해야 합니까?',
  HOW_PUBLISH_APP_DESC: 'Helm Chart를 앱 템플릿형식으로 워크스페이스에 업로드할 수 있습니다. 업로드 된 앱은 승인된 후 앱스토어에 릴리스됩니다.',
  // List
  APP_STATUS_ACTIVE: '릴리즈됨',
  APP_STATUS_DRAFT: '릴리즈되지 않음',
  APP_STATUS_SUSPENDING: '보류됨',
  APP_TEMPLATE_EMPTY_DESC: '앱 템플릿을 생성하십시오.',
  LATEST_VERSION: '최신 버전',
  // List > Create
  CREATE_APP_TEMPLATE: '앱 템플릿 생성',
  CREATE_APP_TEMPLATE_DESC: '가볍고 이식성이 좋으며 자체 포함형 소프트웨어 패키지 기술을 통해 응용 프로그램을 거의 모든 곳에서 동일한 방식으로 실행할 수 있습니다.',
  APP_CREATE_GUIDE: '개발 가이드 <a href="{docUrl}/application-store/app-developer-guide/helm-specification/" target="_blank" rel="noreferrer noopener">Helm 사양</a>을 참고하십시오.',
  UPLOAD: '업로드',
  // List > Create > Upload
  UPLOAD_HELM_TITLE: 'Helm Chart 업로드',
  UPLOAD_HELM_CHART_DESC: '기존 Helm Chart를 업로드 합니다.',
  HELM_CHART_FORMAT_DESC: 'tar.gz 및 tgz 형식을 지원합니다.',
  UPLOAD_ICON: '아이콘 업로드',
  UPLOAD_SUCCESSFUL: '업로드 성공',
  UPLOADING: '업로드 중',
  FILE_MAX_SIZE_ICON: '아이콘의 최대 크기는 96 x 96 픽셀입니다.',
  FILE_MAX_SCREENSHOTS: '스냅샷 크기는 2MB를 초과할 수 없습니다.',
  APP_ICON_NOTE: '96 x 96 픽셀의 JPG 또는 PNG 이미지를 업로드합니다.',
  MISS_FILE_NOTE: '{file} 파일을 찾을 수 없습니다.',
  LICENSE_FILE_DESC: '텍스트 형식의 라이선스 계약입니다.',
  CHART_FILE_DESC: '이름 및 버전과 같은 Chart에 대한 기본 정보를 포함하고 있는 YAML 파일.',
  README_FILE_DESC: '앱에 대한 소개입니다.',
  REQUIREMENTS_FILE_DESC: 'Chart의 종속성을 설명하는 파일입니다.',
  VALUES_FILE_DESC: 'Chart의 기본 구성 파일입니다.',
  CHARTS_FILE_DESC: 'Chart의 종속성을 포함하는 디렉터리입니다.',
  TEMPLATES_FILE_DESC: '배포 템플릿 파일들을 포함하고 있는 디렉터리입니다.',
  NOTES_FILE_DESC: '사용자 지침입니다.',
  INCORRECT_FILE: '잘못된 파일입니까? ',
  TRY_AGAIN: '다시 시도하세요',
  FILE_MAX_ICON_DESC: '아이콘 크기는 20KB를 초과할 수 없습니다. 다시 시도하십시오.',
  HOMEPAGE: '홈페이지',
  OPTIONAL: '선택사항'
};