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
  NETWORK_ISOLATION_DESC: 'Kullanıcılar, ağ yalıtımını yapılandırarak, uygulama yalıtımını uygulamak ve uygulama güvenliğini artırmak için aynı küme içindeki bölmeler arasındaki trafiği ve dışarıdan gelen trafiği kontrol edebilir.',
  NETWORK_ISOLATION_Q: 'Ağ izolasyonunu nasıl daha iyi kullanırım?',
  NETWORK_ISOLATION_Q1: 'Ağ izolasyonunu uygulamak için CNI eklentisindeki gereksinimler nelerdir?',
  // Network Isolation
  NETWORK_ISOLATION: 'Ağ İzolasyonu',
  ENABLE: 'Etkinleştir',
  PROJECT_NETWORK_ISOLATION: 'Proje ağ izolasyonu',
  NETWORK_POLICY_EMP_TITLE: 'Ağ İzolasyonu Etkin Değil',
  NETWORK_POLICY_EMP_DESC: 'Proje ağ erişimi etkinleştirildikten sonra, diğer projeler projeye erişemez. Ancak ihtiyaçlarınıza göre projelerin, hizmetlerin ve harici IP adreslerinin bu projeye erişmesine izin verebilirsiniz.',
  // Network Isolation > Internal Allowlist
  INTERNAL_ALLOWLIST: 'Dahili İzin Listesi',
  INTERNAL_ALLOWLIST_TIP: 'Kümedeki projeleri ve hizmetleri izin verilenler listesine ekleyin.',
  INTERNAL_EGRESS_DESC: 'Mevcut projedeki pod\'ların aşağıdaki hizmet ve projelerin pod\'larına erişmesine izin verilir.',
  INTERNAL_INGRESS_DESC: 'Mevcut projedeki pod\'lara, aşağıdaki hizmet ve projelerin pod\'ları tarafından erişilmesine izin verilir.',
  INTERNAL_ALLOWLIST_DESC: 'Geçerli projedeki bölmelerin, geçerli kümenin diğer projelerindeki bölmelerle iletişim kurmasına izin verin.',
  EMPTY_RESOURCE_DESC: 'Lütfen en az bir proje veya hizmet seçin.',
  // Network Isolation > External Allowlist
  EXTERNAL_ALLOWLIST: 'Harici İzin Verilenler Listesi',
  EXTERNAL_ALLOWLIST_TIP: 'Kümenin dışındaki ağ kesimlerini ve bağlantı noktalarını izin verilenler listesine ekleyin.',
  EXTERNAL_ALLOWLIST_DESC: 'Geçerli projedeki bölmelerin, küme dışındaki belirli ağ kesimleri ve bağlantı noktalarıyla iletişim kurmasına izin verin.',
  NETWORK_SEGMENT_EXAMPLE: 'Örnek: 10.0.0.0',
  PORT_EXAMPLE: 'Örnek: 80',
  EXTERNAL_EGRESS_DESC: 'Mevcut projedeki bölmelerin aşağıdaki ağ bölümlerine ve bağlantı noktalarına erişmesine izin verilir.',
  EXTERNAL_INGRESS_DESC: 'Mevcut projedeki pod\'lara aşağıdaki ağ segmentleri ve bağlantı noktaları tarafından erişilmesine izin verilir.',
  SELECT_RULE_DIRECTION_TIP: 'Lütfen bir trafik yönü seçin.',
  ENTER_VALID_SEGMENT_DESC: 'Lütfen geçerli bir ağ segmenti girin.',
  ENTER_VALID_PORT_NUMBER_DESC: 'Lütfen geçerli bir bağlantı noktası numarası girin.',
  // Add Allowlist Entry
  ADD_ALLOWLIST_ENTRY: 'İzin Verilenler Listesi Girişi Ekle',
  EXTERNAL_TRAFFIC_DIRECTION_DESC: 'Çıkış, mevcut projeden kümenin dışına olan yönü gösterir. Giriş, kümenin dışından mevcut projeye olan yönü gösterir.',
  TRAFFIC_DIRECTION: 'Trafik yönü',
  NETWORK_SEGMENT_DESC: 'Bir ağ kesimi ayarlayın (CIDR desteklenir).',
  EGRESS: 'Çıkış',
  INGRESS: 'Giriş',
  INTERNAL_TRAFFIC_DIRECTION_DESC: 'Çıkış, mevcut projeden diğer projelere olan yönü gösterir. Giriş, diğer projelerden mevcut projeye olan yönü gösterir.',
  // Add Allowlist Entry > Project
  // Add Allowlist Entry > Service
  // Delete Allowlist Entry
  ALLOWLIST_ENTRY: 'Allowlist Entry',
  ALLOWLIST_ENTRY_LOW: 'izin verilenler listesi girişi'
};