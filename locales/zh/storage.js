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
  ACCESS_MODE_RWO: '单个节点读写',
  ACCESS_MODE_ROX: '多节点只读',
  ACCESS_MODE_RWX: '多节点读写',

  VOLUME_STATUS_BOUND: '准备就绪',
  VOLUME_STATUS_LOST: '丢失',
  VOLUME_STATUS_PENDING: '等待中',
  VOLUME_STATUS_TERMINATING: '删除中',
  VOLUME_STATUS_UPDATING: '更新中',

  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: '硬盘扩容中(FilesystemSizePending)',

  volumes: '存储卷',
  PersistentVolumeClaim: '存储卷',
  'Volume Usage': '存储卷用量',
  'Volume Count': '存储卷数量',
  'Create Volume': '创建存储卷',
  'Delete Volume': '删除存储卷',
  'storage classes': '存储类型',
  storageclasses: '存储类型',
  'Create Storage Class': '创建存储类型',
  'Storage Class': '存储类型',
  'Storage Classs': '存储类型',
  'Storage Class Settings': '存储类型设置',
  'Mount Info': '挂载信息',
  Mounted: '已挂载',
  'Not Mounted': '未挂载',
  Scalable: '可扩容性',
  'Reclaim Policy': '回收机制',
  DELETE_STORAGE_TIP: '如果存储卷正在被挂载时，待工作负载被删除时一同删除。',
  SRORAGE_SETTING_DESC:
    'ReadWriteOnce：单个节点读写。<br/>ReadOnlyMany：多节点只读。<br/>ReadWriteMany：多节点读写。<br/>挂载时只能使用一种模式。',
  'Default Storage Class': '默认存储类型',
  'Default Volume': '默认存储卷',
  'Parameters (key-value pairs)': '参数 (键值对)',
  'Mount Options': '挂载选项',
  'Allow Volume Expansion': '允许存储卷扩容',
  'Mount Status': '挂载状态',
  'Mounted Pods': '已挂载容器组',
  Idle: '闲置',
  'In Use': '已使用',

  'The volume name exists': '存储卷名称已使用',

  'Used Capacity': '已分配存储',
  'Available Capacity': '剩余存储',

  PersistentVolumes: '持久化存储卷',

  'Set as default storage class': '设为默认存储类型',
  'Storage Class Name': '存储类型名称',
  Default: '默认',
  StorageClasses: '存储类型',
  'Storage System': '存储系统',

  'Supported Access Mode': '支持的访问模式',

  'Custom Provisioner': '自定义供应者',
  Parameters: '参数',
  'Apply immediately': '立即生效',

  'The volume size must be greater than zero': '存储卷容量必须大于 0',

  STORAGECLASSES_BASEINFO_DESC:
    '存储类型记录管理员所提供的某类存储的配置信息，创建特定类型的存储卷之前必须已配置相应的存储类型。',
  VOLUMES_BASEINFO_DESC:
    '存储卷可将数据持久化，生命周期独立于应用负载，创建存储卷前请确保已创建存储类型。',
  VOLUME_SETTINGS_DESC:
    '按需填写存储卷的容量大小，存储卷大小和访问模式必须与存储类型和存储服务端能力相适应，访问模式通常选择为 RWO。',

  VOLUME_DESC:
    '存储卷供用户创建的工作负载使用，是将工作负载数据持久化的一种资源对象。',
  VOLUME_CREATE_DESC:
    '存储卷供用户创建的工作负载使用，是将工作负载数据持久化的一种资源对象。',
  STORAGE_CLASS_DESC:
    '存储类型 (StorageClass) 是由集群管理员配置存储服务端参数，并按类型提供存储给集群用户使用。',
  STORAGE_CLASS_CREATE_DESC:
    '存储类型 (StorageClass) 是由集群管理员配置存储服务端参数，并按类型提供存储给集群用户使用。',
  'STORAGE-CLASSES_BASEINFO_DESC':
    '存储类型记录管理员所提供的某类存储的配置信息，创建特定类型的存储卷之前必须已配置相应的存储类型。',
  STORAGE_CLASS_SETTING_DESC:
    '存储类型记录管理员所提供的某类存储的配置信息，创建特定类型的存储卷之前必须已配置相应的存储类型。',

  STORAGE_CLASS_SET_DEFAULT_DESC:
    '设置为默认存储类型后，如果没有特殊指定，系统将默认创建该类型的存储卷。一个 Kubernetes 集群中仅允许设置一个默认存储类型',

  PROVISIONER_DESC: '提供后端存储',

  VOLUME_STORAGE_CLASS_DESC:
    '由集群管理员配置存储服务端参数，并按类型提供存储给用户使用。',

  ACCESS_MODES_DESC: '选择存储类型支持的访问模式',

  WHAT_IS_STORAGE_CLASS_Q: '什么是存储卷类型?',
  WHAT_IS_STORAGE_CLASS_A:
    '存储卷类型 (StorageClass) 是由集群管理员配置存储服务端的参数，并按类型提供存储给集群用户使用。',

  WHAT_IS_LOCAL_VOLUME_Q: '什么是本地存储卷 (Local Volume) ?',
  WHAT_IS_LOCAL_VOLUME_A:
    '本地存储卷表示挂载的本地存储设备，如磁盘、分区或目录。',
  CHOOSE_STORAGE_SYSTEM_TIP: '选择您需要存储系统',
  PROVISIONER_DEPENDENCE_DESC: '存储系统需要部署相关的存储插件来提供服务',

  'Expand Volume': '存储卷扩容',
  VOLUME_EXPAND_TIPS:
    '当前存储卷已挂载至工作负载，因此扩容会导致工作负载重启，并产生新的版本。可能业务会短暂的中断。',
  Expand: '扩容',

  QINGCLOUD_CSI_DESC:
    'QingCloud CSI 插件实现了 CSI 接口，并使容器编排平台能够使用 QingCloud 云平台的存储资源。实现了块存储插件，可以对接云平台块存储资源。<a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md">详细信息</a>',

  QINGCLOUD_CSI_TYPE_DESC:
    '在青云云平台中，0 代表性能型硬盘，2 代表容量型硬盘，3 代表超高性能型硬盘，5 代表企业级分布式 SAN（NeonSAN）型硬盘，100 代表基础型硬盘，200 代表企业型硬盘',
  CREATE_VOLUME_MAX_SIZE: '创建存储卷容量上限',
  CREATE_VOLUME_STEP_SIZE: '创建存储卷增量值',
  CREATE_VOLUME_MIN_SIZE: '创建存储卷容量下限',
  VOLUME_FS_TYPE: '存储卷文件系统类型，可填写 ext3, ext4, xfs',
  QINGCLOUD_VOLUME_TAGS_DESC: '创建硬盘时自动关联 tag，多个tag用逗号分割',

  GLUSTERFS_RESTURL_DESC: 'Heketi 服务端 URL',
  GLUSTERFS_ID_DESC: 'Gluster 集群 ID',
  GLUSTERFS_RESTAUTHENABLED_DESC: ' Gluster 启用对 REST 服务器的认证',
  GLUSTERFS_RESTUSER_DESC: '能够在 Gluster pool 中创建 volume 的 Heketi 用户',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Heketi 用户密钥的 namespace',
  GLUSTERFS_SECRET_NAME_DESC: 'Heketi 用户的密钥',
  GLUSTERFS_GID_MIN_DESC: 'Gid 最小值',
  GLUSTERFS_GID_MAX_DESC: 'Gid 最大值',
  GLUSTERFS_VOLUME_TYPE_DESC: '创建卷额外参数',

  CEPHRBD_MONITORS_DESC: 'ceph 集群 MON 的 IP:端口',
  CEPHRBD_ADMIN_ID_DESC: 'ceph 集群能够创建卷的用户 ID',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'adminid 的密钥名',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'adminSecrect 所在的项目',
  CEPHRBD_POOL_DESC: 'ceph rbd pool 名',
  CEPHRBD_USERID_DESC: 'ceph 集群能够挂载卷的用户 ID',
  CEPHRBD_USER_SECRET_NAME_DESC: 'userid 的密钥名',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'userSecret 所在的项目',
  CEPHRBD_FS_TYPE_DESC: '存储卷的文件系统',
  CEPHRBD_IMAGE_FORMAT_DESC: 'ceph 卷的选项，1 或 2，2需要填写 imageFeatures',
  CEPHRBD_IMAGE_FEATURES_DESC: 'ceph 集群的额外功能',

  DEPENDENT_STORAGE_CLASS_DELETE_TIPS:
    '请确认是否有资源依赖该存储类型。若存在依赖，请先将依赖的资源关闭，以免影响资源功能',

  CREATE_VOLUME_WITH_SNAPSHOT: '基于快照创建存储卷',

  'Create Snapshot': '创建快照',
  'Clone Volume': '存储卷克隆',
  'Support Volume Snapshot': '支持存储卷快照',

  VOLUME_SNAPSHOT_STATUS_CREATING: '创建中',
  VOLUME_SNAPSHOT_STATUS_READY: '创建成功',
  VOLUME_SNAPSHOT_STATUS_FAILED: '创建失败',
  VOLUME_SNAPSHOT_STATUS_DELETING: '删除中',

  'Snapshot Message': '快照信息',
  'Snapshots Message': '快照信息',

  VolumeSnapshots: '存储卷快照',
  VOLUMESNAPSHOT_DESC:
    '存储卷快照表示存储卷的时间点副本。快照可用于配置新卷（预先填充快照数据）或将现有存储卷还原到先前状态（由快照表示）',
  VOLUMESNAPSHOT_CREATE_DESC:
    '存储卷快照表示存储卷的时间点副本。快照可用于配置新卷（预先填充快照数据）或将现有存储卷还原到先前状态（由快照表示）',
  WHAT_IS_VOLUME_SNAPSHOTS: '什么是存储卷快照',

  CREATE_VOLUME_BY_STORAGECLASS: '通过存储类型',
  CREATE_VOLUME_BY_SNAPSHOT: '通过存储卷快照创建',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: '选择已有的存储卷快照进行创建',

  CLUSTER_VOLUME_DIFF_DESC: '可针对不同集群，选择不同的存储类型',

  VOLUME_MONITORING_TIP:
    'Kubernetes 采集的是存储卷的设备用量数据，未挂载的存储卷暂时采集不到，并且对于如 OpenEBS/Local PV、NFS 等路径型存储卷通常与实际用量有一定出入。详见<a href="https://github.com/kubesphere/kubesphere/issues/2921" target="_blank">存储卷监控数据分析</a>。',
}
