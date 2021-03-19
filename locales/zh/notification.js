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
  'Receiver Settings': '接收设置',
  'Receive Notification': '接收通知',

  Mail: '邮件',
  'SMTP Server Address': 'SMTP 服务器地址',
  'Use SSL Secure Connection': '使用 SSL 安全连接',

  MAIL_DESC: '可以通过邮件接收平台的通知，需要配置邮件发送服务器。',
  SENDER_MAIL: '发件人邮箱',
  MAIL_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的邮件设置已发生变化，请保存配置，或者取消修改',

  'Please input SMTP user': '请输入 SMTP 用户',
  'Please enter an email address': '请输入要添加的邮箱',
  'This email has existed': '此邮箱已存在',
  'Invalid email': '邮箱格式不合法',
  'Add up to 50 mail': '最多添加 50 个邮箱',
  'Please add receiver email': '请添加接收邮箱',

  DingTalk: '钉钉',
  'Conversation Settings': '会话设置',
  'Conversation ID': '会话 ID',
  'DingTalk Chatbot': '群机器人设置',
  'Webhook URL': 'Webhook 地址',
  keywords: '关键字',
  'Keywords Set': '已设置关键字',

  'Please input a conversation ID to add': '请输入要添加的会话 ID',
  'Please input a keywords to add': '请输入要添加的关键字',
  'This conversation ID has existed': '此会话 ID 已存在',
  'This keywords has existed': '此关键字已存在',

  DINGTALK_DESC: '可以通过钉钉接收平台的通知，需要配置钉钉发送服务器。',
  DINGTALK_KEYWORDS_DESC: 'ChatBot 的自定义关键字, 如需多个请以 "," 分隔',
  DINGTALK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的钉钉设置已发生变化，请保存设置，或者取消修改',

  WeCom: '企业微信',
  'Wechat Api Corp Id': '企业 ID',
  'Wechat Api Agent Id': '企业应用 ID',
  'Wechat Api Secret': '企业应用凭证',
  Department: '部门',
  'User Set': '已设置用户',
  'Department Set': '已设置部门',
  'Tag Set': '已设置标签',

  'Please input wechat api corp id': '请输入企业 ID',
  'Please input wechat api agent id': '请输入企业应用 ID',
  'Please input wechat api secret': '请输入企业应用凭证',
  'This toUser has existed': '此用户已存在',
  'This toParty has existed': '此部门已存在',
  'This toTag has existed': '此标签已存在',

  WECOM_DESC: '可以通过企业微信接收平台的通知，需要配置企业微信发送服务器。',
  WECOM_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的企业微信设置已发生变化，请保存设置，或者取消修改',

  Channel: '接收频道',
  'Channel Settings': '接收频道设置',
  'Channel Set': '已设置频道',

  'Please input slack token': '请输入 slack token',
  'Please input a channel to add': '请输入要添加的频道',
  'This channel has existed': '此频道已存在',
  'Please add receiver channel': '请添加接收频道',

  SLACK_DESC: '可以通过 slack 接收平台的通知，需要配置 slack 发送服务器。',
  SLACK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的 slack 设置已发生变化，请保存设置，或者取消修改',

  'Webhook Settings': 'Webhook 设置',
  'Webhook Url': 'Webhook 地址',
  'Server Name': '服务名称',
  'Root CA': '根证书',
  'Client Certificate Cert': '客户端证书 Cert',
  'Client Certificate Key': '客户端证书 Key',
  'Verify Type': '验证类型',
  'Skip TLS Certification': '跳过 TLS 认证',

  WEBHOOK_SETTING_DESC:
    '可以通过 webhook 接收平台的通知，需要配置 webhook 发送服务器。',
  WEBHOOK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您当前的 webhook 设置已发生变化，请保存设置，或者取消修改',
}
