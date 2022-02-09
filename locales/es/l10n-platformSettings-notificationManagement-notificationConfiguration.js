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
  NOTIFICATION_MANAGEMENT: 'Gestión de notificaciones',
  NOTIFICATION_CONFIGURATION: 'Configuración de la notificación',
  NOTIFICATION_CONFIGURATION_DESC: 'KubeSphere supports notification configuration for multiple notification channels. You can set servers and recipients, and enable or disable notifications.',
  NOTIFICATION_EMAIL: 'Email',
  // Email
  MAIL_TITLE: 'Email',
  INVALID_PORT_DESC: 'Please enter a valid port number.',
  ENTER_PORT_NUMBER: 'Please enter a port number.',
  ALERTING_NAME: 'Nombre de la alerta',
  ALERTING_SEVERITY: 'Gravedad de alerta',
  ADDRESS_EMPTY_DESC: 'Please enter an address.',
  EMAIL_EMPTY_DESC: 'Por favor introduce el correo electrónico',
  SERVER_SETTINGS: 'Configuración del servidor',
  RECIPIENT_SETTINGS: 'Configuración del receptor',
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
  TAG_INPUT_PLACEHOLDER: 'Ingrese el valor y presione Enter para confirmar',
  PATTERN_TAG_INVALID_TIP: 'Invalid label. The label can contain only uppercase and lowercase letters, numbers, hyphens (-), underscores (_), and dots (.), and must begin and end with an uppercase or lowercase letter or number.',
  INVALID_NOTIFICATION_CONDITION: 'Please enter a correct notification condition.',
  SEND_TEST_MESSAGE: 'Enviar mensaje de prueba',
  SEND_TEST_MESSAGE_DESC: 'After the configurations are complete, you can send a test message for verification.',
  SEND_TEST_MESSAGE_SUCCESS_DESC: 'Verified successfully. A test message has been sent to you , please check it out.',
  SMTP_SERVER_ADDRESS: 'Dirección del servidor SMTP',
  USE_SSL_SECURE_CONNECTION: 'Use SSL secure connection',
  SENDER_EMAIL: 'Correo del remitente',
  INVALID_EMAIL: 'Email inválido',
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
  DINGTALK_DESC: 'Configure DingTalk notifications by setting a conversation or chatbot.',
  PLEASE_ENTER_VALUE_CUSTOM: 'Ingrese un {value}.',
  // DingTalk > Conversation Settings
  CONVERSATION_SETTINGS: 'Configuración de conversación',
  CONVERSATION_ID: 'ID de conversación',
  CONVERSATION_ID_TIP: 'El administrador del sistema debe configurar el ID de conversación para obtenerlo. Si necesita configurarlo, comuníquese con el administrador del sistema.',
  DINGTALK_SETTING_TIP: 'Configura una conversación o un robot grupal',
  ENTER_CONVERSATION_ID_DESC: 'Please enter a conversation ID.',
  MAX_CID_COUNT: 'You can add a maximum of {count} conversation IDs.',
  CONVERSATION_ID_EXISTS: 'The conversation ID already exists. Please add another conversation ID.',
  // DingTalk > DingTalk Chatbot
  CHATBOT_SETTINGS: 'Chatbot de DingTalk',
  KEYWORDS_LIST: 'Keyword List',
  DINGTALK_CHATBOT_SECURITY_TIP: 'Please enter a secret or keywords',
  ENTER_KEYWORD_DESC: 'Please enter a keyword.',
  MAX_KEYWORD_COUNT: 'You can add a maximum of {count} keywords.',
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
  ENTER_WECOM_SECRET_DESC: 'Please enter an application Secret.',
  WECOM_DESC: 'Configure WeCom notifications by setting a server and recipients.',
  // WeCom > User ID
  USER_ID: 'ID de usuario',
  TOUSER_LIST: 'Added User IDs',
  WECOM_TOUSER_PLACEHOLDER: 'User ID',
  EMPTY_TOUSER_DESC: 'No user ID is added.',
  ENTER_TOUSER_TIP: 'Please enter a user ID.',
  TOUSER_EXISTS: 'The user ID already exists. Please enter another user ID.',
  MAX_TOUSER_COUNT: 'You can add a maximum of {count} users.',
  // WeCom > Department ID
  DEPARTMENT_ID: 'ID de departamento',
  WECOM_TOPARTY_PLACEHOLDER: 'Department ID',
  TOPARTY_LIST: 'Added Department IDs',
  EMPTY_TOPARTY_DESC: 'No department ID is added.',
  ENTER_TOPARTY_TIP: 'Please enter a department ID.',
  TOPARTY_EXISTS: 'The department ID already exists. Please enter another department ID.',
  MAX_TOPARTY_COUNT: 'You can add a maximum of {count} departments.',
  // WeCom > Tag ID
  TAG_ID: 'ID de etiqueta',
  TOTAG_LIST: 'Added Tag IDs',
  WECOM_TOTAG_PLACEHOLDER: 'Tag ID',
  EMPTY_TOTAG_DESC: 'No tag ID is added.',
  ENTER_TOTAG_TIP: 'Please enter a tag ID.',
  TOTAG_EXISTS: 'The tag ID already exists. Please enter another tag ID.',
  MAX_TOTAG_COUNT: 'You can add a maximum of {count} tags.',
  // Slack
  SLACK_TITLE: 'Slack',
  SLACK_TOKEN: 'Slack Token',
  SLACK_TOKEN_DESC: 'Please enter a Slack token.',
  SLACK_CHANNEL: 'Slack channel',
  CHANNEL_SETTINGS: 'Configuración de canal',
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
  VERIFICATION_TYPE: 'Verificar tipo',
  SKIP_TLS_VERFICATION: 'Skip TLS verification (insecure)',
  VERIFICATION_TYPE_DESC: 'Please select a verification type.',
  BASIC_AUTH: 'Basic authentication',
  NO_AUTH: 'No authentication',
  BEARER_TOKEN: 'Bearer token',
  TOKEN: 'Token'
};