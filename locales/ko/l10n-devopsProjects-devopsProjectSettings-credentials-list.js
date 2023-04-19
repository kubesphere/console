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
  CREDENTIAL_PL: '자격 증명',
  DEVOPS_CREDENTIALS_DESC: '자격 증명은 사용자 이름 및 비밀번호, SSH 키 및 토큰과 같은 일부 중요한 데이터를 포함하는 개체입니다. 파이프라인이 실행 중일 때 코드 풀링, 이미지 푸시/풀링, SSH 스크립트 실행 등에 대한 인증을 제공하는 데 사용됩니다.',
  // List
  CREDENTIAL_EMPTY_DESC: '자격 증명을 생성하십시오.',
  // List > Create
  CREATE_CREDENTIAL: '자격 증명 생성',
  CREDENTIAL_NAME_EXIST_DESC: '자격 증명 이름이 이미 존재합니다. 다른 이름을 입력하십시오.',
  CREDENTIAL_TYPE_USERNAME_PASSWORD: '사용자 이름 및 비빌번호',
  CREDENTIAL_TYPE_SSH: 'SSH 키',
  PRIVATE_KEY: '개인 키',
  PASSPHRASE: '암호 문구',
  CREDENTIAL_TYPE_SECRET_TEXT: '액세스 토큰',
  CREDENTIAL_TYPE_KUBECONFIG: 'kubeconfig',
  PASSWORD_TOKEN: '비밀번호/토큰',
  KUBECONFIG_CONTENT_DESC: '기본 내용은 현재 사용자의 kubeconfig 설정입니다.',
  CONTENT: '내용'
};