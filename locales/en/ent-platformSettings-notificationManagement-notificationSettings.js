/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Navigation pane
  NOTIFICATION_SUBSCRIPTION: 'Notification Subscription',
  NOTIFICATION_SETTINGS: 'Notification Settings',
  // Silence Policies
  SILENCE_POLICY: 'Silence Policy',
  SILENCE_POLICY_LOW: 'silence policy',
  SILENCE_POLICY_PL: 'Silence Policies',
  SILENCE_POLICY_DESC: 'Set the system not to send notifications under certain circumstances.',
  SILENCE_TIME: 'Silence Time',
  CONTINUOUS_SILENCE: 'Silent continuously',
  PERIODIC_SILENCE: 'Silent periodically',
  SPECIFIC_TIME_RANGE_SILENCE: 'Silent during time range',
  CUSTOM_SILENCE: 'Silent based on cron expression',
  SILENCE_CONDITIONS: 'Silence Conditions',
  ALL_SILENT_NOTIFICATIONS: 'Silent for all notifications',
  CUSTOM_SILENT_NOTIFICATIONS: 'Custom silence conditions',
  EDIT_SILENCE_CONDITIONS: 'Edit Silence Conditions',
  EDIT_SILENCE_TIME: 'Edit Silence Time',
  CREATE_SILENCE_POLICY_SUCCESSFULLY: 'Created successfully.',
  EDIT_SILENCE_POLICY_SUCCESSFULLY: 'Updated successfully.',
  // Silence Policies > Create > Silence Conditions
  CREATE_SILENCE_POLICY: 'Create Silence Policy',
  ALL_SILENT_NOTIFICATIONS_TCAP: 'Silent for All Notifications',
  ALL_SILENT_NOTIFICATIONS_DESC: 'The silence policy applies to all notifications.',
  CUSTOM_SILENT_NOTIFICATIONS_TCAP: 'Custom Silence Conditions',
  CUSTOM_SILENT_NOTIFICATIONS_DESC:
    'The silence policy applies only to notifications that meet specified conditions.',
  INVALID_SILENCE_CONDITION: 'Please set a correct silence condition.',
  // Silence Policies > Create > Silence Time
  SILENT_TEMPLATE: 'Template',
  SILENCE_TIME_TYPE_DESC:
    'Notifications that meet the silence conditions will be silenced during the specified time range.',
  SILENT_CRON: 'Cron Expression',
  SILENCE_TIME_RANGE_EMPTY_DESC:
    'Please set the time range during which notifications are silenced.',
  SELECT_START_TIME_AND_END_TIME:
    'Select the start time and end time during which notifications are silenced.',
  SILENCE_DATE: 'Date',
  SELECT_DATE: 'Please select a date.',
  SILENCE_EVERY_DAY: 'Every day',
  SILENCE_EVERY_WEEK: 'Every week',
  SILENCE_EVERY_MONTH: 'Every month',
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
  DAY: 'day',
  HOUR: 'Hour',
  MINUTE: 'Minute',
  SECOND: 'Second',
  CRON_EXPRESSION: 'Cron Expression',
  CRON_EXPRESSION_DESC: 'Enter a cron expression to specify the silence period.',
  CRON_EXPRESSION_REQUIRE_DESC: 'Please enter a cron expression.',
  CRON_EXPRESSION_ERROR_DESC: 'Invalid cron expression. Please enter a valid cron expression.',
  // Silence Policies > Details > Silence Time
  EVERY_DAY_TIMERANGE: 'Every day: {timeRange}',
  EVERY_WEEK_DAYS_TIMERANGE: 'Every week: {days} [{timeRange}]',
  EVERY_MONTH_DAYS_TIMERANGE: 'Every month: {days} [{timeRange}]',
  // Notification Languages
  NOTIFICATION_LANGUAGE: 'Notification Language',
  NOTIFICATION_LANGUAGE_DESC:
    'Set the language of keys in notifications. Notifications are provided as key-value pairs.',
  NOTIFICATION_SIMPLIFIED_CHINESE_DESC: 'Use simplified Chinese keys in notifications.',
  NOTIFICATION_ENGLISH_DESC: 'Use English keys in notifications.',
  NOTIFICATION_LANGUAGE_CHANGE_SUCCESS: 'Changed successfully.',
};
