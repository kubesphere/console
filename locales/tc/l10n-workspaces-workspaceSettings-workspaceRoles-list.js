/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  WORKSPACE_ROLE_PL: '企業角色',
  WORKSPACE_ROLE_DESC: '企業角色定義了在目前企業空間下用戶所擁有的權限。',
  // List
  WORKSPACE_ROLE_EMPTY_DESC: 'Please create a workspace role.',
  ROLE_WORKSPACE_ADMIN: 'Manage all resources in the workspace.',
  ROLE_WORKSPACE_REGULAR: '企業空間普通成員，無法創建 DevOps 项目和項目。',
  ROLE_WORKSPACE_VIEWER: '企業空間的觀察者，可以查看企業空間下所有的資源資訊。',
  ROLE_WORKSPACE_SELF_PROVISIONER: '企業空間普通成員，可以在企業空間下創建 DevOps 项目和項目。',
  // List > Create
  CREATE_WORKSPACE_ROLE: '創建企業角色',
  WORKSPACE_ROLE_NAME_TIP: '請設置一個唯一識別碼作為角色名稱。',
  NEXT_STEP: '接下來要做的事情',
  NEXT_STEP_DESC: '接下來您需要編輯權限，編輯好權限後帳號角色才能創建成功。',
  // List > Create > Edit Permissions > Project Management
  PERMIGROUP_PROJECTS_MANAGEMENT: '項目',
  PERMISSION_PROJECTS_VIEW: 'Project Viewing',
  PERMISSION_PROJECTS_VIEW_DESC: 'View all projects in the workspace.',
  PERMISSION_PROJECTS_MANAGEMENT: 'Project Management',
  PERMISSION_PROJECTS_MANAGEMENT_DESC: 'Create, edit, and delete projects in the workspace.',
  PERMISSION_PROJECTS_CREATE: 'Project Creation',
  PERMISSION_PROJECTS_CREATE_DESC:
    'Create projects and become an administrator of the created projects.',
  // List > Create > Edit Permissions > DevOps Project Management
  PERMIGROUP_DEVOPS_MANAGEMENT: 'DevOps 項目',
  PERMISSION_DEVOPS_VIEW: 'DevOps Project Viewing',
  PERMISSION_DEVOPS_VIEW_DESC: 'View all DevOps projects in the workspace.',
  PERMISSION_DEVOPS_MANAGEMENT: 'DevOps Project Management',
  PERMISSION_DEVOPS_MANAGEMENT_DESC: 'Create, edit, and delete DevOps projects in the workspace.',
  PERMISSION_DEVOPS_CREATE: 'DevOps Project Creation',
  PERMISSION_DEVOPS_CREATE_DESC:
    'Create DevOps projects and become an administrator of the created DevOps projects.',
  // List > Create > Edit Permissions > App Management
  PERMISSION_APPS_MANAGEMENT: '應用管理',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW: 'App Repository Viewing',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW_DESC: 'View app repositories in the workspace.',
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT: 'App Repository Management',
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT_DESC:
    'Create, edit, and delete app repositories in the workspace.',
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW: 'App Template Viewing',
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW_DESC: 'View app templates in the workspace.',
  PERMISSION_WORKSPACE_APP_TEMPLATES_MANAGEMENT: '應用模板管理',
  PERMISSION_WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC:
    'Upload, edit, and delete workspace app templates, and release and delete apps in the platform App Store.',
  // List > Create > Edit Permissions > Access Control
  PERMISSION_WORKSPACE_GROUPS_VIEW: 'Department Viewing',
  PERMISSION_WORKSPACE_GROUPS_VIEW_DESC: 'View the structure and members of workspace departments.',
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT: 'Department Management',
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT_DESC:
    'Manage the structure, members, and permissions of workspace departments.',
  PERMISSION_WORKSPACE_MEMBERS_VIEW: '成員查看',
  PERMISSION_WORKSPACE_MEMBERS_VIEW_DESC: 'View workspace members.',
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT: '成員管理',
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT_DESC: 'Invite, edit, and delete workspace members.',
  PERMISSION_WORKSPACE_ROLES_VIEW: '角色查看',
  PERMISSION_WORKSPACE_ROLES_VIEW_DESC: 'View workspace roles.',
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT: '角色管理',
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT_DESC:
    'Create, edit, and delete workspace roles except system preset roles.',
  // List > Create > Edit Permissions > Workspace Settings Management
  PERMIGROUP_WORKSPACE_SETTINGS: '企業空間設置',
  PERMISSION_WORKSPACE_SETTINGS_VIEW: 'Workspace Settings Viewing',
  PERMISSION_WORKSPACE_SETTINGS_VIEW_DESC: '企業空間普通成員，無法創建 DevOps 项目和項目。',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT: 'Workspace Settings Management',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT_DESC:
    'Manage workspace settings and edit workspace information and network policies.',
};
