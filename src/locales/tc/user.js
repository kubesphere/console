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
  users: '使用者',
  Users: '使用者',
  User: '使用者',
  Accounts: '帳號',
  'User Management': '使用者管理',
  'Authorized Projects': '授權項目',
  'Create User': '創建使用者',
  'Add User': '添加使用者',
  'Edit User': '編輯使用者',
  user_active: '活躍',
  Avatar: '頭像',
  'Last Login Time': '上次登錄時間',
  'Not logged in yet': '尚未登錄',
  'Change Password': '修改密碼',
  'Password Setting': '密碼設置',
  Email: '郵箱',
  USER_AVATAR_TIP: '頭像尺寸必須小於 120px X 120px，支持 png，jpg 格式。',
  EMAIL_DESC: '郵箱地址可以方便項目管理員及時的添加您為項目成員',
  USER_NAME_DESC: '使用者名稱只能包含小寫字母及數字',
  USER_SETTING_EMAIL_DESC: '郵箱可作為登錄帳號',
  PASSWORD_DESC: '密碼必須包含數字和大小寫字母，長度至少為 6 位',
  ROLE_DESC:
    '角色類型根據權限範圍分為集群和項目兩類，目前角色的授權範圍為整個集群.',
  'New Password': '新的密碼',
  'Please input user name': '請輸入使用者名稱',
  'Please input email': '請輸入郵箱',
  'Please repeat the new password': '請重復新的密碼',
  'Please input current password': '請輸入目前密碼',
  'The password entered twice must be the same': '兩次輸入的密碼必須一致',
  'Please select role': '請選擇角色',
  'Invalid user name': '使用者名稱格式不合法',
  'Invalid email': '郵箱格式不合法',
  'User name exists': '使用者名稱已存在',
  'Email exists': '郵箱已存在',
  'Unable to delete itself': '無法刪除自己',
  'Login History': '登錄歷史',
  Time: '時間',
  'Repeat the New Password': '重復新的密碼',

  USER_ACTIVE: '活躍',
  USER_PENDING: '等待中',
  USER_DISABLED: '已禁用',
  USER_DESC:
    '系統管理員用此功能模組管理帳號，如創建、更新、讀取、刪除帳號等，同時還能關聯每個帳號的角色；使用者用帳號名稱或郵件地址登錄 KubeSphere 平台。',
  USER_CREATE_DESC:
    '系統管理員用此功能模組管理帳號，如創建、更新、讀取、刪除帳號等，同時還能關聯每個帳號的角色；使用者用帳號名稱或郵件地址登錄 KubeSphere 平台。',
  CLUSTER_ROLE_DESC: '集群角色定義了在集群範圍内授權使用者的訪問權限。',
  ROLE_BASEINFO_DESC: '',
  ROLE_AUTHORIZATION_DESC: '',
  MEMBER_ROLE_CREATE_DESC:
    '使用者的權限管理依賴項目角色定義，角色標識了使用者的身份，定義了使用者和可訪問/操作的資源之间的關係。當 KubeSphere 預設角色不滿足使用需求的時候，可以根據實際情況，為使用者創建自定義角色，自定義角色最大的優勢就是對平台資源的針對性管理，指定該角色擁有某些指定資源的何種權限。',

  'A built-in cluster administrator': '預設創建的管理員帳戶。',

  'Current Password': '目前密碼',

  'You must enter the correct current password to change to a new password.':
    '您必須輸入正确的目前密碼才可更改為新的密碼',

  'Your password must meet the following requirements':
    '您的密碼必須符合如下要求',
  'At least 1 uppercase and lowercase letter': '至少 1 個大寫和小寫字母',
  'At least 1 number': '至少 1 個數字',
  'Password length is at least 6 characters': '密碼長度至少為 6',
  'Password Strength': '密碼強度',
  'Avoid using the password that has already been used on other websites or the one that can be easily guessed.':
    '避免使用您在其它網站上的密碼，或者是其他人很容易猜到的密碼',
}
