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
  NOTIFICATION_MANAGEMENT: 'Gestión de notificaciones',
  'Notification Management': 'Gestión de notificaciones',
  NOTIFICATION_CONFIGURATION: 'Configuración de la notificación',
  'Notification Configuration': 'Configuración de la notificación',
  SERVER_SETTINGS: 'Configuración del servidor',
  RECIPIENT_SETTINGS: 'Configuración del receptor',
  'Receive Notification': 'Recibir notificación',

  NOTIFICATION_CONFIGURATION_DESC:
    'KubeSphere supports notification configuration for multiple notification channels. You can set servers and recipients, and enable or disable notifications.',

  'Notification On': 'Notificación activada',
  'Notification Off': 'Notificación desactivada',

  NOTIFICATION_CONDITIONS: 'Notification Conditions',
  NOTIFICATION_CONDITION_SETTING_TIP:
    'Operators <strong>Includes values</strong> and <b>Does not include values</b> require one or more label values. Use a carriage return to separate values.</br>Operators <b>Exists</b> and <b>Does Not Exist</b> determine whether a label exists, and do not require a label value.',
  NOTIFICATION_CONDITION_SETTINGS_DESC:
    'You will receive only notifications that meet the conditions.',
  INCLUDES_VALUES: 'Includes values',
  DOES_NOT_INCLUDE_VALUES: 'Does not include values',
  EXISTS: 'Exists',
  DOES_NOT_EXIST: 'Does not exist',
  'Please select a tag': 'Seleccione una etiqueta',
  'Please select a regex filter':
    'Seleccione un filtro de expresiones regulares',
  'Invalid notification condition': 'Condición de notificación no válida',
  TAG_INPUT_PLACEHOLDER: 'Ingrese el valor y presione Enter para confirmar',
  INVALID_NOTIFICATION_CONDITION:
    'Please enter a correct notification condition.',

  SEND_TEST_MESSAGE: 'Enviar mensaje de prueba',
  SEND_TEST_MESSAGE_DESC:
    'After the configurations are complete, you can send a test message for verification.',
  SEND_TEST_MESSAGE_SUCCESS_DESC:
    'Verified successfully. A test message has been sent to you , please check it out.',

  Mail: 'Correo',
  SMTP_SERVER_ADDRESS: 'Dirección del servidor SMTP',
  USE_SSL_SECURE_CONNECTION: 'Use SSL secure connection',

  MAIL_SETTING_DESC:
    'Puede recibir notificaciones de la plataforma por correo y debe configurar el servidor de envío de correo.',
  SENDER_MAIL: 'Correo del remitente',
  MAIL_DESC:
    'Configure email notifications by setting a server and recipients.',
  SENDER_EMAIL: 'Correo del remitente',
  MAIL_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Su configuración de correo actual ha cambiado, guarde la configuración o cancele la modificación',

  'Please enter an email address': 'Ingrese un correo electrónico para agregar',
  'This email address has existed': 'Este correo electrónico ha existido',
  INVALID_ADDRESS_DESC: 'Please enter a valid address.',
  INVALID_EMAIL: 'Email inválido',
  'Please add the recipient email address':
    'Por favor, agregue el correo electrónico del destinatario',
  MAX_EAMIL_COUNT: 'You can add a maximum of {count} emails.',

  DingTalk: 'DingTalk',
  CONVERSATION_SETTINGS: 'Configuración de conversación',
  CONVERSATION_ID: 'ID de conversación',
  CHATBOT_SETTINGS: 'Chatbot de DingTalk',
  keywords: 'palabras clave',
  KEYWORDS_LIST: 'Keyword List',
  CONVERSATION_ID_TIP:
    'El administrador del sistema debe configurar el ID de conversación para obtenerlo. Si necesita configurarlo, comuníquese con el administrador del sistema.',

  ENTER_CONVERSATION_ID_DESC: 'Please enter a conversation ID.',
  ENTER_KEYWORD_DESC: 'Please enter a keyword.',
  CONVERSATION_ID_EXISTS:
    'The conversation ID already exists. Please add another conversation ID.',
  KEYWORD_EXISTS: 'The keyword already exists. Please add another keyword.',
  MAX_CID_COUNT: 'You can add a maximum of {count} conversation IDs.',
  MAX_KEYWORD_COUNT: 'You can add a maximum of {count} keywords.',
  EMPTY_KEYWORDS_DESC: 'No keyword is added.',
  DINGTALK_SETTING_TIP: 'Configura una conversación o un robot grupal',
  DINGTALK_CHATBOT_SECURITY_TIP: 'Please enter a secret or keywords',

  DINGTALK_DESC:
    'Configure DingTalk notifications by setting a conversation or chatbot.',
  DINGTALK_KEYWORDS_DESC:
    'Palabras clave personalizadas de ChatBot, si necesita más de una, sepárelas con "," ',
  DINGTALK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Su configuración actual de Dingding ha sido cambiada, guarde la configuración o cancele la modificación',

  WeCom: 'WeCom',
  WECOM_CORP_ID: 'Corporation ID',
  WECOM_AGENT_ID: 'App AgentId',
  WECOM_SECRET: 'App Secret',
  USER_ID: 'ID de usuario',
  DEPARTMENT_ID: 'ID de departamento',
  TAG_ID: 'ID de etiqueta',
  TOUSER_LIST: 'Added User IDs',
  TOPARTY_LIST: 'Added Department IDs',
  TOTAG_LIST: 'Added Tag IDs',
  WECOM_TOUSER_PLACEHOLDER: 'User ID',
  WECOM_TOPARTY_PLACEHOLDER: 'Department ID',
  WECOM_TOTAG_PLACEHOLDER: 'Tag ID',
  RECIPIENT_SETTINGS_TIP:
    'At least one item needs to be configured to receive notifications.',
  EMPTY_TOUSER_DESC: 'No user ID is added.',
  EMPTY_TOPARTY_DESC: 'No department ID is added.',
  EMPTY_TOTAG_DESC: 'No tag ID is added.',

  ENTER_WECOM_CORP_ID_DESC: 'Please enter a corporation ID.',
  ENTER_WECOM_AGENT_ID_DESC: 'Please enter an applicaiton AgentId.',
  ENTER_WECOM_SECRET_DESC: 'Please enter an application Secret.',
  'Please enter a user': 'Por favor ingrese un usuario',
  'Please enter a department': 'Por favor ingrese un departamento',
  'Please enter a tag': 'Ingrese una etiqueta',
  TOUSER_EXISTS: 'The user ID already exists. Please enter another user ID.',
  TOPARTY_EXISTS:
    'The department ID already exists. Please enter another department ID.',
  TOTAG_EXISTS: 'The tag ID already exists. Please enter another tag ID.',
  MAX_TOUSER_COUNT: 'You can add a maximum of {count} users.',
  MAX_TOPARTY_COUNT: 'You can add a maximum of {count} departments.',
  MAX_TOTAG_COUNT: 'You can add a maximum of {count} tags.',

  WECOM_DESC:
    'Configure WeCom notifications by setting a server and recipients.',
  WECOM_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Su configuración corporativa actual de WeChat ha cambiado, guarde la configuración o cancele la modificación',

  Channel: 'Canal',
  CHANNEL_SETTINGS: 'Configuración de canal',
  ADDED_CHANNELS: 'Added Channels',
  EMPTY_CHANNEL_DESC: 'No channel is added.',

  SLACK_TOKEN_DESC: 'Please enter a Slack token.',
  ADD_CHANNEL_DESC: 'Please add a channel.',
  CHANNEL_EXISTS: 'The channel already exists. Please add another channel.',
  CHANNEL_SETTINGS_DESC: 'Please add a channel.',
  MAX_CHANNEL_COUNT: 'You can add a maximum of {count} channels.',

  SLACK_DESC:
    'Configure Slack notifications by setting a server and Slack channels.',
  SLACK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Su configuración actual de holgura ha cambiado, guarde la configuración o cancele la modificación',

  'Webhook Settings': 'Configuración de webhook',
  'Webhook Url': 'URL del webhook',
  'Server Name': 'Nombre del servidor',
  'Root CA': 'CA raíz',
  'Client Certificate Cert': 'Certificado de certificado de cliente',
  'Client Certificate Key': 'Clave de certificado de cliente',
  VERIFICATION_TYPE: 'Verificar tipo',
  SKIP_TLS_VERFICATION: 'Skip TLS verification (insecure)',
  VERIFICATION_TYPE_DESC: 'Please select a verification type.',

  WEBHOOK_SETTING_DESC:
    'Puede recibir notificaciones de la plataforma a través de webhook y debe configurar el servidor de envío de webhook.',
  WEBHOOK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Su configuración actual de webhook ha cambiado, guarde la configuración o cancele la modificación',

  PLEASE_ENTER_VALUE_CUSTOM: 'Ingrese un {value}.',
  // Notification Configuration
  CONTAINER: 'Container',
  VALUES: 'Values',
  LABEL: 'Label',
  CONDITION_OPERATOR: 'Operator',
  SMTP_USER: 'SMTP Username',
  SMTP_PASSWORD: 'SMTP Password',
  ENTER_PASSWORD_TIP: 'Please enter the password.',
  ENTER_RECIPIENT_EMAIL_DESC:
    'Please add at lease one email address of a recipient.',
  INVALID_EMAIL_ADDRESS_DESC:
    'The email format is incorrect. Please enter a correct email address.',
  SMTP_USER_EMPTY_DESC: 'Please enter a SMTP username.',
  DINGTALK_SECRET: 'Secret',
  MAIL_TITLE: 'Email',
  DINGTALK_TITLE: 'DingTalk',
  WECOM_TITLE: 'WeCom',
  SLACK_TITLE: 'Slack',
  WEBHOOK_TITLE: 'Webhook',

  // Notification Configuration
  ENTER_TOUSER_TIP: 'Please enter a user ID.',
  ENTER_TOPARTY_TIP: 'Please enter a department ID.',
  ENTER_TOTAG_TIP: 'Please enter a tag ID.',
  SLACK_TOKEN: 'Slack Token',
  SLACK_CHANNEL: 'Slack channel',
  TOKEN: 'Token',
  BASIC_AUTH: 'Basic authentication',
  NO_AUTH: 'No authentication',
  BEARER_TOKEN: 'Bearer token',
}
