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
import { Input, Select, AutoComplete } from '@kube-design/components'
import { ObjectInput } from 'components/Inputs'

import styles from './index.scss'

export default class RulePath extends React.Component {
  static defaultProps = {
    value: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    const defaultService = get(this.props, 'value.backend.service.name')
    this.state = {
      service: defaultService,
      defaultService,
    }
  }

  static getDerivedStateFromProps(props, state) {
    const service = get(props, 'value.backend.service.name')
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

    const servicePort = get(value, 'backend.service.port.number')
    if (isNumber(servicePort)) {
      set(value, 'backend.service.port.number', Number(servicePort))
    }

    set(value, 'pathType', 'ImplementationSpecific')

    onChange && onChange(value)
  }

  handleServiceChange = value => {
    this.setState({ service: value })
  }

  render() {
    const options = this.services.map(item => item.value)

    return (
      <ObjectInput {...this.props} onChange={this.handleChange}>
        <Input name="path" placeholder={t('PATH')} defaultValue="/" />
        <AutoComplete
          className={styles.autocomplete}
          name="backend.service.name"
          placeholder={t('PATH_SERVICE_TIP')}
          onChange={this.handleServiceChange}
          options={options}
        />
        <Select
          className={styles.input}
          name="backend.service.port.number"
          defaultValue={get(this.props.value, 'backend.service.port.number')}
          placeholder={t('PORT')}
          options={this.ports}
          searchable
        />
      </ObjectInput>
    )
  }
}
