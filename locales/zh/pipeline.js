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
  'Discover branches from repoitory': '发现存储库上的分支',
  'Discover pull requests from origin': '发现原始存储库与目标存储库相同的 PR',
  'Discover pull requests from forks': '发现 Fork 存储库与目标存储库相同的 PR',
  'User types that can trigger builds': '可以触发构建的用户类型',
  'If you check this option, you cannot run multiple builds concurrently.':
    '如果勾选此选项，则不能并发运行多个 build.',
  'Parametric Build': '参数化构建',
  'Build Trigger': '构建触发器',
  'Scheduled build': '定时构建',
  'Trigger a remote build (for example, using a script)':
    '触发远程构建 (例如，使用脚本)',
  'Authentication Token': '身份验证令牌',
  'Use the following URL to remotely triggerworkbench the build':
    '使用以下 URL 远程触发构建',
  'Behavioral strategy': '行为策略',
  'Specify the location of the Jenkinsfile in the source code repository':
    '指定 Jenkinsfile 在源代码仓库的位置',
  'Scan Repo Trigger': '扫描 Repo Trigger',
  'If not, scan regularly': '如果没有扫描触发，则定期扫描',
  'Scan interval': '扫描时间间隔',
  'Push message to': '推送消息到',
  'Build Settings': '构建设置',
  'Branch Settings': ' 分支设置',
  'The name of the pipeline. Pipelines in the same project must have different names.':
    '流水线的名称，同一个工程内流水线不能重名',
  'It specifies the default value of the field, allowing the user to save the typed actual value.':
    '指定字段的默认值，允许用户保存键入实际值。',
  'Comment information': '注释信息',
  'Alternate options, one per line. The first line will be used as the default option.':
    '备用选项，每行一个。第一行的将作为默认选项。',
  'No need': '不需要',
  'Any repository containing Jenkinsfile will be built automatically.':
    '任何包含 Jenkinsfile 的仓库将会自动构建',
  ADD_NEW_CREDENTIAL_DESC:
    '获取仓库代码可能需要凭证, 选择已有凭证或添加一个新的凭证',
  'For accessing GitHub': '用于获取 GitHub',
  'Branch Count': '分支数量',
  Pipeline: '流水线',
  Pipelines: '流水线',
  'Pipeline List': '流水线列表',
  'Edit Pipeline': '编辑流水线',
  'Edit Jenkinsfile': '编辑 Jenkinsfile',
  Run: '运行',
  Commit: '提交',
  Branch: '分支',
  'Last Message': '最后信息',
  Duration: '持续时间',
  TaskStatus: '运行状态',
  WeatherScore: '健康状态',
  Credentials: '凭证',
  Credential: '凭证',
  'Credentials Management': '凭证管理',
  'Add Parallel Stage': '添加并行阶段',
  'Add Step': '添加步骤',
  'Pipeline Configuration': '编辑流水线',
  'Show Logs': '查看日志',
  'Code Repository': '代码仓库',
  'Discard old builds': '丢弃旧的构建',
  'Discard old branch': '丢弃旧的分支',
  'Days to keep builds': '保留构建的天数',
  'Maximum number of builds to keep': '保留构建的最大个数',
  'Days to keep old branches': '保留分支的天数',
  'Max number of branches to keep': '保留分支的最大个数',
  'Old builds will be deleted after this number of days.':
    '如果构建达到保留的天数将进行删除',
  'No concurrent builds': '不允许并发构建',
  'Please input pipeline name': '请输入流水线名称',
  'Create Pipeline': '创建流水线',
  'Old builds will be discarded after the build number exceeds the maximum amount.':
    '如果构建超过一定的数量将丢弃旧的构建',
  'Scan Repository': '扫描远程分支',
  'Press enter for the next': '回车以进行下一步',
  'Wrong Token': 'Token 错误',
  'Select Code Repository': '选择代码仓库',
  'Repository Url': '仓库 URL',
  'Repository Name': '仓库名称',
  'get token': '获取 Token',
  PIPELINE_DESC: `Pipeline 是一系列的插件集合，可以通过组合它们来实现持续集成和持续交付的功能。
    Pipeline DSL 为我们提供了一个可扩展的工具集，让我们可以将简单到复杂的逻辑通过代码实现。`,
  'Create Credentials': '创建凭证',
  'Credential ID': '凭证 ID',
  username_password: '帐户凭证',
  login_Plateform: '登录平台',
  'Script Path': '脚本路径',
  'Webhook Push': 'webhook 推送',
  'Discover Tag Branches': '发现 Tag 分支',
  'Discover Branches': '发现分支',
  'Discover PR from Origin': '从原仓库中发现 PR',
  'Discover PR from Forks': '从 Fork 仓库中发现 PR',
  'Pull Strategy': '拉取策略',
  'Trusted User': '可信用户',
  'Add Action': '添加操作',
  'All branches': '所有分支',
  'Enable Discover Tag Branches': '启用发现 Tag 分支',
  'Disable Discover Tag Branches': '停用发现 Tag 分支',
  'Exclude branches that are also filed as PRs': '排除也作为 PR 提交的分支',
  'Only branches that are also filed as PRs': '只有被提交为 PR 的分支',
  OPTIONS_PR_PARAMS_1: 'PR 与目标分支合并后的源代码版本',
  OPTIONS_PR_PARAMS_2: 'PR 本身的源代码版本',
  OPTIONS_PR_PARAMS_3: `当 PR 被发现时会创建两个流水线，
    一个流水线使用 PR 本身的源代码版本，
    一个流水线使用 PR 与目标分支合并后的源代码版本`,
  'From users with Admin or Write permission': '管理员或有编辑权限的用户',
  Normal: '通用',
  'Run Pipeline': '运行流水线',
  Artifacts: '制品',
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
    用于在 Pipeline 运行时, 为拉取代码、push/pull 镜像、SSH 执行脚本等过程提供认证`,
  'Credential Id': '凭证 ID',
  'No artifacts records': '没有制品记录',
  'Select This Repository': '选择此仓库',
  'Scan repo success': '扫描仓库触发成功',
  'Pipeline Run Logs': '流水线运行日志',
  'Download Logs': '下载日志',
  'Time Used': '用时',
  'not run': '未运行',
  'Not Build': '未执行',
  Failure: '失败',
  commit: '提交',
  'Please input images name': '请输入镜像名称',
  'defaultValue -1 means not to discard': '默认值 -1: 不会丢弃记录',
  'no status': '没有状态',
  Skipped: '已跳过',
  'Sub-healthy': '亚健康',
  Schedule: '日程表',
  'Stop Job Successfully, Status updated later': '任务已停止，状态稍后更新',
  'Scan Reponsitory Logs': '扫描仓库日志',
  'Started By': '实施者',
  Rescan: '重新扫描',
  'Logs Scanned Successfully': '扫描日志成功',
  'Configuration error': '配置信息错误',
  'branch success': '分支成功',
  tips_Parametric_build: `参数化构建过程允许您在进行构建时传入一个或多个参数。
  例如：您可能有一个进行发布软件的流水线，并且希望一起进行上传发行说明。这可以通过在此处添加文本参数来完成。
  每个参数都有一个 Name 和某种 Value，Value 的值取决于参数类型。在 Pipeline 当中可以使用
    params.Name
  或 Name 访问这些值。这意味着此处定义的每个参数应具有唯一的名称。
  当参数化项目时，构建会被替换为参数化构建，其中将提示用户为每个定义的参数输入值。
  如果他们选择不输入任何内容，则构建以每个参数的默认值进行。
  如果项目的构建是自动启动，例如，由定时触发器启动，这时将使用参数的默认值进行触发。`,
  tips_Authentication_token: `如果需要通过访问预定义 URL 开触发构建，请启用此选项。
    此功能的的一个典型用法是通过源代码管理系统的钩子脚本来进行触发。
    您需要提供一个字符串形式的授权令牌，以便只有拥有授权令牌的人才能触发远程构建。`,
  tips_disable_concurrent:
    '这将确定何时应丢弃项目的构建记录。构建记录包括控制台输出，存档工件以及与特定构建相关的其他元数据。\n' +
    '保留较少的构建可以节省 Jenkins 所使用的磁盘空间。\n' +
    '我们提供了两个选项来确定应何时丢弃旧的构建：\n' +
    '1. 保留构建的天数：如果构建达到一定的天数，则丢弃构建。\n' +
    '2. 保留构建的个数：如果已经存在一定数量的构建，则丢弃最旧的构建。\n' +
    '这两个选项可以同时对构建进行作用，如果超出任一限制，则将丢弃超出该限制的任何构建。',
  tips_disable_concurrent_withscm: `这将确定何时应丢弃分支以及分支下的所有构建记录。构建记录包括控制台输出，
    存档工件以及与特定构建相关的其他元数据。保留较少的构建可以节省Jenkins所使用的磁盘空间。
    我们提供了两个选项来确定应何时丢弃旧的分支： 1. 保留分支的天数：如果分支达到一定的天数，则丢弃分支。
    2. 保留分支的个数：如果已经存在一定数量的分支，则丢弃最旧的分支。这两个选项可以同时对分支进行作用，
    如果超出任一限制，则将丢弃超出该限制的任何分支。`,
  tips_Timing_build: '提供类似 cron 的功能来定期执行此项目',
  tips_days_keep_withscm:
    '如果分支达到保留的天数将进行删除. (默认值 -1: 将会丢弃已经被删除的分支)',
  tips_numbers_keep_withscm:
    '如果分支达到保留的个数将进行删除. (默认值 -1: 将会丢弃已经被删除的分支)',
  tips_timer_trigger:
    '该字段遵循 cron 的语法 (略有不同)。具体来说，每行包含由制表符或空格分隔的 5 个字段。\n' +
    '分钟: 一个小时中的第几分钟 (0-59)\n' +
    '小时: 一天中的第几小时 (0-23)\n' +
    ' 月份的第几天:  一个月份中的第几天 (1-31)\n' +
    ' 月份: 第几个月份 (1-12)\n' +
    '星期的第几天 一个星期的第几天 (0-7)，0 和 7 都是星期天。',
  'Edit Config': '编辑配置',
  PIPELINES_BASEINFO_DESC: '请输入流水线的基本信息',
  PIPELINE_ADVANCE_SETTINGS_DESC: '	为流水线配置复杂行为策略（可选）',
  CREDENTIALS_CREATE_DESC: '创建用于 DevOps 工程中的凭证',
  'Wait for interactive input': '等待输入',
  Break: '终止',
  Proceed: '继续',
  'credential Id': '凭证 ID',
  Branches: '分支',
  'Clean when aborted': '清理失败不影响运行',
  'Not fail build': '失败不影响运行',
  submitter: '审核者',
  submitterParameter: '提交参数',
  'Private key': '私钥',
  passphrase: '密码',
  'This name has been used.': '此名称已被使用',
  'Automatically generated by GitHub': '由 GitHub 自动生成',
  'Params Input': '输入参数',
  "Missing one or more required properties: 'name'": 'name 不能为空',
  'Please add at least one step.': '至少添加一个步骤',
  'This name has existed.': '此名称已存在',
  'Please input the credential name.': '请输入凭证名称',
  SCM: '代码仓库',
  Review: '审核',
  'No commit records': '没有提交记录',
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
  AGENT_TYPE_DESC: `Agent 部分指定整个 Pipeline 或特定阶段将在 Jenkins 环境中执行的位置，
    具体取决于该 agent 部分的放置位置。该部分必须在 Pipeline 块内的顶层定义，但 stage 级使用是可选的。`,
  AUTHENTICATION_TOKEN_DESC: `使用以下 URL 远程触发构建：
    JENKINS_URL / job / JOB_NAME / build？token =TOKEN_NAME
    或者/ buildWithParameters？token = TOKEN_NAME 可选择附加＆cause =原因提供将包含在记录的构建原因中的文本。`,
  'Please select a code repository as the code source for the pipeline.':
    '请选择一个代码仓库作为 Pipeline 的代码源',
  'Pipeline config file not found': '未找到 Pipeline 配置文件',
  ACTIVITY_EMPTY_TIP: '当前 Pipeline 还没有运行',
  PIPELINE_NO_CONFIG: '当前 Pipeline 中并没有找到相关配置文件',
  NOT_VALID_JENKINS_FILE:
    '当前 Jenkinsfile 不是标准的声明式 Jenkinsfile，无法进行图形化显示',
  PIPELINE_CRONJOB_CRON_DESC: `Every hour, on the hour 语法参照
    <a href="//jenkins.io/doc/book/pipeline/syntax/#cron-syntax" target="_blank">CRON</a>`,
  'passphrase Variable': '密码变量',
  'show yaml editor': '用 YAML 编辑器编辑',
  'Enable Variable Substitution in Config': '在配置中启用变量替换',
  'Kubernetes Secrets': 'Kubernetes 密钥',
  'Kubernetes Namespace for Secret': 'Kubernetes 密钥命名空间',
  'Docker Container Registry Credentials': 'Docker 容器仓库凭证',
  'Docker Registry URL': 'Docker 仓库 URL',
  'Registry Credentials': '仓库凭证',
  'Secret Name': '密钥名称',
  'Show Advanced Settings': '展示高级设置',
  'Config File Path': '配置文件路径',
  'Add another credential': '增加一个凭证',
  'Deploy resources to the Kubernetes cluster': '将资源部署到 kubernetes 集群',
  'Create a credential': '新建凭证',
  'Remote Repository URL': '远程仓库地址',
  'Branch Included': '包括分支',
  'Branch Excluded': '排除分支',
  "The default value here is the current user's kubeconfig.":
    '这里的默认值为当前用户的 kubeconfig',
  'The label on which to run the Pipeline or individual stage':
    '流水线或单个阶段的标签',
  'single Svn': '单分支 SVN',
  WEBHOOK_DESC: '推送消息到此 URL 以触发仓库的重新索引。',
  TIME_TRIGGER_DESC: `某些类型的项目会在收到外部推送消息会自动重新索引。但在某些情况下，消息通知可能失败。
    这个选项将检查指定时间间隔内是否执行了索引，如果没有则触发索引。`,
  'Are you sure to close this pipeline Editor ?': '确定关闭流水线编辑？',
  'Are you sure to close this jenkinsfile Editor ?':
    '确定关闭 jenkinsfile 编辑？',
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
  PIPELINE_PREPAIR_DESC: '正在准备环境，稍后有图形化展示',
  PARAMS_DESC:
    '下列参数是根据流水线设置或 Jenkinsfile 中的 parameters 部分生成的字段，请根据运行需求输入。',
  'Chinese is not allowed in the pipeline configuration':
    '配置中不允许含有中文',
  'Edit Credential': '编辑凭证',
  EDIT_CREDENTIAL_DESC: '下列表单不会显示原有凭证信息，重新输入会将其覆盖',
  'Token / Password': 'token / 密码',
  "Sorry, you don't have the permission to do this.":
    '抱歉，您没有权限进行此操作',
  'Drag and drop tasks to sort': '可以拖拽任务进行排序',
  Unnamed: '未命名',
  'Task failed, not operational': '任务已失败，不可操作',
  'Cancelled in review': '已在审核中取消',
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
  'Enviroment name': '环境变量名',
  expression: '表达式',
  PARAMS_STRING: '字符串参数 (String) ',
  PARAMS_TEXT: '文本 (Text) ',
  PRARMS_BOOLEAN: '布尔值 (Boolean) ',
  PARAMS_CHOICE: '选项参数 (Choice) ',
  PARAMS_PASSWORD: '密码参数 (Password) ',
  critical: '严重',
  blocker: '阻断',
  major: '重要',
  minor: '次要',
  info: '提示',
  Issues: '问题',
  'Code Quality Check': '代码质量检查',
  'Lines of Code': '行数',
  'Code Vulnerability': '代码漏洞',
  CodeSmells: '容易出错',
  Coverage: '覆盖率',
  "Didn't pass": '未通过',
  'Test Result': '检测结果',
  'Code Quality': '代码质量',
  'Line number': '行号',
  'Display All': '展示全部',
  CODE_SMELL: '容易出错',
  BUG: 'Bug',
  VULNERABILITY: '漏洞',
  SECURITY_HOTSPOT: '安全',
  Line: '行',
  'Show only the last 10': '仅显示最近 10 条',
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
  withSonarQubeEnv: 'Sonarqube 配置',
  sh: 'shell 脚本',
  'Git Clone Options': 'Git 克隆参数',
  'clone depth': '克隆深度',
  'Regex filter': '过滤规则',
  REG_FILTER_DESC:
    '启用正则表达式，将忽略与提供的正则表达式不匹配的名称（包括分支与PR等)',
  'Whether to enable shallow clone': '是否开启浅克隆',
  'Pipeline clone timeout (in minutes)': '流水线 clone 超时时间 (单位: 分钟)',
  'config name': '配置名称',
  waitForQualityGate_desc:
    '代码质量检查标准来源于SonarQube的 Quality Gate (质量阈)，如果需要自定义检查标准请前往 SonarQube 设置',
  'Inspection results do not affect subsequent tasks': '检查结果不影响后续任务',
  'Start the follow-up task after the inspection': '检查通过后开始后续任务',
  'Load the sonarqube configuration provided by Jenkins into the Pipeline.':
    '将 Jenkins 中的 sonarqube 配置加载到流水线中',
  PIPELINE_CREATE_DESC: '初始化完成后将开始 Pipeline 的任务执行',
  'Pipeline initialization': 'Pipeline 初始化中',
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
  Queued: '队列中',
  PIPELINE_QUEUED_TITLE: 'Pipeline 即将进行初始化',
  PIPELINE_QUEUED_DESC:
    '您需要等待 agent 启动并执行流水线（注：如 agent 长时间没有启动请检查 agent 配置和集群资源情况）',
  pipeline_owner: 'DevOps 工程的所有者，可以进行 DevOps 工程的所有操作',
  pipeline_maintainer:
    'DevOps 工程的主要维护者，可以进行工程内的凭证配置、Pipeline 配置等操作',
  pipeline_developer: 'DevOps 工程的开发者，可以进行 Pipeline 的触发以及查看',
  pipeline_reporter: 'DevOps 工程的观察者，可以查看 Pipeline 的运行情况',
  'sonar is the default config name.': '默认配置名称是 sonar',
  credentialsId: '凭证 ID',
  enableConfigSubstitution: '启用变量替换',
  configs: '配置',
  secretNamespace: '密钥命名空间',
  secretName: '秘钥名称',
  dockerCredentials: 'Docker 容器仓库凭证',
  passwordVariable: '密码变量',
  usernameVariable: '用户名变量',
  keyFileVariable: '私钥变量',
  passphraseVariable: '密码变量',
  'No branches found': '未发现任何分支',
  LoadPrevData_Desc: '检测到此流水线上次未编辑成功，是否加载上次数据继续编辑？',
  Continue: '继续编辑',
  Discard: '忽略',
  'Jenkinsfile syntax error, message': 'Jenkinsfile 语法错误，消息',
  PATTERN_PIPELINE_NAME_VALID_NAME_TIP:
    '名称不合法 （仅支持大小写字母、数字、_、-）',
  WRONG_GITHUB_TOKEN_DESC: `Token 错误
  <a
    class="float-right"
    href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
    target="_blank"
  >
    重新获取 Token
  </a>`,
  GET_GITHUB_TOKEN_DESC: `用于获取 GitHub 代码仓库
  <a
    class="float-right"
    href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
    target="_blank"
  >
    获取 Token
  </a>`,
  bitbucket_server_ACCESSTOKEN_PLACEHOLDER: '请输入 BitBucket 帐户信息',
  github_ACCESSTOKEN_PLACEHOLDER: '请输入 GitHub access token',
  'url is invalid': 'url 不合法',
  'pipeline syntax error': '流水线语法错误',
  PIPELINES_FOOTER_SEE_MORE: '前往分支详情页查看更多 →',
  CRON_DESC: '上次运行时间 {lastTime}, 下次运行时间 {nextTime}.',
  'not support edit nested stage': '暂不支持编辑嵌套阶段',
  JENKINS_LINS_ERROR: '第 {line} 行有语法错误',
  'Delete all resources of the deployment file': '删除部署文件所对应的所有资源',
  'Pipeline event trigger': '流水线事件触发',
  'When Create Pipeline': '当创建流水线',
  'When Delete Pipeline': '当删除流水线',
  WHEN_DELETE_PIEPLINE_DESC:
    '当有流水线被删除时，将自动触发指定流水线中的任务。',
  WHEN_CHRETE_PIEPLINE_DESC:
    '当有创建新的流水线时，将自动触发指定流水线中的任务。',
  'select a pipeline': '选择一个流水线',
  timer: '定时器',
  'Started By {name}': '由{name}触发扫描',
  'Credential ID exists': '凭证 ID 已存在',
  'Invalid credential ID': '凭证 ID 格式不合法',
  CI: '持续集成 (CI)',
  CI_DESC:
    '持续集成（CI）是在源代码变更后自动检测、拉取、构建和（在大多数情况下）进行单元测试的过程。',
  CICD: '持续集成&交付 (CI/CD)',
  CICD_DESC:
    '持续部署（CD）是指能够自动提供持续交付管道中发布版本给最终用户使用的想法。根据用户的安装方式，在云环境中自动部署、app 升级（如手机上的应用程序）、更新网站或只更新可用版本列表。',
  CUSTOM_PIPELIEN: '自定义流水线',
  CUSTOM_PIPELIEN_DESC: '您可以选择您需要的任务自定义流水线的工作内容',
  'Copy Pipeline': '复制流水线',
  'Batch Run Start': '批量运行开始',
  'Batch Run Success': '批量运行完成',
  'Batch Run Fail': '批量运行失败',
  'Run Start': '运行开始',
  'GitLab Server': 'Gitlab 服务',
  'GitLab Owner': '项目所属组',
  CREATE_PIPELINE_DESC: '使用流水线进行构建，测试和部署',
  'Choose a Pipeline Template': '选择流水线模板',
  BATCH_RUN_DESC: '多分支不支持批量运行',
  'Sync Status': '同步状态',
}
