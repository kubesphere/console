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
  // List
  HPA_SET_TIP: 'Yatay bölme otomatik ölçeklendirme ayarlandı.',
  WORKLOAD_EMPTY_DESC: 'Lütfen bir iş yükü oluşturun.',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Container Settings
  INVALID_IMAGE: 'Geçersiz resim.',
  INVALID_NAME_DESC: 'Geçersiz isim. Ad yalnızca küçük harfler, sayılar ve kısa çizgiler (-) içerebilir ve küçük harf veya sayı ile başlayıp bitmelidir. Maksimum uzunluk 63 karakterdir.',
  NO_IMAGE_FOUND: 'Görsel bulunamadı',
  CONTAINER_EMPTY_DESC: 'Please add at least one worker container.',
  RESOURC_QUOTAS_UNSET: 'Resource Quotas Unset',
  INSUFFICENT_RESOURCES: 'Insufficent Resources',
  REMAINING_QUOTAS: 'Remaining Quotas',
  // List > Create > Pod Settings > Add Container > Container Settings > Environment Settings
  ENVIRONMENT_INVALID_TIP: 'Bir ortam değişkeninin anahtarı yalnızca harf, sayı, alt çizgi (_), kısa çizgi (-) ve nokta (.) içerebilir ve bir sayı ile başlamamalıdır.',
  ENVIRONMENT_CANNOT_BE_EMPTY: 'Lütfen ortam değişkeni için bir anahtar ayarlayın.',
  // List > Create > Pod Settings > Port Settings
  WORKLOAD_PORT_NAME_DESC: 'The port name can contain only lowercase letters, numbers and hyphens (-), and must start with a lowercase letter and end with a lowercase letter or number. The maximum length is 15 characters.',
  // List > Create > Pod Settings > Update Strategy > Rolling Update Settings
  MAX_EXTRA_PODS_DESC: 'Güncelleme işlemi sırasında izin verilen maksimum ek bölme sayısı veya yüzdesi.',
  MAX_EXTRA_PODS: 'Maksimum Ekstra Bölme',
  // List > Create > Storage Settings
  AVAILABLE: 'Uygun',
  IN_USER: 'Kullanımda',
  ACCESS_MODE_SCAP: 'Erişim modu',
  PVC_OR_TEMPLATE_EMPTY: 'Volume Günlükleri Topla\'yı etkinleştirdiniz. Lütfen en az bir kalıcı volume, geçici volume veya kalıcı volume talep şablonu ekleyin ve kapsayıcı günlüklerinin yolunu belirtin.',
  PVC_EMPTY: 'Volumlerde Günlükleri Topla\'yı etkinleştirdiniz. Lütfen en az bir kalıcı volume veya geçici volume ekleyin ve kapsayıcı günlüklerinin yolunu belirtin.',
  PROJECT_COLLECT_SAVED_DISABLED_DESC: 'Bu işlevi etkinleştirmek için Proje Ayarlarında Birimlerdeki Günlükleri Topla\'yı etkinleştirmeniz gerekir.',
  COLLECT_LOGS_ON_VOLUMES_DESC: 'Sistemin birimlere kaydedilen kapsayıcı günlüklerini toplamasına izin verin. Bu işlevi kullanmak için, bir kapsayıcıya okuma ve yazma modunda bir birimi bağlamanız ve kapsayıcıyı, günlükleri birime aktaracak şekilde ayarlamanız gerekir.',
  // List > Create
  // List > Create > Storage Settings > Mount Volume
  CONTAINER_LOG_PATH: 'Konteyner Günlük Yolu',
  // List > Create > Storage Settings > Mount Volume > Temporary Volume
  CONTAINER_LOG_PATH_TIP: 'Birim bağlama yoluna göre kapsayıcı günlük yolu. Küreleme desenleri desteklenir. Birden çok yolu ayırmak için virgül (,) kullanabilirsiniz.<br /><br /><b>Örnek</b><br />Birim bağlama yolu /data olduğunda, log/*.log, kapsayıcıyı belirtir. günlük dosyalarının tümü /data/log dizinindeki .log dosyalarıdır.',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Re-create
  RECREATE_CONFIRM_DESC: '{type} {resource} öğesini yeniden oluşturmak istediğinizden emin misiniz? Pod replikaları güncelleme stratejisine göre güncellenecek ve hizmet kesintiye uğrayacaktır.',
  // List > Delete
  NO_WORKLOAD_RELATED_RESOURCE_DESC: 'İş yüküyle ilgili kaynak bulunamadı.',
  SELECT_ALL: 'Hepsini Seç',
  DELETE_WORKLOAD_DESC_SI: '{resource} iş yükünü silmek üzeresiniz.<br/>İş yüküyle ilgili kaynağı da silmek istiyor musunuz?',
  DELETE_WORKLOAD_DESC_PL: '{resource} iş yüklerini silmek üzeresiniz.<br/>İş yükleriyle ilgili kaynakları da silmek istiyor musunuz?',
  DELETE_WORKLOAD: 'İş yükünü Sil',
  DELETE_MULTIPLE_WORKLOADS: 'Çoklu İş Yükü Sil',
  DELETE_APP_RESOURCE_TIP: 'The resource is managed by <strong>{app}</strong>, which may affect the normal use of this app if the resource is deleted. Please enter the {type} name <strong>{resource}</strong> to make sure you understand the risks associated with the operation.',
  STOP_APP_RESOURCE_TIP: 'The resource is managed by <strong>{app}</strong>, which may affect the normal use of this app if the resource is stopped. Please enter the {type} name <strong>{resource}</strong> to make sure you understand the risks associated with the operation.'
};