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

import { Form, Input, Select, Checkbox } from '@kube-design/components'
import { InputPassword } from 'components/Inputs'

import BaseForm from '../BaseForm'
import styles from './index.scss'

export default class WebhookForm extends Component {
  state = {
    type: get(
      this.props.data,
      'receiver.metadata.annotations["kubesphere.io/verify-type"]',
      ''
    ),
    enabled: get(
      this.props.data,
      `receiver.spec.webhook.httpConfig.tlsConfig.insecureSkipVerify`,
      false
    ),
  }

  get options() {
    return [
      {
        label: t('NO_AUTH'),
        value: 'no',
      },
      {
        label: t('BEARER_TOKEN'),
        value: 'token',
      },
      {
        label: t('BASIC_AUTH'),
        value: 'basic',
      },
    ]
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  handleChangeCheck = enabled => {
    this.setState({ enabled })
  }

  renderServiceSetting() {
    const { type, enabled } = this.state

    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('SERVER_SETTINGS')}</div>
        <div className={styles.item}>
          <Form.Item
            label="Webhook URL"
            rules={[{ required: true, message: t('WEBHOOK_URL_DESC') }]}
          >
            <Input name="receiver.spec.webhook.url" />
          </Form.Item>
          <Form.Item
            label={t('AUTHENTICATION_TYPE')}
            rules={[
              {
                required: true,
                message: t('AUTHENTICATION_TYPE_DESC'),
              },
            ]}
          >
            <Select
              name="receiver.metadata.annotations['kubesphere.io/verify-type']"
              value={type}
              options={this.options}
              onChange={this.handleTypeChange}
              placeholder=" "
            />
          </Form.Item>
          {type === 'basic' && (
            <>
              <Form.Item
                label={t('USERNAME')}
                rules={[
                  { required: true, message: t('WEBHOOK_USERNAME_EMPTY_DESC') },
                ]}
              >
                <Input name="receiver.spec.webhook.httpConfig.basicAuth.username" />
              </Form.Item>
              <Form.Item
                label={t('PASSWORD')}
                rules={[
                  { required: true, message: t('WEBHOOK_PASSWORD_EMPTY_DESC') },
                ]}
              >
                <InputPassword
                  name="secret.data.password"
                  type="password"
                  autoComplete="new-password"
                />
              </Form.Item>
            </>
          )}
          {type === 'token' && (
            <>
              <Form.Item
                label={t('TOKEN')}
                rules={[
                  { required: true, message: t('WEBHOOK_TOKEN_EMPTY_DESC') },
                ]}
              >
                <Input name="secret.data.token" />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Checkbox
              name="receiver.spec.webhook.httpConfig.tlsConfig.insecureSkipVerify"
              checked={enabled}
              onChange={this.handleChangeCheck}
            >
              {t('SKIP_TLS_VERFICATION')}
            </Checkbox>
          </Form.Item>
        </div>
      </div>
    )
  }

  render() {
    const { user, data, onChange, hideFooter, ...rest } = this.props
    return (
      <BaseForm
        name="webhook"
        module="webhook"
        icon="webhook"
        data={data}
        onChange={onChange}
        hideFooter={hideFooter}
        user={user}
        {...rest}
      >
        {this.renderServiceSetting()}
      </BaseForm>
    )
  }
}
