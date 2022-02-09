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
  ACCESS_MODE_RWO: '單個節點讀寫',
  ACCESS_MODE_ROX: '多節點唯讀',
  ACCESS_MODE_RWX: '多節點讀寫',
  'Create Storage Class': '創建儲存類型',
  'Create Volume': '創建儲存卷',
  CREATE_VOLUME_WITH_SNAPSHOT: '基於快照創建儲存卷',
  'Custom Provisioner': '自定義供應者',
  'Default Storage Class': '預設儲存類型',
  'Default Volume': '預設儲存卷',
  'Delete Volume': '刪除儲存卷',
  'Disable Volume Snapshot': 'Disable Volume Snapshot',
  'Apply immediately': '立即生效',
  Expand: '擴容',
  'Mount Options': '掛載選項',
  // Volumes List Page
  Parameters: '參數',
  'Parameters (key-value pairs)': '參數 (鍵值對)',
  PersistentVolumeClaim: '儲存卷',
  PersistentVolumes: '持久化儲存卷',
  Scalable: '可擴容性',
  'Snapshot Message': 'Snapshot Message',
  'Snapshots Message': 'Snapshot Message',
  'Set as default storage class': 'Set as default storage class',
  'Storage Class': '儲存類型',
  'Storage Class Name': '儲存類型名稱',
  'storage classes': '儲存類型',
  STORAGE_CLASS_CREATE_DESC: '儲存類型 (StorageClass) 是由集群管理員配置儲存服務端參數，並按類型提供儲存給集群用戶使用。',
  StorageClasses: '儲存類型',
  storageclasses: '儲存類型',
  PV: '存儲卷後端',
  'Bound Volume': '已綁定存儲卷',
  'Used Capacity': '已分配儲存容量',
  BACKEND_IDENTIFIER: 'Backend Identifier',
  VOLUMES: '儲存卷',
  'The volume name exists': 'The volume name exists',
  'The volume size must be greater than zero': 'The volume size must be greater than zero',
  'Volume Usage': '儲存卷用量',
  volumes: '儲存卷',
  VolumeSnapshots: '儲存卷快照',
  'Storage Classs': 'Storage Classes',
  VOLUMES_BASEINFO_DESC: '儲存卷可將數據持久化，生命週期獨立於應用負載，創建儲存卷前請確保已創建儲存類型。',
  VOLUME_SETTINGS_DESC: '按照需求填寫儲存卷的容量大小，儲存卷大小和訪問模式必須與儲存類型和儲存服務端能力相適應，訪問模式通常選擇為 RWO。',
  PROVISIONER_DESC: '提供後端儲存',
  // Volume Pages
  DELETE_STORAGE_TIP: '如果儲存卷正在被掛載時，等待工作負載被刪除時一同刪除。',
  SRORAGE_SETTING_DESC: 'ReadWriteOnce：單個節點讀寫。<br/>ReadOnlyMany：多節點唯讀。<br/>ReadWriteMany：多節點讀寫。<br/>掛載時只能使用一種模式。',
  'STORAGE-CLASSES_BASEINFO_DESC': '儲存類型記錄管理員所提供的某類儲存的配置資訊，創建特定類型的儲存卷之前必須已配置相應的儲存類型。',
  STORAGE_CLASS_SETTING_DESC: '儲存類型記錄管理員所提供的某類儲存的配置資訊，創建特定類型的儲存卷之前必須已配置相應的儲存類型。',
  STORAGECLASSES_BASEINFO_DESC: '儲存類型記錄管理員所提供的某類儲存的配置資訊，創建特定類型的儲存卷之前必須已配置相應的儲存類型。',
  STORAGECLASS_PARAMETER_TIP: 'Please refer to <a href="{link}" target="_blank">Kubernetes docs</a> for details.',
  VOLUME_BASEINFO_TIP: 'The volume is provisioned through dynamic volume provisioning which allows storage volumes to be created on-demand. The volume is used for persisting data, and has explict lifecycle independent of any individual pod that uses it. At lease one StorageClass must be configured by adminstrators before creating a volume.',
  VOLUME_EXPAND_TIPS: '当前儲存卷已掛載至工作負載，因此擴容會導致工作負載重啟，並產生新的版本。可能業務會短暫的中斷。',
  DEPENDENT_STORAGE_CLASS_DELETE_TIPS: 'Make sure if there are resources dependent on the storage class. If there are, you need to disable the resources before it the resource functions are affected.',
  WHAT_IS_VOLUME_SNAPSHOTS: '什麼是儲存卷快照'
};