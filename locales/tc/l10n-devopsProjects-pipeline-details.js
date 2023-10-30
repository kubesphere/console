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
  CODE_REPOSITORY: '代碼倉庫',
  // Attributes
  TASK_STATUS: '運行狀態',
  NOT_RUNNING: '未運行',
  QUEUED: '列隊中',
  ABORTED: 'Aborted',
  UNSTABLE: 'Unstable',
  SKIPPED: '已跳過',
  NOT_BUILT: 'Not built',
  SYNC_STATUS: '同步狀態',
  DEVOPS_PROJECT: 'DevOps 项目',
  // More > Edit Settings
  // More > Scan Repository
  SCAN_REPO_SUCCESSFUL: '掃描倉庫觸發成功',
  // More > View Scan Logs
  VIEW_SCAN_LOGS: 'View Scan Logs',
  STARTED_BY_NAME: '由{name}觸發掃描',
  REPOSITORY_SCAN_LOGS: '掃描倉庫紀錄',
  RESCAN: '重新掃描',
  LOGS_OBTAINED_SUCCESSFULLY: '掃描紀錄成功。',
  // Health Status
  HEALTH_STATUS_SCAP: 'Health status',
  // Task Status
  PIPELINE_QUEUED_TITLE: 'Pipeline 即將進行初始化',
  INITIALIZING_PIPELINE: 'Pipeline 初始化中',
  PIPELINE_PREPARE_DESC: '正在準備環境，稍後有圖形化顯示',
  INITIALIZING_PIPELINE_DESC: 'Please wait until the pipeline initialization is complete.',
  TASK_FAILED_NOT_OPERATIONAL: '任務已失敗，不可操作',
  NO_PIPELINE_CONFIG_FILE_TIP: '未找到流水線配置文件',
  // Task Status > Edit Pipeline
  EDIT_PIPELINE: '編輯流水線',
  JENKINS_UNAVAILABLE: 'Jenkins is unready.',
  AGENT_TYPE_DESC: `Agent 部分指定整個 Pipeline 或特定階段將在 Jenkins 還境中執行的位置，
    具體取決於該 agent 部分的放置位置。該部分必須在流水線塊内的頂層定義，但 stage 級使用是可選的。`,
  NOT_VALID_REPO: 'Code repo is not valid and cannot be created',
  CREATE_PIPELINE_DESC: '使用流水線進行構建，測試和部署',
  CI: '持續集成 (CI)',
  CI_DESC: '持續集成（CI）是在源代碼變更後自動檢測、拉取、構建和（在大多數情況下）進行單元測試的過程。 ',
  CICD: '持續集成&交付 (CI/CD)',
  CICD_DESC: '持續部署（CD）是指能夠自動提供持續交付管道中發布版本給最終用戶使用的想法。根據用戶的安裝方式，在雲環境中自動部署、app 升級（如手機上的應用程序）、更新網站或只更新可用版本列表。 ',
  CUSTOM_PIPELIEN: '自定義流水線',
  CUSTOM_PIPELIEN_DESC: '您可以選擇您需要的任務自定義流水線的工作內容',
  CC: '副本',
  CREDENTIAL_NAME: '憑證 ID',
  REMOTE_REPOSITORY_URL: '遠程倉庫地址',
  SCM: '代碼倉庫',
  INPUT_MESSAGE_DESC: '流水線運行狀態中將會顯示此訊息',
  KUBERNETES_DEPLOY_DESC: `在 kubernetes 集群中進行部署，在持續集成/持續部署的環境當中，
    只有那些需要定期更新的資源才應該放到部署步驟當中，所以此步驟大多數時間都在處理部署這類資源.`,
  KUBERNETES_DEPLOY_DESC_MORE: `<br />
    <label>該步驟主要有以下特點:</label>
    <li>無需 kubectl 的情況下實現部署</li>
    <li>Jenkinsfile 中的變量替換，可以進行動態部署。</li>
    <li>支持從私有鏡像倉庫拉取 Docker 鏡像</li>
    <label>目前該步驟支持以下資源:</label>
    <br />
    <li>配置</li>
    <li>密鑰</li>
    <li>部署</li>
    <li>守護進程集</li>
    <li>應用路由</li>
    <li>名稱空間</li>
    <li>任務</li>
    <li>服務</li>
    <li>Replica Set</li>
    <li>
      Replication
      Controller (不支持滾動更新，如果要使用滾動更新請使用部署)
    </li>`,
  STAGE: '階段',
  KUBERNETES_DEPLOY_DEPRECATED_TIP: '該步驟會在後續版本中棄用，建議考慮其他替代方案。',
  ORIGINAL_IMAGE_ADDRESS: 'Original Image Address',
  NEW_IMAGE_ADDRESS: 'New Image Address',
  NEW_IMAGE_TAG: 'New Image Tag',
  CD_STEP_DESC: 'Update image information using continuous deployment.',
  UPDATE_CD_TITLE: 'Continuous Deployment of Updates',
  // Task Status > Edit Jenkinsfile
  EDIT_JENKINSFILE: '編輯 Jenkinsfile',
  CLOSE_JENKINSFILE_EDITOR_TIP: '確定關閉 Jenkinsfile 編輯器？',
  // Task Status > View Logs
  PIPELINE_RUN_LOGS: '流水線運行紀錄',
  VIEW_LOGS: '查看紀錄',
  DURATION_VALUE: 'Duration: {value}',
  DOWNLOAD_LOGS: '下载紀錄',
  // Task Status > View Logs > View Logs
  START_REAL_TIME_LOG: '開始實時紀錄',
  STOP_REAL_TIME_LOG: '關閉實時紀錄',
  // Run Records
  RUN_RECORDS: 'Run Records',
  RUN: '運行',
  ACTIVITY_EMPTY_TIP: '目前 Pipeline 還沒有運行',
  COMMIT: '提交',
  LAST_MESSAGE: '最後訊息',
  RUN_ID: 'Run ID',
  STOP_PIPELINE_SUCCESSFUL: '任務已停止，狀態稍後更新',
  INVALID_JENKINSFILE_TIP: '目前 Jenkinsfile 不是標準的聲明式 Jenkinsfile，無法進行圖形化顯示',
  PAUSED: '已暫停',
  // Run Records > Run
  SET_PARAMETERS: '輸入參數',
  PARAMS_DESC: `The following parameters are generated based on the pipeline settings or
     the parameters section of the Jenkinsfile, which are entered according to operational requirements.`,
  PIPELINE_RUN_START_SI: 'Starts to run the pipeline...',
  PIPELINE_RUN_START_PL: 'Starts to run the pipelines...',
  // Run Records > Run Record Details > Details
  // Run Records > Run Record Details > Task Status
  BREAK: '終止',
  PROCEED: '繼續',
  WAITING_FOR_INPUT: '等待輸入',
  CANCELLED_IN_REVIEW: '已在審核中取消',
  STEPS_COMPLETE_TOTAL: 'Steps: {complete}/{total}',
  // Run Records > Run Record Details > Commits
  COMMIT_PL: '提交',
  AUTHOR: '作者',
  NO_COMMIT_FOUND: '沒有提交紀錄',
  // Run Records > Run Record Details > Artifacts
  ARTIFACT_PL: '成品',
  NO_ARTIFACT_FOUND_TIP: '沒有成品紀錄',
  SIZE: '大小',
  // Run Records > Run > Set Parameters
  // Branches
  BRANCH_SI: '分支',
  BRANCH_PL: 'Branches',
  SCAN_REPOSITORY: '掃描遠程分支',
  PIPELINE: '流水線',
  NO_BRANCHES_FOUND: 'No Branches Found',
  // Branches > Code Check
  CODE_CHECK: '代碼質量',
  BUG_PL: 'Bugs',
  VULNERABILITY_PL: '代碼漏洞',
  CODE_SMELL_PL: '容易出錯',
  CODE_LINE_COUNT: '行數',
  COVERAGE: '覆蓋率',
  TEST_RESULTS: '檢測結果',
  ISSUE_PL: '問題',
  CRITICAL: '危險告警',
  MAJOR: 'Major',
  MINOR: 'Minor',
  DISPLAY_ALL: '顯示全部',
  DISPLAY_ONLY_LAST_TEN: '僅顯示最近 10 條',
  LINE_VALUE: '行：{value}',
  PASSED: '已通過',
  // Pull Requests
  PULL_REQUEST_PL: '拉取請求',
  FAILED_CHECK_SCRIPT_COMPILE: 'Failed to check script compiling. If you want to skip the step, click Continue.',
  // detail page // Create Pipeline modal // add step modal 
  IMPORT_FROM_CODE_REPO: 'Import From Code Repository',
  //Create pipeline modal -> Custom Pipeline
  General: 'General',
  Container: 'Container',
  Review: 'Review',
  URL: 'URL',
  'Credential Name': '憑證 ID',
  Branch: '分支',
  'SVN URL': 'SVN URL',
  'Credential Name': '憑證 ID',
  'The message to print': 'Message to Print',
  'Shell command line': 'Shell command line',
  //   Recipient: 'Recipient',
  //   CC: 'CC',
  //   Subject: 'Subject',
  Body: 'Body',
  'Credential Name': '憑證 ID',
  //   'Username Variable': 'Username Variable',
  //   'Password Variable': 'Password Variable',
  Variable: 'Variable',
  'KeyFile Variable': 'KeyFile Variable',
  'Passphrase Variable': 'Passphrase Variable',
  'Artifacts Location': 'Artifacts Location',
  Time: '時間',
  Unit: 'Unit',
  //   'Timeout after no activity in logs for this block':
  // 'Timeout after no activity in logs for this block',
  'Groovy script': 'Groovy script',
  'Target Pipeline Name': 'Target Pipeline Name',
  'Quiet Period': 'Quiet Period',
  'Wait For Completion': 'Wait for completion',
  'Propagate Errors': 'Propagate errors',
  'Error Message': 'Error Message',
  Time: '時間',
  Unit: 'Unit',
  'Test Results Location': 'Location of Test Results',
  'Allow Empty Results': 'Allow empty results',
  'Keep Long Output': 'Retain long output',
  'Skip Publishing Checks': 'Skip publishing checks',
  'Retry Count': 'Retry Times',
  Message: '訊息',
  Submitter: 'Submitter',
  'Config Name': 'Configuration Item',
  'AbortPipeline if quality gate status is not green': 'Abort the pipeline if quality gate status is not green',
  'Container Name': '容器名稱',
  'Continuous Deployments': 'Continuous Deployment',
  Branch: '分支',
  'Original Image Address': 'Original Image Address',
  'New Image Address': 'New Image Address',
  'New Image Tag': 'New Image Tag',
  Credential: '憑證',
  // detail page -> pipeline configuration tab
  PIPELINE_CONFIGURATION: 'Pipeline Configurations',
  Replay: 'Replay',
  BRANCH_DISABLED_NOT_REPLAY: 'The branch has been disabled and cannot be replayed.',
  // detail page // run log // task status
  RUN_LOGS: 'Run Logs',
  VIEW_FULL_LOG: 'View Full Logs',
  VIEW_REAL_TIME_LOG: 'View Real-time Logs',
  // detail page // run log // task status // pipeline log modal
  PIPELINE_LOG: 'Pipeline Logs',
  // detail page // Create Pipeline modal // add step modal
  IMPORT_FROM_CODE_REPO: 'Import From Code Repository',
  // detail page // parameters tab
  NO_BUILD_PARAMETERS: '未發現構建參數。',
};