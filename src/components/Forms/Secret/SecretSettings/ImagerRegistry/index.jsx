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

import { get, debounce, set, has } from 'lodash'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import {
  Columns,
  Column,
  Input,
  InputPassword,
  Button,
  Alert,
  Toggle,
} from '@kube-design/components'
import { SchemeInput } from 'components/Inputs'

import { safeParseJSON } from 'utils'
import { safeBtoa } from 'utils/base64'

import SecretStore from 'stores/secret'
import ClusterStore from 'stores/cluster'

import Wrapper from './Wrapper'

import styles from './index.scss'

@observer
export default class ImageRegistry extends Component {
  getStateFromProps = value => {
    const valueObj = safeParseJSON(value)
    const url = Object.keys(get(valueObj, 'auths', {}))[0] || ''
    return {
      url,
      username: get(valueObj, `auths["${url}"].username`, ''),
      password: get(valueObj, `auths["${url}"].password`, ''),
      email: get(valueObj, `auths["${url}"].email`, ''),
    }
  }

  store = new SecretStore()

  hostStore = new ClusterStore()

  state = {
    ...this.getStateFromProps(this.props.value),
    isValidating: false,
    default: false,
  }

  triggerChange = debounce(() => {
    const { onChange } = this.props
    const { url, username, password, email } = this.state

    this.setState({ errorMsg: '' })
    if (url && username && password) {
      this.handleAnnotationsByUrl(url)
      onChange(
        JSON.stringify({
          auths: {
            [url]: {
              username,
              password,
              email,
              auth: safeBtoa(`${username}:${password}`),
            },
          },
        })
      )
    }
  }, 200)

  validate() {
    if (!this.state.url || !this.state.username || !this.state.password) {
      this.setState({ errorMsg: t('IMAGE_REGISTRY_REQUIRED_DESC') })
      return false
    }
    return true
  }

  handleAnnotationsByUrl = url => {
    const registryUrl = url
      .replace(/^(http(s)?:\/\/)?(.*)$/, '$1')
      .replace('://', '')

    if (registryUrl === 'http') {
      const annotations = get(
        this.props.fedFormTemplate,
        'metadata.annotations',
        {}
      )
      set(this.props.fedFormTemplate, 'metadata.annotations', {
        ...annotations,
        'secret.kubesphere.io/force-insecure': 'true',
      })
    } else {
      const annotations = get(
        this.props.fedFormTemplate,
        'metadata.annotations',
        {}
      )

      if (has(annotations, 'secret.kubesphere.io/force-insecure')) {
        delete annotations['secret.kubesphere.io/force-insecure']
      }

      set(this.props.fedFormTemplate, 'metadata.annotations', {
        ...annotations,
      })
    }
  }

  getHostName = async (params = {}) => {
    await this.hostStore.fetchList({
      ...params,
      labelSelector: 'cluster-role.kubesphere.io/host=',
      limit: -1,
    })
    const host = toJS(this.hostStore.list.data).filter(item =>
      Object.keys(item.labels).some(key =>
        key.endsWith('cluster-role.kubesphere.io/host')
      )
    )
    return host[0]?.name ?? 'host'
  }

  handleValidate = async () => {
    const { cluster, isFederated, namespace, screatName } = this.props

    if (this.validate()) {
      this.setState({ isValidating: true })
      const result =
        (await this.store.validateImageRegistrySecret({
          fedFormTemplate: this.props.fedFormTemplate,
          name: screatName,
          namespace,
          cluster: isFederated ? await this.getHostName() : cluster,
        })) || {}

      this.setState({
        validate: result.validate || false,
        reason: result.reason || '',
        isValidating: false,
      })
    }
  }

  handleUrlChange = url => {
    this.setState({ url }, this.triggerChange)
  }

  handleUserNameChange = e => {
    this.setState({ username: e.target.value }, this.triggerChange)
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value }, this.triggerChange)
  }

  handlePasswordChange = e => {
    this.setState({ password: e.target.value }, this.triggerChange)
  }

  renderTip() {
    const { errorMsg, validate, reason } = this.state

    if (errorMsg) {
      return <Alert className="margin-t12" type="error" message={errorMsg} />
    }

    if (validate) {
      return (
        <Alert
          type="info"
          icon="success"
          message={t('REGISTRY_SECRET_VER_SUC')}
        />
      )
    }

    if (reason) {
      return (
        <Alert
          type="error"
          title={t('REGISTRY_SECRET_VER_ERR')}
          message={reason}
        />
      )
    }

    return <Alert type="info" message={t('IMAGE_REGISTRY_VALIDATE_TIP')} />
  }

  renderDefault() {
    const { isDefault, onChangeDefault } = this.props
    return (
      <div className={styles.defaultContainer}>
        <Toggle
          checed={isDefault}
          onChange={onChangeDefault}
          defaultChecked={isDefault}
        />
        <div>
          <div className={styles.title}>{t('SET_AS_DEFAULT_REPOSITORY')}</div>
          <div className={styles.desc}>
            {t('SET_AS_DEFAULT_REPOSITORY_DESC')}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { url, username, password, email, isValidating } = this.state
    return (
      <div>
        <input name="username" className="hidden-input" type="text" disabled />
        <input
          name="password"
          className="hidden-input"
          type="password"
          disabled
        />
        <Columns>
          <Column>
            <Wrapper
              label={t('REGISTRY_ADDRESS_TCAP')}
              desc={t('REGISTRY_ADDRESS_TIP')}
              required
            >
              <SchemeInput value={url} onChange={this.handleUrlChange} />
            </Wrapper>
          </Column>
          <Column>
            <Wrapper label={t('USERNAME')} required>
              <Input
                value={username}
                onChange={this.handleUserNameChange}
                autoComplete="nope"
              />
            </Wrapper>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Wrapper label={t('EMAIL')}>
              <Input value={email} onChange={this.handleEmailChange} />
            </Wrapper>
          </Column>
          <Column>
            <Wrapper label={t('PASSWORD')} required>
              <div className={styles.password}>
                <InputPassword
                  type="password"
                  value={password}
                  onChange={this.handlePasswordChange}
                  autoComplete="new-password"
                />
                <Button onClick={this.handleValidate} loading={isValidating}>
                  {t('VALIDATE')}
                </Button>
              </div>
            </Wrapper>
          </Column>
        </Columns>
        {this.renderDefault()}
        <div className={styles.tip}>{this.renderTip()}</div>
      </div>
    )
  }
}
