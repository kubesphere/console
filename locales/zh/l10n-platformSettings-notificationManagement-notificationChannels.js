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
  NOTIFICATION_CHANNELS: '通知渠道',
  NOTIFICATION_CHANNELS_DESC: 'Notify users through multiple channels when resource metrics meet conditions and durations configured in alerting policies.',
  // Email
  MAIL_TITLE: '邮件',
  MAIL_DESC: '向邮件地址发送通知。',
  INVALID_PORT_DESC: '请输入有效端口号。',
  ENTER_PORT_NUMBER: '请输入端口号。',
  ALERTING_NAME: '告警名称',
  ALERTING_SEVERITY: '告警级别',
  ADDRESS_EMPTY_DESC: '请输入地址。',
  EMAIL_EMPTY_DESC: '请输入一个邮箱地址。',
  SERVER_SETTINGS: '服务器设置',
  RECIPIENT_SETTINGS: '接收设置',
  NOTIFICATION_CONDITIONS: '通知条件',
  CONTAINER: '容器',
  VALUES: '值',
  CONDITION_OPERATOR: '操作符',
  NOTIFICATION_CONDITION_SETTING_TIP: '<strong>包含/不包含</strong> 操作符需要一个或多个值。您可以按 <strong>Enter</strong> 设置多个字符串。',
  NOTIFICATION_CONDITION_SETTINGS_DESC: '设置系统仅发送符合条件的告警消息。',
  CONTAIN: '包含',
  NOT_CONTAIN: '不包含',
  EXIST: '存在',
  NOT_EXIST: '不存在',
  PATTERN_TAG_INVALID_TIP: '标签无效。标签只能包含字母、数字、连字符（-）、下划线（_）和句点（.），必须以数字或字母开头和结尾。',
  PATTERN_TAG_VALUE_INVALID_TIP: 'Invalid value. The value can only contain uppercase and lowercase letters, numbers, hyphens (-), underscores (_) and dots (.) and must begin and end with an uppercase or lowercase letter or number and be a maximum of 63 characters.',
  INVALID_NOTIFICATION_CONDITION: '请填写正确的通知条件。',
  SEND_TEST_MESSAGE: '发送测试信息',
  SEND_TEST_MESSAGE_DESC: '发送测试消息以确认通知渠道工作正常。',
  SEND_TEST_MESSAGE_SUCCESS_DESC: 'Verified successfully. A test message has been sent.',
  SMTP_SERVER_ADDRESS: 'SMTP 服务器地址',
  USE_SSL_SECURE_CONNECTION: '使用 SSL 安全连接',
  SENDER_EMAIL: '发件人邮箱',
  INVALID_EMAIL: '邮箱地址格式错误。',
  INVALID_ADDRESS_DESC: '请输入有效地址。',
  MAX_EAMIL_COUNT: '您可以最多添加 {count} 个邮箱。',
  SMTP_USER: 'SMTP 用户名',
  SMTP_PASSWORD: 'SMTP 密码',
  ENTER_PASSWORD_TIP: '请输入密码。',
  ENTER_RECIPIENT_EMAIL_DESC: 'Please add at lease one email address.',
  INVALID_EMAIL_ADDRESS_DESC: 'Incorrect email format.',
  SMTP_USER_EMPTY_DESC: 'Please enter an SMTP username.',
  ADDED_SUCCESS_DESC: '添加成功。',
  POD: '容器组',
  UPDATE_SUCCESSFUL: '更新成功。',
  // Feishu
  FEISHU: '飞书',
  FEISHU_TITLE: '飞书',
  FEISHU_DESC: '向飞书用户发送通知。',
  PLEASE_ENTER_APP_ID: 'Please enter an app ID.',
  // DingTalk
  DINGTALK_TITLE: '钉钉',
  DINGTALK: '钉钉',
  DINGTALK_DESC: '向钉钉用户发送通知。',
  PLEASE_ENTER_APP_KEY: 'Please enter an app key.',
  PLEASE_ENTER_APP_SECRET: 'Please enter an app secret.',
  PLEASE_ENTER_CHAT_ID: 'Please enter a chat ID.',
  PLEASE_ENTER_WEBHOOK_URL: '请输入 webhook URL。',
  // DingTalk > Chat Settings
  CHAT_SETTINGS: 'Chat Settings',
  CHAT_ID_TIP: 'Contact the DingTalk administrator to obtain the chat ID.',
  DINGTALK_SETTING_TIP: 'Please set up a chat or group chatbot.',
  ENTER_CHAT_ID_DESC: 'Please enter a chat ID.',
  MAX_CID_COUNT: 'You can add a maximum of {count} chat IDs.',
  CHAT_ID_EXISTS: 'The chat ID already exists. Please add another chat ID.',
  // DingTalk > DingTalk Chatbot
  CHATBOT_SETTINGS: '群机器人设置',
  KEYWORDS_LIST: 'Added Keywords',
  DINGTALK_CHATBOT_SECURITY_TIP: 'Please enter a secret or keyword.',
  ENTER_KEYWORD_DESC: '请输入关键字。',
  MAX_KEYWORD_COUNT: '您可以最多添加 {count} 个关键词。',
  KEYWORD_EXISTS: '关键词已存在，请添加其他关键词。',
  EMPTY_KEYWORDS_DESC: '没有添加关键词。',
  // WeCom
  WECOM: '企业微信',
  WECOM_TITLE: '企业微信',
  WECOM_DESC: '向企业微信用户发送通知。',
  RECIPIENT_SETTINGS_TIP: 'Please enter at least one user ID, department ID, or tag ID.',
  ENTER_WECOM_CORP_ID_DESC: 'Please enter a corp ID.',
  ENTER_WECOM_AGENT_ID_DESC: 'Please enter an app agent ID.',
  ENTER_WECOM_SECRET_DESC: 'Please enter an app secret.',
  // WeCom > User ID
  TOUSER_LIST: '已添加的用户 ID',
  EMPTY_TOUSER_DESC: '没有已添加的用户 ID。',
  TOUSER_EXISTS: '用户 ID 已存在，请输入其他用户 ID。',
  MAX_TOUSER_COUNT: 'You can add a maximum of {count} user IDs.',
  // WeCom > Department ID
  TOPARTY_LIST: '已添加的部门 ID',
  EMPTY_TOPARTY_DESC: '没有已添加部门 ID。',
  TOPARTY_EXISTS: '部门 ID 已存在，请输入其他部门 ID。',
  MAX_TOPARTY_COUNT: 'You can add a maximum of {count} department IDs.',
  // WeCom > Tag ID
  TOTAG_LIST: '已添加的标签 ID',
  EMPTY_TOTAG_DESC: '没有已添加标签 ID。',
  ENTER_TOTAG_TIP: '请输入标签 ID。',
  TOTAG_EXISTS: '标签 ID 已存在，请输入其他标签 ID。',
  MAX_TOTAG_COUNT: 'You can add a maximum of {count} tag IDs.',
  // Slack
  SLACK: 'Slack',
  SLACK_TITLE: 'Slack',
  SLACK_DESC: '向 Slack 用户发送通知。',
  SLACK_TOKEN: 'Slack 令牌',
  SLACK_TOKEN_DESC: '请输入 Slack 令牌。',
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
  WEBHOOK_DESC: '向 Webhook 发送通知。',
  WEBHOOK_URL_DESC: '请输入 webhook URL。',
  AUTHENTICATION_TYPE: 'Authentication Type',
  AUTHENTICATION_TYPE_DESC: 'Please select an authentication type.',
  SKIP_TLS_VERFICATION: '跳过 TLS 认证（不安全）',
  BASIC_AUTH: '基础认证',
  NO_AUTH: '无需认证',
  BEARER_TOKEN: 'Bearer 令牌',
  TOKEN: '令牌',
  WEBHOOK_USERNAME_EMPTY_DESC: '请输入一个用户名。',
  WEBHOOK_PASSWORD_EMPTY_DESC: '请输入密码。',
  WEBHOOK_TOKEN_EMPTY_DESC: '请输入一个令牌。'
};