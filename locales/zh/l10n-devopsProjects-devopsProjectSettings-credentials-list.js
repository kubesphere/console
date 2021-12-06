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
  CREDENTIAL_PL: '凭证',
  DEVOPS_CREDENTIALS_DESC: '凭证是包含了一些敏感数据的对象，如用户名密码，SSH 密钥和 Token 等, 用于在 Pipeline 运行时, 为拉取代码、push/pull 镜像、SSH 执行脚本等过程提供认证',
  // List
  CREDENTIAL_EMPTY_DESC: '请创建一个凭证。',
  // List > Create
  CREATE_CREDENTIAL: '创建凭证',
  CREDENTIAL_NAME_EXIST_DESC: '凭证名称已存在，请输入其他名称。',
  CREDENTIAL_TYPE_USERNAME_PASSWORD: '用户名和密码',
  CREDENTIAL_TYPE_SSH: 'SSH 密钥',
  PRIVATE_KEY: '私钥',
  PASSPHRASE: '密码短语',
  CREDENTIAL_TYPE_SECRET_TEXT: '访问令牌',
  CREDENTIAL_TYPE_KUBECONFIG: 'kubeconfig',
  PASSWORD_TOKEN: '密码/令牌',
  KUBECONFIG_CONTENT_DESC: '默认内容为当前用户的 kubeconfig 配置。',
  CONTENT: '内容'
};