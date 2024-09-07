/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  APP_TEMPLATE_PL: '应用模板',
  APPS_MANAGEMENT: '应用管理',
  UPLOAD_TEMPLATE: '上传模板',
  APP_TEMPLATE_DESC:
    'KubeSphere 提供全生命周期的应用管理，可以上传或者创建新的应用模板，并且快速部署它们，也可以通过应用商店进行发布应用。',
  DEVELOP_APP_DESC:
    '您可以上传 Helm chart 或者使用 KubeSphere 提供的资源编排工具进行应用模板的开发。',
  DEVELOP_APP_TITLE: '如何开发应用模板？',
  HOW_PUBLISH_APP_TITLE: '如何发布应用到应用商店？',
  HOW_PUBLISH_APP_DESC:
    '您可以将 Helm chart 上传为企业空间的应用模板，审核通过后，应用将会发布在应用商店中。',
  // List
  APP_STATUS_ACTIVE: '已上架',
  APP_STATUS_DRAFT: '未上架',
  APP_STATUS_SUSPENDING: '下架中',
  APP_TEMPLATE_EMPTY_DESC: '请创建一个应用模板。',
  LATEST_VERSION: '最新版本',
  // List > Create
  CREATE_APP_TEMPLATE: '创建应用模板',
  CREATE_APP_TEMPLATE_DESC:
    '轻量级、可移植、自包含的软件打包技术，使应用可以在几乎任何地方以相同的方式运行。',
  APP_CREATE_GUIDE:
    '请参阅开发指南 <a href="{docUrl}/application-store/app-developer-guide/helm-specification/" target="_blank" rel="noreferrer noopener">Helm 规范</a>。',
  UPLOAD: '上传',
  // List > Create > Upload
  UPLOAD_HELM_TITLE: '上传 Helm Chart',
  UPLOAD_HELM_CHART_DESC: '上传已有的 Helm chart。',
  HELM_CHART_FORMAT_DESC: '支持 tar.gz 和 tgz 格式。',
  UPLOAD_ICON: '上传图标',
  UPLOAD_SUCCESSFUL: '上传成功。',
  UPLOADING: '正在上传',
  FILE_MAX_SIZE_ICON: '图标的最大尺寸为 512x512 像素。',
  FILE_MAX_SCREENSHOTS: '截图大小不能超过 2 MB。',
  APP_ICON_NOTE: '上传 512x512 像素以内的 JPG 或 PNG 图像。',
  MISS_FILE_NOTE: '未找到文件 {file}。',
  LICENSE_FILE_DESC: '文本格式的许可协议。',
  CHART_FILE_DESC: 'YAML 文件，用于描述 chart 的基本信息，例如名称和版本。',
  README_FILE_DESC: '应用介绍和使用说明。',
  REQUIREMENTS_FILE_DESC: 'Chart 依赖关系描述文件。',
  VALUES_FILE_DESC: 'Chart 的默认值配置文件。',
  CHARTS_FILE_DESC: '存放 chart 依赖项的目录。',
  TEMPLATES_FILE_DESC: '存放部署模板文件的目录。',
  NOTES_FILE_DESC: '使用指南。',
  INCORRECT_FILE: '文件有误？',
  TRY_AGAIN: '重试',
  FILE_MAX_ICON_DESC: '图标尺寸不能超过 20 KB，请重试。',
  HOMEPAGE: '首页',
  OPTIONAL: '可选',
  created: '已创建',
};
