/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  // List > Create > Basic Information
  // List > Create > Pod Settings
  CONTAINER_SETTINGS_DESC: '设置容器的镜像、名称、类型和计算资源。',
  PORT_SETTINGS_DESC: '设置用于访问容器的端口。',
  HEALTH_CHECKER_DESC: '添加探针以定时检查容器健康状态。',
  STARTUP_COMMAND: '启动命令',
  STARTUP_COMMAND_DESC: '自定义容器启动时运行的命令。默认情况下，容器启动时将运行镜像默认命令。',
  CONTAINER_COMMAND_DESC: '容器的启动命令。',
  CONTAINER_ARGUMENT_DESC: '容器启动命令的参数。如有多个参数请使用半角逗号（,）分隔。',
  CONTAINER_ENVIRONMENT_DESC: '为容器添加添加环境变量。',
  PROBE_COMMAND_DESC: '使用半角逗号（,）分隔多条命令。',
  // List > Create > Pod Settings > Add Container
  IGNORE_CERT_WARN_DESC: '忽略证书验证可能会导致帐户密码被泄露。',
  CERT_ERROR: '证书错误。',
};
