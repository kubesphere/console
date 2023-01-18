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
  SUSPENDED: '已暂停',
  OUTOFSYNC: '未同步',
  DEPLOY_LOCATION: '部署位置',
  // List > Create
  CREATE_CONTINUOUS_DEPLOYMENT: '创建持续部署',
  CD_SELECT_CODE_REPO_DESC: '选择持续部署使用的代码仓库。',
  DEPLOYMENT_SETTINGS: '部署设置',
  CODE_REPOSITORY_SETTINGS: '代码仓库设置',
  SYNC_STRATEGY_TCAP: '同步策略',
  AUTO_SYNC_DESC: '根据自动设置的规则同步。',
  // MANUAL_SYNC_DESC: 'Sync according to custom rules.',
  PRUNE_RESOURCES: '清理资源',
  SELF_HEAL: '自恢复',
  MANIFEST_FILE_PATH: '清单文件路径',
  // MANIFEST_FILE_PATH_DESC: 'Set the manifest file path. ',
  DIRECTORY_RECURSE: 'Directory recurse',
  REPO_EMPTY_DESC: '请选择一个代码仓库。',
  VALUES_FILES: 'Values Files',
  VALUES_FROM: 'Values From',
  STORAGE_NAMESPACE: 'Storage Namespace',
  TEST: '测试',
  REVISIONS_DESC: 'Git 仓库中的 commit ID、分支或标签，如，"master", "v1.2.0", "0a1b2c3" 或 "HEAD"。',
  MANIFEST_FILE_PATH_DESC: '设置清单文件路径，如 "deployments/nginx" 或 "deployments/"。',
  MANUAL_SYNC_DESC: '根据自定义规则同步。',
  AUTO_SYNC_DESC: '在检测到 Git 仓库中的清单与部署资源的实时状态之间存在差异时，根据设置的同步选项，自动触发应用程序同步。',
  PRUNE_RESOURCES_DESC: '如果勾选，自动同步时会删除 Git 仓库中不存在的资源。不勾选时，自动同步触发时不会删除集群中的资源。',
  SELF_HEAL_DESC: 'If selected, when there is a deviation between the defined state in Git and the deployed resources, the defined state in Git will be enforced. If not selected, automatic sync will not be triggered when changes are made to the deployed resources.',
  FOREGROUND_DESC: 'Delete dependent resources first, then delete the main resource.',
  BACKGROUND_DESC: 'Delete the main resource first, then delete the dependent resource.',
  ORPHAN_DESC: 'Delete the main resource and leave the dependent resource as an orphan.',
  SKIP_SCHEMA_VALIDATION_DESC: 'Skip kubectl validation. Add the --validate=false flag when kubectl applies the object.',
  AUTO_CREATE_PROJECT_DESC: 'Automatically create a project for application resources when the project does not exist.',
  PRUNE_LAST_DESC: 'Clean up resources after other resources are deployed and healthy.',
  APPLY_OUT_OF_SYNC_ONLY_DESC: 'Only apply resources that are out of sync.',
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
  PARAMETER_SETTINGS: '参数设置',
  AUTO_PARAMETER: '自动',
  AUTO_PARAMETER_DESC: '已自动设置',
  HELM_PARAMETER: 'Helm',
  HELM_PARAMETER_DESC: '设置 Helm 参数',
  KUSTOMIZE_PARAMETER: 'Kustomize',
  KUSTOMIZE_PARAMETER_DESC: '设置 Kustomize 参数',
  PASS_CREDENTIALS: 'Pass Credentials',
  IGNORE_MISSING_VALUE_FILES: 'Ignore Missing Value Files',
  SKIP_CRDS: 'Skip Crds',
  RELEASE_NAME: 'Release Name',
  VALUE_FILES: 'Value Files',
  FORCE_STRING: 'Force String',
  FILE_PARAMETERS: '文件参数',
  NAME_PREFIX: '名称前缀',
  NAME_SUFFIX: '名称后缀',
  IMAGES: '镜像',
  COMMON_LABELS: '通用标签',
  COMMON_ANNOTATIONS: '常见注释'
};