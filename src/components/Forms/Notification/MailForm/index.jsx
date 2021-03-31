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

import { Form, Button, Input, Alert, Checkbox } from '@kube-design/components'
import { ToggleField } from 'components/Base'
import { UrlInput } from 'components/Inputs'

import { PATTERN_HOST } from 'utils/constants'

import Item from './Item'

import styles from './index.scss'

export default class MailForm extends Component {
  formRef = React.createRef()

  handleSubmit = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        this.props.onSubmit(form.getData())
      })
  }

  render() {
    return (
      <Form
        ref={this.formRef}
        data={this.props.data}
        onChange={this.props.onChange}
      >
        <div className={styles.formBody}>
          {this.renderTips()}
          {this.renderFormItems()}
        </div>
        <div className={styles.footer}>{this.renderFooterBtns()}</div>
      </Form>
    )
  }

  renderTips() {
    if (this.props.showTip && this.props.formStatus === 'update') {
      return (
        <Alert
          className={styles.tips}
          type="error"
          message={t('MAIL_SETTINGS_CHANGE_NEED_SAVE_TIP')}
        />
      )
    }
    return null
  }

  renderFormItems() {
    const { data } = this.props
    return (
      <>
        <div className={styles.row}>
          <div className={styles.title}>{t('Notification Settings')}</div>
          <div className={styles.item}>
            <Form.Item
              className={styles.isHorizon}
              label={t('Receive Notification')}
            >
              <ToggleField
                name="receiver.spec.email.enabled"
                value={get(data, 'receiver.spec.email.enabled')}
                onText={t('On')}
                offText={t('Off')}
              />
            </Form.Item>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>{t('Server Settings')}</div>
          <div className={styles.item}>
            <Form.Item label={t('SMTP Server Address')}>
              <UrlInput
                className={styles.urlInput}
                portName="config.spec.email.smartHost.port"
                hostName="config.spec.email.smartHost.host"
                hostRules={[
                  { required: true, message: t('Please enter the address') },
                  {
                    pattern: PATTERN_HOST,
                    message: t('Invalid address'),
                  },
                ]}
                defaultPort={25}
              />
            </Form.Item>
            <Form.Item>
              <Checkbox
                className={styles.sslCheckbox}
                name="config.spec.email.requireTLS"
                checked={get(data, 'config.spec.email.requireTLS')}
              >
                {t('Use SSL Secure Connection')}
              </Checkbox>
            </Form.Item>
            <Form.Item
              label={`SMTP ${t('User')}`}
              rules={[
                {
                  required: true,
                  message: t('Please enter the SMTP username'),
                },
              ]}
            >
              <Input
                name="config.spec.email.authUsername"
                placeholder={'admin@example.com'}
              />
            </Form.Item>
            <Form.Item
              label={`SMTP ${t('Password')}`}
              rules={[{ required: true, message: t('Please input password') }]}
            >
              <Input
                name="secret.data.authPassword"
                type="password"
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              label={t('SENDER_MAIL')}
              rules={[
                { required: true, message: t('Please input email') },
                { type: 'email', message: t('Invalid email') },
              ]}
            >
              <Input
                name="config.spec.email.from"
                placeholder={'admin@example.com'}
              />
            </Form.Item>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>{t('Recipient Settings')}</div>
          <div className={styles.item}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: t('Please add the recipient email address'),
                },
              ]}
            >
              <Item name='receiver.metadata.annotations["kubesphere.io/receiver-mail"]' />
            </Form.Item>
          </div>
        </div>
      </>
    )
  }

  renderFooterBtns() {
    return (
      <>
        <Button onClick={this.props.onCancel}>{t('Cancel')}</Button>
        <Button
          type="control"
          loading={this.props.isSubmitting}
          disabled={this.props.disableSubmit}
          onClick={this.handleSubmit}
        >
          {this.props.formStatus === 'update' ? t('Update') : t('Save')}
        </Button>
      </>
    )
  }
}
