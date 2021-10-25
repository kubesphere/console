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
  secrets: '密鑰',
  Secrets: '密鑰',
  Secret: '密鑰',
  SECRET: '保密字典',
  CODE_REPOSITORY_KEY: '代碼倉庫密鑰',
  SECRET_PL: '保密字典',
  SECRET_LOW: '保密字典',
  SECRET_FIELD_COUNT: '字段數量',
  EDIT_SECRET: '編輯保密字典',
  DATA_SETTINGS: 'Data Settings',
  KUBECONFIG_SETTINGS: 'kubeconfig Settings',
  PRIVATE_KEY_TCAP: '私鑰',
  IMAGE_REGISTRY_INFORMATION: '鏡像倉庫保密字典',
  TLS_INFORMATION: 'TLS information',
  IMAGE_REGISTRY_SECRET_TCAP: '鏡像倉庫保密字典',
  ENTER_CREDENTIAL_TIP: '請輸入憑證 ID。',
  ENTER_PRIVATE_KEY_DESC: '請輸入私鑰。',
  ENTER_DATA_DESC: '請添加數據。',
  Unverified: '鏡像倉庫密鑰驗證失敗。',
  SECRET_TYPE_DESC: '選擇一個保密字典類型',

  SECRET_DESC:
    '保密字典（Secret）是一種包含少量敏感資訊的資源對象，例如密碼、token、秘鑰等，以鍵值對形式保存並且可以在容器組中使用。',
  SECRET_EMPTY_DESC:
    '保密字典是一種包含少量敏感資訊的資源對象，例如密碼、token、秘鑰等，以鍵/值對形式保存並且可以在容器組中使用。',

  SECRET_NO_CHINESE_CODE_DESC:
    '保密字典的鍵必須由字母數字字符、連字符（-）、下劃線（_）或句點（.）組成。',

  REGISTRY_ADDRESS_TCAP: '倉庫地址',
  REGISTRY_SECRET_VER_ERR: '鏡像倉庫驗證失敗。',
  REGISTRY_SECRET_VER_SUC: '鏡像倉庫驗證通過。',
  USERNAME_PASSWORD: '帳號密碼保密字典',
  ACCOUNT_PASSWORD_SECRET_TCAP: '帳號密碼保密字典',

  DATA: '數據',
  ADD_DATA_TCAP: '添加數據',
  EDIT_DATA_TCAP: '編輯數據',
  ADD_DATA_DESC: '添加鍵值對數據。',

  DATA_KEY: '鍵（Key）',
  DATA_VALUE: '值(Value)',
  REGISTRY_ADDRESS_TIP: '設置鏡像倉庫地址，例如 docker.io。',

  IMAGE_REGISTRY_REQUIRED_DESC: '請設置倉庫地址、用戶名和密碼信息。',

  IMAGE_REGISTRY_VALIDATE_TIP: '創建鏡像倉庫密鑰前, 請先驗證用戶名和密碼。',

  'Please input the registry address': '請輸入鏡像倉庫地址。',
  // Secret Type Drop-down List
  SECRET_VALUE_LABEL: '{value}（{label}）',
  CREATE_SECRET: '新建保密字典',
}
