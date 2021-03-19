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
  'Platform Settings': '平台设置',

  'Third-party Login': '第三方登录',

  'Protocol Type': '协议类型',

  Configure: '配置',
  'not configured': '暂未配置',

  'Current third-party login configurations': '当前第三方登录配置',

  'Server Address': '服务端地址',

  'Please input client id': '请输入 Client ID',
  'Please input server address': '请输入服务端地址',

  THIRD_PARTY_LOGIN_DESC:
    '当使用第三方服务的方式进行接入对接时，需用户输入相关属性信息，之后会自动创建一个与该用户关联的本地用户，便于环境的安全接入登录。',

  THIRD_PARTY_LOGIN_Q: '支持哪些第三方登录？',
  THIRD_PARTY_LOGIN_A: '支持 LDAP, AD, OAuth 以及 Github OAuth',

  OAUTH_DESC:
    'OAuth 协议为用户资源的授权提供了一个安全的、开放而又简易的标准。',
  GITHUB_OAUTH_DESC: 'GitHub OAuth 根据组织成员的身份授予访问权限',
}
