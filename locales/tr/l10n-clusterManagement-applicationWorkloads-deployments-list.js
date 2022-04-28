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
  APPLICATION_WORKLOAD_PL: 'Uygulama İş Yükleri',
  WORKLOAD_PL: 'İş yükleri',
  // List
  DEPLOYMENTS: 'Dağıtımlar',
  UPDATE_TIME_TCAP: 'Güncelleme Zamanı',
  ALL_PROJECTS: 'Bütün projeler',
  // List > Create > Basic Information
  SELECT_PROJECT_DESC: 'Kaynağın oluşturulacağı bir proje seçin.',
  PROJECT_NOT_SELECT_DESC: 'Lütfen bir proje seçin.',
  BASIC_INFORMATION: 'Temel Bilgiler',
  NAME: 'Ad',
  FEDPROJECT_RESOURCE_TIP: 'Çok kümeli bir projede iş yükü kaynakları oluşturmak için çok kümeli projede İş Yükleri sayfasına gidin.',
  FINISHED: 'Bitti',
  NOT_SET: 'Belirlenmemiş',
  CURRENT: 'Güncel',
  PROJECT: 'Proje',
  // List > Create > Pod Settings
  PREVIOUS: 'Önceki',
  NOTE: 'Not',
  // List > Create > Pod Settings > Add Container > Container Settings
  IMAGE: 'Resim',
  IMAGE_VALUE: 'Resim: {değer}',
  // List > Create > Pod Settings > Add Container > Health Check > Readiness Check > TCP Port
  PORT_NUMBER_EMPTY: 'Lütfen bir bağlantı noktası numarası girin.',
  USER: 'Kullanıcı',
  // List > Create > Storage Settings
  VOLUME_NAME_EXIST: 'Dosya adı zaten var.',
  SELECT_TYPE: 'Türleri seçin',
  SPECIFY_SUBPATH: 'Alt Yolu Belirtin',
  SPECIFY_SUBPATH_TIP: 'Kapsayıcıya monte edilecek bir birim alt yolu belirtin.',
  MOUNT_PATH: 'Mount path',
  // List > Create > Advanced Settings
  NETWORK_SEGMENT_SCAP: 'Ağ segmenti',
  AVAILABLE_ADDRESSES: 'Kullanılabilir adresler',
  POD_IP_POOL: 'Pod IP Havuzu',
  SUBPATH: 'Alt yol',
  // List > Create > Advanced Settings > Add Metadata
  ANNOTATION_PL: 'Açıklamalar',
  CREATE_SUCCESSFUL: 'Başarıyla oluşturuldu.',
  // List > Edit Information
  // List > Edit YAML
  // List > Re-create
  // List > Delete
  WORKLOAD_LOW: 'iş yükleri',
  // List > Stop
  STOP: 'Dur',
  STOP_TITLE_SI: 'Dur {tip}',
  STOP_TITLE_PL: 'Çoklu {tip} Durdur.'
};