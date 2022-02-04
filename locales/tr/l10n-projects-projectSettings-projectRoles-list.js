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
  APPLICATION_WORKLOADS_MANAGEMENT: 'Uygulama İş Yükü Yönetimi',
  APPLICATION_WORKLOADS_VIEW: 'Uygulama İş Yükü Görüntüleme',
  APPLICATION_WORKLOADS_VIEW_DESC: 'Projedeki uygulamalar, hizmetler, iş yükleri, işler, gri tonlamalı yayın işleri ve görüntü oluşturucular gibi kaynakları görüntüleyin.',
  APPLICATION_WORKLOADS_MANAGEMENT_DESC: 'Projede uygulamalar, hizmetler, iş yükleri, işler, gri tonlamalı yayın işleri ve görüntü oluşturucular gibi kaynakları oluşturun, düzenleyin ve silin.',
  // List > Edit Permissions > Storage Management
  VOLUME_SNAPSHOTS_MANAGEMENT: 'Birim Anlık Görüntü Yönetimi',
  VOLUME_SNAPSHOTS_VIEW: 'Hacim Anlık Görüntüsü Görüntüleme',
  VOLUMES_MANAGEMENT: 'Hacim Yönetimi',
  VOLUMES_VIEW: 'Hacim Görüntüleme',
  VOLUME_SNAPSHOTS_VIEW_DESC: 'Projedeki birim anlık görüntülerini görüntüleyin.',
  VOLUME_SNAPSHOTS_MANAGEMENT_DESC: 'Projede birim anlık görüntülerini oluşturun, düzenleyin ve silin.',
  VOLUMES_VIEW_DESC: 'Projedeki hacimleri görüntüleyin.',
  VOLUMES_MANAGEMENT_DESC: 'Projede birimleri oluşturun, düzenleyin ve silin.',
  // List > Edit Permissions > Configuration Management
  CONFIGMAPS_MANAGEMENT: 'Yapılandırma Haritası Yönetimi',
  CONFIGMAPS_VIEW: 'Yapılandırma Haritası Görüntüleme',
  SECRETS_MANAGEMENT: 'Gizlilik Yönetimi',
  SECRETS_VIEW: 'Gizlilik Görüntüleme',
  SERVICEACCOUNT_MANAGEMENT: 'Hizmet Hesabı Yönetimi',
  SERVICEACCOUNT_VIEW: 'Hizmet Hesabı Görüntüleme',
  SECRETS_VIEW_DESC: 'Projedeki gizlilği görüntüleyin.',
  SECRETS_MANAGEMENT_DESC: 'Projede sırlar oluşturun, düzenleyin ve silin.',
  CONFIGMAPS_VIEW_DESC: 'Projedeki yapılandırma haritalarını görüntüleyin.',
  CONFIGMAPS_MANAGEMENT_DESC: 'Projede yapılandırma haritaları oluşturun, düzenleyin ve silin.',
  SERVICEACCOUNT_MANAGEMENT_DESC: 'Projede hizmet hesapları oluşturun, düzenleyin ve silin.',
  SERVICEACCOUNT_VIEW_DESC: 'Projedeki hizmet hesaplarını görüntüleyin.',
  // List > Edit Permissions > Monitoring & Alerting
  ALERTING_MESSAGES_MANAGEMENT: 'Uyarı Mesajları Yönetimi',
  ALERTING_MESSAGES_VIEW: 'Uyarı Mesajı Görüntüleme',
  ALERTING_POLICIES_MANAGEMENT: 'Uyarı Politikası Yönetimi',
  ALERTING_POLICIES_VIEW: 'Uyarı Politikası Görüntüleme',
  CUSTOM_MONITORING_VIEW: 'Özel İzleme Görüntüleme',
  CUSTOM_MONITORING_MANAGEMENT: 'Özel İzleme Yönetimi',
  CUSTOM_MONITORING_VIEW_DESC: 'Projedeki özel izleme panolarını görüntüleyin.',
  CUSTOM_MONITORING_MANAGEMENT_DESC: 'Projede özel izleme panoları oluşturun, düzenleyin ve silin.',
  ALERTING_POLICIES_VIEW_DESC: 'Projedeki uyarı politikalarını görüntüleyin.',
  ALERTING_POLICIES_MANAGEMENT_DESC: 'Projede uyarı ilkeleri oluşturun, düzenleyin ve silin.',
  ALERTING_MESSAGES_VIEW_DESC: 'Projedeki uyarı mesajlarını görüntüleyin.',
  ALERTING_MESSAGES_MANAGEMENT_DESC: 'Projedeki uyarı mesajlarına yorum yapın ve bunları silin.',
  // List > Edit Permissions > Access Control
  PROJECT_MEMBERS_MANAGEMENT: 'Üye yönetimi',
  PROJECT_MEMBERS_VIEW: 'Üye Görüntüleme',
  PROJECT_ROLES_MANAGEMENT: 'Rol Yönetimi',
  PROJECT_ROLES_VIEW: 'Role İzleme',
  PROJECT_ROLES_VIEW_DESC: 'Proje rollerini görüntüleyin.',
  PROJECT_ROLES_MANAGEMENT_DESC: 'Önceden ayarlanmış roller dışında proje rolleri oluşturun, düzenleyin ve silin.',
  PROJECT_MEMBERS_VIEW_DESC: 'Proje üyelerini görüntüleyin.',
  PROJECT_MEMBERS_MANAGEMENT_DESC: 'Proje üyelerini davet edin, düzenleyin ve kaldırın.',
  // List > Edit Permissions > Project Settings
  PROJECT_SETTINGS_DESC: 'Proje temel bilgileri, harici erişim ayarları, ağ ilkeleri, kaynak kotaları ve günlük toplama ayarları dahil proje ayarlarını yönetin.',
  // List > Delete
  DELETE_ROLE: 'Rolü Sil',
  DELETE_ROLE_TIP: '<strong>{resource}</strong> rolünü silmek istediğinizden emin misiniz?',
  DELETE_ROLE_USER_TIP_PL: 'Rol, <strong>{count}</strong> kullanıcı için yetkilendirilmiştir. Lütfen önce kullanıcıları silin veya kullanıcının rollerini değiştirin.',
  DELETE_ROLE_USER_TIP: 'Rol, <strong>{count}</strong> kullanıcısına yetkilendirilmiştir. Lütfen önce kullanıcıyı silin veya kullanıcının rolünü değiştirin.',
  DELETE_ROLE_DEPARTMENT_TIP_PL: 'Rol, <strong>{count}</strong> departman için yetkilendirilmiştir. Lütfen önce departmanları silin veya departmanların rollerini değiştirin.',
  DELETE_ROLE_DEPARTMENT_TIP: 'Rol, <strong>{count}</strong> departmanı için yetkilendirilmiştir. Lütfen önce departmanı silin veya departmanın rolünü değiştirin.'
};