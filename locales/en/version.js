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
  'Activate App': 'Activate App',
  'Activate Version': 'Activate Version',
  Activated: 'Activated',
  admin: 'admin',
  'App Information': 'App Information',
  'App Instances': 'App Instances',
  'Audit Records': 'App Review',
  business: 'business',
  'Cancel Review': 'Cancel Review',
  creating: 'creating',
  'Delete Version': 'Delete Version',
  deleting: 'deleting',
  'Deployed Instances': 'Deployed Instances',
  'Develop and test guide': 'Develop and test guide',
  developer: 'developer',
  Developing: 'Developing',
  'Download Successfully': 'Download Successfully',
  Draft: 'Draft',
  global_admin: 'global_admin',
  'in-review': 'in-review',
  'In-review': 'In-review',
  isv: 'isv',
  'No version information': 'No version information',
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
  'Suspend App': 'Suspend App',
  'Suspend Version': 'Suspend Version',
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
    'Users can view and deploy the version <strong>{name}</strong> in the App Store after released. Are you sure you want to release it now?',
  VERSION_SUSPEND_TIP:
    'The version <strong>{name}</strong > will not be displayed in the App Store after suspended. Are you sure you want to suspend it now?',
  VERSION_RECOVER_TIP:
    'The version <strong>{name}</strong> will be displayed again in the App Store. Are you sure you want to activate it now?',

  APP_SUSPEND_TIP:
    "The app <strong>{name}</strong> can't be deployed from the App Store after suspended. Are you sure you want to suspend it now?",
  APP_RECOVER_TIP:
    'The app <strong>{name}</strong> and the suspended version will be displayed again in the App Store. Are you sure you want to activate it now?',

  PACKAGE_FILE_DESC:
    'Package.json file, which describes the basic information of an application or version, such as the name and version number.',
  CONFIG_FILE_DESC: 'Application Default Profile',
  LICENSE_FILE_DESC: 'Protocol in Text Format',
  LOCALE_EN__FILE_DESC: 'English Translation for the Application Configuration',
  LOCALE_ZH_FILE_DESC: 'Chinese Translation for the Application Configuration',

  CHART_FILE_DESC:
    'Yaml file, used to describe the basic information of' +
    ' Chart, such as the name and version.',
  README_FILE_DESC: 'App Introductions and Instructions',
  REQUIREMENTS_FILE_DESC:
    'Description files for storing other Charts currently dependent on Chart',
  VALUES_FILE_DESC: "Chart's default configuration file",
  CHARTS_FILE_DESC:
    'Place other Charts that Chart currently depends on in this directory',
  TEMPLATES_FILE_DESC:
    'Deploy file template directory, fill in the corresponding value in values.yaml, and generate the final kubernetes configuration file',
  NOTES_FILE_DESC: 'Guide to Use',

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
}
