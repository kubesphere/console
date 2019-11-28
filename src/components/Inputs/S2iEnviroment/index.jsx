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

import { uniqBy } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import ArrayInput from '../ArrayInput'
import InputItem from './item'

export default class S2IEnviroment extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: [],
    onChange() {},
  }

  addRequiredParams = () => {
    const { options, value, onChange } = this.props

    const requiredParams = options.filter(option => ({
      key: option.key,
      value: open.defaultValue,
    }))
    const mergeParams = uniqBy([...value, ...requiredParams], 'key')
    onChange(mergeParams)
  }

  render() {
    const { value = [], onChange, options, ...rest } = this.props
    return (
      <ArrayInput
        value={value}
        onChange={onChange}
        addText={t('Add Enviroment Params')}
        {...rest}
      >
        <InputItem options={options} />
      </ArrayInput>
    )
  }
}
