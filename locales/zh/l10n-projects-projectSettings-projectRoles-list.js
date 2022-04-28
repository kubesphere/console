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
  APPLICATION_WORKLOADS_MANAGEMENT: '应用负载管理',
  APPLICATION_WORKLOADS_VIEW: '应用负载查看',
  APPLICATION_WORKLOADS_VIEW_DESC: '查看项目中的应用、服务、工作负载、任务、灰度发布任务和镜像构建器等资源。',
  APPLICATION_WORKLOADS_MANAGEMENT_DESC: '创建、编辑和删除项目中的应用、服务、工作负载、任务、灰度发布任务和镜像构建器等资源。',
  // List > Edit Permissions > Storage Management
  VOLUME_SNAPSHOTS_MANAGEMENT: '卷快照管理',
  VOLUME_SNAPSHOTS_VIEW: '卷快照查看',
  VOLUMES_MANAGEMENT: '卷管理',
  VOLUMES_VIEW: '卷查看',
  VOLUME_SNAPSHOTS_VIEW_DESC: '查看项目中的卷快照。',
  VOLUME_SNAPSHOTS_MANAGEMENT_DESC: '创建、编辑和删除项目中的卷快照。',
  VOLUMES_VIEW_DESC: '查看项目中的卷。',
  VOLUMES_MANAGEMENT_DESC: '创建、编辑和删除项目中的卷。',
  // List > Edit Permissions > Configuration Management
  CONFIGMAPS_MANAGEMENT: '配置字典管理',
  CONFIGMAPS_VIEW: '配置字典查看',
  SECRETS_MANAGEMENT: '保密字典管理',
  SECRETS_VIEW: '保密字典查看',
  SERVICEACCOUNT_MANAGEMENT: '服务帐户管理',
  SERVICEACCOUNT_VIEW: '服务帐户查看',
  SECRETS_VIEW_DESC: '查看项目中的保密字典。',
  SECRETS_MANAGEMENT_DESC: '创建、编辑和删除项目中的保密字典。',
  CONFIGMAPS_VIEW_DESC: '查看项目中的配置字典。',
  CONFIGMAPS_MANAGEMENT_DESC: '创建、编辑和删除项目中的配置字典。',
  SERVICEACCOUNT_MANAGEMENT_DESC: '创建、编辑和删除项目中的服务帐户。',
  SERVICEACCOUNT_VIEW_DESC: '查看项目中的服务帐户。',
  // List > Edit Permissions > Monitoring & Alerting
  ALERTING_MESSAGES_MANAGEMENT: '告警消息管理',
  ALERTING_MESSAGES_VIEW: '告警消息查看',
  ALERTING_POLICIES_MANAGEMENT: '告警策略管理',
  ALERTING_POLICIES_VIEW: '告警策略查看',
  CUSTOM_MONITORING_VIEW: '自定义监控查看',
  CUSTOM_MONITORING_MANAGEMENT: '自定义监控管理',
  CUSTOM_MONITORING_VIEW_DESC: '查看项目中的自定义监控面板。',
  CUSTOM_MONITORING_MANAGEMENT_DESC: '创建、编辑和删除项目中的自定义监控面板。',
  ALERTING_POLICIES_VIEW_DESC: '查看项目中的告警策略。',
  ALERTING_POLICIES_MANAGEMENT_DESC: '创建、编辑和删除项目中的告警策略。',
  ALERTING_MESSAGES_VIEW_DESC: '查看项目中的告警消息。',
  ALERTING_MESSAGES_MANAGEMENT_DESC: '评论和删除项目中的告警消息。',
  // List > Edit Permissions > Access Control
  PROJECT_MEMBERS_MANAGEMENT: '成员管理',
  PROJECT_MEMBERS_VIEW: '成员查看',
  PROJECT_ROLES_MANAGEMENT: '角色管理',
  PROJECT_ROLES_VIEW: '角色查看',
  PROJECT_ROLES_VIEW_DESC: '查看项目角色。',
  PROJECT_ROLES_MANAGEMENT_DESC: '创建、编辑和删除系统预置角色以外的项目角色。',
  PROJECT_MEMBERS_VIEW_DESC: '查看项目成员。',
  PROJECT_MEMBERS_MANAGEMENT_DESC: '邀请、编辑和移除项目成员。',
  // List > Edit Permissions > Project Settings
  PROJECT_SETTINGS_DESC: '管理项目设置，包括项目基本信息、外部访问设置、网络策略、资源配额、日志收集设置等。',
  // List > Delete
  DELETE_ROLE: '删除角色',
  DELETE_ROLE_TIP: '您确定删除角色 <strong>{resource}</strong> 吗？',
  DELETE_ROLE_USER_TIP_PL: '当前角色已授权给 <strong>{count}</strong> 名用户，请先删除用户或更改用户的角色。',
  DELETE_ROLE_USER_TIP: '当前角色已授权给 <strong>{count}</strong> 名用户，请先删除用户或更改用户的角色。',
  DELETE_ROLE_DEPARTMENT_TIP_PL: '当前角色已授权给 <strong>{count}</strong> 个部门，请先删除部门或更改部门的角色。',
  DELETE_ROLE_DEPARTMENT_TIP: '当前角色已授权给 <strong>{count}</strong> 个部门，请先删除部门或更改部门的角色。'
};