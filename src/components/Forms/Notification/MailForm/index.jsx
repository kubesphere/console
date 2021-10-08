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

import React, { Component } from 'react'
import { get } from 'lodash'

import { Form, Input, InputPassword, Checkbox } from '@kube-design/components'
import { UrlInput } from 'components/Inputs'

import { PATTERN_HOST, PATTERN_PORT } from 'utils/constants'

import BaseForm from '../BaseForm'
import Item from './Item'

import styles from './index.scss'

export default class MailForm extends Component {
  state = {
    checked: get(this.props.data, 'config.spec.email.requireTLS', false),
  }

  handleChangeCheck = checked => {
    this.setState({ checked })
  }

  renderServiceSetting() {
    const { checked } = this.state

    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('SERVER_SETTINGS')}</div>
        <div className={styles.item}>
          <Form.Item label={t('SMTP_SERVER_ADDRESS')}>
            <UrlInput
              className={styles.urlInput}
              portName="config.spec.email.smartHost.port"
              hostName="config.spec.email.smartHost.host"
              hostRules={[
                { required: true, message: t('ADDRESS_EMPTY_DESC') },
                { pattern: PATTERN_HOST, message: t('INVALID_ADDRESS_DESC') },
              ]}
              portRules={[
                { required: true, message: t('ENTER_PORT_NUMBER') },
                { pattern: PATTERN_PORT, message: t('INVALID_PORT_DESC') },
              ]}
              defaultPort={25}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              className={styles.sslCheckbox}
              name="config.spec.email.requireTLS"
              checked={checked}
              onChange={this.handleChangeCheck}
            >
              {t('USE_SSL_SECURE_CONNECTION')}
            </Checkbox>
          </Form.Item>
          <Form.Item
            label={t('SMTP_USER')}
            rules={[
              {
                required: true,
                message: t('SMTP_USER_EMPTY_DESC'),
              },
            ]}
          >
            <Input
              name="config.spec.email.authUsername"
              placeholder={'admin@example.com'}
            />
          </Form.Item>
          <Form.Item
            label={t('SMTP_PASSWORD')}
            rules={[{ required: true, message: t('ENTER_PASSWORD_TIP') }]}
          >
            <InputPassword
              name="secret.data.authPassword"
              type="password"
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item
            label={t('SENDER_EMAIL')}
            rules={[
              { required: true, message: t('EMAIL_EMPTY_DESC') },
              { type: 'email', message: t('INVALID_EMAIL_ADDRESS_DESC') },
            ]}
          >
            <Input
              name="config.spec.email.from"
              placeholder={'admin@example.com'}
            />
          </Form.Item>
        </div>
      </div>
    )
  }

  renderReceiverSetting() {
    const { wrapperClassName } = this.props

    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('RECIPIENT_SETTINGS')}</div>
        <div className={styles.item}>
          <Form.Item
            rules={[
              {
                required: true,
                message: t('ENTER_RECIPIENT_EMAIL_DESC'),
              },
            ]}
          >
            <Item className={wrapperClassName} name="receiver.spec.email.to" />
          </Form.Item>
        </div>
      </div>
    )
  }

  render() {
    const { user, data, onChange, hideFooter, ...rest } = this.props

    return (
      <BaseForm
        name="email"
        module="mail"
        icon="email"
        data={data}
        onChange={onChange}
        hideFooter={hideFooter}
        user={user}
        {...rest}
      >
        {!user && this.renderServiceSetting()}
        {this.renderReceiverSetting()}
      </BaseForm>
    )
  }
}
