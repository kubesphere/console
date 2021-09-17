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
  'Server Settings': 'Server Settings',
  'Recipient Settings': 'Recipient Settings',
  'Receive Notification': 'Receive Notifications',
  NOTIFICATION_CONFIGURATION_DESC:
    'You can receive notifications from the platform through e-mail, dingtalk, wecom, slack and webhook. You need to configure the sending server',

  'Notification On': 'Notification On',
  'Notification Off': 'Notification Off',

  'Notification Condition Settings': 'Notification Condition Settings',
  NOTIFICATION_CONDITION_SETTINGS_DESC:
    'You will only receive notifications that meet the filter criteria',
  NOTIFICATION_CONDITION_SETTING_ANNOTATION:
    'Include key value: the label of the received notification will have the selected value; include key: the received notification will have the selected label.',
  'Include key values': 'Include key values',
  'Not include key values': 'Not include key values',
  'Exists key': 'Exists key',
  'Does not exist key': 'Does not exist key',
  'Please select a tag': 'Please select a tag',
  'Please select a regex filter': 'Please select a regex filter',
  'Invalid notification condition': 'Invalid notification condition',

  SEND_TEST_MESSAGE: 'Send Test Message',
  NOTIFICATION_CONFIGRATION_SEND_TEST_MESSAGE_DESC:
    'After setting the relevant configuration, you can send test information to verify your configuration.',
  SEND_TEST_MESSAGE_SUCCESS_DESC:
    'Verification is successful, a test message has been sent to you, please check it',

  Mail: 'Email',
  'SMTP Server Address': 'SMTP Server Address',
  'Use SSL Secure Connection': 'Use SSL Secure Connection',

  MAIL_DESC:
    'You can receive email notifications from the platform after configuring the outgoing mail server.',
  SENDER_MAIL: 'Sender Email Address',
  MAIL_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Your current email settings have changed. Please save the settings or cancel the changes.',

  'Please enter the SMTP username': 'Please enter the SMTP username',
  'Please enter an email address': 'Please enter an email address',
  'This email address has existed': 'This email address has existed',
  'Invalid address': 'Invalid address',
  INVALID_EMAIL: 'Invalid email address format.',
  'Please add the recipient email address':
    'Please add the recipient email address',
  MAX_EAMIL_COUNT: 'Add up to {count} emails',

  DingTalk: 'DingTalk',
  'Conversation Settings': 'Conversation Settings',
  'Conversation ID': 'Conversation ID',
  'DingTalk Chatbot': 'DingTalk Chatbot',
  'Webhook URL': 'Webhook URL',
  keywords: 'Keywords',
  'Keywords Set': 'Keyword List',
  CONVERSATION_ID_TIP:
    'The conversation ID needs to be configured by the system administrator to obtain it. If you need to set it, please contact the system administrator. ',

  'Please enter a conversation ID': 'Please enter a conversation ID',
  'Please enter a keyword': 'Please enter a keyword',
  'This conversation ID has existed': 'This conversation ID has existed',
  'This keyword has existed': 'This keyword has existed',
  MAX_CID_COUNT: 'Add a maximum of {count} conversation IDs',
  MAX_KEYWORD_COUNT: 'Add at most {count} keywords',
  EMPTY_KEYWORDS_DESC: 'No keywords added',

  DINGTALK_DESC:
    'You can receive DingTalk notifications from the platform after configuring the DingTalk server.',
  DINGTALK_KEYWORDS_DESC:
    'Separate multiple customized Chatbot keywords with commas.',
  DINGTALK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Your current DingTalk settings have changed. Please save the settings or cancel the changes.',

  WeCom: 'WeCom',
  'WeChat API Corp ID': 'WeChat API Corp ID',
  'WeChat API Agent ID': 'WeChat API Agent ID',
  'WeChat API Secret': 'WeChat API Secret',
  'User ID': 'User ID',
  'Party ID': 'Department ID',
  'Tag ID': 'Tag ID',
  'User Set': 'User List',
  'Party Set': 'Department List',
  'Tag Set': 'Tag List',
  WECOM_RECEIVER_TOUSER_INPUT_PLACEHOLDER: 'Please enter the user ID to add',
  WECOM_RECEIVER_TOPARTY_INPUT_PLACEHOLDER:
    'Please enter the department ID to add',
  WECOM_RECEIVER_TOTAG_INPUT_PLACEHOLDER: 'Please enter the tag to add',
  RECIPIENT_SETTINGS_TIP:
    'At least one item must be configured to receive notifications',
  EMPTY_TOUSER_DESC: 'No user added',
  EMPTY_TOPARTY_DESC: 'No department added',
  EMPTY_TOTAG_DESC: 'No tag added',

  'Please enter the WeChat API Corp ID': 'Please enter the WeChat API Corp ID',
  'Please enter the WeChat API Agent ID':
    'Please enter the WeChat API Agent ID',
  'Please enter the WeChat API Secret': 'Please enter the WeChat API Secret',
  'Please enter a toUser': 'Please enter a user',
  'Please enter a toParty': 'Please enter a department',
  'Please enter a toTag': 'Please enter a tag',
  'This toUser has existed': 'This user has existed',
  'This toParty has existed': 'This department has existed',
  'This toTag has existed': 'This tag has existed',
  MAX_TOUSER_COUNT: 'Add up to {count} users',
  MAX_TOPARTY_COUNT: 'Add up to {count} departments',
  MAX_TOTAG_COUNT: 'Add up to {count} Tags',

  WECOM_DESC:
    'You can receive WeCom notifications from the platform after configuring the WeCom server.',
  WECOM_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Your current WeCom settings have changed. Please save the settings or cancel the changes.',

  Channel: 'Channel',
  'Channel Settings': 'Channel Settings',
  'Channel Set': 'Channel List',
  EMPTY_CHANNEL_DESC: 'No channel added',

  'Please enter the Slack token': 'Please enter the Slack token',
  'Please enter a channel': 'Please enter a channel',
  'This channel has existed': 'This channel has existed',
  'Please add the receiver channel': 'Please add the receiver channel',
  MAX_CHANNEL_COUNT: 'Add up to {count} channels',

  SLACK_DESC:
    'You can receive Slack notifications from the platform after configuring the Slack server.',
  SLACK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Your current Slack settings have changed. Please save the settings or cancel the changes.',

  'Webhook Settings': 'Webhook Settings',
  'Webhook Url': 'Webhook URL',
  'Server Name': 'Server Name',
  'Root CA': 'Root CA',
  'Client Certificate Cert': 'Client Certificate Cert',
  'Client Certificate Key': 'Client Certificate Key',
  'Verification Type': 'Verification Type',
  'Skip TLS Certification': 'Skip TLS Certification',
  'Please select a verification type': 'Please select a verification type',

  WEBHOOK_SETTING_DESC:
    'You can receive platform notifications through webhooks after configuring the webhook server.',
  WEBHOOK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Your current webhook settings have changed. Please save the settings or cancel the changes.',
}
