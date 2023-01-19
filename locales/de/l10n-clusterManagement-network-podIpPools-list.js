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
  POD_IP_POOL_PL: 'Pod-IP-Pools',
  POD_IP_POOL_DESC: 'Pod IP pools is used to manage the pod network address space in the cluster. You can create pod IP pools based on your needs.',
  IPPOOL_USAGE_Q: 'How do I manage a pod network using a pod IP pool?',
  IPPOOL_USAGE_A: 'A pod IP pool is used to manage the pod network address space, and the address spaces between different pod IP pools cannot overlap. When creating a workload, you can select a specific pod IP pool to assign IP addresses from this pod IP pool to the created pods.',
  // List
  POD_IP_POOL_EMPTY_DESC: 'Bitte erstellen Sie einen Pod-IP-Pool.',
  TOTAL_VALUE: 'Insgesamt: {value}',
  ALL: 'Alles',
  NOT_ASSIGNED: 'Nicht zugewiesen',
  // List > Create
  CREATE_POD_IP_POOL: 'Pod-IP-Pool erstellen',
  NETWORK_SEGMENT: 'Netzwerksegment',
  USED_IP_ADDRESSES: 'Verwendete IP-Adressen',
  QUANTITY: 'Anzahl',
  IP_POOL_CREATE_DESC: 'Zu erstellende Pod-IP-Pools',
  IP_ADDRESS_EMPTY_DESC: 'Bitte geben Sie eine IP-Adresse ein.',
  MASK_TIP: 'Bitte geben Sie eine Maske ein.',
  ENTER_NETWORK_SEGMENT_TIP: 'Bitte geben Sie ein Netzwerksegment ein.',
  IP_POOL_NUM_TIP: 'Bitte geben Sie die Anzahl der zu erstellenden Pod-IP-Pools ein.',
  IP_POOL_CREATE_COUNT_DESC: 'Bis zu 10 Pod-IP-Pools können gleichzeitig erstellt werden.',
  INVALID_IP_DESC: 'Ungültiges IP-Adressformat.',
  // List > Edit Information
  // List > View YAML
  // Assign Workspace
  IPPOOL_ASSIGN_WORKSPACE_DESC: 'Weisen Sie den Pod-IP-Pool einem Arbeitsbereich zu.',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING: 'Der Pod-IP-Pool wird verwendet und kann keinem anderen spezifischen Arbeitsbereich zugewiesen werden.',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING: 'Der Pod-IP-Pool wird mit einem bestimmten zugewiesenen Arbeitsbereich verwendet. Der Arbeitsbereich kann nicht geändert werden.',
  ASSIGN_WORKSPACE: 'Arbeitsbereich zuweisen',
  SELECT_WORKSPACE_DESC: 'Wählen Sie einen Arbeitsbereich aus.',
  // List > Delete
  POD_IP_POOL_LOW: 'pod IP pool'
};