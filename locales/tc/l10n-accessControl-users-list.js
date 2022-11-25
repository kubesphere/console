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
  USER_DESC: '管理用戶及其角色。',
  USER_PL: '用戶',
  // List
  NOT_LOGIN_YET: '尚未登入',
  USER_EMPTY_DESC: '請創建一個用戶。',
  USER_ACTIVE: '活躍用戶',
  USER_AUTHLIMITEXCEEDED: '限制登入',
  USER_PENDING: '等待中',
  USER_DISABLED: '已禁用',
  LAST_LOGIN: '最近登入',
  // List > Create
  USERNAME_DESC: '最長 32 個字元，只能包含小寫字母、數字、點及隔符號("-")，且必須以小寫字母或數字開頭及結尾',
  PASSWORD_DESC: 'The password must contain at least one number, one lowercase letter, one uppercase letter, and one special character (~!@#$%^&*()-_=+\\|[{}];:\'",<.>/? or space). The length must be 8 to 64 characters.',
  PASSWORD_INVALID_DESC: '無效的密碼。密碼必須至少包含一個數字、一個小寫字母和一個大寫字母。長度必須為 8 到 64 個字元。',
  PLATFORM_ROLE_DESC: '角色類型根據權限範圍分為集群和項目兩類，目前角色的授權範圍為整個集群.',
  USER_SETTING_EMAIL_DESC: '郵箱可作為登入帳號',
  USERNAME_EXISTS: '用戶名稱已存在',
  USERNAME_EMPTY_DESC: '請輸入用戶名稱',
  PLATFORM_ROLE: '平台角色',
  CREATE_USER: '創建用戶',
  EMAIL: '郵箱',
  EMAIL_EXISTS: '郵箱已存在，請輸入其他郵箱地址',
  USERNAME_INVALID: '用戶名稱格式不符合。{message}',
  USERNAME: '用戶名稱',
  PASSWORD: '密碼',
  // List > Edit
  EDIT_USER: '編輯用戶',
  // List > Delete
  USER_LOW: '用戶',
  DELETING_CURRENT_USER_NOT_ALLOWED: 'The current user cannot be deleted.'
};