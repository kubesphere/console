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

import { get, set, unset, isEmpty } from 'lodash'
import React from 'react'

import { Form } from '@kube-design/components'
import { TypeSelect } from 'components/Base'
import { ArrayInput, ServicePort } from 'components/Inputs'

import { isValidLabel } from 'utils'
import { MODULE_KIND_MAP, PATTERN_PORT_NAME } from 'utils/constants'

import SelectorsInput from './SelectorsInput'

import styles from './index.scss'

export default class ServiceSettings extends React.Component {
  state = {
    serviceType: 'virtualIP',
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get types() {
    return [
      {
        icon: 'cluster',
        label: t('VIRTUAL_IP_TITLE'),
        description: t('VIRTUAL_IP_DESC'),
        value: 'virtualIP',
      },
      {
        icon: 'blockchain',
        label: t('INTERNAL_DOMAIN_NAME'),
        description: t('INTERNAL_DOMAIN_NAME_DESC'),
        value: 'headlessSelector',
      },
    ]
  }

  handleTypeChange = type => {
    this.setState({ serviceType: type }, () => {
      if (type === 'virtualIP') {
        unset(this.formTemplate, 'spec.clusterIP')
      } else {
        set(this.formTemplate, 'spec.clusterIP', 'None')
      }
    })
  }

  portsValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value.length > 0) {
      const names = []
      value.forEach(item => {
        if (!item.name || !item.port) {
          return callback({ message: t('INVALID_PORT') })
        }

        if (names.includes(item.name)) {
          return callback({ message: t('PORT_INPUT_DESC') })
        }

        if (
          item.name &&
          (item.name.length > 63 || !PATTERN_PORT_NAME.test(item.name))
        ) {
          return callback({ message: t('PORT_NAME_DESC') })
        }

        names.push(item.name)
      })
    }

    callback()
  }

  labelsValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (isEmpty(value)) {
      return callback({ message: t('ENTER_SELECTOR_TIP') })
    }

    if (!isValidLabel(value)) {
      return callback({ message: t('LABEL_FORMAT_DESC') })
    }

    return callback()
  }

  renderTypeSelect() {
    return (
      <Form.Item label={t('INTERNAL_ACCESS_MODE')}>
        <TypeSelect
          className="margin-b12"
          value={this.state.serviceType}
          onChange={this.handleTypeChange}
          options={this.types}
        />
      </Form.Item>
    )
  }

  renderLabelSelector() {
    return (
      <Form.Item
        label={t('WORKLOAD_SELECTOR')}
        rules={[
          { required: true, message: t('ENTER_SELECTOR_TIP') },
          { validator: this.labelsValidator },
        ]}
      >
        <SelectorsInput
          name="spec.selector"
          cluster={this.props.cluster}
          namespace={this.namespace}
          addText={t('ADD')}
        />
      </Form.Item>
    )
  }

  renderPorts() {
    return (
      <Form.Group label={t('PORT_PL')} desc={t('SERVICE_PORTS_DESC')}>
        <Form.Item
          rules={[
            { required: true, message: t('PORT_EMPTY') },
            { validator: this.portsValidator, checkOnSubmit: true },
          ]}
        >
          <ArrayInput name="spec.ports" itemType="object" addText={t('ADD')}>
            <ServicePort />
          </ArrayInput>
        </Form.Item>
      </Form.Group>
    )
  }

  render() {
    const { formRef } = this.props

    return (
      <div className={styles.wrapper}>
        <Form data={this.formTemplate} ref={formRef}>
          {this.renderTypeSelect()}
          {this.renderLabelSelector()}
          {this.renderPorts()}
        </Form>
      </div>
    )
  }
}
