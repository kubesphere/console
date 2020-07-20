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
import PropTypes from 'prop-types'

import { Input } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'
import { InputPassword } from 'components/Inputs'
import { PATTERN_PASSWORD } from 'utils/constants'

import styles from './index.scss'

export default class ModifyPasswordModal extends Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  state = {
    password: '',
    formData: {},
  }

  handlePassswordChange = value => {
    this.setState({ password: value })
  }

  passwordValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value !== this.state.password) {
      callback({
        message: t('The password entered twice must be the same'),
        field: rule.field,
      })
    }

    callback()
  }

  render() {
    const { detail, ...rest } = this.props

    return (
      <Modal.Form
        title={t('Change Password')}
        icon="pen"
        width={691}
        data={this.state.formData}
        {...rest}
      >
        <input name="username" className="hidden-input" type="text" disabled />
        <input
          name="password"
          className="hidden-input"
          type="password"
          disabled
        />
        <Form.Item label={t('Email')}>
          <Input disabled value={detail.email} />
        </Form.Item>
        <Form.Item
          className={styles.password}
          label={t('New Password')}
          rules={[
            { required: true, message: t('Please input password') },
            { pattern: PATTERN_PASSWORD, message: t('PASSWORD_DESC') },
          ]}
        >
          <InputPassword
            name="password"
            placeholder={t('Please input password')}
            autoComplete="new-password"
            onChange={this.handlePassswordChange}
            withStrength
          />
        </Form.Item>
        <Form.Item
          className={styles.password}
          label={t('Repeat the New Password')}
          rules={[
            { required: true, message: t('Please repeat the new password') },
            { validator: this.passwordValidator },
          ]}
        >
          <InputPassword
            name="rePassword"
            placeholder={t('Please repeat the new password')}
            autoComplete="new-password"
          />
        </Form.Item>
        <div style={{ height: 200 }} />
      </Modal.Form>
    )
  }
}
