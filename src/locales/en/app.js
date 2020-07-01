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
  FILE_UPLOAD_MAX: 'The file size cannot exceed 2M.',

  APP_TEMPLATE_DESC:
    'KubeSphere provides full lifecycle management for applications. You can upload or create new app templates and test them quickly. In addition, you can publish your apps to App Store so that other users can deploy with one click.',
  APP_TEMPLATE_CREATE_DESC:
    'KubeSphere provides full lifecycle management for applications. You can upload or create new app templates and test them quickly. In addition, you can publish your apps to App Store so that other users can deploy with one click.',
  APP_TEMPLATES_DESC: 
    'KubeSphere provides full lifecycle management for applications. You can upload or create new app templates and test them quickly. In addition, you can publish your apps to App Store so that other users can deploy with one click.',

  DEVELOP_APP_TITLE: 'How to develop app templates?',
  DEVELOP_APP_DESC:
    'You can upload Helm Chart or use the resource orchestration tool provided by KubeSphere to develop app templates.',

  HOW_PUBLISH_APP_TITLE: 'How to publish applications to App Store?',
  HOW_PUBLISH_APP_DESC:
    'KubeSphere currently supports uploading Helm Charts through app templates within the workspace, where you can submit your template for review. Once the template is approved, you can publish it to App Store.',

  HOW_APP_DEPLOY_TITLE: 'How to deploy and test applications',

  APPS_CREATE_DESC:
    'KubeSphere provides lifecycle management of app templates. You can upload or create new app templates and test them quickly. In addition, you can publish your app templates to App Store so that other users can purchase and deploy them.',

  APP_NAME_DESC: 'Important Identification of Applications',

  APP_ABSTRACTION_DESC: 'A general introduction to applications',

  APP_DETAIL_DESC: 'Very helpful when searching applications',

  APP_ICON_FORMAT: 'Format: png Background Transparency Best',
  APP_ICON_SIZE: 'Graphic size: 96px*96*px',

  APP_STORE_DESC: 'Manage applications of the store.',

  APP_REVIEW_DESC:
    'Certify service providers and review applications in order to approve or reject the applications to show or not in the store.',
  APP_REVIEWS_CREATE_DESC:
    'Certify service providers and review applications in order to approve or reject the applications to show or not in the store.',
  REVIEW_CONTENT_DESC:
    'The following information must be true and accurate. Key instructions must be given in detail. Terms and Conditions are required to be stated clearly.',
  REJECT_REASON_DESC: 'Please fill in the reasons for refusal of review.',

  APP_CATEGORIES_DESC:
    'This module allows you to create, edit and delete categories, and to classify active applications of the store.',
  APP_CATEGORIES_CREATE_DESC: 'No application data available for the category.',
  ADJUST_CATEGORY_DESC:
    'Application classification will determine the classification of the application in the application store',
  DELETE_CATEGORY_WARNING:
    'This category binds <strong>{total}</strong> applications. Please' +
    ' choose to adjust these applications to other categories before deleting them',
  DELETE_CATEGORY_DESC: 'Are you sure to delete the category [{name}] ?',
  CHOOSE_APP_CATEGORY_DESC:
  'Choose the appropriate application categories to facilitate users to find your applications faster',

  UPLOAD_HELM_TITLE: 'Upload Helm Chart Package',
  UPLOAD_HELM_DESC: 'Upload existing Helm Chart',
  UPLOAD_HELM_DESCRIPTION:
  'Upload your Helm Chart in the file format such as tar.gz or tgz.',

  EDIT_APP_DESC: 'Set up the basic information of the application',
  CREATE_APP_DESC:
    'Lightweight, portable and self-contained software packaging technology enables applications to run in almost any place in the same way.',

  RESOURCE_TOOL_TITLE: 'Created through Resource Choreographer',
  RESOURCE_TOOL_DESCRIPTION:
    'KubeSphere provides a visual resource orchestration tool that allows you to' +
    ' create application templates and deploy tests through resource pre-editing',

  APP_CREATE_GUIDE: 'See the application development specification',
  HELM_DEVELOP_GUIDE: 'Helm Specification and Application Development',

  CATEGORY_NAME_DESC:
    'No more than 8 characters is recommended; the maximum length of characters is set to 20.',
  APP_CATE_All: 'All',
  APP_CATE_UNCATEGORIZED: 'Uncategorized',

  ICON_DESC: 'Please select an icon to identify the classification',

  MODIFY_VERSION_TIPS:
    'Every modification will follow the next release and take effect.',

  UNDER_REVIEW_TIPS:
    'The current version of the application is under review,' +
    ' and the following information is temporarily unalterable',

  SUBMIT_REVIEW_DESC:
    'Submit the application to the App Store and it will' +
    ' appear in the App Store after approval',

  AUDIT_RECORD_CREATE_DESC: 'No relevant review record',

  UPLOAD_SUPPORT_FORMAT: 'File formats support tar.gz and tgz',

  FILE_FORMAT_PACKAGE: 'File formats support tar.gz and tgz',
  FILE_FORMAT_ICON: 'Icon format supports png and svb',
  FILE_FORMAT_SCREENSHOTS: 'Screen format supports png and jpg',
  FILE_MAX_PACKAGE: 'Configuration package size should not exceed 2M',
  FILE_MAX_ICON: 'Icon size should not exceed 20KB',
  FILE_MAX_SCREENSHOTS: 'Image size should not exceed 2M',

  UPLOAD_PACKAGE_OK_NOTE:
    'Please upload the configuration package or upload the configuration package incorrectly',

  REVIEWS_CREATE_DESC: 'There is no relevant application review data',

  NO_DEPLOY_RUNTIME_NOTE: 'The project has no available deploy runtime',

  START_UPLOAD: 'Upload',

  APP_ICON_NOTE: 'JPG or PNG within 200px * 200px',

  MISS_FILE_NOTE: 'The file {file} not found',
}
