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
  STORAGE: '儲存管理',
  // Banner
  VOLUME_DESC: '儲存卷供用戶創建的工作負載使用，是將工作負載數據持久化的一種資源對象。',
  // List
  VOLUME_SNAPSHOT_EMPTY_DESC: '儲存卷快照表示儲存卷的時間點副本。快照可用於配置新卷（預先填充快照數據）或將現有儲存卷還原到先前狀態（由快照表示）',
  VOLUME_STATUS_BOUND: '準備就緒',
  VOLUME_STATUS_LOST: '丢失',
  VOLUME_STATUS_PENDING: '等待中',
  VOLUME_STATUS_TERMINATING: '刪除中',
  VOLUME_STATUS_UPDATING: '更新中',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: '硬碟擴容中(FilesystemSizePending)',
  VOLUME_EMPTY_DESC: '儲存卷供用戶創建的工作負載使用，是將工作負載數據持久化的一種資源對象。',
  MOUNT_STATUS: '掛載',
  MOUNTED: '已掛載',
  NOT_MOUNTED: '未掛載',
  ACCESS_MODE_TCAP: '訪問模式',
  // List > Create > Basic Information
  CREATE: '創建',
  // List > Create > Volume Settings
  CREATE_VOLUME_BY_STORAGE_CLASS: '通過儲存類型',
  CREATE_VOLUME_BY_SNAPSHOT: '通過儲存卷快照創建',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: '選擇已有的儲存卷快照來創建存儲卷。',
  SELECT_STORAGE_CLASS_CREATE_VOLUME: '選擇已有的存儲類型來創建存儲卷。',
  VOLUME_CAPACITY: '儲存卷容量',
  PARAM_REQUIRED: '此參數不能為空。',
  VOLUME_SIZE_TIP: '儲存卷容量必須大於 0。',
  VOLUME_STORAGE_CLASS_DESC: '選擇一個存儲類型來創建具體種類的存儲卷。',
  // List > Advanced Settings
  // List > Edit
  EDIT_TCAP: 'Edit',
  // List > Edit YAML
  // List > Delete
  VOLUME_LOW: 'volumes'
};