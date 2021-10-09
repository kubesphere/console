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
  VALIDATE: '验证',
  APP_REPO_DESC:
    '应用仓库是用于存放应用模板的仓库，您可以添加应用仓库以部署和管理其中的应用。',
  APP_REPO_URL_DESC: 'URL 需要通过验证才能添加或编辑应用仓库。',
  'App Repository': '应用仓库',
  APP_REPOSITORY: '应用仓库',
  APP_REPOSITORY_PL: '应用仓库',
  APP_REPOSITORY_LOW: '应用仓库',
  APP_REPOSITORY_EMPTY_DESC: '请添加一个应用仓库。',
  'Add App Repository': '添加应用仓库',
  EDIT_APP_REPO: '编辑应用仓库',
  APP_REPOSITORY_CREATE_DESC:
    '可用添加来自第三方的应用仓库源，可以支持基于 Helm 的 Kubernetes 应用。 ',

  Synchronize: '同步',
  syncing: '同步中',

  'Unrecognized URL': '无法识别的地址',
  'Invalid format of credential': '证书格式错误',
  'Missing access key ID': '缺少 Access key ID',
  'Missing secret access key': '缺少 Secret access key',
  'S3 access denied': 'S3 地址无法访问',
  'Invalid format of URL': '地址格式错误',
  'Invalid HTTP Scheme': '错误的 HTTP 类型协议',
  'HTTP access denied': 'HTTP 地址无法访问',
  'Invalid HTTPS Scheme': '错误的 HTTPS 类型协议',
  'Invalid type': '无效的类型',
  'Invalid Providers': '错误的 Providers 参数',
  'Invalid Repo URL': '不是有效的 Repo 地址',
  'Invalid S3 Scheme': '错误的 S3 类型协议',
  INVALID_URL_DESC: 'URL 无效。',
  VALID_URL_DESC: 'URL 验证通过。',

  WEBHOOK_URL_DESC: '请输入 webhook URL。',
  'Please input access key ID and secret access key':
    '请输入 Access key ID 和 Secret access key',

  SYNC_INTERVAL: '同步周期',
  SYNC_INTERVAL_DESC:
    '设置一个同步周期。取值范围为 180 到 86400 秒，默认值为 0。',
  SYNC_PERIOD_EMPTY_DESC: '请设置同步周期。',
  SYNC_INTERVAL_INVALID: '数值无效，请输入 0 或正整数。',

  'App Repos': '应用仓库',
  ADD_APP_REPO: '添加应用仓库',
  INDEX_REPO: '同步仓库',

  HOW_TO_USE_APP_REPO_Q: '如何使用应用仓库？',
  HOW_TO_USE_APP_REPO_A:
    '您需要转到在该企业空间下的项目。在部署新应用时，选择<b>来自应用模板</b>并在下拉列表中选择您的应用仓库，即可部署应用仓库中的应用。',

  // App Repositories > Details
  SYNC_INTERVAL_TIP: '取值范围为 180 到 86400 秒，请输入有效数值。',
  SECONDS: '秒',
  MINUTES: '分钟',
  HOURS: '小时',
}
