/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Navigation pane
  STORAGE: '存储',
  // Banner
  PERSISTENT_VOLUME_CLAIM_DESC: '持久卷声明定义了存储需求，系统根据持久卷声明创建持久卷。',
  PERSISTENT_VOLUME_CLAIM: '持久卷声明',
  PERSISTENT_VOLUME_CLAIM_PL: '持久卷声明',
  WHAT_IS_STORAGE_CLASS_Q: '什么是存储类？',
  WHAT_IS_STORAGE_CLASS_A:
    '存储类（Storage Class）由集群管理员配置，不同的存储类为集群用户提供不同类型的卷。',
  WHAT_IS_LOCAL_VOLUME_Q: '什么是本地卷?',
  WHAT_IS_LOCAL_VOLUME_A: '本地卷是创建在集群本地文件系统中的卷。',
  // List
  VOLUME_STATUS_BOUND: '已绑定',
  VOLUME_STATUS_LOST: '丢失',
  VOLUME_STATUS_PENDING: '等待中',
  VOLUME_STATUS_TERMINATING: '删除中',
  VOLUME_STATUS_UPDATING: '更新中',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: '磁盘扩展中',
  PERSISTENT_VOLUME_CLAIM_EMPTY_DESC: '请创建一个持久卷声明。',
  MOUNT_STATUS: '挂载状态',
  MOUNTED: '已挂载',
  NOT_MOUNTED: '未挂载',
  ACCESS_MODE_TCAP: '访问模式',
  RWO_DESC: 'RWO：单节点读写',
  ROX_DESC: 'ROX：多节点只读',
  RWX_DESC: 'RWX：多节点读写',
  // List > Create > Basic Information
  CREATE: '创建',
  CREATE_PERSISTENT_VOLUME_CLAIM: '创建持久卷声明',
  // List > Create > Storage Settings
  CREATION_METHOD: '创建方式',
  CREATE_VOLUME_BY_STORAGE_CLASS: '通过存储类创建',
  CREATE_VOLUME_BY_SNAPSHOT: '通过卷快照创建',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: '选择卷快照来创建卷。',
  SELECT_STORAGE_CLASS_CREATE_VOLUME: '选择已有的存储类来创建卷。',
  VOLUME_CAPACITY: '卷容量',
  PARAM_REQUIRED: '此参数不能为空。',
  VOLUME_SIZE_TIP: '卷容量必须大于 0。',
  VOLUME_STORAGE_CLASS_DESC: '选择一个存储类来创建特定种类的卷。',
  // List > Advanced Settings
  // List > Edit
  // List > Edit YAML
  // List > Delete
  PERSISTENT_VOLUME_CLAIM_LOW: '持久卷声明',
};
