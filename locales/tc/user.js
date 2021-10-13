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
  users: '用戶',
  User: '用戶',
  USER: '用戶',
  USER_LOW: 'user',
  USER_EMPTY_DESC: 'Please create a user.',
  Accounts: '帳號',
  'User Management': '用戶管理',
  'Authorized Projects': '授權項目',
  'Create User': '創建用戶',
  CREATE_USER: '添加用戶',
  EDIT_USER: '編輯用戶',
  user_active: '活躍',
  Avatar: '頭像',
  NOT_LOGIN_YET: '尚未登入',
  NOT_LOGGED_IN: '尚未登入',
  'Change Password': '修改密碼',
  'Password Setting': '密碼設置',
  EMAIL: '郵箱',
  USER_AVATAR_TIP: '頭像尺寸必須小於 120px X 120px，支持 png，jpg 格式。',
  EMAIL_DESC: '郵箱可作為登入帳號',
  USERNAME_DESC:
    '最長 32 個字元，只能包含小寫字母、數字、點及隔符號("-")，且必須以小寫字母或數字開頭及結尾',
  USER_SETTING_EMAIL_DESC: '郵箱可作為登入帳號',
  PASSWORD_DESC: '密碼必須包含數字和大小寫字母，長度為 6 ~ 64 位',
  PASSWORD_INVALID_DESC: '密碼必須包含數字和大小寫字母，長度為 6 ~ 64 位',
  PLATFORM_ROLE_DESC:
    '角色類型根據權限範圍分為集群和項目兩類，目前角色的授權範圍為整個集群.',
  'New Password': '新的密碼',
  USERNAME_EMPTY_DESC: '請輸入用戶名稱',
  EMAIL_EMPTY_DESC: '請輸入郵箱',
  'Please repeat the new password': '請重複新的密碼',
  'Please input current password': '請輸入目前密碼',
  'The password entered twice must be the same': '兩次輸入的密碼必須一致',
  'Please select role': '請選擇角色',
  USERNAME_INVALID: '用戶名稱格式不合法。{message}',
  USERNAME_EXISTS: '用戶名稱已存在',
  EMAIL_EXISTS: '郵箱已存在',
  'Unable to delete itself': '無法刪除自己',
  'Login History': '登入歷史',
  Time: '時間',
  TIME: '時間',
  'Repeat the New Password': '重複新的密碼',

  USER_ACTIVE: '活躍',
  USER_AUTHLIMITEXCEEDED: '限制登入',
  USER_PENDING: '等待中',
  USER_DISABLED: '已禁用',
  USER_DESC:
    '系統管理員用此功能模組管理帳號，如創建、更新、讀取、刪除帳號等，同時還能關聯每個帳號的角色；用戶用帳號名稱或郵件地址登入 KubeSphere 平台。',
  USER_CREATE_DESC:
    '系統管理員用此功能模組管理帳號，如創建、更新、讀取、刪除帳號等，同時還能關聯每個帳號的角色；用戶用帳號名稱或郵件地址登入 KubeSphere 平台。',
  CLUSTER_ROLE_DESC: '集群角色定義了在集群範圍内授權用戶的訪問權限。',
  ROLE_BASEINFO_DESC: '',
  ROLE_AUTHORIZATION_DESC: '',
  MEMBER_ROLE_CREATE_DESC:
    '用戶的權限管理依賴項目角色定義，角色標識了用戶的身份，定義了用戶和可訪問/操作的資源之間的關係。當 KubeSphere 預設角色不滿足使用需求的時候，可以根據實際情況，為用戶創建自定義角色，自定義角色最大的優勢就是對平台資源的針對性管理，指定該角色擁有某些指定資源的何種權限。',

  'A built-in cluster administrator': '預設創建的管理員帳戶。',

  'Current Password': '目前密碼',

  'You must enter the correct current password to change to a new password.':
    '您必須輸入正確的目前密碼才可更改為新的密碼',

  'At least 1 uppercase and lowercase letter': '至少 1 個大寫和小寫字母',
  'At least 1 number': '至少 1 個數字',
  'Password length is at least 6 characters': '密碼長度至少為 6',
  'Password Strength': '密碼強度',
  'Avoid using the password that has already been used on other websites or the one that can be easily guessed.':
    '避免使用您在其它網站上的密碼，或者是其他人很容易猜到的密碼',

  // Users > Details
  SOURCE_IP_ADDRESS: 'Source IP Address',
  LOGIN_HISTORY: 'Login History',
  NO_LOGIN_HISTORY: 'No login history is found.',
  CHANGE_PASSWORD: 'Change Password',
  SUCCESSFUL: 'Successful',
  FAILED: 'Failed',
}
