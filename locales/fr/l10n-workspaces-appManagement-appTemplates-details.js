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
  // Edit
  MODIFY_SUCCESSFUL: 'Modified successfully.',
  SERVICE_PROVIDER_WEBSITE_DESC: 'Official website address of the service provider.',
  WRONG_ADDRESS_TIP: 'Incorrect address format. Please enter a correct address.',
  APP_NAME_DESC: 'Name of the app. The maximum length is 20 characters.',
  APP_DESCRIPTION_DESC: 'Description of the app. The maximum length is 120 characters.',
  APP_ICON_FORMAT: 'Format: PNG or JPG',
  APP_ICON_SIZE: 'Size: 96 x 96 pixels',
  CHOOSE_APP_CATEGORY_DESC: 'Select a category for the app.',
  EDIT_APP_DESC: 'Edit the basic information of the app template.',
  ICON: 'Icon',
  SERVICE_PROVIDER_WEBSITE_TCAP: 'Service Provider Website',
  START_EDITING: 'Start editing...',
  SCREENSHOTS_COLON: 'Screenshots: ',
  DELETE_ALL: 'Delete All',
  // More > Install
  // More > Upload Version
  ADD_VERSION_SUCCESSFUL: 'The version was added successfully.',
  UPLOAD_PACKAGE_OK_NOTE: 'The version already exists. Please upload another version.',
  UPLOAD_NEW_VERSION: 'Upload Version',
  UPLOAD_NEW_VERSION_DESC: 'Upload a new version of the app template.',
  // More > Delete
  DELETE_APP_TEMPLATE_DESC: 'Enter the app template name <b>{resource}</b> to confirm that you understand the risks of this operation.',
  DELETE_APP_TEMPLATE_VERSIONS_DESC: 'Enter the app template name <b>{resource}</b> to confirm that you understand the risks of this operation. Before deleting the app template, you must delete all versions of the template.',
  APP_TEMPLATE_LOW: 'app template',
  // Details
  // Versions
  APP_STATUS_SUBMITTED: 'Submitted',
  APP_STATUS_NOT_SUBMITTED: 'Not submitted',
  VERSION_INFO: 'Version Information',
  INSTALL: 'Install',
  SUBMIT_FOR_REVIEW: 'Submit for Review',
  DOWNLOAD_SUCCESSFUL: 'Downloaded successfully.',
  VERSION_DELETE_TIP: 'Are you sure you want to delete the version <strong>{name}</strong>?',
  VERSION_SUBMIT_TIP: 'Are you sure you want to submit the version <strong>{name}</strong> for release?',
  VERSION_CANCEL_TIP: 'Are you sure you want to cancel the submission of the version <strong>{name}</strong>?',
  VERSION_RELEASE_TIP: 'Users can view and deploy the version <strong>{name}</strong> in the App Store after it is released. Are you sure you want to release it?',
  VERSION_SUSPEND_TIP: 'The version <strong>{name}</strong > will not be displayed in the App Store after it is suspended. Are you sure you want to suspend it?',
  VERSION_RECOVER_TIP: 'The version <strong>{name}</strong> will be displayed in the App Store after it is recovered. Are you sure you want to recover it?',
  UPDATE_TIME_SCAP: 'Update time',
  VIEW_IN_STORE: 'View in Store',
  // Versions > Upload
  UPLOAD_AGAIN_TIP: 'An error occurred. Please try again.',
  // Versions > Submit for Review
  ENTER_VERSION_NUMBER_TIP: 'Please enter a version number.',
  SUBMIT_REVIEW_DESC: 'Submit the app template for review before releasing it to the App Store.',
  APP_LEARN_MORE: '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">Learn More</a>',
  INVALID_VERSION_TIP: 'Please enter a correct version number.',
  // Versions > Submit for Review > Test Steps
  VERSION_SUBMIT_TEST_STEPS: '1. All dependent charts have been submitted.<br/>' + '2. The static analysis has been passed (helm lint).<br/>' + '3. The app can be started using default values (helm install). All pods are in running state and all services have at least one endpoint.<br/>' + '4. The images used have no security vulnerabilities.<br/>' + '5. Upgrade is supported.<br/>' + '6. Custom application configuration is supported.<br/>' + '7. Do not use the alpha features of Kubernetes.<br/>' + '8. Detailed documentation is provided, including app introduction, prereauisites, and custom parameter configurations.<br/>',
  VERSION_SUBMIT_NOTE: 'Please make sure your app has met the following requirements before submission:',
  // Versions > Submit for Review > Update Log
  UPDATE_LOG_DESC: 'Enter detailed information about the app updates.',
  SUBMIT_SUCCESSFUL: 'Submitted successfully.',
  CANCEL_SUCCESSFUL: 'Canceled successfully.',
  // App Information
  // App Release
  // App Instances
  APP_INSTANCES: 'App Instances'
};