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
  APP_TEMPLATE_PL: 'Uygulama Şablonları',
  APPS_MANAGEMENT: 'Uygulama Yönetimi',
  UPLOAD_TEMPLATE: 'Şablonu Yükleyin',
  APP_TEMPLATE_DESC: 'Kubesphere, uygulamanız için tam kapsamlı yaşam döngüsü yönetimi sağlar. Uygulama şablonları yükleyebilir, yeni şablonlar oluşturabilir ve bunları hızlıca test edebilirsiniz. Ek olarak, uygulamalarınızı App Store\'a yükleyebilir ve diğer kullanıcıların da bir tık ile kullanmaya başlamalarını sağlayabilirsiniz.',
  DEVELOP_APP_DESC: 'Uygulama şablonları geliştirmek için Helm çizelgeleri yükleyebilir veya KubeSphere tarafından sağlanan kaynak orkestrasyon aracını kullanabilirsiniz.',
  DEVELOP_APP_TITLE: 'Uygulama şablonlarını nasıl oluşturabilirim?',
  HOW_PUBLISH_APP_TITLE: 'Uygulamaları App Store\'a nasıl yayınlayabilirim?',
  HOW_PUBLISH_APP_DESC: 'Uygulama şablonu olarak Help çizelgelerini çalışma alanına yükleyebilirsiniz. Bu uygulamalar, onaylandıktan sonra App Store\'a yayınlanacaktır.',
  // List
  APP_TEMPLATE_EMPTY_DESC: 'Lütfen bir uygulama şablonu oluşturunuz.',
  LATEST_VERSION: 'Son Sürüm',
  // List > Create
  CREATE_APP_TEMPLATE: 'Uygulama Şablonu Oluştur',
  CREATE_APP_TEMPLATE_DESC: 'Taşınabilir, hafif ve kendini içeren yazılım paketleme teknolojileri, uygulamaların hemen her platformda aynı şekilde çalışmasına olanak sağlar.',
  APP_CREATE_GUIDE: '<a href="{docUrl}/application-store/app-developer-guide/helm-specification/" target="_blank" rel="noreferrer noopener">Helm Özellikleri</a> yazılım geliştirme rehberine bakınız.',
  UPLOAD: 'Yükle',
  // List > Create > Upload
  UPLOAD_HELM_TITLE: 'Help Çizelgesi Yükle',
  UPLOAD_HELM_CHART_DESC: 'Upload an existing Helm chart.',
  HELM_CHART_FORMAT_DESC: 'Supports tar.gz and tgz formats.',
  UPLOAD_ICON: 'Upload Icon',
  UPLOAD_SUCCESSFUL: 'Uploaded successfully.',
  UPLOADING: 'Uploading',
  FILE_MAX_SIZE_ICON: 'The maximum size of the icon is 96 x 96 pixels.',
  FILE_MAX_SCREENSHOTS: 'The snapshot size cannot exceed 2 MB.',
  APP_ICON_NOTE: 'Upload a JPG or PNG image of 96 x 96 pixels.',
  MISS_FILE_NOTE: 'The file {file} was not found.',
  LICENSE_FILE_DESC: 'License agreement in text format.',
  CHART_FILE_DESC: 'YAML file that describes basic information about the chart such as the name and version.',
  README_FILE_DESC: 'App introduction.',
  REQUIREMENTS_FILE_DESC: 'File that describes dependencies of the chart.',
  VALUES_FILE_DESC: 'Default configuration file of the chart.',
  CHARTS_FILE_DESC: 'Directory that contains dependencies of the chart.',
  TEMPLATES_FILE_DESC: 'Directory that contains deployment template files.',
  NOTES_FILE_DESC: 'User instructions.',
  INCORRECT_FILE: 'Incorrect file? ',
  TRY_AGAIN: 'Try Again',
  FILE_MAX_ICON_DESC: 'The icon size should not exceed 20 KB. Please try again.',
  HOMEPAGE: 'Homepage',
  OPTIONAL: 'Optional'
};