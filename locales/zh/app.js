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
  DEVELOP_APP_TITLE: '开发应用模板',
  DEVELOP_APP_DESC:
    '您可以上传 Helm Chart 或者使用 KubeSphere 提供的资源编排工具进行应用模板的开发',
  HOW_PUBLISH_APP_TITLE: '如何发布已有应用',
  HOW_PUBLISH_APP_DESC:
    'KubeSphere 目前支持将已有应用的 Helm Chart 上传至企业空间的应用模板，提交审核后，可以将应用发布在应用商店中。',
  HOW_APP_DEPLOY_TITLE: '如何部署和测试应用',
  'Upload Template': '上传模板',
  APPS_CREATE_DESC:
    'KubeSphere 提供全生命周期的应用管理，可以上传或者创建新的应用模板，并且快速部署它们，也可以通过应用商店进行发布应用。',

  'Apps Management': '应用管理',
  'App Store Management': '应用商店管理',

  Apps: '应用',
  'App Info': '应用信息',
  'Base Info': '基本信息',
  'App Details': '应用详情',
  'App Config': '应用配置',
  'Current App Config': '当前应用配置',
  'New App Config': '新的应用配置',
  Introduction: '使用说明',
  'Terms of service': '服务条款',
  'Config File': '配置文件',
  'Chart Files': '配置文件',
  'Update Log': '更新日志',
  'No update log': '暂无更新日志',
  Note: '提示',
  APP_NAME_DESC: '应用的重要标识',
  'Select file': '选择文件',
  'Application Name': '应用名称',
  'Application Version': '应用版本',
  'App Description': '应用简介',
  APP_ABSTRACTION_DESC: '对应用的概括性介绍',
  APP_DETAIL_DESC: '在用户搜索应用时会非常有帮助',
  'Upload Icon': '上传图标',
  APP_ICON_NOTE: '96px*96px 以内 JPG 或者 PNG',
  APP_ICON_FORMAT: '格式: PNG 背景透明最佳',
  APP_ICON_SIZE: '图形大小: 96px*96px',
  'Start editing': '开始编辑',
  File: '文件',
  'Platform App Store Management': '平台级应用商店管理',

  'App Store': '应用商店',
  APP_STORE_DESC: '对已上架、已下架的应用进行管理',
  'Latest Version': '最新版本',
  'App Category': '应用分类',
  'Release / Suspended Time': '上架(下架)时间',

  'App Review': '应用审核',
  'App Reviews': '应用审核',
  APP_REVIEW_DESC: '对应用上架提供审核功能',
  APP_REVIEWS_CREATE_DESC: '对应用上架提供审核功能',
  Unprocessed: '待处理',
  Processed: '已处理',
  'Review Object': '审核对象',
  'Request for Approval': '应用上架',
  Operator: '操作者',
  'Rejection Reason': '拒绝原因',
  'Review Status': '审核状态',
  'Updated Time': '更新时间',
  Submitter: '提交者',
  Handle: '处理',
  'Review Content': '审核内容',
  REVIEW_CONTENT_DESC:
    '以下信息必须真实准确，关键的操作说明需要描述详情，对于条款中的权利与义务需要描述清晰。',
  SUBMIT_REVIEW_DESC: '提交应用至应用商店，审核通过后将出现在应用商店中',
  REVIEWS_CREATE_DESC: '暂时没有相关的应用审核数据',

  'App Version': '应用版本',
  'Current App Version': '当前应用版本',
  'Service Provider': '服务提供商',
  'App Introduction': '应用介绍',
  'Reject Reason': '拒绝原因',
  REJECT_REASON_DESC: '请填写拒绝审核的原因',
  'Please input reject reason': '请填写拒绝原因',
  APP_CATEGORIES_DESC: '对已上架的应用分类管理',
  AUDIT_RECORD_CREATE_DESC: '暂无相关的审核记录数据',

  'App Categories': '应用分类',
  APP_CATEGORIES_CREATE_DESC: '该分类暂无绑定的应用数据',
  'All Categories': '全部分类',
  'Adjust App Category': '调整应用分类',
  ADJUST_CATEGORY_DESC: '应用分类将决定该应用在应用商店中的分类',
  'Change Category': '调整分类',
  DELETE_CATEGORY_WARNING:
    '该分类绑定了<strong>{total}</strong>个应用，请先将这些应用调整到其它分类后才能删除',
  DELETE_CATEGORY_DESC: '你确定要删除分类【{name}】吗?',
  'Adjust Successfully': '调整成功',

  APP_TEMPLATES_DESC:
    'KubeSphere 提供全生命周期的应用管理，可以上传或者创建新的应用模板，并且快速部署它们，也可以通过应用商店进行发布应用。',
  UPLOAD_HELM_TITLE: '上传 Helm 配置文件',
  UPLOAD_HELM_DESC: '上传已有的 Helm  Chart ',
  EDIT_APP_DESC: '对应用的基本信息进行设置',
  'App Number': '应用编号',
  'App Version Types': '交付类型',
  'Create Time': '创建时间',
  'Add Version': '添加版本',
  'New Version': '添加版本',
  'App Deploy': '应用部署',
  'Test Deployment': '测试部署',
  'Modify Successfully': '修改成功',
  'Add Version Successfully': '添加版本成功',
  'Submit Successfully': '提交成功',
  'Cancel Successfully': '撤消成功',
  'Release Successfully': '发布成功',
  'Delete Successfully': '删除成功',
  'Pass Successfully': '通过成功',
  'Reject Successfully': '拒绝成功',
  'Suspend Successfully': '下架成功',
  'Recover Successfully': '上架成功',
  'Activate Successfully': '上架成功',
  'In Project': '所属项目',

  'Create App Template': '创建应用模板',
  CREATE_APP_DESC:
    '轻量级、可移植、自包含的软件打包技术，使应用可以在几乎任何地方以相同的方式运行。',
  RESOURCE_TOOL_TITLE: '通过资源编排工具创建',
  RESOURCE_TOOL_DESCRIPTION:
    'KubeSphere 提供了可视化的资源编排工具，您可以通过资源预编辑来创建应用模板，部署测试',
  UPLOAD_HELM_DESCRIPTION: '上传已有的 Helm Chart. 文件格式支持 tar.gz 和 tgz',
  START_UPLOAD: '开始上传',
  'Start Create': '开始创建',
  APP_CREATE_GUIDE: '完整的应用开发规范请参看',
  HELM_DEVELOP_GUIDE: 'Helm 规范及应用开发',

  UPLOAD_SUPPORT_FORMAT: '文件格式支持 tar.gz 和 tgz',
  Uploading: '正在上传',
  'Upload successfully': '上传成功',
  'please upload again': '请重新上传',
  FILE_FORMAT_PACKAGE: '文件格式支持 tar.gz 和 tgz',
  FILE_FORMAT_ICON: '图标格式支持 png 和 jpg',
  FILE_FORMAT_SCREENSHOTS: '截图格式支持 png 和 jpg',
  FILE_MAX_PACKAGE: '配置包大小不能超过 2M',
  FILE_MAX_ICON: '图标大小不能超过 20KB',
  FILE_MAX_SIZE_ICON: '图标尺寸大小不能超过 96px',
  FILE_MAX_SCREENSHOTS: '截图大小不能超过 2M',
  UPLOAD_PACKAGE_OK_NOTE: '请上传配置包或上传的配置包不正确',
  'Delete picture': '删除图片',
  'Re-upload': '重新上传',
  'Package problems': '文件有问题',
  'Upload again': '重新上传',
  'App Name': '应用名称',
  'App Home': '应用主页',
  'Select File': '选择文件',
  'App Screenshots': '应用截图',
  'Upload Screenshots': '上传截图',

  'Edit App Information': '编辑应用信息',
  Uncategorized: '未分类',
  'Category Name': '分类名称',
  CATEGORY_NAME_DESC: '建议不超过8个字符，最多能输入20个字符',
  'Please input category name': '请输入分类名称',
  'Please input version number': '请输入版本号',
  ICON_DESC: '请选择一个图标来标识分类',
  'Please select icon': '请选择图标',
  'Wrong website format': '输入的网站格式错误',

  Screenshot: '截图',
  'Version No': '版本号',
  'Deploy now': '立即部署',
  'Deploy after login': '登录后部署',
  'Evaluation stars': '综合评价',
  'Business introduction': '业务介绍',
  'Company website': '公司官网',
  'Time of entry': '入驻时间',
  Discoveries: '发现',
  'New Apps': '最新上架',
  screenshots: '张截图',
  'Delete all': '删除全部',
  'A general introduction to the application': '对应用的概括性介绍',
  'Detail Introduction': '详细介绍',
  'Very helpful when users search for apps': '在用户搜索应用时会非常有帮助',
  Icon: '图标',
  'Format png/svg background transparency is the best':
    '格式: png/svg 背景透明最佳',
  CHOOSE_APP_CATEGORY_DESC: '选择适合的应用分类，便于用户更快发现你的应用',
  'Service Provider Website': '服务商网站',
  "Service provider's official website address": '服务商的官方网站地址',
  MODIFY_VERSION_TIPS: '每次修改的内容都将跟随下一次版本上架而真正生效。',
  UNDER_REVIEW_TIPS: '当前应用有版本正在审核中，以下信息暂时不可更改',

  'Instance Name': '实例名称',
  'Index Successfully': '同步成功',

  NO_DEPLOY_RUNTIME_NOTE: '项目中没有可用的部署运行环境',

  'Upload icon': '上传图标',

  APP_CATE_All: '全部',

  APP_CATE_UNCATEGORIZED: '未分类',

  MISS_FILE_NOTE: '文件{file}没有找到',

  'Please select a project to deploy': '请选择项目部署',
  'Please select a workspace': '请选择企业空间',
  'Please select a cluster': '请选择集群',
  'Please select a project': '请选择项目',
  'Please select a project role': '请选择项目角色',
  'Please select a DevOps project': '请选择 DevOps 工程',
  'Please select a DevOps project role': '请选择工程角色',

  HELM_APP_SCHEMA_FORM_TIP:
    '此应用支持表单模式，可选择通过表单或 YAML 编辑器来修改默认应用配置。注意：不同模式之间数据独立。',

  DELETE_APP_TEMPLATE_TIP: '删除应用模板前，需要先删除所有版本。',

  UNPROCESSED_APP_REVIEW: '未处理的应用审核',
  PROCESSED_APP_REVIEW: '已处理的应用审核',
  ALL_APP_REVIEW: '应用审核',

  'APP_CATE_MESSAGE QUEUEING': '消息队列',
  'APP_CATE_IMAGE REGISTRY': '镜像仓库',
  'APP_CATE_PROMETHEUS EXPORTER': '数据导出器',
  'APP_CATE_WEB SERVER': 'Web 服务器',
  APP_CATE_NETWORKING: '网络',
  'APP_CATE_DATABASE & CACHE': '数据库和缓存',
  APP_CATE_STORAGE: '存储',
}
