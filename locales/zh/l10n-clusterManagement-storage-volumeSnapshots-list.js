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
  VOLUME_SNAPSHOT_DESC: '存储卷快照是存储卷在特定时间点的副本，可使用快照中的数据预配新存储卷，或者将存储卷恢复至快照捕捉到的先前状态。',
  VOLUME_SNAPSHOT_PL: '存储卷快照',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q: 'What is a volume snapshot class ?',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_A: 'A volume snapshot class defines the storage types used to create a volume snapshot.',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q: 'What is a volume snapshot content?',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A: 'A volume snapshot content is a resource that represents the content of a volume snapshot.',
  SELECT_A_VOLUME_DESC: 'Select a volume to create a snapshot.',
  SELECT_VOLUME_SNAPSHOT_CLASS_DESC: '选择快照类型以创建特定类型的快照。',
  // List
  VOLUME_SNAPSHOT_STATUS_CREATING: '创建中',
  VOLUME_SNAPSHOT_STATUS_FAILED: '创建失败',
  VOLUME_SNAPSHOT_STATUS_READY: '创建成功',
  VOLUME_SNAPSHOT_STATUS_DELETING: '删除中',
  CREATE_STATUS_SUCCESS: '创建成功',
  CREATE_STATUS_UPDATING: '创建中',
  CREATE_STATUS_FAILED: '创建失败',
  CREATE_STATUS_DELETING: '删除中',
  // List > Delete
  VOLUME_SNAPSHOT_LOW: '存储卷快照',
  // List > Create
  STORAGECLASS_NOT_ALLOW_CREATE_SNAPSHOT: '存储卷的存储类型不支持创建快照，请重新选择。'
};