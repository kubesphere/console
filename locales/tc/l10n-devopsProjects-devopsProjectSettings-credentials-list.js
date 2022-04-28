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
  CREDENTIAL_PL: '憑證',
  DEVOPS_CREDENTIALS_DESC: '憑證是包含了一些敏感數據的對象，如用戶名密碼，SSH 密鑰和 Token 等，用於在 Pipeline 運行時，為拉取代碼、push/pull 鏡像、SSH 執行腳本等過程提供認證',
  // List
  CREDENTIAL_EMPTY_DESC: '請創建一個 DevOps 项目憑證。',
  // List > Create
  CREATE_CREDENTIAL: '創建憑證',
  CREDENTIAL_NAME_EXIST_DESC: '憑證 ID 已存在。',
  CREDENTIAL_TYPE_USERNAME_PASSWORD: '用戶名稱與密碼',
  CREDENTIAL_TYPE_SSH: 'SSH key',
  PRIVATE_KEY: '私鑰',
  PASSPHRASE: '密碼短語',
  CREDENTIAL_TYPE_SECRET_TEXT: 'Access token',
  CREDENTIAL_TYPE_KUBECONFIG: 'kubeconfig',
  PASSWORD_TOKEN: '令牌/密碼',
  KUBECONFIG_CONTENT_DESC: '預設內容為目前用户的 kubeconfig。',
  CONTENT: '內容'
};