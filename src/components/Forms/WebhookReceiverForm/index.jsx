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
import classnames from 'classnames'
import { get } from 'lodash'

import {
  Form,
  Button,
  Input,
  Alert,
  Select,
  TextArea,
} from '@kube-design/components'

import styles from './index.scss'

export default class WebhookReceiverForm extends Component {
  get options() {
    return [2, 1, 0].map(item => ({
      label: t(`TLS_MODE_${item}`),
      value: String(item),
    }))
  }

  render() {
    return (
      <Form
        data={this.props.data}
        onChange={this.props.onChange}
        onSubmit={this.props.onSubmit}
      >
        <div
          className={classnames(styles.formBody, this.props.formBodyClassName)}
        >
          <div
            className={classnames(
              styles.formAttrs,
              this.props.formAttrsClassName
            )}
          >
            {this.renderTips()}
            {this.renderFormItems()}
          </div>
        </div>
        <div className={classnames(styles.footer, this.props.footerClassName)}>
          {this.renderFooterBtns()}
        </div>
      </Form>
    )
  }

  renderTips() {
    if (this.props.showTip && this.props.formStatus === 'update') {
      return (
        <Alert
          className={styles.tips}
          type="error"
          message={t('WEBHOOK_SETTINGS_CHANGE_NEED_SAVE_TIP')}
        />
      )
    }
    return null
  }

  renderFormItems() {
    return (
      <>
        <div className={styles.row}>
          <Form.Item
            label={t('URL')}
            rules={[{ required: true, message: t('Please input URL') }]}
          >
            <Input name="spec.url" />
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item label={t('User Name')}>
            <Input name="spec.httpConfig.basicAuth.username" />
          </Form.Item>
          <Form.Item label={t('Password')}>
            <Input
              name="spec.httpConfig.basicAuth.password.key"
              type="password"
              autoComplete="new-password"
            />
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item
            label={t('Secure Verify')}
            rules={[
              {
                required: true,
                message: t('Please select Secure Verify mode'),
              },
            ]}
          >
            <Select
              name="metadata.annotations['kubesphere.io/tls-mode']"
              options={this.options}
            />
          </Form.Item>
        </div>
        {this.renderFormContent()}
      </>
    )
  }

  renderFormContent() {
    const mode = Number(
      get(this.props.data, 'metadata.annotations["kubesphere.io/tls-mode"]', '')
    )

    if (!mode) {
      return null
    }

    return (
      <>
        <div className={styles.row}>
          <Form.Item
            label={t('Server Name')}
            rules={[{ required: true, message: t('Please input server name') }]}
          >
            <Input name="spec.httpConfig.tlsConfig.serverName" />
          </Form.Item>
        </div>

        {mode === 2 && (
          <>
            <Form.Item
              label={t('Client Certificate Cert')}
              rules={[
                {
                  required: true,
                  message: t('Please input client certificate cert'),
                },
              ]}
            >
              <TextArea name="spec.httpConfig.tlsConfig.clientCertificate.cert.key" />
            </Form.Item>
            <Form.Item
              label={t('Client Certificate Key')}
              rules={[
                {
                  required: true,
                  message: t('Please input client certificate key'),
                },
              ]}
            >
              <TextArea name="spec.httpConfig.tlsConfig.clientCertificate.key.key" />
            </Form.Item>
          </>
        )}
        {mode === 1 && (
          <Form.Item
            label={t('Root CA')}
            rules={[{ required: true, message: t('Please input root ca') }]}
          >
            <TextArea name="spec.httpConfig.tlsConfig.rootCA.key" />
          </Form.Item>
        )}
      </>
    )
  }

  renderFooterBtns() {
    return (
      <>
        <Button onClick={this.props.onCancel}>{t('Cancel')}</Button>
        <Button
          type="control"
          htmlType="submit"
          loading={this.props.isSubmitting}
        >
          {this.props.formStatus === 'update' ? t('Update') : t('Save')}
        </Button>
      </>
    )
  }
}
