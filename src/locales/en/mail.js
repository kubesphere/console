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

export default {
  'Mail Server': 'Mail Server',
  'Platform Settings': 'Platform Settings',
  'Send a test email': 'Send a test email',
  'Sender Email': 'Sender Email',
  'Server Settings': 'Server Settings',
  'Server Username': 'Server Username',
  'SMTP Server Address': 'SMTP Server Address',
  'The sender mail account': 'The sender mail account',
  'Use SSL Secure Connection': 'Use SSL Secure Connection',

  MAIL_SERVER_DESC:
    'This module provides email delivery services with custom settings.',
  EMPTY_MAIL_SERVER:
    'Temporarily no email server has been set up. You need to set up an email server to provide email delivery services.',
  TEST_EMAIL_TITLE: '[KubeSphere] Testing Email',
  TEST_EMAIL_RECIPIENT: 'Testing Email Address',
  TEST_EMAIL_ADDRESS_FORM_DESC: 'The testing address to receive emails',
  SENDER_MAIL: 'Sender Email Address',
  SENDER_NICKNAME: 'Sender Nickname',
  FROM_EMAIL_ADDR_DESC:
    'The sender email account (Blank means it is the same as the "SMTP User" value)',

  MAIL_SERVER_CONFIG_NEED_SAVE_TIP:
    'The email configuration has been set successfully, please save the server configuration.',
  MAIL_SERVER_CONFIG_INVALID_TIP:
    'The current email configuration is not available.',
  MAIL_SERVER_CONFIG_NEED_VERIFIED_TIP:
    'The current email configuration has changed, please resend a test email and save the configuration. Or you can also discard your modification.',
}
