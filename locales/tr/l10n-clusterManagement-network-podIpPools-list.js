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
  POD_IP_POOL_PL: 'Kapsül IP Havuzu',
  POD_IP_POOL_DESC: 'Kapsül IP havuzları, kümedeki kapsül ağ adres alanını yönetmek için kullanılır. İhtiyaçlarınıza göre Kapsül IP havuzları oluşturabilirsiniz.',
  IPPOOL_USAGE_Q: 'Kapsül IP havuzu kullanarak bir kapsül ağını nasıl yönetirim?',
  IPPOOL_USAGE_A: 'Kapsül ağ adres alanını yönetmek için bir kapsül IP havuzu kullanılır ve farklı kapsül IP havuzları arasındaki adres boşlukları çakışamaz. Bir iş yükü oluştururken, bu kapsül IP havuzundan oluşturulan kapsüllere IP adresleri atamak için belirli bir kapsül IP havuzu seçebilirsiniz.',
  // List
  POD_IP_POOL_EMPTY_DESC: 'Lütfen bir Kapsül IP havuzu oluşturun.',
  TOTAL_VALUE: 'Toplam:{değer}',
  ALL: 'Hepsi',
  NOT_ASSIGNED: 'Atanmamış',
  // List > Create
  CREATE_POD_IP_POOL: 'Kapsül IP Havuzu Yarat',
  NETWORK_SEGMENT: 'Ağ Bölümü',
  USED_IP_ADDRESSES: 'Kullanılan Ip Adresleri',
  QUANTITY: 'Miktar',
  IP_POOL_CREATE_DESC: 'Oluşturulacak Kapsül IP Havuzları',
  IP_ADDRESS_EMPTY_DESC: 'Lütfen bir IP adresi girin.',
  MASK_TIP: 'Lütfen maskeyi girin.',
  ENTER_NETWORK_SEGMENT_TIP: 'Lütfen bir ağ bölümü girin.',
  IP_POOL_NUM_TIP: 'Lütfen oluşturulacak Kapsül IP havuzlarının sayısını girin.',
  IP_POOL_CREATE_COUNT_DESC: 'Aynı anda 10 adede kadar kapsül IP havuzu oluşturulabilir.',
  INVALID_IP_DESC: 'Geçersiz IP adres biçimi.',
  // List > Edit Information
  // List > View YAML
  // Assign Workspace
  IPPOOL_ASSIGN_WORKSPACE_DESC: 'Kapsül IP havuzunu bir çalışma alanına atama.',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING: 'Kapsül IP havuzu kullanımda ve başka bir çalışma alanına atanamaz.',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING: 'Kapsül IP havuzu, atanmış belirli bir çalışma alanıyla kullanımda. Çalışma alanı değiştirilemez.',
  ASSIGN_WORKSPACE: 'Atanmış Çalışma alanı',
  SELECT_WORKSPACE_DESC: 'Çalışma alanını seçin.',
  // List > Delete
  POD_IP_POOL_LOW: 'kapsül IP Havuzu'
};