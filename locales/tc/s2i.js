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
  PULL_COMMAND_SCAP: 'Pull command',
  'Add Environment Variables': '添加環境參數',
  'Artifact Type': '成品類型',
  'Authentication required': '需要認證資訊，請選擇密鑰。',
  b2i: '成品構建鏡像',
  binary: '二進制檔案',
  'Build Times': '構建次數',
  Builder: '構建',
  'builder name': '編譯名稱',
  builderImage: '鏡像模板',
  BuilderImage: '編譯模板',
  BuilderPullPolicy: '鏡像拉取策略',
  builderPullPolicy: '鏡像拉取策略',
  Building: '正在構建',
  'Building Image': '構建鏡像',
  'Building Log': '構建紀錄',
  'building logs': '構建紀錄',
  CLICK_UPLOAD_ARTIFACT: '點擊上傳成品檔案',
  'Code Resource': '代碼資源',
  CODE_URL: '代碼地址',
  creationTimestamp: '結束時間',
  'Currently only supports git repo': '目前僅支持 git 倉庫',
  'Download Artifact': '下載成品',
  'Environment Params': '環境變量參數',
  'exec: "git": executable file not found in $PATH': '目前 URL 未發現代碼倉庫',
  'Image Builder': '構建鏡像',
  'Image Building': '正在構建鏡像',
  'Image building failed': '構建鏡像失敗',
  'Image building succeeded': '構建鏡像成功',
  ImageName: '鏡像名稱',
  'is Failed': '構建失敗',
  'New Image Tag': '新鏡像 Tag',
  'New Tag': '新標籤',
  'No Log Records': '無紀錄紀錄',
  'Published Time': '發佈時間',
  PULL_COMMAND: '拉取命令',
  'Rebuild Image': '重新構建鏡像',
  'Rebuilt successfully; the image status will be refreshed soon.': '重建成功，鏡像狀態稍後將會更新',
  'Release Time': '發佈時間',
  'Repo reading failed': '讀取倉庫失敗',
  'Repo url': '倉庫地址',
  'Repo URL': '倉庫地址',
  'Repository Not Found': '尚未找到代碼倉庫',
  RevisionId: '修訂版本號碼',
  'Run Command': '運行命令',
  s2i: '代碼構建鏡像',
  S2IJobs: 'S2I 任務',
  'Source to image jobs': 'S2I 任務',
  sourceUrl: '來源地址',
  SourceUrl: '來源地址',
  S2I_RELATIVE_PATH_TIP: '可以指定代碼編譯的相對路徑，預設為 /。',
  StartTime: '開始時間',
  S2I_NO_SECRET: '目前代碼倉庫不需要密鑰。',
  UPLOAD_ARTIFACT_TIP: '請上傳一個檔案。',
  UPLOAD_ARTIFACT: '上傳成品',
  'Upload file failed': '檔案上傳失敗',
  'Upload Percent': '上傳進度',
  SORT_BY: '以{ name }排序',
  S2I_RELATIVE_PATH_DESC: '源代碼倉庫地址（目前支持 git）並且可以指定代碼分支及在源代碼終端的相對路徑',
  IMAGE_PULL_POLICY_DESC: '在預設情况下，優先使用本地鏡像',
  S2I_UPDATE_WORKLOAD: '構建成功後更新工作負載',
  S2I_UPDATA_WORKLOAD_DESC: '重新構建鏡像成功後，將更新相關工作負載的鏡像，同時工作負載的版本也會被更新',
  IMAGE_FROM_S2I_DESC: 'Get the code from the existing code repository and build the image by way of Source to Image. The process of building the image each time will be done as a job.',
  IMAGE_FROM_EXSIT: 'Select an existing image deployment container',
  IMAGE_FROM_EXSIT_DESC: 'Pull an image from a public or private image repository',
  S2I_SECRET_DESC: '如果是私有代碼倉庫，請選擇代碼倉庫密鑰。',
  S2I_IMAGE_REPONSITRY_DESC: '源代碼倉庫地址（目前支持 Git）並且可以指定代碼分支及在源代碼終端的相對路徑。',
  S2I_RELATIVE_PATH: '代碼相對路徑(可選)',
  S2I_IMAGENAME_DESC: '鏡像名稱及標籤，預設為代碼倉庫的項目名稱。',
  S2I_BUILDERNAME_DESC: '選擇編輯環境，您也可以查看對應的 <a href={link} target="_blank">編譯模板</a>',
  CONTAINERD_RUNTIME_NOT_SUPPORT: 'S2I and B2I do not support the containerd runtime.',
  'Build image for service x': '為 {service} 服務構建鏡像',
  BINARY_DESC: '',
  SECRET_CODE: '觸發令牌',
  SECRET_CODE_RULE_DESC: '只能包含大小寫字母、數字。',
  S2I_ACCESS_TOKEN_DESC: 'Set the ',
  'Remote Trigger Link': '遠程觸發鏈接',
  // Image Builder List Page
  // Creation Page
  S2I_SECRET: '密鑰'
};