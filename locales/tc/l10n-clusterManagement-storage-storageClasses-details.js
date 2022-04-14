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
  // Details
  TRUE: '是',
  FALSE: '否',
  // More > Set as Default Storage Class
  SET_DEFAULT_STORAGE_CLASS_TITLE: '設為預設儲存類型',
  SET_AS_DEFAULT_STORAGE_CLASS: '設為預設儲存類型',
  STORAGE_CLASS_SET_DEFAULT_DESC: '設置為預設儲存類型後，如果沒有特殊指定，系統將預設創建該類型的儲存卷。一個 KubeSphere 集群中僅允許設置一個預設儲存類型',
  // More > StorageClass Accessor
  STORAGECLASS_ACCESSOR: '儲存類型訪問器',
  STORAGECLASS_ACCESSOR_SETTING: '儲存類型訪問器設置',
  STORAGECLASS_ACCESSOR_DES: 'Users can create accessors to achieve namespace-level management on the storage class which provisions PVC.',
  // More > Volume Management
  VOLUME_MANAGEMENT: '儲存卷管理',
  VOLUME_CLONE: '儲存卷克隆',
  ALLOW_VOLUME_CLONE_DESC: '允許用戶克隆儲存卷。',
  ALLOW_VOLUME_SNAPSHOT_DESC: '允許用戶創建儲存卷快照。',
  'Volume Expansion': '儲存卷擴容',
  ALLOW_VOLUME_EXPANSION_DESC: '允許用戶對儲存卷擴容。儲存卷容量只能增加，不能减少。',
  VOLUME_FUNCTION_MANAGEMENT_TIP: '儲存卷管理只控制是否在 KubeSphere Web 控制台啟用以下功能。開啟前，請聯繫系統管理員確認儲存系統是否支持這些功能。',
  VOLUME_SNAPSHOT: '儲存卷快照',
  // More > PVC Autoresizer
  PVC_AUTORESIZER_PL: 'PVC 自動調整器',
  PVC_AUTORESIZER_DESC: '當可用存儲量低於閾值時，PVC 自動調整器調整 PersistentVolumeClaims (PVCs) 。',
  PVC_AUTORESIZER_SETTINGS: '自動調整器設定',
  MAX_SIZE: '最大尺寸',
  THRESHOLD_DESC: '當儲存卷的可用空間量低於閾值時，存儲會增加。',
  INCREASE: '增加',
  INCREASE_DESC: '增加值計算為當前存儲值乘以百分比值（如果以百分比形式給出）。',
  AUTOMATIC_RESTART_WORKLOAD: 'Automatic restart workload',
  AUTOMATIC_RESTART_WORKLOAD_DESC: 'The restarter judges the workload that needs to be restarted automatically by checking the status of pvc.',
  AUTOMATIC_RESTART_WORKLOAD_TIP: 'If the automatic restart time of the PVC exceeds the maximum time, the corresponding workload will be annotated with "restart.kubesphere.io/skip". To enable the automatic restart function for the PVC again, delete the above annotation.',
  MAX_TIME: 'Max Time',
  STORAGE_LIMIT: 'Storage Limit',
  // More > Delete
  // Volumes
  VOLUME_COUNT: '儲存卷數量'
};