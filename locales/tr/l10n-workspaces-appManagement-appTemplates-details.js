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
  // More > Upload Version
  ADD_VERSION_SUCCESSFUL: 'Sürüm başarıyla eklendi.',
  UPLOAD_PACKAGE_OK_NOTE: 'Sürüm zaten mevcut. Lütfen farklı bir sürüm yükleyiniz.',
  UPLOAD_NEW_VERSION: 'Upload Version',
  UPLOAD_NEW_VERSION_DESC: 'Uygulama şablonunun yeni sürümünü yükle.',
  // More > Delete
  DELETE_APP_TEMPLATE_DESC: 'Bu işlemin risklerini anladığınızı doğrulamak için <b>{resource}</b> uygulama şablonu adını girin.',
  DELETE_APP_TEMPLATE_VERSIONS_DESC: 'Bu işlemin risklerini anladığınızı doğrulamak için <b>{resource}</b> uygulama şablonu adını girin. Uygulama şablonunu silmeden önce şablonun tüm sürümlerini silmelisiniz.',
  APP_TEMPLATE_LOW: 'uygulama şablonu',
  // Details
  // Versions
  APP_STATUS_SUBMITTED: 'Submitted',
  APP_STATUS_NOT_SUBMITTED: 'Not submitted',
  VERSION_INFO: 'Sürüm Bilgisi',
  INSTALL: 'Kur',
  SUBMIT_FOR_REVIEW: 'Submit for Review',
  DOWNLOAD_SUCCESSFUL: 'Başarılı olarak inidirildi.',
  VERSION_DELETE_TIP: '<strong>{name}</strong> sürümünü silmek istediğinizden emin misiniz?',
  VERSION_SUBMIT_TIP: '<strong>{name}</strong> sürümünü yayınlanmak üzere göndermek istediğinizden emin misiniz?',
  VERSION_CANCEL_TIP: '<strong>{name}</strong> sürümünün yayın talebini iptal etmek istediğinizden emin misiniz?',
  VERSION_RELEASE_TIP: '<strong>{name}</strong> sürümü yayınlandıktan sonra kullanıcılar tarafından App Store\'dan görüntülenebilir ve yüklenebilir. Yayınlamak istediğinizden emin misiniz?',
  VERSION_SUSPEND_TIP: '<strong>{name}</strong > sürümü, askıya alındıktan sonra App Store\'da görüntülenemeyecek. Askıya almak istediğinizden emin misiniz?',
  VERSION_RECOVER_TIP: '<strong>{name}</strong> sürümü, kurtarıldıktan sonra App Store\'da görüntülenebilecek. Kurtarmak istediğinizden emin misiniz?',
  UPDATE_TIME_SCAP: 'Güncelleme zamanı',
  VIEW_IN_STORE: 'Mağazada Görüntüle',
  // Versions > Upload
  UPLOAD_AGAIN_TIP: 'Bir hata oluştu. Lütfen tekrar deneyin.',
  // Versions > Submit for Review
  ENTER_VERSION_NUMBER_TIP: 'Lütfen bir sürüm numarası girin.',
  SUBMIT_REVIEW_DESC: 'Submit the app template for review before releasing it to the App Store.',
  APP_LEARN_MORE: '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">Daha Fazla Bilgi</a>',
  INVALID_VERSION_TIP: 'Lütfen doğru bir sürüm numarası girin.',
  // Versions > Submit for Review > Test Steps
  VERSION_SUBMIT_TEST_STEPS: '1. Tüm bağımlı çizelgelerin gönderilmiş olması.<br/>' + '2. Statik analizden geçmiş olması (helm lint).<br/>' + '3. Uygulamanın varsayılan değerler ile başlatılabilir olması (helm install). Tüm pod\'ların çalışır durumda olması ve tüm servislerin en az bir uç noktaya sahip olması.<br/>' + '4. Kullanılan imajların güvenlik zaafiyeti içermemesi.<br/>' + '5. Güncellemenin desteklenmesi.<br/>' + '6. Özel uygulama konfigürasyonunun desteklenmesi<br/>' + '7. Kubernetes alpha yeteneklerinin kullanılmaması<br/>' + '8. Uygulama girizgahını, gereksinimlerini ve özel parametre konfigürasyonlarını da içeren detaylı dökümantasyonun sağlanması.<br/>',
  VERSION_SUBMIT_NOTE: 'Başvuru iletmeden önce lütfen uygulamanızın sıradaki gereksinimleri sağladığından emin olun:',
  // Versions > Submit for Review > Update Log
  UPDATE_LOG_DESC: 'Uygulama güncellemeleri için detaylı bilgi giriniz.',
  SUBMIT_SUCCESSFUL: 'Başarıyla iletildi.',
  CANCEL_SUCCESSFUL: 'Başarıyla iptal edildi.',
  // App Information
  // App Release
  // App Instances
  APP_INSTANCES: 'Uygulama Örnekleri'
};