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
  VERSION_DELETE_TIP:
    'Are you sure to delete the version <strong>{name} </strong >?',

  VERSION_SUBMIT_TIP:
    'Are you sure to submit the version <strong>{name}</strong> for audit?',

  VERSION_CANCEL_TIP:
    'Are you sure to cancel the review of version <strong>{name}</strong>?',

  VERSION_RELEASE_TIP:
    'Users can view and deploy the version <strong> {name} </strong> in the store when it is released. Are you sure to release it now? ',

  VERSION_SUSPEND_TIP:
    'The version <strong>{name}</strong > will not be displayed in the store when it is suspended. Are you sure to suspend it now? ',

  VERSION_RECOVER_TIP:
    'The version <strong>{name}</strong> will be displayed again in the store. Are you sure to activate it now?',

  APP_SUSPEND_TIP:
    "The app <strong>{name}</strong> can't be purchased from the store when it is suspended. Are you sure to suspend it now? ",

  APP_RECOVER_TIP:
    'The app <strong>{name}</strong> and the suspended versions will be displayed again in the store.  Are you sure to activate it now?',

  PACKAGE_FILE_DESC:
    'Package.json file, which describes the basic information of an application or version, including name, version number, etc',

  CONFIG_FILE_DESC: 'Application Default Profile',

  LICENSE_FILE_DESC: 'Protocol in Text Format',

  LOCALE_EN__FILE_DESC:
    'International Cultural English Translation of Application Configuration',

  LOCALE_ZH_FILE_DESC:
    'Application Configuration for International Chinese Translation',

  CHART_FILE_DESC:
    'Yaml file, used to describe the basic information of' +
    ' Chart, including name version, etc',

  README_FILE_DESC: 'Introduction to Applications, Instructions for Use',

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
    'Before submitting for review, make sure that your application has passed the following basic functions',

  VERSION_SUBMIT_DOC: 'Refer to a more comprehensive test manual',

  VERSION_NUMBER_DESC:
    'The important identification of the version, it can only contain numbers, decimal points and brackets ("[]"), and must start with a number and contain decimal points',

  VERSION_NUMBER_ERROR_NOTE:
    'Version Number format is error, it can only contain numbers, decimal points and brackets ("[]"), and must start with a number and contain decimal points',

  UPDATE_LOG_DESC: 'Used to describe the details of this update',
}
