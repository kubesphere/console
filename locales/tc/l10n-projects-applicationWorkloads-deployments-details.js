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
  // More > Roll Back
  ROLL_BACK: '回退',
  CURRENT_REVISION_RECORD: '目前修改记录',
  TARGET_REVISION_EMPTY_DESC: '請選擇回退版本',
  TARGET_REVISION_RECORD: '回退版本',
  // More > Edit Autoscaling
  CONFIGURE_AUTOSCALING_DESC: '根據 CPU 和記憶體使用情況自動伸縮副本。如果同時指定 CPU 和記憶體，則滿足任一條件後即添加或刪除副本',
  EDIT_AUTOSCALING: 'Edit Autoscaling',
  TARGET_CPU_USAGE_UNIT: 'CPU 目標使用率',
  AUTOSCALING: '彈性伸縮',
  RESOURCE_NAME: '資源名稱',
  TARGET_CPU_USAGE_DESC: '當 CPU 使用率超過或低於此目標值時，將添加或刪除副本',
  TARGET_MEMORY_USAGE_DESC: '當記憶體使用量超過或低於此目標值時，將添加或刪除副本',
  MINIMUM_REPLICAS_DESC: '彈性伸縮可以設置的副本數量的下限',
  MAXIMUM_REPLICAS_DESC: '副本數量的上限',
  TARGET_MEMORY_USAGE_UNIT: '記憶體目標使用量',
  MINIMUM_REPLICAS: '最小副本數',
  MAXIMUM_REPLICAS: '最大副本數',
  // More > Edit Settings > Update Strategy
  EDIT_SETTINGS: '編輯配置模板',
  // More > Edit Settings > Containers
  FROM_CONFIGMAP: 'From configmap',
  FROM_SECRET: 'From secret',
  BATCH_REFERENCE: 'Batch Reference',
  BATCH_REFERENCE_DESC: 'Reference multiple keys in a configmap or secret.',
  DESELECT_ALL: 'Deselect all',
  KEY_PL: 'Keys',
  // More > Edit Settings > Volumes
  // More > Edit Settings > Volumes > Mount Volume
  // More > Edit Settings > Volumes > Mount Configmap or Secret
  // More > Edit Settings > Pod Scheduling Rules
  RULE_NOT_COMPLETE: '請填寫完整策略',
  // Attributes
  // Revision Records
  REVISION_RECORDS: '版本記錄',
  CONFIG_FILE: '配置文件',
  COMPARE_WITH: '與上一個版本 {version} 的對比',
  // Resource Status
  REPLICAS_DESIRED: '期望副本数',
  REPLICAS_CURRENT: '實際運行副本',
  ADJUST_REPLICAS: '立即生效？',
  REPLICAS_SCALE_NOTIFY_CONTENT: '您已將工作負載的副本數調整為 <strong>{num}</strong>, 您也可以繼續調整副本數量，或者您可以使它立即生效。',
  REPLICAS_SCALE_NOTIFY_CONFIRM: '立即生效({seconds}s)',
  REPLICAS_SCALE_NOTIFY_CANCEL: '放棄更改',
  // Resource Status > Autoscaling
  TARGET_MEMORY_USAGE: '目標使用量',
  TARGET_CPU_USAGE: '目標使用率',
  TARGET_CURRENT: '{target} (Current: {current})',
  NOT_ENABLE: '{resource} 暫未啟用',
  // Resource Status > Image Builder
  CONTAINER_LOG_NOT_ENABLED: 'Container Log is not enabled.',
  BUILD_LOG: 'Build Log',
  TASK: 'Task',
  IN_PROGRESS: 'in progress',
  IMAGE_BUILDING: 'Image Building',
  HAS_FAILED: 'has failed',
  // Metadata
  // Monitoring
  // Monitoring > View All Replicas (visible only when replicas > 5)
  VIEW_ALL_REPLICAS: '查看所有副本',
  SHOW_SELECTED_ONLY: '僅顯示已選',
  MONITORING_SELECT_LIMIT_MSG: '最多可以選擇 10 個資源',
  MONITORING_ALERT_DESC: '目前監控最多可顯示五個副本的運行狀態監控，當超過五個副本時，可以點擊具體監控項目的「查看全部副本」，查看更多的副本監控。',
  CURRENT_VALUE: 'Current: {value}',
  // Environment Variables
  ENVIRONMENT_VARIABLE_PL: '環境變量',
  // Events
  EVENT_AGE: '發生時間',
  EVENT_AGE_DATA: '{lastTime}<br/>({count} times over {duration})',
  EVENT_AGE_DATA_TWICE: '{lastTime}<br/>(twice over {duration})',
  SOURCE: '來源'
};