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
import { observer, inject } from 'mobx-react'
import { Button, Icon } from '@kube-design/components'
import { Card } from 'components/Base'
import Placement from 'projects/components/Cards/Placement'
import { get } from 'lodash'
import styles from './index.scss'

@inject('detailStore')
@observer
export default class SecretDetail extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.module = props.module

    this.state = {
      showSecret: false,
    }
  }

  get originData() {
    const originData = this.store.detail._originData?.data ?? {}
    return originData
  }

  convert = (value, key) => {
    const { showSecret } = this.state
    const { detail } = this.store

    return showSecret
      ? value
      : detail.type === 'kubernetes.io/dockerconfigjson' && value
      ? value
          .split('')
          .map(item => item.replace(/[\s\S]/g, '*'))
          .join('')
      : get(this.originData, key, '')
  }

  changeSecretState = () => {
    this.setState(({ showSecret }) => ({
      showSecret: !showSecret,
    }))
  }

  renderTLS(data = {}) {
    return (
      <div className={styles.tlsWrapper}>
        <div className={styles.tlsItem}>
          <div className="h6">{t('CREDENTIAL_SI')}</div>
          <pre>{this.convert(data['tls.crt'], 'tls.crt')}</pre>
        </div>
        <div className={styles.tlsItem}>
          <div className="h6">{t('PRIVATE_KEY_TCAP')}</div>
          <pre>{this.convert(data['tls.key'], 'tls.key')}</pre>
        </div>
      </div>
    )
  }

  renderImageRepositorySecret(data) {
    const detail = data['.dockerconfigjson']

    if (!detail) {
      return null
    }

    if (!detail.auths) {
      return null
    }

    return (
      <div className={styles.imageWrapper}>
        <ul>
          {Object.entries(detail.auths).map(([key, value]) => (
            <li key={key}>
              <div className="h6">
                <Icon name="earth" />
                {key}
              </div>
              <ul>
                <li>
                  <span>{t('USERNAME')}:</span>
                  <span>{this.convert(value.username, 'username')}</span>
                </li>
                <li>
                  <span>{t('PASSWORD')}:</span>
                  <span>{this.convert(value.password, 'password')}</span>
                </li>
                {value.email && (
                  <li>
                    <span>{t('EMAIL')}:</span>
                    <span>{this.convert(value.email, 'email')}</span>
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderDefault(data = {}) {
    return (
      <div className={styles.defaultWrapper}>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <span>{key}:</span>
              <span>
                <pre>{this.convert(value, key)}</pre>
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderBasicAuth(data = {}) {
    return (
      <div className={styles.defaultWrapper}>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <span>{t(key.toUpperCase())}:</span>
              <span>
                <pre>{this.convert(value, key)}</pre>
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderContent(detail) {
    if (!detail.type) {
      return null
    }

    let content = null

    switch (detail.type) {
      case 'kubernetes.io/tls':
        content = this.renderTLS(detail.data)
        break
      case 'kubernetes.io/dockerconfigjson':
        content = this.renderImageRepositorySecret(detail.data)
        break
      case 'kubernetes.io/basic-auth':
        content = this.renderBasicAuth(detail.data)
        break
      default:
        content = this.renderDefault(detail.data)
        break
    }

    return content
  }

  renderOperations() {
    const { showSecret } = this.state
    return (
      <Button
        type="flat"
        icon={showSecret ? 'eye' : 'eye-closed'}
        onClick={this.changeSecretState}
      />
    )
  }

  renderPlacement() {
    const { name, namespace } = this.props.match.params
    const { detail } = this.store
    if (detail.isFedManaged) {
      return (
        <Placement
          module={this.store.module}
          name={name}
          namespace={namespace}
        />
      )
    }
    return null
  }

  render() {
    const { detail } = this.store
    return (
      <div>
        {this.renderPlacement()}
        <Card title={t('DATA')} operations={this.renderOperations()}>
          {this.renderContent(detail)}
        </Card>
      </div>
    )
  }
}
