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
  'A built-in cluster administrator': 'A built-in cluster administrator',
  Accounts: 'Accounts',
  'Add User': 'Create Account',
  'At least 1 number': 'At least 1 number',
  'At least 1 uppercase and lowercase letter':
    'At least 1 uppercase letter and 1 lowercase letter',
  'Authorized Projects': 'Authorized Projects',
  Avatar: 'Avatar',
  'Avoid using the password that has already been used on other websites or the one that can be easily guessed.':
    'Avoid using weak passwords and setting the same password for multiple accounts.',
  'Change Password': 'Change Password',
  'Create User': 'Create User',
  'Current Password': 'Current Password',
  'Edit User': 'Edit Account',
  Email: 'Email',
  'Email exists': 'The email already exists.',
  'Invalid email': 'Invalid email.',
  'Invalid user name': 'Invalid username. {message}',
  'Last Login Time': 'Last Login',
  'Login History': 'Login History',
  'New Password': 'New Password',
  'Not logged in yet': 'None',
  'Password length is at least 6 characters': '6 to 64 characters',
  'Password Setting': 'Password Settings',
  'Password Strength': 'Password Strength',
  'Please input current password': 'Enter the current password.',
  'Please input email': 'Enter the email.',
  'Please input user name': 'Enter the username.',
  'Please repeat the new password': 'Enter the new password again.',
  'Please select role': 'Select a role.',
  'Repeat the New Password': 'Confirm Password',
  'The password entered twice must be the same':
    'New Password and Confirm Password must be the same.',
  Time: 'Time',
  'Unable to delete itself': 'Unable to delete itself.',
  User: 'User',
  'User Management': 'User Management',
  'User name exists': 'The username already exists.',
  Users: 'Users',
  users: 'users',
  'You must enter the correct current password to change to a new password.':
    'Enter the current password.',
  'Your password must meet the following requirements':
    'Complexity Requirements',

  user_active: 'Active',
  USER_ACTIVE: 'Active',
  USER_AUTHLIMITEXCEEDED: 'Login restricted',
  USER_PENDING: 'Pending',
  USER_DISABLED: 'Disabled',
  USER_NAME_DESC:
    'The value can contain only lowercase letters, numbers, and hyphens (-) and must begin and end with a lowercase letter or number. The maximum length is 63 characters.',
  EMAIL_DESC: 'The email address can be used to log in to the system.',
  USER_SETTING_EMAIL_DESC:
    'The email address can be used to log in to the system.',
  PASSWORD_DESC:
    'The password can contain 6 to 64 characters and must contain at least 1 number, 1 lowercase letter, and 1 uppercase letter.',
  ROLE_DESC: 'Set the role of the account on the platform.',
  USER_DESC: 'Manage accounts and their roles.',
  USER_CREATE_DESC:
    'This module allows the system admin to manage accounts, such as creating/updating/reading/deleting an account. The admin can also manage the role of each account. Users can log in the platform through their account name or email address.',
  ROLE_BASEINFO_DESC: '',
  ROLE_AUTHORIZATION_DESC: '',
  USER_AVATAR_TIP:
    'The maximum size of the avatar is 120 x 120 pixels. Only PNG and JPG formats are allowed.',
  MEMBER_ROLE_CREATE_DESC:
    'What a user is authorized to do depends on the role which defines the user’s identity, as well as the relation between the user and resources that the user has access to view and handle. Users can create custom roles when the preset role of KubeSphere does not meet their needs. The biggest advantage of custom roles is that they can be set to support fine-grained management of platform resources as different roles can be authorized to access different resources.',
  CLUSTER_ROLE_DESC:
    'This module allows you to manage the access of users within a cluster.',
}
