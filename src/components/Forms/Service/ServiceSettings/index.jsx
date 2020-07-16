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

import { Form, TypeSelect } from 'components/Base'
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
        label: t('HEADLESS_SELECTOR_TITLE'),
        description: t('HEADLESS_SELECTOR_DESC'),
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
          return callback({ message: t('Invalid port') })
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
      return callback({ message: t('Please input valid Selector') })
    }

    if (!isValidLabel(value)) {
      return callback({ message: t('LABEL_FORMAT_DESC') })
    }

    return callback()
  }

  renderTypeSelect() {
    return (
      <Form.Item label={t('Access Type')}>
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
        label={t('LabelSelector')}
        rules={[
          { required: true, message: t('Please input valid Selector') },
          { validator: this.labelsValidator },
        ]}
      >
        <SelectorsInput
          name="spec.selector"
          cluster={this.props.cluster}
          namespace={this.namespace}
          addText={`${t('Add')} LabelSelector`}
        />
      </Form.Item>
    )
  }

  renderPorts() {
    return (
      <Form.Group label={t('Ports')} desc={t('SERVICE_PORTS_DESC')}>
        <Form.Item
          rules={[
            { required: true, message: t('Please input ports') },
            { validator: this.portsValidator, checkOnSubmit: true },
          ]}
        >
          <ArrayInput
            name="spec.ports"
            itemType="object"
            addText={t('Add Port')}
          >
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
