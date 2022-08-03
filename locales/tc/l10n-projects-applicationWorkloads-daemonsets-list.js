/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
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
  CERT_ERROR: '發現證書錯誤，是否忽略證書驗證並再次'
};