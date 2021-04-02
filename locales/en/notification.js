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
  'Notification Management': 'Notification Management',
  'Server Settings': 'Server Settings',
  'Recipient Settings': 'Recipient Settings',
  'Receive Notification': 'Receive Notifications',

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
  'Invalid email': 'Invalid email address',
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

  'Please enter a conversation ID': 'Please enter a conversation ID',
  'Please enter a keyword': 'Please enter a keyword',
  'This conversation ID has existed': 'This conversation ID has existed',
  'This keyword has existed': 'This keyword has existed',
  MAX_CID_COUNT: 'Add a maximum of {count} conversation IDs',
  MAX_KEYWORD_COUNT: 'Add at most {count} keywords',

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
  'Department ID': 'Department ID',
  'Tag ID': 'Tag ID',
  'User Set': 'User List',
  'Department Set': 'Department List',
  'Tag Set': 'Tag List',

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
