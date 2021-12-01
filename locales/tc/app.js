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
  APP_TEMPLATE_DESC:
    'KubeSphere 提供全生命週期的應用管理，可以上傳或者創建新的應用模板，並且快速部署它們，也可以通過應用商店進行發佈應用。',
  APP_TEMPLATE_CREATE_DESC:
    'KubeSphere 提供全生命週期的應用管理，可以上傳或者創建新的應用模板，並且快速部署它們，也可以通過應用商店進行發佈應用。',
  DEVELOP_APP_TITLE: '開發應用模板',
  DEVELOP_APP_DESC:
    '您可以上傳 Helm Chart 或者使用 KubeSphere 提供的資源編排工具進行應用模板的開發',
  HOW_PUBLISH_APP_TITLE: '如何發佈已有應用',
  HOW_PUBLISH_APP_DESC:
    'KubeSphere 目前支持將已有應用的 Helm Chart 上傳至企業空間的應用模板，提交審核後，可以將應用發佈在應用商店中。',
  HOW_APP_DEPLOY_TITLE: '如何部署和測試應用',
  UPLOAD_TEMPLATE: '上傳模板',
  APPS_CREATE_DESC:
    'KubeSphere 提供全生命週期的應用管理，可以上傳或者創建新的應用模板，並且快速部署它們，也可以通過應用商店進行發佈應用。',

  APPS_MANAGEMENT: '應用管理',
  'Apps Management': '應用管理',
  APP_STORE_MANAGEMENT: '應用商店管理',

  APP_INFORMATION: '應用資訊',
  'Base Info': '基本資訊',
  APP_DETAILS: '應用詳情',
  'App Config': '應用配置',
  APP_SETTINGS: 'App Settings',
  'Current App Config': '當前應用配置',
  'App Details': '應用詳情',
  CURRENT_APP_SETTINGS_READONLY: '當前應用配置',
  TARGET_APP_SETTINGS: 'Target App Settings',
  'New App Config': '新的應用配置',
  Introduction: '使用說明',
  'Terms of service': '服務條款',
  CONFIG_FILE: '配置文件',
  CHART_FILES: '配置文件',
  'Update Log': '更新紀錄',
  NO_UPDATE_LOG_DESC: 'No update log is found.',
  Note: '提示',
  APP_NAME_DESC: 'Name of the app. The maximum length is 20 characters.',
  'Select file': '選擇檔案',
  'Application Name': '應用名稱',
  'Application Version': '應用版本',
  APP_DESCRIPTION_DESC:
    'Description of the app. The maximum length is 120 characters.',
  APP_DETAIL_DESC: '在用戶搜索應用時會非常有幫助',
  'Upload Icon': '上傳圖標',
  APP_ICON_NOTE: '96px * 96px 以内 JPG 或者 PNG',
  APP_ICON_FORMAT: '格式: PNG 背景透明最佳',
  APP_ICON_SIZE: 'Icon size: 96x96 pixels',
  'Start editing': '開始編輯',
  File: '檔案',

  APP_STORE_DESC: '對已上架、已下架的應用進行管理',
  PROVIDER: '服務商',
  APP_CATEGORY: '應用分類',
  'Release / Suspended Time': '上架 (下架) 時間',

  APP_REVIEW: '應用審核',
  APP_REVIEWS: '應用審核',
  APP_RELEASE_DESC:
    'KubeSphere supports reviewing the contents of applications to be released. You can view the contents and approve or reject to publish the applications.',
  APP_REVIEW_EMPTY_DESC: 'No unreleased app is found.',
  APP_REVIEWS_CREATE_DESC: '對應用上架提供審核功能',
  UNREVIEWED: 'Unreviewed',
  REVIEWED: 'Reviewed',
  'Review Object': '審核對象',
  APP_RELEASE: '應用上架',
  Operator: '操作者',
  'Apply No / Reject Reason': '申請編號 / 拒絕原因',
  'Review Status': '審核狀態',
  Submitter: '提交者',
  Handle: '處理',
  REVIEW_CONTENT: '審核内容',
  APP_DETAILS_DESC: 'View details of the app to be released.',
  SUBMIT_REVIEW_DESC: 'Submit the app for release.',
  REVIEWS_CREATE_DESC: '暫時沒有相關的應用審核數據',

  'App Version': '應用版本',
  CURRENT_APP_VERSION: '當前應用版本',
  TARGET_APP_VERSION: 'Target App Version',
  'Service Provider': '服務提供商',
  'App Introduction': '應用介紹',
  'Reject Reason': '拒絕原因',
  REJECT_REASON_DESC: '請填寫拒絕審核的原因',
  REJECT_REASON_TIP: '請填寫拒絕原因',
  ENTER_VERSION_NUMBER_TIP: 'Please enter a version number.',
  APP_CATEGORIES_DESC:
    '您可以在此頁面創建、編輯、刪除分類，對已上架的應用進行分類管理。',
  AUDIT_RECORD_CREATE_DESC: '暫無相關的審核紀錄數據',

  APP_CATEGORY_PL: '應用分類',
  APP_CATEGORY_EMPTY_DESC: '該分類暫無綁定的應用。',
  ALL_CATEGORIES_VALUE: 'All Categories ({value})',
  'Adjust App Category': '調整應用分類',
  CHANGE_CATEGORY_DESC: '應用分類將決定該應用在應用商店中的分類',
  CHANGE_CATEGORY: '調整分類',
  DELETE_CATEGORY_WARNING:
    '該分類綁定了 <strong>{total}</strong> 個應用，請先將這些應用調整到其它分類後才能刪除',
  DELETE_CATEGORY_DESC:
    'Are you sure you want to delete the category <b>{name}</b>?',
  CHANGED_SUCCESSFULLY: 'Changed successfully.',

  APP_TEMPLATES_DESC:
    'KubeSphere 提供全生命週期的應用管理，可以上傳或者創建新的應用模板，並且快速部署它們，也可以通過應用商店進行發佈應用。',
  UPLOAD_HELM_TITLE: '上傳 Helm 配置文件',
  UPLOAD_HELM_CHART_DESC: '上傳已有的 Helm chart ',
  'Edit App Informatio': '編輯應用資訊',
  EDIT_APP_DESC: '對應用的基本資訊進行設置',
  'App Version Types': '交付類型',
  'Create Time': '創建時間',
  'Add Version': '添加版本',
  'New Version': '添加版本',
  'App Deploy': '應用部署',
  'Test Deployment': '測試部署',
  MODIFY_SUCCESSFUL: '修改成功',
  ADD_VERSION_SUCCESSFUL: '添加版本成功',
  'Submit Successfully': '提交成功',
  'Cancel Successfully': '取消成功',
  'Release Successfully': '發佈成功',
  REJECT_SUCCESSFUL: '拒絕成功',
  'Suspend Successfully': '下架成功',
  'Recover Successfully': '上架成功',
  'Activate Successfully': '上架成功',
  'In Project': '所屬項目',

  CREATE_APP_TEMPLATE: '創建應用模板',
  CREATE_APP_TEMPLATE_DESC:
    '輕量化、可移植、自包含的軟體封裝技術，使應用可以在幾乎任何地方以相同的方式運行。',
  RESOURCE_TOOL_TITLE: '通過資源編排工具創建',
  RESOURCE_TOOL_DESCRIPTION:
    'KubeSphere 提供了視覺化的資源編排工具，您可以通過資源預編輯來創建應用模板，部署測試',
  HELM_CHART_FORMAT_DESC: '支持 tar.gz 和 tgz 格式',
  UPLOAD: '開始上傳',
  'Start Create': '開始創建',
  APP_CREATE_GUIDE: '完整的應用開發規範請參考',
  HELM_DEVELOP_GUIDE: 'Helm 規範及應用開發',

  UPLOAD_SUPPORT_FORMAT: '文件格式支持 tar.gz 和 tgz',
  UPLOADING: '正在上傳',
  UPLOAD_SUCCESS: '上傳成功',
  UPLOAD_AGAIN_TIP: 'Please try again.',
  FILE_FORMAT_PACKAGE: '文件格式支持 tar.gz 和 tgz',
  FILE_FORMAT_ICON: '圖示格式支持 png 和 jpg',
  FILE_FORMAT_SCREENSHOTS: '截圖格式支持 png 和 jpg',
  FILE_MAX_PACKAGE: '配置包大小不能超過 2M',
  FILE_MAX_ICON: '圖示大小不能超過 20KB',
  FILE_MAX_SIZE_ICON: 'The maximum size of the icon is 96x96 pixels.',
  FILE_MAX_SCREENSHOTS: '截圖大小不能超過 2M',
  UPLOAD_PACKAGE_OK_NOTE:
    'The version already exists. Please upload another version.',
  'Delete picture': '刪除圖片',
  'Re-upload': '重新上傳',
  'Package problems': '文件有問題',
  'Upload again': '重新上傳',
  'App Name': '應用名稱',
  'Select File': '選擇檔案',
  APP_SCREENSHOTS: '應用截圖',
  'Upload Screenshots': '上傳截圖',

  'Edit App Information': '編輯應用資訊',
  Uncategorized: '未分類',
  'Category Name': '分類名稱',
  CATEGORY_NAME_DESC:
    'The name can contain any characters and the maximum length is 20 characters.',
  ENTER_CATEGORY_NAME_TIP: '請輸入分類名稱。',
  ICON_DESC: '請選擇一個圖示來標示分類',
  'Please select icon': '請選擇圖示',
  WRONG_ADDRESS_TIP:
    'Incorrect format. Please enter a correct website address.',

  Screenshot: '截圖',
  'Version No': '版本號碼',
  'Deploy now': '立即部署',
  'Deploy after login': '登入後部署',
  'Evaluation stars': '綜合評價',
  'Business introduction': '業務介紹',
  'Company website': '公司官網',
  'Time of entry': '入駐時間',
  Discoveries: '發現',
  NEW_APPS: '最新上架',
  screenshots: '張截圖',
  'Delete all': '刪除全部',
  'A general introduction to the application': '對應用的概括性介紹',
  'Detail Introduction': '詳細介紹',
  'Very helpful when users search for apps': '在用戶搜索應用時會非常有幫助',
  Icon: '圖示',
  'Format png/svg background transparency is the best':
    '格式： png/svg 背景透明最佳',
  CHOOSE_APP_CATEGORY_DESC: 'Select a category for the app.',
  'Service Provider Website': '服務商網站',
  SERVICE_PROVIDER_WEBSITE_DESC:
    'Official website address of the service provider.',
  MODIFY_VERSION_TIPS: '每次修改的内容都將跟随下一次版本上架而真正生效。',
  UNDER_REVIEW_TIPS: '目前應用有版本正在審核中，以下資訊暫時不可更改',

  'Instance Name': '實例名稱',
  INDEX_SUCCESS_TIP: '同步成功。',

  NO_DEPLOY_RUNTIME_NOTE: '項目中沒有可用的部署運行環境',

  UPLOAD_ICON: '上傳圖示',

  APP_CATE_All: '全部',

  APP_CATE_UNCATEGORIZED: '未分類',

  MISS_FILE_NOTE: '文件 {file} 沒有找到',

  'Please select a project to deploy': '請選擇項目部署',
  WORKSPACE_EMPTY_DESC: '請選擇企業空間',
  'Please select a cluster': '請選擇集群',
  'Please select a project': '請選擇項目',
  'Please select a project role': '請選擇項目角色',
  'Please select a DevOps project': '請選擇 DevOps 项目',
  'Please select a DevOps project role': '請選擇项目角色',

  HELM_APP_SCHEMA_FORM_TIP:
    '此應用支持表單模式，可選擇通過表單或 YAML 編輯器來修改預設應用配置。注意：不同模式之間數據獨立。',
  DELETE_APP_TEMPLATE_DESC:
    'Enter the app template name <b>{resource}</b> to confirm that you understand the risks of this operation.',
  DELETE_APP_TEMPLATE_VERSIONS_DESC:
    'Enter the app template name <b>{resource}</b> to confirm that you understand the risks of this operation. Before deleting the app template, you must delete all versions of the template.',

  UNPROCESSED_APP_RELEASE: 'Unreleased App',
  PROCESSED_APP_RELEASE: 'Released App',
  ALL_APP_RELEASE: 'Release Record',

  'APP_CATE_MESSAGE QUEUEING': '消息佇列',
  'APP_CATE_IMAGE REGISTRY': '鏡像倉庫',
  'APP_CATE_PROMETHEUS EXPORTER': '數據匯出器',
  'APP_CATE_WEB SERVER': 'Web 伺服器',
  APP_CATE_NETWORKING: '網路',
  'APP_CATE_DATABASE & CACHE': '資料庫和緩存',
  APP_CATE_STORAGE: '存儲',

  // App Review
  REVIEW: 'Review',
  OPERATOR: 'Operator',
  PENDING_REVIEW: 'Pending',
  COMPLETE_REVIEW: 'Complete',
  REJECT: 'Reject',
  RELEASE: 'Release',
  INTRODUCTION: 'Introduction',
  UPDATE_LOG: 'Update Log',
  SERVICE_PROVIDER_WEBSITE: 'Service provider website',
  SERVICE_PROVIDER: 'Service provider',
  APP_DESCRIPTION: 'App Description',
  DOCUMENTATION: 'Documentation',
  BACK: 'Back',
  NOTIFICATION_EMAIL: 'Email',
  NO_DOCUMENT_FOUND: 'No Documentation Found',

  // App Store
  DISCOVER: 'Discover',
  CATEGORIES: 'Categories',
  CATEGORY_COLON: 'Category:',
  HOMEPAGE_COLON: 'Homepage:',
  RELEASE_DATE_COLON: 'Release Date:',
  APP_ID_COLON: 'App ID:',
  APP_VERSIONS_TITLE:
    'Versions (only the latest 10 versions will be displayed)',
  VERSIONS: 'Versions',
  UPDATE_TIME_COLON: 'Update time: ',
  DEVELOPER: 'Developer',

  // App Store > Details
  REJECTION_REASON: 'Rejection Reason',

  // App Categories
  ICON: 'Icon',
  CREATE_CATEGORY: 'Create Category',
  APP_NOTE: 'Note',

  // App Templates > Details
  SERVICE_PROVIDER_WEBSITE_TCAP: 'Service Provider Website',

  // App Templates
  FILE: 'File',
  INCORRECT_FILE: 'Incorrect files? ',
  TRY_AGAIN: 'Try Again',
  FILE_MAX_ICON_DESC:
    'The icon size should not exceed 20 KB. Please try again.',
  START_EDITING: 'Start editing...',
  SCREENSHOTS_COLON: 'Screenshots: ',
  DELETE_ALL: 'Delete All',
  APP_LEARN_MORE:
    '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">Learn More</a>',
  ACTIVATE_SUCCESSFUL: 'Activated successfully.',
  CANCEL_SUCCESSFUL: 'Canceled successfully.',
  RECOVER_SUCCESSFUL: 'Recovered successfully.',
  RELEASE_SUCCESSFUL: 'Released successfully.',
  SUBMIT_SUCCESSFUL: 'Submitted successfully.',
  SUSPEND_SUCCESSFUL: 'Suspended successfully.',
  DEPLOYED_SUCCESSFUL: 'Deployed successfully.',
  VIEW_IN_STORE: 'View in Store',
  RELEASE_TO_STORE: 'Release to Store',
  AUDIT_EMPTY_DESC: 'No app review record is found.',
  APP_STATUS_SUBMITTED: 'Submitted',
  APP_STATUS_PASSED: 'Released',
  APP_STATUS_SUSPENDED: 'Suspended',
  APP_STATUS_REJECTED: 'Rejected',
  APP_STATUS_ACTIVE: 'Activated',
  APP_STATUS_PUBLISHED: 'Released',
  APP_STATUS_RECALLED: 'Suspended',
  APP_STATUS_RECALL: 'Recall',
  APP_STATUS_DRAFT: 'To be submitted',
  APP_STATUS_PENDING_REVIEW: 'To be released',
  APP_STATUS_IN_REVIEW: 'Reviewing',
  APP_STATUS_DEVELOPING: 'Developing',
  APPS: 'Apps',
  UNRELEASED: 'Unreleased',
  RELEASED: 'Released',
  RELEASE_RECORD: 'Release Record',
  RELEASE_RECORD_EMPTY_DESC: 'No release record is found.',
}
