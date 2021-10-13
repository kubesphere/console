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
  'Add App Repository': 'Add App Repository',
  ADD_APP_REPO: 'Add App Repository',
  'App Repos': 'App Repositories',
  'App Repository': 'App Repository',
  APP_REPOSITORY: 'App Repository',
  APP_REPOSITORY_PL: 'App Repositories',
  APP_REPOSITORY_LOW: 'app repository',
  APP_REPOSITORY_EMPTY_DESC: 'Please add an app repository.',
  EDIT_APP_REPO: 'Edit App Repository',
  'HTTP access denied': 'HTTP access denied.',
  INDEX_REPO: 'Index Repository',
  'Invalid format of credential': 'Invalid credential format.',
  'Invalid format of URL': 'Invalid URL format.',
  'Invalid HTTP Scheme': 'Invalid HTTP scheme.',
  'Invalid HTTPS Scheme': 'Invalid HTTPS scheme.',
  'Invalid Providers': 'Invalid providers.',
  'Invalid Repo URL': 'Invalid repository URL.',
  'Invalid S3 Scheme': 'Invalid S3 scheme.',
  'Invalid type': 'Invalid type.',
  INVALID_URL_DESC: 'Invalid URL.',
  VALID_URL_DESC: 'Valid URL.',
  'Missing access key ID': 'Missing access key ID.',
  'Missing secret access key': 'Missing secret access key.',
  'Please input access key ID and secret access key':
    'Please enter an access key ID and secret access key.',
  WEBHOOK_URL_DESC: 'Please enter a webhook URL.',
  'S3 access denied': 'S3 access denied.',
  Synchronize: 'Synchronize',
  syncing: 'syncing',
  'Unrecognized URL': 'Unrecognized URL.',
  VALIDATE: 'Validate',

  SYNC_INTERVAL: 'Synchronization Interval',
  SYNC_INTERVAL_DESC:
    'Set a synchronization interval. The value range is 180 to 86400 seconds, and the default value is 0.',
  SYNC_PERIOD_EMPTY_DESC: 'Please set a synchronization interval.',
  SYNC_INTERVAL_INVALID:
    'Invalid value. Please enter 0 or a positive integer. ',

  'App Repositorys': 'App Repositories',
  APP_REPO_URL_DESC:
    'The URL needs to be validated before you add or edit an app repository.',
  APP_REPOSITORY_CREATE_DESC:
    'You can add third-party repositories that contain Helm-based Kubernetes apps.',
  APP_REPO_DESC:
    'An app repository is a repository used to store application templates. You can add an app repository to deploy and manage its applications.',

  HOW_TO_USE_APP_REPO_Q: 'How do I use an app repository?',
  HOW_TO_USE_APP_REPO_A:
    'You need to go to your project in the workspace. When you deploy a new app, select <b>From App Template</b> and then choose an app repository in the drop-down list to deploy an app in the repository.',

  // App Repositories > Details
  SYNC_INTERVAL_TIP:
    'The value range is 180 to 86400 seconds. Please set a valid value.',
  SECONDS: 'Seconds',
  MINUTES: 'Minutes',
  HOURS: 'Hours',
}
