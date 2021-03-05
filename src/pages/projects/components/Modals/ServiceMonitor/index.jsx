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
import { cloneDeep, get, set } from 'lodash'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Columns, Column } from '@kube-design/components'
import { Modal } from 'components/Base'
import { ArrayInput, NumberInput } from 'components/Inputs'
import { joinSelector } from 'utils'

import SecretStore from 'stores/secret'

import Endpoint from './Endpoint'

import styles from './index.scss'

@observer
export default class ServiceMonitor extends Component {
  store = this.props.store

  secretStore = new SecretStore()

  state = {
    formTemplate: cloneDeep(this.props.formTemplate),
  }

  get defaultEndpoints() {
    return [
      {
        scheme: 'http',
        path: '/metrics',
        authType: '',
      },
    ]
  }

  componentDidMount() {
    const { cluster, namespace, detail } = this.props

    this.store
      .fetchListByK8s({
        cluster,
        namespace,
        labelSelector: joinSelector(detail.selector),
      })
      .then(() => this.updateFormTemplate())

    this.secretStore.fetchListByK8s({ cluster, namespace })
  }

  updateFormTemplate = () => {
    const { detail } = this.props
    if (this.store.list.data.length > 0) {
      const serviceMontor =
        this.store.list.data.find(item => item.name === detail.name) ||
        this.store.list.data[0]
      const formTemplate = toJS(serviceMontor._originData)
      get(formTemplate, 'spec.endpoints', []).forEach(ep => {
        if (ep.tlsConfig) {
          ep.authType = 'tlsConfig'
        } else if (ep.bearerTokenSecret) {
          ep.authType = 'bearerTokenSecret'
        } else if (ep.basicAuth) {
          ep.authType = 'basicAuth'
        } else {
          ep.authType = ''
        }
      })
      this.setState({ formTemplate })
    }
  }

  handleOk = data => {
    const { onOk, detail } = this.props
    const interval = get(data, 'spec.interval')
    const scrapeTimeout = get(data, 'spec.scrapeTimeout')
    const endpoints = get(data, 'spec.endpoints', [])
    endpoints.forEach(ed => {
      ed.interval = interval
      ed.scrapeTimeout = scrapeTimeout
    })

    set(data, 'spec.selector.matchLabels', detail.labels)
    set(data, 'metadata.labels', {
      ...(detail.labels || {}),
      'app.kubernetes.io/vendor': 'kubesphere',
    })

    onOk(data)
  }

  checkItemValid = item => item.port && item.path && item.scheme

  render() {
    const {
      visible,
      workspace,
      namespace,
      cluster,
      detail,
      isSubmitting,
      onCancel,
    } = this.props
    const { formTemplate } = this.state

    return (
      <Modal.Form
        icon="linechart"
        title={t('Service Monitoring Exporter')}
        width={960}
        data={formTemplate}
        visible={visible}
        onOk={this.handleOk}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
      >
        <div className={styles.wrapper}>
          <Form.Item label={t('Exporter Service Ports')}>
            <ArrayInput
              className={styles.endpoints}
              name="spec.endpoints"
              defaultValue={this.defaultEndpoints}
              checkItemValid={this.checkItemValid}
              itemType="object"
              addText={t('Add')}
            >
              <Endpoint
                detail={detail}
                secretStore={this.secretStore}
                cluster={cluster}
                namespace={namespace}
                workspace={workspace}
              />
            </ArrayInput>
          </Form.Item>
          <div className={styles.timeout}>
            <Columns>
              <Column>
                <Form.Item
                  label={t('Scrap Interval(min)')}
                  desc={t('SCRAP_INTERVAL_DESC')}
                >
                  <NumberInput
                    name="spec.interval"
                    defaultValue="1m"
                    min={0}
                    unit="m"
                    integer
                  />
                </Form.Item>
              </Column>
              <Column>
                <Form.Item
                  label={t('Timeout(s)')}
                  desc={t('SCRAP_TIMEOUT_DESC')}
                >
                  <NumberInput
                    name="spec.scrapeTimeout"
                    defaultValue="10s"
                    min={0}
                    unit="s"
                    integer
                  />
                </Form.Item>
              </Column>
            </Columns>
          </div>
        </div>
      </Modal.Form>
    )
  }
}
