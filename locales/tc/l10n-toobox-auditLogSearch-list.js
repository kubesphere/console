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
  // Title
  TOTAL_AUDITING_TODAY: '今日總共收錄了 <span class={className}> {auditing} </span> 條操作審計',
  NO_AUDIT_LOG_TODAY: '今日沒有收錄的操作審計',
  // Search
  NO_AVAILABLE_CLUSTER: '暫時沒有可用集群',
  AUDITING_NOT_ENABLED_DESC: '暫無啟用審計模組的集群',
  TIME_RANGE_LAST: 'Time range: last {value}',
  TIME_RANGE_RANGE: 'Time range: {startTime} - {endTime}',
  // Querying Rules
  AUDIT_LOG_WORKSPACE_TIP: '可以根據企業空間查看相關的操作審計',
  AUDIT_LOG_PROJECT_TIP: '可以根據項目查看相關的操作審計',
  AUDIT_LOG_RESOURCE_NAME_TIP: '可以根據資源名稱查看相關的操作審計',
  AUDIT_LOG_RESOURCE_TYPE_TIP: '可以根據資源類型查看相關的操作審計',
  AUDIT_LOG_VERB_TIP: '可以根據操作行為查看相關的操作審計',
  AUDIT_LOG_STATUS_CODE_TIP: '可以根據狀態碼查看相關的操作審計',
  AUDIT_LOG_OPERATOR_TIP: '可以根據操作帳號查看相關的操作審計',
  AUDIT_LOG_SOURCE_IP_ADDRESS_TIP: '可以根據來源IP查看相關的操作審計',
  SEARCH_BY_VERB: 'Search by Verb',
  SEARCH_BY_STATUS_CODE: 'Search by Status Code',
  SEARCH_BY_OPERATOR: 'Search by Operator',
  SEARCH_BY_SOURCE_IP_ADDRESS: 'Search by Source IP Address',
  ENABLE_AUDIT_LOG_COLLECTION_DESC: 'You need to enable audit log collection if it is disabled. <a href="{link}" target="_blank">Learn More</a>'
};