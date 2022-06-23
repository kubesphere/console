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
  // Edit Quotas
  EDIT_QUOTAS: 'Kotaları Düzenle',
  QUOTA: 'Kota',
  PROJECT_QUOTAS_NOT_SET: 'Proje Kotaları Belirlenmedi',
  PROJECT_QUOTAS_DESC: 'Proje kotaları, kullanılabilir CPU ve bellek kaynaklarının sayısını ve projede izin verilen bölmeler, dağıtımlar ve hizmetler gibi uygulama kaynaklarının maksimum sayısını belirtir.',
  DEFAULT_CONTAINER_QUOTAS_NOT_SET: 'Varsayılan Konteyner Kotaları Ayarlanmadı',
  DEFAULT_CONTAINER_QUOTAS_DESC: 'Varsayılan konteyner kotaları, projede oluşturulan konteynerlerin varsayılan CPU isteğini, CPU sınırını, bellek isteğini ve bellek sınırını belirtir.',
  APPLICATION_RESOURCE_COUNT: 'Uygulama Kaynakları',
  SELECT_RESOURCE_TIP: 'Bir kaynak seçin veya bir kaynak adı girin',
  NUMBER_OF_PODS: 'Hacim Sayısı',
  NUMBER_OF_DEPLOYMENTS: 'Dağıtım Sayısı',
  NUMBER_OF_STATEFULSETS: 'Durum Bilgi Kümelerinin Sayısı',
  NUMBER_OF_DAEMONSETS: 'Daemonset Sayısı',
  NUMBER_OF_JOBS: 'İş Sayısı',
  NUMBER_OF_CRONJOBS: 'Cronjobs Sayısı',
  NUMBER_OF_VOLUMES: 'Kalıcı hacim taleplerinin sayısı',
  NUMBER_OF_SERVICES: 'Hizmet Sayısı',
  NUMBER_OF_ROUTES: 'Rota Sayısı',
  NUMBER_OF_SECRETS: 'Gizlilik Sayısı',
  NUMBER_OF_CONFIGMAPS: 'Yapılandırma Haritası Sayısı',
  // Deployed Apps
  INSTALLED_APPS: 'Yüklü Uygulamalar',
  // Resource Status
  RESOURCE_STATUS: 'Kaynak Durumu',
  // Resource Status > Application Resources
  RESOURCE_WARNING_TIPS: 'Anormal {tipName}: {warnNum}',
  // Resource Status > Physical Resources
  PHYSICAL_RESOURCE_PL: 'Fiziksel Kaynaklar',
  CPU_USAGE_TIME: 'CPU Kullanımı ({time})',
  MEMORY_USAGE_TIME: 'Bellek Kullanımı ({time})',
  // Tips
  TIPS: 'İpuçları',
  HOW_TO_INVITE_USERS: 'Kullanıcıları mevcut projeye nasıl davet ederim?',
  HOW_TO_SET_PROJECT_GATEWAY: 'Proje ağ geçidini nasıl ayarlarım?',
  // Top 5 for Resource Usage
  TOP_5_FOR_RSC_USAGE: 'Kaynak Kullanımında İlk 5',
  TOP_5_FOR_RESOURCE_USAGE: 'Kaynak Kullanımında İlk 5',
  SORT_BY_WORKLOAD_CPU_USAGE: 'CPU kullanımına göre sırala',
  SORT_BY_WORKLOAD_MEMORY_USAGE_WO_CACHE: 'Bellek kullanımına göre sırala',
  SORT_BY_WORKLOAD_NET_BYTES_TRANSMITTED: 'Giden trafiğe göre sırala',
  SORT_BY_WORKLOAD_NET_BYTES_RECEIVED: 'Gelen trafiğe göre sırala'
};