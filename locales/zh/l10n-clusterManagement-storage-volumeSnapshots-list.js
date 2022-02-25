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
  VOLUME_SNAPSHOT_DESC:
    '存储卷快照是存储卷在特定时间点的副本，可使用快照中的数据预配新存储卷，或者将存储卷恢复至快照捕捉到的先前状态。',
  VOLUME_SNAPSHOT_PL: '存储卷快照',
  VOLUME_SNAPSHOT_CONTENT_PL: 'Volume Snapshot Content',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q: 'What is a snapshot class ?',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_A:
    'VolumeSnapshotClass 允许指定属于 VolumeSnapshot 的不同属性。在从存储系统的相同卷上获取的快照之间，这些属性可能有所不同，因此不能通过使用与 PersistentVolumeClaim 相同的 StorageClass 来表示。',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q: 'What is volume snapshot content ?',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A:
    'VolumeSnapshotContent 是一种快照，从管理员已提供的集群中的卷获取。就像持久卷是集群的资源一样，它也是集群中的资源',
  SELECT_A_VOLUME_DESC: 'Select a Volume to create a snapshot.',
  SELECT_VOLUME_SNAPSHOT_CLASS_DESC:
    'Select a snapshot class to create a snapshot of a specific type.',

  // List
  VOLUME_SNAPSHOT_STATUS_CREATING: '创建中',
  VOLUME_SNAPSHOT_STATUS_FAILED: '创建失败',
  VOLUME_SNAPSHOT_STATUS_READY: '创建成功',
  VOLUME_SNAPSHOT_STATUS_DELETING: '删除中',
  CREATE_STATUS_SUCCESSFUL: '创建成功',
  CREATE_STATUS_UPDATING: '创建中',
  CREATE_STATUS_FAILED: '创建失败',
  CREATE_STATUS_DELETING: '删除中',
  // List > Delete
  VOLUME_SNAPSHOT_LOW: '存储卷快照',

  // List > Create
  STORAGECLASS_NOT_ALLOW_CREATE_SNAPSHOT:
    '该存储卷所属存储类型不允许创建快照，请重新选择。',
}
