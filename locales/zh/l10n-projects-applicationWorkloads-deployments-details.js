/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // More > Roll Back
  ROLL_BACK: '回退',
  CURRENT_REVISION_RECORD: '当前修改记录',
  TARGET_REVISION_EMPTY_DESC: '请选择目标修改记录。',
  TARGET_REVISION_RECORD: '目标修改记录',
  // More > Edit Autoscaling
  CONFIGURE_AUTOSCALING_DESC: '设置系统根据目标 CPU 和内存用量自动调整容器组副本数量。',
  EDIT_AUTOSCALING: '编辑自动扩缩',
  TARGET_CPU_USAGE_UNIT: '目标 CPU 用量（%）',
  AUTOSCALING: '自动扩缩',
  RESOURCE_NAME: '资源名称',
  TARGET_CPU_USAGE_DESC: '当实际 CPU 用量大于/小于目标值时，系统自动减少/增加容器组副本数量。',
  TARGET_MEMORY_USAGE_DESC: '当实际内存用量大于/小于目标值时，系统自动减少/增加容器组副本数量。',
  MINIMUM_REPLICAS_DESC: '设置允许的最小容器组副本数量，默认值为 1。',
  MAXIMUM_REPLICAS_DESC: '设置允许的最大容器组副本数量，默认值为 1。',
  TARGET_MEMORY_USAGE_UNIT: '目标内存用量（MiB）',
  MINIMUM_REPLICAS: '最小副本数',
  MAXIMUM_REPLICAS: '最大副本数',
  // More > Edit Settings > Update Strategy
  EDIT_SETTINGS: '编辑设置',
  // More > Edit Settings > Containers
  FROM_CONFIGMAP: '来自配置字典',
  FROM_SECRET: '来自保密字典',
  BATCH_REFERENCE: '批量引用',
  BATCH_REFERENCE_DESC: '从配置字典或保密字典中引用多个键。',
  DESELECT_ALL: '全部取消选择',
  KEY_PL: '键',
  // More > Edit Settings > Volumes
  // More > Edit Settings > Volumes > Mount Volume
  // More > Edit Settings > Volumes > Mount Configmap or Secret
  // More > Edit Settings > Pod Scheduling Rules
  RULE_NOT_COMPLETE: '请设置完整规则。',
  // Attributes
  // Revision Records
  REVISION_RECORDS: '修改记录',
  CONFIG_FILE: '配置文件',
  COMPARE_WITH: '与上一个记录 {version} 对比',
  // Resource Status
  REPLICAS_DESIRED: '期望副本数',
  REPLICAS_CURRENT: '当前副本数',
  ADJUST_REPLICAS: '调整副本数量',
  REPLICAS_SCALE_NOTIFY_CONTENT: '您确定将容器组副本数量调整为 <strong>{num}</strong> 吗？',
  REPLICAS_SCALE_NOTIFY_CONFIRM: '确定（{seconds}s）',
  REPLICAS_SCALE_NOTIFY_CANCEL: '取消',
  // Resource Status > Autoscaling
  TARGET_MEMORY_USAGE: '目标内存用量',
  TARGET_CPU_USAGE: '目标 CPU 用量',
  TARGET_CURRENT: '{target}（当前：{current}）',
  NOT_ENABLE: '{resource}未启用',
  // Resource Status > Image Builder
  CONTAINER_LOG_NOT_ENABLED: '容器日志未启用。',
  BUILD_LOG: '构建日志',
  TASK: '任务',
  IN_PROGRESS: '进行中',
  IMAGE_BUILDING: '构建镜像中',
  HAS_FAILED: '已失败',
  // Metadata
  // Monitoring
  // Monitoring > View All Replicas (visible only when replicas > 5)
  VIEW_ALL_REPLICAS: '查看所有副本',
  SHOW_SELECTED_ONLY: '仅显示已选',
  MONITORING_SELECT_LIMIT_MSG: '最多可以选择 10 个资源。',
  MONITORING_ALERT_DESC:
    '默认最多显示五个容器组副本的信息。您可以点击<b>查看所有副本</b>以查看所有容器组副本的信息。',
  CURRENT_VALUE: '当前：{value}',
  // Environment Variables
  ENVIRONMENT_VARIABLE_PL: '环境变量',
  // Events
  EVENT_AGE: '发生时间',
  EVENT_AGE_DATA: '{lastTime}<br/>（近 {duration}发生 {count} 次)',
  EVENT_AGE_DATA_TWICE: '{lastTime}<br/>（近 {duration}发生 2 次）',
  SOURCE: '来源',
};
