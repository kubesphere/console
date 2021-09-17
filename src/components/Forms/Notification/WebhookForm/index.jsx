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

import BaseForm from '../BaseForm'
import styles from './index.scss'

export default class WebhookForm extends Component {
  state = {
    type: get(
      this.props.data,
      'receiver.metadata.annotations["kubesphere.io/verify-type"]',
      ''
    ),
  }

  get options() {
    return [
      {
        label: 'No Auth',
        value: 'no',
      },
      {
        label: 'Bearer Token',
        value: 'token',
      },
      {
        label: 'Basic Auth',
        value: 'basic',
      },
    ]
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        type: get(
          this.props.data,
          'receiver.metadata.annotations["kubesphere.io/verify-type"]'
        ),
      })
    }
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  renderServiceSetting() {
    const { data } = this.props
    const { type } = this.state

    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('Server Settings')}</div>
        <div className={styles.item}>
          <Form.Item
            label={t('Webhook Setting')}
            rules={[{ required: true, message: t('Please input URL') }]}
          >
            <Input name="receiver.spec.webhook.url" />
          </Form.Item>
          <Form.Item
            label={t('Verification Type')}
            rules={[
              {
                required: true,
                message: t('Please select a verification type'),
              },
            ]}
          >
            <Select
              name="receiver.metadata.annotations['kubesphere.io/verify-type']"
              options={this.options}
              onChange={this.handleTypeChange}
            />
          </Form.Item>
          {type === 'basic' && (
            <>
              <Form.Item label={t('USERNAME')}>
                <Input name="receiver.spec.webhook.httpConfig.basicAuth.username" />
              </Form.Item>
              <Form.Item label={t('PASSWORD')}>
                <Input
                  name="secret.data.password"
                  type="password"
                  autoComplete="new-password"
                />
              </Form.Item>
            </>
          )}
          {type === 'token' && (
            <>
              <Form.Item label={t('Token')}>
                <Input name="secret.data.token" />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Checkbox
              name="receiver.spec.webhook.httpConfig.tlsConfig.insecureSkipVerify"
              checked={get(
                data,
                'receiver.spec.webhook.httpConfig.tlsConfig.insecureSkipVerify'
              )}
            >
              {t('Skip TLS Certification')}
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
