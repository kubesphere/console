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
  'Notification Management': '通知管理',
  'Server Settings': '服务器配置',
  'Recipient Settings': '接收设置',
  'Receive Notification': '接收通知',

  Mail: '邮件',
  'SMTP Server Address': 'SMTP 服务器地址',
  'Use SSL Secure Connection': '使用 SSL 安全连接',

  MAIL_DESC: '可以通过邮件接收平台的通知，需要配置邮件发送服务器。',
  SENDER_MAIL: '发件人邮箱',
  MAIL_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的邮件设置已发生变化，请保存配置，或者取消修改',

  'Please enter the SMTP username': '请输入 SMTP 用户',
  'Please enter an email address': '请输入要添加的邮箱',
  'This email address has existed': '此邮箱已存在',
  'Invalid address': '地址格式错误',
  'Invalid email': '邮箱格式不合法',
  'Please add the recipient email address': '请添加接收邮箱',
  MAX_EAMIL_COUNT: '最多添加 {count} 个邮箱',

  DingTalk: '钉钉',
  'Conversation Settings': '会话设置',
  'Conversation ID': '会话 ID',
  'DingTalk Chatbot': '群机器人设置',
  'Webhook URL': 'Webhook 地址',
  keywords: '关键字',
  'Keywords Set': '已设置关键字',

  'Please enter a conversation ID': '请输入要添加的会话 ID',
  'Please enter a keyword': '请输入要添加的关键字',
  'This conversation ID has existed': '此会话 ID 已存在',
  'This keyword has existed': '此关键字已存在',
  MAX_CID_COUNT: '最多添加 {count} 个会话 ID',
  MAX_KEYWORD_COUNT: '最多添加 {count} 个关键字',

  DINGTALK_DESC: '可以通过钉钉接收平台的通知，需要配置钉钉发送服务器。',
  DINGTALK_KEYWORDS_DESC: 'ChatBot 的自定义关键字, 如需多个请以 "," 分隔',
  DINGTALK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的钉钉设置已发生变化，请保存设置，或者取消修改',

  WeCom: '企业微信',
  'WeChat API Corp ID': '企业 ID',
  'WeChat API Agent ID': '企业应用 ID',
  'WeChat API Secret': '企业应用凭证',
  'User ID': '用户 ID',
  'Department ID': '部门 ID',
  'Tag ID': '标签 ID',
  'User Set': '已设置用户',
  'Department Set': '已设置部门',
  'Tag Set': '已设置标签',

  'Please enter the WeChat API Corp ID': '请输入企业 ID',
  'Please enter the WeChat API Agent ID': '请输入企业应用 ID',
  'Please enter the WeChat API Secret': '请输入企业应用凭证',
  'Please enter a toUser': '请输入要添加的用户',
  'Please enter a toParty': '请输入要添加的部门',
  'Please enter a toTag': '请输入要添加的标签',
  'This toUser has existed': '此用户已存在',
  'This toParty has existed': '此部门已存在',
  'This toTag has existed': '此标签已存在',
  MAX_TOUSER_COUNT: '最多添加 {count} 个用户',
  MAX_TOPARTY_COUNT: '最多添加 {count} 个部门',
  MAX_TOTAG_COUNT: '最多添加 {count} 个标签',

  WECOM_DESC: '可以通过企业微信接收平台的通知，需要配置企业微信发送服务器。',
  WECOM_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的企业微信设置已发生变化，请保存设置，或者取消修改',

  Channel: '接收频道',
  'Channel Settings': '接收频道设置',
  'Channel Set': '已设置频道',

  'Please enter the Slack token': '请输入 slack token',
  'Please enter a channel': '请输入要添加的频道',
  'This channel has existed': '此频道已存在',
  'Please add the receiver channel': '请添加接收频道',
  MAX_CHANNEL_COUNT: '最多添加 {count} 个频道',

  SLACK_DESC: '可以通过 slack 接收平台的通知，需要配置 slack 发送服务器。',
  SLACK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的 slack 设置已发生变化，请保存设置，或者取消修改',

  'Webhook Settings': 'Webhook 设置',
  'Webhook Url': 'Webhook 地址',
  'Server Name': '服务名称',
  'Root CA': '根证书',
  'Client Certificate Cert': '客户端证书 Cert',
  'Client Certificate Key': '客户端证书 Key',
  'Verification Type': '验证类型',
  'Skip TLS Certification': '跳过 TLS 认证',
  'Please select a verification type': '请选择验证类型',

  WEBHOOK_SETTING_DESC:
    '可以通过 webhook 接收平台的通知，需要配置 webhook 发送服务器。',
  WEBHOOK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的 webhook 设置已发生变化，请保存设置，或者取消修改',
}
