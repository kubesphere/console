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
  VOLUME_SNAPSHOT_DESC: 'Birim anlık görüntüsü, bir birimin belirli bir zaman noktasındaki kopyasıdır. Anlık görüntü tarafından önceden doldurulmuş verilerle yeni bir birim sağlamak veya bir birimi anlık görüntü tarafından yakalanan önceki durumuna geri yüklemek için kullanılabilir.',
  VOLUME_SNAPSHOT_PL: 'Birim Anlık Görüntüsü',
  VOLUME_SNAPSHOT_CONTENT_PL: 'Volume Snapshot Content',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q: 'What is a snapshot class ?',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_A: 'VolumeSnapshotClass allows the specification of different attributes belonging to a VolumeSnapshot. These properties may differ between snapshots taken from the same volume of a storage system and therefore cannot be represented by using the same StorageClass as PersistentVolumeClaim.',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q: 'What is volume snapshot content ?',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A: 'VolumeSnapshotContent is a snapshot that is taken from a volume in the cluster that has been provisioned by the administrator. Just as a persistent volume is a resource in the cluster, it is also a resource in the cluster.',
  SELECT_A_VOLUME_DESC: 'Select a Volume to create a snapshot.',
  SELECT_VOLUME_SNAPSHOT_CLASS_DESC: 'Select a snapshot class to create a snapshot of a specific type.',
  // List
  VOLUME_SNAPSHOT_STATUS_CREATING: 'Oluşturuluyor',
  VOLUME_SNAPSHOT_STATUS_FAILED: 'Oluşturulamadı',
  VOLUME_SNAPSHOT_STATUS_READY: 'Başarıyla oluşturuldu',
  VOLUME_SNAPSHOT_STATUS_DELETING: 'Siliniyor',
  CREATE_STATUS_SUCCESSFUL: 'Başarıyla oluşturuldu',
  CREATE_STATUS_UPDATING: 'Oluşturuluyor',
  CREATE_STATUS_FAILED: 'Oluşturulamadı',
  CREATE_STATUS_DELETING: 'Siliniyor',
  // List > Delete
  VOLUME_SNAPSHOT_LOW: 'birim Anlık Görüntüsü',
  // List > Create
  STORAGECLASS_NOT_ALLOW_CREATE_SNAPSHOT: 'The storage type to which this storage volume belongs does not allow snapshots to be created, please reselect it.'
};