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
  'Server Settings': 'Configuración del servidor',
  'Recipient Settings': 'Configuración del receptor',
  'Receive Notification': 'Recibir notificación',

  NOTIFICATION_CONFIGURATION_DESC:
    'Puede recibir notificaciones de la plataforma a través de correo electrónico, dingtalk, wecom, slack y webhook. Necesita configurar el servidor de envío ',

  'Notification On': 'Notificación activada',
  'Notification Off': 'Notificación desactivada',

  'Notification Condition Settings':
    'Configuración de condición de notificación',
  NOTIFICATION_CONDITION_SETTINGS_DESC:
    'Solo recibirás notificaciones que cumplan con los criterios del filtro',
  NOTIFICATION_CONDITION_SETTING_ANNOTATION:
    'Incluir valor clave: la etiqueta de la notificación recibida tendrá el valor seleccionado; incluir clave: la notificación recibida tendrá la etiqueta seleccionada. ',
  'Include key values': 'Incluir valores clave',
  'Not include key value': 'No incluir valores clave',
  'Exists key': 'Exists key',
  'Does not exist key': 'No existe clave',
  'Please select a tag': 'Seleccione una etiqueta',
  'Please select a regex filter':
    'Seleccione un filtro de expresiones regulares',
  'Invalid notification condition': 'Condición de notificación no válida',
  TAG_INPUT_PLACEHOLDER: 'Ingrese el valor y presione Enter para confirmar',

  SEND_TEST_MESSAGE: 'Enviar mensaje de prueba',
  NOTIFICATION_CONFIGRATION_SEND_TEST_MESSAGE_DESC:
    'Después de establecer la configuración relevante, puede enviar información de prueba para verificar su configuración.',
  SEND_TEST_MESSAGE_SUCCESS_DESC:
    'La verificación se realizó correctamente, se le envió un mensaje de prueba, verifíquelo',

  Mail: 'Correo',
  'SMTP Server Address': 'Dirección del servidor SMTP',
  'Use SSL Secure Connection': 'Usar conexión segura SSL',

  MAIL_SETTING_DESC:
    'Puede recibir notificaciones de la plataforma por correo y debe configurar el servidor de envío de correo.',
  SENDER_MAIL: 'Correo del remitente',
  MAIL_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Su configuración de correo actual ha cambiado, guarde la configuración o cancele la modificación',

  'Please enter the SMTP username': 'Por favor ingrese el usuario SMTP',
  'Please enter an email address': 'Ingrese un correo electrónico para agregar',
  'This email address has existed': 'Este correo electrónico ha existido',
  'Invalid address': 'Dirección no válida',
  INVALID_EMAIL: 'Email inválido',
  'Please add the recipient email address':
    'Por favor, agregue el correo electrónico del destinatario',
  MAX_EAMIL_COUNT: 'Agregue hasta {count} buzones de correo',

  DingTalk: 'DingTalk',
  'Conversation Settings': 'Configuración de conversación',
  'Conversation ID': 'ID de conversación',
  'DingTalk Chatbot': 'Chatbot de DingTalk',
  'Webhook URL': 'URL del webhook',
  keywords: 'palabras clave',
  'Keywords Set': 'Conjunto de palabras clave',
  CONVERSATION_ID_TIP:
    'El administrador del sistema debe configurar el ID de conversación para obtenerlo. Si necesita configurarlo, comuníquese con el administrador del sistema.',

  'Please enter a conversation ID':
    'Ingrese un ID de conversación para agregar',
  'Please enter a keyword': 'Ingrese una palabra clave para agregar',
  'This conversation ID has existed': 'Este ID de conversación ha existido',
  'This keyword has existed': 'Esta palabra clave ha existido',
  MAX_CID_COUNT: 'Agrega un máximo de {count} ID de conversación',
  MAX_KEYWORD_COUNT: 'Agregue como máximo {count} palabras clave',
  EMPTY_KEYWORDS_DESC: 'No se agregaron palabras clave',
  DINGTALK_SETTING_TIP: 'Configura una conversación o un robot grupal',

  DINGTALK_SETTING_DESC:
    'Puede recibir notificaciones de la plataforma a través de Dingding y debe configurar el servidor de envío de Dingding.',
  DINGTALK_KEYWORDS_DESC:
    'Palabras clave personalizadas de ChatBot, si necesita más de una, sepárelas con "," ',
  DINGTALK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Su configuración actual de Dingding ha sido cambiada, guarde la configuración o cancele la modificación',

  WeCom: 'WeCom',
  'WeChat API Corp ID': 'ID de Wechat Api Corp',
  'WeChat API Agent ID': 'ID de agente de Wechat Api',
  'WeChat API Secret': 'El secreto de Wechat Api',
  'User ID': 'ID de usuario',
  'Party ID': 'ID de departamento',
  'Tag ID': 'ID de etiqueta',
  'User Set': 'Conjunto de usuario',
  'Party Set': 'Conjunto de departamentos',
  'Tag Set': 'Conjunto de etiquetas',
  WECOM_RECEIVER_TOUSER_INPUT_PLACEHOLDER:
    'Ingrese el ID de usuario para agregar',
  WECOM_RECEIVER_TOPARTY_INPUT_PLACEHOLDER:
    'Por favor ingrese el ID de departamento para agregar',
  WECOM_RECEIVER_TOTAG_INPUT_PLACEHOLDER: 'Ingrese la etiqueta para agregar',
  RECIPIENT_SETTINGS_TIP:
    'Se debe configurar al menos un elemento para recibir notificaciones',
  EMPTY_TOUSER_DESC: 'No se agregó ningún usuario',
  EMPTY_TOPARTY_DESC: 'No se agregó ningún departamento',
  EMPTY_TOTAG_DESC: 'No se agregó ninguna etiqueta',

  'Please enter the WeChat API Corp ID': 'Por favor ingrese wechat api corp id',
  'Please enter the WeChat API Agent ID':
    'Por favor ingrese la identificación del agente de wechat api',
  'Please enter the WeChat API Secret': 'Por favor ingrese wechat api secreto',
  'Please enter a user': 'Por favor ingrese un usuario',
  'Please enter a department': 'Por favor ingrese un departamento',
  'Please enter a tag': 'Ingrese una etiqueta',
  'This toUser has existed': 'Este usuario ha existido',
  'This toParty has existed': 'Este departamento ha existido',
  'This toTag has existed': 'Esta etiqueta ha existido',
  MAX_TOUSER_COUNT: 'Agregue hasta {count} usuarios',
  MAX_TOPARTY_COUNT: 'Agregue hasta {count} departamentos',
  MAX_TOTAG_COUNT: 'Agregar hasta {count} etiquetas',

  WECOM_SETTING_DESC:
    'Puede recibir notificaciones de la plataforma a través de Enterprise WeChat y debe configurar el servidor de envío de WeChat empresarial.',
  WECOM_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Su configuración corporativa actual de WeChat ha cambiado, guarde la configuración o cancele la modificación',

  Channel: 'Canal',
  'Channel Settings': 'Configuración de canal',
  'Channel Set': 'Conjunto de canales',
  EMPTY_CHANNEL_DESC: 'No se agregó ningún canal',

  'Please enter the Slack token': 'Ingrese el token de holgura',
  'Please enter a channel': 'Ingrese un canal para agregar',
  'This channel has existed': 'Este canal ha existido',
  'Please add the receiver channel': 'Por favor, agregue un canal receptor',
  MAX_CHANNEL_COUNT: 'Agregar hasta {count} canales',

  SLACK_SETTING_DESC:
    'Puede recibir notificaciones de la plataforma a través de Slack y debe configurar el servidor de envío de Slack.',
  SLACK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Su configuración actual de holgura ha cambiado, guarde la configuración o cancele la modificación',

  'Webhook Settings': 'Configuración de webhook',
  'Webhook Url': 'URL del webhook',
  'Server Name': 'Nombre del servidor',
  'Root CA': 'CA raíz',
  'Client Certificate Cert': 'Certificado de certificado de cliente',
  'Client Certificate Key': 'Clave de certificado de cliente',
  'Verification Type': 'Verificar tipo',
  'Skip TLS Certification': 'Omitir la certificación TLS',
  'Please select a verification type': 'Please select a verification type',

  WEBHOOK_SETTING_DESC:
    'Puede recibir notificaciones de la plataforma a través de webhook y debe configurar el servidor de envío de webhook.',
  WEBHOOK_SETTINGS_CHANGE_NEED_SAVE_TIP:
    'Su configuración actual de webhook ha cambiado, guarde la configuración o cancele la modificación',

  PLEASE_ENTER_VALUE_CUSTOM: 'Ingrese un {value}.',
}
