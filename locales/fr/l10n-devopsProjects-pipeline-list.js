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
  PIPELINE_PL: 'Pipelines',
  // List
  HEALTH: 'Health',
  PULL_REQUEST_COUNT: 'Pull Requests',
  MULTI_BRANCH_PIPELINE: 'Multi-branch Pipeline',
  HEALTHY: 'Healthy',
  SUB_HEALTHY: 'Sub-healthy',
  NO_STATUS: 'No status',
  BRANCH_COUNT: 'Branches',
  PIPELINE_EMPTY_DESC: 'Please create a pipeline.',
  // List > Run
  BATCH_RUN_SUCCESS_SI: 'The pipeline was run successfully.',
  BATCH_RUN_SUCCESS_PL: 'The pipelines were run successfully.',
  BATCH_RUN_UNSUPPORTED_DESC: 'Multi-branch pipelines cannot run in a batch.',
  // List > Edit
  // List > Copy
  COPY: 'Copy',
  COPY_PIPELINE: 'Copy Pipeline',
  PIPELINE_NAME_DESC: 'The name of the pipeline. Pipelines in the same project must have different names.',
  PIPELINE_NAME_TIP: 'Please enter a pipeline name.',
  // List > Delete
  // List > Create
  CREATE_PIPELINE: 'Create Pipeline',
  // List > Create > Basic Information
  GO_CREATE_REPO_ACTION: 'No code repository is available. Please <span class="text-action">create a code repository.</span>',
  PIPELINE_TYPE: 'Pipeline Type',
  SELECT_CODE_REPOSITORY: 'Select Code Repository',
  BRANCH_PIPELINE_DESC: 'Describe the software build process with visual orchestration or Jenkinsfile.',
  MULTI_BRANCH_PIPELINE_DESC: 'Create a series of pipelines for each branch detected in the source code management (SCM) repository.',
  PIPELINE_CREATE_DEVOPS_PROJECT_DESC: 'Select the DevOps project to which the pipeline belongs.',
  CODE_REPOSITORY_OPTIONAL: 'Code Repository (optional)',
  CODE_REPOSITORY_REQUIRED: 'Code Repository',
  CODE_REPOSITORY_REQUIRED_DESC: 'Please select a code repository.',
  GO_CREATE_REPO: 'No code repository is available. Please create a code repository.',
  CODE_REPO_EXISTS: 'code repository already exists',
  SELECT_CODE_REPO_DESC: 'Select a code repository to be used by the pipeline.',
  RESELECT: 'Reselect',
  // List > Create > Basic Information > Code Repository > GitHub
  CREDENTIAL_SI: 'Credential',
  CREDENTIAL: 'Credential',
  PIPELINE_CREDENTIAL_EMPTY_TIP: 'Please select a credential.',
  SELECT_CREDENTIAL_DESC: 'Select a credential used to access a code repository.',
  GITHUB_CREDENTIAL_EMPTY: 'Please set a GitHub credential.',
  INCORRECT_GITHUB_TOKEN_DESC: `Incorrect GitHub token.
  <a
    class="float-right"
    href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
    target="_blank"
  >
    Obtain GitHub Token
  </a>`,
  LOAD_MORE: 'Load More',
  NO_REPO_FOUND_DESC: 'No code repository is found.',
  // List > Create > Basic Information > Code Repository > GitLab
  GITLAB_SERVER_ADDRESS: 'GitLab Server Address',
  GITLAB_SERVER_EMPTY_TIP: 'Please enter the address of a GitLab server.',
  PROJECT_GROUP_OWNER: 'Project Group/Owner',
  PROJECT_GROUP_OWNER_EMPTY_TIP: 'Please enter the name of a GitLab project group or project owner.',
  REPOSITORY_NAME: 'Code Repository',
  REPOSITORY_NAME_EMPTY_TIP: 'Please enter the name of a code repository.',
  // List > Create > Basic Information > Code Repository > Bitbucket
  BITBUCKET_SERVER_ADDRESS: 'Bitbucket Server Address',
  BITBUCKET_SERVER_EMPTY_TIP: 'Please enter the address of a Bitbucket server.',
  INCORRECT_USERNAME_OR_PASSWORD: 'Incorrect username or password.',
  BITBUCKET_SERVER_CREDENTIAL_EMPTY: 'Please set a Bitbucket server and credential.',
  BITBUCKET_ADDRESS_EMPTY_TIP: 'Please enter the address of a Bitbucket server.',
  BITBUCKET_ADDRESS_INVALID_TIP: 'Invalid Bitbucket server address.',
  // List > Create > Basic Information > Code Repository > Git
  CODE_REPOSITORY_ADDRESS_DESC: 'Use a repository that contains a Jenkinsfile.',
  CODE_REPOSITORY_ADDRESS_EMPTY_TIP: 'Please enter the address of a code repository.',
  CODE_REPOSITORY_ADDRESS: 'Code Repository URL',
  // List > Create > Basic Information > Code Repository > SVN
  SINGLE_SVN: 'Single-branch SVN',
  SVN: 'SVN',
  BRANCH_EXCLUDED: 'Excluded Branches',
  BRANCH_INCLUDED: 'Included Branches',
  // List > Create > Advanced Settings
  DELETE_OUTDATED_BRANCHES: 'Delete outdated branches',
  DELETE_OUTDATED_BRANCHES_TIP: 'Set the system to automatically delete outdated branches to save disk space.',
  BRANCH_SETTINGS: 'Branch Settings',
  BRANCH_RETENTION_PERIOD_DAYS: 'Branch Retention Period (days)',
  MAXIMUM_BRANCHES: 'Maximum Branches',
  BRANCH_RETENTION_PERIOD_DAYS_DESC: 'Branches that exceed the retention period are deleted. The default value is 7.',
  MAXIMUM_BRANCHES_DESC: 'When the number of branches exceeds the maximum number allowed, the earliest branch is deleted. The default value is 5.',
  ADD_STRATEGY: 'Add Strategy',
  DISCOVER_TAG_BRANCHES: 'Discover Tags',
  DISCOVER_BRANCHES: 'Discover Branches',
  ALL_BRANCHES: 'Include all branches',
  ONLY_PR_BRANCHES: 'Include only branches filed as PRs',
  EXCLUDE_PR_BRANCHES: 'Exclude branches filed as PRs',
  ENABLE_TAG_BRANCH_DISCOVERY: 'Enable tag discovery',
  DISABLE_TAG_BRANCH_DISCOVERY: 'Disable tag discovery',
  PULL_STRATEGY: 'Pull Strategy',
  OPTIONS_PR_PARAMS_1: 'Pull the code with the PR merged',
  OPTIONS_PR_PARAMS_2: 'Pull the code at the point of the PR',
  OPTIONS_PR_PARAMS_3: 'Create two pipelines respectively',
  REGEX: 'Regular Expression',
  FILTER_BY_REGEX: 'Filter by Regex',
  FILTER_BY_REGEX_DESC: 'Use a regular expression to filter branches, PRs, and tags',
  SCRIPT_PATH: 'Script Path',
  SCRIPT_PATH_DESC: 'Set the path of the Jenkinsfile in the code repository.',
  SCAN_TRIGGER: 'Scan Trigger',
  SCAN_PERIODICALLY: 'Scan periodically',
  TIME_TRIGGER_DESC: 'Scan the code repository periodically.',
  SCAN_INTERVAL: 'Scan Interval',
  SELECT_PIPELINE_SCAP: 'Select pipeline',
  WHEN_DELETE_PIPELINE_DESC: 'When a pipeline is deleted, the tasks in the specified pipeline are automatically triggered.',
  WHEN_CREATE_PIPELINE_DESC: 'When a new pipeline is created, the tasks in the specified pipeline are automatically triggered.',
  PIPELINE_EVENT_TRIGGER: 'Trigger through pipeline events',
  WHEN_CREATE_PIPELINE: 'Trigger on Pipeline Creation',
  WHEN_DELETE_PIPELINE: 'Trigger on Pipeline Deletion',
  CLONE_SETTINGS: 'Clone Settings',
  CLONE_TIMEOUT_PERIOD: 'Clone Timeout Period (min)',
  CLONE_DEPTH: 'Clone Depth',
  ENABLE_SHALLOW_CLONE: 'Enable shallow clone',
  WEBHOOK_PUSH_URL: 'Webhook Push URL',
  WEBHOOK_PUSH_DESC: 'Push a message to this URL to trigger a scan of the repository. ',
  TRUSTED_USERS: 'Trusted User',
  CONTRIBUTORS: 'Contributors',
  EVERYONE: 'Everyone',
  NOBODY: 'None',
  USERS_WITH_PERMISSION: 'Users with the admin or write permission',
  // List > Create > Advanced Settings (no repo specified)
  OPTIONS: 'Options',
  BUILD_SETTINGS: 'Build Settings',
  DELETE_OUTDATED_BUILD_RECORDS: 'Delete outdated build records',
  DELETE_OUTDATED_BUILD_RECORDS_TIP: `Set the system to automatically delete outdated build records including console output, archived artifacts, and metadata to save disk space.`,
  BUILD_RECORD_RETENTION_PERIOD_DAYS: 'Build Record Retention Period (days)',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_DESC: 'Build records that exceed the retention period are deleted. The default value is 7.',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_INVALID_TIP: 'The retention period must be a positive integer.',
  MAXIMUM_BUILD_RECORDS: 'Maximum Build Records',
  MAXIMUM_BUILD_RECORDS_DESC: 'When the number of build records exceeds the maximum number allowed, the earliest build record is deleted. The default value is 10.',
  MAXIMUM_BUILD_RECORDS_INVALID_TIP: 'The maximum number of build records must be a positive integer.',
  NO_CONCURRENT_BUILDS: 'No concurrent builds',
  NO_CONCURRENT_BUILD_DESC: 'Set the the pipeline to run only one build task at a time.',
  BUILD_PARAMETERS: 'Build Parameters',
  BUILD_PARAMETERS_TIP: 'Pass build parameters to the pipeline.',
  PARAMS_STRING: 'String',
  PIPELINE_PARAM_DEFAULT_DESC: 'Set the default value of the parameter. You can change the value before manually running the pipeline.',
  PARAMS_TEXT: 'Multi-line string',
  PARAMS_TEXT_TCAP: 'Multi-line String',
  PARAMETER_DESCRIPTION_DESC: 'Set the parameter description.',
  PARAMS_BOOLEAN: 'Boolean',
  PARAMS_CHOICE: 'Options',
  CHOICE_PARAM_OPTION_DESC: 'Enter an option in each line. The first line is used as the default option.',
  PARAMS_PASSWORD: 'Password',
  BUILD_TRIGGER: 'Build Trigger',
  BUILD_PERIODICALLY: 'Build periodically',
  BUILD_PERIODICALLY_TIP: 'Set the pipeline to periodically run build tasks.',
  PIPELINE_CRON_DESC: 'The pipeline will be run at {nextTime} next time.',
  PIPELINE_SCHEDULE_DESC: 'Enter a CRON expression to set a schedule. <a href="//jenkins.io/doc/book/pipeline/syntax/#cron-syntax" target="_blank">Learn More</a>',
  DEFAULT_VALUE: 'Default Value',
  PARAMETER_NAME_EMPTY_DESC: 'Please set the parameter name.',
  SELECT_TEMPLATE: 'Select template',
  PARAMETER_CONFIG: 'Parameter configuration',
  PREVIEW: 'Preview',
  EMPTY_PARAMS_CONFIG: 'This operation does not require parameter configuration.',
  PIPELINE_VALIDATOR_DESC: 'Please select a pipeline template.'
};