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
  // Details
  DETAILS: 'Detaylar',
  ARCHITECTURE: 'Mimari',
  OS_VERSION: 'İşletim sistemi sürümü',
  OS_TYPE: 'İşletim Sistemi Tipi',
  LINUX: 'Linux',
  KERNEL_VERSION: 'Çekirdek Sürümü',
  CONTAINER_RUNTIME: 'Kapsayıcı çalışma zamanı',
  KUBELET_VERSION: 'kubelet sürümü',
  KUBE_PROXY_VERSION: 'kube-elçi sürümü',
  IP_ADDRESS: 'IP Adresi',
  SCHEDULABLE: 'Zamanlanabilir',
  YES: 'Evet',
  // More > Edit Labels
  EDIT_LABELS: 'Etketleri düzenle',
  LABEL_PL: 'Etiketler',
  // More > Edit Taints
  TAINTS: 'Kusurlar',
  EDIT_TAINTS: 'Kusurları Düzenle',
  TAINTS_DESC: 'Bölmelerin düğümlere programlanmaması veya mümkünse düğümlere programlanmaması için düğümlere kusurlar ekleyin. Düğümlere kusurlar ekledikten sonra, bölmenin belirli kusurlara sahip düğümlere programlanmasına izin vermek için bir bölmede toleranslar ayarlayabilirsiniz.',
  ADD_TAINT: 'Kusur Ekle',
  COMMON_TAINTS: 'Yaygın Kusurlar',
  NOSCHEDULE: 'Prevent scheduling',
  PREFER_NOSCHEDULE: 'Prevent scheduling if possible',
  NOEXECUTE: 'Prevent scheduling and evict existing pods',
  TAINTS_TIPS: '<b>Prevent scheduling</b><br />Prevents all pods from being scheduled to the node.<br /><br /><b>Prevent scheduling if possible</b><br />Prevents all pods from being scheduled to the node if possible.<br /><br /><b>Prevent scheduling and evict existing pods</b><br />Prevents all pods from being scheduled to the node and evict all existing pods on the node.',
  // Running Status > Resource Usage
  RESOURCE_USAGE: 'Kaynak Kullanımı',
  MAXIMUM_PODS: 'Maksimum Kapsüller',
  MAXIMUM_PODS_SCAP: 'Maksimum Kapsüller',
  // Running Status > Allocated resources
  MEMORY_REQUEST_SCAP: 'Bellek isteği',
  MEMORY_LIMIT_SCAP: 'Bellek sınırı',
  CPU_REQUEST_SCAP: 'CPU isteği',
  CPU_LIMIT_SCAP: 'CPU Sınırlayıcı',
  // Running Status > Allocated Resources
  ALLOCATED_RESOURCES: 'Ayrılan Kaynaklar',
  // Running Status > Health Status
  RUNNING_STATUS: 'Çalışma Durumu',
  HEALTH_STATUS: 'Sağlık durumu',
  NODE_NETWORKUNAVAILABLE: 'Ağ Kullanılabirliği',
  NODE_NETWORKUNAVAILABLE_DESC: 'Düğümün ağ durumunun normal olup olmadığı.',
  NODE_MEMORYPRESSURE: 'Bellek Basıncı',
  NODE_MEMORYPRESSURE_DESC: 'Düğümün kalan belleğinin eşikten az olup olmadığı.',
  NODE_DISKPRESSURE: 'Disk Baskısı',
  NODE_DISKPRESSURE_DESC: 'Düğümün kalan disk alanı veya düğümlerinin eşikten az olup olmadığı.',
  NODE_PIDPRESSURE: 'PID Baskısı',
  NODE_PIDPRESSURE_DESC: 'Düğümde oluşturulmasına izin verilen işlem sayısının eşikten az olup olmadığı.',
  NODE_READY: 'Hazırlık',
  NODE_READY_DESC: 'Düğümün bölmeleri kabul etmeye hazır olup olmadığı.',
  // Running Status > Taints
  NO_TAINTS_TIPS: 'Herhangi bir kusur bulunamadı.',
  POLICY: 'Politika',
  // Pods
  READY_VALUE: 'Hazır:{hazırSayısı}/{toplam}',
  STATUS_VALUE: 'Durum:{değer}',
  CREATED_AGO: 'Yaratılan {diff}'
};