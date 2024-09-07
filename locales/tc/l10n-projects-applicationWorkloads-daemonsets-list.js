/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  // List > Create > Basic Information
  // List > Create > Pod Settings
  CONTAINER_SETTINGS_DESC: '對容器的名稱及容器的計算資源進行設置',
  PORT_SETTINGS_DESC: '設置容器的訪問策略',
  HEALTH_CHECKER_DESC: '根據用戶需要，定時檢查容器健康狀況。',
  STARTUP_COMMAND: '啟動命令',
  STARTUP_COMMAND_DESC: '在預設情况下，鏡像會運行預設命令，如果想運行特定命令或重寫鏡像預設值。',
  CONTAINER_COMMAND_DESC: '容器的啟動命令參數，預設使用打包時使用的啟動命令, 如需多個請以 "," 分隔',
  CONTAINER_ARGUMENT_DESC: '容器的啟動命令參數, 如需多個請以 "," 分隔',
  CONTAINER_ENVIRONMENT_DESC: '添加容器的環境變量',
  PROBE_COMMAND_DESC: '如需多個請以 "," 分隔',
  // List > Create > Pod Settings > Add Container
  IGNORE_CERT_WARN_DESC: '忽略驗證證書，可能會導致帳戶密碼被欺騙。',
  CERT_ERROR: '發現證書錯誤，是否忽略證書驗證並再次',
};
