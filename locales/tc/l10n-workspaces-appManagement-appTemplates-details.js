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
  // Edit
  MODIFY_SUCCESSFUL: '修改成功',
  SERVICE_PROVIDER_WEBSITE_DESC: 'Official website address of the service provider.',
  WRONG_ADDRESS_TIP: 'Incorrect format. Please enter a correct website address.',
  APP_NAME_DESC: 'Name of the app. The maximum length is 20 characters.',
  APP_DESCRIPTION_DESC: 'Description of the app. The maximum length is 120 characters.',
  APP_ICON_FORMAT: '格式: PNG 背景透明最佳',
  APP_ICON_SIZE: 'Icon size: 96x96 pixels',
  CHOOSE_APP_CATEGORY_DESC: 'Select a category for the app.',
  EDIT_APP_DESC: '對應用的基本資訊進行設置',
  ICON: 'Icon',
  SERVICE_PROVIDER_WEBSITE_TCAP: 'Service Provider Website',
  START_EDITING: 'Start editing...',
  SCREENSHOTS_COLON: 'Screenshots: ',
  DELETE_ALL: 'Delete All',
  // More > Install
  // More > Upload Version
  ADD_VERSION_SUCCESSFUL: '添加版本成功',
  UPLOAD_PACKAGE_OK_NOTE: 'The version already exists. Please upload another version.',
  UPLOAD_NEW_VERSION: 'Upload Version',
  UPLOAD_NEW_VERSION_DESC: 'Upload a new version of the app.',
  // More > Delete
  DELETE_APP_TEMPLATE_DESC: 'Enter the app template name <b>{resource}</b> to confirm that you understand the risks of this operation.',
  DELETE_APP_TEMPLATE_VERSIONS_DESC: 'Enter the app template name <b>{resource}</b> to confirm that you understand the risks of this operation. Before deleting the app template, you must delete all versions of the template.',
  APP_TEMPLATE_LOW: 'app template',
  // Details
  // Versions
  APP_STATUS_SUBMITTED: 'Submitted',
  APP_STATUS_NOT_SUBMITTED: 'Not submitted',
  VERSION_INFO: 'Version Information',
  INSTALL: 'Install',
  SUBMIT_FOR_REVIEW: 'Submit for Review',
  DOWNLOAD_SUCCESSFUL: '下載成功',
  VERSION_DELETE_TIP: '確定要刪除版本 <strong>{name}</strong> 嗎? ',
  VERSION_SUBMIT_TIP: '確定要提交版本 <strong>{name}</strong> 去審核?',
  VERSION_CANCEL_TIP: '確定要取消版本 <strong>{name}</strong> 的審核嗎?',
  VERSION_RELEASE_TIP: '版本 <strong>{name}</strong> 發佈到商店後，用戶可以查看並部署該應用版本，您確定要發佈嗎？',
  VERSION_SUSPEND_TIP: '版本 <strong>{name}</strong> 下架後，關聯的應用將不顯示該版本，您確定要下架嗎？',
  VERSION_RECOVER_TIP: '版本 <strong>{name}</strong> 上架後，關聯的應用將顯示出該版本，您確定要上架嗎？',
  UPDATE_TIME_SCAP: 'Update time',
  VIEW_IN_STORE: 'View in Store',
  // Versions > Upload
  UPLOAD_AGAIN_TIP: 'Please try again.',
  // Versions > Submit for Review
  ENTER_VERSION_NUMBER_TIP: 'Please enter a version number.',
  SUBMIT_REVIEW_DESC: 'Submit the app template for review before releasing it to the App Store.',
  APP_LEARN_MORE: '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">Learn More</a>',
  INVALID_VERSION_TIP: '无效版本格式。',
  // Versions > Submit for Review > Test Steps
  VERSION_SUBMIT_TEST_STEPS: '1. 所有依賴的 Chart 已經分别提交<br/>' + '2. 可以成功通過静態檢查 (helm lint) <br/>' + '3. 可以用預設值成功啟動應用 (helm install)：所有 Pod 是 running 狀態，所有服務 (service) 都至少有一個 endpoint<br/>' + '4. 使用的鏡像沒有安全漏洞 <br/>' + '5. 支持升級 <br/>' + '6. 支持自定義應用配置<br/>' + '7. 不要使用 Kubernetes 的 alpha 功能<br/>' + '8. 需要提供詳細的 README 檔案，包括對應用的介紹，前置條件和如何自定義配置參數<br/>',
  VERSION_SUBMIT_NOTE: '在正式提交審核之前，請確認您的應用已經通過了以下基本功能的測試',
  // Versions > Submit for Review > Update Log
  UPDATE_LOG_DESC: '用於詳細描述此次更新的具體内容',
  SUBMIT_SUCCESSFUL: 'Submitted successfully.',
  CANCEL_SUCCESSFUL: 'Canceled successfully.',
  // App Information
  // App Release
  // App Instances
  APP_INSTANCES: 'App Instances'
};