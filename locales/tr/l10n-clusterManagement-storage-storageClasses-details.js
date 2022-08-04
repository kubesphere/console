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
  TRUE: 'Doğru',
  FALSE: 'Yanlış',
  // More > Set as Default Storage Class
  SET_DEFAULT_STORAGE_CLASS_TITLE: 'Varsayılan Depolama Sınıfı Olarak Ayarla',
  SET_AS_DEFAULT_STORAGE_CLASS: 'Varsayılan Depolama Sınıfı Olarak Ayarla',
  STORAGE_CLASS_SET_DEFAULT_DESC: 'Varsayılan depolama sınıfı ayarlandıktan sonra, herhangi bir özel gereksinim eklenmemişse, sistem varsayılan olarak bu sınıfın birimlerini oluşturacaktır. KubeSphere kümesinde yalnızca bir varsayılan depolama sınıfına izin verilir.',
  // More > Edit Authorization Rules
  SET_AUTHORIZATION_RULES: 'Yetkilendirme Kuralları Belirleyin',
  AUTHORIZATION_RULES: 'Yetkilendirme Kuralları Belirleyin',
  AUTHORIZATION_RULES_DESC: 'Depolama sınıfına yalnızca belirli projelerde ve çalışma alanlarında erişilebilmesi için yetkilendirme kuralları ayarlayın.',
  AUTHORIZATION_NOT_SUPPORT: 'Küme şu anda bu özelliği desteklemiyor. Lütfen KubeSphere\'i v3.3.0 veya sonraki bir sürümüne yükseltin veya manuel olarak yükleyin.<a href="https://github.com/kubesphere/storageclass-accessor" target="_blank">storageclass-accessor</a>.',
  OPERATOR_IN: 'İçinde',
  OPERATOR_NOT_IN: 'İçinde değil',
  // More > Set Volume Permissions
  SET_VOLUME_OPERATIONS: 'Hacim İşlemlerini Ayarla',
  VOLUME_CLONING: 'Hacim Klonlama',
  VOLUME_CLONING_DESC: 'Kullanıcıların birimleri klonlamasına izin verir.',
  VOLUME_SNAPSHOT_CREATION: 'Hacim Anlık Görüntüsü Görüntüleme',
  VOLUME_SNAPSHOT_CREATION_DESC: 'Kullanıcıların toplu anlık görüntüler oluşturmasına olanak tanır.',
  VOLUME_EXPANSION_DESC: 'Kullanıcıların birimleri genişletmesine izin verir. Hacimler yalnızca genişletilebilir ve daraltılamaz.',
  SET_VOLUME_OPERATIONS_TIP: 'Aşağıdaki ayarlar yalnızca kullanıcıların web konsolunda işlemleri gerçekleştirmesine izin verilip verilmediğini kontrol eder. Depolama sınıfına dayalı olarak oluşturulan kalıcı birimlerin işlemleri gerçekten destekleyip desteklemediği, arka uç depolama sistemine bağlıdır.',
  // More > Set Auto Expansion
  SET_AUTO_EXPANSION: 'Otomatik Genişletmeyi Ayarla',
  AUTO_EXPANSION: 'Otomatik Genişletmeyi Ayarla',
  AUTO_EXPANSION_DESC: 'Sistemi, kalan birim alanı bir eşikten daha düşük olduğunda birimleri otomatik olarak genişletecek şekilde ayarlayın.',
  AUTO_EXPANSION_SETTINGS: 'Otomatik Genişletme Ayarları',
  MAXIMUM_SIZE: 'En Fazla Boyut',
  INCREMENT: 'Artış',
  INCREMENT_DESC: 'Birim boyutu artışını, depolama sınıfının CSI eklentisine göre ayarlayın.',
  RESTART_WORKLOAD_AUTOMATICALLY: 'İş yükünü otomatik olarak yeniden başlat.',
  RESTART_WORKLOAD_AUTOMATICALLY_DESC: 'Sistem, iş yükünün yeniden başlatılması gerekip gerekmediğini belirlemek için birim durumunu otomatik olarak kontrol eder.',
  RESTART_WORKLOAD_AUTOMATICALLY_TIP: 'Zaman aşımı süresi sona erdiğinde birim başarıyla genişletilmezse, sistem iş yükünün bir daha yeniden başlatılmaması için iş yüküne "restart.kubesphere.io/skip" ek açıklamasını ekler. İş yükü için otomatik yeniden başlatma işlevini yeniden etkinleştirmek için iş yükündeki ek açıklamayı manuel olarak silmeniz gerekir.',
  // More > Delete
  // Persistent Volume Claims > Persistent Volume Claims
  MAXIMUM_SIZE_SCAP: 'Maksimum boyut',
  VALUE_TIMEOUT: '{değer}ler (zaman aşımı)',
  // Persistent Volume Claims > Persistent Volume Claims
  PVC_COUNT: 'PVC\'ler'
};