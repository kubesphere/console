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

export default {
  user_active: 'Active',
  USER_ACTIVE: 'Active',
  USER_DISABLED: 'Disabled',
  USER_NAME_DESC: 'Username can only contain lowercase letters and numbers.',
  EMAIL_DESC: '',
  USER_SETTING_EMAIL_DESC: 'Email is used for logging in.',
  PASSWORD_DESC:
    'Password must contain numbers and letters, and must be at least 6 characters in length.',
  ROLE_DESC:
    'The role types are classified into cluster and project. The role of cluster type is used for managing the cluster.',
  ACCOUNTS_MANAGEMENT_DESC:
    'System admin manages user information such as creating/updating/reading/deleting an account using this management component. Admin can also manage the role of any account. User uses the account name or email to log in the platform.',
  PLATFORM_ROLES_DESC:
    'The platform role defines the access control mechanism within the cluster scope for authorized users.',
  ROLE_BASEINFO_DESC: '',
  ROLE_AUTHORIZATION_DESC: '',
  USER_AVATAR_TIP:
    'The avatar size must be less than 120px X 120px and support png, jpg format.',
  MEMBER_ROLE_CREATE_DESC:
    "User rights management roles depend on the definition, role identifies the user's identity, defines the relationship between the user and can access resources / operations. When KubeSphere does not meet the requirements of preset roles, according to the actual situation, create a custom role to a user, self-defined roles that is the biggest advantage of fine-grained management of platform resources, specify what the role has certain specified resource authorization.",
}
