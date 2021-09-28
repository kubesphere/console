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
  'Set Replicas': 'Fixed number of replicas',
  SPECIFY_REPLICAS: 'Specify Replicas',
  SPECIFY_WEIGHTS: 'Specify Weights',
  SPECIFY_WEIGHTS_DESC:
    'Set the total number of Pod replicas and a weight for each cluster. The Pod replicas will be scheduled to the clusters according to the weights.',
  SPECIFY_REPLICAS_DESC:
    'Manually set the number of Pod replicas in each cluster.',
  'Total Replicas Number': 'Total number of replicas',
  WEIGHT: 'weight',
  TOTAL_REPLICAS: 'Total Replicas',
  ENTER_POSITIVE_INTEGER_DESC: 'Please enter a positive integer.',
  TOTAL_REPLICAS_EMPTY_DESC:
    'Please enter the total number of Pod replicas in all clusters.',
  'Storage Function Manage': 'Storage volume function management',
  'Volume Clone': 'Storage volume clone',
  Volume_Clone_Des: 'Create an identical storage volume.',
  Volume_SnapShot_Des:
    'Create a storage volume snapshot, which can be used to create other storage volumes.',
  'Volume Expansion': 'Storage volume expansion',
  Volume_Expansion_Des:
    'Increase the capacity of the storage volume. The capacity of the storage volume cannot be reduced on the console because data may be lost.',
}
