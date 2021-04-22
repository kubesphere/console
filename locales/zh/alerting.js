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
  Message: '消息',
  Summary: '标题',
  'Alerting Detail': '告警详情',
  'Alerting Message': '告警消息',
  'Alerting Messages': '告警消息',
  'Alerting Monitoring': '告警监控',
  'alerting policy': '告警策略',
  'Alerting Policy': '告警策略',
  'Alerting Policies': '告警策略',
  'Alerting History': '告警历史',
  'alerting rule': '告警规则',
  'Alerting Rule': '告警规则',
  'Alerting Rules': '告警规则',
  'Alerting Status': '告警状态',
  'Alerting Type': '告警级别',
  'Alerting Duration': '告警持续时间',
  'Notification Settings': '通知设置',
  'monitoring target': '监控目标',
  'Monitoring Target': '监控目标',
  'Monitoring Rules': '监控规则',
  'Alerting Resource': '告警资源',

  Rule: '规则',
  'Add Rule': '添加规则',
  'Edit Rule': '编辑规则',
  'Rule Name': '规则名称',
  'View Details': '查看详情',
  'Alert Active Time': '告警激活时间',
  'Please add at least one rule': '请至少添加一个告警规则',
  'Please input the threshold': '请输入阈值',
  'Critical Alert': '危险告警',
  'Error Alert': '重要告警',
  'Warning Alert': '一般告警',

  Condition: '条件',
  Threshold: '阈值',

  'Rule Templates': '规则模板',
  'Custom Rule': '自定义规则',
  'Rule Expression': '告警规则表达式',

  'Please input the rule expression': '请输入告警规则表达式',

  'Notification Content': '通知内容',

  'Custom Policies': '自定义策略',
  'Built-In Policies': '内置策略',

  ALERT_TYPE: '{type}告警',
  ALERT_POLICY_DESC: '设置告警规则',
  ALERT_MESSAGE_DESC:
    '告警消息记录了在工作负载级别的告警策略中，所有已发出的满足告警规则的告警信息。',

  ALERTING_POLICY_CREATE_DESC: '您可以通过设置告警规则，即时发现资源的异常情况',

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
  'Unavailable replicas ratio': '副本不可用率',
  'Unavailable deployment replicas ratio': '部署副本不可用率',
  'Unavailable daemonset replicas ratio': '守护进程集副本不可用率',
  'Unavailable statefulset replicas ratio': '有状态副本集副本不可用率',

  RESOURCE_NODE_FORM_TIP: '请选择集群节点',
  RESOURCE_WORKLOAD_FORM_TIP: '请选择工作负载',

  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: '触发告警消息的前提条件?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A:
    '需要对资源设置告警策略，当资源某项指标达到了告警策略的阈值后即会触发并推送消息。',
  REQUESTS_FOR_PUSH_AN_ALARM_Q: '告警策略消息推送的前提条件?',
  REQUESTS_FOR_PUSH_AN_ALARM_A:
    '平台管理员需要选择告警通知的方式并配置对应的服务器。',
  HOW_TO_SUPRESS_AN_ALARM_Q: '如何对告警消息进行抑制?',
  HOW_TO_SUPRESS_AN_ALARM_A:
    '可以对每条告警策略进行多级别的设置，每个级别对应不同的告警周期及重复周期',

  ALERTING_DURATION: '监控目标满足告警条件的时间达到告警持续时间后，将触发告警',
  ALERT_RULE_INACTIVE: '未触发',
  ALERT_RULE_PENDING: '待触发',
  ALERT_RULE_FIRING: '触发中',
  ALERT_RULE_HEALTH_OK: '健康',
  ALERT_RULE_HEALTH_ERR: '错误',
  ALERT_RULE_HEALTH_UNKNOWN: '未知',

  ALERT_RULE_EXPRESSION_DESC:
    '告警规则可以通过 PromQL 语句来自定义，PromQL 相关语法请参考 <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">Prometheus Querying</a>',
}
