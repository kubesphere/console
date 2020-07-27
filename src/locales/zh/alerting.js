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
  Message: '消息',
  receiver: '通知人',
  Receiver: '通知人',
  'Alerting Detail': '告警详情',
  'Alerting Number': '告警数量',
  'Alerting Message': '告警消息',
  'Alerting Messages': '告警消息',
  'triggered alerting messages': '触发的告警消息',
  'alerting policy': '告警策略',
  'Alerting Policy': '告警策略',
  'Alerting Policies': '告警策略',
  'Alerting History': '告警历史',
  'alerting rule': '告警规则',
  'Alerting Rule': '告警规则',
  'Alerting Rules': '告警规则',
  'Alerting Level': '告警等级',
  'Alerting Status': '告警状态',
  'Alerting Type': '告警类型',
  'Alerting Time': '告警时间',
  'Recovery Time': '恢复时间',
  'Notification Rule': '通知规则',
  'Notification Rules': '通知规则',
  'Notification Channel': '通知渠道',
  'Recent Notification': '最近通知',
  'Notification List': '通知列表',
  'Sending Rules': '发送规则',
  'monitoring target': '监控目标',
  'Monitoring Target': '监控目标',
  'Monitoring Target Count': '监控目标数量',
  'Monitoring Rules': '监控规则',

  Rule: '规则',
  'Add Rule': '添加规则',
  'Edit Rule': '编辑规则',
  'Rule Name': '规则名称',
  'Repeat Rule': '重复规则',
  'Add Policy': '添加策略',
  'View Details': '查看详情',
  'Alert Occurred': '发生告警',
  'Recent Alert Time': '最近告警',
  'Please add at least one rule': '请至少添加一个告警规则',
  'Please input the threshold': '请输入阈值',
  'Please input a monitoring target to find': '请输入监控目标名称进行查找',
  critical: '危险',
  Critical: '危险',
  'Critical Alert': '危险告警',
  major: '重要',
  Major: '重要',
  'Major Alert': '重要告警',
  minor: '一般',
  Minor: '一般',
  'Minor Alert': '一般告警',
  cleared: '已恢复',
  Cleared: '已恢复',

  triggered: '待解决',
  Triggered: '待解决',
  resumed: '已恢复',
  Resumed: '已恢复',
  sent_success: '发送成功',
  'Sented Successfully': '发送成功',
  sent_failed: '发送失败',
  'Sented Failed': '发送失败',
  commented: '已处理',
  Commented: '已处理',

  'Node Role': '节点角色',
  'Cluster Nodes': '集群节点',
  'Service Components': '服务组件',
  'Service Count': '服务数量',
  'Service Status': '服务状态',

  Period: '周期',
  'Consecutive Count': '连续次数',
  Condition: '条件',
  Threshold: '阈值',

  ALERT_TYPE: '{type}告警',
  ALERT_POLICY_TYPE: '{type}告警策略',
  ALERT_POLICY_DESC: '设置告警规则',
  ALERT_MESSAGE_DESC:
    '告警消息记录了在工作负载级别的告警策略中，所有已发出的满足告警规则的告警信息。',
  ALERT_POLICY_TRIGGER_RULE: '触发规则: 满足以下任意条件',
  ALERT_METRIC_NAME: '监控项',
  ALERT_COMMENT: '处理意见',
  ALERT_COMMENT_DESC:
    '处理意见将作为告警处理的记录保留，但并不能作为处理告警的方法。记录信息将给相关用户查看该告警的处理情况。',
  ALERTING_POLICY_CREATE_DESC: '您可以通过设置告警规则，及时发现资源的异常情况',
  'ALERTING-POLICY_BASEINFO_DESC': '设置告警策略的基础信息',
  'ALERTING-POLICY_MONITORING-TARGET_DESC': '选择告警策略的监控目标',
  'ALERTING-POLICY_ALERTING-RULE_DESC': '设置告警规则',
  'ALERTING-POLICY_NOTIFICATION-RULE_DESC': '设置通知规则',
  TOTAL_POLICIES: '共计 {num} 个告警策略',

  PERIOD_OPTIONS: '{value} 分钟/周期',
  CONSECUTIVE_OPTIONS: '连续 {value} 次',

  MAX_SEND_NOT_LIMIT: '不限制',
  MAX_SEND_COUNT: '最多重发{count}次',
  REPEAT_CUSTOM_TITLE: '自定义重复规则',
  REPEAT_CUSTOM_DESC:
    '告警规则将根据危险程度进行重复推送，如果未进行修改将按默认策略执行',
  REPEAT_INTERVAL_NOT_REPEAT: '不重复',
  REPEAT_INTERVAL_MINUTE: '每 {num} 分钟警告一次',
  REPEAT_INTERVAL_HOUR: '每 {num} 小时警告一次',
  REPEAT_INTERVAL_DAY: '每 {num} 天警告一次',
  REPEAT_INTERVAL_EXP: '指数周期递增',
  REPEAT_RULE_EXP_TIP:
    '周期指数递增通知: 告警持续时长到达告警统计周期的1，2，4，8，16，32...倍时发送告警通知',
  REPEAT_RULE_TIPS:
    '告警规则将根据危险程度进行重复推送，默认 <strong>危险告警 30分钟重复一次</strong> / <strong>重要告警 2小时重复一次</strong> / <strong>一般告警 不重复</strong>；<br> 如需修改，请在通知规则中进行自定义设置',

  NOTIFY_TIME_LABEL: '通知有效时间',
  NOTIFY_TIME_TIP: '可以设置一个告警推送的有效时间范围',
  NOTIFY_LIST_ADD_TIP: '按下确认键或点击添加',
  NOTIFY_LIST_INPUT_ERRPR_TIP: '输入格式有误，请输入正确的邮箱地址',
  NOTIFY_LIST_INPUT_PLACEHOLDER: '输入用户名查找通知的成员',
  NOTIFY_CURRENT_COUNT: '当前第 {count} 次通知',
  RESOURCE_SELECTOR_FORM_TIP: '请填写标签选择器',
  RESOURCE_NODE_FORM_TIP: '请选择集群节点',
  RESOURCE_WORKLOAD_FORM_TIP: '请选择工作负载',
  SEVERITY_MSG_FIXED_MINUTES: '每 {count} 分钟通知一次',
  SEVERITY_MSG_NO_LIMIT: '不限制',
  SEVERITY_MSG_EXP: '指数周期通知',
  SEVERITY_MSG_NOT_REPEAT: '不重复通知',
  ALERT_RULE_STATUS_OCCURRED: '正在告警',
  ALERT_RULE_STATUS_NO_OCCURRED: '未告警',
  SENT_RULE_TIME_TITLE: '有效时间段',
  SENT_RULE_CHANNEL_TITLE: '推送渠道',

  load1: 'CPU 1分钟平均负载',
  load5: 'CPU 5分钟平均负载',
  load15: 'CPU 15分钟平均负载',
  'pod abnormal ratio': '容器组异常率',
  'pod utilization rate': '容器组利用率',
  'cpu utilization rate': 'CPU 利用率',
  'memory available': '可用内存',
  'memory utilization rate': '内存利用率',
  'disk space available': '本地磁盘可用空间',
  'local disk space utilization rate': '本地磁盘空间利用率',
  'inode utilization rate': 'inode利用率',
  'disk read iops': '本地磁盘读取IOPS',
  'disk write iops': '本地磁盘写入IOPS',
  'disk read throughput': '本地磁盘读取吞吐量',
  'disk write throughput': '本地磁盘写入吞吐量',
  'network data transmitting rate': '网络发送数据速率',
  'network data receiving rate': '网络接收数据速率',
  'cpu usage': 'CPU用量',
  'memory utilisation (including cache)': '内存使用率(包含缓存)',
  'memory usage (including cache)': '内存用量(包含缓存)',
  'memory usage': '内存用量',
  'Unavailable deployment replicas ratio': '部署副本不可用率',
  'Unavailable daemonset replicas ratio': '守护进程集副本不可用率',
  'Unavailable statefulset replicas ratio': '有状态副本集副本不可用率',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: '触发告警消息的前提条件?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    '需要对资源设置告警策略，当资源某项指标达到了告警策略的阈值后即会触发并推送消息。',
  REQUESTS_FOR_PUSH_AN_ALARM_Q: '告警策略消息推送的前提条件?',
  REQUESTS_FOR_PUSH_AN_ALARM_A: '需要平台管理员设置邮件服务器。',
  HOW_TO_SUPRESS_AN_ALARM_Q: '如何对告警消息进行抑制?',
  HOW_TO_SUPRESS_AN_ALARM_A:
    '可以对每条告警策略进行多级别的设置，每个级别对应不同的告警周期及重复周期',

  PROJECT_MONITOR_TARGET_TIPS: '一个告警策略只能指定一种资源类型',

  RULE_NAME_DESC:
    '规则名可以由任意字符组成，帮助您更好的区分资源，并支持中文名称',
}
