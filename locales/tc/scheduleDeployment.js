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
  'Set Replicas': '固定副本数量',
  SPECIFY_WEIGHTS_DESC:
    '設定的總副本數將按照設定的權重分配到選擇的集群中，非可用集群的副本會自定遷移到可用集群上。',
  SPECIFY_REPLICAS_DESC: '明確指定各集群所需部署的副本數。',
  'Total Replicas Number': '總副本數',
  WEIGHT: '權重',
  SPECIFY_REPLICAS: 'Specify Replicas',
  WEIGHTS: 'Weights',
  SPECIFY_WEIGHTS: 'Specify Weights',
  TOTAL_REPLICAS: '副本總數',
  ENTER_POSITIVE_INTEGER_DESC: '副本輸入不合法',
  TOTAL_REPLICAS_EMPTY_DESC: '請輸入副本總數',
  STORAGE_MANAGEMENT_SCAP: '存儲卷管理',
  VOLUME_CLONE: '存儲卷克隆',
  ALLOW_VOLUME_CLONE_DESC: 'Allows users to clone volumes.',
  ALLOW_VOLUME_SNAPSHOT_DESC: 'Allows users to create volume snapshots.',
  'Volume Expansion': '存儲卷擴容',
  ALLOW_VOLUME_EXPANSION_DESC:
    'Allows users to extend volumes. Volumes can only be extended and cannot be shrunk.',
}
