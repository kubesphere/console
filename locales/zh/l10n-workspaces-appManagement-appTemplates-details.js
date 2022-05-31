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
  MODIFY_SUCCESSFUL: '修改成功。',
  SERVICE_PROVIDER_WEBSITE_DESC: '服务商的官方网站地址。',
  WRONG_ADDRESS_TIP: '地址格式错误，请输入正确的地址。',
  APP_NAME_DESC: '应用的名称，最长 20 个字符。',
  APP_DESCRIPTION_DESC: '应用的描述，最长 120 个字符。',
  APP_ICON_FORMAT: '格式：PNG 或 JPG',
  APP_ICON_SIZE: '大小：96x96 像素',
  CHOOSE_APP_CATEGORY_DESC: '为应用选择一个分类。',
  EDIT_APP_DESC: '编辑应用模板的基本信息。',
  ICON: '图标',
  SERVICE_PROVIDER_WEBSITE_TCAP: '服务商网站',
  START_EDITING: '开始编辑…',
  SCREENSHOTS_COLON: '截图数量：',
  DELETE_ALL: '全部删除',
  // More > Install
  // More > Upload Version
  ADD_VERSION_SUCCESSFUL: '版本添加成功。',
  UPLOAD_PACKAGE_OK_NOTE: '该版本已存在，请上传其他版本。',
  UPLOAD_NEW_VERSION: 'Upload Version',
  UPLOAD_NEW_VERSION_DESC: '上传应用模板的新版本。',
  // More > Delete
  DELETE_APP_TEMPLATE_DESC: '请输入应用模板名称 <b>{resource}</b> 以确认您了解此操作的风险。',
  DELETE_APP_TEMPLATE_VERSIONS_DESC: '请输入应用模板名称 <b>{resource}</b> 以确认您了解此操作的风险。删除应用模板前，您必须先删除该应用模板的所有版本。',
  APP_TEMPLATE_LOW: '应用模板',
  // Details
  // Versions
  APP_STATUS_SUBMITTED: '已提交',
  APP_STATUS_NOT_SUBMITTED: '未提交',
  VERSION_INFO: '版本信息',
  INSTALL: '安装',
  SUBMIT_FOR_REVIEW: '提交审核',
  DOWNLOAD_SUCCESSFUL: '下载成功。',
  VERSION_DELETE_TIP: '您确定要删除版本 <strong>{name}</strong> 吗？',
  VERSION_SUBMIT_TIP: '您确定要提交版本 <strong>{name}</strong> 进行发布？',
  VERSION_CANCEL_TIP: '您确定要撤消版本 <strong>{name}</strong> 的提交吗？',
  VERSION_RELEASE_TIP: '版本 <strong>{name}</strong> 发布到商店后，用户可以查看并部署该应用版本，您确定要发布吗？',
  VERSION_SUSPEND_TIP: '版本 <strong>{name}</strong> 下架后，关联的应用将不显示该版本，您确定要下架吗？',
  VERSION_RECOVER_TIP: '版本 <strong>{name}</strong> 恢复上架后，关联的应用将显示出该版本，您确定要恢复上架吗？',
  UPDATE_TIME_SCAP: '更新时间',
  VIEW_IN_STORE: '在商店中查看',
  // Versions > Upload
  UPLOAD_AGAIN_TIP: '出现错误，请重试。',
  // Versions > Submit for Review
  ENTER_VERSION_NUMBER_TIP: '请输入版本号。',
  SUBMIT_REVIEW_DESC: '将应用模板提交审核以发布到应用商店。',
  APP_LEARN_MORE: '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">了解更多</a>',
  INVALID_VERSION_TIP: '请输入正确的版本号。',
  // Versions > Submit for Review > Test Steps
  VERSION_SUBMIT_TEST_STEPS: '1. 所有依赖的 chart 已经分别提交。<br/>' + '2. 可以成功通过静态检查（helm lint）。<br/>' + '3. 可以用默认值成功启动应用（helm install）。所有容器组处于运行中状态，所有服务（Service）都至少有一个端点。<br/>' + '4. 使用的镜像没有安全漏洞。<br/>' + '5. 支持升级。<br/>' + '6. 支持自定义应用配置。<br/>' + '7. 不要使用 Kubernetes 的 alpha 功能。<br/>' + '8. 需要提供详细的说明文档，包括应用介绍、准备工作和自定义参数配置。<br/>',
  VERSION_SUBMIT_NOTE: '提交之前，请确认您的应用满足以下要求：',
  // Versions > Submit for Review > Update Log
  UPDATE_LOG_DESC: '填写关于应用更新的详细信息。',
  SUBMIT_SUCCESSFUL: '提交成功。',
  CANCEL_SUCCESSFUL: '取消成功。',
  // App Information
  // App Release
  // App Instances
  APP_INSTANCES: '应用实例'
};