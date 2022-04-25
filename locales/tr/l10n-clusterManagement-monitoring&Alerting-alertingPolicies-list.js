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
  ALERTING_POLICY_PL: 'Uyarı Politikaları',
  ALERT_POLICY_DESC: 'Uyarı ilkeleri, küme kaynaklarını izlemek için kullanılan bir dizi koşuldur. Kaynakları izlemek için uyarı ilkeleri oluşturabilirsiniz.',
  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'Alarm mesajları nasıl üretilir?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A: 'Bir kaynak için bir uyarı politikası belirlemeniz gerekir. Uyarı politikasında yapılandırılan ölçüm bir eşiğe ulaştığında uyarı mesajları oluşturulur.',
  // List
  ALERTING_STATUS: 'Alerting Status',
  ALERTING_POLICY_EMPTY_DESC: 'Lütfen bir uyarı politikası oluşturun.',
  ALERT_RULE_INACTIVE: 'İnaktif',
  ALERT_RULE_PENDING: 'Bekliyor',
  ALERT_RULE_FIRING: 'Ateşleme',
  ALERT_RULE_HEALTH_OK: 'Sağlıklı',
  ALERT_RULE_HEALTH_ERR: 'Hata',
  ALERT_RULE_HEALTH_UNKNOWN: 'Bilinmeyen',
  // List > Create > Basic Information
  SEVERITY: 'Önem',
  CREATE_ALERTING_POLICY: 'Uyarı Politikası Oluştur',
  CRITICAL_ALERT: 'Kritik',
  ERROR_ALERT: 'Hata',
  WARNING_ALERT: 'Dikkat',
  INVALID_TIME_DESC: 'Geçersiz değer. Lütfen açılır listeden bir değer seçin 0 veya pozitif bir tam sayı girin.',
  ALIAS: 'Takma ad',
  THRESHOLD_DURATION_MIN: 'Eşik Süresi (dk)',
  ALERT_DURATION: 'Uyarı kuralında yapılandırılan koşulun süresi eşiğe ulaştığında uyarı ilkesinin durumu tetikleniyor olur.',
  LONG_NAME_DESC: 'İsim yanlızda küçük harfler, sayılar ve kısa çizgiler(-) içerebilir ve küçük harf ve sayı ile başlayıp bitmelidir. Maksimum 253 karakter olabilir.',
  // List > Create > Rule Settings > Rule Template
  RULE_SETTINGS: 'Kural Ayarları',
  MONITORING_TARGETS: 'Hedefleri İzleme',
  CPU_USAGE_SCAP: 'CPU kullanımı',
  DISK_READ_IOPS: 'Yerel disk okuma IOPS',
  DISK_READ_THROUGHPUT: 'Yerel disk okuma çıktısı',
  DISK_SPACE_AVAILABLE: 'Kullanılabilir yerel disk alanı',
  DISK_WRITE_IOPS: 'Yerel disk yazma IOPS',
  DISK_WRITE_THROUGHPUT: 'Yerel disk yazma verimi',
  DISK_SPACE_USAGE: 'Yerel disk alan kullanımı',
  MEMORY_AVAILABLE: 'Kullanılabilir bellek',
  MEMORY_USAGE_CACHE: 'Bellek kullanımı (önbellekler dahil)',
  MEMORY_USAGE_SCAP: 'Hafıza kullanımı',
  DATA_RECEIVE_RATE: 'Ağ verisi alma hızı',
  DATA_SEND_RATE: 'Ağ verisi gönderme hızı',
  SET_RULE_DESC: 'Lütfen bir uyarı kuralı belirleyin.',
  ABNORMAL_PODS: 'Anormal Kapsüller',
  POD_USAGE_SCAP: 'Kapsül kullanımı',
  THRESHOLD: 'Eşik',
  UNAVAILABLE_REPLICAS: 'Kullanılamayan kopyalar',
  RULE_TEMPLATE: 'Kural Şablonu',
  CPU_LOAD_1: 'Son 1 dakikadaki ortalama CPU yükü',
  CPU_LOAD_5: 'Son 5 dakikadaki ortalama CPU yükü',
  CPU_LOAD_15: 'Son 15 dakikadaki ortalama CPU yükü',
  SELECT_NODE_TIP: 'Lütfen en az bir küme düğümü seçin.',
  // List > Create > Rule Settings > Custom Rule
  CUSTOM_RULE: 'Özel Kural',
  RULE_EXPRESSION: 'Kural İfadesi',
  ENTER_RULE_EXPRESSION: 'Lütfen bir kural ifadesi girin.',
  ALERT_RULE_EXPRESSION_DESC: 'PromQL deyimlerini kullanarak özel bir kural tanımlayabilirsiniz. <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">Learn More</a>',
  // List > Create > Message Settings
  MESSAGE_SETTINGS: 'Mesaj Ayarları',
  NOTIFICATION_SUMMARY: 'Özet',
  NOTIFICATION_DETAILS: 'Detaylar',
  // List > Edit
  EDIT_ALERTING_POLICY: 'Uyarı Politikasını Düzenle',
  // List > Delete
  ALERTING_POLICY: 'Uyarı Politikaları',
  ALERTING_POLICY_LOW: 'uyarı politikası'
};