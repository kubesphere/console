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
import { inject, observer } from 'mobx-react'
import { get } from 'lodash'
import { Button, Form, Input } from '@kube-design/components'
import { PATTERN_NAME } from 'utils/constants'
import UserStore from 'stores/user'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class LoginConfirm extends Component {
  state = {
    formData: {},
  }

  store = new UserStore()

  userNameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.store.checkName({ name: value }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('User name exists'), field: rule.field })
      }
      callback()
    })
  }

  emailValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.store.checkEmail(value).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Email exists'), field: rule.field })
      }
      callback()
    })
  }

  handleSubmit = data => {
    this.store.confirm(data)
  }

  render() {
    const { formData, errorMessage } = this.state

    return (
      <div>
        <a href="/" className={styles.logo}>
          <img src="/assets/logo.svg" alt="" />
        </a>
        <div className={styles.login}>
          <div className={styles.header}>
            {t('Please confirm your account info')}
          </div>
          <div className={styles.divider}></div>
          {errorMessage && (
            <Alert
              className="margin-t12 margin-b12"
              type="error"
              message={t(errorMessage)}
            />
          )}
          <Form data={formData} onSubmit={this.handleSubmit}>
            <Form.Item
              label={t('Email')}
              desc={t('USER_SETTING_EMAIL_DESC')}
              rules={[
                { required: true, message: t('Please input email') },
                { type: 'email', message: t('Invalid email') },
                { validator: this.emailValidator },
              ]}
            >
              <Input
                name="email"
                placeholder="User@example.com"
                defaultValue={get(globals, 'user.email')}
              />
            </Form.Item>
            <Form.Item
              label={t('Username')}
              desc={t('USER_NAME_DESC')}
              rules={[
                { required: true, message: t('Please input username') },
                {
                  pattern: PATTERN_NAME,
                  message: t('Invalid user name', {
                    message: t('USER_NAME_DESC'),
                  }),
                },
                { validator: this.userNameValidator },
              ]}
            >
              <Input
                name="username"
                placeholder="User@example.com"
                defaultValue={get(globals, 'user.username')}
                maxLength={32}
              />
            </Form.Item>
            <div className={styles.footer}>
              <Button
                type="control"
                htmlType="submit"
                loading={this.store.isSubmmiting}
              >
                {t('Log In')}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}
