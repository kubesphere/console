/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
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
  NEED_TO_SYNC_REPO: '需要同步repo',
  CREATE_CONTINUOUS_DEPLOYMENT: '创建持续部署',
  CD_SELECT_CODE_REPO_DESC: '选择持续部署使用的代码仓库。',
  DEPLOYMENT_SETTINGS: '部署设置',
  CODE_REPOSITORY_SETTINGS: '代码仓库设置',
  SYNC_STRATEGY_TCAP: '同步策略',
  AUTO_SYNC_DESC:
    '在检测到 Git 仓库中的清单与部署资源的实时状态之间存在差异时，根据设置的同步选项，自动触发应用程序同步。',
  // MANUAL_SYNC_DESC: 'Sync according to custom rules.',
  PRUNE_RESOURCES: '清理资源',
  SELF_HEAL: '自恢复',
  MANIFEST_FILE_PATH: '清单文件路径',
  // MANIFEST_FILE_PATH_DESC: 'Set the manifest file path. ',
  DIRECTORY_RECURSE: '目录递归',
  REPO_EMPTY_DESC: '请选择一个代码仓库。',
  VALUES_FILES: 'Values 文件',
  VALUES_FROM: 'Values 文件源',
  STORAGE_NAMESPACE: '存储所属项目',
  TEST: '测试',
  REVISIONS_DESC:
    'Git 仓库中的 commit ID、分支或标签，如，"master", "v1.2.0", "0a1b2c3" 或 "HEAD"。',
  MANIFEST_FILE_PATH_DESC: '设置清单文件路径，如 "deployments/nginx" 或 "deployments/"。',
  MANUAL_SYNC_DESC: '根据自定义规则同步。',
  AUTO_SYNC_DESC:
    '在检测到 Git 仓库中的清单与部署资源的实时状态之间存在差异时，根据设置的同步选项，自动触发应用程序同步。',
  PRUNE_RESOURCES_DESC:
    '如果勾选，自动同步时会删除 Git 仓库中不存在的资源。不勾选时，自动同步触发时不会删除集群中的资源。',
  SELF_HEAL_DESC:
    '如果勾选，当检测到 Git 仓库中定义的状态与部署资源中有偏差时，将强制应用 Git 仓库中的定义。不勾选时，对部署资源做更改时不会触发自动同步。',
  FOREGROUND_DESC: '先删除依赖资源，再删除主资源。',
  BACKGROUND_DESC: '先删除主资源，再删除依赖资源。',
  ORPHAN_DESC: '删除主资源，留下依赖资源成为孤儿。',
  SKIP_SCHEMA_VALIDATION_DESC:
    '跳过 kubectl 验证。执行 kubectl apply 时，增加 --validate=false 标识。',
  AUTO_CREATE_PROJECT_DESC: '在项目不存在的情况下自动为应用程序资源创建项目。',
  PRUNE_LAST_DESC: '同步操作时，其他资源都完成部署且处于健康状态后，再清理资源。',
  APPLY_OUT_OF_SYNC_ONLY_DESC: '仅同步 out-of-sync 状态的资源。',
  // List > Delete
  CONTINUOUS_DEPLOYMENT: '持续部署',
  CONTINUOUS_DEPLOYMENT_LOW: '持续部署',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_SI:
    '您即将删除持续部署 {resource}。 <br/>请确认是否删除由持续部署创建的资源。',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_PL:
    '您即将删除持续部署 {resource}。 <br/>请确认是否删除由持续部署创建的资源。',
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
  KUSTOMIZE_PARAMETER: '自定义',
  KUSTOMIZE_PARAMETER_DESC: '设置 Kustomize 参数',
  PASS_CREDENTIALS: '传递凭据',
  IGNORE_MISSING_VALUE_FILES: '忽略缺失的 Values 文件',
  SKIP_CRDS: '跳过 CRD',
  RELEASE_NAME: '发布版本',
  VALUE_FILES: 'Values 文件',
  FORCE_STRING: '强制字符串',
  FILE_PARAMETERS: '文件参数',
  NAME_PREFIX: '名称前缀',
  NAME_SUFFIX: '名称后缀',
  IMAGES: '镜像',
  COMMON_LABELS: '通用标签',
  COMMON_ANNOTATIONS: '常见注释',
};
