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
  'Secret Name': '密鑰名稱',
  'Config Number': '配置項數量',
  'Edit Secret': '編輯密鑰',
  'Secret Settings': '密鑰設置',
  'Private Key': '私鑰',
  'Image Registry Secret': '鏡像倉庫密鑰',
  'Please input credential': '請輸入憑證',
  'Please input private key': '請輸入私鑰',
  'Please input data': '請輸入數據',
  Unverified: '鏡像倉庫密鑰驗證失敗',
  SECRET_TYPE_DESC: '可以選擇也可以自定義一個密鑰類型',

  SECRET_DESC:
    '密鑰 (Secret) 是一種包含少量敏感資訊的資源對象，例如密碼、token、秘鑰等，以鍵/值對形式保存並且可以在容器組中使用。',
  SECRET_CREATE_DESC:
    '密鑰 (Secret) 是一種包含少量敏感資訊的資源對象，例如密碼、token、秘鑰等，以鍵/值對形式保存並且可以在容器組中使用。',

  SECRET_NO_CHINESE_CODE_DESC: '密鑰中不能包含中文字元',

  'Registry Address': '倉庫地址',
  'Registry verification failed': '鏡像倉庫校驗失敗',
  'Registry verification succeeded': '鏡像倉庫校驗通過',
  'Account Password Secret': '帳號密碼密鑰',

  Data: '數據',
  'Add Data': '添加數據',
  'Edit Data': '編輯數據',
  'Add key / value pair data': '添加鍵/值對形式數據',

  'DATA-KEY': '鍵(Key)',
  'DATA-VALUE': '值(Value)',
  'Example: docker.io': '例：docker.io',

  IMAGE_REGISTRY_REQUIRED_DESC:
    '鏡像倉庫密鑰需要至少包含倉庫地址、用戶名稱和密碼資訊',

  IMAGE_REGISTRY_VALIDATE_TIP: '創建鏡像倉庫密鑰前, 請先驗證密鑰是否可用',

  'Please input the registry address': '請輸入鏡像倉庫地址',
}
