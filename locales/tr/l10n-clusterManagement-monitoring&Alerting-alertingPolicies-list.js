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
  ALERTING_POLICY_PL: 'Rule Groups',
  ALERTING_POLICY_DESC: 'A rule group contains alert rules used to monitor cluster resources.',
  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'How are alerts generated?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A: 'You need to create a rule group and set alert rules. The system will generate alerts when resource metrics meet conditions configured in rule groups.',
  // List
  CUSTOM_POLICIES: 'Custom Rule Groups',
  BUILT_IN_POLICIES: 'Built-in Rule Groups',
  ALERTING_POLICY_EMPTY_DESC: 'Please create a rule group.',
  ALERT_RULE_INACTIVE: 'İnaktif',
  ALERT_RULE_PENDING: 'Bekliyor',
  ALERT_RULE_FIRING: 'Ateşleme',
  ALERT_RULE_HEALTH_OK: 'Sağlıklı',
  ALERT_RULE_HEALTH_ERR: 'Hata',
  ALERT_RULE_HEALTH_UNKNOWN: 'Bilinmeyen',
  // List > Create > Basic Information
  SEVERITY: 'Önem',
  CREATE_ALERTING_POLICY: 'Create Rule Group',
  CRITICAL_ALERT: 'Kritik',
  ERROR_ALERT: 'Hata',
  WARNING_ALERT: 'Dikkat',
  INVALID_TIME_DESC: 'Invalid value. Please enter 0 or a positive integer.',
  ALIAS: 'Takma ad',
  DURATION_MIN: 'Duration (minutes)',
  ALERT_DURATION: 'When the alert situation persists longer than the value of this parameter, the system starts to send alerts to users.',
  LONG_NAME_DESC: 'İsim yanlızda küçük harfler, sayılar ve kısa çizgiler(-) içerebilir ve küçük harf ve sayı ile başlayıp bitmelidir. Maksimum 253 karakter olabilir.',
  NAME_EXIST_DESC: 'Ad zaten var. Lütfen başka bir ad girin.',
  // List > Create > Rule Settings > Rule Template
  RULE_TEMPLATE: 'Kural Şablonu',
  RULE_SETTINGS: 'Kural Ayarları',
  MONITORING_TARGETS: 'Hedefleri İzleme',
  ACTIVATION_CONDITION: 'Aktivasyon koşulu',
  MEMORY_PERCENTAGE_SCAP: 'Memory percentage',
  SET_ACTIVATION_CONDITION_DESC: 'Lütfen aktivasyon kodunu girin.',
  THRESHOLD: 'Eşik',
  ABNORMAL_PODS: 'Abnormal pods',
  POD_QUOTA_UTILIZATION_SCAP: 'Pod quota usage (%)',
  CPU_USAGE_SCAP: 'CPU kullanımı',
  CPU_UTILIZATION_SCAP: 'CPU usage (%)',
  CPU_LOAD_1: '1-minute CPU load average',
  CPU_LOAD_5: '5-minute CPU load average',
  CPU_LOAD_15: '15-minute CPU load average',
  MEMORY_AVAILABLE: 'Kullanılabilir bellek',
  MEMORY_UTILIZATION_SCAP: 'Memory usage (%)',
  DISK_SPACE_AVAILABLE: 'Kullanılabilir yerel disk alanı',
  DISK_SPACE_UTILIZATION: 'Local disk usage (%)',
  INODE_UTILIZATION: 'Inode utilization (%)',
  DISK_READ_IOPS: 'Yerel disk okuma IOPS',
  DISK_WRITE_IOPS: 'Yerel disk yazma IOPS',
  DISK_READ_THROUGHPUT: 'Yerel disk okuma çıktısı',
  DISK_WRITE_THROUGHPUT: 'Yerel disk yazma verimi',
  DATA_RECEIVE_RATE: 'Ağ verisi alma hızı',
  DATA_SEND_RATE: 'Ağ verisi gönderme hızı',
  MEMORY_USAGE_SCAP: 'Hafıza kullanımı',
  MEMORY_USAGE_WO_CACHE_SCAP: 'Memory usage without cache',
  UNAVAILABLE_WORKLOAD_REPLICA_RATIO: 'Unavailable workload replica ratio',
  SELECT_NODE_TIP: 'Lütfen en az bir küme düğümü seçin.',
  // List > Create > Rule Settings > Custom Rule
  CUSTOM_RULE: 'Özel Kural',
  RULE_EXPRESSION: 'Kural İfadesi',
  ENTER_RULE_EXPRESSION: 'Lütfen bir kural ifadesi girin.',
  ALERT_RULE_EXPRESSION_DESC: 'PromQL deyimlerini kullanarak özel bir kural tanımlayabilirsiniz. <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">Learn More</a>',
  ALERT_FUNCTIONS: 'Functions',
  ALERT_METRICS: 'Metrics',
  ALERT_LABELS: 'Etiketler',
  ALERT_RATE_RANGES: 'Rate Ranges',
  // List > Create > Message Settings
  ALERTING_MESSAGE: 'Alert',
  MESSAGE_SETTINGS: 'Mesaj Ayarları',
  NOTIFICATION_SUMMARY: 'Özet',
  NOTIFICATION_DETAILS: 'Detaylar',
  // List > Edit
  EDIT_ALERTING_POLICY: 'Edit Rule Group',
  // List > Delete
  ALERTING_POLICY: 'Rule Group',
  ALERTING_POLICY_LOW: 'rule group'
};