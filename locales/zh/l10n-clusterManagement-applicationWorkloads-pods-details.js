/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Attributes
  NODE_IP_ADDRESS: '节点 IP 地址',
  CLUSTER: '集群',
  // Resource Status > Containers
  CONTAINER_PL: '容器',
  PROBE_PL: '探针',
  HOOK_PL: '钩子',
  // Resource Status > Containers > Container Logs
  CONTAINER_LOGS_NOT_SUPPORTED: '容器在当前不支持实时日志，请稍后重试。',
  CONTAINER_LOGS: '容器日志',
  // Resource Status > Details > Container Details > Attributes
  COMMAND: '命令',
  IMAGE_ID: '镜像 ID',
  IMAGE_PULL_POLICY: '镜像拉取策略',
  CONTAINER_DETAILS_PAGE_SCAP: '容器详情页。',
  CPU_VALUE: 'CPU：{value, plural, =1 {1 核} other {# 核}}',
  MEMORY_VALUE: '内存：{value}',
  NVIDIA_COM_GPU_VALUE: 'GPU：{value}',
  // Resource Status > Details > Container Details > Terminal
  LOADING: '加载中...',
  RESOURCE_LIMITS: '资源上限',
  RESOURCE_REQUESTS: '资源预留',
  TERMINAL: '终端',
  // Resource Status > Details > Container Details > Resource Status
  RESTART_PL: '重启次数',
  RESTART: '重启次数',
  STORAGE_DEVICES: '存储设备',
  LIVENESS_PROBE: '存活探针',
  READINESS_PROBE: '就绪探针',
  STARTUP_PROBE: '启动探针',
  REQUEST_TYPE: '请求类型',
  // Resource Status > Details > Container Details > Monitoring
  // Resource Status > Details > Container Details > Environment Variables
  // Resource Status > Details > Container Details > Container Logs
  NO_LOG_DATA_FOUND: '未发现日志数据',
  NO_LOG_DATA_FOUND_TIP: '没有找到日志数据。',
  // Resource Status > Volumes
  VOLUME_PL: '卷',
  TYPE_CONFIGMAP: '卷类型：配置字典',
  TYPE_SECRET: '卷类型：保密字典',
  TYPE_EMPTYDIR: '卷类型：EmptyDir',
  TYPE_HOSTPATH: '卷类型：HostPath',
  // Scheduling Information
  REASON_VALUE: '原因：{value}',
  MESSAGE_VALUE: '消息：{value}',
  UPDATED_AT_VALUE: '更新时间：{value}',
  // Metadata
  // Monitoring
  NO_MONITORING_DATA: '未发现监控数据',
  OUTBOUND: '出站',
  INBOUND: '入站',
};
