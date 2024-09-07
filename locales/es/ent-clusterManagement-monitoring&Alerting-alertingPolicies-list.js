/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // List
  POLICY_STATUS: 'Policy Status',
  RULE_STATUS: 'Rule Status',
  TIME_SPENT: 'Time Spent',
  RECENT_DETECT_TIME: 'Recent detection time',
  EDIT_RULES: 'Edit Rules',
  DISABLE_ALERTING_POLICY: 'Disable Alerting Policy',
  ENABLE_ALERTING_POLICY: 'Enable Alerting Policy',
  DISABLE_ALARM_TIP:
    'After the alerting policy is disabled, the system will stop generating alerting messages for the monitored resources. Exercise caution when performing this operation.',
  RESET: 'Reset',
  RESET_ALERTING_POLICY_DESC: 'Are you sure you want to reset the alerting policy?',
  RESET_MULTIPLE_ALERTING_POLICIES_DESC:
    'Are you sure you want to reset the alerting policies {name}?',
  RESET_SUCCESSFUL: 'Reset successful',
  // List > Create > Basic Information
  CHECK_INTERVAL: 'Check Interval',
  ALERTING_POLICY_CHECK_INTERVAL_DESC: 'Set the interval between metric checks.',
  // List > Create > Rule Settings > Rule List
  Rule: 'Rule',
  ADD_ALERTING_RULE: 'Add alerting rule',
  ADD_ALERTING_RULE_DESC: 'Add at least one alert rule to the alert policy',
  DURATION_REQUIRED: 'Please set the duration.',
  OPERATOR_REQUIRED: 'Please set the expression operator.',
  LASTING_MINUTES: 'Lasting {minutes} minutes',
  CUSTOM_RULE_NAME_DESC: 'The rule name can contain any character up to 63 characters.',
  // List > Create > Rule Settings > Rule Template
  CONDITION: 'Condition',
  MESSAGE_SUMMARY: 'Alerting message summary',
  MESSAGE_SUMMARY_DESC:
    'The message summary can contain any number of characters, up to 63 characters.',
  MESSAGE_DETAILS: 'Details',
  MESSAGE_DETAILS_DESC:
    'The message details can contain any characters. The maximum length is 63 characters.',
};
