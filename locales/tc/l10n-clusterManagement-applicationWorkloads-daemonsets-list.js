/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  DAEMONSETS: '守護進程集',
  DAEMONSET_EMPTY_DESC: 'Please create a DaemonSet.',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Update Strategy > Rolling Update Settings
  MIN_READY_SECONDS: '最小就緒時間 (MinReadySeconds)',
  MAX_UNAVAILABLE_PODS: '容器組最大不可用數量',
  ROLLING_UPDATE_SETTINGS: '更新時容器組數量',
  MAX_UNAVAILABLE_PODS_DESC:
    '升級過程中「允許存在的不可用的容器組」所占總容器組數的最大百分比或數量',
  MIN_READY_SECONDS_DESC: '指定守護進程集中容器組啟動可用所需的最小的秒數',
  MIN_READY_SECONDS_EMPTY:
    'Please set the minimum stable running time required for the Pod to be considered ready.',
  MAX_UNAVAILABLE_EMPTY:
    'Please set the maximum number of unavailable Pod replicas allowed during the update process.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > HTTP Request
  FAILURE_THRESHOLD: '不健康臨界值',
  HTTP_REQUEST: 'HTTP 請求檢查',
  INITIAL_DELAY_S: '初始延遲（s）',
  INITIAL_DELAY_TIMEOUT_VALUE: '{delay}s 初始延遲, {timeout}s 超時時間',
  PROBE_TIME: '初始延時: {delay}s 超時時間:{timeout}s',
  TIMEOUT_PERIOD_S: '超時時間（s）',
  CHECK_INTERVAL_S: '檢查間隔（s）',
  SUCCESS_THRESHOLD: '成功臨界值',
  INITIAL_DELAY_DESC: '在檢查其運行狀況之前，容器啟動後需要等待多長時間。',
  TIMEOUT_PERIOD_DESC: '等待探針完成多長時間。如果超過時間，則認為探測失敗。預設為1秒。最小值為1。',
  CHECK_INTERVAL_DESC: '執行探測的頻率（以秒為單位）。預設為10秒。最小值為1。',
  SUCCESS_THRESHOLD_DESC:
    '檢查失敗後再次被視為成功所需的最小連續成功次數。最小值為 1。對於存活探針和啟動探針，此參數值必須為 1。',
  FAILURE_THRESHOLD_DESC: '檢查成功後再次被視為失敗所需的最小連續失敗次數。最小值為 1。',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > Command
  PROBE_COMMAND_EMPTY: '請輸入至少一條指令',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > TCP Port
  TCP_PORT: 'TCP 端口檢查',
  // List > Create > Storage Settings
  MOUNT_PATH_IN_USE: '掛載路徑已使用，請輸入其他掛載路徑。',
  GRPC_PORT: 'GRPC 端口檢查',
};
