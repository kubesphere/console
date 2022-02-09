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
  NOTIFICATION_CONFIGURATION_DESC:
    'KubeSphere 支持多种通知渠道的通知配置，您可以进行服务器和接收配置，并开启或关闭通知。',
  NOTIFICATION_EMAIL: '邮件',
  // Email
  MAIL_TITLE: '邮件',
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
  NOTIFICATION_CONDITION_SETTING_TIP:
    '操作符<b>包含值</b>和<b>不包含值</b>需要添加一个或多个标签值。使用回车分隔多个值。</br>操作符<b>存在</b>和<b>不存在</b>判断某个标签是否存在，无需设置标签值。',
  NOTIFICATION_CONDITION_SETTINGS_DESC: '您只会接收到符合条件的通知。',
  INCLUDES_VALUES: '包含值',
  DOES_NOT_INCLUDE_VALUES: '不包含值',
  EXISTS: '存在',
  DOES_NOT_EXIST: '不存在',
  TAG_INPUT_PLACEHOLDER: '请输入值后回车确认',
  PATTERN_TAG_INVALID_TIP:
    '标签无效。标签只能包含字母、数字、连字符（-）、下划线（_）和句点（.），必须以数字或字母开头和结尾。',
  PATTERN_TAG_VALUE_INVALID_TIP:
    '标签值无效。标签值只能包含字母、数字、连字符（-）、下划线（_）和句点（.），必须以数字或字母开头和结尾，最长 63 个字符。',
  INVALID_NOTIFICATION_CONDITION: '请填写正确的通知条件。',
  SEND_TEST_MESSAGE: '发送测试信息',
  SEND_TEST_MESSAGE_DESC: '配置完成后，您可以发送测试信息进行验证。',
  SEND_TEST_MESSAGE_SUCCESS_DESC:
    '验证成功。已向您发送了一条测试消息，请注意查收。',
  SMTP_SERVER_ADDRESS: 'SMTP 服务器地址',
  USE_SSL_SECURE_CONNECTION: '使用 SSL 安全连接',
  SENDER_EMAIL: '发件人邮箱',
  INVALID_EMAIL: '邮箱地址格式错误。',
  MAIL_DESC: '通过设置服务器和接收人以配置邮件通知。',
  INVALID_ADDRESS_DESC: '请输入有效地址。',
  MAX_EAMIL_COUNT: '您可以最多添加 {count} 个邮箱。',
  SMTP_USER: 'SMTP 用户名',
  SMTP_PASSWORD: 'SMTP 密码',
  ENTER_PASSWORD_TIP: '请输入密码。',
  ENTER_RECIPIENT_EMAIL_DESC: '请添加至少一个接收邮箱。',
  INVALID_EMAIL_ADDRESS_DESC: '邮箱格式不正确，请输入正确的邮箱地址。',
  SMTP_USER_EMPTY_DESC: '请输入 SMPT 用户名。',
  ADDED_SUCCESS_DESC: '添加成功。',
  POD: '容器组',
  UPDATE_SUCCESSFUL: '更新成功。',
  PATTERN_NAME_INVALID_TIP:
    '名称无效。名称只能包含小写字母、数字、或连字符（-）。',
  // DingTalk
  DINGTALK_TITLE: '钉钉',
  DingTalk: '钉钉',
  DINGTALK_DESC: '通过设置会话和接收人以配置钉钉通知。',
  PLEASE_ENTER_VALUE_CUSTOM: '请输入{value}。',
  // DingTalk > Conversation Settings
  CONVERSATION_SETTINGS: '会话设置',
  CONVERSATION_ID: '会话 ID',
  CONVERSATION_ID_TIP:
    '会话 ID 需要系统管理员进行配置才能获取，如需设置请联系系统管理员。',
  DINGTALK_SETTING_TIP: '请设置会话或者群机器人。',
  ENTER_CONVERSATION_ID_DESC: '请输入会话 ID。',
  MAX_CID_COUNT: '您可以最多添加 {count} 个会话 ID。',
  CONVERSATION_ID_EXISTS: '会话 ID 已存在，请添加其他会话 ID。',
  // DingTalk > DingTalk Chatbot
  CHATBOT_SETTINGS: '群机器人设置',
  KEYWORDS_LIST: '关键词列表',
  DINGTALK_CHATBOT_SECURITY_TIP: '请输入密钥或关键词',
  ENTER_KEYWORD_DESC: '请输入关键字。',
  MAX_KEYWORD_COUNT: '您可以最多添加 {count} 个关键词。',
  KEYWORD_EXISTS: '关键词已存在，请添加其他关键词。',
  EMPTY_KEYWORDS_DESC: '没有添加关键词。',
  DINGTALK_SECRET: '密钥',
  // WeCom
  WeCom: '企业微信',
  WECOM_TITLE: '企业微信',
  WECOM_CORP_ID: '企业 ID',
  WECOM_AGENT_ID: '应用 AgentId',
  WECOM_SECRET: '应用 Secret',
  RECIPIENT_SETTINGS_TIP: '您需要配置至少一项以接收通知。',
  ENTER_WECOM_CORP_ID_DESC: '请输入企业 ID。',
  ENTER_WECOM_AGENT_ID_DESC: '请输入应用 AgentId。',
  ENTER_WECOM_SECRET_DESC: '请输入应用 Secret。',
  WECOM_DESC: '通过设置服务器和接收人以配置企业微信通知。',
  // WeCom > User ID
  USER_ID: '用户 ID',
  TOUSER_LIST: '已添加的用户 ID',
  WECOM_TOUSER_PLACEHOLDER: '用户 ID',
  EMPTY_TOUSER_DESC: '没有已添加的用户 ID。',
  ENTER_TOUSER_TIP: '请输入用户 ID。',
  TOUSER_EXISTS: '用户 ID 已存在，请输入其他用户 ID。',
  MAX_TOUSER_COUNT: '您可以最多添加 {count} 个用户。',
  // WeCom > Department ID
  DEPARTMENT_ID: '部门 ID',
  WECOM_TOPARTY_PLACEHOLDER: '部门 ID',
  TOPARTY_LIST: '已添加的部门 ID',
  EMPTY_TOPARTY_DESC: '没有已添加部门 ID。',
  ENTER_TOPARTY_TIP: '请输入部门 ID。',
  TOPARTY_EXISTS: '部门 ID 已存在，请输入其他部门 ID。',
  MAX_TOPARTY_COUNT: '您可以最多添加 {count} 个部门。',
  // WeCom > Tag ID
  TAG_ID: '标签 ID',
  TOTAG_LIST: '已添加的标签 ID',
  WECOM_TOTAG_PLACEHOLDER: '标签 ID',
  EMPTY_TOTAG_DESC: '没有已添加标签 ID。',
  ENTER_TOTAG_TIP: '请输入标签 ID。',
  TOTAG_EXISTS: '标签 ID 已存在，请输入其他标签 ID。',
  MAX_TOTAG_COUNT: '您可以最多添加 {count} 个标签。',
  // Slack
  SLACK_TITLE: 'Slack',
  SLACK_TOKEN: 'Slack 令牌',
  SLACK_TOKEN_DESC: '请输入 Slack 令牌。',
  SLACK_CHANNEL: 'Slack 频道',
  CHANNEL_SETTINGS: '频道设置',
  ADDED_CHANNELS: '已添加的频道',
  EMPTY_CHANNEL_DESC: '没有添加频道。',
  ADD_CHANNEL_DESC: '请添加频道。',
  CHANNEL_EXISTS: '频道已存在，请添加其他频道。',
  CHANNEL_SETTINGS_DESC: '请添加频道。',
  MAX_CHANNEL_COUNT: '您可以最多添加 {count} 个频道。',
  SLACK_DESC: '通过设置服务器和 Slack 频道以配置 Slack 通知。',
  // Webhook
  WEBHOOK_TITLE: 'Webhook',
  WEBHOOK_URL_DESC: '请输入 webhook URL。',
  VERIFICATION_TYPE: '认证类型',
  SKIP_TLS_VERFICATION: '跳过 TLS 认证（不安全）',
  VERIFICATION_TYPE_DESC: '请选择认证类型。',
  BASIC_AUTH: '基础认证',
  NO_AUTH: '无需认证',
  BEARER_TOKEN: 'Bearer 令牌',
  TOKEN: '令牌',
}
