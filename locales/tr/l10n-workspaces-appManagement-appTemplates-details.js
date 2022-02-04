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
  // Edit
  MODIFY_SUCCESSFUL: 'Başarıyla düzenlendi.',
  SERVICE_PROVIDER_WEBSITE_DESC: 'Servis sağlayıcının resmi web sitesi.',
  WRONG_ADDRESS_TIP: 'Yanlış adres biçimi. Lütfen doğru bir adres giriniz.',
  APP_NAME_DESC: 'Uygulamanın ismi. Maksimum uzunluk 20 karakterdir.',
  APP_DESCRIPTION_DESC: 'Uygulamanın açıklaması. Maksimum uzunluk 120 karakterdir.',
  APP_ICON_FORMAT: 'Biçim: PNG veya JPG',
  APP_ICON_SIZE: 'Boyut: 96 x 96 piksel',
  CHOOSE_APP_CATEGORY_DESC: 'Uygulama için kategori seçiniz.',
  EDIT_APP_DESC: 'Uygulama şablonunun temel bilgilerini düzenle.',
  ICON: 'İkon',
  SERVICE_PROVIDER_WEBSITE_TCAP: 'Servis Sağlayıcı Web Sitesi',
  START_EDITING: 'Düzenlemeye başla...',
  SCREENSHOTS_COLON: 'Ekran görüntüleri: ',
  DELETE_ALL: 'Hepsini Sil',
  // More > Install
  // More > Upload New Version
  ADD_VERSION_SUCCESSFUL: 'Sürüm başarıyla eklendi.',
  UPLOAD_PACKAGE_OK_NOTE: 'Sürüm zaten mevcut. Lütfen farklı bir sürüm yükleyiniz.',
  UPLOAD_NEW_VERSION: 'Yeni Sürüm Yükle',
  UPLOAD_NEW_VERSION_DESC: 'Uygulama şablonunun yeni sürümünü yükle.',
  // More > Delete
  DELETE_APP_TEMPLATE_DESC: 'Bu işlemin risklerini anladığınızı doğrulamak için <b>{resource}</b> uygulama şablonu adını girin.',
  DELETE_APP_TEMPLATE_VERSIONS_DESC: 'Bu işlemin risklerini anladığınızı doğrulamak için <b>{resource}</b> uygulama şablonu adını girin. Uygulama şablonunu silmeden önce şablonun tüm sürümlerini silmelisiniz.',
  APP_TEMPLATE_LOW: 'uygulama şablonu',
  // Details
  // Versions
  VERSION_INFO: 'Sürüm Bilgisi',
  INSTALL: 'Kur',
  SUBMIT_FOR_RELEASE: 'Yayınlanmak Üzere Gönder',
  DOWNLOAD_SUCCESSFUL: 'Başarılı olarak inidirildi.',
  VERSION_DELETE_TIP: '<strong>{name}</strong> sürümünü silmek istediğinizden emin misiniz?',
  VERSION_SUBMIT_TIP: 'Are you sure you want to submit the version <strong>{name}</strong> for release?',
  VERSION_CANCEL_TIP: 'Are you sure you want to cancel the submission of the version <strong>{name}</strong>?',
  VERSION_RELEASE_TIP: 'Users can view and deploy the version <strong>{name}</strong> in the App Store after it is released. Are you sure you want to release it?',
  VERSION_SUSPEND_TIP: 'The version <strong>{name}</strong > will not be displayed in the App Store after it is suspended. Are you sure you want to suspend it?',
  VERSION_RECOVER_TIP: 'The version <strong>{name}</strong> will be displayed in the App Store after it is recovered. Are you sure you want to recover it?',
  UPDATE_TIME_SCAP: 'Update time',
  VIEW_IN_STORE: 'View in Store',
  RELEASE_TO_STORE: 'Release to Store',
  // Versions > Upload
  UPLOAD_AGAIN_TIP: 'Bir hata oluştu. Lütfen tekrar deneyin.',
  // Versions > Submit for Release
  ENTER_VERSION_NUMBER_TIP: 'Lütfen bir sürüm numarası girin.',
  SUBMIT_REVIEW_DESC: 'Uygulamayı yayınlanmak üzere gönder.',
  APP_LEARN_MORE: '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">Daha Fazla Bilgi</a>',
  INVALID_VERSION_TIP: 'Lütfen doğru bir sürüm numarası girin.',
  // Versions > Submit for Release > Test Steps
  VERSION_SUBMIT_TEST_STEPS: '1. Tüm bağımlı çizelgelerin gönderilmiş olması.<br/>' + '2. Statik analizden geçmiş olması (helm lint).<br/>' + '3. Uygulamanın varsayılan değerler ile başlatılabilir olması (helm install). Tüm pod\'ların çalışır durumda olması ve tüm servislerin en az bir uç noktaya sahip olması.<br/>' + '4. Kullanılan imajların güvenlik zaafiyeti içermemesi.<br/>' + '5. Güncellemenin desteklenmesi.<br/>' + '6. Özel uygulama konfigürasyonunun desteklenmesi<br/>' + '7. Kubernetes alpha yeteneklerinin kullanılmaması<br/>' + '8. Uygulama girizgahını, gereksinimlerini ve özel parametre konfigürasyonlarını da içeren detaylı dökümantasyonun sağlanması.<br/>',
  VERSION_SUBMIT_NOTE: 'Başvuru iletmeden önce lütfen uygulamanızın sıradaki gereksinimleri sağladığından emin olun:',
  // Versions > Submit for Release > Update Log
  UPDATE_LOG_DESC: 'Uygulama güncellemeleri için detaylı bilgi giriniz.',
  SUBMIT_SUCCESSFUL: 'Başarıyla iletildi.',
  CANCEL_SUCCESSFUL: 'Başarıyla iptal edildi.',
  // App Information
  // App Release
  // App Instances
  APP_INSTANCES: 'Uygulama Örnekleri'
};