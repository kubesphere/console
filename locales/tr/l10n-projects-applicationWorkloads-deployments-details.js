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
  // More > Roll Back
  ROLL_BACK: 'Geri Al',
  CURRENT_REVISION_RECORD: 'Mevcut Revizyon Kaydı',
  TARGET_REVISION_EMPTY_DESC: 'Lütfen bir hedef revizyon kaydı seçin.',
  TARGET_REVISION_RECORD: 'Hedef Revizyon Kaydı',
  // More > Edit Autoscaling
  CONFIGURE_AUTOSCALING_DESC: 'Sistemi, hedef CPU kullanımına ve hedef bellek kullanımına göre bölme kopyalarının sayısını otomatik olarak ayarlayacak şekilde ayarlayın.',
  EDIT_AUTOSCALING: 'Otomatik Ölçeklendirmeyi Düzenle',
  TARGET_CPU_USAGE_UNIT: 'Hedef CPU Kullanımı (%)',
  AUTOSCALING: 'Otomatik ölçeklendirme',
  RESOURCE_NAME: 'Kaynak adı',
  TARGET_CPU_USAGE_DESC: 'Gerçek CPU kullanımı hedeften daha yüksek/düşük olduğunda sistem pod replikalarının sayısını otomatik olarak azaltır/artırır.',
  TARGET_MEMORY_USAGE_DESC: 'Gerçek bellek kullanımı hedeften daha yüksek/düşük olduğunda sistem pod replikalarının sayısını otomatik olarak azaltır/artırır.',
  MINIMUM_REPLICAS_DESC: 'İzin verilen minimum bölme kopyası sayısını ayarlayın. Varsayılan değer 1\'dir.',
  MAXIMUM_REPLICAS_DESC: 'İzin verilen maksimum bölme kopyası sayısını ayarlayın. Varsayılan değer 1\'dir.',
  TARGET_MEMORY_USAGE_UNIT: 'Hedef Bellek Kullanımı (MiB)',
  MINIMUM_REPLICAS: 'En az Kopyalar',
  MAXIMUM_REPLICAS: 'En çok Kopyalar',
  // More > Edit Settings > Update Strategy
  EDIT_SETTINGS: 'Ayarları Düzenle',
  // More > Edit Settings > Containers
  FROM_CONFIGMAP: 'configmap\'ten',
  FROM_SECRET: 'Sırdan (Secret)',
  BATCH_REFERENCE: 'Toplu Referans',
  BATCH_REFERENCE_DESC: 'Bir yapılandırma haritasında veya gizli anahtarda birden çok anahtara başvurun.',
  DESELECT_ALL: 'Hiçbirini seçme',
  KEY_PL: 'Anahtarlar',
  // More > Edit Settings > Volumes
  // More > Edit Settings > Volumes > Mount Volume
  // More > Edit Settings > Volumes > Mount Configmap or Secret
  // More > Edit Settings > Pod Scheduling Rules
  RULE_NOT_COMPLETE: 'Lütfen eksiksiz bir kural belirleyin.',
  // Attributes
  // Revision Records
  REVISION_RECORDS: 'Revizyon Kayıtları',
  CONFIG_FILE: 'Yapılandırma Dosyası',
  COMPARE_WITH: 'Önceki kayıtla karşılaştırıldığında {sürüm}',
  // Resource Status
  REPLICAS_DESIRED: 'İstenen',
  REPLICAS_CURRENT: 'Geçerli',
  ADJUST_REPLICAS: 'Kopyaları Ayarla',
  REPLICAS_SCALE_NOTIFY_CONTENT: 'Kapsül replikalarının sayısını {num} olarak değiştirmek istediğinizden emin misiniz?',
  REPLICAS_SCALE_NOTIFY_CONFIRM: 'Tamam ({seconds}s)',
  REPLICAS_SCALE_NOTIFY_CANCEL: 'İptal',
  // Resource Status > Autoscaling
  TARGET_MEMORY_USAGE: 'Hedef Bellek Kullanımı',
  TARGET_CPU_USAGE: 'Hedef CPU Kullanımı',
  TARGET_CURRENT: '{target} (Current: {current})',
  NOT_ENABLE: '{resource} Aktif Edilmedi',
  // Resource Status > Image Builder
  CONTAINER_LOG_NOT_ENABLED: 'Container Log is not enabled.',
  BUILD_LOG: 'Build Log',
  TASK: 'Task',
  IN_PROGRESS: 'in progress',
  IMAGE_BUILDING: 'Image Building',
  HAS_FAILED: 'has failed',
  // Metadata
  // Monitoring
  // Monitoring > View All Replicas (visible only when replicas > 5)
  VIEW_ALL_REPLICAS: 'Tüm Kopyaları Görüntüle',
  SHOW_SELECTED_ONLY: 'Yalnızca Seçilileri Göster',
  MONITORING_SELECT_LIMIT_MSG: 'En fazla 10 kaynak seçilebilir.',
  MONITORING_ALERT_DESC: 'Varsayılan olarak en fazla beş bölme kopyası hakkında bilgi görüntülenir. Tüm pod replikalarıyla ilgili bilgileri görüntülemek için <b>Tüm Replikaları Görüntüle</b>\'yi tıklayabilirsiniz.',
  CURRENT_VALUE: 'Şuan ki:{value}',
  // Environment Variables
  ENVIRONMENT_VARIABLE_PL: 'Ortam Değişkenleri',
  // Events
  EVENT_AGE: 'Oluştu',
  EVENT_AGE_DATA: '{lastTime}<br/>({count} times over {duration})',
  EVENT_AGE_DATA_TWICE: '{lastTime}<br/>(twice over {duration})',
  SOURCE: 'Kaynak'
};