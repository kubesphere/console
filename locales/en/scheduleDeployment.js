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
  WEIGHTS: 'Weights',
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
  STORAGE_MANAGEMENT_SCAP: 'Volume management',
  VOLUME_CLONE: 'Storage volume clone',
  ALLOW_VOLUME_CLONE_DESC: 'Allows users to clone volumes.',
  ALLOW_VOLUME_SNAPSHOT_DESC: 'Allows users to create volume snapshots.',
  'Volume Expansion': 'Storage volume expansion',
  ALLOW_VOLUME_EXPANSION_DESC:
    'Allows users to extend volumes. Volumes can only be extended and cannot be shrunk.',
}
