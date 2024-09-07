/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Attributes
  NODE_IP_ADDRESS: '節點 IP 地址',
  CLUSTER: '集群',
  // Resource Status > Containers
  CONTAINER_PL: '容器',
  PROBE_PL: '探針',
  HOOK_PL: 'Hooks',
  // Resource Status > Containers > Container Logs
  CONTAINER_LOGS_NOT_SUPPORTED: '容器在目前狀態下不支持即時紀錄，請稍後再試',
  CONTAINER_LOGS: '容器紀錄',
  // Resource Status > Details > Container Details > Attributes
  COMMAND: '命令',
  IMAGE_ID: '鏡像 ID',
  IMAGE_PULL_POLICY: '鏡像拉取策略',
  CONTAINER_DETAILS_PAGE_SCAP: '容器詳情頁。',
  CPU_VALUE: 'CPU: {value, plural, =1 {1 core} other {# cores}}',
  MEMORY_VALUE: 'Memory: {value}',
  NVIDIA_COM_GPU_VALUE: 'GPU: {value}',
  // Resource Status > Details > Container Details > Terminal
  LOADING: '載入中...',
  RESOURCE_LIMITS: '資源限制',
  RESOURCE_REQUESTS: '資源預留',
  TERMINAL: '終端',
  // Resource Status > Details > Container Details > Resource Status
  RESTART_PL: '重啟次數',
  RESTART: '重啟次數',
  STORAGE_DEVICES: '儲存設備',
  LIVENESS_PROBE: '存活探針',
  READINESS_PROBE: '就緒探針',
  STARTUP_PROBE: '啟動探針',
  REQUEST_TYPE: 'Request type',
  // Resource Status > Details > Container Details > Monitoring
  // Resource Status > Details > Container Details > Environment Variables
  // Resource Status > Details > Container Details > Container Logs
  NO_LOG_DATA_FOUND: 'No Log Data Found',
  NO_LOG_DATA_FOUND_TIP: 'No log data is found.',
  // Resource Status > Volumes
  VOLUME_PL: 'Volumes',
  TYPE_CONFIGMAP: '儲存卷類型：配置設定',
  TYPE_SECRET: '儲存卷類型：保密設定',
  TYPE_EMPTYDIR: '儲存卷類型：EmptyDir',
  TYPE_HOSTPATH: '儲存卷類型：HostPath',
  // Scheduling Information
  REASON_VALUE: '原因：{value}',
  MESSAGE_VALUE: '訊息：{value}',
  UPDATED_AT_VALUE: '更新時間 ：{value}',
  // Metadata
  // Monitoring
  NO_MONITORING_DATA: '未發現監控資料',
  OUTBOUND: '出站',
  INBOUND: '入站',
};
