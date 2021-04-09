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
  'Submit for Review': '提交審核',
  'Cancel Review': '取消審核',
  'Release to Store': '發佈到商店',
  'View in Store': '在商店查看',
  'Suspend Version': '下架版本',
  'Activate Version': '上架版本',
  'Delete Version': '刪除版本',
  'Suspend App': '下架應用',
  'Activate App': '上架應用',

  VERSION_DELETE_TIP: '確定要刪除版本 <strong>{name}</strong> 嗎? ',
  VERSION_SUBMIT_TIP: '確定要提交版本 <strong>{name}</strong> 去審核?',
  VERSION_CANCEL_TIP: '確定要取消版本 <strong>{name}</strong> 的審核嗎?',
  VERSION_SUSPEND_TIP:
    '版本 <strong>{name}</strong> 下架後，關聯的應用將不顯示該版本，您確定要下架嗎？',
  VERSION_RECOVER_TIP:
    '版本 <strong>{name}</strong> 上架後，關聯的應用將顯示出該版本，您確定要上架嗎？',
  VERSION_RELEASE_TIP:
    '版本 <strong>{name}</strong> 發佈到商店後，用戶可以查看並部署該應用版本，您確定要發佈嗎？',
  APP_SUSPEND_TIP:
    '應用<strong>{name}</strong>下架後，用戶無法從商店中購買到此應用，您確定要下架該應用嗎？',
  APP_RECOVER_TIP:
    '應用<strong>{name}</strong>上架後，相關的下架版本都將變成上架，您確定要上架該應用嗎？',

  'Version Management': '版本管理',
  'App Information': '應用資訊',
  'Audit Records': '應用審核',
  'App Instances': '應用實例',
  'Deployed Instances': '部署實例',
  Versions: '版本',

  PACKAGE_FILE_DESC:
    'Package.json 檔案，用於描述應用或版本的基本資訊，包括名稱版本號等',
  CONFIG_FILE_DESC: '應用的預設值配置檔案',
  LICENSE_FILE_DESC: '文本格式的協定',
  LOCALE_EN__FILE_DESC: '應用配置的國際化英文翻譯',
  LOCALE_ZH_FILE_DESC: '應用配置的國際化中文翻譯',
  CHART_FILE_DESC: 'Yaml 檔案，用於描述 Chart 的基本資訊，包括名稱版本等',
  README_FILE_DESC: '應用介绍、使用說明',
  REQUIREMENTS_FILE_DESC: '用於存放目前 Chart 依賴的其它 Chart 的說明檔案',
  VALUES_FILE_DESC: 'Chart 的預設值配置檔案',
  CHARTS_FILE_DESC: '該目錄中放置目前 Chart 依賴的其它 Chart',
  TEMPLATES_FILE_DESC:
    '部署檔案模板目錄，模板填入 values.yaml 中相應值，生成最終的 Kubernetes 配置檔案',
  NOTES_FILE_DESC: '使用指南',

  'Version Update Info': '版本更新說明',
  'No version information': '暫無更新說明',

  developer: '開發者',
  isv: '應用服務商',
  business: '商務審核者',
  technical: '技術審核者',
  global_admin: '超級管理員',
  admin: '管理員',

  'Download Successfully': '下載成功',

  Passed: '已通過',
  Rejected: '已拒絕',
  Draft: '待提交',
  Suspended: '已暫停',
  Starting: '啟動中',
  Working: '工作中',
  Stopping: '停止中',
  Submitted: '等待審核',
  Submit: '提交',
  Review: '審核',
  Pass: '通過',
  Reject: '拒絕',
  Release: '發佈',
  Developing: '開發中',
  Published: '已上架',
  Recalled: '已下架',
  Recall: '下架',
  Activated: '已啟用',
  'In-review': '審核中',
  'in-review': '審核中',
  'Pending-review': '審核中',
  creating: '創建中',
  deleting: '刪除中',

  'Test Steps': '測試步驟',
  VERSION_SUBMIT_TEST_STEPS:
    '1. 所有依賴的 Chart 已經分别提交<br/>' +
    '2. 可以成功通過静態檢查 (helm lint) <br/>' +
    '3. 可以用預設值成功啟動應用 (helm install)：所有 Pod 是 running 狀態，所有服務 (service) 都至少有一個 endpoint<br/>' +
    '4. 使用的鏡像沒有安全漏洞 <br/>' +
    '5. 支持升級 <br/>' +
    '6. 支持自定義應用配置<br/>' +
    '7. 不要使用 Kubernetes 的 alpha 功能<br/>' +
    '8. 需要提供詳細的 README 檔案，包括對應用的介紹，前置條件和如何自定義配置參數<br/>',

  VERSION_SUBMIT_NOTE:
    '在正式提交審核之前，請確認您的應用已經通過了以下基本功能的測試',
  VERSION_SUBMIT_DOC: '更全面的測試手冊請參看',
  'Develop and test guide': '《開發者測試指南》',
  UPDATE_LOG_DESC: '用於詳細描述此次更新的具體内容',

  'Wrong version number format': '版本號的格式錯誤',
}
