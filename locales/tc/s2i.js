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
  CODE_URL: '代碼地址',
  CODE_REPOSITORY_URL: '代碼地址',
  'New Tag': '新標籤',
  IMAGE_NAME_BUILDING: 'Image: {name}/Building',
  IMAGE_NAME_FAILED: 'Image: {name}/Failed',
  IMAGE_NAME_SUCCESSFUL: 'Image: {name}/Successful',
  'Release Time': '發佈時間',
  SORT_BY: '以{ name }排序',
  creationTimestamp: '結束時間',
  'Environment Params': '環境變量參數',
  'is Failed': '構建失敗',
  'Add Environment Variables': '添加環境參數',
  CONTAINER_SETTINGS: '容器設置',
  NEW_TAG_DESC: '輸入重新構建鏡像的標籤',
  S2I_RELATIVE_PATH_DESC:
    '源代碼倉庫地址（目前支持 git）並且可以指定代碼分支及在源代碼終端的相對路徑',
  S2I_RELATIVE_PATH_TIP: '可以指定代碼編譯的相對路徑，預設為 /。',
  CODE_RELATIVE_PATH_DESC: '可以指定代碼編譯的相對路徑，預設為 /',
  'building logs': '構建紀錄',
  'Building Log': '構建紀錄',
  'Building Image': '構建鏡像',
  sourceUrl: '來源地址',
  SourceUrl: '來源地址',
  builderImage: '鏡像模板',
  IMAGE_ARTIFACTS: '鏡像成品',
  'Code Resource': '代碼資源',
  Builder: '構建',
  BuilderImage: '編譯模板',
  IMAGE_NAME: '鏡像名稱',
  IMAGE_NAME_SCAP: 'Image name',
  IMAGE_NAME_EMPTY_DESC: 'Please enter an image name.',
  IMAGE_TAG_EMPTY_DESC: 'Please enter an image tag.',
  TARGET_IMAGE_REPOSITORY_EMPTY_DESC: 'Please set a target image registry.',
  IMAGE_TAG: 'Image Tag',
  BuilderPullPolicy: '鏡像拉取策略',
  builderPullPolicy: '鏡像拉取策略',
  JOB_RECORDS: '任務紀錄',
  'Source to image jobs': 'S2I 任務',
  S2IJobs: 'S2I 任務',
  'Repo url': '倉庫地址',
  'builder name': '編譯名稱',
  Building: '正在構建',
  'Image Building': '正在構建鏡像',
  'Rebuild Image': '重新構建鏡像',
  'New Image Tag': '新鏡像 Tag',
  'Repo URL': '倉庫地址',
  IMAGE_FROM_S2I: '通過代碼構建新的容器鏡像',
  IMAGE_FROM_B2I: '通過成品構建新的鏡像',
  S2I_DESC: '選擇您的代碼開發語言。',
  B2I_DESC: '選擇您成品的文件類型。',
  PORT_SETTINGS_DESC: '設置容器的訪問策略',
  CONTAINER_SETTINGS_DESC: '對容器的名稱及容器的計算資源進行設置',
  HEALTH_CHECKER_DESC: '根據用戶需要，定時檢查容器健康狀況。',
  STARTUP_COMMAND: '啟動命令',
  STARTUP_COMMAND_DESC:
    '在預設情况下，鏡像會運行預設命令，如果想運行特定命令或重寫鏡像預設值。',
  'Run Command': '運行命令',
  CONTAINER_COMMAND_DESC:
    '容器的啟動命令參數，預設使用打包時使用的啟動命令, 如需多個請以 "," 分隔',
  CONTAINER_ARGUMENT_DESC: '容器的啟動命令參數, 如需多個請以 "," 分隔',
  PROBE_COMMAND_DESC: '如需多個請以 "," 分隔',
  CONTAINER_ENVIRONMENT_DESC: '添加容器的環境變量',
  IMAGE_PULL_POLICY_DESC: '在預設情况下，優先使用本地鏡像',
  S2I_ENVIRONMENT_DESC:
    '應用程式開發人員可以使用環境變量來配置此鏡像的運行時行為；詳細的配置說明請查看 <a href={link} target="_blank">編譯模板</a>。',
  S2I_UPDATE_WORKLOAD: '構建成功後更新工作負載',
  S2I_UPDATA_WORKLOAD_DESC:
    '重新構建鏡像成功後，將更新相關工作負載的鏡像，同時工作負載的版本也會被更新',
  'No Log Records': '無紀錄紀錄',
  S2I_SECRET_DESC: '如果是私有代碼倉庫，請選擇代碼倉庫密鑰。',
  S2I_IMAGE_REPONSITRY_DESC:
    '源代碼倉庫地址（目前支持 Git）並且可以指定代碼分支及在源代碼終端的相對路徑。',
  S2I_RELATIVE_PATH: '代碼相對路徑(可選)',
  S2I_BUILDERNAME_DESC:
    '選擇編輯環境，您也可以查看對應的 <a href={link} target="_blank">編譯模板</a>',
  S2I_TARGET_IMAGE_REPOSITORY_DESC:
    '選擇一個有鏡像倉庫推送權限的保密字典，如果沒有可以<a href={link} target="_blank">新建鏡像倉庫保密字典</a>。',
  S2I_IMAGENAME_DESC: '鏡像名稱及標籤，預設為代碼倉庫的項目名稱。',
  CODE_REPOSITORY_KEY_DESC: '如果是私有代碼倉庫，請選擇代碼倉庫密鑰',
  CODE_REPOSITORY_URL_DESC:
    '源代碼倉庫地址(目前支持 git)並且可以指定代碼分支及在源代碼終端的相對路徑',
  CODE_RELATIVE_PATH: '代碼相對路徑(可選):',
  S2I_IMAGE_NAME_DESC: '鏡像名稱及 Tag，預設為代碼倉庫的項目名稱',
  TARGET_IMAGE_REPOSITORY: '目標鏡像倉庫',
  'Rebuilt successfully; the image status will be refreshed soon.':
    '重建成功，鏡像狀態稍後將會更新',
  'Image building failed': '構建鏡像失敗',
  'Image building succeeded': '構建鏡像成功',
  RevisionId: '修訂版本號碼',
  'Image Builder': '構建鏡像',
  IMAGE_BUILDER: '構建鏡像',
  PULL_POLICY: 'Pull Policy',
  SOURCE_URL: 'Source URL',
  REMOTE_TRIGGER: 'Remote Trigger',
  BUILDER_IMAGE: 'Builder Image',
  BUILDER_IMAGE_SCAP: 'Builder image',
  IMAGE_BUILDER_LOW: 'image builder',
  LAST_BUILD_ENVIRONMENT: '最後一次構建環境',
  'Build Times': '構建次數',
  ImageName: '鏡像名稱',
  StartTime: '開始時間',
  s2i: '代碼構建鏡像',
  b2i: '成品構建鏡像',
  LOADING_DOTS: '正在載入',
  LOG_MODULE_NOT_INSTALLED: '紀錄模組未安裝',
  BUILD_ENVIRONMENT: '構建環境',
  FILE_UPLOADED_TIP: '上傳檔案成功。',
  'Upload Percent': '上傳進度',
  FILE_SIZE_VALUE: '檔案大小：{value}',
  DOWNLOAD_ARTIFACT: '下載成品',
  'File Uploaded Successfully': '上傳檔案成功',
  'Download Artifact': '下載成品',
  IMAGE_BUILDER_PL: '構建鏡像',
  'Artifact Type': '成品類型',
  IMAGE_BUILDER_DESC:
    '鏡像構建器（Image Builder）是將代碼或者成品製作成容器鏡像的工具。您可以通過簡單的設置將成品或代碼直接製作成容器鏡像。',
  PULL_COMMAND: '拉取命令',
  PULL_COMMAND_SCAP: 'Pull command',
  IMAGE_SIZE_SCAP: '鏡像大小',
  'Published Time': '發佈時間',
  UPLOAD_ARTIFACT_TIP: '請上傳一個檔案。',
  UPLOAD_FAILED: 'Upload failed.',
  binary: '二進制檔案',
  BUILD_IMAGE_FOR_SERVICE: '為 {service} 服務構建鏡像。',
  CLICK_UPLOAD_ARTIFACT: '點擊上傳成品檔案',
  UPLOAD_ARTIFACT: '上傳成品',
  ARTIFACT_FILE_EMPTY_DESC: '檔案還未上傳',
  'Upload file failed': '檔案上傳失敗',
  'Build image for service x': '為 {service} 服務構建鏡像',
  UPLOAD_ARTIFACT_FILE: '點擊成品檔案進行上傳',
  ARTIFACT_FILE: '上傳成品',
  BUILD_MODE: '選擇語言',
  B2I_DEFAULT_DESC: '請上傳成品檔案以構建容器鏡像。',
  JAR_DESC:
    'JAR 檔案是一種軟體包檔案格式，通常用於聚合大量的 Java 類檔案、相關的元數據和資源（文本、圖片等）檔案到一個檔案',
  WAR_DESC:
    'WAR 檔案是用於分發 Jar 檔案，JavaServer Pages，Java Servlet，Java類，XML 檔案，標記庫，静態網頁（HTML 和相關檔案）以及共同構成 Web 應用程式的其他資源的集合的檔案。',
  BINARY_DESC: '',
  IMAGE_BUILDER_EMPTY_DESC: '請創建一個鏡像構建器。',
  S2I_NO_SECRET: '目前代碼倉庫不需要密鑰。',
  CODE_REPOSITORY_KEY_NOT_REQUIRED: '目前代碼倉庫不需要密鑰',
  'Repository Not Found': '尚未找到代碼倉庫',
  'Currently only supports git repo': '目前僅支持 git 倉庫',
  'Authentication required': '需要認證資訊，請選擇密鑰。',
  'Repo reading failed': '讀取倉庫失敗',
  'exec: "git": executable file not found in $PATH': '目前 URL 未發現代碼倉庫',
  WRONG_FILE_EXTENSION_NAME: '選擇的檔案類型不符合，請選擇 {type} 類型。',
  SECRET_CODE: '觸發令牌',
  SECRET_CODE_RULE_DESC: '只能包含大小寫字母、數字。',
  TRIGGER_TOKEN: '觸發令牌',
  TRIGGER_TOKEN_DESC:
    'Set a token used to authenticate a client against KubeSphere when the client attempts to trigger image building on KubeSphere. The token can contain only uppercase letters, lowercase letters, and numbers.',
  INVALID_TRIGGER_TOKEN_DESC: '只能包含大小寫字母、數字',
  'Remote Trigger Link': '遠程觸發鏈接',

  // Image Builder List Page

  // Creation Page
  UPLOAD_PERCENT: '已上傳：{percent}%',
  UPLOAD_FULLY: '已上傳：100%',
  FILE_SIZE: '檔案大小：{size}',
  S2I_SECRET: '密鑰',
}
