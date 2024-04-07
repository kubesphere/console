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
  STORAGE_CLASS_PL: '存储类',
  STORAGE_CLASS_DESC: '存储类（StorageClass）支持动态卷供应，使管理员能够按需创建新的卷。',
  // List
  STORAGE_CLASS_EMPTY_DESC: '请创建一个存储类。',
  DEFAULT_STORAGE_CLASS: '默认存储类',
  ALLOW_VOLUME_SNAPSHOT: '允许卷快照',
  ALLOW_VOLUME_CLONE: '允许卷克隆',
  ALLOW_VOLUME_EXPANSION: '允许卷扩展',
  // List > Create
  // List > Create > Basic Information
  // List > Create > Storage System
  CHOOSE_STORAGE_SYSTEM_TIP: '选择存储系统',
  PROVISIONER_DEPENDENCE_DESC: '您需要先在存储系统中部署相关插件才能提供服务。',
  QINGCLOUD_CSI_DESC: '使用 QingCloud CSI 作为底层存储插件。<a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md">了解更多</a>',
  CUSTOM: '自定义',
  // List > Create > > QingCloud CSI > Storage Class Settings
  VOLUME_EXPANSION: '卷扩展',
  RECLAIM_POLICY: '回收机制',
  ACCESS_MODE: '访问模式',
  ACCESS_MODES_DESC: '选择存储类支持的一种或多种访问模式。',
  STORAGE_SYSTEM: '存储系统',
  VOLUME_BINDING_MODE: '卷绑定模式',
  IMMEDIATE_BINDING: '立即绑定',
  BINDING_WAIT: '延迟绑定',
  MAXSIZE: '容量上限',
  MINSIZE: '容量下限',
  STEPSIZE: '步长',
  FSTYPE: '文件系统类型',
  QINGCLOUD_CSI_TYPE_DESC: '在青云云平台中，0 代表性能型磁盘；2 代表容量型磁盘；3 代表超高性能型磁盘；5 代表企业级分布式 SAN（NeonSAN）型磁盘；100 代表基础型磁盘；200 代表 SSD 企业型磁盘。',
  CREATE_VOLUME_MAX_SIZE: '卷的容量上限。',
  CREATE_VOLUME_STEP_SIZE: '卷的增量值。',
  CREATE_VOLUME_MIN_SIZE: '卷的容量下限。',
  VOLUME_FS_TYPE: '支持 ext3、ext4 和 xfs。默认类型为 ext4。',
  QINGCLOUD_VOLUME_TAGS_DESC: '为卷添加标签。使用半角逗号（,）分隔多个标签。',
  GID_RANGE_TIP: '取值不能小于 2000 或大于 2147483647。',
  // List > Create > > GlusterFS > Storage Class Settings
  GLUSTERFS_RESTURL_DESC: '供应卷的 Heketi REST URL。',
  GLUSTERFS_ID_DESC: 'Gluster 集群 ID。',
  GLUSTERFS_RESTAUTHENABLED_DESC: 'Gluster 启用对 REST 服务器的认证。',
  GLUSTERFS_RESTUSER_DESC: 'Gluster REST 服务或 Heketi 服务的用户名。',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Heketi 用户密钥的所属项目。',
  GLUSTERFS_SECRET_NAME_DESC: 'Heketi 用户密钥的名称。',
  GLUSTERFS_GID_MIN_DESC: '卷的 GID 最小值。',
  GLUSTERFS_GID_MAX_DESC: '卷的 GID 最大值。',
  GLUSTERFS_VOLUME_TYPE_DESC: '卷的类型。该值可为 none，replicate:<副本数>，或 disperse:<数据>:<冗余数>。如果未设置该值，则默认卷类型为 replicate:3。',
  RESTURL: 'REST URL',
  CLUSTER_ID: '集群 ID',
  REST_AUTH_ENABLED: '启用 REST 认证',
  REST_USER: 'REST 用户',
  VOLUME_TYPE: '卷类型',
  SECRET_NAME: '密钥名称',
  REST_AUTH_TRUE: '是',
  SECRET_NAMESPACE: '密钥所属项目',
  GID_MIN: 'GID 最小值',
  GID_MAX: 'GID 最大值',
  // List > Create > > Ceph RBD > Storage Class Settings
  CEPHRBD_MONITORS_DESC: 'Ceph 集群 Monitors 的 IP 地址。',
  CEPHRBD_ADMIN_ID_DESC: 'Ceph 集群能够创建卷的用户 ID。',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'adminid 的密钥名称。',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'adminSecrect 所在的项目。',
  CEPHRBD_POOL_DESC: 'Ceph RBD 的 Pool 名称。',
  CEPHRBD_USERID_DESC: 'Ceph 集群能够挂载卷的用户 ID。',
  CEPHRBD_USER_SECRET_NAME_DESC: 'userid 的密钥名称。',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'userSecret 所在的项目。',
  CEPHRBD_FS_TYPE_DESC: '卷的文件系统类型。',
  CEPHRBD_IMAGE_FORMAT_DESC: 'Ceph 卷的选项。该值可为 1 或 2 ，选择 2 后需要填写 imageFeatures。',
  CEPHRBD_IMAGE_FEATURES_DESC: 'Ceph 集群的额外功能。仅当设置 imageFormat 为“2”时，才需要填写该值。',
  CEPH_MONITOR_IP: 'IP 地址:端口号',
  // List > Create > > Custom > Storage Class Settings
  STORAGE_CLASS_SETTINGS: '存储类设置',
  PARAMETERS: '参数',
  // List > Edit Information
  // List > Delete
  STORAGE_CLASS: '存储类',
  STORAGE_CLASS_LOW: '存储类',
  STORAGE_CLASS_DELETE_DESC: 'Are you sure you want to delete the storage class?',
  STORAGE_CLASS_DELETE_DESC_PL: '请输入{type}名称 <strong>{resource}</strong> 以确认您了解此操作的风险。'
};