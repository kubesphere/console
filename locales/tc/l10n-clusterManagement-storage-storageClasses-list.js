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
  VOLUME_BINDING_MODE: 'Volume Binding Mode',
  IMMEDIATE_BINDING: 'Immediate binding',
  BINDING_WAIT: 'Delayed binding',
  MAXSIZE: 'Maximum Size',
  MINSIZE: 'Minimum Size',
  STEPSIZE: 'Step Size',
  FSTYPE: 'File System Type',
  TAGS: 'Tag',
  QINGCLOUD_CSI_TYPE_DESC: '在青雲雲平台中，0 代表性能型硬碟，2 代表容量型硬碟，3 代表超高性能型硬碟，5 代表企業級分布式 SAN（NeonSAN）型硬碟，100 代表基礎型硬碟，200 代表企業型硬碟',
  CREATE_VOLUME_MAX_SIZE: 'Maximum size of the volume.',
  CREATE_VOLUME_STEP_SIZE: 'Step size of the volume.',
  CREATE_VOLUME_MIN_SIZE: 'Minimum size of the volume.',
  VOLUME_FS_TYPE: 'Supports ext3, ext4, and xfs. The default type is ext4.',
  QINGCLOUD_VOLUME_TAGS_DESC: 'Add tags to the storage volume. Use commas to separate multiple tags.',
  // List > Create > > GlusterFS > Storage Class Settings
  GLUSTERFS_RESTURL_DESC: 'Heketi REST URL that provisions volumes.',
  GLUSTERFS_ID_DESC: 'Gluster cluster ID.',
  GLUSTERFS_RESTAUTHENABLED_DESC: ' Gluster 啟用对 REST 伺服器的認證',
  GLUSTERFS_RESTUSER_DESC: 'Username of Gluster REST service or Heketi service.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Namespace of the Heketi user secret.',
  GLUSTERFS_SECRET_NAME_DESC: 'Name of the Heketi user secret.',
  GLUSTERFS_GID_MIN_DESC: 'Minimum GID of the volume.',
  GLUSTERFS_GID_MAX_DESC: 'Maximum GID of the volume.',
  GLUSTERFS_VOLUME_TYPE_DESC: 'Type of volume. The value can be none, replicate:<Replicate count>, or disperse:<Data>:<Redundancy count>. If the volume type is not set, the default volume type is replicate:3.',
  RESTURL: 'REST URL',
  CLUSTER_ID: 'Cluster ID',
  REST_AUTH_ENABLED: 'REST Authentication',
  REST_USER: 'REST User',
  VOLUME_TYPE: 'Volume Type',
  SECRET_NAME: 'Secret Name',
  REST_AUTH_TRUE: 'True',
  SECRET_NAMESPACE: 'Secret Namespace',
  GID_MIN: 'Minimum GID',
  GID_MAX: 'Maximum GID',
  // List > Create > > Ceph RBD > Storage Class Settings
  CEPHRBD_MONITORS_DESC: 'IP address of Ceph monitors.',
  CEPHRBD_ADMIN_ID_DESC: 'ceph 集群能夠創建卷的用戶 ID',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'Secret name of adminid.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'adminSecrect 所在的項目',
  CEPHRBD_POOL_DESC: 'Name of the Ceph RBD pool.',
  CEPHRBD_USERID_DESC: 'ceph 集群能夠掛載卷的用戶 ID',
  CEPHRBD_USER_SECRET_NAME_DESC: 'userid 的密鑰名',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'userSecret 所在的項目',
  CEPHRBD_FS_TYPE_DESC: 'File system type of the storage volume.',
  CEPHRBD_IMAGE_FORMAT_DESC: 'Option of the Ceph volume. The value can be "1" or "2". imageFeatures needs to be filled when you set imageFormat to "2".',
  CEPHRBD_IMAGE_FEATURES_DESC: 'Additional function of the Ceph cluster. The value should only be set when you set imageFormat to "2".',
  CEPH_MONITOR_IP: 'IP address and port number',
  // List > Create > > Custom > Storage Class Settings
  STORAGE_CLASS_SETTINGS: '儲存類型設置',
  PARAMETERS: 'Parameters',
  // List > Edit Information
  // List > Delete
  STORAGE_CLASS: '儲存類型',
  STORAGE_CLASS_LOW: 'storage class'
};