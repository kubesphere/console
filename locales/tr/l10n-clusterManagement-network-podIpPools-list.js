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
  NUMBER_OF_CREATION_TCAP: 'Oluşturma sayısı',
  IP_POOL_CREATE_DESC: 'Pod IP Pools to be Created',
  IP_ADDRESS_EMPTY_DESC: 'Please enter an IP address.',
  MASK_TIP: 'Please enter a mask.',
  ENTER_NETWORK_SEGMENT_TIP: 'Please enter a network segment.',
  IP_POOL_NUM_TIP: 'Please enter the number of pod IP pools to be created.',
  IP_POOL_CREATE_COUNT_DESC: 'Up to 10 pod IP pools can be created at the same time.',
  INVALID_IP_DESC: 'Invalid IP address format.',
  // List > Edit Information
  // List > View YAML
  // Assign Workspace
  IPPOOL_ASSIGN_WORKSPACE_DESC: 'Assign the pod IP pool to a workspace.',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING: 'The pod IP pool is in use and cannot be assigned to another specific workspace.',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING: 'The pod IP pool is in use with a specific workspace assigned. The workspace cannot be changed.',
  ASSIGN_WORKSPACE: 'Assign Workspace',
  SELECT_WORKSPACE_DESC: 'Select a workspace.',
  // List > Delete
  POD_IP_POOL_LOW: 'pod IP pool'
};