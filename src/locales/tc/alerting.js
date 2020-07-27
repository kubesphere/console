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

export default {
  Alerting: '告警',
  Message: '訊息',
  receiver: '通知人',
  Receiver: '通知人',
  'Alerting Detail': '告警詳情',
  'Alerting Number': '告警數量',
  'Alerting Message': '告警訊息',
  'Alerting Messages': '告警訊息',
  'triggered alerting messages': '觸發的告警訊息',
  'alerting policy': '告警策略',
  'Alerting Policy': '告警策略',
  'Alerting Policies': '告警策略',
  'Alerting History': '告警歷史',
  'alerting rule': '告警規則',
  'Alerting Rule': '告警規則',
  'Alerting Rules': '告警規則',
  'Alerting Level': '告警等級',
  'Alerting Status': '告警狀態',
  'Alerting Type': '告警類型',
  'Alerting Time': '告警時間',
  'Recovery Time': '復原時間',
  'Notification Rule': '通知規則',
  'Notification Rules': '通知規則',
  'Notification Channel': '通知頻道',
  'Recent Notification': '最近通知',
  'Notification List': '通知列表',
  'Sending Rules': '發送規則',
  'monitoring target': '監控目標',
  'Monitoring Target': '監控目標',
  'Monitoring Target Count': '監控目標數量',
  'Monitoring Rules': '監控規則',

  Rule: '規則',
  'Add Rule': '添加規則',
  'Edit Rule': '編輯規則',
  'Rule Name': '規則名稱',
  'Repeat Rule': '重復規則',
  'Add Policy': '添加策略',
  'View Details': '查看詳情',
  'Alert Occurred': '發生告警',
  'Recent Alert Time': '最近告警',
  'Please add at least one rule': '請至少添加一個告警規則',
  'Please input the threshold': '請輸入臨界值',
  'Please input a monitoring target to find': '請輸入監控目標名稱進行尋找',
  critical: '危險',
  Critical: '危險',
  'Critical Alert': '危險告警',
  major: '重要',
  Major: '重要',
  'Major Alert': '重要告警',
  minor: '一般',
  Minor: '一般',
  'Minor Alert': '一般告警',
  cleared: '已清除',
  Cleared: '已清除',

  triggered: '待解決',
  Triggered: '待解決',
  resumed: '已恢復',
  Resumed: '已恢復',
  sent_success: '發送成功',
  'Sented Successfully': '發送成功',
  sent_failed: '發送失敗',
  'Sented Failed': '發送失敗',
  commented: '已處理',
  Commented: '已處理',

  'Node Role': '節點角色',
  'Cluster Nodes': '集群節點',
  'Service Components': '服務組件',
  'Service Count': '服務數量',
  'Service Status': '服務狀態',

  Period: '週期',
  'Consecutive Count': '連續次數',
  Condition: '條件',
  Threshold: '臨界值',

  ALERT_TYPE: '{type}告警',
  ALERT_POLICY_TYPE: '{type}告警策略',
  ALERT_POLICY_DESC: '設置告警規則',
  ALERT_MESSAGE_DESC:
    '告警訊息紀錄了在工作負載級别的告警策略中，所有已發出的滿足告警規則的告警訊息。',
  ALERT_POLICY_TRIGGER_RULE: '觸發規則: 滿足以下任意條件',
  ALERT_METRIC_NAME: '告警指標名稱',
  ALERT_COMMENT: '處理意見',
  ALERT_COMMENT_DESC:
    '處理意見將作為告警處理的紀錄保留，但並不能作為處理告警的方法。紀錄訊息將給相關用戶查看該告警的處理情況。',
  ALERTING_POLICY_CREATE_DESC: '您可以通過設置告警規則，即時發現資源的異常情況',
  'ALERTING-POLICY_BASEINFO_DESC': '設置告警策略的基礎資訊',
  'ALERTING-POLICY_MONITORING-TARGET_DESC': '選擇告警策略的監控目標',
  'ALERTING-POLICY_ALERTING-RULE_DESC': '設置告警規則',
  'ALERTING-POLICY_NOTIFICATION-RULE_DESC': '設置通知規則',
  TOTAL_POLICIES: '共計 {num} 個告警策略',

  PERIOD_OPTIONS: '{value} 分鐘/週期',
  CONSECUTIVE_OPTIONS: '連續 {value} 次',

  MAX_SEND_NOT_LIMIT: '不限制',
  MAX_SEND_COUNT: '最多重發{count}次',
  REPEAT_CUSTOM_TITLE: '自定義重復規則',
  REPEAT_CUSTOM_DESC:
    '告警規則將根據危險程度進行重復推送，如果未進行修改將會按照預設策略運行',
  REPEAT_INTERVAL_NOT_REPEAT: '不重復',
  REPEAT_INTERVAL_MINUTE: '每 {num} 分鐘警告一次',
  REPEAT_INTERVAL_HOUR: '每 {num} 小時警告一次',
  REPEAT_INTERVAL_DAY: '每 {num} 天警告一次',
  REPEAT_INTERVAL_EXP: '指數週期遞增',
  REPEAT_RULE_EXP_TIP:
    '週期指數遞增通知: 告警持續時間長達到告警統計週期的1，2，4，8，16，32...倍時發送告警通知',
  REPEAT_RULE_TIPS:
    '告警規則將根據危險程度進行重復推送，預設 <strong>危險告警 30分鐘重復一次</strong> / <strong>重要告警 2小時重復一次</strong> / <strong>一般告警 不重復</strong>；<br> 如需要修改，請在通知規則中進行自定義設置',

  NOTIFY_TIME_LABEL: '通知有效時間',
  NOTIFY_TIME_TIP: '可以設置一個告警推送的有效時間範圍',
  NOTIFY_LIST_ADD_TIP: '按下確認鍵或點擊添加',
  NOTIFY_LIST_INPUT_ERRPR_TIP: '輸入格式有誤，請輸入正確的郵件地址',
  NOTIFY_LIST_INPUT_PLACEHOLDER: '輸入郵件地址尋找通知的成員',
  NOTIFY_CURRENT_COUNT: '當前第 {count} 次通知',
  RESOURCE_SELECTOR_FORM_TIP: '請填寫標簽選擇器',
  RESOURCE_NODE_FORM_TIP: '請選擇集群節點',
  RESOURCE_WORKLOAD_FORM_TIP: '請選擇工作負載',
  SEVERITY_MSG_FIXED_MINUTES: '每 {count} 分鐘通知一次',
  SEVERITY_MSG_NO_LIMIT: '不限制',
  SEVERITY_MSG_EXP: '指數週期通知',
  SEVERITY_MSG_NOT_REPEAT: '不重復通知',
  ALERT_RULE_STATUS_OCCURRED: '正在告警',
  ALERT_RULE_STATUS_NO_OCCURRED: '未告警',
  SENT_RULE_TIME_TITLE: '有效時間週期',
  SENT_RULE_CHANNEL_TITLE: '推送頻道',

  load1: 'CPU 1分鐘平均負載',
  load5: 'CPU 5分鐘平均負載',
  load15: 'CPU 15分鐘平均負載',
  'pod abnormal ratio': '容器組異常率',
  'pod utilization rate': '容器組利用率',
  'cpu utilization rate': 'CPU 利用率',
  'memory available': '可用記憶體',
  'memory utilization rate': '記憶體利用率',
  'disk space available': '本地硬碟可用空間',
  'local disk space utilization rate': '本地硬碟空間利用率',
  'inode utilization rate': 'inode利用率',
  'disk read iops': '本地硬碟讀取IOPS',
  'disk write iops': '本地硬碟寫入IOPS',
  'disk read throughput': '本地硬碟讀取吞吐量',
  'disk write throughput': '本地硬碟寫入吞吐量',
  'network data transmitting rate': '網路發送數據速率',
  'network data receiving rate': '網路接收數據速率',
  'cpu usage': 'CPU使用量',
  'memory utilisation (including cache)': '記憶體使用率(包含快取)',
  'memory usage (including cache)': '記憶體使用量(包含快取)',
  'memory usage': '記憶體使用量',
  'Unavailable deployment replicas ratio': '部署副本不可用率',
  'Unavailable daemonset replicas ratio': '守護進程集副本不可用率',
  'Unavailable statefulset replicas ratio': '有狀態集副本不可用率',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: '觸發告警訊息的前提條件?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    '需要對資源設置告警策略，當資源某項指標達到了告警策略的臨界值後即會觸發並推送訊息。',
  REQUESTS_FOR_PUSH_AN_ALARM_Q: '告警策略訊息推送的前提條件?',
  REQUESTS_FOR_PUSH_AN_ALARM_A: '需要平台管理員設置郵件伺服器。',
  HOW_TO_SUPRESS_AN_ALARM_Q: '如何對告警訊息進行抑制?',
  HOW_TO_SUPRESS_AN_ALARM_A:
    '可以對每條告警策略進行多級别的設置，每个級别對應不同的告警週期及重復週期',

  PROJECT_MONITOR_TARGET_TIPS: '一個告警策略只能指定一種資源類型',

  RULE_NAME_DESC:
    '規則名稱可以由任意字元組成，幫助您更好的區分資源，並支持中文名稱',
}
