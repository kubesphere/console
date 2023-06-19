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
  // Banner
  NOTIFICATION_MANAGEMENT: 'Notification Management',
  NOTIFICATION_CHANNELS: 'Notification Channels',
  NOTIFICATION_CHANNELS_DESC: 'Notify users through multiple channels when resource metrics meet conditions configured in rule groups.',
  // Email
  MAIL_TITLE: 'ईमेल',
  MAIL_DESC: 'Send notifications to email addresses.',
  INVALID_PORT_DESC: 'Please enter a valid port number.',
  ENTER_PORT_NUMBER: 'Please enter a port number.',
  ALERTING_NAME: 'Alert name',
  ALERTING_SEVERITY: 'Alert severity',
  ADDRESS_EMPTY_DESC: 'Please enter an address.',
  EMAIL_EMPTY_DESC: 'Please enter an email address.',
  SERVER_SETTINGS: 'Server Settings',
  RECIPIENT_SETTINGS: 'Recipient Settings',
  FILTER_CONDITIONS: 'Filter Conditions',
  CONTAINER: 'Container',
  VALUES: 'Values',
  CONDITION_OPERATOR: 'Operator',
  NOTIFICATION_CONDITION_SETTING_TIP: 'The <strong>Contain</strong> and <strong>Not contain</strong> operators require one or more values. You can press <strong>Enter</strong> to set multiple values.',
  NOTIFICATION_CONDITION_SETTINGS_DESC: 'Set the system to send only alerts that meet the conditions.',
  CONTAIN: 'Contain',
  NOT_CONTAIN: 'Not contain',
  EXIST: 'Exist',
  NOT_EXIST: 'Not exist',
  PATTERN_TAG_INVALID_TIP: 'Invalid label. The label can contain only uppercase and lowercase letters, numbers, hyphens (-), underscores (_), and dots (.), and must begin and end with an uppercase or lowercase letter or number.',
  PATTERN_TAG_VALUE_INVALID_TIP: 'Invalid value. The value can only contain uppercase and lowercase letters, numbers, hyphens (-), underscores (_) and dots (.) and must begin and end with an uppercase or lowercase letter or number and be a maximum of 63 characters.',
  INVALID_NOTIFICATION_CONDITION: 'Please enter a correct notification condition.',
  SEND_TEST_MESSAGE: 'Send Test Message',
  SEND_TEST_MESSAGE_DESC: 'Send a test message to verify that the notification channel is working properly.',
  SEND_TEST_MESSAGE_SUCCESS_DESC: 'Verified successfully. A test message has been sent.',
  SMTP_SERVER_ADDRESS: 'SMTP Server Address',
  USE_SSL_SECURE_CONNECTION: 'Use SSL secure connection',
  SENDER_EMAIL: 'Sender Email Address',
  INVALID_EMAIL: 'Invalid email address format.',
  INVALID_ADDRESS_DESC: 'Please enter a valid address.',
  MAX_EAMIL_COUNT: 'You can add a maximum of {count} emails.',
  SMTP_USER: 'SMTP Username',
  SMTP_PASSWORD: 'SMTP Password',
  ENTER_PASSWORD_TIP: 'Please enter a password.',
  ENTER_RECIPIENT_EMAIL_DESC: 'Please add at lease one email address.',
  INVALID_EMAIL_ADDRESS_DESC: 'Incorrect email format.',
  SMTP_USER_EMPTY_DESC: 'Please enter an SMTP username.',
  ADDED_SUCCESS_DESC: 'Added successfully.',
  POD: 'Pod',
  UPDATE_SUCCESSFUL: 'Updated successfully.',
  // Feishu
  FEISHU: 'Feishu',
  FEISHU_TITLE: 'Feishu',
  FEISHU_DESC: 'Send notifications to Feishu users.',
  PLEASE_ENTER_APP_ID: 'Please enter an app ID.',
  USER_ID: 'User ID',
  DEPARTMENT_ID: 'Department ID',
  FEISHU_RECEIPIENT_SETTINGS_DESC: 'To receive notifications, please set at least one user ID or department ID.',
  FEISHU_SECRET: 'Secret',
  // DingTalk
  DINGTALK_TITLE: 'DingTalk',
  DINGTALK: 'DingTalk',
  DINGTALK_DESC: 'Send notifications to DingTalk users.',
  PLEASE_ENTER_APP_KEY: 'Please enter an app key.',
  PLEASE_ENTER_APP_SECRET: 'Please enter an app secret.',
  PLEASE_ENTER_CHAT_ID: 'Please enter a chat ID.',
  PLEASE_ENTER_WEBHOOK_URL: 'Please enter a webhook URL.',
  // DingTalk > Chat Settings
  CHAT_SETTINGS: 'Chat Settings',
  CHAT_ID_TIP: 'Contact the DingTalk administrator to obtain the chat ID.',
  DINGTALK_SETTING_TIP: 'Please set up a chat or group chatbot.',
  ENTER_CHAT_ID_DESC: 'Please enter a chat ID.',
  MAX_CID_COUNT: 'You can add a maximum of {count} chat IDs.',
  CHAT_ID_EXISTS: 'The chat ID already exists. Please add another chat ID.',
  // DingTalk > DingTalk Chatbot
  CHATBOT_SETTINGS: 'Chatbot Settings',
  KEYWORDS_LIST: 'Added Keywords',
  DINGTALK_CHATBOT_SECURITY_TIP: 'Please enter a secret or keyword.',
  ENTER_KEYWORD_DESC: 'Please enter a keyword.',
  MAX_KEYWORD_COUNT: 'You can add a maximum of {count} keywords.',
  KEYWORD_EXISTS: 'The keyword already exists. Please add another keyword.',
  EMPTY_KEYWORDS_DESC: 'No keyword is added.',
  // WeCom
  WECOM: 'WeCom',
  WECOM_TITLE: 'WeCom',
  WECOM_DESC: 'Send notifications to WeCom users.',
  RECIPIENT_SETTINGS_TIP: 'Enter at least one user ID, department ID, or tag ID.',
  ENTER_WECOM_CORP_ID_DESC: 'Please enter a corp ID.',
  ENTER_WECOM_AGENT_ID_DESC: 'Please enter an app agent ID.',
  ENTER_WECOM_SECRET_DESC: 'Please enter an app secret.',
  // WeCom > User ID
  TOUSER_LIST: 'Added User IDs',
  EMPTY_TOUSER_DESC: 'No user ID is added.',
  ENTER_TOUSER_TIP: 'Please enter a user ID.',
  TOUSER_EXISTS: 'The user ID already exists. Please enter another user ID.',
  MAX_TOUSER_COUNT: 'You can add a maximum of {count} user IDs.',
  // WeCom > Department ID
  TOPARTY_LIST: 'Added Department IDs',
  EMPTY_TOPARTY_DESC: 'No department ID is added.',
  ENTER_TOPARTY_TIP: 'Please enter a department ID.',
  TOPARTY_EXISTS: 'The department ID already exists. Please enter another department ID.',
  MAX_TOPARTY_COUNT: 'You can add a maximum of {count} department IDs.',
  // WeCom > Tag ID
  TOTAG_LIST: 'Added Tag IDs',
  EMPTY_TOTAG_DESC: 'No tag ID is added.',
  ENTER_TOTAG_TIP: 'Please enter a tag ID.',
  TOTAG_EXISTS: 'The tag ID already exists. Please enter another tag ID.',
  MAX_TOTAG_COUNT: 'You can add a maximum of {count} tag IDs.',
  // Slack
  SLACK: 'Slack',
  SLACK_TITLE: 'Slack',
  SLACK_DESC: 'Send notifications to Slack users.',
  SLACK_TOKEN: 'Slack Token',
  SLACK_TOKEN_DESC: 'Please enter a Slack token.',
  SLACK_CHANNEL: 'Slack Channel',
  CHANNEL_SETTINGS: 'Slack Channel Settings',
  ADDED_CHANNELS: 'Added Slack Channels',
  EMPTY_CHANNEL_DESC: 'No Slack channel is added.',
  ADD_CHANNEL_TIP: 'Please add a Slack channel.',
  CHANNEL_EXISTS: 'The Slack channel already exists. Please add another Slack channel.',
  MAX_CHANNEL_COUNT: 'You can add a maximum of {count} Slack channels.',
  // Webhook
  WEBHOOK: 'Webhook',
  WEBHOOK_TITLE: 'Webhook',
  WEBHOOK_DESC: 'Send notifications to a webhook.',
  WEBHOOK_URL_DESC: 'Please enter a webhook URL.',
  AUTHENTICATION_TYPE: 'Authentication Type',
  AUTHENTICATION_TYPE_DESC: 'Please select an authentication type.',
  SKIP_TLS_VERFICATION: 'Skip TLS verification (insecure)',
  BASIC_AUTH: 'Basic authentication',
  NO_AUTH: 'No authentication',
  BEARER_TOKEN: 'Bearer token',
  TOKEN: 'Token',
  WEBHOOK_USERNAME_EMPTY_DESC: 'कृपया उपयोगकर्तानाम डालें।',
  WEBHOOK_PASSWORD_EMPTY_DESC: 'Please enter a password.',
  WEBHOOK_TOKEN_EMPTY_DESC: 'Please enter a token.'
};