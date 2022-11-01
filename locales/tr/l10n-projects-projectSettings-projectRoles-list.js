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
  ROLE_PROJECT_ADMIN: 'Manage all resources in the project.',
  ROLE_PROJECT_REGULAR: 'Projedeki kullanıcılar ve roller dışındaki kaynakları yönetin.',
  ROLE_PROJECT_VIEWER: 'Projedeki tüm kaynakları görüntüleyin.',
  ROLE_PROJECT_OPERATOR: 'Projedeki kullanıcılar ve roller dışındaki kaynakları yönetin.',
  PROJECT_ROLE_EMPTY_DESC: 'Lütfen bir proje rolü oluşturun.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Edit Permissions > Application Workloads
  PERMIGROUP_APPLICATION_WORKLOADS: 'Uygulama İş Yükleri',
  PERMISSION_APPLICATION_WORKLOADS_VIEW: 'Uygulama İş Yükü Görüntüleme',
  PERMISSION_APPLICATION_WORKLOADS_VIEW_DESC: 'Projedeki uygulamalar, hizmetler, iş yükleri, işler, gri tonlamalı yayın işleri ve görüntü oluşturucular gibi kaynakları görüntüleyin.',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT: 'Uygulama İş Yükü Yönetimi',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT_DESC: 'Projede uygulamalar, hizmetler, iş yükleri, işler, gri tonlamalı yayın işleri ve görüntü oluşturucular gibi kaynakları oluşturun, düzenleyin ve silin.',
  // List > Edit Permissions > Storage
  PERMIGROUP_STORAGE_MANAGEMENT: 'Depolama',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW: 'Depolama Anlık Görüntüsü Görüntüleme',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW_DESC: 'Projedeki depolama anlık görüntülerini görüntüleyin.',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT: 'Depolama Anlık Görüntü Yönetimi',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT_DESC: 'Projede depolama anlık görüntülerini oluşturun, düzenleyin ve silin.',
  PERMISSION_VOLUMES_VIEW: 'Kalıcı Depolama Talebi',
  PERMISSION_VOLUMES_VIEW_DESC: 'Projedeki kalıcı depolama taleplerini görüntüleyin.',
  PERMISSION_VOLUMES_MANAGEMENT: 'Kalıcı Depolama Talebi',
  PERMISSION_VOLUMES_MANAGEMENT_DESC: 'Projede uyarı ilkeleri oluşturun, düzenleyin ve silin.',
  // List > Edit Permissions > Configuration
  PERMIGROUP_CONFIGURATION_CENTER: 'Yapılandırma',
  PERMISSION_CONFIGMAPS_VIEW: 'Yapılandırma Haritası Görüntüleme',
  PERMISSION_CONFIGMAPS_VIEW_DESC: 'Projedeki yapılandırma haritalarını görüntüleyin.',
  PERMISSION_CONFIGMAPS_MANAGEMENT: 'Yapılandırma Haritası Yönetimi',
  PERMISSION_CONFIGMAPS_MANAGEMENT_DESC: 'Projede yapılandırma haritaları oluşturun, düzenleyin ve silin.',
  PERMISSION_SECRETS_VIEW: 'Gizlilik Görüntüleme',
  PERMISSION_SECRETS_VIEW_DESC: 'Projedeki gizlilği görüntüleyin.',
  PERMISSION_SECRETS_MANAGEMENT: 'Gizlilik Yönetimi',
  PERMISSION_SECRETS_MANAGEMENT_DESC: 'Projede gizliliği oluşturun, düzenleyin ve silin.',
  PERMISSION_SERVICEACCOUNT_VIEW: 'Hizmet Hesabı Görüntüleme',
  PERMISSION_SERVICEACCOUNT_VIEW_DESC: 'Projedeki hizmet hesaplarını görüntüleyin.',
  PERMISSION_SERVICEACCOUNT_MANAGEMENT: 'Hizmet Hesabı Yönetimi',
  PERMISSION_SERVICEACCOUNT_MANAGEMENT_DESC: 'Projede hizmet hesapları oluşturun, düzenleyin ve silin.',
  // List > Edit Permissions > Monitoring & Alerting
  PERMIGROUP_MONITORING_ALERTING: 'İzleme & Uyarı',
  PERMISSION_ALERTING_MESSAGES_VIEW: 'Alert Viewing',
  PERMISSION_ALERTING_MESSAGES_VIEW_DESC: 'View alerts in the project.',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT: 'Alert Management',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT_DESC: 'Comment on and delete alerts in the project.',
  PERMISSION_ALERTING_POLICIES_VIEW: 'Rule Group Viewing',
  PERMISSION_ALERTING_POLICIES_VIEW_DESC: 'View rule groups in the project.',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT: 'Rule Group Management',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT_DESC: 'Create, edit, and delete rule groups in the project.',
  PERMISSION_CUSTOM_MONITORING_VIEW: 'Özel İzleme Görüntüleme',
  PERMISSION_CUSTOM_MONITORING_VIEW_DESC: 'Projedeki özel izleme panolarını görüntüleyin.',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT: 'Özel İzleme Yönetimi',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT_DESC: 'Projede özel izleme panoları oluşturun, düzenleyin ve silin.',
  // List > Edit Permissions > Access Control
  PERMISSION_PROJECT_MEMBERS_VIEW: 'Üye Görüntüleme',
  PERMISSION_PROJECT_MEMBERS_VIEW_DESC: 'Proje üyelerini görüntüleyin.',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT: 'Üye yönetimi',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT_DESC: 'Proje üyelerini davet edin, düzenleyin ve kaldırın.',
  PERMISSION_PROJECT_ROLES_VIEW: 'Rol İzleme',
  PERMISSION_PROJECT_ROLES_VIEW_DESC: 'Proje rollerini görüntüleyin.',
  PERMISSION_PROJECT_ROLES_MANAGEMENT: 'Rol (Role) Yönetimi',
  PERMISSION_PROJECT_ROLES_MANAGEMENT_DESC: 'Önceden ayarlanmış roller dışında proje rolleri oluşturun, düzenleyin ve silin.',
  // List > Edit Permissions > Project Settings
  PERMIGROUP_PROJECT_SETTINGS: 'Proje Ayarları',
  PERMISSION_PROJECT_SETTINGS: 'Çalışma alanı Ayarları Yönetimi',
  PERMISSION_PROJECT_SETTINGS_DESC: 'Proje temel bilgileri, harici erişim ayarları, ağ ilkeleri, kaynak kotaları ve günlük toplama ayarları dahil proje ayarlarını yönetin.',
  // List > Delete
  DELETE_ROLE: 'Rolü Sil',
  DELETE_ROLE_TIP: '<strong>{resource}</strong> rolünü silmek istediğinizden emin misiniz?',
  DELETE_ROLE_USER_TIP_PL: 'Rol, <strong>{count}</strong> kullanıcı için yetkilendirilmiştir. Lütfen önce kullanıcıları silin veya kullanıcının rollerini değiştirin.',
  DELETE_ROLE_USER_TIP: 'Rol, <strong>{count}</strong> kullanıcısına yetkilendirilmiştir. Lütfen önce kullanıcıyı silin veya kullanıcının rolünü değiştirin.',
  DELETE_ROLE_DEPARTMENT_TIP_PL: 'Rol, <strong>{count}</strong> departman için yetkilendirilmiştir. Lütfen önce departmanları silin veya departmanların rollerini değiştirin.',
  DELETE_ROLE_DEPARTMENT_TIP: 'Rol, <strong>{count}</strong> departmanı için yetkilendirilmiştir. Lütfen önce departmanı silin veya departmanın rolünü değiştirin.'
};