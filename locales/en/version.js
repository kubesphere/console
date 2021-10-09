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
  ACTIVATE_APP: 'Activate App',
  ACTIVATE_VERSION: 'Activate Version',
  Activated: 'Activated',
  admin: 'admin',
  'App Information': 'App Information',
  'App Instances': 'App Instances',
  'Audit Records': 'App Review',
  business: 'business',
  CANCEL_REVIEW: 'Cancel Review',
  creating: 'creating',
  'Delete Version': 'Delete Version',
  deleting: 'deleting',
  'Deployed Instances': 'Deployed Instances',
  'Develop and test guide': 'Develop and test guide',
  developer: 'developer',
  Developing: 'Developing',
  DOWNLOAD_SUCCESSFUL: 'Downloaded successfully.',
  Draft: 'Draft',
  global_admin: 'global_admin',
  'in-review': 'in-review',
  'In-review': 'In-review',
  isv: 'isv',
  NO_VERSION_INFO_DESC: 'No version information is found.',
  Pass: 'Pass',
  Passed: 'Passed',
  'Pending-review': 'Pending-review',
  Published: 'Published',
  Recall: 'Recall',
  Recalled: 'Recalled',
  Reject: 'Reject',
  Rejected: 'Rejected',
  Release: 'Release',
  'Release to Store': 'Release to Store',
  Review: 'Review',
  Starting: 'Starting',
  Stopping: 'Stopping',
  Submit: 'Submit',
  'Submit for Review': 'Submit for Review',
  Submitted: 'Submitted',
  SUSPEND_APP: 'Suspend App',
  SUSPEND_VERSION: 'Suspend Version',
  Suspended: 'Suspended',
  technical: 'technical',
  'Test Steps': 'Test Steps',
  'Version Management': 'Version Management',
  'Version Update Info': 'Version Update Info',
  Versions: 'Versions',
  'View in Store': 'View in Store',
  Working: 'Working',
  'Wrong version number format': 'Wrong version number format',

  VERSION_DELETE_TIP:
    'Are you sure you want to delete the version <strong>{name}</strong>?',
  VERSION_SUBMIT_TIP:
    'Are you sure you want to submit the version <strong>{name}</strong> for review?',
  VERSION_CANCEL_TIP:
    'Are you sure you want to cancel the review of the version <strong>{name}</strong>?',
  VERSION_RELEASE_TIP:
    'Users can view and deploy the version <strong>{name}</strong> in the App Store after it is released. Are you sure you want to release it?',
  VERSION_SUSPEND_TIP:
    'The version <strong>{name}</strong > will not be displayed in the App Store after it is suspended. Are you sure you want to suspend it?',
  VERSION_RECOVER_TIP:
    'The version <strong>{name}</strong> will be displayed in the App Store. Are you sure you want to activate it?',

  APP_SUSPEND_TIP:
    'The app <strong>{name}</strong> cannot be deployed from the App Store after it is suspended. Are you sure you want to suspend it?',
  APP_RECOVER_TIP:
    'The app <strong>{name}</strong> and the suspended versions will be displayed again in the App Store. Are you sure you want to activate it now?',

  PACKAGE_FILE_DESC:
    'Package.json file, which describes the basic information of an application or version, such as the name and version number.',
  CONFIG_FILE_DESC: 'Application Default Profile',
  LICENSE_FILE_DESC: 'License agreement in text format.',
  LOCALE_EN__FILE_DESC: 'English Translation for the Application Configuration',
  LOCALE_ZH_FILE_DESC: 'Chinese Translation for the Application Configuration',

  CHART_FILE_DESC:
    'YAML file that describes basic information about the chart such as the name and version.',
  README_FILE_DESC: 'App introduction.',
  REQUIREMENTS_FILE_DESC: 'File that describes dependencies of the chart.',
  VALUES_FILE_DESC: 'Default configuration file of the chart.',
  CHARTS_FILE_DESC: 'Directory that contains dependencies of the chart.',
  TEMPLATES_FILE_DESC: 'Directory that contains deployment template files.',
  NOTES_FILE_DESC: 'User instructions.',

  VERSION_SUBMIT_TEST_STEPS:
    '1. All dependent charts have been submitted <br/>' +
    '2. Successful static check(helm lint) <br/>' +
    '3. Successful start-up of applications(helm install) with default values: All pods are running status, and all service services have at least one endpoint < br/>' +
    '4. There is no security vulnerability in the mirrors used <br/>' +
    '5. Support upgrade <br/>' +
    '6. Support custom application configuration <br/>' +
    "7. Don't use Kubernetes'alpha function <br/>" +
    '8. Detailed README files are required, including introduction of applications, preconditions and how to customize configuration parameters <br/>',

  VERSION_SUBMIT_NOTE:
    'Please make sure your app has passed the basic function tests shown below before you submit it for review.',
  VERSION_SUBMIT_DOC: 'For a more comprehensive test manual, see ',

  UPDATE_LOG_DESC: 'Used to describe the details of this update.',

  // App Templates > Details
  APP_INSTANCES: 'App Instances',
  UPLOAD_NEW_VERSION: 'Upload New Version',
  UPLOAD_NEW_VERSION_DESC: 'Upload a new version of the app.',
  APP_VERSION_LOW: 'App version',
  UPDATE_TIME_LOW: 'Update time',
  TEST_INSTALLATION: 'Test Installation',
  SUBMIT_FOR_REVIEW: 'Submit for Review',
  VERSION_INFO: 'Version Information',
  INSTALL: 'Install',
}
