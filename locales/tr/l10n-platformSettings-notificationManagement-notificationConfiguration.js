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
  WEBHOOK_TITLE: 'Web kancası',
  WEBHOOK_URL_DESC: 'Lütfen bir web kancası URL\'si girin.',
  VERIFICATION_TYPE: 'Doğrulama Tipi',
  SKIP_TLS_VERFICATION: 'TLS doğrulamasını atla (güvensiz)',
  VERIFICATION_TYPE_DESC: 'Lütfen bir doğrulama türü seçin.',
  BASIC_AUTH: 'Temel Kimlik Doğrulama',
  NO_AUTH: 'Kimlik doğrulama yok',
  BEARER_TOKEN: 'Bearer Jetonu',
  TOKEN: 'Jeton',
  WEBHOOK_USERNAME_EMPTY_DESC: 'Lütfen kullanıcı adınızı girin.',
  WEBHOOK_PASSWORD_EMPTY_DESC: 'Lütfen bir şifre girin.',
  WEBHOOK_TOKEN_EMPTY_DESC: 'Lütfen bir jeton girin.'
};