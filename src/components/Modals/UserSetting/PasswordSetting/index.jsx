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

import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Form } from '@kube-design/components'
import { InputPassword } from 'components/Inputs'
import { PATTERN_PASSWORD } from 'utils/constants'

import styles from './index.scss'

export default class PasswordSetting extends React.Component {
  static contextTypes = {
    registerUpdate: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      password: '',
      formData: this.getInitialData(),
    }
  }

  get name() {
    return 'passwordSetting'
  }

  getInitialData() {
    return {}
  }

  resetData = () => {
    this.setState({
      formData: this.getInitialData(),
    })
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
        message: t('PASSWORD_NOT_SAME_DESC'),
        field: rule.field,
      })
    }

    callback()
  }

  handleFormChange = (name, value) => {
    this.context.registerUpdate(this.name, { name, value })
  }

  render() {
    const { formRef } = this.props
    return (
      <div className={styles.wrapper}>
        <div className="h4">{t('PASSWORD_SETTINGS')}</div>
        <Form
          data={this.state.formData}
          ref={formRef}
          onChange={this.handleFormChange}
        >
          <input
            name="password"
            className="hidden-input"
            type="password"
            disabled
          />
          <Form.Item
            className={styles.password}
            label={t('CURRENT_PASSWORD')}
            desc={t('ENTER_CURRENT_PASSWORD_DESC')}
            rules={[
              { required: true, message: t('ENTER_CURRENT_PASSWORD_TIP') },
            ]}
          >
            <InputPassword
              name="currentPassword"
              placeholder=" "
              autoComplete="cur-password"
            />
          </Form.Item>
          <Alert
            className={styles.alert}
            type="warning"
            message={t('PASSWORD_DESC')}
          />
          <Form.Item
            className={styles.password}
            label={t('NEW_PASSWORD')}
            rules={[
              { required: true, message: t('PASSWORD_EMPTY_DESC') },
              {
                pattern: PATTERN_PASSWORD,
                message: t('PASSWORD_DESC'),
              },
            ]}
          >
            <InputPassword
              name="password"
              placeholder=" "
              autoComplete="new-password"
              onChange={this.handlePassswordChange}
              tipClassName={styles.dropdown}
              withStrength
            />
          </Form.Item>
          <Form.Item
            className={styles.password}
            label={t('CONFIRM_PASSWORD')}
            rules={[
              { required: true, message: t('CONFIRM_PASSWORD_TIP') },
              { validator: this.passwordValidator },
            ]}
          >
            <InputPassword
              name="rePassword"
              placeholder=" "
              autoComplete="new-password"
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
