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
  // Attributes
  NODE_IP_ADDRESS: 'Kaynak IP Adresi',
  CLUSTER: 'Küme',
  // Resource Status > Containers
  CONTAINER_PL: 'Konteynerler',
  PROBE_PL: 'İncelemeler',
  HOOK_PL: 'Kancalar',
  // Resource Status > Containers > Container Logs
  CONTAINER_LOGS_NOT_SUPPORTED: 'Kapsayıcı şu anda gerçek zamanlı kayıtları desteklemiyor. Lütfen daha sonra tekrar deneyiniz.',
  CONTAINER_LOGS: 'Konteyner Kayıtları',
  // Resource Status > Details > Container Details > Attributes
  COMMAND: 'Komut',
  IMAGE_ID: 'Resim Kimliği',
  IMAGE_PULL_POLICY: 'Resim Çekme Politikası',
  CONTAINER_DETAILS_PAGE_SCAP: 'Konteyner ayrıntıları sayfası.',
  CPU_VALUE: 'CPU: {value, plural, =1 {1 core} other {# cores}}',
  MEMORY_VALUE: 'Memory: {value}',
  NVIDIA_COM_GPU_VALUE: 'GPU: {value}',
  // Resource Status > Details > Container Details > Terminal
  LOADING: 'Yükleniyor...',
  RESOURCE_LIMITS: 'Özkaynak sınırları',
  RESOURCE_REQUESTS: 'Kaynak İstekleri',
  TERMINAL: 'Terminal',
  // Resource Status > Details > Container Details > Resource Status
  RESTART_PL: 'Yeniden Başlatmalar',
  RESTART: 'Yeniden Başlatma',
  STORAGE_DEVICES: 'Depolama cihazları',
  LIVENESS_PROBE: 'Liveness Probe',
  READINESS_PROBE: 'Readiness Probe',
  STARTUP_PROBE: 'Startup Probe',
  REQUEST_TYPE: 'Request type',
  // Resource Status > Details > Container Details > Monitoring
  // Resource Status > Details > Container Details > Environment Variables
  // Resource Status > Details > Container Details > Container Logs
  NO_LOG_DATA_FOUND: 'No Log Data Found',
  NO_LOG_DATA_FOUND_TIP: 'No log data is found.',
  // Resource Status > Volumes
  VOLUME_PL: 'Birimler',
  TYPE_CONFIGMAP: 'Birim türü: configmap',
  TYPE_SECRET: 'Birim tipi: gizli',
  TYPE_EMPTYDIR: 'Birim tipi: emptyDir',
  TYPE_HOSTPATH: 'Birim tipi: host yolu',
  // Scheduling Information
  REASON_VALUE: 'Gerekçe: {değer}',
  MESSAGE_VALUE: 'Mesaj: {değer}',
  UPDATED_AT_VALUE: '{değer} tarihinde oluşturuldu.',
  // Metadata
  // Monitoring
  NO_MONITORING_DATA: 'Veri Yok',
  OUTBOUND: 'Giden',
  INBOUND: 'Gelen'
};