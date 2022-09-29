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
  ALERTING_POLICY_PL: '告警策略',
  ALERTING_POLICY_DESC: 'Alerting policies are a series of conditions used to monitor cluster resources. You can create alerting policies to monitor resources.',
  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: '如何觸發告警訊息？',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A: '您需要對資源設置告警策略，當資源的某項指標達到告警策略的閥值後即會觸發告警訊息。',
  // List
  ALERTING_POLICY_EMPTY_DESC: '請創建一個告警規則。',
  ALERT_RULE_INACTIVE: '未觸發',
  ALERT_RULE_PENDING: '待觸發',
  ALERT_RULE_FIRING: '觸發中',
  ALERT_RULE_HEALTH_OK: '健康',
  ALERT_RULE_HEALTH_ERR: '錯誤',
  ALERT_RULE_HEALTH_UNKNOWN: '未知',
  // List > Create > Basic Information
  SEVERITY: '告警級別',
  CREATE_ALERTING_POLICY: '創建告警策略',
  CRITICAL_ALERT: '危險告警',
  ERROR_ALERT: '重要告警',
  WARNING_ALERT: '一般告警',
  INVALID_TIME_DESC: 'Invalid value. Please enter 0 or a positive integer.',
  ALIAS: '別名',
  DURATION_MIN: 'Duration (minutes)',
  ALERT_DURATION: 'When the alert situation persists longer than the value of this parameter, the system starts to send alerting messages to users.',
  LONG_NAME_DESC: '最長 253 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母或數字開頭及結尾',
  NAME_EXIST_DESC: '名稱已存在',
  // List > Create > Rule Settings > Rule Template
  RULE_SETTINGS: '規則設置',
  MONITORING_TARGETS: '監控目標',
  ACTIVATION_CONDITION: 'Activation Condition',
  CPU_USAGE_SCAP: 'CPU 用量',
  CPU_PERCENTAGE_SCAP: 'CPU percentage',
  DISK_READ_IOPS: '本地磁碟讀取 IOPS',
  DISK_READ_THROUGHPUT: '本地磁碟讀取吞吐量',
  DISK_SPACE_AVAILABLE: '本地磁碟可用空間',
  DISK_WRITE_IOPS: '本地磁碟寫入 IOPS',
  DISK_WRITE_THROUGHPUT: '本地磁碟寫入吞吐量',
  DISK_SPACE_USAGE: '本地磁碟空間利用率',
  MEMORY_AVAILABLE: '可用記憶體',
  MEMORY_USAGE_CACHE: '記憶體用量（包含快取）',
  MEMORY_USAGE_SCAP: '記憶體用量',
  MEMORY_PERCENTAGE_CACHE: 'Memory percentage (including caches)',
  MEMORY_PERCENTAGE_SCAP: 'Memory percentage',
  DATA_RECEIVE_RATE: '網路接收數據速率',
  DATA_SEND_RATE: '網路發送數據速率',
  SET_ACTIVATION_CONDITION_DESC: 'Please set an activation condition.',
  ABNORMAL_PODS: '容器組異常率',
  POD_USAGE_SCAP: '容器組利用率',
  THRESHOLD: '閾值',
  UNAVAILABLE_REPLICAS: '副本不可用率',
  RULE_TEMPLATE: '規則模板',
  CPU_LOAD_1: '過去 1 分鐘的 CPU 平均負載',
  CPU_LOAD_5: '過去 5 分鐘的 CPU 平均負載',
  CPU_LOAD_15: '過去 15 分鐘的 CPU 平均負載',
  SELECT_NODE_TIP: '請選擇至少一個集群節點。',
  // List > Create > Rule Settings > Custom Rule
  CUSTOM_RULE: '自定義規則',
  RULE_EXPRESSION: '告警規則表達式',
  ENTER_RULE_EXPRESSION: '請輸入告警規則表達式。',
  ALERT_RULE_EXPRESSION_DESC: '您可以通過 PromQL 語句來自定義告警規則。<a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">了解更多</a>',
  ALERT_FUNCTIONS: 'Functions',
  ALERT_METRICS: 'Metrics',
  ALERT_LABELS: '標籤',
  ALERT_RATE_RANGES: 'Rate Ranges',
  // List > Create > Message Settings
  ALERTING_MESSAGE: 'Alerting Message',
  MESSAGE_SETTINGS: '訊息設置',
  NOTIFICATION_SUMMARY: '概括',
  NOTIFICATION_DETAILS: '詳情',
  // List > Edit
  EDIT_ALERTING_POLICY: '編輯告警策略',
  // List > Delete
  ALERTING_POLICY: '告警策略',
  ALERTING_POLICY_LOW: '告警策略'
};