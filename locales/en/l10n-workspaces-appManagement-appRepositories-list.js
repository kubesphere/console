/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  APP_REPOSITORY_PL: 'App Repositories',
  APP_REPO: 'App Repositories',
  HOW_TO_USE_APP_REPO_Q: 'How do I use an app repository?',
  HOW_TO_USE_APP_REPO_A:
    'You need to go to your project in the workspace. When you deploy a new app, select " From App Template " and then choose an app repository in the drop-down list to deploy an app in the repository.',
  APP_REPO_DESC:
    'An app repository is a repository used to store application templates. You can add an app repository to deploy and manage its applications.',
  // List
  APP_REPOSITORY_EMPTY_DESC: 'Please add an app repository.',
  APP_REPO_STATUS_SUCCESSFUL: 'Successful',
  APP_REPO_STATUS_FAILED: 'Failed',
  APP_REPO_STATUS_SYNCING: 'Syncing',
  APP_REPO_STATUS_NOSYNC: 'Out-sync',
  // List > Add
  ADD_APP_REPO: 'Add App Repository',
  VALIDATE: 'Validate',
  SYNC_INTERVAL: 'Sync Interval',
  SYNC_INTERVAL_DESC:
    'Set a synchronization interval. The value range is 3 minutes to 24 hours. The default value 0 indicates no synchronization.',
  SYNC_PERIOD_EMPTY_DESC: 'Please set a synchronization interval.',
  SYNC_INTERVAL_INVALID: 'Invalid value. Please enter 0 or a positive integer. ',
  APP_REPO_URL_DESC: 'The URL needs to be validated before you add or edit an app repository.',
  SYNC_INTERVAL_TIP: 'The value range is 3 minutes to 24 hours. Please enter a valid value.',
  SECONDS: 'Seconds',
  MINUTES: 'Minutes',
  HOURS: 'Hours',
  UNRECOGNIZED_URL: 'Unrecognized URL.',
  INVALID_CREDENTIAL_FORMAT: 'Invalid credential format.',
  MISSING_ACCESS_KEY_ID: 'Missing access key ID.',
  MISSING_SECRET_ACCESS_KEY: 'Missing secret access key.',
  S_THREE_ACCESS_DENIED: 'S3 access denied.',
  INVALID_URL_FORMAT: 'Invalid URL format.',
  INVALID_HTTP_SCHEME: 'Invalid HTTP scheme.',
  HTTP_ACCESS_DENIED: 'HTTP access denied.',
  INVALID_HTTPS_SCHEME: 'Invalid HTTPS scheme.',
  INVALID_TYPE: 'Invalid type.',
  INVALID_PROVIDERS: 'Invalid providers.',
  INVALID_REPO_URL: 'Invalid repository URL.',
  INVALID_S_THREE_SCHEME: 'Invalid S3 scheme.',
  // List > Add > URL > s3://
  ACCESS_KEY_ID: 'Access Key ID',
  SECRET_ACCESS_KEY: 'Secret Access Key',
  // List > Edit
  EDIT_APP_REPO: 'Edit App Repository',
  INVALID_URL_DESC: 'Invalid URL.',
  VALID_URL_DESC: 'Valid URL.',
  // List > Delete
  APP_REPOSITORY: 'App Repository',
  APP_REPOSITORY_LOW: 'app repository',
};
