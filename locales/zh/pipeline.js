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
  'Discover branches from repository': '发现仓库上的分支',
  'Discover pull requests from origin': '发现原始存储库与目标存储库相同的 PR',
  'Discover pull requests from forks': '发现 Fork 存储库与目标存储库相同的 PR',
  'User types that can trigger builds': '可以触发构建的用户类型',
  NO_CONCURRENT_BUILD_DESC: '设置流水线一次仅执行一个构建任务。',
  BUILD_PARAMETERS: '构建参数',
  BUILD_TRIGGER: '构建触发器',
  BUILD_PERIODICALLY: '定时构建',
  TRIGGER_REMOTE_BUILD: '触发远程构建（例如，使用脚本）',
  'Authentication Token': '身份验证令牌',
  'Use the following URL to remotely triggerworkbench the build':
    '使用以下 URL 远程触发构建',
  BEHAVIORAL_STRATEGY: '行为策略',
  SCRIPT_PATH_DESC: '设置 Jenkinsfile 在代码仓库中的的路径。',
  SCAN_TRIGGER: '扫描触发器',
  SCAN_PERIODICALLY: '定时扫描',
  SCAN_INTERVAL: '扫描时间间隔',
  WEBHOOK_PUSH_URL: 'Webhook 推送 URL',
  BUILD_SETTINGS: '构建设置',
  BRANCH_SETTINGS: ' 分支设置',
  PIPELINE_NAME_DESC: '流水线的名称，同一个项目内流水线不能重名。',
  PIPELINE_PARAM_DEFAULT_DESC:
    '设置参数的的默认值。您可以在手动运行流水线前修改参数值。',
  PARAMETER_DESCRIPTION_DESC: '设置参数的描述。',
  CHOICE_PARAM_OPTION_DESC: '每行输入一个选项，第一行的将作为默认选项。',
  'No need': '不需要',
  CODE_REPOSITORY_ADDRESS_DESC: '请使用包含 Jenkinsfile 的代码仓库。',
  CODE_REPOSITORY_ADDRESS_EMPTY_TIP: '请输入代码仓库的地址。',
  SELECT_CREDENTIAL_DESC: '选择一个凭证用于访问代码仓库。',
  'For accessing GitHub': '用于获取 GitHub',
  BRANCH_COUNT: '分支数量',
  PIPELINE: '流水线',
  PIPELINE_PL: '流水线',
  PIPELINE_LOW: '流水线',
  'Pipeline List': '流水线列表',
  EDIT_PIPELINE: '编辑流水线',
  EDIT_JENKINSFILE: '编辑 Jenkinsfile',
  RUN: '运行',
  COMMIT_PL: '提交',
  BRANCH_SI: '分支',
  BRANCH_PL: '分支',
  CODE_REPOSITORY_BRANCH: '代码仓库分支',
  LAST_MESSAGE: '最后消息',
  LAST_MESSAGE_SCAP: '最后消息',
  Duration: '持续时间',
  DURATION: '持续时间',
  DURATION_VALUE: '持续时间：{value}',
  TASK_STATUS: '任务状态',
  HEALTH: '健康状态',
  CREDENTIAL_PL: '凭证',
  CREDENTIAL: '凭证',
  CREDENTIAL_LOW: 'credential',
  CREDENTIAL_SI: '凭证',
  CREDENTIALS_MANAGEMENT: '凭证管理',
  'Add Parallel Stage': '添加并行阶段',
  'Add Step': '添加步骤',
  'Pipeline Configuration': '编辑流水线',
  VIEW_LOGS: '查看日志',
  CODE_REPOSITORY: '代码仓库',
  DELETE_OUTDATED_BUILD_RECORDS: '删除过期构建记录',
  DELETE_OUTDATED_BRANCHES: '删除旧分支',
  BUILD_RECORD_RETENTION_PERIOD_DAYS: '构建记录保留期限（天）',
  MAXIMUM_BUILD_RECORDS: '构建记录最大数量',
  BRANCH_RETENTION_PERIOD_DAYS: '分支保留天数（天）',
  MAXIMUM_BRANCHES: '分支最大数量',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_DESC:
    '超过保留期限的构建记录将被删除。默认值为 7。',
  NO_CONCURRENT_BUILDS: '不允许并发构建',
  PIPELINE_NAME_TIP: '请输入流水线名称。',
  CREATE_PIPELINE: '创建流水线',
  MAXIMUM_BUILD_RECORDS_DESC:
    '当构建记录数量超过允许的最大数量，最早的构建记录将被删除。默认值为 10。',
  SCAN_REPOSITORY: '扫描仓库',
  'Press enter for the next': '回车以进行下一步',
  'Wrong Token': 'Token 错误',
  SELECT_CODE_REPOSITORY: '选择代码仓库',
  CODE_REPOSITORY_ADDRESS: '代码仓库地址',
  REPOSITORY_NAME: '代码仓库',
  REPOSITORY_NAME_EMPTY_TIP: '请输入代码仓库的名称。',
  'get token': '获取 Token',
  PIPELINE_DESC: `流水线是一组可扩展的工具，可以通过组合它们来实现持续集成和持续交付。
    您可以在此页面创建并管理流水线。`,
  CREATE_CREDENTIAL: '创建凭证',
  CREDENTIAL_NAME: '凭证名称',
  username_password: '帐户凭证',
  CREDENTIAL_TYPE_USERNAME_PASSWORD: '用户名和密码',
  CREDENTIAL_TYPE_SSH: 'SSH 密钥',
  CREDENTIAL_TYPE_SECRET_TEXT: '访问令牌',
  CREDENTIAL_TYPE_KUBECONFIG: 'kubeconfig',
  login_Plateform: '登录平台',
  SCRIPT_PATH: '脚本路径',
  WEBHOOK_PUSH: 'Webhook 推送',
  DISCOVER_TAG_BRANCHES: '发现标签',
  DISCOVER_BRANCHES: '发现分支',
  DISCOVER_PR_FROM_ORIGIN: '从原仓库发现 PR',
  DISCOVER_PR_FROM_FORKS: '从 Fork 仓库发现 PR',
  PULL_STRATEGY: '拉取策略',
  TRUSTED_USERS: '受信用户',
  ADD_ACTION: '添加操作',
  ALL_BRANCHES: '包括所有分支',
  ENABLE_TAG_BRANCH_DISCOVERY: '开启标签发现',
  DISABLE_TAG_BRANCH_DISCOVERY: '关闭标签发现',
  EXCLUDE_PR_BRANCHES: '排除已提交 PR 的分支',
  ONLY_PR_BRANCHES: '只包括已提交 PR 的分支',
  OPTIONS_PR_PARAMS_1: '拉取 PR 合并后的代码',
  OPTIONS_PR_PARAMS_2: '拉取 PR 提交时的代码',
  OPTIONS_PR_PARAMS_3: '分别创建两个流水线',
  USERS_WITH_PERMISSION: '具有管理员或编辑权限的用户',
  Normal: '通用',
  'Run Pipeline': '运行流水线',
  ARTIFACT_PL: '制品',
  artifacts: '制品',
  Queue: '队列中',
  Recipient: '收件人',
  Sender: '发件人',
  CC: '抄送',
  Subject: '主题',
  bcc: '密送',
  remote: '仓库地址',
  'Print message': '打印消息',
  CREDENTIALS_DESC: `凭证是包含了一些敏感数据的对象，如用户名密码，SSH 密钥和 Token 等,
    用于在流水线运行时, 为拉取代码、push/pull 镜像、SSH 执行脚本等过程提供认证`,
  'Credential Id': '凭证 ID',
  NO_ARTIFACT_FOUND_TIP: '未发现制品。',
  SELECT_THIS_REPOSITORY: '选择此仓库',
  SCAN_REPO_SUCCESS: '仓库扫描触发成功。',
  PIPELINE_RUN_LOGS: '流水线运行日志',
  DOWNLOAD_LOGS: '下载日志',
  'Time Used': '用时',
  NOT_RUNNING: '未运行',
  NOT_BUILT: '未构建',
  'Not Build': '未执行',
  Failure: '失败',
  COMMIT: '提交',
  COMMIT_ID: '提交 ID',
  'Please input images name': '请输入镜像名称',
  'defaultValue -1 means not to discard': '默认值 -1: 不会丢弃记录',
  NO_STATUS: '没有状态',
  SKIPPED: '已跳过',
  SUB_HEALTHY: '亚健康',
  STOP_PIPELINE_SUCCESS: '流水线停止成功。',
  REPOSITORY_SCAN_LOGS: '仓库扫描日志',
  VIEW_SCAN_LOGS: '查看扫描日志',
  'Started By': '实施者',
  RESCAN: '重新扫描',
  RUN_ID: '运行 ID',
  LOGS_OBTAINED_SUCCESSFULLY: '日志获取成功。',
  'Configuration error': '配置信息错误',
  'branch success': '分支成功',
  BUILD_PARAMETERS_TIP: '向流水线传入构建参数。',
  AUTHENTICATION_TOKEN_TIP: `如果需要通过访问预定义 URL 开触发构建，请开启此选项。
    此功能的的一个典型用法是通过源代码管理系统的钩子脚本来进行触发。
    您需要提供一个字符串形式的授权令牌，以便只有拥有授权令牌的人才能触发远程构建。`,
  DELETE_OUTDATED_BUILD_RECORDS_TIP:
    '设置系统自动删除过期的控制台输出、归档制品、元数据等构建记录以节省磁盘空间。',
  DELETE_OUTDATED_BRANCHES_TIP: '设置系统自动删除过期分支以节省磁盘空间。',
  BUILD_PERIODICALLY_TIP: '设置流水线定期执行构建任务。',
  BRANCH_RETENTION_PERIOD_DAYS_DESC: '超过保留期限的分支将被删除。默认值为 7。',
  MAXIMUM_BRANCHES_DESC:
    '当构建记录数量超过允许的最大数量，最早的构建记录将被删除。默认值为 5。',
  CRON_TIP:
    '该字段遵循 cron 的语法 (略有不同)。具体来说，每行包含由制表符或空格分隔的 5 个字段。\n' +
    '分钟: 一个小时中的第几分钟 (0-59)\n' +
    '小时: 一天中的第几小时 (0-23)\n' +
    ' 月份的第几天:  一个月份中的第几天 (1-31)\n' +
    ' 月份: 第几个月份 (1-12)\n' +
    '星期的第几天 一个星期的第几天 (0-7)，0 和 7 都是星期天。',
  'Edit Config': '编辑配置',
  PIPELINES_BASEINFO_DESC: '请输入流水线的基本信息',
  PIPELINE_ADVANCE_SETTINGS_DESC: '	为流水线配置复杂行为策略（可选）',
  CREDENTIALS_CREATE_DESC: '创建用于 DevOps 项目中的凭证',
  WAITING_FOR_INPUT: '等待输入',
  BREAK: '终止',
  PROCEED: '继续',
  'credential Id': '凭证 ID',
  Branches: '分支',
  'Clean when aborted': '清理失败不影响运行',
  'Not fail build': '失败不影响运行',
  submitter: '审核者',
  submitterParameter: '提交参数',
  PRIVATE_KEY: '私钥',
  PASSPHRASE: '密码短语',
  'This name has been used.': '此名称已被使用',
  'Automatically generated by GitHub': '由 GitHub 自动生成',
  SET_PARAMETERS: '设置参数',
  "Missing one or more required properties: 'name'": 'name 不能为空',
  'Please add at least one step.': '至少添加一个步骤',
  'Please input the credential name.': '请输入凭证名称。',
  SCM: '代码仓库',
  NO_COMMIT_FOUND: '未发现提交记录',
  'Clean Workspace': '清理企业空间',
  'Save Artifact': '保存制品',
  'Change Current Directory': '更改当前目录',
  CHECKOUT_DESC: '拉取代码，常用于拉取非 Git 代码，例如 SVN 等等',
  'Send messages by email': '可以通过邮件发送消息',
  'Send messages in the build': '可以在构建中发送消息',
  'Shell commands can be executed in the container':
    '可以在容器中执行 shell 命令',
  'You can execute shell commands or windows batch commands in the build.':
    '可以在构建中执行 shell 命令或者 windows 的 batch 命令',
  'Pull code by SVN': '通过 SVN 拉取代码',
  'Pull code by Git': '通过 Git 拉取代码',
  'Add nesting steps': '添加嵌套步骤',
  'instance failed to match at least one schema': '至少需要一个嵌套步骤',
  'Load credentials into environment variables': '加载凭证到环境变量',
  'Password Variable': '密码变量',
  'Username Variable': '用户名变量',
  PRIVATE_IMAGE_DESC:
    '要从私有镜像仓库部署，需要先创建镜像仓库，然后拉取镜像。',
  AGENT_TYPE_DESC: `Agent 部分指定整个流水线或特定阶段将在 Jenkins 环境中执行的位置，
    具体取决于该 agent 部分的放置位置。该部分必须在流水线块内的顶层定义，但 stage 级使用是可选的。`,
  AUTHENTICATION_TOKEN_DESC: `使用以下 URL 远程触发构建：
    JENKINS_URL / job / JOB_NAME / build？token =TOKEN_NAME
    或者/ buildWithParameters？token = TOKEN_NAME 可选择附加＆cause =原因提供将包含在记录的构建原因中的文本。`,
  SELECT_CODE_REPO_DESC: '选择流水线使用的代码仓库。',
  NO_PIPELINE_CONFIG_FILE_TIP: '未发现流水线配置文件。',
  ACTIVITY_EMPTY_TIP: '流水线尚未运行。',
  PIPELINE_NO_CONFIG: '当前流水线中并未发现相关配置文件',
  INVALID_JENKINSFILE_TIP:
    '当前 Jenkinsfile 不是标准的声明式 Jenkinsfile，图形化显示不可用。',
  PIPELINE_SCHEDULE_DESC:
    '输入 CRON 表达式以设置定时计划。<a href="//jenkins.io/doc/book/pipeline/syntax/#cron-syntax" target="_blank">了解更多</a>',
  'passphrase Variable': '密码变量',
  'show yaml editor': '用 YAML 编辑器编辑',
  'Enable Variable Substitution in Config': '在配置中开启变量替换',
  'Kubernetes Secrets': 'Kubernetes 密钥',
  'Kubernetes Namespace for Secret': 'Kubernetes 密钥命名空间',
  'Docker Container Registry Credentials': 'Docker 容器仓库凭证',
  'Docker Registry URL': 'Docker 仓库 URL',
  'Registry Credentials': '仓库凭证',
  'Show Advanced Settings': '展示高级设置',
  'Config File Path': '配置文件路径',
  'Add another credential': '增加一个凭证',
  'Deploy resources to the Kubernetes cluster': '将资源部署到 kubernetes 集群',
  REMOTE_REPOSITORY_URL: '远程仓库地址',
  BRANCH_INCLUDED: '包括分支',
  BRANCH_EXCLUDED: '排除分支',
  KUBECONFIG_CONTENT_DESC: '默认内容为当前用户的 kubeconfig 配置。',
  'The label on which to run the Pipeline or individual stage':
    '流水线或单个阶段的标签',
  SINGLE_SVN: '单分支 SVN',
  SVN: 'SVN',
  WEBHOOK_PUSH_DESC: '推送消息到此 URL 以触发仓库扫描。',
  'single Svn': '单分支 SVN',
  WEBHOOK_DESC: '通过设置 Webhook 服务器以配置 Webhook 通知。',
  TIME_TRIGGER_DESC: '定时扫描代码仓库。',
  'Are you sure to close this pipeline Editor ?': '确定关闭流水线编辑？',
  CLOSE_JENKINSFILE_EDITOR_TIP: '确定关闭 Jenkinsfile 编辑器？',
  KUBERNETES_DEPLOY_DESC: `在 kubernetes 集群中进行部署，在持续集成/持续部署的环境当中，
    只有那些需要定期更新的资源才应该放到部署步骤当中，所以此步骤大多数时间都在处理部署这类资源.`,
  KUBERNETES_DEPLOY_DESC_MORE: `<br />
    <label>该步骤主要有以下特点:</label>
    <li>无需 kubectl 的情况下实现部署</li>
    <li>Jenkinsfile 中的变量替换，可以进行动态部署。</li>
    <li>支持从私有镜像仓库拉取 Docker 镜像</li>
    <label>目前该步骤支持以下资源:</label>
    <br />
    <li>配置</li>
    <li>密钥</li>
    <li>部署</li>
    <li>守护进程集</li>
    <li>应用路由</li>
    <li>名称空间</li>
    <li>任务</li>
    <li>服务</li>
    <li>Replica Set</li>
    <li>
      Replication
      Controller (不支持滚动更新，如果要使用滚动更新请使用部署)
    </li>`,
  'username or group name, multiple values ​​used, separated':
    '用户名或组名，多个值使用英文逗号分隔',
  'key File Variable': '私钥变量',
  'Text Variable': '文本变量',
  'Kubeconfig Variable': 'kubeconfig 变量',
  PIPELINE_PREPARE_DESC: '环境准备中...',
  PARAMS_DESC:
    '下列参数是根据流水线设置或 Jenkinsfile 中的 parameters 部分生成的字段，请根据运行需求输入。',
  'Chinese is not allowed in the pipeline configuration':
    '配置中不允许含有中文',
  'Edit Credential': '编辑凭证',
  EDIT_CREDENTIAL_DESC: '下列表单不会显示原有凭证信息，重新输入会将其覆盖。',
  PASSWORD_TOKEN: '密码/令牌',
  "Sorry, you don't have the permission to do this.":
    '抱歉，您没有权限进行此操作',
  'Drag and drop tasks to sort': '可以拖拽任务进行排序',
  Unnamed: '未命名',
  TASK_FAILED_NOT_OPERATIONAL: '此阶段已失败且无法操作。',
  CANCELLED_IN_REVIEW: '已在审核中取消',
  'Executes the code inside the block with a determined time out limit.':
    '使用确定的超时限制执行块内的代码.',
  'Timeout after no activity in logs for this block':
    '此区块代码无日志输出后开始计算超时',
  'Absolute duration': '代码块所用的绝对时间',
  pipeline_conditions: '条件',
  'The conditions required to implement the current phase (optional).':
    '执行当前阶段所需要满足的条件 （可选）',
  'Add conditions': '添加条件',
  'Add nesting conditions': '添加嵌套条件',
  'Current branch name must match the input value': '当前分支名需符合输入值',
  'The environment variable entered before running the pipeline is match the current value.':
    '运行流水线前输入的环境变量与当前值一致',
  'Enter an expression': '输入一个表达式',
  'Negative prefix': '否定前缀',
  'Internal nesting conditions must be matched': '内部嵌套的条件需全部满足',
  'Internal nested conditions only need to satisfy one':
    '内部嵌套的条件只需符合一个',
  'Environment name': '环境变量名',
  expression: '表达式',
  PARAMS_STRING: '字符串 ',
  PARAMS_TEXT: '多行字符串',
  PARAMS_BOOLEAN: '布尔值',
  PARAMS_CHOICE: '选项',
  PARAMS_PASSWORD: '密码',
  PARAMS_TEXT_TCAP: '多行字符串',
  critical: '严重',
  blocker: '阻断',
  BLOCKER: '阻塞',
  CRITICAL: '严重',
  MAJOR: '重要',
  MINOR: '轻微',
  NOTICE: '提示',
  major: '重要',
  minor: '次要',
  info: '提示',
  ISSUE_PL: '问题',
  'Code Quality Check': '代码质量检查',
  CODE_LINE_COUNT: '行数',
  VULNERABILITY_PL: '代码漏洞',
  CODE_SMELL_PL: '代码异味',
  COVERAGE: '覆盖率',
  "Didn't pass": '未通过',
  TEST_RESULTS: '检查结果',
  CODE_CHECK: '代码检查',
  LINE_VALUE: '行：{value}',
  DISPLAY_ALL: '展示全部',
  CODE_SMELL: '代码异味',
  BUG: '代码错误',
  BUG_PL: '代码错误',
  VULNERABILITY: '代码漏洞',
  SECURITY_HOTSPOT: '安全',
  Line: '行',
  DISPLAY_ONLY_LAST_TEN: '仅显示最近 10 条问题。',
  abortPipeline: '检查结果是否影响后续任务',
  waitForQualityGate: '代码质量检查(SonarQube)',
  mail: '邮件',
  echo: '打印消息',
  dir: '切换目录',
  withCredentials: '添加凭证',
  container: '指定容器',
  archiveArtifacts: '保存制品',
  input: '审核',
  timeout: '超时',
  Timeout: '超时',
  TIMEOUT_VALUE: '超时：{value}',
  withSonarQubeEnv: 'Sonarqube 配置',
  sh: 'shell 脚本',
  CLONE_SETTINGS: '克隆设置',
  CLONE_DEPTH: '克隆深度',
  REGEX: '正则表达式',
  FILTER_BY_REGEX: '正则过滤',
  FILTER_BY_REGEX_DESC: '使用正则表达式过滤分支、PR 和标签',
  ENABLE_SHALLOW_CLONE: '开启浅克隆',
  CLONE_TIMEOUT_PERIOD: '克隆超时时间（min）',
  'config name': '配置名称',
  waitForQualityGate_desc:
    '代码质量检查标准来源于SonarQube的 Quality Gate (质量阈)，如果需要自定义检查标准请前往 SonarQube 设置',
  'Inspection results do not affect subsequent tasks': '检查结果不影响后续任务',
  'Start the follow-up task after the inspection': '检查通过后开始后续任务',
  'Load the sonarqube configuration provided by Jenkins into the Pipeline.':
    '将 Jenkins 中的 sonarqube 配置加载到流水线中',
  PIPELINE_CREATE_DESC: '初始化完成后将开始流水线的任务执行',
  INITIALIZING_PIPELINE: '流水线初始化中',
  INITIALIZING_PIPELINE_DESC: '请等待流水线初始化完成。',
  'Specify a container to add nested tasks to execute inside the container':
    '指定容器，可添加嵌套任务在容器内执行',
  INPUT_DESC:
    '流水线运行至此任务将会暂停，创建者和被@的人可以选择继续或终止流水线',
  INPUT_MESSAGE_DESC: '流水线运行状态中将会展示此消息',
  '@somebody to help review': '可以@某人来帮助审核',
  REVIEW_DESC: '流水线运行至此任务将会暂停，审核后可选择继续或终止',
  withSonarQubeEnv_DESC: '快速的定位代码中潜在的或者明显的错误',
  waitForQualityGate_DESC: '在执行代码分析后执行',
  script_DESC: '执行groovy脚本',
  QUEUED: '队列中',
  ABORTED: '已取消',
  UNSTABLE: '未稳定',
  PIPELINE_QUEUED_TITLE: '即将完成初始化',
  PIPELINE_QUEUED_DESC:
    '您需要等待 agent 启动并执行流水线（注：如 agent 长时间没有启动请检查 agent 配置和集群资源情况）',
  pipeline_owner: 'DevOps 项目的所有者，可以进行 DevOps 项目的所有操作',
  pipeline_maintainer:
    'DevOps 项目的主要维护者，可以进行项目内的凭证配置、流水线配置等操作',
  pipeline_developer: 'DevOps 项目的开发者，可以进行流水线的触发以及查看',
  pipeline_reporter: 'DevOps 项目的观察者，可以查看流水线的运行情况',
  'sonar is the default config name.': '默认配置名称是 sonar',
  credentialsId: '凭证 ID',
  enableConfigSubstitution: '开启变量替换',
  configs: '配置',
  secretNamespace: '密钥命名空间',
  secretName: '秘钥名称',
  dockerCredentials: 'Docker 容器仓库凭证',
  passwordVariable: '密码变量',
  usernameVariable: '用户名变量',
  keyFileVariable: '私钥变量',
  passphraseVariable: '密码变量',
  NO_BRANCH_FOUND_TIP: '未发现分支。',
  LoadPrevData_Desc: '检测到此流水线上次未编辑成功，是否加载上次数据继续编辑？',
  Continue: '继续编辑',
  Discard: '忽略',
  'Jenkinsfile syntax error, message': 'Jenkinsfile 语法错误，消息',
  PATTERN_PIPELINE_NAME_VALID_NAME_TIP:
    '名称不合法 （仅支持大小写字母、数字、_、-）',
  INCORRECT_GITHUB_TOKEN_DESC: `GitHub 令牌错误
  <a
    class="float-right"
    href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
    target="_blank"
  >
    获取 GitHub 令牌
  </a>`,
  GET_GITHUB_TOKEN_DESC: `用于获取 GitHub 代码仓库
  <a
    class="float-right"
    href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
    target="_blank"
  >
    获取 Token
  </a>`,
  BITBUCKET_SERVER_CREDENTIAL_EMPTY: '请设置 Bitbucket 服务器和凭证。',
  GITHUB_CREDENTIAL_EMPTY: '请设置 GitHub 凭证。',
  BITBUCKET_ADDRESS_EMPTY_TIP: '请输入 Bitbucket 服务器的地址。',
  BITBUCKET_ADDRESS_INVALID_TIP: 'Bitbucket 服务器地址格式错误。',
  'pipeline syntax error': '流水线语法错误',
  PIPELINES_FOOTER_SEE_MORE: '前往分支详情页查看更多 →',
  PIPELINE_CRON_DESC: '流水线下次将在 {nextTime} 运行。',
  'not support edit nested stage': '暂不支持编辑嵌套阶段',
  JENKINS_LINS_ERROR: '第 {line} 行有语法错误',
  'Delete all resources of the deployment file': '删除部署文件所对应的所有资源',
  PIPELINE_EVENT_TRIGGER: '通过流水线事件触发',
  WHEN_CREATE_PIPELINE: '创建流水线时触发',
  WHEN_DELETE_PIPELINE: '删除流水线时触发',
  WHEN_DELETE_PIPELINE_DESC:
    '当有流水线被删除时，将自动触发指定流水线中的任务。',
  WHEN_CREATE_PIPELINE_DESC:
    '当创建新的流水线时，将自动触发指定流水线中的任务。',
  SELECT_PIPELINE_SCAP: '选择流水线',
  timer: '定时器',
  STARTED_BY_NAME: '启动者：{name}',
  CREDENTIAL_NAME_EXIST_DESC: '凭证名称已存在，请输入其他名称。',
  'Invalid credential ID': '凭证 ID 格式不合法',
  CI: '持续集成 (CI)',
  CI_DESC:
    '持续集成（CI）是在源代码变更后自动检测、拉取、构建和（在大多数情况下）进行单元测试的过程。',
  CICD: '持续集成&交付 (CI/CD)',
  CICD_DESC:
    '持续部署（CD）是指能够自动提供持续交付管道中发布版本给最终用户使用的想法。根据用户的安装方式，在云环境中自动部署、app 升级（如手机上的应用程序）、更新网站或只更新可用版本列表。',
  CUSTOM_PIPELIEN: '自定义流水线',
  CUSTOM_PIPELIEN_DESC: '您可以选择您需要的任务自定义流水线的工作内容',
  COPY_PIPELINE: '复制流水线',
  PIPELINE_RUN_START_SI: '开始运行流水线...',
  PIPELINE_RUN_START_PL: '开始运行流水线...',
  BATCH_RUN_SUCCESS_SI: '流水线运行成功。',
  BATCH_RUN_SUCCESS_PL: '流水线运行成功。',
  'Batch Run Fail': '批量运行失败',
  'Run Start': '运行开始',
  GITLAB_SERVER_ADDRESS: 'Gitlab 服务器地址',
  GITLAB_SERVER_EMPTY_TIP: '请输入 GitLab 服务器的地址。',
  PROJECT_GROUP_OWNER: '项目组/所有者',
  PROJECT_GROUP_OWNER_EMPTY_TIP: '请输入 GitLab 项目组或项目所有者的名称。',
  BITBUCKET_SERVER_ADDRESS: 'Bitbucket 服务器地址',
  BITBUCKET_SERVER_EMPTY_TIP: '请设置 Bitbucket 服务器的地址。',
  CREATE_PIPELINE_DESC: '使用流水线进行构建，测试和部署',
  'Choose a Pipeline Template': '选择流水线模板',
  BATCH_RUN_UNSUPPORTED_DESC: '多分支流水线不支持批量运行。',
  SYNC_STATUS: '同步状态',

  // Pipeline List Page
  PULL_REQUEST_PL: '拉取请求',
  PULL_REQUEST_COUNT: '拉取请求数量',
  HEALTHY: '健康',

  // Pipeline Creation Page
  DEVOPS_PROJECT_DESC:
    'DevOps 项目用于对资源进行分组管理以及控制不同用户的资源管理权限。',
  PIPELINE_CREATE_DEVOPS_PROJECT_DESC: '选择流水线所属的 DevOps 项目。',
  CODE_REPOSITORY_OPTIONAL: '代码仓库（可选）',
  OPTIONS: '备用选项',
}
