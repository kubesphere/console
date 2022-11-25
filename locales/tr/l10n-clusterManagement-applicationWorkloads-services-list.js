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
  SERVICE_PL: 'Hizmetler',
  SERVICE_DESC: 'Hizmetler, bir bölmede çalışan uygulamaları ağ hizmetleri olarak ortaya çıkarmak için soyut bir yol sağlar.',
  // List
  SERVICE_EMPTY_DESC: 'Lütfen bir hizmet oluşturun.',
  UNKNOWN: 'Bilinmeyen',
  EXTERNAL_ACCESS: 'Harici erişim',
  INTERNAL_ACCESS: 'Internal Access',
  // List > Edit YAML
  // List > Edit Service
  UNKNOWN_SERVICE_TYPE: 'Bilinmeyen Hizmet Tipi',
  // List > Delete
  SERVICE: 'Hizmet',
  SERVICE_LOW: 'hizmet',
  // List > Create
  INTERNAL_ACCESS_MODE: 'Dahili Erişim Modu',
  CREATE_SERVICE: 'Bir Hizmet Oluştur',
  // List > Create > Basic Information
  SERVICE_NAME_DESC: 'Ad yalnızca küçük harf, sayı ve kısa çizgi (-) içerebilir, küçük harfle başlamalı ve küçük harf veya sayı ile bitmelidir. Maksimum uzunluk 63 karakterdir.',
  // List > Create > Service Settings
  VIRTUAL_IP_TITLE: 'Sanal IP Adresi',
  INTERNAL_DOMAIN_NAME: 'Dahili Alan Adı',
  CONTAINER_PORT: 'Konteyner Bağlantı Noktası',
  INVALID_PORT: 'Geçersiz bağlantı noktası.',
  PORT_EMPTY: 'Lütfen en az bir bağlantı noktası ayarlayın.',
  ENTER_SELECTOR_TIP: 'Lütfen bir iş yükü seçici ayarlayın.',
  Ports: 'Bağlantı noktaları',
  SPECIFY_WORKLOAD: 'İş Yükünü Belirtin',
  SELECT_WORKLOAD_DESC: 'Seçici olarak bir iş yükünün etiketlerini kullanın.',
  VIRTUAL_IP_DESC: 'Hizmete sanal bir IP adresi atanır. Hizmete, küme içinde sanal IP adresi aracılığıyla erişilebilir.',
  INTERNAL_DOMAIN_NAME_DESC: 'Hizmete sanal bir IP adresi atanır. Hizmete, küme içinde sanal IP adresi aracılığıyla erişilebilir.',
  SERVICE_PORTS_DESC: 'Konteyner bağlantı noktalarını ve hizmet bağlantı noktalarını ayarlayın.',
  NO_WORKLOAD_MATCH_SELECTOR: 'Geçerli seçici hiçbir iş yüküyle eşleşmiyor.',
  WORKLOADS_MATCH_SELECTOR_SI: 'Geçerli seçici ({selector}), {count} iş yüküyle eşleşiyor.',
  WORKLOADS_MATCH_SELECTOR_PL: 'Geçerli seçici ({selector}), {count} iş yüküyle eşleşiyor.',
  WORKLOAD_SELECTOR: 'İş Yükü Seçici',
  SERVICE_SETTINGS: 'Hizmet Ayarları',
  // List > Create > Service Settings > Workload Selector > View Details
  TOTAL_WORKLOADS_VALUE: 'Toplam İş Yükü: {count}',
  // List > Create > Advanced Settings
  OPENELB_NOT_READY: 'OpenELB is not installed. Please install OpenELB.',
  SESSION_PERSISTENCE: 'Oturum Kalıcılığı',
  MAXIMUM_STICKINESS_DURATION: 'Maksimum Stickness Süresi (ler)',
  SESSION_PERSISTENCE_DESC: 'Sistemi, aynı istemciden gelen tüm istekleri belirli bir süre içinde aynı bölmeye iletecek şekilde ayarlayın.',
  SERVICE_EXTERNAL_ACCESS_DESC: 'Hizmete kümenin dışından erişme yöntemini ayarlayın.',
  ACCESS_NODEPORT_TIP: 'Hizmete erişmek için küme düğümlerinin bir bağlantı noktasını kullanın.',
  ACCESS_LOADBALANCER_TIP: 'Hizmete erişmek için bir yük dengeleyici kullanın.',
  WORKLOAD_ANNOTATIONS: 'İş Yükü Açıklamaları',
  LABEL_FORMAT_DESC: 'The key and value of a label can contain only letters, numbers, hyphens (-), underscores (_), and dots (.), and must start and end with a letter or number. The maximum length of each key and each value is 63 characters (if the key contains a domain name, the maximum length is 253 characters).'
};