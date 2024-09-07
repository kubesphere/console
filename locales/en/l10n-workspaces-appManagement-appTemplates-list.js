/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  APP_TEMPLATE_PL: 'App Templates',
  APPS_MANAGEMENT: 'App Management',
  UPLOAD_TEMPLATE: 'Upload Template',
  APP_TEMPLATE_DESC:
    'KubeSphere provides full lifecycle management for apps. You can upload or create new app templates and test them quickly. In addition, you can publish your apps to the App Store so that other users can deploy with one click.',
  DEVELOP_APP_DESC:
    'You can upload Helm charts or use the resource orchestration tool provided by KubeSphere to develop app templates.',
  DEVELOP_APP_TITLE: 'How do I develop app templates?',
  HOW_PUBLISH_APP_TITLE: 'How do I release apps to the App Store?',
  HOW_PUBLISH_APP_DESC:
    'You can upload Helm charts as app templates to workspaces. The apps will be released to the App Store after they are approved.',
  // List
  // APP_STATUS_ACTIVE: 'Released',
  // APP_STATUS_DRAFT: 'Unreleased',
  APP_STATUS_SUSPENDING: 'Suspending',
  APP_STATUS_ACTIVE: 'Listed',
  APP_STATUS_DRAFT: 'Not listed',
  APP_TEMPLATE_EMPTY_DESC: 'Please create an app template.',
  LATEST_VERSION: 'Latest Version',
  // List > Create
  CREATE_APP_TEMPLATE: 'Create App Template',
  CREATE_APP_TEMPLATE_DESC:
    'The lightweight, portable, and self-contained software packaging technology enables applications to run almost anywhere in the same way.',
  APP_CREATE_GUIDE:
    'See the development guide <a href="{docUrl}/application-store/app-developer-guide/helm-specification/" target="_blank" rel="noreferrer noopener">Helm Specifications</a>.',
  UPLOAD: 'Upload',
  // List > Create > Upload
  UPLOAD_HELM_TITLE: 'Upload Helm Chart',
  UPLOAD_HELM_CHART_DESC: 'Upload an existing Helm chart.',
  HELM_CHART_FORMAT_DESC: 'Supports tar.gz and tgz formats.',
  UPLOAD_ICON: 'Upload Icon',
  UPLOAD_SUCCESSFUL: 'Uploaded successfully.',
  UPLOADING: 'Uploading',
  FILE_MAX_SIZE_ICON: 'The maximum size of the icon is 512 x 512 pixels.',
  FILE_MAX_SCREENSHOTS: 'The snapshot size cannot exceed 2 MB.',
  APP_ICON_NOTE: 'Upload a JPG or PNG image of 512 x 512 pixels.',
  MISS_FILE_NOTE: 'The file {file} was not found.',
  LICENSE_FILE_DESC: 'License agreement in text format.',
  CHART_FILE_DESC:
    'YAML file that describes basic information about the chart such as the name and version.',
  README_FILE_DESC: 'App introduction.',
  REQUIREMENTS_FILE_DESC: 'File that describes dependencies of the chart.',
  VALUES_FILE_DESC: 'Default configuration file of the chart.',
  CHARTS_FILE_DESC: 'Directory that contains dependencies of the chart.',
  TEMPLATES_FILE_DESC: 'Directory that contains deployment template files.',
  NOTES_FILE_DESC: 'User instructions.',
  INCORRECT_FILE: 'Incorrect file? ',
  TRY_AGAIN: 'Try Again',
  FILE_MAX_ICON_DESC: 'The icon size should not exceed 20 KB. Please try again.',
  HOMEPAGE: 'Homepage',
  OPTIONAL: 'Optional',
  created: 'Created',
};
