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
  // Navigation pane
  MONITORING_AND_ALERTING: 'İzleme & Uyarı',
  // Banner
  CLUSTER_STATUS: 'Küme Durumu',
  MONITORING_CLUSTER_DESC: 'Küme durumu, küme kaynaklarının genel görünümünü ve ayrıntılarını görüntüler. Küme kaynaklarının izleme verilerini ve kullanım sıralamasını görüntüleyebilirsiniz.',
  // Overview > Cluster Node Status
  CLUSTER_NODE_STATUS: 'Küme Düğümü Durumu',
  ALL_NODES: 'Tüm düğümler',
  ONLINE_NODES: 'Çevrimiçi düğümler',
  NODE_ONLINE_STATUS: 'Düğüm Çevrimiçi Durumu',
  TIMES_PER_SECOND: 'times/s',
  // Overview > Component Status
  COMPONENT_STATUS: 'Bileşen Durumu',
  CONTROLLER_MANAGER: 'Denetleyici Yöneticisi',
  KUBERNETES_SCHEDULER: 'Kubernetes Zamanlayıcı',
  // Overview > Cluster Resource Usage
  CLUSTER_RESOURCE_USAGE: 'Küme Kaynak Kullanımı',
  POD_COUNT: 'Bölmeler',
  COUNT: 'Saymak',
  PODS: 'Bölmeler',
  // Overview > etcd Monitoring
  SERVICE_STATUS: 'Servis Durumu',
  ETCD_MONITORING: 'etcd İzleme',
  DB_SIZE: 'DB Boyut',
  RAFT_PROPOSAL: 'Raft Teklifi',
  ETCD_STATUS: 'Servis<span>Durum</span>',
  ETCD_PROPOSAL: 'Raft<span>Teklif</span>',
  ETCD_DB_SIZE: 'DB<span>Boyut</span>',
  ETCD_CLIENT_TRAFFIC: 'İstemci<span>Trafik</span>',
  TITLE_UNIT: '{title}{unit}',
  AVERAGE: 'Average',
  PROPOSAL_COMMITTED: 'Committed',
  PROPOSAL_APPLIED: 'Applied',
  PROPOSAL_FAILED: 'Başarısız',
  PROPOSAL_PENDING: 'Bekliyor',
  // Overview > Service Component Monitoring
  SERVICE_COMPONENT_MONITORING: 'Hizmet Bileşeni İzleme',
  SCHEDULE_ATTEMPTS: 'Zamanlama Girişimleri',
  SCHEDULING_RATE: 'Zamanlama Oranı',
  REQUEST: 'İstek',
  REQUEST_PER_SECOND: 'Requests per Second',
  SCHEDULER: 'Zamanlayıcı',
  TOTAL_AVERAGE: 'Toplam',
  SUCCESS: 'Başarı',
  ERROR: 'Hata',
  FAILURE: 'Arıza',
  REQUEST_LATENCY_TCAP: 'İstek<span>Gecikme</span>',
  REQUEST_RATE: 'Istek<span>Oran</span>',
  SCHEDULE_ATTEMPTS_TCAP: 'Zamanlama<span>Girişimler</span>',
  SCHEDULING_RATE_TCAP: 'Zamanlama<span>Oran</span>',
  API_SERVER: 'API Sunucu',
  // Physical Resource Monitoring
  SELECT_TIME_RANGE: 'Zaman Aralığını Seçin',
  LAST_TIME: 'Geçen{value}',
  LAST_TIME_M: '{num, plural,=1 {Son 1 dakiak}other{Son#dakikalar}}',
  LAST_TIME_H: '{num, plural, one {} =1 {Son 1 saat} other{Geçen # saatler}}',
  LAST_TIME_D: '{num, plural, one {} =1 {Son 1 gün} other{Son # günler}}',
  TIMERANGE_SELECTOR_MSG: 'Bitiş zamanı başlangiç zamanından sonra olmalıdır.',
  TIMERANGE_SELECTOR_ERROR_MSG: 'Lütfen seçilen zaman aralığının uygun olup olmadığını onaylayın!',
  PHYSICAL_RESOURCES_MONITORING: 'Fiziksel Kaynak İzleme',
  INODE_USAGE: 'Düğüm indeksi Kullanımı',
  DISK_USAGE: 'Disk Kullanımı',
  DISK_USAGE_DETAILS: 'Disk Usage Details',
  AVERAGE_CPU_LOAD: 'Ortalama CPU Yükü',
  DISK_THROUGHPUT: 'Disk Verimi',
  POD_STATUS: 'Kapsül Durumu',
  COMPLETED: 'Tamamlanmış',
  WARNING: 'Uyarı',
  READ: 'Oku',
  WRITE: 'Yazma',
  RUNNING: 'Çalışan',
  // Physical Resource Monitoring > Average CPU Load
  TIME_M: '{num, plural, one {} =1 {1 dakika} other{# dakikalar}}',
  TIME_H: '{num, plural, =1 {1 hour} other{# hours}}',
  TIME_D: '{num, plural, =1 {1 day} other{# days}}',
  // etcd Monitoring
  EXTERNAL_ETCD: 'Harici etcd',
  DB_FSYNC: 'DB Fsync',
  GRPC_STREAM_MESSAGES: 'gPRC Akış Mesajı',
  CLIENT_TRAFFIC: 'İstemci Trafik',
  RECEIVED: 'Alınan',
  SENT: 'Gönder',
  WAL_FSYNC: 'WAL Fsync',
  ETCD_LEADER_TITLE: 'Lider var',
  ETCD_CHANGES_TITLE: '1 saatte değişen Lider',
  NODE_IP_ADDRESS_VALUE: 'Düğüm IP Adresi:{value}',
  // API Server Monitoring
  API_SERVER_MONITORING: 'API Sunucu İzleme',
  REQUEST_LATENCY: 'Gecikme İstekleri',
  REQUEST_LATENCY_MS: 'Gecikme İstekleri (ms)',
  REST_CREATE: 'OLUŞTUR',
  REST_DELETE: 'SİL',
  REST_DELETECOLLECTION: 'KOLEKSİYONUSİL',
  REST_GET: 'ALMAK',
  REST_POST: 'İLETİ',
  REST_PATCH: 'YAMA',
  REST_PUT: 'KOYMAK',
  REST_UPDATE: 'GÜNCELLE',
  REST_LIST: 'LİSTE',
  // Scheduler Monitoring
  SCHEDULER_MONITORING: 'Zamanlayıcı İzleme',
  SCHEDULING_LATENCY: 'Zamanlama Gecikmesi',
  // Resource Usage Ranking
  RESOURCE_USAGE_RANKING: 'Kaynak Kullanımı Sıralaması',
  SORT_BY_NODE_CPU_UTILISATION: 'Sort by CPU usage (%)',
  SORT_BY_NODE_MEMORY_UTILISATION: 'Sort by memory usage (%)',
  SORT_BY_NODE_DISK_SIZE_UTILISATION: 'Sort by disk usage (%)',
  SORT_BY_NODE_POD_UTILISATION: 'Kapsül kullanımına göre sırala',
  SORT_BY_NODE_DISK_INODE_UTILISATION: 'Inode kullanımına göre sırala',
  SORT_BY_NODE_LOAD1: 'Sort by 1-minute CPU load average',
  SORT_BY_NAMESPACE_MEMORY_USAGE_WO_CACHE: 'Bellek kullanımına göre sırala',
  POD_USAGE: 'Kapsül Kullanımı',
  EXPORT: 'Dışa Aktar'
};