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
  // Navigation pane
  STORAGE: '存储',
  // Banner
  VOLUME_DESC: '存储卷供用户创建的工作负载使用，是将工作负载数据持久化的一种资源对象。',
  // List
  VOLUME_SNAPSHOT_EMPTY_DESC: 'Please create a volume snapshot.',
  VOLUME_STATUS_BOUND: '准备就绪',
  VOLUME_STATUS_LOST: '丢失',
  VOLUME_STATUS_PENDING: '等待中',
  VOLUME_STATUS_TERMINATING: '删除中',
  VOLUME_STATUS_UPDATING: '更新中',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: '硬盘扩容中(FilesystemSizePending)',
  VOLUME_EMPTY_DESC: '请创建一个存储卷。',
  MOUNT_STATUS: '挂载',
  MOUNTED: '已挂载',
  NOT_MOUNTED: '未挂载',
  ACCESS_MODE_TCAP: '访问模式',
  // List > Create > Basic Information
  CREATE: '创建',
  // List > Create > Volume Settings
  CREATE_VOLUME_BY_STORAGE_CLASS: '通过存储类型创建',
  CREATE_VOLUME_BY_SNAPSHOT: '通过存储卷快照创建',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: '选择已有的存储卷快照来创建存储卷。',
  SELECT_STORAGE_CLASS_CREATE_VOLUME: '选择已有的存储类型来创建存储卷。',
  VOLUME_CAPACITY: '存储卷容量',
  PARAM_REQUIRED: '此参数不能为空。',
  VOLUME_SIZE_TIP: '存储卷容量必须大于 0。',
  VOLUME_STORAGE_CLASS_DESC: '选择一个存储类型来创建特定种类的存储卷。',
  // List > Advanced Settings
  // List > Edit
  EDIT_TCAP: '编辑',
  // List > Edit YAML
  // List > Delete
  VOLUME_LOW: '存储卷'
};