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
  // Volume Pages
  ACCESS_MODE_TCAP: '訪問模式',

  VOLUME_STATUS_BOUND: '準備就緒',
  VOLUME_STATUS_LOST: '丢失',
  VOLUME_STATUS_PENDING: '等待中',
  VOLUME_STATUS_TERMINATING: '刪除中',
  VOLUME_STATUS_UPDATING: '更新中',

  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: '硬碟擴容中(FilesystemSizePending)',

  volumes: '儲存卷',
  VOLUMES: '儲存卷',
  PersistentVolumeClaim: '儲存卷',
  'Volume Usage': '儲存卷用量',
  VOLUME: '儲存卷',
  BACKEND_IDENTIFIER: 'Backend Identifier',
  VOLUME_PL: '儲存卷數量',
  NUMBER_OF_VOLUMES: 'Number of volumes',
  VOLUME_LOW: 'volumes',
  VOLUME_INSTANCE: 'Volume Instance',
  VOLUME_INSTANCE_PL: 'Volume Instances',
  VOLUME_INSTANCE_LOW: 'volume instance',
  VOLUME_INSTANCE_EMPTY_DESC: 'Please bind a volume to a workload.',
  'Create Volume': '創建儲存卷',
  'Delete Volume': '刪除儲存卷',
  'storage classes': '儲存類型',
  storageclasses: '儲存類型',
  'Create Storage Class': '創建儲存類型',
  'Storage Class': '儲存類型',
  STORAGE_CLASS: '儲存類型',
  STORAGE_CLASS_PL: 'Storage Classes',
  STORAGE_CLASS_LOW: 'storage class',
  STORAGE_CLASS_EMPTY_DESC: 'Please create a storage class.',
  STORAGE_CLASS_VALUE: 'Storage class: {value}',
  STORAGE_CLASS_SETTINGS: '儲存類型設置',
  MOUNT_INFORMATION: '掛載資訊',
  // Volumes List Page
  MOUNT_STATUS: '掛載',
  MOUNTED: '已掛載',
  NOT_MOUNTED: '未掛載',
  Scalable: '可擴容性',
  CREATE: '創建',
  UPDATE: 'Update',
  RECLAIM_POLICY: '回收機制',
  DELETE_STORAGE_TIP: '如果儲存卷正在被掛載時，等待工作負載被刪除時一同刪除。',
  SRORAGE_SETTING_DESC:
    'ReadWriteOnce：單個節點讀寫。<br/>ReadOnlyMany：多節點唯讀。<br/>ReadWriteMany：多節點讀寫。<br/>掛載時只能使用一種模式。',
  'Default Storage Class': '預設儲存類型',
  'Default Volume': '預設儲存卷',
  'Parameters (key-value pairs)': '參數 (鍵值對)',
  'Mount Options': '掛載選項',
  VOLUME_EXPANSION: '儲存卷擴容',
  'Mount Status': '掛載狀態',
  MOUNTED_PODS: '已掛載容器組',
  AVAILABLE: '閒置',
  IN_USER: '使用中',

  VOLUME_NAME_EXIST: '儲存卷名稱已使用',

  'Used Capacity': '已分配儲存容量',
  AVAILABLE_CAPACITY: '剩餘儲存容量',

  PersistentVolumes: '持久化儲存卷',

  SET_AS_DEFAULT_STORAGE_CLASS: '設為預設儲存類型',
  'Storage Class Name': '儲存類型名稱',
  DEFAULT: '預設',
  StorageClasses: '儲存類型',
  STORAGE_SYSTEM: '儲存系統',

  ACCESS_MODE: '支持的訪問模式',
  ACCESS_MODE_SCAP: '訪問模式',

  'Custom Provisioner': '自定義供應者',
  Parameters: '參數',
  'Apply immediately': '立即生效',

  VOLUME_SIZE_TIP: '儲存卷容量必須大於 0。',

  STORAGECLASSES_BASEINFO_DESC:
    '儲存類型記錄管理員所提供的某類儲存的配置資訊，創建特定類型的儲存卷之前必須已配置相應的儲存類型。',
  VOLUMES_BASEINFO_DESC:
    '儲存卷可將數據持久化，生命週期獨立於應用負載，創建儲存卷前請確保已創建儲存類型。',
  VOLUME_SETTINGS_DESC:
    '按照需求填寫儲存卷的容量大小，儲存卷大小和訪問模式必須與儲存類型和儲存服務端能力相適應，訪問模式通常選擇為 RWO。',

  VOLUME_DESC:
    '儲存卷供用戶創建的工作負載使用，是將工作負載數據持久化的一種資源對象。',
  VOLUME_EMPTY_DESC:
    '儲存卷供用戶創建的工作負載使用，是將工作負載數據持久化的一種資源對象。',
  STORAGE_CLASS_DESC:
    '存儲類型（StorageClass）支持動態卷供應，使管理員能夠按需創建新的存儲卷。',
  STORAGE_CLASS_CREATE_DESC:
    '儲存類型 (StorageClass) 是由集群管理員配置儲存服務端參數，並按類型提供儲存給集群用戶使用。',
  'STORAGE-CLASSES_BASEINFO_DESC':
    '儲存類型記錄管理員所提供的某類儲存的配置資訊，創建特定類型的儲存卷之前必須已配置相應的儲存類型。',
  STORAGE_CLASS_SETTING_DESC:
    '儲存類型記錄管理員所提供的某類儲存的配置資訊，創建特定類型的儲存卷之前必須已配置相應的儲存類型。',

  STORAGE_CLASS_SET_DEFAULT_DESC:
    '設置為預設儲存類型後，如果沒有特殊指定，系統將預設創建該類型的儲存卷。一個 KubeSphere 集群中僅允許設置一個預設儲存類型',

  PROVISIONER_DESC: '提供後端儲存',
  VOLUME_STORAGE_CLASS_DESC: '選擇一個存儲類型來創建具體種類的存儲卷。',

  ACCESS_MODES_DESC: '選擇儲存類型支持的訪問模式',

  WHAT_IS_STORAGE_CLASS_Q: '什麼是存儲類型?',
  WHAT_IS_STORAGE_CLASS_A:
    '存儲類型（Storage Class）是由集群管理員配置的多種存儲類型，不同的存儲類型為集群用戶提供不同類型的存儲卷。',

  WHAT_IS_LOCAL_VOLUME_Q: '什麼是本地儲存卷（Local Volume）?',
  WHAT_IS_LOCAL_VOLUME_A:
    '本地儲存卷表示掛載的本地儲存設備，如硬碟、分割區或目錄。',
  CHOOSE_STORAGE_SYSTEM_TIP: '選擇您需要儲存系統',
  PROVISIONER_DEPENDENCE_DESC:
    'You need to deploy a plugin in your storage system before it provides services.',

  EXPAND_VOLUME: '儲存卷擴容',
  EXPAND: 'Expand',
  VOLUME_EXPAND_TIPS:
    '当前儲存卷已掛載至工作負載，因此擴容會導致工作負載重啟，並產生新的版本。可能業務會短暫的中斷。',
  Expand: '擴容',

  QINGCLOUD_CSI_DESC:
    'Use QingCloud CSI as the underlying storage plugin. <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">Learn More</a>',

  MAXSIZE: 'Maximum Size',
  MINSIZE: 'Minimum Size',
  STEPSIZE: 'Step Size',
  FSTYPE: 'File System Type',
  TAGS: 'Tag',

  QINGCLOUD_CSI_TYPE_DESC:
    '在青雲雲平台中，0 代表性能型硬碟，2 代表容量型硬碟，3 代表超高性能型硬碟，5 代表企業級分布式 SAN（NeonSAN）型硬碟，100 代表基礎型硬碟，200 代表企業型硬碟',
  CREATE_VOLUME_MAX_SIZE: 'Maximum size of the volume.',
  CREATE_VOLUME_STEP_SIZE: 'Step size of the volume.',
  CREATE_VOLUME_MIN_SIZE: 'Minimum size of the volume.',
  VOLUME_FS_TYPE: 'Supports ext3, ext4, and XFS. The default type is ext4.',
  QINGCLOUD_VOLUME_TAGS_DESC:
    'Add tags to the storage volume. Use commas to separate multiple tags.',

  GLUSTERFS_RESTURL_DESC:
    'Heketi REST URL that provisions volumes, for example, <Heketi Service cluster IP Address>:<Heketi Service port number>.',
  GLUSTERFS_ID_DESC: 'Gluster cluster ID.',
  GLUSTERFS_RESTAUTHENABLED_DESC: ' Gluster 啟用对 REST 伺服器的認證',
  GLUSTERFS_RESTUSER_DESC:
    'Username of Gluster REST service or Heketi service.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Namespace of the Heketi user secret.',
  GLUSTERFS_SECRET_NAME_DESC: 'Name of the Heketi user secret.',
  GLUSTERFS_GID_MIN_DESC: 'Minimum GID of the volume.',
  GLUSTERFS_GID_MAX_DESC: 'Maximum GID of the volume.',
  GLUSTERFS_VOLUME_TYPE_DESC:
    'Type of volume. The value can be none, replicate:<Replicate count>, or disperse:<Data>:<Redundancy count>. If the volume type is not set, the default volume type is replicate:3.',

  CEPHRBD_MONITORS_DESC: 'IP address of Ceph monitors.',
  CEPHRBD_ADMIN_ID_DESC: 'ceph 集群能夠創建卷的用戶 ID',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'Secret name of adminid.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'adminSecrect 所在的項目',
  CEPHRBD_POOL_DESC: 'Name of the Ceph RBD pool.',
  CEPHRBD_USERID_DESC: 'ceph 集群能夠掛載卷的用戶 ID',
  CEPHRBD_USER_SECRET_NAME_DESC: 'userid 的密鑰名',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'userSecret 所在的項目',
  CEPHRBD_FS_TYPE_DESC: 'File system type of the storage volume.',
  CEPHRBD_IMAGE_FORMAT_DESC:
    'Option of the Ceph volume. The value can be "1" or "2". imageFeatures needs to be filled when you set imageFormat to "2".',
  CEPHRBD_IMAGE_FEATURES_DESC:
    'Additional function of the Ceph cluster. The value should only be set when you set imageFormat to "2".',

  DEPENDENT_STORAGE_CLASS_DELETE_TIPS:
    'Make sure if there are resources dependent on the storage class. If there are, you need to disable the resources before it the resource functions are affected.',

  CREATE_VOLUME_WITH_SNAPSHOT: '基於快照創建儲存卷',

  CREATE_SNAPSHOT: '創建快照',
  CLONE_VOLUME: '儲存卷克隆',
  CLONE: 'Clone',
  ALLOW_VOLUME_SNAPSHOT: '允許存儲卷快照',
  ALLOW_VOLUME_CLONE: '允許存儲卷克隆',
  ALLOW_VOLUME_EXPANSION: '允許存儲卷擴容',
  PV: '存儲卷後端',
  VOLUME_BACKEND_TCAP: '存儲卷後端',
  PV_STATUS_AVAILABLE: '可用',
  PV_STATUS_BOUND: '已綁定',
  PV_STATUS_RELEASED: '删除中',
  PV_STATUS_FAILED: '失败',
  'Bound Volume': '已綁定存儲卷',
  RECYCLING_STRATEGY: '回收機制',
  VOLUME_SNAPSHOT_STATUS_CREATING: '創建中',
  VOLUME_SNAPSHOT_STATUS_READY: '創建成功',
  VOLUME_SNAPSHOT_STATUS_FAILED: '創建失敗',
  VOLUME_SNAPSHOT_STATUS_DELETING: '刪除中',

  SNAPSHOT_PL: '快照資訊',

  VolumeSnapshots: '儲存卷快照',
  VOLUME_SNAPSHOT_DESC:
    '儲存卷快照表示儲存卷的時間點副本。快照可用於配置新卷（預先填充快照數據）或將現有儲存卷還原到先前狀態（由快照表示）',
  VOLUME_SNAPSHOT_EMPTY_DESC:
    '儲存卷快照表示儲存卷的時間點副本。快照可用於配置新卷（預先填充快照數據）或將現有儲存卷還原到先前狀態（由快照表示）',
  WHAT_IS_VOLUME_SNAPSHOTS: '什麼是儲存卷快照',

  CREATE_VOLUME_BY_STORAGE_CLASS: '通過儲存類型',
  CREATE_VOLUME_BY_SNAPSHOT: '通過儲存卷快照創建',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: '選擇已有的儲存卷快照來創建存儲卷。',
  SELECT_STORAGE_CLASS_CREATE_VOLUME: '選擇已有的存儲類型來創建存儲卷。',

  CLUSTER_VOLUME_DIFF_DESC: '可針對不同集群，選擇不同的儲存類型',

  VOLUME_MONITORING_TIP:
    'KubeSphere 採集的是儲存卷的設備用量數據，未掛載的儲存卷暫時採集不到，並且對於如 OpenEBS/Local PV、NFS 等路徑型儲存卷通常與實際用量有一定出入。詳見<a href="https://github.com/kubesphere/kubesphere/issues/2921" target="_blank">儲存卷監控數據分析</a>。',

  // Storage Class > GlusterFS
  RESTURL: 'REST URL',
  CLUSTER_ID: 'Cluster ID',
  REST_AUTH_ENABLED: 'REST Authentication',
  REST_USER: 'REST User',
  VOLUME_TYPE: 'Volume Type',
  SECRET_NAME: 'Secret Name',
  REST_AUTH_TRUE: 'True',
  CEPH_MONITOR_IP: 'IP address and port number',
  SECRET_NAMESPACE: 'Secret Namespace',
  GID_MIN: 'Minimum GID',
  GID_MAX: 'Maximum GID',
  CUSTOM: 'Custom',
  PARAMETERS: 'Parameters',
  VOLUME_SNAPSHOT_CLASS: '快照類型',
  SNAPSHOT_EMPTY_TIP: '請選擇一個快照類型。',
  VOLUME_BINDING_MODE: 'Volume Binding Mode',
  IMMEDIATE_BINDING: 'Immediate binding',
  BINDING_WAIT: 'Delayed binding',
  DEFAULT_STORAGE_CLASS: 'Default Storage Class',

  // Storage Class > Detail
  STORAGE_CLASS_SCAP: 'Storage class',
  CREATE_VOLUME: 'Create Volume',
  VOLUME_MANAGEMENT: 'Volume Management',
  SET_DEFAULT_STORAGE_CLASS_TITLE: 'Set as Default Storage Class',
  VOLUME_COUNT: 'Volumes',
}
