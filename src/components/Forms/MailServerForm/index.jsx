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

import { Form, Button, Input, Alert } from '@kube-design/components'
import { UrlInput } from 'components/Inputs'

import styles from './index.scss'

export default class MailServerForm extends Component {
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
          message={t('MAIL_SERVER_CONFIG_CHANGE_NEED_SAVE_TIP')}
        />
      )
    }
    return null
  }

  renderFormItems() {
    return (
      <>
        <Form.Item className={styles.url} label={t('SMTP Server Address')}>
          <UrlInput
            portName="spec.smartHost.port"
            hostName="spec.smartHost.host"
            defaultPort="25"
          />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item
            label={`SMTP ${t('User')}`}
            rules={[
              { required: true, message: t('Please input SMTP user') },
              { type: 'email', message: t('Invalid email') },
            ]}
          >
            <Input name="spec.authUsername" placeholder={'admin@example.com'} />
          </Form.Item>
          <Form.Item
            label={`SMTP ${t('Password')}`}
            rules={[{ required: true, message: t('Please input password') }]}
          >
            <Input
              name="spec.authPassword.key"
              type="password"
              autoComplete="new-password"
            />
          </Form.Item>
        </div>

        <div className={styles.row}>
          <Form.Item
            label={t('SENDER_MAIL')}
            desc={t('FROM_EMAIL_ADDR_DESC')}
            rules={[{ type: 'email', message: t('Invalid email') }]}
          >
            <Input name="spec.from" placeholder={'admin@example.com'} />
          </Form.Item>
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
          htmlType="submit"
          loading={this.props.isSubmitting}
        >
          {this.props.formStatus === 'update' ? t('Update') : t('Save')}
        </Button>
      </>
    )
  }
}
