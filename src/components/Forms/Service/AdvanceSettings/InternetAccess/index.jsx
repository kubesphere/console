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
import { get, set, unset } from 'lodash'
import { Form, Select } from '@kube-design/components'

import { TypeSelect } from 'components/Base'
import { PropertiesInput } from 'components/Inputs'

import { updateFederatedAnnotations } from 'utils'

import EIPStore from 'stores/network/eip'

import styles from './index.scss'

@observer
export default class InternetAccess extends React.Component {
  constructor(props) {
    super(props)

    this.eipStore = new EIPStore()
    this.state = {
      mode: get(this.formTemplate, 'spec.type', 'ClusterIP'),
      type: get(
        this.formTemplate,
        'metadata.annotations["lb.kubesphere.io/v1alpha1"]',
        'other'
      ),
    }
  }

  get fedPreifx() {
    return this.props.isFederated ? 'spec.template.' : ''
  }

  get formTemplate() {
    return this.props.formTemplate.Service
  }

  get accessModes() {
    return [
      {
        label: 'NodePort',
        desc: t('ACCESS_NODEPORT_TIP'),
        value: 'NodePort',
      },
      {
        label: 'LoadBalancer',
        desc: t('ACCESS_LOADBALANCER_TIP'),
        value: 'LoadBalancer',
      },
    ]
  }

  get typeOptions() {
    return [
      {
        label: 'porter',
        value: 'porter',
      },
      {
        label: 'other',
        value: 'other',
      },
    ]
  }

  get eips() {
    return this.eipStore.list.data.map(item => ({
      value: item.name,
      label: item.name,
      icon: 'network-router',
      details: [
        {
          label: item.address,
          description: t('IP Address'),
        },
        {
          label: item.protocol,
          description: t('Protocol'),
        },
        {
          label: get(item, 'status.poolSize', 0) - get(item, 'status.usage', 0),
          description: t('Available Number'),
        },
      ],
    }))
  }

  componentDidMount() {
    this.eipStore.fetchList()
  }

  handleAccessModeChange = mode => {
    if (mode === 'LoadBalancer') {
      let annotations = get(this.formTemplate, 'metadata.annotations', {})
      annotations = {
        ...globals.config.loadBalancerDefaultAnnotations,
        ...annotations,
      }
      set(this.formTemplate, 'metadata.annotations', annotations)
    } else {
      Object.keys(globals.config.loadBalancerDefaultAnnotations).forEach(
        key => {
          unset(this.formTemplate, `metadata.annotations["${key}"]`)
        }
      )
    }

    if (this.props.isFederated) {
      updateFederatedAnnotations(this.formTemplate)
    }

    this.setState({ mode })
  }

  handleTypeChange = value => {
    if (value === 'porter') {
      set(
        this.formTemplate,
        'metadata.annotations["lb.kubesphere.io/v1alpha1"]',
        value
      )
    } else {
      unset(
        this.formTemplate,
        'metadata.annotations["lb.kubesphere.io/v1alpha1"]'
      )
      unset(
        this.formTemplate,
        'metadata.annotations["eip.porter.kubesphere.io/v1apha2"]'
      )
    }
    this.setState({ type: value })
  }

  handleAnnotationsChange = () => {
    if (this.props.isFederated) {
      updateFederatedAnnotations(this.formTemplate)
    }
  }

  optionRenderer = option => (
    <div className={styles.option}>
      <div>{option.label}</div>
      <p>{option.desc}</p>
    </div>
  )

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback({ message: t('Please select a eip') })
    }
    return callback()
  }

  render() {
    const { mode, type } = this.state

    return (
      <>
        <Form.Item label={t('Access Method')}>
          <Select
            name={`Service.${this.fedPreifx}spec.type`}
            options={this.accessModes}
            onChange={this.handleAccessModeChange}
            optionRenderer={this.optionRenderer}
          />
        </Form.Item>
        {mode === 'LoadBalancer' && (
          <Form.Item label={t('Type')}>
            <Select
              options={this.typeOptions}
              value={type}
              onChange={this.handleTypeChange}
            />
          </Form.Item>
        )}
        {mode === 'LoadBalancer' && type === 'porter' && (
          <Form.Item
            label={t('EIP')}
            rules={[{ validator: this.nameValidator }]}
          >
            <TypeSelect
              name="Service.metadata.annotations['eip.porter.kubesphere.io/v1apha2']"
              options={this.eips}
              defaultValue={get(this.eips, '0.value')}
              placeholder={{ label: t('No Available Resource') }}
            />
          </Form.Item>
        )}
        {mode === 'LoadBalancer' && type === 'other' && (
          <Form.Item label={t('Annotations')}>
            <PropertiesInput
              name="Service.metadata.annotations"
              hiddenKeys={globals.config.preservedAnnotations}
              onChange={this.handleAnnotationsChange}
              addText={t('Add Annotation')}
            />
          </Form.Item>
        )}
      </>
    )
  }
}
