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
  'Submit for Review': '提交审核',
  'Cancel Review': '撤消审核',
  'Release to Store': '发布到商店',
  'View in Store': '在商店查看',
  'Suspend Version': '下架版本',
  'Activate Version': '上架版本',
  'Delete Version': '删除版本',
  'Suspend App': '下架应用',
  'Activate App': '上架应用',

  VERSION_DELETE_TIP: '确定要删除版本 <strong>{name}</strong> 吗? ',
  VERSION_SUBMIT_TIP: '确定要提交版本 <strong>{name}</strong> 去审核?',
  VERSION_CANCEL_TIP: '确定要撤消版本 <strong>{name}</strong>的审核吗 ?',
  VERSION_SUSPEND_TIP:
    '版本 <strong>{name}</strong> 下架后，关联的应用将不显示该版本，你确定要下架吗？',
  VERSION_RECOVER_TIP:
    '版本 <strong>{name}</strong> 上架后，关联的应用将显示出该版本，你确定要上架吗？',
  VERSION_RELEASE_TIP:
    '版本 <strong>{name}</strong> 发布到商店后，用户可以查看并部署该应用版本，你确定要发布吗？',
  APP_SUSPEND_TIP:
    '应用<strong>{name}</strong>下架后，用户无法从商店中购买到此应用，你确定要下架该应用吗？',
  APP_RECOVER_TIP:
    '应用<strong>{name}</strong>上架后，相关的下架版本都将变成上架，你确定要上架该应用吗？',

  'Version Management': '版本管理',
  'App Information': '应用信息',
  'Audit Records': '应用审核',
  'App Instances': '应用实例',
  'Deployed Instances': '部署实例',
  Versions: '版本',

  PACKAGE_FILE_DESC:
    'Package.json文件，用于描述应用或版本的基本信息，包括名称版本号等',
  CONFIG_FILE_DESC: '应用的默认值配置文件',
  LICENSE_FILE_DESC: '文本格式的协议',
  LOCALE_EN__FILE_DESC: '应用配置的国际化英文翻译',
  LOCALE_ZH_FILE_DESC: '应用配置的国际化中文翻译',
  CHART_FILE_DESC: 'Yaml文件，用于描述 Chart 的基本信息，包括名称版本等',
  README_FILE_DESC: '应用介绍、使用说明',
  REQUIREMENTS_FILE_DESC: '用于存放当前 Chart 依赖的其它 Chart 的说明文件',
  VALUES_FILE_DESC: 'Chart 的默认值配置文件',
  CHARTS_FILE_DESC: '该目录中放置当前 Chart 依赖的其它 Chart',
  TEMPLATES_FILE_DESC:
    '部署文件模板目录，模板填入 values.yaml 中相应值，生成最终的 Kubernetes 配置文件',
  NOTES_FILE_DESC: '使用指南',

  'Version Update Info': '版本更新说明',
  'No version information': '暂无更新说明',

  developer: '开发者',
  isv: '应用服务商',
  business: '商务审核者',
  technical: '技术审核者',
  global_admin: '超级管理员',
  admin: '管理员',

  'Download Successfully': '下载成功',

  Passed: '已通过',
  Rejected: '已拒绝',
  Draft: '待提交',
  Suspended: '已下架',
  Submitted: '等待审核',
  Submit: '提交',
  Review: '审核',
  Pass: '通过',
  Reject: '拒绝',
  Release: '发布',
  Developing: '开发中',
  Published: '已上架',
  Recalled: '已下架',
  Recall: '下架',
  Activated: '已激活',
  'In-review': '审核中',
  'in-review': '审核中',
  'Pending-review': '审核中',
  creating: '创建中',
  deleting: '删除中',

  'Test Steps': '测试步骤',
  VERSION_SUBMIT_TEST_STEPS:
    '1. 所有依赖的 Chart 已经分别提交<br/>' +
    '2. 可以成功通过静态检查 (helm lint) <br/>' +
    '3. 可以用默认值成功启动应用 (helm install)：所有 Pod 是 running 状态，所有服务 (service) 都至少有一个 endpoint<br/>' +
    '4. 使用的镜像没有安全漏洞 <br/>' +
    '5. 支持升级 <br/>' +
    '6. 支持自定义应用配置<br/>' +
    '7. 不要使用 Kubernetes 的 alpha 功能<br/>' +
    '8. 需要提供详细的 README 文件，包括对应用的介绍，前置条件和如何自定义配置参数<br/>',

  VERSION_SUBMIT_NOTE:
    '在正式提交审核之前，请确认你的应用已经通过了以下基本功能的测试',
  VERSION_SUBMIT_DOC: '更全面的测试手册请参看',
  'Develop and test guide': '《开发者测试指南》',
  UPDATE_LOG_DESC: '用于详细描述此次更新的具体内容',

  'Wrong version number format': '版本号的格式错误',
}
