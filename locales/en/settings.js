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
  Configure: 'Configure',
  'Current third-party login configurations':
    'Current third-party login configurations',
  'not configured': 'not configured',
  'Please input client id': 'Please input client id',
  'Please input server address': 'Please input server address',
  'Protocol Type': 'Protocol Type',
  'Server Address': 'Server Address',
  'Third-party Login': 'Third-party Login',

  THIRD_PARTY_LOGIN_DESC:
    'When a third part service is used for login, users need to enter related information. After that, a local user will be created which is associated with the user for the secure login in the environment.',

  THIRD_PARTY_LOGIN_Q: 'What third parties are supported for login?',
  THIRD_PARTY_LOGIN_A: 'LDAP, AD, OAuth and Github OAuth are supported.',

  OAUTH_DESC:
    'OAuth is an open standard that provides an easy and secure way for users to grant access to their resources.',
  GITHUB_OAUTH_DESC:
    'GitHub OAuth grants access based on organization membership.',
}
