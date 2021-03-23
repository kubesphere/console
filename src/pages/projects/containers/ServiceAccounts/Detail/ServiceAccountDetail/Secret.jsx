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
import { observer } from 'mobx-react'
import { computed, toJS } from 'mobx'
import { Button, Icon, Notify } from '@kube-design/components'
import { saveAs } from 'file-saver'

import { Panel, CodeEditor } from 'components/Base'

import { getValue } from 'utils/yaml'
import { copyToClipboard } from 'utils/dom'
import { safeBtoa } from 'utils/base64'

import SecretStore from 'stores/secret'

import styles from './index.scss'

@observer
export default class Secret extends React.Component {
  constructor(props) {
    super(props)

    this.secret = props.secret
    this.serviceAccountName = props.serviceAccountName
    this.store = new SecretStore()

    this.state = {
      showSecret: false,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  @computed
  get kubeconfig() {
    const {
      detail: { data = {}, namespace },
    } = toJS(this.store)

    return {
      apiVersion: 'v1',
      kind: 'Config',
      clusters: [
        {
          name: `${this.serviceAccountName}@local`,
          cluster: {
            server: 'https://kubernetes.default.svc:443',
            'certificate-authority-data': safeBtoa(data['ca.crt']),
          },
        },
      ],
      users: [
        {
          name: this.serviceAccountName,
          user: {
            token: data.token,
          },
        },
      ],
      contexts: [
        {
          name: `${this.serviceAccountName}@local`,
          context: {
            user: this.serviceAccountName,
            cluster: `${this.serviceAccountName}@local`,
            namespace,
          },
        },
      ],
      'current-context': `${this.serviceAccountName}@local`,
    }
  }

  fetchData = () => {
    this.store.fetchDetail({
      ...this.props.match.params,
      name: this.secret,
    })
  }

  convert = value => {
    const { showSecret } = this.state
    return showSecret ? value : safeBtoa(value)
  }

  changeSecretState = e => {
    e.preventDefault()
    e.stopPropagation()

    this.setState(({ showSecret }) => ({
      showSecret: !showSecret,
    }))
  }

  handleCopy = () => {
    copyToClipboard(getValue(this.kubeconfig))
    Notify.success({ content: t('Copy successful') })
  }

  handleDownload = () => {
    const fileName = 'kubeconfig.yaml'
    const blob = new Blob([getValue(this.kubeconfig)], {
      type: 'text/plain;charset=utf-8',
    })
    saveAs(blob, fileName)
  }

  renderSecretContent() {
    const {
      detail: { data = {} },
    } = toJS(this.store)

    return (
      <div className={styles.secretWrapper}>
        <div className={styles.title}>
          <div className="h6">{t('Secret Detail')}</div>
          {this.renderOperations()}
        </div>
        <div className={styles.defaultWrapper}>
          <ul>
            {Object.entries(data).map(([key, value]) => (
              <li key={key}>
                <span>{key}:</span>
                <span>
                  <pre>{this.convert(value)}</pre>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderOperations() {
    const { showSecret } = this.state
    return (
      <Button
        type="flat"
        icon={showSecret ? 'eye-closed' : 'eye'}
        onClick={this.changeSecretState}
      />
    )
  }

  renderConfigContent() {
    const options = { readOnly: true }

    return (
      <div className={styles.configWrapper}>
        <div className={styles.title}>
          <div className="h6">{t('KubeConfig')}</div>
          <p className="text-desc">
            {t.html('SERVICEACCOUNT_KUBECONFIG_DESC')}
          </p>
        </div>
        <div className={styles.codeEditor}>
          <div className={styles.ops}>
            <Icon
              name="copy"
              size={20}
              clickable
              color={{ primary: '#fff', secondary: '#fff' }}
              onClick={this.handleCopy}
            />
            <span className={styles.split}>|</span>
            <Icon
              name="download"
              size={20}
              clickable
              color={{ primary: '#fff', secondary: '#fff' }}
              onClick={this.handleDownload}
            />
          </div>
          <CodeEditor value={getValue(this.kubeconfig)} options={options} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <Panel title={`${t('Secret')}: ${this.secret}`}>
        {this.renderSecretContent()}
        {this.renderConfigContent()}
      </Panel>
    )
  }
}
