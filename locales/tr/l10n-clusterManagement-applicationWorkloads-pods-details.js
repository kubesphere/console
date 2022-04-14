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
  NODE_IP_ADDRESS: 'Kaynak IP Adresi',
  CLUSTER: 'Küme',
  // Resource Status > Containers
  CONTAINER_PL: 'Konteynerler',
  PROBE_PL: 'İncelemeler',
  HOOK_PL: 'Kancalar',
  // Resource Status > Containers > Container Logs
  CONTAINER_LOGS_NOT_SUPPORTED: 'Kapsayıcı şu anda gerçek zamanlı kayıtları desteklemiyor. Lütfen daha sonra tekrar deneyiniz.',
  CONTAINER_LOGS: 'Konteyner Kayıtları',
  // Resource Status > Details > Container Details > Details
  COMMAND: 'Komut',
  IMAGE_ID: 'Resim Kimliği',
  IMAGE_PULL_POLICY: 'Resim Çekme Politikası',
  CONTAINER_DETAILS_PAGE_SCAP: 'Konteyner ayrıntıları sayfası.',
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
  // Resource Status > Details > Container Details > Monitoring
  // Resource Status > Details > Container Details > Environment Variables
  // Resource Status > Details > Container Details > Container Logs
  NO_RESOURCE: '{kaynak} yok.',
  LOG_DATA_LOW: 'kayıt verileri',
  // Resource Status > Volumes
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
  OUTBOUND: 'Outbound',
  INBOUND: 'Inbound'
};