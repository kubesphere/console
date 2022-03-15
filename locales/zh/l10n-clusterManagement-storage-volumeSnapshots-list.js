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
  VOLUME_SNAPSHOT_CONTENT_PL: '存储卷快照内容',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q: '什么是快照类型 ?',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_A:
    '存储卷快照类型可用于指定存储卷快照的属性。从存储系统的相同存储卷实例创建的快照可能有不同的属性，因此这些属性无法通过相同存储类型生成的存储卷来表示。',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q: '什么是存储卷快照内容？',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A:
    '存储卷快照内容是从集群管理员分配的存储卷创建的快照。与存储卷实例类似，存储卷快照也是集群中的资源。',
  SELECT_A_VOLUME_DESC: '选择用于创建快照的存储卷。',
  SELECT_VOLUME_SNAPSHOT_CLASS_DESC: '选择快照类型以创建特定类型的快照。',
  // List
  VOLUME_SNAPSHOT_STATUS_CREATING: '创建中',
  VOLUME_SNAPSHOT_STATUS_FAILED: '创建失败',
  VOLUME_SNAPSHOT_STATUS_READY: '创建成功',
  VOLUME_SNAPSHOT_STATUS_DELETING: '删除中',
  CREATE_STATUS_SUCCESS: 'Created successfully',
  CREATE_STATUS_UPDATING: '创建中',
  CREATE_STATUS_FAILED: '创建失败',
  CREATE_STATUS_DELETING: '删除中',
  // List > Delete
  VOLUME_SNAPSHOT_LOW: '存储卷快照',
  // List > Create
  STORAGECLASS_NOT_ALLOW_CREATE_SNAPSHOT:
    '存储卷的存储类型不支持创建快照，请重新选择。',
}
