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
  VOLUME_SNAPSHOT: '卷快照',
  VOLUME_SNAPSHOT_PL: '卷快照',
  VOLUME_SNAPSHOT_DESC: '卷快照是卷在特定时间点的副本，可使用快照中的数据预配新卷，或者将卷恢复至快照捕捉到的先前状态。',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q: '什么是卷快照类？',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_A: '卷快照类定义了用于创建卷快照的存储种类。',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q: '什么是卷快照内容？',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A: '卷快照内容是一种代表卷快照具体内容的资源。',
  SELECT_A_VOLUME_DESC: '选择一个持续卷声明来创建快照。',
  SELECT_VOLUME_SNAPSHOT_CLASS_DESC: '选择卷快照类以创建特定类型的快照。',
  // List
  VOLUME_SNAPSHOT_EMPTY_DESC: '请创建一个卷快照。',
  VOLUME_SNAPSHOT_STATUS_CREATING: '创建中',
  VOLUME_SNAPSHOT_STATUS_FAILED: '创建失败',
  VOLUME_SNAPSHOT_STATUS_READY: '创建成功',
  VOLUME_SNAPSHOT_STATUS_DELETING: '删除中',
  CREATE_STATUS_SUCCESS: '创建成功',
  CREATE_STATUS_UPDATING: '创建中',
  CREATE_STATUS_FAILED: '创建失败',
  CREATE_STATUS_DELETING: '删除中',
  // List > Delete
  VOLUME_SNAPSHOT_LOW: '卷快照',
  // List > Create
  STORAGECLASS_NOT_ALLOW_CREATE_SNAPSHOT: '持久卷声明的存储类不支持创建快照，请选择其他持久卷声明。'
};