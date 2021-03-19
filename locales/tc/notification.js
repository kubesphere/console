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
  'Server Settings': '服務器配置',
  'Receiver Settings': '接收設置',
  'Receive Notification': '接收通知',

  Mail: '郵件',
  'SMTP Server Address': 'SMTP 服務器地址',
  'Use SSL Secure Connection': '使用 SSL 安全連接',

  MAIL_DESC: '可以通過郵件接收平臺的通知，需要配置郵件發送服務器。',
  SENDER_MAIL: '發件人郵箱',
  MAIL_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您當前的郵件設置已發生變化，請保存配置，或者取消修改',

  'Please input SMTP user': '請輸入 SMTP 用戶',
  'Please enter an email address': '請輸入要添加的郵箱',
  'This email has existed': '此郵箱已存在',
  'Invalid email': '郵箱格式不合法',
  'Add up to 50 mail': '最多添加 50 個郵箱',
  'Please add receiver email': '請添加接收郵箱',

  DingTalk: '釘釘',
  'Conversation Settings': '會話設置',
  'Conversation ID': '會話 ID',
  'DingTalk Chatbot': '群機器人設置',
  'Webhook URL': 'Webhook 地址',
  keywords: '關鍵字',
  'Keywords Set': '已設置關鍵字',

  'Please input a conversation ID to add': '請輸入要添加的會話 ID',
  'Please input a keywords to add': '請輸入要添加的關鍵字',
  'This conversation ID has existed': '此會話 ID 已存在',
  'This keywords has existed': '此關鍵字已存在',

  DINGTALK_DESC: '可以通過釘釘接收平臺的通知，需要配置釘釘發送服務器。',
  DINGTALK_KEYWORDS_DESC: 'ChatBot 的自定義關鍵字, 如需多個請以 "," 分隔',
  DINGTALK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您當前的釘釘設置已發生變化，請保存設置，或者取消修改',

  WeCom: '企業微信',
  'Wechat Api Corp Id': '企業 ID',
  'Wechat Api Agent Id': '企業應用 ID',
  'Wechat Api Secret': '企業應用憑證',
  Department: '部門',
  'User Set': '已設置用戶',
  'Department Set': '已設置部門',
  'Tag Set': '已設置標簽',

  'Please input wechat api corp id': '請輸入企業 ID',
  'Please input wechat api agent id': '請輸入企業應用 ID',
  'Please input wechat api secret': '請輸入企業應用憑證',
  'This toUser has existed': '此用戶已存在',
  'This toParty has existed': '此部門已存在',
  'This toTag has existed': '此標簽已存在',

  WECOM_DESC: '可以通過企業微信接收平臺的通知，需要配置企業微信發送服務器。',
  WECOM_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您當前的企業微信設置已發生變化，請保存設置，或者取消修改',

  Channel: '接收頻道',
  'Channel Settings': '接收頻道設置',
  'Channel Set': '已設置頻道',

  'Please input slack token': '請輸入 slack token',
  'Please input a channel to add': '請輸入要添加的頻道',
  'This channel has existed': '此頻道已存在',
  'Please add receiver channel': '請添加接收頻道',

  SLACK_DESC: '可以通過 slack 接收平臺的通知，需要配置 slack 發送服務器。',
  SLACK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您當前的 slack 設置已發生變化，請保存設置，或者取消修改',

  'Webhook Settings': 'Webhook 設置',
  'Webhook Url': 'Webhook 地址',
  'Server Name': '服務名稱',
  'Root CA': '根證書',
  'Client Certificate Cert': '客戶端證書 Cert',
  'Client Certificate Key': '客戶端證書 Key',
  'Verify Type': '驗證類型',
  'Skip TLS Certification': '跳過 TLS 認證',

  WEBHOOK_SETTING_DESC:
    '可以通過 webhook 接收平臺的通知，需要配置 webhook 發送服務器。',
  WEBHOOK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    '您當前的 webhook 設置已發生變化，請保存設置，或者取消修改',
}
