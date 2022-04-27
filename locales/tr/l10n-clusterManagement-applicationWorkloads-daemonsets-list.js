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
  DAEMONSETS: 'Arka Plan Programı',
  DAEMONSET_EMPTY_DESC: 'Lütfen bir arka plan programı oluşturun.',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Update Strategy > Rolling Update Settings
  MIN_READY_SECONDS: 'Pod Hazırlık(lar)ı için Minimum Çalışma Süresi',
  MAX_UNAVAILABLE_PODS: 'Maksimum Kullanılamayan Pods',
  ROLLING_UPDATE_SETTINGS: 'Sürekli Güncelleme Ayarları',
  MAX_UNAVAILABLE_PODS_DESC: 'Güncelleme işlemi sırasında izin verilen maksimum kullanılamayan bölme kopyalarının sayısı veya yüzdesi.',
  MIN_READY_SECONDS_DESC: 'Bir pod replikasının hazır olarak kabul edilebilmesi için gereken minimum kararlı çalışma süresi.',
  MIN_READY_SECONDS_EMPTY: 'Lütfen bir pod replikasının hazır kabul edilmesi için gereken minimum kararlı çalışma süresini ayarlayın.',
  MAX_UNAVAILABLE_EMPTY: 'Lütfen güncelleme işlemi sırasında izin verilen maksimum kullanılamayan pod replikalarının sayısını veya yüzdesini ayarlayın.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > HTTP Request
  FAILURE_THRESHOLD: 'Başarısızlık Eşiği',
  HTTP_REQUEST: 'HTTP İsteği',
  INITIAL_DELAY_S: 'İlk Gecikme (ler)',
  INITIAL_DELAY_TIMEOUT_VALUE: '{delay}s başlangıç ​​gecikmesi, {timeout}s zaman aşımı süresi',
  PROBE_TIME: '{delay}s gecikme, {timeout}s zaman aşımı',
  TIMEOUT_PERIOD_S: 'Zaman aşımı',
  CHECK_INTERVAL_S: 'Kontrol Aralığı (lar)',
  SUCCESS_THRESHOLD: 'Başarı Eşiği',
  INITIAL_DELAY_DESC: 'Kapsayıcı başlatıldıktan sonra araştırma başlatılmadan önceki gecikme süresi. Değer bir tam sayı olmalıdır ve minimum değer 0\'dır.',
  TIMEOUT_PERIOD_DESC: 'Sondanın zaman aşımına uğradığı ve başarısız olarak kabul edildiği zaman aşımı süresi. Değer bir tam sayı olmalıdır ve minimum değer 1\'dir.',
  CHECK_INTERVAL_DESC: 'Kontrol denemeleri arasındaki aralık. Değer bir tam sayı olmalıdır ve minimum değer 1\'dir.',
  SUCCESS_THRESHOLD_DESC: 'Araştırmanın başarısız olduktan sonra başarılı sayılması için minimum ardışık başarı sayısı. Minimum değer 1\'dir ve canlılık ve başlangıç ​​probları için değer 1 olmalıdır.',
  FAILURE_THRESHOLD_DESC: 'Araştırmanın başarılı olduktan sonra başarısız olarak kabul edilmesi için minimum ardışık başarısızlık sayısı. Minimum değer 1\'dir.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > Command
  PROBE_COMMAND_EMPTY: 'Lütfen en az bir komut girin.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > TCP Port
  TCP_PORT: 'TCP Bağlantı Noktası',
  // List > Create > Storage Settings
  MOUNT_PATH_IN_USE: 'Bağlama yolu  zaten kullanımda. Lütfen başka bir bağlama yolu girin.'
};