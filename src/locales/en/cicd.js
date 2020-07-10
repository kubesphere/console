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

export default {
  'CI/CD_CREATE_DESC': `Pipeline is a collection of plugins that can be combined 
    to achieve continuous integration and continuous delivery. 
    Pipeline DSL provides us with an extensible set of tools that allow 
    us to implement simple to complex logic through code.`,
  username_password: 'Account Credentials',
  login_Plateform: 'Login platform',
  CREDENTIALS_DESC: `Credential is an object that contains some sensitive data, 
    such as username and password, SSH key and Token.
    It is used to provide authentication for the process of pulling code, 
    pushing/pulling images, executing SSH scripts, etc. when a pipeline is running.`,
  tips_Parametric_build: `The parameterized build process allows 
    you to pass in one or more parameters when you build. 
    For example: You may have a pipeline for publishing software and you 
    want to upload the release notes together. 
    This can be done by adding text parameters here. 
    Each parameter has a Name and a Value, 
    and the value of Value depends on the parameter type. 
    These values can be accessed in the Pipeline using params.Name or Name. 
    This means that each parameter defined here should have a unique name.
    When parameterizing a project, the build is replaced with a parameterized build, 
    which prompts the user to enter a value for each defined parameter. 
    If they choose not to enter anything, 
    the build proceeds with the default value for each parameter. 
    If the project's build is started automatically, for example, by a timed trigger, 
    it will be triggered with the default value of the parameter. `,
  tips_Authentication_token: `Enable this option if you need to 
    trigger a build by accessing a predefined URL. 
    A typical use of this feature is to trigger through the source code 
    management system's hook script. 
    You need to provide an authorization token in the form of a string so that 
    only the person with the authorization token can trigger the remote build.`,
  tips_disable_concurrent: `This will determine when the 
    project's build record should be discarded. 
    Build records include console output, archive artifacts, 
    and other metadata related to a particular build. 
    Keeping less builds saves disk space used by Jenkins. 
    We provide two conditions to determine when the old build should be discarded: 
    1. Number of days to keep the build: 
    The build will be discarded after a certain number of days. 
    2. Number of builds to be kept: 
    If there are already a certain number of builds, discard the oldest build. 
    These two conditions apply to the build at the same time, 
    and if either one is met first, the build will be discarded.`,
  tips_disable_concurrent_withscm: `This will determine when the branch should be discarded and all build records under the branch. 
    The build record includes the console output,
    Archive artifacts and other metadata related to a particular build. 
    Keeping less builds saves disk space used by Jenkins.
    We provide two options to determine when the old branch should be discarded: 
    1. Number of days to keep the branch: If the branch reaches a certain number of days, 
    the branch is dropped.
    2. Number of reserved branches: If a certain number of branches already exist, 
    the oldest branch is discarded. 
    These two options can work on the branch at the same time.
    If any of the limits are exceeded, 
    any branches that exceed this limit will be dropped.`,
  tips_Timing_build:
    'Provides cron-like functionality to perform this project regularly',
  tips_days_keep_withscm: `If the number of days the branch has been retained will be deleted. 
    (Default -1: will delete the branch that has been deleted)`,
  tips_numbers_keep_withscm: `If the number of branches reached the number of reservations will be deleted. 
    (Default value -1: will delete the branches that have been deleted)`,
  tips_timer_trigger: `This field follows the cron syntax (slightly different). 
    Specifically, each line contains 5 fields separated by tabs or spaces. 
    minutes: the first few minutes of an hour (0-59)
    hours: the first few hours of the day (0-23) 
    the days of the month: the first few days of a month (1-31 )  
    Month: The first few days of the first few days (0-12), the first few days of the week (0-12), 
    0 and 7 are Sundays. `,

  CICDS_BASEINFO_DESC: 'Please enter the basic information of the pipeline.',
  CICD_ADVANCE_SETTINGS_DESC:
    'Configure a complex behavior policy for the pipeline (Optional).',
  CREDENTIALS_CREATE_DESC: 'Create credentials for DevOps projects',
  CHECKOUT_DESC: 'Pull code; often used to pull non-git code, such as svn.',
  PRIVATE_IMAGE_DESC: `To deploy from a private image repository, 
    you need to create a mirrored repository and then pull the image. `,
  AGENT_TYPE_DESC: `The agent section specifies 
    where the entire Pipeline or a particular stage will be executed in the Jenkins environment, 
    depending on where the agent part is placed. 
    This part must be defined at the top level within the pipeline block, 
    but the stage level usage is optional. `,
  AUTHENTICATION_TOKEN_DESC: `Use the following URL to remotely trigger the build: 
    JENKINS_URL / job / JOB_NAME / build? Token =TOKEN_NAME or /buildWithParameters? 
    Token = TOKEN_NAME You can choose to append &cause=reason to provide the text that 
    will be included in the build reason for the record. `,
  ACTIVITY_EMPTY_TIP: 'The current pipeline is not running yet',

  PIPELINE_NO_CONFIG:
    'The relevant configuration file was not found in the current pipeline',
  NOT_VALID_JENKINS_FILE: `The current Jenkinsfile is not a standard declarative Jenkinsfile 
    and cannot be graphically displayed`,
  PIPELINE_CRONJOB_CRON_DESC: `Every hour, on the hour syntax reference 
    <a href="//jenkins.io/doc/book/pipeline/syntax/#cron-syntax" target="_blank">CRON</a>`,
  WEBHOOK_DESC:
    'Push a message to this URL to trigger a reindexing of the repository. ',
  TIME_TRIGGER_DESC: `Some types of items will automatically re-index 
    when they receive an external push message. 
    However, in some cases, message notifications may fail. 
    This option will check if the index has been executed within the specified time interval, 
    and if not, trigger the index. `,

  KUBERNETES_DEPLOY_DESC: `Deploy resources on a Kubernetes cluster. 
    In a continuous integration or continuous deployment environment, 
    only those resources that need to be updated regularly should be placed in the deployment step. 
    Therefore, this step is mostly used to process the deployment of such resources.`,
  KUBERNETES_DEPLOY_DESC_MORE: `<br />
  <label>This step has the following main features:</label>
  <li>Distribution without kubectl</li>
  <li>Variable substitution in Jenkinsfile, Dynamic deployment is possible. </li>
  <li>Support for drawing docker images from private image repositories</li>
  <label> Currently this step supports the following resources:</label>
  <br />
  <li>Configuration </li>
  <li>Key</li>
  <li>Deploy</li>
  <li>Dave Process Set</li>
  <li>App Routing</li>
  <li>Namespace</li>
  <li>Task</li>
  <li>Service</li>
  <li>Replica Set</li>
  <li>
  Replication
  Controller (rolling updates are not supported, use deployment if you want to use rolling updates)
  </li>`,

  OPTIONS_PR_PARAMS_1: 'Source code version of PR merged with target branch',
  OPTIONS_PR_PARAMS_2: 'Source code version of PR itself',
  OPTIONS_PR_PARAMS_3: `Two pipelines are created when PR is discovered.
    A pipeline uses the source code version of PR itself,
    A pipelined version of the source code merged with the target branch using PR`,

  ADD_NEW_CREDENTIAL_DESC:
    'Obtaining repository code may require credentials. Please select an existing credential or add a new one.',
  PIPELINE_PREPAIR_DESC:
    'The environment is being prepared. There will be a graphical display later.',
  PARAMS_DESC: `The following parameters are generated based on the pipeline settings or
     the parameters section of the Jenkinsfile, which are entered according to operational requirements.`,
  EDIT_CREDENTIAL_DESC:
    'The following form will not display the original credential information. Re-entering it will overwrite it.',
  pipeline_conditions: 'Conditions',
  PARAMS_STRING: 'String',
  PARAMS_TEXT: 'Text',
  PRARMS_BOOLEAN: 'Boolean',
  PARAMS_CHOICE: 'Choice',
  PARAMS_PASSWORD: 'Password',
  CODE_SMELL: 'Code Smell',
  BUG: 'Bug',
  VULNERABILITY: 'Vulnerability',
  SECURITY_HOTSPOT: 'Security Hotspot',
  REG_FILTER_DESC:
    'Enable regular expressions, ignoring names that do not match the provided regular expression (including branches and PR, etc.)',
  waitForQualityGate_desc:
    "Code quality check standards are derived from SonarQube's Quality Gate. If you need to customize the standards, go to SonarQube settings.",
  PIPELINE_DESC:
    "Pipeline's task execution will begin after the initialization is complete.",
  REVIEW_DESC:
    'When the pipeline runs here, this task will be suspended, and you can choose to continue or terminate after the review.',
  INPUT_DESC:
    'When the pipeline runs here, the task will be suspended, and the creator and @somebody can choose to continue or terminate the pipeline.',
  INPUT_MESSAGE_DESC:
    'This message will be displayed in the pipeline running state.',

  withSonarQubeEnv_DESC:
    'Quickly locate potential or obvious errors in your code',
  waitForQualityGate_DESC: 'Executed after performing code analysis',
  script_DESC: 'Execute groovy script',
  PIPELINE_QUEUED_TITLE: 'Pipeline will be initialized soon',
  PIPELINE_QUEUED_DESC:
    'You need to wait for the agent to start and execute the pipeline (note that if the agent has not started for a long time, please check the agent configuration and cluster resources).',
  pipeline_owner:
    'The owner of the DevOps project, with the highest authorization of the project, can perform all operations',
  pipeline_maintainer:
    'The maintainer of the DevOps project can perform credentials and pipeline configuration in the DevOps project',
  pipeline_developer:
    'The developer of the DevOps project can trigger and view the pipeline',
  pipeline_reporter:
    'The Observer of the DevOps project can only view the resources of the project',
  LoadPrevData_Desc:
    'It was detected that this pipeline was not successfully edited last time. Is the last data loaded to continue editing?',
  PATTERN_PIPELINE_NAME_VALID_NAME_TIP:
    "Invalid name (Support uppercase and lowercase letters, numbers, '_' and '-')",
  WRONG_GITHUB_TOKEN_DESC: `Wrong Token
  <a
    class="float-right"
    href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
    target="_blank"
  >
    Get Token
  </a>`,
  GET_GITHUB_TOKEN_DESC: `For accessing GitHub
  <a
    class="float-right"
    href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
    target="_blank"
  >
    Get Token 
  </a>`,

  bitbucket_server_ACCESSTOKEN_PLACEHOLDER:
    'Please input your Bitbucket account information.',
  github_ACCESSTOKEN_PLACEHOLDER: 'Please input your GitHub access token.',
  PIPELINES_FOOTER_SEE_MORE: 'Go to the branch details page to see more.',
  CRON_DESC: 'Would last have run at {lastTime}; would next run at {nextTime}',
  JENKINS_LINS_ERROR: 'has syntax error at line {line}.',
  WHEN_DELETE_PIEPLINE_DESC:
    'When a pipeline is deleted, the tasks in the specified pipeline are automatically triggered.',
  WHEN_CHRETE_PIEPLINE_DESC:
    'When a new pipeline is created, the tasks in the specified pipeline are automatically triggered.',
  'Started By {name}': 'Started By {name}',
}
