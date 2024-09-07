/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  PROJECT_ROLE_PL: '项目角色',
  PROJECT_ROLE_DESC: '项目角色定义了在当前项目下用户所拥有的权限。',
  // List
  ROLE_PROJECT_ADMIN: '管理项目中的所有资源。',
  ROLE_PROJECT_REGULAR: '管理项目中除用户和角色之外的资源。',
  ROLE_PROJECT_VIEWER: '查看项目中的所有资源。',
  ROLE_PROJECT_OPERATOR: '管理项目中除用户和角色之外的资源。',
  PROJECT_ROLE_EMPTY_DESC: '请创建一个项目角色。',
  // List > Edit Information
  // List > Edit Permissions
  // List > Edit Permissions > Application Workloads
  PERMIGROUP_APPLICATION_WORKLOADS: '应用负载',
  PERMISSION_APPLICATION_WORKLOADS_VIEW: '应用负载查看',
  PERMISSION_APPLICATION_WORKLOADS_VIEW_DESC:
    '查看项目中的应用、服务、工作负载、任务、灰度发布任务和镜像构建器等资源。',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT: '应用负载管理',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT_DESC:
    '创建、编辑和删除项目中的应用、服务、工作负载、任务、灰度发布任务和镜像构建器等资源。',
  // List > Edit Permissions > Storage
  PERMIGROUP_STORAGE_MANAGEMENT: '存储',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW: '卷快照查看',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW_DESC: '查看项目中的卷快照。',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT: '卷快照管理',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT_DESC: '创建、编辑和删除项目中的卷快照。',
  PERMISSION_VOLUMES_VIEW: '持久卷声明查看',
  PERMISSION_VOLUMES_VIEW_DESC: '查看项目中的持久卷声明。',
  PERMISSION_VOLUMES_MANAGEMENT: '持久卷声明管理',
  PERMISSION_VOLUMES_MANAGEMENT_DESC: '创建、编辑和删除项目中的持久卷声明。',
  // List > Edit Permissions > Configuration
  PERMIGROUP_CONFIGURATION_CENTER: '配置',
  PERMISSION_CONFIGMAPS_VIEW: '配置字典查看',
  PERMISSION_CONFIGMAPS_VIEW_DESC: '查看项目中的配置字典。',
  PERMISSION_CONFIGMAPS_MANAGEMENT: '配置字典管理',
  PERMISSION_CONFIGMAPS_MANAGEMENT_DESC: '创建、编辑和删除项目中的配置字典。',
  PERMISSION_SECRETS_VIEW: '保密字典查看',
  PERMISSION_SECRETS_VIEW_DESC: '查看项目中的保密字典。',
  PERMISSION_SECRETS_MANAGEMENT: '保密字典管理',
  PERMISSION_SECRETS_MANAGEMENT_DESC: '创建、编辑和删除项目中的保密字典。',
  PERMISSION_SERVICEACCOUNT_VIEW: '服务帐户查看',
  PERMISSION_SERVICEACCOUNT_VIEW_DESC: '查看项目中的服务帐户。',
  PERMISSION_SERVICEACCOUNT_MANAGEMENT: '服务帐户管理',
  PERMISSION_SERVICEACCOUNT_MANAGEMENT_DESC: '创建、编辑和删除项目中的服务帐户。',
  // List > Edit Permissions > Monitoring & Alerting
  PERMIGROUP_MONITORING_ALERTING: '监控告警',
  PERMISSION_ALERTING_MESSAGES_VIEW: '告警查看',
  PERMISSION_ALERTING_MESSAGES_VIEW_DESC: '查看项目中的告警。',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT: '告警管理',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT_DESC: '评论并删除项目中的告警。',
  PERMISSION_ALERTING_POLICIES_VIEW: '规则组查看',
  PERMISSION_ALERTING_POLICIES_VIEW_DESC: '查看项目中的规则组。',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT: '规则组管理',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT_DESC: '创建、编辑和删除项目中的规则组。',
  PERMISSION_CUSTOM_MONITORING_VIEW: '自定义监控查看',
  PERMISSION_CUSTOM_MONITORING_VIEW_DESC: '查看项目中的自定义监控面板。',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT: '自定义监控管理',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT_DESC: '创建、编辑和删除项目中的自定义监控面板。',
  // List > Edit Permissions > Access Control
  PERMISSION_PROJECT_MEMBERS_VIEW: '成员查看',
  PERMISSION_PROJECT_MEMBERS_VIEW_DESC: '查看项目成员。',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT: '成员管理',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT_DESC: '邀请、编辑和移除项目成员。',
  PERMISSION_PROJECT_ROLES_VIEW: '角色查看',
  PERMISSION_PROJECT_ROLES_VIEW_DESC: '查看项目角色。',
  PERMISSION_PROJECT_ROLES_MANAGEMENT: '角色管理',
  PERMISSION_PROJECT_ROLES_MANAGEMENT_DESC: '创建、编辑和删除系统预置角色以外的项目角色。',
  // List > Edit Permissions > Project Settings
  PERMIGROUP_PROJECT_SETTINGS: '项目设置',
  PERMISSION_PROJECT_SETTINGS: '项目设置管理',
  PERMISSION_PROJECT_SETTINGS_DESC:
    '管理项目设置，包括项目基本信息、外部访问设置、网络策略、资源配额、日志收集设置等。',
  // List > Delete
  DELETE_ROLE: '删除角色',
  DELETE_ROLE_TIP: '您确定删除角色 <strong>{resource}</strong> 吗？',
  DELETE_ROLE_USER_TIP_PL:
    '当前角色已授权给 <strong>{count}</strong> 名用户，请先删除用户或更改用户的角色。',
  DELETE_ROLE_USER_TIP:
    '当前角色已授权给 <strong>{count}</strong> 名用户，请先删除用户或更改用户的角色。',
  DELETE_ROLE_DEPARTMENT_TIP_PL:
    '当前角色已授权给 <strong>{count}</strong> 个部门，请先删除部门或更改部门的角色。',
  DELETE_ROLE_DEPARTMENT_TIP:
    '当前角色已授权给 <strong>{count}</strong> 个部门，请先删除部门或更改部门的角色。',
};
