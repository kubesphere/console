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
  SERVICE_TYPES_Q: 'KubeSphere hangi servis türlerini destekliyor?',
  SERVICE_TYPES_A: 'KubeSphere durum bilgili ve durum bilgisiz servisleri destekler. Durum bilgili servislerin kapsül replikalarının her birinin bağımsız bölümleri varken, durum bilgisiz servislerin kapsül replikaları aynı bölüm içerisinde bulunurlar.',
  SCENARIOS_FOR_SERVICES_Q: 'Durum bilgili ve durum bilgisiz servislerin kullanım senaryoları nelerdir?',
  SCENARIOS_FOR_SERVICES_A: 'Durum bilgisiz servisler, Nginx ve Tomcat gibi veri sürerliliğinin gerekmediği senaryolarda uygulanabilir. Durum bilgili servisler ise, MySQL veritabanları, Kafka ve Zookeeper gibi veri sürerliliğinin gerektiği senaryolarda uygulanabilir.',
  // Service List
  SERVICE_TYPE: 'Servis Türü',
  SERVICE_LIST: 'Servis Listesi',
  SERVICE_TYPE_STATEFULSERVICE: 'Duruma Dayalı Hizmet',
  SERVICE_TYPE_STATELESSSERVICE: 'Sahipsiz Hizmet',
  SERVICE_TYPE_EXTERNALSERVICE: 'Harici servis',
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
  // List > Create
  CREATE_SERVICE_DESC: 'Servis oluşturma yöntemini seçiniz.',
  SELECT_SERVICE_TYPE_DESC: 'Durum bilgili veya durum bilgisiz servis oluştur, veya bir servisi harici bir servise adresle.',
  SERVICE_FROM_CODE: 'Kaynak Koddan Servis Oluştur',
  SERVICE_FROM_ARTIFACT: 'Artifact\'den Servis Oluştur',
  SERVICE_FROM_CODE_DESC: 'Varolan kaynak koddan bir imaj oluştur ve imajı dağıt.',
  SERVICE_FROM_ARTIFACT_DESC: 'Varolan bir artifact\'den imah oluştur ve imajı dağıt.',
  CUSTOMIZE_SERVICE: 'Servisi Özelleştir',
  CUSTOMIZE_SERVICE_DESC: 'İşyüklerini belirt veya bir servis oluşturmak için YAML konfigürasyon dosyasını düzenle.',
  // List > Create > Select Service Type > Stateless Service > Pod Settings > Port Settings
  PORT_INPUT_DESC: 'Port adı zaten mevcut. Lütfen başka bir ad girin.',
  PORT_NAME_DESC: 'Port adı yalnızca küçük harfler, sayılar ve kısa çizgiler (-) içerebilir ve küçük harf veya sayı ile başlayıp bitmelidir. Maksimum uzunluk 63 karakterdir.',
  // List > Create > Select Service Type > Stateful Service
  // List > Create > Select Service Type > External Service
  CREATE_EXTERNAL_SERVICE_DESC: 'Bir servis oluştur ve onu harici bir servise adresle.',
  CREATE_EXTERNAL_SERVICE: 'Harici Servis Oluştur',
  EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC: 'Lütfen harici servisin alan adını giriniz.',
  EXTERNAL_SERVICE_ADDRESS: 'Harici Servis Adresi',
  EXTERNAL_SERVICE_ADDRESS_DESC: 'Harici servisin alan adını giriniz.',
  // List > Create > Create Service from Source Code
  JAVA: 'Java',
  NODEJS: 'Node.js',
  PYTHON: 'Python',
  LANGUAGE_TYPE_VALUE: 'Dil Türü: {value}',
  // List > Create > Create Service from Source Code > Java > Basic Information
  // List > Create > Create Service from Source Code > Java > Build Settings
  // List > Create > Create Service from Source Code > Java > Pod Settings
  // List > Create > Create Service from Source Code > Java > Volume Settings
  // List > Create > Create Service from Source Code > Java > Advanced Settings
  // List > Create > Create Service from Source Code > Node.js > Basic Information
  // List > Create > Create Service from Source Code > Node.js > Build Settings
  // List > Create > Create Service from Source Code > Node.js > Pod Settings
  CONTAINER_SETTINGS: 'Konteyner Ayarları',
  // List > Create > Create Service from Source Code > Node.js > Volume Settings
  // List > Create > Create Service from Source Code > Node.js > Advanced Settings
  // List > Create > Create Service from Source Code > Python > Basic Information
  // List > Create > Create Service from Source Code > Python > Build Settings
  // List > Create > Create Service from Source Code > Python > Pod Settings
  // List > Create > Create Service from Source Code > Python > Volume Settings
  // List > Create > Create Service from Source Code > Python > Advanced Settings
  // List > Create > Create Service from Artifact
  ARTIFACT_TYPE_VALUE: 'Artifact Türü: {value}',
  // List > Create > Create Service from Artifact > JAR > Basic Information
  // List > Create > Create Service from Artifact > JAR > Build Settings
  // List > Create > Create Service from Artifact > JAR > Pod Settings
  // List > Create > Create Service from Artifact > JAR > Volume Settings
  // List > Create > Create Service from Artifact > JAR > Advanced Settings
  // List > Create > Create Service from Artifact > WAR > Basic Information
  // List > Create > Create Service from Artifact > WAR > Build Settings
  // List > Create > Create Service from Artifact > WAR > Pod Settings
  // List > Create > Create Service from Artifact > WAR > Volume Settings
  // List > Create > Create Service from Artifact > WAR > Advanced Settings
  // List > Create > Create Service from Artifact > Binary > Basic Information
  BINARY: 'Binary',
  // List > Create > Create Service from Artifact > Binary > Build Settings
  // List > Create > Create Service from Artifact > Binary > Pod Settings
  // List > Create > Create Service from Artifact > Binary > Volume Settings
  // List > Create > Create Service from Artifact > Binary > Advanced Settings
  // List > Create > Customize Service > Specify Workload > Basic Information
  SPECIFY_WORKLOAD_TO_CREATE_SERVICE: 'Servis Oluşturmak için İşyükü Belirt',
  EDIT_YAML_TO_CREATE_SERVICE: 'Servis Oluşturmak için YAML Düzenle',
  SPECIFY_WORKLOAD_DESC: 'Bir ya da daha fazla mevcut işyükünü kullanarak servis oluştur.',
  // List > Create > Customize Service > Specify Workload > Service Settings
  // List > Create > Customize Service > Specify Workload > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Service
  // List > Edit External Access
  // List > Delete
  NO_RELATED_RESOURCE_FOUND: 'İlişkili Kaynak Bulunamadı',
  NO_SERVICE_RELATED_RESOURCE_DESC: 'Servis ile ilişkili hiç bir kaynak bulunamadı.',
  DELETE_SERVICE_DESC: 'Servis(ler)i silmek üzeresiniz {resource}. Lütfen iligli kaynağı silmek istediğinizi teyid ediniz.',
  DELETE_SERVICE_DESC_PL: 'Servisleri silmek üzeresiniz. {resource}.<br/>Aynı zamanda, servisle ilintili aşağıdaki kaynakları da silmek istiyor musunuz?',
  DELETE_SERVICE_DESC_SI: 'Servisi silmek üzeresiniz. {resource}.<br/>Aynı zamanda, servisle ilintili aşağıdaki kaynağı da silmek istiyor musunuz?',
  DELETE_SERVICE: 'Servis Sil',
  DELETE_MULTIPLE_SERVICES: 'Servisleri Sil',
  // Service Topology
  SERVICE_TOPOLOGY: 'Servis Topolojisi',
  AUTO_REFRESH: 'Otomatik Yenileme',
  POD_COUNT_VALUE: 'Kapsüller: {value}'
};