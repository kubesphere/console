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
  CD_PL: '持续部署',
  CD_LOW: '持续部署',
  CD_RESOURCE_PL: '持续部署资源',
  CD_DESC: '您可以在此页面创建并管理通过 gitops 持续部署的资源。',
  EMPTY_CD_TITLE: '未发现持续部署资源',
  CD_EMPTY_DESC: '请创建一个持续部署资源。',
  DEPLOY_LOCATION: '部署位置',
  SYNC_STRATEGY: '同步策略',
  SYNC_SETTINGS: '同步设置',
  CODE_REPOSITORY_SETTINGS: '代码仓库设置',
  AUTO_SYNC: '自动同步',
  MANUAL_SYNC: '手动同步',
  AUTO_SYNC_DESC: '按照自动设置的规则进行同步。',
  MANUAL_SYNC_DESC: '按照手动设置的规则进行同步。',
  REVISE: '修订',
  REVISE_DESC: '设置代码仓库的分支和标签。',
  RESOURCE_FILE_PATH: '资源文件路径',
  SET_THE_RESOURCE_FILE_PATH: '设置资源文件路径。',
  ABANDON_KUBECTL_APPLY: '放弃 kubectl apply',
  ABANDON_KUBECTL_APPLY_DESC:
    '资源将使用“kubectl replace/create”命令进行同步，操作可能会导致资源重新创建。',
  INFO: '信息',
  SYNC_RESULT: '同步结果',
  SYNC_RESULT_EMPTY_DESC: '同步结果查询结果为空',
  DEPLOYMENT_SETTINGS: '部署设置',
  LATEST_SYNC_STATUS: '最新同步状态',
  REPO_EMPTY_DESC: '代码仓库不能为空',
  CREATE_CD: '创建持续部署资源',
  CD_SELECT_CODE_REPO_DESC: '选择持续部署使用的代码仓库。',
}
