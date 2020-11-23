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

import { get, isEmpty, set } from 'lodash'
import copy from 'fast-copy'
import React from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Icon, Select, Tooltip } from '@kube-design/components'
import { joinSelector, mergeLabels } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import ApplicationStore from 'stores/application/crd'
import ServiceStore from 'stores/service'

import SelectComponent from './SelectComponent'

import styles from './index.scss'

@observer
export default class Components extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      istioProxyChecked: true,
      selectApp: '',
      components: [],
      isLoading: false,
    }

    this.store = props.store
    this.appStore = new ApplicationStore()
    this.serviceStore = new ServiceStore()
  }

  componentDidMount() {
    this.appStore
      .fetchList({
        namespace: this.namespace,
        cluster: this.props.cluster,
        limit: -1,
      })
      .then(() => {
        const data = toJS(this.appStore.list.data)
        const app = data.find(item => item.serviceMeshEnable) || {}
        this.setState({ selectApp: app.name })

        if (app.selector) {
          this.selectApp(app)
        }
      })
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get formTemplate() {
    return this.props.formTemplate.strategy
  }

  get strategyType() {
    return get(this.formTemplate, 'spec.type')
  }

  getApplications() {
    const data = toJS(this.appStore.list.data)
    return data.map(item => ({
      ...item,
      value: item.name,
      disabled: !item.serviceMeshEnable,
    }))
  }

  valueRenderer = option => (
    <p className={styles.option}>
      <img src={option.icon || '/assets/default-app.svg'} alt="" />
      {t('Application')}: {option.name}
      {option.disabled && (
        <Tooltip trigger="click" content={t('NO_SERVICE_MESH_TIP')}>
          <Icon name="question" className="float-right" />
        </Tooltip>
      )}
    </p>
  )

  optionRenderer = this.valueRenderer

  updateAppInfo = app => {
    set(this.formTemplate, 'metadata.labels', app.selector)
    set(this.formTemplate, 'spec.selector.matchLabels', app.selector)
    set(
      this.formTemplate,
      'metadata.annotations["app.kubernetes.io/icon"]',
      app.icon
    )
  }

  selectApp = async app => {
    this.updateAppInfo(app)
    this.setState({ isLoading: true })

    const params = {
      namespace: this.namespace,
      cluster: this.props.cluster,
      labelSelector: joinSelector(app.selector),
    }
    await Promise.all([
      this.store.fetchList(params),
      this.serviceStore.fetchListByK8s(params),
      this.serviceStore.fetchWorkloads(params),
    ]).then(() => {
      const services = toJS(this.serviceStore.list.data)
      const workloads = toJS(this.serviceStore.workloads.data)
      const strategies = toJS(this.store.list.data)

      this.setState({
        components: services.map(item => {
          item.workloads = []
          const component = get(item, 'labels.app')
          workloads.forEach(workload => {
            if (component === get(workload, 'labels.app')) {
              item.workloads.push(workload)
            }
          })

          const type = get(item.workloads, '[0].type', '')
          item.workloadType = MODULE_KIND_MAP[type] || ''

          item.strategies =
            strategies.filter(st => st.hosts.includes(item.name)) || []

          return item
        }),
        isLoading: false,
      })
    })
  }

  handleAppChange = value => {
    this.setState({ selectApp: value }, () => {
      const apps = toJS(this.appStore.list.data)
      const app = apps.find(item => item.name === value) || {}

      if (app.selector) {
        this.selectApp(app)
      }
    })
  }

  handleComponentSelect = (value, callback) => {
    const { components } = this.state
    const component = components.find(item => item.name === value) || {}

    if (!isEmpty(component.selector)) {
      const workload = copy(component.workloads[0])

      const template = FORM_TEMPLATES[workload.type]({
        namespace: this.namespace,
      })

      const portName = get(component, 'ports[0].name', '')
      // TO FIXED: add port select
      const protocol =
        (portName.split('-')[0] || '').toLowerCase() === 'http' ? 'http' : 'tcp'
      const version = workload.labels.version

      set(this.formTemplate, 'metadata.labels.app', value)
      set(this.formTemplate, 'spec.selector.matchLabels.app', value)
      set(this.formTemplate, 'spec.template.spec', { hosts: [value] })
      set(this.formTemplate, 'spec.principal', version)
      set(this.formTemplate, 'spec.protocol', protocol)
      set(
        this.formTemplate,
        'metadata.annotations["servicemesh.kubesphere.io/oldWorkloadName"]',
        workload.name
      )
      set(
        this.formTemplate,
        'metadata.annotations["servicemesh.kubesphere.io/workloadType"]',
        workload.type
      )
      set(
        this.formTemplate,
        'metadata.annotations["servicemesh.kubesphere.io/workloadReplicas"]',
        String(workload.podNums)
      )

      this.props.formTemplate.workload = {
        apiVersion: template.apiVersion,
        kind: template.kind,
        metadata: {
          name: '',
          namespace: workload.namespace,
          labels: workload.labels,
          annotations: workload.annotations,
        },
        spec: workload.spec,
      }

      mergeLabels(this.props.formTemplate.workload, { version: '' })
    }

    callback && callback(value)
  }

  handleIstioProxyChange = value => {
    this.setState({ istioProxyChecked: value })
  }

  renderForm() {
    const { formRef } = this.props
    const { components, isLoading } = this.state

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Form.Item
          rules={[
            {
              required: true,
              message: t('Please select a grayscale release component'),
            },
          ]}
        >
          <SelectComponent
            name="spec.hosts"
            data={components}
            loading={isLoading}
            onSelect={this.handleComponentSelect}
          />
        </Form.Item>
      </Form>
    )
  }

  render() {
    const { selectApp } = this.state

    return (
      <div>
        <div className={styles.bar}>
          <Select
            value={selectApp}
            onChange={this.handleAppChange}
            options={this.getApplications()}
            isLoading={this.appStore.list.isLoading}
            valueRenderer={this.valueRenderer}
            optionRenderer={this.optionRenderer}
          />
        </div>
        <div className={styles.formWrapper}>{this.renderForm()}</div>
      </div>
    )
  }
}
