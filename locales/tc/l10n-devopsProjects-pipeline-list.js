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
  PIPELINE_PL: '流水線',
  // List
  HEALTH: '健康狀態',
  PULL_REQUEST_COUNT: '拉取請求',
  MULTI_BRANCH_PIPELINE: 'Multi-branch Pipeline',
  HEALTHY: '健康',
  SUB_HEALTHY: '亞健康',
  NO_STATUS: '沒有狀態',
  BRANCH_COUNT: '分支數量',
  PIPELINE_EMPTY_DESC: 'Please create a pipeline.',
  // List > Run
  BATCH_RUN_SUCCESS_SI: 'The pipeline was run successfully.',
  BATCH_RUN_SUCCESS_PL: 'The pipelines were run successfully.',
  BATCH_RUN_UNSUPPORTED_DESC: '多分支流水線不支持批量運行。',
  // List > Edit
  // List > Copy
  COPY: 'Copy',
  COPY_PIPELINE: '複製流水線',
  PIPELINE_NAME_DESC: '流水線的名稱，同一個項目内 Pipeline 不能重名。',
  PIPELINE_NAME_TIP: '請輸入流水線名稱。',
  // List > Delete
  // List > Create
  CREATE_PIPELINE: '創建流水線',
  // List > Create > Basic Information
  GO_CREATE_REPO_ACTION: 'No code repository is available. Please <span class="text-action">create a code repository.</span>',
  PIPELINE_TYPE: 'Pipeline Type',
  SELECT_CODE_REPOSITORY: '選擇代碼倉庫',
  BRANCH_PIPELINE_DESC: 'Describe the software build process with visual orchestration or Jenkinsfile.',
  MULTI_BRANCH_PIPELINE_DESC: 'Create a series of pipelines for each branch detected in the source code management (SCM) repository.',
  PIPELINE_CREATE_DEVOPS_PROJECT_DESC: 'Select the DevOps project to which the pipeline belongs.',
  CODE_REPOSITORY_OPTIONAL: '代碼倉庫（可選）',
  CODE_REPOSITORY_REQUIRED: '代碼倉庫',
  CODE_REPOSITORY_REQUIRED_DESC: 'Please select a code repository.',
  GO_CREATE_REPO: 'No code repository is available. Please create a code repository.',
  CODE_REPO_EXISTS: 'code repository already exists',
  SELECT_CODE_REPO_DESC: '請選擇一個代碼倉庫作為流水線的代碼來源。',
  RESELECT: '重新選擇',
  // List > Create > Basic Information > Code Repository > GitHub
  CREDENTIAL_SI: '憑證',
  CREDENTIAL: '憑證',
  PIPELINE_CREDENTIAL_EMPTY_TIP: 'Please select a credential.',
  SELECT_CREDENTIAL_DESC: '獲取倉庫代碼可能需要憑證, 選擇已有憑證或添加一個新的憑證。',
  GITHUB_CREDENTIAL_EMPTY: '請輸入 GitHub 訪問令牌。',
  INCORRECT_GITHUB_TOKEN_DESC: `Token 錯誤
  <a
    class="float-right"
    href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
    target="_blank"
  >
    重新獲取 Token
  </a>`,
  LOAD_MORE: '載入更多',
  NO_REPO_FOUND_DESC: 'No code repository is found.',
  // List > Create > Basic Information > Code Repository > GitLab
  GITLAB_SERVER_ADDRESS: 'Gitlab 服務',
  GITLAB_SERVER_EMPTY_TIP: 'Please enter the address of a GitLab server.',
  PROJECT_GROUP_OWNER: 'GitLab 項目所屬組',
  PROJECT_GROUP_OWNER_EMPTY_TIP: 'Please enter the name of a GitLab project group or project owner.',
  REPOSITORY_NAME: '倉庫名稱',
  REPOSITORY_NAME_EMPTY_TIP: 'Please enter the name of a repository name.',
  // List > Create > Basic Information > Code Repository > Bitbucket
  BITBUCKET_SERVER_ADDRESS: 'Bitbucket Server Address',
  BITBUCKET_SERVER_EMPTY_TIP: 'Please enter the address of a Bitbucket server.',
  INCORRECT_USERNAME_OR_PASSWORD: '用戶名或密碼錯誤',
  BITBUCKET_SERVER_CREDENTIAL_EMPTY: '請輸入 BitBucket 帳號資訊。',
  BITBUCKET_ADDRESS_EMPTY_TIP: 'Please enter the address of a Bitbucket server.',
  BITBUCKET_ADDRESS_INVALID_TIP: 'Invalid Bitbucket server address.',
  // List > Create > Basic Information > Code Repository > Git
  CODE_REPOSITORY_ADDRESS_DESC: '請使用包含 Jenkinsfile 的倉庫。',
  CODE_REPOSITORY_ADDRESS_EMPTY_TIP: 'Please enter the address of a code repository.',
  CODE_REPOSITORY_ADDRESS: '倉庫 URL',
  // List > Create > Basic Information > Code Repository > SVN
  SINGLE_SVN: '單分支 SVN',
  SVN: 'SVN',
  BRANCH_EXCLUDED: '排除分支',
  BRANCH_INCLUDED: '包括分支',
  // List > Create > Advanced Settings
  DELETE_OUTDATED_BRANCHES: '丢棄舊的流水線',
  DELETE_OUTDATED_BRANCHES_TIP: 'Set the system to automatically delete outdated branches to save disk space.',
  BRANCH_SETTINGS: ' 流水線設置',
  BRANCH_RETENTION_PERIOD_DAYS: '保留流水線的天數',
  MAXIMUM_BRANCHES: '保留流水線的最大個數',
  BRANCH_RETENTION_PERIOD_DAYS_DESC: '達到保留天數的流水線將被刪除，默認值為 7。',
  MAXIMUM_BRANCHES_DESC: '如果流水線數量超過保留的最大數量，將丟棄舊的分支。默認值為 5。',
  ADD_STRATEGY: 'Add Strategy',
  DISCOVER_TAG_BRANCHES: '發現 Tag 分支',
  DISCOVER_BRANCHES: '發現分支',
  ALL_BRANCHES: '所有分支',
  ONLY_PR_BRANCHES: '只有被提交為 PR 的分支',
  EXCLUDE_PR_BRANCHES: '排除作為 PR 提交的分支',
  ENABLE_TAG_BRANCH_DISCOVERY: '啟用發現 Tag 分支',
  DISABLE_TAG_BRANCH_DISCOVERY: '停用發現 Tag 分支',
  PULL_STRATEGY: '拉取策略',
  OPTIONS_PR_PARAMS_1: 'PR 與目標分支合併後的源代碼版本',
  OPTIONS_PR_PARAMS_2: 'PR 本身的源代碼版本',
  OPTIONS_PR_PARAMS_3: 'Create two pipelines respectively',
  REGEX: '過濾規則',
  FILTER_BY_REGEX: '根據名稱過濾（正則匹配）',
  FILTER_BY_REGEX_DESC: '啟用正則表達式，將忽略與提供的正則表達式不匹配的名稱（包括分支與PR等)',
  SCRIPT_PATH: '腳本路徑',
  SCRIPT_PATH_DESC: '指定 Jenkinsfile 在源代碼倉庫的位置。',
  SCAN_TRIGGER: '倉庫掃描觸發器',
  SCAN_PERIODICALLY: '如果沒有掃描觸發，則定期掃描',
  TIME_TRIGGER_DESC: 'Scan the code repository periodically.',
  SCAN_INTERVAL: '掃描時間間隔',
  SELECT_PIPELINE_SCAP: '選擇一個流水線。',
  WHEN_DELETE_PIPELINE_DESC: '當有流水線被刪除時，將自動觸發指定流水線中的任務。',
  WHEN_CREATE_PIPELINE_DESC: '當創建新的流水線時，將自動觸發指定流水線中的任務。',
  PIPELINE_EVENT_TRIGGER: '流水線事件觸發器',
  WHEN_CREATE_PIPELINE: '創建流水線',
  WHEN_DELETE_PIPELINE: '當刪除流水線',
  CLONE_SETTINGS: 'Git 克隆參數',
  CLONE_TIMEOUT_PERIOD: '流水線克隆超時時間（單位：分鐘）',
  CLONE_DEPTH: '克隆深度',
  ENABLE_SHALLOW_CLONE: '開啟淺克隆',
  WEBHOOK_PUSH_URL: 'Webhook 推送 URL',
  WEBHOOK_PUSH_DESC: '推送訊息到此 URL 以觸發倉庫的重新索引。',
  TRUSTED_USERS: '可信任用戶',
  CONTRIBUTORS: '貢獻者',
  EVERYONE: '所有人',
  NOBODY: '無',
  USERS_WITH_PERMISSION: '管理員或有編輯權限的用戶',
  // List > Create > Advanced Settings (no repo specified)
  OPTIONS: '備用選項',
  BUILD_SETTINGS: '構建設置',
  DELETE_OUTDATED_BUILD_RECORDS: '丢棄舊的構建',
  DELETE_OUTDATED_BUILD_RECORDS_TIP: `Set the system to automatically delete outdated build records including console output, archived artifacts, and metadata to save disk space.`,
  BUILD_RECORD_RETENTION_PERIOD_DAYS: '保留構建的天數',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_DESC: '達到保留天數的構建將被刪除，默認值為 7。',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_INVALID_TIP: 'The retention period must be a positive integer.',
  MAXIMUM_BUILD_RECORDS: '保留構建的最大個數',
  MAXIMUM_BUILD_RECORDS_DESC: '如果構建超過保留的最大數量，將丟棄舊的構建。默認值為 10。',
  MAXIMUM_BUILD_RECORDS_INVALID_TIP: 'The maximum number of build records must be a positive integer.',
  NO_CONCURRENT_BUILDS: '不允許並發構建',
  NO_CONCURRENT_BUILD_DESC: '如果勾選此選項，則不能同時運行多個構建。',
  BUILD_PARAMETERS: '參數化構建',
  BUILD_PARAMETERS_TIP: 'Pass build parameters to the pipeline.',
  PARAMS_STRING: '字符串參數 (String) ',
  PIPELINE_PARAM_DEFAULT_DESC: '指定字段的預設值，您也可以在手動運行流水線前修改預設值。',
  PARAMS_TEXT: '文本 (Text) ',
  PARAMS_TEXT_TCAP: '字符串參數 (String) ',
  PARAMETER_DESCRIPTION_DESC: '參數的描述。',
  PARAMS_BOOLEAN: '布林值 (Boolean) ',
  PARAMS_CHOICE: '選項參數 (Choice) ',
  CHOICE_PARAM_OPTION_DESC: '備用選擇，每行一個。第一行的將作為預設選項。',
  PARAMS_PASSWORD: '密碼參數 (Password) ',
  BUILD_TRIGGER: '構建觸發器',
  BUILD_PERIODICALLY: '定時構建',
  BUILD_PERIODICALLY_TIP: '提供類似 cron 的功能來定期執行此流水線。',
  PIPELINE_CRON_DESC: '上次運行時間 {lastTime}，下次運行時間 {nextTime}。',
  PIPELINE_SCHEDULE_DESC: 'Enter a CRON expression to set a schedule. <a href="//jenkins.io/doc/book/pipeline/syntax/#cron-syntax" target="_blank">Learn More</a>',
  DEFAULT_VALUE: '預設值',
  PARAMETER_NAME_EMPTY_DESC: 'Please set the parameter name.',
  SELECT_TEMPLATE: 'Select template',
  PARAMETER_CONFIG: 'Parameter configuration',
  PREVIEW: 'Preview',
  EMPTY_PARAMS_CONFIG: 'This operation does not require parameter configuration.',
  PIPELINE_VALIDATOR_DESC: 'Please select a pipeline template.'
};