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
  PIPELINE_PL: '流水线',
  // List
  HEALTH: '健康状态',
  PULL_REQUEST_COUNT: '拉取请求数量',
  MULTI_BRANCH_PIPELINE: '多分支流水线',
  HEALTHY: '健康',
  SUB_HEALTHY: '亚健康',
  NO_STATUS: '没有状态',
  BRANCH_COUNT: '分支数量',
  PIPELINE_EMPTY_DESC: '请创建一个流水线。',
  // List > Run
  BATCH_RUN_SUCCESS_SI: '流水线运行成功。',
  BATCH_RUN_SUCCESS_PL: '流水线运行成功。',
  BATCH_RUN_UNSUPPORTED_DESC: '多分支流水线不支持批量运行。',
  // List > Edit
  // List > Copy
  COPY: '复制',
  COPY_PIPELINE: '复制流水线',
  PIPELINE_NAME_DESC: '流水线的名称，同一个项目内流水线不能重名。',
  PIPELINE_NAME_TIP: '请输入流水线名称。',
  // List > Delete
  // List > Create
  CREATE_PIPELINE: '创建流水线',
  // List > Create > Basic Information
  GO_CREATE_REPO_ACTION: 'No code repository is available. Please <span class="text-action">create a code repository.</span>',
  PIPELINE_TYPE: '流水线类别',
  SELECT_CODE_REPOSITORY: '选择代码仓库',
  BRANCH_PIPELINE_DESC: '通过可视化编排或 Jenkinsfile 来描述软件的构建工程。',
  MULTI_BRANCH_PIPELINE_DESC: '根据源码管理(SCM)仓库中检测到的每个分支创建一系列流水线。',
  PIPELINE_CREATE_DEVOPS_PROJECT_DESC: '选择流水线所属的 DevOps 项目。',
  CODE_REPOSITORY_OPTIONAL: '代码仓库（可选）',
  CODE_REPOSITORY_REQUIRED: '代码仓库',
  CODE_REPOSITORY_REQUIRED_DESC: '请选择一个代码仓库。',
  GO_CREATE_REPO: '没有可用的代码库。请创建代码库。',
  CODE_REPO_EXISTS: '代码仓库已存在',
  SELECT_CODE_REPO_DESC: '选择流水线使用的代码仓库。',
  RESELECT: '重新选择',
  // List > Create > Basic Information > Code Repository > GitHub
  CREDENTIAL_SI: '凭证',
  CREDENTIAL: '凭证',
  PIPELINE_CREDENTIAL_EMPTY_TIP: '请选择一个凭证。',
  SELECT_CREDENTIAL_DESC: '选择一个凭证用于访问代码仓库。',
  GITHUB_CREDENTIAL_EMPTY: '请设置 GitHub 凭证。',
  INCORRECT_GITHUB_TOKEN_DESC: `GitHub 令牌错误
    <a
      class="float-right"
      href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
      target="_blank"
    >
      获取 GitHub 令牌
    </a>`,
  LOAD_MORE: '加载更多',
  NO_REPO_FOUND_DESC: '未发现代码仓库。',
  // List > Create > Basic Information > Code Repository > GitLab
  GITLAB_SERVER_ADDRESS: 'Gitlab 服务器地址',
  GITLAB_SERVER_EMPTY_TIP: '请输入 GitLab 服务器的地址。',
  PROJECT_GROUP_OWNER: '项目组/所有者',
  PROJECT_GROUP_OWNER_EMPTY_TIP: '请输入 GitLab 项目组或项目所有者的名称。',
  REPOSITORY_NAME: '代码仓库',
  REPOSITORY_NAME_EMPTY_TIP: '请输入代码仓库的名称。',
  // List > Create > Basic Information > Code Repository > Bitbucket
  BITBUCKET_SERVER_ADDRESS: 'Bitbucket 服务器地址',
  BITBUCKET_SERVER_EMPTY_TIP: '请设置 Bitbucket 服务器的地址。',
  INCORRECT_USERNAME_OR_PASSWORD: '用户名或密码错误。',
  BITBUCKET_SERVER_CREDENTIAL_EMPTY: '请设置 Bitbucket 服务器和凭证。',
  BITBUCKET_ADDRESS_EMPTY_TIP: '请输入 Bitbucket 服务器的地址。',
  BITBUCKET_ADDRESS_INVALID_TIP: 'Bitbucket 服务器地址格式错误。',
  // List > Create > Basic Information > Code Repository > Git
  CODE_REPOSITORY_ADDRESS_DESC: '请使用包含 Jenkinsfile 的代码仓库。',
  CODE_REPOSITORY_ADDRESS_EMPTY_TIP: '请输入代码仓库的地址。',
  CODE_REPOSITORY_ADDRESS: '代码仓库地址',
  // List > Create > Basic Information > Code Repository > SVN
  SINGLE_SVN: '单分支 SVN',
  SVN: 'SVN',
  BRANCH_EXCLUDED: '排除分支',
  BRANCH_INCLUDED: '包括分支',
  // List > Create > Advanced Settings
  DELETE_OUTDATED_BRANCHES: '删除旧分支',
  DELETE_OUTDATED_BRANCHES_TIP: '设置系统自动删除过期分支以节省磁盘空间。',
  BRANCH_SETTINGS: ' 分支设置',
  BRANCH_RETENTION_PERIOD_DAYS: '分支保留天数（天）',
  MAXIMUM_BRANCHES: '分支最大数量',
  BRANCH_RETENTION_PERIOD_DAYS_DESC: '超过保留期限的分支将被删除。默认值为 7。',
  MAXIMUM_BRANCHES_DESC: '当构建记录数量超过允许的最大数量，最早的构建记录将被删除。默认值为 5。',
  ADD_STRATEGY: '添加策略',
  DISCOVER_TAG_BRANCHES: '发现标签',
  DISCOVER_BRANCHES: '发现分支',
  ALL_BRANCHES: '包括所有分支',
  ONLY_PR_BRANCHES: '只包括已提交 PR 的分支',
  EXCLUDE_PR_BRANCHES: '排除已提交 PR 的分支',
  ENABLE_TAG_BRANCH_DISCOVERY: '启用标签发现',
  DISABLE_TAG_BRANCH_DISCOVERY: '禁用标签发现',
  PULL_STRATEGY: '拉取策略',
  OPTIONS_PR_PARAMS_1: '拉取 PR 合并后的代码',
  OPTIONS_PR_PARAMS_2: '拉取 PR 提交时的代码',
  OPTIONS_PR_PARAMS_3: '分别创建两个流水线',
  REGEX: '正则表达式',
  FILTER_BY_REGEX: '正则过滤',
  FILTER_BY_REGEX_DESC: '使用正则表达式过滤分支、PR 和标签',
  SCRIPT_PATH: '脚本路径',
  SCRIPT_PATH_DESC: '设置 Jenkinsfile 在代码仓库中的的路径。',
  SCAN_TRIGGER: '扫描触发器',
  SCAN_PERIODICALLY: '定时扫描',
  TIME_TRIGGER_DESC: '定时扫描代码仓库。',
  SCAN_INTERVAL: '扫描时间间隔',
  SELECT_PIPELINE_SCAP: '选择流水线',
  WHEN_DELETE_PIPELINE_DESC: '当有流水线被删除时，将自动触发指定流水线中的任务。',
  WHEN_CREATE_PIPELINE_DESC: '当创建新的流水线时，将自动触发指定流水线中的任务。',
  PIPELINE_EVENT_TRIGGER: '通过流水线事件触发',
  WHEN_CREATE_PIPELINE: '创建流水线时触发',
  WHEN_DELETE_PIPELINE: '删除流水线时触发',
  CLONE_SETTINGS: '克隆设置',
  CLONE_TIMEOUT_PERIOD: '克隆超时时间（min）',
  CLONE_DEPTH: '克隆深度',
  ENABLE_SHALLOW_CLONE: '启用浅克隆',
  WEBHOOK_PUSH_URL: 'Webhook 推送 URL',
  WEBHOOK_PUSH_DESC: '推送消息到此 URL 以触发仓库扫描。',
  TRUSTED_USERS: '受信用户',
  CONTRIBUTORS: '贡献者',
  EVERYONE: '所有人',
  NOBODY: '无',
  USERS_WITH_PERMISSION: '具有管理员或编辑权限的用户',
  // List > Create > Advanced Settings (no repo specified)
  OPTIONS: '备用选项',
  BUILD_SETTINGS: '构建设置',
  DELETE_OUTDATED_BUILD_RECORDS: '删除过期构建记录',
  DELETE_OUTDATED_BUILD_RECORDS_TIP: `设置系统自动删除过期的控制台输出、归档制品、元数据等构建记录以节省磁盘空间。`,
  BUILD_RECORD_RETENTION_PERIOD_DAYS: '构建记录保留期限（天）',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_DESC: '超过保留期限的构建记录将被删除。默认值为 7。',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_INVALID_TIP: '保留期限必须是正整数。',
  MAXIMUM_BUILD_RECORDS: '构建记录最大数量',
  MAXIMUM_BUILD_RECORDS_DESC: '当构建记录数量超过允许的最大数量，最早的构建记录将被删除。默认值为 10。',
  MAXIMUM_BUILD_RECORDS_INVALID_TIP: '构建记录的最大值必须为正整数。',
  NO_CONCURRENT_BUILDS: '不允许并发构建',
  NO_CONCURRENT_BUILD_DESC: '设置流水线一次仅执行一个构建任务。',
  BUILD_PARAMETERS: '构建参数',
  BUILD_PARAMETERS_TIP: '向流水线传入构建参数。',
  PARAMS_STRING: '字符串 ',
  PIPELINE_PARAM_DEFAULT_DESC: '设置参数的的默认值。您可以在手动运行流水线前修改参数值。',
  PARAMS_TEXT: '多行字符串',
  PARAMS_TEXT_TCAP: '多行字符串',
  PARAMETER_DESCRIPTION_DESC: '设置参数的描述。',
  PARAMS_BOOLEAN: '布尔值',
  PARAMS_CHOICE: '选项',
  CHOICE_PARAM_OPTION_DESC: '每行输入一个选项，第一行的将作为默认选项。',
  PARAMS_PASSWORD: '密码',
  BUILD_TRIGGER: '构建触发器',
  BUILD_PERIODICALLY: '定时构建',
  BUILD_PERIODICALLY_TIP: '设置流水线定期执行构建任务。',
  PIPELINE_CRON_DESC: '流水线下次将在 {nextTime} 运行。',
  PIPELINE_SCHEDULE_DESC: '输入 CRON 表达式以设置定时计划。<a href="//jenkins.io/doc/book/pipeline/syntax/#cron-syntax" target="_blank">了解更多</a>',
  DEFAULT_VALUE: '默认值',
  PARAMETER_NAME_EMPTY_DESC: '请设置参数的名称。',
  SELECT_TEMPLATE: '选择模板',
  PARAMETER_CONFIG: '参数设置',
  PREVIEW: '预览',
  EMPTY_PARAMS_CONFIG: '此操作不需要设置参数。',
  PIPELINE_VALIDATOR_DESC: '请选择一个流水线模板。'
};