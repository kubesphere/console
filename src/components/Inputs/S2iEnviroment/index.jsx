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
import PropTypes from 'prop-types'

import ArrayInput from '../ArrayInput'
import InputItem from './item'

export default class S2IEnviroment extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: [],
    onChange() {},
  }

  render() {
    const { value = [], onChange, options, ...rest } = this.props
    return (
      <ArrayInput
        value={value}
        onChange={onChange}
        addText={t('Add Environment Variables')}
        {...rest}
      >
        <InputItem options={options} />
      </ArrayInput>
    )
  }
}
