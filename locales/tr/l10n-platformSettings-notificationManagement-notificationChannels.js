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
  NOTIFICATION_MANAGEMENT: 'Bildirim Yönetimi',
  NOTIFICATION_CHANNELS: 'Notification Channels',
  NOTIFICATION_CHANNELS_DESC: 'Notify users through multiple channels when resource metrics meet conditions configured in rule groups.',
  // Email
  MAIL_TITLE: 'E-Posta',
  MAIL_DESC: 'Send notifications to email addresses.',
  INVALID_PORT_DESC: 'Lütfen geçerli bir bağlantı noktası numarası girin.',
  ENTER_PORT_NUMBER: 'Lütfen bir bağlantı noktası numarası girin.',
  ALERTING_NAME: 'Uyarı adı',
  ALERTING_SEVERITY: 'Uyarı şiddeti',
  ADDRESS_EMPTY_DESC: 'Bir Adresi giriniz.',
  EMAIL_EMPTY_DESC: 'Lütfen bir e-posta adresi giriniz.',
  SERVER_SETTINGS: 'Sunucu Ayarları',
  RECIPIENT_SETTINGS: 'Alıcı Ayarları',
  FILTER_CONDITIONS: 'Filter Conditions',
  CONTAINER: 'Konteyner',
  VALUES: 'Değerler',
  CONDITION_OPERATOR: 'Operatör',
  NOTIFICATION_CONDITION_SETTING_TIP: 'The <strong>Contain</strong> and <strong>Not contain</strong> operators require one or more values. You can press <strong>Enter</strong> to set multiple values.',
  NOTIFICATION_CONDITION_SETTINGS_DESC: 'Set the system to send only alerts that meet the conditions.',
  CONTAIN: 'Contain',
  NOT_CONTAIN: 'Not contain',
  EXIST: 'Exist',
  NOT_EXIST: 'Not exist',
  PATTERN_TAG_INVALID_TIP: 'Geçersiz etiket. Etiket yalnızca büyük ve küçük harfler, sayılar, kısa çizgiler (-), alt çizgiler (_) ve noktalar (.) içerebilir ve bir büyük veya küçük harf veya sayı ile başlamalı ve bitmelidir.',
  PATTERN_TAG_VALUE_INVALID_TIP: 'Invalid value. The value can only contain uppercase and lowercase letters, numbers, hyphens (-), underscores (_) and dots (.) and must begin and end with an uppercase or lowercase letter or number and be a maximum of 63 characters.',
  INVALID_NOTIFICATION_CONDITION: 'Lütfen doğru bir bildirim koşulu girin.',
  SEND_TEST_MESSAGE: 'Test Mesajı Gönder',
  SEND_TEST_MESSAGE_DESC: 'Send a test message to verify that the notification channel is working properly.',
  SEND_TEST_MESSAGE_SUCCESS_DESC: 'Verified successfully. A test message has been sent.',
  SMTP_SERVER_ADDRESS: 'SMTP sunucu adresi',
  USE_SSL_SECURE_CONNECTION: 'SSL Güvenli bağlantı kullan',
  SENDER_EMAIL: 'Gönderen Email Adresi',
  INVALID_EMAIL: 'Geçersiz e-posta adresi formatı.',
  INVALID_ADDRESS_DESC: 'Lütfen geçerli bir adres girin.',
  MAX_EAMIL_COUNT: 'En fazla {count} e-posta ekleyebilirsiniz.',
  SMTP_USER: 'SMTP Kullanıcı Adı',
  SMTP_PASSWORD: 'SMTP Parolası',
  ENTER_PASSWORD_TIP: 'Lütfen bir şifre girin.',
  ENTER_RECIPIENT_EMAIL_DESC: 'Please add at lease one email address.',
  INVALID_EMAIL_ADDRESS_DESC: 'Incorrect email format.',
  SMTP_USER_EMPTY_DESC: 'Please enter an SMTP username.',
  ADDED_SUCCESS_DESC: 'Başarıyla eklendi.',
  POD: 'Koza',
  UPDATE_SUCCESSFUL: 'Başarıyla güncellendi.',
  // Feishu
  FEISHU: 'Feishu',
  FEISHU_TITLE: 'Feishu',
  FEISHU_DESC: 'Send notifications to Feishu users.',
  PLEASE_ENTER_APP_ID: 'Please enter an app ID.',
  CONVERSATION_SETTINGS: 'Conversation Settings',
  USER_ID: 'User ID',
  DEPARTMENT_ID: 'Department ID',
  FEISHU_RECEIPIENT_SETTINGS_DESC: 'To receive notifications, please set at least one user ID or department ID.',
  FEISHU_SECRET: 'Gizli',
  // DingTalk
  DINGTALK_TITLE: 'DingTalk',
  DINGTALK: 'DingTalk',
  DINGTALK_DESC: 'Send notifications to DingTalk users.',
  PLEASE_ENTER_APP_KEY: 'Please enter an app key.',
  PLEASE_ENTER_APP_SECRET: 'Please enter an app secret.',
  PLEASE_ENTER_CHAT_ID: 'Please enter a chat ID.',
  PLEASE_ENTER_WEBHOOK_URL: 'Lütfen bir web kancası URL\'si girin.',
  // DingTalk > Chat Settings
  CHAT_SETTINGS: 'Chat Settings',
  CHAT_ID_TIP: 'Contact the DingTalk administrator to obtain the chat ID.',
  DINGTALK_SETTING_TIP: 'Please set up a chat or group chatbot.',
  ENTER_CHAT_ID_DESC: 'Please enter a chat ID.',
  MAX_CID_COUNT: 'You can add a maximum of {count} chat IDs.',
  CHAT_ID_EXISTS: 'The chat ID already exists. Please add another chat ID.',
  // DingTalk > DingTalk Chatbot
  CHATBOT_SETTINGS: 'DingTalk Sohbet Robotu',
  KEYWORDS_LIST: 'Added Keywords',
  DINGTALK_CHATBOT_SECURITY_TIP: 'Please enter a secret or keyword.',
  ENTER_KEYWORD_DESC: 'Lütfen bir anahtar kelime girin.',
  MAX_KEYWORD_COUNT: 'En fazla {count} anahtar kelime ekleyebilirsiniz.',
  KEYWORD_EXISTS: 'Anahtar kelime zaten var. Lütfen başka bir anahtar kelime ekleyin.',
  EMPTY_KEYWORDS_DESC: 'Anahtar kelime eklenmez.',
  // WeCom
  WECOM: 'WeCom',
  WECOM_TITLE: 'WeCom',
  WECOM_DESC: 'Send notifications to WeCom users.',
  RECIPIENT_SETTINGS_TIP: 'Enter at least one user ID, department ID, or tag ID.',
  ENTER_WECOM_CORP_ID_DESC: 'Please enter a corp ID.',
  ENTER_WECOM_AGENT_ID_DESC: 'Please enter an app agent ID.',
  ENTER_WECOM_SECRET_DESC: 'Please enter an app secret.',
  // WeCom > User ID
  TOUSER_LIST: 'Kullanıcı Kimlikleri eklendi',
  EMPTY_TOUSER_DESC: 'Kullanıcı kimliği eklenemedi.',
  TOUSER_EXISTS: 'Kullanıcı kimliği zaten var. Lütfen başka bir kullanıcı kimliği girin.',
  MAX_TOUSER_COUNT: 'You can add a maximum of {count} user IDs.',
  // WeCom > Department ID
  TOPARTY_LIST: 'Eklenen Departman Kimlikleri',
  EMPTY_TOPARTY_DESC: 'Departman kimliği eklenmedi.',
  TOPARTY_EXISTS: 'Departman kimliği zaten var. Lütfen başka bir departman kimliği girin.',
  MAX_TOPARTY_COUNT: 'You can add a maximum of {count} department IDs.',
  // WeCom > Tag ID
  TOTAG_LIST: 'Eklenen Etiket Kimlikleri',
  EMPTY_TOTAG_DESC: 'Etiket kimliği eklenemedi.',
  ENTER_TOTAG_TIP: 'Lütfen bir etiket kimliği girin.',
  TOTAG_EXISTS: 'Etiket kimliği zaten var. Lütfen başka bir etiket kimliği girin.',
  MAX_TOTAG_COUNT: 'You can add a maximum of {count} tag IDs.',
  // Slack
  SLACK: 'Slack',
  SLACK_TITLE: 'Slack',
  SLACK_DESC: 'Send notifications to Slack users.',
  SLACK_TOKEN: 'Slack Token',
  SLACK_TOKEN_DESC: 'Lütfen bir Slack jetonu girin.',
  SLACK_CHANNEL: 'Slack Channel',
  CHANNEL_SETTINGS: 'Slack Channel Settings',
  ADDED_CHANNELS: 'Added Slack Channels',
  EMPTY_CHANNEL_DESC: 'No Slack channel is added.',
  ADD_CHANNEL_TIP: 'Please add a Slack channel.',
  CHANNEL_EXISTS: 'The Slack channel already exists. Please add another Slack channel.',
  MAX_CHANNEL_COUNT: 'You can add a maximum of {count} Slack channels.',
  // Webhook
  WEBHOOK: 'Web kancası',
  WEBHOOK_TITLE: 'Web kancası',
  WEBHOOK_DESC: 'Send notifications to a webhook.',
  WEBHOOK_URL_DESC: 'Lütfen bir web kancası URL\'si girin.',
  AUTHENTICATION_TYPE: 'Authentication Type',
  AUTHENTICATION_TYPE_DESC: 'Please select an authentication type.',
  SKIP_TLS_VERFICATION: 'TLS doğrulamasını atla (güvensiz)',
  BASIC_AUTH: 'Temel Kimlik Doğrulama',
  NO_AUTH: 'Kimlik doğrulama yok',
  BEARER_TOKEN: 'Bearer Jetonu',
  TOKEN: 'Jeton',
  WEBHOOK_USERNAME_EMPTY_DESC: 'Lütfen kullanıcı adınızı girin.',
  WEBHOOK_PASSWORD_EMPTY_DESC: 'Lütfen bir şifre girin.',
  WEBHOOK_TOKEN_EMPTY_DESC: 'Lütfen bir jeton girin.'
};