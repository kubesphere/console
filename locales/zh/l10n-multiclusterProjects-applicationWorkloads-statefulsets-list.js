/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  STATEFULSET_EMPTY_DESC: '请创建一个有状态副本集。',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  // List > Create > Pod Settings
  POD_SETTINGS: '容器组设置',
  POD_REPLICAS: '容器组副本数量',
  ONDELETE: '删除容器组时更新',
  ONDELETE_DESC: '需要手动删除容器组副本才能对其进行更新。',
  PARTITION_ORDINAL: '容器组副本分组序号',
  PARTITION_ORDINAL_DESC:
    '设置一个分组序号以将容器组副本分成两组。更新有状态副本集时，只有序号大于或等于分组序号的容器组副本会被更新。',
  // List > Create > Storage Settings
  PVC_NAME_PREFIX: 'PVC 名称前缀',
  PVC_NAME_PREFIX_DESC:
    '持久卷声明名称的前缀。前缀只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。',
  PVC_NAME_PREFIX_EMPTY: '请输入持久卷声明名称的前缀。',
  INVALID_PVC_NAME_PREFIX:
    '前缀无效。前缀只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。',
  PVC_NAME_PREFIX_EXISTS: '前缀已经存在，请输入其他前缀。',
  ADD_PERSISTENT_VOLUME_CLAIM_TEMPLATE: '添加持久卷声明模板',
  ADD_PERSISTENT_VOLUME_CLAIM_TEMPLATE_DESC:
    '添加持久卷声明模板为有状态副本集的每个容器组挂载一个持久卷。',
  VOLUME_CAPACITY_TCAP: '卷容量',
  MOUNT_PATH_TCAP: '挂载路径',
  VOLUME_TEMPLATES: '卷模板',
  // List > Create > Advanced Settings
  // List > Create > Cluster Differences
  SERVICE_PORT: '服务端口',
  SERVICE_PORT_VALUE: '服务端口：{value}',
  // List > Create > Cluster Differences (Displayed after you add a volume template)
  VOLUME_TEMPLATE_SETTINGS: '卷模板设置',
  CLUSTER_VOLUME_DIFF_DESC: '在不同的集群中使用不同的存储设置。',
};
