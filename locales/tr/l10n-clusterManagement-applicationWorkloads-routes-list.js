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
  ROUTE_DESC: 'An ingress provides a way to aggregate services. You can expose the internal services outside the cluster through an externally accessible IP address.',
  PREREQUESTS_FOR_USE_ROUTE_Q: 'What are the prerequisites for using ingresses?',
  PREREQUESTS_FOR_USE_ROUTE_A: 'To use ingresses, you need to contact the project administrator to set the gateway for the project.',
  ACCESS_TYPES_OF_ROUTE_Q: 'What are the external access modes of ingresses?',
  ACCESS_TYPES_OF_ROUTE_A: 'KubeSphere ingresses support the NodePort and LoadBalancer external access modes.',
  ROUTE_PL: 'Ingresses',
  // List
  GATEWAY_ADDRESS_TCAP: 'Ağ Geçidi Adresi',
  ROUTE_EMPTY_DESC: 'Please create an ingress.',
  // List > Create > Basic Information
  // List > Create > Routing Rules
  ADD_ROUTING_RULE_DESC: 'Alan adı yollarını hizmetlere eşlemek için bir yönlendirme kuralı ekleyin.',
  ADD_ROUTING_RULE: 'Yönlendirme Kuralı Ekle',
  ROUTING_RULE_EMPTY_DESC: 'Lütfen en az bir yönlendirme kuralı ekleyin.',
  PATH_EMPTY_DESC: 'Lütfen en az bir tarih ekleyiniz.',
  AUTO_GENERATE_TCAP: 'Otomatik Oluştur',
  DOMAIN_NAME_TCAP: 'Etki alanı adı',
  DOMAIN_NAME_EMPTY_DESC: 'Lütfen geçerli bir domain adı giriniz.',
  INVALID_DOMAIN_DESC: 'Geçersiz etki alanı.',
  INVALID_PATH_DESC: 'Geçersiz yol.',
  MODE_TCAP: 'Mod',
  PATH_PL: 'Yollar',
  PATH_SERVICE_TIP: 'Hizmet',
  SET_ROUTING_RULES: 'Yönlendirme Kuralı Ekle',
  SPECIFY_DOMAIN_TCAP: ' Etki Alanı Belirtin',
  NO_GATEWAY_DESC: 'Otomatik Oluştur\'u kullanmak için, projenin Ağ Geçidi Ayarlarında ağ geçidi erişim modunu ayarlamak için lütfen proje yöneticisiyle iletişime geçin.',
  PATH: 'Yol',
  PROTOCOL: 'Protokol',
  PORT: 'Bağlantı Noktası (port)',
  PORT_VALUE: 'Bağlantı noktası: {değer}',
  CERTIFICATE: 'Sertifika',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Routing Rules
  EDIT_ROUTING_RULES: 'Yönlendirme Kuralı Ekle',
  // List > Edit Annotations
  EDIT_ANNOTATIONS: 'Ek Açıklamaları Düzenle',
  // List > Delete
  ROUTE_LOW: 'ingress'
};