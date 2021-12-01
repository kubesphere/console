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
  Alerting: '告警',
  Notification: '通知',
  NOTIFICATION_MESSAGE: 'Notification Message',
  NOTIFICATION_SUMMARY: 'Summary',
  EDIT_TCAP: 'Edit',
  EDIT_ALERTING_POLICY: 'Edit Alerting Policy',
  DELETE_TCAP: 'Delete',
  CREATE_ALERTING_POLICY: 'Create Alerting Policy',
  'Alerting Detail': '告警詳情',
  ALERTING_MESSAGE: '告警訊息',
  'Alerting Messages': '告警訊息',
  ALERT_MONITORING: '告警監控',
  'alerting policy': '告警策略',
  ALERTING_POLICY: '告警策略',
  ALERTING_POLICY_PL: 'Alerting Policies',
  ALERTING_POLICY_LOW: 'alerting policy',
  'Alerting Policies': '告警策略',
  ALERTING_HISTORY: '告警歷史',
  'alerting rule': '告警規則',
  ALERTING_RULE: '告警規則',
  RULE_SETTINGS: 'Rule Settings',
  ALERTING_STATUS: '告警狀態',
  ALERTING_SEVERITY: '告警級別',
  ALERTING_TYPE: '告警類別',
  ALERTING_NAME: '告警名稱',
  SEVERITY: '告警級別',
  'Alerting Duration': '告警持續時間',
  'Notification Settings': '通知設置',
  'monitoring target': '監控目標',
  MONITORING_TARGETS: '監控目標',
  'Monitoring Target Count': '監控目標數量',
  'Monitoring Rules': '監控規則',
  ALERTING_RESOURCE: '告警資源',

  Rule: '規則',
  RULE: '規則',
  'Add Rule': '添加規則',
  'Edit Rule': '編輯規則',
  'Rule Name': '規則名稱',
  VIEW_DETAILS: '查看詳情',
  ACTIVATION_TIME: '告警激活時間',
  SET_RULE_DESC: '請輸入告警規則。',
  'Please input the threshold': '請輸入臨界值',

  CRITICAL_ALERT: '危險告警',
  ERROR_ALERT: '重要告警',
  WARNING_ALERT: '一般告警',

  Condition: '條件',
  THRESHOLD: '臨界值',

  ALERT_TYPE: ' {type} 告警',
  ALERT_POLICY_TYPE: ' {type} 告警策略',
  ALERT_POLICY_DESC:
    'Alerting policies are a series of conditions used to monitor cluster resources. You can create alerting policies to monitor resources.',
  ALERT_MESSAGE_DESC:
    'Alert messages display details of triggered alerts that have met the conditions of the alert rules.',
  ALERT_POLICY_TRIGGER_RULE: '觸發規則： 滿足以下任意條件',
  ALERTING_MESSAGE_EMPTY_DESC:
    'No alerting message is found in the current project.',
  ALERT_METRIC_NAME: '告警指標名稱',
  ALERT_COMMENT: '處理意見',
  ALERT_COMMENT_DESC:
    '處理意見將作為告警處理的紀錄保留，但並不能作為處理告警的方法。紀錄訊息將給相關用戶查看該告警的處理情況。',
  ALERTING_POLICY_CREATE_DESC:
    'You can create alerting policies to detect abnormal resources in real time.',
  'ALERTING-POLICY_BASEINFO_DESC': '設置告警策略的基礎資訊',
  'ALERTING-POLICY_MONITORING-TARGET_DESC': '選擇告警策略的監控目標',
  'ALERTING-POLICY_ALERTING-RULE_DESC': '設置告警規則',
  'ALERTING-POLICY_NOTIFICATION-RULE_DESC': '設置通知規則',
  TOTAL_POLICIES: '共計 {num} 個告警策略',

  PERIOD_OPTIONS: '{value} 分鐘',
  CONSECUTIVE_OPTIONS: '連續 {value} 次',

  MAX_SEND_NOT_LIMIT: '不限制',
  MAX_SEND_COUNT: '最多重發 {count} 次',
  REPEAT_CUSTOM_TITLE: '自定義重覆規則',
  REPEAT_CUSTOM_DESC:
    '告警規則將根據危險程度進行重覆推送，如果未進行修改將會按照預設策略運行',
  REPEAT_INTERVAL_NOT_REPEAT: '不重覆',
  REPEAT_INTERVAL_MINUTE: '每 {num} 分鐘警告一次',
  REPEAT_INTERVAL_HOUR: '每 {num} 小時警告一次',
  REPEAT_INTERVAL_DAY: '每 {num} 天警告一次',
  REPEAT_INTERVAL_EXP: '指數週期遞增',
  REPEAT_RULE_EXP_TIP:
    '週期指數遞增通知: 告警持續時間長達到告警統計週期的1，2，4，8，16，32...倍時發送告警通知',
  REPEAT_RULE_TIPS:
    '告警規則將根據危險程度進行重覆推送，預設 <strong>危險告警 30分鐘重覆一次</strong> / <strong>重要告警 2小時重覆一次</strong> / <strong>一般告警 不重覆</strong>；<br> 如需要修改，請在通知規則中進行自定義設置',

  NOTIFY_TIME_LABEL: '通知有效時間',
  NOTIFY_TIME_TIP: '可以設置一個告警推送的有效時間範圍',
  NOTIFY_LIST_ADD_TIP: '按下確認鍵或點擊添加',
  NOTIFY_LIST_INPUT_ERRPR_TIP: '輸入格式有誤，請輸入正確的郵件地址',
  NOTIFY_LIST_INPUT_PLACEHOLDER: '輸入郵件地址尋找通知的成員',
  NOTIFY_CURRENT_COUNT: '當前第 {count} 次通知',
  RESOURCE_SELECTOR_FORM_TIP: '請填寫標籤選擇器',
  SELECT_NODE_TIP: 'Please select at least one cluster node.',
  SELECT_WORKLOAD_TIP: '請選擇工作負載。',
  SEVERITY_MSG_FIXED_MINUTES: '每 {count} 分鐘通知一次',
  SEVERITY_MSG_NO_LIMIT: '不限制',
  SEVERITY_MSG_EXP: '指數週期通知',
  SEVERITY_MSG_NOT_REPEAT: '不重覆通知',
  ALERT_RULE_STATUS_OCCURRED: '正在告警',
  ALERT_RULE_STATUS_NO_OCCURRED: '未告警',
  SENT_RULE_TIME_TITLE: '有效時間週期',
  SENT_RULE_CHANNEL_TITLE: '推送頻道',
  RULE_TEMPLATE: '規則模版',
  CUSTOM_RULE: '自定義規則',
  RULE_EXPRESSION: '告警規則表達式',
  INVALID_TIME_DESC:
    'Invalid value. Please select a value from the drop-down list or enter 0 or a positive integer.',
  ALIAS: 'Alias',
  THRESHOLD_DURATION_MIN: 'Threshold Duration (min)',

  ENTER_RULE_EXPRESSION: '请输入告警規則表達式。',
  ALERT_FUNCTIONS: 'Functions',
  ALERT_METRICS: 'Metrics',
  ALERT_LABELS: 'Labels',
  ALERT_RATE_RANGES: 'Rate Ranges',

  NOTIFICATION_DETAILS: 'Details',

  CUSTOM_POLICIES: '自定義策略',
  BUILT_IN_POLICIES: '内置策略',

  CPU_LOAD_1: 'Average CPU load over 1 minute',
  CPU_LOAD_5: 'Average CPU load over 5 minutes',
  CPU_LOAD_15: 'Average CPU load over 15 minutes',
  ABNORMAL_PODS: '容器組異常率',
  POD_USAGE_SCAP: '容器組利用率',
  CPU_USAGE_SCAP: 'CPU 用量',
  MEMORY_AVAILABLE: '可用記憶體',
  MEMORY_USAGE_SCAP: '記憶體用量',
  DISK_SPACE_AVAILABLE: '本地硬碟可用空間',
  DISK_SPACE_USAGE: '本地硬碟空間利用率',
  DISK_READ_IOPS: '本地硬碟讀取 IOPS',
  DISK_WRITE_IOPS: '本地硬碟寫入 IOPS',
  DISK_READ_THROUGHPUT: '本地硬碟讀取吞吐量',
  DISK_WRITE_THROUGHPUT: '本地硬碟寫入吞吐量',
  DATA_SEND_RATE: '網路發送數據速率',
  DATA_RECEIVE_RATE: '網路接收數據速率',
  'cpu usage': 'CPU 使用量',
  'memory utilisation (including cache)': '記憶體使用率 ( 包含快取 )',
  MEMORY_USAGE_CACHE: 'Memory usage (including caches)',
  'memory usage': '記憶體使用量',
  UNAVAILABLE_REPLICAS: '副本不可用率',
  'Unavailable deployment replicas ratio': '部署副本不可用率',
  'Unavailable daemonset replicas ratio': '守護進程集副本不可用率',
  'Unavailable statefulset replicas ratio': '有狀態集副本不可用率',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'How are alerting messages generated?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    'You need to set an alerting policy for a resource. Alerting messages will be generated when the metric configured in the alerting policy reaches a threshold.',
  REQUESTS_FOR_PUSH_AN_ALARM_Q: '告警策略訊息推送的前提條件？',
  REQUESTS_FOR_PUSH_AN_ALARM_A:
    'The platform administrator needs to select a notification method and configure the server corresponding to the method.',
  HOW_TO_SUPRESS_AN_ALARM_Q: '如何對告警訊息進行抑制？',
  HOW_TO_SUPRESS_AN_ALARM_A:
    'You can set alerting policies at different levels. Each level corresponds to an alerting interval.',

  ALERT_DURATION:
    'An alert is firing when the threshold duration reaches the preset value.',
  ALERT_RULE_INACTIVE: '未觸發',
  ALERT_RULE_PENDING: '待觸發',
  ALERT_RULE_FIRING: '觸發中',
  ALERT_RULE_HEALTH_OK: '健康',
  ALERT_RULE_HEALTH_ERR: '錯誤',
  ALERT_RULE_HEALTH_UNKNOWN: '未知',

  ALERT_RULE_EXPRESSION_DESC:
    'You can define a custom rule using PromQL statements. <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">Learn More</a>',

  // Alerting Messages
  ALERTING_MESSAGE_PL: 'Alerting Messages',
  NO_DATA_DESC: 'No Data Found',
  MONITORING_TARGET: 'Monitoring Target',

  // Alerting Policies
  ALERTING_POLICIES: 'Alerting Policies',
  MESSAGE_SETTINGS: 'Message Settings',
  DEPLOYMENT: 'Deployment',
  DEPLOYMENT_PL: 'Deployments',
  STATEFULSET: 'StatefulSet',
  STATEFULSET_PL: 'StatefulSets',
  DAEMONSET: 'DaemonSet',
  DAEMONSET_PL: 'DaemonSets',
  DEPLOYMENTS_VALUE: 'Deployments: {value}',
  STATEFULSETS_VALUE: 'StatefulSets: {value}',
  DAEMONSETS_VALUE: 'DaemonSets: {value}',

  // Alerting Policies > Details
  NOTIFICATION_SUMMARY_COLON: 'Summary: ',
  DETAILS_COLON: 'Details: ',
  MONITORING_TARGETS_SCAP: 'Monitoring targets',
  ALERTING_RULE_SCAP: 'Alerting rule',
  THRESHOLD_DURATION: 'Threshold Duration',
}
