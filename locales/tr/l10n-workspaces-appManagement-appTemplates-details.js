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
  UPLOAD_AGAIN_TIP: 'An error occurred. Please try again.',
  // Versions > Submit for Release
  ENTER_VERSION_NUMBER_TIP: 'Please enter a version number.',
  SUBMIT_REVIEW_DESC: 'Submit the app for release.',
  APP_LEARN_MORE: '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">Learn More</a>',
  INVALID_VERSION_TIP: 'Please enter a correct version number.',
  // Versions > Submit for Release > Test Steps
  VERSION_SUBMIT_TEST_STEPS: '1. All dependent charts have been submitted.<br/>' + '2. The static analysis has been passed (helm lint).<br/>' + '3. The app can be started using default values (helm install). All pods are in running state and all services have at least one endpoint.<br/>' + '4. The images used have no security vulnerabilities.<br/>' + '5. Upgrade is supported.<br/>' + '6. Custom application configuration is supported.<br/>' + '7. Do not use the alpha features of Kubernetes.<br/>' + '8. Detailed documentation is provided, including app introduction, prereauisites, and custom parameter configurations.<br/>',
  VERSION_SUBMIT_NOTE: 'Please make sure your app has met the following requirements before submission:',
  // Versions > Submit for Release > Update Log
  UPDATE_LOG_DESC: 'Enter detailed information about the app updates.',
  SUBMIT_SUCCESSFUL: 'Submitted successfully.',
  CANCEL_SUCCESSFUL: 'Canceled successfully.',
  // App Information
  // App Release
  // App Instances
  APP_INSTANCES: 'App Instances'
};