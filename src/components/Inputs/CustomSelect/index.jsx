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
import { Input, Select, Icon } from '@pitrix/lego-ui'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

export default class CustomSelect extends React.Component {
  constructor(props) {
    super(props)

    const value = props.value || props.defaultValue

    const option = props.options.find(item => item.value === value)

    this.state = {
      mode: option ? 'select' : 'input',
    }
  }

  handleSelectChange = value => {
    const { onChange } = this.props

    if (!value) {
      this.setState({ mode: 'input' })
    } else {
      this.setState({ mode: 'select' })
    }

    onChange && onChange(value)
  }

  changeToSelect = () => {
    const { onChange, options } = this.props
    this.setState({ mode: 'select' }, () => {
      onChange && onChange(options[0].value)
    })
  }

  render() {
    const { options, inputType } = this.props

    const newOptions = [...options, { label: t('Custom'), value: '' }]

    if (this.state.mode === 'input') {
      return (
        <span className={styles.inputWrapper}>
          {inputType === 'number' ? (
            <NumberInput {...this.props} placeholder="" autoFocus />
          ) : (
            <Input {...this.props} placeholder="" autoFocus />
          )}
          <Icon name="changing-over" clickable onClick={this.changeToSelect} />
        </span>
      )
    }

    return (
      <Select
        {...this.props}
        options={newOptions}
        onChange={this.handleSelectChange}
      />
    )
  }
}
