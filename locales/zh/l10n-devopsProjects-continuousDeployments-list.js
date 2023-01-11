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
  // Banner
  CONTINUOUS_DEPLOYMENT_PL: '持续部署',
  CONTINUOUS_DEPLOYMENT_DESC: '管理持续部署，以通过 GitOps 持续部署资源。 ',
  // List
  CONTINUOUS_DEPLOYMENT_EMPTY_DESC: '请创建一个部署。',
  DEGRADED: '已降级',
  PROGRESSING: '进行中',
  SYNCED: '已同步',
  MISSING: '缺失',
  SUSPENDED: '已下架',
  OUTOFSYNC: '未同步',
  DEPLOY_LOCATION: '部署位置',
  // List > Create
  CREATE_CONTINUOUS_DEPLOYMENT: '创建持续部署',
  CD_SELECT_CODE_REPO_DESC: '选择持续部署使用的代码仓库。',
  DEPLOYMENT_SETTINGS: '部署设置',
  CODE_REPOSITORY_SETTINGS: '代码仓库设置',
  SYNC_STRATEGY_TCAP: '同步策略',
  AUTO_SYNC_DESC: '根据自动设置的规则同步。',
  MANUAL_SYNC_DESC: '根据自定义规则同步。',
  PRUNE_RESOURCES: '清理资源',
  SELF_HEAL: '自恢复',
  MANIFEST_FILE_PATH: '清单文件路径',
  MANIFEST_FILE_PATH_DESC: '设置清单文件路径。 ',
  DIRECTORY_RECURSE: 'Directory recurse',
  REPO_EMPTY_DESC: '请选择一个代码仓库。',
  // List > Delete
  CONTINUOUS_DEPLOYMENT: '持续部署',
  CONTINUOUS_DEPLOYMENT_LOW: '持续部署',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_SI: '您即将删除持续部署 {resource}。 <br/>请确认是否删除由持续部署创建的资源。',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_PL: '您即将删除持续部署 {resource}。 <br/>请确认是否删除由持续部署创建的资源。',
  NO_CONTINUOUS_DEPLOYMENT_RELATED_RESOURCE_DESC: '没有找到由持续部署创建的资源。',
  DELETE_MULTIPLE_CONTINUOUS_DEPLOYMENT: '批量删除持续部署',
  DELETE_CONTINUOUS_DEPLOYMENT: '删除持续部署',
  DELETE_CONTINUOUS_DEPLOYMENT_RELATE_DESC: '删除 {resourceName} 创建的资源',
  // List > Sync
  SYNC: '同步',
  SYNC_RESOURCE: '同步资源',
  REVISION: '修订版本',
  REVISION_DESC: '设置代码仓库的分支或标签。',
  PRUNE: '清理',
  DRY_RUN: '试运行',
  APPLY_ONLY: '仅应用',
  FORCE: '强制应用',
  SYNC_SETTINGS: '同步设置',
  SKIP_SCHEMA_VALIDATION: '跳过规范校验',
  AUTO_CREATE_PROJECT: '自动创建项目',
  PRUNE_LAST: '最后清理',
  APPLY_OUT_OF_SYNC_ONLY: '仅应用未同步',
  PRUNE_PROPAGATION_POLICY: '依赖清理策略',
  REPLACE_RESOURCE: '替换资源',
  REPLACE_RESOURCE_DESC: '替换已存在的资源。',
  EMPTY_CD_TITLE: '未发现持续部署',
  SYNC_TRIGGERED: '资源同步触发成功。',
  // List > Parameter
  PARAMETER_SETTINGS: 'Parameter Settings',
  AUTO_PARAMETER: 'Auto',
  AUTO_PARAMETER_DESC: 'Set automatically.',
  HELM_PARAMETER: 'Helm',
  HELM_PARAMETER_DESC: 'Set Helm parameter.',
  KUSTOMIZE_PARAMETER: 'Kustomize',
  KUSTOMIZE_PARAMETER_DESC: 'Set Kustomize parameters.',
  PASS_CREDENTIALS: 'Pass Credentials',
  IGNORE_MISSING_VALUE_FILES: 'Ignore Missing Value Files',
  SKIP_CRDS: 'Skip Crds',
  RELEASE_NAME: 'Release Name',
  VALUE_FILES: 'Value Files',
  FORCE_STRING: 'Force String',
  FILE_PARAMETERS: 'File Parameters',
  NAME_PREFIX: 'Name Prefix',
  NAME_SUFFIX: 'Name Suffix',
  IMAGES: 'Images',
  COMMON_LABELS: 'Common Labels',
  COMMON_ANNOTATIONS: 'Common Annotations'
};