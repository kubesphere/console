/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  APP_AUTHORIZED: 'Authorized',
  APP_UNAUTHORIZED: 'Unauthorized',
  DEPLOY_YAML_APPS: 'Deploying YAML applications',
  CREATE_CHARTS_APPS: 'Create HELM application',
  CREATE_YAML_APPS: 'Create YAML application',
  CREATE_TEMPLATE_APPS: 'Create a template application',
  REPO_MANAGE: 'Repo source management',
  APP_INSTANCES_MANAGE: 'Instance Management',
  ADD_APP_REPO: 'Add application repository',
  APP_INSTANCES_MANAGE_DESC: 'Instance Management Description.',
  NO_APPLICATION_FOUND: 'No application instances found.',
  APPLICATION_EMPTY_DESC: 'Please add an instance.',
  APP_DEPLOY: 'Application Deployment',
  DEPLOY_MANAGE: 'Deployment Management',
  VERSIONS: 'Versions',
  APP_INFORMATION: 'Application Information',
  APP_REVIEW: 'Application Review',
  APP_INSTANCES: 'Application Instance',
  MODIFY_CATEGORY: 'Change classification',
  MODIFY_CATEGORY_HELP:
    'The application classification will determine the classification of the application in the app store.',
  MODIFY_CATEGORY_REQUIRED: 'Please select a category.',
  MODIFY_CATEGORY_SUCCESSFULLY: 'Change classification operation successful.',
  NO_APP_REPO_FOUND: 'No application repository found.',
  APPROVE_AND_RELEASE: 'Approved and published',
  create_edge_APPS: 'Create edge template',
  SUBMITTED_SUCCESSFUL: 'Submitted successfully',
  APP_SUSPENDED_TIP:
    'After app <strong>{name}</strong> is taken down, users cannot deploy this app from the middle of the store. Are you sure you want to take it down?',
  APP_ACTIVE_TIP:
    'After the application <strong>{name}</strong> is launched, all relevant offline versions will become listed. Are you sure you want to list this application?',
  APP_TEMPLATE_VERSION_DESC:
    'The application version needs to comply with the Semantic Version specification.',
  APP_SUSPEND: 'Removal',
  APP_LISTING: 'Listing',
  APP_VERSION_STATUS_ACTIVE: 'Published',
  APP_VERSION_STATUS_SUSPENDED: 'Unpublished',
  APP_VERSION_RELEASE: 'Release',
  APP_VERSION_SUSPENDED: 'Unpublish',
  VERSION_DRAFT_SUCCESSFUL: 'Unpublished successfully.',
  VERSION_SUSPEND_SUCCESSFUL: 'Successfully published.',
  APP_ACTIVE_SUCCESSFUL: 'App successfully launched.',
  APP_SUSPENDED_SUCCESSFUL: 'App successfully taken down.',
  APP_REPO_STATUS_UPGRADING: 'synchronizing',
  'Helm Application': 'helm Application',
  'Yaml Application': 'yaml Application',
  'Edge Application': 'Edge template application',
  APPLICATION: 'Application',
  CREAT_YAML_FORMAT_DESC: 'Support YAML format .',
  clusterDeleted: 'Cluster deleted .',
  APP_DELETED_TIP:
    'The application template used for the current application instance deployment does not exist .',
  CREATE_YAML_TEMPLATE_TIP: 'Multiple yaml files separated by "---" .',
  FILE_MAX_PACKAGE: 'Supports uploading up to 2M files.',
  APP_TYPE: 'App Type',
  deleting: 'Deleting',
  Running: 'Running',
  Creating: 'Creating',
  creating: 'Creating',
  REPO_URL_ERR_TIP:
    'Please remove the https://or http://protocol prefix from the box on the right .',
  VERSION_ACTIVATE_SUCCESSFUL: 'Successfully published .',
  SYSTEM_REPO_TYPE: 'System Warehouse',
  OWNER_REPO_TYPE: 'Private Warehouse',
  USE_GUIDE_TITLE: 'KubeSphere App Store Usage Guide',
  USE_GUIDE_DESC:
    'KubeSphere App Store provides an internal global application distribution platform for enterprises, where all applications must pass the approval of "KubeSphere App Store Management" and be listed. KubeSphere is not responsible for the after-sales maintenance of applications in the App Store.',
  USE_GUIDE_DESC2:
    'If you need to create an application through KubeSphere App Store Management, please refer to the following steps:',
  USE_GUIDE_STEP_1: 'Install the "KubeSphere App Store Management" extension component',
  USE_GUIDE_STEP_2:
    'Create an application template in a self-built enterprise space and submit for approval',
  USE_GUIDE_STEP_3:
    '"Platform administrator" completes the application template approval through "KubeSphere App Store Management" and lists it in the App Store',
  USE_GUIDE_STEP_4:
    'Then, users in each project can create applications through KubeSphere App Store',
};
