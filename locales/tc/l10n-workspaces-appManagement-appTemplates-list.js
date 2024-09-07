/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  APP_TEMPLATE_PL: '應用程序範本',
  APPS_MANAGEMENT: '應用管理',
  UPLOAD_TEMPLATE: '上傳模板',
  APP_TEMPLATE_DESC:
    'KubeSphere 提供全生命週期的應用管理，可以上傳或者創建新的應用模板，並且快速部署它們，也可以通過應用商店進行發佈應用。',
  DEVELOP_APP_DESC:
    '您可以上傳 Helm Chart 或者使用 KubeSphere 提供的資源編排工具進行應用模板的開發',
  DEVELOP_APP_TITLE: '開發應用模板',
  HOW_PUBLISH_APP_TITLE: '如何發佈已有應用',
  HOW_PUBLISH_APP_DESC:
    'KubeSphere 目前支持將已有應用的 Helm Chart 上傳至企業空間的應用模板，提交審核後，可以將應用發佈在應用商店中。',
  // List
  // APP_STATUS_ACTIVE: '已發布',
  // APP_STATUS_DRAFT: 'Unreleased',
  APP_STATUS_SUSPENDING: '暫停',
  APP_STATUS_ACTIVE: '已上架',
  APP_STATUS_DRAFT: '未上架',

  APP_TEMPLATE_EMPTY_DESC: '請創建一個應用範本。',
  LATEST_VERSION: '最新版本',
  // List > Create
  CREATE_APP_TEMPLATE: '創建應用模板',
  CREATE_APP_TEMPLATE_DESC:
    '輕量化、可移植、自包含的軟體封裝技術，使應用可以在幾乎任何地方以相同的方式運行。',
  APP_CREATE_GUIDE: '完整的應用開發規範請參考',
  UPLOAD: '開始上傳',
  // List > Create > Upload
  UPLOAD_HELM_TITLE: '上傳 Helm 配置文件',
  UPLOAD_HELM_CHART_DESC: '上傳已有的 Helm chart ',
  HELM_CHART_FORMAT_DESC: '支持 tar.gz 和 tgz 格式',
  UPLOAD_ICON: '上傳圖示',
  UPLOAD_SUCCESSFUL: '上傳成功',
  UPLOADING: '正在上傳',
  FILE_MAX_SIZE_ICON: 'The maximum size of the icon is 96x96 pixels.',
  FILE_MAX_SCREENSHOTS: '截圖大小不能超過 2M',
  APP_ICON_NOTE: '96px * 96px 以内 JPG 或者 PNG',
  MISS_FILE_NOTE: '文件 {file} 沒有找到',
  LICENSE_FILE_DESC: '文本格式的協定',
  CHART_FILE_DESC: 'Yaml 檔案，用於描述 Chart 的基本資訊，包括名稱版本等',
  README_FILE_DESC: '應用介绍、使用說明',
  REQUIREMENTS_FILE_DESC: '用於存放目前 Chart 依賴的其它 Chart 的說明檔案',
  VALUES_FILE_DESC: 'Chart 的預設值配置檔案',
  CHARTS_FILE_DESC: '該目錄中放置目前 Chart 依賴的其它 Chart',
  TEMPLATES_FILE_DESC:
    '部署檔案模板目錄，模板填入 values.yaml 中相應值，生成最終的 Kubernetes 配置檔案',
  NOTES_FILE_DESC: '使用指南',
  INCORRECT_FILE: 'Incorrect files? ',
  TRY_AGAIN: 'Try Again',
  FILE_MAX_ICON_DESC: 'The icon size should not exceed 20 KB. Please try again.',
  HOMEPAGE: '首頁',
  OPTIONAL: '選填',
  created: '已創建',
};
