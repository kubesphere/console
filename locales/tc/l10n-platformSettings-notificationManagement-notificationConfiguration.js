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
  NOTIFICATION_MANAGEMENT: '通知管理',
  NOTIFICATION_CONFIGURATION: '通知配置',
  NOTIFICATION_CONFIGURATION_DESC: 'KubeSphere supports notification configuration for multiple notification channels. You can set servers and recipients, and enable or disable notifications.',
  NOTIFICATION_EMAIL: 'Email',
  // Email
  MAIL_TITLE: 'Email',
  INVALID_PORT_DESC: 'Please enter a valid port number.',
  ENTER_PORT_NUMBER: '請輸入端口',
  ALERTING_NAME: 'Alert name',
  ALERTING_SEVERITY: 'Alert severity',
  ADDRESS_EMPTY_DESC: 'Please enter an address.',
  EMAIL_EMPTY_DESC: '請輸入郵箱',
  SERVER_SETTINGS: '服務器设置',
  RECIPIENT_SETTINGS: '接收設置',
  NOTIFICATION_CONDITIONS: 'Notification Conditions',
  CONTAINER: 'Container',
  VALUES: 'Values',
  CONDITION_OPERATOR: 'Operator',
  NOTIFICATION_CONDITION_SETTING_TIP: 'Operators <strong>Includes values</strong> and <b>Does not include values</b> require one or more label values. Use a carriage return to separate values.</br>Operators <b>Exists</b> and <b>Does Not Exist</b> determine whether a label exists, and do not require a label value.',
  NOTIFICATION_CONDITION_SETTINGS_DESC: 'You will receive only notifications that meet the conditions.',
  INCLUDES_VALUES: '包含值',
  DOES_NOT_INCLUDE_VALUES: '不包含值',
  EXISTS: 'Exists',
  DOES_NOT_EXIST: 'Does not exist',
  TAG_INPUT_PLACEHOLDER: 'Please enter the value and press Enter to confirm',
  PATTERN_TAG_INVALID_TIP: 'Invalid label. The label can contain only uppercase and lowercase letters, numbers, hyphens (-), underscores (_), and dots (.), and must begin and end with an uppercase or lowercase letter or number.',
  INVALID_NOTIFICATION_CONDITION: '請填寫正確的通知條件。',
  SEND_TEST_MESSAGE: '發送測試信息',
  SEND_TEST_MESSAGE_DESC: 'After the configurations are complete, you can send a test message for verification.',
  SEND_TEST_MESSAGE_SUCCESS_DESC: '驗證成功。已向您發送了一條測試消息，請查收。',
  SMTP_SERVER_ADDRESS: 'SMTP 服務器地址',
  USE_SSL_SECURE_CONNECTION: 'Use SSL secure connection',
  SENDER_EMAIL: '發件人郵箱',
  INVALID_EMAIL: '郵箱格式不合法',
  MAIL_DESC: 'Configure email notifications by setting a server and recipients.',
  INVALID_ADDRESS_DESC: 'Please enter a valid address.',
  MAX_EAMIL_COUNT: 'You can add a maximum of {count} emails.',
  SMTP_USER: 'SMTP Username',
  SMTP_PASSWORD: 'SMTP Password',
  ENTER_PASSWORD_TIP: 'Please enter the password.',
  ENTER_RECIPIENT_EMAIL_DESC: 'Please add at lease one email address of a recipient.',
  INVALID_EMAIL_ADDRESS_DESC: 'The email format is incorrect. Please enter a correct email address.',
  SMTP_USER_EMPTY_DESC: 'Please enter a SMTP username.',
  ADDED_SUCCESS_DESC: '添加成功。',
  POD: '容器組',
  UPDATE_SUCCESSFUL: 'Updated successfully.',
  PATTERN_NAME_INVALID_TIP: 'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-).',
  // DingTalk
  DINGTALK_TITLE: 'DingTalk',
  DingTalk: '釘釘',
  DINGTALK_DESC: 'Configure DingTalk notifications by setting a conversation or chatbot.',
  PLEASE_ENTER_VALUE_CUSTOM: '請輸入{value}。',
  // DingTalk > Conversation Settings
  CONVERSATION_SETTINGS: '會話設置',
  CONVERSATION_ID: '會話 ID',
  CONVERSATION_ID_TIP: '會話 ID 需要系統管理員進行配置才能獲取，如需設置請聯系系統管理員。',
  DINGTALK_SETTING_TIP: '請設置會話或者群機器人。',
  ENTER_CONVERSATION_ID_DESC: 'Please enter a conversation ID.',
  MAX_CID_COUNT: 'You can add a maximum of {count} conversation IDs.',
  CONVERSATION_ID_EXISTS: 'The conversation ID already exists. Please add another conversation ID.',
  // DingTalk > DingTalk Chatbot
  CHATBOT_SETTINGS: '群機器人設置',
  KEYWORDS_LIST: 'Keyword List',
  DINGTALK_CHATBOT_SECURITY_TIP: 'Please enter a secret or keywords',
  ENTER_KEYWORD_DESC: '請輸入關鍵字。',
  MAX_KEYWORD_COUNT: 'You can add a maximum of {count} keywords.',
  KEYWORD_EXISTS: 'The keyword already exists. Please add another keyword.',
  EMPTY_KEYWORDS_DESC: 'No keyword is added.',
  DINGTALK_SECRET: 'Secret',
  // WeCom
  WeCom: '企業微信',
  WECOM_TITLE: 'WeCom',
  WECOM_CORP_ID: 'Corporation ID',
  WECOM_AGENT_ID: 'App AgentId',
  WECOM_SECRET: 'App Secret',
  RECIPIENT_SETTINGS_TIP: 'At least one item needs to be configured to receive notifications.',
  ENTER_WECOM_CORP_ID_DESC: 'Please enter a corporation ID.',
  ENTER_WECOM_AGENT_ID_DESC: 'Please enter an applicaiton AgentId.',
  ENTER_WECOM_SECRET_DESC: 'Please enter an application Secret.',
  WECOM_DESC: 'Configure WeCom notifications by setting a server and recipients.',
  // WeCom > User ID
  USER_ID: '用戶 ID',
  TOUSER_LIST: 'Added User IDs',
  WECOM_TOUSER_PLACEHOLDER: 'User ID',
  EMPTY_TOUSER_DESC: 'No user ID is added.',
  ENTER_TOUSER_TIP: 'Please enter a user ID.',
  TOUSER_EXISTS: 'The user ID already exists. Please enter another user ID.',
  MAX_TOUSER_COUNT: 'You can add a maximum of {count} users.',
  // WeCom > Department ID
  DEPARTMENT_ID: '部門 ID',
  WECOM_TOPARTY_PLACEHOLDER: 'Department ID',
  TOPARTY_LIST: 'Added Department IDs',
  EMPTY_TOPARTY_DESC: 'No department ID is added.',
  ENTER_TOPARTY_TIP: 'Please enter a department ID.',
  TOPARTY_EXISTS: 'The department ID already exists. Please enter another department ID.',
  MAX_TOPARTY_COUNT: 'You can add a maximum of {count} departments.',
  // WeCom > Tag ID
  TAG_ID: '標簽 ID',
  TOTAG_LIST: 'Added Tag IDs',
  WECOM_TOTAG_PLACEHOLDER: 'Tag ID',
  EMPTY_TOTAG_DESC: 'No tag ID is added.',
  ENTER_TOTAG_TIP: 'Please enter a tag ID.',
  TOTAG_EXISTS: 'The tag ID already exists. Please enter another tag ID.',
  MAX_TOTAG_COUNT: 'You can add a maximum of {count} tags.',
  // Slack
  SLACK_TITLE: 'Slack',
  SLACK_TOKEN: 'Slack Token',
  SLACK_TOKEN_DESC: 'Please enter a Slack token.',
  SLACK_CHANNEL: 'Slack channel',
  CHANNEL_SETTINGS: '接收頻道設置',
  ADDED_CHANNELS: 'Added Channels',
  EMPTY_CHANNEL_DESC: 'No channel is added.',
  ADD_CHANNEL_DESC: 'Please add a channel.',
  CHANNEL_EXISTS: 'The channel already exists. Please add another channel.',
  CHANNEL_SETTINGS_DESC: 'Please add a channel.',
  MAX_CHANNEL_COUNT: 'You can add a maximum of {count} channels.',
  SLACK_DESC: 'Configure Slack notifications by setting a server and Slack channels.',
  // Webhook
  WEBHOOK_TITLE: 'Webhook',
  WEBHOOK_URL_DESC: 'Please enter a webhook URL.',
  VERIFICATION_TYPE: '驗證類型',
  SKIP_TLS_VERFICATION: 'Skip TLS verification (insecure)',
  VERIFICATION_TYPE_DESC: '請選擇驗證類型。',
  BASIC_AUTH: 'Basic authentication',
  NO_AUTH: '無須認證',
  BEARER_TOKEN: 'Bearer token',
  TOKEN: 'Token'
};