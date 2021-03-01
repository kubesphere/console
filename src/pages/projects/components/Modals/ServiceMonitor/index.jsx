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
import { cloneDeep, get, set, unset } from 'lodash'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Columns, Column } from '@kube-design/components'
import { Modal, TypeSelect } from 'components/Base'
import { ArrayInput, NumberInput } from 'components/Inputs'
import { getDisplayName, joinSelector } from 'utils'

import ServiceStore from 'stores/service'
import SecretStore from 'stores/secret'

import Endpoint from './Endpoint'

import styles from './index.scss'

@observer
export default class ServiceMonitor extends Component {
  store = this.props.store

  serviceStore = new ServiceStore()

  secretStore = new SecretStore()

  state = {
    formTemplate: {},
  }

  get services() {
    return this.serviceStore.list.data.map(item => ({
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
    const { cluster, namespace, app } = this.props

    const params = {
      cluster,
      namespace,
      labelSelector: joinSelector(app.selector),
    }

    this.secretStore.fetchListByK8s({ cluster, namespace })

    Promise.all([
      this.store.fetchListByK8s(params),
      this.serviceStore.fetchListByK8s(params),
    ]).then(() => {
      this.handleServiceChange(get(this.serviceStore.list.data, '[0].name'))
    })
  }

  handleServiceChange = name => {
    const serviceMontor = this.store.list.data.find(item => item.name === name)
    if (serviceMontor && serviceMontor._originData) {
      this.setState({ formTemplate: toJS(serviceMontor._originData) })
    } else {
      const formTemplate = cloneDeep(this.props.formTemplate)
      set(formTemplate, 'metadata.name', name)
      unset(formTemplate, 'spec.endpoints')
      this.setState({ formTemplate })
    }
  }

  handleOk = data => {
    const { onOk } = this.props
    const name = get(data, 'metadata.name')
    const interval = get(data, 'spec.interval')
    const scrapeTimeout = get(data, 'spec.scrapeTimeout')
    const endpoints = get(data, 'spec.endpoints', [])
    endpoints.forEach(ed => {
      ed.interval = interval
      ed.scrapeTimeout = scrapeTimeout
    })

    const selectService = this.serviceStore.list.data.find(
      item => item.name === name
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
      isSubmitting,
      onCancel,
      cluster,
      namespace,
    } = this.props
    const { formTemplate } = this.state
    const selectService = this.serviceStore.list.data.find(
      item => item.name === get(formTemplate, 'metadata.name')
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
