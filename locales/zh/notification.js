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
  SERVER_SETTINGS: '服务器设置',
  RECIPIENT_SETTINGS: '接收设置',
  'Receive Notification': '接收通知',
  NOTIFICATION_CONFIGURATION_DESC:
    'KubeSphere 支持多种通知渠道的通知配置，您可以进行服务器和接收配置，并开启或关闭通知。',

  'Notification On': '通知开启',
  'Notification Off': '通知关闭',

  NOTIFICATION_CONDITIONS: '通知条件',
  NOTIFICATION_CONDITION_SETTING_TIP:
    '操作符<b>包含值</b>和<b>不包含值</b>需要添加一个或多个标签值。使用回车分隔多个值。</br>操作符<b>存在</b>和<b>不存在</b>判断某个标签是否存在，无需设置标签值。',
  NOTIFICATION_CONDITION_SETTINGS_DESC: '您只会接收到符合条件的通知。',
  INCLUDES_VALUES: '包含值',
  DOES_NOT_INCLUDE_VALUES: '不包含值',
  EXISTS: '存在',
  DOES_NOT_EXIST: '不存在',
  'Please select a tag': '请选择标签',
  'Please select a regex filter': '请选择过滤规则',
  'Invalid notification condition': '请填写正确的通知条件',
  TAG_INPUT_PLACEHOLDER: '请输入值后回车确认',
  INVALID_NOTIFICATION_CONDITION: '请填写正确的通知条件。',

  SEND_TEST_MESSAGE: '发送测试信息',
  SEND_TEST_MESSAGE_DESC: '配置完成后，您可以发送测试信息进行验证。',
  SEND_TEST_MESSAGE_SUCCESS_DESC:
    '验证成功。已向您发送了一条测试消息，请注意查收。',

  Mail: '邮件',
  SMTP_SERVER_ADDRESS: 'SMTP 服务器地址',
  USE_SSL_SECURE_CONNECTION: '使用 SSL 安全连接',

  MAIL_SETTING_DESC: '可以通过邮件接收平台的通知，需要配置邮件发送服务器。',
  SENDER_MAIL: '发件人邮箱',
  MAIL_DESC: '通过设置服务器和接收人以配置邮件通知。',
  SENDER_EMAIL: '发件人邮箱',
  MAIL_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的邮件设置已发生变化，请保存配置，或者取消修改',

  'Please enter an email address': '请输入要添加的邮箱',
  'This email address has existed': '此邮箱已存在',
  INVALID_ADDRESS_DESC: '请输入有效地址。',
  INVALID_EMAIL: '邮箱地址格式错误。',
  'Please add the recipient email address': '请添加接收邮箱',
  MAX_EAMIL_COUNT: '您可以最多添加 {count} 个邮箱。',

  DingTalk: '钉钉',
  CONVERSATION_SETTINGS: '会话设置',
  CONVERSATION_ID: '会话 ID',
  CHATBOT_SETTINGS: '群机器人设置',
  keywords: '关键字',
  KEYWORDS_LIST: '关键词列表',
  CONVERSATION_ID_TIP:
    '会话 ID 需要系统管理员进行配置才能获取，如需设置请联系系统管理员。',

  DINGTALK_SETTING_TIP: '请设置会话或者群机器人。',
  DINGTALK_CHATBOT_SECURITY_TIP: '请输入密钥或关键词',

  DINGTALK_SETTING_DESC: '可以通过钉钉接收平台的通知，需要配置钉钉发送服务器。',
  ENTER_CONVERSATION_ID_DESC: '请输入会话 ID。',
  ENTER_KEYWORD_DESC: '请输入关键字。',
  CONVERSATION_ID_EXISTS: '会话 ID 已存在，请添加其他会话 ID。',
  KEYWORD_EXISTS: '关键词已存在，请添加其他关键词。',
  MAX_CID_COUNT: '您可以最多添加 {count} 个会话 ID。',
  MAX_KEYWORD_COUNT: '您可以最多添加 {count} 个关键词。',
  EMPTY_KEYWORDS_DESC: '没有添加关键词。',

  DINGTALK_DESC: '通过设置会话和接收人以配置钉钉通知。',
  DINGTALK_KEYWORDS_DESC: 'ChatBot 的自定义关键字, 如需多个请以 "," 分隔',
  DINGTALK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的钉钉设置已发生变化，请保存设置，或者取消修改',

  WeCom: '企业微信',
  WECOM_CORP_ID: '企业 ID',
  WECOM_AGENT_ID: '应用 AgentId',
  WECOM_SECRET: '应用 Secret',
  USER_ID: '用户 ID',
  DEPARTMENT_ID: '部门 ID',
  TAG_ID: '标签 ID',
  TOUSER_LIST: '已添加的用户 ID',
  TOPARTY_LIST: '已添加的部门 ID',
  TOTAG_LIST: '已添加的标签 ID',
  WECOM_TOUSER_PLACEHOLDER: '用户 ID',
  WECOM_TOPARTY_PLACEHOLDER: '部门 ID',
  WECOM_TOTAG_PLACEHOLDER: '标签 ID',
  RECIPIENT_SETTINGS_TIP: '您需要配置至少一项以接收通知。',
  EMPTY_TOUSER_DESC: '没有已添加的用户 ID。',
  EMPTY_TOPARTY_DESC: '没有已添加部门 ID。',
  EMPTY_TOTAG_DESC: '没有已添加标签 ID。',

  ENTER_WECOM_CORP_ID_DESC: '请输入企业 ID。',
  ENTER_WECOM_AGENT_ID_DESC: '请输入应用 AgentId。',
  ENTER_WECOM_SECRET_DESC: '请输入应用 Secret。',
  ENTER_TOUSER_TIP: '请输入用户 ID。',
  ENTER_TOPARTY_TIP: '请输入部门 ID。',
  ENTER_TOTAG_TIP: '请输入标签 ID。',
  TOUSER_EXISTS: '用户 ID 已存在，请输入其他用户 ID。',
  TOPARTY_EXISTS: '部门 ID 已存在，请输入其他部门 ID。',
  TOTAG_EXISTS: '标签 ID 已存在，请输入其他标签 ID。',
  MAX_TOUSER_COUNT: '您可以最多添加 {count} 个用户。',
  MAX_TOPARTY_COUNT: '您可以最多添加 {count} 个部门。',
  MAX_TOTAG_COUNT: '您可以最多添加 {count} 个标签。',

  WECOM_DESC: '通过设置服务器和接收人以配置企业微信通知。',
  WECOM_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的企业微信设置已发生变化，请保存设置，或者取消修改',

  Channel: '接收频道',
  CHANNEL_SETTINGS: '频道设置',
  ADDED_CHANNELS: '已添加的频道',
  EMPTY_CHANNEL_DESC: '没有添加频道。',

  SLACK_TOKEN_DESC: '请输入 Slack 令牌。',
  ADD_CHANNEL_DESC: '请添加频道。',
  CHANNEL_EXISTS: '频道已存在，请添加其他频道。',
  CHANNEL_SETTINGS_DESC: '请添加频道。',
  MAX_CHANNEL_COUNT: '您可以最多添加 {count} 个频道。',

  SLACK_SETTING_DESC:
    '可以通过 slack 接收平台的通知，需要配置 slack 发送服务器。',
  SLACK_DESC: '通过设置服务器和 Slack 频道以配置 Slack 通知。',
  SLACK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的 slack 设置已发生变化，请保存设置，或者取消修改',

  'Webhook Settings': 'Webhook 设置',
  'Webhook Url': 'Webhook 地址',
  'Server Name': '服务名称',
  'Root CA': '根证书',
  'Client Certificate Cert': '客户端证书 Cert',
  'Client Certificate Key': '客户端证书 Key',
  VERIFICATION_TYPE: '认证类型',
  SKIP_TLS_VERFICATION: '跳过 TLS 认证（不安全）',
  VERIFICATION_TYPE_DESC: '请选择认证类型。',

  WEBHOOK_SETTING_DESC:
    '可以通过 webhook 接收平台的通知，需要配置 webhook 发送服务器。',
  WEBHOOK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的 webhook 设置已发生变化，请保存设置，或者取消修改',

  PLEASE_ENTER_VALUE_CUSTOM: '请输入{value}。',
  // Notification Configuration
  CONTAINER: '容器',
  VALUES: '值',
  LABEL: '标签',
  CONDITION_OPERATOR: '操作符',
  SMTP_USER: 'SMTP 用户名',
  SMTP_PASSWORD: 'SMTP 密码',
  ENTER_PASSWORD_TIP: '请输入密码。',
  ENTER_RECIPIENT_EMAIL_DESC: '请添加至少一个接收邮箱。',
  INVALID_EMAIL_ADDRESS_DESC: '邮箱格式不正确，请输入正确的邮箱地址。',
  SMTP_USER_EMPTY_DESC: '请输入 SMPT 用户名。',
  DINGTALK_SECRET: '密钥',
  MAIL_TITLE: '邮件',
  DINGTALK_TITLE: '钉钉',
  WECOM_TITLE: '企业微信',
  SLACK_TITLE: 'Slack',
  WEBHOOK_TITLE: 'Webhook',
  SLACK_TOKEN: 'Slack 令牌',
  SLACK_CHANNEL: 'Slack 频道',
  TOKEN: '令牌',
  BASIC_AUTH: '基础认证',
  BEARER_TOKEN: 'Bearer 令牌',
}
