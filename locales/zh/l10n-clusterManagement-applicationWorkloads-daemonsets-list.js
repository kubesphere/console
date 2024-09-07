/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  DAEMONSETS: '守护进程集',
  DAEMONSET_EMPTY_DESC: '请创建一个守护进程集。',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Update Strategy > Rolling Update Settings
  MIN_READY_SECONDS: '容器组就绪最短运行时长（s）',
  MAX_UNAVAILABLE_PODS: '最大不可用容器组数量',
  ROLLING_UPDATE_SETTINGS: '滚动更新设置',
  MAX_UNAVAILABLE_PODS_DESC: '更新过程中允许的不可用容器组副本的最大数量或百分比。',
  MIN_READY_SECONDS_DESC: '容器组副本被视为就绪所需要的最短稳定运行时长。',
  MIN_READY_SECONDS_EMPTY: '请设置容器组副本被视为就绪所需要的最短稳定运行时长。',
  MAX_UNAVAILABLE_EMPTY: '请设置更新过程中允许的不可用容器组副本的最大数量或百分比。',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > HTTP Request
  FAILURE_THRESHOLD: '失败阈值',
  HTTP_REQUEST: 'HTTP 请求',
  INITIAL_DELAY_S: '初始延迟（s）',
  INITIAL_DELAY_TIMEOUT_VALUE: '{delay}s 初始延迟, {timeout}s 超时时间',
  PROBE_TIME: '初始延时: {delay}s 超时时间:{timeout}s',
  TIMEOUT_PERIOD_S: '超时时间（s）',
  CHECK_INTERVAL_S: '检查间隔（s）',
  SUCCESS_THRESHOLD: '成功阈值',
  INITIAL_DELAY_DESC: '容器启动后探针启动前的延迟时间。',
  TIMEOUT_PERIOD_DESC: '探针超时时间。探针超时后，检查将被视为失败。取值必须为整数，最小值为 0。',
  CHECK_INTERVAL_DESC: '执行检查的时间间隔。取值必须为整数，最小值为 1。',
  SUCCESS_THRESHOLD_DESC:
    '检查失败后再次被视为成功所需的最小连续成功次数。最小值为 1。对于存活探针和启动探针，此参数值必须为 1。',
  FAILURE_THRESHOLD_DESC: '检查成功后再次被视为失败所需的最小连续失败次数。最小值为 1。',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > Command
  PROBE_COMMAND_EMPTY: '请输入至少一条命令。',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > TCP Port
  TCP_PORT: 'TCP 端口',
  // List > Create > Storage Settings
  MOUNT_PATH_IN_USE: '挂载路径已被使用，请输入其他挂载路径。',
};
