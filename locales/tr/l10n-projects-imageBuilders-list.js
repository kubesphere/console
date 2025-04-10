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
  IMAGE_BUILDER_PL: 'Görüntü Oluşturucu',
  IMAGE_BUILDER_DESC: 'Image Builder, kaynak koddan veya yapılardan kapsayıcı görüntüleri oluşturan bir araçtır. Basit yapılandırmalar aracılığıyla kaynak koddan veya yapay yapılardan kapsayıcı görüntüleri oluşturabilirsiniz.',
  // List
  IMAGE_BUILDER_EMPTY_DESC: 'Lütfen bir resim oluşturucu oluşturun.',
  NOT_RUNNING_YET: 'Henüz çalıştırılmadı',
  BUILDING: 'Building',
  S2I: 'Source-to-image',
  B2I: 'Artifact-to-image',
  // List > Name (Displayed after you create a service from artifact)
  BUILD_IMAGE_FOR_SERVICE: '{service} hizmeti için görüntü oluşturun.',
  // List > Create > Build Mode
  BUILD_MODE: 'İnşa Modu',
  CONTAINERD_RUNTIME_NOT_SUPPORTED: 'The containerd runtime does not support this feature.',
  S2I_DESC: 'Bir kaynak kodu dili seçin.',
  IMAGE_FROM_S2I: 'Kaynak Kodundan Resim Oluştur',
  IMAGE_FROM_B2I: 'Artifact\'ten Görüntü Oluşturma',
  B2I_DESC: 'Bir yapıt dosya türü seçin.',
  EMPTY_IMAGE_TYPE_DESC: 'Please select a language or artifact type.',
  // List > Create > Java > Build Settings
  CODE_REPOSITORY_URL: 'Kod Depo URL',
  CODE_REPOSITORY_BRANCH: 'Uzak Kod Deposu',
  CODE_REPOSITORY_KEY: 'Kod Deposu Anahtarı',
  CODE_REPOSITORY_URL_DESC: 'Kaynak kod deposunun adresini girin. Şu anda yalnızca Git depoları desteklenmektedir.',
  CODE_REPOSITORY_KEY_DESC: 'Özel bir kod deposu kullanılıyorsa, kod deposu anahtarını içeren sırrı seçin.',
  IMAGE_NAME: 'Resim Adı',
  IMAGE_TAG: 'Görüntü Etiketi',
  TARGET_IMAGE_REPOSITORY: 'Hedef Görüntü Kaydı',
  S2I_IMAGE_NAME_DESC: 'Ad yalnızca küçük harfler, sayılar, kısa çizgiler (-), noktalar (.), eğik çizgiler (/) ve iki nokta üst üste (:) içerebilir ve küçük harf veya sayı ile başlayıp bitmelidir.',
  S2I_TARGET_IMAGE_REPOSITORY_DESC: 'Oluşturulacak görüntüyü depolamak için bir görüntü kaydı seçin. Görüntü kaydı yoksa, bir görüntü kayıt defteri sırrı oluşturmanız gerekir. <br/><a href={link} target="_blank">Daha Fazla Bilgi Edinin</a>',
  TRIGGER_TOKEN: 'Tetik anahtarı',
  INVALID_TRIGGER_TOKEN_DESC: 'Geçersiz jeton. Belirteç yalnızca büyük harf, küçük harf ve sayı içerebilir.',
  TRIGGER_TOKEN_DESC: 'KubeSphere\'e karşı bir istemcinin kimliğini doğrulamak için kullanılan bir belirteç ayarlayın. Bir istemciyi, bir web kancası üzerinden KubeSphere\'de görüntü oluşturmayı otomatik olarak tetikleyecek şekilde ayarlayabilirsiniz. Belirteç yalnızca büyük harf, küçük harf ve sayı içerebilir.',
  CODE_RELATIVE_PATH: 'Göreceli Yol',
  CODE_RELATIVE_PATH_DESC: 'Kod deposundaki kodun göreli yolunu ayarlayın. Varsayılan yol /.',
  S2I_ENVIRONMENT_DESC: 'Görüntünün çalışma zamanı davranışını kontrol etmek için ortam değişkenlerini ayarlayın. <a href={link} target="_blank">Daha Fazla Bilgi Edinin</a>',
  // List > Create > JAR > Build Settings
  UPLOAD_ARTIFACT_FILE: 'Yapı Dosyası Yükle',
  UPLOAD_PERCENT: 'Yükleniyor:{percent}%',
  UPLOAD_FULLY: 'Yüklendi: 100%',
  UPLOAD_FAILED: 'Yükleme başarısız.',
  ARTIFACT_FILE_EMPTY_DESC: 'Lütfen bir yapı dosyası yükleyin.',
  B2I_DEFAULT_DESC: 'Yapı Dosyası Yükle.',
  JAR_DESC: 'JAR formatında bir yapı dosyası yükleyin.',
  WAR_DESC: 'WAR formatında bir yapı dosyası yükleyin.',
  BUILD_ENVIRONMENT: 'Yapı Ortamı',
  CODE_REPOSITORY_KEY_NOT_REQUIRED: 'Geçerli kod deposu bir anahtar gerektirmez.',
  FILE_SIZE_VALUE: 'Dosya Boyutu:{value}',
  FILE_UPLOADED_TIP: 'Dosya Başarı ile Yüklendi.',
  WRONG_FILE_EXTENSION_NAME: 'Seçilen dosya türü eşleşmiyor. Lütfen {type} türünü seçin.',
  IMAGE_NAME_EMPTY_DESC: 'Lütfen bir resim adı girin.',
  IMAGE_TAG_EMPTY_DESC: 'Lütfen bir resim etiketi girin.',
  TARGET_IMAGE_REPOSITORY_EMPTY_DESC: 'Lütfen bir hedef görüntü kaydı ayarlayın.',
  VALIDATE_SUCCESS: 'Validation succeeded',
  VALIDATE_FAILED: 'Validation failed',
  RUN_SUCCESSFUL: 'Run succeeded',
  RUN_FAILED: 'Run failed'
};