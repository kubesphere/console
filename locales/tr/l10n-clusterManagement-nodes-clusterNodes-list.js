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
  CLUSTER_NODE_PL: 'Küme Düğümleri',
  CLUSTER_NODE: 'Küme Düğümü',
  CLUSTER_NODE_DESC: 'Küme düğümleri, KubeSphere kümesinin temel sunucularıdır. Bu sayfada küme düğümlerini yönetebilirsiniz.',
  NODE_TYPES_Q: 'Küme düğümlerinin türleri nelerdir?',
  NODE_TYPES_A: 'Düğümler, kontrol düzlemi düğümleri ve çalışan düğümleri olarak sınıflandırılır.',
  WHAT_IS_NODE_TAINTS_Q: 'Düğüm Kusurları nelerdir?',
  WHAT_IS_NODE_TAINTS_A: 'Kusurlar, bir düğümün belirli bölmeleri püskürtmesine izin verir. Kusurlar ve toleranslar, bölmelerin uygun olmayan düğümlere programlanmamasını sağlamak için birlikte çalışır.',
  LEARN_MORE: 'Daha fazla bilgi edinin',
  // Node Count
  NODE_SI: 'Düğüm',
  NODE_PL: 'Düğümler',
  MASTER_NODE_SI: 'Kontrol düzlemi düğümü',
  MASTER_NODE_PL: 'Kontrol düzlemi düğümleri',
  WORKER_NODE_SI: 'İşçi düğüm',
  WORKER_NODE_PL: 'İşçi düğümleri',
  // List
  KUBE_OPERATE: 'Çeşit',
  KUBE_ASCENDING_ORDER: 'Artan',
  KUBE_DESCENDING_ORDER: 'Azalan',
  KUBE_FILTER: 'Filtre',
  SEARCH: 'Ara',
  ADD_NODE: 'Düğüm Ekle',
  NODE_STATUS_UNSCHEDULABLE: 'Zamanlanamaz',
  NODE_STATUS_RUNNING: 'Çalışıyor',
  NODE_STATUS_WARNING: 'Uyarı',
  NODE_STATUS_PENDING: 'Oluşturuluyor',
  NODE_STATUS_FAILED: 'Başarısız',
  CLUSTER_NODE_EMPTY_DESC: 'Lütfen kümeye bir düğüm ekleyin.',
  NODE_NAME_EMPTY_DESC: 'Lütfen düğüm için bir ad belirleyin.',
  CPU_USAGE: 'CPU Kullanımı',
  MEMORY_USAGE: 'Bellek Kullanımı',
  CONTROL_PLANE: 'Kontrol Alanı',
  WORKER: 'İşçi',
  ALLOCATED_CPU: 'Ayrılmış CPU',
  ALLOCATED_MEMORY: 'Ayrılmış Bellek',
  CPU_LIMIT_SI: 'Kaynak Sınırı:{çekirdek} çekirdek{yüzde}',
  CPU_LIMIT_PL: 'Kaynak Sınırı: {çekirdek} çekirdek ({yüzde})',
  CPU_REQUEST_SI: '{çekirdek} çekirdek ({yüzde})',
  CPU_REQUEST_PL: '{çekirdek} çekirdek ({yüzde})',
  CORE_PL: 'çekirdek',
  CPU_CORE_PERCENT_SI: '{çekirdek} çekirdek ({yüzde})',
  CPU_CORE_PERCENT_PL: '{çekirdek} çekirdek ({yüzde})',
  MEMORY_GIB_PERCENT: '{gib} Gib ({çekirdek})',
  MEMORY_LIMIT_VALUE: 'Kaynak Sınırı:{gib} Gib ({çekirdek})',
  MEMORY_REQUEST_VALUE: '{gib} Gib ({çekirdek})',
  RESOURCE_REQUEST: 'Kaynak İstekleri',
  CORDON: 'Kordon',
  UNCORDON: 'Kordonu açmak',
  OPEN_TERMINAL: 'Terminal\'de Aç',
  CUSTOM_COLUMNS: 'Özel sütunlar',
  NO_MATCHING_RESULT_FOUND: 'Eşleşen sonuç bulunamadı',
  STATUS: 'Durum',
  TOTAL_ITEMS: 'Toplam:{num}',
  YOU_CAN_TRY_TO: 'You can try',
  REFRESH_DATA: 'refreshing data',
  CLEAR_SEARCH_CONDITIONS: 'clearing search conditions',
  // List > Edit Taints
  DUPLICATE_KEYS: 'Anahtar zaten mevcut. Lütfen başka bir anahtar giriniz.',
  EMPTY_KEY: 'Lütfen bir anahtar girin.'
};