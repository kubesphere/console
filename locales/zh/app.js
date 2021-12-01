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
    'KubeSphere 提供全生命周期的应用管理，可以上传或者创建新的应用模板，并且快速部署它们，也可以通过应用商店进行发布应用。',
  APP_TEMPLATE_CREATE_DESC:
    'KubeSphere 提供全生命周期的应用管理，可以上传或者创建新的应用模板，并且快速部署它们，也可以通过应用商店进行发布应用。',
  DEVELOP_APP_TITLE: '如何开发应用模板？',
  DEVELOP_APP_DESC:
    '您可以上传 Helm chart 或者使用 KubeSphere 提供的资源编排工具进行应用模板的开发。',
  HOW_PUBLISH_APP_TITLE: '如何发布应用到应用商店？',
  HOW_PUBLISH_APP_DESC:
    '您可以将 Helm chart 上传为企业空间的应用模板，审核通过后，应用将会发布在应用商店中。',
  HOW_APP_DEPLOY_TITLE: '如何部署和测试应用',
  UPLOAD_TEMPLATE: '上传模板',
  APPS_CREATE_DESC:
    'KubeSphere 提供全生命周期的应用管理，可以上传或者创建新的应用模板，并且快速部署它们，也可以通过应用商店进行发布应用。',

  APPS_MANAGEMENT: '应用管理',
  'Apps Management': '应用管理',
  APP_STORE_MANAGEMENT: '应用商店管理',
  PROVIDER: '提供商',

  Apps: '应用',
  APP_INFORMATION: '应用信息',
  'Base Info': '基本信息',
  APP_DETAILS: '应用详情',
  'App Config': '应用配置',
  'App Details': '应用详情',
  APP_SETTINGS: '应用设置',
  CURRENT_APP_SETTINGS_READONLY: '当前应用设置（只读）',
  TARGET_APP_SETTINGS: '目标应用设置',
  'New App Config': '新的应用配置',
  Introduction: '使用说明',
  'Terms of service': '服务条款',
  CONFIG_FILE: '配置文件',
  CHART_FILES: 'Chart 文件',
  'Update Log': '更新日志',
  NO_UPDATE_LOG_DESC: '未发现更新日志。',
  Note: '提示',
  APP_NAME_DESC: '应用的名称，最长 20 个字符。',
  'Select file': '选择文件',
  'Application Name': '应用名称',
  'Application Version': '应用版本',
  APP_DESCRIPTION_DESC: '应用的描述，最长 120 个字符。',
  APP_DETAIL_DESC: '在用户搜索应用时会非常有帮助',
  'Upload Icon': '上传图标',
  APP_ICON_NOTE: '上传 96x96 像素以内的 JPG 或 PNG 图像。',
  APP_ICON_FORMAT: '格式：PNG 或 JPG',
  APP_ICON_SIZE: '大小：96x96 像素',
  'Start editing': '开始编辑',
  File: '文件',

  APP_STORE_DESC:
    '管理应用商店中的应用。您可以查看应用的信息并上架或下架应用。',
  APP_CATEGORY: '应用分类',
  'Release / Suspended Time': '上架(下架)时间',

  APP_REVIEW: '应用审核',
  APP_REVIEWS: '应用审核',
  APP_RELEASE_DESC:
    '管理待发布到应用商店中的应用。您可以查看应用详情并批准或拒绝应用发布。',
  APP_REVIEW_EMPTY_DESC: '请在企业空间中创建应用模板并提交发布。',
  APP_REVIEWS_CREATE_DESC: '对应用上架提供审核功能',
  UNREVIEWED: '待审核',
  REVIEWED: '已审核',
  'Review Object': '审核对象',
  APP_RELEASE: '应用发布',
  Operator: '操作者',
  REJECTION_REASON: '拒绝原因',
  'Review Status': '审核状态',
  Submitter: '提交者',
  Handle: '处理',
  REVIEW_CONTENT: '审核内容',
  APP_DETAILS_DESC: '查看待发布的应用的详情。',
  SUBMIT_REVIEW_DESC: '提交应用进行发布。',
  REVIEWS_CREATE_DESC: '未发现相关的应用审核数据',

  'App Version': '应用版本',
  CURRENT_APP_VERSION: '当前应用版本',
  TARGET_APP_VERSION: '目标应用版本',
  'Service Provider': '服务提供商',
  'App Introduction': '应用介绍',
  'Reject Reason': '拒绝原因',
  REJECT_REASON_DESC: '填写拒绝应用审核的原因。',
  REJECT_REASON_TIP: '请填写至少一条拒绝原因。',
  APP_CATEGORIES_DESC:
    '对应用商店中已上架的应用进行分类管理。您可以创建、编辑、删除和调整应用分类。',
  AUDIT_RECORD_CREATE_DESC: '未发现相关的审核记录数据',

  APP_CATEGORY_PL: '应用分类',
  APP_CATEGORY_EMPTY_DESC: '没有属于当前分类的应用。',
  ALL_CATEGORIES_VALUE: '全部分类（{value}）',
  'Adjust App Category': '调整应用分类',
  CHANGE_CATEGORY_DESC: '应用分类将决定该应用在应用商店中的分类。',
  CHANGE_CATEGORY: '调整分类',
  DELETE_CATEGORY_WARNING:
    '该分类绑定了<strong>{total}</strong>个应用，请先将这些应用调整到其它分类后才能删除',
  DELETE_CATEGORY_DESC: '您确定要删除分类 <b>{name}</b> 吗?',
  CHANGED_SUCCESSFULLY: '调整成功。',

  APP_TEMPLATES_DESC:
    'KubeSphere 提供全生命周期的应用管理，可以上传或者创建新的应用模板，并且快速部署它们，也可以通过应用商店进行发布应用。',
  UPLOAD_HELM_TITLE: '上传 Helm Chart',
  UPLOAD_HELM_CHART_DESC: '上传已有的 Helm chart。',
  EDIT_APP_DESC: '编辑应用模板的基本信息。',
  'App Version Types': '交付类型',
  'Create Time': '创建时间',
  'Created At': '创建时间',
  'Add Version': '添加版本',
  'New Version': '添加版本',
  'App Deploy': '应用部署',
  'Test Deployment': '测试部署',
  MODIFY_SUCCESSFUL: '修改成功。',
  ADD_VERSION_SUCCESSFUL: '版本添加成功。',
  'Submit Successfully': '提交成功。',
  'Cancel Successfully': '撤消成功',
  'Release Successfully': '发布成功',
  REJECT_SUCCESSFUL: '拒绝成功。',
  'Suspend Successfully': '下架成功',
  'Recover Successfully': '上架成功',
  'Activate Successfully': '上架成功',
  'In Project': '所属项目',

  CREATE_APP_TEMPLATE: '创建应用模板',
  CREATE_APP_TEMPLATE_DESC:
    '轻量级、可移植、自包含的软件打包技术，使应用可以在几乎任何地方以相同的方式运行。',
  RESOURCE_TOOL_TITLE: '通过资源编排工具创建',
  RESOURCE_TOOL_DESCRIPTION:
    'KubeSphere 提供了可视化的资源编排工具，您可以通过资源预编辑来创建应用模板，部署测试',
  HELM_CHART_FORMAT_DESC: '支持 tar.gz 和 tgz 格式。',
  UPLOAD: '上传',
  'Start Create': '开始创建',
  APP_CREATE_GUIDE:
    '请参阅开发指南 <a href="{docUrl}/application-store/app-developer-guide/helm-specification/" target="_blank" rel="noreferrer noopener">Helm 规范</a>。',
  HELM_DEVELOP_GUIDE: 'Helm 规范及应用开发',

  UPLOAD_SUPPORT_FORMAT: '文件格式支持 tar.gz 和 tgz',
  UPLOADING: '正在上传',
  UPLOAD_SUCCESS: '上传成功。',
  UPLOAD_AGAIN_TIP: '出现错误，请重试。',
  FILE_FORMAT_PACKAGE: '文件格式支持 tar.gz 和 tgz',
  FILE_FORMAT_ICON: '图标格式支持 png 和 jpg',
  FILE_FORMAT_SCREENSHOTS: '截图格式支持 png 和 jpg',
  FILE_MAX_PACKAGE: '配置包大小不能超过 2M',
  FILE_MAX_ICON: '图标大小不能超过 20KB',
  FILE_MAX_SIZE_ICON: '图标的最大尺寸为 96x96 像素。',
  FILE_MAX_SCREENSHOTS: '截图大小不能超过 2 MB。',
  UPLOAD_PACKAGE_OK_NOTE: '该版本已存在，请上传其他版本。',
  'Delete picture': '删除图片',
  'Re-upload': '重新上传',
  'Package problems': '文件有问题',
  'Upload again': '重新上传',
  'App Name': '应用名称',
  'Select File': '选择文件',
  APP_SCREENSHOTS: '应用截图',
  'Upload Screenshots': '上传截图',

  'Edit App Information': '编辑应用信息',
  Uncategorized: '未分类',
  'Category Name': '分类名称',
  CATEGORY_NAME_DESC: '名称可包含任意字符，最长 20 个字符。',
  ENTER_CATEGORY_NAME_TIP: '请输入分类名称。',
  ENTER_VERSION_NUMBER_TIP: '请输入版本号。',
  ICON_DESC: '请选择一个图标来标识分类',
  'Please select icon': '请选择图标',
  WRONG_ADDRESS_TIP: '地址格式错误，请输入正确的地址。',

  Screenshot: '截图',
  'Version No': '版本号',
  'Deploy now': '立即部署',
  'Deploy after login': '登录后部署',
  'Evaluation stars': '综合评价',
  'Business introduction': '业务介绍',
  'Company website': '公司官网',
  'Time of entry': '入驻时间',
  Discoveries: '发现',
  NEW_APPS: '新应用',
  screenshots: '张截图',
  'Delete all': '删除全部',
  'A general introduction to the application': '对应用的概括性介绍',
  'Detail Introduction': '详细介绍',
  'Very helpful when users search for apps': '在用户搜索应用时会非常有帮助',
  Icon: '图标',
  'Format png/svg background transparency is the best':
    '格式: png/svg 背景透明最佳',
  CHOOSE_APP_CATEGORY_DESC: '为应用选择一个分类。',
  'Service Provider Website': '服务商网站',
  SERVICE_PROVIDER_WEBSITE_DESC: '服务商的官方网站地址。',
  MODIFY_VERSION_TIPS: '每次修改的内容都将跟随下一次版本上架而真正生效。',
  UNDER_REVIEW_TIPS: '当前应用有版本正在审核中，以下信息暂时不可更改',

  'Instance Name': '实例名称',
  INDEX_SUCCESS_TIP: '同步成功。',

  NO_DEPLOY_RUNTIME_NOTE: '项目中没有可用的部署运行环境',

  UPLOAD_ICON: '上传图标',

  APP_CATE_All: '全部',

  APP_CATE_UNCATEGORIZED: '未分类',

  MISS_FILE_NOTE: '未找到文件 {file}。',

  'Please select a project to deploy': '请选择项目部署',
  WORKSPACE_EMPTY_DESC: '请选择企业空间',
  'Please select a cluster': '请选择集群',
  'Please select a project': '请选择项目',
  'Please select a project role': '请选择项目角色',
  'Please select a DevOps project': '请选择 DevOps 项目',
  'Please select a DevOps project role': '请选择项目角色',

  HELM_APP_SCHEMA_FORM_TIP:
    '您可以通过图形化表单或 YAML 文件对应用进行设置。图形化表单和 YAML 文件中的设置相互独立。',
  DELETE_APP_TEMPLATE_DESC:
    '请输入应用模板名称 <b>{resource}</b> 以确认您了解此操作的风险。',
  DELETE_APP_TEMPLATE_VERSIONS_DESC:
    '请输入应用模板名称 <b>{resource}</b> 以确认您了解此操作的风险。删除应用模板前，您必须先删除该应用模板的所有版本。',

  UNPROCESSED_APP_RELEASE: '待发布应用',
  PROCESSED_APP_RELEASE: '已发布应用',
  ALL_APP_RELEASE: '发布记录',

  'APP_CATE_MESSAGE QUEUEING': '消息队列',
  'APP_CATE_IMAGE REGISTRY': '镜像仓库',
  'APP_CATE_PROMETHEUS EXPORTER': '数据导出器',
  'APP_CATE_WEB SERVER': 'Web 服务器',
  APP_CATE_NETWORKING: '网络',
  'APP_CATE_DATABASE & CACHE': '数据库和缓存',
  APP_CATE_STORAGE: '存储',

  // App Review
  REVIEW: '审核',
  OPERATOR: '操作者',
  PENDING_REVIEW: '待处理',
  COMPLETE_REVIEW: '已处理',
  REJECT: '拒绝',
  RELEASE: '发布',
  INTRODUCTION: '介绍',
  UPDATE_LOG: '更新日志',
  SERVICE_PROVIDER_WEBSITE: '服务商网站',
  SERVICE_PROVIDER: '服务提供商',
  APP_DESCRIPTION: '应用描述',
  DOCUMENTATION: '说明文档',
  BACK: '返回',
  NOTIFICATION_EMAIL: '邮件',
  NO_DOCUMENT_FOUND: '未发现说明文档',

  // App Store
  DISCOVER: '发现',
  CATEGORIES: '分类',
  CATEGORY_COLON: '分类：',
  HOMEPAGE_COLON: '首页：',
  RELEASE_DATE_COLON: '发布时间：',
  APP_ID_COLON: '应用 ID：',
  APP_VERSIONS_TITLE: '版本（只显示 10 个最新的版本）',
  VERSIONS: '版本',
  UPDATE_TIME_COLON: '更新时间：',
  DEVELOPER: '开发者',

  // App Categories
  ICON: '图标',
  CREATE_CATEGORY: '创建分类',
  APP_NOTE: '提示',

  // App Templates > Details
  SERVICE_PROVIDER_WEBSITE_TCAP: '服务商网站',

  // App Templates
  FILE: '文件',
  INCORRECT_FILE: '文件有误？',
  TRY_AGAIN: '重试',
  FILE_MAX_ICON_DESC: '图标尺寸不能超过 20 KB，请重试。',
  START_EDITING: '开始编辑…',
  SCREENSHOTS_COLON: '截图数量：',
  DELETE_ALL: '全部删除',
  APP_LEARN_MORE:
    '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">了解更多</a>',
  ACTIVATE_SUCCESSFUL: '上架成功。',
  CANCEL_SUCCESSFUL: '取消成功。',
  RECOVER_SUCCESSFUL: '恢复上架成功。',
  RELEASE_SUCCESSFUL: '发布成功。',
  SUBMIT_SUCCESSFUL: '提交成功。',
  SUSPEND_SUCCESSFUL: '下架成功。',
  DEPLOYED_SUCCESSFUL: '部署成功。',
  VIEW_IN_STORE: '在商店中查看',
  RELEASE_TO_STORE: '发布到商店',
  AUDIT_EMPTY_DESC: '未发现应用审核记录。',
  APP_STATUS_SUBMITTED: '已提交',
  APP_STATUS_PASSED: '已发布',
  APP_STATUS_SUSPENDED: '已下架',
  APP_STATUS_REJECTED: '已拒绝',
  APP_STATUS_ACTIVE: '已上架',
  APP_STATUS_PUBLISHED: '已发布',
  APP_STATUS_RECALLED: '已下架',
  APP_STATUS_RECALL: '下架',
  APP_STATUS_DRAFT: '待提交',
  APP_STATUS_PENDING_REVIEW: '待发布',
  APP_STATUS_IN_REVIEW: '审核中',
  APP_STATUS_DEVELOPING: '开发中',
  APPS: '应用',
  UNRELEASED: '待发布',
  RELEASED: '已发布',
  RELEASE_RECORD: '发布记录',
  RELEASE_RECORD_EMPTY_DESC: '未发现发布记录。',
}
