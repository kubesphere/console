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
  users: '用户',
  Users: '用户',
  User: '用户',
  Accounts: '帐户',
  'User Management': '用户管理',
  'Authorized Projects': '授权项目',
  'Create User': '创建用户',
  'Add User': '添加用户',
  'Edit User': '编辑用户',
  user_active: '活跃',
  Avatar: '头像',
  'Last Login Time': '上次登录时间',
  'Not logged in yet': '尚未登录',
  'Change Password': '修改密码',
  'Password Setting': '密码设置',
  Email: '邮箱',
  USER_AVATAR_TIP: '头像尺寸必须小于 120px X 120px，支持 png，jpg 格式。',
  EMAIL_DESC: '邮箱可作为登录帐户',
  USER_NAME_DESC:
    '最长 32 个字符，只能包含小写字母、数字及分隔符("-")，且必须以小写字母或数字开头及结尾',
  USER_SETTING_EMAIL_DESC: '邮箱可作为登录帐户',
  PASSWORD_DESC: '密码必须包含数字和大小写字母，长度为 6~64 位',
  ROLE_DESC:
    '角色类型根据权限范围分为集群和项目两类，当前角色的授权范围为整个集群.',
  'New Password': '新的密码',
  'Please input user name': '请输入用户名',
  'Please input email': '请输入邮箱',
  'Please repeat the new password': '请重复新的密码',
  'Please input current password': '请输入当前密码',
  'The password entered twice must be the same': '两次输入的密码必须一致',
  'Please select role': '请选择角色',
  'Invalid user name': '用户名格式不合法。{message}',
  'Invalid email': '邮箱格式不合法',
  'User name exists': '用户名已存在',
  'Email exists': '邮箱已存在',
  'Unable to delete itself': '无法删除自己',
  'Login History': '登录历史',
  Time: '时间',
  'Repeat the New Password': '重复新的密码',

  USER_ACTIVE: '活跃',
  USER_AUTHLIMITEXCEEDED: '限制登录',
  USER_PENDING: '等待中',
  USER_DISABLED: '已禁用',
  USER_DESC:
    '系统管理员用此功能模块管理帐户，如创建、更新、读取、删除帐户等，同时还能关联每个帐户的角色；用户用帐户名称或邮件地址登录 KubeSphere 平台。',
  USER_CREATE_DESC:
    '系统管理员用此功能模块管理帐户，如创建、更新、读取、删除帐户等，同时还能关联每个帐户的角色；用户用帐户名称或邮件地址登录 KubeSphere 平台。',
  CLUSTER_ROLE_DESC: '集群角色定义了在集群范围内授权用户的访问权限。',
  ROLE_BASEINFO_DESC: '',
  ROLE_AUTHORIZATION_DESC: '',
  MEMBER_ROLE_CREATE_DESC:
    '用户的权限管理依赖项目角色定义，角色标识了用户的身份，定义了用户和可访问/操作的资源之间的关系。当 KubeSphere 预置角色不满足使用要求的时候，可以根据实际情况，为用户创建自定义角色，自定义角色最大的优势即对平台资源的细粒度管理，指定该角色拥有某些指定资源的何种权限。',

  'A built-in cluster administrator': '默认创建的管理员帐户。',

  'Current Password': '当前密码',

  'You must enter the correct current password to change to a new password.':
    '您必须输入正确的当前密码才可更改为新的密码',

  'Your password must meet the following requirements':
    '您的密码必须符合如下要求',
  'At least 1 uppercase and lowercase letter': '至少 1 个大写和小写字母',
  'At least 1 number': '至少 1 个数字',
  'Password length is at least 6 characters': '密码长度至少为 6',
  'Password Strength': '密码强度',
  'Avoid using the password that has already been used on other websites or the one that can be easily guessed.':
    '避免使用您在其它网站上的密码，或者是其他人很容易猜到的密码',
}
