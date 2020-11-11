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
import { get, set } from 'lodash'
import { Form, Columns, Column } from '@kube-design/components'
import { Modal, TypeSelect } from 'components/Base'
import { ArrayInput, NumberInput } from 'components/Inputs'
import { getDisplayName } from 'utils'

import SecretStore from 'stores/secret'

import Endpoint from './Endpoint'

import styles from './index.scss'

export default class ServiceMonitor extends Component {
  store = this.props.appStore

  secretStore = new SecretStore()

  state = {
    selectServiceName: get(this.props.formTemplate, 'metadata.name'),
  }

  get services() {
    return this.store.components.data.map(item => ({
      icon: 'appcenter',
      value: item.name,
      label: getDisplayName(item),
      description: item.serviceType
        ? t(`SERVICE_TYPE_${item.serviceType.toUpperCase()}`)
        : t('Custom Creation'),
    }))
  }

  get defaultEndpoints() {
    return [
      {
        scheme: 'http',
        path: '/metrics',
        auth: {
          type: '',
        },
      },
    ]
  }

  componentDidMount() {
    const { cluster, namespace } = this.props
    this.secretStore.fetchListByK8s({ cluster, namespace })
  }

  handleServiceChange = name => {
    this.setState(() => {
      set(this.props.formTemplate, 'spec.endpoints', this.defaultEndpoints)
      return { selectServiceName: name }
    })
  }

  handleOk = data => {
    const { onOk } = this.props
    const interval = get(data, 'spec.interval')
    const scrapeTimeout = get(data, 'spec.scrapeTimeout')
    const endpoints = get(data, 'spec.endpoints', [])
    endpoints.forEach(ed => {
      ed.interval = interval
      ed.scrapeTimeout = scrapeTimeout
    })

    const selectService = this.store.components.data.find(
      item => item.name === this.state.selectServiceName
    )
    set(data, 'spec.selector.matchLabels', selectService.labels)
    set(data, 'metadata.labels', {
      ...(selectService.labels || {}),
      'app.kubernetes.io/vendor': 'kubesphere',
    })

    onOk(data)
  }

  render() {
    const {
      visible,
      workspace,
      formTemplate,
      isSubmitting,
      onCancel,
    } = this.props
    const { cluster, namespace } = this.store.detail
    const selectService = this.store.components.data.find(
      item => item.name === this.state.selectServiceName
    )

    return (
      <Modal.Form
        icon="linechart"
        title={t('Application Monitoring Exporter')}
        width={960}
        data={formTemplate}
        visible={visible}
        onOk={this.handleOk}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
      >
        <div className={styles.wrapper}>
          <Form.Item label={t('Target Service')}>
            <TypeSelect
              name="metadata.name"
              options={this.services}
              onChange={this.handleServiceChange}
            />
          </Form.Item>
          <Form.Item label={t('Exporter Service Ports')}>
            <ArrayInput
              className={styles.endpoints}
              name="spec.endpoints"
              defaultValue={this.defaultEndpoints}
            >
              <Endpoint
                detail={selectService}
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
