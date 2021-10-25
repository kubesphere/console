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
  NOTIFICATION_MANAGEMENT: '通知管理',
  'Notification Management': '通知管理',
  NOTIFICATION_CONFIGURATION: '通知配置',
  'Notification Configuration': '通知配置',
  SERVER_SETTINGS: '服務器设置',
  RECIPIENT_SETTINGS: '接收設置',
  'Receive Notification': '接收通知',
  NOTIFICATION_CONFIGURATION_DESC:
    'KubeSphere supports notification configuration for multiple notification channels. You can set servers and recipients, and enable or disable notifications.',

  'Notification On': '通知開啟',
  'Notification Off': '通知關閉',

  NOTIFICATION_CONDITIONS: 'Notification Conditions',
  NOTIFICATION_CONDITION_SETTING_TIP:
    'Operators <strong>Includes values</strong> and <b>Does not include values</b> require one or more label values. Use a carriage return to separate values.</br>Operators <b>Exists</b> and <b>Does Not Exist</b> determine whether a label exists, and do not require a label value.',
  NOTIFICATION_CONDITION_SETTINGS_DESC:
    'You will receive only notifications that meet the conditions.',
  INCLUDES_VALUES: '包含值',
  DOES_NOT_INCLUDE_VALUES: '不包含值',
  EXISTS: 'Exists',
  DOES_NOT_EXIST: 'Does not exist',
  'Please select a tag': '請選擇標簽',
  'Please select a regex filter': '請選擇過濾規則',
  INVALID_NOTIFICATION_CONDITION: '請填寫正確的通知條件。',

  SEND_TEST_MESSAGE: '發送測試信息',
  SEND_TEST_MESSAGE_DESC:
    'After the configurations are complete, you can send a test message for verification.',
  SEND_TEST_MESSAGE_SUCCESS_DESC:
    '驗證成功。已向您發送了一條測試消息，請查收。',

  Mail: '郵件',
  SMTP_SERVER_ADDRESS: 'SMTP 服務器地址',
  USE_SSL_SECURE_CONNECTION: 'Use SSL secure connection',

  MAIL_SETTING_DESC: '可以通過郵件接收平臺的通知，需要配置郵件發送服務器。',
  SENDER_MAIL: '發件人郵箱',
  MAIL_DESC:
    'Configure email notifications by setting a server and recipients.',
  SENDER_EMAIL: '發件人郵箱',
  MAIL_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您當前的郵件設置已發生變化，請保存配置，或者取消修改',

  'Please enter an email address': '請輸入要添加的郵箱',
  'This email address has existed': '此郵箱已存在',
  INVALID_ADDRESS_DESC: 'Please enter a valid address.',
  INVALID_EMAIL: '郵箱格式不合法',
  'Please add the recipient email address': '請添加接收郵箱',
  MAX_EAMIL_COUNT: 'You can add a maximum of {count} emails.',

  DingTalk: '釘釘',
  CONVERSATION_SETTINGS: '會話設置',
  CONVERSATION_ID: '會話 ID',
  CHATBOT_SETTINGS: '群機器人設置',
  keywords: '關鍵字',
  KEYWORDS_LIST: 'Keyword List',
  CONVERSATION_ID_TIP:
    '會話 ID 需要系統管理員進行配置才能獲取，如需設置請聯系系統管理員。',

  ENTER_CONVERSATION_ID_DESC: 'Please enter a conversation ID.',
  ENTER_KEYWORD_DESC: '請輸入關鍵字。',
  CONVERSATION_ID_EXISTS:
    'The conversation ID already exists. Please add another conversation ID.',
  KEYWORD_EXISTS: 'The keyword already exists. Please add another keyword.',
  MAX_CID_COUNT: 'You can add a maximum of {count} conversation IDs.',
  MAX_KEYWORD_COUNT: 'You can add a maximum of {count} keywords.',
  EMPTY_KEYWORDS_DESC: 'No keyword is added.',
  DINGTALK_SETTING_TIP: '請設置會話或者群機器人。',
  DINGTALK_CHATBOT_SECURITY_TIP: 'Please enter a secret or keywords',

  DINGTALK_DESC:
    'Configure DingTalk notifications by setting a conversation or chatbot.',
  DINGTALK_KEYWORDS_DESC: 'ChatBot 的自定義關鍵字, 如需多個請以 "," 分隔',
  DINGTALK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您當前的釘釘設置已發生變化，請保存設置，或者取消修改',

  WeCom: '企業微信',

  WECOM_SETTING_DESC:
    '可以通過企業微信接收平臺的通知，需要配置企業微信發送服務器。',
  WECOM_CORP_ID: 'Corporation ID',
  WECOM_AGENT_ID: 'App AgentId',
  WECOM_SECRET: 'App Secret',
  USER_ID: '用戶 ID',
  DEPARTMENT_ID: '部門 ID',
  TAG_ID: '標簽 ID',
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
  MAX_TOTAG_COUNT: 'You can add a maximum of {count} tags.',

  WECOM_DESC:
    'Configure WeCom notifications by setting a server and recipients.',
  WECOM_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您當前的企業微信設置已發生變化，請保存設置，或者取消修改',

  Channel: '接收頻道',
  CHANNEL_SETTINGS: '接收頻道設置',
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
    '您當前的 slack 設置已發生變化，請保存設置，或者取消修改',

  'Webhook Settings': 'Webhook 設置',
  'Webhook Url': 'Webhook 地址',
  'Server Name': '服務名稱',
  'Root CA': '根證書',
  'Client Certificate Cert': '客戶端證書 Cert',
  'Client Certificate Key': '客戶端證書 Key',
  VERIFICATION_TYPE: '驗證類型',
  SKIP_TLS_VERFICATION: 'Skip TLS verification (insecure)',
  VERIFICATION_TYPE_DESC: '請選擇驗證類型。',

  WEBHOOK_SETTING_DESC:
    '可以通過 webhook 接收平臺的通知，需要配置 webhook 發送服務器。',
  WEBHOOK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您當前的 webhook 設置已發生變化，請保存設置，或者取消修改',

  PLEASE_ENTER_VALUE_CUSTOM: '請輸入{value}。',
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
  BEARER_TOKEN: 'Bearer token',
}
