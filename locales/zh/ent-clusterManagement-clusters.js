/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Cluster List
  BATCH_MANAGE: '批量管理',
  // Cluster List > Batch Manage > Edit Tags
  CLUSTER_REPEATED_TAGS_DESC: '标签的键必须在每个集群上唯一。',
  CLUSTER_MAX_TAGS_DESC: '每个集群可以携带最多 5 个标签。',
  EMPTY_TAG_LABEL_DESC: '请输入标签的键。',
  EMPTY_TAG_VALUE_DESC: '请输入标签的值。',
  HAS_ADD_TAGS: '已添加标签',
  // Cluster List > Add Cluster
  CLUSTER_TYPE_DESC: '选择一个类型来标识集群的用途。',
  // Cluster List > Remove Cluster
  DELETE_CLUSTER_SWIPE_DESC: '我了解此操作的风险。',
  REMOVE_CLUSTER_TIP_C:
    '请参考 KubeSphere 官方文档清除集群中的配置信息，以避免当前集群加入其他多集群系统时出现资源冲突。',
  // Cluster Tags
  CLUSTER_TAGS: '集群标签',
  NO_CLUSTER_TAGS: '未发现集群标签',
  NO_CLUSTER_TAGS_DESC: '请创建集群标签。',
  CLUSTER_TAG_ADD_HELP: '如果没有标签满足要求，您可以创建标签。',
  // Cluster Tags > Create
  TAG_PL: '标签',
  CREATE_TAGS: '创建标签',
  CREATE_TAGS_DESC: '不同标签的键可以相同。',
  ENT_CLUSTER_TAG_DESC: '键和值不能为空，最长 63 个字符。',
  CLUSTER_TAG_EMPTY_DESC: '请添加一个标签。',
  // Cluster Tags > Delete
  DELETE_MULTIPLE_TAGS: '批量删除标签',
  DELETE_TAG: '删除标签',
  DELETE_CLUSTER_TAG_DESC: '标签删除后将从所有集群上移除。',
  DELETE_CLUSTER_TAG_CONFIRM_DESC:
    '请输入标签的键和值 <strong>{resource}</strong> 以确认您了解此操作的风险。',
  DELETE_CLUSTER_TAGS_CONFIRM_DESC:
    '请输入标签的键和值 <strong>{resource}</strong> 以确认您了解此操作的风险。',
  // Cluster Tags > Edit
  EDIT_TAG: '编辑标签',
  // Cluster Tags > Bind Clusters
  ADD_TO_CLUSTERS: '添加到集群',
  ADD_TAG_TO_CLUSTERS: '将标签添加到集群',
  ADD_TAG_DESC:
    'The tag keys must be unique for each cluster. New tags do not overwrite existing tags.',
  ADD_TAG_SUCCESSFUL: '标签添加成功。',
  // Cluster Tags > Unbind Clusters
  REMOVE_FROM_CLUSTERS: '从集群上移除',
  REMOVE_TAG_FROM_CLUSTERS: '从集群上移除标签',
  REMOVE_TAG: '移除标签',
  REMOVE_TAG_DESC: '您确定从集群上移除标签吗？',
  REMOVE_TAG_SUCCESSFUL: '标签移除成功。',
  // Cluster Tag > Unbind Clusters
  NO_CLUSTER_FOUND: '未发现集群',
};
