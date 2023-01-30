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
  ENDPOINT: 'Uç nokta',
  SESSION_AFFINITY: 'Oturum Yakınlığı',
  // More
  EDIT_EXTERNAL_ACCESS: 'Harici Erişimi Düzenle',
  EDIT_MONITORING_EXPORTER: 'İzleme Aktarıcısını Düzenle',
  EDIT_SERVICE: 'Hizmeti Düzenle',
  // More > Edit Service
  // More > Edit Service > Specify Workload
  // More > Edit External Access > Access Mode
  ACCESS_NONE_TIP: 'İnternet erişimi desteklenmiyor. Hizmete yalnızca küme içinde erişilebilir.',
  EXTERNAL_SERVICE: 'Harici servis',
  // More > Edit Monitoring Exporter
  COLLECTION_INTERVAL_MIN: 'Toplama Aralığı',
  COLLECTION_INTERVAL_MIN_DESC: 'İki metrik toplama işlemi arasındaki dakika cinsinden aralık. Varsayılan değer 1\'dir.',
  COLLECTION_TIMEOUT_DESC: 'Her toplama işleminin saniye cinsinden zaman aşımı aralığı. Varsayılan değer 10\'dur.',
  SELECT_AUTHENTICATION_METHOD: 'Kimlik Doğrulama Metodu',
  SELECT_AUTHENTICATION_METHOD_DESC: 'Metrik toplama sırasında kullanılan kimlik doğrulama yöntemini seçin.',
  NO_AUTHENTICATION_TCAP: 'Kimlik Doğrulama Yok',
  NO_AUTHENTICATION_TIP: 'Metrik toplama sırasında kimlik doğrulama kullanılmaz.',
  CREATE_A_NEW_SECRET: 'Yeni bir gizlilik oluştur',
  REFRESH_SECRETS: 'sırları yenile.',
  CERTIFICATE_AUTHORITY: 'Sertifika yetkilisi',
  SERVER_NAME: 'Sunucu Adı',
  TLS_SETTINGS_TCAP: 'TLS Ayarları',
  BEARER_TOKEN_TCAP: 'Bearer Jetonu',
  BASIC_AUTHENTICATION_TCAP: 'Temel Kimlik Doğrulama',
  // More > Edit YAML
  // Attributes
  EXTERNAL_IP_ADDRESS: 'Harici IP Adresi',
  // Resource Status
  MONITORING_EXPORTER: 'İzleme Aktarıcısı',
  MONITORING_EXPORTER_VALUE: 'İzleme aktarıcısı: {value}',
  PORT_PL: 'Bağlantı noktaları',
  SERVICE_NODE_PORT_DESC: 'İstemci makineniz kümeyle aynı ağdaysa, hizmete erişmek için <Düğüm IP adresi>:<Düğüm bağlantı noktası> kullanabilirsiniz.',
  IMAGE_BUILDING_FAILED: 'Görüntü oluşturma başarısız oldu',
  IMAGE_BUILDING_SUCCESSFUL: 'Görüntü oluşturma başarılı',
  BUILDING_IMAGE: 'Oluşturucu Resmi',
  SERVICE_MONITORING_EXPORTER: 'Service Monitoring Exporter',
  EXPORTER_SERVICE_PORTS: 'Exporter Service Ports',
  SCRAPE_INTERVAL_MIN: 'Scrape Interval (Min)'
};