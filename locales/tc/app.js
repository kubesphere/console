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
  'Upload Template': '上傳模板',
  APPS_CREATE_DESC:
    'KubeSphere 提供全生命週期的應用管理，可以上傳或者創建新的應用模板，並且快速部署它們，也可以通過應用商店進行發佈應用。',

  'Apps Management': '應用管理',
  'App Store Management': '應用商店管理',

  'App Info': '應用資訊',
  'Base Info': '基本資訊',
  'App Details': '應用詳情',
  'App Config': '應用配置',
  'Current App Config': '當前應用配置',
  'New App Config': '新的應用配置',
  Introduction: '使用說明',
  'Terms of service': '服務條款',
  'Config File': '配置文件',
  'Chart Files': '配置文件',
  'Update Log': '更新紀錄',
  'No update log': '暫無更新紀錄',
  Note: '提示',
  APP_NAME_DESC: '應用的重要商標',
  'Select file': '選擇檔案',
  'Application Name': '應用名稱',
  'Application Version': '應用版本',
  'App Description': '應用簡介',
  APP_ABSTRACTION_DESC: '對應用的概括性介紹',
  APP_DETAIL_DESC: '在用戶搜索應用時會非常有幫助',
  'Upload Icon': '上傳圖標',
  APP_ICON_NOTE: '96px * 96px 以内 JPG 或者 PNG',
  APP_ICON_FORMAT: '格式: PNG 背景透明最佳',
  APP_ICON_SIZE: '圖形大小: 96px * 96px',
  'Start editing': '開始編輯',
  File: '檔案',
  'Platform App Store Management': '平台級應用商店管理',

  'App Store': '應用商店',
  APP_STORE_DESC: '對已上架、已下架的應用進行管理',
  Provider: '服務商',
  'Latest Version': '最新版本',
  'App Category': '應用分類',
  'Release / Suspended Time': '上架 (下架) 時間',

  'App Review': '應用審核',
  'App Reviews': '應用審核',
  APP_REVIEW_DESC: '對應用上架提供審核功能',
  APP_REVIEWS_CREATE_DESC: '對應用上架提供審核功能',
  Unprocessed: '待處理',
  Processed: '已處理',
  'Review Object': '審核對象',
  'Request for Approval': '應用上架',
  Operator: '操作者',
  'Apply No / Reject Reason': '申請編號 / 拒絕原因',
  'Review Status': '審核狀態',
  'Updated Time': '更新時間',
  Submitter: '提交者',
  Handle: '處理',
  'Review Content': '審核内容',
  REVIEW_CONTENT_DESC:
    '以下資訊必須真實準確，關鍵的操作說明需要描述詳情，對於條款中的權利與義務需要描述清楚。',
  SUBMIT_REVIEW_DESC: '提交應用至應用商店，審核通過後將出現在應用商店中',
  REVIEWS_CREATE_DESC: '暫時沒有相關的應用審核數據',

  'App Version': '應用版本',
  'Current App Version': '當前應用版本',
  'Service Provider': '服務提供商',
  'App Introduction': '應用介紹',
  'Reject Reason': '拒絕原因',
  REJECT_REASON_DESC: '請填寫拒絕審核的原因',
  'Please input reject reason': '請填寫拒絕原因',
  'Please input version number': '請輸入版本號',
  APP_CATEGORIES_DESC: '對已上架的應用分類管理',
  AUDIT_RECORD_CREATE_DESC: '暫無相關的審核紀錄數據',

  'App Categories': '應用分類',
  APP_CATEGORIES_CREATE_DESC: '該分類暫無綁定的應用數據',
  'All Categories': '全部分類',
  'Adjust App Category': '調整應用分類',
  ADJUST_CATEGORY_DESC: '應用分類將決定該應用在應用商店中的分類',
  'Change Category': '調整分類',
  DELETE_CATEGORY_WARNING:
    '該分類綁定了 <strong>{total}</strong> 個應用，請先將這些應用調整到其它分類後才能刪除',
  DELETE_CATEGORY_DESC: '您確定要刪除分類 【{name}】 嗎？',
  'Adjust Successfully': '調整成功',

  APP_TEMPLATES_DESC:
    'KubeSphere 提供全生命週期的應用管理，可以上傳或者創建新的應用模板，並且快速部署它們，也可以通過應用商店進行發佈應用。',
  UPLOAD_HELM_TITLE: '上傳 Helm 配置文件',
  UPLOAD_HELM_DESC: '上傳已有的 Helm Chart ',
  'Edit App Informatio': '編輯應用資訊',
  EDIT_APP_DESC: '對應用的基本資訊進行設置',
  'App Number': '應用編號',
  'App Version Types': '交付類型',
  'Create Time': '創建時間',
  'Add Version': '添加版本',
  'New Version': '添加版本',
  'App Deploy': '應用部署',
  'Test Deployment': '測試部署',
  'Modify Successfully': '修改成功',
  'Add Version Successfully': '添加版本成功',
  'Submit Successfully': '提交成功',
  'Cancel Successfully': '取消成功',
  'Release Successfully': '發佈成功',
  'Delete Successfully': '刪除成功',
  'Pass Successfully': '通過成功',
  'Reject Successfully': '拒絕成功',
  'Suspend Successfully': '下架成功',
  'Recover Successfully': '上架成功',
  'Activate Successfully': '上架成功',
  'In Project': '所屬項目',

  'Create App Template': '創建應用模板',
  CREATE_APP_DESC:
    '輕量化、可移植、自包含的軟體封裝技術，使應用可以在幾乎任何地方以相同的方式運行。',
  RESOURCE_TOOL_TITLE: '通過資源編排工具創建',
  RESOURCE_TOOL_DESCRIPTION:
    'KubeSphere 提供了視覺化的資源編排工具，您可以通過資源預編輯來創建應用模板，部署測試',
  UPLOAD_HELM_DESCRIPTION: '上傳已有的 Helm Chart. 文件格式支持 tar.gz 和 tgz',
  START_UPLOAD: '開始上傳',
  'Start Create': '開始創建',
  APP_CREATE_GUIDE: '完整的應用開發規範請參考',
  HELM_DEVELOP_GUIDE: 'Helm 規範及應用開發',

  UPLOAD_SUPPORT_FORMAT: '文件格式支持 tar.gz 和 tgz',
  Uploading: '正在上傳',
  'Upload successfully': '上傳成功',
  'please upload again': '請重新上傳',
  FILE_FORMAT_PACKAGE: '文件格式支持 tar.gz 和 tgz',
  FILE_FORMAT_ICON: '圖示格式支持 png 和 jpg',
  FILE_FORMAT_SCREENSHOTS: '截圖格式支持 png 和 jpg',
  FILE_MAX_PACKAGE: '配置包大小不能超過 2M',
  FILE_MAX_ICON: '圖示大小不能超過 20KB',
  FILE_MAX_SIZE_ICON: '圖示尺寸大小不能超過 96px',
  FILE_MAX_SCREENSHOTS: '截圖大小不能超過 2M',
  UPLOAD_PACKAGE_OK_NOTE: '請上傳配置包或上傳的配置包不正確',
  'Delete picture': '刪除圖片',
  'Re-upload': '重新上傳',
  'Package problems': '文件有問題',
  'Upload again': '重新上傳',
  'App Name': '應用名稱',
  'App Home': '應用首頁',
  'Select File': '選擇檔案',
  'App Screenshots': '應用截圖',
  'Upload Screenshots': '上傳截圖',

  'Edit App Information': '編輯應用資訊',
  Uncategorized: '未分類',
  'Category Name': '分類名稱',
  CATEGORY_NAME_DESC: '建議不超過 8 個字元，最多能輸入 20 個字元',
  'Please input category name': '請輸入分類名稱',
  ICON_DESC: '請選擇一個圖示來標示分類',
  'Please select icon': '請選擇圖示',
  'Wrong website format': '輸入的網站格式錯誤',

  Screenshot: '截圖',
  'Version No': '版本號碼',
  'Deploy now': '立即部署',
  'Deploy after login': '登入後部署',
  'Evaluation stars': '綜合評價',
  'Business introduction': '業務介紹',
  'Company website': '公司官網',
  'Time of entry': '入駐時間',
  Discoveries: '發現',
  'New Apps': '最新上架',
  screenshots: '張截圖',
  'Delete all': '刪除全部',
  'A general introduction to the application': '對應用的概括性介紹',
  'Detail Introduction': '詳細介紹',
  'Very helpful when users search for apps': '在用戶搜索應用時會非常有幫助',
  Icon: '圖示',
  'Format png/svg background transparency is the best':
    '格式： png/svg 背景透明最佳',
  CHOOSE_APP_CATEGORY_DESC: '選擇適合的應用分類，便於用戶更快發現您的應用',
  'Service Provider Website': '服務商網站',
  "Service provider's official website address": '服務商的官方網站地址',
  MODIFY_VERSION_TIPS: '每次修改的内容都將跟随下一次版本上架而真正生效。',
  UNDER_REVIEW_TIPS: '目前應用有版本正在審核中，以下資訊暫時不可更改',

  'Instance Name': '實例名稱',
  'Index Successfully': '同步成功',

  NO_DEPLOY_RUNTIME_NOTE: '項目中沒有可用的部署運行環境',

  'Upload icon': '上傳圖示',

  APP_CATE_All: '全部',

  APP_CATE_UNCATEGORIZED: '未分類',

  MISS_FILE_NOTE: '文件 {file} 沒有找到',

  'Please select a project to deploy': '請選擇項目部署',
  'Please select a workspace': '請選擇企業空間',
  'Please select a cluster': '請選擇集群',
  'Please select a project': '請選擇項目',
  'Please select a project role': '請選擇項目角色',
  'Please select a DevOps project': '請選擇 DevOps 工程',
  'Please select a DevOps project role': '請選擇工程角色',

  HELM_APP_SCHEMA_FORM_TIP:
    '此應用支持表單模式，可選擇通過表單或 YAML 編輯器來修改預設應用配置。注意：不同模式之間數據獨立。',

  DELETE_APP_TEMPLATE_TIP: '刪除應用模板前，需要先刪除所有版本。',

  UNPROCESSED_APP_REVIEW: '未處理的應用審核',
  PROCESSED_APP_REVIEW: '已處理的應用審核',
  ALL_APP_REVIEW: '應用審核',

  'APP_CATE_MESSAGE QUEUEING': '消息佇列',
  'APP_CATE_IMAGE REGISTRY': '鏡像倉庫',
  'APP_CATE_PROMETHEUS EXPORTER': '數據匯出器',
  'APP_CATE_WEB SERVER': 'Web 伺服器',
  APP_CATE_NETWORKING: '網路',
  'APP_CATE_DATABASE & CACHE': '資料庫和緩存',
  APP_CATE_STORAGE: '存儲',
}
