/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  DEVOPS_PROJECT_ROLE_PL: 'DevOps 项目角色',
  DEVOPS_PROJECT_ROLES_DESC: '成員角色定義了在目前 DevOps 项目下用戶所擁有的權限。',
  // List
  DEVOPS_PROJECT_ROLE_EMPTY_DESC: 'Please create a DevOps project role.',
  ROLE_DEVOPS_VIEWER: 'DevOps 项目觀察者，可以查看 DevOps 项目下所有的資源。',
  ROLE_DEVOPS_OPERATOR: 'DevOps 项目普通成員，可以在 DevOps 项目下創建流水線憑證等。',
  ROLE_DEVOPS_ADMIN: 'Manage all resources in the DevOps project.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Create
  EDIT_PERMISSIONS: '編輯權限',
  CREATE_ROLE: '創建角色',
  // List > Create > Edit Permissions
  CATEGORIES: 'Categories',
  // List > Create > Edit Permissions > Pipeline Management
  DEPENDS_ON: '依賴於',
  PERMIGROUP_PIPELINES_MANAGEMENT: '流水線',
  PERMISSION_PIPELINES_VIEW: 'Pipeline Viewing',
  PERMISSION_PIPELINES_VIEW_DESC: 'View DevOps project pipelines and download artifacts.',
  PERMISSION_PIPELINES_MANAGEMENT: 'Pipeline Management',
  PERMISSION_PIPELINES_MANAGEMENT_DESC: 'Create, edit, and delete DevOps project pipelines.',
  PERMISSION_PIPELINERUNS_VIEW: 'Pipeline Run Record Viewing',
  PERMISSION_PIPELINERUNS_VIEW_DESC: 'View pipeline run records in the DevOps project.',
  PERMISSION_PIPELINERUNS_MANAGEMENT: 'Pipeline Run Record Management',
  PERMISSION_PIPELINERUNS_MANAGEMENT_DESC:
    'View, edit, and delete pipeline run records in the DevOps project.',
  // List > Create > Edit Permissions > Credential Management
  PERMIGROUP_CREDENTIALS_MANAGEMENT: '憑證',
  PERMISSION_CREDENTIALS_VIEW: 'Credential Viewing',
  PERMISSION_CREDENTIALS_VIEW_DESC: 'View and use DevOps credentials.',
  PERMISSION_CREDENTIALS_MANAGEMENT: 'Credential Management',
  PERMISSION_CREDENTIALS_MANAGEMENT_DESC: 'Create, edit, and delete DevOps credentials.',
  // List > Create > Edit Permissions > Access Control
  // List > Create > Edit Permissions > Project Settings
  PERMIGROUP_DEVOPS_SETTINGS: '項目設置',
  PERMISSION_DEVOPS_SETTINGS: 'Project Settings Management',
  PERMISSION_DEVOPS_SETTINGS_DESC: 'Manage DevOps project settings.',
  // List > Create > Edit Permissions > Continuous Deployment Management
  PERMIGROUP_CONTINUOUS_DEPLOYMENTS_MANAGEMENT: 'Continuous Deployments',
  PERMISSION_CONTINUOUS_DEPLOYMENTS_VIEW: 'Continuous Deployment Viewing',
  PERMISSION_CONTINUOUS_DEPLOYMENTS_VIEW_DESC: 'View continuous deployments in the DevOps project.',
  PERMISSION_CONTINUOUS_DEPLOYMENTS_MANAGEMENT: 'Continuous Deployment Management',
  PERMISSION_CONTINUOUS_DEPLOYMENTS_MANAGEMENT_DESC:
    'Manage continuous deployments in the DevOps project.',
  // List > Create > Edit Permissions > Code Repository Management
  PERMIGROUP_CODE_REPOSITORIES_MANAGEMENT: 'Code Repositories',
  PERMISSION_CODE_REPOSITORIES_VIEW: 'Code Repository Viewing',
  PERMISSION_CODE_REPOSITORIES_VIEW_DESC: 'View code repositories in the DevOps project.',
  PERMISSION_CODE_REPOSITORIES_MANAGEMENT: 'Code Repository Management',
  PERMISSION_CODE_REPOSITORIES_MANAGEMENT_DESC: 'Manage code repositories in the DevOps project.',
};
