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
  USER_PENDING: 'Pending',
  USER_DISABLED: 'Disabled',
  USER_NAME_DESC: 'Username can only contain lowercase letters and numbers.',
  EMAIL_DESC: '',
  USER_SETTING_EMAIL_DESC: 'Email is used for login.',
  PASSWORD_DESC:
    'Password must contain numbers and letters, and must be at least 6 characters in length.',
  ROLE_DESC:
    'The role types are classified into cluster and project. The role of cluster type is used for managing the cluster.',
  USER_DESC:
    'This module allows the system admin to manage accounts, such as creating/updating/reading/deleting an account. The admin can also manage the role of each account. Users can log in the platform through their account name or email address.',
  USER_CREATE_DESC:
    'This module allows the system admin to manage accounts, such as creating/updating/reading/deleting an account. The admin can also manage the role of each account. Users can log in the platform through their account name or email address.',
  ROLE_BASEINFO_DESC: '',
  ROLE_AUTHORIZATION_DESC: '',
  USER_AVATAR_TIP:
    'The avatar size must be less than 120px X 120px and support png, jpg format.',
  MEMBER_ROLE_CREATE_DESC:
    'What a user is authorized to do depends on the role which defines the user’s identity, as well as the relation between the user and resources that the user has access to view and handle. Users can create custom roles when the preset role of KubeSphere does not meet their needs. The biggest advantage of custom roles is that they can be set to support fine-grained management of platform resources as different roles can be authorized to access different resources.',
  CLUSTER_ROLE_DESC:
    'This module allows you to manage the access of users within a cluster.',
}
