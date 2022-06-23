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
  PROJECT_ROLE_PL: 'Proje Rolleri',
  PROJECT_ROLE_DESC: 'Proje rolleri, proje üyelerinin izinlerini tanımlar.',
  // List
  ROLE_PROJECT_ADMIN: 'Projedeki tüm kaynakları kontrol edin.',
  ROLE_PROJECT_REGULAR: 'Projedeki kullanıcılar ve roller dışındaki kaynakları yönetin.',
  ROLE_PROJECT_VIEWER: 'Projedeki tüm kaynakları görüntüleyin.',
  ROLE_PROJECT_OPERATOR: 'Projedeki kullanıcılar ve roller dışındaki kaynakları yönetin.',
  PROJECT_ROLE_EMPTY_DESC: 'Lütfen bir proje rolü oluşturun.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Edit Permissions > Application Workloads
  PERMIGROUP_APPLICATION_WORKLOADS: 'Uygulama İş Yükleri',
  PERMISSION_APPLICATION_WORKLOADS_VIEW: 'Application Workload Viewing',
  PERMISSION_APPLICATION_WORKLOADS_VIEW_DESC: 'View resources such as applications, services, workloads, jobs, grayscale release jobs, and image builders in the project.',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT: 'Application Workload Management',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT_DESC: 'Create, edit, and delete resources such as applications, services, workloads, jobs, grayscale release jobs, and image builders in the project.',
  // List > Edit Permissions > Storage
  PERMIGROUP_STORAGE_MANAGEMENT: 'Depolama',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW: 'Volume Snapshot Viewing',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW_DESC: 'View volume snapshots in the project.',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT: 'Volume Snapshot Management',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT_DESC: 'Create, edit, and delete volume snapshots in the project.',
  PERMISSION_VOLUMES_VIEW: 'Persistent Volume Claim Viewing',
  PERMISSION_VOLUMES_VIEW_DESC: 'View persistent volume claims in the project.',
  PERMISSION_VOLUMES_MANAGEMENT: 'Persistent Volume Claim Management',
  PERMISSION_VOLUMES_MANAGEMENT_DESC: 'Create, edit, and delete persistent volume claims in the project.',
  // List > Edit Permissions > Configuration
  PERMIGROUP_CONFIGURATION_CENTER: 'Yapılandırma',
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
  PERMISSION_SERVICEACCOUNT_MANAGEMENT_DESC: 'Create, edit, and delete service accounts in the project.',
  // List > Edit Permissions > Monitoring & Alerting
  PERMIGROUP_MONITORING_ALERTING: 'İzleme & Uyarı',
  PERMISSION_ALERTING_MESSAGES_VIEW: 'Alerting Message Viewing',
  PERMISSION_ALERTING_MESSAGES_VIEW_DESC: 'View alerting messages in the project.',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT: 'Alerting Message Management',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT_DESC: 'Comment on and delete alerting messages in the project.',
  PERMISSION_ALERTING_POLICIES_VIEW: 'Alerting Policy Viewing',
  PERMISSION_ALERTING_POLICIES_VIEW_DESC: 'View alerting policies in the project.',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT: 'Alerting Policy Management',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT_DESC: 'Create, edit, and delete alerting policies in the project.',
  PERMISSION_CUSTOM_MONITORING_VIEW: 'Custom Monitoring Viewing',
  PERMISSION_CUSTOM_MONITORING_VIEW_DESC: 'View custom monitoring dashboards in the project.',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT: 'Custom Monitoring Management',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT_DESC: 'Create, edit, and delete custom monitoring dashboards in the project.',
  // List > Edit Permissions > Access Control
  PERMISSION_PROJECT_MEMBERS_VIEW: 'Üye Görüntüleme',
  PERMISSION_PROJECT_MEMBERS_VIEW_DESC: 'View project members.',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT: 'Üye yönetimi',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT_DESC: 'Invite, edit, and remove project members.',
  PERMISSION_PROJECT_ROLES_VIEW: 'Rol (Role) İzleme',
  PERMISSION_PROJECT_ROLES_VIEW_DESC: 'View project roles.',
  PERMISSION_PROJECT_ROLES_MANAGEMENT: 'Rol (Role) Yönetimi',
  PERMISSION_PROJECT_ROLES_MANAGEMENT_DESC: 'Create, edit, and delete project roles except preset roles.',
  // List > Edit Permissions > Project Settings
  PERMIGROUP_PROJECT_SETTINGS: 'Proje Ayarları',
  PERMISSION_PROJECT_SETTINGS: 'Çalışma alanı Ayarları Yönetimi',
  PERMISSION_PROJECT_SETTINGS_DESC: 'Manage project settings including project basic information, external access settings, network policies, resource quotas, and log collection settings.',
  // List > Delete
  DELETE_ROLE: 'Rolü Sil',
  DELETE_ROLE_TIP: '<strong>{resource}</strong> rolünü silmek istediğinizden emin misiniz?',
  DELETE_ROLE_USER_TIP_PL: 'Rol, <strong>{count}</strong> kullanıcı için yetkilendirilmiştir. Lütfen önce kullanıcıları silin veya kullanıcının rollerini değiştirin.',
  DELETE_ROLE_USER_TIP: 'Rol, <strong>{count}</strong> kullanıcısına yetkilendirilmiştir. Lütfen önce kullanıcıyı silin veya kullanıcının rolünü değiştirin.',
  DELETE_ROLE_DEPARTMENT_TIP_PL: 'Rol, <strong>{count}</strong> departman için yetkilendirilmiştir. Lütfen önce departmanları silin veya departmanların rollerini değiştirin.',
  DELETE_ROLE_DEPARTMENT_TIP: 'Rol, <strong>{count}</strong> departmanı için yetkilendirilmiştir. Lütfen önce departmanı silin veya departmanın rolünü değiştirin.'
};