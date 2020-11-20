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
import { get } from 'lodash'
import classnames from 'classnames'
import { AutoComplete } from '@kube-design/components'

import styles from './index.scss'

export default class CustomAutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newValue: props.value || props.defaultValue,
    }
  }

  get newOptions() {
    return this.props.options.map(item => item.label)
  }

  getOptionsForValue = value => {
    const { options } = this.props
    return (
      get(
        options.find(item => item.value === value),
        'label'
      ) || value
    )
  }

  getOptionsForLabel = label => {
    const { options } = this.props
    return (
      get(
        options.find(item => item.label === label),
        'value'
      ) || label
    )
  }

  handleChange = value => {
    const { onChange } = this.props
    const newValue = this.getOptionsForLabel(value)

    this.setState({ newValue })

    onChange && onChange(newValue)
  }

  render() {
    const { value, className } = this.props
    return (
      <AutoComplete
        {...this.props}
        className={classnames(className, styles.wrapper)}
        value={this.getOptionsForValue(value)}
        options={this.newOptions}
        onChange={this.handleChange}
      />
    )
  }
}
