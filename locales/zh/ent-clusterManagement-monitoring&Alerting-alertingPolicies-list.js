/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // List
  POLICY_STATUS: '策略状态',
  RULE_STATUS: '规则状态',
  TIME_SPENT: '耗时',
  RECENT_DETECT_TIME: '最近检查',
  EDIT_RULES: '编辑规则',
  DISABLE_ALERTING_POLICY: '禁用告警策略',
  ENABLE_ALERTING_POLICY: '启用告警策略',
  DISABLE_ALARM_TIP:
    'After the alerting policy is disabled, the system will stop generating alerting messages for the monitored resources. Exercise caution when performing this operation.',
  RESET: '重置',
  RESET_ALERTING_POLICY_DESC: '您确定重置告警策略吗?',
  RESET_MULTIPLE_ALERTING_POLICIES_DESC: '您确定重置告警策略 {name} 吗?',
  RESET_SUCCESSFUL: '重置成功。',
  // List > Create > Basic Information
  CHECK_INTERVAL: '检查间隔',
  ALERTING_POLICY_CHECK_INTERVAL_DESC: '设置指标检查的时间间隔。',
  // List > Create > Rule Settings > Rule List
  Rule: '规则',
  ADD_ALERTING_RULE: '添加告警规则',
  ADD_ALERTING_RULE_DESC: '为告警策略添加告警规则。',
  DURATION_REQUIRED: '请设置持续时间。',
  OPERATOR_REQUIRED: '请设置表达式操作符。',
  LASTING_MINUTES: '{minutes, plural, =1 {1 分钟} other {# 分钟}}',
  CUSTOM_RULE_NAME_DESC: '规则名称可包含任意字符，最长 63 个字符。',
  // List > Create > Rule Settings > Rule Template
  CONDITION: '条件',
  MESSAGE_SUMMARY: '概括',
  MESSAGE_SUMMARY_DESC: '消息概括可包含任意字符，最长 63 个字符。',
  MESSAGE_DETAILS: '详情',
  MESSAGE_DETAILS_DESC:
    'The message details can contain any characters. The maximum length is 63 characters.',
};
