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
  MAIL_SERVER_DESC: 'Provides mail delivery service with custom settings.',
  EMPTY_MAIL_SERVER:
    'Temporarily no mail server is set up. You need to set up a mail server to provide mail delivery service.',
  TEST_EMAIL_RECIPIENT: 'Acceptance test mail address',
  TEST_EMAIL_ADDRESS_FORM_DESC: 'The testing address to receive the email',
  SENDER_MAIL: 'Sender Mail',
  SENDER_NICKNAME: 'Sender Nickname',
  FROM_EMAIL_ADDR_DESC:
    'The sender mail account(Do not fill in means the same as the "SMTP User" value)',

  MAIL_SERVER_CONFIG_NEED_SAVE_TIP:
    'Current mailbox configuration is not available',
  MAIL_SERVER_CONFIG_INVALID_TIP:
    'Mail configuration is successful, please save the server configuration',
  MAIL_SERVER_CONFIG_NEED_VERIFIED_TIP:
    'Your current mail configuration has changed, please re-send a test message and save the configuration, modify or cancel',
}
