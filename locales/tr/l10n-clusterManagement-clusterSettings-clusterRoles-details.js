/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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
  // Permissions
  // Permissions > Network
  PERMIGROUP_NETWORK_MANAGEMENT: 'Ağ',
  PERMISSION_NETWORK_RESOURCES_VIEW: 'Ağ Kaynağı Görüntüleme',
  PERMISSION_NETWORK_RESOURCES_MANAGEMENT: 'Ağ Kaynak Yönetimi',
  // Permissions > Project Resources
  PERMIGROUP_PROJECT_RESOURCES_MANAGEMENT: 'Proje kaynakları',
  PERMISSION_PROJECT_RESOURCES_VIEW: 'Proje Kaynak Görüntüleme',
  PERMISSION_PROJECT_RESOURCES_MANAGEMENT: 'Proje Kaynak Yönetimi',
  // Permissions > Storage
  PERMISSION_STORAGECLASSES_VIEW: 'Depolama Sınıfı Görüntüleme',
  PERMISSION_STORAGECLASSES_MANAGEMENT: 'Depolama Sınıfı Yönetimi',
  PERMISSION_VOLUME_SNAPSHOT_CLASSES_VIEW: 'Birim Anlık Görüntü Sınıfı Görüntüleme',
  PERMISSION_VOLUME_SNAPSHOT_CLASSES_MANAGEMENT: 'Birim Anlık Görüntüsü Sınıf Yönetimi',
  // Permissions > Cluster Resources
  PERMIGROUP_CLUSTER_RESOURCES_MANAGEMENT: 'Küme Kaynakları',
  PERMISSION_CRD_VIEW: 'Özel Kaynak Tanımı Görüntüleme',
  PERMISSION_CRD_MANAGEMENT: 'Özel Kaynak Tanımı Yönetimi',
  PERMISSION_NODES_VIEW: 'Node (Düğüm) Görüntüleme',
  PERMISSION_NODES_MANAGEMENT: 'Node (Düğüm) Yönetimi',
  PERMISSION_COMPONENTS_VIEW: 'Sistem Bileşeni Görüntüleme',
  // Permissions > Cluster Settings
  PERMIGROUP_CLUSTER_SETTINGS: 'Küme Ayarları',
  PERMISSION_CLUSTER_SETTINGS_VIEW: 'Küme (Cluster) Ayarları Görüntüleme',
  PERMISSION_CLUSTER_SETTINGS_MANAGEMENT: 'Küme (Cluster) Ayarları Yönetimi',
  // Permissions > Monitoring & Alerting
  PERMISSION_CLUSTER_MONITORING_VIEW: 'İzleme Bilgileri Görüntüleme',
  PERMISSION_CLUSTER_MONITORING_MANAGEMENT: 'İzleme Bilgi Yönetimi',
  // Permissions > Access Control
  PERMISSION_CLUSTER_ROLES_VIEW: 'Rol (Role) İzleme',
  PERMISSION_CLUSTER_ROLES_MANAGEMENT: 'Rol (Role) Yönetimi',
  PERMISSION_CLUSTER_MEMBERS_VIEW: 'Üye Görüntüleme',
  PERMISSION_CLUSTER_MEMBERS_MANAGEMENT: 'Üye yönetimi'
};