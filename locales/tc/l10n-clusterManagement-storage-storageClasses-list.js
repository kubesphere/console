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
  STORAGE_CLASS_PL: '存儲類型',
  STORAGE_CLASS_DESC: '存儲類型（StorageClass）支持動態卷供應，使管理員能夠按需創建新的存儲卷。',
  // List
  STORAGE_CLASS_EMPTY_DESC: '請創建一個存儲類型',
  DEFAULT_STORAGE_CLASS: '預設存儲類型',
  ALLOW_VOLUME_SNAPSHOT: '允許存儲卷快照',
  ALLOW_VOLUME_CLONE: '允許存儲卷克隆',
  ALLOW_VOLUME_EXPANSION: '允許存儲卷擴容',
  // List > Create
  // List > Create > Basic Information
  // List > Create > Storage System
  CHOOSE_STORAGE_SYSTEM_TIP: '選擇您需要儲存系統',
  PROVISIONER_DEPENDENCE_DESC: '您需要先在儲存系統中部署相關插件才能提供服務。',
  QINGCLOUD_CSI_DESC: '使用 QingCloud CSI 作為底層儲存插件。<a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md">了解更多</a>',
  CUSTOM: '自定義',
  // List > Create > > QingCloud CSI > Storage Class Settings
  VOLUME_EXPANSION: '儲存卷擴容',
  RECLAIM_POLICY: '回收機制',
  ACCESS_MODE: '支持的訪問模式',
  ACCESS_MODES_DESC: '選擇儲存類型支持的一種或多種訪問模式。',
  STORAGE_SYSTEM: '儲存系統',
  VOLUME_BINDING_MODE: '儲存卷綁定模式',
  IMMEDIATE_BINDING: '立即綁定',
  BINDING_WAIT: '延遲綁定',
  MAXSIZE: '容量上限',
  MINSIZE: '容量下限',
  STEPSIZE: '步長',
  FSTYPE: '文件系統類型',
  QINGCLOUD_CSI_TYPE_DESC: '在青雲雲平台中，0 代表性能型硬碟，2 代表容量型硬碟，3 代表超高性能型硬碟，5 代表企業級分布式 SAN（NeonSAN）型硬碟，100 代表基礎型硬碟，200 代表企業型硬碟',
  CREATE_VOLUME_MAX_SIZE: '儲存卷的容量上限。',
  CREATE_VOLUME_STEP_SIZE: '儲存卷的增量值。',
  CREATE_VOLUME_MIN_SIZE: '儲存卷的容量下限。',
  VOLUME_FS_TYPE: '支持 ext3、ext4 和 xfs。預設類型為 ext4。',
  QINGCLOUD_VOLUME_TAGS_DESC: '為儲存卷添加標籤。使用半角逗號（,）分隔多個標籤。',
  GID_RANGE_TIP: 'The value cannot be less than 2000 or greater than 2147483647.',
  // List > Create > > GlusterFS > Storage Class Settings
  GLUSTERFS_RESTURL_DESC: '供應儲存卷的 Heketi REST URL。',
  GLUSTERFS_ID_DESC: 'Gluster 集群 ID。',
  GLUSTERFS_RESTAUTHENABLED_DESC: ' Gluster 啟用对 REST 伺服器的認證',
  GLUSTERFS_RESTUSER_DESC: 'Gluster REST 服務或 Heketi 服務的用戶名。',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Heketi 用戶密鑰的所属項目。',
  GLUSTERFS_SECRET_NAME_DESC: 'Heketi 用戶密鑰的名稱。',
  GLUSTERFS_GID_MIN_DESC: '儲存卷的 GID 最小值。',
  GLUSTERFS_GID_MAX_DESC: '儲存卷的 GID 最大值。',
  GLUSTERFS_VOLUME_TYPE_DESC: '儲存卷的類型。該值可為 none，replicate:<副本數>，或 disperse:<數據>:<冗餘數>。如果未設置該值，則預設儲存卷類型為 replicate:3。',
  RESTURL: 'REST URL',
  CLUSTER_ID: '集群 ID',
  REST_AUTH_ENABLED: '開啟 REST 認證',
  REST_USER: 'REST 用戶',
  VOLUME_TYPE: '儲存卷類型',
  SECRET_NAME: '密鑰名稱',
  REST_AUTH_TRUE: '是',
  SECRET_NAMESPACE: '密鑰所屬項目',
  GID_MIN: 'GID 最小值',
  GID_MAX: 'GID 最大值',
  // List > Create > > Ceph RBD > Storage Class Settings
  CEPHRBD_MONITORS_DESC: 'Ceph 集群 Monitors 的 IP 地址。',
  CEPHRBD_ADMIN_ID_DESC: 'ceph 集群能夠創建卷的用戶 ID',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'adminid 的密鑰名稱。',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'adminSecrect 所在的項目',
  CEPHRBD_POOL_DESC: 'Ceph RBD 的 Pool 名稱。',
  CEPHRBD_USERID_DESC: 'Ceph 集群能夠掛載卷的用戶 ID',
  CEPHRBD_USER_SECRET_NAME_DESC: 'userid 的密鑰名稱',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'userSecret 所在的項目',
  CEPHRBD_FS_TYPE_DESC: '儲存卷的文件系統類型。',
  CEPHRBD_IMAGE_FORMAT_DESC: 'Ceph 卷的選項。該值可為“1”或“2”，選擇“2”後需要填寫 imageFeatures。',
  CEPHRBD_IMAGE_FEATURES_DESC: 'Ceph 集群的額外功能。僅目前設置 imageFormat 為“2”時，才需要填謝該值。',
  CEPH_MONITOR_IP: 'IP 位址:連接埠號碼',
  // List > Create > > Custom > Storage Class Settings
  STORAGE_CLASS_SETTINGS: '儲存類型設置',
  PARAMETERS: '參數',
  // List > Edit Information
  // List > Delete
  STORAGE_CLASS: '儲存類型',
  STORAGE_CLASS_LOW: '儲存類型',
  STORAGE_CLASS_DELETE_DESC: 'Are you sure you want to delete the storage class?',
  STORAGE_CLASS_DELETE_DESC_PL: '請輸入 {type} 名稱 <strong>{resource}</strong> 確保您已了解操作所帶來的風險。'
};