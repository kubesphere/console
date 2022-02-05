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
  MAIL_TITLE: 'E-Posta',
  INVALID_PORT_DESC: 'Lütfen geçerli bir bağlantı noktası numarası girin.',
  ENTER_PORT_NUMBER: 'Lütfen bir bağlantı noktası numarası girin.',
  ALERTING_NAME: 'Uyarı adı',
  ALERTING_SEVERITY: 'Uyarı şiddeti',
  ADDRESS_EMPTY_DESC: 'Bir Adresi giriniz.',
  EMAIL_EMPTY_DESC: 'Lütfen bir e-posta adresi giriniz.',
  SERVER_SETTINGS: 'Sunucu Ayarları',
  RECIPIENT_SETTINGS: 'Alıcı Ayarları',
  NOTIFICATION_CONDITIONS: 'Bildirim Koşulları',
  CONTAINER: 'Konteyner',
  VALUES: 'Değerler',
  CONDITION_OPERATOR: 'Operatör',
  NOTIFICATION_CONDITION_SETTING_TIP: '<strong>Değerleri içerir</strong> ve <b>Değerleri içermez</b> işleçleri bir veya daha fazla etiket değeri gerektirir. Değerleri ayırmak için bir satır başı kullanın.</br><b>Var</b> ve <b>Varolmaz</b> işleçleri bir etiketin var olup olmadığını belirler ve bir etiket değeri gerektirmez.',
  NOTIFICATION_CONDITION_SETTINGS_DESC: 'Yalnızca koşulları karşılayan bildirimler alacaksınız.',
  INCLUDES_VALUES: 'Değerleri içerir',
  DOES_NOT_INCLUDE_VALUES: 'Değerleri içermez',
  EXISTS: 'Mevcut',
  DOES_NOT_EXIST: 'Mevcut değil',
  TAG_INPUT_PLACEHOLDER: 'Lütfen değeri girin ve onaylamak için Enter\'a basın',
  PATTERN_TAG_INVALID_TIP: 'Geçersiz etiket. Etiket yalnızca büyük ve küçük harfler, sayılar, kısa çizgiler (-), alt çizgiler (_) ve noktalar (.) içerebilir ve bir büyük veya küçük harf veya sayı ile başlamalı ve bitmelidir.',
  PATTERN_TAG_VALUE_INVALID_TIP: 'Geçersiz etiket değerleri. Etiket değerleri yalnızca büyük ve küçük harf, sayı, kısa çizgi (-), alt çizgi (_) ve nokta (.) içerebilir ve bir büyük veya küçük harf veya sayı ile başlayıp bitmeli ve maksimum 63 karakter olmalıdır.',
  INVALID_NOTIFICATION_CONDITION: 'Lütfen doğru bir bildirim koşulu girin.',
  SEND_TEST_MESSAGE: 'Test Mesajı Gönder',
  SEND_TEST_MESSAGE_DESC: 'Konfigürasyonlar tamamlandıktan sonra doğrulama için test mesajı gönderebilirsiniz.',
  SEND_TEST_MESSAGE_SUCCESS_DESC: 'Başarıyla doğrulandı. Size bir test mesajı gönderildi, lütfen kontrol edin.',
  SMTP_SERVER_ADDRESS: 'SMTP sunucu adresi',
  USE_SSL_SECURE_CONNECTION: 'SSL Güvenli bağlantı kullan',
  SENDER_EMAIL: 'Gönderen Email Adresi',
  INVALID_EMAIL: 'Geçersiz e-posta adresi formatı.',
  MAIL_DESC: 'Bir sunucu ve alıcılar ayarlayarak e-posta bildirimlerini yapılandırın.',
  INVALID_ADDRESS_DESC: 'Lütfen geçerli bir adres girin.',
  MAX_EAMIL_COUNT: 'En fazla {count} e-posta ekleyebilirsiniz.',
  SMTP_USER: 'SMTP Kullanıcı Adı',
  SMTP_PASSWORD: 'SMTP Parolası',
  ENTER_PASSWORD_TIP: 'Lütfen şifreyi giriniz.',
  ENTER_RECIPIENT_EMAIL_DESC: 'Lütfen bir alıcının e-posta adresini kiralayın.',
  INVALID_EMAIL_ADDRESS_DESC: 'E-posta biçimi yanlış. Lütfen doğru bir e-posta adresi girin.',
  SMTP_USER_EMPTY_DESC: 'Lütfen bir SMTP kullanıcı adı girin.',
  ADDED_SUCCESS_DESC: 'Başarıyla eklendi.',
  POD: 'Koza',
  UPDATE_SUCCESSFUL: 'Başarıyla güncellendi.',
  PATTERN_NAME_INVALID_TIP: 'Geçersiz isim. Ad yalnızca küçük harfler, sayılar ve kısa çizgiler (-) içerebilir.',
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
  KEYWORD_EXISTS: 'The keyword already exists. Please add another keyword.',
  EMPTY_KEYWORDS_DESC: 'No keyword is added.',
  DINGTALK_SECRET: 'Secret',
  // WeCom
  WeCom: 'WeCom',
  WECOM_TITLE: 'WeCom',
  WECOM_CORP_ID: 'Corporation ID',
  WECOM_AGENT_ID: 'App AgentId',
  WECOM_SECRET: 'App Secret',
  RECIPIENT_SETTINGS_TIP: 'At least one item needs to be configured to receive notifications.',
  ENTER_WECOM_CORP_ID_DESC: 'Please enter a corporation ID.',
  ENTER_WECOM_AGENT_ID_DESC: 'Please enter an applicaiton AgentId.',
  ENTER_WECOM_SECRET_DESC: 'Please enter an application secret.',
  WECOM_DESC: 'Configure WeCom notifications by setting a server and recipients.',
  // WeCom > User ID
  USER_ID: 'User ID',
  TOUSER_LIST: 'Added User IDs',
  WECOM_TOUSER_PLACEHOLDER: 'User ID',
  EMPTY_TOUSER_DESC: 'No user ID is added.',
  ENTER_TOUSER_TIP: 'Please enter a user ID.',
  TOUSER_EXISTS: 'The user ID already exists. Please enter another user ID.',
  MAX_TOUSER_COUNT: 'You can add a maximum of {count} users.',
  // WeCom > Department ID
  DEPARTMENT_ID: 'Department ID',
  WECOM_TOPARTY_PLACEHOLDER: 'Department ID',
  TOPARTY_LIST: 'Added Department IDs',
  EMPTY_TOPARTY_DESC: 'No department ID is added.',
  ENTER_TOPARTY_TIP: 'Please enter a department ID.',
  TOPARTY_EXISTS: 'The department ID already exists. Please enter another department ID.',
  MAX_TOPARTY_COUNT: 'You can add a maximum of {count} departments.',
  // WeCom > Tag ID
  TAG_ID: 'Tag ID',
  TOTAG_LIST: 'Added Tag IDs',
  WECOM_TOTAG_PLACEHOLDER: 'Tag ID',
  EMPTY_TOTAG_DESC: 'No tag ID is added.',
  ENTER_TOTAG_TIP: 'Please enter a tag ID.',
  TOTAG_EXISTS: 'The tag ID already exists. Please enter another tag ID.',
  MAX_TOTAG_COUNT: 'You can add up to {count} tags.',
  // Slack
  SLACK_TITLE: 'Slack',
  SLACK_TOKEN: 'Slack Token',
  SLACK_TOKEN_DESC: 'Please enter a Slack token.',
  SLACK_CHANNEL: 'Slack channel',
  CHANNEL_SETTINGS: 'Channel Settings',
  ADDED_CHANNELS: 'Added Channels',
  EMPTY_CHANNEL_DESC: 'No channel is added.',
  ADD_CHANNEL_DESC: 'Please add a channel.',
  CHANNEL_EXISTS: 'The channel already exists. Please add another channel.',
  CHANNEL_SETTINGS_DESC: 'Please add a channel.',
  MAX_CHANNEL_COUNT: 'You can add a maximum of {count} channels.',
  SLACK_DESC: 'Configure Slack notifications by setting a server and Slack channels.',
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