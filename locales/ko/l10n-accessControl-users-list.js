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
  USER_DESC: '사용자 및 사용자 역할을 관리합니다.',
  USER_PL: '사용자',
  // List
  NOT_LOGIN_YET: '로그인 안 됨',
  USER_EMPTY_DESC: '사용자 계정을 생성하세요.',
  USER_ACTIVE: '활성화',
  USER_AUTHLIMITEXCEEDED: '로그인 제한',
  USER_PENDING: '대기 중',
  USER_DISABLED: '비활성화',
  LAST_LOGIN: '마지막 로그인',
  // List > Create
  USERNAME_DESC: '사용자 이름은 소문자, 숫자, 하이픈(-) 및 점(.)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 32자입니다.',
  PASSWORD_DESC: '비밀번호에는 숫자 하나, 소문자 하나, 대문자 하나 및 특수 문자 하나(!@#$%^&*(-_=+\\|[{}];:\', <.>/?)가 포함되어야 합니다. 길이는 8자에서 64자 사이여야 합니다.',
  PASSWORD_INVALID_DESC: '비밀번호가 잘못되었습니다. 비밀번호에는 숫자, 소문자 및 대문자가 하나 이상 포함되어야 합니다. 길이는 8자에서 64자 사이여야 합니다.',
  PLATFORM_ROLE_DESC: 'KubeSphere 플랫폼에서 사용할 사용자의 역할을 설정합니다.',
  USER_SETTING_EMAIL_DESC: '이메일 주소는 KubeSphere 웹 콘솔에 로그인하는 데 사용할 수 있습니다.',
  USERNAME_EXISTS: '이 사용자 이름은 이미 사용중입니다. 다른 사용자 이름을 입력하세요.',
  USERNAME_EMPTY_DESC: '사용자 이름을 입력해 주세요.',
  PLATFORM_ROLE: '플랫폼 역할',
  CREATE_USER: '사용자 계정 생성',
  EMAIL: '이메일',
  EMAIL_EXISTS: '이미 존재하는 이메일입니다. 다른 이메일을 입력해주세요.',
  USERNAME_INVALID: '유효하지 않은 사용자 이름입니다. {message}',
  USERNAME: '사용자 이름',
  PASSWORD: '비밀번호',
  // List > Edit
  EDIT_USER: '사용자 편집',
  // List > Delete
  USER_LOW: '사용자',
  DELETING_CURRENT_USER_NOT_ALLOWED: '현재 사용자는 삭제 될 수 없습니다.'
};