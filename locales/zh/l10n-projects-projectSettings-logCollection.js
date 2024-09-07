/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  LOG_COLLECTION: '日志收集',
  DISK_LOG_COLLECTION_DESC:
    '日志收集功能允许系统收集保存在卷上的容器日志，并将日志发送到标准输出。',
  COLLECT_LOGS_ON_VOLUMES_Q: '如何收集卷上的日志？',
  COLLECT_LOGS_ON_VOLUMES_A:
    '如需收集卷上的日志，请为容器挂载读写模式的卷并设置容器将日志导出到卷。',
  // Collect Logs on Volumes
  COLLECT_LOGS_ON_VOLUMES: '收集卷上日志',
  DISABLE_LOG_COLLECTION: '停用日志收集',
  DISABLE_LOG_COLLECTION_TIP: '您确定停用日志收集吗？您需要重启容器组副本才能使修改生效。',
  LOG_COLLECTION_ENABLED_DESC: '启用或禁用此功能后，您需要重启容器组副本才能使修改生效。',
  DISABLED: '已禁用',
  ENABLED: '已启用',
};
