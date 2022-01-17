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
  NOTIFICATION_CONFIGURATION: 'Bildirim Yapılandırması',
  NOTIFICATION_CONFIGURATION_DESC: 'KubeSphere, birden çok bildirim kanalı için bildirim yapılandırmasını destekler. Sunucuları ve alıcıları ayarlayabilir ve bildirimleri etkinleştirebilir veya devre dışı bırakabilirsiniz.',
  NOTIFICATION_EMAIL: 'E-Posta',
  // Email
  MAIL_TITLE: 'Email',
  INVALID_PORT_DESC: 'Please enter a valid port number.',
  ENTER_PORT_NUMBER: 'Please enter a port number.',
  ALERTING_NAME: 'Alert name',
  ALERTING_SEVERITY: 'Alert severity',
  ADDRESS_EMPTY_DESC: 'Please enter an address.',
  EMAIL_EMPTY_DESC: 'Please enter an email address.',
  SERVER_SETTINGS: 'Server Settings',
  RECIPIENT_SETTINGS: 'Recipient Settings',
  NOTIFICATION_CONDITIONS: 'Notification Conditions',
  CONTAINER: 'Container',
  VALUES: 'Values',
  CONDITION_OPERATOR: 'Operator',
  NOTIFICATION_CONDITION_SETTING_TIP: 'Operators <strong>Includes values</strong> and <b>Does not include values</b> require one or more label values. Use a carriage return to separate values.</br>Operators <b>Exists</b> and <b>Does Not Exist</b> determine whether a label exists, and do not require a label value.',
  NOTIFICATION_CONDITION_SETTINGS_DESC: 'You will receive only notifications that meet the conditions.',
  INCLUDES_VALUES: 'Includes values',
  DOES_NOT_INCLUDE_VALUES: 'Does not include values',
  EXISTS: 'Exists',
  DOES_NOT_EXIST: 'Does not exist',
  TAG_INPUT_PLACEHOLDER: 'Please enter the value and press Enter to confirm',
  PATTERN_TAG_INVALID_TIP: 'Invalid label. The label can contain only uppercase and lowercase letters, numbers, hyphens (-), underscores (_), and dots (.), and must begin and end with an uppercase or lowercase letter or number.',
  PATTERN_TAG_VALUE_INVALID_TIP: 'Invalid label values. The label values can only contain uppercase and lowercase letters, numbers, hyphens (-), underscores (_) and dots (.) and must begin and end with an uppercase or lowercase letter or number and be a maximum of 63 characters.',
  INVALID_NOTIFICATION_CONDITION: 'Please enter a correct notification condition.',
  SEND_TEST_MESSAGE: 'Send Test Message',
  SEND_TEST_MESSAGE_DESC: 'After the configurations are complete, you can send a test message for verification.',
  SEND_TEST_MESSAGE_SUCCESS_DESC: 'Verified successfully. A test message has been sent to you , please check it out.',
  SMTP_SERVER_ADDRESS: 'SMTP Server Address',
  USE_SSL_SECURE_CONNECTION: 'Use SSL secure connection',
  SENDER_EMAIL: 'Sender Email Address',
  INVALID_EMAIL: 'Invalid email address format.',
  MAIL_DESC: 'Configure email notifications by setting a server and recipients.',
  INVALID_ADDRESS_DESC: 'Please enter a valid address.',
  MAX_EAMIL_COUNT: 'You can add a maximum of {count} emails.',
  SMTP_USER: 'SMTP Username',
  SMTP_PASSWORD: 'SMTP Password',
  ENTER_PASSWORD_TIP: 'Please enter the password.',
  ENTER_RECIPIENT_EMAIL_DESC: 'Please add at lease one email address of a recipient.',
  INVALID_EMAIL_ADDRESS_DESC: 'The email format is incorrect. Please enter a correct email address.',
  SMTP_USER_EMPTY_DESC: 'Please enter a SMTP username.',
  ADDED_SUCCESS_DESC: 'Added successfully.',
  POD: 'Pod',
  UPDATE_SUCCESSFUL: 'Updated successfully.',
  PATTERN_NAME_INVALID_TIP: 'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-).',
  // DingTalk
  DINGTALK_TITLE: 'DingTalk',
  DingTalk: 'DingTalk',
  DINGTALK_DESC: 'Bir konuşma veya sohbet robotu ayarlayarak DingTalk bildirimlerini yapılandırın.',
  PLEASE_ENTER_VALUE_CUSTOM: 'Lütfen bir {value} girin.',
  // DingTalk > Conversation Settings
  CONVERSATION_SETTINGS: 'Konuşma Ayarları',
  CONVERSATION_ID: 'Sohbet kimliği',
  CONVERSATION_ID_TIP: 'Konuşma kimliği ancak sistem yöneticisi tarafından yapılandırıldıktan sonra alınabilir. Görüşme kimliğini yapılandırmak için lütfen sistem yöneticisiyle iletişime geçin.',
  DINGTALK_SETTING_TIP: 'Lütfen bir konuşma veya grup sohbet robotu kurun.',
  ENTER_CONVERSATION_ID_DESC: 'Lütfen bir konuşma kimliği girin.',
  MAX_CID_COUNT: 'En fazla {count} görüşme kimliği ekleyebilirsiniz.',
  CONVERSATION_ID_EXISTS: 'Görüşme kimliği zaten var. Lütfen başka bir görüşme kimliği ekleyin.',
  // DingTalk > DingTalk Chatbot
  CHATBOT_SETTINGS: 'DingTalk Sohbet Robotu',
  KEYWORDS_LIST: 'Anahtar Kelime Listesi',
  DINGTALK_CHATBOT_SECURITY_TIP: 'Lütfen bir sır veya anahtar kelime girin.',
  ENTER_KEYWORD_DESC: 'Lütfen bir anahtar kelime girin.',
  MAX_KEYWORD_COUNT: 'En fazla {count} anahtar kelime ekleyebilirsiniz.',
  KEYWORD_EXISTS: 'Anahtar kelime zaten var. Lütfen başka bir anahtar kelime ekleyin.',
  EMPTY_KEYWORDS_DESC: 'Anahtar kelime eklenmez.',
  DINGTALK_SECRET: 'Gizli Anahtar',
  // WeCom
  WeCom: 'WeCom',
  WECOM_TITLE: 'WeCom',
  WECOM_CORP_ID: 'Şirket Kimliği',
  WECOM_AGENT_ID: 'Uygulama Aracısı Kimliği',
  WECOM_SECRET: 'Uygulama Sırrı',
  RECIPIENT_SETTINGS_TIP: 'Bildirimleri almak için en az bir öğenin yapılandırılması gerekir.',
  ENTER_WECOM_CORP_ID_DESC: 'Lütfen bir şirket kimliği girin.',
  ENTER_WECOM_AGENT_ID_DESC: 'Lütfen bir uygulama aracı kimliği girin.',
  ENTER_WECOM_SECRET_DESC: 'Lütfen bir uygulama sırrı girin.',
  WECOM_DESC: 'Bir sunucu ve alıcılar ayarlayarak WeCom bildirimlerini yapılandırın.',
  // WeCom > User ID
  USER_ID: 'Kullanıcı kimliği',
  TOUSER_LIST: 'Kullanıcı Kimlikleri eklendi',
  WECOM_TOUSER_PLACEHOLDER: 'Kullanıcı kimliği',
  EMPTY_TOUSER_DESC: 'Kullanıcı kimliği eklenemedi.',
  ENTER_TOUSER_TIP: 'Lütfen bir kullanıcı kimliği giriniz.',
  TOUSER_EXISTS: 'Kullanıcı kimliği zaten var. Lütfen başka bir kullanıcı kimliği girin.',
  MAX_TOUSER_COUNT: 'En fazla {count} kullanıcı ekleyebilirsiniz.',
  // WeCom > Department ID
  DEPARTMENT_ID: 'Bölüm Kimliği',
  WECOM_TOPARTY_PLACEHOLDER: 'Bölüm Kimliği',
  TOPARTY_LIST: 'Eklenen Departman Kimlikleri',
  EMPTY_TOPARTY_DESC: 'Departman kimliği eklenmedi.',
  ENTER_TOPARTY_TIP: 'Lütfen bir departman kimliği girin.',
  TOPARTY_EXISTS: 'Departman kimliği zaten var. Lütfen başka bir departman kimliği girin.',
  MAX_TOPARTY_COUNT: 'En fazla {count} departman ekleyebilirsiniz.',
  // WeCom > Tag ID
  TAG_ID: 'Etiket Kimliği',
  TOTAG_LIST: 'Eklenen Etiket Kimlikleri',
  WECOM_TOTAG_PLACEHOLDER: 'Etiket Kimliği',
  EMPTY_TOTAG_DESC: 'Etiket kimliği eklenemedi.',
  ENTER_TOTAG_TIP: 'Lütfen bir etiket kimliği girin.',
  TOTAG_EXISTS: 'Etiket kimliği zaten var. Lütfen başka bir etiket kimliği girin.',
  MAX_TOTAG_COUNT: '{count} etikete kadar ekleyebilirsiniz.',
  // Slack
  SLACK_TITLE: 'Slack',
  SLACK_TOKEN: 'Slack Token',
  SLACK_TOKEN_DESC: 'Lütfen bir Slack jetonu girin.',
  SLACK_CHANNEL: 'Slack Kanalı',
  CHANNEL_SETTINGS: 'Kanal Ayarları',
  ADDED_CHANNELS: 'Ekelenen Kanallar',
  EMPTY_CHANNEL_DESC: 'Kanal Eklenmedi.',
  ADD_CHANNEL_DESC: 'Lütfen bir kanal ekleyin.',
  CHANNEL_EXISTS: 'Kanal zaten var. Lütfen başka bir kanal ekleyin.',
  CHANNEL_SETTINGS_DESC: 'Lütfen bir kanal ekleyin.',
  MAX_CHANNEL_COUNT: 'En fazla {count} kanal ekleyebilirsiniz.',
  SLACK_DESC: 'Bir sunucu ve Slack kanalları ayarlayarak Slack bildirimlerini yapılandırın.',
  // Webhook
  WEBHOOK_TITLE: 'Webhook',
  WEBHOOK_URL_DESC: 'Please enter a webhook URL.',
  VERIFICATION_TYPE: 'Verification Type',
  SKIP_TLS_VERFICATION: 'Skip TLS verification (insecure)',
  VERIFICATION_TYPE_DESC: 'Please select a verification type.',
  BASIC_AUTH: 'Basic authentication',
  NO_AUTH: 'No authentication',
  BEARER_TOKEN: 'Bearer token',
  TOKEN: 'Token',
  WEBHOOK_USERNAME_EMPTY_DESC: 'Please enter a username.',
  WEBHOOK_PASSWORD_EMPTY_DESC: 'Please enter a password.',
  WEBHOOK_TOKEN_EMPTY_DESC: 'Please enter a token.'
};