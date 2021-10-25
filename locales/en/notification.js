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
  NOTIFICATION_MANAGEMENT: 'Notification Management',
  'Notification Management': 'Notification Management',
  NOTIFICATION_CONFIGURATION: 'Notification Configuration',
  'Notification Configuration': 'Notification Configuration',
  SERVER_SETTINGS: 'Server Settings',
  RECIPIENT_SETTINGS: 'Recipient Settings',
  'Receive Notification': 'Receive Notifications',
  NOTIFICATION_CONFIGURATION_DESC:
    'KubeSphere supports notification configuration for multiple notification channels. You can set servers and recipients, and enable or disable notifications.',

  'Notification On': 'Notification On',
  'Notification Off': 'Notification Off',

  NOTIFICATION_CONDITIONS: 'Notification Conditions',
  NOTIFICATION_CONDITION_SETTING_TIP:
    'Operators <strong>Includes values</strong> and <b>Does not include values</b> require one or more label values. Use a carriage return to separate values.</br>Operators <b>Exists</b> and <b>Does Not Exist</b> determine whether a label exists, and do not require a label value.',
  NOTIFICATION_CONDITION_SETTINGS_DESC:
    'You will receive only notifications that meet the conditions.',
  INCLUDES_VALUES: 'Includes values',
  DOES_NOT_INCLUDE_VALUES: 'Does not include values',
  EXISTS: 'Exists',
  DOES_NOT_EXIST: 'Does not exist',
  'Please select a tag': 'Please select a tag',
  'Please select a regex filter': 'Please select a regex filter',
  'Invalid notification condition': 'Invalid notification condition',
  TAG_INPUT_PLACEHOLDER: 'Please enter the value and press Enter to confirm',
  INVALID_NOTIFICATION_CONDITION:
    'Please enter a correct notification condition.',

  SEND_TEST_MESSAGE: 'Send Test Message',
  SEND_TEST_MESSAGE_DESC:
    'After the configurations are complete, you can send a test message for verification.',
  SEND_TEST_MESSAGE_SUCCESS_DESC:
    'Verified successfully. A test message has been sent to you , please check it out.',

  Mail: 'Email',
  SMTP_SERVER_ADDRESS: 'SMTP Server Address',
  USE_SSL_SECURE_CONNECTION: 'Use SSL secure connection',

  MAIL_SETTING_DESC:
    'You can receive email notifications from the platform after configuring the outgoing mail server.',
  SENDER_MAIL: 'Sender Email Address',
  MAIL_DESC:
    'Configure email notifications by setting a server and recipients.',
  SENDER_EMAIL: 'Sender Email Address',
  MAIL_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Your current email settings have changed. Please save the settings or cancel the changes.',

  'Please enter an email address': 'Please enter an email address',
  'This email address has existed': 'This email address has existed',
  INVALID_ADDRESS_DESC: 'Please enter a valid address.',
  INVALID_EMAIL: 'Invalid email address format.',
  'Please add the recipient email address':
    'Please add the recipient email address',
  MAX_EAMIL_COUNT: 'You can add a maximum of {count} emails.',

  DingTalk: 'DingTalk',
  CONVERSATION_SETTINGS: 'Conversation Settings',
  CONVERSATION_ID: 'Conversation ID',
  CHATBOT_SETTINGS: 'DingTalk Chatbot',
  keywords: 'Keywords',
  KEYWORDS_LIST: 'Keyword List',
  CONVERSATION_ID_TIP:
    'The conversation ID can only be obtained after it is configured by the system administrator. To configure the conversation ID, Please contact the system administrator.',

  'Please enter a conversation ID': 'Please enter a conversation ID',
  'Please enter a keyword': 'Please enter a keyword',
  'This conversation ID has existed': 'This conversation ID has existed',
  'This keyword has existed': 'This keyword has existed',
  DINGTALK_SETTING_TIP: 'Please set up a conversation or group chatbot',
  DINGTALK_CHATBOT_SECURITY_TIP: 'Please enter a secret or keywords',

  DINGTALK_SETTING_DESC:
    'You can receive DingTalk notifications from the platform after configuring the DingTalk server.',
  ENTER_CONVERSATION_ID_DESC: 'Please enter a conversation ID.',
  ENTER_KEYWORD_DESC: 'Please enter a keyword.',
  CONVERSATION_ID_EXISTS:
    'The conversation ID already exists. Please add another conversation ID.',
  KEYWORD_EXISTS: 'The keyword already exists. Please add another keyword.',
  MAX_CID_COUNT: 'You can add a maximum of {count} conversation IDs.',
  MAX_KEYWORD_COUNT: 'You can add a maximum of {count} keywords.',
  EMPTY_KEYWORDS_DESC: 'No keyword is added.',

  DINGTALK_DESC:
    'Configure DingTalk notifications by setting a conversation or chatbot.',
  DINGTALK_KEYWORDS_DESC:
    'Separate multiple customized Chatbot keywords with commas.',
  DINGTALK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Your current DingTalk settings have changed. Please save the settings or cancel the changes.',

  WeCom: 'WeCom',
  WECOM_CORP_ID: 'Corporation ID',
  WECOM_AGENT_ID: 'App AgentId',
  WECOM_SECRET: 'App Secret',
  USER_ID: 'User ID',
  DEPARTMENT_ID: 'Department ID',
  TAG_ID: 'Tag ID',
  TOUSER_LIST: 'Added User IDs',
  TOPARTY_LIST: 'Added Department IDs',
  TOTAG_LIST: 'Added Tag IDs',
  WECOM_TOUSER_PLACEHOLDER: 'User ID',
  WECOM_TOPARTY_PLACEHOLDER: 'Department ID',
  WECOM_TOTAG_PLACEHOLDER: 'Tag ID',
  RECIPIENT_SETTINGS_TIP:
    'At least one item needs to be configured to receive notifications.',
  EMPTY_TOUSER_DESC: 'No user ID is added.',
  EMPTY_TOPARTY_DESC: 'No department ID is added.',
  EMPTY_TOTAG_DESC: 'No tag ID is added.',

  ENTER_WECOM_CORP_ID_DESC: 'Please enter a corporation ID.',
  ENTER_WECOM_AGENT_ID_DESC: 'Please enter an applicaiton AgentId.',
  ENTER_WECOM_SECRET_DESC: 'Please enter an application Secret.',
  ENTER_TOUSER_TIP: 'Please enter a user ID.',
  ENTER_TOPARTY_TIP: 'Please enter a department ID.',
  ENTER_TOTAG_TIP: 'Please enter a tag ID.',
  TOUSER_EXISTS: 'The user ID already exists. Please enter another user ID.',
  TOPARTY_EXISTS:
    'The department ID already exists. Please enter another department ID.',
  TOTAG_EXISTS: 'The tag ID already exists. Please enter another tag ID.',
  MAX_TOUSER_COUNT: 'You can add a maximum of {count} users.',
  MAX_TOPARTY_COUNT: 'You can add a maximum of {count} departments.',
  MAX_TOTAG_COUNT: 'You can add up to {count} tags.',

  WECOM_DESC:
    'Configure WeCom notifications by setting a server and recipients.',
  WECOM_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Your current WeCom settings have changed. Please save the settings or cancel the changes.',

  Channel: 'Channel',
  CHANNEL_SETTINGS: 'Channel Settings',
  ADDED_CHANNELS: 'Added Channels',
  EMPTY_CHANNEL_DESC: 'No channel is added.',

  SLACK_TOKEN_DESC: 'Please enter a Slack token.',
  ADD_CHANNEL_DESC: 'Please add a channel.',
  CHANNEL_EXISTS: 'The channel already exists. Please add another channel.',
  CHANNEL_SETTINGS_DESC: 'Please add a channel.',
  MAX_CHANNEL_COUNT: 'You can add a maximum of {count} channels.',

  SLACK_DESC:
    'Configure Slack notifications by setting a server and Slack channels.',
  SLACK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Your current Slack settings have changed. Please save the settings or cancel the changes.',

  'Webhook Settings': 'Webhook Settings',
  'Server Name': 'Server Name',
  'Root CA': 'Root CA',
  'Client Certificate Cert': 'Client Certificate Cert',
  'Client Certificate Key': 'Client Certificate Key',
  VERIFICATION_TYPE: 'Verification Type',
  SKIP_TLS_VERFICATION: 'Skip TLS verification (insecure)',
  VERIFICATION_TYPE_DESC: 'Please select a verification type.',

  WEBHOOK_SETTING_DESC:
    'You can receive platform notifications through webhooks after configuring the webhook server.',
  WEBHOOK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Your current webhook settings have changed. Please save the settings or cancel the changes.',

  PLEASE_ENTER_VALUE_CUSTOM: 'Please enter a {value}.',
  // Notification Configuration
  CONTAINER: 'Container',
  VALUES: 'Values',
  LABEL: 'Label',
  CONDITION_OPERATOR: 'Operator',
  SMTP_USER: 'SMTP Username',
  SMTP_PASSWORD: 'SMTP Password',
  ENTER_PASSWORD_TIP: 'Please enter the password.',
  ENTER_RECIPIENT_EMAIL_DESC:
    'Please add at lease one email address of a recipient.',
  INVALID_EMAIL_ADDRESS_DESC:
    'The email format is incorrect. Please enter a correct email address.',
  SMTP_USER_EMPTY_DESC: 'Please enter a SMTP username.',
  DINGTALK_SECRET: 'Secret',
  MAIL_TITLE: 'Email',
  DINGTALK_TITLE: 'DingTalk',
  WECOM_TITLE: 'WeCom',
  SLACK_TITLE: 'Slack',
  WEBHOOK_TITLE: 'Webhook',
  SLACK_TOKEN: 'Slack Token',
  SLACK_CHANNEL: 'Slack channel',
  TOKEN: 'Token',
  BASIC_AUTH: 'Basic authentication',
  NO_AUTH: 'No authentication',
  BEARER_TOKEN: 'Bearer token',
}
