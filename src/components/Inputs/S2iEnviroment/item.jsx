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

import { get } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Input, Select } from '@kube-design/components'
import BoolSelect from 'components/Inputs/BoolSelect'

import ObjectInput from '../ObjectInput'

export default class S2IEnviroment extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    configMaps: PropTypes.array,
    secrets: PropTypes.array,
  }

  static defaultProps = {
    value: {},
    onChange() {},
  }

  get valueType() {
    const { value, options } = this.props
    const key = get(value, 'name', '')
    const option = options.find(_option => _option.key === key)
    return get(option, 'type', 'string')
  }

  handleChange = obj => {
    const { options } = this.props
    const key = get(obj, 'name')
    const option = options.find(_option => _option.key === key)
    if (this.key !== key) {
      obj.value = get(option, 'defaultValue', '')
    }
    this.props.onChange(obj)
    this.key = key
  }

  render() {
    const { value, options } = this.props
    return (
      <ObjectInput value={value} onChange={this.handleChange}>
        <Select name="name" placeholder={t('KEY')} options={options} />
        {this.valueType === 'boolean' ? (
          <BoolSelect name="value" placeholder={t('VALUE')} />
        ) : (
          <Input name="value" placeholder={t('VALUE')} />
        )}
      </ObjectInput>
    )
  }
}
