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
  COLLECTION_INTERVAL_MIN: 'Collection Interval (min)',
  COLLECTION_INTERVAL_MIN_DESC: 'Interval in minutes between two metric collection operations. The default value is 1.',
  COLLECTION_TIMEOUT_DESC: 'Timeout interval in seconds of each collection operation. The default value is 10.',
  SELECT_AUTHENTICATION_METHOD: 'Kimlik Doğrulama Yöntemini Seçin',
  SELECT_AUTHENTICATION_METHOD_DESC: 'Select the authentication method used during metric collection.',
  NO_AUTHENTICATION_TCAP: 'Kimlik Doğrulama Yok',
  NO_AUTHENTICATION_TIP: 'Authentication is not used during metric collection.',
  CREATE_A_NEW_SECRET: 'Yeni bir sır oluştur',
  REFRESH_SECRETS: 'sırları yenile.',
  CERTIFICATE_AUTHORITY: 'Sertifika yetkilisi',
  SERVER_NAME: 'Sunucu Adı',
  TLS_SETTINGS_TCAP: 'TLS Ayarları',
  BEARER_TOKEN_TCAP: 'Bearer Jetonu',
  BASIC_AUTHENTICATION_TCAP: 'Temel Kimlik Doğrulama',
  // More > Edit YAML
  // Details
  EXTERNAL_IP_ADDRESS: 'Harici IP Adresi',
  // Resource Status
  MONITORING_EXPORTER: 'İzleme Aktarıcısı',
  MONITORING_EXPORTER_VALUE: 'İzleme aktarıcısı: {value}',
  PORT_PL: 'Bağlantı noktaları',
  SERVICE_NODE_PORT_DESC: 'İstemci makineniz kümeyle aynı ağdaysa, hizmete erişmek için <Düğüm IP adresi>:<Düğüm bağlantı noktası> kullanabilirsiniz.',
  IMAGE_BUILDING_FAILED: 'Görüntü oluşturma başarısız oldu',
  IMAGE_BUILDING_SUCCESSFUL: 'Görüntü oluşturma başarılı',
  BUILDING_IMAGE: 'Oluşturucu Resmi'
};