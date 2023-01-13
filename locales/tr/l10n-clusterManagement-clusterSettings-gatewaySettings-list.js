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
  // Navigation Pane
  GATEWAY_SETTINGS: 'Ağ Geçidi Ayarları',
  // Banner
  CLUSTER_GATEWAY_DESC: 'Kümede harici ağ erişim ağ geçidi ve hizmet yönetiminin yapılandırmasını kurun ve yönetin.',
  // Cluster Gateway
  CLUSTER_GATEWAY_NOT_ENABLED: 'Küme Ağ Geçidi Etkin Değil',
  CLUSTER_ENABLE_GATEWAY_DESC: 'Lütfen küme ağ geçidini etkinleştirin.',
  CLUSTER_GATEWAY: 'Küme Ağ Geçidi',
  GATEWAY_ADDRESS_SCAP: 'Ağ Geçidi Adresi',
  LOAD_BALANCER_PROVIDER_SCAP: 'Yük dengeleyici sağlayıcı',
  // Cluster Gateway > Enable Gateway
  ENABLE_GATEWAY: 'Ağ geçidi etkinleştir',
  GATEWAY_TRACING_TIP: 'If ingresses cannot be accessed after <b>Tracing</b> is enabled, please add the annotation <b>nginx.ingress.kubernetes.io/service-upstream: true </b> to the ingress.',
  // Cluster Gateway > Manage > View Details
  VIEW_DETAILS: 'Detayları Göster',
  // Cluster Gateway > Manage > Disable
  DISABLE: 'Devre Dışı Bırak',
  DISABLE_GATEWAY: 'Ağ geçidi etkinleştir',
  DISABLE_GATEWAY_TIP: 'Bu ağgeçit donanımını kaldırmak istediğinize emin misiniz?',
  DISABLE_SUCCESSFUL: 'Başarıyla devre dışı bırakıldı.',
  // Cluster Gateway > Manage > Edit
  EDIT: 'Düzenle',
  EDIT_TITLE: 'Başlığı Düzenle',
  // Cluster Gateway > Manage > Update
  UPDATE: 'Güncelle',
  UPDATE_GATEWAY_DESC: 'The current gateway can be updated.',
  // Project Gateways
  PROJECT_GATEWAY_PL: 'Proje Ağ Geçidi',
  PROJECT_GATEWAY_NOT_ENABLED: 'Proje Ağ Geçidi Etkin Değil',
  PROJECT_ENABLE_GATEWAY_DESC: 'Lütfen proje ağ geçidini etkinleştirin.',
  REPLICA_COUNT: 'Kopyalar',
  NODE_PORTS: 'Düğüm Portu',
  UPDATE_GATEWAY_DESC: 'The current gateway can be updated.',
  // Project Gateways > Disable
  PROJECT_GATEWAY_LOW: 'proje Ağ Geçidi',
  DISABLE_MULTIPLE_GATEWAYS: 'Birden Çok Ağ Geçidini Devre Dışı Bırak'
};