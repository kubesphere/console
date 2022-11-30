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
  NOTIFICATION_CHANNELS_DESC: '当资源指标满足规则组中配置的条件和持续时间时，通过多种渠道通知用户。',
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
  FILTER_CONDITIONS: '过滤条件',
  CONTAINER: '容器',
  VALUES: '值',
  CONDITION_OPERATOR: '操作符',
  NOTIFICATION_CONDITION_SETTING_TIP: '<strong>包含</strong>和<strong>不包含</strong>操作符需要一个或多个值。您可以按 <strong>Enter</strong> 设置多个值。',
  NOTIFICATION_CONDITION_SETTINGS_DESC: '设置系统仅发送符合条件的告警。',
  CONTAIN: '包含',
  NOT_CONTAIN: '不包含',
  EXIST: '存在',
  NOT_EXIST: '不存在',
  PATTERN_TAG_INVALID_TIP: '标签无效。标签只能包含字母、数字、连字符（-）、下划线（_）和句点（.），必须以数字或字母开头和结尾。',
  PATTERN_TAG_VALUE_INVALID_TIP: '值无效。值只能包含字母、数字、连字符（-）、下划线（_）和句点（.），必须以数字或字母开头和结尾，最长 63 个字符。',
  INVALID_NOTIFICATION_CONDITION: '请填写正确的通知条件。',
  SEND_TEST_MESSAGE: '发送测试信息',
  SEND_TEST_MESSAGE_DESC: '发送测试消息以确认通知渠道工作正常。',
  SEND_TEST_MESSAGE_SUCCESS_DESC: '验证成功，已发送测试消息。',
  SMTP_SERVER_ADDRESS: 'SMTP 服务器地址',
  USE_SSL_SECURE_CONNECTION: '使用 SSL 安全连接',
  SENDER_EMAIL: '发件人邮箱',
  INVALID_EMAIL: '邮箱地址格式错误。',
  INVALID_ADDRESS_DESC: '请输入有效地址。',
  MAX_EAMIL_COUNT: '您可以最多添加 {count} 个邮箱。',
  SMTP_USER: 'SMTP 用户名',
  SMTP_PASSWORD: 'SMTP 密码',
  ENTER_PASSWORD_TIP: '请输入密码。',
  ENTER_RECIPIENT_EMAIL_DESC: '请添加至少一个邮箱地址。',
  INVALID_EMAIL_ADDRESS_DESC: '邮箱地址格式不正确。',
  SMTP_USER_EMPTY_DESC: '请输入 SMPT 用户名。',
  ADDED_SUCCESS_DESC: '添加成功。',
  POD: '容器组',
  UPDATE_SUCCESSFUL: '更新成功。',
  // Feishu
  FEISHU: '飞书',
  FEISHU_TITLE: '飞书',
  FEISHU_DESC: '向飞书用户发送通知。',
  PLEASE_ENTER_APP_ID: '请输入 App ID。',
  USER_ID: 'User ID',
  DEPARTMENT_ID: 'Department ID',
  FEISHU_RECEIPIENT_SETTINGS_DESC: '如需接收通知，请设置至少一个 User ID 或 Department ID。',
  FEISHU_SECRET: '密钥',
  // DingTalk
  DINGTALK_TITLE: '钉钉',
  DINGTALK: '钉钉',
  DINGTALK_DESC: '向钉钉用户发送通知。',
  PLEASE_ENTER_APP_KEY: '请输入 App Key。',
  PLEASE_ENTER_APP_SECRET: '请输入 App Secret。',
  PLEASE_ENTER_CHAT_ID: '请输入 Chat ID。',
  PLEASE_ENTER_WEBHOOK_URL: '请输入 webhook URL。',
  // DingTalk > Chat Settings
  CHAT_SETTINGS: '会话设置',
  CHAT_ID_TIP: '联系 DingTalk 管理员获取 Chat ID。',
  DINGTALK_SETTING_TIP: '请设置会话或者群机器人。',
  ENTER_CHAT_ID_DESC: '请输入 Chat ID。',
  MAX_CID_COUNT: '您可以添加最多 {count} 个 Chat ID。',
  CHAT_ID_EXISTS: 'Chat ID 已存在，请添加其他 Chat ID。',
  // DingTalk > DingTalk Chatbot
  CHATBOT_SETTINGS: '群机器人设置',
  KEYWORDS_LIST: '已添加关键字',
  DINGTALK_CHATBOT_SECURITY_TIP: '请输入 Secret 或关键词。',
  ENTER_KEYWORD_DESC: '请输入关键字。',
  MAX_KEYWORD_COUNT: '您可以最多添加 {count} 个关键词。',
  KEYWORD_EXISTS: '关键词已存在，请添加其他关键词。',
  EMPTY_KEYWORDS_DESC: '没有添加关键词。',
  // WeCom
  WECOM: '企业微信',
  WECOM_TITLE: '企业微信',
  WECOM_DESC: '向企业微信用户发送通知。',
  RECIPIENT_SETTINGS_TIP: '输入至少一个 User ID、Department ID 或 Tag ID。',
  ENTER_WECOM_CORP_ID_DESC: '请输入 Corp ID。',
  ENTER_WECOM_AGENT_ID_DESC: '请输入应用 Agent ID。',
  ENTER_WECOM_SECRET_DESC: '请输入应用 Secret。',
  // WeCom > User ID
  TOUSER_LIST: '已添加的 User ID',
  EMPTY_TOUSER_DESC: '没有已添加的 User ID。',
  ENTER_TOUSER_TIP: '请输入 User ID。',
  TOUSER_EXISTS: 'User ID 已存在，请输入其他 User ID。',
  MAX_TOUSER_COUNT: '您可以最多添加 {count} 个 User ID。',
  // WeCom > Department ID
  TOPARTY_LIST: '已添加的 Department ID',
  EMPTY_TOPARTY_DESC: '没有已添加 Department ID。',
  ENTER_TOPARTY_TIP: '请输入 Department ID。',
  TOPARTY_EXISTS: 'Department ID 已存在，请输入其他 Department ID。',
  MAX_TOPARTY_COUNT: '您可以最多添加 {count} 个 Department ID。',
  // WeCom > Tag ID
  TOTAG_LIST: '已添加的 Tag ID',
  EMPTY_TOTAG_DESC: '没有已添加 Tag ID。',
  ENTER_TOTAG_TIP: '请输入 Tag ID。',
  TOTAG_EXISTS: 'Tag ID 已存在，请输入其他 Tag ID。',
  MAX_TOTAG_COUNT: '您可以添加最多 {count} 个 Tag ID。',
  // Slack
  SLACK: 'Slack',
  SLACK_TITLE: 'Slack',
  SLACK_DESC: '向 Slack 用户发送通知。',
  SLACK_TOKEN: 'Slack 令牌',
  SLACK_TOKEN_DESC: '请输入 Slack 令牌。',
  SLACK_CHANNEL: 'Slack 频道',
  CHANNEL_SETTINGS: 'Slack 频道设置',
  ADDED_CHANNELS: '已添加 Slack 频道',
  EMPTY_CHANNEL_DESC: '没有添加 Slack 频道。',
  ADD_CHANNEL_TIP: '请添加 Slack 频道。',
  CHANNEL_EXISTS: 'Slack 频道已存在，请添加其他 Slack 频道。',
  MAX_CHANNEL_COUNT: '您可以最多添加 {count} 个 Slack 频道。',
  // Webhook
  WEBHOOK: 'Webhook',
  WEBHOOK_TITLE: 'Webhook',
  WEBHOOK_DESC: '向 Webhook 发送通知。',
  WEBHOOK_URL_DESC: '请输入 webhook URL。',
  AUTHENTICATION_TYPE: '认证类型',
  AUTHENTICATION_TYPE_DESC: '请选择认证类型。',
  SKIP_TLS_VERFICATION: '跳过 TLS 验证（不安全）',
  BASIC_AUTH: '基础认证',
  NO_AUTH: '无需认证',
  BEARER_TOKEN: 'Bearer 令牌',
  TOKEN: '令牌',
  WEBHOOK_USERNAME_EMPTY_DESC: '请输入一个用户名。',
  WEBHOOK_PASSWORD_EMPTY_DESC: '请输入密码。',
  WEBHOOK_TOKEN_EMPTY_DESC: '请输入一个令牌。'
};