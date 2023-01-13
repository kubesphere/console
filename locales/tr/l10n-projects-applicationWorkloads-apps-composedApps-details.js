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
  // More > Add Service
  ADD_SERVICE: 'Hizmet Ekle',
  ADD_ROUTE: 'Add Ingress',
  SERVICE_ADDED_SUCCESSFULLY: 'The service was added successfully.',
  // More > Add Ingress
  // Attributes
  // Resource Status
  WORKLOAD_TYPE_DEPLOYMENTS: 'Dağıtım',
  WORKLOAD_TYPE_DAEMONSETS: 'Daemonset',
  WORKLOAD_TYPE_STATEFULSETS: 'Durum Bilgisi',
  // Traffic Monitoring
  TRAFFIC_MONITORING: 'Trafik İzleme',
  TRAFFIC_MONITORING_UNAVAILABLE_DESC: 'Uygulama uzun süredir istek almıyor. Lütfen daha sonra tekrar deneyiniz.',
  TRAFFIC_ENTRY: 'Trafik Girişi',
  NO_DATA: 'Veri Yok',
  REFRESH: 'Yenile',
  SUCCESS_RATE: 'Başarı Oranı',
  TRAFFIC_RPS: 'Trafik (RPS)',
  BANDWIDTH: 'Bant Genişliği',
  HTTP_INBOUND_TRAFFIC: 'TCP Gelen Trafik',
  HTTP_OUTBOUND_TRAFFIC: 'TCP Giden Trafik',
  TRAFFIC_POLICIES: 'Trafik Politikaları',
  LOAD_BALANCING: 'Yük Dengeleme Yazılımı',
  LOAD_BALANCING_ALGORITHM: 'Yük Dengeleme Algoritması',
  LB_ROUND_ROBIN: 'Hepsini birer kez deneme',
  LB_LEAST_CONN: 'En az bağlantı',
  LB_RANDOM: 'Rastgele',
  LB_ALG_DESC: '<strong>Round robin</strong>: İstemci isteklerini dönüşümlü olarak arka uçlara dağıtır.<br/><strong>En az bağlantı</strong>: Rastgele iki sağlıklı arka uç seçer ve istemci isteklerini daha az bağlantısı olan birine gönderir.<br /><strong>Rastgele</strong>: İstemci isteklerini tüm sağlıklı arka uçlardan rastgele seçilen bir arka uca gönderir.',
  HASH_BASED_ON_HTTP_HEADER: 'HTTP başlığına dayalı karma',
  HASH_BASED_ON_HTTP_COOKIE: 'HTTP tanımlama bilgisine dayalı karma',
  HASH_BASED_ON_SOURCE_IP_ADDRESS: 'Kaynak IP adresine dayalı karma',
  HTTP_HEADER: 'HTTP Başlığı',
  HTTP_COOKIE: 'HTTP Çerez',
  CONNECTION_POOL: 'Bağlantı Havuzu',
  CONNECTION_POOL_TIP: 'Uygulama için sabit sayıda bağlantı nesnesi oluşturur ve bunları yeniden kullanım için bir bağlantı havuzunda saklar. Her istek için bağlantı havuzundan bir bağlantı nesnesi alınır ve kullanımdan sonra havuza döndürülür.',
  MAXIMUM_CONNECTIONS: 'Maksimum Bağlantı',
  MAXIMUM_CONNECTIONS_DESC: 'Bir hedef arka uca maksimum HTTP1 veya TCP bağlantısı sayısı.',
  MAXIMUM_REQUESTS_PER_CONNECTION: 'Bağlantı Başına Maksimum İstek',
  MAXIMUM_REQUESTS_PER_CONNECTION_DESC: 'Bir arka uca bağlantı başına maksimum istek sayısı.',
  TRAFFIC_MONITORING_MAXIMUM_RETRIES: 'Maksimum Yeniden Deneme',
  TRAFFIC_MONITORING_MAXIMUM_RETRIES_DESC: 'İstekler için maksimum yeniden deneme sayısı.',
  CONNECTION_TIMEOUT: 'Bağlantı zaman aşımına uğradı',
  CONNECTION_TIMEOUT_DESC: 'TCP bağlantı zaman aşımı süresi.',
  MAXIMUM_REQUESTS: 'Maksimum İstekler',
  MAXIMUM_PENDING_REQUESTS: 'Maksimum Bekleyen İstekler',
  CIRCUIT_BREAKER: 'Devre Kesici',
  CIRCUIT_BREAKER_DESC: 'Bir hizmete erişilemiyorsa ve belirtilen kriterler karşılanıyorsa, devre kesici hizmeti kullanılamıyor olarak işaretler ve belirli bir süre boyunca doğrudan istemcilere hata yanıtı verir.',
  CONSECUTIVE_FIVEXX_ERRORS: 'Ardışık 5XX Hataları',
  CONSECUTIVE_FIVEXX_ERRORS_DESC: 'Bağlantı havuzundan bir arka uç çıkarılmadan önceki 5XX hatalarının sayısı.',
  INSPECTION_INTERVAL_S: 'Kontrol Aralıkları',
  INSPECTION_INTERVAL_S_DESC: 'İki arka uç denetimi arasındaki aralık.',
  MAXIUM_EJECTION_RATIO: 'Maksimum Ejeksiyon Oranı (%)',
  MAXIUM_EJECTION_RATIO_DESC: 'Çıkarılabilecek maksimum arka uç yüzdesi.',
  BASE_EJECTION_TIME_S: 'Baz Çıkarma Süresi (s)',
  BASE_EJECTION_TIME_S_DESC: 'Maksimum fırlatma süresi.',
  UPDATED_AT_VALUE_SCAP: '{value} Değerinde güncellendi.',
  METHOD: 'Method',
  TRAFFIC_MANAGEMENT_UNAVAILABLE: 'Traffic Management Unavailable',
  APPLICATION_GOVERNANCE_NOT_ENABLED: 'Please enable Application Governance.',
  // Grayscale Release
  CREATE_GRAYSCALE_RELEASE_TASK: 'Create Grayscale Release Task',
  GRAYSCALE_RELEASE_DESC: 'Gri tonlamalı sürüm, üretim ortamında önemli bir uygulama yineleme yöntemini temsil eder. Uygulamalarınızı yeni bir sürüme yükseltirken sorunsuz geçiş için farklı yayın yöntemleri seçebilirsiniz.',
  NO_GRAYSCALE_RELEASE_TASK_FOUND: 'No Grayscale Release Task Found',
  NO_GRAYSCALE_RELEASE_TASK_FOUND_DESC: 'Lütfen bir gri tonlamalı yayın işi oluşturun.',
  TYPE_SERVICE_DEPLOYMENT: 'Type: stateless service (deployment)',
  TYPE_SERVICE_STATEFULSET: 'Type: stateful service (statefulset)',
  // Tracing
  TRACING: 'İzleme',
  TRACING_NO_DATA_DESC: 'Lütfen arama koşullarını değiştirin ve tekrar deneyin.',
  NUM_SPAN_SI: '{num} yayılma',
  NUM_SPAN_PL: '{num} yayılmalar',
  NUM_ERROR_SI: '{num} hata',
  NUM_ERROR_PL: '{num} hatalar',
  LAST_NUM_RECORDS: 'Son {sayı} kayıt',
  PROCESS: 'Process',
  SERVICES_AND_OPERATIONS: 'Services & Operations',
  TRACING_UNAVAILABLE: 'Tracing Unavailable',
  CALLED_SERVICES: 'Called Services',
  CALLED_DEPTH: 'Call Depth'
};