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
  // Edit Information
  CODE_REPOSITORY: '代码仓库',
  // Attributes
  TASK_STATUS: '任务状态',
  NOT_RUNNING: '未运行',
  QUEUED: '队列中',
  ABORTED: '已取消',
  UNSTABLE: '未稳定',
  SKIPPED: '已跳过',
  NOT_BUILT: '未构建',
  SYNC_STATUS: '同步状态',
  DEVOPS_PROJECT: 'DevOps 项目',
  // More > Edit Settings
  // More > Scan Repository
  SCAN_REPO_SUCCESSFUL: '仓库扫描触发成功。',
  // More > View Scan Logs
  VIEW_SCAN_LOGS: '查看扫描日志',
  STARTED_BY_NAME: '启动者：{name}',
  REPOSITORY_SCAN_LOGS: '仓库扫描日志',
  RESCAN: '重新扫描',
  LOGS_OBTAINED_SUCCESSFULLY: '日志获取成功。',
  // Health Status
  HEALTH_STATUS_SCAP: '健康状态',
  // Task Status
  PIPELINE_QUEUED_TITLE: '即将完成初始化',
  INITIALIZING_PIPELINE: '流水线初始化中',
  PIPELINE_PREPARE_DESC: '环境准备中...',
  INITIALIZING_PIPELINE_DESC: '请等待流水线初始化完成。',
  TASK_FAILED_NOT_OPERATIONAL: '此阶段已失败且无法操作。',
  NO_PIPELINE_CONFIG_FILE_TIP: '未发现流水线配置文件。',
  // Task Status > Edit Pipeline
  EDIT_PIPELINE: '编辑流水线',
  JENKINS_UNAVAILABLE: 'Jenkins 未就绪。',
  AGENT_TYPE_DESC: `Agent 部分指定整个流水线或特定阶段将在 Jenkins 环境中执行的位置，
      具体取决于该 agent 部分的放置位置。该部分必须在流水线块内的顶层定义，但 stage 级使用是可选的。`,
  NOT_VALID_REPO: '代码仓库无效且无法创建',
  CREATE_PIPELINE_DESC: '使用流水线进行构建，测试和部署',
  CI: '持续集成 (CI)',
  CI_DESC: '持续集成（CI）是在源代码变更后自动检测、拉取、构建和（在大多数情况下）进行单元测试的过程。',
  CICD: '持续集成&交付 (CI/CD)',
  CICD_DESC: '持续部署（CD）是指能够自动提供持续交付管道中发布版本给最终用户使用的想法。根据用户的安装方式，在云环境中自动部署、app 升级（如手机上的应用程序）、更新网站或只更新可用版本列表。',
  CUSTOM_PIPELIEN: '自定义流水线',
  CUSTOM_PIPELIEN_DESC: '您可以选择您需要的任务自定义流水线的工作内容',
  CC: '抄送',
  CREDENTIAL_NAME: '凭证名称',
  REMOTE_REPOSITORY_URL: '远程仓库地址',
  SCM: '代码仓库',
  INPUT_MESSAGE_DESC: '流水线运行状态中将会展示此消息',
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
  STAGE: '阶段',
  KUBERNETES_DEPLOY_DEPRECATED_TIP: '该步骤会在后续版本中弃用，建议考虑其他替代方案。',
  ORIGINAL_IMAGE_ADDRESS: '原镜像地址',
  NEW_IMAGE_ADDRESS: '新镜像地址',
  NEW_IMAGE_TAG: '新镜像标签',
  CD_STEP_DESC: '通过持续部署更新镜像信息。',
  UPDATE_CD_TITLE: '持续部署更新',
  // Task Status > Edit Jenkinsfile
  EDIT_JENKINSFILE: '编辑 Jenkinsfile',
  CLOSE_JENKINSFILE_EDITOR_TIP: '确定禁用 Jenkinsfile 编辑器？',
  // Task Status > View Logs
  PIPELINE_RUN_LOGS: '流水线运行日志',
  VIEW_LOGS: '查看日志',
  DURATION_VALUE: '持续时间：{value}',
  DOWNLOAD_LOGS: '下载日志',
  // Task Status > View Logs > View Logs
  START_REAL_TIME_LOG: '启用实时日志',
  STOP_REAL_TIME_LOG: '禁用实时日志',
  // Run Records
  RUN_RECORDS: '运行记录',
  RUN: '运行',
  ACTIVITY_EMPTY_TIP: '流水线尚未运行。',
  COMMIT: '提交',
  LAST_MESSAGE: '最后消息',
  RUN_ID: '运行 ID',
  STOP_PIPELINE_SUCCESSFUL: '流水线停止成功。',
  INVALID_JENKINSFILE_TIP: '当前 Jenkinsfile 不是标准的声明式 Jenkinsfile，图形化显示不可用。',
  PAUSED: '已暂停',
  // Run Records > Run
  SET_PARAMETERS: '设置参数',
  PARAMS_DESC: `下列参数是根据流水线设置或 Jenkinsfile 中的 parameters 部分生成的字段，请根据运行需求输入。`,
  PIPELINE_RUN_START_SI: '开始运行流水线...',
  PIPELINE_RUN_START_PL: '开始运行流水线...',
  // Run Records > Run Record Details > Details
  // Run Records > Run Record Details > Task Status
  BREAK: '终止',
  PROCEED: '继续',
  WAITING_FOR_INPUT: '等待输入',
  CANCELLED_IN_REVIEW: '已在审核中取消',
  STEPS_COMPLETE_TOTAL: '步骤：{complete}/{total}',
  // Run Records > Run Record Details > Commits
  COMMIT_PL: '提交',
  AUTHOR: '作者',
  NO_COMMIT_FOUND: '未发现提交记录',
  // Run Records > Run Record Details > Artifacts
  ARTIFACT_PL: '制品',
  NO_ARTIFACT_FOUND_TIP: '未发现制品。',
  SIZE: '大小',
  // Run Records > Run > Set Parameters
  // Branches
  BRANCH_SI: '分支',
  BRANCH_PL: '分支',
  SCAN_REPOSITORY: '扫描仓库',
  PIPELINE: '流水线',
  NO_BRANCHES_FOUND: '未找到分支',
  // Branches > Code Check
  CODE_CHECK: '代码检查',
  BUG_PL: '代码错误',
  VULNERABILITY_PL: '代码漏洞',
  CODE_SMELL_PL: '代码异味',
  CODE_LINE_COUNT: '行数',
  COVERAGE: '覆盖率',
  TEST_RESULTS: '检查结果',
  ISSUE_PL: '议题',
  CRITICAL: '严重',
  MAJOR: '重要',
  MINOR: '轻微',
  DISPLAY_ALL: '展示全部',
  DISPLAY_ONLY_LAST_TEN: '仅显示最近 10 条问题。',
  LINE_VALUE: '行：{value}',
  PASSED: '已通过',
  // Pull Requests
  PULL_REQUEST_PL: '拉取请求',
  FAILED_CHECK_SCRIPT_COMPILE: '检查脚本编译失败，如果你想跳过这一步骤，请点击继续按钮'
};