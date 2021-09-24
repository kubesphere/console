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
  VALIDATE: '驗證',
  APP_REPO_DESC:
    'An app repository is a repository used to store application templates. You can add an app repository to deploy and manage its applications.',
  APP_REPO_URL_DESC:
    'The URL needs to be validated before you add or edit an app repository.',
  'App Repository': '應用倉庫',
  APP_REPOSITORY: 'App Repository',
  APP_REPOSITORY_PL: 'App Repositories',
  APP_REPOSITORY_LOW: 'app repository',
  APP_REPOSITORY_EMPTY_DESC: 'Please add an app repository.',
  'Add App Repository': '添加應用倉庫',
  EDIT_APP_REPO: '編輯應用倉庫',
  APP_REPOSITORY_CREATE_DESC:
    '可用添加來自第三方的應用倉庫源，可以支持基於 Helm 的 Kubernetes 應用。 ',

  Synchronize: '同步',
  syncing: '同步中',

  'Unrecognized URL': '無法識別的地址',
  'Invalid format of credential': '憑證格式錯誤',
  'Missing access key ID': '缺少 Access key ID',
  'Missing secret access key': '缺少 Secret access key',
  'S3 access denied': 'S3 地址無法訪問',
  'Invalid format of URL': '地址格式錯誤',
  'Invalid HTTP Scheme': '錯誤的 HTTP 類型協定',
  'HTTP access denied': 'HTTP 地址無法訪問',
  'Invalid HTTPS Scheme': '錯誤的 HTTPS 類型協定',
  'Invalid type': '無效的類型',
  'Invalid Providers': '錯誤的 Providers 參數',
  'Invalid Repo URL': '不是有效的 Repo 地址',
  'Invalid S3 Scheme': '錯誤的 S3 類型協定',
  INVALID_URL_DESC: 'Invalid URL.',
  VALID_URL_DESC: 'URL 驗證通过。',

  'Please input URL': '請輸入 URL',
  'Please input access key ID and secret access key':
    '請輸入 Access key ID 和 Secret access key',

  SYNC_PERIOD: '時間周期',
  SYNC_PERIOD_DESC:
    '默認為 0，不進行同步；時間周期最短是 3 分鐘，最長是 24 小時。',
  SYNC_PERIOD_EMPTY_DESC: '請輸入時間周期。',
  SYNC_PERIOD_INVALID: '數值無效，請輸入 0 或正整數。',

  'App Repos': '應用倉庫',
  ADD_APP_REPO: 'Add App Repository',
  INDEX_REPO: '同步倉庫',

  HOW_TO_USE_APP_REPO_Q: '如何使用應用倉庫？',
  HOW_TO_USE_APP_REPO_A:
    'You need to go to your project in the workspace. When you deploy a new app, select <b>From App Template</b> and then choose an app repository in the drop-down list to deploy an app in the repository.',
}
