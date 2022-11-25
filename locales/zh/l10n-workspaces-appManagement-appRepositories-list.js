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
  APP_REPOSITORY_PL: '应用仓库',
  APP_REPO: '应用仓库',
  HOW_TO_USE_APP_REPO_Q: '如何使用应用仓库？',
  HOW_TO_USE_APP_REPO_A: '您需要转到在该企业空间下的项目。在部署新应用时，选择<b>来自应用模板</b>并在下拉列表中选择您的应用仓库，即可部署应用仓库中的应用。',
  APP_REPO_DESC: '应用仓库是用于存放应用模板的仓库，您可以添加应用仓库以部署和管理其中的应用。',
  // List
  APP_REPOSITORY_EMPTY_DESC: '请添加一个应用仓库。',
  APP_REPO_STATUS_SUCCESSFUL: '成功',
  APP_REPO_STATUS_FAILED: '失败',
  APP_REPO_STATUS_SYNCING: '同步中',
  // List > Add
  ADD_APP_REPO: '添加应用仓库',
  VALIDATE: '验证',
  SYNC_INTERVAL: '同步间隔',
  SYNC_INTERVAL_DESC: '设置一个同步周期，取值范围为 3 分钟到 24 小时。默认值 0 表示不同步。',
  SYNC_PERIOD_EMPTY_DESC: '请设置同步周期。',
  SYNC_INTERVAL_INVALID: '参数值无效，请输入 0 或正整数。',
  APP_REPO_URL_DESC: 'URL 需要通过验证才能添加或编辑应用仓库。',
  SYNC_INTERVAL_TIP: '取值范围为 3 分钟到 24 小时，请输入有效数值。',
  SECONDS: '秒',
  MINUTES: '分钟',
  HOURS: '小时',
  UNRECOGNIZED_URL: 'URL 无法识别。',
  INVALID_CREDENTIAL_FORMAT: '证书格式无效。',
  MISSING_ACCESS_KEY_ID: '缺少访问密钥（access key） ID。',
  MISSING_SECRET_ACCESS_KEY: '缺少秘密访问密钥（secret access key）。',
  S_THREE_ACCESS_DENIED: 'S3 访问被拒绝。',
  INVALID_URL_FORMAT: 'URL 格式无效。',
  INVALID_HTTP_SCHEME: 'HTTP 协议无效。',
  HTTP_ACCESS_DENIED: 'HTTP 访问被拒绝。',
  INVALID_HTTPS_SCHEME: 'HTTPS 协议无效。',
  INVALID_TYPE: '类型无效。',
  INVALID_PROVIDERS: 'Providers 参数无效。',
  INVALID_REPO_URL: '仓库 URL 无效。',
  INVALID_S_THREE_SCHEME: 'S3 协议无效。',
  // List > Add > URL > s3://
  ACCESS_KEY_ID: '访问密钥 ID',
  SECRET_ACCESS_KEY: '秘密访问密钥',
  // List > Edit
  EDIT_APP_REPO: '编辑应用仓库',
  INVALID_URL_DESC: 'URL 无效。',
  VALID_URL_DESC: 'URL 验证通过。',
  // List > Delete
  APP_REPOSITORY: '应用仓库',
  APP_REPOSITORY_LOW: '应用仓库'
};