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
  APP_REPOSITORY_PL: '앱 저장소',
  APP_REPO: '앱 저장소',
  HOW_TO_USE_APP_REPO_Q: '앱 저장소를 어떻게 사용합니까?',
  HOW_TO_USE_APP_REPO_A: '워크스페이스에 있는 프로젝트로 이동해야 합니다. 새 앱을 배포할 때는 <b>앱 템플릿으로부터</b>를 선택한 다음 드롭다운 목록에서 앱 저장소를 선택하여 저장소에 앱을 배포합니다.',
  APP_REPO_DESC: '앱 저장소는 응용 프로그램 템플릿을 저장하는 데 사용되는 저장소입니다. 앱 저장소를 추가하여 해당 앱을 배포하고 관리할 수 있습니다.',
  // List
  APP_REPOSITORY_EMPTY_DESC: '앱 저장소를 추가하십시오.',
  APP_REPO_STATUS_SUCCESSFUL: '성공',
  APP_REPO_STATUS_FAILED: '실패',
  APP_REPO_STATUS_SYNCING: '동기화 중',
  // List > Add
  ADD_APP_REPO: '앱 저장소 추가',
  VALIDATE: '확인',
  SYNC_INTERVAL: '동기화 주기',
  SYNC_INTERVAL_DESC: '동기화 주기를 설정합니다. 값의 범위는 3분 ~ 24시간입니다. 기본값 0은 동기화를 하지 않음을 의미합니다.',
  SYNC_PERIOD_EMPTY_DESC: '동기화 주기를 설정하십시오.',
  SYNC_INTERVAL_INVALID: '잘못된 값입니다. 0 또는 자연수를 입력하십시오. ',
  APP_REPO_URL_DESC: '앱 저장소를 추가하거나 편집하기 전에 URL의 유효성을 체크해야 합니다.',
  SYNC_INTERVAL_TIP: '값의 범위는 3분 ~ 24시간입니다. 올바른 값을 입력하십시오.',
  SECONDS: '초',
  MINUTES: '분',
  HOURS: '시간',
  UNRECOGNIZED_URL: '인식할 수 없는 URL입니다.',
  INVALID_CREDENTIAL_FORMAT: '자격 증명 형식이 잘못되었습니다.',
  MISSING_ACCESS_KEY_ID: '액세스 키 ID가 없습니다.',
  MISSING_SECRET_ACCESS_KEY: '시크릿 액세스 키가 없습니다.',
  S_THREE_ACCESS_DENIED: 'S3 액세스가 거부되었습니다.',
  INVALID_URL_FORMAT: 'URL 형식이 잘못되었습니다.',
  INVALID_HTTP_SCHEME: 'HTTP 형식이 잘못되었습니다.',
  HTTP_ACCESS_DENIED: 'HTTP 액세스가 거부되었습니다.',
  INVALID_HTTPS_SCHEME: 'HTTPS 형식이 잘못되었습니다.',
  INVALID_TYPE: '잘못된 유형',
  INVALID_PROVIDERS: '유효하지 않은 공급자입니다.',
  INVALID_REPO_URL: '저장소 URL이 잘못되었습니다.',
  INVALID_S_THREE_SCHEME: 'S3 형식이 잘못되었습니다.',
  // List > Add > URL > s3://
  ACCESS_KEY_ID: '액세스 키 ID',
  SECRET_ACCESS_KEY: '시크릿 엑세스 키',
  // List > Edit
  EDIT_APP_REPO: '앱 저장소 편집',
  INVALID_URL_DESC: '잘못된 URL입니다.',
  VALID_URL_DESC: '올바른 URL입니다.',
  // List > Delete
  APP_REPOSITORY: '앱 저장소',
  APP_REPOSITORY_LOW: '앱 저장소'
};