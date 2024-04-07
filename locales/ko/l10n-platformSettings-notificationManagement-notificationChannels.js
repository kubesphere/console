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
  NOTIFICATION_MANAGEMENT: '알림 관리',
  NOTIFICATION_CHANNELS: '알림 채널',
  NOTIFICATION_CHANNELS_DESC: '리소스 메트릭이 규칙 그룹에 구성된 조건을 충족하면 여러 채널을 통해 사용자에게 알립니다.',
  // Email
  MAIL_TITLE: '이메일',
  MAIL_DESC: '이메일 주소로 알림을 보냅니다.',
  INVALID_PORT_DESC: '유효한 포트 번호를 입력하십시오.',
  ENTER_PORT_NUMBER: '포트 번호를 입력하십시오.',
  ALERTING_NAME: '알림 이름',
  ALERTING_SEVERITY: '알림 심각도',
  ADDRESS_EMPTY_DESC: '주소를 입력하십시오.',
  EMAIL_EMPTY_DESC: '이메일 주소를 입력하십시오.',
  SERVER_SETTINGS: '서버 설정',
  RECIPIENT_SETTINGS: '수신인 설정',
  FILTER_CONDITIONS: '필터 조건',
  CONTAINER: '컨테이너',
  VALUES: 'Values',
  CONDITION_OPERATOR: '운영자',
  NOTIFICATION_CONDITION_SETTING_TIP: '<strong>포함</strong> 및 <strong>포함하지 않음</strong> 연산자는 하나 이상의 값을 필요로 합니다. <strong>입력</strong> 버튼을 눌러 여러 값을 설정할 수 있습니다.',
  NOTIFICATION_CONDITION_SETTINGS_DESC: '조건에 맞는 알림만 보내도록 시스템을 설정합니다.',
  CONTAIN: '포함',
  NOT_CONTAIN: '포함하지 않음',
  EXIST: '존재',
  NOT_EXIST: '존재하지 않음',
  PATTERN_TAG_INVALID_TIP: '잘못된 레이블입니다. 레이블은 대문자와 소문자, 숫자, 하이픈(-), 밑줄(_) 및 점(.)만 포함할 수 있으며, 대문자 또는 소문자 또는 숫자로 시작하고 끝나야 합니다.',
  PATTERN_TAG_VALUE_INVALID_TIP: '잘못된 값입니다. 값은 대문자와 소문자, 숫자, 하이픈(-), 밑줄(_) 및 점(.)만 포함할 수 있으며 대문자 또는 소문자 또는 숫자로 시작하고 끝나야 하며 최대 63자여야 합니다.',
  INVALID_NOTIFICATION_CONDITION: '올바른 알림 조건을 입력하십시오.',
  SEND_TEST_MESSAGE: '테스트 메시지 보내기',
  SEND_TEST_MESSAGE_DESC: '테스트 메시지를 보내 알림 채널이 제대로 작동하는지 확인합니다.',
  SEND_TEST_MESSAGE_SUCCESS_DESC: '검증이 완료되어 테스트 메시지가 전송되었습니다.',
  SMTP_SERVER_ADDRESS: 'SMTP 서버 주소',
  USE_SSL_SECURE_CONNECTION: 'SSL 보안 연결 사용',
  SENDER_EMAIL: '보낸 사람 이메일 주소',
  INVALID_EMAIL: '유효하지 않은 이메일 주소 형식입니다.',
  INVALID_ADDRESS_DESC: '유효한 이메일 주소를 입력하여 주십시오.',
  MAX_EAMIL_COUNT: '최대 {count}개의 이메일을 추가할 수 있습니다.',
  SMTP_USER: 'SMTP 사용자 이름',
  SMTP_PASSWORD: 'SMTP 비밀번호',
  ENTER_PASSWORD_TIP: '비밀번호를 입력해주세요.',
  ENTER_RECIPIENT_EMAIL_DESC: '최소 한 개의 이메일 주소를 입력하여 주세요.',
  INVALID_EMAIL_ADDRESS_DESC: '이메일 형식이 잘못되었습니다.',
  SMTP_USER_EMPTY_DESC: 'SMTP 사용자 이름을 입력하십시오.',
  ADDED_SUCCESS_DESC: '추가되었습니다.',
  POD: '파드',
  UPDATE_SUCCESSFUL: '업데이트 되었습니다.',
  // Feishu
  FEISHU: 'Feishu',
  FEISHU_TITLE: 'Feishu',
  FEISHU_DESC: 'Feishu 사용자에게 알림을 보냅니다.',
  PLEASE_ENTER_APP_ID: '앱 ID를 입력하십시오.',
  USER_ID: '사용자 ID',
  DEPARTMENT_ID: '부서 ID',
  FEISHU_RECEIPIENT_SETTINGS_DESC: '알림을 받으려면 사용자 ID 또는 부서 ID를 설정하십시오.',
  FEISHU_SECRET: '시크릿',
  // DingTalk
  DINGTALK_TITLE: 'DingTalk',
  DINGTALK: 'DingTalk',
  DINGTALK_DESC: 'DingTalk 사용자에게 알림을 보냅니다.',
  PLEASE_ENTER_APP_KEY: '앱 키를 입력하십시오.',
  PLEASE_ENTER_APP_SECRET: '앱 키를 입력하십시오.',
  PLEASE_ENTER_CHAT_ID: '채팅 ID를 입력하십시오.',
  PLEASE_ENTER_WEBHOOK_URL: 'Webhook URL을 입력하십시오.',
  // DingTalk > Chat Settings
  CHAT_SETTINGS: '채팅 설정',
  CHAT_ID_TIP: '채팅 ID를 얻으려면 DingTalk 관리자에게 문의하십시오.',
  DINGTALK_SETTING_TIP: '채팅이나 그룹 챗봇을 설정해주세요.',
  ENTER_CHAT_ID_DESC: '채팅 ID를 입력하십시오.',
  MAX_CID_COUNT: '최대 {count}개의 채팅 ID를 추가할 수 있습니다.',
  CHAT_ID_EXISTS: '채팅 ID가 이미 존재합니다. 다른 채팅 ID를 추가하십시오.',
  // DingTalk > DingTalk Chatbot
  CHATBOT_SETTINGS: '챗봇 설정',
  KEYWORDS_LIST: '추가된 키워드',
  DINGTALK_CHATBOT_SECURITY_TIP: '비밀번호 또는 키워드를 입력하십시오.',
  ENTER_KEYWORD_DESC: '키워드를 입력하십시오.',
  MAX_KEYWORD_COUNT: '최대 {count}개의 키워드를 추가할 수 있습니다.',
  KEYWORD_EXISTS: '키워드가 이미 존재합니다. 다른 키워드를 추가하십시오.',
  EMPTY_KEYWORDS_DESC: '키워드가 추가되지 않았습니다.',
  // WeCom
  WECOM: 'WeCom',
  WECOM_TITLE: 'WeCom',
  WECOM_DESC: 'WeCom 사용자에게 알림을 보냅니다.',
  RECIPIENT_SETTINGS_TIP: '사용자 ID, 부서 ID 또는 태그 ID를 하나 이상 입력합니다.',
  ENTER_WECOM_CORP_ID_DESC: '회사 ID를 입력하십시오.',
  ENTER_WECOM_AGENT_ID_DESC: '앱 에이전트 ID를 입력하십시오.',
  ENTER_WECOM_SECRET_DESC: '앱 키를 입력하십시오.',
  // WeCom > User ID
  TOUSER_LIST: '추가된 사용자 ID',
  EMPTY_TOUSER_DESC: '사용자 ID가 추가되지 않았습니다.',
  ENTER_TOUSER_TIP: '사용자 ID를 입력하십시오.',
  TOUSER_EXISTS: '사용자 ID가 이미 존재합니다. 다른 사용자 ID를 입력하십시오.',
  MAX_TOUSER_COUNT: '최대 {count}개의 사용자 ID를 추가할 수 있습니다.',
  // WeCom > Department ID
  TOPARTY_LIST: '부서 ID 추가',
  EMPTY_TOPARTY_DESC: '부서 ID가 추가되지 않았습니다.',
  ENTER_TOPARTY_TIP: '부서 ID를 입력하십시오.',
  TOPARTY_EXISTS: '부서 ID가 이미 존재합니다. 다른 부서 ID를 입력하십시오.',
  MAX_TOPARTY_COUNT: '최대 {count}개의 부서 ID를 추가할 수 있습니다.',
  // WeCom > Tag ID
  TOTAG_LIST: '추가된 태그 ID',
  EMPTY_TOTAG_DESC: '태그 ID가 추가되지 않았습니다.',
  ENTER_TOTAG_TIP: '태그 ID를 입력하십시오.',
  TOTAG_EXISTS: '태그 ID가 이미 존재합니다. 다른 태그 ID를 입력하십시오.',
  MAX_TOTAG_COUNT: '최대 {count}개의 태그 ID를 추가할 수 있습니다.',
  // Slack
  SLACK: 'Slack',
  SLACK_TITLE: 'Slack',
  SLACK_DESC: 'Slack 사용자에게 알림을 보냅니다.',
  SLACK_TOKEN: 'Slack 토큰',
  SLACK_TOKEN_DESC: 'Slack 토큰을 입력하십시오.',
  SLACK_CHANNEL: 'Slack 채널',
  CHANNEL_SETTINGS: 'Slack 채널 설정',
  ADDED_CHANNELS: '추가 된 Slack 채널',
  EMPTY_CHANNEL_DESC: 'Slack 채널이 추가되지 않습니다.',
  ADD_CHANNEL_TIP: 'Slack 채널을 추가하십시오.',
  CHANNEL_EXISTS: 'Slack 채널이 이미 존재합니다. 다른 Slack 채널을 추가해 주세요.',
  MAX_CHANNEL_COUNT: '최대 {count}개의 Slack 채널을 추가할 수 있습니다.',
  // Webhook
  WEBHOOK: 'Webhook',
  WEBHOOK_TITLE: 'Webhook',
  WEBHOOK_DESC: 'Webhook으로 알림을 보냅니다.',
  WEBHOOK_URL_DESC: 'Webhook URL을 입력하십시오.',
  AUTHENTICATION_TYPE: '인증 유형',
  AUTHENTICATION_TYPE_DESC: '인증 유형을 선택하십시오',
  SKIP_TLS_VERFICATION: 'TLS 인증 건너뛰기(보안되지 않음)',
  BASIC_AUTH: '일반 인증',
  NO_AUTH: '인증 없음',
  BEARER_TOKEN: 'Bearer token',
  TOKEN: 'Token',
  WEBHOOK_USERNAME_EMPTY_DESC: '사용자 이름을 입력해 주세요.',
  WEBHOOK_PASSWORD_EMPTY_DESC: '비밀번호를 입력해주세요.',
  WEBHOOK_TOKEN_EMPTY_DESC: '토큰을 입력하십시오.'
};