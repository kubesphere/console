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
import cookie from 'utils/cookie'

import {
  Alert,
  Button,
  Form,
  Input,
  InputPassword,
} from '@kube-design/components'

import { get } from 'lodash'

import { Base64 } from 'js-base64'
import styles from './index.scss'

function encrypt(salt, str) {
  return mix(salt, Base64.encode(str))
}

function mix(salt, str) {
  if (str.length > salt.length) {
    salt += str.slice(0, str.length - salt.length)
  }

  const ret = []
  const prefix = []
  for (let i = 0, len = salt.length; i < len; i++) {
    const tomix = str.length > i ? str.charCodeAt(i) : 64
    const sum = salt.charCodeAt(i) + tomix
    prefix.push(sum % 2 === 0 ? '0' : '1')
    ret.push(String.fromCharCode(Math.floor(sum / 2)))
  }
  return `${Base64.encode(prefix.join(''))}@${ret.join('')}`
}

@inject('rootStore')
@observer
export default class Login extends Component {
  state = {
    formData: {},
    isSubmmiting: false,
    errorCount: 0,
    showKS: true,
    currentServer: {},
  }

  handleOAuthLogin = server => e => {
    const info = {
      name: server.title,
      type: server.type,
      endSessionURL: server.endSessionURL,
    }
    cookie('oAuthLoginInfo', JSON.stringify(info))
    if (server.type === 'LDAPIdentityProvider') {
      this.setState({
        showKS: false,
        currentServer: server,
      })
    } else {
      window.location.href = e.currentTarget.dataset.url
    }
  }

  handleSubmit = data => {
    const { username, password, ...rest } = data
    const { showKS, currentServer } = this.state
    this.setState({ isSubmmiting: true })

    cookie('oAuthLoginInfo', '')

    const encryptKey = get(globals, 'config.encryptKey', 'kubesphere')

    if (!showKS) {
      this.props.rootStore
        .loginIdentityProviders({
          username,
          password,
          title: currentServer.title,
        })
        .then(resp => {
          this.setState({ isSubmmiting: false })
          if (resp.status !== 200) {
            this.setState({
              errorMessage: resp.message,
              errorCount: resp.errorCount,
            })
          }
        })
    } else {
      this.props.rootStore
        .login({
          username,
          encrypt: encrypt(encryptKey, password),
          ...rest,
        })
        .then(resp => {
          this.setState({ isSubmmiting: false })
          if (resp.status !== 200) {
            this.setState({
              errorMessage: resp.message,
              errorCount: resp.errorCount,
            })
          }
        })
    }
  }

  handleBack = () => {
    this.setState({
      showKS: true,
      currentServer: {},
      errorMessage: '',
      errorCount: 0,
    })
  }

  render() {
    const {
      formData,
      isSubmmiting,
      errorMessage,
      showKS,
      currentServer,
    } = this.state

    return (
      <div className={styles.loginContainer}>
        <a href="/" className={styles.logo}>
          <img src="/assets/logo.svg" alt="" />
        </a>
        <div className={styles.login}>
          <div className={styles.header}>
            {showKS
              ? t('WELCOME')
              : t('TITLE_USERNAME', { title: currentServer.title })}
          </div>
          <div className={styles.divider}></div>
          {showKS &&
            get(globals, 'oauthServers', []).map(server => (
              <div
                key={server.url}
                className={styles.oauth}
                data-url={server.url}
                onClick={this.handleOAuthLogin(server)}
              >
                <span>{t('LOG_IN_WITH_TITLE', { title: server.title })}</span>
              </div>
            ))}
          {errorMessage && (
            <Alert
              className="margin-t12 margin-b12"
              type="error"
              message={t(errorMessage)}
            />
          )}
          <Form data={formData} onSubmit={this.handleSubmit}>
            <Form.Item
              label={
                showKS
                  ? t('USERNAME_OR_EMAIL')
                  : t('TITLE_USERNAME', { title: currentServer.title })
              }
              rules={[
                {
                  required: true,
                  message: t('INPUT_USERNAME_OR_EMAIL_TIP'),
                },
              ]}
            >
              <Input name="username" placeholder="user@example.com" />
            </Form.Item>
            <Form.Item
              label={t('PASSWORD')}
              rules={[{ required: true, message: t('PASSWORD_EMPTY_DESC') }]}
            >
              <InputPassword
                name="password"
                placeholder=" "
                autoComplete="new-password"
              />
            </Form.Item>
            <div className={styles.footer}>
              <Button type="control" htmlType="submit" loading={isSubmmiting}>
                {t('LOG_IN')}
              </Button>
              {!showKS && (
                <p className={styles.back} onClick={this.handleBack}>
                  {t('BACK')}
                </p>
              )}
            </div>
          </Form>
        </div>
      </div>
    )
  }
}
