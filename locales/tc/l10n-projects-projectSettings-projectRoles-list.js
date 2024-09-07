/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  PROJECT_ROLE_PL: '項目角色',
  PROJECT_ROLE_DESC: '項目角色定義了在目前項目下用戶所擁有的權限',
  // List
  ROLE_PROJECT_ADMIN: 'Manage all resources in the project.',
  ROLE_PROJECT_REGULAR: 'Manage resources other than users and roles in the project.',
  ROLE_PROJECT_VIEWER: '項目觀察者，可以查看項目下所有的資源。',
  ROLE_PROJECT_OPERATOR: '項目維護者，可以管理項目下除用戶和角色之外的資源。',
  PROJECT_ROLE_EMPTY_DESC: 'Please create a project role.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Edit Permissions > Application Workloads
  PERMIGROUP_APPLICATION_WORKLOADS: '應用負載',
  PERMISSION_APPLICATION_WORKLOADS_VIEW: 'Application Workload Viewing',
  PERMISSION_APPLICATION_WORKLOADS_VIEW_DESC:
    'View resources such as applications, services, workloads, jobs, grayscale release jobs, and image builders in the project.',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT: 'Application Workload Management',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT_DESC:
    'Create, edit, and delete resources such as applications, services, workloads, jobs, grayscale release jobs, and image builders in the project.',
  // List > Edit Permissions > Storage
  PERMIGROUP_STORAGE_MANAGEMENT: '儲存',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW: 'Volume Snapshot Viewing',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW_DESC: 'View volume snapshots in the project.',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT: 'Volume Snapshot Management',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT_DESC:
    'Create, edit, and delete volume snapshots in the project.',
  PERMISSION_VOLUMES_VIEW: 'Persistent Volume Claim Viewing',
  PERMISSION_VOLUMES_VIEW_DESC: 'View persistent volume claims in the project.',
  PERMISSION_VOLUMES_MANAGEMENT: 'Persistent Volume Claim Management',
  PERMISSION_VOLUMES_MANAGEMENT_DESC:
    'Create, edit, and delete persistent volume claims in the project.',
  // List > Edit Permissions > Configuration
  PERMIGROUP_CONFIGURATION_CENTER: '配置',
  PERMISSION_CONFIGMAPS_VIEW: 'Configmap Viewing',
  PERMISSION_CONFIGMAPS_VIEW_DESC: 'View configmaps in the project.',
  PERMISSION_CONFIGMAPS_MANAGEMENT: 'Configmap Management',
  PERMISSION_CONFIGMAPS_MANAGEMENT_DESC: 'Create, edit, and delete configmaps in the project.',
  PERMISSION_SECRETS_VIEW: 'Secret Viewing',
  PERMISSION_SECRETS_VIEW_DESC: 'View secrets in the project.',
  PERMISSION_SECRETS_MANAGEMENT: 'Secret Management',
  PERMISSION_SECRETS_MANAGEMENT_DESC: 'Create, edit, and delete secrets in the project.',
  PERMISSION_SERVICEACCOUNT_VIEW: 'Service Account Viewing',
  PERMISSION_SERVICEACCOUNT_VIEW_DESC: 'View service accounts in the project.',
  PERMISSION_SERVICEACCOUNT_MANAGEMENT: 'Service Account Management',
  PERMISSION_SERVICEACCOUNT_MANAGEMENT_DESC:
    'Create, edit, and delete service accounts in the project.',
  // List > Edit Permissions > Monitoring & Alerting
  PERMIGROUP_MONITORING_ALERTING: '監控告警',
  PERMISSION_ALERTING_MESSAGES_VIEW: 'Alert Viewing',
  PERMISSION_ALERTING_MESSAGES_VIEW_DESC: 'View alerts in the project.',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT: 'Alert Management',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT_DESC: 'Comment on and delete alerts in the project.',
  PERMISSION_ALERTING_POLICIES_VIEW: 'Rule Group Viewing',
  PERMISSION_ALERTING_POLICIES_VIEW_DESC: 'View rule groups in the project.',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT: 'Rule Group Management',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT_DESC:
    'Create, edit, and delete rule groups in the project.',
  PERMISSION_CUSTOM_MONITORING_VIEW: 'Custom Monitoring Viewing',
  PERMISSION_CUSTOM_MONITORING_VIEW_DESC: 'View custom monitoring dashboards in the project.',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT: 'Custom Monitoring Management',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT_DESC:
    'Create, edit, and delete custom monitoring dashboards in the project.',
  // List > Edit Permissions > Access Control
  PERMISSION_PROJECT_MEMBERS_VIEW: '成員查看',
  PERMISSION_PROJECT_MEMBERS_VIEW_DESC: 'View project members.',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT: '成員管理',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT_DESC: 'Invite, edit, and remove project members.',
  PERMISSION_PROJECT_ROLES_VIEW: '角色查看',
  PERMISSION_PROJECT_ROLES_VIEW_DESC: 'View project roles.',
  PERMISSION_PROJECT_ROLES_MANAGEMENT: '角色管理',
  PERMISSION_PROJECT_ROLES_MANAGEMENT_DESC:
    'Create, edit, and delete project roles except preset roles.',
  // List > Edit Permissions > Project Settings
  PERMIGROUP_PROJECT_SETTINGS: '項目設置',
  PERMISSION_PROJECT_SETTINGS: 'Project Settings Management',
  PERMISSION_PROJECT_SETTINGS_DESC:
    'Manage project settings including project basic information, external access settings, network policies, resource quotas, and log collection settings.',
  // List > Delete
  DELETE_ROLE: 'Delete Role',
  DELETE_ROLE_TIP: 'Are you sure you want to delete the role <strong>{resource}</strong>?',
  DELETE_ROLE_USER_TIP_PL:
    'The role is authorized to <strong>{count}</strong> users. Please delete the users or change the roles of the user first.',
  DELETE_ROLE_USER_TIP:
    'The role is authorized to <strong>{count}</strong> user. Please delete the user or change the role of the user first.',
  DELETE_ROLE_DEPARTMENT_TIP_PL:
    'The role is authorized to <strong>{count}</strong> departments. Please delete the departments or change the roles of the departments first.',
  DELETE_ROLE_DEPARTMENT_TIP:
    'The role is authorized to <strong>{count}</strong> department. Please delete the department or change the role of the department first.',
};
