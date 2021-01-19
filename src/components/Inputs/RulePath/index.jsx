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

import { get, set, isNumber } from 'lodash'
import React from 'react'
import { Input, Select } from '@kube-design/components'
import { ObjectInput } from 'components/Inputs'

import styles from './index.scss'

export default class RulePath extends React.Component {
  static defaultProps = {
    value: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    const defaultService = get(this.props, 'value.backend.serviceName')
    this.state = {
      service: defaultService,
      defaultService,
    }
  }

  static getDerivedStateFromProps(props, state) {
    const service = get(props, 'value.backend.serviceName')
    if (service && service !== state.defaultService) {
      return { service, defaultService: service }
    }
    return null
  }

  get services() {
    return this.props.services.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  get ports() {
    const service = this.props.services.find(
      item => item.name === this.state.service
    )
    return service
      ? service.ports.map(port => ({
          label: port.port,
          value: port.port,
        }))
      : []
  }

  handleChange = value => {
    const { onChange } = this.props

    const servicePort = get(value, 'backend.servicePort')
    if (isNumber(servicePort)) {
      set(value, 'backend.servicePort', Number(servicePort))
    }

    onChange && onChange(value)
  }

  handleServiceChange = value => {
    this.setState({ service: value })
  }

  render() {
    return (
      <ObjectInput {...this.props} onChange={this.handleChange}>
        <Input name="path" placeholder={t('Path')} defaultValue="/" />
        <Select
          className="margin-r12"
          name="backend.serviceName"
          placeholder={t('Please select a service')}
          options={this.services}
          onChange={this.handleServiceChange}
        />
        <Select
          className={styles.input}
          name="backend.servicePort"
          placeholder={t('port')}
          options={this.ports}
          searchable
        />
      </ObjectInput>
    )
  }
}
