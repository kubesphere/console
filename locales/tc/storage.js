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

  VOLUME_STATUS_BOUND: '準備就緒',
  VOLUME_STATUS_LOST: '丢失',
  VOLUME_STATUS_PENDING: '等待中',
  VOLUME_STATUS_TERMINATING: '刪除中',
  VOLUME_STATUS_UPDATING: '更新中',

  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: '硬碟擴容中(FilesystemSizePending)',

  volumes: '儲存卷',
  PersistentVolumeClaim: '儲存卷',
  'Volume Usage': '儲存卷用量',
  'Volume Count': '儲存卷數量',
  'Create Volume': '創建儲存卷',
  'Delete Volume': '刪除儲存卷',
  'storage classes': '儲存類型',
  storageclasses: '儲存類型',
  'Create Storage Class': '創建儲存類型',
  'Storage Class': '儲存類型',
  'Storage Classs': '儲存類型',
  'Storage Class Settings': '儲存類型設置',
  'Mount Info': '掛載資訊',
  Mounted: '已掛載',
  'Not Mounted': '未掛載',
  Scalable: '可擴容性',
  'Reclaim Policy': '回收機制',
  DELETE_STORAGE_TIP: '如果儲存卷正在被掛載時，等待工作負載被刪除時一同刪除。',
  SRORAGE_SETTING_DESC:
    'ReadWriteOnce：單個節點讀寫。<br/>ReadOnlyMany：多節點唯讀。<br/>ReadWriteMany：多節點讀寫。<br/>掛載時只能使用一種模式。',
  'Default Storage Class': '預設儲存類型',
  'Default Volume': '預設儲存卷',
  'Parameters (key-value pairs)': '參數 (鍵值對)',
  'Mount Options': '掛載選項',
  'Allow Volume Expansion': '允許儲存卷擴容',
  'Mount Status': '掛載狀態',
  'Mounted Pods': '已掛載容器組',
  Idle: '閒置',
  'In Use': '已使用',

  'The volume name exists': '儲存卷名稱已使用',

  'Used Capacity': '已分配儲存容量',
  'Available Capacity': '剩餘儲存容量',

  PersistentVolumes: '持久化儲存卷',

  'Set as default storage class': '設為預設儲存類型',
  'Storage Class Name': '儲存類型名稱',
  Default: '預設',
  StorageClasses: '儲存類型',
  'Storage System': '儲存系統',

  'Supported Access Mode': '支持的訪問模式',

  'Custom Provisioner': '自定義供應者',
  Parameters: '參數',
  'Apply immediately': '立即生效',

  'The volume size must be greater than zero': '儲存卷容量必須大於 0',

  STORAGECLASSES_BASEINFO_DESC:
    '儲存類型記錄管理員所提供的某類儲存的配置資訊，創建特定類型的儲存卷之前必須已配置相應的儲存類型。',
  VOLUMES_BASEINFO_DESC:
    '儲存卷可將數據持久化，生命週期獨立於應用負載，創建儲存卷前請確保已創建儲存類型。',
  VOLUME_SETTINGS_DESC:
    '按照需求填寫儲存卷的容量大小，儲存卷大小和訪問模式必須與儲存類型和儲存服務端能力相適應，訪問模式通常選擇為 RWO。',

  VOLUME_DESC:
    '儲存卷供用戶創建的工作負載使用，是將工作負載數據持久化的一種資源對象。',
  VOLUME_CREATE_DESC:
    '儲存卷供用戶創建的工作負載使用，是將工作負載數據持久化的一種資源對象。',
  STORAGE_CLASS_DESC:
    '儲存類型 (StorageClass) 是由集群管理員配置儲存服務端參數，並按類型提供儲存給集群用戶使用。',
  STORAGE_CLASS_CREATE_DESC:
    '儲存類型 (StorageClass) 是由集群管理員配置儲存服務端參數，並按類型提供儲存給集群用戶使用。',
  'STORAGE-CLASSES_BASEINFO_DESC':
    '儲存類型記錄管理員所提供的某類儲存的配置資訊，創建特定類型的儲存卷之前必須已配置相應的儲存類型。',
  STORAGE_CLASS_SETTING_DESC:
    '儲存類型記錄管理員所提供的某類儲存的配置資訊，創建特定類型的儲存卷之前必須已配置相應的儲存類型。',

  STORAGE_CLASS_SET_DEFAULT_DESC:
    '設置為預設儲存類型後，如果沒有特殊指定，系統將預設創建該類型的儲存卷。一個 Kubernetes 集群中僅允許設置一個預設儲存類型',

  PROVISIONER_DESC: '提供後端儲存',

  VOLUME_STORAGE_CLASS_DESC:
    '由集群管理員配置儲存服務端參數，並按類型提供儲存給用戶使用。',

  ACCESS_MODES_DESC: '選擇儲存類型支持的訪問模式',

  WHAT_IS_STORAGE_CLASS_Q: '什麼是儲存卷類型?',
  WHAT_IS_STORAGE_CLASS_A:
    '儲存卷類型 (StorageClass) 是由集群管理員配置儲存服務端的參數，並按類型提供儲存給集群用戶使用。',

  WHAT_IS_LOCAL_VOLUME_Q: '什麼是本地儲存卷 (Local Volume) ?',
  WHAT_IS_LOCAL_VOLUME_A:
    '本地儲存卷表示掛載的本地儲存設備，如硬碟、分割區或目錄。',
  CHOOSE_STORAGE_SYSTEM_TIP: '選擇您需要儲存系統',
  PROVISIONER_DEPENDENCE_DESC: '儲存系統需要部署相關的儲存插件来提供服務',

  'Expand Volume': '儲存卷擴容',
  VOLUME_EXPAND_TIPS:
    '当前儲存卷已掛載至工作負載，因此擴容會導致工作負載重啟，並產生新的版本。可能業務會短暫的中斷。',
  Expand: '擴容',

  QINGCLOUD_CSI_DESC:
    'QingCloud CSI 插件實現了 CSI 介面，並使容器編排平台能構使用 QingCloud 雲平台的儲存資源。實現了塊儲存插件，可以對接雲平台塊儲存資源。<a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md">詳细資訊</a>',

  QINGCLOUD_CSI_TYPE_DESC:
    '在青雲雲平台中，0 代表性能型硬碟，2 代表容量型硬碟，3 代表超高性能型硬碟，5 代表企業級分布式 SAN（NeonSAN）型硬碟，100 代表基礎型硬碟，200 代表企業型硬碟',
  CREATE_VOLUME_MAX_SIZE: '創建儲存卷容量上限',
  CREATE_VOLUME_STEP_SIZE: '創建儲存卷增量值',
  CREATE_VOLUME_MIN_SIZE: '創建儲存卷容量下限',
  VOLUME_FS_TYPE: '儲存卷文件系統類型，可填寫 ext3, ext4, xfs',
  QINGCLOUD_VOLUME_TAGS_DESC: '創建硬碟時自動關聯 tag，多個tag用逗號分割',

  GLUSTERFS_RESTURL_DESC: 'Heketi 服務端 URL',
  GLUSTERFS_ID_DESC: 'Gluster 集群 ID',
  GLUSTERFS_RESTAUTHENABLED_DESC: ' Gluster 啟用对 REST 伺服器的認證',
  GLUSTERFS_RESTUSER_DESC: '能夠在 Gluster pool 中創建 volume 的 Heketi 用戶',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Heketi 用戶密鑰的 namespace',
  GLUSTERFS_SECRET_NAME_DESC: 'Heketi 用戶的密鑰',
  GLUSTERFS_GID_MIN_DESC: 'Gid 最小值',
  GLUSTERFS_GID_MAX_DESC: 'Gid 最大值',
  GLUSTERFS_VOLUME_TYPE_DESC: '創建卷額外參數',

  CEPHRBD_MONITORS_DESC: 'ceph 集群 MON 的 IP:端口',
  CEPHRBD_ADMIN_ID_DESC: 'ceph 集群能夠創建卷的用戶 ID',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'adminid 的密鑰名',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'adminSecrect 所在的項目',
  CEPHRBD_POOL_DESC: 'ceph rbd pool 名',
  CEPHRBD_USERID_DESC: 'ceph 集群能夠掛載卷的用戶 ID',
  CEPHRBD_USER_SECRET_NAME_DESC: 'userid 的密鑰名',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'userSecret 所在的項目',
  CEPHRBD_FS_TYPE_DESC: '儲存卷的檔案系統',
  CEPHRBD_IMAGE_FORMAT_DESC: 'ceph 卷的選項，1 或 2，2需要填寫 imageFeatures',
  CEPHRBD_IMAGE_FEATURES_DESC: 'ceph 集群的額外功能',

  DEPENDENT_STORAGE_CLASS_DELETE_TIPS:
    '請確認是否有資源依賴該儲存類型。若存在依賴，請先將依賴的資源關閉，以免影響資源功能',

  CREATE_VOLUME_WITH_SNAPSHOT: '基於快照創建儲存卷',

  'Create Snapshot': '創建快照',
  'Clone Volume': '儲存卷克隆',
  'Support Volume Snapshot': '支持儲存卷快照',

  VOLUME_SNAPSHOT_STATUS_CREATING: '創建中',
  VOLUME_SNAPSHOT_STATUS_READY: '創建成功',
  VOLUME_SNAPSHOT_STATUS_FAILED: '創建失敗',
  VOLUME_SNAPSHOT_STATUS_DELETING: '刪除中',

  'Snapshot Message': '快照資訊',
  'Snapshots Message': '快照資訊',

  VolumeSnapshots: '儲存卷快照',
  VOLUMESNAPSHOT_DESC:
    '儲存卷快照表示儲存卷的時間點副本。快照可用於配置新卷（預先填充快照數據）或將現有儲存卷還原到先前狀態（由快照表示）',
  VOLUMESNAPSHOT_CREATE_DESC:
    '儲存卷快照表示儲存卷的時間點副本。快照可用於配置新卷（預先填充快照數據）或將現有儲存卷還原到先前狀態（由快照表示）',
  WHAT_IS_VOLUME_SNAPSHOTS: '什麼是儲存卷快照',

  CREATE_VOLUME_BY_STORAGECLASS: '通過儲存類型',
  CREATE_VOLUME_BY_SNAPSHOT: '通過儲存卷快照創建',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: '選擇已有的儲存卷快照並行創建',

  CLUSTER_VOLUME_DIFF_DESC: '可針對不同集群，選擇不同的儲存類型',

  VOLUME_MONITORING_TIP:
    'Kubernetes 採集的是儲存卷的設備用量數據，未掛載的儲存卷暫時採集不到，並且對於如 OpenEBS/Local PV、NFS 等路徑型儲存卷通常與實際用量有一定出入。詳見<a href="https://github.com/kubesphere/kubesphere/issues/2921" target="_blank">儲存卷監控數據分析</a>。',
}
