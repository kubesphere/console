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

import { Input } from '@pitrix/lego-ui'
import { UrlInput } from 'components/Inputs'
import { Form, Button, Checkbox, Alert } from 'components/Base'

import styles from './index.scss'

const ProtocolOptions = [
  {
    label: 'SMTP',
    value: 'SMTP',
  },
]

const Item = Form.Item

export default class MailServerForm extends Component {
  store = this.props.store

  onProtocolChange = e => {
    const { protocol } = e.currentTarget.dataset
    this.props.onProtocolChange(protocol)
  }

  onValidateBtnClick = () => {
    this.props.onValidate(this.props.data)
  }

  get inputProps() {
    return {
      readOnly: this.props.readOnly,
    }
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
          {this.renderProtocol()}
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

  renderProtocol() {
    const { protocol } = this.props.data
    return (
      <div>
        <div>{t('Type')}</div>
        <div className={styles.protocol}>
          {ProtocolOptions.map(option => (
            <div
              className={classnames(styles.protocolOption, {
                [styles.protocolSelected]: protocol === option.value,
                [styles.protocolDisabled]: option.disabled,
              })}
              key={option.value}
              data-protocol={option.value}
              onClick={
                protocol === option.value || option.disabled
                  ? null
                  : this.onProtocolChange
              }
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    )
  }

  renderTips() {
    const { type = 'info', message } = this.props.tips

    return (
      message && <Alert className={styles.tips} type={type} message={message} />
    )
  }

  renderFormItems() {
    return (
      <>
        <Item className={styles.url} label={t('SMTP Server Address')}>
          <UrlInput
            portName="port"
            hostName="email_host"
            {...this.inputProps}
          />
        </Item>

        <Item>
          <Checkbox
            className={styles.sslCheckbox}
            name="ssl_enable"
            onChange={this.props.onSSLChange}
            disabled={this.props.readOnly}
          >
            {t('Use SSL Secure Connection')}
          </Checkbox>
        </Item>

        <div className={styles.row}>
          <Item label={`SMTP ${t('User')}`}>
            <Input name="email" {...this.inputProps} />
          </Item>
          <Item label={`SMTP ${t('Password')}`}>
            <Input
              name="password"
              autoComplete="new-password"
              type="password"
              {...this.inputProps}
            />
          </Item>
        </div>

        <div className={styles.row}>
          <Item label={t('SENDER_MAIL')} desc={t('FROM_EMAIL_ADDR_DESC')}>
            <Input
              name="from_email_addr"
              placeholder={'mail@yunify.com'}
              {...this.inputProps}
            />
          </Item>

          <Item label={t('SENDER_NICKNAME')}>
            <Input name="display_sender" {...this.inputProps} />
          </Item>
        </div>

        <div className={styles.row}>
          <Item
            label={t('TEST_EMAIL_RECIPIENT')}
            desc={t('TEST_EMAIL_ADDRESS_FORM_DESC')}
          >
            <Input
              placeholder={'youraccount@mail.com'}
              name="test_email_recipient"
              {...this.inputProps}
            />
          </Item>
          <Button
            className={styles.validateButton}
            onClick={this.onValidateBtnClick}
            loading={this.props.isVerifying}
            disabled={this.props.readOnly}
          >
            {t('Send a test email')}
          </Button>
        </div>
      </>
    )
  }

  renderFooterBtns() {
    if (this.props.readOnly) {
      return null
    }

    return (
      <>
        <Button onClick={this.props.onCancel}>{t('Cancel')}</Button>
        <Button
          type="control"
          htmlType="submit"
          loading={this.props.isSubmitting}
          disabled={this.props.disableSubmit}
        >
          {t('Save')}
        </Button>
      </>
    )
  }
}
