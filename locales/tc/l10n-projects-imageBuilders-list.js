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
  IMAGE_BUILDER_PL: '構建鏡像',
  IMAGE_BUILDER_DESC: '鏡像構建器（Image Builder）是將代碼或者成品製作成容器鏡像的工具。您可以通過簡單的設置將成品或代碼直接製作成容器鏡像。',
  // List
  IMAGE_BUILDER_EMPTY_DESC: '請創建一個鏡像構建器。',
  NOT_RUNNING_YET: '未運行',
  BUILDING: 'Building',
  S2I: 'Source-to-image',
  B2I: 'Artifact-to-image',
  // List > Name (Displayed after you create a service from artifact)
  BUILD_IMAGE_FOR_SERVICE: '為 {service} 服務構建鏡像。',
  // List > Create > Build Mode
  BUILD_MODE: '選擇語言',
  CONTAINERD_RUNTIME_NOT_SUPPORTED: 'The containerd runtime does not support this feature.',
  S2I_DESC: '選擇您的代碼開發語言。',
  IMAGE_FROM_S2I: '通過代碼構建新的容器鏡像',
  IMAGE_FROM_B2I: '通過成品構建新的鏡像',
  B2I_DESC: '選擇您成品的文件類型。',
  EMPTY_IMAGE_TYPE_DESC: 'Please select a language or artifact type.',
  // List > Create > Java > Build Settings
  CODE_REPOSITORY_URL: '代碼地址',
  CODE_REPOSITORY_BRANCH: '分支',
  CODE_REPOSITORY_KEY: '代碼倉庫密鑰',
  CODE_REPOSITORY_URL_DESC: '源代碼倉庫地址(目前支持 git)並且可以指定代碼分支及在源代碼終端的相對路徑',
  CODE_REPOSITORY_KEY_DESC: '如果是私有代碼倉庫，請選擇代碼倉庫密鑰',
  IMAGE_NAME: '鏡像名稱',
  IMAGE_TAG: 'Image Tag',
  TARGET_IMAGE_REPOSITORY: '目標鏡像倉庫',
  S2I_IMAGE_NAME_DESC: '鏡像名稱及 Tag，預設為代碼倉庫的項目名稱',
  S2I_TARGET_IMAGE_REPOSITORY_DESC: '選擇一個有鏡像倉庫推送權限的保密字典，如果沒有可以<a href={link} target="_blank">新建鏡像倉庫保密字典</a>。',
  TRIGGER_TOKEN: '觸發令牌',
  INVALID_TRIGGER_TOKEN_DESC: '只能包含大小寫字母、數字',
  TRIGGER_TOKEN_DESC: 'Set a token used to authenticate a client against KubeSphere when the client attempts to trigger image building on KubeSphere. The token can contain only uppercase letters, lowercase letters, and numbers.',
  CODE_RELATIVE_PATH: '代碼相對路徑(可選):',
  CODE_RELATIVE_PATH_DESC: '可以指定代碼編譯的相對路徑，預設為 /',
  S2I_ENVIRONMENT_DESC: '應用程式開發人員可以使用環境變量來配置此鏡像的運行時行為；詳細的配置說明請查看 <a href={link} target="_blank">編譯模板</a>。',
  // List > Create > JAR > Build Settings
  UPLOAD_ARTIFACT_FILE: '點擊成品檔案進行上傳',
  UPLOAD_PERCENT: '已上傳：{percent}%',
  UPLOAD_FULLY: '已上傳：100%',
  UPLOAD_FAILED: 'Upload failed.',
  ARTIFACT_FILE_EMPTY_DESC: '檔案還未上傳',
  B2I_DEFAULT_DESC: '請上傳成品檔案以構建容器鏡像。',
  JAR_DESC: 'JAR 檔案是一種軟體包檔案格式，通常用於聚合大量的 Java 類檔案、相關的元數據和資源（文本、圖片等）檔案到一個檔案',
  WAR_DESC: 'WAR 檔案是用於分發 Jar 檔案，JavaServer Pages，Java Servlet，Java類，XML 檔案，標記庫，静態網頁（HTML 和相關檔案）以及共同構成 Web 應用程式的其他資源的集合的檔案。',
  BUILD_ENVIRONMENT: '構建環境',
  CODE_REPOSITORY_KEY_NOT_REQUIRED: '目前代碼倉庫不需要密鑰',
  FILE_SIZE_VALUE: '檔案大小：{value}',
  FILE_UPLOADED_TIP: '上傳檔案成功。',
  WRONG_FILE_EXTENSION_NAME: '選擇的檔案類型不符合，請選擇 {type} 類型。',
  IMAGE_NAME_EMPTY_DESC: 'Please enter an image name.',
  IMAGE_TAG_EMPTY_DESC: 'Please enter an image tag.',
  TARGET_IMAGE_REPOSITORY_EMPTY_DESC: 'Please set a target image registry.',
  VALIDATE_SUCCESS: 'Validation succeeded',
  VALIDATE_FAILED: 'Validation failed',
  RUN_SUCCESSFUL: 'Run succeeded',
  RUN_FAILED: 'Run failed'
};